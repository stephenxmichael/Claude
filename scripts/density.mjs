#!/usr/bin/env node
// Reports how crowded each page is: how many content rows it carries, how
// much vertical gutter sits between them, and how much running text it holds.
// Sheet 03 is the reference — five rows on ~34px gutters.
import { chromium } from "playwright";
import { pickProduct } from "./products.mjs";

const { product } = pickProduct(process.argv.slice(2));
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage();
await p.goto("file://" + process.cwd() + "/" + product.out);
await p.evaluate(async () => {
  await Promise.all(["Anton", "Archivo", "JetBrains Mono"].map((f) => document.fonts.load(`100px '${f}'`)));
  await document.fonts.ready;
});

const CHROME = /\b(glow|band|spine|ticks|frames|vf|hud|folio|tag)\b/;
const rows = await p.evaluate((chrome) => {
  const re = new RegExp(chrome);
  return [...document.querySelectorAll(".page")].map((pg) => {
    const top = pg.getBoundingClientRect().top;
    const boxes = [...pg.children]
      .filter((el) => !re.test(el.className))
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { y1: Math.round(r.top - top), y2: Math.round(r.bottom - top), t: (el.innerText || "").trim() };
      })
      .filter((x) => x.y2 > x.y1)
      .sort((a, b) => a.y1 - b.y1);
    // merge boxes that share a horizontal band into one row
    const merged = [];
    for (const x of boxes) {
      const last = merged[merged.length - 1];
      if (last && x.y1 < last.y2 - 8) { last.y2 = Math.max(last.y2, x.y2); last.n++; last.chars += x.t.length; }
      else merged.push({ y1: x.y1, y2: x.y2, n: 1, chars: x.t.length });
    }
    return merged;
  });
}, CHROME.source);

console.log(`${product.name}\n`);
console.log("  pg  rows  gutters (px)                       min  words");
rows.forEach((r, i) => {
  const gaps = r.slice(1).map((x, j) => x.y1 - r[j].y2);
  const words = r.reduce((s, x) => s + x.chars, 0) / 5.4 | 0;
  const min = gaps.length ? Math.min(...gaps) : 0;
  const flag = min < 22 ? " <<" : words > 330 ? "  <" : "";
  console.log(
    `  ${String(i + 1).padStart(2)}  ${String(r.length).padStart(4)}  ` +
    gaps.map((g) => String(g).padStart(4)).join("").padEnd(34) +
    `${String(min).padStart(4)} ${String(words).padStart(6)}${flag}`);
});
console.log("\n  reference: sheet 03 runs 5 rows, min gutter 34, ~200 words");
console.log("  <<  gutter under 22px     <  over 330 words");
await b.close();
