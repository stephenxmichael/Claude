#!/usr/bin/env node
// Pre-crops Kim's photos to the exact frames the PDF draws them in. Drawing a
// photo 1:1 (no object-fit crop) keeps Skia from emitting edge-clamp strips
// that iOS paints over the image.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = createRequire(resolve(root, "../../package.json"))("playwright");
const D = (f) => resolve(root, "design", f);
// [source, out, sx, sy, sw, sh]
const jobs = [
  [D("kim-tiktok.jpg"), "tile-becoming.jpg", 301, 1034, 298, 396],
  [D("kim-tiktok.jpg"), "tile-lifestyle.jpg", 602, 635, 298, 396],
  [D("kim-tiktok.jpg"), "tile-style.jpg", 301, 1431, 298, 396],
  [D("kim-portrait.jpg"), "kim-close.jpg", 330, 90, 660, 660],
  [D("kim-portrait.jpg"), "kim-cover.jpg", 0, 0, 1320, 1290],
  [D("kim-camera.jpg"), "kim-letter.jpg", 0, 0, 1100, 1453],
  [D("kim-tiktok.jpg"), "kim-tiktok.jpg", 0, 0, 900, 1827],
  [D("kim-instagram.jpg"), "kim-instagram.jpg", 0, 0, 900, 1827],
];
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage();
for (const [src, out, sx, sy, sw, sh] of jobs) {
  const data = "data:image/jpeg;base64," + readFileSync(src).toString("base64");
  const url = await p.evaluate(async ([data, sx, sy, sw, sh]) => {
    const img = new Image(); img.src = data; await img.decode();
    const c = document.createElement("canvas"); c.width = sw; c.height = sh;
    c.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    return c.toDataURL("image/jpeg", 0.9);
  }, [data, sx, sy, sw, sh]);
  writeFileSync(resolve(root, "photos", out), Buffer.from(url.split(",")[1], "base64"));
}
await b.close();
console.log("cropped", jobs.length);
