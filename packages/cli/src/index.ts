#!/usr/bin/env node
import { glob } from "glob";
import fs from "fs";
import path from "path";
import { generateCSS } from "@my-utility-css/core";

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

function run() {
  // Get target directory from command line args, default to current directory
  const targetDir = process.argv[2] || process.cwd();
  const patterns = [path.join(targetDir, "src/**/*.{html,jsx,tsx,vue}")];
  const outputPath = path.resolve(targetDir, "dist/utilities.css");

  console.log(`Scanning files in ${targetDir} for utility classes...`);
  const classNames = scanFiles(patterns);
  console.log(`Found ${classNames.size} unique class names.`);

  const css = generateCSS(classNames);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, css, "utf-8");

  console.log(`Generated CSS written to ${outputPath}`);
}

run();