# Page 12 — A/B comps

Design explorations only. **Nothing here is in the build.** `build.mjs` reads
`src-fg/pages/p*.html`; this directory is outside it, so these files cannot
reach the book by accident.

**B won and is now live** as `src-fg/pages/p12.html`.

- `p12-A-portrait.html` — **Version A**, the portrait-led sheet B replaced.
  Copy it over `src-fg/pages/p12.html` to switch back.
- `p12-B-wide.html` — Version B as shipped, kept in sync
- `p12-A.png`, `p12-B.png`, `p12-AB.png` — the renders that decided it

To re-render B:

    node -e "const fs=require('fs');fs.writeFileSync('dist/_b.html',
      fs.readFileSync('src-fg/head.html','utf8')
      +fs.readFileSync('comps/p12-B-wide.html','utf8')
      +fs.readFileSync('src-fg/tail.html','utf8'))"

then screenshot `dist/_b.html` and delete it.

**B's image still needs re-supplying for print.** `assets/fg-m12-1.jpg` is cut
from the 2000px chat original, giving 1344px against a 2150px print floor for a
672-wide plate. Fine on screen, soft in the hardback — the same gap the cover
had before `final cover.jpg` came through Drive.

---

# Page 03 — signed Polaroid comp

Exploration only, **not in the build**. `p03-polaroid.html` is sheet 03 with
M02.1 recut as a Polaroid: Polaroid 600 proportions (236 × 287 frame, 210
square window, deep bottom margin), tilted −2.4°, lifted off the page by its
shadow. It stays a `.plate`, so it keeps the M02.1 tab; the corner marks are
off because the white frame is the border now.

- `assets/fg-m02-1-polaroid.jpg` — 840 × 840 square cut from the 2000px chat
  original. 4× the window, so unlike the current landscape crop it is already
  print-sharp at this size.
- **The signature is M02.3 and is not supplied yet.** It has to be a scan of
  Stephen's real signature (black marker on white paper, shot flat); the
  paper gets knocked out to transparent and laid into the bottom margin.
  Handwriting never appears as a typeface in this book, so there is no
  stand-in: the comp shows a marked zone instead.

To go live, copy `p03-polaroid.html` over `src-fg/pages/p03.html` once the
signature is in.

To re-render:

    cat src-fg/head.html comps/p03-polaroid.html src-fg/tail.html > dist/_x.html

then screenshot `dist/_x.html` and delete it.
