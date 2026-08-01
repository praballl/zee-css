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
- `pa-{n|name}` - Padding on all sides
- `pt-{n|name}` - Padding top
- `pb-{n|name}` - Padding bottom
- `pl-{n|name}` - Padding left
- `pr-{n|name}` - Padding right
- `px-{n|name}` - Horizontal padding (left + right)
- `py-{n|name}` - Vertical padding (top + bottom)
- `ma-{n|name|auto}` - Margin on all sides
- `mt-{n|name|auto}` - Margin top
- `mb-{n|name|auto}` - Margin bottom
- `ml-{n|name|auto}` - Margin left
- `mr-{n|name|auto}` - Margin right
- `mx-{n|name|auto}` - Horizontal margin (left + right)
- `my-{n|name|auto}` - Vertical margin (top + bottom)

#### Flexbox Utilities
- `row` / `column` - Flex direction
- `flex-{n}` - Flex values (1-9)
- `items-{start|center|end|stretch|baseline}` - Align items
- `justify-{start|center|end|between|around|evenly}` - Justify content
- `content-{start|center|end|between|around|stretch}` - Align content
- `self-{start|center|end|stretch|baseline}` - Align self
- `gap-{n|name}` - Gap between flex/grid items

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
- `fs-{name}` - Font size using descriptive names (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl)
- `font-{size}` - Font size in pixels converted to rem
- `font-{size}-{weight}` - Font size and weight combined
- `font-{weight}` - Font weight (thin, extralight, light, normal, medium, semibold, bold, extrabold, black)
- `leading-{name}` - Line height (none, tight, snug, normal, relaxed, loose)
- `tracking-{name}` - Letter spacing (tighter, tight, normal, wide, wider, widest)
- `uppercase` / `lowercase` / `capitalize` - Text transform

#### Sizing Utilities
- `w-{n|auto|full|screen}` - Width
- `h-{n|auto|full|screen}` - Height
- `min-w-{n|auto|full|screen}` - Minimum width
- `max-w-{n|auto|full|screen}` - Maximum width
- `min-h-{n|auto|full|screen}` - Minimum height
- `max-h-{n|auto|full|screen}` - Maximum height

#### Effects Utilities
- `opacity-{0-100}` - Opacity level
- `shadow` / `shadow-sm` / `shadow-md` / `shadow-lg` / `shadow-xl` / `shadow-2xl` / `shadow-none` - Box shadow
- `blur-{none|sm|md|lg|xl|2xl|3xl}` - Blur effect
- `brightness-{0-200}` - Brightness filter
- `grayscale-{0|100}` - Grayscale filter
- `cursor-{auto|default|pointer|wait|text|move|not-allowed}` - Cursor style
- `overflow-{auto|hidden|scroll|visible}` - Overflow behavior
- `overflow-x-{auto|hidden|scroll|visible}` - Horizontal overflow
- `overflow-y-{auto|hidden|scroll|visible}` - Vertical overflow

#### Position & Layout
- `relative` / `absolute` / `fixed` / `sticky` - Positioning
- `z-{0-50}` / `z-auto` - Z-index

#### Border Utilities
- `rounded-{none|sm|md|lg|xl|2xl|3xl|full}` - Border radius
- `border` / `border-0` / `border-2` / `border-4` / `border-8` - Border width

#### Color Utilities
- `text-{color}` - Text color using CSS custom properties
- `bg-{color}` - Background color using CSS custom properties
- `border-{color}` - Border color using CSS custom properties

**Available colors:** primary, secondary, accent, positive, negative, info, warning

## Spacing Scale

The spacing scale uses rem units (1rem = 16px):

**Numeric values:**
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
20: 5rem      (80px)
24: 6rem      (96px)
32: 8rem      (128px)
40: 10rem     (160px)
48: 12rem     (192px)
64: 16rem     (256px)
```

**Descriptive names:**
```
xs: 0.25rem    (4px)
sm: 0.5rem     (8px)
md: 1rem       (16px)
lg: 1.5rem     (24px)
xl: 2rem       (32px)
2xl: 2.5rem    (40px)
3xl: 3rem      (48px)
4xl: 4rem      (64px)
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

### `colorScale: Record<string, string>`

Object containing all available color mappings using CSS custom properties.

```typescript
import { colorScale } from '@my-utility-css/core';

console.log(colorScale['primary']); // 'var(--z-primary)'
```

### `resolveColor(key: string): string | null`

Function to resolve color names to CSS variable values.

```typescript
import { resolveColor } from '@my-utility-css/core';

const color = resolveColor('primary'); // 'var(--z-primary)'
```

### `addColor(name: string, value: string): void`

Function to add custom colors to the color scale.

```typescript
import { addColor } from '@my-utility-css/core';

addColor('brand', 'var(--z-brand)');
```

### `setColor(name: string, value: string): void`

Function to override existing colors in the color scale.

```typescript
import { setColor } from '@my-utility-css/core';

setColor('primary', 'var(--z-custom-primary)');
```

## License

ISC

## Repository

https://github.com/praballl/zee-css