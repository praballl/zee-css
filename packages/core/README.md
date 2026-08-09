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
- **Auto-responsive typography**: `autoResponsive: true` replaces all `font-size` values with fluid `clamp()` — scales from a mobile floor to the desktop target without any breakpoints
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
  autoResponsive?: boolean;       // Fluid clamp() font sizes (see below)
}
```

### Auto-responsive typography

When `autoResponsive: true`, every `font-size` declaration is replaced with a CSS `clamp()` value that scales smoothly with viewport width — no manual `sm:` / `md:` overrides needed.

```typescript
generateCSSForClass("fs-base", { autoResponsive: true });
// .fs-base { font-size: clamp(0.875rem, 2vw, 1rem); }
//                              ↑ mobile floor  ↑ fluid mid  ↑ desktop cap

generateCSSForClass("text-h1", { autoResponsive: true });
// .text-h1 { font-size: clamp(4rem, 12vw, 6rem); ... }

generateCSSForClass("font-14", { autoResponsive: true });
// .font-14 { font-size: clamp(0.75rem, 1.75vw, 0.875rem); }
```

The named sizes (`fs-xs` → `fs-9xl`) use hand-tuned clamp ranges. Arbitrary px sizes (`font-{n}`) auto-derive a clamp range at 85% mobile floor.

You can inspect or extend the curated scale:

```typescript
import { fluidFontScale } from "@zee-css/core";
// { xs: "clamp(0.625rem, 1.5vw, 0.75rem)", sm: "clamp(...)", ... }
```

### Color management

```typescript
import { addColor, setColor, clearCache, resolveColor } from "@zee-css/core";

addColor("brand", "#6366f1");           // Add new color
setColor("primary", "#ec4899");         // Override existing color
clearCache();                            // Invalidate after color changes

const value = resolveColor("blue-500"); // "#3b82f6"
```

### Breakpoint management

```typescript
import { setBreakpoint, addBreakpoint, breakpoints, clearCache } from "@zee-css/core";

// Override a default breakpoint
setBreakpoint('md', '900px');      // was 768px → now 900px
setBreakpoint('lg', '1100px');     // was 1024px

// Add a brand-new breakpoint (usable as a variant immediately)
addBreakpoint('3xl', '1920px');    // 3xl:pa-8, 3xl:text-h1, etc.
addBreakpoint('xs', '480px');      // xs:hidden, xs:flex, etc.

// addBreakpoint is a no-op when the name already exists
addBreakpoint('md', '999px');      // ignored — use setBreakpoint to override

// Always clear the cache after any breakpoint change
clearCache();

// Inspect current breakpoints
console.log(breakpoints);
// { sm: '640px', md: '900px', lg: '1100px', xl: '1280px', '2xl': '1536px', '3xl': '1920px', xs: '480px' }
```

Generated CSS respects the updated values immediately:

```typescript
generateCSSForClass('md:pa-4');
// @media (min-width: 900px) { .md\:pa-4 { padding: 1rem; } }

generateCSSForClass('3xl:fs-xl');
// @media (min-width: 1920px) { .3xl\:fs-xl { font-size: 1.25rem; } }
```

### Scales & breakpoints

```typescript
import {
  spacingScale, colorScale,
  fontSizeScale, fluidFontScale,       // fluidFontScale: clamp() equivalents for autoResponsive
  fontWeightScale, blurScale, shadowScale, borderRadiusScale,
  breakpoints, setBreakpoint, addBreakpoint,  // breakpoint management
  stateVariants,
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
