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

**Keep Drive files under ~5MB.** The connector documents a 10MB download cap
but the real transport ceiling is lower — 3.27MB and 4.72MB both pulled cleanly
(the 4.72MB file byte-for-byte), 7.59MB kills the session every time, and 21MB is
refused outright. The limit behaves like ~10MB of base64, so ~7MB is the true edge;
stay well inside it. This is not a resolution
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
bleeds to three edges and carries no plate. M02.1 is the other departure: it is set as a
Polaroid. It is still a `.plate` and keeps its ID tab, but the white frame is its
border, so the corner marks are off.

**Sheet numbers and asset IDs no longer line up, and that is deliberate.**
A Contents page was inserted as sheet 02, pushing every teaching sheet down by
one. The asset IDs on the plates were *not* renumbered — M02.1 is still M02.1,
it just now sits on sheet 03 — because renumbering them would mean editing
finished pages and renaming every file for no gain. So: **the M-number is one
lower than the sheet it appears on**, from sheet 03 onward. Each heading below
states both. Sheet 13 is reserved for the Academy page and has no assets yet.

---

## Sheet 01 — Cover  ·  assets M01.x

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

## Sheet 03 — Stop Treating It Like A Phone  ·  assets M02.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M02.1 | Photograph · primary | 224 × 224 window in a 252 × 306 Polaroid | **Supplied at print resolution** &mdash; `assets/fg-m02-1-polaroid.jpg` at 896 × 896 (4×), cut square from the 2000px chat original. Phone, hands, face and the reach, with lead room on the left where he is aiming and clear headroom above the cap. Set as a Polaroid tilted &minus;2.4°, captioned in the bottom margin in the book's mono: **SSCA &mdash; &ldquo;Creating a Brighter Tomorrow&rdquo;**. Typeset, not handwritten: a signature would have to be a scan of the real thing. `assets/fg-m02-1.jpg` (the 568 × 460 landscape cut) stays for the archived plate version in `comps/p03-A-plate.html`. |
| M02.2 | Photograph · nuance | 236 × 144 | **Supplied at print resolution** &mdash; `assets/fg-m02-2.jpg` at 944 × 576 (4×), from Drive's `m02.2.png` at 1536 × 1024. Cut to the plate's 236:144 at full width, trimming the ledge at the bottom: the cage's top handle already meets the top edge, so nothing came off the top. The iPhone beside the FX3 in its SmallRig cage &mdash; both belong to one kit, which is the shot that stops the page reading as anti-camera. |

## Sheet 04 — Get Your Settings Right  ·  assets M03.x

The Settings panel on this sheet is **drawn, not photographed** — it is a
component, not an asset, so it needs nothing shot. Its values do need checking
against a current device before publication.

| ID | Type | Spec | Direction |
|---|---|---|---|
| M03.1 | Comparison | 356 × 130 | **Supplied** &mdash; `assets/fg-m03-1.jpg` at 712 × 260 (2×). Arrived as a finished diptych at exactly the plate's 2.74 ratio, so it is placed with no crop at all. Haze and veiled contrast on the left, clear on the right. The sheet labels the halves **Dirty** and **Clean** in mono over the foliage, because the difference is real but subtle at 356px and every other comparison in the book names its halves. |

> M03.2 (one subject on each lens) and M03.3 (good light against poor light)
> are both **retired.** M03.3 duplicated sheet 08, which carries that
> comparison at full size as M07.1 and M07.2. M03.2 went when the lens
> guidance became typographic — a 72px strip taught nothing, and the page
> needed the room more than it needed a second small plate.

## Sheet 05 — Take Control  ·  assets M04.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M04.1 | Photograph · device | 304 × 90 | **Supplied** &mdash; `fg-m04-1.jpg` at 1216 × 360 (4×) from Drive's `m04.1.jpg` (8163 × 2974). The native Camera app mid-record, shot as a photograph of the phone on a stand. Cropped 3962 × 1173 on the controls: the zoom row, pause, the red stop button and the shutter, with the phone's frame in at both edges. Shot straight-on against grey where M04.2 is angled on wood; both are photographs of the device, which is what the pair needs. |
| M04.2 | Photograph · device | 304 × 90 | **Supplied** — `fg-m04-2.jpg` at 1216 × 360 (4×) from Drive's `mo4.2.jpg` (2048 × 1366). Phone on a wood surface running Blackmagic, shot at an angle. Cropped 1450 × 429 on the control cluster: record button, the highlighted 24mm and the focal ladder, the audio meters. The full-width band was tried and rejected — the plate is only 304px wide and the controls went unreadable. |

> The supplied frame is a **photograph of the device**, not the screenshot the
> brief originally asked for. That is the better call — it suits the book's
> "real work, real gear" rule far more than a screengrab — but it changes what
> M04.1 has to be, so its plate now briefs a photograph too.

