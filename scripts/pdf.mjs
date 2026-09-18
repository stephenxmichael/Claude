#!/usr/bin/env node
// Exports the book to PDF at exactly one .page per PDF page, 800x1120,
// so it drops into Canva one-for-one against the original 42 pages.
import { chromium } from "playwright";
import { mkdirSync, statSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pickProduct } from "./products.mjs";

const { product } = pickProduct(process.argv.slice(2));
const OUT = product.pdf;
mkdirSync("dist", { recursive: true });

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 800, height: 1120 } });

await page.goto("file://" + resolve(product.out), { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

// Same guard as the screenshot pass: a fallback serif here would ship a
// broken PDF that looks fine in a thumbnail.
const ok = await page.evaluate((probe) => {
  const m = (f) => {
    const s = document.createElement("span");
    s.style.cssText = `position:absolute;left:-9999px;font-size:100px;font-family:${f};white-space:pre`;
    s.textContent = probe;
    document.body.appendChild(s);
    const w = s.offsetWidth; s.remove(); return w;
  };
  const serif = m("serif");
  return m("Anton") !== serif && m("Archivo") !== serif && m("'JetBrains Mono'") !== serif;
}, product.probe);
if (!ok) {
  await browser.close();
  throw new Error("fonts fell back to serif; refusing to write a broken PDF");
}

const count = await page.evaluate(() => document.querySelectorAll(".page").length);

await page.pdf({
  path: OUT,
  width: "800px",
  height: "1120px",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  pageRanges: `1-${count}`,
});

await browser.close();

// Skia emits 1px edge-clamp strips beside any image it has to crop and
// downscale (background-size:cover with a mismatched aspect). Robust readers
// draw them under the photo; iOS drew them OVER it, smearing p38 into colour
// bands. Draw photos 1:1 from a pre-cropped file instead — and fail here if
// a clamp strip ever lands next to a photo again.
const pdf = readFileSync(OUT);
const objs = [];
for (const m of pdf.toString("latin1").matchAll(/\/Subtype\s*\/Image/g)) {
  const head = pdf.toString("latin1", Math.max(0, m.index - 600), m.index + 400);
  const w = head.match(/\/Width\s+(\d+)/), h = head.match(/\/Height\s+(\d+)/);
  if (!w || !h) continue;
  objs.push({ w: +w[1], h: +h[1], photo: head.includes("DCTDecode") });
}
const bad = objs.filter((o, i) =>
  (o.w === 1 || o.h === 1) &&
  [objs[i - 1], objs[i + 1], objs[i - 2], objs[i + 2]].some((n) => n?.photo));
if (bad.length) {
  throw new Error(
    `${bad.length} edge-clamp strip(s) sit beside a photo ` +
    `(${bad.map((b) => `${b.w}x${b.h}`).join(", ")}). ` +
    `A cropped background-image will smear on iOS — pre-crop it and use <img>.`);
}

console.log(`${OUT}  —  ${count} pages, ${(statSync(OUT).size / 1024 / 1024).toFixed(1)}MB, no clamp strips beside photos`);
