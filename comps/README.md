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