## Sheet 06 — Build The Image  ·  assets M05.x

The three frames on this page **must be the same frame from the same take**, in
three states. Different shots break the argument the page is making.

Plates are **534 × 150** (ratio 3.56, near-anamorphic) and **bleed 34px off the
right edge** by design — `right:-34px`, `border-right:none`. A 16:9 source gives
up exactly half its height. All three were cut with one identical crop box,
`(0, 368, 3840, 1447)`, so the frames register exactly; re-cut one on its own
and the sequence will jitter.

| ID | Type | Spec | Direction |
|---|---|---|---|
| M05.1 | State 01 | 534 × 150 | **Supplied** — `fg-m05-1.jpg` from `ungraded.jpg`. Apple Log, straight off the phone. |
| M05.2 | State 02 | 534 × 150 | **Supplied** — `fg-m05-2.jpg` from `color corrected.jpg`. |
| M05.3 | State 03 | 534 × 150 | **Supplied** — `fg-m05-3.jpg` from `final grade.jpg`, the same frame as sheet 07's M06.2. |

The set was chosen from four rooftop candidates rendered into the live strip.
The medium frame won because it is the only one carrying **every reference a
correction pass acts on** — skin at readable size, a near-neutral in the grey
shirt, a saturated primary in the red cap, and real range from blown sky to
shadowed trees. The wide frame flatters the anamorphic crop most but puts the
subject too far away to judge colour against; the close frame hides the face
under the cap brim.

**Verified rather than assumed.** All three register as the same frame
(structural edge difference 1.65 and 2.22 against the ungraded, far below the
threshold for a different take), and the tone progression is honest:

| | contrast (sd) | saturation | blacks (p1) | whites (p99) |
|---|---|---|---|---|
| Ungraded | 41.3 | 17.6 | **56** | **201** |
| Corrected | 66.6 | 48.5 | 19 | 231 |
| Graded | 71.7 | 70.0 | 11 | 231 |

Blacks sitting at 56 and whites held at 201 with saturation at 18 is what Log
looks like. Correction lifts contrast 61% and nearly triples saturation; the
grade then adds another 44% of saturation and crushes the blacks to 11. If a
future re-export does not show that shape, the first frame is not really Log
and the page is claiming something it does not demonstrate.

## Sheet 07 — Shoot With Intention  ·  assets M06.x

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
> the edit has nowhere to breathe without it. Sheet 12's shot sequence was
> updated to match, or the cheat sheet would contradict the page it summarises.
>
> `close1.jpg` took Detail rather than its filename's slot, because the watch on
> the wrist matches that caption — *hands, texture, a product* — word for word.
> `ss iphone field guide .00_01_53_07.Still002.jpg` is unused: a second medium,
> close to M06.2.

## Sheet 08 — Light + Sound  ·  assets M07.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M07.1 | Before | 221 × 210 | **Supplied at print resolution** &mdash; `fg-m07-1.jpg` at 884 × 840 (4×) from Drive's `M07.1.jpg` (1350 × 1350). Overhead light: warm cast, hard shadow under the brim and in the eye sockets, hot spots on the forehead. Cut 1338 × 1271 from the left edge, 20px down, keeping the headroom above the cap. |
| M07.2 | After | 223 × 210 | **Supplied at print resolution** &mdash; `fg-m07-2.jpg` at 892 × 840 (4×) from Drive's `M07.2.jpg` (1350 × 1350). Window light: even across the face, catchlights in both eyes. Same subject, cap, shirt and chain in front of the same dark doors; he has moved toward the window, so the background shifts. Cut 1350 × 1271, 25px down. **The pair is cut as one frame:** both halves use the same 6.05 source px per page px, so the face is the same size on each side and the eye line sits at the same height (77px) across the cobalt seam. Both placed as supplied, with no grade on either &mdash; correcting the before would change a second variable. |
| M07.3 | Two frames · light &rarr; result | 206 × 206, twice, joined by an arrow | **Supplied at print resolution** &mdash; one ID over two frames, tab on the first. `fg-m07-3-light.jpg` at 824 × 824 (4×) from Drive's `lighting 1 m07.3.jpeg` (1729 × 2305): the desk with the gridded softbox top right and Stephen's hand-drawn arrow pointing at it. Cut square from the top of the frame, so the softbox, the whole arrow from tail to head and the desk all stay; only the lower keyboard and the empty mat go. `fg-m07-3-result.jpg` at 824 × 824 (4×) from Drive's `lighting 2 m07.3.jpeg` (1080 × 1920, a finished vertical frame): cut square from 340px down, keeping him from the cap to the lap with the lamp and the calendar; only the ceiling and the dark desk foreground go. Both arrived tagged Display P3 and were converted to sRGB; nothing else was done to either file. The slot grew from a 214 × 100 strip under Artificial Light to a full-width pair within 4px of the height of M07.1/M07.2, so the Direction / Artificial Light row moved up 34px to make room. 206 rather than 210 keeps the gap above the closing rule at 25px, over the 22px floor `density.mjs` enforces. |
| M07.4 | Photograph | 164 × 160 | **Supplied at print resolution** &mdash; `fg-m07-4.jpg` at 656 × 640 (4×) from Drive's `M07.4.jpg` (4910 × 4910). Stephen's hand on the iPhone, the DJI Mic receiver in the port showing live levels and the transmitter held alongside. Cut 4098 × 3998 around the phone and both mics. |

