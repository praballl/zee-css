import { Rule } from "./types";
import { resolveColor } from "./colors";
import {
  opacityScale, shadowScale, blurScale, borderRadiusScale,
  resolveSpacing, SP,
} from "./scales";

export const effectsRules: Rule[] = [
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

  // ───── Ring utilities ─────
  { name: "ring", pattern: /^ring$/, handler: () => ({
    "box-shadow": "0 0 0 3px var(--z-ring-color, rgb(59 130 246 / 0.5))",
  })},
  { name: "ring-width", pattern: /^ring-(0|1|2|4|8)$/, handler: (m) => ({
    "box-shadow": `var(--z-ring-inset, ) 0 0 0 ${m[1]}px var(--z-ring-color, rgb(59 130 246 / 0.5))`,
  })},
  { name: "ring-inset", pattern: /^ring-inset$/, handler: () => ({
    "--z-ring-inset": "inset",
  })},
  { name: "ring-color", pattern: /^ring-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "--z-ring-color": v };
  }},
  { name: "ring-offset", pattern: /^ring-offset-(0|1|2|4|8)$/, handler: (m) => ({
    "--z-ring-offset-width": `${m[1]}px`,
    "box-shadow": `0 0 0 var(--z-ring-offset-width, 0px) var(--z-ring-offset-color, #fff), var(--z-ring-inset, ) 0 0 0 calc(3px + var(--z-ring-offset-width, 0px)) var(--z-ring-color, rgb(59 130 246 / 0.5))`,
  })},
  { name: "ring-offset-color", pattern: /^ring-offset-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "--z-ring-offset-color": v };
  }},

  // ───── Blur ─────
  { name: "blur", pattern: /^blur-(none|sm|md|lg|xl|2xl|3xl)$/, handler: (m) => {
    return { filter: `blur(${blurScale[m[1]]})` };
  }},
  { name: "blur-default", pattern: /^blur$/, handler: () => {
    return { filter: `blur(${blurScale["default"]})` };
  }},

  // ───── Brightness ─────
  { name: "brightness", pattern: /^brightness-(\d{1,3})$/, handler: (m) => {
    const v = parseInt(m[1], 10);
    if (v < 0 || v > 200) return null;
    return { filter: `brightness(${v}%)` };
  }},

  // ───── Contrast ─────
  { name: "contrast", pattern: /^contrast-(\d{1,3})$/, handler: (m) => {
    const v = parseInt(m[1], 10);
    if (v < 0 || v > 200) return null;
    return { filter: `contrast(${v}%)` };
  }},

  // ───── Saturate ─────
  { name: "saturate", pattern: /^saturate-(\d{1,3})$/, handler: (m) => {
    const v = parseInt(m[1], 10);
    if (v < 0 || v > 200) return null;
    return { filter: `saturate(${v}%)` };
  }},

  // ───── Grayscale ─────
  { name: "grayscale", pattern: /^grayscale-(0|100)$/, handler: (m) => {
    return { filter: `grayscale(${m[1]}%)` };
  }},
  { name: "grayscale-default", pattern: /^grayscale$/, handler: () => {
    return { filter: "grayscale(100%)" };
  }},

  // ───── Invert ─────
  { name: "invert", pattern: /^invert-(0|100)$/, handler: (m) => {
    return { filter: `invert(${m[1]}%)` };
  }},
  { name: "invert-default", pattern: /^invert$/, handler: () => {
    return { filter: "invert(100%)" };
  }},

  // ───── Sepia ─────
  { name: "sepia", pattern: /^sepia-(0|100)$/, handler: (m) => {
    return { filter: `sepia(${m[1]}%)` };
  }},
  { name: "sepia-default", pattern: /^sepia$/, handler: () => {
    return { filter: "sepia(100%)" };
  }},

  // ───── Hue rotate ─────
  { name: "hue-rotate", pattern: /^hue-rotate-(\d{1,3})$/, handler: (m) => {
    return { filter: `hue-rotate(${m[1]}deg)` };
  }},
  { name: "neg-hue-rotate", pattern: /^-hue-rotate-(\d{1,3})$/, handler: (m) => {
    return { filter: `hue-rotate(-${m[1]}deg)` };
  }},

  // ───── Backdrop filters ─────
  { name: "backdrop-blur", pattern: /^backdrop-blur-(none|sm|md|lg|xl|2xl|3xl)$/, handler: (m) => {
    return { "backdrop-filter": `blur(${blurScale[m[1]]})` };
  }},
  { name: "backdrop-blur-default", pattern: /^backdrop-blur$/, handler: () => {
    return { "backdrop-filter": `blur(${blurScale["default"]})` };
  }},
  { name: "backdrop-brightness", pattern: /^backdrop-brightness-(\d{1,3})$/, handler: (m) => {
    return { "backdrop-filter": `brightness(${m[1]}%)` };
  }},
  { name: "backdrop-contrast", pattern: /^backdrop-contrast-(\d{1,3})$/, handler: (m) => {
    return { "backdrop-filter": `contrast(${m[1]}%)` };
  }},
  { name: "backdrop-grayscale", pattern: /^backdrop-grayscale$/, handler: () => {
    return { "backdrop-filter": "grayscale(100%)" };
  }},
  { name: "backdrop-grayscale-0", pattern: /^backdrop-grayscale-0$/, handler: () => {
    return { "backdrop-filter": "grayscale(0%)" };
  }},
  { name: "backdrop-invert", pattern: /^backdrop-invert$/, handler: () => {
    return { "backdrop-filter": "invert(100%)" };
  }},
  { name: "backdrop-invert-0", pattern: /^backdrop-invert-0$/, handler: () => {
    return { "backdrop-filter": "invert(0%)" };
  }},
  { name: "backdrop-opacity", pattern: /^backdrop-opacity-(\d{1,3})$/, handler: (m) => {
    const v = opacityScale[m[1]]; if (!v) return null;
    return { "backdrop-filter": `opacity(${parseFloat(v) * 100}%)` };
  }},
  { name: "backdrop-saturate", pattern: /^backdrop-saturate-(\d{1,3})$/, handler: (m) => {
    return { "backdrop-filter": `saturate(${m[1]}%)` };
  }},
  { name: "backdrop-sepia", pattern: /^backdrop-sepia$/, handler: () => {
    return { "backdrop-filter": "sepia(100%)" };
  }},
  { name: "backdrop-sepia-0", pattern: /^backdrop-sepia-0$/, handler: () => {
    return { "backdrop-filter": "sepia(0%)" };
  }},

  // ───── Mix blend mode ─────
  { name: "mix-blend", pattern: /^mix-blend-(normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity)$/, handler: (m) => {
    return { "mix-blend-mode": m[1] };
  }},
  { name: "bg-blend", pattern: /^bg-blend-(normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity)$/, handler: (m) => {
    return { "background-blend-mode": m[1] };
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
  { name: "border-radius-s", pattern: /^rounded-s-(none|sm|md|lg|xl|2xl|3xl|full)$/, handler: (m) => {
    const v = borderRadiusScale[m[1]];
    return { "border-start-start-radius": v, "border-end-start-radius": v };
  }},
  { name: "border-radius-e", pattern: /^rounded-e-(none|sm|md|lg|xl|2xl|3xl|full)$/, handler: (m) => {
    const v = borderRadiusScale[m[1]];
    return { "border-start-end-radius": v, "border-end-end-radius": v };
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
  { name: "border-s", pattern: /^border-s$/, handler: () => {
    return { "border-inline-start-width": "1px", "border-inline-start-style": "solid" };
  }},
  { name: "border-e", pattern: /^border-e$/, handler: () => {
    return { "border-inline-end-width": "1px", "border-inline-end-style": "solid" };
  }},
  { name: "border-none", pattern: /^border-none$/, handler: () => {
    return { "border-style": "none" };
  }},

  // ───── Border style ─────
  { name: "border-style", pattern: /^border-(solid|dashed|dotted|double|hidden)$/, handler: (m) => {
    return { "border-style": m[1] };
  }},

  // ───── Divide utilities (child selector) ─────
  { name: "divide-x", pattern: /^divide-x$/, selectorSuffix: " > * + *", handler: () => ({
    "border-left-width": "1px", "border-style": "solid",
  })},
  { name: "divide-x-width", pattern: /^divide-x-(0|2|4|8)$/, selectorSuffix: " > * + *", handler: (m) => ({
    "border-left-width": `${m[1]}px`, "border-style": "solid",
  })},
  { name: "divide-y", pattern: /^divide-y$/, selectorSuffix: " > * + *", handler: () => ({
    "border-top-width": "1px", "border-style": "solid",
  })},
  { name: "divide-y-width", pattern: /^divide-y-(0|2|4|8)$/, selectorSuffix: " > * + *", handler: (m) => ({
    "border-top-width": `${m[1]}px`, "border-style": "solid",
  })},
  { name: "divide-color", pattern: /^divide-([\w-]+)$/, selectorSuffix: " > * + *", handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "border-color": v };
  }},
  { name: "divide-style", pattern: /^divide-(solid|dashed|dotted|double|none)$/, selectorSuffix: " > * + *", handler: (m) => {
    return { "border-style": m[1] };
  }},

  // ───── Border color ─────
  { name: "border-color", pattern: /^border-([\w-]+)$/, handler: (m) => {
    if (/^\d+$/.test(m[1])) return null;
    const v = resolveColor(m[1]); if (!v) return null;
    return { "border-color": v };
  }},

  // ───── Outline ─────
  { name: "outline-none", pattern: /^outline-none$/, handler: () => ({
    outline: "2px solid transparent", "outline-offset": "2px",
  })},
  { name: "outline", pattern: /^outline$/, handler: () => ({ "outline-style": "solid" }) },
  { name: "outline-width", pattern: /^outline-(0|1|2|4|8)$/, handler: (m) => ({
    "outline-width": `${m[1]}px`, "outline-style": "solid",
  })},
  { name: "outline-style", pattern: /^outline-(dashed|dotted|double)$/, handler: (m) => ({
    "outline-style": m[1],
  })},
  { name: "outline-offset", pattern: /^outline-offset-(0|1|2|4|8)$/, handler: (m) => ({
    "outline-offset": `${m[1]}px`,
  })},
  { name: "outline-color", pattern: /^outline-([\w-]+)$/, handler: (m) => {
    const v = resolveColor(m[1]); if (!v) return null;
    return { "outline-color": v };
  }},
];
