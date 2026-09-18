#!/usr/bin/env python3
"""Converte gli asset immagine di Brass Style in AVIF (+ WebP di fallback).
Gli originali NON vengono toccati: l'output va in assets/optimized/images/.
Classificazione per modo colore: RGBA+verticale = campione di finitura, il resto = processo."""
import os, subprocess, sys, tempfile
from PIL import Image

SRC = "assets/images"
OUT = "assets/optimized/images"
SKIP = {"culture.jpg", "design.jpg", "lighting.jpg", "outdoor.jpg",  # segnaposto dichiarati
        "newsletter.jpg", "README.md"}

def avif(img, dest, crf):
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as t:
        img.save(t.name)
    subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-i", t.name,
                    "-c:v", "libaom-av1", "-still-picture", "1", "-crf", str(crf),
                    "-cpu-used", "6", "-pix_fmt", "yuv420p", dest, "-y"], check=True)
    os.unlink(t.name)

def emit(img, name, variant, crf):
    d = os.path.join(OUT, variant)
    os.makedirs(d, exist_ok=True)
    base = os.path.join(d, os.path.splitext(name)[0])
    avif(img, base + ".avif", crf)
    img.save(base + ".webp", quality=80, method=6)
    return os.path.getsize(base + ".avif"), os.path.getsize(base + ".webp")

def fit(img, w):
    if img.width <= w:
        return img
    return img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)

tot_src = tot_avif = tot_webp = 0
rows = []
for name in sorted(os.listdir(SRC)):
    if name in SKIP:
        continue
    path = os.path.join(SRC, name)
    src_bytes = os.path.getsize(path)
    im = Image.open(path)
    mode, portrait = im.mode, im.height > im.width
    im = im.convert("RGB")  # nessuna trasparenza reale in questi file

    if name == "hero.webp":
        fam = "hero"
        a1, w1 = emit(fit(im, 2048), name, "full", 32)
        a2, w2 = emit(fit(im, 1280), name, "card", 34)
        a, w = a1 + a2, w1 + w2
    elif mode == "RGBA" and portrait:
        fam = "finitura"
        a1, w1 = emit(im, name, "full", 30)
        a2, w2 = emit(fit(im, 600), name, "card", 34)
        # `strip`: la striscia di campioni dell'hero mostra tutte e 29 le finiture in fila,
        # a ~150px di lato: sotto i 240px di sorgente non serve altro (≈5 KB l'una).
        a3, w3 = emit(fit(im, 240), name, "strip", 36)
        a, w = a1 + a2 + a3, w1 + w2 + w3
    else:
        fam = "processo"
        a, w = emit(fit(im, 1400), name, "full", 32)

    tot_src += src_bytes; tot_avif += a; tot_webp += w
    rows.append((name, fam, src_bytes, a, w))

mb = lambda b: b / 1024 / 1024
for n, f, s, a, w in rows:
    print(f"{n:34s} {f:9s} {mb(s):6.2f} MB -> avif {mb(a):5.2f} MB  webp {mb(w):5.2f} MB")
print(f"\nTOTALE {len(rows)} file: {mb(tot_src):.1f} MB -> AVIF {mb(tot_avif):.1f} MB "
      f"(-{100*(1-tot_avif/tot_src):.0f}%) | WebP {mb(tot_webp):.1f} MB (-{100*(1-tot_webp/tot_src):.0f}%)")

# --- VIDEO (non gestito da questo script: una riga a mano, non vale un wrapper) ---
# ponytail: il video è uno solo; quando saranno molti, ciclarli qui.
#   1080p H.264 (fallback universale)
#     ffmpeg -i IN.mp4 -an -c:v libx264 -preset slow -crf 23 -tune film \
#            -pix_fmt yuv420p -movflags +faststart -g 48 OUT-1080.mp4
#   1080p AV1 (sorgente moderna, ~5x più leggera)
#     ffmpeg -i IN.mp4 -an -c:v libsvtav1 -crf 38 -preset 6 \
#            -pix_fmt yuv420p -g 48 -movflags +faststart OUT-1080.av1.mp4
#   720p H.264 (mobile)
#     ffmpeg -i IN.mp4 -an -c:v libx264 -preset slow -crf 24 -tune film \
#            -vf scale=1280:-2 -pix_fmt yuv420p -movflags +faststart -g 48 OUT-720.mp4
#   poster
#     ffmpeg -ss 4.2 -i IN.mp4 -vframes 1 -c:v libaom-av1 -still-picture 1 \
#            -crf 30 -cpu-used 6 -pix_fmt yuv420p OUT-poster.avif
