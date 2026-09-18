# assets/optimized — asset pronti per il web

Generati da `tools/optimize-assets.py` (immagini) e da tre comandi `ffmpeg` documentati in coda
a quello stesso file (video). **Gli originali in `assets/images/` e `assets/video/` non sono stati
toccati**: restano i master da cui rigenerare.

## Cosa c'è

| Cartella | Contenuto | Uso previsto |
|---|---|---|
| `images/full/` | 44 immagini, AVIF + WebP | visore finiture, media di sezione, hero |
| `images/card/` | 30 immagini, AVIF + WebP | card del campionario (600 px) e hero mobile (1280 px) |
| `video/` | `culture-1080.av1.mp4`, `culture-1080.mp4`, `culture-720.mp4`, poster AVIF + JPG | hero / sezione processo |

Il WebP esiste solo come fallback per browser senza AVIF: in `<picture>` va dopo l'AVIF.

## Risultato misurato (18/09/2026)

| | Prima | Dopo |
|---|---|---|
| 44 immagini | 85,2 MB (PNG/WebP) | **3,1 MB** AVIF (−96%) · 8,0 MB WebP (−91%) |
| `culture.mp4` | 90,8 MB — 14,75 s a **49,2 Mbps** | **0,56 MB** AV1 · 2,9 MB H.264 1080p · 1,2 MB 720p |
| Totale asset | ~174 MB | **~16 MB** con entrambi i formati, ~4 MB servendo solo AVIF + AV1 |

Qualità verificata a confronto 1:1 sui casi peggiori (`crossedbronze` al 100%, frame scuri del video):
nessun banding visibile, la grana delle rigature resta leggibile.

## Parametri scelti

- **Finiture** (RGBA verticali — è il prodotto, si sacrifica meno): AVIF `crf 30` a risoluzione nativa, `crf 34` per la card a 600 px.
- **Illustrazioni di processo** (linee oro su nero): AVIF `crf 32`, larghezza max 1400 px.
- **Hero**: AVIF `crf 32` a 2048 px, `crf 34` a 1280 px.
- **WebP**: `quality 80, method 6` per tutti.
- **Video**: nessun audio (è un loop di sfondo), `+faststart`, GOP 48.

## Esclusi di proposito

`culture.jpg`, `design.jpg`, `lighting.jpg`, `outdoor.jpg` sono **segnaposto dichiarati** (hanno
stampato sopra "placeholder"); `newsletter.jpg` è uno swirl arancione fuori palette. Vanno sostituiti,
non convertiti.

## Nota di contenuto, non di formato

`trasparenterame.png` comprime a 2 KB perché l'originale è sfocato e quasi piatto: non mostra nessuna
grana del materiale. È un problema dello scatto, non della conversione — va rifatto.

## Rigenerare

```bash
python3 tools/optimize-assets.py      # dalla radice del repo; richiede ffmpeg + Pillow
```
