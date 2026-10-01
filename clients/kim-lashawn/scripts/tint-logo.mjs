#!/usr/bin/env node
// Writes logo-plum.png: the Shooting Stars wordmark recoloured to the deck's plum
// and scaled down. (CSS masks can't load file:// images, so the tint is baked in.)
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = createRequire(resolve(root, "../../package.json"))("playwright");
const src = "data:image/png;base64," + readFileSync(resolve(root, "../../assets/Shooting_Stars_logo_1_blk.png")).toString("base64");
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage();
const url = await p.evaluate(async (src) => {
  const img = new Image(); img.src = src; await img.decode();
  const w = 800, h = Math.round(img.height * w / img.width);
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const x = c.getContext("2d"); x.drawImage(img, 0, 0, w, h);
  x.globalCompositeOperation = "source-in"; x.fillStyle = "#4A2340"; x.fillRect(0, 0, w, h);
  return c.toDataURL("image/png");
}, src);
writeFileSync(resolve(root, "logo-plum.png"), Buffer.from(url.split(",")[1], "base64"));
await b.close();