> IDs here follow page order, so M07.1 is the "before" half. The brief listed
> window light first; the assets themselves are unchanged.

## Sheet 09 — Build The Rig  ·  assets M08.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M08.1 | Hero photograph | 766 × 367 visible, bleeds three edges | **Supplied at print resolution** &mdash; `fg-m08-1.jpg` at 3064 × 1468 (4×) from Drive's `M08.2.jpg` (8046 × 5209; filed under M08.2, but it is this hero). Not the flat lay first briefed: Stephen's iPhone in the SmallRig cage with both handles, the mic on the cold shoe and the drive below, which is the rig the captions talk about. Cut 7356 × 3524 with the rig left of centre and the black background under the kit link. Two tonal passes in the file, none on the page: the lower band is burned down (smoothstep from 36% to 66% of the height, down to 22% brightness) and the wall at left is darkened (smoothstep over the left 34% of the width, down to 50%), so the doctrine can sit in the open wall at upper left and the kit link on the black at upper right, both clear of the rig. The rig itself is untouched. The tab sits at x 34, clear of the spine. |
| M08.2 | QR → gear destination | 54 × 54 | **Supplied** &mdash; `https://amzn.to/3si3Hrx`, Stephen's Premium Content Kit (his Amazon storefront), given by Stephen; nothing about it was invented or altered. One code for the whole kit &mdash; no per-product links, prices or buy buttons anywhere in the guide &mdash; so the storefront's contents can change without touching the page. The code is version 2, error level M (25 × 25 modules, 4-module quiet zone), drawn inline as vector on a paper tile: dark on light, because an inverted code on the photo will not scan reliably. It decodes back to the exact URL from renders at 1× through 4×. The tile and the "View Stephen's Kit" line are both links, so a reader on a phone can tap instead of scan. The shortener could not be followed from the build machine (the proxy refuses amzn.to), so scan the printed code once before release. |

## Sheet 10 — Workflow  ·  assets M09.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M09.1 | Screenshot | 306 × 116 | **Supplied at print resolution** &mdash; `fg-m09-1.jpg` at 1224 × 464 (4×) from Drive's `the edit.png` (1798 × 712, a Retina capture). Stephen's real Premiere timeline: timecode ruler, caption track, six video tracks and the audio waveform. Cut to the plate's 2.64:1 by taking 18px off the top (empty ruler) and the scrollbar strip off the bottom, so every timecode stays whole; the plate's border hides the channel labels under the waveform rather than slicing them. Converted from the Mac's display profile to sRGB and saved at full chroma (4:4:4), since it is UI with coloured edges and text. |

## Sheet 11 — iPhone Over Camera  ·  assets M10.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M10.1 | Video frame | 328 × 184, 16:9 | **Supplied** &mdash; `fg-m10-1.jpg` at 1066 × 598 (3.25×) from Drive's `red camera challenge pic.jpeg` (1080 × 1920, vertical). Cut 1080 × 606 from 560px down: Stephen framing a shot with the little red camera, both hands and the watch, palms and beach behind. |
| M10.2 | Video frame | 328 × 184, 16:9 | **Supplied** &mdash; `fg-m10-2.jpg` at 1066 × 598 (3.25×) from Drive's `dr 1 - challenge pic.jpeg` (1080 × 1920, vertical). Cut 1080 × 606 from 740px down: the boardwalk to the thatched roofs, railings converging on one point &mdash; depth, not a still that happens to move. |
| M10.4 | Photograph · the phone | 236 × 142 | **Supplied at print resolution** &mdash; `fg-m10-4.jpg` at 944 × 568 (4×) from Drive's `replace with challenge note.jpg` (5464 × 8192). **Replaces the handwritten concept note**: the silver iPhone on a dark concrete ledge, low-key light. Cut 5152 × 3100 around the whole phone, centred, so the concrete frames it; square in an `on-cobalt` plate now, since the tilt belonged to the note as a found object. |

