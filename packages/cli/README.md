# @zee-css/cli

File scanner and CSS build tool for zee-css. Scans your project source files, extracts all utility class names, and generates a tree-shaken CSS output file.

---

## Install

```bash
# Local (recommended)
npm install -D @zee-css/cli

# Global
npm install -g @zee-css/cli
```

---

## Usage

```bash
# Scan current directory → dist/utilities.css
npx zee-css

# Scan a specific directory
npx zee-css ./src

# Custom output path
npx zee-css ./src --output public/styles/utilities.css

# Watch mode (rebuilds on file change)
npx zee-css ./src --watch

# Minified output for production
npx zee-css ./src --minify --output dist/utilities.min.css

# Add !important to all rules
npx zee-css ./src --important

# Prefix all class selectors (e.g., .z-pa-4 instead of .pa-4)
npx zee-css ./src --prefix z-
```

---

## Options

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--output <path>` | `-o` | Output CSS file path | `<dir>/dist/utilities.css` |
| `--watch` | `-w` | Watch and rebuild on changes | `false` |
| `--minify` | `-m` | Single-line minified output | `false` |
| `--important` | | Add `!important` to all declarations | `false` |
| `--prefix <p>` | | Namespace class selectors | `""` |
| `--help` | `-h` | Show help | |
| `--version` | `-v` | Show version | |

---

## Scanned file types

`.html` `.htm` `.jsx` `.tsx` `.vue` `.svelte` `.astro` `.ts` `.js` `.mdx` `.php` `.erb`

Ignored directories: `node_modules/`, `dist/`, `.git/`

---

## Extracted class syntaxes

The CLI understands all common class attribute patterns:

```html
<!-- HTML attribute -->
<div class="pa-4 bg-blue-500 hover:opacity-80">

<!-- JSX className -->
<div className="grid grid-cols-3 gap-4">

<!-- Template literal (JSX/TSX) -->
<div class={`pa-${size} bg-${color}`}>

<!-- Vue :class binding -->
<div :class="{ 'text-red-500': isError }">

<!-- Svelte class directive -->
<div class:active={isActive}>
```

---

## Output stats

The CLI prints a summary after each build:

```
⚡ zee-css v1.0.0

ℹ Scanning /your/project
✓ Generated 290 utilities → /your/project/dist/utilities.css (15.3KB in 44ms)
```

---

## Link the output

```html
<head>
  <link rel="stylesheet" href="/dist/utilities.css" />
</head>
```

---

## Watch mode

```bash
npx zee-css ./src --watch
```

Rebuilds with 100ms debounce on any file change. Prints timing and utility count after each rebuild.

---

## License

ISC © [praballl](https://github.com/praballl)
