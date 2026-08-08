import { Rule } from "./types";
import { resolveColumnWidth, resolveSpacing, SP } from "./scales";

export const gridRules: Rule[] = [
  // ───── 12-column flex grid (legacy) ─────
  { name: "grid-column", pattern: /^col-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 12) return null;
    const width = resolveColumnWidth(n);
    return { "flex-basis": width, "max-width": width };
  }},
  { name: "col-auto", pattern: /^col-auto$/, handler: () => {
    return { flex: "0 0 auto", "max-width": "100%" };
  }},
  { name: "col-grow", pattern: /^col-grow$/, handler: () => ({ "flex-grow": "1" }) },
  { name: "col-shrink", pattern: /^col-shrink$/, handler: () => ({ "flex-shrink": "1" }) },
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

  // ───── CSS Grid template ─────
  { name: "grid-cols", pattern: /^grid-cols-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 12) return null;
    return { "grid-template-columns": `repeat(${n}, minmax(0, 1fr))` };
  }},
  { name: "grid-cols-none", pattern: /^grid-cols-none$/, handler: () => {
    return { "grid-template-columns": "none" };
  }},
  { name: "grid-cols-subgrid", pattern: /^grid-cols-subgrid$/, handler: () => {
    return { "grid-template-columns": "subgrid" };
  }},
  { name: "grid-rows", pattern: /^grid-rows-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 12) return null;
    return { "grid-template-rows": `repeat(${n}, minmax(0, 1fr))` };
  }},
  { name: "grid-rows-none", pattern: /^grid-rows-none$/, handler: () => {
    return { "grid-template-rows": "none" };
  }},
  { name: "grid-rows-subgrid", pattern: /^grid-rows-subgrid$/, handler: () => {
    return { "grid-template-rows": "subgrid" };
  }},

  // ───── CSS Grid span ─────
  { name: "col-span", pattern: /^col-span-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 12) return null;
    return { "grid-column": `span ${n} / span ${n}` };
  }},
  { name: "col-span-full", pattern: /^col-span-full$/, handler: () => {
    return { "grid-column": "1 / -1" };
  }},
  { name: "col-start", pattern: /^col-start-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 13) return null;
    return { "grid-column-start": `${n}` };
  }},
  { name: "col-end", pattern: /^col-end-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 13) return null;
    return { "grid-column-end": `${n}` };
  }},
  { name: "row-span", pattern: /^row-span-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 12) return null;
    return { "grid-row": `span ${n} / span ${n}` };
  }},
  { name: "row-span-full", pattern: /^row-span-full$/, handler: () => {
    return { "grid-row": "1 / -1" };
  }},
  { name: "row-start", pattern: /^row-start-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 13) return null;
    return { "grid-row-start": `${n}` };
  }},
  { name: "row-end", pattern: /^row-end-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 13) return null;
    return { "grid-row-end": `${n}` };
  }},

  // ───── Auto columns/rows ─────
  { name: "auto-cols-auto", pattern: /^auto-cols-auto$/, handler: () => ({ "grid-auto-columns": "auto" }) },
  { name: "auto-cols-min", pattern: /^auto-cols-min$/, handler: () => ({ "grid-auto-columns": "min-content" }) },
  { name: "auto-cols-max", pattern: /^auto-cols-max$/, handler: () => ({ "grid-auto-columns": "max-content" }) },
  { name: "auto-cols-fr", pattern: /^auto-cols-fr$/, handler: () => ({ "grid-auto-columns": "minmax(0, 1fr)" }) },
  { name: "auto-rows-auto", pattern: /^auto-rows-auto$/, handler: () => ({ "grid-auto-rows": "auto" }) },
  { name: "auto-rows-min", pattern: /^auto-rows-min$/, handler: () => ({ "grid-auto-rows": "min-content" }) },
  { name: "auto-rows-max", pattern: /^auto-rows-max$/, handler: () => ({ "grid-auto-rows": "max-content" }) },
  { name: "auto-rows-fr", pattern: /^auto-rows-fr$/, handler: () => ({ "grid-auto-rows": "minmax(0, 1fr)" }) },

  // ───── Grid flow ─────
  { name: "grid-flow-row", pattern: /^grid-flow-row$/, handler: () => ({ "grid-auto-flow": "row" }) },
  { name: "grid-flow-col", pattern: /^grid-flow-col$/, handler: () => ({ "grid-auto-flow": "column" }) },
  { name: "grid-flow-dense", pattern: /^grid-flow-dense$/, handler: () => ({ "grid-auto-flow": "dense" }) },
  { name: "grid-flow-row-dense", pattern: /^grid-flow-row-dense$/, handler: () => ({ "grid-auto-flow": "row dense" }) },
  { name: "grid-flow-col-dense", pattern: /^grid-flow-col-dense$/, handler: () => ({ "grid-auto-flow": "column dense" }) },

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
];
