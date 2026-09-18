# DESIGN DIRECTIONS — tre tesi su cosa significa lusso per un terzista dell'ottone

> **Tutti gli hex di questo documento sono campionati dagli asset reali del cliente**, non presi a
> memoria. Metodo: PIL, crop centrale al 60% per escludere bordi e ombre della scansione, media su
> `resize((1,1), LANCZOS)` + quantizzazione mediancut a 5 colori con le percentuali di occupazione.
> Ogni coppia di colori ha il rapporto di contrasto WCAG 2.1 **calcolato**, non stimato.
> Le tre direzioni sono tre tesi diverse, non tre gradazioni della stessa.

---

## Il campionamento: l'ottone vero di Brass Style

```
trasparenteottone.png   media #BDA05B   dom #EBCB72 26% · #8A7446 22% · #C9A95E 22% · #957E4B 15% · #A68B50 15%
ottoneglitter.png       media #CBB665   dom #C6B060 28% · #CDB967 23% · #BBA557 20% · #D4C16D 18% · #DECD7B 11%
crossedbronze.png       media #592D1D   dom #4A2014 27% · #2F130C 22% · #5D2F1F 21% · #713E2A 17% · #93593E 12%
brunitura.png           media #151312   dom #0E0D0D 29% · #100F0D 28% · #121211 22% · #0B0B0A 11% · #322B24 10%
bronzoantico.png        media #6F6456
nuvolatomedio.png       media #8D826E   dom #877C69 27% · #8F8570 23% · #7B7161 20% · #978D76 18% · #A3987E 12%
patinatochiaro.png      media #BEAD93   dom #B7A68B 28% · #A8967D 22% · #C3B197 22% · #CDBCA1 17% · #DBCAAF 11%
satinatocdf.png         media #7D7971
effettomarmotexture.png media #716B59   dom #79725F 25% · #AAA288 22% · #433E35 18% · #635C4C 18% · #565144 17%
```

**Cosa dicono questi numeri.** L'ottone di Brass Style **non è giallo oro**: è `#C9A95E`, un ottone
sporco e leggermente verde, con una luce alta a `#EBCB72` e un'ombra a `#8A7446`. Il famoso
`#B5A642` "brass" dei generatori di palette **non compare in nessuno dei 29 campioni**. E il nero
della brunitura è `#0E0D0D`, praticamente assoluto, con un `#322B24` che è già ruggine: è il nero
del loro forno, non il `#0A0A0A` di default.

**Vincolo tipografico che vale per tutte e tre.** Il sito attuale usa **Cormorant Garamond + Inter**
(`index.html:10`): entrambi sono nella reflex-reject list di `impeccable` (default da training data,
producono monocultura), e la coppia serif-display-italico + sans-neutro è esattamente la lane
"editorial-typographic" che la stessa skill segnala come satura nel 2026. **Nessuna delle tre
direzioni li usa.** Tutti i font proposti sono stati verificati esistenti su Google Fonts in
sessione (`HTTP 200` su `fonts.googleapis.com/css2`).

---

# Direzione A — «LA MATERIA»

### Tesi
**La materia è il prodotto.** Il buyer non compra un servizio, compra una superficie: il sito è un
campionario che si può quasi toccare, e tutto il resto è didascalia.

### Token

