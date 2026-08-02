# Zee CSS

A TypeScript-based CSS utility library that generates CSS programmatically from utility class patterns. Similar to Tailwind CSS but with a custom rule system built in TypeScript.

## 🚀 Features

- **Programmatic CSS Generation**: Define utility classes as TypeScript rules
- **Type Safety**: Leverage TypeScript for rule definitions
- **Tree-shaking**: Only generate CSS for classes you actually use
- **CLI Tool**: Scan your project and generate CSS automatically
- **Customizable**: Easy to extend with your own utility patterns
- **Comprehensive Utilities**: Spacing, sizing, typography, effects, colors, and more
- **CSS Variables**: Uses `--z-*` prefix for customizable theming
- **Mobile-First**: Responsive design with media query support

## 📁 Project Structure

```
zee-css/
├── packages/
│   ├── core/           # Core CSS generation logic
│   │   └── src/
│   │       ├── rules.ts      # Define your utility class rules here
│   │       ├── generator.ts  # CSS generation engine
│   │       └── index.ts      # Main exports
│   └── cli/            # CLI tool for scanning and generating CSS
│       └── src/
│           └── index.ts      # CLI entry point
├── examples/
│   └── vite-demo/      # Test environment
│       └── src/
│           ├── main.ts       # Test page with utility classes
│           └── style.css     # Base styles
└── package.json        # Root package configuration
```

## 🛠️ How It Works

Unlike traditional CSS frameworks that use Sass/SCSS, this library generates CSS programmatically:

1. **Define Rules**: Write TypeScript patterns in `packages/core/src/rules.ts`
2. **Generate CSS**: The core package converts class names to CSS declarations
3. **Scan Files**: The CLI tool scans your project for utility class usage
4. **Build Output**: Only CSS for used classes is generated

## 📝 Adding New Utility Classes

Edit `packages/core/src/rules.ts` to add new utility patterns.

### Rule Structure

Each rule follows this pattern:

```typescript
{
  name: "rule-name",           // For debugging
  pattern: /^class-pattern$/, // Regex to match class names
  handler: (match) => {        // Function to generate CSS
    return { "css-property": "value" };
  },
}
```

### Example: Adding Color Utilities

The library includes built-in color utilities using CSS custom properties:

```typescript
// Built-in color scale (exported for customization)
export const colorScale: Record<string, string> = {
  "primary": "var(--z-primary)",
  "secondary": "var(--z-secondary)",
  "accent": "var(--z-accent)",
  "positive": "var(--z-positive)",
  "negative": "var(--z-negative)",
  "info": "var(--z-info)",
  "warning": "var(--z-warning)",
};

// Text color rule
{
  name: "text-color",
  pattern: /^text-(\w+)$/,
  handler: (match) => {
    const v = resolveColor(match[1]);
    if (!v) return null;
    return { color: v };
  },
}

// Background color rule
{
  name: "bg-color",
  pattern: /^bg-(\w+)$/,
  handler: (match) => {
    const v = resolveColor(match[1]);
    if (!v) return null;
    return { "background-color": v };
  },
}
```

### Example: Adding Typography Utilities

```typescript
{
  name: "font-size",
  pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl)$/,
  handler: (match) => {
    const sizes = {
      xs: "0.75rem",
      sm: "0.875rem", 
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem"
    };
    return { "font-size": sizes[match[1]] };
  },
}
```

## 🎨 Available Utility Classes

### Spacing Utilities

#### Padding
- `pa-{n|name}` - Padding on all sides
- `pt-{n|name}` - Padding top
- `pb-{n|name}` - Padding bottom
- `pl-{n|name}` - Padding left
- `pr-{n|name}` - Padding right
- `px-{n|name}` - Horizontal padding (left + right)
- `py-{n|name}` - Vertical padding (top + bottom)

#### Margin
- `ma-{n|name|auto}` - Margin on all sides
- `mt-{n|name|auto}` - Margin top
- `mb-{n|name|auto}` - Margin bottom
- `ml-{n|name|auto}` - Margin left
- `mr-{n|name|auto}` - Margin right
- `mx-{n|name|auto}` - Horizontal margin (left + right)
- `my-{n|name|auto}` - Vertical margin (top + bottom)

