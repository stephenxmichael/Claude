#!/usr/bin/env python3
"""Builds build/guide.html, Kim's interactive guide as one self-contained page.

Source: web/guide.html (markup, styles and the small script that renders the
calendar, weekly plans, review and steps). This inlines every local image as
a data URI so the page can be published as a single file.

    python3 scripts/web_guide.py
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "web" / "guide.html"
OUT = ROOT / "build" / "guide.html"


def inline(m):
    f = ROOT / m.group(1)
    mime = "image/png" if f.suffix == ".png" else "image/jpeg"
    return 'src="data:' + mime + ";base64," + base64.b64encode(f.read_bytes()).decode() + '"'


page = re.sub(r'src="((?:photos|design)/[^"]+|logo-[a-z]+\.png)"', inline, SRC.read_text())
assert not re.search(r'src="(?!data:)', page), "an image was not inlined"
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(page)
print(f"wrote {OUT.relative_to(ROOT)} ({len(page) // 1024}KB)")
