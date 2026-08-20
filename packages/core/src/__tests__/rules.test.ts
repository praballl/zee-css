import { describe, it, expect } from "vitest";
import { generateCSSForClass, generateCSS, clearCache } from "../generator";

// Helper to extract the declaration block from generated CSS
function getDecl(className: string): Record<string, string> | null {
  clearCache();
  const result = generateCSSForClass(className);
  if (!result) return null;
  const match = result.css.match(/\{([^}]+)\}/);
  if (!match) return null;
  const decl: Record<string, string> = {};
  for (const line of match[1].split(";")) {
    const [prop, ...valueParts] = line.split(":");
    if (prop && valueParts.length) {
      decl[prop.trim()] = valueParts.join(":").trim();
    }
  }
  return decl;
}

describe("Spacing rules", () => {
  it("generates padding", () => {
    const d = getDecl("pa-4");
    expect(d).toEqual({ padding: "1rem" });
  });

  it("generates margin with auto", () => {
    const d = getDecl("mx-auto");
    expect(d).toEqual({ "margin-left": "auto", "margin-right": "auto" });
  });

  it("generates negative margin", () => {
    const d = getDecl("-mt-4");
    expect(d).toEqual({ "margin-top": "-1rem" });
  });

  it("generates space-between", () => {
    const result = generateCSSForClass("space-y-4");
    expect(result).not.toBeNull();
    expect(result!.css).toContain("> * + *");
    expect(result!.css).toContain("margin-top: 1rem");
  });

  it("generates logical properties (RTL)", () => {
    const d = getDecl("ps-4");
    expect(d).toEqual({ "padding-inline-start": "1rem" });
  });
});

describe("Flexbox rules", () => {
  it("generates flex direction", () => {
    const d = getDecl("row");
    expect(d).toEqual({ display: "flex", "flex-direction": "row" });
  });

  it("generates flex-auto", () => {
    const d = getDecl("flex-auto");
    expect(d).toEqual({ flex: "1 1 auto" });
  });

  it("generates alignment", () => {
    const d = getDecl("items-center");
    expect(d).toEqual({ "align-items": "center" });
  });
});

describe("Grid rules", () => {
  it("generates grid-cols", () => {
    const d = getDecl("grid-cols-3");
    expect(d).toEqual({ "grid-template-columns": "repeat(3, minmax(0, 1fr))" });
  });

  it("generates col-span", () => {
    const d = getDecl("col-span-6");
    expect(d).toEqual({ "grid-column": "span 6 / span 6" });
  });

  it("generates grid-flow", () => {
    const d = getDecl("grid-flow-col");
    expect(d).toEqual({ "grid-auto-flow": "column" });
  });

  it("generates gap", () => {
    const d = getDecl("gap-4");
    expect(d).toEqual({ gap: "1rem" });
  });
});

describe("Layout rules", () => {
  it("generates display", () => {
    const d = getDecl("hidden");
    expect(d).toEqual({ display: "none" });
  });

  it("generates table display", () => {
    const d = getDecl("table-cell");
    expect(d).toEqual({ display: "table-cell" });
  });

  it("generates position", () => {
    const d = getDecl("absolute");
    expect(d).toEqual({ position: "absolute" });
  });

  it("generates float", () => {
    const d = getDecl("float-left");
    expect(d).toEqual({ float: "left" });
  });

  it("generates container", () => {
    const d = getDecl("container");
    expect(d).toEqual({ width: "100%", "margin-left": "auto", "margin-right": "auto" });
  });

  it("generates aspect ratio", () => {
    const d = getDecl("aspect-video");
    expect(d).toEqual({ "aspect-ratio": "16 / 9" });
  });

  it("generates convenience aliases", () => {
    const d = getDecl("fit");
    expect(d).toEqual({ width: "100%", height: "100%" });
  });
});

describe("Typography rules", () => {
  it("generates text color", () => {
    const d = getDecl("text-red-500");
    expect(d).toEqual({ color: "#ef4444" });
  });

  it("generates text alignment before color", () => {
    const d = getDecl("text-center");
    expect(d).toEqual({ "text-align": "center" });
  });

  it("generates MD typography scale", () => {
    const d = getDecl("text-h1");
    expect(d).not.toBeNull();
    expect(d!["font-size"]).toBe("6rem");
  });

  it("generates font family", () => {
    const d = getDecl("font-mono");
    expect(d).not.toBeNull();
    expect(d!["font-family"]).toContain("monospace");
  });

  it("generates vertical alignment", () => {
    const d = getDecl("align-middle");
    expect(d).toEqual({ "vertical-align": "middle" });
  });
});

