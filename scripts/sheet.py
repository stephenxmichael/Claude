#!/usr/bin/env python3
"""Tile page screenshots into a contact sheet for reviewing a batch at once.

Usage: python3 scripts/sheet.py 13 22 [cols]
"""
from PIL import Image, ImageDraw
import pathlib, sys

frm = int(sys.argv[1]) if len(sys.argv) > 1 else 1
to = int(sys.argv[2]) if len(sys.argv) > 2 else 42
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 5

SRC = pathlib.Path("build/screens")
TW, PAD, LABEL = 300, 14, 20
TH = round(TW * 1120 / 800)

files = [(n, SRC / f"p{n:02d}.png") for n in range(frm, to + 1)]
files = [(n, p) for n, p in files if p.exists()]
if not files:
    sys.exit("no screenshots in that range; run scripts/shoot.mjs first")

rows = (len(files) + cols - 1) // cols
W = cols * TW + (cols + 1) * PAD
H = rows * (TH + LABEL) + (rows + 1) * PAD

sheet = Image.new("RGB", (W, H), (28, 28, 32))
d = ImageDraw.Draw(sheet)

for i, (n, p) in enumerate(files):
    r, c = divmod(i, cols)
    x = PAD + c * (TW + PAD)
    y = PAD + r * (TH + LABEL + PAD)
    im = Image.open(p).convert("RGB").resize((TW, TH), Image.LANCZOS)
    sheet.paste(im, (x, y))
    d.text((x + 2, y + TH + 5), f"p{n:02d}", fill=(150, 150, 160))

out = pathlib.Path("build") / f"sheet-{frm:02d}-{to:02d}.png"
sheet.save(out)
print(f"{out}  ({len(files)} pages, {W}x{H})")
