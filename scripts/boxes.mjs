#!/usr/bin/env node
// Prints the box of every direct child of a page, in document order, and
// flags any two stacked full-width blocks that overlap.
//
// audit.mjs merges overlapping bands before measuring gaps, so a block that
// sits ON TOP of another reads as one tall band and is never reported. This
// catches that case while a page is being laid out.
//
//   node scripts/boxes.mjs iphone 3
import { chromium } from "playwright";
import { resolve } from "node:path";
import { pickProduct } from "./products.mjs";

const { product, rest } = pickProduct(process.argv.slice(2));
const want = rest[0] ? +rest[0] : 1;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 920, height: 1120 } });
await page.goto("file://" + resolve(product.out), { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const out = await page.evaluate((n) => {
  const CHROME = ["glow", "band", "spine", "ticks", "frames", "vf", "hud", "folio", "tag"];
  const pg = document.querySelectorAll(".page")[n - 1];
  if (!pg) return null;
  const pr = pg.getBoundingClientRect();
  return [...pg.children]
    .filter((el) => !CHROME.some((c) => el.classList.contains(c)))
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        top: Math.round(r.top - pr.top), bottom: Math.round(r.bottom - pr.top),
        left: Math.round(r.left - pr.left), right: Math.round(r.right - pr.left),
        cls: (el.className || el.tagName).toString().slice(0, 30),
        txt: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 44),
      };
    })
    .filter((b) => b.bottom > b.top);
}, want);

await browser.close();
if (!out) { console.error(`no page ${want}`); process.exit(1); }

console.log(`${product.name} — page ${want}\n`);
for (const b of out) {
  console.log(`  y ${String(b.top).padStart(4)}..${String(b.bottom).padStart(4)}  ` +
              `x ${String(b.left).padStart(3)}..${String(b.right).padStart(3)}  ${b.txt}`);
}
// overlap between blocks that share horizontal space
let bad = 0;
for (let i = 0; i < out.length; i++) for (let j = i + 1; j < out.length; j++) {
  const a = out[i], c = out[j];
  const xo = Math.min(a.right, c.right) - Math.max(a.left, c.left);
  const yo = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top);
  if (xo > 40 && yo > 0) {
    console.log(`\n  COLLIDE  ${yo}px  "${a.txt.slice(0,26)}" x "${c.txt.slice(0,26)}"`);
    bad++;
  }
}
console.log(bad ? `\n${bad} collision(s)` : "\nno collisions");
