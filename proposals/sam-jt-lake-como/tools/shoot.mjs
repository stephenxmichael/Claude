#!/usr/bin/env node
// Screenshots every slide at phone and desktop sizes, and reports any slide
// whose content overflows its screen. Usage: node tools/shoot.mjs [outDir]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(process.argv[2] || resolve(root, "../../build/sjt-shots"));
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const sizes = [["desktop", 1600, 900], ["laptop", 1366, 768], ["phone", 390, 844]];
for (const [name, width, height] of sizes) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await page.goto((process.env.BASE || "http://localhost:8765/") + "index.html#contents");
  await page.evaluate(() => document.fonts.ready);
  const ids = await page.$$eval(".slide", (s) => s.map((x) => x.id));
  for (const [i, id] of ids.entries()) {
    await page.evaluate((k) => document.querySelectorAll("#ticks button")[k].click(), i);
    await page.waitForTimeout(120);
    const o = await page.evaluate((id) => { const s = document.getElementById(id); return [s.scrollHeight, s.clientHeight, document.documentElement.scrollWidth > innerWidth]; }, id);
    if (o[0] > o[1] + 2 || o[2]) console.log(`${name} ${id}: content ${o[0]} > screen ${o[1]}${o[2] ? " (horizontal overflow)" : ""}`);
    await page.screenshot({ path: `${out}/${name}-${String(i + 1).padStart(2, "0")}-${id}.png` });
  }
  if (errs.length) console.log(name, "errors:", errs);
  await page.close();
}
await browser.close();
console.log("shots in", out);
