# RESEARCH — cosa comunica il settore, come si muove il lusso

> Regola seguita: **si cita solo ciò che ho aperto in questa sessione (2026-09-18).**
> Dai concorrenti ho estratto *informazione e comportamento*, mai estetica — il loro stile visivo
> non è un riferimento e non è entrato in `design-directions.md`.
> Dai benchmark di lusso ho estratto *grammatica di interazione*, misurata nel browser, non
> descritta a memoria.

---

## Parte 1 — Concorrenti e settore

### URL aperti e cosa ci ho trovato

| URL aperto | Cos'è | Come |
|---|---|---|
| `https://www.metalbril.it/en/` | Finitura decorativa metalli, Riese Pio X (TV) — il concorrente più vicino | WebFetch |
| `https://decastelli.com/en/` | De Castelli, design in metallo, contract e custom | Playwright (misurato) |
| `https://decastelli.com/en/finishes/satin/` | Scheda di UNA finitura | WebFetch |
| `https://www.metal3srl.com/en/manufacturing` | Metal 3, lavorazioni metalliche per arredo | WebFetch |
| `https://www.molteniemolteni.it/` | Lavorazione e finitura metallo per arredo lusso | WebFetch — **pagina quasi vuota al fetch, vedi nota** |
| `https://www.officinefama.it/certificazioni` | Pagina certificazioni di un terzista | WebFetch — **contenuto non estratto, vedi nota** |
| `http://www.brassstyle.com/` | Il placeholder attuale del cliente | curl |

