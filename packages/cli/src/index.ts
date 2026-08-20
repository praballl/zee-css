#!/usr/bin/env node
import { glob } from "glob";
import fs from "fs";
import path from "path";
import { generateCSS } from "@zee-css/core";
import type { GeneratorOptions } from "@zee-css/core";

const VERSION = "1.1.0";
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
const DEFAULT_EXTENSIONS = "*.{html,htm,jsx,tsx,vue,svelte,astro,ts,js,mjs,cjs,mdx,php,erb}";

const WATCHED_EXTENSIONS = [
  ".html", ".htm", ".jsx", ".tsx", ".vue", ".svelte", ".astro",
  ".ts", ".js", ".mjs", ".cjs", ".mdx", ".php", ".erb",
];

/**
 * Pull every className attribute *value* out of a source file, brace-balanced.
 *
 * The naive `class(?:Name)?="([^"]+)"` regex misses anything written as an
 * expression, which in a React codebase is most conditional styling:
 *
 *   className={active ? "border-indigo-500" : "border-transparent"}
 *   className={"rounded-md " + extra}
 *
 * Those classes silently never reached the generator. Returning the whole
 * attribute value lets the caller mine the string literals inside it.
 */
function classAttributeValues(src: string): string[] {
  const out: string[] = [];
  const re = /class(?:Name)?=/g;
  let m: RegExpExecArray | null;

  while ((m = re.exec(src)) !== null) {
    const i = m.index + m[0].length;
    const ch = src[i];

    if (ch === '"' || ch === "'") {
      const end = src.indexOf(ch, i + 1);
      if (end > -1) out.push(src.slice(i + 1, end));
    } else if (ch === "`") {
      const end = src.indexOf("`", i + 1);
      if (end > -1) out.push(src.slice(i + 1, end));
    } else if (ch === "{") {
      let depth = 0;
      let j = i;
      for (; j < src.length; j++) {
        if (src[j] === "{") depth++;
        else if (src[j] === "}" && --depth === 0) break;
      }
      out.push(src.slice(i + 1, j));
    }
  }
  return out;
}

/** Every string literal inside an expression, in source order. */
function stringLiterals(expr: string): string[] {
  const out: string[] = [];
  const re = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(expr)) !== null) out.push(m[1] ?? m[2] ?? m[3] ?? "");
  return out;
}

