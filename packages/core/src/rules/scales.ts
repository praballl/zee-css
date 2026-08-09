// ──────────────────────────────────────────────
// Spacing scale (rem-based, 1rem = 16px)
// ──────────────────────────────────────────────
export const spacingScale: Record<string, string> = {
  "0": "0",
  "px": "1px",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
};

// Descriptive spacing aliases
export const spacingNames: Record<string, string> = {
  "xs": "0.25rem",
  "sm": "0.5rem",
  "md": "1rem",
  "lg": "1.5rem",
  "xl": "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
  "4xl": "4rem",
};

export function resolveSpacing(key: string): string | null {
  return spacingScale[key] ?? spacingNames[key] ?? null;
}

// ──────────────────────────────────────────────
// Sizing scale (extends spacing with keywords)
// ──────────────────────────────────────────────
const sizingKeywords: Record<string, string> = {
  "auto": "auto",
  "full": "100%",
  "screen": "100vw",
  "min": "min-content",
  "max": "max-content",
  "fit": "fit-content",
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "5/6": "83.333333%",
};

const sizingScreenHeight: Record<string, string> = {
  "auto": "auto",
  "full": "100%",
  "screen": "100vh",
  "svh": "100svh",
  "dvh": "100dvh",
  "lvh": "100lvh",
  "min": "min-content",
  "max": "max-content",
  "fit": "fit-content",
};

export function resolveSizing(key: string, dimension: "width" | "height" = "width"): string | null {
  if (dimension === "height") {
    return spacingScale[key] ?? sizingScreenHeight[key] ?? null;
  }
  return spacingScale[key] ?? sizingKeywords[key] ?? null;
}

// ──────────────────────────────────────────────
// Typography scales
// ──────────────────────────────────────────────
export const fontSizeScale: Record<string, string> = {
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

// Fluid font scale: clamp(mobile-floor, fluid-mid, desktop-cap)
// Used when autoResponsive: true — sizes scale smoothly with viewport width.
export const fluidFontScale: Record<string, string> = {
  "xs":   "clamp(0.625rem, 1.5vw, 0.75rem)",
  "sm":   "clamp(0.75rem, 1.75vw, 0.875rem)",
  "base": "clamp(0.875rem, 2vw, 1rem)",
  "lg":   "clamp(1rem, 2.25vw, 1.125rem)",
  "xl":   "clamp(1.0625rem, 2.5vw, 1.25rem)",
  "2xl":  "clamp(1.25rem, 3vw, 1.5rem)",
  "3xl":  "clamp(1.5rem, 3.75vw, 1.875rem)",
  "4xl":  "clamp(1.75rem, 4.5vw, 2.25rem)",
  "5xl":  "clamp(2.25rem, 6vw, 3rem)",
  "6xl":  "clamp(2.75rem, 7.5vw, 3.75rem)",
  "7xl":  "clamp(3.25rem, 9vw, 4.5rem)",
  "8xl":  "clamp(4rem, 12vw, 6rem)",
  "9xl":  "clamp(5rem, 16vw, 8rem)",
};

export const fontWeightScale: Record<string, string> = {
  "thin": "100",
  "extralight": "200",
  "light": "300",
  "normal": "400",
  "medium": "500",
  "semibold": "600",
  "bold": "700",
  "extrabold": "800",
  "black": "900",
};

export const lineHeightScale: Record<string, string> = {
  "none": "1",
  "tight": "1.25",
  "snug": "1.375",
  "normal": "1.5",
  "relaxed": "1.625",
  "loose": "2",
};

export const letterSpacingScale: Record<string, string> = {
  "tighter": "-0.05em",
  "tight": "-0.025em",
  "normal": "0em",
  "wide": "0.025em",
  "wider": "0.05em",
  "widest": "0.1em",
};

// ──────────────────────────────────────────────
// Effects scales
// ──────────────────────────────────────────────
export const opacityScale: Record<string, string> = {
  "0": "0", "5": "0.05", "10": "0.1", "15": "0.15", "20": "0.2",
  "25": "0.25", "30": "0.3", "35": "0.35", "40": "0.4", "45": "0.45",
  "50": "0.5", "55": "0.55", "60": "0.6", "65": "0.65", "70": "0.7",
  "75": "0.75", "80": "0.8", "85": "0.85", "90": "0.9", "95": "0.95", "100": "1",
};

export const shadowScale: Record<string, string> = {
  "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "default": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  "none": "0 0 #0000",
};

export const blurScale: Record<string, string> = {
  "none": "0",
  "sm": "4px",
  "default": "8px",
  "md": "12px",
  "lg": "16px",
  "xl": "24px",
  "2xl": "40px",
  "3xl": "64px",
};

export const borderRadiusScale: Record<string, string> = {
  "none": "0",
  "sm": "0.125rem",
  "default": "0.25rem",
  "md": "0.375rem",
  "lg": "0.5rem",
  "xl": "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  "full": "9999px",
};

// ──────────────────────────────────────────────
// Alignment keyword map
// ──────────────────────────────────────────────
export const alignKeywordMap: Record<string, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch",
  baseline: "baseline",
};

// ──────────────────────────────────────────────
// Responsive breakpoints
// ──────────────────────────────────────────────
export const breakpoints: Record<string, string> = {
  "sm": "640px",
  "md": "768px",
  "lg": "1024px",
  "xl": "1280px",
  "2xl": "1536px",
};

/**
 * Override an existing breakpoint or add a new one.
 * Call clearCache() after to invalidate stale generated CSS.
 *
 * @example
 * setBreakpoint('md', '900px');      // override
 * setBreakpoint('3xl', '1920px');    // add custom
 * clearCache();
 */
export function setBreakpoint(name: string, value: string): void {
  breakpoints[name] = value;
}

/**
 * Add a new breakpoint. No-op if the name already exists (use setBreakpoint to override).
 * Call clearCache() after to invalidate stale generated CSS.
 *
 * @example
 * addBreakpoint('3xl', '1920px');
 * clearCache();
 */
export function addBreakpoint(name: string, value: string): void {
  if (!(name in breakpoints)) {
    breakpoints[name] = value;
  }
}

// ──────────────────────────────────────────────
// State variants
// ──────────────────────────────────────────────
export const stateVariants: Record<string, string> = {
  "hover": ":hover",
  "focus": ":focus",
  "focus-within": ":focus-within",
  "focus-visible": ":focus-visible",
  "active": ":active",
  "visited": ":visited",
  "disabled": ":disabled",
  "first": ":first-child",
  "last": ":last-child",
  "odd": ":nth-child(odd)",
  "even": ":nth-child(even)",
  "placeholder": "::placeholder",
};

// Spacing pattern fragment (reusable across rules)
export const SP = "\\d+(?:\\.\\d+)?|px|xs|sm|md|lg|xl|2xl|3xl|4xl";
export const SP_AUTO = `${SP}|auto`;

// ──────────────────────────────────────────────
// Helper functions
// ──────────────────────────────────────────────
export function resolveColumnWidth(n: number): string {
  const percent = (n / 12) * 100;
  return `${parseFloat(percent.toFixed(4))}%`;
}

export function pxToRem(px: number): string {
  return `${parseFloat((px / 16).toFixed(4))}rem`;
}
