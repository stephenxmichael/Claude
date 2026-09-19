# Field Guide 001 — Pass 02.5: locking the design language

Direction A, evolved. Three pages: two cover compositions and the Shoot With
Intention interior.

Build: `node build.mjs fieldA` → `dist/field-guide-system.html`
Pass 02's three directions remain in `src-field/` for comparison.

---

## Typography: all bold, no script

The pages are set entirely in the existing Shooting Stars kit. **No handwritten
or cursive face is in use.**

    Archivo 800   uppercase, letterspaced   the kicker line
    Anton         the headline
    Archivo       body and module titles
    JetBrains Mono  technical metadata

On the covers, "Your iPhone is a" is an Archivo 800 uppercase kicker above
Anton at 106px. Archivo rather than a second Anton size: two sizes of the same
condensed face stacked reads monotonous, and Archivo is already in the kit, so
this introduces nothing new. On A3 the same relationship runs smaller —
Archivo 800 eyebrow over Anton at 52px.

Swapping the kicker to Anton is a one-line change per page if the block-on-block
look is preferred.

### The handwriting layer is parked, not abandoned

Two directions were tested and neither is in the document:

**Round 1 — editorial handwriting.** Eight candidates rendered in situ on
cobalt against Anton (`docs/typetest-handwriting.png`). Caveat 600 was selected
over Bad Script, Kalam, Nothing You Could Do, Just Another Hand, Neucha,
Shadows Into Light Two and Architects Daughter, on the grounds that Stephen's
real handwritten *iPhone Over Camera* note may appear in the guide and the face
has to sit beside it without reading as lettering.

**Round 2 — elegant script.** A reference was supplied pointing at high-contrast
"old money" scripts (Sloop, Symphony, Burgues, Safira March), which is a
different register from Round 1 and rules most of it out. Twelve candidates were
fetched and rendered at both cover and annotation scale
(`docs/typetest-script-legibility.png`), then the five strongest were rendered
as the hero word with a bold kicker above, one line and two lines stacked
(`docs/typetest-hero-cursive.png`). Inverting the hierarchy — bold kicker over
cursive hero — was clearly stronger than script-over-block, and Anton read
better than Archivo as the kicker.

None of the cursives were right. Rather than force one, the layer is parked and
will be resolved separately.

What that leaves in place: `Caveat` stays vendored and the `.script` rule stays
defined in `src-field-a/head.html`, commented as parked, so the layer can be
switched back on in one place. Nothing currently references it. The three type
tests are kept in `docs/` as the decision record.

---

## A1 — cobalt-dominant cover, evolved

The Pass 02 cover set the title as three equal Anton lines. Now it is one
kicker line over a single 106px block line running the full measure —
horizontal rather than stacked, which also moves it away from the Content
Framework's three-line cover stack.

Photography gets the confidence borrowed from Direction B: the plate runs off
the right edge instead of sitting inside a rectangle. Cobalt still dominates.

*106px is measured, not estimated.* "CINEMA CAMERA" is 671px at 108px, against
a 672px measure — the first attempt at 119px silently wrapped to two lines.

## A2 — photography top, cobalt field bottom

58% photograph, 42% cobalt. The image is full bleed to three edges and the
title system sits in the cobalt below it. Closer to a camera campaign than to
an ebook cover, and the composition that will gain the most when a real
photograph replaces the plate.

## A3 — Shoot With Intention, evolved

The Pass 02 version ran cobalt band / white body / black footer. That structure
is gone: repeated eleven times it would have become the template the brief
warns against.

Here cobalt is a rule, the frame numerals, the plate tabs and the eyebrow.
Nothing else. Black arrives only through the frames themselves.

The grid changed from three columns of six small frames to **two columns of six
large ones**, at a true 16:9 328 × 184 — roughly 2.4× the frame area of Pass
02. Technical borrows from Direction C are limited to frame IDs, `FRAME 01`,
and the `W / M / C / D / MOV / REV` index.

---

## Shoot zones

Cover plates carry marked regions rather than only reserving space: a dashed
subject zone, a crosshair for the phone, a dotted keep-clear region for the
title's negative space, and a black caption module with crop and direction. The
prototype is meant to brief the photograph, not just leave room for it.

## What this answers

| | |
|---|---|
| Different from the Framework? | Cobalt-primary, inverted spine, 16:9 frame grid, kicker-over-block titling. |
| Still Shooting Stars? | Same palette values, same kit, same page and spine. |
| Photography as hero? | A2 gives it 58% of the cover; A3 gives frames 2.4× the area. |
| Flexes across page types? | A1, A2 and A3 share a language and no layout. |
| Repeatable for 002, 003? | Yes — the language is colour roles and type scale, not a grid. |

## Still open

The handwriting layer, to be resolved outside this repo. Copy is working copy;
no technical claims were added. The other eight pages, IPHONE OVER CAMERA, and
the revised media checklist wait on this being locked.
