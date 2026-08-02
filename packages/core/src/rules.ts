export interface CSSDeclaration {
  [property: string]: string | number;
}

export type RuleHandler = (match: RegExpMatchArray) => CSSDeclaration | null;

export interface Rule {
  name: string;
  pattern: RegExp;
  handler: RuleHandler;
}

// ──────────────────────────────────────────────
// Spacing scale (rem-based, 1rem = 16px)
// ──────────────────────────────────────────────
export const spacingScale: Record<string, string> = {
  "0": "0",
  "px": "1px",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
};

// Descriptive spacing aliases
export const spacingNames: Record<string, string> = {
  "xs": "0.25rem",
  "sm": "0.5rem",
  "md": "1rem",
  "lg": "1.5rem",
  "xl": "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
  "4xl": "4rem",
};

export function resolveSpacing(key: string): string | null {
  return spacingScale[key] ?? spacingNames[key] ?? null;
}

// ──────────────────────────────────────────────
// Sizing scale (extends spacing with keywords)
// ──────────────────────────────────────────────
const sizingKeywords: Record<string, string> = {
  "auto": "auto",
  "full": "100%",
  "screen": "100vw",
  "min": "min-content",
  "max": "max-content",
  "fit": "fit-content",
};

const sizingScreenHeight: Record<string, string> = {
  "auto": "auto",
  "full": "100%",
  "screen": "100vh",
  "min": "min-content",
  "max": "max-content",
  "fit": "fit-content",
};

export function resolveSizing(key: string, dimension: "width" | "height" = "width"): string | null {
  if (dimension === "height") {
    return spacingScale[key] ?? sizingScreenHeight[key] ?? null;
  }
  return spacingScale[key] ?? sizingKeywords[key] ?? null;
}

// ──────────────────────────────────────────────
// Color scale (CSS custom properties)
// ──────────────────────────────────────────────
export const colorScale: Record<string, string> = {
  "primary": "var(--z-primary)",
  "secondary": "var(--z-secondary)",
  "accent": "var(--z-accent)",
  "positive": "var(--z-positive)",
  "negative": "var(--z-negative)",
  "info": "var(--z-info)",
  "warning": "var(--z-warning)",
  "white": "#ffffff",
  "black": "#000000",
  "transparent": "transparent",
  "current": "currentColor",
};

export function resolveColor(key: string): string | null {
  return colorScale[key] ?? null;
}

export function addColor(name: string, value: string): void {
  colorScale[name] = value;
}

export function setColor(name: string, value: string): void {
  colorScale[name] = value;
}

// ──────────────────────────────────────────────
// 12-column grid math
// ──────────────────────────────────────────────
function resolveColumnWidth(n: number): string {
  const percent = (n / 12) * 100;
  return `${parseFloat(percent.toFixed(4))}%`;
}

// px → rem conversion (16px = 1rem baseline)
function pxToRem(px: number): string {
  return `${parseFloat((px / 16).toFixed(4))}rem`;
}

