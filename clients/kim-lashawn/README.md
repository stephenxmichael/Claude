# Kim LaShawn: Your First 30 Days of Content

Shooting Stars Content Strategy, student edition. A 20-page PDF guide
(1080x1350 portrait, readable on a phone) plus an interactive web version.

    kim-lashawn-first-30-days.html     the PDF deck: tokens, styles, all 20 pages
    Kim-LaShawn-First-30-Days-of-Content.pdf
    design/Main.dc.html                the interactive page (Design canvas source)
    design/*.jpg                       Kim's photos and profile screenshots, as supplied
    photos/                            the same, pre-cropped to the PDF's frames
    fonts/                             Archivo, Allura, Inter, JetBrains Mono, vendored
    logo-white.png                     Shooting Stars wordmark

## Design system

Shooting Stars ink/bone surfaces, spine, HUD, 60px grid and display folio.
Type: Archivo Expanded Black for headlines, Allura script for accent words,
Inter for reading text, JetBrains Mono for labels. Each student gets two
accent colours in `:root` (`--accent`, `--gold`); Kim's are garnet and gold.
For the next student, swap the accents, photos and copy; the structure holds.

## Build

From the repo root after `npm install`:

    node clients/kim-lashawn/scripts/render.mjs         # screenshots to build/ + overflow check
    node clients/kim-lashawn/scripts/render.mjs --pdf   # also writes the PDF
    node clients/kim-lashawn/scripts/sheet.mjs 1 12     # contact sheet of pages 1-12
    node clients/kim-lashawn/scripts/crop-photos.mjs    # re-crop photos/ from design/
    clients/kim-lashawn/scripts/vendor-fonts.sh         # refresh fonts
    python3 clients/kim-lashawn/scripts/web.py          # build/artifact.html, single-file web copy

Photos are pre-cropped to the exact frame sizes so the PDF draws them 1:1;
cropping with object-fit leaves edge strips that iOS paints over the image.
