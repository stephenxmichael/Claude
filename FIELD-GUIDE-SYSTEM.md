# Shooting Stars Field Guides — locked design system

**Field Guide 001 · Your iPhone Is A Cinema Camera**
Status: design locked. Copy and media are not.

    node build.mjs fg          -> dist/field-guide-001.html
    node scripts/pdf.mjs fg    -> dist/Field-Guide-001.pdf
    node scripts/shoot.mjs fg  -> build/screens-fg/

| Sheet | |
|---|---|
| `p00` | System specification. Internal; not one of the eleven. |
| `p01` | **The locked cover.** |
| `p02` | **Stop Treating It Like A Phone** — the premise. Provisionally locked. |
| `p07` | **Shoot With Intention** — the reference interior. |

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
- **`.qr`** — used only where video adds real instruction, never to fill space.
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
| 02 | The Premise — stop treating it like a phone | **Built, provisionally locked.** Ink statement band as the hero moment, paired columns throughout, cobalt closing strip. |
| 03 | iPhone Over Camera | **Built.** Cobalt-forward with a full-width ink case-study band. 80/20 carried by typographic scale, not a chart. The **real handwritten note** (M03.4) sits small and tilted as an artifact, not a hero. Deliberately the sparsest sheet so far. |
| 04 | Set It Up Once | **Built.** Paper dominant. A full-width cobalt reference card is the hero; two true phone-aspect screenshots and a QR walkthrough below it. |
| 05 | Two Apps, One Camera | **Built.** The only vertical split in the book: paper against ink, straight down the page, under a cobalt register rule. Closes on a cobalt strip. |
| 06 | Build The Image | **Built.** Ink ground. Three frames bleed off the right edge with their labels in the left margin, linked by a progression spine. The only page that breaks the margin. |
| 07 | Shoot With Intention | Image hierarchy: WIDE largest, MEDIUM and CLOSE stepping down, DETAIL / MOVEMENT / REVEAL supporting. **Reference built.** |
| 08 | Light + Sound | **Built.** Light runs the paper column, sound runs a full-height ink rail. The headline splits across the two tracks, so the page states its own hierarchy. |
| 09 | Build The Rig | **Built.** The flat lay anchors the page to its bottom edge, bleeding on three sides, and carries the numbered shoot map. Kit list sits above it. |
| 10 | The Workflow | **Built.** Cobalt ground. Six ink nodes in a serpentine with a drawn return elbow. The only drawn diagram in the book. |
| 11 | Field Cheat Sheet | **Built.** Cobalt masthead band, then a 3 × 2 block grid. One cell is a cobalt settings panel, calling back to sheet 04. Closes on ink. |

## Rules that hold across every sheet

1. Photography frames the argument; the design frames the photography. Do not
   overdesign to compensate for missing imagery.
2. Whitespace is intentional. Never expand copy to fill it.
3. Placeholders stay labelled with asset IDs. They are the production blueprint.
4. Technical language lives in the margins — camera language, not a camera
   manual.
5. No new fonts, no new accent colours, no decorative graphics, no stickers or
   emoji. Playfulness comes from composition, scale, real artifacts and rhythm.
6. Copy is working copy. Do not invent technical facts; use
   `[TECHNICAL COPY TO VERIFY]`.

## Composition register — no sheet repeats another

| Sheet | Ground | Arrangement |
|---|---|---|
| 01 | photo / cobalt | image top, title field below |
| 02 | paper | paired columns, ink statement band inset, cobalt closing strip |
| 03 | cobalt | upper field, full-width ink band from 63% down |
| 04 | paper | full-width cobalt card hero, tall screenshots |
| 05 | paper \| ink | vertical split down the page |
| 06 | ink | full-bleed-right strips, labels in the left margin |
| 07 | paper | 2 × 3 frame grid |
| 08 | paper + ink | main column plus full-height right rail |
| 09 | paper | bottom-anchored full-bleed hero |
| 10 | cobalt | drawn serpentine diagram |
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
