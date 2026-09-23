#!/usr/bin/env node
// Exports the book to PDF at exactly one .page per PDF page, 800x1120,
// so it drops into Canva one-for-one against the original 42 pages.
import { chromium } from "playwright";
import { mkdirSync, statSync } from "node:fs";
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

// Photos are drawn 1:1 from a pre-cropped file. Scaling one into a box of a
// different aspect is the authoring mistake that smeared p38 on iOS, so catch
// it here in the DOM where it is unambiguous.
//
// This replaces a forensic check on the written PDF that counted 1px edge-clamp
// strips beside photo objects. That check was measured and does not work: the
// book carries ~20 such strips from CSS gradients (the plate hatch, the grain
// overlay, the bands), it carried them before any photograph was placed, and
// the count is byte-identical whether a photo is drawn 1:1 or forced through
// background-size:cover at the wrong aspect. It could only ever fail honest
// builds for sitting near a photo in the object stream, which it did.
const scaled = await page.evaluate(() => {
  const bad = [];
  for (const el of document.querySelectorAll(".page img")) {
    const r = el.getBoundingClientRect();
    if (!el.naturalWidth || !r.width || !r.height) continue;
    if (Math.abs(r.width / r.height - el.naturalWidth / el.naturalHeight) > 0.01)
      bad.push(`${el.getAttribute("src")} drawn ${Math.round(r.width)}x${Math.round(r.height)} `
             + `from ${el.naturalWidth}x${el.naturalHeight}`);
  }
  for (const el of document.querySelectorAll(".page *")) {
    const s = getComputedStyle(el);
    if (/url\(["']?(?!data:)[^"')]+\.(jpe?g|png|webp)/i.test(s.backgroundImage)
        && /cover|contain/.test(s.backgroundSize))
      bad.push(`${el.tagName.toLowerCase()}.${el.className || "?"} draws a photo with `
             + `background-size:${s.backgroundSize} — pre-crop it and use <img>`);
  }
  return bad;
});
if (scaled.length) {
  await browser.close();
  throw new Error(`photo not drawn 1:1 —\n  ${scaled.join("\n  ")}`);
}

await page.pdf({
  path: OUT,
  width: "800px",
  height: "1120px",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  pageRanges: `1-${count}`,
});

await browser.close();


console.log(`${OUT}  —  ${count} pages, ${(statSync(OUT).size / 1024 / 1024).toFixed(1)}MB, every photo drawn 1:1`);
