# Still needed from Kea

Everything below lives in `content.js`. On the slides, bracketed placeholders show with
a dashed outline so nothing slips through. Search `content.js` for `[` to find them all.

## Brand
- [ ] **Logo.** `brand.logo`, plus `brand.logoLight` for the dark slides (SVG or transparent PNG). It appears top left on every slide and in the sign-off. Until it's set, a typeset CURATED / BY KEA lockup stands in.

## Bios
- [ ] **Kea's page.** `team.kea`: the bio, tagline and credentials are drafted from @curatedxkea (8K+ followers, seen in Essence and on BET, Houston + worldwide). Kea to approve the wording, and add NYBFW or other features if she wants them shown.
- [ ] **Stephen's page.** `stephen`: 12+ years in video production, 40K+ followers, 5 years filming weddings, brand work with Adobe, Toyota, Samsung and Home Depot. Update any figure that has moved before sending.

## Portfolio and weekend media (see `media/README.md`)
- [ ] `kea-reel`: Kea's portfolio reel (9:16)
- [ ] `stephen-reel`: Stephen's portfolio reel (9:16)
- [ ] **`couple-reel`: Sam & JT's Instagram reel for the cover** (https://www.instagram.com/reel/DW2RKA8GTNm/). Save the video, encode it per `media/README.md`, drop it in as `media/couple-reel.mp4` with a poster, and set `src`. Until then the cover's phone frame links to the reel on Instagram.
- [ ] `hero-reel` (optional): full-bleed cover film (16:9). Until it's added, a painted lake at golden hour plays behind the headline.
- [ ] `day-welcome`, `day-wedding`, `day-farewell`: one 9:16 mood clip per day
- [ ] `vendor-reel` (9:16)
- [ ] Five vision images: `vision-getting-ready`, `vision-vendors`, `vision-bride`, `vision-party`, `vision-details`

## Deliverables
- [ ] `why.rows`: replace each `[CONFIRM deliverable, count and format]` with what you'll deliver for that part of the weekend. Add or remove rows as needed.
- [ ] Raw footage row: `[CONFIRM delivery method]` (for example, a shared drive link).

## Vendor map
- [ ] For each vendor in `vendors.list`, set `home` to their city and add `lat` and `lng` so their pin lights up on the map. Vendors without coordinates are listed but not pinned.
- [ ] The two planners are pinned at country level for now (United States, Italy). Move them to their real cities.
- [ ] Double-check that the list matches the vendors Sam & JT want featured.

## Booking
- [ ] **Reserve button link.** `reserve.ctaUrl`: your booking or contact page. Until it's set, the button is outlined and a note sits under it.

## Before you send
- [ ] Search `content.js` for `[`. Nothing should be left.
- [ ] If a PDF goes too, re-export it (`node tools/export-pdf.mjs`) so it matches the live deck.
- [ ] Confirm the venue is still shown only as "the villa at Lake Como".