#### Spacing Scale (in rem)
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

### Flexbox Utilities

#### Flex Direction
- `row` - Horizontal flex container
- `column` - Vertical flex container

#### Flex Values
- `flex-{n}` - Flex shorthand (n = 1-9)

#### Alignment
- `items-{start|center|end|stretch|baseline}` - Align items in cross axis
- `justify-{start|center|end|between|around|evenly}` - Justify content in main axis
- `content-{start|center|end|between|around|stretch}` - Align content in cross axis
- `self-{start|center|end|stretch|baseline}` - Align individual flex item

#### Gap
- `gap-{n}` - Set gap between flex/grid items (uses spacing scale)

### Grid System (12-column)

#### Column Width
- `col-{n}` - Column spanning n columns (n = 1-12)
- `col-auto` - Auto width column
- `col-grow` - Allow column to grow
- `col-shrink` - Allow column to shrink

#### Offset & Order
- `offset-{n}` - Offset by n columns (n = 0-11)
- `order-{n}` - Change visual order (n = 1-12)

### Display Utilities
- `block` - Block display
- `inline-block` - Inline-block display
- `hidden` - Hidden element (display: none)

### Text Alignment
- `text-left` - Left aligned text
- `text-center` - Center aligned text
- `text-right` - Right aligned text
- `text-justify` - Justified text

### Typography Utilities

#### Font Size
- `fs-{name}` - Font size using descriptive names
- `font-{size}` - Font size in pixels converted to rem
- `font-{size}-{weight}` - Font size and weight combined

**Font size scale:**
```
xs: 0.75rem      (12px)
sm: 0.875rem    (14px)
base: 1rem      (16px)
lg: 1.125rem    (18px)
xl: 1.25rem     (20px)
2xl: 1.5rem     (24px)
3xl: 1.875rem   (30px)
4xl: 2.25rem    (36px)
5xl: 3rem       (48px)
6xl: 3.75rem    (60px)
7xl: 4.5rem     (72px)
8xl: 6rem       (96px)
9xl: 8rem       (128px)
```

#### Font Weight
- `font-{weight}` - Font weight using descriptive names
- `font-{size}-{weight}` - Combined font size and weight

**Font weight scale:**
```
thin: 100
extralight: 200
light: 300
normal: 400
medium: 500
semibold: 600
bold: 700
extrabold: 800
black: 900
```

#### Line Height
- `leading-{name}` - Line height using descriptive names

**Line height scale:**
```
none: 1
tight: 1.25
snug: 1.375
normal: 1.5
relaxed: 1.625
loose: 2
```

#### Letter Spacing
- `tracking-{name}` - Letter spacing using descriptive names

**Letter spacing scale:**
```
tighter: -0.05em
tight: -0.025em
normal: 0em
wide: 0.025em
wider: 0.05em
widest: 0.1em
```

#### Text Transform
- `uppercase` - Uppercase text
- `lowercase` - Lowercase text
- `capitalize` - Capitalize first letter

### Sizing Utilities

#### Width
- `w-{n|auto|full|screen}` - Width
- `min-w-{n|auto|full|screen}` - Minimum width
- `max-w-{n|auto|full|screen}` - Maximum width

#### Height
- `h-{n|auto|full|screen}` - Height
- `min-h-{n|auto|full|screen}` - Minimum height
- `max-h-{n|auto|full|screen}` - Maximum height

**Sizing options:**
- Numeric values (0-96) using spacing scale
- `auto` - Automatic sizing
- `full` - 100%
- `screen` - 100vw/100vh

### Effects Utilities

#### Opacity
- `opacity-{0-100}` - Opacity level (0, 10, 20, ..., 100)

#### Box Shadow
- `shadow` - Default shadow
- `shadow-sm` - Small shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow
- `shadow-xl` - Extra large shadow
- `shadow-2xl` - 2XL shadow
- `shadow-none` - No shadow

#### Blur
- `blur-{none|sm|md|lg|xl|2xl|3xl}` - Blur effect

