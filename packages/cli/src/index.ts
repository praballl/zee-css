#!/usr/bin/env node
import { glob } from "glob";
import fs from "fs";
import path from "path";
import { generateCSS } from "@zee-css/core";
import type { GeneratorOptions } from "@zee-css/core";

const VERSION = "1.0.0";
const PACKAGE_NAME = "zee-css";

// ──────────────────────────────────────────────
// Colored console output
// ──────────────────────────────────────────────
const color = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
};

function log(msg: string): void {
  console.log(msg);
}

function logInfo(msg: string): void {
  console.log(`${color.cyan}ℹ${color.reset} ${msg}`);
}

function logSuccess(msg: string): void {
  console.log(`${color.green}✓${color.reset} ${msg}`);
}

function logWarn(msg: string): void {
  console.log(`${color.yellow}⚠${color.reset} ${msg}`);
}

function logError(msg: string): void {
  console.error(`${color.red}✗${color.reset} ${msg}`);
}

// ──────────────────────────────────────────────
// File scanning
// ──────────────────────────────────────────────
const DEFAULT_EXTENSIONS = "*.{html,htm,jsx,tsx,vue,svelte,astro,ts,js,mdx,php,erb}";

async function scanFiles(patterns: string[]): Promise<Set<string>> {
  const found = new Set<string>();

  const files = (
    await Promise.all(
      patterns.map((pattern) =>
        glob(pattern, {
          ignore: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
          windowsPathsNoEscape: true,
        })
      )
    )
  ).flat();

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");

    // Standard class="..." and className="..."
    const classAttrRegex = /class(?:Name)?=["']([^"']+)["']/g;
    let match: RegExpExecArray | null;
    while ((match = classAttrRegex.exec(content)) !== null) {
      const classList = match[1].split(/\s+/).filter(Boolean);
      classList.forEach((cls) => found.add(cls));
    }

    // Template literals: class={`...`} or className={`...`}
    const templateLitRegex = /class(?:Name)?=\{`([^`]+)`\}/g;
    while ((match = templateLitRegex.exec(content)) !== null) {
      // Extract static class names from template literal (skip ${...} expressions)
      const cleaned = match[1].replace(/\$\{[^}]*\}/g, " ");
      const classList = cleaned.split(/\s+/).filter(Boolean);
      classList.forEach((cls) => found.add(cls));
    }

    // Vue :class="'...'" or :class="['...']"
    const vueClassRegex = /:class=["'][^"']*["']/g;
    while ((match = vueClassRegex.exec(content)) !== null) {
      const stringLiterals = match[0].match(/'([^']+)'/g);
      if (stringLiterals) {
        for (const str of stringLiterals) {
          const classes = str.slice(1, -1).split(/\s+/).filter(Boolean);
          classes.forEach((cls) => found.add(cls));
        }
      }
    }

    // Svelte class:name directive
    const svelteClassRegex = /class:([\w:.-]+)(?=[=\s/>])/g;
    while ((match = svelteClassRegex.exec(content)) !== null) {
      found.add(match[1]);
    }
  }

  return found;
}

// ──────────────────────────────────────────────
// Watch mode
// ──────────────────────────────────────────────
async function watchMode(
  targetDir: string,
  patterns: string[],
  outputPath: string,
  generatorOptions: GeneratorOptions,
): Promise<void> {
  const srcDir = path.resolve(targetDir, "src");
  if (!fs.existsSync(srcDir)) {
    logError(`Watch directory not found: ${srcDir}`);
    process.exit(1);
  }

  logInfo(`Watching ${srcDir} for changes...`);
  logInfo("Press Ctrl+C to stop\n");

  // Initial build
  await buildCSS(patterns, outputPath, generatorOptions);

  // Debounce timer
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  fs.watch(srcDir, { recursive: true }, (_event, filename) => {
    if (!filename) return;

    // Only react to supported file types
    const ext = path.extname(filename).toLowerCase();
    const supportedExts = [".html", ".htm", ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".ts", ".js", ".mdx"];
    if (!supportedExts.includes(ext)) return;

    // Debounce — wait 100ms after last change
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      logInfo(`Change detected: ${filename}`);
      await buildCSS(patterns, outputPath, generatorOptions);
    }, 100);
  });
}

async function buildCSS(
  patterns: string[],
  outputPath: string,
  generatorOptions: GeneratorOptions,
): Promise<void> {
  const startTime = performance.now();

  const classNames = await scanFiles(patterns);
  const css = generateCSS(classNames, generatorOptions);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, css, "utf-8");

  const elapsed = (performance.now() - startTime).toFixed(0);
  const sizeKB = (Buffer.byteLength(css, "utf-8") / 1024).toFixed(1);

  logSuccess(
    `Generated ${color.bold}${classNames.size}${color.reset} utilities → ${color.bold}${outputPath}${color.reset} ${color.dim}(${sizeKB}KB in ${elapsed}ms)${color.reset}`,
  );
}

// ──────────────────────────────────────────────
// CLI
// ──────────────────────────────────────────────
function showHelp(): void {
  log(`
