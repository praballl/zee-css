# Changelog

All notable changes to `@zee-css/cli` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-08-20

### Fixed
- **The scanner now sees conditional class names.** Extraction matched only
  `className="..."` and `` className={`...`} ``, so anything written as an
  expression was invisible:

  ```jsx
  className={active ? "border-indigo-500" : "border-transparent"}
  className={"rounded-md " + extra}
  ```

  Those classes silently produced no CSS. The scanner now reads the whole
  brace-balanced attribute value and collects every string literal inside it.
- **`--auto-responsive` actually works.** It was documented in the README but
  never read from `argv`.
- **Watch mode watches what is scanned.** It watched a hardcoded `<dir>/src`
  and exited if that directory did not exist, so `--output` targets outside
  `src` and projects without a `src` folder could not use `--watch` at all. It
  now derives the watch roots from the active patterns.

### Added
- **`--content <glob>`** (repeatable) to set the scan target explicitly, e.g.
  `zee-css . --content "app/**/*.tsx" -o app/zee.css`.
- **`--dark-mode <media|class>`**, exposing the core's existing `darkMode`
  option so a `.dark` ancestor can drive the theme.
- **Smarter default scan root.** With no `--content`, the CLI scans
  `<dir>/src` when it exists and falls back to `<dir>` otherwise. Previously
  `src` was hardcoded, so a Next.js `app/` router project generated an empty
  stylesheet with no error.
- `.mjs` / `.cjs` added to the scanned extensions; `.next`, `build` and `out`
  added to the ignore list.

## [1.0.0] - 2026-08-03

### Added
- **File scanning**: Async glob-based scanning of HTML, JSX, TSX, Vue, Svelte, Astro, TS, JS, MDX, PHP, ERB files
- **Class extraction**: Supports `class=""`, `className=""`, template literals, Vue `:class`, Svelte `class:` directives
- **Watch mode**: `--watch` / `-w` flag for automatic rebuilds on file changes with debouncing
- **Custom output**: `--output` / `-o` flag for configurable output path
- **Minification**: `--minify` / `-m` flag for compressed CSS output
- **Important mode**: `--important` flag to add `!important` to all declarations
- **Class prefix**: `--prefix` flag to namespace all class selectors
- **Colored output**: Rich terminal output with colors, icons, and timing stats
- **Performance stats**: Shows class count, file size, and generation time
- **Help & version**: `--help` / `-h` and `--version` / `-v` flags
