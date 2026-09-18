# Contenuti da validare con l'azienda

> I testi tecnici del sito sono stati **redatti in sessione** il 18/09/2026 partendo dal nome della
> finitura, dall'aspetto del campione e da come funziona il processo in generale. Sono una bozza
> **plausibile ma non confermata**: prima del go-live vanno letti dall'ufficio tecnico.
>
> Questo file esiste perché la differenza fra «contenuto reale» e «contenuto scritto da chi ha fatto
> il sito» non deve restare implicita. Quello che è **reale e verificato** è elencato in fondo.

---

## 1. Schede finitura — `src/data/finiture.ts` (29 record)

Per ogni finitura sono da confermare:

| Campo | Cosa contiene oggi | Rischio se sbagliato |
|---|---|---|
| `codice` (TR-01, SA-02, NU-03…) | **codici inventati in sessione**, con prefisso per famiglia | se l'azienda ha già una sua codifica interna, va usata quella: il codice finisce nei capitolati |
| `famiglia` | 7 famiglie ricavate dai nomi dei campioni | una finitura può essere classificata diversamente in azienda |
| `metalloBase` | «Ottone» su tutti e 29 | alcuni campioni potrebbero essere su rame o acciaio |
| `applicabileSu` | dedotto per famiglia (es. ossidazioni su ottone/rame/bronzo) | **è una promessa commerciale**: se una finitura non si fa sul ferro, va tolto |
| `processo` | descrizione del procedimento per famiglia | può non corrispondere al ciclo reale del reparto |
| `protezione` | «vernice trasparente opaca», «cera a richiesta» | va confermato cosa si usa davvero |
| `manutenzione` | indicazioni di pulizia per famiglia | è la parte che il cliente finale seguirà: va confermata |
| `uso` | «Interno» su tutti | se qualche finitura regge l'esterno, è un'informazione commerciale importante |
| `pezzoMax` | **`null`** → in pagina si legge «da confermare con l'ufficio tecnico» | già dichiarato mancante, non inventato |

Due sigle interne sono riportate così come sono e **vanno spiegate**:
- **SA-05 «Satinato CDF»** — cosa significa CDF, e come va esposto a catalogo;
- **OS-05 «Sfumato F»** — idem per la F.

## 2. Pagine lavorazione — `src/data/lavorazioni.ts` (10 pagine, ~320 parole ciascuna)

I testi descrivono **il processo** e **come si lavora in conto terzi**. Non contengono nessun dato
che l'azienda non abbia dichiarato: nessun modello di macchina, nessuna tolleranza, nessuna
capacità produttiva, nessun numero di postazioni (quelli sono in `docs/asset-mancanti.md` §1.7).

Da validare: che il ciclo descritto sia quello reale, e in particolare
- la sezione «Cosa serve per partire» di ogni pagina (è ciò che il reparto chiede al cliente);
- l'affermazione, ripetuta in più pagine, che **tutte e 10 le fasi avvengono internamente**;
- in `prototipazione-imballi` e `imballaggio`: se l'imballo viene davvero prototipato e provato a
  pieno carico, oppure se è una prassi meno formalizzata.

## 3. Affermazioni commerciali sparse

| Dove | Frase | Da confermare |
|---|---|---|
| `/richiedi-campioni` | «la spedizione è gratuita per aziende e studi di progettazione» | già marcata in pagina come *da confermare* |
| `/richiedi-campioni`, `/contatti` | «ti risponde l'ufficio tecnico, di norma entro due giorni lavorativi» | è un impegno di servizio: va confermato o cambiato |
| `/finiture` | «fino a dieci campioni» per richiesta | limite scelto sul modello Metalbril (`docs/research.md`), non dichiarato dall'azienda |
| home, `/azienda` | «il ciclo è interno, l'interlocutore è uno solo» | discende dalle 10 lavorazioni elencate dal sito attuale |

## 4. Cosa invece è REALE e verificato (non va rivalidato)

Viene dal sito attuale dell'azienda, rilevato riga per riga in `docs/as-is.md` §2.10:

- ragione sociale, indirizzo (Via Provinciale per Bulgorello 3, Vertemate con Minoprio CO),
  telefono +39 031 780 800, email info@brassstyle.com, P.IVA 01530540135, orari Lun–Ven 8:00–17:30,
  direzione e coordinamento Jechijo Srl → tutti in `src/data/azienda.ts`, **sorgente unica**;
- la storia aziendale (Figino Serenza, 1985, oltre quarant'anni) → `/azienda`, testo ripreso alla
  lettera dal sito attuale;
- i **nomi delle 10 lavorazioni** → dal menu del sito attuale;
- i **29 campioni di finitura** e le **14 illustrazioni di processo** → file reali dell'azienda.

---

## Come si validano, in pratica

Il modo più rapido è aprire `/finiture` e scorrere le 29 schede con l'ufficio tecnico accanto:
ogni correzione è una riga da cambiare in `src/data/finiture.ts`. Il gate
`npm run validate` impedisce di pubblicare un record incompleto, ma **non può sapere se un
contenuto è vero**: quello lo sa solo chi lavora i pezzi.
