# SPEC — Sito Brass Style S.R.L.

> Template seguito: `~/.claude/SPEC-TEMPLATE.md` (letto in sessione 2026-09-18). Il template chiede
> mezza pagina: questa spec la supera perché contiene anche il piano operativo a fasi richiesto dallo
> step 1. **Deviazione dichiarata**, non ignorata: da §6 in poi è piano, non spec.
> Input verificati: `docs/as-is.md`, `docs/research.md`, `docs/adr/001-stack.md`,
> `docs/design-directions.md`.

---

## 1. Obiettivo (1 frase, condizione di "fatto" TESTABILE)

Pubblicare un sito IT/EN che, a parità di traffico, **produce richieste di preventivo qualificate
tracciate** (form inviato con metallo + finitura + quantità compilati), con la **pagina finiture
sotto 900 KB trasferiti** e **LCP < 2,5 s / INP < 200 ms / CLS < 0,1 su 4G simulata**, misurati con
Lighthouse e WebPageTest sull'URL di produzione.

Baseline contro cui si misura, già rilevata: la pagina attuale trasferisce **91.099,8 KB** in 26
richieste, con **15 errori di rete** e la sezione campionario **non funzionante**
(`docs/as-is.md` §1, §2.1). Il sito pubblico oggi non ha form: le richieste sono 0 per costruzione.

---

## 2. Requisiti testabili

*Ogni riga deve poter fallire in un test o in una misura.*

### Performance e peso
- [ ] Homepage ≤ **1.200 KB** trasferiti al primo load (misura: `performance.getEntriesByType('resource')`, cache vuota).
- [ ] Pagina `/finiture` con tutte le 29 schede visibili ≤ **900 KB** (budget derivato da 635,8 KB di AVIF misurati + font + CSS/JS).
- [ ] **Nessun video scaricato prima di un'interazione**: ogni `<video>` ha `preload="none"` e `poster`; il transfer di tipo `video` al `load` è **0 KB**.
- [ ] LCP < **2,5 s**, INP < **200 ms**, CLS < **0,1** su Moto G / 4G in Lighthouse mobile.
- [ ] **0 richieste 404** in console su tutte le pagine (oggi sono 15).
- [ ] Nessun singolo asset > **500 KB**, escluso il video di sfondo che è ≤ **1,7 MB** (misurato: 1,64 MB a 1080p crf26).

### Campionario finiture (la funzione centrale)
- [ ] Sono pubblicate **tutte e 29 le finiture** presenti in `assets/images/` (oggi lo script ne espone 15, `index.html:231-247`).
- [ ] Ogni finitura ha: **codice** univoco, nome IT, nome EN, **metallo base**, **famiglia** (es. brunita / patinata / trasparente / effetto marmo), descrizione del processo, nota di manutenzione.
- [ ] Il filtro per famiglia e la ricerca testuale aggiornano la lista **senza ricaricare la pagina** e senza far scattare CLS > 0,1.
- [ ] Il visore di dettaglio **si apre** al click e con `Enter`/`Space`, si chiude con `Esc` e col click sullo sfondo, e naviga con `←`/`→`. *(Regressione diretta del bug riprodotto in `as-is.md` §2.1: questo requisito fallirebbe oggi.)*
- [ ] Ogni scheda finitura ha un **URL proprio** indicizzabile (`/finiture/<codice>-<slug>`), non è solo uno stato di una lightbox.
- [ ] Da ogni scheda si può **aggiungere la finitura alla richiesta campioni** e il form arriva precompilato con i codici scelti.

### Conversione
- [ ] Esiste un form di richiesta preventivo raggiungibile da **ogni** pagina in ≤ 2 click.
- [ ] Il form richiede e valida: nome, azienda, email, **metallo**, **finitura/e** (codice), **quantità indicativa**, **tempistica**, messaggio, consenso privacy. Email e consenso obbligatori; invio senza di essi respinto **lato server**, non solo lato client.
- [ ] L'invio riuscito produce un **evento tracciato** distinto da una semplice visita della pagina contatti.
- [ ] Il mittente riceve una conferma automatica; l'azienda riceve la richiesta con tutti i campi.

