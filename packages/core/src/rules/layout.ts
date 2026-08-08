import { Rule } from "./types";
import { resolveSpacing, resolveSizing, SP, SP_AUTO } from "./scales";

export const layoutRules: Rule[] = [
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
  { name: "display-flow-root", pattern: /^flow-root$/, handler: () => ({ display: "flow-root" }) },

  // ───── Table display ─────
  { name: "display-table", pattern: /^table$/, handler: () => ({ display: "table" }) },
  { name: "display-table-row", pattern: /^table-row$/, handler: () => ({ display: "table-row" }) },
  { name: "display-table-cell", pattern: /^table-cell$/, handler: () => ({ display: "table-cell" }) },
  { name: "display-table-caption", pattern: /^table-caption$/, handler: () => ({ display: "table-caption" }) },
  { name: "display-table-column", pattern: /^table-column$/, handler: () => ({ display: "table-column" }) },
  { name: "display-table-column-group", pattern: /^table-column-group$/, handler: () => ({ display: "table-column-group" }) },
  { name: "display-table-footer-group", pattern: /^table-footer-group$/, handler: () => ({ display: "table-footer-group" }) },
  { name: "display-table-header-group", pattern: /^table-header-group$/, handler: () => ({ display: "table-header-group" }) },
  { name: "display-table-row-group", pattern: /^table-row-group$/, handler: () => ({ display: "table-row-group" }) },

  // ───── Table layout ─────
  { name: "table-auto", pattern: /^table-auto$/, handler: () => ({ "table-layout": "auto" }) },
  { name: "table-fixed", pattern: /^table-fixed$/, handler: () => ({ "table-layout": "fixed" }) },
  { name: "border-collapse", pattern: /^border-collapse$/, handler: () => ({ "border-collapse": "collapse" }) },
  { name: "border-separate", pattern: /^border-separate$/, handler: () => ({ "border-collapse": "separate" }) },
  { name: "caption-top", pattern: /^caption-top$/, handler: () => ({ "caption-side": "top" }) },
  { name: "caption-bottom", pattern: /^caption-bottom$/, handler: () => ({ "caption-side": "bottom" }) },

  // ───── Container ─────
  { name: "container", pattern: /^container$/, handler: () => ({
    width: "100%",
    "margin-left": "auto",
    "margin-right": "auto",
  })},

  // ───── Width ─────
  { name: "width", pattern: /^w-([\w./]+)$/, handler: (m) => {
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

  // ───── Position ─────
  { name: "position", pattern: /^(relative|absolute|fixed|sticky|static)$/, handler: (m) => {
    return { position: m[1] };
  }},

  // ───── Inset ─────
  { name: "inset", pattern: new RegExp(`^inset-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { inset: "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { inset: v };
  }},
  { name: "inset-x", pattern: new RegExp(`^inset-x-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { left: "auto", right: "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { left: v, right: v };
  }},
  { name: "inset-y", pattern: new RegExp(`^inset-y-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { top: "auto", bottom: "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { top: v, bottom: v };
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

  // ───── Negative inset ─────
  { name: "neg-top", pattern: new RegExp(`^-top-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { top: v === "0" ? "0" : `-${v}` };
  }},
  { name: "neg-right", pattern: new RegExp(`^-right-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { right: v === "0" ? "0" : `-${v}` };
  }},
  { name: "neg-bottom", pattern: new RegExp(`^-bottom-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { bottom: v === "0" ? "0" : `-${v}` };
  }},
  { name: "neg-left", pattern: new RegExp(`^-left-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { left: v === "0" ? "0" : `-${v}` };
  }},
  { name: "neg-inset", pattern: new RegExp(`^-inset-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    const neg = v === "0" ? "0" : `-${v}`;
    return { inset: neg };
  }},

  // ───── Start/End (logical properties) ─────
  { name: "start", pattern: new RegExp(`^start-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { "inset-inline-start": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "inset-inline-start": v };
  }},
  { name: "end", pattern: new RegExp(`^end-(${SP_AUTO})$`), handler: (m) => {
    if (m[1] === "auto") return { "inset-inline-end": "auto" };
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { "inset-inline-end": v };
  }},

  // ───── Z-index ─────
  { name: "z-index", pattern: /^z-(0|10|20|30|40|50|auto)$/, handler: (m) => {
    if (m[1] === "auto") return { "z-index": "auto" };
    return { "z-index": m[1] };
  }},

  // ───── Float ─────
  { name: "float-left", pattern: /^float-left$/, handler: () => ({ float: "left" }) },
  { name: "float-right", pattern: /^float-right$/, handler: () => ({ float: "right" }) },
  { name: "float-none", pattern: /^float-none$/, handler: () => ({ float: "none" }) },
  { name: "clear-left", pattern: /^clear-left$/, handler: () => ({ clear: "left" }) },
  { name: "clear-right", pattern: /^clear-right$/, handler: () => ({ clear: "right" }) },
  { name: "clear-both", pattern: /^clear-both$/, handler: () => ({ clear: "both" }) },
  { name: "clear-none", pattern: /^clear-none$/, handler: () => ({ clear: "none" }) },

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

  // ───── Overscroll ─────
  { name: "overscroll", pattern: /^overscroll-(auto|contain|none)$/, handler: (m) => {
    return { "overscroll-behavior": m[1] };
  }},
  { name: "overscroll-x", pattern: /^overscroll-x-(auto|contain|none)$/, handler: (m) => {
    return { "overscroll-behavior-x": m[1] };
  }},
  { name: "overscroll-y", pattern: /^overscroll-y-(auto|contain|none)$/, handler: (m) => {
    return { "overscroll-behavior-y": m[1] };
  }},

  // ───── Visibility ─────
  { name: "visible", pattern: /^visible$/, handler: () => ({ visibility: "visible" }) },
  { name: "invisible", pattern: /^invisible$/, handler: () => ({ visibility: "hidden" }) },
  { name: "collapse", pattern: /^collapse$/, handler: () => ({ visibility: "collapse" }) },

  // ───── Isolation ─────
  { name: "isolate", pattern: /^isolate$/, handler: () => ({ isolation: "isolate" }) },
  { name: "isolation-auto", pattern: /^isolation-auto$/, handler: () => ({ isolation: "auto" }) },

  // ───── Object fit ─────
  { name: "object-fit", pattern: /^object-(contain|cover|fill|none|scale-down)$/, handler: (m) => {
    return { "object-fit": m[1] };
  }},
  { name: "object-position", pattern: /^object-(center|top|bottom|left|right|left-top|left-bottom|right-top|right-bottom)$/, handler: (m) => {
    return { "object-position": m[1].replace("-", " ") };
  }},

  // ───── Aspect ratio ─────
  { name: "aspect-auto", pattern: /^aspect-auto$/, handler: () => ({ "aspect-ratio": "auto" }) },
  { name: "aspect-square", pattern: /^aspect-square$/, handler: () => ({ "aspect-ratio": "1 / 1" }) },
  { name: "aspect-video", pattern: /^aspect-video$/, handler: () => ({ "aspect-ratio": "16 / 9" }) },

  // ───── Columns ─────
  { name: "columns", pattern: /^columns-(\d{1,2})$/, handler: (m) => {
    const n = parseInt(m[1], 10);
    if (n < 1 || n > 12) return null;
    return { columns: `${n}` };
  }},
  { name: "columns-auto", pattern: /^columns-auto$/, handler: () => ({ columns: "auto" }) },

  // ───── Break (pagination) ─────
  { name: "break-after", pattern: /^break-after-(auto|avoid|all|avoid-page|page|left|right|column)$/, handler: (m) => {
    return { "break-after": m[1] };
  }},
  { name: "break-before", pattern: /^break-before-(auto|avoid|all|avoid-page|page|left|right|column)$/, handler: (m) => {
    return { "break-before": m[1] };
  }},
  { name: "break-inside", pattern: /^break-inside-(auto|avoid|avoid-page|avoid-column)$/, handler: (m) => {
    return { "break-inside": m[1] };
  }},

  // ───── Box sizing ─────
  { name: "box-border", pattern: /^box-border$/, handler: () => ({ "box-sizing": "border-box" }) },
  { name: "box-content", pattern: /^box-content$/, handler: () => ({ "box-sizing": "content-box" }) },

  // ───── Convenience aliases ─────
  { name: "fit", pattern: /^fit$/, handler: () => ({ width: "100%", height: "100%" }) },
  { name: "full-width", pattern: /^full-width$/, handler: () => ({ width: "100%" }) },
  { name: "full-height", pattern: /^full-height$/, handler: () => ({ height: "100%" }) },
];
