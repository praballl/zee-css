# @zee-css/core

TypeScript-first utility CSS generation engine — zero runtime dependencies, O(1) memoized lookups, 500+ utility rules, full Tailwind color palette.

---

## Install

```bash
npm install @zee-css/core
```

---

## What's included

### Rule modules

| Module | Utilities |
|--------|-----------|
| `spacing` | `pa-*`, `pt-*`, `mx-*`, `-mt-*`, `space-x-*`, `space-y-*`, `ps-*`, `pe-*`, `ms-*`, `me-*` |
| `flexbox` | `row`, `column`, `flex-wrap`, `items-*`, `justify-*`, `self-*`, `place-*` |
| `grid` | `grid-cols-*`, `col-span-*`, `row-span-*`, `grid-flow-*`, `auto-cols-*`, `gap-*` |
| `layout` | `flex`, `grid`, `hidden`, `table-*`, `container`, `w-*`, `h-*`, `absolute`, `z-*`, `overflow-*`, `float-*`, `fit`, `isolate`, `columns-*` |
| `typography` | `text-h1`…`text-h6`, `text-body1/2`, `text-subtitle1/2`, `text-caption`, `text-overline`, `fs-*`, `font-*`, `leading-*`, `tracking-*`, `align-top/middle/bottom` |
| `backgrounds` | `bg-cover`, `bg-center`, `bg-clip-text`, `bg-fixed`, `bg-gradient-to-*`, `from-*`, `via-*`, `to-*`, `bg-{color}` |
| `effects` | `shadow-*`, `ring`, `ring-*`, `blur-*`, `brightness-*`, `contrast-*`, `saturate-*`, `grayscale`, `sepia`, `invert`, `hue-rotate-*`, `backdrop-blur-*`, `border-*`, `rounded-*`, `divide-*`, `outline-*`, `mix-blend-*` |
| `transforms` | `scale-*`, `rotate-*`, `translate-x/y-*`, `skew-*`, `transition-*`, `duration-*`, `delay-*`, `ease-*`, `animate-spin/ping/pulse/bounce`, `will-change-*` |
| `interactivity` | `cursor-*`, `select-*`, `scroll-smooth`, `snap-*`, `touch-*`, `resize-*`, `accent-*`, `caret-*`, `fill-*`, `stroke-*`, `sr-only` |
| **colors** | 242 colors — 22 families × 11 shades (full Tailwind palette) |

### Generator features

- **Responsive variants**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- **State variants**: `hover:`, `focus:`, `active:`, `disabled:`, `first:`, `last:`, `odd:`, `even:`, `placeholder:`
- **Dark mode**: `dark:` (prefers-color-scheme media or `.dark` class)
- **Media variants**: `print:`, `motion-safe:`, `motion-reduce:`, `contrast-more:`, `contrast-less:`
- **Per-class important**: `!pa-4` → `padding: 1rem !important`
- **Arbitrary values**: `w-[200px]`, `text-[#ff0000]`, `p-[13px]`
- **Child selectors**: `space-x-*`, `divide-*` use `> * + *` selectors
- **Keyframes**: Animation rules include `@keyframes` in output
- **O(1) cache**: Results memoized per class + options combination

---

## API

### `generateCSSForClass(className, options?)`

Generate CSS for a single utility class name.

```typescript
import { generateCSSForClass } from "@zee-css/core";

const result = generateCSSForClass("hover:bg-blue-500");
// result.className === "hover:bg-blue-500"
// result.css === ".hover\\:bg-blue-500:hover {\n  background-color: #3b82f6;\n}"

// With options
generateCSSForClass("dark:pa-4", { darkMode: "class", minify: true });
// ".dark .dark\\:pa-4{padding:1rem}"

// Arbitrary values
generateCSSForClass("w-[200px]");
// ".w-\\[200px\\] {\n  width: 200px;\n}"

// Per-class important
generateCSSForClass("!pa-4");
// ".\\!pa-4 {\n  padding: 1rem !important;\n}"
```

### `generateCSS(classNames, options?)`

Generate CSS for a collection of class names. Deduplicates, groups responsive rules by breakpoint, collects `@keyframes`.

```typescript
import { generateCSS } from "@zee-css/core";

const css = generateCSS(
  new Set(["pa-4", "md:pa-8", "hover:bg-blue-500", "animate-spin"]),
  { minify: false, darkMode: "media" }
);
```

### `GeneratorOptions`

```typescript
interface GeneratorOptions {
  important?: boolean;            // Add !important to ALL declarations
  prefix?: string;                // Namespace selectors (e.g. "z-" → .z-pa-4)
  minify?: boolean;               // Single-line output
  darkMode?: "media" | "class";  // dark: variant strategy
}
```

### Color management

```typescript
import { addColor, setColor, clearCache, resolveColor } from "@zee-css/core";

addColor("brand", "#6366f1");           // Add new color
setColor("primary", "#ec4899");         // Override existing color
clearCache();                            // Invalidate after color changes

const value = resolveColor("blue-500"); // "#3b82f6"
```

### Scales & breakpoints

```typescript
import {
  spacingScale, colorScale, fontSizeScale, fontWeightScale,
  blurScale, shadowScale, borderRadiusScale,
  breakpoints, stateVariants,
  resolveSpacing, resolveSizing,
} from "@zee-css/core";
```

---

## Package exports

```json
{
  ".":           "@zee-css/core main API",
  "./rules":     "Rule definitions, scales & color palette",
  "./generator": "CSS generator"
}
```

---

## Running tests

```bash
npm test
```

59 tests covering every rule category, variant system, arbitrary values, dark mode, animations, and keyframes.

---

## License

ISC © [praballl](https://github.com/praballl)
