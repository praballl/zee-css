import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="page-wrapper">

  <!-- ── HEADER ── -->
  <header class="pa-8 bg-indigo-900 text-white">
    <div class="max-w-48 mx-auto text-center">
      <h1 class="text-h2 font-bold tracking-tight mb-2">Zee CSS</h1>
      <p class="text-subtitle1 opacity-80">A TypeScript-first utility CSS framework — Tailwind-style, fully programmable</p>
      <div class="row justify-center gap-4 mt-4">
        <span class="badge bg-indigo-500 text-white pa-2 rounded-full fs-xs font-semibold">Tailwind-compatible classes</span>
        <span class="badge bg-purple-500 text-white pa-2 rounded-full fs-xs font-semibold">242 colors</span>
        <span class="badge bg-blue-500 text-white pa-2 rounded-full fs-xs font-semibold">Dark mode</span>
      </div>
    </div>
  </header>

  <main class="pa-8 mx-auto">

    <!-- ── SECTION 1: COLOR PALETTE ── -->
    <section class="section">
      <h2 class="section-title">1. Color Palette (242 colors)</h2>
      <p class="section-desc">Full Tailwind-compatible color palette with 22 families × 11 shades.</p>

      <div class="color-grid">
        <div class="color-swatch bg-red-400 text-white pa-4 rounded-lg">red-400</div>
        <div class="color-swatch bg-orange-400 text-white pa-4 rounded-lg">orange-400</div>
        <div class="color-swatch bg-amber-400 pa-4 rounded-lg">amber-400</div>
        <div class="color-swatch bg-yellow-400 pa-4 rounded-lg">yellow-400</div>
        <div class="color-swatch bg-lime-400 pa-4 rounded-lg">lime-400</div>
        <div class="color-swatch bg-green-400 text-white pa-4 rounded-lg">green-400</div>
        <div class="color-swatch bg-teal-400 pa-4 rounded-lg">teal-400</div>
        <div class="color-swatch bg-cyan-400 pa-4 rounded-lg">cyan-400</div>
        <div class="color-swatch bg-sky-400 pa-4 rounded-lg">sky-400</div>
        <div class="color-swatch bg-blue-400 text-white pa-4 rounded-lg">blue-400</div>
        <div class="color-swatch bg-indigo-400 text-white pa-4 rounded-lg">indigo-400</div>
        <div class="color-swatch bg-violet-400 text-white pa-4 rounded-lg">violet-400</div>
        <div class="color-swatch bg-purple-400 text-white pa-4 rounded-lg">purple-400</div>
        <div class="color-swatch bg-fuchsia-400 text-white pa-4 rounded-lg">fuchsia-400</div>
        <div class="color-swatch bg-pink-400 text-white pa-4 rounded-lg">pink-400</div>
        <div class="color-swatch bg-rose-400 text-white pa-4 rounded-lg">rose-400</div>
        <div class="color-swatch bg-slate-400 text-white pa-4 rounded-lg">slate-400</div>
        <div class="color-swatch bg-gray-400 text-white pa-4 rounded-lg">gray-400</div>
        <div class="color-swatch bg-zinc-400 pa-4 rounded-lg">zinc-400</div>
        <div class="color-swatch bg-neutral-400 pa-4 rounded-lg">neutral-400</div>
        <div class="color-swatch bg-stone-400 pa-4 rounded-lg">stone-400</div>
        <div class="color-swatch bg-emerald-400 pa-4 rounded-lg">emerald-400</div>
      </div>

      <div class="shade-row mt-4">
        <div class="shade bg-blue-50 pa-3 rounded">50</div>
        <div class="shade bg-blue-100 pa-3 rounded">100</div>
        <div class="shade bg-blue-200 pa-3 rounded">200</div>
        <div class="shade bg-blue-300 pa-3 rounded">300</div>
        <div class="shade bg-blue-400 pa-3 rounded">400</div>
        <div class="shade bg-blue-500 text-white pa-3 rounded">500</div>
        <div class="shade bg-blue-600 text-white pa-3 rounded">600</div>
        <div class="shade bg-blue-700 text-white pa-3 rounded">700</div>
        <div class="shade bg-blue-800 text-white pa-3 rounded">800</div>
        <div class="shade bg-blue-900 text-white pa-3 rounded">900</div>
        <div class="shade bg-blue-950 text-white pa-3 rounded">950</div>
      </div>
    </section>

    <!-- ── SECTION 2: CSS GRID ── -->
    <section class="section">
      <h2 class="section-title">2. CSS Grid Layout</h2>
      <p class="section-desc">New: grid-cols-*, col-span-*, row-span-*, grid-flow-*, auto-cols-*</p>

      <div class="grid grid-cols-4 gap-3 mb-4">
        <div class="cell col-span-2 bg-indigo-500 text-white pa-4 rounded-lg text-center">col-span-2</div>
        <div class="cell bg-indigo-300 pa-4 rounded-lg text-center">col</div>
        <div class="cell bg-indigo-300 pa-4 rounded-lg text-center">col</div>
        <div class="cell bg-purple-300 pa-4 rounded-lg text-center">col</div>
        <div class="cell col-span-3 bg-purple-500 text-white pa-4 rounded-lg text-center">col-span-3</div>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div class="cell bg-blue-100 pa-3 rounded text-center">grid-cols-3</div>
        <div class="cell bg-blue-100 pa-3 rounded text-center">equal</div>
        <div class="cell bg-blue-100 pa-3 rounded text-center">columns</div>
      </div>
    </section>

    <!-- ── SECTION 3: GRADIENTS ── -->
    <section class="section">
      <h2 class="section-title">3. Gradients</h2>
      <p class="section-desc">New: bg-gradient-to-{direction} + from-{color} + via-{color} + to-{color}</p>

      <div class="gradient-grid">
        <div class="grad-box bg-gradient-to-r from-purple-500 to-pink-500 text-white pa-6 rounded-xl">→ right</div>
        <div class="grad-box bg-gradient-to-br from-blue-500 to-cyan-300 text-white pa-6 rounded-xl">↘ bottom-right</div>
        <div class="grad-box bg-gradient-to-b from-green-400 to-emerald-700 text-white pa-6 rounded-xl">↓ bottom</div>
        <div class="grad-box bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 text-white pa-6 rounded-xl">→ with via</div>
        <div class="grad-box bg-gradient-to-r from-indigo-200 to-purple-200 pa-6 rounded-xl">→ subtle</div>
        <div class="grad-box bg-gradient-to-bl from-rose-400 to-orange-300 text-white pa-6 rounded-xl">↙ bottom-left</div>
      </div>
    </section>

    <!-- ── SECTION 4: TYPOGRAPHY ── -->
    <section class="section">
      <h2 class="section-title">4. Typography Scale</h2>
      <p class="section-desc">New: Material Design scale (text-h1...h6), font-sans/serif/mono, vertical alignment</p>

      <div class="typo-demo mb-4">
        <div class="text-h1 font-light text-slate-800">H1 Heading</div>
        <div class="text-h2 font-light text-slate-700">H2 Heading</div>
        <div class="text-h3 text-slate-700">H3 Heading</div>
        <div class="text-h4 text-slate-600">H4 Heading</div>
        <div class="text-h5 text-slate-600">H5 Heading</div>
        <div class="text-h6 font-medium text-slate-600">H6 Heading</div>
        <div class="text-subtitle1 text-slate-500">Subtitle 1</div>
        <div class="text-subtitle2 text-slate-500">Subtitle 2</div>
        <div class="text-body1 text-slate-600">Body 1 — regular body text</div>
        <div class="text-body2 text-slate-500">Body 2 — smaller body text</div>
        <div class="text-caption text-slate-400">Caption text</div>
        <div class="text-overline text-indigo-500">Overline text</div>
      </div>

      <div class="row gap-4">
        <div class="demo-chip font-sans pa-3 bg-slate-100 rounded">font-sans</div>
        <div class="demo-chip font-serif pa-3 bg-slate-100 rounded">font-serif</div>
        <div class="demo-chip font-mono pa-3 bg-slate-100 rounded">font-mono</div>
      </div>
    </section>

    <!-- ── SECTION 5: SPACING UTILITIES ── -->
    <section class="section">
      <h2 class="section-title">5. Spacing & Space-Between</h2>
      <p class="section-desc">New: space-x-* and space-y-* (adds margin between children)</p>

      <div class="row space-x-4 mb-4">
        <div class="bg-blue-200 pa-4 rounded">A</div>
        <div class="bg-blue-300 pa-4 rounded">B</div>
        <div class="bg-blue-400 text-white pa-4 rounded">C</div>
        <div class="bg-blue-500 text-white pa-4 rounded">D</div>
      </div>
      <p class="text-caption text-slate-400 mb-4">row with space-x-4 (automatic gap between children)</p>

      <div class="column space-y-3">
        <div class="bg-purple-100 pa-3 rounded">Stack item 1</div>
        <div class="bg-purple-200 pa-3 rounded">Stack item 2</div>
        <div class="bg-purple-300 pa-3 rounded">Stack item 3</div>
      </div>
      <p class="text-caption text-slate-400 mt-2">column with space-y-3</p>
    </section>

    <!-- ── SECTION 6: DIVIDE UTILITIES ── -->
    <section class="section">
      <h2 class="section-title">6. Divide Utilities</h2>
      <p class="section-desc">New: divide-y, divide-x, divide-{color} — borders between children</p>

      <div class="divide-y divide-slate-200 mb-4">
        <div class="pa-4">First row</div>
        <div class="pa-4">Second row</div>
        <div class="pa-4">Third row</div>
        <div class="pa-4">Fourth row</div>
      </div>

      <div class="row divide-x divide-indigo-200">
        <div class="pa-4 flex-1 text-center">Col A</div>
        <div class="pa-4 flex-1 text-center">Col B</div>
        <div class="pa-4 flex-1 text-center">Col C</div>
      </div>
    </section>

    <!-- ── SECTION 7: EFFECTS & FILTERS ── -->
    <section class="section">
      <h2 class="section-title">7. Effects & Filters</h2>
      <p class="section-desc">New: backdrop-blur, contrast, saturate, invert, sepia, ring utilities</p>

      <div class="row gap-4 mb-4 flex-wrap">
        <div class="effect-box shadow-xl pa-4 rounded-xl bg-white">shadow-xl</div>
        <div class="effect-box blur pa-4 rounded-xl bg-blue-200">blur</div>
        <div class="effect-box brightness-150 pa-4 rounded-xl bg-yellow-300">brightness-150</div>
        <div class="effect-box contrast-125 pa-4 rounded-xl bg-green-300">contrast-125</div>
        <div class="effect-box saturate-150 pa-4 rounded-xl bg-pink-300">saturate-150</div>
        <div class="effect-box grayscale pa-4 rounded-xl bg-indigo-300 text-white">grayscale</div>
        <div class="effect-box sepia pa-4 rounded-xl bg-amber-200">sepia</div>
        <div class="effect-box invert pa-4 rounded-xl bg-blue-800 text-white">invert</div>
      </div>

      <h3 class="fs-base font-semibold mb-3 text-slate-600">Ring Utilities (Focus indicators)</h3>
      <div class="row gap-4 flex-wrap">
        <button class="pa-3 rounded-lg bg-blue-500 text-white ring ring-blue-300 ring-offset-2">ring</button>
        <button class="pa-3 rounded-lg bg-green-500 text-white ring-4 ring-green-200">ring-4</button>
        <button class="pa-3 rounded-lg bg-purple-500 text-white ring-2 ring-purple-300 ring-inset">ring-inset</button>
      </div>
    </section>

    <!-- ── SECTION 8: ANIMATIONS ── -->
    <section class="section">
      <h2 class="section-title">8. Animations</h2>
      <p class="section-desc">New: animate-spin, animate-ping, animate-pulse, animate-bounce</p>

      <div class="row gap-8 items-center flex-wrap">
        <div class="animation-demo">
          <div class="animate-spin w-spinner h-spinner border-4 border-blue-200 rounded-full" style="border-top-color:#3b82f6"></div>
          <p class="text-caption text-center mt-2">animate-spin</p>
        </div>
        <div class="animation-demo">
          <div class="animate-pulse bg-purple-500 rounded-full w-spinner h-spinner"></div>
          <p class="text-caption text-center mt-2">animate-pulse</p>
        </div>
        <div class="animation-demo">
          <div class="animate-bounce bg-green-500 rounded-full w-spinner h-spinner"></div>
          <p class="text-caption text-center mt-2">animate-bounce</p>
        </div>
        <div class="animation-demo">
          <div class="bg-pink-200 rounded-full w-spinner h-spinner" style="position:relative">
            <div class="animate-ping bg-pink-400 rounded-full" style="position:absolute;inset:0;opacity:0.75"></div>
          </div>
          <p class="text-caption text-center mt-2">animate-ping</p>
        </div>
      </div>
    </section>

    <!-- ── SECTION 9: DARK MODE ── -->
    <section class="section">
      <h2 class="section-title">9. Dark Mode Variant</h2>
      <p class="section-desc">New: dark: prefix — adapts to prefers-color-scheme: dark</p>

      <div class="bg-white dark:bg-slate-800 pa-6 rounded-xl border border-slate-200">
        <p class="text-slate-800 dark:text-slate-100 font-semibold">This text adapts to dark mode</p>
        <p class="text-slate-500 dark:text-slate-400 text-body2 mt-2">
          Background and text colors automatically switch when the user's OS is set to dark mode.
          <br>Try toggling dark mode in your OS settings.
        </p>
        <div class="mt-4 row gap-3">
          <div class="pa-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100">dark:bg-blue-900</div>
          <div class="pa-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100">dark:bg-green-900</div>
        </div>
      </div>
    </section>

    <!-- ── SECTION 10: TRANSFORMS ── -->
    <section class="section">
      <h2 class="section-title">10. Transforms & Transitions</h2>
      <p class="section-desc">Hover to see transitions. New: scale-x/y, skew, rotate negative, transform-origin</p>

      <div class="row gap-4 flex-wrap">
        <div class="transform-box bg-blue-500 text-white pa-4 rounded-lg hover:scale-110 transition duration-300">hover:scale-110</div>
        <div class="transform-box bg-purple-500 text-white pa-4 rounded-lg hover:rotate-12 transition duration-300">hover:rotate-12</div>
        <div class="transform-box bg-pink-500 text-white pa-4 rounded-lg hover:-translate-y-4 transition duration-300">hover:-translate-y-4</div>
        <div class="transform-box bg-green-500 text-white pa-4 rounded-lg hover:skew-x-6 transition duration-300">hover:skew-x-6</div>
        <div class="transform-box bg-orange-500 text-white pa-4 rounded-lg hover:shadow-2xl hover:scale-105 transition duration-300">hover combined</div>
      </div>
    </section>

    <!-- ── SECTION 11: ARBITRARY VALUES ── -->
    <section class="section">
      <h2 class="section-title">11. Arbitrary Values</h2>
      <p class="section-desc">New: bracket syntax — w-[200px], text-[#ff6b6b], p-[13px], bg-[#1a1a2e]</p>

      <div class="row gap-4 flex-wrap items-center">
        <div class="w-[180px] bg-indigo-100 pa-4 rounded text-center">w-[180px]</div>
        <div class="pa-[13px] bg-pink-100 rounded">p-[13px]</div>
        <div class="text-[#e74c3c] font-bold fs-xl">text-[#e74c3c]</div>
        <div class="bg-[#1a1a2e] text-white pa-4 rounded">bg-[#1a1a2e]</div>
        <div class="h-[60px] w-[60px] bg-emerald-400 rounded-full"></div>
      </div>
    </section>

    <!-- ── SECTION 12: BORDERS & RADIUS ── -->
    <section class="section">
      <h2 class="section-title">12. Borders, Radius & Outlines</h2>
      <p class="section-desc">New: border-s/e, rounded-s/e, outline-{width}, outline-offset-*</p>

      <div class="row gap-4 flex-wrap mb-4">
        <div class="pa-4 rounded-none border border-slate-400">rounded-none</div>
        <div class="pa-4 rounded border border-slate-400">rounded</div>
        <div class="pa-4 rounded-md border border-slate-400">rounded-md</div>
        <div class="pa-4 rounded-lg border border-slate-400">rounded-lg</div>
        <div class="pa-4 rounded-xl border border-slate-400">rounded-xl</div>
        <div class="pa-4 rounded-2xl border border-slate-400">rounded-2xl</div>
        <div class="pa-4 rounded-full border border-slate-400">rounded-full</div>
      </div>

      <div class="row gap-4 flex-wrap">
        <button class="pa-3 rounded-lg bg-white outline outline-2 outline-offset-2 border border-blue-400">outline-2</button>
        <button class="pa-3 rounded-lg bg-white outline-4 outline-offset-4 border border-purple-400">outline-4</button>
        <div class="pa-4 rounded-lg border-s-4 border-blue-500 bg-blue-50">border-s (inline-start)</div>
        <div class="pa-4 rounded-lg border-e-4 border-purple-500 bg-purple-50">border-e (inline-end)</div>
      </div>
    </section>

    <!-- ── SECTION 13: INTERACTIVITY ── -->
    <section class="section">
      <h2 class="section-title">13. Interactivity</h2>
      <p class="section-desc">New: scroll-smooth, snap-*, accent-*, caret-*, touch-*, resize-*</p>

      <div class="row gap-4 flex-wrap mb-4">
        <input class="pa-3 rounded-lg border border-slate-300 caret-blue-500 accent-blue-500" type="text" placeholder="caret-blue-500">
        <input class="pa-3 rounded-lg border border-slate-300 caret-pink-500" type="text" placeholder="caret-pink-500">
        <input type="checkbox" class="accent-green-500" checked> <span class="pa-2">accent-green-500</span>
        <input type="checkbox" class="accent-purple-500" checked> <span class="pa-2">accent-purple-500</span>
      </div>

      <div class="row gap-4 flex-wrap">
        <select class="pa-3 rounded-lg border border-slate-300 cursor-pointer">
          <option>cursor-pointer on select</option>
        </select>
        <div class="pa-4 rounded-lg bg-slate-100 resize overflow-auto" style="width:150px;height:80px">resize (drag corner)</div>
      </div>
    </section>

    <!-- ── SECTION 14: RTL & LOGICAL PROPS ── -->
    <section class="section">
      <h2 class="section-title">14. RTL & Logical Properties</h2>
      <p class="section-desc">New: ps-* (padding-inline-start), pe-*, ms-*, me-*, start-*, end-*</p>

      <div class="row gap-4 flex-wrap">
        <div class="ps-8 pe-4 py-4 bg-blue-100 rounded-lg">ps-8 pe-4</div>
        <div class="ms-8 pa-4 bg-purple-100 rounded-lg">ms-8 (margin-inline-start)</div>
        <div class="pa-4 bg-green-100 rounded-lg text-start">text-start</div>
        <div class="pa-4 bg-orange-100 rounded-lg text-end">text-end</div>
      </div>
    </section>

    <!-- ── SECTION 15: SVG UTILITIES ── -->
    <section class="section">
      <h2 class="section-title">15. SVG Utilities</h2>
      <p class="section-desc">New: fill-{color}, stroke-{color}, stroke-{0|1|2}</p>

      <div class="row gap-6 items-center flex-wrap">
        <svg width="48" height="48" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" class="fill-blue-500" />
        </svg>
        <svg width="48" height="48" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" class="fill-none stroke-red-500 stroke-2" />
        </svg>
        <svg width="48" height="48" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="4" class="fill-purple-500 opacity-80" />
        </svg>
        <svg width="48" height="48" viewBox="0 0 24 24">
          <polygon points="12,2 22,20 2,20" class="fill-amber-400 stroke-amber-600 stroke-1" />
        </svg>
        <svg width="48" height="48" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" class="fill-emerald-400 stroke-emerald-700 stroke-2" />
        </svg>
      </div>
    </section>

    <!-- ── SECTION 16: RESPONSIVE ── -->
    <section class="section">
      <h2 class="section-title">16. Responsive Variants</h2>
      <p class="section-desc">Resize browser to see: sm:, md:, lg:, xl:, 2xl: breakpoints in action</p>

      <div class="bg-blue-100 md:bg-green-100 lg:bg-purple-100 pa-6 rounded-xl text-center">
        <p class="text-body1 font-semibold text-slate-700">
          <span class="block md:hidden">Mobile view (blue)</span>
          <span class="hidden md:block lg:hidden">Tablet view (green)</span>
          <span class="hidden lg:block">Desktop view (purple)</span>
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div class="bg-pink-100 pa-4 rounded text-center">col 1</div>
        <div class="bg-pink-200 pa-4 rounded text-center">col 2</div>
        <div class="bg-pink-300 pa-4 rounded text-center">col 3</div>
        <div class="bg-pink-400 text-white pa-4 rounded text-center">col 4</div>
      </div>
    </section>

    <!-- ── SECTION 17: STATE VARIANTS ── -->
    <section class="section">
      <h2 class="section-title">17. State Variants</h2>
      <p class="section-desc">hover:, focus:, active:, disabled:, first:, last:, odd:, even:</p>

      <div class="row gap-4 flex-wrap mb-4">
        <button class="pa-3 px-6 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition duration-200">hover:bg-blue-700</button>
        <button class="pa-3 px-6 rounded-lg bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200">hover swap</button>
        <input class="pa-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200" placeholder="focus:border-blue-500">
        <button class="pa-3 px-6 rounded-lg bg-red-400 text-white active:scale-95 transition duration-100">active:scale-95</button>
        <button class="pa-3 px-6 rounded-lg bg-slate-200 text-slate-400 cursor-not-allowed" disabled>disabled button</button>
      </div>

      <ul class="divide-y divide-slate-200">
        <li class="pa-3 first:pt-0 odd:bg-slate-50 even:bg-white">Item 1 (odd, first)</li>
        <li class="pa-3 odd:bg-slate-50 even:bg-white">Item 2 (even)</li>
        <li class="pa-3 odd:bg-slate-50 even:bg-white">Item 3 (odd)</li>
        <li class="pa-3 last:pb-0 odd:bg-slate-50 even:bg-white">Item 4 (even, last)</li>
      </ul>
    </section>

    <!-- ── SECTION 18: PRINT & MEDIA VARIANTS ── -->
    <section class="section">
      <h2 class="section-title">18. Print & Motion Variants</h2>
      <p class="section-desc">New: print:, motion-safe:, motion-reduce: media query variants</p>

      <div class="pa-4 rounded-lg bg-slate-100">
        <p class="text-body1 text-slate-700">
          This element is visible on screen.
          <span class="no-print text-slate-400"> (hidden when printing with no-print)</span>
        </p>
        <p class="text-body2 text-slate-500 mt-2">
          The <code class="font-mono bg-slate-200 px-1 rounded">print:</code> variant wraps CSS in <code class="font-mono bg-slate-200 px-1 rounded">@media print</code>.
          Use <code class="font-mono bg-slate-200 px-1 rounded">motion-reduce:</code> to respect user reduced-motion preferences.
        </p>
      </div>
    </section>

    <!-- ── SECTION 19: SCROLL & SNAP ── -->
    <section class="section">
      <h2 class="section-title">19. Scroll & Snap</h2>
      <p class="section-desc">New: scroll-smooth, scroll-m-*, scroll-p-*, snap-x, snap-start/end/center</p>

      <div class="snap-x overflow-x-auto row gap-4" style="scroll-snap-type: x mandatory; padding-bottom: 1rem;">
        <div class="snap-start bg-red-400 text-white pa-8 rounded-xl" style="min-width:200px;scroll-snap-align:start">Snap 1</div>
        <div class="snap-start bg-orange-400 text-white pa-8 rounded-xl" style="min-width:200px;scroll-snap-align:start">Snap 2</div>
        <div class="snap-start bg-yellow-400 pa-8 rounded-xl" style="min-width:200px;scroll-snap-align:start">Snap 3</div>
        <div class="snap-start bg-green-400 text-white pa-8 rounded-xl" style="min-width:200px;scroll-snap-align:start">Snap 4</div>
        <div class="snap-start bg-blue-400 text-white pa-8 rounded-xl" style="min-width:200px;scroll-snap-align:start">Snap 5</div>
      </div>
    </section>

    <!-- ── SECTION 20: MISC ── -->
    <section class="section">
      <h2 class="section-title">20. Misc: Will-change, Isolation, Blend, Aspect</h2>

      <div class="row gap-4 flex-wrap mb-4">
        <div class="aspect-square bg-indigo-200 rounded-lg" style="width:80px">aspect-square</div>
        <div class="aspect-video bg-purple-200 rounded-lg pa-4" style="width:160px">aspect-video</div>
        <div class="isolate pa-4 bg-green-100 rounded-lg">isolate</div>
        <div class="will-change-transform pa-4 bg-blue-100 rounded-lg hover:scale-105 transition">will-change-transform</div>
      </div>

      <div class="row gap-4 flex-wrap">
        <div class="mix-blend-multiply pa-4 bg-red-300 rounded">mix-blend-multiply</div>
        <div class="mix-blend-screen pa-4 bg-blue-300 rounded">mix-blend-screen</div>
        <div class="mix-blend-overlay pa-4 bg-purple-300 rounded">mix-blend-overlay</div>
      </div>
    </section>

  </main>

  <!-- ── FOOTER ── -->
  <footer class="pa-8 bg-slate-900 text-slate-400 text-center mt-8">
    <p class="text-body2">Zee CSS — TypeScript utility framework</p>
    <p class="text-caption mt-2">All styles above generated by zee-css from class names scanned in this file</p>
  </footer>

</div>
`
