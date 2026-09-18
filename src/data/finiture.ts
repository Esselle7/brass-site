/**
 * Le 29 finiture del campionario Brass Style.
 *
 * ⚠️ I testi tecnici (processo, protezione, manutenzione, applicabileSu, uso) sono una BOZZA
 * redatta sul nome della finitura e sull'aspetto del campione: vanno validati dall'ufficio
 * tecnico prima del go-live. L'elenco puntuale di cosa validare è in docs/contenuti-da-validare.md.
 * I campi che nessuno ha ancora dichiarato (dimensione massima del pezzo) valgono `null` e in
 * pagina si leggono come «da confermare»: non si inventano.
 *
 * Le immagini esistono davvero in assets/optimized/images/{grid,full}/<immagine>.{avif,webp}
 * e lo verifica scripts/validate-content.mjs, che esce ≠ 0 se un record è incompleto.
 */

import { slugify } from "../lib/slug";

export type FamigliaId =
  | "trasparenti"
  | "satinate"
  | "nuvolate"
  | "patinate"
  | "marmo"
  | "ossidate"
  | "materiche";

export type Finitura = {
  codice: string;
  slug: string;
  /** stesso codice, nome inglese: /en/finishes/tr-01-clear-brass */
  slugEn: string;
  nomeIt: string;
  nomeEn: string;
  famiglia: FamigliaId;
  metalloBase: string;
  applicabileSu: string[];
  processo: string;
  protezione: string;
  manutenzione: string;
  uso: string;
  /** null = non dichiarato dall'azienda. In pagina diventa «da confermare». */
  pezzoMax: string | null;
  note: string;
  /** basename senza estensione in assets/optimized/images/{grid,full}/ */
  immagine: string;
};

export const famiglie: { id: FamigliaId; nome: string; nomeEn: string; descrizione: string }[] = [
  {
    id: "trasparenti",
    nome: "Trasparenti",
    nomeEn: "Clear coated",
    descrizione:
      "Il metallo resta a vista: si lavora la superficie, si protegge con una vernice trasparente e il colore è quello della lega.",
  },
  {
    id: "satinate",
    nome: "Satinate e spazzolate",
    nomeEn: "Satin and brushed",
    descrizione:
      "La luce viene rotta meccanicamente da una rigatura: diritta, incrociata o orbitale. La direzione del tratto è parte del disegno.",
  },
  {
    id: "nuvolate",
    nome: "Nuvolate",
    nomeEn: "Clouded",
    descrizione:
      "Ossidazione stesa a tampone in modo volutamente irregolare: il tono si addensa a nuvola e nessun pezzo è identico all'altro.",
  },
  {
    id: "patinate",
    nome: "Patinate",
    nomeEn: "Patinated",
    descrizione:
      "Patine chimiche che invecchiano la superficie in modo controllato, dal tono più chiaro al rosato.",
  },
  {
    id: "marmo",
    nome: "Effetto marmo",
    nomeEn: "Marble effect",
    descrizione:
      "Venature realizzate a mano a più strati di vernice: il metallo prende il disegno della pietra restando metallo.",
  },
  {
    id: "ossidate",
    nome: "Ossidate e brunite",
    nomeEn: "Oxidised and burnished",
    descrizione:
      "Bruniture e ossidazioni profonde: il colore nasce dalla reazione chimica sulla lega, non da un pigmento steso sopra.",
  },
  {
    id: "materiche",
    nome: "Materiche",
    nomeEn: "Textured",
    descrizione:
      "Superfici in cui il rilievo o l'inclusione si sentono al tatto prima che si vedano.",
  },
];

type Default = {
  applicabileSu: string[];
  protezione: string;
  manutenzione: string;
  uso: string;
};