describe("Background rules", () => {
  it("generates bg-color", () => {
    const d = getDecl("bg-blue-500");
    expect(d).toEqual({ "background-color": "#3b82f6" });
  });

  it("generates bg-cover", () => {
    const d = getDecl("bg-cover");
    expect(d).toEqual({ "background-size": "cover" });
  });

  it("generates bg-center", () => {
    const d = getDecl("bg-center");
    expect(d).toEqual({ "background-position": "center" });
  });

  it("generates bg-clip-text", () => {
    const d = getDecl("bg-clip-text");
    expect(d).toEqual({ "-webkit-background-clip": "text", "background-clip": "text" });
  });

  it("generates gradient", () => {
    const d = getDecl("bg-gradient-to-r");
    expect(d).not.toBeNull();
    expect(d!["background-image"]).toContain("linear-gradient");
    expect(d!["background-image"]).toContain("to right");
  });

  it("generates gradient color stops", () => {
    const d = getDecl("from-red-500");
    expect(d).toEqual({ "--z-gradient-from": "#ef4444" });
  });
});

describe("Effects rules", () => {
  it("generates ring", () => {
    const d = getDecl("ring");
    expect(d).not.toBeNull();
    expect(d!["box-shadow"]).toContain("--z-ring-color");
  });

  it("generates ring width", () => {
    const d = getDecl("ring-2");
    expect(d).not.toBeNull();
    expect(d!["box-shadow"]).toContain("2px");
  });

  it("generates divide utilities", () => {
    const result = generateCSSForClass("divide-y");
    expect(result).not.toBeNull();
    expect(result!.css).toContain("> * + *");
    expect(result!.css).toContain("border-top-width: 1px");
  });

  it("generates backdrop blur", () => {
    const d = getDecl("backdrop-blur-lg");
    expect(d).toEqual({ "backdrop-filter": "blur(16px)" });
  });

  it("generates mix-blend-mode", () => {
    const d = getDecl("mix-blend-multiply");
    expect(d).toEqual({ "mix-blend-mode": "multiply" });
  });
});

describe("SVG rules", () => {
  it("generates fill color", () => {
    const d = getDecl("fill-red-500");
    expect(d).toEqual({ fill: "#ef4444" });
  });

  it("generates stroke width", () => {
    const d = getDecl("stroke-2");
    expect(d).toEqual({ "stroke-width": "2" });
  });
});

describe("Transform rules", () => {
  it("generates scale", () => {
    const d = getDecl("scale-50");
    expect(d).toEqual({ transform: "scale(0.5)" });
  });

  it("generates negative translate", () => {
    const d = getDecl("-translate-x-4");
    expect(d).toEqual({ transform: "translateX(-1rem)" });
  });

  it("generates animations with keyframes", () => {
    clearCache();
    const result = generateCSSForClass("animate-spin");
    expect(result).not.toBeNull();
    expect(result!.keyframes).toContain("@keyframes z-spin");
  });
});

describe("Interactivity rules", () => {
  it("generates cursor", () => {
    const d = getDecl("cursor-pointer");
    expect(d).toEqual({ cursor: "pointer" });
  });

  it("generates scroll-smooth", () => {
    const d = getDecl("scroll-smooth");
    expect(d).toEqual({ "scroll-behavior": "smooth" });
  });

  it("generates snap utilities", () => {
    const d = getDecl("snap-start");
    expect(d).toEqual({ "scroll-snap-align": "start" });
  });

  it("generates accent color", () => {
    const d = getDecl("accent-blue-500");
    expect(d).toEqual({ "accent-color": "#3b82f6" });
  });

  it("generates sr-only", () => {
    const d = getDecl("sr-only");
    expect(d).not.toBeNull();
    expect(d!.position).toBe("absolute");
    expect(d!.width).toBe("1px");
  });
});

