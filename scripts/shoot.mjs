#!/usr/bin/env node
// Screenshots every page of the built book so they can actually be looked at
// before being shown to anyone. Usage:
//   node scripts/shoot.mjs            all pages
//   node scripts/shoot.mjs 13 24      pages 13..24 only
//   node scripts/shoot.mjs 13 24 --sheet   also write a contact sheet
//   node scripts/shoot.mjs iphone     the iPhone Creator Guide instead
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pickProduct } from "./products.mjs";

const { product, rest: argvRest } = pickProduct(process.argv.slice(2));

const PAGE_W = 800;
const PAGE_H = 1120;

const args = argvRest.filter((a) => !a.startsWith("--"));
const from = args[0] ? parseInt(args[0], 10) : 1;
const to = args[1] ? parseInt(args[1], 10) : Infinity;

mkdirSync(product.screens, { recursive: true });

// The sandbox ships a pinned Chromium that may not match the npm playwright
// build, so point at it directly rather than downloading another one.
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({
  viewport: { width: PAGE_W + 120, height: PAGE_H },
  deviceScaleFactor: 1,
});

const url = "file://" + resolve(product.out);
await page.goto(url, { waitUntil: "networkidle" });

// Fonts must be fully resolved or Anton silently falls back and every headline
// measures wrong. document.fonts.check() is useless here — with zero registered
// faces it still returns true — so compare rendered width against the generic
// serif the browser would otherwise substitute.
await page.evaluate(() => document.fonts.ready);
const fontCheck = await page.evaluate((probe) => {
  const measure = (family) => {
    const s = document.createElement("span");
    s.style.cssText = `position:absolute;left:-9999px;font-size:100px;font-family:${family};white-space:pre`;
    s.textContent = probe;
    document.body.appendChild(s);
    const w = s.offsetWidth;
    s.remove();
    return w;
  };
  const serif = measure("serif");
  return {
    anton: measure("Anton") !== serif,
    archivo: measure("Archivo") !== serif,
    mono: measure("'JetBrains Mono'") !== serif,
  };
}, product.probe);
if (!fontCheck.anton || !fontCheck.archivo || !fontCheck.mono) {
  console.error("FONT LOAD FAILURE — pages would render in fallback serif:", fontCheck);
  process.exitCode = 1;
}

// Any image that failed to load is a broken page, not a cosmetic issue.
const brokenImgs = await page.evaluate(() =>
  [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute("src"))
);
if (brokenImgs.length) {
  console.error("BROKEN IMAGES:", [...new Set(brokenImgs)]);
  process.exitCode = 1;
}

const els = await page.$$(".page");
console.log(`${product.name}: found ${els.length} pages; shooting ${from}..${Math.min(to, els.length)}`);

const shot = [];
for (let i = 0; i < els.length; i++) {
  const n = i + 1;
  if (n < from || n > to) continue;
  const f = `${product.screens}/p${String(n).padStart(2, "0")}.png`;
  await els[i].screenshot({ path: f });
  shot.push(f);
  console.log("  " + f);
}

await browser.close();
console.log(`\n${shot.length} screenshots written. fonts:`, fontCheck);
