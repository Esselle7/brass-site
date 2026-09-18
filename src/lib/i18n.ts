import type { Finitura } from "@/data/finiture";
import { slugify } from "./slug";

export type Lingua = "it" | "en";

/**
 * Le rotte delle due lingue. Sono diverse (non `/en/finiture` ma `/en/finishes`) perché l'URL è
 * contenuto indicizzabile quanto il testo; restano però accoppiate qui, in un posto solo, così
 * che `hreflang` e il selettore di lingua non possano andare fuori sincrono.
 */
export const percorsi = {
  home: { it: "/", en: "/en" },
  finiture: { it: "/finiture", en: "/en/finishes" },
  lavorazioni: { it: "/lavorazioni", en: "/en/processes" },
  azienda: { it: "/azienda", en: "/en/company" },
  progetti: { it: "/progetti", en: "/en/projects" },
  campioni: { it: "/richiedi-campioni", en: "/en/request-samples" },
  contatti: { it: "/contatti", en: "/en/contact" },
  privacy: { it: "/privacy", en: "/en/privacy" },
} as const;

export type Rotta = keyof typeof percorsi;

export const via = (r: Rotta, l: Lingua) => percorsi[r][l];

export const hrefFinitura = (f: Finitura, l: Lingua) =>
  `${via("finiture", l)}/${l === "en" ? f.slugEn : f.slug}`;

export const slugLavorazione = (titoloEn: string, slugIt: string, l: Lingua) =>
  l === "en" ? slugify(titoloEn) : slugIt;

export const hrefLavorazione = (
  l: Lingua,
  lav: { slug: string; titoloEn: string },
) => `${via("lavorazioni", l)}/${slugLavorazione(lav.titoloEn, lav.slug, l)}`;

