import { Rule } from "./types";
import { resolveColor } from "./colors";
import { resolveSpacing, SP } from "./scales";

export const interactivityRules: Rule[] = [
  // ───── Cursor ─────
  { name: "cursor", pattern: /^cursor-(auto|default|pointer|wait|text|move|not-allowed|grab|grabbing|crosshair|help|none|context-menu|progress|cell|copy|alias|no-drop|all-scroll|col-resize|row-resize|n-resize|e-resize|s-resize|w-resize|ne-resize|nw-resize|se-resize|sw-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|zoom-in|zoom-out)$/, handler: (m) => {
    return { cursor: m[1] };
  }},

  // ───── Pointer events ─────
  { name: "pointer-events-none", pattern: /^pointer-events-none$/, handler: () => ({ "pointer-events": "none" }) },
  { name: "pointer-events-auto", pattern: /^pointer-events-auto$/, handler: () => ({ "pointer-events": "auto" }) },

  // ───── User select ─────
  { name: "select-none", pattern: /^select-none$/, handler: () => ({ "user-select": "none" }) },
  { name: "select-text", pattern: /^select-text$/, handler: () => ({ "user-select": "text" }) },
  { name: "select-all", pattern: /^select-all$/, handler: () => ({ "user-select": "all" }) },
  { name: "select-auto", pattern: /^select-auto$/, handler: () => ({ "user-select": "auto" }) },

  // ───── Touch action ─────
  { name: "touch-auto", pattern: /^touch-auto$/, handler: () => ({ "touch-action": "auto" }) },
  { name: "touch-none", pattern: /^touch-none$/, handler: () => ({ "touch-action": "none" }) },
  { name: "touch-pan-x", pattern: /^touch-pan-x$/, handler: () => ({ "touch-action": "pan-x" }) },
  { name: "touch-pan-y", pattern: /^touch-pan-y$/, handler: () => ({ "touch-action": "pan-y" }) },
  { name: "touch-pinch-zoom", pattern: /^touch-pinch-zoom$/, handler: () => ({ "touch-action": "pinch-zoom" }) },
  { name: "touch-manipulation", pattern: /^touch-manipulation$/, handler: () => ({ "touch-action": "manipulation" }) },

  // ───── Resize ─────
  { name: "resize-none", pattern: /^resize-none$/, handler: () => ({ resize: "none" }) },
  { name: "resize", pattern: /^resize$/, handler: () => ({ resize: "both" }) },
  { name: "resize-x", pattern: /^resize-x$/, handler: () => ({ resize: "horizontal" }) },
  { name: "resize-y", pattern: /^resize-y$/, handler: () => ({ resize: "vertical" }) },

  // ───── Appearance ─────
  { name: "appearance-none", pattern: /^appearance-none$/, handler: () => ({ appearance: "none" }) },
  { name: "appearance-auto", pattern: /^appearance-auto$/, handler: () => ({ appearance: "auto" }) },

  // ───── Accent color ─────
  { name: "accent-auto", pattern: /^accent-auto$/, handler: () => ({ "accent-color": "auto" }) },
  { name: "accent-color", pattern: /^accent-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "accent-color": v };
  }},

  // ───── Caret color ─────
  { name: "caret-color", pattern: /^caret-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "caret-color": v };
  }},

  // ───── Scroll behavior ─────
  { name: "scroll-auto", pattern: /^scroll-auto$/, handler: () => ({ "scroll-behavior": "auto" }) },
  { name: "scroll-smooth", pattern: /^scroll-smooth$/, handler: () => ({ "scroll-behavior": "smooth" }) },

  // ───── Scroll margin ─────
  { name: "scroll-m", pattern: new RegExp(`^scroll-m-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "scroll-margin": v };
  }},
  { name: "scroll-mt", pattern: new RegExp(`^scroll-mt-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "scroll-margin-top": v };
  }},
  { name: "scroll-mb", pattern: new RegExp(`^scroll-mb-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "scroll-margin-bottom": v };
  }},
  { name: "scroll-ml", pattern: new RegExp(`^scroll-ml-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "scroll-margin-left": v };
  }},
  { name: "scroll-mr", pattern: new RegExp(`^scroll-mr-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "scroll-margin-right": v };
  }},

  // ───── Scroll padding ─────
  { name: "scroll-p", pattern: new RegExp(`^scroll-p-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "scroll-padding": v };
  }},
  { name: "scroll-pt", pattern: new RegExp(`^scroll-pt-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "scroll-padding-top": v };
  }},
  { name: "scroll-pb", pattern: new RegExp(`^scroll-pb-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "scroll-padding-bottom": v };
  }},
  { name: "scroll-pl", pattern: new RegExp(`^scroll-pl-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "scroll-padding-left": v };
  }},
  { name: "scroll-pr", pattern: new RegExp(`^scroll-pr-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "scroll-padding-right": v };
  }},

  // ───── Scroll snap ─────
  { name: "snap-none", pattern: /^snap-none$/, handler: () => ({ "scroll-snap-type": "none" }) },
  { name: "snap-x", pattern: /^snap-x$/, handler: () => ({ "scroll-snap-type": "x var(--z-scroll-snap-strictness, proximity)" }) },
  { name: "snap-y", pattern: /^snap-y$/, handler: () => ({ "scroll-snap-type": "y var(--z-scroll-snap-strictness, proximity)" }) },
  { name: "snap-both", pattern: /^snap-both$/, handler: () => ({ "scroll-snap-type": "both var(--z-scroll-snap-strictness, proximity)" }) },
  { name: "snap-mandatory", pattern: /^snap-mandatory$/, handler: () => ({ "--z-scroll-snap-strictness": "mandatory" }) },
  { name: "snap-proximity", pattern: /^snap-proximity$/, handler: () => ({ "--z-scroll-snap-strictness": "proximity" }) },
  { name: "snap-start", pattern: /^snap-start$/, handler: () => ({ "scroll-snap-align": "start" }) },
  { name: "snap-end", pattern: /^snap-end$/, handler: () => ({ "scroll-snap-align": "end" }) },
  { name: "snap-center", pattern: /^snap-center$/, handler: () => ({ "scroll-snap-align": "center" }) },
  { name: "snap-align-none", pattern: /^snap-align-none$/, handler: () => ({ "scroll-snap-align": "none" }) },
  { name: "snap-normal", pattern: /^snap-normal$/, handler: () => ({ "scroll-snap-stop": "normal" }) },
  { name: "snap-always", pattern: /^snap-always$/, handler: () => ({ "scroll-snap-stop": "always" }) },

  // ───── Screen reader utilities ─────
  { name: "sr-only", pattern: /^sr-only$/, handler: () => ({
    position: "absolute", width: "1px", height: "1px", padding: "0",
    margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)",
    "white-space": "nowrap", "border-width": "0",
  })},
  { name: "not-sr-only", pattern: /^not-sr-only$/, handler: () => ({
    position: "static", width: "auto", height: "auto", padding: "0",
    margin: "0", overflow: "visible", clip: "auto", "white-space": "normal",
  })},

  // ───── SVG utilities ─────
  { name: "fill-none", pattern: /^fill-none$/, handler: () => ({ fill: "none" }) },
  { name: "fill-current", pattern: /^fill-current$/, handler: () => ({ fill: "currentColor" }) },
  { name: "fill-color", pattern: /^fill-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { fill: v };
  }},
  { name: "stroke-none", pattern: /^stroke-none$/, handler: () => ({ stroke: "none" }) },
  { name: "stroke-current", pattern: /^stroke-current$/, handler: () => ({ stroke: "currentColor" }) },
  { name: "stroke-width", pattern: /^stroke-(0|1|2)$/, handler: (m) => ({ "stroke-width": m[1] }) },
  { name: "stroke-color", pattern: /^stroke-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { stroke: v };
  }},

  // ───── Print utilities ─────
  { name: "no-print", pattern: /^no-print$/, handler: () => ({ display: "none" }),
    // Note: In the CLI/generator, print utilities need @media print wrapping
    // For now, this provides a base class; the `print:` variant prefix handles media queries
  },
];
