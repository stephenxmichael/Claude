# Kim LaShawn: Your First 30 Days of Content

Shooting Stars Content Strategy, student edition. A 19-page PDF guide
(1080x1350 portrait, readable on a phone) plus an interactive web version.

    web/guide.html                     the interactive page; also holds the plan data
    kim-lashawn-first-30-days.html     the deck; edit by hand outside the GEN markers
    scripts/build_deck.py              fills the deck's GEN regions from web/guide.html
    Kim-LaShawn-First-30-Days-of-Content.pdf
    design/Main.dc.html                earlier Design canvas source of the page
    design/*.jpg                       Kim's photos and profile screenshots, as supplied
    photos/                            the same, pre-cropped to the PDF's frames
    fonts/                             Archivo, Allura, Inter and JetBrains Mono, vendored
    logo-white.png, logo-deep.png      Shooting Stars wordmark

## Design system

The Shooting Stars frame (spine, header bar, display folio) on burgundy
(#5A1A2B) and bone pages. One idea per page, wide margins, nothing under
15px. Archivo
Expanded Black for display, Allura for the script accent, Inter for reading,
JetBrains Mono for labels. Accents are rose on light pages and blush on
burgundy; no gold. Each pillar has one colour (Becoming, Lifestyle, Style,
Safety), used for calendar events and post cards. Core posts are solid;
optional posts are dashed.

The four weeks and the sixteen Rediscovering Her episodes live once, in the
`weeks` and `episodes` arrays in `web/guide.html`. `build_deck.py` reads them
and writes the series tie-ins (p.7), the month calendar (p.9) and the four
week pages (pp.10-13), so the PDF, the calendar and the web page always
match. Run it after any change to the plan.

## Build

From the repo root after `npm install`:

    python3 clients/kim-lashawn/scripts/build_deck.py   # refill the deck's generated pages
    node clients/kim-lashawn/scripts/render.mjs         # screenshots to build/ + overflow checks
    node clients/kim-lashawn/scripts/render.mjs --pdf   # also writes the PDF
    node clients/kim-lashawn/scripts/sheet.mjs 1 12     # contact sheet of pages 1-12
    node clients/kim-lashawn/scripts/crop-photos.mjs    # re-crop photos/ from design/
    clients/kim-lashawn/scripts/vendor-fonts.sh         # refresh fonts
    python3 clients/kim-lashawn/scripts/web_guide.py    # build/guide.html: the interactive page as one ordinary web page

Photos are pre-cropped to the exact frame sizes so the PDF draws them 1:1;
cropping with object-fit leaves edge strips that iOS paints over the image.
