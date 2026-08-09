# CLAUDE.md — Zee-CSS

> **Purpose:** This file captures the architecture, logic, and reasoning behind zee-css so that future sessions can reason about and extend the codebase without re-reading every source file.

---

## Tech Stack & Workspace

- **Language:** TypeScript (strict mode), compiled to CommonJS (ES2020 target)
- **Monorepo:** npm workspaces (`packages/*`, `examples/*`)
- **Packages:**
  - `packages/core/` — CSS generation engine (`@zee-css/core`)
  - `packages/cli/` — File scanner & build tool (`@zee-css/cli`)
  - `examples/vite-demo/` — Live demo (Vite + TypeScript)
- **Test runner:** Vitest (core only, `src/__tests__/`)
- **Node:** 18+; no runtime deps in core; CLI depends only on `glob`

---

## Commands

```bash
npm run build           # compile core + cli
npm run build:core      # core only
npm run build:cli       # cli only
npm run dev             # vite-demo watch
npm run dev:cli         # cli watch (tsx)
npm test                # vitest for core
npm run test:cli        # scan examples/vite-demo end-to-end
npm run clean           # remove dist/ from core + cli
npm run publish:all     # build + publish both packages
npm run version:patch/minor/major   # bump versions
```

---

## Architecture Overview

```
CLI (scan files)
  └─ extracts class names (Set<string>)
       └─ generateCSS(classNames, options)   [core/generator.ts]
            ├─ parse variants from class name
            ├─ match utility against rules[]  [core/rules/]
            ├─ build CSS declarations
            ├─ wrap with selectors, media queries
            └─ aggregate & return CSS string
```

Three layers:
1. **Scales** — semantic constants (colors, spacing, breakpoints)
2. **Rules** — RegExp + handler pairs mapping class names → CSS declarations
3. **Generator** — parses variants, drives rule matching, assembles final CSS

---

## `packages/core/src/rules/` — Rule Engine

### Problem It Solves
Maps utility class names (e.g. `md:hover:text-blue-500`) to CSS declaration objects. Each rule owns a pattern and a handler; the generator iterates until first match.

### Core Types (`rules/types.ts`)

```
CSSDeclaration  = { [cssProperty: string]: string | number }
RuleHandler     = (match: RegExpMatchArray) => CSSDeclaration | null
Rule = {
  name: string
  pattern: RegExp
  handler: RuleHandler
  selectorSuffix?: string   // e.g. " > * + *" for space-between / divide
  keyframes?: string        // embedded @keyframes for animations
}
```

### Rule Categories & Files

| File | ~Rules | Category |
|---|---|---|
| `spacing.ts` | 28 | padding, margin (positive + negative), space-between, logical props |
| `flexbox.ts` | 18 | direction, wrap, grow/shrink, alignment |
| `grid.ts` | 42 | flex-grid legacy + CSS Grid template, span, gap, flow, auto-sizing |
| `layout.ts` | 55 | display, sizing (w/h/min/max), position, inset, overflow, z-index, float, object-fit, aspect, columns |
| `typography.ts` | 30 | text-align, color, size (fs-*/font-px), weight, family, line-height, tracking, transform, decoration, whitespace, lists |
| `backgrounds.ts` | 27 | repeat, size, position, clip, origin, attachment, gradient direction/stops, bg-color |
| `effects.ts` | 61 | opacity, shadow, ring, blur, filters, backdrop, blend, border-radius, border-width/style/color, divide, outline |
| `transforms.ts` | 33 | transitions, duration, delay, easing, scale, rotate, translate, skew, transform-origin, animations |
| `interactivity.ts` | 43 | cursor, pointer-events, select, touch, resize, appearance, accent, caret, scroll, snap, sr-only, SVG, print |

All rule arrays are merged into a single `rules: Rule[]` export in `rules/index.ts`.

### Key Gotchas

- **Order is critical.** Specific rules must come before catch-alls in each file. E.g. `text-h1`, `text-body1` etc. must precede the greedy `text-([\w-]+)` color catch-all, or color will incorrectly swallow them.
- **Color catch-alls** (`bg-*`, `text-*`, `border-*`) sit at the bottom of their respective category arrays.
- **Grid column bounds.** `col-{n}` and `grid-cols-{n}` reject values outside 1–12 by returning `null` from the handler — no CSS emitted.
- **Negative margins/insets.** Prefix `-` in the class name (e.g. `-mt-4`) negates the resolved spacing value. Guard: if value is `"0"`, emit `"0"` not `"-0"`.
- **`selectorSuffix`** on space-between (`space-x-*`, `space-y-*`) and divide utilities appends ` > * + *` to the selector, targeting siblings — not the container itself.
- **Arbitrary values.** Pattern `^([\w-]+)-\[(.+)\]$` is the last-resort fallback in the generator (not a Rule entry). Underscores in brackets become spaces (`p-[1_2_3_4]` → `1 2 3 4`).

---

