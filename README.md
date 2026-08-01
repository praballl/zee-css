# My Utility CSS

A TypeScript-based CSS utility library that generates CSS programmatically from utility class patterns. Similar to Tailwind CSS but with a custom rule system built in TypeScript.

## 🚀 Features

- **Programmatic CSS Generation**: Define utility classes as TypeScript rules
- **Type Safety**: Leverage TypeScript for rule definitions
- **Tree-shaking**: Only generate CSS for classes you actually use
- **CLI Tool**: Scan your project and generate CSS automatically
- **Customizable**: Easy to extend with your own utility patterns

## 📁 Project Structure

```
my-utility-css/
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

```typescript
{
  name: "text-color",
  pattern: /^text-(red|blue|green|purple)$/,
  handler: (match) => {
    const colors = {
      red: "#ef4444",
      blue: "#3b82f6", 
      green: "#22c55e",
      purple: "#a855f7"
    };
    return { color: colors[match[1]] };
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
- `pa-{n}` - Padding on all sides
- `pt-{n}` - Padding top
- `pb-{n}` - Padding bottom
- `pl-{n}` - Padding left
- `pr-{n}` - Padding right

#### Margin
- `ma-{n}` - Margin on all sides
- `mt-{n}` - Margin top
- `mb-{n}` - Margin bottom

#### Spacing Scale
```
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
```

### Examples
```html
<div class="pa-4">Padding 16px all around</div>
<div class="mt-4 mb-2">Margin top 16px, bottom 8px</div>
<div class="pt-8 pb-4 pl-2 pr-2">Complex padding</div>
```

## 🚀 Getting Started

### Installation

```bash
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