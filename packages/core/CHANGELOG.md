# Changelog

All notable changes to `@zee-css/core` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-08-20

### Fixed
- **Selector escaping is now complete.** `escapeClassName` only escaped
  `: . / [ ] ( ) , !`, which left two classes of broken output:
  - Any arbitrary value containing `#` or `%` — `bg-[#14b8a6]`, `text-[#e74c3c]`,
    `bg-[hsl(174,80%,40%)]` — emitted a selector where the `#` opened a hash
    token. Turbopack fails the build on it; other bundlers drop the rule
    silently.
  - A class beginning with a digit — every `2xl:` utility — emitted
    `.2xl\:pa-8`, which is not a valid identifier, so the entire `2xl`
    breakpoint did nothing. The same applied to any `addBreakpoint()` name
    starting with a number.

  Escaping now follows the `CSS.escape` rules: everything outside
  `[A-Za-z0-9_-]` and the non-ASCII range is backslash-escaped, and a leading
  digit is written as a numeric code-point escape (`.\32 xl\:pa-8`).
- **`h-1/2` and friends.** The height, `min-*` and `max-*` patterns excluded
  `/`, so fractions worked on `w-` but returned `null` on `h-`.

### Added
- **Tailwind-compatible direction aliases**: `flex-row`, `flex-col`,
  `flex-row-reverse`, `flex-col-reverse`. These set only `flex-direction`,
  matching Tailwind, so pasted markup using `flex flex-col` behaves as expected.
  The existing `row` / `column` shorthands, which also set `display:flex`, are
  unchanged.
- **Named min/max size scale**: `max-w-xs` … `max-w-7xl`, `max-w-prose`,
  `max-w-none`, and the same steps on `min-w-`, `min-h-` and `max-h-`.
  Deliberately not added to `w-` / `h-`, where a t-shirt size has no meaning.
  Exported as `maxSizeScale`; resolved by the new `resolveMaxSize()`.
- **Per-side border widths**: `border-{t,b,l,r}-{0,2,4,8}`,
  `border-{s,e}-{0,2,4,8}`, and the axis pair `border-x` / `border-y`
  (optionally `-{0,2,4,8}`). Previously `border-l` was locked to 1px and
  `border-l-4` fell through to the color rule and produced nothing.

## [1.0.0] - 2026-08-03

### Added
- **Spacing utilities**: `pa-`, `pt-`, `pb-`, `pl-`, `pr-`, `px-`, `py-` padding; `ma-`, `mt-`, `mb-`, `ml-`, `mr-`, `mx-`, `my-` margin
- **Negative margins**: `-mt-`, `-mb-`, `-ml-`, `-mr-`, `-mx-`, `-my-`
- **Flexbox utilities**: `row`, `column`, `row-reverse`, `column-reverse`, `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse`, `flex-auto`, `flex-initial`, `flex-none`, `grow`, `shrink`
- **Alignment**: `items-*`, `justify-*`, `content-*`, `self-*`, `justify-self-*`, `justify-items-*`, `place-items-*`, `place-content-*`
- **12-column grid**: `col-{1-12}`, `col-auto`, `col-grow`, `col-shrink`, `offset-*`, `order-*`
- **Display**: `flex`, `inline-flex`, `grid`, `inline-grid`, `block`, `inline-block`, `inline`, `hidden`, `contents`
- **Typography**: `fs-*` font sizes, `font-*` weights, `leading-*` line height, `tracking-*` letter spacing, `uppercase`, `lowercase`, `capitalize`, `truncate`, `italic`, `underline`, `line-through`
- **Sizing**: `w-*`, `h-*`, `min-w-*`, `max-w-*`, `min-h-*`, `max-h-*` with `auto`, `full`, `screen`, `min`, `max`, `fit` keywords
- **Colors**: Dynamic `text-*`, `bg-*`, `border-*` with CSS custom properties (`--z-primary`, `--z-secondary`, etc.)
- **Effects**: `opacity-*`, `shadow-*`, `blur-*`, `brightness-*`, `grayscale-*`, `rounded-*`
- **Position**: `relative`, `absolute`, `fixed`, `sticky`, `static`, `inset-*`, `top-*`, `right-*`, `bottom-*`, `left-*`
- **Transitions**: `transition`, `transition-all`, `transition-colors`, `transition-opacity`, `transition-shadow`, `transition-transform`, `duration-*`, `ease-*`
- **Transform**: `scale-*`, `rotate-*`, `translate-x-*`, `translate-y-*`
- **Interactivity**: `cursor-*`, `pointer-events-*`, `select-*`, `appearance-none`
- **Responsive variants**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` prefixes for mobile-first responsive design
- **State variants**: `hover:`, `focus:`, `focus-within:`, `focus-visible:`, `active:`, `visited:`, `disabled:`, `first:`, `last:`, `odd:`, `even:`, `placeholder:` prefixes
- **Dynamic color system**: `addColor()` and `setColor()` functions for runtime color customization
- **Generator options**: `important`, `prefix`, `minify` configuration
- **Result caching**: O(1) repeated lookups with `clearCache()` support
- **Accessibility**: `sr-only`, `not-sr-only` screen reader utilities
