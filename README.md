# Shooting Stars — Content Framework (ebook)

The 47-page ebook as a single self-contained HTML design system, built from
the v3 design language.

## Layout

    src/head.html          design tokens + all shared CSS (the design system)
    src/pages/pNN.html     one file per page, in book order
    src/tail.html          closing tags
    assets/                logos (trimmed), vendored fonts, photography
    build.mjs              assembles src/ -> dist/shooting-stars-ebook.html
    scripts/shoot.mjs      screenshots every page for review
    scripts/audit.mjs      flags layout errors before they reach a screenshot
    scripts/sheet.py       tiles screenshots into a contact sheet
    scripts/pdf.mjs        exports dist/Shooting-Stars-Content-Framework.pdf
    scripts/vendor-fonts.sh    refreshes assets/fonts/ from Google Fonts
    scripts/derive-assets.py   pre-scales the S mark for the 17px HUD

## Build

    npm install
    node build.mjs                 # -> dist/ (self-contained: html + assets)
    node scripts/shoot.mjs         # -> build/screens/pNN.png
    node scripts/shoot.mjs 13 24   # just a range
    node scripts/audit.mjs         # layout errors, whole book
    python3 scripts/sheet.py 13 22 # contact sheet for a chapter
    node scripts/pdf.mjs           # -> dist/*.pdf  (47 pages, 800x1120)

`dist/` is self-contained: the book plus the assets it references. The PDF is
not committed (it rebuilds in one command and would otherwise churn ~20MB a
time); everything else in `dist/` is.

## Design system

Page is 800x1120. Side margins 74px, HUD 56px tall, 34px spine.

Every page carries: cobalt spine with rotated label, STARS progress ticks,
HUD bar, ghost folio, 56px grid. Dark pages also get grain and radial glows.

STARS ticks light by stage: Story = 1, Technique = 2, Angles = 3,
Refinement = 4, Scale = 5. Chapter 1, its intro pages, and the closing CTA
sit outside the stages and light nothing.

Page weight alternates so the book has pacing. Never more than 2 light pages
in a row in the new material, with full-bleed cobalt statements at p22 and
p38 breaking the longer runs, and the closing masterclass CTA (now p47)
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

### Photography — blocked in this environment

Six plates are marked with their Canva source page and target filename:

| Page | Asset | Canva source |
|------|-------|--------------|
| p02 | `assets/photo-author.jpg`  | page 2, right-hand portrait |
| p21 | `assets/photo-bokeh.jpg`   | page 22, f/2.8 shot |
| p26 | `assets/photo-natural.jpg` | page 25, natural light setup |
| p30 | `assets/photo-desk.jpg`    | page 33, the desk hub |
| p34 | `assets/photo-wide.jpg`    | Stephen's "drop your wide shot here" |
| p41 | `assets/photo-aroll-*.jpg` | pages 40-41, four a-roll / B-roll plates |

The Canva export API returns the images, but this session's egress policy
blocks `export-download.canva.com`, so they could not be fetched. Drop the
files into `assets/` and swap each `.photoslot` div for an `<img>`.

p02 also needs its `background-image` div restored (crop 920x1300 at
-520px -30px); it was pointing at a Canva presigned URL that had expired.

### Copy decisions, flagged not filled

- **p34** — Canva page 30 carries a note to self, "make a new pg here and put
  in photo", and a stray "Chapter n.4 / How to start an online business"
  heading with lorem ipsum that reads as leftover template content.
- **p39** — the original repeats the Chapter 4 Dorothea Lange quote on the
  Chapter 5 divider. It is set once, on Chapter 4, and left open here.
- **p47** — masterclass body copy is still lorem ipsum, and the URL is
  Canva's `reallygreatsite.com` default.

### The Scale chapter (p42-p46)

Stage 5 didn't exist in the source book. It was drafted with Stephen
directly: definitions, the Adobe/brand-partnership proof, and the posting
philosophy are his own words, tightened rather than invented. Structure is
deliberately lean, 4 sections instead of the 7-8 a first pass produced,
because the chapter is written to function as a cliffhanger into the funnel
(mini course, full course, Shooting Stars Content Academy) rather than a
complete tactical playbook. The closing CTA that used to be p42 is now p47.

### Two typos corrected

In the aperture advice now on p22: "aperature" -> "aperture", and "f.4.5-6"
-> "f/4.5 - f/6". Everything else is Stephen's copy verbatim.

## Getting it into Canva

Import `dist/Shooting-Stars-Content-Framework.pdf` from Canva directly:
**Create a design → Import file**, or drag the PDF onto the Canva homepage.

This cannot be done from here. The Canva MCP import tool only accepts a
public HTTPS URL to content that is already public, and publishing the book
to a file host to manufacture one would put a paid product on the open
internet. The PDF is 47 pages at 800x1120 with live text and embedded fonts,
so it maps one-for-one onto the original design.
