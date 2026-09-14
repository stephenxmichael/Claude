#!/usr/bin/env node
// Layout audit. Screenshots tell you a page looks wrong; this tells you why.
//
// Reports, per page:
//   OVERFLOW  content crossing the page edge or sitting under the spine
//   MARGIN    content breaking the 74px side margin or 56px HUD band
//   GAP       a vertical dead zone between content blocks
//   TIGHT     two blocks nearly touching
//
// Usage: node scripts/audit.mjs [from] [to]
import { chromium } from "playwright";
import { resolve } from "node:path";

const W = 800, H = 1120;
const LEFT = 74, RIGHT = 74, HUD = 56, SPINE = 34;
// Calibrated against Stephen's own pages 1-12, which are the reference for
// what "correct" looks like. He routinely leaves 300px of air mid-page, so a
// gap is only worth reporting past that; anything tighter is his house style.
const GAP_LIMIT = 330;  // vertical emptiness beyond anything in the reference pages
const TIGHT_LIMIT = 5;  // blocks this close are probably colliding

const args = process.argv.slice(2);
const from = args[0] ? +args[0] : 1;
const to = args[1] ? +args[1] : Infinity;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: W + 120, height: H } });
await page.goto("file://" + resolve("dist/shooting-stars-ebook.html"), { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const report = await page.evaluate(
  ({ W, H, LEFT, RIGHT, HUD, SPINE, GAP_LIMIT, TIGHT_LIMIT }) => {
    // Running marks are positioned deliberately and are not content.
    const CHROME = ["glow", "spine", "ticks", "hud", "folio", "tag"];
    const out = [];

    document.querySelectorAll(".page").forEach((pg, idx) => {
      const pr = pg.getBoundingClientRect();
      const issues = [];
      const blocks = [];

      [...pg.children].forEach((el) => {
        if (CHROME.some((c) => el.classList.contains(c))) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        const b = {
          top: Math.round(r.top - pr.top),
          bottom: Math.round(r.bottom - pr.top),
          left: Math.round(r.left - pr.left),
          right: Math.round(r.right - pr.left),
          tag: el.className || el.tagName.toLowerCase(),
        };
        blocks.push(b);

        // Ghost numerals, glows and watermarks are meant to bleed past the
        // margins; only flag elements that carry actual reading content.
        const cs = getComputedStyle(el);
        const ghostType = el.classList.contains("display") && cs.webkitTextFillColor === "rgba(0, 0, 0, 0)";
        const watermark = parseFloat(cs.opacity) < 0.25;
        const bleeds = ghostType || watermark || (el.classList.contains("display") && r.height > 200);
        if (!bleeds) {
          if (b.left < SPINE) issues.push(`OVERFLOW  ${b.tag} left=${b.left} under the ${SPINE}px spine`);
          else if (b.left < LEFT - 2) issues.push(`MARGIN    ${b.tag} left=${b.left} breaks the ${LEFT}px margin`);
          if (b.right > W - RIGHT + 2) issues.push(`MARGIN    ${b.tag} right=${b.right} breaks the ${RIGHT}px margin`);
          if (b.top < HUD - 2 && b.top >= 0) issues.push(`MARGIN    ${b.tag} top=${b.top} sits in the ${HUD}px HUD band`);
          if (b.bottom > H) issues.push(`OVERFLOW  ${b.tag} bottom=${b.bottom} runs off the page (${H})`);
          if (b.top < 0) issues.push(`OVERFLOW  ${b.tag} top=${b.top} runs off the top`);
        }
      });

      // Vertical dead zones, measured over the union of content bands so that
      // side-by-side blocks do not read as a gap.
      const bands = blocks
        .filter((b) => !(b.bottom - b.top > 200 && b.right - b.left > 300 && b.tag.includes("display")))
        .map((b) => [b.top, b.bottom])
        .sort((a, z) => a[0] - z[0]);
      const merged = [];
      for (const [s, e] of bands) {
        if (merged.length && s <= merged[merged.length - 1][1] + 1) {
          merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], e);
        } else merged.push([s, e]);
      }
      for (let i = 1; i < merged.length; i++) {
        const gap = merged[i][0] - merged[i - 1][1];
        if (gap > GAP_LIMIT) issues.push(`GAP       ${gap}px of dead space at y=${merged[i - 1][1]}..${merged[i][0]}`);
        else if (gap >= 0 && gap < TIGHT_LIMIT) issues.push(`TIGHT     ${gap}px between blocks at y=${merged[i - 1][1]}`);
      }
      if (merged.length) {
        const tailGap = H - merged[merged.length - 1][1];
        if (tailGap > GAP_LIMIT) issues.push(`GAP       ${tailGap}px of dead space below y=${merged[merged.length - 1][1]}`);
      }

      const label = pg.previousElementSibling?.classList.contains("tag")
        ? pg.previousElementSibling.textContent : "";
      out.push({ n: idx + 1, label, issues });
    });
    return out;
  },
  { W, H, LEFT, RIGHT, HUD, SPINE, GAP_LIMIT, TIGHT_LIMIT }
);

await browser.close();

let total = 0;
for (const p of report) {
  if (p.n < from || p.n > to) continue;
  if (!p.issues.length) {
    console.log(`p${String(p.n).padStart(2, "0")}  clean        ${p.label}`);
    continue;
  }
  total += p.issues.length;
  console.log(`p${String(p.n).padStart(2, "0")}  ${p.issues.length} issue(s)   ${p.label}`);
  for (const i of p.issues) console.log(`        ${i}`);
}
console.log(`\n${total} issue(s) across pages ${from}..${to === Infinity ? report.length : to}`);
