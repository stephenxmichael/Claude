#!/usr/bin/env node
// Exports the book to PDF at exactly one .page per PDF page, 800x1120,
// so it drops into Canva one-for-one against the original 42 pages.
import { chromium } from "playwright";
import { mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

const OUT = "dist/Shooting-Stars-Content-Framework.pdf";
mkdirSync("dist", { recursive: true });

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 800, height: 1120 } });

await page.goto("file://" + resolve("dist/shooting-stars-ebook.html"), { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

// Same guard as the screenshot pass: a fallback serif here would ship a
// broken PDF that looks fine in a thumbnail.
const ok = await page.evaluate(() => {
  const m = (f) => {
    const s = document.createElement("span");
    s.style.cssText = `position:absolute;left:-9999px;font-size:100px;font-family:${f};white-space:pre`;
    s.textContent = "CONTENT FRAMEWORK 0123";
    document.body.appendChild(s);
    const w = s.offsetWidth; s.remove(); return w;
  };
  const serif = m("serif");
  return m("Anton") !== serif && m("Archivo") !== serif && m("'JetBrains Mono'") !== serif;
});
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
console.log(`${OUT}  —  ${count} pages, ${(statSync(OUT).size / 1024 / 1024).toFixed(1)}MB`);