#### Filters
- `brightness-{0-200}` - Brightness filter (0-200%)
- `grayscale-{0|100}` - Grayscale filter (0-100%)

#### Cursor
- `cursor-auto` - Default cursor
- `cursor-default` - Default arrow cursor
- `cursor-pointer` - Pointer cursor
- `cursor-wait` - Wait cursor
- `cursor-text` - Text cursor
- `cursor-move` - Move cursor
- `cursor-not-allowed` - Not allowed cursor

#### Overflow
- `overflow-{auto|hidden|scroll|visible}` - Overflow behavior
- `overflow-x-{auto|hidden|scroll|visible}` - Horizontal overflow
- `overflow-y-{auto|hidden|scroll|visible}` - Vertical overflow

#### Position
- `relative` - Relative positioning
- `absolute` - Absolute positioning
- `fixed` - Fixed positioning
- `sticky` - Sticky positioning

#### Z-Index
- `z-{0-50}` - Z-index value
- `z-auto` - Auto z-index

#### Border Radius
- `rounded-none` - No border radius
- `rounded-sm` - Small border radius
- `rounded-md` - Medium border radius
- `rounded-lg` - Large border radius
- `rounded-xl` - Extra large border radius
- `rounded-2xl` - 2XL border radius
- `rounded-3xl` - 3XL border radius
- `rounded-full` - Full/rounded border radius

#### Border Width
- `border` - Default border (1px solid)
- `border-0` - No border
- `border-2` - 2px border
- `border-4` - 4px border
- `border-8` - 8px border

### Color Utilities

#### Text Color
- `text-{color}` - Set text color using CSS custom properties

#### Background Color
- `bg-{color}` - Set background color using CSS custom properties

#### Border Color
- `border-{color}` - Set border color using CSS custom properties (requires border width and style to be set separately)

**Default Color Variables:**
- `primary` - `var(--z-primary)`
- `secondary` - `var(--z-secondary)`
- `accent` - `var(--z-accent)`
- `positive` - `var(--z-positive)`
- `negative` - `var(--z-negative)`
- `info` - `var(--z-info)`
- `warning` - `var(--z-warning)`

### Examples
```html
<!-- Advanced Spacing -->
<div class="pa-4">Padding 1rem all around</div>
<div class="px-4 py-2">Horizontal 4, Vertical 2</div>
<div class="mx-auto">Centered with auto margin</div>
<div class="pa-xs">Extra small padding</div>
<div class="pa-lg">Large padding</div>

<!-- Flexbox -->
<div class="row items-center justify-between">
  <div class="flex-1">Item 1</div>
  <div class="flex-2">Item 2</div>
</div>

<!-- Flexbox with gap -->
<div class="row gap-4">
  <div class="flex-1">Item 1</div>
  <div class="flex-1">Item 2</div>
</div>

<!-- Grid System -->
<div class="row">
  <div class="col-6">Half width</div>
  <div class="col-6">Half width</div>
</div>
<div class="col-4 offset-2">One-third width, offset</div>

<!-- Typography -->
<div class="fs-lg">Large font size</div>
<div class="font-bold">Bold text</div>
<div class="leading-loose">Loose line height</div>
<div class="tracking-wide">Wide letter spacing</div>
<div class="uppercase">UPPERCASE TEXT</div>
<div class="text-center">Centered text</div>

<!-- Sizing -->
<div class="w-full">Full width</div>
<div class="h-16">Fixed height (16)</div>
<div class="min-w-32">Min width 32</div>
<div class="max-w-48">Max width 48</div>

<!-- Effects -->
<div class="opacity-50">50% opacity</div>
<div class="shadow-lg">Large shadow</div>
<div class="rounded-lg">Rounded large</div>
<div class="rounded-full">Rounded full</div>
<div class="cursor-pointer">Pointer cursor</div>
<div class="overflow-hidden">Hidden overflow</div>

<!-- Colors -->
<div class="text-primary">Primary color text</div>
<div class="bg-secondary">Secondary background</div>
<div class="border-accent">Accent border</div>
<div class="border-primary">Primary border</div>
```

## 🚀 Getting Started

### Installation