## `packages/core/src/scales.ts` — Scale Constants

All semantic values live here. Rules import from scales; never hardcode values inside rules.

- **Spacing scale:** `0`, `px` (1px), `0.5`–`96` (rem-based, 1rem = 16px) + named `xs/sm/md/lg/xl/2xl/3xl/4xl`
- **Sizing keywords:** fractions (`1/2`, `1/3`, …), `auto`, `full`, `screen`, `min`, `max`, `fit`
- **Height extras:** `svh`, `dvh`, `lvh` (small/dynamic/large viewport)
- **Typography:** fontSizeScale (xs–9xl), fontWeightScale (thin–black), lineHeightScale, letterSpacingScale
- **Effect scales:** opacityScale (0–100, 5-step), shadowScale (8 presets), blurScale, borderRadiusScale
- **Breakpoints:** `sm:640`, `md:768`, `lg:1024`, `xl:1280`, `2xl:1536` (mobile-first)
- **State variants:** hover, focus, focus-within, focus-visible, active, visited, disabled, first, last, odd, even, placeholder

---

## `packages/core/src/colors.ts` — Color System

- **Theme tokens:** `primary`, `secondary`, `accent`, `positive`, `negative`, `info`, `warning` → resolved as `var(--z-{name})`
- **Base:** `white`, `black`, `transparent`, `current`, `inherit`
- **Full palette:** 22 color families × 11 shades (50–950) — ~242 hex values, all hardcoded
- **API:**
  - `resolveColor(key): string | null` — lookup from colorScale
  - `addColor(name, value)` — extend without replacing
  - `setColor(name, value)` — replace or add

---

## `packages/core/src/generator.ts` — CSS Generator

### Problem It Solves
Takes a class name (or batch), runs rule matching, applies variants (responsive/state/dark/media), and returns a CSS string.

### Key Types

```
GeneratedRule = { className, css, keyframes? }
GeneratorOptions = { important?, prefix?, minify?, darkMode?: "media"|"class" }
```

### Single Class Algorithm (`generateCSSForClass`)

```
1. Cache hit? → return cached result
2. Strip "!" prefix → mark as important
3. Split by ":" → collect variant tokens, last token = utility
4. For each variant token:
   - Is it a breakpoint (sm/md/lg/xl/2xl)? → set responsive
   - Is it "dark"? → set dark mode
   - Is it a non-bp media (print/motion-safe/etc.)? → set media
   - Otherwise → set state (pseudo-class/element)
5. Iterate rules[] in order:
   - rule.pattern.exec(utility) → call rule.handler(match)
   - First non-null CSSDeclaration wins → stop
6. If no match → try arbitrary value fallback [prop]-[value]
7. Escape className for CSS selector
8. Build selector: .{prefix}{escaped} + selectorSuffix if any
9. Apply dark mode:
   - "class" → .dark .selector { ... }
   - "media" → @media (prefers-color-scheme: dark) { ... }
10. Wrap in media query if non-bp media variant
11. Wrap in @media (min-width: {bp}) if responsive
12. Format declarations (minify or pretty)
13. Append keyframes from rule if present
14. Cache & return GeneratedRule
```

### Batch Algorithm (`generateCSS`)

```
1. Deduplicate input via Set
2. For each className → generateCSSForClass (cache hits are free)
3. Sort output:
   - base rules first
   - responsive rules grouped by breakpoint, mobile-first order
4. Collect keyframes into Set (deduplicates animation @keyframes)
5. Output: keyframes + base CSS + responsive CSS (joined)
```

### Non-obvious Decisions

- **Keyframes before usage** — Animations require `@keyframes` declared before the class that references them; generator always emits keyframes at the top.
- **Keyframe deduplication** — Multiple elements using `animate-spin` must not produce duplicate `@keyframes z-spin` blocks; Set-based dedup handles this.
- **Selector escaping** — Characters `[:.\/\[\]\(\),!]` are backslash-escaped so arbitrary value classes like `w-[200px]` produce valid CSS selectors.
- **Cache key** — Includes serialized options so same class name with different options (`important`, `prefix`, etc.) caches separately.

---

## `packages/cli/src/index.ts` — CLI & Scanner

### Problem It Solves
Scans a project's source files for utility class names used in markup/code, feeds them to the generator, and writes a CSS file. Optionally watches for changes.

### CLI Interface

```
zee-css [directory] [options]
  -o, --output <path>   output file (default: <dir>/dist/utilities.css)
  -w, --watch           watch mode
  -m, --minify          minify output
  --important           add !important to all declarations
  --prefix <prefix>     prefix all selectors
```

### Scanner Logic (`scanFiles`)

Glob pattern: `src/**/*.{html,htm,jsx,tsx,vue,svelte,astro,ts,js,mdx,php,erb}`  
Excludes: `node_modules/**`, `dist/**`, `.git/**`

Four regex strategies run against each file's text:

