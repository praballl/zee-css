# @my-utility-css/cli

CLI tool for my-utility-css - scans your project and generates CSS from utility class usage.

## Installation

```bash
npm install -g @my-utility-css/cli
```

Or use with npx:

```bash
npx @my-utility-css/cli
```

## Usage

```bash
zee-css [directory]
```

### Arguments

- `directory` - Target directory to scan (default: current directory)

### Examples

```bash
# Scan current directory
zee-css

# Scan src directory
zee-css ./src

# Scan specific project
zee-css ./my-project
```

### What it does

1. Scans the target directory for files matching: `src/**/*.{html,jsx,tsx,vue}`
2. Extracts all CSS class names from `class` and `className` attributes
3. Generates CSS only for the utility classes that are actually used
4. Writes the generated CSS to `<directory>/dist/utilities.css`

### Command Line Options

```bash
zee-css --help       # Show help
zee-css --version    # Show version
zee-css -h           # Show help (short)
zee-css -v           # Show version (short)
```

## Example Workflow

1. Install the CLI:
   ```bash
   npm install -g @my-utility-css/cli
   ```

2. Use utility classes in your project:
   ```html
   <div class="pa-4 mt-2 flex-1 text-center">
     Content here
   </div>
   ```

3. Run the CLI to generate CSS:
   ```bash
   zee-css ./my-project
   ```

4. Include the generated CSS in your project:
   ```html
   <link rel="stylesheet" href="dist/utilities.css">
   ```

## Output

The CLI generates a CSS file with only the utility classes used in your project:

```css
.pa-4 {
  padding: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.flex-1 {
  flex: 1;
}

.text-center {
  text-align: center;
}
```

## Features

- **Tree-shaking**: Only generates CSS for classes you actually use
- **File scanning**: Automatically scans HTML, JSX, TSX, and Vue files
- **Fast processing**: Uses glob patterns for efficient file matching
- **Clean output**: Well-formatted CSS with proper indentation

## Supported File Types

- `.html` files
- `.jsx` files
- `.tsx` files
- `.vue` files

## License

ISC

## Repository

https://github.com/praballl/zee-css

## Related Packages

- [@my-utility-css/core](https://www.npmjs.com/package/@my-utility-css/core) - Core CSS generation library