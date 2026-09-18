#!/usr/bin/env python3
"""Scontorna i due loghi Brass Style e li esporta in WebP con alpha.

Gli originali sono JPEG *senza* trasparenza:
  - minimal  → ottone su una scacchiera bianco/grigio (la finta trasparenza, cotta nei pixel);
  - scritta  → ottone su fondo blu notte pieno.
In entrambi i casi lo sfondo si separa dal metallo per colore, non per posizione:
l'ottone è sempre saturo e rosso-dominante, lo sfondo non lo è mai.

L'alpha esce sfumata (niente bordi a scalini) e leggermente erosa, così i pixel di bordo
contaminati dal fondo non lasciano l'alone azzurro sul fondo scuro del sito.

Uso:  python3 tools/prepara-loghi.py
Out:  assets/optimized/logo/{minimal,scritta}-<larghezza>.webp
"""
import os
import numpy as np
from PIL import Image, ImageFilter

SRC = "assets/logo"
OUT = "assets/optimized/logo"
LARGHEZZE = {"minimal": (96, 192), "scritta": (180, 420)}


def sfuma(x, a, b):
    """smoothstep: 0 sotto a, 1 sopra b, transizione morbida in mezzo (anche con a > b)."""
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def alpha_minimal(rgb):
    mx, mn = rgb.max(axis=2), rgb.min(axis=2)
    saturazione = mx - mn
    valore = mx
    # tiene ciò che è saturo (ottone) oppure scuro (i contorni incisi); scarta bianco e grigio
    return np.maximum(sfuma(saturazione, 12, 34), sfuma(valore, 195, 140))


def alpha_scritta(rgb):
    fondo = np.median(rgb.reshape(-1, 3)[:2000], axis=0)  # gli angoli sono tutti fondo
    distanza = np.linalg.norm(rgb - fondo, axis=2)
    return sfuma(distanza, 42, 105)


def ritaglia(im):
    box = im.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
    return im.crop(box) if box else im


def lavora(nome, calcola_alpha):
    src = Image.open(os.path.join(SRC, f"{nome}-src.jpg")).convert("RGB")
    rgb = np.asarray(src).astype(float)
    a = calcola_alpha(rgb)

    im = Image.fromarray(np.dstack([np.asarray(src), (a * 255).astype(np.uint8)]), "RGBA")
    # erosione di ~1px (MinFilter sull'alpha) + mezzo pixel di sfumatura: via l'alone di fondo
    canale = im.getchannel("A").filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(canale)
    im = ritaglia(im)

    os.makedirs(OUT, exist_ok=True)
    righe = []
    for w in LARGHEZZE[nome]:
        scalata = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        dest = os.path.join(OUT, f"{nome}-{w}.webp")
        scalata.save(dest, quality=82, method=6)
        righe.append(f"  {dest}  {scalata.width}x{scalata.height}  {os.path.getsize(dest)/1024:.1f} KB")
    print(f"{nome}: ritagliato a {im.width}x{im.height}")
    print("\n".join(righe))


if __name__ == "__main__":
    lavora("minimal", alpha_minimal)
    lavora("scritta", alpha_scritta)
