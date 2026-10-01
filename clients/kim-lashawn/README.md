# Kim LaShawn: Your First 30 Days of Content

A 17-page client strategy deck (1080x1350, portrait so it reads on a phone).

    kim-lashawn-first-30-days.html     the whole deck: tokens, styles, pages
    Kim-LaShawn-First-30-Days-of-Content.pdf
    fonts/                             Cormorant Garamond + Jost, vendored
    logo-plum.png                      Shooting Stars wordmark, tinted plum

Rebuild from the repo root after `npm install`:

    node clients/kim-lashawn/scripts/render.mjs         # screenshots to build/ + overflow check
    node clients/kim-lashawn/scripts/render.mjs --pdf   # also writes the PDF
    clients/kim-lashawn/scripts/vendor-fonts.sh         # refresh fonts
    node clients/kim-lashawn/scripts/tint-logo.mjs      # regenerate logo-plum.png
    python3 clients/kim-lashawn/scripts/web.py          # build/artifact.html, the shareable web version