**Nota di onestà su due fonti:** `molteniemolteni.it` e `officinefama.it/certificazioni` hanno
restituito al fetch solo il `<title>` (sono pagine che costruiscono il contenuto via JS o
bloccano l'estrazione). **Non le uso come evidenza**: so solo che esistono e di cosa si occupano.
`de-castelli.com` (con trattino), suggerito come candidato, **non esiste**: `getaddrinfo ENOTFOUND`.
Il dominio corretto è `decastelli.com`.
Le ricerche di partenza — «lavorazione ottone conto terzi arredo lusso Brianza», «metal finishing
company luxury furniture contract brass finishes» — hanno prodotto anche altri nomi (Giulipas,
Lux Metal, ME.TE.S., CMS Meccanica, Tresoldi) che **non ho aperto**: li lascio qui come piste,
non come evidenza.

### Cosa pubblicano davvero (e cosa no)

**Metalbril** — la navigazione è organizzata per **materia → processo → risultato**, non per
prodotto:
`Company (Metalbril, Certifications)` · `Metals (Brass, Aluminium, Copper, Inox, Iron)` ·
`Processes (Design, Burnishing, Painting, Laser, Welding, Cleaning)` ·
`Finishes (Materic, Oxidized, Travertine, Painted)` · `Projects` · `Catalogues` · `Contacts`.
Le finiture hanno **codici alfanumerici** (V50, V46, V78, M60, O19–O35) e sono **categorizzate**
(Painted / Materic / Oxidized). La chiusura commerciale è a tre livelli:
form «richiedi preventivo senza impegno», **catalogo digitale scaricabile via email**, e una
**"Create color chart"**: selezioni fino a 10 campioni e ricevi la scatola fisica.
Non pubblicano ISO, parco macchine, tolleranze né MOQ.

**De Castelli** — menu: `Products · Projects · Materioteca · Cultura · Be inspired · About ·
Dealers · Agenda · Designer · Downloads · Press · Careers · Contacts`.
La scheda finitura (`/finishes/satin/`) è la cosa più utile vista in tutta la ricerca. Per la
finitura *Satin* pubblica: **tre varianti con codice e materiale base** (Satin Stainless steel D1,
Satin Brass F1, Satin Copper F5); **come è fatta** («finitura artigianale creata manualmente con
Scotch-Brite, seguita da lacca protettiva lucida per ottone e rame, non per acciaio»); e la
**manutenzione con il pH esatto** (panno di cotone umido o prodotti neutri pH 6,8–7,2; vietati
abrasivi, solventi, alcol). Dichiara esplicitamente di **non fornire semilavorati** e chiude con
«è sempre consigliato consultare campioni fisici». Non c'è un form di richiesta campione sulla
pagina.

**Metal 3** — l'opposto: navigazione minima (`About us · Design · Manufacturing · Contact us`),
ma la pagina Manufacturing **elenca le macchine per nome**: sistema laser tubo «BLM LT7 laser tube
fiber» automatizzato, piegatubi E-TURN, presse, flowdrill, filettatrici, magazzino automatico
Ciampalini, e soprattutto **«10 postazioni di saldatura manuale» e «2 saldature robotizzate»**.
Settori serviti dichiarati: interior, outdoor, nautico, office, contract. Nessuna ISO, nessuna
tolleranza.

### Le cinque cose che il settore fa, e che Brass Style oggi non fa

1. **La navigazione è per materia e processo, non per "collezioni".** Metalbril separa *Metals* da
   *Processes* da *Finishes*. Il sito attuale di Brass Style ha una griglia di 10 "card servizio"
   tutte allo stesso peso e una nav che parla di Galleria e Focus On. `⚠️ non misurato: nessuno mi
   dice che questa struttura converta meglio — ma è ciò che due concorrenti su tre fanno, e
   corrisponde a come il buyer formula la domanda ("chi mi fa la brunitura su ottone?").`
2. **Le finiture hanno un codice.** V50, D1, F1, F5. Un codice è ciò che il buyer scrive nella
   mail, nel capitolato e nell'ordine. Le 29 finiture di Brass Style hanno solo un nome, e in due
   lingue mescolate.
3. **La scheda finitura è un documento tecnico**, non una foto: materiale base, come è ottenuta,
   protezione applicata, manutenzione. De Castelli arriva al pH.
4. **Il campione fisico è la conversione vera.** Metalbril lo rende un prodotto ("scegli fino a 10,
   te li spediamo"). De Castelli lo raccomanda esplicitamente. **Nessuno dei due si aspetta di
   chiudere sul sito**: il sito serve a far partire la scatola dei campioni.
5. **Chi ha le macchine, le nomina.** Metal 3 scrive «BLM LT7» e «10 postazioni di saldatura».
   È la prova di capacità più economica che esista: costa una lista.

### Cosa il settore NON pubblica (e quindi non serve inventare)
Su tre siti aperti: **zero tolleranze dichiarate, zero MOQ, zero lead time, zero ISO con numero di
certificato.** Se il committente non ha questi dati pronti, **non è un gap competitivo** —
nessuno dei concorrenti li espone. Il gap competitivo è il codice finitura e la scheda tecnica.

---

## Parte 2 — Benchmark di movimento

Qui non ho letto articoli: ho **aperto le pagine con un browser vero e interrogato il DOM e le
Performance API**. I numeri sotto sono di quel momento (2026-09-18) e includono lo script di
analytics/consenso di ciascun sito.

| URL aperto | GSAP | Lenis | Three.js | `scroll-behavior` | Peso | Richieste |
|---|---|---|---|---|---|---|
| `https://www.bulgari.com/en-int/` | **no** | **no** | **no** | `auto` | 2.531 KB | 67 |
| `https://www.gucci.com/int/en/` | **no** | **no** | **no** | `smooth` (nativo CSS) | 1.891 KB | 148 |
| `https://www.fantini.it/en/` (→ `/it-it`) | **sì, 3.13.0** | **no** | **no** | `auto` | 1.344 KB | 109 |
| `https://decastelli.com/en/` | **no** | **no** | **no** | `auto` | 2.089 KB | 41 |

### Il dato che cambia il progetto

**Nessuno dei quattro usa uno smooth-scroll JS.** Bulgari, Fantini e De Castelli lasciano lo scroll
nativo del browser (`auto`); Gucci usa `scroll-behavior: smooth`, che è **una riga di CSS, non una
libreria**. Nessuno dei quattro carica Three.js o WebGL in homepage.

Il sito attuale di Brass Style carica **Lenis** (`index.html:453`, 3,7 KB) per fare scroll-hijack
che nessuno dei brand di riferimento fa, e **GSAP + ScrollTrigger** (41 KB) per animare
`clipPath` e `opacity` che il CSS fa da solo.

Fantini è l'unico che usa GSAP — ed è anche il **più leggero dei quattro** (1.344 KB): lo usa per
animazioni puntuali, non per prendere il controllo dello scroll.

### Trattamento del video (misurato sugli elementi `<video>` reali)

**Gucci:** un `<video>` con `loop=true`, `muted=true`, **`autoplay=false`**, **`preload="none"`**,
**poster presente**. Risultato: alla prima paint il video pesa **0 KB**; parte solo quando serve.
**Fantini:** tre `<video>` (1920×816, 2048×872, 3840×2160) tutti con `muted`, `loop`, `poster`,
`autoplay=false` a livello di attributo. Al load sono stati trasferiti **211 KB di video** su
1.344 KB totali: streaming progressivo, non il file intero.

Il sito attuale scarica **88,6 MB di video prima che l'utente abbia deciso qualcosa**, senza poster.
La differenza fra "poster + preload=none" e "autoplay su file da 90 MB" è l'intera differenza fra
i due mondi. Gucci serve inoltre tutte le immagini con `loading="lazy"` e `srcset`.

### Grammatica tipografica e di transizione
- **Bulgari:** font proprietario («Bulgari Type», fallback Futura), `<h1>` a **27px**. Il titolo
  non è gigante: la gerarchia è data dallo spazio, non dalla dimensione. Transizioni campionate
  sugli elementi interattivi: **0,25 s ease-out**. Header non sticky.
- **Gucci:** «Gucci Sans Pro», header `position: static` — **l'header scorre via**, non insegue
  l'utente. Nessuna transizione dichiarata sugli elementi campionati: gli stati cambiano secchi.
- **Fantini:** «MessinaSans_regular». Nav a 6 voci: `Company · Scopri collezioni · News ·
  Projects · Trova prodotti · Professionals`. Nota: **«Professionals» è una voce di primo livello**
  — il canale B2B ha la stessa dignità del canale prodotto.
- **De Castelli:** font «Gramatika», WordPress + jQuery. L'asset più pesante della home è un
  **GIF da 414 KB** — un errore tecnico, non un riferimento. Carica in home `jspdf.js` (356 KB) e
  `html2canvas.min.js` (164 KB): stanno generando **un PDF lato client**, verosimilmente della
  selezione finiture/moodboard. `⚠️ non misurato: non ho aperto il flusso che genera il PDF, quindi
  a cosa serva esattamente è un'inferenza dai nomi dei file.`

### Cosa è replicabile e cosa è costoso e inutile

**Replicabile, costo quasi zero, effetto alto**
- Scroll nativo (o `scroll-behavior: smooth`): **−3,7 KB e zero rischio di jank**, ed è ciò che
  fanno 4/4 dei riferimenti.
- Video con `poster` + `preload="none"` + play su intersezione: **−88,6 MB alla prima paint**.
- `loading="lazy"` + `srcset` su tutto (Gucci).
- Transizioni brevi e uniformi (0,2–0,3 s, ease-out), non reveal su ogni sezione.
- Un `<h1>` moderato con molto spazio intorno (Bulgari, 27px) invece di un display da 180px.
- Una voce di menu dedicata al professionista (Fantini, «Professionals»).

**Costoso e inutile per un B2B che deve generare richieste di preventivo**
- **Smooth-scroll JS (Lenis)**: nessuno dei quattro lo usa; aggiunge un frame di latenza a ogni
  input di scroll e va risincronizzato con ScrollTrigger (`main.js:85`).
- **WebGL/Three.js in homepage**: 0/4. Su un sito la cui pagina più importante è un campionario
  filtrabile, il costo va nel campionario, non in una scena 3D.
- **Cursore custom con `cursor:none`**: 0/4 lo fanno. Bulgari e Gucci usano il cursore di sistema.
- **Transizioni di pagina orchestrate**: nessuno dei quattro ne ha una in homepage.
- **GIF come media principale** (De Castelli, 414 KB): controesempio, non modello.

---

## Sintesi operativa

Il settore compete su **informazione strutturata** (codice finitura, scheda tecnica, lista
macchine, campione fisico) e nessuno dei concorrenti aperti lo fa bene: Metalbril ha il miglior
funnel campioni ma nessun dato tecnico, De Castelli ha la miglior scheda finitura ma nessun funnel
sul campione, Metal 3 ha le macchine ma una navigazione di quattro voci.

Il lusso, misurato, **non è movimento**: è silenzio, poco peso, media che non si scarica finché non
serve, e tipografia che non urla. Il sito attuale ha esattamente l'inverso: 88,6 MB di video
autoplay, scroll-hijack, cursore rubato, e un display da 180px.

**La finestra per Brass Style è unire le due cose che i concorrenti tengono separate: il codice
finitura con scheda tecnica (De Castelli) DENTRO un funnel di richiesta campioni (Metalbril),
servito con la disciplina di peso di Gucci/Fantini.**
