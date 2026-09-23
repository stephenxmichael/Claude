# Field Guide 001 — Media Asset Checklist

Every labelled placeholder in the twelve sheets, organised by page. Each entry
carries the asset ID printed on the plate, so the built PDF doubles as the shot
list: find the ID on the page, shoot the thing, drop it in.

**Nothing here is AI-generated, stock, or a mock screenshot.** Every asset is
real work, real gear, or a real capture from your own device.

Dimensions are the plate size at the page's 800 × 1120 geometry. Shoot larger
and crop down — never upscale to fit.

Assets land in `assets/` as `fg-m<sheet>-<n>.jpg`, pre-cropped to the plate's
exact ratio. **Store at 3.2× the plate or better** — the book prints, and at
300dpi on an A4/Letter sheet the 800 × 1120 layout scales by ~3.2. Where the
source allows it, 4× is cleaner because it is an exact multiple of the plate.
Originals now come through **Google Drive, not chat**: chat caps uploads at
2000px on the long edge and strips EXIF, which is enough for screen but short
of print on the larger plates.

**Keep Drive files under ~3.5MB.** The connector documents a 10MB download cap
but the real transport ceiling is far lower — 3.27MB pulls cleanly, 7.59MB kills
the session every time, and 21MB is refused outright. This is not a resolution
limit: the cover came through at **8192 × 5464 in 3.2MB** at JPEG quality ~80.
Export quality, not pixels, is what to trade away.

Pre-cropping is not housekeeping: the PDF export refuses to write a file where
any photo is drawn at an aspect other than its own, because a scaled photo
smeared on iOS once already. Entries below are marked **Supplied** as they
arrive.

**A placed photograph keeps its plate.** The frame, the cobalt ID tab and the
corner marks all stay and draw over the image; only the shot brief inside comes
out. Without them a photograph floats loose on a page where everything else is
held in structure. Put the `<img>` inside the `.plate` at the plate's exact
pixel size — `width:100%` is a hair short, because the 1px border shrinks the
padding box and the aspect drifts. **The cover is the one exception**: M01.1
bleeds to three edges and carries no plate.

---

## Sheet 01 — Cover

| ID | Type | Spec | Direction |
|---|---|---|---|
| M01.1 | Photograph · product | 766 × 616, full bleed | **Supplied at print resolution** &mdash; `assets/fg-m01-1.jpg` at **3064 × 2464 (4×)**, from Drive's `final cover.jpg` at 8192 × 5464. Cropped 3:2 → 1.2435 keeping full height, taking the empty left and the right edge where the phone already bleeds; the framing is the approved one, scaled up, not re-judged. 300dpi print needs 2444px, so this clears it by 1.25× from a 6795px crop. Titanium iPhone on asphalt, hard diagonal, shallow depth. The frame runs dark across the top (**luma 49.4**, re-measured on this export against 48 on the last), so the masthead sits straight on the photograph with **no scrim** &mdash; swap in a brighter frame and that type needs a gradient under it again. |

The cover also carries two marks that belong to the sheet rather than to the
photograph: the orbital brand badge centred in the masthead, and the credit
line **Photography by Stephen Michael** set bottom-left inside the frame. The
credit is there because every photograph in this guide is Stephen's own, and
the book should say so.

> `assets/fg-m01-1-creator-unused.jpg` is the first cover candidate &mdash;
> Stephen shooting, with a foreground phone. **Not in the build**, and no
> longer needed for M02.1, which has its own frame. Kept because it is a real
> usable frame if another slot ever wants it.

## Sheet 02 — Stop Treating It Like A Phone

| ID | Type | Spec | Direction |
|---|---|---|---|
| M02.1 | Photograph · primary | 284 × 230, 5:4 | **Supplied** &mdash; `assets/fg-m02-1.jpg` at 568 × 460 (2×). Phone, hands, face and the reach, with lead room on the left where he is aiming. Carries **15% headroom above the cap** and clear margin on both edges: the first crop was tighter and read as boxed-in at plate size. Going wider still was tried and rejected &mdash; at 284px the subject goes small and the block he is sitting on intrudes bottom-right. |
| M02.2 | Photograph · nuance | 236 × 144 | The iPhone beside the pro camera. Both belong to one kit — this is the shot that stops the page reading as anti-camera. |

## Sheet 03 — Get Your iPhone Right

The Settings panel on this sheet is **drawn, not photographed** — it is a
component, not an asset, so it needs nothing shot. Its values do need checking
against a current device before publication.

