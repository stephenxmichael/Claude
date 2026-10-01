#!/usr/bin/env bash
# Vendors the two faces into fonts/ and writes fonts/fonts.css.
# Headless Chromium here cannot reach fonts.googleapis.com, so fonts are
# self-hosted rather than imported at render time.
set -euo pipefail
cd "$(dirname "$0")/.."
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
CSS_URL='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Jost:wght@400;500;600&display=swap'
curl -sS -H "User-Agent: $UA" "$CSS_URL" -o fonts/.remote.css
python3 - <<'PY'
import re, pathlib, subprocess, sys
out = pathlib.Path("fonts")
css = (out / ".remote.css").read_text()
blocks = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{.*?\})", css, re.S)
local = []
for subset, block in blocks:
    if subset not in {"latin", "latin-ext"}:
        continue
    fam = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    style = re.search(r"font-style:\s*(\w+);", block).group(1)
    wght = re.search(r"font-weight:\s*([^;]+);", block).group(1).strip()
    url = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
    name = f"{fam.replace(' ', '')}-{wght}-{style}-{subset}.woff2"
    dest = out / name
    if not dest.exists():
        subprocess.run(["curl", "-sS", "-o", str(dest), url], check=True)
    local.append(re.sub(r"url\(https://[^)]+\.woff2\)", f"url('{name}')", block).strip())
(out / "fonts.css").write_text("/* Vendored from Google Fonts. Regenerate with scripts/vendor-fonts.sh */\n" + "\n".join(local) + "\n")
(out / ".remote.css").unlink()
print(len(local), "faces")
PY