describe("Variant system", () => {
  it("generates responsive variants", () => {
    clearCache();
    const result = generateCSSForClass("md:pa-4");
    expect(result).not.toBeNull();
    expect(result!.css).toContain("@media (min-width: 768px)");
    expect(result!.css).toContain("padding: 1rem");
  });

  it("generates state variants", () => {
    clearCache();
    const result = generateCSSForClass("hover:bg-blue-500");
    expect(result).not.toBeNull();
    expect(result!.css).toContain(":hover");
    expect(result!.css).toContain("background-color: #3b82f6");
  });

  it("generates dark mode (media)", () => {
    clearCache();
    const result = generateCSSForClass("dark:bg-black");
    expect(result).not.toBeNull();
    expect(result!.css).toContain("prefers-color-scheme: dark");
    expect(result!.css).toContain("background-color: #000000");
  });

  it("generates dark mode (class)", () => {
    clearCache();
    const result = generateCSSForClass("dark:bg-black", { darkMode: "class" });
    expect(result).not.toBeNull();
    expect(result!.css).toContain(".dark ");
    expect(result!.css).not.toContain("prefers-color-scheme");
  });

  it("generates print variant", () => {
    clearCache();
    const result = generateCSSForClass("print:hidden");
    expect(result).not.toBeNull();
    expect(result!.css).toContain("@media print");
    expect(result!.css).toContain("display: none");
  });

  it("generates combined responsive + state", () => {
    clearCache();
    const result = generateCSSForClass("lg:hover:text-white");
    expect(result).not.toBeNull();
    expect(result!.css).toContain("@media (min-width: 1024px)");
    expect(result!.css).toContain(":hover");
    expect(result!.css).toContain("color: #ffffff");
  });

  it("generates per-class important with ! prefix", () => {
    clearCache();
    const result = generateCSSForClass("!pa-4");
    expect(result).not.toBeNull();
    expect(result!.css).toContain("!important");
    expect(result!.css).toContain("padding: 1rem");
  });
});

describe("Arbitrary values", () => {
  it("generates arbitrary width", () => {
    clearCache();
    const result = generateCSSForClass("w-[200px]");
    expect(result).not.toBeNull();
    expect(result!.css).toContain("width: 200px");
  });

  it("generates arbitrary padding", () => {
    clearCache();
    const result = generateCSSForClass("p-[13px]");
    expect(result).not.toBeNull();
    expect(result!.css).toContain("padding: 13px");
  });

  it("generates arbitrary color", () => {
    clearCache();
    const result = generateCSSForClass("text-[#ff0000]");
    expect(result).not.toBeNull();
    expect(result!.css).toContain("color: #ff0000");
  });
});

describe("generateCSS (batch)", () => {
  it("generates CSS for multiple classes", () => {
    clearCache();
    const css = generateCSS(["pa-4", "bg-blue-500", "text-white"]);
    expect(css).toContain("padding: 1rem");
    expect(css).toContain("background-color: #3b82f6");
    expect(css).toContain("color: #ffffff");
  });

  it("deduplicates classes", () => {
    clearCache();
    const css = generateCSS(["pa-4", "pa-4", "pa-4"]);
    const matches = css.match(/padding: 1rem/g);
    expect(matches).toHaveLength(1);
  });

  it("includes keyframes for animations", () => {
    clearCache();
    const css = generateCSS(["animate-spin"]);
    expect(css).toContain("@keyframes z-spin");
  });

  it("groups responsive rules by breakpoint", () => {
    clearCache();
    const css = generateCSS(["pa-4", "md:pa-8", "lg:pa-12"]);
    expect(css).toContain("padding: 1rem");
    expect(css).toContain("@media (min-width: 768px)");
    expect(css).toContain("@media (min-width: 1024px)");
  });
});

// ──────────────────────────────────────────────
// Regression tests for the 1.1.0 fixes
// ──────────────────────────────────────────────
describe("selector escaping (1.1.0)", () => {
  it("escapes # in an arbitrary hex value", () => {
    clearCache();
    const r = generateCSSForClass("bg-[#14b8a6]");
    expect(r?.css).toContain(".bg-\\[\\#14b8a6\\]");
    expect(r?.css).toContain("background-color: #14b8a6");
  });

  it("escapes % in an arbitrary hsl value", () => {
    clearCache();
    expect(generateCSSForClass("bg-[hsl(174,80%,40%)]")?.css)
      .toContain(".bg-\\[hsl\\(174\\,80\\%\\,40\\%\\)\\]");
  });

  it("writes a leading digit as a numeric code-point escape", () => {
    clearCache();
    const css = generateCSSForClass("2xl:pa-8")?.css ?? "";
    expect(css).toContain(".\\32 xl\\:pa-8");
    expect(css).not.toContain(".2xl");
  });

  it("still escapes the characters 1.0.0 handled", () => {
    clearCache();
    expect(generateCSSForClass("md:pa-8")?.css).toContain(".md\\:pa-8");
    expect(generateCSSForClass("pa-0.5")?.css).toContain(".pa-0\\.5");
    expect(generateCSSForClass("w-1/2")?.css).toContain(".w-1\\/2");
    expect(generateCSSForClass("!pa-4")?.css).toContain(".\\!pa-4");
    expect(generateCSSForClass("-mt-4")?.css).toContain(".-mt-4");
  });
});

