// ──────────────────────────────────────────────
// @zee-css/core — Rule system barrel export
// ──────────────────────────────────────────────

// Types
export type { CSSDeclaration, RuleHandler, Rule } from "./types";

// Scales & utilities
export {
  spacingScale, spacingNames, resolveSpacing, resolveSizing,
  fontSizeScale, fontWeightScale, lineHeightScale, letterSpacingScale,
  opacityScale, shadowScale, blurScale, borderRadiusScale,
  alignKeywordMap, breakpoints, stateVariants,
  SP, SP_AUTO, resolveColumnWidth, pxToRem,
} from "./scales";

// Colors
export { colorScale, resolveColor, addColor, setColor } from "./colors";

// Rule modules
import { spacingRules } from "./spacing";
import { flexboxRules } from "./flexbox";
import { gridRules } from "./grid";
import { layoutRules } from "./layout";
import { typographyRules } from "./typography";
import { backgroundRules } from "./backgrounds";
import { effectsRules } from "./effects";
import { transformRules } from "./transforms";
import { interactivityRules } from "./interactivity";

import { Rule } from "./types";

// Assembled rule array — order matters! More specific rules first.
export const rules: Rule[] = [
  ...spacingRules,
  ...flexboxRules,
  ...gridRules,
  ...layoutRules,
  ...typographyRules,
  ...backgroundRules,
  ...effectsRules,
  ...transformRules,
  ...interactivityRules,
];
