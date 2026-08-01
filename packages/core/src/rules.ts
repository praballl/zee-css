export interface CSSDeclaration {
  [property: string]: string | number;
}

export type RuleHandler = (match: RegExpMatchArray) => CSSDeclaration | null;

export interface Rule {
  name: string;
  pattern: RegExp;
  handler: RuleHandler;
}

// --- Spacing scale, in rem (rem = px / 16) ---
const spacingScale: Record<string, string> = {
  "0": "0rem",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
};

// Additional descriptive spacing names
const spacingNames: Record<string, string> = {
  "xs": "0.25rem",
  "sm": "0.5rem",
  "md": "1rem",
  "lg": "1.5rem",
  "xl": "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
  "4xl": "4rem",
};

function resolveSpacing(key: string): string | null {
  return spacingScale[key] ?? spacingNames[key] ?? null;
}

// --- Color scale using CSS custom properties ---
export const colorScale: Record<string, string> = {
  "primary": "var(--z-primary)",
  "secondary": "var(--z-secondary)",
  "accent": "var(--z-accent)",
  "positive": "var(--z-positive)",
  "negative": "var(--z-negative)",
  "info": "var(--z-info)",
  "warning": "var(--z-warning)",
};

export function resolveColor(key: string): string | null {
  return colorScale[key] ?? null;
}

// Allow users to add custom colors
export function addColor(name: string, value: string): void {
  colorScale[name] = value;
}

// Allow users to override existing colors
export function setColor(name: string, value: string): void {
  colorScale[name] = value;
}

// --- 12-column grid math ---
function resolveColumnWidth(n: number): string {
  const percent = (n / 12) * 100;
  return `${parseFloat(percent.toFixed(4))}%`;
}

// px -> rem conversion (16px = 1rem baseline)
function pxToRem(px: number): string {
  return `${parseFloat((px / 16).toFixed(4))}rem`;
}

// --- Sizing scale ---
const sizingScale: Record<string, string> = {
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
  "auto": "auto",
  "full": "100%",
  "screen": "100vw",
};

function resolveSizing(key: string): string | null {
  return sizingScale[key] ?? null;
}