const perFamiglia: Record<FamigliaId, Default> = {
  trasparenti: {
    applicabileSu: ["Ottone", "Rame", "Bronzo"],
    protezione: "Vernice trasparente a liquido, opaca o lucida a richiesta",
    manutenzione:
      "Panno morbido asciutto, o appena inumidito con acqua. Nessun detergente acido, alcalino o abrasivo: la vernice trasparente è l'unico strato fra il metallo e l'aria.",
    uso: "Interno",
  },
  satinate: {
    applicabileSu: ["Ottone", "Rame", "Acciaio", "Alluminio"],
    protezione: "Vernice trasparente opaca a liquido",
    manutenzione:
      "Panno morbido passato nella direzione della satinatura. Evitare spugne abrasive: riaprono la rigatura e la rendono disomogenea.",
    uso: "Interno",
  },
  nuvolate: {
    applicabileSu: ["Ottone", "Rame", "Bronzo"],
    protezione: "Vernice trasparente opaca a liquido",
    manutenzione:
      "Panno morbido asciutto. Al massimo detergente neutro molto diluito; mai prodotti acidi o pastosi, che asportano l'ossido e lasciano un alone chiaro.",
    uso: "Interno",
  },
  patinate: {
    applicabileSu: ["Ottone", "Rame", "Bronzo"],
    protezione: "Vernice trasparente opaca a liquido",
    manutenzione:
      "Panno morbido asciutto. La patina è chimica e sottile: nessun abrasivo, nessun prodotto acido.",
    uso: "Interno",
  },
  marmo: {
    applicabileSu: ["Ottone", "Ferro", "Acciaio", "Alluminio"],
    protezione: "Ciclo di verniciatura a liquido, finitura opaca",
    manutenzione:
      "Panno morbido con detergente neutro. Nessun solvente: l'effetto è costruito a strati di vernice e il solvente li scioglie.",
    uso: "Interno",
  },
  ossidate: {
    applicabileSu: ["Ottone", "Rame", "Bronzo"],
    protezione: "Vernice trasparente opaca a liquido; cera microcristallina a richiesta",
    manutenzione:
      "Panno asciutto. Le impronte vanno asciugate subito: il grasso della mano marca l'ossido e resta visibile.",
    uso: "Interno",
  },
  materiche: {
    applicabileSu: ["Ottone", "Ferro"],
    protezione: "Vernice trasparente opaca a liquido",
    manutenzione:
      "Panno morbido asciutto, seguendo il rilievo. Evitare getti d'acqua in pressione e prodotti abrasivi.",
    uso: "Interno",
  },
};

type Raw = Pick<
  Finitura,
  "codice" | "nomeIt" | "nomeEn" | "famiglia" | "processo" | "note" | "immagine"
> &
  Partial<Finitura>;

