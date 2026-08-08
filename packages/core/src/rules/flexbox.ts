import { Rule } from "./types";
import { alignKeywordMap } from "./scales";

export const flexboxRules: Rule[] = [
  // ───── Flex container ─────
  { name: "flex-direction", pattern: /^(row|column)$/, handler: (m) => {
    return { display: "flex", "flex-direction": m[1] };
  }},
  { name: "flex-row-reverse", pattern: /^row-reverse$/, handler: () => {
    return { display: "flex", "flex-direction": "row-reverse" };
  }},
  { name: "flex-col-reverse", pattern: /^column-reverse$/, handler: () => {
    return { display: "flex", "flex-direction": "column-reverse" };
  }},
  { name: "flex-wrap", pattern: /^flex-wrap$/, handler: () => ({ "flex-wrap": "wrap" }) },
  { name: "flex-nowrap", pattern: /^flex-nowrap$/, handler: () => ({ "flex-wrap": "nowrap" }) },
  { name: "flex-wrap-reverse", pattern: /^flex-wrap-reverse$/, handler: () => ({ "flex-wrap": "wrap-reverse" }) },

  // Flex grow/shrink/basis shorthand
  { name: "flex-n", pattern: /^flex-(\d)$/, handler: (m) => ({ flex: m[1] }) },
  { name: "flex-auto", pattern: /^flex-auto$/, handler: () => ({ flex: "1 1 auto" }) },
  { name: "flex-initial", pattern: /^flex-initial$/, handler: () => ({ flex: "0 1 auto" }) },
  { name: "flex-none", pattern: /^flex-none$/, handler: () => ({ flex: "none" }) },
  { name: "grow", pattern: /^grow$/, handler: () => ({ "flex-grow": "1" }) },
  { name: "grow-0", pattern: /^grow-0$/, handler: () => ({ "flex-grow": "0" }) },
  { name: "shrink", pattern: /^shrink$/, handler: () => ({ "flex-shrink": "1" }) },
  { name: "shrink-0", pattern: /^shrink-0$/, handler: () => ({ "flex-shrink": "0" }) },

  // ───── Flex / Grid alignment ─────
  { name: "align-items", pattern: /^items-(start|center|end|stretch|baseline)$/, handler: (m) => {
    return { "align-items": alignKeywordMap[m[1]] };
  }},
  { name: "justify-content", pattern: /^justify-(start|center|end|between|around|evenly)$/, handler: (m) => {
    return { "justify-content": alignKeywordMap[m[1]] };
  }},
  { name: "justify-items", pattern: /^justify-items-(start|center|end|stretch)$/, handler: (m) => {
    return { "justify-items": m[1] };
  }},
  { name: "align-content", pattern: /^content-(start|center|end|between|around|stretch)$/, handler: (m) => {
    return { "align-content": alignKeywordMap[m[1]] };
  }},
  { name: "align-self", pattern: /^self-(start|center|end|stretch|baseline)$/, handler: (m) => {
    return { "align-self": alignKeywordMap[m[1]] };
  }},
  { name: "justify-self", pattern: /^justify-self-(start|center|end|stretch|auto)$/, handler: (m) => {
    return { "justify-self": m[1] };
  }},
  { name: "place-items", pattern: /^place-items-(start|center|end|stretch|baseline)$/, handler: (m) => {
    return { "place-items": m[1] };
  }},
  { name: "place-content", pattern: /^place-content-(start|center|end|between|around|evenly|stretch)$/, handler: (m) => {
    return { "place-content": alignKeywordMap[m[1]] ?? m[1] };
  }},
  { name: "place-self", pattern: /^place-self-(auto|start|center|end|stretch)$/, handler: (m) => {
    return { "place-self": m[1] };
  }},
];
