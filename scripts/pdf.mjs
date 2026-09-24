#!/usr/bin/env node
// Exports the book to PDF at exactly one .page per PDF page, 800x1120,
// so it drops into Canva one-for-one against the original 42 pages.
import { chromium } from "playwright";
import { mkdirSync, statSync, writeFileSync } from "node:fs";
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

// A blurred box-shadow or text-shadow has no PDF equivalent, so Chrome writes
// it as a fill behind a luminosity soft mask. iOS ignores that mask and paints
// the fill as a solid block: the sheet 03 Polaroid printed as a grey rectangle.
// Cast soft shadows with filter:drop-shadow() instead, which Chrome flattens
// into an ordinary transparent image that every viewer draws. A zero-blur
// shadow is plain vector and is fine.
const blurred = await page.evaluate(() => {
  const split = (v) => {
    const out = []; let depth = 0, cur = "";
    for (const ch of v) {
      if (ch === "(") depth++;
      if (ch === ")") depth--;
      if (ch === "," && !depth) { out.push(cur); cur = ""; } else cur += ch;
    }
    return cur ? [...out, cur] : out;
  };
  const pages = [...document.querySelectorAll(".page")];
  const bad = [];
  for (const el of document.querySelectorAll(".page *")) {
    const s = getComputedStyle(el);
    for (const [prop, name] of [["boxShadow", "box-shadow"], ["textShadow", "text-shadow"]]) {
      if (s[prop] === "none") continue;
      for (const sh of split(s[prop])) {
        const px = sh.replace(/rgba?\([^)]*\)/g, "").match(/-?[\d.]+px/g) || [];
        if (parseFloat(px[2] || "0") > 0)
          bad.push(`sheet ${pages.indexOf(el.closest(".page")) + 1}: <${el.tagName.toLowerCase()}> `
                 + `"${(el.textContent || "").trim().slice(0, 24)}" ${name}: ${sh.trim()}`);
      }
    }
  }
  return bad;
});
if (blurred.length) {
  await browser.close();
  throw new Error(`blurred shadow would print as a solid block on iOS —\n  ${blurred.join("\n  ")}`);
}

const pdf = await page.pdf({
  width: "800px",
  height: "1120px",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  pageRanges: `1-${count}`,
});

await browser.close();

// Backstop for the rule above, on the file itself. The failing construct is a
// luminosity soft mask whose group paints an image (the blurred shadow, as a
// greyscale JPEG). Luminosity masks that paint a gradient are fine on iOS and
// the book carries ~170 of them, one per plate corner mark, so only masks that
// paint an image are refused. Chrome writes its dictionaries uncompressed.
const text = pdf.toString("latin1");
const at = new Map();
for (const m of text.matchAll(/(?:^|[\r\n])(\d+) 0 obj\b/g)) at.set(m[1], m.index);
const dict = (n) => {
  const i = at.get(n);
  if (i === undefined) return "";
  const s = text.indexOf("stream", i), e = text.indexOf("endobj", i);
  return text.slice(i, Math.min(s < 0 ? Infinity : s, e < 0 ? Infinity : e));
};
const imageMasks = [...text.matchAll(/\/S \/Luminosity\s*\/G (\d+) 0 R/g)].filter(([, g]) => {
  const xo = dict(g).match(/\/XObject\s*<<([^>]*)>>/);
  return xo && [...xo[1].matchAll(/(\d+) 0 R/g)].some(([, x]) => /\/Subtype \/Image/.test(dict(x)));
}).length;
if (imageMasks)
  throw new Error(`the PDF carries ${imageMasks} soft mask(s) that paint an image, which iOS draws `
                + "as solid blocks; refusing to write it. Look for a blurred shadow or a CSS mask.");

// iOS (Files, Drive, Quick Look) renders every tiling pattern into a bitmap
// the size of its tile. Chrome gives each non-repeating background layer a
// full-page tile, so a page with dozens of them runs the viewer out of memory
// and it quits: 48 per page, one per grid line, closed Files and Drive at
// sheet 03. A healthy build has none; allow a handful, refuse the pattern.
const pageTiles = [...at.keys()].filter((n) => {
  const d = dict(n);
  const bb = /\/PatternType 1\b/.test(d) && d.match(/\/BBox \[([-\d. ]+)\]/);
  if (!bb) return false;
  const [x0, y0, x1, y1] = bb[1].trim().split(/\s+/).map(Number);
  return (x1 - x0) * (y1 - y0) >= 2400 * 3400;
}).length;
if (pageTiles > 4)
  throw new Error(`the PDF carries ${pageTiles} full-page tiling patterns; iOS builds a page-sized bitmap `
                + "for each and quits. Look for a stack of non-repeating CSS background layers.");
writeFileSync(OUT, pdf);


console.log(`${OUT}  —  ${count} pages, ${(statSync(OUT).size / 1024 / 1024).toFixed(1)}MB, every photo drawn 1:1`);
