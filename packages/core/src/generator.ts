import { rules, breakpoints, stateVariants, fluidFontScale } from "./rules/index";
import type { CSSDeclaration, Rule } from "./rules/types";

export interface GeneratedRule {
  className: string;
  css: string;
  keyframes?: string;
}

export interface GeneratorOptions {
  /** Add !important to all declarations (default: false) */
  important?: boolean;
  /** Prefix for all class names (e.g., "z-") */
  prefix?: string;
  /** Minify the CSS output (default: false) */
  minify?: boolean;
  /** Dark mode strategy: 'media' (prefers-color-scheme) or 'class' (.dark ancestor) */
  darkMode?: "media" | "class";
  /**
   * Auto-responsive font sizes (default: false).
   * When true, all font-size declarations are replaced with CSS clamp() values
   * that scale smoothly from a mobile floor up to the desktop target size.
   * Example: fs-sm → clamp(0.75rem, 1.75vw, 0.875rem)
   */
  autoResponsive?: boolean;
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
// Auto-responsive fluid font helper
// ──────────────────────────────────────────────

/**
 * Derives a CSS clamp() value from any rem font-size string.
 * mobile floor = 85% of target, fluid mid = rem × 2 in vw, cap = original.
 * Used as fallback for arbitrary px sizes (font-14) when autoResponsive is on.
 */
function computeClamp(remVal: string): string {
  const rem = parseFloat(remVal);
  if (isNaN(rem) || rem <= 0) return remVal;
  const min = parseFloat((rem * 0.85).toFixed(4));
  const vw  = parseFloat((rem * 2).toFixed(2));
  return `clamp(${min}rem, ${vw}vw, ${remVal})`;
}

/**
 * Replace a fixed font-size rem value with a fluid clamp() equivalent.
 * Curated entries from fluidFontScale are matched by their cap value
 * (e.g. "1rem" → the base clamp entry); arbitrary values fall back to
 * computeClamp() for an auto-derived range.
 */
function applyFluidFontSize(rawFontSize: string): string {
  for (const clampVal of Object.values(fluidFontScale)) {
    const capMatch = clampVal.match(/,\s*([\d.]+rem)\)$/);
    if (capMatch && capMatch[1] === rawFontSize) return clampVal;
  }
  return computeClamp(rawFontSize);
}

// ──────────────────────────────────────────────
// CSS string builders
// ──────────────────────────────────────────────
/**
 * Escape a class name for use in a CSS selector.
 *
 * Follows the same rules as CSS.escape: everything outside [A-Za-z0-9_-] and
 * the non-ASCII range is backslash-escaped, and a leading digit (or a digit
 * directly after a leading hyphen) is written as a numeric code-point escape,
 * because an identifier may not begin with an unescaped digit.
 *
 * Getting this wrong is not cosmetic. `bg-[#14b8a6]` used to emit
 * `.bg-\[#14b8a6\]`, where the unescaped `#` opens a hash token -- Turbopack
 * fails the build and other parsers drop the rule silently. `2xl:pa-8` had the
 * same problem via its leading digit.
 */
