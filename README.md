# Zee CSS

A high-performance, TypeScript-based utility CSS framework — Tailwind-compatible classes, zero-dependency core, tree-shaken output, and fully programmable in TypeScript.

[![npm version](https://img.shields.io/npm/v/@zee-css/core.svg)](https://www.npmjs.com/package/@zee-css/core)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## Features

- **500+ utility classes** covering spacing, layout, typography, color, effects, transforms, interactivity, and more
- **Full Tailwind color palette** — 22 color families × 11 shades = 242 colors (slate, gray, red, blue, green, purple, etc.)
- **CSS Grid** — `grid-cols-*`, `col-span-*`, `row-span-*`, `grid-flow-*`, `auto-cols-*`
- **Gradients** — `bg-gradient-to-{direction}` + `from-{color}` + `via-{color}` + `to-{color}`
- **Auto-responsive typography** — `autoResponsive: true` replaces all font sizes with fluid `clamp()` values that scale smoothly from mobile to desktop — no manual breakpoints needed
- **Dark mode** — `dark:` variant (media-query or class-based)
- **Animations** — `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce`
- **Arbitrary values** — `w-[200px]`, `text-[#ff0000]`, `p-[13px]`
- **Space between** — `space-x-*`, `space-y-*` (automatic sibling margins)
- **Divide utilities** — `divide-x`, `divide-y`, `divide-{color}`
- **Ring utilities** — `ring`, `ring-{0-8}`, `ring-{color}`, `ring-inset`
- **Backdrop filters** — `backdrop-blur-*`, `backdrop-brightness-*`, `backdrop-contrast-*`
- **Material Design typography** — `text-h1`…`text-h6`, `text-subtitle1/2`, `text-body1/2`, `text-caption`, `text-overline`
- **Print & motion variants** — `print:`, `motion-safe:`, `motion-reduce:`
- **RTL / Logical properties** — `ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`
- **SVG utilities** — `fill-{color}`, `stroke-{color}`, `stroke-{0-2}`
- **Per-class important** — `!pa-4` adds `!important` to one class
- **Responsive** — `sm:`, `md:`, `lg:`, `xl:`, `2xl:` mobile-first breakpoints — fully customizable via `setBreakpoint` / `addBreakpoint`
- **State variants** — `hover:`, `focus:`, `active:`, `disabled:`, `first:`, `last:`, `odd:`, `even:`, `placeholder:`
- **Tree-shaken output** — CLI scans your source files and only generates CSS for classes you use
- **O(1) caching** — memoized generator for fast repeated builds
- **Zero runtime dependencies** in the core engine

---

## Project Structure

```
zee-css/
├── packages/
│   ├── core/                    @zee-css/core — CSS generation engine
│   │   └── src/
│   │       ├── rules/
│   │       │   ├── types.ts     Rule interface (selectorSuffix, keyframes)
│   │       │   ├── scales.ts    Spacing, breakpoints, state variants
│   │       │   ├── colors.ts    Full Tailwind color palette (242 colors)
│   │       │   ├── spacing.ts   Padding, margin, space-between, RTL
│   │       │   ├── flexbox.ts   Flex direction, wrap, alignment
│   │       │   ├── grid.ts      CSS Grid + 12-col flex grid + gap
│   │       │   ├── layout.ts    Display, table, sizing, position, float
│   │       │   ├── typography.ts Text, font, MD scale, vertical-align
│   │       │   ├── backgrounds.ts Backgrounds, gradients, clip
│   │       │   ├── effects.ts   Shadow, ring, blur, border, divide, outline
│   │       │   ├── transforms.ts Transitions, transforms, animations
│   │       │   └── interactivity.ts Cursor, scroll, snap, SVG, a11y
│   │       ├── generator.ts     CSS generator (dark mode, arbitrary values)
│   │       └── index.ts         Public API
│   └── cli/                     @zee-css/cli — file scanner & build tool
└── examples/
    └── vite-demo/               Live showcase of all 500+ utilities
```

---

## Quick Start

### Install

```bash
npm install @zee-css/core
npm install -D @zee-css/cli
```

### Use in HTML / JSX / Vue / Svelte

```html
<!-- Spacing & layout -->
<div class="pa-6 mx-auto max-w-48 grid grid-cols-3 gap-4">

  <!-- Typography -->
  <h1 class="text-h2 font-bold text-slate-900">Hello Zee CSS</h1>
  <p class="text-body1 text-slate-600 leading-relaxed">TypeScript-first CSS framework</p>

  <!-- Colors (full Tailwind palette) -->
  <div class="bg-blue-500 text-white pa-4 rounded-xl hover:bg-blue-700 transition duration-200">
    hover:bg-blue-700
  </div>

  <!-- Dark mode -->
  <div class="bg-white dark:bg-slate-800 text-slate-900 dark:text-white pa-4 rounded-xl">
    Adapts to dark mode
  </div>

  <!-- Gradient -->
  <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white pa-4 rounded-xl">
    Gradient
  </div>

  <!-- Animations -->
  <div class="animate-spin">...</div>

  <!-- Arbitrary values -->
  <div class="w-[180px] p-[13px] text-[#e74c3c]">Arbitrary values</div>

</div>
```

### Run the CLI

```bash
# Scan your project and generate CSS
npx zee-css ./src --output dist/utilities.css

# Watch mode for development
npx zee-css ./src --watch

# Minify for production
npx zee-css ./src --output dist/utilities.min.css --minify
```

### Link the output in HTML

```html
<link rel="stylesheet" href="/dist/utilities.css" />
```

---

## Utility Reference

### Spacing

| Class | CSS |
|-------|-----|
| `pa-4` | `padding: 1rem` |
| `px-4` | `padding-left: 1rem; padding-right: 1rem` |
| `py-4` | `padding-top: 1rem; padding-bottom: 1rem` |
| `pt-4 pb-4 pl-4 pr-4` | individual sides |
| `ma-4`, `mx-auto`, `my-4` | margin variants |
| `-mt-4` | `margin-top: -1rem` |
| `space-x-4` | `> * + * { margin-left: 1rem }` |
| `space-y-4` | `> * + * { margin-top: 1rem }` |
| `ps-4`, `pe-4` | `padding-inline-start/end` (RTL-safe) |
| `ms-4`, `me-4` | `margin-inline-start/end` (RTL-safe) |

Spacing scale: `0`, `px`, `0.5`, `1`…`96` (rem-based, 4px baseline) + named `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`.

### Layout

| Class | CSS |
|-------|-----|
| `flex`, `grid`, `block`, `hidden`, `inline`, `inline-flex`, `contents` | `display` |
| `row`, `column`, `row-reverse`, `column-reverse` | `display:flex` + direction |
| `items-center`, `justify-between`, `self-end` | flex/grid alignment |
| `container` | `width:100%; margin:0 auto` |
| `relative`, `absolute`, `fixed`, `sticky`, `static` | position |
| `top-4`, `right-4`, `bottom-4`, `left-4`, `inset-4` | inset |
| `z-10`, `z-20`…`z-50`, `z-auto` | z-index |
| `w-full`, `w-auto`, `w-screen`, `w-1/2`, `w-[200px]` | width |
| `h-full`, `h-screen`, `h-[60px]` | height |
| `overflow-hidden`, `overflow-x-auto`, `overflow-y-scroll` | overflow |
| `float-left`, `float-right`, `float-none` | float |
| `table`, `table-row`, `table-cell` | table display |
| `border-collapse`, `table-auto`, `table-fixed` | table layout |
| `isolate`, `isolation-auto` | isolation |
| `fit`, `full-width`, `full-height` | convenience aliases |

### CSS Grid

| Class | CSS |
|-------|-----|
| `grid-cols-{1-12}` | `grid-template-columns: repeat(n, minmax(0, 1fr))` |
| `grid-rows-{1-12}` | `grid-template-rows: repeat(n, minmax(0, 1fr))` |
| `col-span-{1-12}` | `grid-column: span n / span n` |
| `col-span-full` | `grid-column: 1 / -1` |
| `col-start-{1-13}`, `col-end-{1-13}` | grid column start/end |
| `row-span-{1-12}` | `grid-row: span n / span n` |
| `row-start-{1-7}`, `row-end-{1-7}` | grid row start/end |
| `auto-cols-{auto,min,max,fr}` | `grid-auto-columns` |
| `auto-rows-{auto,min,max,fr}` | `grid-auto-rows` |
| `grid-flow-{row,col,dense,row-dense,col-dense}` | `grid-auto-flow` |
| `gap-4`, `gap-x-4`, `gap-y-4` | gap utilities |

### Typography

| Class | Description |
|-------|-------------|
| `text-h1` … `text-h6` | Material Design heading scale |
| `text-subtitle1`, `text-subtitle2` | MD subtitle scale |
| `text-body1`, `text-body2` | MD body text |
| `text-caption`, `text-overline` | MD caption & overline |
| `fs-xs` … `fs-9xl` | Font size by name |
| `font-{thin,light,normal,medium,semibold,bold,black}` | Font weight |
| `font-sans`, `font-serif`, `font-mono` | Font family |
| `leading-{none,tight,normal,relaxed,loose}` | Line height |
| `tracking-{tighter,tight,normal,wide,widest}` | Letter spacing |
| `uppercase`, `lowercase`, `capitalize`, `normal-case` | Text transform |
| `underline`, `line-through`, `no-underline` | Text decoration |
| `truncate`, `text-ellipsis`, `text-clip` | Text overflow |
| `text-left`, `text-center`, `text-right`, `text-start`, `text-end` | Text align |
| `italic`, `not-italic` | Font style |
| `align-top`, `align-middle`, `align-bottom`, `align-baseline` | Vertical align |
| `whitespace-nowrap`, `whitespace-pre-wrap` | White space |
| `break-words`, `break-all`, `break-keep` | Word break |

### Colors

Zee CSS includes the full Tailwind color palette:

```
slate   gray    zinc    neutral stone
red     orange  amber   yellow  lime
green   emerald teal    cyan    sky
blue    indigo  violet  purple  fuchsia
pink    rose
```

Each with shades `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`.

```html
<div class="bg-blue-500 text-white">      <!-- background -->
<div class="text-rose-600">              <!-- text color -->
<div class="border border-green-400">   <!-- border color -->
<div class="ring-2 ring-purple-400">    <!-- ring / focus -->
<div class="fill-amber-500">            <!-- SVG fill -->
<div class="stroke-red-500 stroke-2">   <!-- SVG stroke -->
```

Theme colors via CSS variables:

```css
:root {
  --z-primary: #6366f1;
  --z-secondary: #8b5cf6;
  --z-accent: #ec4899;
  --z-positive: #22c55e;
  --z-negative: #ef4444;
  --z-info: #06b6d4;
  --z-warning: #f59e0b;
}
```

### Backgrounds & Gradients

```html
<!-- Position & size -->
<div class="bg-center bg-cover bg-no-repeat">
<div class="bg-contain bg-fixed bg-local">

<!-- Clip -->
<div class="bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-transparent">
  Gradient text
</div>

<!-- Gradients -->
<div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
```

### Effects

```html
<!-- Shadows -->
<div class="shadow shadow-sm shadow-md shadow-lg shadow-xl shadow-2xl shadow-inner">

<!-- Blur filters -->
<div class="blur blur-sm blur-md blur-lg blur-xl">

<!-- Other filters -->
<div class="brightness-150 contrast-125 saturate-150 grayscale sepia invert">
<div class="hue-rotate-90 -hue-rotate-45">

<!-- Backdrop filters -->
<div class="backdrop-blur-md backdrop-brightness-75">

<!-- Blend modes -->
<div class="mix-blend-multiply mix-blend-screen mix-blend-overlay">
```

### Ring (Focus) Utilities

```html
<input class="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
<button class="ring ring-inset ring-purple-400">
```

### Divide Utilities

```html
<!-- Horizontal dividers between children -->
<div class="divide-y divide-slate-200">
  <div class="pa-4">Row 1</div>
  <div class="pa-4">Row 2</div>
</div>

<!-- Vertical dividers -->
<div class="row divide-x divide-slate-300">
  <div class="pa-4">Col A</div>
  <div class="pa-4">Col B</div>
</div>
```

### Borders & Outlines

```html
<div class="border border-slate-300 rounded-xl">
<div class="border-2 border-dashed border-blue-400">
<div class="border-t border-b border-slate-200">
<div class="border-s-4 border-indigo-500">   <!-- inline-start -->
<div class="rounded-full rounded-xl rounded-lg">

<!-- Outlines -->
<input class="focus:outline-none focus:ring-2 focus:ring-blue-400">
<div class="outline outline-2 outline-offset-2 outline-blue-500">
```

### Transforms & Animations

```html
<!-- Transforms (apply hover: for interactive) -->
<div class="hover:scale-110 transition duration-300">
<div class="hover:rotate-12 transition">
<div class="hover:-translate-y-4 transition">
<div class="hover:skew-x-6 transition">

<!-- Animations (with @keyframes in output) -->
<div class="animate-spin">   <!-- 360° rotation loop -->
<div class="animate-ping">   <!-- scale + fade out loop -->
<div class="animate-pulse">  <!-- opacity loop -->
<div class="animate-bounce"> <!-- bounce loop -->
```

### Interactivity

```html
<div class="cursor-pointer cursor-not-allowed cursor-grab">
<div class="select-none select-all select-text">
<input class="caret-blue-500 accent-purple-500">
<div class="scroll-smooth scroll-m-4 scroll-p-4">
<div class="snap-x snap-mandatory">
  <div class="snap-start">...</div>
</div>
<div class="resize resize-x resize-y resize-none">
<div class="touch-manipulation touch-pan-y">
<div class="will-change-transform will-change-scroll">
```

### SVG

```html
<svg><circle class="fill-blue-500" /></svg>
<svg><rect class="fill-none stroke-red-500 stroke-2" /></svg>
<svg><path class="stroke-current stroke-1" /></svg>
```

### Variants

#### Responsive (mobile-first)

```html
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
<div class="pa-4 md:pa-8 lg:pa-12">
<div class="text-body2 md:text-body1 lg:text-h6">
```

#### Auto-responsive typography

Pass `autoResponsive: true` to the generator and every `font-size` declaration is automatically replaced with a fluid `clamp()` value — no breakpoints needed.

```typescript
generateCSS(classNames, { autoResponsive: true });
```

| Class | Without `autoResponsive` | With `autoResponsive` |
|-------|--------------------------|----------------------|
| `fs-sm` | `font-size: 0.875rem` | `font-size: clamp(0.75rem, 1.75vw, 0.875rem)` |
| `fs-base` | `font-size: 1rem` | `font-size: clamp(0.875rem, 2vw, 1rem)` |
| `fs-2xl` | `font-size: 1.5rem` | `font-size: clamp(1.25rem, 3vw, 1.5rem)` |
| `text-h2` | `font-size: 3.75rem` | `font-size: clamp(2.75rem, 7.5vw, 3.75rem)` |
| `font-14` | `font-size: 0.875rem` | `font-size: clamp(0.75rem, 1.75vw, 0.875rem)` |

Works with all font-size syntaxes: `fs-{scale}`, `font-{px}`, and Material Design headings (`text-h1`–`text-h6`).

#### State

```html
<div class="hover:bg-blue-700 focus:ring-2 active:scale-95 disabled:opacity-50">
<li class="first:pt-0 last:pb-0 odd:bg-slate-50 even:bg-white">
<input class="placeholder:text-slate-400">
```

#### Dark mode

```html
<!-- Automatically adapts to OS dark mode -->
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
```

#### Print & Motion

```html
<div class="no-print">Hidden when printing</div>
<div class="motion-safe:animate-spin">Only animates if motion is OK</div>
<div class="motion-reduce:transition-none">Disables transition for reduced-motion users</div>
<div class="print:text-black print:bg-white">Print-specific styles</div>
```

#### Per-class important

```html
<div class="!pa-4">   <!-- padding: 1rem !important -->
```

#### Arbitrary values

```html
<div class="w-[200px] h-[80px] p-[13px] text-[#ff6b6b] bg-[#1a1a2e]">
```

---

## Programmatic API

```typescript
import {
  generateCSS, generateCSSForClass,
  addColor, setColor,
  setBreakpoint, addBreakpoint,
  clearCache,
} from "@zee-css/core";

// ── Breakpoints ──────────────────────────────
// Override an existing breakpoint
setBreakpoint('md', '900px');      // was 768px

// Add a brand-new breakpoint
addBreakpoint('3xl', '1920px');    // now usable as 3xl:pa-8

// addBreakpoint is a no-op if the name already exists — use setBreakpoint to override
addBreakpoint('md', '999px');      // ignored, md stays 900px

// Always clear the cache after changing breakpoints
clearCache();

// ── Colors ───────────────────────────────────
// Add custom colors
addColor("brand", "#6366f1");
addColor("brand-dark", "#4f46e5");

// Generate CSS for a single class
const rule = generateCSSForClass("hover:bg-brand", { darkMode: "class" });
console.log(rule?.css);
// .hover\:bg-brand:hover { background-color: #6366f1; }

// Generate CSS for a set of classes
const css = generateCSS(
  ["pa-4", "md:pa-8", "hover:bg-blue-500", "dark:text-white", "animate-spin"],
  { minify: true, darkMode: "media" }
);

// Clear cache after color changes
setColor("primary", "#ec4899");
clearCache();
```

---

## CLI Options

```bash
npx zee-css [directory] [options]
```

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--output <path>` | `-o` | Output CSS file path | `<dir>/dist/utilities.css` |
| `--watch` | `-w` | Watch source files and rebuild | `false` |
| `--minify` | `-m` | Minified single-line output | `false` |
| `--important` | | Add `!important` to all rules | `false` |
| `--prefix <p>` | | Namespace class selectors (e.g. `z-`) | `""` |
| `--auto-responsive` | | Fluid `clamp()` font sizes on all breakpoints | `false` |
| `--help` | `-h` | Show help | |
| `--version` | `-v` | Show version | |

Scanned file extensions: `.html`, `.htm`, `.jsx`, `.tsx`, `.vue`, `.svelte`, `.astro`, `.ts`, `.js`, `.mdx`, `.php`, `.erb`

---

## Publishing

```bash
npm run build          # Build core + CLI
npm run version:patch  # Bump patch version
npm run publish:all    # Publish both packages to npm
```

---

## License

ISC © [praballl](https://github.com/praballl)
