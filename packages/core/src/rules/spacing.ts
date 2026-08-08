import { Rule } from "./types";
import { resolveSpacing, SP, SP_AUTO } from "./scales";

export const spacingRules: Rule[] = [
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

  // ───── Space between (child selector rules) ─────
  { name: "space-x", pattern: new RegExp(`^space-x-(${SP})$`), selectorSuffix: " > * + *", handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-left": v };
  }},
  { name: "space-y", pattern: new RegExp(`^space-y-(${SP})$`), selectorSuffix: " > * + *", handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-top": v };
  }},
  { name: "space-x-reverse", pattern: /^space-x-reverse$/, selectorSuffix: " > * + *", handler: () => {
    return { "margin-right": "var(--z-space-x-reverse)", "margin-left": "0" };
  }},
  { name: "space-y-reverse", pattern: /^space-y-reverse$/, selectorSuffix: " > * + *", handler: () => {
    return { "margin-bottom": "var(--z-space-y-reverse)", "margin-top": "0" };
  }},

  // ───── Logical properties (RTL) ─────
  { name: "padding-start", pattern: new RegExp(`^ps-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-inline-start": v };
  }},
  { name: "padding-end", pattern: new RegExp(`^pe-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "padding-inline-end": v };
  }},
  { name: "margin-start", pattern: new RegExp(`^ms-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { "margin-inline-start": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-inline-start": v };
  }},
  { name: "margin-end", pattern: new RegExp(`^me-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { "margin-inline-end": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "margin-inline-end": v };
  }},
];
