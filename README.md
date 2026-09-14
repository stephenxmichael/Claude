# Shooting Stars — Content Framework (ebook)

42-page branded ebook built as a single self-contained HTML design system.

## Layout

    src/head.html        design tokens + all shared CSS (the design system)
    src/pages/pNN.html   one file per page, in book order
    src/tail.html        closing tags
    assets/              logos (trimmed), vendored fonts, photography
    build.mjs            assembles src/ -> dist/shooting-stars-ebook.html
    scripts/shoot.mjs    screenshots every page so it can be reviewed
    scripts/vendor-fonts.sh  refreshes assets/fonts/ from Google Fonts

## Build

    npm install
    node build.mjs                 # -> dist/ (self-contained: html + assets)
    node scripts/shoot.mjs         # -> build/screens/pNN.png
    node scripts/shoot.mjs 13 24   # just a range

`dist/` is a self-contained folder — the book plus the assets it references.

## Design system

Page is 800x1120. Side margins 74px, HUD 56px tall, 34px spine.

Every page carries: cobalt spine with rotated label, STARS progress ticks,
HUD bar, ghost folio, 56px grid. Dark pages also get grain + radial glows.

Fonts are vendored into `assets/fonts/` rather than imported from Google at
render time. A headless browser with no network silently falls back to serif,
which breaks every Anton headline without failing loudly.

`scripts/shoot.mjs` exits non-zero if fonts fall back or an image 404s.
