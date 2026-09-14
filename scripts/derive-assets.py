#!/usr/bin/env python3
"""Pre-scaled logo derivatives.

The HUD renders the S mark at 17px wide. Handing the browser a 2088px source
and asking it to downscale that far turns the orbit ring and sparkles into an
unreadable smudge, so the small sizes are resampled here with LANCZOS instead.
"""
from PIL import Image
import pathlib

A = pathlib.Path(__file__).resolve().parent.parent / "assets"

# (source, output suffix, target width) - target is ~4x display size for crispness
JOBS = [
    ("Shooting_Stars_S_Icon_wht.png", "_sm", 68),
    ("Shooting_Stars_S_Icon_blk.png", "_sm", 68),
]

for src, suffix, w in JOBS:
    im = Image.open(A / src).convert("RGBA")
    h = round(im.height * w / im.width)
    out = A / src.replace(".png", f"{suffix}.png")
    im.resize((w, h), Image.LANCZOS).save(out, optimize=True)
    print(f"{src} {im.width}x{im.height} -> {out.name} {w}x{h} ({out.stat().st_size//1024}KB)")
