#!/usr/bin/env python3
"""Uniforma la luce dei 29 campioni di finitura per la GRIGLIA del campionario.
Flat-field: divide per la mappa di illuminazione (blur molto ampio), togliendo il gradiente
e tenendo la grana. Serve alla confrontabilita': in griglia il buyer deve leggere il materiale,
non l'inclinazione della lampada.
ponytail: nel visore di dettaglio si usa l'originale non normalizzato (in images/full/) --
quel riflesso direzionale e' il metallo, non un difetto.
"""
import glob, os, subprocess, tempfile
import numpy as np
from PIL import Image, ImageFilter

OUT = "assets/optimized/images/grid"
GRID_W = 560

def spread(a):
    """scarto di luminosita' fra i 4 quadranti, in % del medio"""
    g = a.mean(axis=2) if a.ndim == 3 else a
    h, w = g.shape
    q = [g[:h//2, :w//2].mean(), g[:h//2, w//2:].mean(), g[h//2:, :w//2].mean(), g[h//2:, w//2:].mean()]
    return (max(q) - min(q)) / g.mean() * 100

def flatfield(im):
    rgb = im.convert("RGB")
    illum = np.asarray(rgb.convert("L").filter(
        ImageFilter.GaussianBlur(max(rgb.size) // 6)), dtype=np.float32)
    k = illum.mean() / np.clip(illum, 1, None)
    out = np.asarray(rgb, dtype=np.float32) * k[:, :, None]
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))

os.makedirs(OUT, exist_ok=True)
files = sorted(f for f in glob.glob("assets/images/*.png") if Image.open(f).mode == "RGBA")
print(f"{'campione':26s} {'prima':>7s} {'dopo':>7s}")
for f in files:
    name = os.path.splitext(os.path.basename(f))[0]
    im = Image.open(f).convert("RGB")
    im = im.resize((GRID_W, round(im.height * GRID_W / im.width)), Image.LANCZOS)
    before = spread(np.asarray(im, dtype=np.float32))
    fixed = flatfield(im)
    after = spread(np.asarray(fixed, dtype=np.float32))

    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as t:
        fixed.save(t.name)
    subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-i", t.name,
                    "-c:v", "libaom-av1", "-still-picture", "1", "-crf", "34",
                    "-cpu-used", "6", "-pix_fmt", "yuv420p", f"{OUT}/{name}.avif", "-y"], check=True)
    os.unlink(t.name)
    fixed.save(f"{OUT}/{name}.webp", quality=80, method=6)
    print(f"{name:26s} {before:6.0f}% {after:6.0f}%")

tot = sum(os.path.getsize(p) for p in glob.glob(f"{OUT}/*.avif"))
print(f"\n{len(files)} campioni normalizzati -> {tot/1024:.0f} KB in AVIF (media {tot/1024/len(files):.1f} KB)")
