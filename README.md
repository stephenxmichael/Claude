# Shooting Stars — publications

Two products, one brand, built from the same v3 design language:

| Product | Pages | Source | Output |
|---|---|---|---|
| **Content Framework** (ebook) | 57 | `src/` | `dist/shooting-stars-ebook.html` |
| **The iPhone Creator Guide** (Pass 01) | 10 | `src-iphone/` | `dist/iphone-creator-guide.html` |
| **Field Guide 001 directions** (Pass 02) | 7 | `src-field/` | `dist/field-guide-directions.html` |
| **Field Guide 001 system** (Pass 02.5) | 3 | `src-field-a/` | `dist/field-guide-system.html` |

Every script takes an optional product key. Omit it and you get the Content
Framework, exactly as before; pass `iphone` for the guide.

## Layout

    src/head.html          Framework design system (tokens + shared CSS)
    src/pages/pNN.html     one file per page, in book order
    src-iphone/head.html   Guide design system — same palette, different furniture
    src-iphone/pages/      the ten guide pages
    assets/                logos (trimmed), vendored fonts, photography
    scripts/products.mjs   per-product paths and page geometry
    build.mjs              assembles a src tree -> dist/
    scripts/shoot.mjs      screenshots every page for review
    scripts/audit.mjs      flags layout errors before they reach a screenshot
    scripts/boxes.mjs      per-page box dump + collision check while laying out
    scripts/sheet.py       tiles screenshots into a contact sheet
    scripts/pdf.mjs        exports the print-ready PDF
    scripts/standalone.mjs single-file HTML with assets inlined
    scripts/preview.mjs    self-contained page for publishing as an Artifact
    scripts/vendor-fonts.sh    refreshes assets/fonts/ from Google Fonts
    scripts/derive-assets.py   pre-scales the S mark for the 17px HUD

## Build

    npm install
    node build.mjs                 # -> dist/ (self-contained: html + assets)
    node build.mjs iphone          # -> dist/iphone-creator-guide.html
    node scripts/shoot.mjs         # -> build/screens/pNN.png
    node scripts/shoot.mjs iphone  # -> build/screens-iphone/pNN.png
    node scripts/shoot.mjs 13 24   # just a range
    node scripts/audit.mjs iphone  # layout errors, whole book
    node scripts/boxes.mjs iphone 3  # every block on page 3, plus collisions
    python3 scripts/sheet.py 13 22 # contact sheet for a chapter
    node scripts/pdf.mjs iphone    # -> dist/*.pdf  (10 pages, 800x1120)
    node scripts/preview.mjs field # -> dist/field-preview.html (Artifact-ready)

## Known issue — `scripts/standalone.mjs` breaks the fonts

Its `url('assets/...')` rewrite also catches `@import url('assets/fonts/fonts.css')`
and inlines the stylesheet as `application/octet-stream`. The `@font-face` src
paths inside it then resolve against a `data:` URI and fail, so the single-file
HTML renders in fallback serif. This affects **both** products and predates the
guide. `shoot.mjs` and `pdf.mjs` both guard against serif fallback and refuse to
write; `standalone.mjs` has no such guard. The `dist/` folder build and the PDF
are unaffected — only the single-file HTML.

Fix would be to inline `fonts.css` as `text/css` with its woff2 files inlined
into it first, and add the same font guard the other two scripts use.

`dist/` is self-contained: the book plus the assets it references. The PDF is
not committed (it rebuilds in one command and would otherwise churn ~20MB a
time); everything else in `dist/` is.

## Design system — Content Framework

Page is 800x1120. Side margins 74px, HUD 56px tall, 34px spine.

Every page carries: cobalt spine with rotated label, STARS progress ticks,
HUD bar, ghost folio, 56px grid. Dark pages also get grain and radial glows.

STARS ticks light by stage: Story = 1, Technique = 2, Angles = 3,
Refinement = 4, Scale = 5. Chapter 1, its intro pages, and the closing CTA
sit outside the stages and light nothing.

Page weight alternates so the book has pacing. Never more than 2 light pages
in a row in the new material, with full-bleed cobalt statements at p22 and
p38 breaking the longer runs, and the closing masterclass CTA (now p50)
doing the same job at the very end.

Devices added to the v3 system while building pages 13-42:

- `.rail` — the five STARS stages as a horizontal strip, current stage lit.
  Replaces the flat "✦ Story ✦ Technical ✦ …" line that recurs in the source.
- `.photoslot` — a marked slot for photography that isn't in the repo yet.
- `.flag` — surfaces Stephen's own lorem ipsum and notes-to-self on the page
  rather than writing over them.

### Fonts

Fonts are vendored into `assets/fonts/` rather than imported from Google at
render time. Headless Chromium here cannot reach fonts.googleapis.com, so an
`@import` silently falls back to serif and every Anton headline measures
wrong without failing. `scripts/shoot.mjs` and `scripts/pdf.mjs` both compare
rendered width against the fallback serif and exit non-zero rather than ship
a book set in Times.

## Still needed

### Photography — four of six plates filled

Photos came from a Drive folder Stephen uploaded, matched against the
original Canva reference design (`DAHD3PZgJNc`) rather than guessed:

| Page | Asset | Matched to |
|------|-------|--------------|
| p02 | `assets/photo-author.jpg`  | Stephen's own pick, not the Canva page 2 pose |
| p21 |  `assets/photo-bokeh.png`   | closest available to the Canva aperture-demo page |
| p26 | `assets/photo-natural.jpg` | closest available to the Canva natural-light page |
| p30 | `assets/photo-desk.jpg`    | same shoot as the Canva desk-hub page |

Two plates are still open:

