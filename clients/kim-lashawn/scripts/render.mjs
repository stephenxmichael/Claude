#!/usr/bin/env node
// Screenshots every page, flags overflow, and exports the PDF.
//   node scripts/render.mjs          -> build/pNN.png + overflow report
//   node scripts/render.mjs --pdf    -> also writes the PDF
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(resolve(root, "../../package.json"));
const { chromium } = require("playwright");

const SRC = resolve(root, "kim-lashawn-first-30-days.html");
const PDF = resolve(root, "Kim-LaShawn-First-30-Days-of-Content.pdf");
mkdirSync(resolve(root, "build"), { recursive: true });

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.goto("file://" + SRC, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const fontsOk = await page.evaluate(() => {
  const m = (f) => { const s = document.createElement("span");
    s.style.cssText = `position:absolute;font-size:100px;font-family:${f};white-space:pre`;
    s.textContent = "Becoming at 50+"; document.body.appendChild(s);
    const w = s.offsetWidth; s.remove(); return w; };
  const serif = m("serif"), sans = m("sans-serif");
  return ["Archivo", "Allura", "Inter", "'JetBrains Mono'"].every((f) => m(f) !== serif && m(f) !== sans);
});
if (!fontsOk) { await browser.close(); throw new Error("fonts fell back; refusing to render"); }

// Overflow: any element whose box leaves its page, or a .content child past .content's bottom.
const problems = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll(".page").forEach((pg, i) => {
    const pr = pg.getBoundingClientRect();
    const c = pg.querySelector(".content");
    if (c) {
      const cb = c.getBoundingClientRect().bottom;
      c.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.height && r.bottom > cb + 1) out.push(`p${i + 1}: ${el.className || el.tagName} overflows content by ${Math.round(r.bottom - cb)}px`);
      });
    }
    pg.querySelectorAll("*").forEach((el) => {
      if (el.scrollHeight > el.clientHeight + 2 && getComputedStyle(el).overflow === "hidden" && !el.classList.contains("page") && !el.classList.contains("core"))
        out.push(`p${i + 1}: ${el.className} clips text`);
    });
  });
  return [...new Set(out)];
});
console.log(problems.length ? problems.join("\n") : "no overflow");

const pages = await page.$$(".page");
for (let i = 0; i < pages.length; i++)
  await pages[i].screenshot({ path: resolve(root, `build/p${String(i + 1).padStart(2, "0")}.png`) });
console.log(`${pages.length} pages shot`);

if (process.argv.includes("--pdf")) {
  await page.pdf({ path: PDF, width: "1080px", height: "1350px", printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" } });
  console.log("wrote", PDF);
}
await browser.close();