### Accessibilità
- [ ] Ogni coppia testo/fondo del design system passa **≥ 4,5:1** (corpo) o **≥ 3:1** (testo ≥ 18px/bold ≥ 14px), verificata con un check automatico. *(Oggi `--muted` su `--cream` è **2,95:1** e `--bsf-muted` su `#100F0D` è **3,55:1** su testo da 11px e su un placeholder: entrambi fallirebbero — `as-is.md` §3.1.)*
- [ ] Il **cursore di sistema è visibile ovunque**: nessuna regola `cursor:none` nel CSS di produzione.
- [ ] Tutto il sito è navigabile da tastiera con `:focus-visible` sempre percepibile; il visore finitura è un dialog con focus intrappolato e restituito alla chiusura.
- [ ] Ogni immagine ha un `alt` che descrive la finitura o la fase (non `alt="brass"`).
- [ ] Con `prefers-reduced-motion: reduce` nessun contenuto resta invisibile o inaccessibile.

### SEO e lingua
- [ ] Ogni pagina ha `<title>` e `<meta description>` unici, `canonical`, `og:`/`twitter:` e una coppia `hreflang` IT/EN reciproca. *(Oggi: 0 canonical, 0 hreflang, 0 og — `as-is.md` §3.2.)*
- [ ] Esistono `robots.txt` e `sitemap.xml` con tutte le pagine IT ed EN.
- [ ] È presente un JSON-LD valido (validatore Schema.org senza errori) di tipo `Organization`/`LocalBusiness` con nome, indirizzo, telefono, email, P.IVA, orari e `sameAs`.
- [ ] Esiste **una pagina per lavorazione** (10 lavorazioni reali, `index.html:82-91`), ciascuna con un `<h1>` proprio e testo unico ≥ 300 parole.
- [ ] Un solo `<h1>` per pagina e gerarchia `h2`/`h3` senza salti.

### Contenuto
- [ ] Zero testo segnaposto in produzione: `grep -rn "aaaa\|placeholder\|lorem"` sul build non trova nulla. *(Oggi: 3 occorrenze, `index.html:391-393`.)*
- [ ] Zero `href="#"` nel build. *(Oggi: 28.)*
- [ ] I dati anagrafici di `as-is.md` §2.10 compaiono invariati e sono gli stessi nel JSON-LD, nel footer e nella pagina contatti (**una sola sorgente di verità**, non tre copie nel markup).

---

## 3. Invarianti & contratti (cosa non deve MAI succedere)

- **Nessun byte di media scaricato senza intenzione dell'utente.** Ogni `<video>` nasce `preload="none"` + `poster`; ogni immagine sotto la piega è `loading="lazy"`. Un autoplay che scarica 88 MB è il difetto originario e non deve poter tornare.
- **Un dato aziendale ha una sola sorgente.** Indirizzo, telefono, email, P.IVA, orari vivono in **un file di configurazione**; footer, contatti, JSON-LD e form lo leggono. Modificarne uno li cambia tutti.
- **Una finitura pubblicata ha sempre codice, immagine e metallo base.** Il build **fallisce** se un record ne è privo: meglio non compilare che pubblicare una scheda muta (Fail Fast).
- **Nessuna regola di stile vive in due file.** Il CSS di un componente sta in un posto solo: la duplicazione byte-per-byte di `as-is.md` §2.8 non deve ripresentarsi.
- **Nessun dato personale lascia il sito verso terze parti senza consenso.** Nessun tracker prima dell'accettazione.
- **Nessun segreto nel repo.** Niente chiavi API nel sorgente servito: il placeholder attuale ne ha una in chiaro (`as-is.md` §3.3) ed è l'errore da non ripetere.
- **Una richiesta di preventivo non si perde mai.** Se l'invio email fallisce, la richiesta viene comunque persistita e l'utente vede un errore esplicito con il recapito diretto — mai un "grazie" su un invio fallito.
- **Il contenuto è visibile senza JavaScript.** Testo e immagini non sono gated da una classe di reveal: se il JS non parte, la pagina si legge lo stesso.

---

## 4. Edge case noti

