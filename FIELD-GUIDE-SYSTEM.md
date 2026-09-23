# Shooting Stars Field Guides — locked design system

**Field Guide 001 · Your iPhone Is A Cinema Camera**
Status: design locked. Copy and media are not.

    node build.mjs fg          -> dist/field-guide-001.html
    node scripts/pdf.mjs fg    -> dist/Field-Guide-001.pdf
    node scripts/shoot.mjs fg  -> build/screens-fg/

All fourteen sheets are built. `p01`–`p14` are the book in order; `spec.html`
holds the system specification sheet and is deliberately outside the build, so
every folio matches its PDF page. Filenames match page numbers throughout.

The exploration trees are untouched and still build: `src-field/` (Pass 02, the
three directions) and `src-field-a/` (Pass 02.5). `src-fg/` is production.

---

## What was approved

**Direction A — Cobalt Field Guide** as the identity, carrying **Direction B's**
confidence with photography and **Direction C's** technical micro-details. Not
three equal influences: A is the publication, B and C are inflections.

## Colour — the primary tell against the Content Framework

| Role | Token | Use |
|---|---|---|
| Primary identity | `--cobalt` `#2B5CE6` | title fields, rails, numerals, modules, chapter moments |
| Editorial air | `--paper` `#FAF9F6` | the default interior ground |
| Technical / cinematic | `--ink` `#08080C` | plates, footers, metadata, selective full pages |

The Framework is black/white dominant with a cobalt accent. This inverts it.

Cobalt does **not** need 40% of every page — it needs to be unmistakable across
the publication. Some sheets run heavily cobalt, some mostly paper, some mostly
black. Black must never become the primary identity again; that belongs to the
Framework.

The fastest structural tell: **the spine inverts.** Cobalt on light and dark
pages, ink on cobalt pages.

## Type — four faces, locked

    Anton            headline. Whole sentences, never split across voices.
    Archivo 800      module and card titles
    Archivo          body
    JetBrains Mono   eyebrows, metadata, frame IDs

No script or handwritten typeface. Real handwriting — the *iPhone Over Camera*
note — enters as a **photographed artifact in a plate**, not as a font. Caveat
remains vendored from the parked experiment but nothing in `src-fg/` references
it.

Measure headline sizes against the 672px measure rather than estimating; Anton
is wider than it looks and wraps silently.

## Components

All in `src-fg/head.html`, documented in place.

- **`.plate`** — the media placeholder and the production blueprint. Carries an
  asset ID (`M<sheet>.<n>`), media type, subject and crop. Variants: default
  (paper), `.on-dark`, `.on-cobalt`, `.sm`. Never AI imagery, never stock.
- **`.zone`** — shoot zones for cover plates: dashed subject region, `.mark`
  crosshair for the phone, `.keep` dotted region that must stay clear. The
  prototype briefs the photograph rather than only reserving room for it.
- **`.p-meta`** — the black shot-brief module pinned inside a plate.
- **`.qr`** — only where the destination gives the reader something the printed
  page cannot: teaching → watch the demonstration, gear → find the kit,
  reference → save the resource. Never decoration. A code without a supplied URL
  keeps the placeholder glyph and is marked "QR destination to be supplied".
- **`.eyebrow`, `.hd`, `.sub`, `.bd`, `.kick`, `.anno`, `.dl`, `.chip`**
- **`.band`** — full-bleed structural block; a surface, not content.
- **Geometry** — 64px margin, 52px HUD, 34px spine, 40px grid, 800 × 1120.

The grid is structure, not noise. Lighten or drop it wherever photography needs
the room.

---

## The cover (locked)

55% photograph, full bleed to three edges. 45% cobalt field carrying the claim
in Anton at 88px across three lines, under a mono eyebrow.

The title was given roughly 16% more scale than the approved draft (76 → 88px)
so it holds at thumbnail size, and the old bottom rule was folded into the
eyebrow row so the extra weight did not cost negative space. The field ends with
~90px of air below the subtitle. Do not fill it.

