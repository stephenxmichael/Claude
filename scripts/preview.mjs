#!/usr/bin/env node
// Wraps a built publication into a single self-contained HTML page suitable for
// publishing as an Artifact: fonts and images inlined, pages scaled to fit any
// viewport, a sticky page rail for jumping around.
//
//   node scripts/preview.mjs iphone   -> dist/iphone-preview.html
//   node scripts/preview.mjs field    -> dist/field-preview.html
//
// Fonts are inlined rather than linked to Google, for the same reason the repo
// vendors them at all: a silent fallback to serif is invisible until someone
// opens the page. unicode-range is kept intact so glyphs the latin subset lacks
// (the arrows) still fall back instead of rendering as tofu.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pickProduct } from "./products.mjs";

const { product } = pickProduct(process.argv.slice(2));
const OUT = `dist/${product.key}-preview.html`;

const BLURB = {
  iphone: ["Prototype", "All ten pages at full size. Every hatched block is a deliberate media placeholder carrying an asset ID, media type, subject and crop &mdash; no photography, screenshots or QR codes are final, and none have been faked to fill space. Copy throughout is first-pass working copy."],
  field: ["Pass 02", "Three visual directions for Shooting Stars Field Guide 001, each shown as a cover plus the Shoot With Intention interior. Cover plates carry shoot zones marking where the subject stands, where the phone sits, and which area must stay clear for the title. Nothing here is final photography, and copy is working copy."],
  fieldA: ["Pass 02.5", "Direction A evolved into the locked Field Guide language. Two covers and the Shoot With Intention interior, introducing the handwritten editorial voice as a counterpoint to the block type. Cover plates carry shoot zones marking where the subject stands, where the phone sits, and what must stay clear. Nothing here is final photography, and copy is working copy."],
  framework: ["Book", "The full publication at page size."],
};

const src = readFileSync(product.out, "utf8");
const title = (src.match(/<title>([^<]*)<\/title>/) || [, product.name])[1];
let style = src.match(/<style>([\s\S]*?)<\/style>/)[1];
let body = src.split("</style></head><body>")[1].split("</body></html>")[0];