- Finitura senza traduzione EN → si mostra il nome IT con `lang="it"` sull'elemento, non una stringa vuota.
- Ricerca senza risultati → messaggio esplicito e un'azione («mostra tutte» / «chiedici quella che cerchi»), non una griglia vuota.
- Nome di finitura molto lungo (`Trasparente Rame Orbitale`, `Bronzo Satinato Incrociato`) → non deve traboccare dalla card a 320px di larghezza.
- Immagine di finitura mancante o 404 → posto riservato con proporzioni corrette e nome leggibile; **niente CLS**.
- `prefers-reduced-motion: reduce` → scrub e luce radente disattivati; il contenuto informativo resta nel testo.
- Browser senza supporto AVIF → `<picture>` con fallback WebP (`srcset` per tipo).
- JS disattivato → le 29 finiture sono comunque nel DOM, il filtro semplicemente non c'è.
- Form: doppio invio (debounce + idempotenza), email valida ma inesistente, campo messaggio con 5.000 caratteri, invio da bot (honeypot + rate limit).
- Utente EN che atterra su un URL IT → resta dov'è, con il link alla versione EN, **senza redirect automatico** (i redirect su lingua rompono l'indicizzazione).
- Stampa della scheda finitura (un progettista la stamperà per il capitolato) → foglio di stile `@media print` leggibile.

---

## 5. Fuori scopo (YAGNI esplicito)

- E-commerce, carrello, prezzi online, listini pubblici.
- Area riservata clienti, login, preventivatore automatico.
- CMS headless o backoffice: i contenuti sono file versionati (`adr/001-stack.md` §7). Si rivaluta se il committente dimostra di voler pubblicare da solo più di una volta al mese.
- WebGL, Three.js, scene 3D: 0 su 4 dei riferimenti di lusso misurati ne ha una (`research.md` Parte 2), e la skill `premium-3d-site` esclude essa stessa i siti content/SEO.
- Smooth scroll JS (Lenis), cursore custom, transizioni di pagina orchestrate.
- Blog/news, configuratore 3D di finiture, chat, multi-valuta, terze lingue.
- Spedizione dei campioni fisici gestita dal sito (la richiesta sì, la logistica no).
- Migrazione delle caselle email: il dominio ospita Exchange (`as-is.md` §3.3) e non si tocca — si tocca **solo** il record web.

---

# 6. Piano operativo a fasi

*Ogni fase ha un criterio di uscita che può fallire. Le fasi 1–3 sono prerequisiti di contenuto e
decisione: senza di esse la 4 costruisce sul vuoto.*

### Fase 0 — Decisioni del committente (blocca tutto il resto)
**Obiettivo:** chiudere le tre scelte che nessuna implementazione può prendere al posto suo.
**Aree:** nessun file.
**Contenuto:** (a) quale direzione fra A/B/C di `design-directions.md`; (b) **si commissiona il
servizio fotografico?** — A e B sono bloccate senza; (c) dove vive il sito (il dominio oggi punta al
server Exchange con certificato per `autodiscover.isri.it`, `as-is.md` §3.3).
**Criterio di uscita:** le tre risposte sono scritte in coda a questo file, con data.
**Dipendenze:** nessuna.

### Fase 1 — Architettura dell'informazione
**Obiettivo:** l'alberatura definitiva, derivata dalla ricerca e non dal template NEUTRA.
**Aree:** `docs/specs/ia.md` (nuovo).
**Contenuto proposto** — deriva da `research.md`: Metalbril naviga per **materia → processo →
risultato**, Fantini ha «Professionals» di primo livello, De Castelli fa una scheda per finitura.
Il menu attuale (Lavorazioni · Azienda · Galleria · Focus On · **Azienda** · Contatti,
`index.html:28-33`) non viene riusato.

```
/                         Home
/lavorazioni              indice delle 10 lavorazioni reali
/lavorazioni/<slug>       ×10 — progettazione · prototipazione · prototipazione imballi ·
                          lavorazioni meccaniche · saldatura · brunitura e ossidazione ·
                          verniciatura a liquido · assemblaggio · imballaggio · trasporto
/finiture                 campionario: 29 schede, filtro per famiglia e metallo
/finiture/<codice>-<slug> ×29 — scheda tecnica indicizzabile
/metalli                  ottone · rame · ferro · acciaio · alluminio (secondo cosa lavorano davvero)
/azienda                  storia 1985 → oggi, stabilimento, parco macchine, certificazioni
/progetti                 casi realizzati (anche anonimi, se NDA)
/richiedi-campioni        il funnel campioni, modello Metalbril
/contatti                 form preventivo + anagrafica + mappa
/en/...                   specchio EN completo
```
**Criterio di uscita:** l'alberatura è approvata e ogni voce ha assegnato un **autore del testo** e
una **data**; nessuna pagina resta senza contenuto assegnato.
**Dipendenze:** Fase 0(a).

