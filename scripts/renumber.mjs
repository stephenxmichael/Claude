#!/usr/bin/env node
// Re-derives each page's folio and tag number from its position in the sorted
// page list, so pages can be inserted or reordered by filename alone.
import { readFileSync, writeFileSync, readdirSync, renameSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/pages";
const files = readdirSync(DIR).filter((f) => /^p\d+\.html$/.test(f)).sort();

// pass 1: normalise filenames to a dense p01..pNN sequence
const tmp = files.map((f, i) => {
  const want = `p${String(i + 1).padStart(2, "0")}.html`;
  if (f !== want) {
    renameSync(join(DIR, f), join(DIR, `__${want}`));
    return `__${want}`;
  }
  return f;
});
for (const f of tmp) {
  if (f.startsWith("__")) renameSync(join(DIR, f), join(DIR, f.slice(2)));
}

// pass 2: rewrite the folio and the tag's page prefix to match
const final = readdirSync(DIR).filter((f) => /^p\d+\.html$/.test(f)).sort();
let changed = 0;
final.forEach((f, i) => {
  const n = i + 1;
  const pad = String(n).padStart(2, "0");
  const p = join(DIR, f);
  const before = readFileSync(p, "utf8");
  const after = before
    .replace(/<div class="folio">\d+<\/div>/, `<div class="folio">${pad}</div>`)
    .replace(/(<div class="tag">)P\.\d+\s*—/, `$1P.${pad} —`);
  if (after !== before) { writeFileSync(p, after); changed++; }
});
console.log(`${final.length} pages, ${changed} renumbered`);
