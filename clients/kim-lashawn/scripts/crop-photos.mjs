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
  [D("kim-portrait.jpg"), "kim-cover.jpg", 305, 0, 707, 1414],
  [D("kim-portrait.jpg"), "kim-cover-wide.jpg", 0, 0, 1320, 1290],
  [D("kim-instagram.jpg"), "ig-glasses-orange.jpg", 322, 1488, 218, 290],
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
// Kim's profile screenshots in a burgundy phone frame with its drop shadow
// baked in, at 2x. A CSS box-shadow with blur doesn't survive the trip to PDF
// in every viewer; a transparent PNG does. Drawn in the deck at 332x564.5.
for (const name of ["tiktok", "instagram"]) {
  const data = "data:image/jpeg;base64," + readFileSync(resolve(root, "photos", `kim-${name}.jpg`)).toString("base64");
  const url = await p.evaluate(async (data) => {
    const img = new Image(); img.src = data; await img.decode();
    const S = 2, padX = 50 * S, padTop = 30 * S, padBottom = 80 * S;
    const fw = 232 * S, fh = 454.5 * S, sw = 216 * S, sh = 438.5 * S, inset = 8 * S;
    const c = document.createElement("canvas"); c.width = fw + 2 * padX; c.height = fh + padTop + padBottom;
    const x = c.getContext("2d");
    const rr = (l, t, w, h, r) => { x.beginPath(); x.roundRect(l, t, w, h, r); };
    x.save();
    x.shadowColor = "rgba(90,26,43,.24)"; x.shadowBlur = 44 * S; x.shadowOffsetY = 20 * S;
    rr(padX, padTop, fw, fh, 32 * S); x.fillStyle = "#5A1A2B"; x.fill();
    x.restore();
    rr(padX + inset, padTop + inset, sw, sh, 25 * S); x.save(); x.clip();
    x.drawImage(img, padX + inset, padTop + inset, sw, sh);
    x.restore();
    return c.toDataURL("image/png");
  }, data);
  writeFileSync(resolve(root, "photos", `phone-${name}.png`), Buffer.from(url.split(",")[1], "base64"));
}

// The Shooting Stars wordmark, tinted to the deck's deep text colour.
const logo = "data:image/png;base64," + readFileSync(resolve(root, "../../assets/Shooting_Stars_logo_1_blk.png")).toString("base64");
const tinted = await p.evaluate(async (src) => {
  const img = new Image(); img.src = src; await img.decode();
  const w = 800, h = Math.round(img.height * w / img.width);
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const x = c.getContext("2d"); x.drawImage(img, 0, 0, w, h);
  x.globalCompositeOperation = "source-in"; x.fillStyle = "#4A2C37"; x.fillRect(0, 0, w, h);
  return c.toDataURL("image/png");
}, logo);
writeFileSync(resolve(root, "logo-deep.png"), Buffer.from(tinted.split(",")[1], "base64"));
await b.close();
console.log("cropped", jobs.length, "+ 2 phone mockups + logo");
