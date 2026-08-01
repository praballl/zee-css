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
  </main>
</div>
`
