# Brass Style — sito

Sito di **Brass Style S.R.L.**, terzista di lavorazione e finitura metalli per l'arredo di alta
gamma (Vertemate con Minoprio, CO). Vetrina B2B: 29 finiture a campionario con scheda tecnica,
10 lavorazioni, richiesta campioni.

Sito bilingue **IT + EN**: 20 pagine (10 per lingua) più 29 schede finitura e 10 pagine
lavorazione in ciascuna lingua — **94 pagine** in tutto, tutte statiche.

**Stack:** Next 16.3.5 (App Router) + React 19, TypeScript, CSS Modules. Nessuna libreria di UI,
nessuna libreria di animazione, nessun database — i contenuti sono file versionati.
Decisione di stack e alternativa scartata: `docs/adr/001-stack.md`.

## Avvio

```bash
npm install
npm run dev      # http://localhost:3210
npm run build    # esegue prima i gate di contenuto e contrasto
npm run start
```

Per l'invio del modulo serve un `.env.local` (vedi `.env.example`): senza chiave Resend il sito
funziona, la richiesta viene salvata e l'utente vede un errore esplicito con i recapiti diretti.

## Come è fatto

| Dove | Cosa |
|---|---|
| `src/data/azienda.ts` | **unica sorgente** di indirizzo, telefono, email, P.IVA, orari: footer, contatti e JSON-LD leggono da qui |
| `src/data/finiture.ts` | le 29 finiture (codice, famiglia, processo, protezione, manutenzione…) |
| `src/data/finiture.en.ts` | gli stessi testi in inglese, per codice |
| `src/data/lavorazioni.ts` | le 10 lavorazioni con il testo delle rispettive pagine |
| `src/data/lavorazioni.en.ts` | gli stessi testi in inglese, per slug |
| `src/lib/i18n.ts` | rotte delle due lingue (accoppiate) e tutte le stringhe di interfaccia |
| `src/views/` | le viste condivise fra IT ed EN (campionario, scheda, lavorazioni) |
| `src/data/dimensioni.json` | larghezza/altezza **misurate** di ogni immagine (ffprobe) → niente CLS |
| `src/app/globals.css` | i token del design system (palette campionata dai campioni reali) |
| `src/components/` | header, footer, card, campionario, visore, form, banner «in sviluppo» |
| `public/media` → `assets/optimized` | symlink: gli asset ottimizzati non vengono duplicati |

Gli originali in `assets/images/` e `assets/video/` (174 MB) **non si toccano**: sono i master da
cui `tools/optimize-assets.py` rigenera `assets/optimized/`.

## I gate (falliscono, non avvisano)

```bash
npm run validate         # contenuto (IT + EN) + contrasto: gira prima di ogni build
npm run check:seo        # 94 pagine: title/description unici, 1 h1, canonical, hreflang reciproci,
                         # sitemap completa, zero href="#"  (richiede il sito avviato)
npm run check:peso       # peso trasferito reale (gzip, cache vuota) contro i budget della SPEC
npm run riavvia          # riavvia next start aspettando che la porta si liberi davvero
```

Misure prese il 18/09/2026 su `next start` in locale:

| Pagina | Peso trasferito | Budget SPEC |
|---|---|---|
| `/finiture` e `/en/finishes` (29 card) | **874,8 KB** | ≤ 900 KB |
| `/` e `/en` | **721 KB** | ≤ 1.200 KB |
| scheda finitura | **439 KB** | — |
| `/lavorazioni` | **447 KB** | — |

## Stato

Italiano e inglese completi. Tre pagine hanno contenuti mancanti dichiarati con il banner
«Pagina in sviluppo» (`/azienda` in parte, `/progetti`, `/privacy`): l'elenco di cosa serve è in
`docs/asset-mancanti.md`. I testi tecnici delle schede e delle lavorazioni sono una bozza da far
validare all'azienda: `docs/contenuti-da-validare.md`.

## Documenti

- `docs/specs/brass-style-site.md` — la SPEC (obiettivi, requisiti testabili, invarianti, fasi)
- `docs/as-is.md` — il sito precedente e i suoi 12 difetti misurati
- `docs/design-directions.md` — le tre direzioni di design; in produzione c'è la A su struttura C
- `docs/adr/001-stack.md` — stack
- `PRODUCT.md` — a cosa serve il sito e per chi
