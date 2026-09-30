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

No video slots are in use right now. The media component still supports them
(`kind: "video"`, `src`, `poster`) if a clip is added later.

## Images

| Slot | Where it appears | Aspect | Size |
|---|---|---|---|
| `couple-portrait` | Cover, first polaroid (cropped square) | any, cropped 1:1 | 1000 px wide |
| `couple-proposal` | Cover, second polaroid (cropped square) | any, cropped 1:1 | 1000 px wide |
| `kea-photo` | Meet Kea, clipped print | any, cropped 4:5 | 900 px wide |
| `stephen-photo` | Meet Stephen, print | any, cropped 4:5 | 900 px wide |
| `content-plan` | Content plan slide, replaces the sample plan | about 16:10 | 1800 px wide |
| `love-1` to `love-5` | Client love, message screenshots | any, keeps its own shape | 900 px wide |

Export images as JPG (quality around 80) or WebP, under about 400 KB each. Photos
are cropped to fill their frame. Use `position` on a slot (for example "50% 20%")
to keep a face in view.

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
