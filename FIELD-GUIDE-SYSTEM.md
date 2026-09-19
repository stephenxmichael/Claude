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
| `p02` | **Stop Treating It Like A Phone** — the premise. |
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
| 02 | The Premise — stop treating it like a phone | **Built.** Ink statement band as the hero moment, paired columns throughout, cobalt closing strip. |
| 03 | iPhone Over Camera | Cobalt-forward, more personal. Uses the **real handwritten note** as an artifact when supplied. |
| 04 | Foundation / Settings | Paper dominant. Clarity first — premium reference card, screenshots, concise settings modules. |
| 05 | Native vs Blackmagic | Structured split comparison. Let the screenshots teach. |
| 06 | Build The Image / Apple Log | Cinematic, may go black-dominant. The LOG → CORRECTED → GRADED progression carries the page. |
| 07 | Shoot With Intention | Image hierarchy: WIDE largest, MEDIUM and CLOSE stepping down, DETAIL / MOVEMENT / REVEAL supporting. **Reference built.** |
| 08 | Light + Sound | Visual comparison — flat vs intentional. Audio as a smaller supporting module. |
| 09 | Build The Rig | Premium product editorial. Large flat lay plus annotated details. Not an ecommerce catalogue. |
| 10 | Workflow | Diagrammatic. Graphic information design carries it. |
| 11 | Field Cheat Sheet | Utility first. Clean, readable, screenshot-friendly. Do not overdesign. |

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
