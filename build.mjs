#!/usr/bin/env node
// Assembles <src>/head.html + <src>/pages/p*.html + <src>/tail.html into one
// self-contained file. Assets stay as file references (assets/*.png), never
// inlined as base64.
//
//   node build.mjs            the Content Framework  -> dist/shooting-stars-ebook.html
//   node build.mjs iphone     the iPhone Creator Guide -> dist/iphone-creator-guide.html
import { readFileSync, writeFileSync, readdirSync, mkdirSync, cpSync } from "node:fs";
import { join } from "node:path";
import { pickProduct } from "./scripts/products.mjs";

const { product } = pickProduct(process.argv.slice(2));
const SRC = product.src;
const OUT = product.out;

const pages = readdirSync(join(SRC, "pages"))
  .filter((f) => /^p\d+\.html$/.test(f))
  .sort();

const head = readFileSync(join(SRC, "head.html"), "utf8");
const tail = readFileSync(join(SRC, "tail.html"), "utf8");
const body = pages.map((f) => readFileSync(join(SRC, "pages", f), "utf8").trimEnd()).join("\n");

mkdirSync("dist", { recursive: true });
writeFileSync(OUT, head + body + "\n" + tail);
// dist/ ships as a self-contained folder: the book plus the assets it points at.
cpSync("assets", "dist/assets", { recursive: true });

console.log(`built ${OUT}  —  ${pages.length} pages, ${(head.length + body.length) / 1024 | 0}KB`);
for (const f of pages) {
  const t = readFileSync(join(SRC, "pages", f), "utf8").match(/<div class="tag">([^<]*)<\/div>/);
  console.log(`  ${f}  ${t ? t[1] : ""}`);
}
