# AS-IS — Brass Style, stato verificato del repo e degli asset

> Sessione di verifica: 2026-09-18. Ogni numero in questo documento viene da un comando eseguito
> in quella sessione. Dove un dato NON è misurato è marcato `⚠️ non misurato`.
> Repo: `/home/simo/WebFarm/Brass-site`, branch `main`, un solo commit (`4f71a66 first commit`);
> `index.html` e `assets/` risultano **untracked** (`git status --short` → `?? assets/`, `?? index.html`).

---

## 1. Struttura e stack

| Voce | Valore verificato | Come |
|---|---|---|
| Pagina | `index.html`, one-page, 456 righe, 23.802 byte | `cat -n`, `ls -l` |
| CSS | `assets/css/style.css`, 323 righe, 19,2 KB | `wc -l`, transfer da `performance` |
| JS | `assets/js/main.js`, 135 righe, 6,1 KB | `wc -l`, transfer |
| Immagini | 49 file in `assets/images/` = **86,42 MB** | script PIL su tutta la cartella |
| Video | `assets/video/culture.mp4` = **90.777.222 B (86,6 MiB)** | `ls -l` + `ffprobe` |
| Repo totale | **174 MB** | `du -sh .` |
| Librerie | GSAP 3.12.5 + ScrollTrigger + Lenis 1.0.42, tutte da CDN | `index.html:451-453` |
| Font | Cormorant Garamond + Inter da Google Fonts | `index.html:10` |

**Peso reale della pagina, misurato in browser** (Playwright su `python3 -m http.server`,
`performance.getEntriesByType('resource')`):

```
26 richieste — 91.099,8 KB trasferiti (~89 MB)
  video  88.658,0 KB   (culture.mp4 da solo: 88.649,9 KB)
  img     2.370,1 KB   (hero.webp da solo: 2.369,4 KB)
  script     50,8 KB   (gsap 25,2 + ScrollTrigger 15,8 + main 6,1 + lenis 3,7)
  link       20,4 KB
DOMContentLoaded 2.153 ms · load 2.230 ms  (in locale, banda infinita)
```

Il documento HTML è 24 KB; **il 99,94% del peso sono due file**. In locale il `load` è 2,2 s
perché la banda è illimitata; su rete reale il video da solo domina tutto.
`⚠️ non misurato: LCP/INP reali su rete mobile — servirebbe una prova con throttling o campo CrUX.`

---

## 2. I 9 debiti segnalati: confermati tutti, con evidenza

### 2.1 Lightbox delle finiture rotta — **RIPRODOTTA, non dedotta**

`index.html:259` fa `var vImg = document.getElementById('bsf-view-img')`, ma nel
`<figure class="bsf-viewer__stage">` (`index.html:118-124`) **non esiste nessun `<img>`**: dentro
lo stage c'è solo il `<figcaption>`. `grep -n "bsf-view-img"` su `index.html`, `style.css` e
`main.js` restituisce **una sola occorrenza**, quella dello script.

Riproduzione in browser (Playwright, `http://localhost:8777/index.html`, click sulla prima
`.bsf-card`):

```
{ hasViewImg: false, cards: 15, viewerOpen: false, bodyOverflow: "" }

[console] TypeError: Cannot set properties of null (setting 'src')
    at open  (http://localhost:8777/index.html:345:14)
    at HTMLDivElement.<anonymous> (http://localhost:8777/index.html:280:61)
```

Al click `open()` muore su `vImg.src` (riga 345), quindi **non arriva mai** a
`viewer.classList.add('open')` (riga 349): il visore non si apre e le 15 card sono cliccabili a
vuoto. **La sezione più importante del sito per un buyer è completamente non funzionante.**

### 2.2 Link morti e voce di menu duplicata
`grep -c 'href="#"'` → **28** link a `#` in tutto il file. Nel menu overlay `index.html:28-33`
la voce **"Azienda" compare due volte** (righe 29 e 32); `grep -c '>Azienda<'` → 2.

### 2.3 Testo segnaposto in produzione
`index.html:391,392,393` — dentro `<nav class="bignav">`: `<h4>aaaaaaa</h4>`, `<h4>aaaaaa</h4>`,
`<h4>aaaaaaaaa</h4>`. Sono 3 delle 5 voci della big-nav.

### 2.4 Typo che produce un 404
`index.html:433` — `data-image="newletter.jpg"` (manca la `s`). Il file in cartella è
`newsletter.jpg`. Confermato a runtime:
`[ERROR] Failed to load resource: 404 @ /assets/images/newletter.jpg`.

