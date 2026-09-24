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
| M02.2 | Photograph · nuance | 236 × 144 | The iPhone beside the pro camera. Both belong to one kit — this is the shot that stops the page reading as anti-camera. |

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
| M04.1 | Photograph · device | 304 × 90 | **Still open, and the brief has changed.** Native camera mid-record, shot as a *photograph of the phone* — not a flat screengrab. Match M04.2: same angle, same surface, same light. These two sit side by side as the page's whole argument, so a screenshot opposite a photograph would read as a mistake. |
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
| M07.1 | Before | 221 × 210 | Overhead light, no direction, hard shadows. |
| M07.2 | After | 223 × 210 | Window light, subject moved toward it. **Same subject, same phone, same room** — shoot these back to back or the comparison is dishonest. |
| M07.3 | Setup | 214 × 100 | One artificial light, in use. A real working setup, not a product shot. |
| M07.4 | Photograph | 164 × 160 | iPhone with external or wireless audio, in use on a real subject. |

> IDs here follow page order, so M07.1 is the "before" half. The brief listed
> window light first; the assets themselves are unchanged.

## Sheet 09 — Build The Rig  ·  assets M08.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M08.1 | Hero flat lay | 800 × 368 visible, bleeds three edges | Stephen's kit shot top-down, even light, no props. **Group the three essentials — tripod, mic, light — apart from the rest.** The page argues that four of these items are optional, and the photograph has to agree with it, so do not lay the kit out as one uniform grid. The printed band across the lower third is reserved for the caption and must stay clear. The top-right corner carries the M08.2 kit link and must stay clear too. Items: iPhone, Ulanzi MT-85, DJI Mic 2, Amaran MC, SmallRig cage and handles, SmallRig ND if available by the shoot date, Samsung T7, Anker power bank, cables. |
| M08.2 | QR → gear destination | 58 × 58 | **QR destination to be supplied.** The guide's one gear link: the kit Stephen actually shoots with, wherever it ends up living (his Amazon storefront or a Shooting Stars gear page). One code for the whole kit — no per-product links, prices or buy buttons anywhere in the guide. When the URL exists, swap the placeholder glyph for the QR image and link the \"View Stephen's Kit\" line; the destination can then change over time without touching the page. |

## Sheet 10 — Workflow  ·  assets M09.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M09.1 | Screenshot | 306 × 116 | Your real edit timeline at stage 05 — A-roll laid down, before color. |

## Sheet 11 — iPhone Over Camera  ·  assets M10.x

| ID | Type | Spec | Direction |
|---|---|---|---|
| M10.1 | Video frame | 328 × 184, 16:9 | Finished frame shot on iPhone, lifestyle. Pull from real published work. |
| M10.2 | Video frame | 328 × 184, 16:9 | Shot on iPhone, movement. Depth or motion, not a still that happens to move. |
| M10.4 | Artifact | 236 × 142 | **The real handwritten concept note.** Scan or photograph as found — creases, ink, whatever it actually looks like. Sits tilted on the page. |

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
> for M03.2 (lenses). **Both of those assets are retired** — see sheet 04 — so
> neither needs shooting, and Session D is gone with them.

**Session E — gear**
M08.1 (the flat lay) plus M07.3 and M07.4 (light and audio in use). Same kit,
same day. Shoot the flat lay with the three essentials grouped apart from the
rest, so the photograph carries the page's argument, and
keep its top-right corner clear for the M08.2 kit link.

**Session F — captures, no shoot required**
M04.1, M04.2, M09.1 — device screenshots and a timeline grab.

**Session G — the grade set**
M05.1–M05.3. One frame, exported three times at three stages of the grade.

**Session H — the contributor portrait**
M12.1. Its own sitting, not a frame pulled from Session A: sheet 14 wants
Stephen still and looking at the lens, where Session A wants him working.
Shoot loose — the plate is a tall 1:1.9 column.

**Artifact**
M10.4 — the handwritten note. Scan it; do not recreate it.

**Video / QR**
M08.2 (the kit link), M11.1 (cheat-sheet download) and M11.2 (the Content
Framework). All three destinations are still to be supplied — none is invented.
