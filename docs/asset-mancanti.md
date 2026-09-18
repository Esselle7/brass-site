# Asset mancanti — cosa serve, per quale pagina, in che formato

> Lista UNICA dei segnaposto del sito. Ogni pagina che contiene un segnaposto mostra il banner
> «Pagina in sviluppo» (`<InDevelopmentBanner>`, un solo componente riusato) ed è elencata qui.
> Aggiornato: 18/09/2026, sessione di implementazione dello step 2.
>
> Regola seguita: **nessun contenuto inventato al posto di un asset mancante**. Dove manca una foto
> c'è un riquadro dichiarato, non un'immagine di repertorio né un rendering.

---

## 1. `/azienda` — stabilimento e parco macchine

Banner attivo. Segnaposto in pagina: 6 riquadri foto + 1 riquadro testo.

| # | Cosa serve | Formato | Note |
|---|---|---|---|
| 1 | Reparto lavorazioni meccaniche | orizzontale, lato lungo ≥ 3000 px | anche fatta col telefono, purché a fuoco e con luce di reparto |
| 2 | Postazioni di saldatura | orizzontale ≥ 3000 px | serve a mostrare che le postazioni sono più di una |
| 3 | Reparto brunitura | orizzontale ≥ 3000 px | la vasca/le vasche, non il pezzo finito |
| 4 | Cabina di verniciatura | orizzontale ≥ 3000 px | |
| 5 | Area assemblaggio | orizzontale ≥ 3000 px | |
| 6 | Area imballo e spedizione | orizzontale ≥ 3000 px | |
| 7 | **Elenco del parco macchine** (testo, non foto) | tabella o elenco | marca, modello, corse di lavoro per reparto; numero postazioni di saldatura; dimensioni massime lavorabili; certificazioni |

Il punto 7 non è un asset visivo ma è **l'informazione decisiva**: è la risposta alla domanda
«cosa riuscite a fare internamente?». Oggi la pagina la dichiara mancante.

## 2. `/progetti` — interamente a segnaposto

Banner attivo. Cinque riquadri, nessuna immagine reale disponibile.

| # | Cosa serve | Formato | Note |
|---|---|---|---|
| 1–5 | Dettagli di progetti realizzati | 3:2 orizzontale, lato lungo ≥ 2400 px | dove c'è NDA servono **scatti di dettaglio non attribuibili**: la lavorazione si vede, il prodotto non si riconosce |

Servono anche, per ciascun progetto: tipologia (contract, residenziale, retail, illuminazione),
anno, finitura usata (codice del campionario), ed eventualmente il committente **se autorizzato**.

## 3. `/privacy` — testo legale

Banner attivo. In pagina c'è solo il **comportamento reale del sito**, verificabile nel codice
(quali dati raccoglie il modulo, dove finiscono, cosa il sito non fa). Mancano: base giuridica,
tempi di conservazione, elenco dei responsabili del trattamento, modalità di esercizio dei diritti.
Li scrive l'azienda o il suo consulente: non li scrive chi realizza il sito.

## 4. Fotografia dei campioni — due casi isolati

Non bloccano il sito (le 29 finiture sono tutte pubblicate) ma sono di qualità inferiore alle altre.

| Campione | Problema | Evidenza |
|---|---|---|
| `trasparenterame` (TR-03) | scatto sfocato e quasi piatto: non mostra la grana del materiale | l'originale PNG comprime a 2 KB in AVIF, `assets/optimized/README.md` |
| `trasparentebronzo` (TR-02), `sfumatof` (OS-05) | conservano una banda di luce orizzontale che la normalizzazione non ha rilevato | limite dichiarato del misuratore in `docs/specs/brass-style-site.md` §9: confronta i quadranti, quindi una banda centrata e orizzontale gli sfugge |

Rifare questi tre scatti con la stessa ottica e distanza degli altri 26.

## 5. Versione inglese — due voci aperte

| Cosa | Dove si vede | Nota |
|---|---|---|
| Le 14 illustrazioni di processo hanno le didascalie **in italiano** stampate dentro l'immagine (es. «BRUNITURA · OSSIDAZIONE») | tutte le pagine `/en/processes/*` e la home EN | non è bloccante (il testo della pagina è in inglese), ma per il sito EN servirebbe la stessa illustrazione con le scritte inglesi, o senza scritte |
| I testi EN sono la traduzione della **bozza** italiana | tutto `/en` | quando l'ufficio tecnico corregge una scheda IT, va corretta anche la gemella in `src/data/*.en.ts` (il gate `npm run validate` verifica che la voce EN esista, non che sia aggiornata) |

## 6. Cosa NON manca più (per non ricommissionarlo)

- Le 29 macro di finitura: **non servono** per partire. La SPEC §9 lo ha deciso sui numeri dopo la
  normalizzazione (`tools/normalize-samples.py`), contro quanto ipotizzato in `design-directions.md`.
- Le 14 illustrazioni di processo: ci sono tutte e sono in uso su `/lavorazioni` e in home.
- Il video della molatura: c'è, ri-encodato (AV1 0,56 MB / H.264 2,9 MB / 720p 1,2 MB + poster).
- L'illustrazione «controllo qualità» citata in `design-directions.md` (direzione B): **non serve**,
  perché il sito non usa il tracciato a 9 stazioni di quella direzione.