Do not return to the earlier composition where the title sat on top of a cobalt
page with the image inset beneath.

## The interior philosophy

`p07` is the reference, not a master template. What it demonstrates:

- paper ground, cobalt reduced to a rule, the numerals, the plate tabs and the
  eyebrow
- frames at true 16:9, two columns, given real size — they are the lesson
- black arriving only through the frames themselves
- technical marks (`FRAME 01`, `W / M / C / D / MOV / REV`, asset IDs) small and
  in the margins
- the QR closing the page

**Do not repeat this layout eleven times.** Do not repeat cobalt-header /
white-body / black-footer either. The subject picks the composition.

---

## Page rhythm — build guidance for the eleven

| Sheet | Page | Composition |
|---|---|---|
| 01 | Cover | Image-first, cobalt title field. **Locked.** |
| 02 | The Premise — stop treating it like a phone | **Locked.** Four moves and nothing else: credibility, an honest account of the gap, the thesis on ink, the reframe. The friction argument came off in the density pass — sheet 10 makes it at full length and the closing strip already lands it in a line. |
| 03 | The Foundation — get your iPhone right | **Copy locked.** Paper. The settings page: clean-lens opener, cobalt frame-rate card, the drawn `.spec` panel and lens guidance side by side, two doctrine lines closing on ink. |
| 04 | Take Control — native vs Blackmagic | **Copy locked.** The only vertical split in the book, paper against ink under a cobalt register rule. Closes on a cobalt strip. |
| 05 | Build The Image | **Copy locked.** Ink ground. Manual controls run as a strip above the Log → Corrected → Graded progression, whose frames bleed off the right edge. |
| 06 | Shoot With Intention | **Copy locked.** 2 × 3 grid of true 16:9 frames, one sequence, with the coverage doctrine closing on ink. |
| 07 | Light + Sound | **Copy locked.** Light runs the paper column, sound runs a full-height ink rail, and the headline splits across the two tracks. |
| 08 | Build The Rig | **Copy locked.** Three essentials above four add-when-useful items, then the flat lay anchored to the bottom edge. The split is the page: it is a philosophy of friction, not a shopping list. One kit link (M08.2) sits in the flat lay's top-right corner: a single code for the whole kit, never per-product links. |
| 09 | Workflow | **Copy locked.** Cobalt ground, nine ink nodes in a 3 × 3 serpentine with two drawn returns. Stephen's real process, first person, because it is his. |
| 10 | The Experiment — iPhone over camera | **Design approved.** Cobalt upper field, full-width ink case-study band, 80/20 carried by typographic scale. A final challenge and QR pass is still to come. |
| 11 | Field Cheat Sheet | **Copy locked.** Cobalt masthead, 3 × 2 block grid. Organised by use case rather than by a single capture setup, and it introduces nothing the book has not already taught. |

## Voice — where "I" belongs and where "you" does

**"I" is Stephen's experience, preference or workflow. "You" is instruction the
reader can act on.** Never swap one for the other mechanically: the first person
is what makes the guide worth reading, and the second person is what makes it
usable.

First person stays for what he shoots, what he prefers, what he has learned,
how he uses his own camera, and his practical defaults — "my default for most
talking heads is 4K/30" is his recommendation and reads as one. Second person
takes over the moment the copy is teaching: "get the image into a good place
before you build the look," not "I want the image in a good place."

The test is whether the page sounds like an experienced creator teaching you,
or an experienced creator talking about himself.

## Page density — the rule sheet 03 sets

A page fails when the reader cannot tell what to look at first. That happens
long before anything overlaps, so the box checker will not catch it. Measure
it instead:

    node scripts/density.mjs fg

**Sheet 03 is the reference: five content rows, gutters of 30–35px, about 270
words.** Every sheet should sit near that. Two numbers matter:

