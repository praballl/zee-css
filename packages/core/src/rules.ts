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
};

function resolveSpacing(key: string): string | null {
  return spacingScale[key] ?? null;
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
  { name: "padding-all", pattern: /^pa-(\d+)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { padding: v };
  }},
  { name: "padding-top", pattern: /^pt-(\d+)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-top": v };
  }},
  { name: "padding-bottom", pattern: /^pb-(\d+)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-bottom": v };
  }},
  { name: "padding-left", pattern: /^pl-(\d+)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-left": v };
  }},
  { name: "padding-right", pattern: /^pr-(\d+)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-right": v };
  }},

  // --- Margin ---
  { name: "margin-all", pattern: /^ma-(\d+)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { margin: v };
  }},
  { name: "margin-top", pattern: /^mt-(\d+)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-top": v };
  }},
  { name: "margin-bottom", pattern: /^mb-(\d+)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-bottom": v };
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

  // --- Text alignment ---
  { name: "text-align", pattern: /^text-(left|center|right|justify)$/, handler: (m) => {
    return { "text-align": m[1] };
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
];