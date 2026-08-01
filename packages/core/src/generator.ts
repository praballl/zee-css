import { rules, CSSDeclaration } from "./rules";

export interface GeneratedRule {
  className: string;
  css: string;
}

function toCSSString(className: string, decl: CSSDeclaration): string {
  const body = Object.entries(decl)
    .map(([prop, value]) => `  ${prop}: ${value} !important;`)
    .join("\n");

  // escape characters like ":" in "md:pa-10" so it's valid CSS selector
  const escapedClassName = className.replace(/[:.]/g, "\\$&");

  return `.${escapedClassName} {\n${body}\n}`;
}

export function generateCSSForClass(className: string): GeneratedRule | null {
  for (const rule of rules) {
    const match = className.match(rule.pattern);
    if (match) {
      const decl = rule.handler(match);
      if (!decl) continue;
      return {
        className,
        css: toCSSString(className, decl),
      };
    }
  }
  return null;
}

export function generateCSS(classNames: Set<string> | string[]): string {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const className of classNames) {
    if (seen.has(className)) continue;
    seen.add(className);

    const result = generateCSSForClass(className);
    if (result) {
      output.push(result.css);
    }
  }

  return output.join("\n\n");
}