| ID | Type | Spec | Direction |
|---|---|---|---|
| M03.1 | Comparison | 356 × 130 | **Supplied** &mdash; `assets/fg-m03-1.jpg` at 712 × 260 (2×). Arrived as a finished diptych at exactly the plate's 2.74 ratio, so it is placed with no crop at all. Haze and veiled contrast on the left, clear on the right. The sheet labels the halves **Dirty** and **Clean** in mono over the foliage, because the difference is real but subtle at 356px and every other comparison in the book names its halves. |

> M03.2 (one subject on each lens) and M03.3 (good light against poor light)
> are both **retired.** M03.3 duplicated sheet 07, which carries that
> comparison at full size as M07.1 and M07.2. M03.2 went when the lens
> guidance became typographic — a 72px strip taught nothing, and the page
> needed the room more than it needed a second small plate.

## Sheet 04 — Take Control

| ID | Type | Spec | Direction |
|---|---|---|---|
| M04.1 | Screenshot · UI crop | 304 × 90 | Native camera mid-record. Crop from a real device capture. |
| M04.2 | Screenshot · UI crop | 304 × 90 | Blackmagic Camera with manual controls on screen. |

## Sheet 05 — Build The Image

The three frames on this page **must be the same frame from the same take**, in
three states. Different shots break the argument the page is making.

| ID | Type | Spec | Direction |
|---|---|---|---|
| M05.1 | State 01 | 500 × 155 | Ungraded Apple Log, straight off the phone. No correction, no LUT. |
| M05.2 | State 02 | 500 × 155 | Corrected only. Exposure, white balance, contrast, natural color. No style yet. |
| M05.3 | State 03 | 500 × 155 | Final grade — the look you would actually publish. |

## Sheet 06 — Shoot With Intention

Six frames of **one subject, in the same light, before the camera moves.** The
strongest version of this page is one coherent sequence, not six unrelated
example images. The supplied set delivers exactly that: one rooftop, one
skyline, one golden hour.

Plates are **286 × 161** (ratio 1.7764), which is *not* quite true 16:9
(1.7778). A 3840 × 2160 frame therefore loses 3px of width — trivial, but it
has to be cropped rather than squeezed, or the export refuses the build.

| ID | Type | Spec | Direction |
|---|---|---|---|
| M06.1 | Video frame | 286 × 161 | **Supplied** — `fg-m06-1.jpg` from `wide.jpg`. Wide: subject small on the rooftop, skyline behind, planting in the foreground. |
| M06.2 | Video frame | 286 × 161 | **Supplied** — `fg-m06-2.jpg` from `medium.jpg`. Medium: subject from the waist, skyline behind. |
| M06.3 | Video frame | 286 × 161 | **Supplied** — `fg-m06-3.jpg` from `close.jpg`, punched in **1.33×** (2880 × 1621 of the 4K frame). The full frame read too wide for a close beside M06.2. Tighter was tried at 1.5× and rejected: it clipped the watch and bracelet at the edges and cut the chin off the bottom, losing the face. |
| M06.4 | Video frame | 286 × 161 | **Supplied** — `fg-m06-4.jpg` from `close1.jpg`. Detail: watch on the wrist. Matches the sheet's own caption — *hands, texture, a product* — word for word. |
| M06.5 | Video frame | 286 × 161 | **Supplied** — `fg-m06-5.jpg` from `detail.jpg`. Environment: shot through foreground grass to the towers, no subject in frame. |
| M06.6 | Video frame | 286 × 161 | **Supplied** — `fg-m06-6.jpg` from `reveal.jpg`. Reveal: the subject found past an out-of-focus agave leaf and foreground planting. Full frame, no recrop. |

> **Frame 05 was Movement and is now Environment.** Movement is temporal and a
> single still can only gesture at it, so the slot was doing the least work on
> the sheet. Environment earns its place instead: the frame carries no subject
> at all, which is exactly the argument — the place is part of the story, and
> the edit has nowhere to breathe without it. Sheet 11's shot sequence was
> updated to match, or the cheat sheet would contradict the page it summarises.
>
> `close1.jpg` took Detail rather than its filename's slot, because the watch on
> the wrist matches that caption — *hands, texture, a product* — word for word.
> `ss iphone field guide .00_01_53_07.Still002.jpg` is unused: a second medium,
> close to M06.2.

## Sheet 07 — Light + Sound

| ID | Type | Spec | Direction |
|---|---|---|---|
| M07.1 | Before | 221 × 210 | Overhead light, no direction, hard shadows. |
| M07.2 | After | 223 × 210 | Window light, subject moved toward it. **Same subject, same phone, same room** — shoot these back to back or the comparison is dishonest. |
| M07.3 | Setup | 214 × 100 | One artificial light, in use. A real working setup, not a product shot. |
| M07.4 | Photograph | 164 × 160 | iPhone with external or wireless audio, in use on a real subject. |