### Fase 2 — Contenuto: il file delle 29 finiture
**Obiettivo:** trasformare 29 immagini in 29 **record tecnici**, il vero differenziale
(`research.md`: nessun concorrente aperto ha insieme codice + scheda + funnel campioni).
**Aree:** `content/finiture/*.md` (o un solo `finiture.json`).
**Campi obbligatori per record:** `codice` · `nome_it` · `nome_en` · `metallo_base` · `famiglia` ·
`processo` (come si ottiene) · `protezione` (lacca/cera/nessuna) · `manutenzione` ·
`immagine` · `note`. Il modello di riferimento è la scheda *Satin* di De Castelli, che arriva a
dichiarare il pH ammesso per la pulizia (`research.md` Parte 1).
**Criterio di uscita:** **29/29 record completi** — uno script di validazione esce con codice 0; se
un campo obbligatorio manca, esce ≠ 0 e nomina il record. *(Oggi i nomi sono un misto IT/EN senza
codice, `index.html:231-247`.)*
**Dipendenze:** Fase 1.

### Fase 3 — Pipeline asset
**Obiettivo:** portare gli asset da ~177 MB a ~5,4 MB **senza rifotografare nulla**.
**Aree:** `scripts/assets.sh`, `public/img/`, `public/video/`, `assets/` originale archiviato.

Comandi **eseguiti in sessione** su questo repo, con i pesi reali risultanti:

```bash
# 1) FINITURE — 29 PNG RGBA, 59,28 MB → card + full
#    card (griglia, 560 px di larghezza)
ffmpeg -nostdin -y -i in.png -vf "scale=560:-2" \
  -c:v libaom-av1 -crf 32 -cpu-used 6 -pix_fmt yuv420p -still-picture 1 -f avif out_card.avif
#    full (visore, risoluzione nativa)
ffmpeg -nostdin -y -i in.png \
  -c:v libaom-av1 -crf 30 -cpu-used 6 -pix_fmt yuv420p -still-picture 1 -f avif out_full.avif
#  MISURATO su tutti e 29:  card 635,8 KB totali (media 21,9 KB) = -98,95 %
#                           full   2,22 MB totali (media 78 KB)  = -96,26 %

# 2) ILLUSTRAZIONI DI PROCESSO — 14 PNG RGB, 23,60 MB
ffmpeg -nostdin -y -i in.png -vf "scale=1200:-2" \
  -c:v libaom-av1 -crf 32 -cpu-used 6 -pix_fmt yuv420p -still-picture 1 -f avif out.avif
#  MISURATO: 174,7 KB totali (media 12,5 KB) = -99,28 %

# 3) VIDEO — culture.mp4, 90.777.222 B a 49,2 Mbps → budget web
ffmpeg -y -i culture.mp4 -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
  -vf "scale=1920:-2" -movflags +faststart culture-1080.mp4        # MISURATO 1,64 MB (-98,2 %)
ffmpeg -y -i culture.mp4 -an -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p \
  -vf "scale=1280:-2" -movflags +faststart culture-720.mp4         # MISURATO 0,67 MB
ffmpeg -y -i culture.mp4 -ss 7 -frames:v 1 poster.png && \
ffmpeg -y -i poster.png -c:v libaom-av1 -crf 32 -cpu-used 4 -still-picture 1 -f avif poster.avif
#                                                                   # MISURATO 12,4 KB
# solo se si sceglie la direzione B (scrub sullo scroll):
ffmpeg -y -i culture.mp4 -an -g 5 -c:v libx264 -crf 26 -pix_fmt yuv420p \
  -vf "scale=1280:-2" -movflags +faststart culture-scrub.mp4       # MISURATO 1,54 MB
#  (GOP=1 misurato a 4,98 MB: 3,4 MB in più per una fluidità non percepibile su clip lenta e scura)
```