// ──────────────────────────────────────────────
// Typography scales (hoisted to module level)
// ──────────────────────────────────────────────
export const fontSizeScale: Record<string, string> = {
  "xs": "0.75rem",
  "sm": "0.875rem",
  "base": "1rem",
  "lg": "1.125rem",
  "xl": "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};

export const fontWeightScale: Record<string, string> = {
  "thin": "100",
  "extralight": "200",
  "light": "300",
  "normal": "400",
  "medium": "500",
  "semibold": "600",
  "bold": "700",
  "extrabold": "800",
  "black": "900",
};

export const lineHeightScale: Record<string, string> = {
  "none": "1",
  "tight": "1.25",
  "snug": "1.375",
  "normal": "1.5",
  "relaxed": "1.625",
  "loose": "2",
};

export const letterSpacingScale: Record<string, string> = {
  "tighter": "-0.05em",
  "tight": "-0.025em",
  "normal": "0em",
  "wide": "0.025em",
  "wider": "0.05em",
  "widest": "0.1em",
};

// ──────────────────────────────────────────────
// Effects scales (hoisted to module level)
// ──────────────────────────────────────────────
export const opacityScale: Record<string, string> = {
  "0": "0",
  "5": "0.05",
  "10": "0.1",
  "15": "0.15",
  "20": "0.2",
  "25": "0.25",
  "30": "0.3",
  "35": "0.35",
  "40": "0.4",
  "45": "0.45",
  "50": "0.5",
  "55": "0.55",
  "60": "0.6",
  "65": "0.65",
  "70": "0.7",
  "75": "0.75",
  "80": "0.8",
  "85": "0.85",
  "90": "0.9",
  "95": "0.95",
  "100": "1",
};

export const shadowScale: Record<string, string> = {
  "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "default": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  "none": "0 0 #0000",
};

export const blurScale: Record<string, string> = {
  "none": "0",
  "sm": "4px",
  "default": "8px",
  "md": "12px",
  "lg": "16px",
  "xl": "24px",
  "2xl": "40px",
  "3xl": "64px",
};

export const borderRadiusScale: Record<string, string> = {
  "none": "0",
  "sm": "0.125rem",
  "default": "0.25rem",
  "md": "0.375rem",
  "lg": "0.5rem",
  "xl": "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  "full": "9999px",
};

// Maps shorthand alignment keywords to real CSS values
const alignKeywordMap: Record<string, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch",
  baseline: "baseline",
};

// ──────────────────────────────────────────────
// Responsive breakpoints
// ──────────────────────────────────────────────
export const breakpoints: Record<string, string> = {
  "sm": "640px",
  "md": "768px",
  "lg": "1024px",
  "xl": "1280px",
  "2xl": "1536px",
};

// ──────────────────────────────────────────────
// State variants
// ──────────────────────────────────────────────
export const stateVariants: Record<string, string> = {
  "hover": ":hover",
  "focus": ":focus",
  "focus-within": ":focus-within",
  "focus-visible": ":focus-visible",
  "active": ":active",
  "visited": ":visited",
  "disabled": ":disabled",
  "first": ":first-child",
  "last": ":last-child",
  "odd": ":nth-child(odd)",
  "even": ":nth-child(even)",
  "placeholder": "::placeholder",
};

// Spacing pattern fragment (reusable across rules)
const SP = "\\d+(?:\\.\\d+)?|px|xs|sm|md|lg|xl|2xl|3xl|4xl";
const SP_AUTO = `${SP}|auto`;

