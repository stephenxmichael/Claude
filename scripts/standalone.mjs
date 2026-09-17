#!/usr/bin/env node
// Builds the shippable single-file HTML: dist/shooting-stars-ebook.html with
// every asset inlined as a data URI, so it opens anywhere with no folder
// alongside it. Run after build.mjs.
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = "dist/shooting-stars-ebook.html";
const OUT = "dist/Shooting-Stars-Content-Framework.html";
const MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", svg: "image/svg+xml", webp: "image/webp" };

const cache = new Map();
const missing = new Set();
function dataUri(path) {
  if (cache.has(path)) return cache.get(path);
  const file = join("dist", path);
  if (!existsSync(file)) { missing.add(path); return null; }
  const ext = path.split(".").pop().toLowerCase();
  const uri = `data:${MIME[ext] ?? "application/octet-stream"};base64,${readFileSync(file).toString("base64")}`;
  cache.set(path, uri);
  return uri;
}

let html = readFileSync(SRC, "utf8");
const swap = (pre, path, post) => { const u = dataUri(path); return u ? pre + u + post : pre + path + post; };
html = html.replace(/(src=")(assets\/[^"]+)(")/g, (_, a, b, c) => swap(a, b, c));
html = html.replace(/(url\(')(assets\/[^']+)('\))/g, (_, a, b, c) => swap(a, b, c));
html = html.replace("</head>", "<style>.tag{display:none}</style></head>");

writeFileSync(OUT, html);
if (missing.size) console.warn("missing assets:", [...missing].join(", "));
console.log(`${OUT}  —  ${cache.size} assets inlined, ${(statSync(OUT).size / 1048576).toFixed(1)}MB`);