// --- Typography scale ---
const fontSizeScale: Record<string, string> = {
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

function resolveFontSize(key: string): string | null {
  return fontSizeScale[key] ?? null;
}

// --- Effects scale ---
const opacityScale: Record<string, string> = {
  "0": "0",
  "10": "0.1",
  "20": "0.2",
  "30": "0.3",
  "40": "0.4",
  "50": "0.5",
  "60": "0.6",
  "70": "0.7",
  "80": "0.8",
  "90": "0.9",
  "100": "1",
};

function resolveOpacity(key: string): string | null {
  return opacityScale[key] ?? null;
}

const shadowScale: Record<string, string> = {
  "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "default": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  "none": "0 0 #0000",
};

function resolveShadow(key: string): string | null {
  return shadowScale[key] ?? null;
}

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

export const rules: Rule[] = [
  // --- Padding ---
  { name: "padding-all", pattern: /^pa-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { padding: v };
  }},
  { name: "padding-top", pattern: /^pt-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-top": v };
  }},
  { name: "padding-bottom", pattern: /^pb-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-bottom": v };
  }},
  { name: "padding-left", pattern: /^pl-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-left": v };
  }},
  { name: "padding-right", pattern: /^pr-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-right": v };
  }},
  // Horizontal padding (left + right)
  { name: "padding-x", pattern: /^px-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-left": v, "padding-right": v };
  }},
  // Vertical padding (top + bottom)
  { name: "padding-y", pattern: /^py-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-top": v, "padding-bottom": v };
  }},

  // --- Margin ---
  { name: "margin-all", pattern: /^ma-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl|auto)$/, handler: (m) => {
    if (m[1] === "auto") return { margin: "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { margin: v };
  }},
  { name: "margin-top", pattern: /^mt-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl|auto)$/, handler: (m) => {
    if (m[1] === "auto") return { "margin-top": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-top": v };
  }},
  { name: "margin-bottom", pattern: /^mb-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl|auto)$/, handler: (m) => {
    if (m[1] === "auto") return { "margin-bottom": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-bottom": v };
  }},
  { name: "margin-left", pattern: /^ml-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl|auto)$/, handler: (m) => {
    if (m[1] === "auto") return { "margin-left": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-left": v };
  }},
  { name: "margin-right", pattern: /^mr-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl|auto)$/, handler: (m) => {
    if (m[1] === "auto") return { "margin-right": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-right": v };
  }},
  // Horizontal margin (left + right)
  { name: "margin-x", pattern: /^mx-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl|auto)$/, handler: (m) => {
    if (m[1] === "auto") return { "margin-left": "auto", "margin-right": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-left": v, "margin-right": v };
  }},
  // Vertical margin (top + bottom)
  { name: "margin-y", pattern: /^my-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl|auto)$/, handler: (m) => {
    if (m[1] === "auto") return { "margin-top": "auto", "margin-bottom": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-top": v, "margin-bottom": v };
  }},

  // --- Flex container direction ---
  { name: "flex-direction", pattern: /^(row|column)$/, handler: (m) => {
    return { display: "flex", "flex-direction": m[1] };
  }},

  // --- Flex grow/shrink/basis shorthand: flex-1, flex-2 ... ---
  { name: "flex-n", pattern: /^flex-(\d)$/, handler: (m) => {
    return { flex: m[1] };
  }},

  // --- Flex alignment: items / justify / content / self ---
  { name: "align-items", pattern: /^items-(start|center|end|stretch|baseline)$/, handler: (m) => {
    return { "align-items": alignKeywordMap[m[1]] };
  }},
  { name: "justify-content", pattern: /^justify-(start|center|end|between|around|evenly)$/, handler: (m) => {
    return { "justify-content": alignKeywordMap[m[1]] };
  }},
  { name: "align-content", pattern: /^content-(start|center|end|between|around|stretch)$/, handler: (m) => {
    return { "align-content": alignKeywordMap[m[1]] };
  }},
  { name: "align-self", pattern: /^self-(start|center|end|stretch|baseline)$/, handler: (m) => {
    return { "align-self": alignKeywordMap[m[1]] };
  }},

  // --- 12-column grid ---
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
    return { "flex-grow": 1 };
  }},
  { name: "col-shrink", pattern: /^col-shrink$/, handler: () => {
    return { "flex-shrink": 1 };
  }},
  { name: "offset", pattern: /^offset-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 0 || n > 11) return null;
    return { "margin-left": resolveColumnWidth(n) };
  }},
  { name: "order", pattern: /^order-(\d{1,2})$/, handler: (m) => {
    return { order: parseInt(m[1], 10) };
  }},

  // --- Display ---
  { name: "display-block", pattern: /^block$/, handler: () => ({ display: "block" }) },
  { name: "display-inline-block", pattern: /^inline-block$/, handler: () => ({ display: "inline-block" }) },
  { name: "display-hidden", pattern: /^hidden$/, handler: () => ({ display: "none" }) },

  // --- Text alignment (must come before text-color to match first) ---
  { name: "text-align", pattern: /^text-(left|center|right|justify)$/, handler: (m) => {
    return { "text-align": m[1] };
  }},

  // --- Text color (specific color names only) ---
  { name: "text-color", pattern: /^text-(primary|secondary|accent|positive|negative|info|warning)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { color: v };
  }},

  // --- Text alignment (alternative naming to avoid conflicts) ---
  { name: "text-align-alt", pattern: /^(text-left|text-center|text-right|text-justify)$/, handler: (m) => {
    const align = m[1].replace("text-", "");
    return { "text-align": align };
  }},

  // --- Font size (+ optional weight shorthand: font-12, font-12-5) ---
  {
    name: "font-size-weight",
    pattern: /^font-(\d+)(?:-(\d))?$/,
    handler: (m) => {
      const size = parseInt(m[1], 10);
      if (size <= 0) return null;

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

  // --- Background color (specific color names only) ---
  { name: "bg-color", pattern: /^bg-(primary|secondary|accent|positive|negative|info|warning)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "background-color": v };
  }},

  // --- Border color (specific color names only) ---
  { name: "border-color", pattern: /^border-(primary|secondary|accent|positive|negative|info|warning)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "border-color": v };
  }},

  // --- Gap utilities ---
  { name: "gap", pattern: /^gap-(\d+|xs|sm|md|lg|xl|2xl|3xl|4xl)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { gap: v };
  }},

  // --- Sizing utilities ---
  // Width
  { name: "width", pattern: /^w-(\d+|auto|full|screen)$/, handler: (m) => {
    const v = resolveSizing(m[1]); if (!v) return null;
    return { width: v };
  }},
  // Height
  { name: "height", pattern: /^h-(\d+|auto|full|screen)$/, handler: (m) => {
    const v = resolveSizing(m[1]); if (!v) return null;
    return { height: v };
  }},
  // Min width
  { name: "min-width", pattern: /^min-w-(\d+|auto|full|screen)$/, handler: (m) => {
    const v = resolveSizing(m[1]); if (!v) return null;
    return { "min-width": v };
  }},
  // Max width
  { name: "max-width", pattern: /^max-w-(\d+|auto|full|screen)$/, handler: (m) => {
    const v = resolveSizing(m[1]); if (!v) return null;
    return { "max-width": v };
  }},
  // Min height
  { name: "min-height", pattern: /^min-h-(\d+|auto|full|screen)$/, handler: (m) => {
    const v = resolveSizing(m[1]); if (!v) return null;
    return { "min-height": v };
  }},
  // Max height
  { name: "max-height", pattern: /^max-h-(\d+|auto|full|screen)$/, handler: (m) => {
    const v = resolveSizing(m[1]); if (!v) return null;
    return { "max-height": v };
  }},

  // --- Typography utilities ---
  // Font size (using fs- prefix to avoid conflicts with text-align)
  { name: "font-size", pattern: /^fs-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/, handler: (m) => {
    const v = resolveFontSize(m[1]); if (!v) return null;
    return { "font-size": v };
  }},
  // Font weight
  { name: "font-weight", pattern: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/, handler: (m) => {
    const weights: Record<string, string> = {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    };
    return { "font-weight": weights[m[1]] };
  }},
  // Line height
  { name: "line-height", pattern: /^leading-(none|tight|snug|normal|relaxed|loose)$/, handler: (m) => {
    const lineHeights: Record<string, string> = {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    };
    return { "line-height": lineHeights[m[1]] };
  }},
  // Letter spacing
  { name: "letter-spacing", pattern: /^tracking-(tighter|tight|normal|wide|wider|widest)$/, handler: (m) => {
    const tracking: Record<string, string> = {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    };
    return { "letter-spacing": tracking[m[1]] };
  }},
  // Text transform
  { name: "text-transform", pattern: /^(uppercase|lowercase|capitalize)$/, handler: (m) => {
    return { "text-transform": m[1] };
  }},

  // --- Effects utilities ---
  // Opacity
  { name: "opacity", pattern: /^opacity-(0|10|20|30|40|50|60|70|80|90|100)$/, handler: (m) => {
    const v = resolveOpacity(m[1]); if (!v) return null;
    return { opacity: v };
  }},
  // Box shadow
  { name: "box-shadow", pattern: /^shadow-(sm|md|lg|xl|2xl|none)$/, handler: (m) => {
    const v = resolveShadow(m[1]); if (!v) return null;
    return { "box-shadow": v };
  }},
  // Default shadow (without suffix)
  { name: "box-shadow-default", pattern: /^shadow$/, handler: () => {
    return { "box-shadow": shadowScale.default };
  }},
  // Blur
  { name: "blur", pattern: /^blur-(none|sm|md|lg|xl|2xl|3xl)$/, handler: (m) => {
    const blurScale: Record<string, string> = {
      none: "0",
      sm: "4px",
      md: "8px",
      lg: "16px",
      xl: "24px",
      "2xl": "40px",
      "3xl": "64px",
    };
    return { filter: `blur(${blurScale[m[1]]})` };
  }},
  // Brightness
  { name: "brightness", pattern: /^brightness-(0|50|75|90|95|100|105|110|125|150|200)$/, handler: (m) => {
    return { filter: `brightness(${m[1]}%)` };
  }},
  // Grayscale
  { name: "grayscale", pattern: /^grayscale-(0|100)$/, handler: (m) => {
    return { filter: `grayscale(${m[1]}%)` };
  }},
  // Cursor
  { name: "cursor", pattern: /^cursor-(auto|default|pointer|wait|text|move|not-allowed)$/, handler: (m) => {
    return { cursor: m[1] };
  }},
  // Overflow
  { name: "overflow", pattern: /^overflow-(auto|hidden|scroll|visible)$/, handler: (m) => {
    return { overflow: m[1] };
  }},
  { name: "overflow-x", pattern: /^overflow-x-(auto|hidden|scroll|visible)$/, handler: (m) => {
    return { "overflow-x": m[1] };
  }},
  { name: "overflow-y", pattern: /^overflow-y-(auto|hidden|scroll|visible)$/, handler: (m) => {
    return { "overflow-y": m[1] };
  }},
  // Position
  { name: "position", pattern: /^(relative|absolute|fixed|sticky)$/, handler: (m) => {
    return { position: m[1] };
  }},
  // Z-index
  { name: "z-index", pattern: /^z-(0|10|20|30|40|50|auto)$/, handler: (m) => {
    if (m[1] === "auto") return { "z-index": "auto" };
    return { "z-index": m[1] };
  }},
  // Border radius
  { name: "border-radius", pattern: /^rounded-(none|sm|md|lg|xl|2xl|3xl|full)$/, handler: (m) => {
    const radiusScale: Record<string, string> = {
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
    };
    return { "border-radius": radiusScale[m[1]] };
  }},
  // Border width
  { name: "border-width", pattern: /^border-(0|2|4|8)$/, handler: (m) => {
    return { "border-width": `${m[1]}px` };
  }},
  // Default border
  { name: "border", pattern: /^border$/, handler: () => {
    return { "border-width": "1px", "border-style": "solid" };
  }},
];
