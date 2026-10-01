#!/usr/bin/env node
// Tiles build/pNN.png into build/sheet-A-B.png for quick review.
//   node scripts/sheet.mjs 1 6
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = createRequire(resolve(root, "../../package.json"))("playwright");
const [a, b] = [Number(process.argv[2] || 1), Number(process.argv[3] || 6)];
const imgs = [];
for (let i = a; i <= b; i++) imgs.push(`<img src="file://${root}/build/p${String(i).padStart(2, "0")}.png">`);
const cols = 3, w = 540;
const html = `<body style="margin:0;background:#333;display:grid;grid-template-columns:repeat(${cols},${w}px);gap:8px;padding:8px">${imgs.join("")}<style>img{width:${w}px;display:block}</style></body>`;
const br = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await br.newPage({ viewport: { width: cols * w + 8 * (cols + 1), height: 400 } });
const tmp = resolve(root, "build/sheet.html"); writeFileSync(tmp, html);
await p.goto("file://" + tmp); await p.waitForTimeout(300);
const out = resolve(root, `build/sheet-${a}-${b}.png`);
await p.screenshot({ path: out, fullPage: true }); await br.close(); console.log(out);