### 2.5 Sette video inesistenti richiesti a ogni caricamento
`grep -o 'data-video="[^"]*"'` → `hero.mp4` ×1, `living.mp4` ×1, `bedroom.mp4` ×2,
`lighting.mp4` ×1, `bathroom.mp4` ×1, `outdoor.mp4` ×5, `newsletter.mp4` ×2, `culture.mp4` ×1.
In `assets/video/` esiste **solo `culture.mp4`**. Console a runtime: **13 richieste 404 di video**
(più il 404 di `newletter.jpg` e uno di `favicon.ico`) = **15 errori di rete al primo load**.
Il fallback di `main.js:47` funziona (l'immagine resta), ma il costo in richieste fallite è reale.

### 2.6 `cursor:none` globale
`style.css:9` — `body{…cursor:none;}`, più `cursor:none` su `.menu-btn` (41), `.overlay-close` (47),
`.btn` (84), `.nl-form button` (128). Il cursore di sistema sparisce ovunque e viene sostituito da
un `<div>` mosso a `requestAnimationFrame` (`main.js:55-62`). `style.css:36` lo disattiva su
touch (`@media (hover:none)`), ma su desktop resta: affordance persa sui controlli e nessun
fallback se il JS non parte.

### 2.7 Numerazione card servizi incoerente
`grep -o '<span class="num">[0-9]*</span>' | sort | uniq -c` → `01`×1, `02`×**2**, `03`×1, `04`×1,
`05`×**5**. Dieci card numerate 01,02,02,03,04,05,05,05,05,05 (`index.html:82-91`).

### 2.8 CSS duplicato byte-per-byte, non solo "inline"
Il blocco della sezione campionario è **presente due volte identiche**:
`index.html:129-224` (dentro un `<style>` inline) e `style.css:228-323`. `diff` fra i due estratti
restituisce solo le righe di cornice (`}` di chiusura e `</style>`): il corpo è lo stesso.
Sono ~4,9 KB serviti due volte e **due sorgenti di verità per lo stesso componente** (violazione DRY).
Lo script della stessa sezione è inline a `index.html:227-379` (152 righe) invece che in `main.js`.
Inoltre `style.css:163-226` definisce `.bs-contact` — `grep -c 'class="bs-contact"'` → **0**: CSS
morto, il markup usa `.newsletter` con figli `bs-contact__*`.

### 2.9 README che descrivono un altro sito
`README.md:1` si intitola **"NEUTRA — sito (ricostruzione)"**; `README.md:7-16` documenta la
struttura `neutra-site/`; `README.md:37` dice che «le immagini attuali sono segnaposto (texture
marmo)». `assets/images/README.md:7-15` e `assets/video/README.md:12-20` elencano gli slot
`hero/living/bedroom/lighting/bathroom/outdoor/culture/design/newsletter` — cioè le sezioni del
template originale, **nessuna delle quali corrisponde ai servizi di Brass Style**.

### 2.10 Dati reali presenti e da preservare (verificati riga per riga)
`index.html:406` Via Provinciale per Bulgorello, 3 — 22070 Vertemate con Minoprio (CO) ·
`:410` `tel:+39031780800` · `:414` `info@brassstyle.com` · `:418` P.IVA 01530540135 ·
`:422` Lun–Ven 8:00–17:30 · `:439` «soggetta all'attività di direzione e coordinamento di Jechijo Srl» ·
`:65-67` la storia aziendale (Figino Serenza, 1985, oltre quarant'anni) · `:82-91` i 10 nomi dei
servizi reali. **Questo è il contenuto che sopravvive alla riscrittura.**

---

## 3. Tre debiti NON segnalati che ho trovato misurando

### 3.1 Contrasto sotto soglia WCAG (calcolato, non stimato)
Rapporti di contrasto calcolati con la formula WCAG 2.1 sui token effettivi del CSS:

| Token e uso reale | Coppia | Rapporto | Verdetto |
|---|---|---|---|
| `--muted` su `--cream` — usato a **11px** in `.overlay-foot` (61), `.bignav .meta` (133), `.foot-bot` (143-144) | `#8C887C` / `#EDEAE3` | **2,95:1** | **FAIL**: sotto anche la soglia 3:1 del testo grande |
| `--bsf-muted` su `--bsf-bg` — usato a **11px** in `.bsf__count` (240) e come **placeholder** in `.bsf__search::placeholder` (244) | `#6E6A60` / `#100F0D` | **3,55:1** | **FAIL** per testo piccolo e per placeholder (richiedono 4,5:1) |
| `--ink` su `--cream` (corpo) | `#1A1916` / `#EDEAE3` | 14,63:1 | OK |

### 3.2 Zero SEO tecnica e zero percorso di conversione
`grep -c` su `index.html`: `canonical` **0**, `hreflang` **0**, `og:` **0**,
`application/ld+json` **0**, `<form` **0**. Non esistono `robots.txt` né `sitemap.xml`.
C'è un solo `<h1>` (buono) e 3 `<h2>`. **Non c'è nessun modo per un buyer di lasciare una
richiesta**: solo `mailto:` e `tel:`.

### 3.3 Il dominio live non è configurato per ospitare un sito
Misurato in sessione:
- `https://www.brassstyle.com/` → **errore TLS**: il certificato ha
  `CN = autodiscover.isri.it`, SAN `autodiscover.isri.it`, `www.autodiscover.isri.it`.
  Nessun browser apre l'HTTPS senza schermata d'errore.
- Con `curl -k`: `HTTP/1.1 302` → `Location: https://www.brassstyle.com/owa/`,
  `Server: Microsoft-IIS/8.5`. **L'IP del sito è il loro server Exchange/OWA.**
- `http://www.brassstyle.com/` → `200`, 2.233 byte: il placeholder
  «Il sito è in fase di modifica / Site under construction» + logo + tel + email.
- `dig +short www.brassstyle.com A` → `95.174.9.136`; `MX` → `mec-gr.esvacloud.com`.
- Nel sorgente del placeholder è presente **una chiave API Google Maps in chiaro**
  (non la riporto qui). Va limitata per referrer o ruotata prima del go-live.

Conseguenza operativa: **pubblicare il sito nuovo è anche una decisione DNS/hosting**, non solo
un deploy. Va presa prima della fine dell'implementazione.

---

## 4. Inventario asset per famiglia, con verdetto

Misure: dimensioni e `mode` con PIL, peso con `os.path.getsize`, video con `ffprobe`.
Le conversioni citate sono state **eseguite**, non stimate: `ffmpeg` con `libaom-av1`, e `libx264`
per il video.

### Famiglia A — Campioni di finitura · 29 PNG RGBA verticali · **59,28 MB** (media 2.093 KB)
Esempi misurati: `crossedbronze.png` 936×1303 RGBA 3.045,7 KB · `effettomarmotexture.png`
951×1306 RGBA 3.256,5 KB · `nuvolatomedio.png` 838×1303 RGBA 2.352,3 KB.
Sono foto/scansioni reali di campioni materici salvate in **PNG a 8 bit con canale alpha su
fotografie che non hanno trasparenza**: il formato peggiore possibile per questo contenuto.

Conversione eseguita su tutti e 29 i file:

```
PNG originali   : 59,28 MB
AVIF card 560w  :    635,8 KB totali (media 21,9 KB)   → −98,95 %
AVIF full res   :      2,22 MB totali (media 78 KB)    → −96,26 %
```

**VERDETTO: TENERE il contenuto, RI-ENCODARE il contenitore.** È l'asset più prezioso
dell'azienda e non va rifotografato: va solo convertito. Una griglia con tutte e 29 le card
passa da 59 MB a **636 KB**.
Nota: i nomi file non sono coerenti (mix IT/EN: `crossedbronze`, `sandedsilver`,
`borgognamaterico`, `sfumatof`) e nello script `index.html:231-247` sono elencate **solo 15**
delle 29 finiture presenti in cartella: 14 campioni pagati sono sul disco e invisibili sul sito.

### Famiglia B — Illustrazioni di processo · 14 PNG RGB · **23,60 MB**
`assemblaggio` `bronzatura` `brunitura` `fresatura` `imballaggio` `lavorazionimeccaniche`
`montaggio` `progettazione` `prototipazione` `prototipazioneimballi` `saldatore` `saldatura`
`trasporto` `verniciatura`. Formati misti: 1536×1024 (7 file), 1024×1024 (4), 1448×1086 (2),
1254×1254 (1). Linee oro su fondo nero, famiglia visiva coerente.

```
PNG originali        : 23,60 MB
AVIF 1200w crf32     :   174,7 KB totali (media 12,5 KB)  → −99,28 %
```

**VERDETTO: TENERE e RI-ENCODARE.** È già un sistema visivo riutilizzabile e comprime
benissimo (poche tinte, tratto netto). Da normalizzare: portare tutte le 14 allo stesso aspect
ratio, perché oggi convivono 3:2, 1:1 e 4:3 nella stessa griglia.

### Famiglia C — Segnaposto dichiarati · 4 JPG · 258,0 KB
`culture.jpg` e `design.jpg` 1400×1700 (95,1 + 93,5 KB), `lighting.jpg` e `outdoor.jpg`
700×1027 (39,5 + 29,9 KB). Hanno la scritta «placeholder · CULTURE» / «placeholder · DESIGN»
stampata sopra. `design.jpg` non è nemmeno referenziato in `index.html`.
**VERDETTO: BUTTARE.** Vanno sostituiti da fotografia reale (vedi §5).

### Famiglia D — Hero · `hero.webp` 2048×1365 · **2.369,2 KB**
Texture scura astratta con striature ottone, generica: non dice nulla di Brass Style.
`AVIF crf34: 4,6 KB (−99,9 %)` — comprime così tanto proprio perché è quasi tutta gradiente.
**VERDETTO: RI-ENCODARE se resta in uso come fondale, RI-PRODURRE come hero.** 2,4 MB per una
texture che è il 2º peso della pagina è insostenibile; e come prima immagine di un terzista
un gradiente astratto non comunica capacità produttiva.

### Famiglia E — Fuori palette · `newsletter.jpg` 1920×1920 · 998,1 KB
Swirl liquido arancio/nero, estraneo al brand. Referenziato solo tramite il typo
`newletter.jpg`, quindi **oggi non si vede**. **VERDETTO: BUTTARE.**

### Famiglia F — Video · `culture.mp4`
```
ffprobe: h264, 1920×1080, 24 fps, 354 frame, durata 14,750 s
         size 90.777.222 B, bit_rate 49.235.103 → 49,2 Mbps
```
È un **master di montaggio**, non un file web: 49 Mbps è ~50× il budget di un video di sfondo.
Contenuto ottimo (macro reale di una molatura con scintille, buio, cinematografico).
Re-encode eseguiti, stesso contenuto:

| Uso | Comando (eseguito) | Peso |
|---|---|---|
| sfondo 1080p | `-c:v libx264 -crf 26 -preset slow -vf scale=1920:-2 -an -movflags +faststart` | **1,64 MB** (−98,2 %) |
| sfondo 720p (mobile) | `-c:v libx264 -crf 28 -preset slow -vf scale=1280:-2 -an` | **0,67 MB** |
| scrub sullo scroll GOP=1 720p | `-g 1 -crf 23 -profile:v main -vf scale=1280:-2 -an` | **4,98 MB** |
| scrub GOP=5 720p | `-g 5 -crf 26 -vf scale=1280:-2 -an` | **1,54 MB** |
| poster | `-ss 7 -frames:v 1` → AVIF crf32 | **12,4 KB** |

**VERDETTO: TENERE il master fuori dal repo, RI-ENCODARE per il web.** Il master a 90 MB non
deve stare in git: va archiviato e versionata solo la derivata.

### Totale della pipeline
| | Oggi | Dopo |
|---|---|---|
| Finiture (29) | 59,28 MB | 0,64 MB (card) + 2,22 MB (full, lazy) |
| Illustrazioni (14) | 23,60 MB | 0,17 MB |
| Hero | 2,37 MB | 0,005 MB |
| Video | 90,78 MB | 1,64 MB (1080) + 0,67 MB (720) + 0,01 (poster) |
| Segnaposto + newsletter | 1,26 MB | 0 (buttati) |
| **Somma asset** | **~177 MB** | **~5,4 MB** |

---

## 5. Cosa manca davvero (non è un problema di formato, è un problema di materiale)

Nessuna conversione produce ciò che non è stato fotografato. Manca:
1. **Fotografia di reparto reale** — non esiste una sola foto dello stabilimento, delle macchine,
   delle persone al lavoro. Le 14 immagini di processo sono illustrazioni, non prove.
2. **Macro delle finiture sotto luce radente** — i 29 campioni sono scansioni piatte: leggibili
   come colore, mute sulla grana. Per un buyer la grana *è* l'informazione.
3. **Progetti realizzati** — zero. Un terzista viene scelto su «cosa hai già fatto per chi».
   Se ci sono vincoli di NDA con i brand, servono scatti di dettaglio non attribuibili.
4. **Numeri di capacità** — nessuna superficie in m², nessun elenco macchine, nessuna
   certificazione, nessun dato di volume o di lead time.

---

## 6. Verdetto sul lavoro esistente

Il lavoro dell'amico del committente **ha fatto due cose che valgono e vanno tenute**: ha raccolto
i contenuti reali dell'azienda (anagrafica, storia, i 10 nomi dei servizi, i 29 campioni di
finitura) e ha capito che il campionario è il cuore del sito — la sezione `.bsf` è l'unica pensata
per Brass Style e non ereditata dal template.

**Non è riusabile come codice.** Non per come è scritto, ma per tre fatti misurati: è un template
"NEUTRA" con la struttura informativa di un brand d'arredo B2C (Living/Bedroom/Bathroom/Outdoor)
che non descrive un terzista; la sua unica funzionalità propria è rotta (§2.1); e la sua unica
sorgente di verità è duplicata (§2.8). Riparare tutto questo costa più che riscriverlo con gli
stessi contenuti.

**Si riusa: i contenuti (§2.10), i 29 campioni (§4-A), le 14 illustrazioni (§4-B), il master
video (§4-F), e l'idea del campionario filtrabile. Si butta: markup, CSS, JS, i tre README, i 4
segnaposto, `newsletter.jpg`.**