> IDs here follow page order, so M07.1 is the "before" half. The brief listed
> window light first; the assets themselves are unchanged.

## Sheet 08 — Build The Rig

| ID | Type | Spec | Direction |
|---|---|---|---|
| M08.1 | Hero flat lay | 800 × 368 visible, bleeds three edges | Stephen's kit shot top-down, even light, no props. **Group the three essentials — tripod, mic, light — apart from the rest.** The page argues that four of these items are optional, and the photograph has to agree with it, so do not lay the kit out as one uniform grid. The printed band across the lower third is reserved for the caption and must stay clear. Items: iPhone, Ulanzi MT-85, DJI Mic 2, Amaran MC, SmallRig cage and handles, SmallRig ND if available by the shoot date, Samsung T7, Anker power bank, cables. |

## Sheet 09 — Workflow

| ID | Type | Spec | Direction |
|---|---|---|---|
| M09.1 | Screenshot | 306 × 116 | Your real edit timeline at stage 05 — A-roll laid down, before color. |

## Sheet 10 — iPhone Over Camera

| ID | Type | Spec | Direction |
|---|---|---|---|
| M10.1 | Video frame | 328 × 184, 16:9 | Finished frame shot on iPhone, lifestyle. Pull from real published work. |
| M10.2 | Video frame | 328 × 184, 16:9 | Shot on iPhone, movement. Depth or motion, not a still that happens to move. |
| M10.4 | Artifact | 236 × 142 | **The real handwritten concept note.** Scan or photograph as found — creases, ink, whatever it actually looks like. Sits tilted on the page. |

> M10.3 was specified as an optional third frame and is **not in the build** —
> the page is stronger with the negative space. The ID is left unused rather
> than renumbered, so it still maps to the original brief.

## Sheet 11 — Field Cheat Sheet

| ID | Type | Spec | Direction |
|---|---|---|---|
| M11.1 | QR → download | — | Save the cheat sheet to your phone. |
| M11.2 | QR → product | — | The Shooting Stars Content Framework. This is the guide's only outbound link to the flagship, so it points at wherever the Framework is actually sold or delivered, not a general homepage. |

## Sheet 12 — About Stephen

| ID | Type | Spec | Direction |
|---|---|---|---|
| M12.1 | Photograph · editorial | 356 × 676, tall crop | Stephen, shot as a contributor portrait rather than a headshot. Natural light, colour, environment allowed to read. **Shoot wider than the plate and frame loose** — the page holds a 1:1.9 column, so a tight capture leaves nothing to crop against. The only asset on the sheet; the orbital watermark beside it is the existing brand mark, not a photograph. |

---

## Grouped by shoot

Most of this collapses into a small number of sessions.

**Session A — Stephen shooting (documentary)**
M01.1, M02.1, M02.2 — one location, one afternoon. M01.1 is the cover and
deserves the most attention; the other two can come from the same setup.

**Session B — the six-frame coverage set**
**Complete.** All six are in from one rooftop, one skyline, one golden hour.
M10.1 and M10.2 can be pulled from existing published work instead.

**Session C — comparisons, shot back to back**
M07.1 and M07.2 (overhead / window). The pair changes exactly one variable, so
it has to be shot in one sitting without relighting or reframing between the
two frames. M03.1 is done.

> This session used to list M03.3 (good / poor light) and carried a Session D
> for M03.2 (lenses). **Both of those assets are retired** — see sheet 03 — so
> neither needs shooting, and Session D is gone with them.

**Session E — gear**
M08.1 (the flat lay) plus M07.3 and M07.4 (light and audio in use). Same kit,
same day. Shoot the flat lay with the three essentials grouped apart from the
rest, so the photograph carries the page's argument.

**Session F — captures, no shoot required**
M04.1, M04.2, M09.1 — device screenshots and a timeline grab.

**Session G — the grade set**
M05.1–M05.3. One frame, exported three times at three stages of the grade.

**Session H — the contributor portrait**
M12.1. Its own sitting, not a frame pulled from Session A: sheet 12 wants
Stephen still and looking at the lens, where Session A wants him working.
Shoot loose — the plate is a tall 1:1.9 column.

**Artifact**
M10.4 — the handwritten note. Scan it; do not recreate it.

**Video / QR**
M11.1 (cheat-sheet download) and M11.2 (the Content Framework).