| Page | Asset | Status |
|------|-------|--------|
| p34 | `assets/photo-wide.jpg`    | no source ever existed, the Canva page itself is still the unfinished "make a new pg here and put in photo" placeholder |
| p41 | `assets/photo-aroll-*.jpg` | needs four: two A-roll talking-head, two B-roll (palm trees / pool). Nothing in the Drive folder pairs a B-roll half to go with it |

### Copy decisions, flagged not filled

- **p34** — Canva page 30 carries a note to self, "make a new pg here and put
  in photo", and a stray "Chapter n.4 / How to start an online business"
  heading with lorem ipsum that reads as leftover template content.
- **p39** — the original repeats the Chapter 4 Dorothea Lange quote on the
  Chapter 5 divider. It is set once, on Chapter 4, and left open here.
- **p50** — masterclass body copy is still lorem ipsum, and the URL is
  Canva's `reallygreatsite.com` default.

### The Scale chapter (p45-p49)

Stage 5 didn't exist in the source book. It was drafted with Stephen
directly: definitions, the Adobe/brand-partnership proof, and the posting
philosophy are his own words, tightened rather than invented. Structure is
deliberately lean, 4 sections instead of the 7-8 a first pass produced,
because the chapter is written to function as a cliffhanger into the funnel
(mini course, full course, Shooting Stars Content Academy) rather than a
complete tactical playbook. The closing CTA that used to be p42 is now p50.

### Two typos corrected

In the aperture advice now on p22: "aperature" -> "aperture", and "f.4.5-6"
-> "f/4.5 - f/6". Everything else is Stephen's copy verbatim.

## Getting it into Canva

Import `dist/Shooting-Stars-Content-Framework.pdf` from Canva directly:
**Create a design → Import file**, or drag the PDF onto the Canva homepage.

This cannot be done from here. The Canva MCP import tool only accepts a
public HTTPS URL to content that is already public, and publishing the book
to a file host to manufacture one would put a paid product on the open
internet. The PDF is 57 pages at 800x1120 with live text and embedded fonts,
so it maps one-for-one onto the original design.


---

# The iPhone Creator Guide

A 10-page field guide on getting professional video out of an iPhone. Sister
product to the Content Framework, not a condensation of it: the Framework
teaches the system around being a creator, the guide teaches technical
execution on one device.

## What makes it read as Shooting Stars

Same palette, same vendored Anton / Archivo / JetBrains Mono, same 800x1120
page, same 34px cobalt spine with a rotated label, same HUD bar, grain, glows
and hatched media slots.

## What makes it read as a different publication

| | Framework | Guide |
|---|---|---|
| Side margin | 74px | 64px |
| HUD | 56px, chapter name | 52px, camera telemetry (`4K · 30 FPS · H.265`) |
| Grid | 56px | 40px |
| Progress | five S.T.A.R.S. ticks | ten-frame counter |
| Display type | Anton to 150px | Anton capped at 74px |
| Module headings | Anton | Archivo Black |
| Light page | `--bone` #F2F1ED | `--paper` #FAF9F6 |
| Folio | ghost Anton numeral | mono frame counter `03 / 10` |
| Signature device | S.T.A.R.S. rail | viewfinder corner brackets |

Guide-only devices in `src-iphone/head.html`: `.frames` (frame counter), `.vf`
(viewfinder brackets), `.slot` (shot-list media placeholder), `.spec` + `.tg`
(iOS-settings rows and toggles), `.mod`, `.anno`, `.qr`, `.band`, `.ck`.

## Media

Nothing is final photography. Every placeholder is a `.slot` carrying an asset
ID, media type, subject and crop, so the prototype doubles as a production shot
list. **25 assets outstanding** — see `MEDIA-CHECKLIST.md`, which is organised by
page and keyed to the IDs printed on the slots.

The one graphic that is already built is the light-position plan diagram on
p07, drawn as inline SVG.

## Copy status

First-pass working copy throughout, written to be rewritten. Structure, page
architecture and visual weight are the things to review; language is not final.


---

# Shooting Stars Field Guides (Pass 02, in progress)

`src-field/` holds three visual identity directions for **Field Guide 001 —
Your iPhone Is A Cinema Camera**, the sub-family that supersedes the Pass 01
iPhone Creator Guide. Six pages: each direction as a cover plus the Shoot With
Intention interior. See `PASS-02-DIRECTIONS.md`.

The colour hierarchy is the revision that matters. Same palette values as every
other Shooting Stars publication, different roles:

| | Content Framework | Field Guides |
|---|---|---|
| Primary | black / white | cobalt |
| Secondary | cobalt accent | black, technical modules |
| Ground | bone | white, editorial air |
| Spine | cobalt on dark, ink on light | cobalt on light, ink on cobalt |

`src-iphone/` is kept as-is so Pass 01 can still be built and compared.

## Pass 02.5 — the locked language

Direction A was selected and evolved in `src-field-a/`: two cover compositions
and the Shoot With Intention interior. See `PASS-025-SYSTEM.md`.

**Typography is all bold — no script or handwritten face is in use.** Covers
run an Archivo 800 uppercase kicker over Anton at 106px; A3 runs the same
relationship smaller.

Two handwriting directions were tested and neither shipped: editorial
handwriting (eight candidates, `docs/typetest-handwriting.png`) and elegant
"old money" script (twelve candidates at two scales,
`docs/typetest-script-legibility.png`, with the five strongest rendered as the
hero word in `docs/typetest-hero-cursive.png`). The layer is parked rather than
forced: Caveat stays vendored and `.script` stays defined but unreferenced, so
it can be switched back on in one place once the handwriting is resolved.
