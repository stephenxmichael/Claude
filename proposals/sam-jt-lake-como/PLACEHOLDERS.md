# Still needed from Kea

Everything below lives in `content.js`. On the slides, bracketed placeholders show with
a dashed outline so nothing slips through. Search `content.js` for `[` to find them all.

## Brand
- [ ] **Logo.** `brand.logo`, plus `brand.logoLight` for the dark slides (SVG or transparent PNG). It appears top left on every slide and in the closing sign-off. Until it's set, a "Logo" tag sits next to the wordmark.

## Bios
- [ ] **Kea's bio.** `team.kea.bio`: two or three sentences on your style and how you work a wedding day.
- [ ] **Stephen's bio line.** `options.stephen.bio`: keep "12+ years in video production", then add a line on his style.

## Portfolio and weekend media (see `media/README.md`)
- [ ] `kea-reel`: Kea's portfolio reel (9:16)
- [ ] `stephen-reel`: Stephen's portfolio reel (9:16)
- [ ] `hero-reel`: cover film (16:9). Until it's added, a painted lake at golden hour plays instead.
- [ ] `day-welcome`, `day-wedding`, `day-farewell`: one 9:16 mood clip per day
- [ ] `bts-reel` (16:9), `vendor-reel` (9:16), `closing-reel` (16:9)
- [ ] Six vision images: `vision-getting-ready`, `vision-vendors`, `vision-bride`, `vision-party`, `vision-details`, `vision-grounds`

## Deliverables
- [ ] `deliverables.rows`: replace each `[CONFIRM deliverable, count and format]` with what you'll deliver for that part of the weekend. Add or remove rows as needed.
- [ ] Raw footage row: `[CONFIRM delivery method]` (for example, a shared drive link).

## Vendor map
- [ ] For each vendor in `vendors.list`, set `home` to their city and add `lat` and `lng` so their pin lights up on the map. Vendors without coordinates are listed but not pinned.
- [ ] The two planners are pinned at country level for now (United States, Italy). Move them to their real cities.
- [ ] Double-check that the list matches the vendors Sam & JT want featured.

## Booking
- [ ] **Reserve button link.** `reserve.ctaUrl`: your booking or contact page. Until it's set, the button is outlined and a note sits under it.

## Before you send
- [ ] Pick the typeface (`typeface`) and set `typePicker: false`.
- [ ] Search `content.js` for `[`. Nothing should be left.
- [ ] If a PDF goes too, re-export it (`node tools/export-pdf.mjs`) so it matches the live deck.
- [ ] Confirm the venue is still shown only as "the villa at Lake Como".