// ---- fonts: inline every latin face of every family the stylesheet uses ----
const fontDir = "assets/fonts";
const fontCss = readFileSync(join(fontDir, "fonts.css"), "utf8");
const families = new Set([...style.matchAll(/font-family:\s*'([^']+)'/g)].map((m) => m[1]));
let faceBytes = 0;
const faces = [...fontCss.matchAll(/@font-face\s*\{[\s\S]*?\}/g)]
  .map((m) => m[0])
  .filter((b) => {
    const fam = b.match(/font-family:\s*'([^']+)'/)[1];
    const url = b.match(/url\('([^']+)'\)/)[1];
    return families.has(fam) && url.endsWith("-latin.woff2");
  })
  .map((b) => {
    const url = b.match(/url\('([^']+)'\)/)[1];
    const raw = readFileSync(join(fontDir, url));
    faceBytes += raw.length;
    return b.replace(/url\('[^']+'\)/, `url(data:font/woff2;base64,${raw.toString("base64")})`);
  });
if (!faces.length) throw new Error("no faces matched; fonts would fall back to serif");
style = style.replace("@import url('assets/fonts/fonts.css');", "");

// ---- images: inline, since the artifact CSP blocks cross-origin media ----
const MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", svg: "image/svg+xml" };
const seen = new Set();
body = body.replace(/src="(assets\/[^"]+)"/g, (_, path) => {
  seen.add(path);
  const ext = path.split(".").pop().toLowerCase();
  return `src="data:${MIME[ext] ?? "application/octet-stream"};base64,${readFileSync(path).toString("base64")}"`;
});
if (/assets\//.test(body)) throw new Error("an asset reference survived inlining");

// body{} in the source styles the review page; here that is .stage's job,
// because <body> belongs to the artifact skeleton.
style = style.replace(/\nbody\{background:#0d0d0d;[^}]*\}/, "");
style = style.replace(
  "body{background:#fff;padding:0;gap:0;display:block}",
  "body{background:#fff;padding:0}.bar,.intro,.tag{display:none}.stage{gap:0;padding:0}" +
  ".frame{width:800px;height:1120px;box-shadow:none}.frame>.page{transform:none}");

// ---- split the flat tag/page stream into addressable sheets ----
const chunks = body.split('<div class="tag">');
const sprite = chunks[0].trim();
const sheets = chunks.slice(1).map((c) => {
  const i = c.indexOf("</div>");
  return [c.slice(0, i).trim(), c.slice(i + 6).trim()];
});
if (!sheets.length) throw new Error("no pages found");

const rail = sheets.map((_, i) => `<a href="#p${String(i + 1).padStart(2, "0")}">${String(i + 1).padStart(2, "0")}</a>`).join("");
const pages = sheets.map(([tag, page], i) =>
  `<section class="sheet" id="p${String(i + 1).padStart(2, "0")}">\n<div class="tag">${tag}</div>\n<div class="frame">${page}</div>\n</section>`).join("\n");
const [badge, blurb] = BLURB[product.key] ?? ["Preview", "All pages at full size."];

const html = `<title>${title}</title>
<style>
/* Vendored from Google Fonts, inlined so nothing falls back silently. */
${faces.join("\n")}
${style}

/* ── preview shell ──
   The pages are a fixed 800x1120 print document, so the shell only carries the
   brand ground, scales each page to the viewport, and lets you jump between
   them. Everything inside .page is the product as built. */
:root{color-scheme:dark;--ground:#0B0B0D;--rule:rgba(255,255,255,.1);--chrome:#6E7486;--s:1}
body{background:var(--ground);color:var(--bone);font-family:'Archivo',system-ui,sans-serif;padding-inline:16px;padding-block:0}
.bar{position:sticky;top:env(safe-area-inset-top,0px);z-index:50;margin-inline:-16px;padding-inline:16px;
     background:rgba(11,11,13,.93);backdrop-filter:blur(10px);border-bottom:1px solid var(--rule)}
.bar-in{max-width:840px;margin-inline:auto;display:flex;align-items:center;justify-content:space-between;gap:16px;padding-block:11px;flex-wrap:wrap}
.wm{font-family:'Anton',Impact,sans-serif;font-size:17px;letter-spacing:.01em;text-transform:uppercase;color:var(--bone);line-height:1}
.meta{display:block;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--chrome);margin-top:6px}
.rail{display:flex;gap:3px;overflow-x:auto;max-width:100%;scrollbar-width:none}
.rail::-webkit-scrollbar{display:none}
.rail a{flex:none;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9.5px;letter-spacing:.1em;color:var(--chrome);
        text-decoration:none;padding:6px 7px;border:1px solid transparent;border-radius:2px}
.rail a:hover{color:var(--bone);border-color:var(--rule)}
.rail a:focus-visible{outline:2px solid var(--volt);outline-offset:1px}
.intro{max-width:840px;margin-inline:auto;padding-block:26px 6px;display:flex;gap:14px;align-items:flex-start}
.intro b{flex:none;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:8.5px;font-weight:400;letter-spacing:.16em;
         text-transform:uppercase;color:var(--volt);border:1px solid rgba(77,124,255,.4);padding:5px 9px;border-radius:2px}
.intro p{font-size:12.5px;line-height:1.7;color:#8C93A5;max-width:62ch}
.stage{width:100%;display:flex;flex-direction:column;align-items:center;gap:36px;padding-block:26px 44px}
.sheet{width:calc(800px * var(--s));display:flex;flex-direction:column;gap:9px;scroll-margin-top:84px}
.tag{margin-bottom:0;font-size:10px;color:var(--chrome)}
.frame{width:calc(800px * var(--s));height:calc(1120px * var(--s));overflow:hidden;box-shadow:0 18px 54px rgba(0,0,0,.6)}
.frame>.page{transform:scale(var(--s));transform-origin:top left;box-shadow:none}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style>
<script>
// The pages cannot reflow, so fit them to the viewport instead.
(function () {
  function fit() {
    var w = Math.max(260, document.documentElement.clientWidth - 32);
    document.documentElement.style.setProperty('--s', Math.min(1, w / 800));
  }
  fit(); addEventListener('resize', fit); addEventListener('orientationchange', fit);
})();
</script>
${sprite}
<header class="bar"><div class="bar-in">
  <div><span class="wm">${title}</span><span class="meta">Shooting Stars &middot; ${sheets.length} pages</span></div>
  <nav class="rail" aria-label="Jump to page">${rail}</nav>
</div></header>
<div class="intro"><b>${badge}</b><p>${blurb}</p></div>
<main class="stage">
${pages}
</main>
`;

// Non-ASCII in the markup becomes character references so the page cannot
// mojibake whichever charset the host declares. CSS is left alone: it does not
// parse entities, and its only non-ASCII lives in comments.
const [head, sep, tail] = (() => { const i = html.lastIndexOf("</style>"); return [html.slice(0, i), "</style>", html.slice(i + 8)]; })();
const esc = tail.replace(/[\u0080-￿]/g, (c) => `&#${c.charCodeAt(0)};`);
writeFileSync(OUT, head + sep + esc);

console.log(`${OUT}  —  ${sheets.length} pages, ${faces.length} faces (${(faceBytes / 1024) | 0}KB), ` +
            `${seen.size} images, ${((head.length + esc.length) / 1024) | 0}KB total`);
