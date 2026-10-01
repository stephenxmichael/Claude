#!/usr/bin/env bash
# Vendors the three brand faces into assets/fonts/ and writes assets/fonts/fonts.css.
#
# Why: headless Chromium in this sandbox cannot reach fonts.googleapis.com
# (ERR_CONNECTION_RESET), so an @import silently falls back to serif and every
# Anton headline measures wrong. Self-hosting also means the book renders the
# same offline and exports to PDF/Canva without a live network dependency.
set -euo pipefail
cd "$(dirname "$0")/.."

OUT=assets/fonts
mkdir -p "$OUT"
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
# Caveat joins the kit for the Field Guides: the handwritten editorial voice.
# Chosen over Bad Script, Kalam and Nothing You Could Do because it has to sit
# beside Stephen's real handwritten note without reading as lettering.
CSS_URL='https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800;900&family=Archivo+Black&family=Caveat:wght@500;600;700&family=JetBrains+Mono:wght@400;600&display=swap'

curl -sS -H "User-Agent: $UA" "$CSS_URL" -o "$OUT/.remote.css"

python3 - <<'PY'
import re, pathlib, subprocess, sys

out = pathlib.Path("assets/fonts")
css = (out / ".remote.css").read_text()

# Each @font-face block carries a /* subset */ comment before it.
blocks = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{.*?\})", css, re.S)
keep = {"latin", "latin-ext"}          # English book; skip cyrillic/greek/vietnamese
rules = []
seen = {}

for subset, block in blocks:
    if subset not in keep:
        continue
    fam = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    wght = re.search(r"font-weight:\s*([^;]+);", block).group(1).strip()
    url = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
    name = f"{fam.replace(' ', '')}-{wght.replace(' ', '')}-{subset}.woff2"
    if name in seen:
        continue
    seen[name] = url
    rules.append((fam, wght, name, block))

for name, url in seen.items():
    dest = out / name
    if dest.exists() and dest.stat().st_size > 0:
        continue
    r = subprocess.run(["curl", "-sS", "-o", str(dest), url])
    if r.returncode != 0 or not dest.exists() or dest.stat().st_size == 0:
        sys.exit(f"failed to download {name}")

# Rewrite each block to point at the local file, keeping unicode-range intact.
local = []
for fam, wght, name, block in rules:
    b = re.sub(r"url\(https://[^)]+\.woff2\)", f"url('{name}')", block)
    local.append(b.strip())

(out / "fonts.css").write_text(
    "/* Vendored from Google Fonts. Regenerate with scripts/vendor-fonts.sh */\n"
    + "\n".join(local) + "\n"
)
(out / ".remote.css").unlink()

total = sum(p.stat().st_size for p in out.glob("*.woff2"))
print(f"vendored {len(seen)} woff2 files, {total//1024}KB total")
for p in sorted(out.glob("*.woff2")):
    print(f"  {p.name:44s} {p.stat().st_size//1024:>4}KB")
PY