// ──────────────────────────────────────────────
// Rule definitions
// ──────────────────────────────────────────────
export const rules: Rule[] = [
  // ───── Padding ─────
  { name: "padding-all", pattern: new RegExp(`^pa-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { padding: v };
  }},
  { name: "padding-top", pattern: new RegExp(`^pt-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-top": v };
  }},
  { name: "padding-bottom", pattern: new RegExp(`^pb-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-bottom": v };
  }},
  { name: "padding-left", pattern: new RegExp(`^pl-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-left": v };
  }},
  { name: "padding-right", pattern: new RegExp(`^pr-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-right": v };
  }},
  { name: "padding-x", pattern: new RegExp(`^px-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-left": v, "padding-right": v };
  }},
  { name: "padding-y", pattern: new RegExp(`^py-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-top": v, "padding-bottom": v };
  }},

  // ───── Margin (positive) ─────
  { name: "margin-all", pattern: new RegExp(`^ma-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { margin: "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { margin: v };
  }},
  { name: "margin-top", pattern: new RegExp(`^mt-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { "margin-top": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-top": v };
  }},
  { name: "margin-bottom", pattern: new RegExp(`^mb-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { "margin-bottom": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-bottom": v };
  }},
  { name: "margin-left", pattern: new RegExp(`^ml-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { "margin-left": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-left": v };
  }},
  { name: "margin-right", pattern: new RegExp(`^mr-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { "margin-right": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-right": v };
  }},
  { name: "margin-x", pattern: new RegExp(`^mx-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { "margin-left": "auto", "margin-right": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-left": v, "margin-right": v };
  }},
  { name: "margin-y", pattern: new RegExp(`^my-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { "margin-top": "auto", "margin-bottom": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-top": v, "margin-bottom": v };
  }},

  // ───── Negative margins ─────
  { name: "neg-margin-top", pattern: new RegExp(`^-mt-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-top": v === "0" ? "0" : `-${v}` };
  }},
  { name: "neg-margin-bottom", pattern: new RegExp(`^-mb-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-bottom": v === "0" ? "0" : `-${v}` };
  }},
  { name: "neg-margin-left", pattern: new RegExp(`^-ml-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-left": v === "0" ? "0" : `-${v}` };
  }},
  { name: "neg-margin-right", pattern: new RegExp(`^-mr-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-right": v === "0" ? "0" : `-${v}` };
  }},
  { name: "neg-margin-x", pattern: new RegExp(`^-mx-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    const neg = v === "0" ? "0" : `-${v}`;
    return { "margin-left": neg, "margin-right": neg };
  }},
  { name: "neg-margin-y", pattern: new RegExp(`^-my-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    const neg = v === "0" ? "0" : `-${v}`;
    return { "margin-top": neg, "margin-bottom": neg };
  }},

  // ───── Flex container ─────
  { name: "flex-direction", pattern: /^(row|column)$/, handler: (m) => {
    return { display: "flex", "flex-direction": m[1] };
  }},
  { name: "flex-row-reverse", pattern: /^row-reverse$/, handler: () => {
    return { display: "flex", "flex-direction": "row-reverse" };
  }},
  { name: "flex-col-reverse", pattern: /^column-reverse$/, handler: () => {
    return { display: "flex", "flex-direction": "column-reverse" };
  }},
  { name: "flex-wrap", pattern: /^flex-wrap$/, handler: () => {
    return { "flex-wrap": "wrap" };
  }},
  { name: "flex-nowrap", pattern: /^flex-nowrap$/, handler: () => {
    return { "flex-wrap": "nowrap" };
  }},
  { name: "flex-wrap-reverse", pattern: /^flex-wrap-reverse$/, handler: () => {
    return { "flex-wrap": "wrap-reverse" };
  }},

  // Flex grow/shrink/basis shorthand
  { name: "flex-n", pattern: /^flex-(\d)$/, handler: (m) => {
    return { flex: m[1] };
  }},
  { name: "flex-auto", pattern: /^flex-auto$/, handler: () => {
    return { flex: "1 1 auto" };
  }},
  { name: "flex-initial", pattern: /^flex-initial$/, handler: () => {
    return { flex: "0 1 auto" };
  }},
  { name: "flex-none", pattern: /^flex-none$/, handler: () => {
    return { flex: "none" };
  }},
  { name: "grow", pattern: /^grow$/, handler: () => {
    return { "flex-grow": "1" };
  }},
  { name: "grow-0", pattern: /^grow-0$/, handler: () => {
    return { "flex-grow": "0" };
  }},
  { name: "shrink", pattern: /^shrink$/, handler: () => {
    return { "flex-shrink": "1" };
  }},
  { name: "shrink-0", pattern: /^shrink-0$/, handler: () => {
    return { "flex-shrink": "0" };
  }},

  // Flex alignment
  { name: "align-items", pattern: /^items-(start|center|end|stretch|baseline)$/, handler: (m) => {
    return { "align-items": alignKeywordMap[m[1]] };
  }},
  { name: "justify-content", pattern: /^justify-(start|center|end|between|around|evenly)$/, handler: (m) => {
    return { "justify-content": alignKeywordMap[m[1]] };
  }},
  { name: "justify-items", pattern: /^justify-items-(start|center|end|stretch)$/, handler: (m) => {
    return { "justify-items": m[1] };
  }},
  { name: "align-content", pattern: /^content-(start|center|end|between|around|stretch)$/, handler: (m) => {
    return { "align-content": alignKeywordMap[m[1]] };
  }},
  { name: "align-self", pattern: /^self-(start|center|end|stretch|baseline)$/, handler: (m) => {
    return { "align-self": alignKeywordMap[m[1]] };
  }},
  { name: "justify-self", pattern: /^justify-self-(start|center|end|stretch|auto)$/, handler: (m) => {
    return { "justify-self": m[1] };
  }},
  { name: "place-items", pattern: /^place-items-(start|center|end|stretch|baseline)$/, handler: (m) => {
    return { "place-items": m[1] };
  }},
  { name: "place-content", pattern: /^place-content-(start|center|end|between|around|evenly|stretch)$/, handler: (m) => {
    return { "place-content": alignKeywordMap[m[1]] ?? m[1] };
  }},

  // ───── 12-column grid ─────
  { name: "grid-column", pattern: /^col-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 12) return null;
    const width = resolveColumnWidth(n);
    return { "flex-basis": width, "max-width": width };
  }},
  { name: "col-auto", pattern: /^col-auto$/, handler: () => {
    return { flex: "0 0 auto", "max-width": "100%" };
  }},
  { name: "col-grow", pattern: /^col-grow$/, handler: () => {
    return { "flex-grow": "1" };
  }},
  { name: "col-shrink", pattern: /^col-shrink$/, handler: () => {
    return { "flex-shrink": "1" };
  }},
  { name: "offset", pattern: /^offset-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 0 || n > 11) return null;
    return { "margin-left": resolveColumnWidth(n) };
  }},
  { name: "order", pattern: /^order-(\d{1,2})$/, handler: (m) => {
    return { order: parseInt(m[1], 10) };
  }},
  { name: "order-first", pattern: /^order-first$/, handler: () => ({ order: -9999 }) },
  { name: "order-last", pattern: /^order-last$/, handler: () => ({ order: 9999 }) },
  { name: "order-none", pattern: /^order-none$/, handler: () => ({ order: 0 }) },

  // ───── Display ─────
  { name: "display-flex", pattern: /^flex$/, handler: () => ({ display: "flex" }) },
  { name: "display-inline-flex", pattern: /^inline-flex$/, handler: () => ({ display: "inline-flex" }) },
  { name: "display-grid", pattern: /^grid$/, handler: () => ({ display: "grid" }) },
  { name: "display-inline-grid", pattern: /^inline-grid$/, handler: () => ({ display: "inline-grid" }) },
  { name: "display-block", pattern: /^block$/, handler: () => ({ display: "block" }) },
  { name: "display-inline-block", pattern: /^inline-block$/, handler: () => ({ display: "inline-block" }) },
  { name: "display-inline", pattern: /^inline$/, handler: () => ({ display: "inline" }) },
  { name: "display-hidden", pattern: /^hidden$/, handler: () => ({ display: "none" }) },
  { name: "display-contents", pattern: /^contents$/, handler: () => ({ display: "contents" }) },

  // ───── Text alignment (must come before text-color) ─────
  { name: "text-align", pattern: /^text-(left|center|right|justify)$/, handler: (m) => {
    return { "text-align": m[1] };
  }},

  // ───── Text color (dynamic — checks colorScale at runtime) ─────
  { name: "text-color", pattern: /^text-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { color: v };
  }},

  // ───── Font size (named sizes via fs- prefix) ─────
  { name: "font-size", pattern: /^fs-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/, handler: (m) => {
    const v = fontSizeScale[m[1]]; if (!v) return null;
    return { "font-size": v };
  }},

  // ───── Font weight (named weights) ─────
  { name: "font-weight", pattern: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/, handler: (m) => {
    return { "font-weight": fontWeightScale[m[1]] };
  }},

  // ───── Font size in px (+ optional weight shorthand) ─────
  // Only matches numeric px values 8-999, prevents collision with font-weight names
  {
    name: "font-size-weight",
    pattern: /^font-(\d{2,3})(?:-(\d))?$/,
    handler: (m) => {
      const size = parseInt(m[1], 10);
      if (size < 8 || size > 999) return null;

      const decl: CSSDeclaration = {
        "font-size": pxToRem(size),
      };

      if (m[2]) {
        const weightDigit = parseInt(m[2], 10);
        if (weightDigit >= 1 && weightDigit <= 9) {
          decl["font-weight"] = weightDigit * 100;
        }
      }

      return decl;
    },
  },

  // ───── Background color (dynamic) ─────
  { name: "bg-color", pattern: /^bg-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "background-color": v };
  }},

  // ───── Border color (dynamic) ─────
  { name: "border-color", pattern: /^border-([\w-]+)$/, handler: (m) => {
    // Exclude border width values
    if (/^\d+$/.test(m[1])) return null;
    const v = resolveColor(m[1]); if (!v) return null;
    return { "border-color": v };
  }},

  // ───── Gap utilities ─────
  { name: "gap", pattern: new RegExp(`^gap-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { gap: v };
  }},
  { name: "gap-x", pattern: new RegExp(`^gap-x-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "column-gap": v };
  }},
  { name: "gap-y", pattern: new RegExp(`^gap-y-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "row-gap": v };
  }},

  // ───── Width ─────
  { name: "width", pattern: /^w-([\w.]+)$/, handler: (m) => {
    const v = resolveSizing(m[1], "width"); if (!v) return null;
    return { width: v };
  }},
  { name: "min-width", pattern: /^min-w-([\w.]+)$/, handler: (m) => {
    const v = resolveSizing(m[1], "width"); if (!v) return null;
    return { "min-width": v };
  }},
  { name: "max-width", pattern: /^max-w-([\w.]+)$/, handler: (m) => {
    const v = resolveSizing(m[1], "width"); if (!v) return null;
    return { "max-width": v };
  }},

  // ───── Height ─────
  { name: "height", pattern: /^h-([\w.]+)$/, handler: (m) => {
    const v = resolveSizing(m[1], "height"); if (!v) return null;
    return { height: v };
  }},
  { name: "min-height", pattern: /^min-h-([\w.]+)$/, handler: (m) => {
    const v = resolveSizing(m[1], "height"); if (!v) return null;
    return { "min-height": v };
  }},
  { name: "max-height", pattern: /^max-h-([\w.]+)$/, handler: (m) => {
    const v = resolveSizing(m[1], "height"); if (!v) return null;
    return { "max-height": v };
  }},

  // ───── Line height ─────
  { name: "line-height", pattern: /^leading-(none|tight|snug|normal|relaxed|loose)$/, handler: (m) => {
    return { "line-height": lineHeightScale[m[1]] };
  }},

  // ───── Letter spacing ─────
  { name: "letter-spacing", pattern: /^tracking-(tighter|tight|normal|wide|wider|widest)$/, handler: (m) => {
    return { "letter-spacing": letterSpacingScale[m[1]] };
  }},

  // ───── Text transform ─────
  { name: "text-transform", pattern: /^(uppercase|lowercase|capitalize|normal-case)$/, handler: (m) => {
    if (m[1] === "normal-case") return { "text-transform": "none" };
    return { "text-transform": m[1] };
  }},

  // ───── Text decoration ─────
  { name: "text-decoration", pattern: /^(underline|overline|line-through|no-underline)$/, handler: (m) => {
    if (m[1] === "no-underline") return { "text-decoration": "none" };
    return { "text-decoration": m[1] };
  }},

  // ───── Font style ─────
  { name: "font-italic", pattern: /^italic$/, handler: () => ({ "font-style": "italic" }) },
  { name: "font-not-italic", pattern: /^not-italic$/, handler: () => ({ "font-style": "normal" }) },

  // ───── Text overflow ─────
  { name: "truncate", pattern: /^truncate$/, handler: () => ({
    overflow: "hidden",
    "text-overflow": "ellipsis",
    "white-space": "nowrap",
  })},
  { name: "text-ellipsis", pattern: /^text-ellipsis$/, handler: () => ({ "text-overflow": "ellipsis" }) },
  { name: "text-clip", pattern: /^text-clip$/, handler: () => ({ "text-overflow": "clip" }) },

  // ───── Whitespace ─────
  { name: "whitespace", pattern: /^whitespace-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)$/, handler: (m) => {
    return { "white-space": m[1] };
  }},

  // ───── Word break ─────
  { name: "break-normal", pattern: /^break-normal$/, handler: () => ({
    "overflow-wrap": "normal",
    "word-break": "normal",
  })},
  { name: "break-words", pattern: /^break-words$/, handler: () => ({ "overflow-wrap": "break-word" }) },
  { name: "break-all", pattern: /^break-all$/, handler: () => ({ "word-break": "break-all" }) },
  { name: "break-keep", pattern: /^break-keep$/, handler: () => ({ "word-break": "keep-all" }) },

  // ───── Opacity ─────
  { name: "opacity", pattern: /^opacity-(\d{1,3})$/, handler: (m) => {
    const v = opacityScale[m[1]]; if (!v) return null;
    return { opacity: v };
  }},

  // ───── Box shadow ─────
  { name: "box-shadow", pattern: /^shadow-(sm|md|lg|xl|2xl|inner|none)$/, handler: (m) => {
    const v = shadowScale[m[1]]; if (!v) return null;
    return { "box-shadow": v };
  }},
  { name: "box-shadow-default", pattern: /^shadow$/, handler: () => {
    return { "box-shadow": shadowScale["default"] };
  }},

  // ───── Blur ─────
  { name: "blur", pattern: /^blur-(none|sm|md|lg|xl|2xl|3xl)$/, handler: (m) => {
    return { filter: `blur(${blurScale[m[1]]})` };
  }},
  { name: "blur-default", pattern: /^blur$/, handler: () => {
    return { filter: `blur(${blurScale["default"]})` };
  }},

  // ───── Brightness ─────
  { name: "brightness", pattern: /^brightness-(0|50|75|90|95|100|105|110|125|150|200)$/, handler: (m) => {
    return { filter: `brightness(${m[1]}%)` };
  }},

  // ───── Grayscale ─────
  { name: "grayscale", pattern: /^grayscale-(0|100)$/, handler: (m) => {
    return { filter: `grayscale(${m[1]}%)` };
  }},
  { name: "grayscale-default", pattern: /^grayscale$/, handler: () => {
    return { filter: "grayscale(100%)" };
  }},

  // ───── Cursor ─────
  { name: "cursor", pattern: /^cursor-(auto|default|pointer|wait|text|move|not-allowed|grab|grabbing|crosshair|help|none)$/, handler: (m) => {
    return { cursor: m[1] };
  }},

  // ───── Overflow ─────
  { name: "overflow", pattern: /^overflow-(auto|hidden|scroll|visible|clip)$/, handler: (m) => {
    return { overflow: m[1] };
  }},
  { name: "overflow-x", pattern: /^overflow-x-(auto|hidden|scroll|visible|clip)$/, handler: (m) => {
    return { "overflow-x": m[1] };
  }},
  { name: "overflow-y", pattern: /^overflow-y-(auto|hidden|scroll|visible|clip)$/, handler: (m) => {
    return { "overflow-y": m[1] };
  }},

  // ───── Position ─────
  { name: "position", pattern: /^(relative|absolute|fixed|sticky|static)$/, handler: (m) => {
    return { position: m[1] };
  }},

  // ───── Inset (top/right/bottom/left) ─────
  { name: "inset", pattern: new RegExp(`^inset-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { inset: "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { inset: v };
  }},
  { name: "top", pattern: new RegExp(`^top-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { top: "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { top: v };
  }},
  { name: "right", pattern: new RegExp(`^right-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { right: "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { right: v };
  }},
  { name: "bottom", pattern: new RegExp(`^bottom-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { bottom: "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { bottom: v };
  }},
  { name: "left", pattern: new RegExp(`^left-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { left: "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { left: v };
  }},

  // ───── Z-index ─────
  { name: "z-index", pattern: /^z-(0|10|20|30|40|50|auto)$/, handler: (m) => {
    if (m[1] === "auto") return { "z-index": "auto" };
    return { "z-index": m[1] };
  }},

  // ───── Border radius ─────
  { name: "border-radius", pattern: /^rounded-(none|sm|md|lg|xl|2xl|3xl|full)$/, handler: (m) => {
    return { "border-radius": borderRadiusScale[m[1]] };
  }},
  { name: "border-radius-default", pattern: /^rounded$/, handler: () => {
    return { "border-radius": borderRadiusScale["default"] };
  }},
  { name: "border-radius-t", pattern: /^rounded-t-(none|sm|md|lg|xl|2xl|3xl|full)$/, handler: (m) => {
    const v = borderRadiusScale[m[1]];
    return { "border-top-left-radius": v, "border-top-right-radius": v };
  }},
  { name: "border-radius-b", pattern: /^rounded-b-(none|sm|md|lg|xl|2xl|3xl|full)$/, handler: (m) => {
    const v = borderRadiusScale[m[1]];
    return { "border-bottom-left-radius": v, "border-bottom-right-radius": v };
  }},
  { name: "border-radius-l", pattern: /^rounded-l-(none|sm|md|lg|xl|2xl|3xl|full)$/, handler: (m) => {
    const v = borderRadiusScale[m[1]];
    return { "border-top-left-radius": v, "border-bottom-left-radius": v };
  }},
  { name: "border-radius-r", pattern: /^rounded-r-(none|sm|md|lg|xl|2xl|3xl|full)$/, handler: (m) => {
    const v = borderRadiusScale[m[1]];
    return { "border-top-right-radius": v, "border-bottom-right-radius": v };
  }},

  // ───── Border width ─────
  { name: "border-width", pattern: /^border-(0|2|4|8)$/, handler: (m) => {
    return { "border-width": `${m[1]}px`, "border-style": "solid" };
  }},
  { name: "border", pattern: /^border$/, handler: () => {
    return { "border-width": "1px", "border-style": "solid" };
  }},
  { name: "border-t", pattern: /^border-t$/, handler: () => {
    return { "border-top-width": "1px", "border-top-style": "solid" };
  }},
  { name: "border-b", pattern: /^border-b$/, handler: () => {
    return { "border-bottom-width": "1px", "border-bottom-style": "solid" };
  }},
  { name: "border-l", pattern: /^border-l$/, handler: () => {
    return { "border-left-width": "1px", "border-left-style": "solid" };
  }},
  { name: "border-r", pattern: /^border-r$/, handler: () => {
    return { "border-right-width": "1px", "border-right-style": "solid" };
  }},
  { name: "border-none", pattern: /^border-none$/, handler: () => {
    return { "border-style": "none" };
  }},

  // ───── Border style ─────
  { name: "border-style", pattern: /^border-(solid|dashed|dotted|double|hidden)$/, handler: (m) => {
    return { "border-style": m[1] };
  }},

  // ───── Transition ─────
  { name: "transition", pattern: /^transition$/, handler: () => ({
    "transition-property": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transition-duration": "150ms",
  })},
  { name: "transition-all", pattern: /^transition-all$/, handler: () => ({
    "transition-property": "all",
    "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transition-duration": "150ms",
  })},
  { name: "transition-colors", pattern: /^transition-colors$/, handler: () => ({
    "transition-property": "color, background-color, border-color, text-decoration-color, fill, stroke",
    "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transition-duration": "150ms",
  })},
  { name: "transition-opacity", pattern: /^transition-opacity$/, handler: () => ({
    "transition-property": "opacity",
    "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transition-duration": "150ms",
  })},
  { name: "transition-shadow", pattern: /^transition-shadow$/, handler: () => ({
    "transition-property": "box-shadow",
    "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transition-duration": "150ms",
  })},
  { name: "transition-transform", pattern: /^transition-transform$/, handler: () => ({
    "transition-property": "transform",
    "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transition-duration": "150ms",
  })},
  { name: "transition-none", pattern: /^transition-none$/, handler: () => ({
    "transition-property": "none",
  })},

  // ───── Duration ─────
  { name: "duration", pattern: /^duration-(\d+)$/, handler: (m) => {
    return { "transition-duration": `${m[1]}ms` };
  }},

  // ───── Easing ─────
  { name: "ease-linear", pattern: /^ease-linear$/, handler: () => ({
    "transition-timing-function": "linear",
  })},
  { name: "ease-in", pattern: /^ease-in$/, handler: () => ({
    "transition-timing-function": "cubic-bezier(0.4, 0, 1, 1)",
  })},
  { name: "ease-out", pattern: /^ease-out$/, handler: () => ({
    "transition-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
  })},
  { name: "ease-in-out", pattern: /^ease-in-out$/, handler: () => ({
    "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
  })},

  // ───── Transform ─────
  { name: "scale", pattern: /^scale-(\d+)$/, handler: (m) => {
    const v = parseInt(m[1], 10);
    return { transform: `scale(${v / 100})` };
  }},
  { name: "rotate", pattern: /^rotate-(\d+)$/, handler: (m) => {
    return { transform: `rotate(${m[1]}deg)` };
  }},
  { name: "translate-x", pattern: new RegExp(`^translate-x-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { transform: `translateX(${v})` };
  }},
  { name: "translate-y", pattern: new RegExp(`^translate-y-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { transform: `translateY(${v})` };
  }},

  // ───── Pointer events ─────
  { name: "pointer-events-none", pattern: /^pointer-events-none$/, handler: () => ({
    "pointer-events": "none",
  })},
  { name: "pointer-events-auto", pattern: /^pointer-events-auto$/, handler: () => ({
    "pointer-events": "auto",
  })},

  // ───── User select ─────
  { name: "select-none", pattern: /^select-none$/, handler: () => ({ "user-select": "none" }) },
  { name: "select-text", pattern: /^select-text$/, handler: () => ({ "user-select": "text" }) },
  { name: "select-all", pattern: /^select-all$/, handler: () => ({ "user-select": "all" }) },
  { name: "select-auto", pattern: /^select-auto$/, handler: () => ({ "user-select": "auto" }) },

  // ───── Visibility ─────
  { name: "visible", pattern: /^visible$/, handler: () => ({ visibility: "visible" }) },
  { name: "invisible", pattern: /^invisible$/, handler: () => ({ visibility: "hidden" }) },

  // ───── Aspect ratio ─────
  { name: "aspect-auto", pattern: /^aspect-auto$/, handler: () => ({ "aspect-ratio": "auto" }) },
  { name: "aspect-square", pattern: /^aspect-square$/, handler: () => ({ "aspect-ratio": "1 / 1" }) },
  { name: "aspect-video", pattern: /^aspect-video$/, handler: () => ({ "aspect-ratio": "16 / 9" }) },

  // ───── Object fit ─────
  { name: "object-fit", pattern: /^object-(contain|cover|fill|none|scale-down)$/, handler: (m) => {
    return { "object-fit": m[1] };
  }},

  // ───── List style ─────
  { name: "list-none", pattern: /^list-none$/, handler: () => ({ "list-style-type": "none" }) },
  { name: "list-disc", pattern: /^list-disc$/, handler: () => ({ "list-style-type": "disc" }) },
  { name: "list-decimal", pattern: /^list-decimal$/, handler: () => ({ "list-style-type": "decimal" }) },

  // ───── Appearance ─────
  { name: "appearance-none", pattern: /^appearance-none$/, handler: () => ({ appearance: "none" }) },

  // ───── Outline ─────
  { name: "outline-none", pattern: /^outline-none$/, handler: () => ({
    outline: "2px solid transparent",
    "outline-offset": "2px",
  })},
  { name: "outline", pattern: /^outline$/, handler: () => ({
    "outline-style": "solid",
  })},

  // ───── Screen reader utilities ─────
  { name: "sr-only", pattern: /^sr-only$/, handler: () => ({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    "white-space": "nowrap",
    "border-width": "0",
  })},
  { name: "not-sr-only", pattern: /^not-sr-only$/, handler: () => ({
    position: "static",
    width: "auto",
    height: "auto",
    padding: "0",
    margin: "0",
    overflow: "visible",
    clip: "auto",
    "white-space": "normal",
  })},
];
