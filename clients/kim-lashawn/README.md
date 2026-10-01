# Kim LaShawn: Your First 30 Days of Content

Shooting Stars Content Strategy, student edition. A 22-page PDF guide
(1080x1350 portrait, readable on a phone) plus an interactive web version.

    scripts/build_deck.py              the deck's copy, plan data and styles; writes the HTML
    kim-lashawn-first-30-days.html     generated deck (do not edit by hand)
    Kim-LaShawn-First-30-Days-of-Content.pdf
    design/Main.dc.html                the interactive page (Design canvas source)
    design/*.jpg                       Kim's photos and profile screenshots, as supplied
    photos/                            the same, pre-cropped to the PDF's frames
    fonts/                             Instrument Serif and Inter, vendored
    logo-deep.png                      Shooting Stars wordmark, tinted to the deck's deep colour

## Design system

Light editorial: ivory ground, blush and sand panels, one deep mulberry for
headings and emphasis. Two families only: Instrument Serif for headlines,
Inter for everything a reader has to read. Each pillar has one colour
(Becoming, Lifestyle, Style, Safety), used for calendar events and post cards.
Core posts are solid; optional posts are dashed and labelled "Optional".

The four weeks live once, in `WEEKS` in `scripts/build_deck.py`. The month
calendar (p.11) and the four week pages (pp.12-15) are both generated from
it, so they always match. For the next student, swap the copy, photos and
`WEEKS`; the structure holds.

## Build

From the repo root after `npm install`:

    python3 clients/kim-lashawn/scripts/build_deck.py   # regenerate the deck HTML
    node clients/kim-lashawn/scripts/render.mjs         # screenshots to build/ + overflow check
    node clients/kim-lashawn/scripts/render.mjs --pdf   # also writes the PDF
    node clients/kim-lashawn/scripts/sheet.mjs 1 12     # contact sheet of pages 1-12
    node clients/kim-lashawn/scripts/crop-photos.mjs    # re-crop photos/ from design/
    clients/kim-lashawn/scripts/vendor-fonts.sh         # refresh fonts
    python3 clients/kim-lashawn/scripts/web.py          # build/artifact.html, single-file web copy

Photos are pre-cropped to the exact frame sizes so the PDF draws them 1:1;
cropping with object-fit leaves edge strips that iOS paints over the image.
