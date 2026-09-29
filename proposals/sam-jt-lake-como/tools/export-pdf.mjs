#!/usr/bin/env node
// Exports the deck to a clickable PDF: one 16:9 page per slide, every
// state shown (both options, all terms open), contents and folio links
// jump between pages, and the CTA and Instagram links stay live.
//
//   npx serve . -l 8765   (or: python3 -m http.server 8765)
//   node tools/export-pdf.mjs
import { chromium } from "playwright";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { statSync } from "node:fs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(root, "pdf", process.env.OUT || "Sam-and-JT-Lake-Como-Proposal.pdf");
const BASE = process.env.BASE || "http://localhost:8765/";

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, reducedMotion: "reduce" });
await page.goto(BASE + "index.html", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

// Refuse to ship a PDF set in fallback fonts: every face the deck asked for must have loaded.
const faces = await page.evaluate(async () => {
  await document.fonts.ready;
  const used = [...document.fonts].filter((f) => f.status !== "unloaded");
  return { loaded: used.filter((f) => f.status === "loaded").length, failed: used.filter((f) => f.status === "error").map((f) => f.family) };
});
if (!faces.loaded || faces.failed.length) { await browser.close(); throw new Error(`fonts did not load (${faces.failed.join(", ") || "none loaded"}); serve the folder over http and retry.`); }

await page.emulateMedia({ media: "print" });
await page.evaluate(() => { window.dispatchEvent(new Event("beforeprint")); window.dispatchEvent(new Event("resize")); });
await page.waitForTimeout(400);
const n = await page.evaluate(() => document.querySelectorAll(".slide").length);
await page.pdf({ path: OUT, width: "1600px", height: "900px", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`wrote ${OUT}  ${n} pages  ${(statSync(OUT).size / 1024 / 1024).toFixed(1)} MB`);
