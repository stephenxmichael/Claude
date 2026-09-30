#!/usr/bin/env node
// Builds one self-contained HTML file (CSS, JS, fonts and any local media
// inlined) that opens by double-click, email or AirDrop with no server.
//   node tools/build-standalone.mjs  ->  pdf/Sam-and-JT-Lake-Como.html
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");
const MIME = { ".woff2": "font/woff2", ".mp4": "video/mp4", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };
const dataUri = (p) => `data:${MIME[extname(p).toLowerCase()] || "application/octet-stream"};base64,${readFileSync(resolve(root, p)).toString("base64")}`;
const css = (p) => read(p).replace(/url\("\.\.\/fonts\/([^"]+)"\)/g, (_, f) => `url("${dataUri("assets/fonts/" + f)}")`);
const js = (p) => read(p).replace(/<\/script/gi, "<\\/script");

// Inline media files that content.js points at, so filled slots travel with the file.
let content = read("content.js");
content = content.replace(/"(media\/[^"]+\.(?:mp4|jpe?g|png|webp|svg))"/g, (m, p) => (existsSync(resolve(root, p)) ? `"${dataUri(p)}"` : m));

let html = read("index.html");
html = html
  .replace('<link rel="stylesheet" href="assets/css/deck.css">', () => `<style>\n${css("assets/css/deck.css")}\n</style>`)
  .replace('<link rel="stylesheet" href="assets/css/type.css">', () => `<style>\n${css("assets/css/type.css")}\n</style>`)
  .replace('<link rel="stylesheet" href="assets/css/print.css" media="print">', () => `<style media="print">\n${css("assets/css/print.css")}\n</style>`)
  .replace('<script src="content.js"></script>', () => `<script>\n${content.replace(/<\/script/gi, "<\\/script")}\n</script>`)
  .replace('<script src="assets/js/world-dots.js"></script>', () => `<script>\n${js("assets/js/world-dots.js")}\n</script>`)
  .replace('<script src="assets/js/vendor/gsap.min.js"></script>', () => `<script>\n${js("assets/js/vendor/gsap.min.js")}\n</script>`)
  .replace('<script src="assets/js/deck.js"></script>', () => `<script>\n${js("assets/js/deck.js")}\n</script>`);
if (/(href|src)="assets\//.test(html)) throw new Error("an asset reference was not inlined");
const out = resolve(root, "pdf/Sam-and-JT-Lake-Como.html");
writeFileSync(out, html);
console.log(`wrote ${out}  ${(html.length / 1024 / 1024).toFixed(2)} MB`);