function escapeClassName(className: string): string {
  let out = "";
  for (let i = 0; i < className.length; i++) {
    const ch = className[i]!;
    const code = className.charCodeAt(i);

    // Leading digit, or digit right after a leading hyphen -> \3N escape.
    if (ch >= "0" && ch <= "9" && (i === 0 || (i === 1 && className[0] === "-"))) {
      out += "\\" + code.toString(16) + " ";
      continue;
    }

    // A lone "-" is not a valid identifier on its own.
    if (ch === "-" && className.length === 1) {
      out += "\\-";
      continue;
    }

    // Safe as-is: ASCII word characters, hyphen, and anything non-ASCII.
    if (code >= 0x80 || (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") ||
        (ch >= "0" && ch <= "9") || ch === "_" || ch === "-") {
      out += ch;
      continue;
    }

    out += "\\" + ch;
  }
  return out;
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
// Media variants (non-breakpoint media queries)
// ──────────────────────────────────────────────
const mediaVariants: Record<string, string> = {
  "print": "print",
  "motion-safe": "(prefers-reduced-motion: no-preference)",
  "motion-reduce": "(prefers-reduced-motion: reduce)",
  "contrast-more": "(prefers-contrast: more)",
  "contrast-less": "(prefers-contrast: less)",
};

// ──────────────────────────────────────────────
// Variant parsing
// ──────────────────────────────────────────────
interface ParsedClass {
  responsive: string | null;
  state: string | null;
  dark: boolean;
  media: string | null;
  important: boolean;
  utility: string;
}

function parseClassName(className: string): ParsedClass {
  const result: ParsedClass = {
    responsive: null,
    state: null,
    dark: false,
    media: null,
    important: false,
    utility: "",
  };

  let name = className;

  // Check for ! prefix (per-class important)
  if (name.startsWith("!")) {
    result.important = true;
    name = name.slice(1);
  }

  const parts = name.split(":");

  if (parts.length === 1) {
    result.utility = parts[0];
  } else {
    // Process variant prefixes left-to-right
    const utilityPart = parts.pop()!;
    result.utility = utilityPart;

    for (const part of parts) {
      if (breakpoints[part]) {
        result.responsive = part;
      } else if (part === "dark") {
        result.dark = true;
      } else if (mediaVariants[part]) {
        result.media = part;
      } else if (stateVariants[part]) {
        result.state = part;
      }
      // Group/peer variants could be added here in the future
    }
  }

  return result;
}

// ──────────────────────────────────────────────
// Arbitrary value support
// ──────────────────────────────────────────────
const arbitraryPropertyMap: Record<string, string | string[]> = {
  "w": "width", "h": "height",
  "min-w": "min-width", "max-w": "max-width",
  "min-h": "min-height", "max-h": "max-height",
  "p": "padding", "pt": "padding-top", "pb": "padding-bottom",
  "pl": "padding-left", "pr": "padding-right",
  "px": ["padding-left", "padding-right"],
  "py": ["padding-top", "padding-bottom"],
  "m": "margin", "mt": "margin-top", "mb": "margin-bottom",
  "ml": "margin-left", "mr": "margin-right",
  "mx": ["margin-left", "margin-right"],
  "my": ["margin-top", "margin-bottom"],
  "top": "top", "right": "right", "bottom": "bottom", "left": "left",
  "inset": "inset",
  "gap": "gap", "gap-x": "column-gap", "gap-y": "row-gap",
  "text": "color", "bg": "background-color",
  "border": "border-width",
  "rounded": "border-radius",
  "opacity": "opacity",
  "z": "z-index",
  "basis": "flex-basis",
  "tracking": "letter-spacing",
  "leading": "line-height",
  "indent": "text-indent",
};

function resolveArbitraryValue(prefix: string, value: string): CSSDeclaration | null {
  const prop = arbitraryPropertyMap[prefix];
  if (!prop) return null;

  // Clean the value (remove underscores as spaces, like Tailwind)
  const cleanValue = value.replace(/_/g, " ");

  if (Array.isArray(prop)) {
    const decl: CSSDeclaration = {};
    for (const p of prop) {
      decl[p] = cleanValue;
    }
    return decl;
  }

  return { [prop]: cleanValue };
}

// ──────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────

/**
 * Generate CSS for a single class name.
 * Supports responsive, state, dark, media, and arbitrary value variants.
 */
export function generateCSSForClass(
  className: string,
  options: GeneratorOptions = {},
): GeneratedRule | null {
  const cacheKey = `${options.important ? "!" : ""}${options.prefix ?? ""}${options.minify ? "m" : ""}${options.darkMode ?? ""}${options.autoResponsive ? "ar" : ""}:${className}`;
  if (classCache.has(cacheKey)) {
    return classCache.get(cacheKey)!;
  }

  const parsed = parseClassName(className);
  const useImportant = parsed.important || options.important;
  const effectiveOptions = useImportant !== options.important
    ? { ...options, important: useImportant }
    : options;

  // Match the base utility against rules
  let decl: CSSDeclaration | null = null;
  let matchedRule: Rule | null = null;

  for (const rule of rules) {
    const match = parsed.utility.match(rule.pattern);
    if (match) {
      decl = rule.handler(match);
      if (decl) {
        matchedRule = rule;
        break;
      }
    }
  }

  // Fallback: try arbitrary value syntax [value]
  if (!decl) {
    const arbitraryMatch = parsed.utility.match(/^([\w-]+)-\[(.+)\]$/);
    if (arbitraryMatch) {
      decl = resolveArbitraryValue(arbitraryMatch[1], arbitraryMatch[2]);
    }
  }

  if (!decl) {
    classCache.set(cacheKey, null);
    return null;
  }

  // Auto-responsive: replace fixed font-size with a fluid clamp() value
  if (options.autoResponsive && "font-size" in decl) {
    const rawSize = String(decl["font-size"]);
    decl = { ...decl, "font-size": applyFluidFontSize(rawSize) };
  }

  // Build the selector
  const prefix = options.prefix ?? "";
  const escapedClassName = escapeClassName(className);
  let selector = `.${prefix}${escapedClassName}`;

  // Append state pseudo-class/element
  if (parsed.state && stateVariants[parsed.state]) {
    selector += stateVariants[parsed.state];
  }

  // Append selector suffix (e.g., " > * + *" for space-between/divide)
  if (matchedRule?.selectorSuffix) {
    selector += matchedRule.selectorSuffix;
  }

  // Dark mode: wrap selector
  if (parsed.dark) {
    const darkMode = options.darkMode ?? "media";
    if (darkMode === "class") {
      selector = `.dark ${selector}`;
    }
  }

  // Build CSS string
  let css = toCSSString(selector, decl, effectiveOptions);

  // Wrap in dark mode media query
  if (parsed.dark && (options.darkMode ?? "media") === "media") {
    if (options.minify) {
      css = `@media(prefers-color-scheme:dark){${css}}`;
    } else {
      const indentedCss = css.split("\n").map((line) => `  ${line}`).join("\n");
      css = `@media (prefers-color-scheme: dark) {\n${indentedCss}\n}`;
    }
  }

  // Wrap in media variant query (print, motion-safe, etc.)
  if (parsed.media && mediaVariants[parsed.media]) {
    const mediaQuery = mediaVariants[parsed.media];
    if (options.minify) {
      css = `@media ${mediaQuery}{${css}}`;
    } else {
      const indentedCss = css.split("\n").map((line) => `  ${line}`).join("\n");
      css = `@media ${mediaQuery} {\n${indentedCss}\n}`;
    }
  }

  // Wrap in responsive media query
  if (parsed.responsive && breakpoints[parsed.responsive]) {
    const bp = breakpoints[parsed.responsive];
    if (options.minify) {
      css = `@media(min-width:${bp}){${css}}`;
    } else {
      const indentedCss = css.split("\n").map((line) => `  ${line}`).join("\n");
      css = `@media (min-width: ${bp}) {\n${indentedCss}\n}`;
    }
  }

  const result: GeneratedRule = { className, css };
  if (matchedRule?.keyframes) {
    result.keyframes = matchedRule.keyframes;
  }
  classCache.set(cacheKey, result);
  return result;
}

/**
 * Generate CSS for multiple class names.
 * Deduplicates, maintains insertion order, collects keyframes.
 */
export function generateCSS(
  classNames: Set<string> | string[],
  options: GeneratorOptions = {},
): string {
  const seen = new Set<string>();
  const baseOutput: string[] = [];
  const responsiveOutput: Map<string, string[]> = new Map();
  const keyframesSet = new Set<string>();

  for (const className of classNames) {
    if (seen.has(className)) continue;
    seen.add(className);

    const result = generateCSSForClass(className, options);
    if (!result) continue;

    // Collect keyframes
    if (result.keyframes) {
      keyframesSet.add(result.keyframes);
    }

    const parsed = parseClassName(className);
    if (parsed.responsive) {
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
  const parts: string[] = [];

  // Prepend keyframes
  if (keyframesSet.size > 0) {
    parts.push(...keyframesSet);
  }

  parts.push(...baseOutput);

  // Append responsive rules grouped by breakpoint (mobile-first order)
  const breakpointOrder = ["sm", "md", "lg", "xl", "2xl"];
  for (const bp of breakpointOrder) {
    const bpRules = responsiveOutput.get(bp);
    if (bpRules) {
      parts.push(...bpRules);
    }
  }

  return parts.join(separator);
}
