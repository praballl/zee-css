import { Rule, CSSDeclaration } from "./types";
import { resolveColor } from "./colors";
import { fontSizeScale, fontWeightScale, lineHeightScale, letterSpacingScale, pxToRem, resolveSpacing } from "./scales";

export const typographyRules: Rule[] = [
  // ───── Text alignment (must come before text-color) ─────
  { name: "text-align", pattern: /^text-(left|center|right|justify)$/, handler: (m) => {
    return { "text-align": m[1] };
  }},
  { name: "text-start", pattern: /^text-start$/, handler: () => ({ "text-align": "start" }) },
  { name: "text-end", pattern: /^text-end$/, handler: () => ({ "text-align": "end" }) },

  // ───── Material Design typography scale (Quasar-style) ─────
  { name: "text-h1", pattern: /^text-h1$/, handler: () => ({
    "font-size": "6rem", "font-weight": "300", "line-height": "1.167", "letter-spacing": "-0.01562em",
  })},
  { name: "text-h2", pattern: /^text-h2$/, handler: () => ({
    "font-size": "3.75rem", "font-weight": "300", "line-height": "1.2", "letter-spacing": "-0.00833em",
  })},
  { name: "text-h3", pattern: /^text-h3$/, handler: () => ({
    "font-size": "3rem", "font-weight": "400", "line-height": "1.167", "letter-spacing": "0em",
  })},
  { name: "text-h4", pattern: /^text-h4$/, handler: () => ({
    "font-size": "2.125rem", "font-weight": "400", "line-height": "1.235", "letter-spacing": "0.00735em",
  })},
  { name: "text-h5", pattern: /^text-h5$/, handler: () => ({
    "font-size": "1.5rem", "font-weight": "400", "line-height": "1.334", "letter-spacing": "0em",
  })},
  { name: "text-h6", pattern: /^text-h6$/, handler: () => ({
    "font-size": "1.25rem", "font-weight": "500", "line-height": "1.6", "letter-spacing": "0.0075em",
  })},
  { name: "text-subtitle1", pattern: /^text-subtitle1$/, handler: () => ({
    "font-size": "1rem", "font-weight": "400", "line-height": "1.75", "letter-spacing": "0.00938em",
  })},
  { name: "text-subtitle2", pattern: /^text-subtitle2$/, handler: () => ({
    "font-size": "0.875rem", "font-weight": "500", "line-height": "1.57", "letter-spacing": "0.00714em",
  })},
  { name: "text-body1", pattern: /^text-body1$/, handler: () => ({
    "font-size": "1rem", "font-weight": "400", "line-height": "1.5", "letter-spacing": "0.00938em",
  })},
  { name: "text-body2", pattern: /^text-body2$/, handler: () => ({
    "font-size": "0.875rem", "font-weight": "400", "line-height": "1.43", "letter-spacing": "0.01071em",
  })},
  { name: "text-caption", pattern: /^text-caption$/, handler: () => ({
    "font-size": "0.75rem", "font-weight": "400", "line-height": "1.66", "letter-spacing": "0.03333em",
  })},
  { name: "text-overline", pattern: /^text-overline$/, handler: () => ({
    "font-size": "0.75rem", "font-weight": "400", "line-height": "2.66", "letter-spacing": "0.08333em", "text-transform": "uppercase",
  })},

  // ───── Text color (dynamic — catch-all, must be after specific text-* rules) ─────
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

  // ───── Font size in px ─────
  { name: "font-size-weight", pattern: /^font-(\d{2,3})(?:-(\d))?$/, handler: (m) => {
    const size = parseInt(m[1], 10);
    if (size < 8 || size > 999) return null;
    const decl: CSSDeclaration = { "font-size": pxToRem(size) };
    if (m[2]) {
      const weightDigit = parseInt(m[2], 10);
      if (weightDigit >= 1 && weightDigit <= 9) {
        decl["font-weight"] = weightDigit * 100;
      }
    }
    return decl;
  }},

  // ───── Font family ─────
  { name: "font-sans", pattern: /^font-sans$/, handler: () => ({
    "font-family": 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  })},
  { name: "font-serif", pattern: /^font-serif$/, handler: () => ({
    "font-family": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  })},
  { name: "font-mono", pattern: /^font-mono$/, handler: () => ({
    "font-family": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  })},

  // ───── Line height ─────
  { name: "line-height", pattern: /^leading-(none|tight|snug|normal|relaxed|loose)$/, handler: (m) => {
    return { "line-height": lineHeightScale[m[1]] };
  }},
  { name: "line-height-num", pattern: /^leading-(\d+)$/, handler: (m) => {
    return { "line-height": `${parseInt(m[1], 10) / 4}rem` };
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
    overflow: "hidden", "text-overflow": "ellipsis", "white-space": "nowrap",
  })},
  { name: "text-ellipsis", pattern: /^text-ellipsis$/, handler: () => ({ "text-overflow": "ellipsis" }) },
  { name: "text-clip", pattern: /^text-clip$/, handler: () => ({ "text-overflow": "clip" }) },

  // ───── Whitespace ─────
  { name: "whitespace", pattern: /^whitespace-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)$/, handler: (m) => {
    return { "white-space": m[1] };
  }},

  // ───── Word break ─────
  { name: "break-normal", pattern: /^break-normal$/, handler: () => ({
    "overflow-wrap": "normal", "word-break": "normal",
  })},
  { name: "break-words", pattern: /^break-words$/, handler: () => ({ "overflow-wrap": "break-word" }) },
  { name: "break-all", pattern: /^break-all$/, handler: () => ({ "word-break": "break-all" }) },
  { name: "break-keep", pattern: /^break-keep$/, handler: () => ({ "word-break": "keep-all" }) },

  // ───── Vertical alignment ─────
  { name: "align-top", pattern: /^align-top$/, handler: () => ({ "vertical-align": "top" }) },
  { name: "align-middle", pattern: /^align-middle$/, handler: () => ({ "vertical-align": "middle" }) },
  { name: "align-bottom", pattern: /^align-bottom$/, handler: () => ({ "vertical-align": "bottom" }) },
  { name: "align-baseline", pattern: /^align-baseline$/, handler: () => ({ "vertical-align": "baseline" }) },
  { name: "align-text-top", pattern: /^align-text-top$/, handler: () => ({ "vertical-align": "text-top" }) },
  { name: "align-text-bottom", pattern: /^align-text-bottom$/, handler: () => ({ "vertical-align": "text-bottom" }) },
  { name: "align-sub", pattern: /^align-sub$/, handler: () => ({ "vertical-align": "sub" }) },
  { name: "align-super", pattern: /^align-super$/, handler: () => ({ "vertical-align": "super" }) },

  // ───── List style ─────
  { name: "list-none", pattern: /^list-none$/, handler: () => ({ "list-style-type": "none" }) },
  { name: "list-disc", pattern: /^list-disc$/, handler: () => ({ "list-style-type": "disc" }) },
  { name: "list-decimal", pattern: /^list-decimal$/, handler: () => ({ "list-style-type": "decimal" }) },
  { name: "list-inside", pattern: /^list-inside$/, handler: () => ({ "list-style-position": "inside" }) },
  { name: "list-outside", pattern: /^list-outside$/, handler: () => ({ "list-style-position": "outside" }) },

  // ───── Text indent ─────
  { name: "indent", pattern: /^indent-(\d+)$/, handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "text-indent": v };
  }},

  // ───── Content ─────
  { name: "content-none", pattern: /^content-none$/, handler: () => ({ content: "none" }) },
];