- **Gutters below ~25px** mean the rows have been squeezed to make content
  fit. The gutters are the design, not slack to spend — when a block overruns,
  cut the block, never the gap. A plate and its caption, a numeral and its
  label, or two parallel tracks will report a small gutter; those are single
  units and are fine.
- **Over ~330 words** means the page is explaining rather than teaching.

When a page is over, cut in this order, which is how sheet 03 was fixed:

1. **A block that says what another sheet already says.** This is almost
   always available and it improves both pages.
2. **Third and fourth lines of body copy.** A sub-headline names the idea and
   the image shows it; the body needs one concrete line, not a paragraph.
3. **Small plates.** A placeholder under about 90px tall teaches nothing and
   costs a whole row. Let the section go typographic instead.
4. **Supporting lines whose module has moved.** They read as orphans.

Never shrink type to fit, and never close a gutter to buy room.

## The settings panel

`.spec` draws the menu instead of placeholding a screenshot of it. It was built
for the Pass 01 guide and rebuilt here on Field Guide tokens: ink header, mono
values in cobalt, switches as `.tg` glyphs.

Use it only where the reader is being sent into a menu, and only once — it
reads as instruction, so a second one elsewhere would compete with sheet 03 and
invite drift between two lists of the same settings. It needs nothing shot,
which is why sheet 03 carries just two photographic assets.

## Rules that hold across every sheet

1. Photography frames the argument; the design frames the photography. Do not
   overdesign to compensate for missing imagery.
2. Whitespace is intentional. Never expand copy to fill it.
3. Placeholders stay labelled with asset IDs. They are the production blueprint.
4. Technical language lives in the margins — camera language, not a camera
   manual.
5. No new fonts, no new accent colours, no decorative graphics, no stickers or
   emoji. Playfulness comes from composition, scale, real artifacts and rhythm.
6. Copy is Stephen's doctrine, not generic instruction. Never turn his
   preferences into universal technical laws — "my practical defaults, not
   universal requirements" is the register. Where a detail is device or
   version specific, keep the teaching and flag it `[Technical detail to
   verify]` rather than inventing a specification.
7. The guide has to stay useful across several iPhone generations. Teach the
   lens by what it does (`2×+ · get closer`), never by a focal length a new
   model will change. Keep "Apple Log" as written rather than tracking each
   new Log version. Frame a setting Stephen turns off as his workflow
   preference, not as a fault in the feature.

## Composition register — no sheet repeats another

| Sheet | Ground | Arrangement |
|---|---|---|
| 01 | photo / cobalt | image top, title field below |
| 02 | paper | paired columns, ink statement band inset, cobalt closing strip |
| 03 | paper | full-width cobalt card hero, three-column module row, ink closing band |
| 04 | paper \| ink | vertical split down the page |
| 05 | ink | control strip, then full-bleed-right frames with labels in the left margin |
| 06 | paper | 2 × 3 frame grid |
| 07 | paper + ink | main column plus full-height right rail |
| 08 | paper | bottom-anchored full-bleed hero |
| 09 | cobalt | drawn serpentine diagram |
| 10 | cobalt | upper field, full-width ink band from 63% down |
| 11 | paper | masthead band, 3 × 2 block grid |

Cobalt leads on 01, 03, 04, 10 and 11 and carries structure on every other
sheet. Ink is used for statement, technical and closing zones and never
becomes the book's identity.

## Differentiation check

Run each finished sheet against the Content Framework. If it could drop into
that book unmodified, the composition needs reconsidering.

    Content Framework   comprehensive, structured, strategic, flagship
    Field Guide         focused, visual, technical, tactile, practical

Same company, same taste, same quality. Different product. Siblings, not twins.

## Repeatability — Field Guide 002, 003

The DNA that must survive a change of subject: cobalt identity, the field guide
number, technical micro-typography, media IDs, image-first teaching, modular
editorial composition, selective data language, premium restraint.

## Open

Copy for all eleven sheets, the media checklist for the final architecture, and
the real handwritten *iPhone Over Camera* artifact. Design is not.