const raw: Raw[] = [
  // ——— Trasparenti ———
  {
    codice: "TR-01",
    nomeIt: "Trasparente Ottone",
    nomeEn: "Clear Brass",
    famiglia: "trasparenti",
    immagine: "trasparenteottone",
    metalloBase: "Ottone",
    processo:
      "Ottone spazzolato in direzione verticale, sgrassato e protetto con vernice trasparente. Non c'è colore aggiunto: il giallo caldo e la luce lunga sulla rigatura sono quelli della lega.",
    note: "È la finitura di riferimento del campionario: quella su cui si confrontano tutte le altre.",
  },
  {
    codice: "TR-02",
    nomeIt: "Trasparente Bronzo",
    nomeEn: "Clear Bronze",
    famiglia: "trasparenti",
    immagine: "trasparentebronzo",
    metalloBase: "Ottone",
    processo:
      "Superficie spazzolata e portata a tono bronzo con un passaggio chimico leggero, poi protetta a trasparente. Il tono resta caldo e scuro senza diventare marrone.",
    note: "Sui pezzi grandi la rigatura va orientata in fase di progetto: cambia la lettura della luce.",
  },
  {
    codice: "TR-03",
    nomeIt: "Trasparente Rame",
    nomeEn: "Clear Copper",
    famiglia: "trasparenti",
    immagine: "trasparenterame",
    metalloBase: "Rame",
    processo:
      "Rame pulito, uniformato e chiuso con vernice trasparente perché non viri nel tempo. Superficie quasi piana, colore pieno.",
    note: "⚠️ Il campione in archivio è sfocato e mostra poco della grana (docs/asset-mancanti.md): la foto va rifatta.",
  },
  {
    codice: "TR-04",
    nomeIt: "Trasparente Rame Orbitale",
    nomeEn: "Clear Copper, Orbital",
    famiglia: "trasparenti",
    immagine: "trasparenterameorbitale",
    metalloBase: "Rame",
    processo:
      "Rame lavorato con satinatrice orbitale: la luce non corre in una direzione sola ma gira in piccoli cerchi sovrapposti. Protezione a trasparente.",
    note: "L'orbitale nasconde meglio i segni di lavorazione su superfici ampie rispetto alla rigatura diritta.",
  },
  {
    codice: "TR-05",
    nomeIt: "Trasparente Burattato",
    nomeEn: "Clear Tumbled",
    famiglia: "trasparenti",
    immagine: "trasparenteburattato",
    metalloBase: "Ottone",
    processo:
      "Il pezzo passa in buratto con inserti abrasivi: gli spigoli si addolciscono e la superficie prende una micro-granitura uniforme, poi protetta a trasparente.",
    note: "È l'unica finitura del campionario che modifica anche lo spigolo del pezzo, non solo la superficie.",
  },

  // ——— Satinate e spazzolate ———
  {
    codice: "SA-01",
    nomeIt: "Satinato Incrociato",
    nomeEn: "Cross Satin",
    famiglia: "satinate",
    immagine: "crossed",
    metalloBase: "Ottone",
    processo:
      "Doppia satinatura a 90°: la seconda passata incrocia la prima e produce una trama fitta che smorza i riflessi direzionali.",
    note: "Regge bene le impronte: è la scelta abituale per maniglie e superfici toccate spesso.",
  },
  {
    codice: "SA-02",
    nomeIt: "Bronzo Satinato Incrociato",
    nomeEn: "Cross Satin Bronze",
    famiglia: "satinate",
    immagine: "crossedbronze",
    metalloBase: "Ottone",
    processo:
      "Satinatura incrociata portata a tono bronzo: la trama resta leggibile sotto il colore e il fondo scuro fa risaltare il reticolo.",
    note: "Il campione ha la grana più marcata di tutto il campionario: è la finitura che si legge anche da lontano.",
  },
  {
    codice: "SA-03",
    nomeIt: "Bronzo Anticato Incrociato",
    nomeEn: "Aged Cross Bronze",
    famiglia: "satinate",
    immagine: "crossedbrown",
    metalloBase: "Ottone",
    processo:
      "Come SA-02, con un passaggio di anticatura che scurisce gli avvallamenti del reticolo e lascia in luce le creste.",
    note: "Il contrasto fra creste e fondo cambia con la pressione della spazzolatura: va concordato sul pezzo campione.",
  },
  {
    codice: "SA-04",
    nomeIt: "Sanded Silver",
    nomeEn: "Sanded Silver",
    famiglia: "satinate",
    immagine: "sandedsilver",
    metalloBase: "Ottone",
    processo:
      "Sabbiatura fine seguita da una finitura chiara: la superficie diventa opaca e uniforme, con una luce diffusa e argentea invece del riflesso.",
    note: "Opacità e tono dipendono dalla granulometria della sabbia: indicare in richiesta se serve più chiara o più grigia.",
  },
  {
    codice: "SA-05",
    nomeIt: "Satinato CDF",
    nomeEn: "CDF Satin",
    famiglia: "satinate",
    immagine: "satinatocdf",
    metalloBase: "Ottone",
    processo:
      "Satinatura diritta a grana media su ottone, con tono neutro e chiusura opaca. È la satinatura standard del reparto.",
    note: "«CDF» è la sigla interna del campione. ⚠️ Da confermare come va esposta a catalogo.",
  },

  // ——— Nuvolate ———
  {
    codice: "NU-01",
    nomeIt: "Nuvolato Chiaro",
    nomeEn: "Light Clouded",
    famiglia: "nuvolate",
    immagine: "nuvolatochiaro",
    metalloBase: "Ottone",
    processo:
      "Ossidazione stesa a tampone con tempi di contatto brevi: il fondo resta chiaro e le nuvole appena accennate.",
    note: "È la più uniforme della famiglia: adatta a superfici grandi dove le macchie marcate disturberebbero.",
  },
  {
    codice: "NU-02",
    nomeIt: "Nuvolato Medio",
    nomeEn: "Medium Clouded",
    famiglia: "nuvolate",
    immagine: "nuvolatomedio",
    metalloBase: "Ottone",
    processo:
      "Ossidazione a tampone con stesura irregolare: gli addensamenti formano il tipico alone nuvolato. Il grado di scurimento si regola sui tempi di contatto.",
    note: "Il tono medio è il più richiesto della famiglia; due pezzi non sono mai identici, ed è voluto.",
  },
  {
    codice: "NU-03",
    nomeIt: "Nuvolato Scuro",
    nomeEn: "Dark Clouded",
    famiglia: "nuvolate",
    immagine: "nuvolatoscuro",
    metalloBase: "Ottone",
    processo:
      "Stessa lavorazione del NU-02 con tempi di contatto lunghi: il fondo va sul bruno profondo e le nuvole restano come schiariture.",
    note: "Su pezzi affiancati conviene lavorare l'intera fornitura nello stesso bagno, per tenere il tono.",
  },
  {
    codice: "NU-04",
    nomeIt: "Nuvolato Anticato",
    nomeEn: "Aged Clouded",
    famiglia: "nuvolate",
    immagine: "nuvolatoanticato",
    metalloBase: "Ottone",
    processo:
      "Nuvolatura seguita da una ripresa meccanica leggera sulle parti in rilievo: l'effetto è quello di un pezzo usato e lucidato dall'uso.",
    note: "La ripresa si concentra dove il pezzo verrebbe toccato davvero: va indicata sul disegno.",
  },

  // ——— Patinate ———
  {
    codice: "PA-01",
    nomeIt: "Patinato Chiaro",
    nomeEn: "Light Patina",
    famiglia: "patinate",
    immagine: "patinatochiaro",
    metalloBase: "Ottone",
    processo:
      "Patina chimica leggera che smorza il giallo dell'ottone verso un beige caldo, mantenendo la superficie compatta e priva di venature.",
    note: "È la finitura più neutra del campionario: sta bene accanto a legni chiari e pietre.",
  },
  {
    codice: "PA-02",
    nomeIt: "Patinato Medio",
    nomeEn: "Medium Patina",
    famiglia: "patinate",
    immagine: "patinatomedio",
    metalloBase: "Ottone",
    processo:
      "Stessa patina del PA-01 portata avanti: il tono scende verso il tortora e la superficie prende una leggera profondità.",
    note: "Tono intermedio: se il progetto prevede più lotti nel tempo, conviene tenere un campione di riferimento firmato.",
  },
  {
    codice: "PA-03",
    nomeIt: "Patinato Rosa",
    nomeEn: "Rose Patina",
    famiglia: "patinate",
    immagine: "patinatorosa",
    metalloBase: "Ottone",
    processo:
      "Patina che lascia emergere la componente ramata della lega: il risultato è un rosa polveroso, freddo e non lucido.",
    note: "Il rosa è il tono più sensibile alla lega di partenza: campionare sul materiale effettivo del progetto.",
  },

  // ——— Effetto marmo ———
  {
    codice: "MA-01",
    nomeIt: "Effetto Marmo Bianco",
    nomeEn: "White Marble Effect",
    famiglia: "marmo",
    immagine: "effettomarmobianco",
    metalloBase: "Ottone",
    processo:
      "Fondo chiaro a spruzzo e venature tirate a mano a pennello fine, chiuse da un trasparente opaco. Ogni pezzo è disegnato singolarmente.",
    note: "Le venature seguono il pezzo: su superfici affiancate vanno concordate continuità e direzione.",
  },
  {
    codice: "MA-02",
    nomeIt: "Effetto Marmo Chiaro",
    nomeEn: "Light Marble Effect",
    famiglia: "marmo",
    immagine: "effettomarmo1",
    metalloBase: "Ottone",
    processo:
      "Variante a fondo avorio con venatura più rada e contrasto contenuto: il disegno si legge da vicino, da lontano resta una superficie chiara.",
    note: "È la variante più facile da ripetere su lotti ripetuti.",
  },
  {
    codice: "MA-03",
    nomeIt: "Effetto Marmo Texture",
    nomeEn: "Textured Marble Effect",
    famiglia: "marmo",
    immagine: "effettomarmotexture",
    metalloBase: "Ottone",
    processo:
      "Fondo bruno-verde lavorato a spugna e poi rifinito: la venatura non è lineare ma a macchie sovrapposte, con un rilievo appena percepibile.",
    note: "Superficie che nasconde bene le impronte: adatta a piani e zoccolature.",
  },
  {
    codice: "MA-04",
    nomeIt: "Effetto Marmo Verde",
    nomeEn: "Green Marble Effect",
    famiglia: "marmo",
    immagine: "effettomarmoverde",
    metalloBase: "Ottone",
    processo:
      "Fondo verde profondo con venature chiare tirate a mano, nello spirito dei marmi verdi alpini. Chiusura opaca.",
    note: "Il verde scuro fa risaltare gli spigoli: su pezzi saldati la ripresa della saldatura deve essere impeccabile.",
  },
  {
    codice: "MA-05",
    nomeIt: "Effetto Marmo Arrugginito",
    nomeEn: "Rusted Marble Effect",
    famiglia: "marmo",
    immagine: "effettomarmorust",
    metalloBase: "Ottone",
    processo:
      "Fondo ruggine con venature scure e schiariture, ottenuto a più mani con passaggi di spugna e pennello. È la variante più materica della famiglia.",
    note: "Insieme a MA-03 è quella che regge meglio le superfici grandi senza mostrare ripetizioni.",
  },

  // ——— Ossidate e brunite ———
  {
    codice: "OS-01",
    nomeIt: "Bronzo Antico",
    nomeEn: "Antique Bronze",
    famiglia: "ossidate",
    immagine: "bronzoantico",
    metalloBase: "Ottone",
    processo:
      "Ossidazione profonda e successiva ripresa a tampone sulle parti in rilievo: il fondo resta bruno scuro, i rilievi tornano in luce.",
    note: "È la finitura classica dell'arredo d'epoca: il contrasto si decide sul pezzo, non a catalogo.",
  },
  {
    codice: "OS-02",
    nomeIt: "Cloudy Smoked",
    nomeEn: "Cloudy Smoked",
    famiglia: "ossidate",
    immagine: "cloudysmoked",
    metalloBase: "Ottone",
    processo:
      "Brunitura stesa in modo irregolare che lascia una velatura grigio-fumo sopra il metallo: la superficie sembra annebbiata più che colorata.",
    note: "Sui pezzi lucidi prima della brunitura il fumo resta più trasparente; su fondi satinati diventa più coprente.",
  },
  {
    codice: "OS-03",
    nomeIt: "Cloudy Blue",
    nomeEn: "Cloudy Blue",
    famiglia: "ossidate",
    immagine: "cloudyblue",
    metalloBase: "Ottone",
    processo:
      "Ossidazione spinta fino alla comparsa dei toni freddi: il blu-grigio che compare è una fase della reazione, non un pigmento.",
    note: "È la finitura più difficile da ripetere identica: prevedere sempre un campione di controllo per lotto.",
  },
  {
    codice: "OS-04",
    nomeIt: "Cloudy Bronzed Blue",
    nomeEn: "Cloudy Bronzed Blue",
    famiglia: "ossidate",
    immagine: "cloudybronzedblue",
    metalloBase: "Ottone",
    processo:
      "Variante del Cloudy Blue in cui la reazione viene fermata prima: restano insieme il bronzo caldo del fondo e le zone fredde in superficie.",
    note: "Il rapporto fra caldo e freddo cambia da pezzo a pezzo: è la firma della finitura.",
  },
  {
    codice: "OS-05",
    nomeIt: "Sfumato F",
    nomeEn: "Graded F",
    famiglia: "ossidate",
    immagine: "sfumatof",
    metalloBase: "Ottone",
    processo:
      "Ossidazione applicata a gradiente: il tono passa dal chiaro allo scuro lungo il pezzo, senza stacchi. Richiede una stesura continua, in un solo passaggio.",
    note: "Sui pezzi lunghi la direzione della sfumatura va indicata sul disegno. «F» è la sigla interna del campione ⚠️ da confermare.",
  },

  // ——— Materiche ———
  {
    codice: "MT-01",
    nomeIt: "Ottone Glitter",
    nomeEn: "Glitter Brass",
    famiglia: "materiche",
    immagine: "ottoneglitter",
    metalloBase: "Ottone",
    processo:
      "Ottone trattato in modo da frammentare la superficie in micro-faccette: la luce viene restituita a punti anziché in modo continuo.",
    note: "Sotto luce diretta il punto luminoso si sposta con l'osservatore: valutarla dal vivo, la foto la restituisce solo in parte.",
  },
  {
    codice: "MT-02",
    nomeIt: "Borgogna Materico",
    nomeEn: "Burgundy Textured",
    famiglia: "materiche",
    immagine: "borgognamaterico",
    metalloBase: "Ottone",
    processo:
      "Ciclo a liquido con finitura a rilievo in tono borgogna scuro: il colore è pieno e la superficie ha una grana che si sente al tatto.",
    note: "È l'unica finitura del campionario in cui il colore non deriva dal metallo: va scelta sul campione fisico.",
  },
];

export const finiture: Finitura[] = raw.map((r) => {
  const d = perFamiglia[r.famiglia];
  const codice = r.codice.toLowerCase();
  return {
    applicabileSu: d.applicabileSu,
    protezione: d.protezione,
    manutenzione: d.manutenzione,
    uso: d.uso,
    pezzoMax: null,
    metalloBase: "Ottone",
    ...r,
    slug: `${codice}-${slugify(r.nomeIt)}`,
    slugEn: `${codice}-${slugify(r.nomeEn)}`,
  } as Finitura;
});

export const finituraBySlug = (slug: string, lingua: "it" | "en" = "it") =>
  finiture.find((f) => (lingua === "en" ? f.slugEn : f.slug) === slug);
export const famigliaById = (id: FamigliaId) => famiglie.find((f) => f.id === id)!;
