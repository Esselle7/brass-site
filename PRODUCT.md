# PRODUCT.md — Brass Style S.R.L.

## Cos'è
Sito vetrina B2B (IT/EN) di **Brass Style S.R.L.**, terzista di lavorazione e finitura metalli
(ottone in primis) per arredo di lusso. Vertemate con Minoprio (CO), attiva dal 1985.
Non vende online: **converte in richieste di preventivo/campioni qualificate**.

## Chi lo usa
- **Buyer / ufficio acquisti** di un brand d'arredo: deve sapere in 30 secondi se Brass Style sa
  fare *quella* finitura su *quel* metallo, e a chi scrivere.
- **Progettista / interior studio**: cerca un codice finitura da mettere in capitolato, spesso con
  il CAD aperto di fianco; stamperà la scheda.
- **Titolare / PM del brand**: vuole la prova che progettazione, saldatura, brunitura,
  verniciatura, assemblaggio e imballo avvengano sotto lo stesso tetto.
Tutti e tre sono utenti **desktop-first ma mobile-reali** (visita in fiera, in reparto).

## Il lavoro che il sito deve fare (in ordine)
1. Far **leggere le 29 finiture** — griglia confrontabile, filtro per famiglia/metallo, scheda
   tecnica con URL proprio e indicizzabile.
2. Far **capire il ciclo completo** — 10 lavorazioni reali, una pagina ciascuna.
3. Far **arrivare la richiesta** — form preventivo/campioni precompilato con i codici scelti.

## Voce e tono
Tecnico, asciutto, verificabile. Nessun superlativo di marketing: numeri, codici, processi.
Il lusso qui è la chiarezza e la materia, non l'aggettivo.

## Direzione di design (decisa, non da ridiscutere)
**A «La Materia» sulla struttura di C «Il Capitolato»** (`docs/design-directions.md`):
fondo brunitura quasi-nero, ottone razionato all'interazione, zero cursore custom.
**Tipografia (rev. 18/09/2026):** display **Bodoni Moda** — la stessa didone incisa del marchio,
asse ottico `opsz 30` perché le aste fini non spariscano sul fondo scuro — su testo **Archivo**.
**Home (rev. 18/09/2026, decisione committente):** vetrina cinematografica sul modello
arsenalia.com — sipario d'ingresso col logo scritto (2,6 s, `pointer-events: none`), barra che
nasce a tutta larghezza e si raccoglie in un'isola perdendo la scritta, mega-menu, striscia delle
29 finiture che gira, reveal sullo scroll, video a tutto schermo come sfondo di sezione, schede
impilate, marquee. Il movimento è **tutto CSS scroll-driven** (`animation-timeline`): zero librerie
di animazione, e ogni animazione ha lo stato base già leggibile.
**Unica libreria di movimento: Lenis** (3 KB) per lo scorrimento smorzato — richiesta esplicita del
committente («scrolling luxury e calmo»), disattivata da sola con `prefers-reduced-motion`.
**Loghi** (`assets/logo/` → `tools/prepara-loghi.py` → `assets/optimized/logo/`): il marchio minimal
sta nella barra e firma la sezione di chiusura; il logo scritto apre il sito (sipario) e lo chiude
(footer).
Palette campionata dagli asset reali: `--canvas #0E0D0D`, `--surface #1A1613`, `--ink #E8E4DC`,
`--muted #8D826E`, `--brass #C9A95E`, `--brass-hi #EBCB72`, `--rust #713E2A`.

## Vincoli duri
- Next 16.3.5 + React (decisione committente, `docs/adr/001-stack.md`).
- Contenuto leggibile **senza JavaScript**; nessun media scaricato prima di essere in vista.
  Eccezione dichiarata: il video di sfondo della home parte muto in loop quando la sezione entra
  nel viewport (`preload="none"`, poster fino a quel momento, solo poster con reduced-motion).
- Budget: `/finiture` ≤ 900 KB (misurato: 896 KB — margine sottile, ogni asset nuovo nel footer
  o nella barra si paga su OGNI pagina), home ≤ 1.200 KB **al primo schermo** (misurato: 719 KB);
  il video di sezione aggiunge 561 KB in AV1 e 1,25 MB dove AV1 non è decodificato.
- LCP < 2,5 s, INP < 200 ms, CLS < 0,1.
- Contrasto: ogni coppia ≥ 4,5:1 (corpo) / ≥ 3:1 (grande). Nessun `cursor:none`.
- Zero `href="#"`: se una pagina non esiste, la voce di menu non esiste.
- Un dato aziendale = una sola sorgente (`src/data/azienda.ts`).

## Fuori scopo
E-commerce, login, CMS, WebGL/3D, blog, chat, tracker prima del consenso.
(Lo smooth-scroll JS era fuori scopo fino al 18/09/2026: ora è dentro, con Lenis e solo per chi
non ha chiesto meno movimento.)
