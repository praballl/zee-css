# Zee CSS ⚡

A high-performance, TypeScript-based utility CSS framework — fully programmable, zero-dependency, and built with modern CSS architecture principles (similar to Tailwind CSS, but programmatically extensible in TypeScript).

[![npm version](https://img.shields.io/npm/v/@zee-css/core.svg)](https://www.npmjs.com/package/@zee-css/core)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## ✨ Enterprise Features

- 🚀 **Programmatic CSS Generation**: Define and extend utility class rules directly in TypeScript.
- 📱 **Mobile-First Responsive Design**: Responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) wrapped in `@media` queries.
- 🎯 **State Variants**: Pseudo-class variants (`hover:`, `focus:`, `active:`, `disabled:`, `first:`, `last:`, `odd:`, `even:`, `placeholder:`).
- ⚡ **High-Performance Caching**: O(1) memoized generator lookups for lightning-fast build speeds.
- 🎨 **Dynamic Design Tokens**: CSS Custom Properties (`--z-*`) with runtime `addColor()` and `setColor()` dynamic rules.
- 🪶 **Tree-shaked Output**: Generates CSS *only* for utilities parsed in your project files.
- 🛠️ **CLI Tooling**: Scans `.html`, `.jsx`, `.tsx`, `.vue`, `.svelte`, `.astro`, `.ts`, `.js`, `.mdx` files with `--watch` mode, `--minify`, `--prefix`, and `--important` flags.
- 📦 **NPM & Monorepo Ready**: Clean dual CJS/ESM distribution maps, `.npmignore` optimization, and workspace integration.

---

## 📁 Project Architecture

```
zee-css/
├── packages/
│   ├── core/                  # Engine & Rule definitions (@zee-css/core)
│   │   ├── src/
│   │   │   ├── rules.ts       # Scales, responsive variants, state variants & rules
│   │   │   ├── generator.ts   # Memoized parser & CSS builder
│   │   │   └── index.ts       # Public API exports
│   │   ├── dist/              # Dual CJS/ESM + TypeScript declaration builds
│   │   └── package.json
│   └── cli/                   # Scanner & Build Tool CLI (@zee-css/cli)
│       ├── src/
│       │   └── index.ts       # CLI entry point (watch mode, regex parsing)
│       └── package.json
├── examples/
│   └── vite-demo/             # Live visual test laboratory
└── package.json               # Monorepo configuration
```

---

## 🚀 Quick Start

### 1. Installation

```bash
# Install core engine
npm install @zee-css/core

# Install CLI locally (recommended)
npm install -D @zee-css/cli

# Or install CLI globally
npm install -g @zee-css/cli
```

### 2. Basic Usage

In your project HTML/JSX/Vue/Svelte components:

```html
<div class="pa-4 md:pa-8 bg-primary text-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
  <h1 class="fs-2xl font-bold mb-2">Hello Zee CSS</h1>
  <p class="fs-base opacity-90">Enterprise utility CSS built in TypeScript.</p>
</div>
```

Run the generator:

```bash
# Scan project & build output to dist/utilities.css
npx zee-css

# Or watch for changes during development
npx zee-css --watch

# Minify for production
npx zee-css -o dist/utilities.min.css --minify
```

---

## 🎨 Utility & Variant Reference

### 1. Responsive Variants
Prepend any utility with `sm:`, `md:`, `lg:`, `xl:`, or `2xl:`:
- `pa-4` → base padding
- `md:pa-8` → padding applied at `@media (min-width: 768px)`
- `lg:row` → flex row at `@media (min-width: 1024px)`

### 2. State Variants
Prepend any utility with state prefixes:
- `hover:bg-accent` → `:hover`
- `focus:border-primary` → `:focus`
- `disabled:opacity-50` → `:disabled`
- `first:pt-0` → `:first-child`
- `even:bg-secondary` → `:nth-child(even)`

### 3. Spacing Utilities
Uses rem-based scale (`1` = `0.25rem` / `4px` baseline):
- **Padding**: `pa-{n|name}`, `pt-`, `pb-`, `pl-`, `pr-`, `px-`, `py-`
- **Margin**: `ma-{n|name|auto}`, `mt-`, `mb-`, `ml-`, `mr-`, `mx-`, `my-`
- **Negative Margin**: `-mt-4`, `-mb-2`, `-mx-6`

### 4. Flexbox & Grid
- **Flex Container**: `row`, `column`, `row-reverse`, `column-reverse`, `flex-wrap`
- **Flex Alignment**: `items-center`, `justify-between`, `content-center`, `self-end`
- **12-Column Grid**: `col-6` (50%), `col-4` (33.33%), `offset-2`, `order-first`
- **Display**: `flex`, `inline-flex`, `grid`, `block`, `inline-block`, `hidden`

### 5. Typography & Effects
- **Font Size**: `fs-xs`, `fs-sm`, `fs-base`, `fs-lg`, `fs-xl`, `fs-2xl`, `fs-3xl`, `fs-4xl`...
- **Font Weight**: `font-thin`, `font-normal`, `font-medium`, `font-bold`, `font-black`
- **Effects**: `shadow-sm`, `shadow-md`, `shadow-lg`, `blur-md`, `rounded-full`, `opacity-80`

---

## ⚙️ Programmatic API (@zee-css/core)

```typescript
import { generateCSS, addColor, generateCSSForClass } from "@zee-css/core";

// Add custom dynamic colors at runtime
addColor("brand", "#3b82f6");

// Single class generation
const rule = generateCSSForClass("hover:bg-brand");
console.log(rule?.css);
// Output:
// .hover\:bg-brand:hover {
//   background-color: #3b82f6;
// }

// Bulk generation with options
const css = generateCSS(["pa-4", "md:pa-8", "hover:opacity-80"], {
  minify: true,
  important: false,
});
```

---

## 🛠️ CLI Options

| Flag | Shorthand | Description | Default |
| --- | --- | --- | --- |
| `--output` | `-o` | Target CSS destination path | `<dir>/dist/utilities.css` |
| `--watch` | `-w` | Watch source files & automatically rebuild | `false` |
| `--minify` | `-m` | Output minified single-line CSS | `false` |
| `--important` | | Add `!important` flag to all generated rules | `false` |
| `--prefix` | | Namespace class names (e.g. `z-`) | `""` |
| `--help` | `-h` | Display CLI help menu | |
| `--version` | `-v` | Display version | |

---

## 🚢 Publishing to NPM

This project is pre-configured for npm publishing.

### 1. Login to NPM
```bash
npm login
```

### 2. Build & Verify Packages
```bash
# Clean & build TypeScript outputs
npm run build

# Dry-run npm pack to verify publish bundle tarballs
npm run pack:dry
```

### 3. Bump Versions
```bash
# Patch version bump across workspaces (e.g., 1.0.0 -> 1.0.1)
npm run version:patch
```

### 4. Publish Packages
```bash
# Publish both packages to npm
npm run publish:all
```

---

## 📄 License

ISC © [praballl](https://github.com/praballl)