async function scanFiles(patterns: string[]): Promise<Set<string>> {
  const found = new Set<string>();

  const files = (
    await Promise.all(
      patterns.map((pattern) =>
        glob(pattern, {
          ignore: [
            "**/node_modules/**",
            "**/dist/**",
            "**/.git/**",
            "**/.next/**",
            "**/build/**",
            "**/out/**",
          ],
          windowsPathsNoEscape: true,
        })
      )
    )
  ).flat();

  const add = (chunk: string) => {
    // Drop ${...} interpolations -- their contents are not literal classes.
    for (const cls of chunk.replace(/\$\{[^}]*\}/g, " ").split(/\s+/)) {
      if (cls) found.add(cls);
    }
  };

  for (const file of new Set(files)) {
    const content = fs.readFileSync(file, "utf-8");

    for (const value of classAttributeValues(content)) {
      // A bare attribute value has no quotes of its own; an expression does.
      const literals = /["'`]/.test(value) ? stringLiterals(value) : [value];
      for (const literal of literals) add(literal);
    }

    // Vue :class="'...'" / :class="['...', '...']"
    const vueClassRegex = /:class=["'][^"']*["']/g;
    let match: RegExpExecArray | null;
    while ((match = vueClassRegex.exec(content)) !== null) {
      for (const str of match[0].match(/'([^']+)'/g) ?? []) add(str.slice(1, -1));
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
/** The fixed directory prefix of a glob, i.e. everything before the first wildcard. */
function globRoot(pattern: string): string {
  const norm = pattern.replace(/\\/g, "/");
  const wildcard = norm.search(/[*?[{]/);
  const head = wildcard === -1 ? norm : norm.slice(0, wildcard);
  const dir = head.endsWith("/") ? head : path.dirname(head);
  return path.resolve(dir);
}

async function watchMode(
  patterns: string[],
  outputPath: string,
  generatorOptions: GeneratorOptions,
): Promise<void> {
  // Watch whatever the patterns actually point at, rather than assuming <dir>/src.
  const roots = [...new Set(patterns.map(globRoot))].filter((d) => fs.existsSync(d));

  if (roots.length === 0) {
    logError(`Nothing to watch — no directory matched: ${patterns.join(", ")}`);
    process.exit(1);
  }

  for (const root of roots) logInfo(`Watching ${root} for changes...`);
  logInfo("Press Ctrl+C to stop\n");

  await buildCSS(patterns, outputPath, generatorOptions);

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  for (const root of roots) {
    fs.watch(root, { recursive: true }, (_event, filename) => {
      if (!filename) return;

      const ext = path.extname(filename.toString()).toLowerCase();
      if (!WATCHED_EXTENSIONS.includes(ext)) return;

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        logInfo(`Change detected: ${filename}`);
        await buildCSS(patterns, outputPath, generatorOptions);
      }, 100);
    });
  }
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
  --content <glob>       Glob to scan, relative to <directory>. Repeatable.
                         Default: <directory>/src if it exists, else <directory>
  --important            Add !important to all declarations
  --prefix <prefix>      Add prefix to all class selectors (e.g., "z-")
  --auto-responsive      Replace every font-size with a fluid clamp() value
  --dark-mode <mode>     "media" (default) or "class" (.dark ancestor)
  -h, --help             Show this help message
  -v, --version          Show version number

${color.bold}EXAMPLES${color.reset}
  ${PACKAGE_NAME}                          ${color.dim}# Scan current directory${color.reset}
  ${PACKAGE_NAME} ./src                    ${color.dim}# Scan src directory${color.reset}
  ${PACKAGE_NAME} . -o dist/styles.css     ${color.dim}# Custom output path${color.reset}
  ${PACKAGE_NAME} . --watch                ${color.dim}# Watch mode${color.reset}
  ${PACKAGE_NAME} . --minify               ${color.dim}# Minified output${color.reset}
  ${PACKAGE_NAME} . --important            ${color.dim}# Add !important${color.reset}
  ${PACKAGE_NAME} . --auto-responsive      ${color.dim}# Fluid clamp() font sizes${color.reset}
  ${PACKAGE_NAME} . --dark-mode class      ${color.dim}# .dark ancestor instead of a media query${color.reset}
  ${PACKAGE_NAME} . --content "app/**/*.tsx" -o app/zee.css
                                          ${color.dim}# Next.js app/ router${color.reset}

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
  content: string[];
  watch: boolean;
  minify: boolean;
  important: boolean;
  prefix: string;
  autoResponsive: boolean;
  darkMode: "media" | "class";
  help: boolean;
  version: boolean;
} {
  const result = {
    directory: process.cwd(),
    output: null as string | null,
    content: [] as string[],
    watch: false,
    minify: false,
    important: false,
    prefix: "",
    autoResponsive: false,
    darkMode: "media" as "media" | "class",
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
      case "--auto-responsive":
        result.autoResponsive = true;
        break;
      case "--dark-mode": {
        const mode = argv[++i];
        if (mode !== "media" && mode !== "class") {
          logError(`--dark-mode expects "media" or "class", got "${mode ?? ""}"`);
          process.exit(1);
        }
        result.darkMode = mode;
        break;
      }
      case "--content":
        if (argv[i + 1]) result.content.push(argv[++i]);
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

  // --content wins. Otherwise scan <dir>/src when it exists, and fall back to
  // the directory itself — a Next.js app/ or a plain site has no src/, and
  // hardcoding it meant those projects silently generated an empty stylesheet.
  let patterns: string[];
  if (args.content.length) {
    patterns = args.content.map((c) => path.resolve(targetDir, c));
  } else if (fs.existsSync(path.join(targetDir, "src"))) {
    patterns = [path.join(targetDir, "src", "**", DEFAULT_EXTENSIONS)];
  } else {
    patterns = [path.join(targetDir, "**", DEFAULT_EXTENSIONS)];
  }

  const generatorOptions: GeneratorOptions = {
    important: args.important,
    prefix: args.prefix || undefined,
    minify: args.minify,
    autoResponsive: args.autoResponsive,
    darkMode: args.darkMode,
  };

  log(`\n${color.bold}${color.magenta}⚡ ${PACKAGE_NAME}${color.reset} v${VERSION}\n`);
  logInfo(`Scanning ${color.bold}${targetDir}${color.reset}`);
  if (args.autoResponsive) logInfo("Fluid font sizes enabled (clamp)");
  if (args.darkMode === "class") logInfo('Dark mode: class strategy (.dark ancestor)');

  if (args.watch) {
    await watchMode(patterns, outputPath, generatorOptions);
  } else {
    await buildCSS(patterns, outputPath, generatorOptions);
    log("");
  }
}

run().catch((err) => {
  logError(`Fatal error: ${err.message}`);
  process.exit(1);
});