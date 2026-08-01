#!/usr/bin/env node
import { glob } from "glob";
import fs from "fs";
import path from "path";
import { generateCSS } from "@my-utility-css/core";

const VERSION = "1.0.0";

const CLASS_REGEX = /class(Name)?=["']([^"']+)["']/g;

function scanFiles(patterns: string[]): Set<string> {
  const found = new Set<string>();

  const files = patterns.flatMap((pattern) =>
    glob.sync(pattern, { ignore: "**/node_modules/**" })
  );

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    let match: RegExpExecArray | null;

    while ((match = CLASS_REGEX.exec(content)) !== null) {
      const classList = match[2].split(/\s+/);
      classList.forEach((cls) => found.add(cls));
    }
  }

  return found;
}

function showHelp() {
  console.log(`
zee-css v${VERSION}
A CLI tool for my-utility-css - generates CSS from utility class usage

USAGE:
  zee-css [directory]

ARGUMENTS:
  directory    Target directory to scan (default: current directory)

EXAMPLES:
  zee-css                    # Scan current directory
  zee-css ./src             # Scan src directory
  zee-css ./my-project      # Scan specific project

The tool scans for files matching: src/**/*.{html,jsx,tsx,vue}
Output is written to: <directory>/dist/utilities.css

For more information, visit: https://github.com/praballl/zee-css
`);
}

function showVersion() {
  console.log(`zee-css v${VERSION}`);
}

function run() {
  // Check for help or version flags
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  if (args.includes('--version') || args.includes('-v')) {
    showVersion();
    return;
  }

  // Get target directory from command line args, default to current directory
  const targetDir = args[0] || process.cwd();
  const patterns = [path.join(targetDir, "src/**/*.{html,jsx,tsx,vue}")];
  const outputPath = path.resolve(targetDir, "dist/utilities.css");

  console.log(`zee-css v${VERSION}`);
  console.log(`Scanning files in ${targetDir} for utility classes...`);
  const classNames = scanFiles(patterns);
  console.log(`Found ${classNames.size} unique class names.`);

  const css = generateCSS(classNames);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, css, "utf-8");

  console.log(`Generated CSS written to ${outputPath}`);
}

run();