describe("flex direction aliases (1.1.0)", () => {
  it("flex-col sets only the direction", () => {
    clearCache();
    expect(getDecl("flex-col")).toEqual({ "flex-direction": "column" });
    expect(getDecl("flex-row")).toEqual({ "flex-direction": "row" });
  });

  it("reverse variants work", () => {
    clearCache();
    expect(getDecl("flex-col-reverse")).toEqual({ "flex-direction": "column-reverse" });
    expect(getDecl("flex-row-reverse")).toEqual({ "flex-direction": "row-reverse" });
  });

  it("does not disturb row / column, which also set display", () => {
    clearCache();
    expect(getDecl("column")).toEqual({ display: "flex", "flex-direction": "column" });
    expect(getDecl("flex-1")).toEqual({ flex: "1" });
    expect(getDecl("flex-none")).toEqual({ flex: "none" });
  });
});

describe("named min/max size scale (1.1.0)", () => {
  it("resolves named steps on max-w", () => {
    clearCache();
    expect(getDecl("max-w-lg")).toEqual({ "max-width": "32rem" });
    expect(getDecl("max-w-prose")).toEqual({ "max-width": "65ch" });
    expect(getDecl("max-w-none")).toEqual({ "max-width": "none" });
  });

  it("applies to min-w, min-h and max-h too", () => {
    clearCache();
    expect(getDecl("min-w-lg")).toEqual({ "min-width": "32rem" });
    expect(getDecl("max-h-2xl")).toEqual({ "max-height": "42rem" });
  });

  it("keeps named steps out of w- and h-", () => {
    clearCache();
    expect(generateCSSForClass("w-lg")).toBe(null);
    expect(generateCSSForClass("h-lg")).toBe(null);
  });

  it("still resolves the numeric and keyword scale", () => {
    clearCache();
    expect(getDecl("max-w-96")).toEqual({ "max-width": "24rem" });
    expect(getDecl("max-w-full")).toEqual({ "max-width": "100%" });
  });
});

describe("height fractions (1.1.0)", () => {
  it("accepts fractions on the block axis", () => {
    clearCache();
    expect(getDecl("h-1/2")).toEqual({ height: "50%" });
    expect(getDecl("h-2/3")).toEqual({ height: "66.666667%" });
  });

  it("leaves the width axis alone", () => {
    clearCache();
    expect(getDecl("w-1/2")).toEqual({ width: "50%" });
    expect(getDecl("h-screen")).toEqual({ height: "100vh" });
  });
});

describe("per-side border widths (1.1.0)", () => {
  it("sets a single side", () => {
    clearCache();
    expect(getDecl("border-l-4")).toEqual({
      "border-left-width": "4px",
      "border-left-style": "solid",
    });
  });

  it("supports logical sides", () => {
    clearCache();
    expect(getDecl("border-s-4")).toEqual({
      "border-inline-start-width": "4px",
      "border-inline-start-style": "solid",
    });
  });

  it("supports the axis pairs, with and without a width", () => {
    clearCache();
    expect(getDecl("border-x")).toEqual({
      "border-left-width": "1px",
      "border-right-width": "1px",
      "border-left-style": "solid",
      "border-right-style": "solid",
    });
    expect(getDecl("border-y-4")).toEqual({
      "border-top-width": "4px",
      "border-bottom-width": "4px",
      "border-top-style": "solid",
      "border-bottom-style": "solid",
    });
  });

  it("does not shadow border colors or styles", () => {
    clearCache();
    expect(getDecl("border-slate-300")).toEqual({ "border-color": "#cbd5e1" });
    expect(getDecl("border-dashed")).toEqual({ "border-style": "dashed" });
    expect(getDecl("border-l")).toEqual({
      "border-left-width": "1px",
      "border-left-style": "solid",
    });
  });
});
