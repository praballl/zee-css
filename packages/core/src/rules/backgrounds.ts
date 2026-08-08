import { Rule } from "./types";
import { resolveColor } from "./colors";

const gradientDirections: Record<string, string> = {
  "t": "to top",
  "tr": "to top right",
  "r": "to right",
  "br": "to bottom right",
  "b": "to bottom",
  "bl": "to bottom left",
  "l": "to left",
  "tl": "to top left",
};

export const backgroundRules: Rule[] = [
  // ───── Background repeat ─────
  { name: "bg-repeat", pattern: /^bg-repeat$/, handler: () => ({ "background-repeat": "repeat" }) },
  { name: "bg-no-repeat", pattern: /^bg-no-repeat$/, handler: () => ({ "background-repeat": "no-repeat" }) },
  { name: "bg-repeat-x", pattern: /^bg-repeat-x$/, handler: () => ({ "background-repeat": "repeat-x" }) },
  { name: "bg-repeat-y", pattern: /^bg-repeat-y$/, handler: () => ({ "background-repeat": "repeat-y" }) },
  { name: "bg-repeat-round", pattern: /^bg-repeat-round$/, handler: () => ({ "background-repeat": "round" }) },
  { name: "bg-repeat-space", pattern: /^bg-repeat-space$/, handler: () => ({ "background-repeat": "space" }) },

  // ───── Background size ─────
  { name: "bg-cover", pattern: /^bg-cover$/, handler: () => ({ "background-size": "cover" }) },
  { name: "bg-contain", pattern: /^bg-contain$/, handler: () => ({ "background-size": "contain" }) },
  { name: "bg-auto", pattern: /^bg-auto$/, handler: () => ({ "background-size": "auto" }) },

  // ───── Background position ─────
  { name: "bg-center", pattern: /^bg-center$/, handler: () => ({ "background-position": "center" }) },
  { name: "bg-top", pattern: /^bg-top$/, handler: () => ({ "background-position": "top" }) },
  { name: "bg-bottom", pattern: /^bg-bottom$/, handler: () => ({ "background-position": "bottom" }) },
  { name: "bg-left", pattern: /^bg-left$/, handler: () => ({ "background-position": "left" }) },
  { name: "bg-right", pattern: /^bg-right$/, handler: () => ({ "background-position": "right" }) },
  { name: "bg-left-top", pattern: /^bg-left-top$/, handler: () => ({ "background-position": "left top" }) },
  { name: "bg-left-bottom", pattern: /^bg-left-bottom$/, handler: () => ({ "background-position": "left bottom" }) },
  { name: "bg-right-top", pattern: /^bg-right-top$/, handler: () => ({ "background-position": "right top" }) },
  { name: "bg-right-bottom", pattern: /^bg-right-bottom$/, handler: () => ({ "background-position": "right bottom" }) },

  // ───── Background clip ─────
  { name: "bg-clip-border", pattern: /^bg-clip-border$/, handler: () => ({ "background-clip": "border-box" }) },
  { name: "bg-clip-padding", pattern: /^bg-clip-padding$/, handler: () => ({ "background-clip": "padding-box" }) },
  { name: "bg-clip-content", pattern: /^bg-clip-content$/, handler: () => ({ "background-clip": "content-box" }) },
  { name: "bg-clip-text", pattern: /^bg-clip-text$/, handler: () => ({
    "-webkit-background-clip": "text", "background-clip": "text",
  })},

  // ───── Background origin ─────
  { name: "bg-origin-border", pattern: /^bg-origin-border$/, handler: () => ({ "background-origin": "border-box" }) },
  { name: "bg-origin-padding", pattern: /^bg-origin-padding$/, handler: () => ({ "background-origin": "padding-box" }) },
  { name: "bg-origin-content", pattern: /^bg-origin-content$/, handler: () => ({ "background-origin": "content-box" }) },

  // ───── Background attachment ─────
  { name: "bg-fixed", pattern: /^bg-fixed$/, handler: () => ({ "background-attachment": "fixed" }) },
  { name: "bg-scroll", pattern: /^bg-scroll$/, handler: () => ({ "background-attachment": "scroll" }) },
  { name: "bg-local", pattern: /^bg-local$/, handler: () => ({ "background-attachment": "local" }) },

  // ───── Gradient direction ─────
  { name: "bg-gradient", pattern: /^bg-gradient-to-(t|tr|r|br|b|bl|l|tl)$/, handler: (m) => {
    const dir = gradientDirections[m[1]];
    return {
      "background-image": `linear-gradient(${dir}, var(--z-gradient-from, transparent), var(--z-gradient-via, var(--z-gradient-from, transparent)), var(--z-gradient-to, transparent))`,
    };
  }},

  // ───── Gradient color stops ─────
  { name: "from-color", pattern: /^from-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "--z-gradient-from": v };
  }},
  { name: "via-color", pattern: /^via-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "--z-gradient-via": v };
  }},
  { name: "to-color", pattern: /^to-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "--z-gradient-to": v };
  }},

  // ───── Background color (dynamic — catch-all, MUST be last bg- rule) ─────
  { name: "bg-color", pattern: /^bg-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "background-color": v };
  }},
];
