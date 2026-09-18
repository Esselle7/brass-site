# PROMPT — Step 2: implementazione del sito Brass Style

Costruisci il sito di Brass Style S.R.L. (terzista di lavorazione ottone per arredo di lusso, B2B).
Lo step 1 è chiuso: l'analisi, la ricerca e le decisioni sono già su disco. **Non rifarle.**

## 1. Leggi prima questo, in quest'ordine

- `docs/specs/brass-style-site.md` — la SPEC. **Parti dalla §9: le decisioni sono già prese.**
  La §6 è il piano a fasi, la Fase 1 contiene l'alberatura definitiva.
- `docs/adr/001-stack.md` — stack. Attenzione: l'ADR raccomandava Astro, **il committente ha scelto
  Next 16.3.5 con React ovunque**. Vale la decisione, non la raccomandazione.
- `docs/design-directions.md` — direzione **A «La Materia» sulla struttura di C** (le altre due no).
  Da qui prendi palette, tipografia, griglia e grammatica di movimento.
  ⚠️ Il documento dà A per bloccata dalla fotografia: **è superato**, vedi SPEC §9.
- `docs/as-is.md` — il sito vecchio e i suoi 12 difetti. Serve a sapere cosa NON ripetere.
- `assets/optimized/README.md` — gli asset pronti.
- Poi carica la skill **`impeccable`** prima di scrivere interfaccia (un prompt-file non ne attiva
  i trigger da solo). Richiede un `PRODUCT.md` di progetto: scrivilo tu come primo passo.

## 2. Regole pratiche non negoziabili

**Asset.** Usa solo `assets/optimized/`. Mai gli originali in `assets/images/` e `assets/video/`
(sono master da 174 MB). Griglia del campionario → `images/grid/` (normalizzati, confrontabili);
visore di dettaglio → `images/full/` (originali, il riflesso è il metallo). Video → `video/`.

**Pagine con foto mancanti.** Alcune pagine richiedono foto che oggi non esistono (reparto,
progetti realizzati). Non aspettarle e non inventare contenuto: costruisci la pagina completa con
**placeholder espliciti** e mettici sopra un banner visibile «Pagina in sviluppo — contenuti
fotografici in arrivo». Vincoli: **un solo componente** `<InDevelopmentBanner>` riusato ovunque,
**una sola lista** dei placeholder in `docs/asset-mancanti.md` (cosa manca, per quale pagina, che
formato serve). Il banner deve essere ovvio per chi guarda, non un commento nel codice.

**Ordine di lavoro — prima le pagine classiche, complete e vere:**
1. `/` Home · `/finiture` campionario con filtro · `/finiture/<slug>` ×29 · `/contatti`
2. `/lavorazioni` + le 10 sotto-pagine (le 14 illustrazioni di processo esistono già)
3. `/azienda` (testo e dati reali ci sono; la parte stabilimento va a placeholder)
4. `/progetti` e `/richiedi-campioni` — interamente a placeholder, con banner
5. `/en/...` solo dopo che l'italiano è completo

Niente link morti: se una pagina non esiste ancora, la voce di menu non c'è. Il sito vecchio aveva
28 `href="#"`, è esattamente l'errore da non ripetere.

## 3. Quando coinvolgermi

Fermati e chiedimi con **AskUserQuestion**, opzioni secche, solo su decisioni cardine:
- la scelta tipografica finale e la palette applicata (fammi vedere 2-3 alternative rese, non nomi di font);
- la struttura della scheda finitura (quali campi tecnici vede il buyer);
- il contenuto del form di richiesta preventivo/campioni (quali campi, cosa succede all'invio);
- qualunque cosa che aggiunga una dipendenza o un servizio esterno.

**Non** chiedermi: nomi di file, struttura di cartelle, come organizzare i componenti, valori di
spacing, se usare TypeScript. Decidi tu e vai avanti.

## 4. "Fatto" verificabile

- `npm run build` passa; il sito parte e lo hai **aperto davvero** per guardarlo, non dedotto.
- Le 29 finiture sono 29 record completi validati da uno script che esce ≠ 0 se manca un campo.
- Ogni pagina a placeholder ha il banner, ed è elencata in `docs/asset-mancanti.md`.
- Zero `href="#"`, zero testo segnaposto tipo «aaaa», zero 404 su asset.
- Peso della pagina finiture misurato, non stimato. Budget: INP < 200 ms, LCP < 2,5 s.
- Riporta cosa hai verificato e cosa no. Numeri stimati vanno marcati `⚠️ non misurato`.
