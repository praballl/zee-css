# Changelog

All notable changes to `@zee-css/cli` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