> M10.1 and M10.2 were briefed as 16:9 and arrived as vertical video frames. They
> are cut to the 16:9 plates, which keeps the page's layout as designed; each keeps
> a 1080 × 606 band, about a third of the frame. An uncropped 9:16 version (two
> 153 × 272 plates under iPhone First, the quote beside them) was mocked up and
> passed on. At 1080px wide the sources give 3.29×, just over the 3.2× print floor,
> so these two are stored at 1066 × 598 (the plate's exact 41:23) rather than 4× —
> never upscale. A taller original would buy back the headroom. Both carry Apple's
> "HDTV" profile (gamma 1.96) and were converted to sRGB so they print as they look
> on a phone; nothing else was done to either.

> M10.3 was specified as an optional third frame and is **not in the build** —
> the page is stronger with the negative space. The ID is left unused rather
> than renumbered, so it still maps to the original brief.

## Sheet 12 — Field Cheat Sheet  ·  assets M11.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M11.1 | QR → download | — | **QR destination to be supplied.** Save the cheat sheet to your phone. |
| M11.2 | QR → product | — | **QR destination to be supplied.** The Shooting Stars Content Framework. This is the guide's only outbound link to the flagship, so it points at wherever the Framework is actually sold or delivered, not a general homepage. |

## Sheet 13 — Shooting Stars Content Academy  ·  no assets

**Nothing to shoot.** The page is typographic by design: it sits between two
photography-led sheets and earns its place by contrasting with them. Its only
visual element is the orbital brand mark, set low and right at .055 and cropped
by the closing cobalt band.

> The **Explore Shooting Stars** line carries no destination yet. No URL was
> invented; the href goes on that one element when the Academy address exists.

## Sheet 14 — About Stephen  ·  assets M12.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M12.1 | Photograph · creator | 672 × 378, 16:9 | **Supplied, but short for print.** `assets/fg-m12-1.jpg` at 1344 × 756 (2×), cut full-width from the creator frame first tried as a cover. Stephen left with his phone, the large foreground phone right; the crop keeps that relationship, which is the whole reason the frame works here. |

> **This is the one outstanding print gap.** A 672-wide plate needs **2150px**
> at 300dpi and this asset has **1344**, because the source only ever came
> through chat at 2000px. It is fine on screen and will soften in the hardback.
> The fix is the one the cover already had: put the original in Drive under
> ~3.5MB and it can be recut at 4× without upscaling.

The sheet also carries two brand marks. The orbital sits **behind** the
photograph, sized to peek out at the left gutter, the right margin and the
paper below the frame — found rather than placed. A small white badge sits
inside the photograph's top-right, clear of the corner mark, with a soft shadow
because that corner runs at luma 179 and plain white would vanish into the
concrete.

> **Version A is archived, not discarded.** `comps/p12-A-portrait.html` is the
> portrait-led sheet this replaced, with its tall 356 × 676 placeholder and the
> copy set beside it. `comps/` sits outside `src-fg/`, so nothing there can
> reach the build; swapping back is a file copy.

---

## Grouped by shoot

Most of this collapses into a small number of sessions.

**Session A — Stephen shooting (documentary)**
M01.1, M02.1, M02.2 — one location, one afternoon. **All three are in.**

**Session B — the six-frame coverage set**
**Complete.** All six are in from one rooftop, one skyline, one golden hour.
M10.1 and M10.2 came from published vertical work instead, and are in.

**Session C — comparisons, shot back to back**
**Complete.** M07.1 and M07.2 (overhead / window) are in, and M03.1 is done.
The pair changes exactly one variable, so if either frame is ever reshot,
reshoot both in one sitting without relighting or reframing between them.

> This session used to list M03.3 (good / poor light) and carried a Session D
> for M03.2 (lenses). **Both of those assets are retired** — see sheet 04 — so
> neither needs shooting, and Session D is gone with them.

**Session E — gear**
**Complete.** M08.1 (the rig photograph), M07.4 (the mic in use) and M07.3
(the light, and the frame it produced) are all in.

**Session F — captures, no shoot required**
**Complete.** M09.1, the timeline grab, is in. M04.1 and M04.2 came in as
photographs of the phone rather than screenshots, and both are in.

**Session G — the grade set**
M05.1–M05.3. One frame, exported three times at three stages of the grade.

**Session H — the contributor portrait**
M12.1. Its own sitting, not a frame pulled from Session A: sheet 14 wants
Stephen still and looking at the lens, where Session A wants him working.
Shoot loose — the plate is a tall 1:1.9 column.

**Artifact**
Retired: M10.4 is a photograph of the phone now, not the handwritten note.

**Video / QR**
M08.2, the kit link, is in. M11.1 (cheat-sheet download) and M11.2 (the Content
Framework) are still to be supplied — none is invented.