**Fallback:** ogni AVIF affiancato da un WebP dello stesso ritaglio, servito via `<picture>`.
**Archivio:** `culture.mp4` a 90 MB **esce dal repo** (storage esterno); in git resta solo la derivata.
**Scatti/render da commissionare** (nessuna conversione li produce, `as-is.md` §5):
1. 29 macro di finitura in luce radente, 3000 px, stessa ottica e stessa distanza per tutte;
2. 9 foto di reparto orizzontali 3000 px, una per stazione di processo;
3. 1 ritratto di stabilimento per `/azienda`;
4. 1 illustrazione «controllo qualità» nello stile delle 14 esistenti;
5. 3–5 dettagli di progetti realizzati, non attribuibili se c'è NDA.
Sostituiti da: i 4 segnaposto con la scritta «placeholder» sopra e `newsletter.jpg` fuori palette.

**Criterio di uscita:** `du -sh public/` **< 8 MB**; nessun file singolo > 1,7 MB; ogni immagine
pubblicata ha la coppia AVIF+WebP; lo script è ri-eseguibile e idempotente.
**Dipendenze:** Fase 2 (i nomi dei file seguono i codici finitura).

### Fase 4 — Design system e scheletro
**Obiettivo:** i token della direzione scelta e le pagine vuote ma navigabili.
**Aree:** progetto Astro nuovo, `src/styles/tokens.css`, layout, header/footer, i18n.
**Criterio di uscita:** tutte le rotte di Fase 1 rispondono 200 in build; un check automatico di
contrasto sui token passa su **tutte** le coppie dichiarate; `grep -rn "cursor:none" src/` non trova
nulla; navigazione completa da tastiera.
**Dipendenze:** Fasi 0(a), 1, 3.

### Fase 5 — Campionario (l'isola React)
**Obiettivo:** la funzione centrale, quella che oggi è rotta.
**Aree:** `src/components/Finiture.tsx`, `src/pages/finiture/`.
**Criterio di uscita:** le 29 schede sono in pagina; filtro e ricerca funzionano senza CLS; il
visore si apre al click **e** da tastiera, chiude con `Esc`, naviga con le frecce, restituisce il
focus; ogni scheda ha il suo URL indicizzabile; peso della pagina **< 900 KB** misurato; un test
automatico riproduce il click che oggi lancia `TypeError: Cannot set properties of null` e verifica
che il visore si apra.
**Dipendenze:** Fasi 2, 3, 4.

### Fase 6 — Conversione
**Obiettivo:** il percorso dal buyer alla richiesta qualificata.
**Aree:** `/richiedi-campioni`, `/contatti`, endpoint di invio, pagina di conferma.

**Il percorso, esplicito:** il buyer arriva da una query di finitura o di lavorazione → atterra su
`/finiture/<codice>` o `/lavorazioni/<slug>` → **aggiunge una o più finiture alla richiesta** →
apre `/richiedi-campioni` con i codici già dentro → compila 4 campi (azienda, email, quantità
indicativa, tempistica) → invia → riceve conferma automatica; l'azienda riceve una richiesta che
contiene già **i codici finitura**, cioè la domanda tecnica a cui rispondere.
È il modello Metalbril («seleziona fino a 10 campioni e ricevili») innestato sulla scheda tecnica
di De Castelli: `research.md` mostra che **nessuno dei due, da solo, fa entrambe le cose**.

