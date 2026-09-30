# Sam & JT · Lake Como: content proposal deck

A click-through presentation for Sam & JT's wedding weekend (July 9 to 11, 2027),
from Curated by Kea. It opens with an animated Lake Como title sequence, then runs as
full-screen slides with cinematic wipes and a coverage chooser.

Nine slides:

Cover (a file folder with two polaroids of Sam & JT) · The weekend (what you receive) · Your content plan ·
Meet Kea · Meet Stephen · Choose your coverage (Option Two recommended) ·
Travel and logistics · Client love · Why us.

## Typeface

Set `typeface` in `content.js`:

| Option | Headlines | Italic accents | Text |
|---|---|---|---|
| `villa` (chosen) | Cinzel | Cormorant Garamond italic | Tenor Sans |
| `couture` | Rozha One | Playfair Display italic | Jost |
| `modern` | Syne | Instrument Serif italic | Manrope |
| `original` | Bodoni Moda | Bodoni Moda italic | Jost |

The others stay available. Setting `typePicker: true` shows an "Aa" button that switches
between them in your own browser. `pdf/type-options.jpg` shows three side by side.

## Files

    index.html                 page shell (no copy lives here)
    content.js                 ALL copy, slide order and media paths. Edit this one.
    assets/css/deck.css        design system and slide layouts
    assets/css/type.css        the typeface options
    assets/css/print.css       PDF / print layout: one slide per 16:9 page
    assets/js/deck.js          renders slides from content.js, navigation, motion, video
    assets/js/vendor/gsap.min.js   animation engine (GSAP 3.12.5), bundled locally
    assets/fonts/              all typeface options (SIL Open Font License), bundled locally
    media/README.md            every media slot, its ratio and target file size
    PLACEHOLDERS.md            everything still needed from Kea
    pdf/                       PDF fallback and the typeface comparison sheet
    tools/export-pdf.mjs       rebuilds the PDF
    tools/shoot.mjs            screenshots every slide at phone, laptop and desktop sizes
    tools/build-standalone.mjs builds pdf/Sam-and-JT-Lake-Como.html, one self-contained file

## Getting around the deck

- Arrows at the bottom, swipe left or right on a phone, or use the arrow keys, Page Up/Down, Space, Home and End.
- "Chapters" opens a menu to jump anywhere.
- Tall slides on a phone scroll up and down; swipe sideways to change slides.
- Each slide has its own link, like `…/#options`, so you can send someone straight to the pricing.
- Anyone with reduced motion turned on gets a still, complete deck with no autoplay.

## Editing

Open `content.js`. Every word on every slide is there, grouped by slide. Media is in the
`media` block at the top: set `src` (and `poster` for video) for each slot. Slide order
is `order`: remove an id to drop a slide or move it to reorder.

Copy rules for this proposal: short sentences, warm, no emojis, no em dashes. The venue
stays "the villa at Lake Como" until it's confirmed.

## Preview locally

The fonts need to be served over http (browsers block them from `file://`):

    cd proposals/sam-jt-lake-como
    python3 -m http.server 8765
    # open http://localhost:8765

## Export the PDF (fallback)

The HTML deck is the main piece. The PDF is kept in `pdf/` in case it's needed.

With the preview server running:

    npm install              # from the repo root, once (installs Playwright)
    node proposals/sam-jt-lake-como/tools/export-pdf.mjs

This writes `pdf/Sam-and-JT-Lake-Como-Proposal.pdf`: one landscape page per slide at 1600×900.
Both coverage options appear side by side. Every footer has Previous and Next links. Instagram links open in the browser. Video slots print their
poster image, so add posters before exporting.

## Deploy (Vercel or Netlify)

It's a static folder with no build step.

- **Vercel:** New Project, pick this repo, set **Root Directory** to `proposals/sam-jt-lake-como`, framework "Other", no build command. `vercel.json` adds no-index headers.
- **Netlify:** New site from Git, **Base directory** `proposals/sam-jt-lake-como`, no build command, publish directory `.`. `netlify.toml` does the same.
- **Drag and drop:** drop the `proposals/sam-jt-lake-como` folder on app.netlify.com/drop.

### Keeping it private

The deck tells search engines not to index it (meta tag, `robots.txt` and an
`X-Robots-Tag` header), so an unlisted link stays unlisted. For a real password:

- Vercel: Project Settings, Deployment Protection, Password Protection (Pro plan and up).
- Netlify: Site settings, Access control, Password protection (Pro plan and up).

A password typed into the page's own JavaScript would not protect anything, so the
deck doesn't fake one.
