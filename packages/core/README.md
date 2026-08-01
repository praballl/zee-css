# @my-utility-css/core

A TypeScript-based CSS utility library that generates CSS programmatically from utility class patterns. Similar to Tailwind CSS but with a custom rule system built in TypeScript.

## Installation

```bash
npm install @my-utility-css/core
```

## Usage

### Programmatic Usage

```typescript
import { generateCSS, generateCSSForClass } from '@my-utility-css/core';

// Generate CSS for a single class
const result = generateCSSForClass('pa-4');
console.log(result.css);
// Output:
// .pa-4 {
//   padding: 1rem;
// }

// Generate CSS for multiple classes
const classNames = ['pa-4', 'mt-2', 'flex-1', 'text-center'];
const css = generateCSS(classNames);
console.log(css);
```

### Available Utility Classes

#### Spacing Utilities
- `pa-{n}` - Padding on all sides
- `pt-{n}` - Padding top
- `pb-{n}` - Padding bottom
- `pl-{n}` - Padding left
- `pr-{n}` - Padding right
- `ma-{n}` - Margin on all sides
- `mt-{n}` - Margin top
- `mb-{n}` - Margin bottom

#### Flexbox Utilities
- `row` / `column` - Flex direction
- `flex-{n}` - Flex values (1-9)
- `items-{start|center|end|stretch|baseline}` - Align items
- `justify-{start|center|end|between|around|evenly}` - Justify content
- `content-{start|center|end|between|around|stretch}` - Align content
- `self-{start|center|end|stretch|baseline}` - Align self

#### Grid System (12-column)
- `col-{n}` - Column spanning n columns (1-12)
- `col-auto` - Auto width column
- `col-grow` - Allow column to grow
- `col-shrink` - Allow column to shrink
- `offset-{n}` - Offset by n columns (0-11)
- `order-{n}` - Change visual order (1-12)

#### Display Utilities
- `block` - Block display
- `inline-block` - Inline-block display
- `hidden` - Hidden element

#### Text Alignment
- `text-left` - Left aligned text
- `text-center` - Center aligned text
- `text-right` - Right aligned text
- `text-justify` - Justified text

#### Typography Utilities
- `font-{size}` - Font size in pixels converted to rem
- `font-{size}-{weight}` - Font size and weight combined

## Spacing Scale

The spacing scale uses rem units (1rem = 16px):

```
0: 0rem
1: 0.25rem    (4px)
2: 0.5rem     (8px)
3: 0.75rem    (12px)
4: 1rem       (16px)
5: 1.25rem    (20px)
6: 1.5rem     (24px)
8: 2rem       (32px)
10: 2.5rem    (40px)
12: 3rem      (48px)
16: 4rem      (64px)
```

## API

### `generateCSS(classNames: Set<string> | string[]): string`

Generates CSS for an array or set of class names.

```typescript
const css = generateCSS(['pa-4', 'mt-2']);
```

### `generateCSSForClass(className: string): GeneratedRule | null`

Generates CSS for a single class name. Returns null if the class doesn't match any rules.

```typescript
const result = generateCSSForClass('pa-4');
if (result) {
  console.log(result.className); // 'pa-4'
  console.log(result.css);      // '.pa-4 { padding: 1rem; }'
}
```

### `rules: Rule[]`

Array of all available rules. You can inspect or extend this array.

```typescript
import { rules } from '@my-utility-css/core';

console.log(rules.map(r => r.name));
// ['padding-all', 'padding-top', 'padding-bottom', ...]
```

## License

ISC

## Repository

https://github.com/praballl/zee-css