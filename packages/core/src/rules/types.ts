export interface CSSDeclaration {
  [property: string]: string | number;
}

export type RuleHandler = (match: RegExpMatchArray) => CSSDeclaration | null;

export interface Rule {
  name: string;
  pattern: RegExp;
  handler: RuleHandler;
  /** Optional selector suffix (e.g., " > * + *" for space-between) */
  selectorSuffix?: string;
  /** Optional @keyframes definition to include in output */
  keyframes?: string;
}