${color.bold}${PACKAGE_NAME}${color.reset} v${VERSION}
${color.dim}A CLI tool for zee-css — generates CSS from utility class usage${color.reset}

${color.bold}USAGE${color.reset}
  ${PACKAGE_NAME} [directory] [options]

${color.bold}ARGUMENTS${color.reset}
  directory              Target directory to scan (default: current directory)

${color.bold}OPTIONS${color.reset}
  -o, --output <path>    Output file path (default: <directory>/dist/utilities.css)
  -w, --watch            Watch for file changes and rebuild automatically
  -m, --minify           Minify the generated CSS
  --important            Add !important to all declarations
  --prefix <prefix>      Add prefix to all class selectors (e.g., "z-")
  -h, --help             Show this help message
  -v, --version          Show version number

${color.bold}EXAMPLES${color.reset}
  ${PACKAGE_NAME}                          ${color.dim}# Scan current directory${color.reset}
  ${PACKAGE_NAME} ./src                    ${color.dim}# Scan src directory${color.reset}
  ${PACKAGE_NAME} . -o dist/styles.css     ${color.dim}# Custom output path${color.reset}
  ${PACKAGE_NAME} . --watch                ${color.dim}# Watch mode${color.reset}
  ${PACKAGE_NAME} . --minify               ${color.dim}# Minified output${color.reset}
  ${PACKAGE_NAME} . --important            ${color.dim}# Add !important${color.reset}

${color.bold}SCANNED FILE TYPES${color.reset}
  .html, .htm, .jsx, .tsx, .vue, .svelte, .astro, .ts, .js, .mdx, .php, .erb

${color.dim}For more information: https://github.com/praballl/zee-css${color.reset}
`);
}

function showVersion(): void {
  log(`${PACKAGE_NAME} v${VERSION}`);
}

function parseArgs(argv: string[]): {
  directory: string;
  output: string | null;
  watch: boolean;
  minify: boolean;
  important: boolean;
  prefix: string;
  help: boolean;
  version: boolean;
} {
  const result = {
    directory: process.cwd(),
    output: null as string | null,
    watch: false,
    minify: false,
    important: false,
    prefix: "",
    help: false,
    version: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "-h":
      case "--help":
        result.help = true;
        break;
      case "-v":
      case "--version":
        result.version = true;
        break;
      case "-w":
      case "--watch":
        result.watch = true;
        break;
      case "-m":
      case "--minify":
        result.minify = true;
        break;
      case "--important":
        result.important = true;
        break;
      case "-o":
      case "--output":
        result.output = argv[++i] || null;
        break;
      case "--prefix":
        result.prefix = argv[++i] || "";
        break;
      default:
        // Positional argument = directory
        if (!arg.startsWith("-")) {
          result.directory = arg;
        }
        break;
    }
  }

  return result;
}

async function run(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    showHelp();
    return;
  }
  if (args.version) {
    showVersion();
    return;
  }

  const targetDir = path.resolve(args.directory);
  const outputPath = args.output
    ? path.resolve(args.output)
    : path.resolve(targetDir, "dist/utilities.css");

  const patterns = [path.join(targetDir, "src", "**", DEFAULT_EXTENSIONS)];

  const generatorOptions: GeneratorOptions = {
    important: args.important,
    prefix: args.prefix || undefined,
    minify: args.minify,
  };

  log(`\n${color.bold}${color.magenta}⚡ ${PACKAGE_NAME}${color.reset} v${VERSION}\n`);
  logInfo(`Scanning ${color.bold}${targetDir}${color.reset}`);

  if (args.watch) {
    await watchMode(targetDir, patterns, outputPath, generatorOptions);
  } else {
    await buildCSS(patterns, outputPath, generatorOptions);
    log("");
  }
}

run().catch((err) => {
  logError(`Fatal error: ${err.message}`);
  process.exit(1);
});