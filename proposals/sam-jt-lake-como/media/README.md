# Media slots

Drop files in this folder, then point the matching slot at them in `content.js`
under `media`. For example:

```js
"hero-reel": { kind: "video", aspect: "16:9", src: "media/hero-reel.mp4", poster: "media/hero-reel.jpg", alt: "Golden hour over Lake Como" },
```

A slot with an empty `src` shows a styled placeholder with its name and ratio, so
the deck always looks finished. Change the `alt` text to describe what's really in
the clip or photo.

## Videos

| Slot | Where it appears | Aspect | Frame | Target size |
|---|---|---|---|---|
| `hero-reel` | Cover, full-bleed background | 16:9 | 1920×1080 | under 8 MB, 10 to 20 s loop |
| `day-welcome` | Friday slide, phone frame | 9:16 | 1080×1920 | under 8 MB |
| `day-wedding` | Saturday slide, phone frame | 9:16 | 1080×1920 | under 8 MB |
| `day-farewell` | Sunday slide, phone frame | 9:16 | 1080×1920 | under 8 MB |
| `bts-reel` | Behind the scenes, full-bleed | 16:9 | 1920×1080 | under 8 MB |
| `vendor-reel` | Vendor interviews slide and vision grid | 9:16 | 1080×1920 | under 8 MB |
| `kea-reel` | Meet the team, and Option One card | 9:16 | 1080×1920 | under 8 MB |
| `stephen-reel` | Option Two card only | 9:16 | 1080×1920 | under 8 MB |
| `closing-reel` | Closing slide, full-bleed behind the sign-off | 16:9 | 1920×1080 | under 8 MB |

Every video plays muted and on loop while its slide is on screen, pauses when you
move on, and has a sound button to unmute. Clips only start downloading when their
slide (or the one next to it) comes up.

Give each video a `poster` JPG (the first frame, around 200 KB). It shows while
the clip loads and it's what the PDF prints.

## Images

| Slot | Where it appears | Aspect | Size |
|---|---|---|---|
| `vision-getting-ready` | Vision grid | 4:5 | 1200×1500 |
| `vision-vendors` | Vision grid | 4:5 | 1200×1500 |
| `vision-bride` | Vision grid and the bride slide | 4:5 | 1200×1500 |
| `vision-party` | Vision grid and the party slide | 4:5 | 1200×1500 |
| `vision-details` | Vision grid and the details slide | 4:5 | 1200×1500 |
| `vision-grounds` | Details slide | 3:4 | 1200×1600 |

Export images as JPG (quality around 80) or WebP, under about 400 KB each.

## Encoding loops for the web

H.264 MP4, no audio track unless the clip needs sound, `faststart` so it plays
before it finishes downloading:

```sh
# 16:9 loop
ffmpeg -i in.mov -vf "scale=1920:-2,fps=30" -c:v libx264 -preset slow -crf 24 \
  -profile:v high -pix_fmt yuv420p -movflags +faststart -an media/hero-reel.mp4

# 9:16 loop (keep audio for reels people might unmute)
ffmpeg -i in.mov -vf "scale=1080:-2,fps=30" -c:v libx264 -preset slow -crf 25 \
  -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k media/day-wedding.mp4

# poster from the first frame
ffmpeg -i media/hero-reel.mp4 -frames:v 1 -q:v 3 media/hero-reel.jpg
```

If a file comes out over 8 MB, raise `-crf` by 2 and export again, or trim the loop.