#### As npm packages

```bash
# Install the core library
npm install @zee-css/core

# Install the CLI tool globally
npm install -g @zee-css/cli

# Or use with npx
npx @zee-css/cli
```

#### Development setup

```bash
# Clone the repository
git clone https://github.com/praballl/zee-css.git
cd zee-css

# Install dependencies
npm install

# Build the packages
npm run build
```

### Development

```bash
# Start the test environment
npm run dev

# This launches a Vite dev server at http://localhost:5173
# where you can test your utility classes
```

### Using the CLI

```bash
# Scan a directory and generate CSS
node packages/cli/dist/index.js <target-directory>

# Example: Scan the test demo
npm run test:cli
```

## 🔄 Development Workflow

1. **Add Rules**: Edit `packages/core/src/rules.ts`
2. **Build**: Run `npm run build` to compile TypeScript
3. **Test**: Add classes to `examples/vite-demo/src/main.ts`
4. **View**: Open `http://localhost:5173` to see results
5. **Generate**: Use CLI to scan and generate CSS for your projects

## 📦 Scripts

- `npm run build` - Build all packages
- `npm run dev` - Start the test environment
- `npm run dev:cli` - Watch CLI package for changes
- `npm run test:cli` - Test CLI on the demo project

## 🧪 Testing

The project includes a Vite-based test environment in `examples/vite-demo/`. This allows you to:

- Visually test your utility classes
- Experiment with different class combinations
- See real-time updates as you modify rules

## 🎯 Use Cases

- **Small Projects**: Generate only the CSS you need
- **Learning**: Understand how utility CSS frameworks work
- **Custom Systems**: Build your own utility class conventions
- **Performance**: Avoid unused CSS with tree-shaking

## 🔧 Customization

### Color Customization

The library uses CSS custom properties (CSS variables) with the `--z-` prefix for colors, making it easy to customize and theme.

#### Define CSS Variables

Add CSS variables in your stylesheet to customize colors:

```css
:root {
  --z-primary: #1976d2;
  --z-secondary: #26a69a;
  --z-accent: #9c27b0;
  --z-positive: #21ba45;
  --z-negative: #c10015;
  --z-info: #31ccec;
  --z-warning: #f2c037;
  
  /* Add custom colors */
  --z-brand: #your-brand-color;
  --z-custom: #your-custom-color;
}
```

#### Programmatic Color Customization

Use the exported functions to add or override colors programmatically:

```typescript
import { addColor, setColor, colorScale } from '@zee-css/core';

// Add custom colors
addColor('brand', 'var(--z-brand)');
addColor('custom-blue', '#3b82f6');

// Override existing colors
setColor('primary', 'var(--z-custom-primary)');

// Access the color scale
console.log(colorScale['primary']); // "var(--z-custom-primary)"
```

### Modify Spacing Scale

Edit the `spacingScale` object in `packages/core/src/rules.ts`:

```typescript
const spacingScale: Record<string, string> = {
  "0": "0px",
  "1": "4px",
  // Add your custom values
  "custom": "12px",
};
```

### Add New Rule Categories

Create new rule arrays for different categories:

```typescript
export const colorRules: Rule[] = [
  // Your color rules here
];

export const flexboxRules: Rule[] = [
  // Your flexbox rules here
];

// Combine all rules
export const rules: Rule[] = [
  ...spacingRules,
  ...colorRules,
  ...flexboxRules,
];
```

## 📄 License

ISC

## 🤝 Contributing

This is a personal utility CSS library. Feel free to fork and customize for your own projects!

## 📦 Publishing to npm

### Prerequisites

1. **Create an npm account**: https://www.npmjs.com/signup
2. **Login to npm**: `npm login`

### Publishing

#### Publish the core package

```bash
cd packages/core
npm publish
```

#### Publish the CLI package

```bash
cd packages/cli
npm publish
```

### Publishing workflow

1. Update version numbers in `package.json` files
2. Build the packages: `npm run build`
3. Publish from each package directory
4. Tag the release in git

### Version management

Use semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes

Example:
```bash
# Update version to 1.1.0
npm version minor
npm publish
git push --tags
```