```
1. HTML/JSX static attributes:
   class(?:Name)?=["']([^"']+)["']
   → "p-4 m-2 flex"

2. JSX template literals:
   class(?:Name)?=\{`([^`]+)`\}
   → strips ${...} expressions first, captures remaining static tokens

3. Vue dynamic binding:
   :class=["'][^"']*["']
   → extracts string literal classes from within the attribute

4. Svelte class directives:
   class:([\w:.-]+)(?=[=\s/>])
   → captures "active", "flex" from class:active, class:flex
```

All found names collected into a `Set<string>` (automatic dedup) and returned.

### Build Process (`buildCSS`)

```
scanFiles(dir) → Set<string>
  → generateCSS([...classNames], options)  [from @zee-css/core]
  → mkdir -p output dir
  → write CSS file
  → log: utility count, file size (KB), elapsed time (ms)
```

### Watch Mode (`watchMode`)

```
1. Initial buildCSS()
2. fs.watch(src/, recursive)
3. Filter events to supported file extensions
4. 100ms debounce to handle editor buffered writes
5. Rebuild on change
```

### Non-obvious Decisions

- **Template literal scanner is conservative** — It strips `${...}` blocks entirely and only captures what remains. Dynamic classes (e.g. `${isActive ? 'bg-blue-500' : 'bg-gray-200'}`) are intentionally ignored; they must be safelisted manually.
- **Four separate regex strategies** — Not one universal regex; each framework has structurally different class attribute syntax that requires dedicated patterns.
- **Debounce is 100ms** — Short enough to feel instant, long enough to avoid partial-write reads when editors do multi-step saves.

---

## Public API (`packages/core/src/index.ts`)

```typescript
// Rule system (extensible)
export { rules, colorScale, resolveColor, addColor, setColor }
export type { Rule, RuleHandler, CSSDeclaration }

// Scales (inspection & extension)
export {
  spacingScale, spacingNames, resolveSpacing, resolveSizing,
  fontSizeScale, fontWeightScale, lineHeightScale, letterSpacingScale,
  opacityScale, shadowScale, blurScale, borderRadiusScale,
  breakpoints, stateVariants
}

// Generator
export { generateCSS, generateCSSForClass, clearCache }
export type { GeneratedRule, GeneratorOptions }
```

`rules` is a plain array — you can push custom rules or inspect existing ones at runtime.

---

## Naming & Coding Conventions

**Class prefix patterns:**
- Padding: `pa-`, `pt-`, `pb-`, `pl-`, `pr-`, `px-`, `py-`
- Margin: `ma-`, `mt-`, `mb-`, `ml-`, `mr-`, `mx-`, `my-` (negative: `-mt-4`)
- Font size: `fs-{scale}` or `font-{px}` (not `text-{size}` — that's reserved for color)
- Logical/RTL props: `ps-`/`pe-` (padding-start/end), `ms-`/`me-` (margin-start/end)

**Variant syntax:** `{breakpoint}:{state}:{utility}`, e.g. `md:hover:text-blue-500`  
**Per-class important:** `!text-red-500` (leading `!`)

**In source:**
- Scale objects: `camelCase` with `Scale` suffix (e.g. `fontSizeScale`)
- Resolver functions: `resolve*` prefix (e.g. `resolveSpacing`, `resolveColor`)
- Rule arrays: `export const {category}Rules: Rule[]`
- Visual section dividers: `// ───── Category Name ─────`
- Handlers are inline arrow functions for simple rules; multi-line for complex logic

**Rule file structure:** Each file exports one array. Rules within a file ordered specific → general; catch-alls always last.

---

## Data Flow Summary

```
Source files
  │  (glob + 4 regex strategies)
  ▼
Set<string>  ← unique class names found in project
  │  (generateCSS)
  ▼
for each className:
  parseVariants → { responsive, state, dark, media, utility }
  matchRules(utility) → CSSDeclaration | null
  buildSelector + wrapMediaQueries → css string
  │
  ├─ base rules → baseOutput[]
  └─ responsive rules → responsiveOutput[breakpoint][]
  │
  keyframes (Set, deduped)
  │
  ▼
keyframes + base + sm + md + lg + xl + 2xl  ← final CSS string
  │
  ▼
dist/utilities.css
```

---

## Things to Know Before Extending

1. **Adding a new rule:** Add to the correct category file, place it before any catch-all in that file, give it a unique `name`. Export the updated array through `rules/index.ts`.
2. **Adding colors:** Use `addColor(name, hex)` at runtime or add to `colorScale` in `colors.ts`.
3. **New variant type:** Add parsing logic in `generator.ts` where variants are detected (step 4 in algorithm above), then add wrapping logic downstream.
4. **New file type in scanner:** Add extension to the glob pattern in `scanFiles`. If the class attribute syntax is novel, add a fifth regex strategy.
5. **Cache invalidation:** Call `clearCache()` if rules or options change between `generateCSS` calls in the same process (e.g. in tests).