/** Le stringhe di interfaccia. Una voce per lingua, nessuna stringa sciolta nei componenti. */
export const dizionario = {
  it: {
    lingua: "Italiano",
    altraLingua: "English",
    vaiAlContenuto: "Vai al contenuto",
    menu: { apri: "Apri il menu", principale: "Principale" },
    nav: {
      finiture: "Finiture",
      lavorazioni: "Lavorazioni",
      azienda: "Azienda",
      progetti: "Progetti",
      contatti: "Contatti",
      campioni: "Richiedi campioni",
    },
    footer: {
      campionario: "Campionario finiture",
      privacy: "Privacy",
      direzione: (chi: string) =>
        `Soggetta all'attività di direzione e coordinamento di ${chi}.`,
    },
    banner: { titolo: "Pagina in sviluppo", stato: "Stato della pagina" },
    campionario: {
      filtra: "Filtra per famiglia",
      tutte: "Tutte",
      cerca: "Cerca una finitura per nome o codice",
      cercaPlaceholder: "Cerca: nuvolato, MA-04, bronzo…",
      finiture: (n: number) => `${n} ${n === 1 ? "finitura" : "finiture"}`,
      finitureSu: (n: number, t: number) =>
        `${n} ${n === 1 ? "finitura" : "finiture"} su ${t}`,
      vuotoTitolo: (q: string) => `Nessuna finitura corrisponde a «${q}»`,
      vuotoTesto:
        "Il campionario è quello dei campioni fisici in azienda: se cerchi una finitura che non trovi, quasi sempre si può sviluppare su richiesta.",
      mostraTutte: (n: number) => `Mostra tutte le ${n}`,
      chiediQuella: "Chiedici quella che cerchi",
    },
    scheda: {
      campionarioBriciola: "Campionario",
      percorso: "Percorso",
      metalloBase: "Metallo base",
      applicabileSu: "Applicabile su",
      famiglia: "Famiglia",
      protezione: "Protezione",
      manutenzione: "Manutenzione",
      uso: "Uso",
      pezzoMax: "Dimensione max pezzo",
      pezzoMaxValore: "da confermare con l'ufficio tecnico — dipende dal pezzo e dal ciclo",
      note: "Note",
      didascalia:
        "Scatto originale del campione fisico: il riflesso direzionale è quello del metallo, non un effetto aggiunto.",
      preventivo: "Oppure chiedi un preventivo su disegno",
      altreFamiglia: (fam: string) => `Altre finiture ${fam.toLowerCase()}`,
      tutteLeFiniture: (n: number) => `Tutte le ${n} finiture →`,
      precedenteSuccessiva: "Finitura precedente e successiva",
    },
    visore: {
      ingrandisci: (nome: string) => `Ingrandisci il campione ${nome}`,
      etichetta: "Ingrandisci",
      aRisoluzionePiena: (codice: string, nome: string) =>
        `Campione ${codice} ${nome}, a risoluzione piena`,
      chiudi: "Chiudi",
      chiudiVisore: "Chiudi il visore",
      precedente: (nome: string) => `Finitura precedente: ${nome}`,
      successiva: (nome: string) => `Finitura successiva: ${nome}`,
    },
    campione: {
      aggiungi: "Aggiungi alla richiesta campioni",
      togli: (codice: string) => `${codice} è nella richiesta — togli`,
      limite: (max: number) =>
        `Hai già scelto ${max} campioni: togline uno, oppure scrivici quali altri ti servono nel messaggio.`,
      contatore: (n: number) => (n === 1 ? "campione scelto" : "campioni scelti"),
    },
    form: {
      azienda: "Azienda",
      email: "Email",
      finitureScelte: "Finiture scelte",
      quantita: "Quantità indicativa",
      quantitaPlaceholder: "es. 40 profili da 1,2 m, o «prototipo singolo»",
      honeypot: "Non compilare questo campo",
      consensoPre: "Ho letto l'",
      consensoLink: "informativa privacy",
      consensoPost:
        "e acconsento al trattamento dei dati per rispondere a questa richiesta.",
      invia: "Invia la richiesta",
      inviando: "Invio in corso…",
      nessunaFinitura: "Nessuna finitura selezionata.",
      scegliDalCampionario: "Scegli dal campionario",
      oppureInvia: "— oppure invia lo stesso: ti richiamiamo per capire cosa serve.",
      togli: (codice: string) => `Togli ${codice}`,
      okTitolo: "Richiesta ricevuta",
      okTesto:
        "Ti risponde una persona dell'ufficio tecnico, di norma entro due giorni lavorativi. Se ti serve prima, il modo più rapido resta il telefono:",
      okTorna: "Torna al campionario",
      erroreCoda: "La richiesta non è andata persa dalla tua parte: riprova, oppure scrivi direttamente a",
      erroreOppure: "o chiama il",
      erroreRete: "Connessione interrotta durante l'invio.",
      erroreGenerico: "Invio non riuscito.",
    },
    pagine: {
      finiture: {
        titolo: "Campionario",
        metaTitolo: "Campionario finiture — 29 finiture su metallo",
        metaDescrizione:
          "Le 29 finiture del campionario Brass Style: trasparenti, satinate, nuvolate, patinate, effetto marmo, ossidate e materiche. Ogni finitura ha codice, scheda tecnica e richiesta campione.",
        intro:
          "Ventinove finiture su metallo, fotografate una per una con la stessa luce per poterle confrontare. Ogni scheda dice come si ottiene la finitura, come si protegge e come si pulisce: è la scheda che serve per chiudere un capitolato, non una galleria.",
        nota:
          "Nella griglia i campioni sono normalizzati in luce per essere confrontabili; nel visore di dettaglio trovi lo scatto originale, dove il riflesso direzionale è quello del metallo.",
        comeOrganizzato: "Come è organizzato",
      },
      lavorazioni: {
        titolo: "Lavorazioni",
        metaTitolo: "Lavorazioni — il ciclo completo, dalla progettazione al trasporto",
        metaDescrizione:
          "Le dieci lavorazioni interne di Brass Style: progettazione, prototipazione, prototipazione imballi, lavorazioni meccaniche, saldatura, brunitura e ossidazione, verniciatura a liquido, assemblaggio, imballaggio, trasporto.",
        intro:
          "Dieci fasi, nello stesso stabilimento e nell'ordine in cui avvengono. Ogni pagina dice cosa si decide in quella fase e cosa serve al reparto per partire.",
        fase: (i: number, n: number) => `fase ${String(i).padStart(2, "0")} di ${n}`,
        cosaServe: "Cosa serve per partire",
        parliamo: "Parliamo del tuo pezzo",
        finitureQui: "Le finiture che nascono qui",
        precedenteSuccessiva: "Fase precedente e successiva",
        metaSuffisso: "lavorazione metalli conto terzi",
      },
    },
  },
  en: {
    lingua: "English",
    altraLingua: "Italiano",
    vaiAlContenuto: "Skip to content",
    menu: { apri: "Open the menu", principale: "Main" },
    nav: {
      finiture: "Finishes",
      lavorazioni: "Processes",
      azienda: "Company",
      progetti: "Projects",
      contatti: "Contact",
      campioni: "Request samples",
    },
    footer: {
      campionario: "Finish range",
      privacy: "Privacy",
      direzione: (chi: string) => `Subject to direction and coordination by ${chi}.`,
    },
    banner: { titolo: "Page in progress", stato: "Page status" },
    campionario: {
      filtra: "Filter by family",
      tutte: "All",
      cerca: "Search a finish by name or code",
      cercaPlaceholder: "Search: clouded, MA-04, bronze…",
      finiture: (n: number) => `${n} ${n === 1 ? "finish" : "finishes"}`,
      finitureSu: (n: number, t: number) =>
        `${n} of ${t} ${n === 1 ? "finish" : "finishes"}`,
      vuotoTitolo: (q: string) => `No finish matches “${q}”`,
      vuotoTesto:
        "The range is the set of physical samples we hold. If you are looking for a finish that is not here, in most cases it can be developed to order.",
      mostraTutte: (n: number) => `Show all ${n}`,
      chiediQuella: "Ask us for the one you need",
    },
    scheda: {
      campionarioBriciola: "Finish range",
      percorso: "Breadcrumb",
      metalloBase: "Base metal",
      applicabileSu: "Can be applied to",
      famiglia: "Family",
      protezione: "Protection",
      manutenzione: "Care",
      uso: "Use",
      pezzoMax: "Max part size",
      pezzoMaxValore: "to be confirmed with the technical office — it depends on the part and the cycle",
      note: "Notes",
      didascalia:
        "Original photograph of the physical sample: the directional reflection is the metal's own, not an added effect.",
      preventivo: "Or ask for a quotation on your drawing",
      altreFamiglia: (fam: string) => `Other ${fam.toLowerCase()} finishes`,
      tutteLeFiniture: (n: number) => `All ${n} finishes →`,
      precedenteSuccessiva: "Previous and next finish",
    },
    visore: {
      ingrandisci: (nome: string) => `Enlarge the ${nome} sample`,
      etichetta: "Enlarge",
      aRisoluzionePiena: (codice: string, nome: string) =>
        `Sample ${codice} ${nome}, at full resolution`,
      chiudi: "Close",
      chiudiVisore: "Close the viewer",
      precedente: (nome: string) => `Previous finish: ${nome}`,
      successiva: (nome: string) => `Next finish: ${nome}`,
    },
    campione: {
      aggiungi: "Add to sample request",
      togli: (codice: string) => `${codice} is in your request — remove`,
      limite: (max: number) =>
        `You have already chosen ${max} samples: remove one, or tell us in the message which others you need.`,
      contatore: (n: number) => (n === 1 ? "sample chosen" : "samples chosen"),
    },
    form: {
      azienda: "Company",
      email: "Email",
      finitureScelte: "Finishes chosen",
      quantita: "Indicative quantity",
      quantitaPlaceholder: "e.g. 40 profiles of 1.2 m, or “single prototype”",
      honeypot: "Do not fill in this field",
      consensoPre: "I have read the ",
      consensoLink: "privacy notice",
      consensoPost: "and I consent to my data being processed to answer this request.",
      invia: "Send the request",
      inviando: "Sending…",
      nessunaFinitura: "No finish selected.",
      scegliDalCampionario: "Choose from the range",
      oppureInvia: "— or send it anyway: we will call you to understand what you need.",
      togli: (codice: string) => `Remove ${codice}`,
      okTitolo: "Request received",
      okTesto:
        "Someone from the technical office will reply, usually within two working days. If you need it sooner, the phone is still the fastest route:",
      okTorna: "Back to the finish range",
      erroreCoda:
        "Nothing has been lost at your end: try again, or write directly to",
      erroreOppure: "or call",
      erroreRete: "The connection dropped while sending.",
      erroreGenerico: "The request could not be sent.",
    },
    pagine: {
      finiture: {
        titolo: "Finish range",
        metaTitolo: "Finish range — 29 finishes on metal",
        metaDescrizione:
          "The 29 finishes in the Brass Style range: clear coated, satin, clouded, patinated, marble effect, oxidised and textured. Every finish has a code, a technical sheet and a sample request.",
        intro:
          "Twenty-nine finishes on metal, each photographed under the same light so they can be compared. Every sheet says how the finish is obtained, how it is protected and how it is cleaned: it is the sheet you need to close a specification, not a gallery.",
        nota:
          "In the grid the samples are normalised for light so they can be compared; in the detail viewer you get the original photograph, where the directional reflection is the metal's own.",
        comeOrganizzato: "How it is organised",
      },
      lavorazioni: {
        titolo: "Processes",
        metaTitolo: "Processes — the full cycle, from design engineering to delivery",
        metaDescrizione:
          "The ten in-house processes at Brass Style: design engineering, prototyping, packaging prototyping, machining, welding, burnishing and oxidation, liquid painting, assembly, packing, shipping.",
        intro:
          "Ten stages, under the same roof and in the order they happen. Each page says what is decided at that stage and what the shop needs in order to start.",
        fase: (i: number, n: number) => `stage ${String(i).padStart(2, "0")} of ${n}`,
        cosaServe: "What we need to start",
        parliamo: "Let's talk about your part",
        finitureQui: "The finishes that are born here",
        precedenteSuccessiva: "Previous and next stage",
        metaSuffisso: "subcontract metal working",
      },
    },
  },
} as const;

export const t = (l: Lingua) => dizionario[l];
