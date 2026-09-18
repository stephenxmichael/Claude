# Field Guide 001 — Pass 02.5: locking the design language

Direction A, evolved. Three pages: two cover compositions and the Shoot With
Intention interior.

Build: `node build.mjs fieldA` → `dist/field-guide-system.html`
Pass 02's three directions remain in `src-field/` for comparison.

---

## The handwritten face: Caveat 600

Eight candidates were rendered in situ — on cobalt, at cover scale, with
"Your iPhone is a" sitting directly above Anton's CINEMA CAMERA — rather than
judged from specimens. Contact sheet: `docs/typetest-handwriting.png`.

| Candidate | Verdict |
|---|---|
| **Caveat 600** | **Selected.** Confident pen, compact, legible at 58px and at 23px. |
| Bad Script | The prettier face. Rejected — see below. |
| Kalam | Legible but neutral; reads informal-blog rather than editorial. |
| Nothing You Could Do | Wide tracking competes with the block line for width. |
| Just Another Hand | Fails legibility at annotation size. |
| Neucha | Too close to an irregular sans; no personality to earn its place. |
| Shadows Into Light Two | Delicate and wide — not a confident pen stroke. |
| Architects Daughter | Rounded and wide; nearest the childish exclusion. |

**Bad Script is the more beautiful face, and it lost on a constraint rather
than on taste.** §07 says Stephen's real handwritten *iPhone Over Camera* note
may appear in the guide, and the type has to survive sitting next to it. Bad
Script reads as lettering — elegant, evenly slanted, faintly connected. Beside
real handwriting it would look like a font pretending. Caveat reads as a
person. That is the whole job.

**The one reservation, stated plainly:** Caveat is widely used. It is the right
*shape*, and it is free and already vendored, so the system can be locked and
built on it now. If the guide later wants a face nobody else has, the brief to
a foundry or letterer is: 600-weight fine-liner, slight forward slant, open
counters, minimal connection between letters, x-height close to Archivo's, and
legible at 20px. Swapping it is a one-line change in `assets/fonts/fonts.css`
and `.script` — nothing else in the system depends on it.

Vendored via `scripts/vendor-fonts.sh` alongside the existing three faces. It
is the only new typography introduced.

## How the two voices are used

    .script   Caveat 600    Stephen's thought, the aside, the annotation
    .hd       Anton         the lesson, the definitive headline

Applied **selectively, not as a formula** (§06). A1 and A2 use the pairing at
full strength on the title. A3 uses one script line in the header and nothing
else — the frames carry the page. Never body copy, captions, specs, metadata,
folios or QR text.

---

## A1 — cobalt-dominant cover, evolved

The Pass 02 cover set the title as three equal Anton lines. Now it is one
handwritten line over a single 106px block line running the full measure —
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
is gone, per §13 — repeated eleven times it would have become the template the
brief warns against.

Here cobalt is a rule, the frame numerals, the plate tabs and the handwritten
line. Nothing else. Black arrives only through the frames themselves.

The grid changed from three columns of six small frames to **two columns of
six large ones**, at a true 16:9 328 × 184 — roughly 2.4× the frame area of
Pass 02. Technical borrows from Direction C are limited to frame IDs, `FRAME
01`, and the `W / M / C / D / MOV / REV` index.

---

## What this answers

| | |
|---|---|
| Handwriting belongs? | Yes on covers, sparingly inside. A3 shows one line is enough. |
| Premium enough? | Yes in shape. Ubiquity is the open question, and the swap is cheap. |
| Different from the Framework? | Cobalt-primary, inverted spine, two type voices, 16:9 frame grid. |
| Still Shooting Stars? | Same palette values, same three core faces, same page and spine. |
| Human without casual? | One script line per page at most, always against block type. |
| Photography as hero? | A2 gives it 58% of the cover; A3 gives frames 2.4× the area. |
| Flexes across page types? | A1, A2 and A3 share a language and no layout. |
| Repeatable for 002, 003? | Yes — the language is colour roles and type voices, not a grid. |

## Still open

Copy is working copy (§17). No technical claims were added. The other eight
pages, IPHONE OVER CAMERA, and the revised media checklist wait on this being
locked.