| Ruolo | Hex | Origine campionata | Contrasto |
|---|---|---|---|
| `--canvas` | `#0E0D0D` | dominante 29% di `brunitura.png` | — |
| `--surface` | `#1A1613` | ombra profonda di `crossedbronze.png` (`#2F130C`) desaturata | — |
| `--ink` | `#E8E4DC` | alta luce dei campioni chiari | **15,31:1** su canvas · **14,18:1** su surface |
| `--muted` | `#8D826E` | media esatta di `nuvolatomedio.png` | **5,13:1** su canvas |
| `--brass` | `#C9A95E` | dominante 22% di `trasparenteottone.png` | **8,61:1** su canvas · **7,98:1** su surface |
| `--brass-hi` | `#EBCB72` | dominante 26% (l'alta luce) | usare solo per bordi e stati hover |
| `--rust` | `#713E2A` | dominante 17% di `crossedbronze.png` | accento rarissimo, solo su "campione esaurito"/alert |

Testo scuro su bottone ottone: `#0E0D0D` su `#C9A95E` = **8,61:1**.
Strategia di colore: **Committed** — il nero brunitura occupa ~85% della superficie, l'ottone è
razionato all'interazione e ai bordi dei campioni. Nessun secondo accento cromatico.

### Tipografia
**Una sola famiglia: Archivo** (Google Fonts, variabile, `HTTP 200` verificato), con la sottofamiglia
**Archivo Expanded** per il display. Motivazione: è un grottesco derivato dai caratteri per
stampa su metallo e insegna — largo, tozzo, senza affettazione calligrafica. La gerarchia è data
da **scala e larghezza, non da un secondo font**: nessun serif italico, nessuna coppia.

```
display  clamp(44px, 6vw, 88px)   Archivo Expanded 600   lh 0.98   ls -0.02em   text-wrap: balance
h2       clamp(30px, 3.4vw, 48px) Archivo Expanded 600   lh 1.05   ls -0.015em
h3       22px                     Archivo 600            lh 1.25
body     17px                     Archivo 400            lh 1.65   max 68ch   text-wrap: pretty
label    12px                     Archivo 500            ls 0.08em  (NON uppercase su ogni sezione)
code-fin 13px                     Archivo 500            ls 0.04em  (codice finitura, es. OT-04)
```
Rapporto della scala: 88/48 = 1,83 · 48/22 = 2,18 · 22/17 = 1,29 — sopra il minimo 1,25 richiesto.
**Ceiling rispettato:** display max 88px (≤96px), letter-spacing −0,02em (≥ −0,04em).

### Griglia, spazio, forma
Griglia a 12 colonne, max-width 1360px, gutter 24px, margine laterale `clamp(20px, 5vw, 72px)`.
Spaziatura su scala 4/8/12/16/24/32/48/64/96/128 — sezioni a 96–128px, gruppi interni a 16–24px:
**il ritmo varia**, non è una banda uniforme.
Radius: **4px** su card e campi, 0 su sezioni, pill solo sui filtri del campionario.
Trattamento del nero: `--canvas` piatto, senza gradienti; la profondità viene dalla differenza
`#0E0D0D` → `#1A1613` (due valori, nessuna ombra). **Nessun box-shadow decorativo nel sistema.**

### Grammatica di movimento
- **Si muove:** l'immagine del campione al passaggio del puntatore (vedi wow), l'apertura del
  visore finitura (opacity 240 ms + scale 0.98→1), il cambio di stato dei filtri (160 ms).
- **Durate:** 160 ms micro-stati · 240 ms apertura · 320 ms il campione. Easing unico:
  `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint). Nessun bounce, nessun elastic.
- **NON si muove:** lo scroll (nativo, niente Lenis), l'header, il titolo all'ingresso, le sezioni
  allo scroll. Zero reveal-on-scroll: 4/4 dei riferimenti misurati non ne hanno
  (`docs/research.md` Parte 2).

### Asset
**Del repo, riusati così come sono:** i 29 PNG di finitura (convertiti in AVIF, §pipeline) — sono
il 90% della pagina. `culture.mp4` re-encodato come unico media in movimento.
**Nuovi, da commissionare (specifici):**
1. **29 macro in luce radente**, una per campione, 3000 px sul lato lungo, sorgente luminosa a
   ~15° dal piano per far leggere la grana, fondo nero, stessa distanza e stesso obiettivo per
   tutte e 29 (è un campionario: la comparabilità conta più della bellezza del singolo scatto).
2. **1 foto di reparto**, orizzontale, 4000 px, per la pagina Azienda.
Costo di produzione: mezza giornata di still-life + mezza di reportage. `⚠️ non misurato: è una
stima di tempo, non un preventivo.`

### Effetto "wow" tecnico e suo costo
**«Campione sotto luce radente»**: al passaggio del puntatore sulla card, un gradiente radiale
speculare segue il mouse sopra l'immagine, come inclinare un campione fisico sotto una lampada.
Implementazione: due CSS custom properties (`--mx`, `--my`) aggiornate da un listener `pointermove`
passivo, `background: radial-gradient(...)` su uno pseudo-elemento in `mix-blend-mode: soft-light`.
- **Costo in KB:** 0 KB di libreria; ~25 righe di CSS e ~15 di JS. `⚠️ non misurato: stimo <1 KB
  minificato — si misura allo step 2 con il bundle report, non prima.`
- **Costo in ms:** anima solo `background-position` su un pseudo-elemento compositato.
  `⚠️ non misurato: va verificato in DevTools Performance che resti fuori dal main thread; il
  criterio d'uscita è INP < 200 ms sulla pagina finiture.`
- **Mobile:** disattivato (non esiste un puntatore). La card mostra la macro statica.
- **`prefers-reduced-motion: reduce`:** effetto rimosso, resta la card statica. Nessuna perdita di
  informazione: la luce radente è già nella macro fotografata.

### Perché è credibile per un buyer B2B
Perché mette al centro **l'unica cosa che il buyer deve valutare**: com'è fatta la superficie. Un
interior studio sceglie una finitura guardandola, e oggi deve chiedere la scatola dei campioni
perché nessun sito gliela fa leggere. Non è "bello": è **il campionario che sostituisce la prima
mail**. Rischio dichiarato: se le 29 macro non vengono commissionate, questa direzione collassa —
le scansioni attuali non reggono da sole un sito costruito sulla materia.

---

# Direzione B — «IL PROCESSO»

### Tesi
**Il processo è il prodotto.** Nessuno compra ottone da Brass Style: comprano la certezza che
progettazione, saldatura, brunitura, verniciatura, assemblaggio e imballo avvengano **sotto lo
stesso tetto, nell'ordine giusto**. Il sito è quel tetto, disegnato.

### Token

| Ruolo | Hex | Origine campionata | Contrasto |
|---|---|---|---|
| `--canvas` | `#0E0D0D` | `brunitura.png`, dominante 29% | — |
| `--surface` | `#141210` | fra `#121211` e `#151312` di `brunitura.png` | — |
| `--ink` | `#E8E4DC` | — | **15,31:1** su canvas |
| `--muted` | `#A3987E` | dominante 12% di `nuvolatomedio.png` (la più chiara) | **6,79:1** su canvas · **6,54:1** su surface |
| `--line` | `#EBCB72` | dominante 26% di `trasparenteottone.png` | **12,31:1** su canvas · **11,85:1** su surface |
| `--line-dim` | `rgba(235,203,114,0.24)` | stesso oro al 24% | tracciato del processo non attivo |
| `--forge` | `#322B24` | dominante 10% di `brunitura.png` | fondo delle stazioni non ancora raggiunte |

`--line` non è un accento generico: è **esattamente il colore delle linee delle 14 illustrazioni
già in cartella**, che diventano così parte del sistema invece di essere immagini incollate sopra.
Strategia: **Committed**, un solo cromatico (l'oro-linea), il resto è valore.

### Tipografia
**Bricolage Grotesque** (Google Fonts, variabile con asse `opsz`, `HTTP 200` verificato) per display
e testo, **Sometype Mono** (`HTTP 200`) **solo** per quote, tolleranze, codici e numeri di stazione.
Motivazione: Bricolage è un grottesco con difetti intenzionali e larghezza variabile — ha l'aria
di un carattere da manuale di officina, non da brand book; il mono qui **non è costume tecnico**,
è l'uso legittimo (dati numerici in colonna che devono allinearsi).
Coppia legittima perché sull'asse di contrasto giusto: grottesco + monospaziato, non due sans simili.

```
display  clamp(40px, 5.2vw, 76px)  Bricolage Grotesque 700  lh 1.0  ls -0.025em
station  clamp(28px, 3vw, 44px)    Bricolage Grotesque 600  lh 1.1
body     17px                      Bricolage Grotesque 400  lh 1.7  max 68ch
spec     14px                      Sometype Mono 400        lh 1.5  ls 0
num      13px                      Sometype Mono 500        tabular-nums
```

### Griglia, spazio, forma
**Griglia a binario**: una colonna stretta a sinistra (`120px`) che tiene il tracciato del processo
— una linea verticale oro con 9 nodi, uno per fase — e una colonna larga per il contenuto. Sotto
900px il binario diventa orizzontale e sticky in alto (48px).
Radius 2px (quasi squadrato: è un disegno tecnico). Spaziatura 8/16/24/40/64/104.
Trattamento del nero: `--canvas` piatto; le stazioni non raggiunte hanno fondo `--forge` e passano
a `--surface` quando diventano attive — **la profondità racconta l'avanzamento, non decora**.
**Qui i numeri 01–09 sono legittimi** (è una sequenza reale e ordinata), a differenza del sito
attuale dove `01,02,02,03,04,05,05,05,05,05` numera dieci card che non sono una sequenza
(`docs/as-is.md` §2.7).

### Grammatica di movimento
- **Si muove:** il nodo attivo sul binario (il pallino si riempie di `--line`, 200 ms); la linea
  che si allunga fra i nodi, legata alla posizione di scroll (`scrub`); **il video della molatura,
  scrubbato sullo scroll** nella sezione Brunitura.
- **Durate/easing:** 200 ms i nodi (`ease-out-quint`); lo scrub non ha durata propria, segue lo
  scroll 1:1 senza inerzia.
- **NON si muove:** il testo delle stazioni (appare già visibile, niente gate su classe), l'header,
  le illustrazioni. Nessun parallax: il sito attuale ne ha 3 (`main.js:94,128`) e nessuno dei 4
  riferimenti ne ha uno.

### Asset
**Del repo:** le **14 illustrazioni di processo** sono il cuore di questa direzione e sono già
coerenti (`docs/as-is.md` §4-B) — vanno solo normalizzate allo stesso aspect ratio e convertite
(174,7 KB per tutte e 14). `culture.mp4` diventa il momento fotografico unico. I 29 campioni
restano, ma come **esito** di una fase, non come protagonisti.
**Nuovi da commissionare:**
1. **1 illustrazione mancante** per la fase "Controllo qualità/collaudo", nello stesso stile oro
   su nero delle 14 esistenti (oggi la fase non è rappresentata).
2. **9 foto di reparto**, una per stazione, orizzontali 3000 px — servono a dimostrare che le
   illustrazioni corrispondono a macchine reali. Senza queste, la direzione resta un'infografica.
3. **Una lista scritta del parco macchine.** Non è un asset visivo ma è **l'informazione decisiva**:
   Metal 3 nomina «BLM LT7» e «10 postazioni di saldatura manuale» (`docs/research.md`), e costa
   una tabella.

### Effetto "wow" tecnico e suo costo — **misurato**
**Video della molatura scrubbato sullo scroll** (TIER V della skill `premium-3d-site`: il
fotorealismo di una scintilla non si fa in shader).
Re-encode eseguiti in sessione sul file reale:

| Variante | Comando | Peso **misurato** |
|---|---|---|
| GOP=1 720p crf23 (scrub fluidissimo) | `-g 1 -c:v libx264 -profile:v main -crf 23 -vf scale=1280:-2 -an -movflags +faststart` | **4,98 MB** |
| GOP=5 720p crf26 (scrub buono) | `-g 5 -c:v libx264 -crf 26 -vf scale=1280:-2 -an` | **1,54 MB** |
| poster AVIF | `-ss 7 -frames:v 1` → `libaom-av1 -crf 32` | **12,4 KB** |

- **Costo in KB:** GSAP core + ScrollTrigger = **41,0 KB** trasferiti (25,2 + 15,8, misurati sulla
  pagina attuale) + **1,54 MB** di video. **Raccomandazione: GOP=5, non GOP=1** — 3,4 MB in più per
  una fluidità che su una clip lenta e scura nessuno distingue.
- **Costo in ms:** `⚠️ non misurato: il costo di `currentTime` seek per frame va misurato allo step 2
  con un profilo DevTools; il criterio d'uscita è nessun long task > 50 ms durante lo scrub.`
- **Mobile:** niente scrub. Poster AVIF (12,4 KB) + tap-to-play sul 720p standard (0,67 MB
  misurati). Il video **non** si scarica finché non si tocca: `preload="none"`, come fa Gucci.
- **`prefers-reduced-motion: reduce`:** scrub disattivato, resta il poster statico con la didascalia.
  Il contenuto informativo (cos'è la brunitura) è nel testo, non nel video.

### Perché è credibile per un buyer B2B
Perché risponde alla domanda che il buyer fa davvero al telefono: «*ma la brunitura la fate voi o
la mandate fuori?*». Un tracciato di 9 stazioni con dentro le macchine e le foto è la risposta
in forma visiva, e **nessuno dei tre concorrenti aperti la dà**: Metalbril elenca i processi ma non
li collega, Metal 3 ha le macchine ma quattro voci di menu. Rischio dichiarato: senza le 9 foto di
reparto e la lista macchine, il tracciato è una promessa grafica non verificabile — ed è esattamente
il "sito fuffa" che il committente non vuole.

---

# Direzione C — «IL CAPITOLATO» *(la scelta difensiva — presa sul serio)*

### Tesi
**La chiarezza è il lusso.** Un progettista che deve chiudere un capitolato non vuole essere
sedotto: vuole sapere in trenta secondi se sai fare *quella* finitura su *quel* metallo, con che
codice la ordina e a chi scrive. Il sito è un documento tecnico ben composto — e non pesa niente.

### Token
Tema chiaro, ma **non il cream**: `impeccable` segnala tutta la banda warm-neutral chiara
(cream/sand/paper/bone/linen) come il default saturato del 2026, e il sito attuale ci è dentro in
pieno (`--cream:#EDEAE3`, `style.css:2`). Qui il fondo è un **off-white a croma zero**: la
temperatura la portano i campioni fotografati, non la carta.

| Ruolo | Hex | Origine | Contrasto |
|---|---|---|---|
| `--canvas` | `#EFEFEF` | neutro puro, croma 0 — scelta di contrasto, non campionata | — |
| `--surface` | `#E4E4E4` | idem, un gradino sotto | — |
| `--ink` | `#151312` | media esatta di `brunitura.png` | **16,11:1** su canvas |
| `--muted` | `#57534E` | derivato scuro di `satinatocdf.png` (`#7D7971`) | **6,63:1** su canvas · **6,00:1** su surface |
| `--brass` | `#7E6A40` | ombra di `trasparenteottone.png` (`#8A7446`) **scurita per passare il body** | **4,54:1** su canvas |
| `--brass-decor` | `#C9A95E` | ottone reale, dominante 22% | **1,96:1** su canvas → **mai testo**, solo bordi, fondi e swatch |
| `--footer` | `#151312` con `#EFEFEF` sopra | — | **16,11:1** |

Nota onesta, con i numeri veri: `#8A7446`, l'ombra campionata pura, dà **3,91:1** su `#EFEFEF` —
passa solo per testo grande. L'ho scurito a `#7E6A40` per il corpo: **4,54:1** su `--canvas`, ma
**4,11:1** su `--surface` (`#E4E4E4`) — quindi i link nelle superfici grigie vanno a `--ink`, non a
`--brass`. E `#C9A95E`, l'ottone reale, su questo fondo chiaro fa **1,96:1**: è inutilizzabile come
testo, e va detto invece di scoprirlo in produzione. In prima stesura avevo scritto 3,03:1 a
occhio; il calcolo lo ha smentito.
Strategia: **Restrained** — neutri + un accento sotto il 10% della superficie. È l'unica delle tre
che rinuncia al colore come voce, e lo fa consapevolmente.

### Tipografia
**Una sola famiglia: Public Sans** (Google Fonts, `HTTP 200` verificato) — il carattere dello
US Web Design System: neutro, altissima leggibilità ai corpi piccoli, nessuna affettazione da brand
book. Più **Sometype Mono** per codici finitura, tolleranze e quantità.
Motivazione: qui il carattere non deve avere una voce, deve **sparire** e lasciare leggere la
tabella. La gerarchia è tutta su peso e spazio.

```
display  clamp(34px, 4vw, 56px)  Public Sans 700   lh 1.08  ls -0.02em
h2       28px                    Public Sans 700   lh 1.2
h3       20px                    Public Sans 600   lh 1.3
body     17px                    Public Sans 400   lh 1.65  max 66ch
small    14px                    Public Sans 400   lh 1.5
spec     14px                    Sometype Mono 400 tabular-nums
```
Display max 56px: **deliberatamente basso**. Bulgari, misurato, ha un `<h1>` a 27px
(`docs/research.md`): il lusso non urla.

### Griglia, spazio, forma
Due colonne asimmetriche 4/8 (indice a sinistra, contenuto a destra) su desktop; una colonna sotto
860px. Max-width del testo 66ch — **è un documento, la riga corta è la funzione**.
Radius: **0px ovunque** tranne 6px sui campi del form. Nessuna card: le finiture sono una
**tabella** (`<table>`, ordinabile), non una griglia di riquadri. Nessuna ombra, nessun bordo
decorativo — solo `1px solid rgba(21,19,18,0.14)` come riga di tabella.
Trattamento del nero: appare solo nel footer e nelle miniature dei campioni. Il nero qui **non è
atmosfera**, è il fondo su cui l'ottone si legge.

### Grammatica di movimento
- **Si muove:** gli stati (`:hover`, `:focus-visible`, riga selezionata) a **150 ms linear**. Il
  filtro della tabella aggiorna le righe senza transizione: deve sembrare istantaneo.
- **NON si muove:** tutto il resto. Nessun reveal, nessun parallax, nessuna entrata, nessun
  smooth-scroll, nessun cursore custom.
- **Zero KB di libreria di animazione.** Niente GSAP, niente Lenis.
- `prefers-reduced-motion`: non cambia quasi nulla, perché non c'è quasi nulla da ridurre. È il
  segno che la direzione è coerente e non che è pigra.

### Asset
**Del repo:** i 29 campioni in AVIF come miniature 160px in tabella + full-res nel visore. Le 14
illustrazioni **non servono** in questa direzione (sono decorative rispetto a una tabella): restano
una per pagina-servizio. `culture.mp4` **non viene usato affatto** — o al massimo come poster
statico in Azienda.
**Nuovi da commissionare:** nessuno per partire. Questo è il punto: **è l'unica direzione
realizzabile con gli asset che il cliente ha già oggi.** In un secondo momento: le 29 macro (come in
A), che migliorano la tabella senza cambiarne la struttura.

### Effetto "wow" tecnico e suo costo — **misurato**
Il wow non è visivo: è che **la pagina con tutte e 29 le finiture, filtrabile, pesa meno di una
singola immagine di oggi**.

```
29 card AVIF 560w (misurate)     635,8 KB   (media 21,9 KB)
font Public Sans + Sometype Mono ~60 KB     ⚠️ non misurato: stima su 2 famiglie variabili
                                            subsettate latin — si misura allo step 2
CSS + HTML                       ~25 KB     ⚠️ non misurato
JS (filtro tabella, isola React) ~15 KB     ⚠️ non misurato
TOTALE pagina finiture           ~735 KB
```
Confronto misurato: `hero.webp` oggi da solo pesa **2.369,4 KB**, cioè **3,2×** l'intera pagina
finiture di questa direzione. E la homepage attuale pesa **91.099,8 KB**: **124× tanto**.
- **Costo in ms:** `⚠️ non misurato: il filtro su N=29 in memoria non ha un problema algoritmico
  (è un `filter` su un array di 29 elementi); il criterio d'uscita resta INP < 200 ms misurato, non
  argomentato.`
- **Mobile:** identica. È l'unica delle tre che non ha bisogno di una versione degradata, perché
  non c'è nulla da degradare.

### Perché è credibile per un buyer B2B — e perché non è un uomo di paglia
Tre ragioni concrete, non retoriche:
1. **È l'unica che il cliente può pubblicare adesso.** Le altre due sono bloccate da fotografia che
   non esiste (`docs/as-is.md` §5). Una direzione che si può spedire in tre settimane batte una
   direzione che aspetta un servizio fotografico.
2. **È quella che vince sulla SEO**, che per questo cliente è un driver dichiarato: testo
   strutturato, tabella indicizzabile, 735 KB, zero JS bloccante. Le direzioni A e B devono
   *difendere* i loro Core Web Vitals; questa parte già in vantaggio.
3. **È quella che assomiglia di più a come lavora il buyer.** Un progettista apre il sito con
   Revit aperto di fianco e sta cercando un codice da incollare in un capitolato. La tabella *è*
   il suo strumento.

**Il suo rischio va detto:** non differenzia. `⚠️ non misurato: non ho dati che dicano quanto pesi
la differenziazione visiva nella scelta di un terzista — è la ragione per cui esistono A e B.` Se il
committente vuole «trasmettere lusso», C da sola non lo fa: lo fa la fotografia dentro una struttura
come questa.

---

## Come si decide fra le tre (senza discutere di gusto)

| | A — La Materia | B — Il Processo | C — Il Capitolato |
|---|---|---|---|
| Risponde alla domanda | «com'è fatta questa superficie?» | «fate tutto voi?» | «quale codice ordino, a chi scrivo?» |
| Pubblicabile con gli asset di oggi | **no** (servono 29 macro) | **no** (servono 9 foto + lista macchine) | **sì** |
| Peso della pagina chiave | ~3–4 MB (macro full-res lazy) ⚠️ stima | ~2,3 MB (video 1,54 MB + 41 KB GSAP) misurato | **~735 KB** misurato |
| Libreria di motion | 0 KB | 41,0 KB (GSAP+ScrollTrigger) | 0 KB |
| Rischio principale | collassa senza la fotografia | promessa non verificabile senza le foto di reparto | non differenzia |

**Non sono mutuamente esclusive nel tempo.** C è la struttura; A è C più la fotografia dei campioni;
B è C più la prova dello stabilimento. La scelta vera che il committente deve fare non è
«quale stile mi piace» ma **«commissiono o no il servizio fotografico»**: è quella singola decisione
che abilita A e B e che nessuna scelta di font può sostituire.
