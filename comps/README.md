# Page 12 — A/B comps

Design explorations only. **Nothing here is in the build.** `build.mjs` reads
`src-fg/pages/p*.html`; this directory is outside it, so these files cannot
reach the book by accident.

- `p12-B-wide.html` — Version B, the wide creator-image alternative
- `p12-A.png`, `p12-B.png`, `p12-AB.png` — renders at equal scale

Version A is the live approved sheet, `src-fg/pages/p12.html`, unchanged.

To re-render B:

    node -e "const fs=require('fs');fs.writeFileSync('dist/_b.html',
      fs.readFileSync('src-fg/head.html','utf8')
      +fs.readFileSync('comps/p12-B-wide.html','utf8')
      +fs.readFileSync('src-fg/tail.html','utf8'))"

then screenshot `dist/_b.html` and delete it.

**If B is chosen**, its image needs re-supplying. `assets/fg-m12-1b-wide.jpg`
is cut from the 2000px chat original, which gives 1344px against a 2150px
print floor for a 672-wide plate. Fine for a comp, short for print — the same
gap the cover had before `final cover.jpg` came through Drive.
