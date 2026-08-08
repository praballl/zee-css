import { Rule } from "./types";
import { resolveSpacing, SP } from "./scales";

export const transformRules: Rule[] = [
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

  // ───── Delay ─────
  { name: "delay", pattern: /^delay-(\d+)$/, handler: (m) => {
    return { "transition-delay": `${m[1]}ms` };
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
    return { transform: `scale(${parseInt(m[1], 10) / 100})` };
  }},
  { name: "scale-x", pattern: /^scale-x-(\d+)$/, handler: (m) => {
    return { transform: `scaleX(${parseInt(m[1], 10) / 100})` };
  }},
  { name: "scale-y", pattern: /^scale-y-(\d+)$/, handler: (m) => {
    return { transform: `scaleY(${parseInt(m[1], 10) / 100})` };
  }},
  { name: "rotate", pattern: /^rotate-(\d+)$/, handler: (m) => {
    return { transform: `rotate(${m[1]}deg)` };
  }},
  { name: "neg-rotate", pattern: /^-rotate-(\d+)$/, handler: (m) => {
    return { transform: `rotate(-${m[1]}deg)` };
  }},
  { name: "translate-x", pattern: new RegExp(`^translate-x-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { transform: `translateX(${v})` };
  }},
  { name: "translate-y", pattern: new RegExp(`^translate-y-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { transform: `translateY(${v})` };
  }},
  { name: "neg-translate-x", pattern: new RegExp(`^-translate-x-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { transform: `translateX(-${v})` };
  }},
  { name: "neg-translate-y", pattern: new RegExp(`^-translate-y-(${SP})$`), handler: (m) => {
    const v = resolveSpacing(m[1]); if (!v) return null;
    return { transform: `translateY(-${v})` };
  }},
  { name: "skew-x", pattern: /^skew-x-(\d+)$/, handler: (m) => {
    return { transform: `skewX(${m[1]}deg)` };
  }},
  { name: "skew-y", pattern: /^skew-y-(\d+)$/, handler: (m) => {
    return { transform: `skewY(${m[1]}deg)` };
  }},
  { name: "transform-origin", pattern: /^origin-(center|top|top-right|right|bottom-right|bottom|bottom-left|left|top-left)$/, handler: (m) => {
    return { "transform-origin": m[1].replace("-", " ") };
  }},
  { name: "transform-none", pattern: /^transform-none$/, handler: () => ({ transform: "none" }) },
  { name: "transform-gpu", pattern: /^transform-gpu$/, handler: () => ({ transform: "translateZ(0)" }) },

  // ───── Animations ─────
  { name: "animate-spin", pattern: /^animate-spin$/, handler: () => ({
    animation: "z-spin 1s linear infinite",
  }), keyframes: "@keyframes z-spin { to { transform: rotate(360deg) } }" },

  { name: "animate-ping", pattern: /^animate-ping$/, handler: () => ({
    animation: "z-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  }), keyframes: "@keyframes z-ping { 75%, 100% { transform: scale(2); opacity: 0 } }" },

  { name: "animate-pulse", pattern: /^animate-pulse$/, handler: () => ({
    animation: "z-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  }), keyframes: "@keyframes z-pulse { 50% { opacity: .5 } }" },

  { name: "animate-bounce", pattern: /^animate-bounce$/, handler: () => ({
    animation: "z-bounce 1s infinite",
  }), keyframes: "@keyframes z-bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1) } 50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1) } }" },

  { name: "animate-none", pattern: /^animate-none$/, handler: () => ({ animation: "none" }) },

  // ───── Will-change ─────
  { name: "will-change-auto", pattern: /^will-change-auto$/, handler: () => ({ "will-change": "auto" }) },
  { name: "will-change-scroll", pattern: /^will-change-scroll$/, handler: () => ({ "will-change": "scroll-position" }) },
  { name: "will-change-contents", pattern: /^will-change-contents$/, handler: () => ({ "will-change": "contents" }) },
  { name: "will-change-transform", pattern: /^will-change-transform$/, handler: () => ({ "will-change": "transform" }) },
];
