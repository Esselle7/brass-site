# Cartella VIDEO

Metti qui i tuoi video di sfondo in formato **.mp4** (consigliato H.264, muto, ottimizzato per il web).

## Come funziona
Ogni sezione del sito ha uno "slot" che cerca prima il video e, se non lo trova, mostra l'immagine corrispondente nella cartella `../images/`.

Per ATTIVARE un video, salva in questa cartella un file con ESATTAMENTE questo nome:

| Slot / Sezione        | Nome file video    | Immagine di fallback (in ../images) |
|-----------------------|--------------------|--------------------------------------|
| Hero (testata)        | `hero.mp4`         | `hero.jpg`                           |
| Collezione Living     | `living.mp4`       | `living.jpg`                         |
| Collezione Bedroom    | `bedroom.mp4`      | `bedroom.jpg`                        |
| Collezione Lighting   | `lighting.mp4`     | `lighting.jpg`                       |
| Collezione Bathroom   | `bathroom.mp4`     | `bathroom.jpg`                       |
| Collezione Outdoor    | `outdoor.mp4`      | `outdoor.jpg`                        |
| Sezione "by culture"  | `culture.mp4`      | `culture.jpg`                        |
| Sezione "by design"   | `design.mp4`       | `design.jpg`                         |
| Newsletter            | `newsletter.mp4`   | `newsletter.jpg`                     |

## Regola
- **Se il video c'è** → viene riprodotto (in loop, muto, autoplay).
- **Se il video NON c'è** (o non parte) → resta automaticamente l'immagine.

Non serve modificare il codice: basta aggiungere o togliere il file video.
