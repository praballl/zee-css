import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="container">
  <header class="header">
    <h1 class="title">CSS Utility Library Test</h1>
    <p class="subtitle">Test your utility CSS classes here</p>
  </header>

  <main class="main">
    <section class="section">
      <h2 class="section-title">Spacing Utilities</h2>
      <div class="demo-box">
        <div class="test-box pa-4">Padding all 4 (16px)</div>
        <div class="test-box pa-8">Padding all 8 (32px)</div>
        <div class="test-box pt-4 pb-4">Padding top/bottom 4</div>
        <div class="test-box pl-4 pr-4">Padding left/right 4</div>
        <div class="test-box ma-4">Margin all 4</div>
        <div class="test-box mt-4 mb-4">Margin top/bottom 4</div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Combined Spacing</h2>
      <div class="demo-box">
        <div class="test-box pa-6 ma-4">Padding 6, Margin 4</div>
        <div class="test-box pt-8 pb-4 pl-2 pr-2">Complex padding</div>
        <div class="test-box mt-2 mb-6 ml-4 mr-4">Complex margin</div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Color Utilities</h2>
      <div class="demo-box">
        <div class="test-box text-primary pa-4">Primary text color</div>
        <div class="test-box bg-secondary pa-4">Secondary background</div>
        <div class="test-box border-accent pa-4">Accent border</div>
        <div class="test-box text-info bg-positive pa-4">Info text, positive background</div>
        <div class="test-box text-warning border-negative pa-4">Warning text, negative border</div>
        <div class="test-box border-primary pa-4">Primary border</div>
        <div class="test-box border-secondary pa-4">Secondary border</div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Gap Utilities</h2>
      <div class="demo-box">
        <div class="row gap-4 pa-4">
          <div class="test-box flex-1">Item 1</div>
          <div class="test-box flex-1">Item 2</div>
          <div class="test-box flex-1">Item 3</div>
        </div>
        <div class="row gap-8 pa-4">
          <div class="test-box flex-1">Gap 8</div>
          <div class="test-box flex-1">Gap 8</div>
        </div>
        <div class="column gap-4 pa-4">
          <div class="test-box">Column item 1</div>
          <div class="test-box">Column item 2</div>
          <div class="test-box">Column item 3</div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Advanced Spacing</h2>
      <div class="demo-box">
        <div class="test-box pa-xs">Extra small padding</div>
        <div class="test-box pa-sm">Small padding</div>
        <div class="test-box pa-md">Medium padding</div>
        <div class="test-box pa-lg">Large padding</div>
        <div class="test-box pa-xl">Extra large padding</div>
        <div class="test-box px-4 py-2">Horizontal 4, Vertical 2</div>
        <div class="test-box mx-auto">Centered with auto margin</div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Sizing Utilities</h2>
      <div class="demo-box">
        <div class="test-box w-full">Full width</div>
        <div class="test-box w-auto">Auto width</div>
        <div class="test-box h-16">Fixed height (16)</div>
        <div class="test-box min-w-32">Min width 32</div>
        <div class="test-box max-w-48">Max width 48</div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Typography Utilities</h2>
      <div class="demo-box">
        <div class="test-box fs-xs">Extra small text</div>
        <div class="test-box fs-sm">Small text</div>
        <div class="test-box fs-base">Base text</div>
        <div class="test-box fs-lg">Large text</div>
        <div class="test-box fs-xl">Extra large text</div>
        <div class="test-box fs-2xl">2XL text</div>
        <div class="test-box font-bold">Bold text</div>
        <div class="test-box leading-loose">Loose line height</div>
        <div class="test-box tracking-wide">Wide letter spacing</div>
        <div class="test-box uppercase">UPPERCASE TEXT</div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Effects Utilities</h2>
      <div class="demo-box">
        <div class="test-box opacity-50">50% opacity</div>
        <div class="test-box shadow-md">Medium shadow</div>
        <div class="test-box shadow-lg">Large shadow</div>
        <div class="test-box shadow-xl">Extra large shadow</div>
        <div class="test-box rounded-lg">Rounded large</div>
        <div class="test-box rounded-full">Rounded full</div>
        <div class="test-box cursor-pointer">Pointer cursor</div>
        <div class="test-box overflow-hidden">Hidden overflow</div>
      </div>
    </section>
  </main>
</div>
`
