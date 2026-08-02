import { rules, breakpoints, stateVariants, CSSDeclaration } from "./rules";

export interface GeneratedRule {
  className: string;
  css: string;
}

export interface GeneratorOptions {
  /** Add !important to all declarations (default: false) */
  important?: boolean;
  /** Prefix for all class names (e.g., "z-") */
  prefix?: string;
  /** Minify the CSS output (default: false) */
  minify?: boolean;
}

// ──────────────────────────────────────────────
// Result cache — O(1) repeated lookups
// ──────────────────────────────────────────────
const classCache = new Map<string, GeneratedRule | null>();

/** Clear the internal generation cache (useful after addColor/setColor calls) */
export function clearCache(): void {
  classCache.clear();
}

// ──────────────────────────────────────────────
// CSS string builders
// ──────────────────────────────────────────────
function escapeClassName(className: string): string {
  // Escape special CSS selector characters: : . / [ ] ( ) ,
  return className.replace(/[:.\/\[\]\(\),]/g, "\\$&");
}

function toCSSString(
  selector: string,
  decl: CSSDeclaration,
  options: GeneratorOptions = {},
): string {
  const important = options.important ? " !important" : "";

  if (options.minify) {
    const body = Object.entries(decl)
      .map(([prop, value]) => `${prop}:${value}${important}`)
      .join(";");
    return `${selector}{${body}}`;
  }

  const body = Object.entries(decl)
    .map(([prop, value]) => `  ${prop}: ${value}${important};`)
    .join("\n");
  return `${selector} {\n${body}\n}`;
}

// ──────────────────────────────────────────────
// Variant parsing
// ──────────────────────────────────────────────
interface ParsedClass {
  /** Responsive breakpoint key (e.g., "md") or null */
  responsive: string | null;
  /** State variant key (e.g., "hover") or null */
  state: string | null;
  /** The base utility class name (e.g., "pa-4") */
  utility: string;
}

function parseClassName(className: string): ParsedClass {
  const parts = className.split(":");
  const result: ParsedClass = {
    responsive: null,
    state: null,
    utility: "",
  };

  if (parts.length === 1) {
    result.utility = parts[0];
  } else if (parts.length === 2) {
    // Could be responsive:utility or state:utility
    if (breakpoints[parts[0]]) {
      result.responsive = parts[0];
    } else if (stateVariants[parts[0]]) {
      result.state = parts[0];
    }
    result.utility = parts[1];
  } else if (parts.length === 3) {
    // responsive:state:utility
    if (breakpoints[parts[0]]) {
      result.responsive = parts[0];
    }
    if (stateVariants[parts[1]]) {
      result.state = parts[1];
    }
    result.utility = parts[2];
  }

  return result;
}

// ──────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────

/**
 * Generate CSS for a single class name.
 * Supports responsive (sm:, md:, lg:, xl:, 2xl:) and
 * state (hover:, focus:, active:, etc.) variant prefixes.
 */
export function generateCSSForClass(
  className: string,
  options: GeneratorOptions = {},
): GeneratedRule | null {
  // Check cache (only for default options — cache key includes class name)
  const cacheKey = `${options.important ? "!" : ""}${options.prefix ?? ""}${options.minify ? "m" : ""}:${className}`;
  if (classCache.has(cacheKey)) {
    return classCache.get(cacheKey)!;
  }

  const parsed = parseClassName(className);

  // Match the base utility against rules
  let decl: CSSDeclaration | null = null;
  for (const rule of rules) {
    const match = parsed.utility.match(rule.pattern);
    if (match) {
      decl = rule.handler(match);
      if (decl) break;
    }
  }

  if (!decl) {
    classCache.set(cacheKey, null);
    return null;
  }

  // Build the selector
  const prefix = options.prefix ?? "";
  const escapedClassName = escapeClassName(className);
  let selector = `.${prefix}${escapedClassName}`;

  // Append state pseudo-class
  if (parsed.state && stateVariants[parsed.state]) {
    selector += stateVariants[parsed.state];
  }

  // Build CSS string
  let css = toCSSString(selector, decl, options);

  // Wrap in media query for responsive variants
  if (parsed.responsive && breakpoints[parsed.responsive]) {
    const bp = breakpoints[parsed.responsive];
    if (options.minify) {
      css = `@media(min-width:${bp}){${css}}`;
    } else {
      // Indent the rule inside the media query
      const indentedCss = css
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n");
      css = `@media (min-width: ${bp}) {\n${indentedCss}\n}`;
    }
  }

  const result: GeneratedRule = { className, css };
  classCache.set(cacheKey, result);
  return result;
}

/**
 * Generate CSS for multiple class names.
 * Deduplicates and maintains insertion order.
 */
export function generateCSS(
  classNames: Set<string> | string[],
  options: GeneratorOptions = {},
): string {
  const seen = new Set<string>();
  const baseOutput: string[] = [];
  const responsiveOutput: Map<string, string[]> = new Map();

  for (const className of classNames) {
    if (seen.has(className)) continue;
    seen.add(className);

    const result = generateCSSForClass(className, options);
    if (!result) continue;

    const parsed = parseClassName(className);
    if (parsed.responsive) {
      // Group responsive rules by breakpoint
      const key = parsed.responsive;
      if (!responsiveOutput.has(key)) {
        responsiveOutput.set(key, []);
      }
      responsiveOutput.get(key)!.push(result.css);
    } else {
      baseOutput.push(result.css);
    }
  }

  const separator = options.minify ? "" : "\n\n";
  const parts = [...baseOutput];

  // Append responsive rules grouped by breakpoint (mobile-first order)
  const breakpointOrder = ["sm", "md", "lg", "xl", "2xl"];
  for (const bp of breakpointOrder) {
    const rules = responsiveOutput.get(bp);
    if (rules) {
      parts.push(...rules);
    }
  }

  return parts.join(separator);
}