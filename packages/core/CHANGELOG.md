# Changelog

All notable changes to `@zee-css/core` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