**Dati che servono davvero** (e nient'altro): azienda, referente, email, metallo, codici finitura,
quantità indicativa, tempistica, messaggio, consenso. Telefono facoltativo.
**Tracciamento minimo e onesto:** un evento `richiesta_inviata` con la sola informazione di conversione,
dietro consenso; nessuna integrazione CRM, nessun marketing automation, nessun pixel pubblicitario —
**nessuno li ha chiesti** (YAGNI). Se serve un CRM, è una decisione successiva con un suo ADR.
**Criterio di uscita:** un invio di prova end-to-end arriva a `info@brassstyle.com` con tutti i
campi; un invio senza consenso o senza email viene respinto **lato server**; il fallimento
dell'invio email non perde la richiesta e mostra un errore esplicito; l'evento di conversione è
visibile nello strumento di analytics scelto.
**Dipendenze:** Fase 5.

### Fase 7 — SEO tecnica e di contenuto
**Obiettivo:** essere trovabili sulle query che contano
(«lavorazione ottone conto terzi», «brunitura ottone arredo», «finiture metalliche arredo»,
«terzista metalli Brianza»). `⚠️ non misurato: non ho dati di volume di ricerca su queste query —
sono formulate dal dominio, non da un keyword tool. Vanno validate prima di scriverci sopra 10 pagine.`
**Aree:** `<head>` di ogni pagina, `robots.txt`, `sitemap.xml`, JSON-LD, testi delle 10 pagine
lavorazione.
**Contenuto:** title/description unici; `canonical`; `hreflang` IT↔EN reciproci; Open Graph;
JSON-LD `Organization` + `LocalBusiness` con i dati di `as-is.md` §2.10 (Via Provinciale per
Bulgorello 3, 22070 Vertemate con Minoprio CO; +39 031 780 800; info@brassstyle.com; P.IVA
01530540135; Lun–Ven 8:00–17:30) e, per le pagine lavorazione, `Service`.
**Criterio di uscita:** validatore Schema.org **0 errori**; `hreflang` reciproci verificati da uno
script; ogni pagina ha title+description univoci (nessun duplicato nel build); `sitemap.xml`
contiene tutte le rotte IT ed EN; Lighthouse SEO = 100.
**Dipendenze:** Fasi 1, 2, 4.

### Fase 8 — Gate di performance e accessibilità (fail closed)
**Obiettivo:** dimostrare i numeri, non affermarli.
**Budget numerico:**

| Metrica | Budget | Come si verifica | Baseline attuale |
|---|---|---|---|
| Peso home, primo load | ≤ 1.200 KB | `performance.getEntriesByType('resource')`, cache vuota | **91.099,8 KB** |
| Peso `/finiture` | ≤ 900 KB | idem | n/a (sezione rotta) |
| Video al `load` | **0 KB** | somma dei transfer `initiatorType: 'video'` | **88.658 KB** |
| Richieste 404 | **0** | console del browser | **15** |
| LCP | < 2,5 s | Lighthouse mobile, Moto G / 4G | ⚠️ non misurato |
| INP | < 200 ms | Lighthouse + interazione reale su filtro e visore | ⚠️ non misurato |
| CLS | < 0,1 | Lighthouse | ⚠️ non misurato |
| Contrasto | 100% delle coppie a norma | check automatico sui token + axe | **2 token falliscono** (§2) |
| Lighthouse a11y | ≥ 95 | Lighthouse mobile | ⚠️ non misurato |

**Criterio di uscita:** tutte le righe sopra verdi **sull'URL di staging**, con l'output allegato.
Una riga rossa blocca il go-live. *(Le tre righe `⚠️ non misurato` lo sono perché oggi non esiste
una build da misurare — non perché la misura sia opzionale.)*
**Dipendenze:** Fasi 5, 6, 7.

### Fase 9 — Pubblicazione
**Obiettivo:** mettere online senza rompere la posta.
**Aree:** DNS, hosting, certificato, redirect.
**Contenuto:** oggi `www.brassstyle.com` risolve a `95.174.9.136`, è `Microsoft-IIS/8.5`, redirige a
`/owa/` e presenta un certificato per `autodiscover.isri.it`; i record `MX` puntano a
`mec-gr.esvacloud.com` (`as-is.md` §3.3). Si sposta **solo** il record web su Cloudflare Pages;
**gli MX non si toccano**. Si verifica prima su un sottodominio di staging. La chiave API Google
Maps esposta nel placeholder va limitata per referrer o ruotata.
**Criterio di uscita:** `https://www.brassstyle.com` apre senza avviso di certificato; `http` fa
301 su `https`; una mail di prova a `info@brassstyle.com` arriva **dopo** il cambio DNS; il vecchio
placeholder non è più raggiungibile.
**Dipendenze:** Fase 8 verde, Fase 0(c).

---

## 7. Cosa si riusa e cosa si butta

**Si riusa** — i contenuti reali (anagrafica, storia 1985/Figino Serenza, i 10 nomi delle
lavorazioni, `as-is.md` §2.10); i **29 campioni di finitura** (59,28 MB di PNG che diventano 636 KB
di AVIF: sono l'asset più prezioso dell'azienda); le **14 illustrazioni di processo**, che sono già
un sistema visivo coerente; il **master video della molatura**, che è materiale buono in un
contenitore sbagliato; e **l'idea del campionario filtrabile**, che è la cosa giusta a cui pensare.

**Si butta** — markup, CSS e JS. Non per come sono scritti, ma per tre fatti misurati: la struttura
informativa è quella di un brand d'arredo B2C (Living/Bedroom/Bathroom/Outdoor) e non descrive un
terzista; l'unica funzionalità propria del sito è rotta (`as-is.md` §2.1); e il CSS del componente
principale esiste in due copie identiche in due file (§2.8). Ripararli costa più che riscriverli
con gli stessi contenuti. Si buttano anche i 4 segnaposto, `newsletter.jpg` e i tre README, che
documentano ancora il template «NEUTRA».

**Detto senza giri di parole e senza sfottò:** chi ha fatto questo lavoro ha raccolto il materiale
giusto e ha individuato la sezione che conta. Il template su cui l'ha montato è la parte che non
regge — ed è anche la parte più facile da rifare, perché il lavoro difficile (trovare i contenuti)
è già stato fatto e viene tutto ereditato.

---

## 8. Prerequisito tecnico dello step 2

`impeccable` richiede un `PRODUCT.md` di progetto prima di lavorare sull'interfaccia: lo script
`context.mjs` eseguito in questa sessione ha restituito `NO_PRODUCT_MD`. **Non l'ho creato**, perché
non è fra i cinque deliverable di questo step. Va scritto all'inizio della Fase 4.
Nota di manutenzione emersa nella stessa esecuzione: la skill installata è la **v3.8.0**, l'ultima
è la **v4.3.1** (`npx impeccable update`). Decisione del committente/manutentore, non mia.

---

## 9. Decisioni del committente — PRESE il 2026-09-18 (Fase 0 chiusa)

- [x] **Direzione: A «La Materia» sulla struttura di C.** Il campionario è il cuore del sito, dentro
      l'impianto asciutto e indicizzabile del capitolato. Nessun blocco: gli asset ci sono tutti.
- [x] **Servizio fotografico: non serve per partire.** La premessa su cui A era stata dichiarata
      bloccata («le scansioni attuali non reggono», §5 di `as-is.md`) **è stata smentita dalla
      misura**: sui 29 campioni la varianza del laplaciano va da 80 a 1.387, mediana 366 — nessun
      campione è privo di grana. Il difetto reale era la **disuniformità di luce** (13 su 29 oltre
      il 18% di scarto fra quadranti), corretta in post con `tools/normalize-samples.py`: dopo la
      normalizzazione tutti e 29 stanno sotto il 12%, la maggior parte sotto il 7%.
      ⚠️ Limite del misuratore dichiarato: l'indicatore confronta i quattro quadranti, quindi una
      banda di luce **orizzontale e centrata** non viene rilevata — `sfumatof` e `trasparenteottone`
      misurano 2% ma a occhio conservano una banda. Vanno ricontrollati a occhio in Fase 4.
- [x] **Trattamento dei campioni: normalizzati in griglia, originali nel visore di dettaglio.**
      In griglia il buyer deve confrontare materiali, non inclinazioni della lampada; nel dettaglio
      il riflesso direzionale resta perché *è* il metallo. Griglia → `assets/optimized/images/grid/`
      (586 KB per 29 campioni, media 20,2 KB); dettaglio → `assets/optimized/images/full/`.
- [x] **Stack: Next 16.3.5, React ovunque** — decisione del committente **contro** la raccomandazione
      dell'ADR-001, che resta scritta con i suoi numeri. Motivazione registrata: un solo modello
      mentale e nessun costo di migrazione se in futuro arrivano area riservata o preventivatore
      server-side. Conseguenza da presidiare in Fase 8: il budget INP sulle ~10 pagine di contenuto
      va difeso con la misura, non dato per acquisito. Vedi `docs/adr/001-stack.md`.
- [x] **Foto di reparto: da chiedere in azienda, anche fatte col telefono.** Sono l'unico asset che
      nessuna conversione può creare. Non bloccano: la sezione processo si predispone e si riempie
      quando arrivano. Serve anche la lista scritta del parco macchine.
- [ ] **Hosting e DNS:** chi controlla il dominio, e si sposta il record web? → ______
      (aperta: verificato in sessione che `www.brassstyle.com` serve un certificato per
      `autodiscover.isri.it`. Gli MX non si toccano, cambia solo il record web.)

### Correzione di rotta rispetto ai documenti precedenti

`design-directions.md` presenta A come bloccata dalla fotografia e C come «l'unica direzione
realizzabile con gli asset di oggi». **Quella conclusione non era misurata** ed è superata da questa
sezione: dopo la normalizzazione, A è realizzabile oggi. Resta valido che **B** è bloccata — le foto
di reparto non esistono e non sono producibili in post.
