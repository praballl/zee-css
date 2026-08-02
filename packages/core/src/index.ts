// ──────────────────────────────────────────────
// @zee-css/core — Public API
// ──────────────────────────────────────────────

// Rule system
export { rules, colorScale, resolveColor, addColor, setColor } from "./rules";
export { resolveSpacing, resolveSizing } from "./rules";
export type { Rule, RuleHandler, CSSDeclaration } from "./rules";

// Scales (for inspection and extension)
export {
  spacingScale,
  spacingNames,
  fontSizeScale,
  fontWeightScale,
  lineHeightScale,
  letterSpacingScale,
  opacityScale,
  shadowScale,
  blurScale,
  borderRadiusScale,
  breakpoints,
  stateVariants,
} from "./rules";

// Generator
export { generateCSS, generateCSSForClass, clearCache } from "./generator";
export type { GeneratedRule, GeneratorOptions } from "./generator";