import type { FamigliaId } from "./finiture";

/**
 * Le 10 lavorazioni reali di Brass Style (i nomi vengono dal sito attuale, docs/as-is.md §2.10).
 *
 * ⚠️ I testi descrivono il PROCESSO e come si lavora in conto terzi: sono una bozza redatta in
 * sessione, da validare con l'azienda (docs/contenuti-da-validare.md). Non contengono dati che
 * nessuno ha dichiarato — modelli di macchina, tolleranze, capacità, numero di postazioni: quelli
 * mancano e sono elencati in docs/asset-mancanti.md, non inventati qui.
 */
export type Lavorazione = {
  slug: string;
  titolo: string;
  titoloEn: string;
  sommario: string;
  corpo: string[];
  /** basename in assets/optimized/images/full/ */
  immagine: string;
  immagineSecondaria?: string;
  famiglieCorrelate?: FamigliaId[];
  /** Cosa serve al reparto per partire: è la risposta alla domanda «cosa ti mando?» */
  cosaServe: string[];
};

export const lavorazioni: Lavorazione[] = [
  {
    slug: "progettazione",
    titolo: "Progettazione",
    titoloEn: "Design engineering",
    sommario:
      "Dal disegno del designer al disegno che si può produrre: sezioni, spessori, giunzioni e finitura decisi prima di tagliare il primo tubo.",
    immagine: "progettazione",
    cosaServe: [
      "Disegno 2D o modello 3D, anche non quotato",
      "Finitura desiderata, o almeno la famiglia (trasparente, nuvolata, effetto marmo…)",
      "Quantità indicativa e destinazione d'uso del pezzo",
    ],
    corpo: [
      "La progettazione è il punto in cui un disegno diventa un pezzo producibile. Un rendering non dice quale spessore regge la campata, dove passa una saldatura senza restare in vista, come si smonta l'oggetto per il trasporto, quale raggio può fare la piega senza aprire la superficie. Sono tutte decisioni che, se rimandate, ricompaiono in reparto sotto forma di scarto.",
      "Il lavoro parte da quello che il cliente ha: un modello 3D completo, un disegno 2D con le quote essenziali, a volte solo uno schizzo con una misura d'ingombro. Su quella base si ricostruisce la geometria del pezzo, si stabiliscono le sezioni dei tubi e gli spessori delle lamiere, si decide come i componenti si uniscono e quali parti restano smontabili. Le scelte non sono mai solo strutturali: ogni giunzione ha un effetto sulla finitura, perché una saldatura ripresa male si vede sotto una brunitura molto più che sotto una verniciatura coprente.",
      "La finitura, per questo motivo, si sceglie qui e non alla fine. Una superficie nuvolata chiede una preparazione diversa da una satinata incrociata; un effetto marmo richiede un fondo verniciabile e continuo; una trasparente non perdona nessun segno di lavorazione, perché non ha niente da nascondere. Decidere la finitura in fase di progetto significa impostare fin da subito tolleranze e sequenza delle operazioni coerenti con il risultato che si vuole.",
      "Il secondo tema è la ripetibilità. Un pezzo unico si può risolvere in molti modi; una serie ha bisogno di attrezzature, riferimenti di posizionamento e un ordine di montaggio che restino uguali dal primo all'ultimo esemplare. Nella stessa fase si valuta se conviene un'attrezzatura dedicata, quanti pezzi rendono sostenibile costruirla e quali controlli intermedi servono.",
      "L'uscita di questa fase è una cosa sola: un disegno esecutivo condiviso, con i punti critici dichiarati e la finitura scelta. Da lì si passa al prototipo, che serve a verificare sul pezzo vero ciò che finora è stato deciso sulla carta.",
    ],
  },
  {
    slug: "prototipazione",
    titolo: "Prototipazione e ingegnerizzazione",
    titoloEn: "Prototyping and engineering",
    sommario:
      "Il primo pezzo esiste per essere discusso: si guarda, si misura, si cambia. Poi diventa la regola per tutta la serie.",
    immagine: "prototipazione",
    cosaServe: [
      "Disegno esecutivo approvato o modello 3D aggiornato",
      "Campione della finitura richiesta, se esiste già un riferimento",
      "Chi decide l'approvazione del prototipo, e in che tempi",
    ],
    corpo: [
      "Il prototipo è il primo pezzo che si può tenere in mano, e serve esattamente a questo: mettere d'accordo chi ha disegnato e chi deve produrre su un oggetto reale, non su un'immagine. È il momento in cui emergono le cose che nessun modello 3D mostra — il peso, il suono, il gioco fra due componenti, l'effetto reale di una finitura su una superficie curva.",
      "Si costruisce con le stesse lavorazioni della serie, non con scorciatoie: taglio, piegatura, asportazione di truciolo, saldatura e ripresa. Un prototipo fatto in modo diverso dalla produzione dice poco, perché non mette alla prova il ciclo che verrà effettivamente usato. Sul pezzo si verificano le quote critiche, la tenuta delle giunzioni, il comportamento delle superfici visibili e la fattibilità della finitura scelta.",
      "L'ingegnerizzazione è la parte meno visibile e più decisiva. Significa trasformare un pezzo che funziona in un pezzo che si può ripetere: definire l'ordine delle operazioni, i riferimenti di posizionamento, le attrezzature di saldatura che tengono la geometria, i punti in cui il controllo va fatto durante il ciclo e non alla fine. Qui si decide anche cosa conviene fare in un'unica lavorazione e cosa è meglio scomporre, perché un pezzo costruito in due parti e unito bene costa spesso meno di un pezzo unico difficile da tenere in tolleranza.",
      "Quasi sempre il prototipo produce modifiche. È il suo scopo: cambiare adesso costa un pezzo, cambiare dopo l'avvio costa un lotto. Le revisioni vengono riportate sul disegno, così che la versione approvata sia una sola e sia quella che va in produzione.",
      "Quando il prototipo è approvato diventa il riferimento fisico della commessa: il campione firmato a cui si confrontano i pezzi della serie, compresa la finitura, che su un campione approvato smette di essere una descrizione e diventa un oggetto. Da quel momento ogni contestazione ha un termine di paragone fisico, e le discussioni su cosa fosse stato concordato smettono di essere opinioni.",
    ],
  },
  {
    slug: "prototipazione-imballi",
    titolo: "Prototipazione imballi",
    titoloEn: "Packaging prototyping",
    sommario:
      "Un pezzo finito bene e imballato male arriva rovinato. L'imballo si progetta e si prova come il prodotto.",
    immagine: "prototipazioneimballi",
    cosaServe: [
      "Destinazione e mezzo di trasporto previsti (gomma, mare, aereo)",
      "Se il pezzo viaggia finito o smontato",
      "Eventuali vincoli del cliente finale su materiali e marcature dell'imballo",
    ],
    corpo: [
      "Su un pezzo con finitura a vista, l'imballo non è un accessorio: è l'ultima lavorazione. Una superficie brunita o verniciata a liquido si segna con pochissimo, e i danni non avvengono in reparto ma nei trasferimenti, nei carichi, negli appoggi ripetuti. Per questo l'imballo si prototipa: si costruisce, si carica, si movimenta e si guarda cosa succede davvero al pezzo.",
      "La progettazione dell'imballo parte dalla geometria e dalla fragilità dell'oggetto. Si stabilisce dove il pezzo può essere toccato e dove no, quali punti sopportano il carico, come va vincolato perché non si muova, quali materiali possono stare a contatto con la superficie finita senza lasciare tracce. Un film adesivo sbagliato su una vernice fresca è un classico: protegge per una settimana e lascia il suo segno per sempre.",
      "Il secondo criterio è chi aprirà la scatola. In cantiere, spesso, chi disimballa non è chi ha ordinato il pezzo: l'imballo deve rendere ovvio come si estrae il pezzo senza forzarlo e come si rimette dentro se il montaggio slitta. Un imballo che si apre in un modo solo, e in modo evidente, riduce i danni più di uno strato in più di protezione.",
      "Poi ci sono i vincoli di trasporto: dimensioni della pedana, impilabilità, peso per collo, resistenza all'umidità per le spedizioni via mare, eventuali marcature richieste dal destinatario. Sono vincoli che cambiano il progetto dell'imballo e a volte anche quello del pezzo, perché un componente smontabile viaggia meglio e occupa meno.",
      "Il prototipo di imballo si prova a pieno carico, non a vuoto, e si corregge finché il pezzo esce dalla scatola come vi è entrato. Da quel momento l'imballo entra nel ciclo con le stesse istruzioni di ogni altra lavorazione, e la sua ripetibilità vale quanto quella della finitura. Chi imballa segue una scheda, non la memoria: materiali, sequenza e punti di vincolo sono scritti, e cambiarli richiede una nuova prova, non una decisione presa sul momento.",
    ],
  },
  {
    slug: "lavorazioni-meccaniche",
    titolo: "Lavorazioni meccaniche",
    titoloEn: "Machining",
    sommario:
      "Taglio, foratura, fresatura, tornitura, piegatura: la geometria del pezzo prende forma qui, e con lei la qualità della superficie che verrà finita.",
    immagine: "lavorazionimeccaniche",
    immagineSecondaria: "fresatura",
    cosaServe: [
      "Disegno quotato con le tolleranze che contano davvero",
      "Materiale e sezione di partenza, se già definiti",
      "Indicazione delle superfici a vista, che vanno protette durante la lavorazione",
    ],
    corpo: [
      "Le lavorazioni meccaniche sono la fase in cui il materiale prende la forma del disegno: taglio a misura, foratura, filettatura, fresatura, tornitura, piegatura e calandratura dei profili. Nell'arredo di alta gamma queste operazioni hanno una particolarità che le distingue dalla meccanica industriale: quasi tutte le superfici lavorate resteranno a vista, quindi la qualità del taglio e del truciolo non è solo una questione dimensionale, è già una questione estetica.",
      "L'ottone si lavora bene ma è tenero: segna, si imprime, e un'attrezzatura di bloccaggio scelta male lascia un'impronta che nessuna finitura successiva recupera del tutto. Per questo si ragiona sempre su due piani insieme — come tenere il pezzo in tolleranza e come non danneggiarlo mentre lo si tiene. Protezioni sulle ganasce, appoggi puliti, ordine delle operazioni pensato per ridurre i riposizionamenti: sono accorgimenti che non compaiono sul disegno ma decidono l'esito.",
      "Le tolleranze si concentrano dove servono. Un pezzo d'arredo non ha bisogno che tutto sia stretto: ha bisogno che siano precise le interfacce, cioè i punti dove i componenti si accoppiano, dove entra una vite, dove appoggia un vetro o un piano. Dichiarare quali quote sono critiche, e quali no, è il modo più efficace per tenere il costo dove ha senso.",
      "La piegatura merita un discorso a parte, perché è irreversibile e perché lavora sulla superficie esterna: il raggio va scelto in funzione del materiale e dello spessore, e su una finitura satinata la direzione della piega rispetto alla rigatura cambia il risultato visivo. Anche questo si decide prima, non dopo.",
      "L'uscita della fase è un insieme di componenti pronti per essere uniti: a misura, sbavati, con le superfici a vista protette e con i riferimenti che serviranno in saldatura e in assemblaggio già presenti sul pezzo. Le sbavature vanno tolte prima e non dopo la finitura, perché un bordo vivo taglia chi monta e, sotto una vernice, resta un filo scuro che si nota appena la luce lo prende di traverso.",
    ],
  },
  {
    slug: "saldatura",
    titolo: "Saldatura",
    titoloEn: "Welding",
    sommario:
      "Unire senza che si veda: su un pezzo a vista la saldatura buona è quella che, dopo la ripresa, non esiste più.",
    immagine: "saldatura",
    immagineSecondaria: "saldatore",
    cosaServe: [
      "Indicazione delle giunzioni che devono restare invisibili",
      "Requisiti strutturali del pezzo (carico, sbalzi, punti di fissaggio)",
      "Finitura prevista: decide quanto va spinta la ripresa del cordone",
    ],
    corpo: [
      "Nella carpenteria d'arredo la saldatura ha un vincolo che nella carpenteria strutturale non esiste: deve tenere e non deve vedersi. Su un oggetto che verrà brunito o lasciato trasparente, il cordone non può essere semplicemente coperto — va ripreso, riportato a livello e raccordato finché la superficie ritorna continua, perché ogni discontinuità reagisce al trattamento chimico in modo diverso dal metallo circostante e ricompare come un'ombra.",
      "La scelta del procedimento dipende dal materiale, dallo spessore e dalla posizione del giunto. Su ottone e rame l'apporto termico va controllato con attenzione: sono materiali che conducono calore molto rapidamente, tendono a deformarsi e possono ossidarsi a bordo cordone. Una sequenza di puntatura pensata male produce un pezzo che si chiude a spirale mentre si raffredda, e nessuna ripresa lo raddrizza senza lasciare segni.",
      "Per questo la geometria viene tenuta da attrezzature e riferimenti: il pezzo si posiziona sempre allo stesso modo, si punta in un ordine stabilito, si completa alternando i lati per bilanciare le deformazioni. Su serie ripetute l'attrezzatura di saldatura è ciò che rende il decimo pezzo uguale al primo.",
      "Dopo la saldatura viene la ripresa: molatura, spianatura e raccordo del cordone, poi la riomogeneizzazione della superficie con la stessa lavorazione del resto del pezzo — satinatura nella medesima direzione, spazzolatura, sabbiatura. È la fase più lunga e la meno visibile nel risultato finale, ed è esattamente il punto in cui si riconosce un pezzo fatto bene.",
      "Quanto va spinta la ripresa dipende dalla finitura scelta: sotto una verniciatura coprente il margine è maggiore, sotto una trasparente è quasi nullo. È la ragione per cui la finitura entra nel discorso già alla progettazione, e per cui il reparto vuole saperla prima di saldare, non dopo. Dove una giunzione invisibile costerebbe troppo, la strada alternativa è dichiararla: un giunto progettato per vedersi, allineato e regolare, è un dettaglio; un giunto nascosto male è un difetto.",
    ],
  },
  {
    slug: "brunitura-e-ossidazione",
    titolo: "Brunitura e ossidazione",
    titoloEn: "Burnishing and oxidation",
    sommario:
      "Il colore nasce dalla reazione chimica sul metallo: non è uno strato steso sopra, è la superficie stessa che cambia.",
    immagine: "brunitura",
    immagineSecondaria: "bronzatura",
    famiglieCorrelate: ["ossidate", "nuvolate", "patinate"],
    cosaServe: [
      "Campione di riferimento approvato, o la famiglia di finitura desiderata",
      "Se i pezzi vanno affiancati fra loro (cambia la gestione del lotto)",
      "Numero di pezzi e se sono previsti riordini successivi",
    ],
    corpo: [
      "Brunitura e ossidazione sono trattamenti chimici di conversione: la superficie del metallo reagisce e cambia colore in profondità, invece di ricevere un pigmento. È la differenza che si vede subito su uno spigolo — un pezzo brunito, se consumato, mostra ancora metallo, non una vernice che si stacca a scaglie.",
      "Il risultato dipende da tre cose che vanno tenute insieme: la lega di partenza, la preparazione della superficie e il tempo di contatto. La lega decide il tono possibile: lo stesso trattamento su ottoni con percentuali di rame diverse dà colori diversi, ed è il motivo per cui un campione va sempre ricontrollato sul materiale effettivo della commessa. La preparazione decide l'uniformità: un residuo di grasso o un'impronta lasciano una macchia che compare solo a reazione avvenuta. Il tempo decide la profondità: gli stessi prodotti portano dal bruno chiaro al nero passando per i toni caldi intermedi.",
      "Da qui nascono le famiglie del campionario. Le finiture nuvolate si ottengono stendendo il prodotto a tampone in modo volutamente irregolare, così che il tono si addensi a macchia. Le ossidate profonde lavorano sul tempo lungo. Le sfumate richiedono una stesura continua, in un solo passaggio, perché ogni ripresa lascia uno stacco. Le anticate aggiungono una ripresa meccanica dopo la reazione, che riporta in luce i rilievi come farebbe l'uso.",
      "La variabilità è parte del risultato, ma va governata. Su pezzi che andranno affiancati conviene lavorare l'intera fornitura nello stesso ciclo e con lo stesso bagno, e tenere un campione di controllo del lotto: due pezzi identici prodotti a mesi di distanza possono differire, e dichiararlo prima evita una contestazione dopo.",
      "A reazione completata la superficie va fermata e protetta, di norma con una vernice trasparente opaca o, dove richiesto, con cera. Senza protezione l'ossidazione continua, e un pezzo consegnato oggi non è più lo stesso fra sei mesi.",
    ],
  },
  {
    slug: "verniciatura-a-liquido",
    titolo: "Verniciatura a liquido",
    titoloEn: "Liquid painting",
    sommario:
      "Dal trasparente che protegge una brunitura all'effetto marmo tirato a mano: il ciclo a liquido chiude quasi tutte le finiture del campionario.",
    immagine: "verniciatura",
    famiglieCorrelate: ["marmo", "materiche", "trasparenti"],
    cosaServe: [
      "Finitura o codice campione (es. MA-04)",
      "Grado di lucentezza desiderato: opaco, satinato, lucido",
      "Se il pezzo è destinato a uso interno o a condizioni particolari",
    ],
    corpo: [
      "La verniciatura a liquido ha due ruoli diversi in questo ciclo. Il primo è protettivo: è il trasparente che ferma un'ossidazione e la conserva nel tempo, e che su una finitura trasparente o satinata è l'unico strato fra il metallo e l'aria. Il secondo è decorativo: è la tecnica con cui si costruiscono gli effetti marmo e le finiture materiche, dove il colore non viene dal metallo ma viene disegnato sopra di esso.",
      "In entrambi i casi il risultato si decide nella preparazione. La superficie deve essere pulita, sgrassata e omogenea: qualunque residuo diventa un difetto visibile, e sotto un trasparente non c'è nulla che lo nasconda. Dove serve, si applica un fondo che uniforma l'assorbimento e dà aggrappaggio; la scelta del fondo cambia in funzione del metallo e dell'aspetto finale.",
      "Gli effetti marmo sono un lavoro a più mani. Si stende il fondo, si tirano le venature a pennello fine o a spugna, si aggiustano i contrasti, si chiude con un trasparente che fissa il disegno e stabilisce la lucentezza. Ogni pezzo è disegnato singolarmente: su superfici affiancate la continuità e la direzione delle venature vanno concordate prima, perché sono una scelta di progetto e non un dettaglio esecutivo.",
      "La lucentezza va indicata esplicitamente. Opaco, satinato e lucido cambiano radicalmente la percezione dello stesso colore: un nero opaco assorbe la luce e appiattisce il volume, lo stesso nero lucido restituisce ogni riflesso dell'ambiente e mostra ogni ondulazione della lamiera. Non c'è una scelta migliore in assoluto, c'è quella coerente con il pezzo e con il luogo in cui starà.",
      "Prima della consegna la superficie va controllata in luce radente, che è il modo in cui i difetti si vedono davvero: a quel punto il pezzo passa all'assemblaggio o direttamente all'imballo, dove la prima regola è non toccarlo più del necessario.",
    ],
  },
  {
    slug: "assemblaggio",
    titolo: "Assemblaggio",
    titoloEn: "Assembly",
    sommario:
      "I componenti finiti diventano il pezzo che il cliente vedrà: si monta su superfici già lavorate, e non si può più correggere nulla.",
    immagine: "assemblaggio",
    immagineSecondaria: "montaggio",
    cosaServe: [
      "Distinta dei componenti e schema di montaggio",
      "Ferramenta e componenti a fornitura del cliente, se previsti",
      "Se il pezzo va consegnato montato o smontato",
    ],
    corpo: [
      "L'assemblaggio è l'ultima fase in cui il pezzo prende forma, e la prima in cui un errore non ha più rimedio: si lavora su componenti già finiti, dove un utensile che scivola o un appoggio sporco significano rifare la finitura, non ritoccarla. Per questo il montaggio si prepara — piani protetti, guanti, attrezzatura dedicata, sequenza definita — invece di essere improvvisato sul momento.",
      "Il montaggio segue lo schema deciso in ingegnerizzazione: quali componenti si uniscono per primi, quali viti si chiudono a coppia controllata, dove servono elementi di regolazione per recuperare le tolleranze del pezzo e quelle del luogo in cui verrà installato. Nell'arredo su misura la seconda parte conta quanto la prima: una struttura perfetta che non ha modo di essere registrata in cantiere diventa un problema di qualcun altro.",
      "Qui confluisce anche la ferramenta, spesso in parte fornita dal cliente: cerniere, guide, sistemi di fissaggio, componenti elettrici quando il pezzo è illuminato. Vanno verificati per compatibilità e funzionamento prima della chiusura, perché smontare un pezzo assemblato per sostituire un componente significa rimetterlo a rischio.",
      "Il controllo di questa fase è funzionale e visivo insieme. Funzionale: tutto ciò che si muove si muove come deve, tutto ciò che si fissa tiene. Visivo: le superfici a vista si guardano in luce radente, si verificano allineamenti, luci fra i componenti e continuità della finitura fra pezzi diversi che dopo il montaggio staranno uno accanto all'altro.",
      "L'ultima decisione è se il pezzo parte montato o smontato. Un oggetto grande consegnato montato riduce il lavoro in cantiere ma aumenta il rischio nel trasporto e il costo dell'imballo; smontato è più sicuro ma richiede istruzioni chiare e componenti identificati. È una scelta da prendere insieme al cliente, prima che il pezzo arrivi in reparto imballo. Sui pezzi che partono smontati, il montaggio di prova in reparto resta comunque obbligatorio: si verifica che tutto combaci, poi si smonta con i componenti già identificati per il cantiere.",
    ],
  },
  {
    slug: "imballaggio",
    titolo: "Imballaggio",
    titoloEn: "Packaging",
    sommario:
      "L'imballo definitivo è quello provato in fase di prototipo: materiali compatibili con la finitura, pezzi vincolati, apertura evidente.",
    immagine: "imballaggio",
    cosaServe: [
      "Indirizzo e modalità di consegna (cantiere, magazzino, spedizioniere)",
      "Requisiti di marcatura ed etichettatura del destinatario",
      "Se serve imballo per trasporto via mare o stoccaggio prolungato",
    ],
    corpo: [
      "L'imballaggio esegue quello che la prototipazione degli imballi ha stabilito: non è un'operazione improvvisata alla fine del ciclo, ma una lavorazione con materiali definiti, sequenza definita e controlli propri. Su pezzi con finitura a vista è anche l'ultima occasione di guardare il prodotto prima che sparisca dentro una scatola.",
      "I materiali a contatto sono la prima cosa che conta. Ogni superficie ha le sue incompatibilità: film adesivi che lasciano residui su vernici fresche, schiume che si imprimono su superfici morbide, carte che trattengono umidità. La regola pratica del reparto è semplice — ciò che tocca il pezzo deve essere stato provato su quella finitura, non genericamente considerato protettivo.",
      "Poi c'è il vincolo meccanico. Il pezzo non deve muoversi dentro l'imballo: il danno non nasce dall'urto singolo ma dalle micro-vibrazioni ripetute per centinaia di chilometri, che consumano la protezione proprio nei punti di appoggio. Si vincola sui punti che sopportano carico, mai sulle superfici a vista, e si distribuisce il peso in modo che l'imballo sia impilabile se la spedizione lo prevede.",
      "Un imballo ben fatto dice anche come si apre. Indicazioni di alto e basso, punti di presa, ordine di estrazione dei componenti, elenco di ciò che c'è dentro: in cantiere chi apre non è quasi mai chi ha ordinato, e un'apertura ambigua produce più danni di un trasporto scomodo. Dove i pezzi partono smontati, l'identificazione dei componenti e la documentazione di montaggio viaggiano insieme al collo.",
      "L'ultimo controllo è la corrispondenza fra quanto imballato e quanto ordinato, collo per collo. È banale e rimane il modo più efficace per evitare la telefonata peggiore: quella in cui manca un pezzo su un montaggio già iniziato. Il conteggio si fa in due, su una lista scritta, e chiude la commessa: da lì in poi il pezzo non è più in mano al reparto, ed è l'ultimo momento in cui un errore costa ancora poco.",
    ],
  },
  {
    slug: "trasporto",
    titolo: "Trasporto",
    titoloEn: "Shipping",
    sommario:
      "La consegna è parte della commessa: tempi concordati, mezzo adatto al pezzo e documenti che arrivano insieme alla merce.",
    immagine: "trasporto",
    cosaServe: [
      "Data e finestra di consegna richiesta",
      "Condizioni del luogo di scarico (sponda idraulica, accessi, orari)",
      "Riferimento di cantiere o di magazzino a cui intestare la spedizione",
    ],
    corpo: [
      "Il trasporto chiude il ciclo e ne eredita tutti i rischi: un pezzo lavorato, finito e imballato con cura può essere compromesso in un'ora di viaggio mal organizzata. Per questo la spedizione si programma insieme alla produzione e non dopo, tenendo conto di quanto il pezzo è ingombrante, di come è stato imballato e di dove deve arrivare.",
      "La scelta del mezzo dipende dal pezzo. Un carico di componenti pallettizzati e impilabili viaggia con logiche diverse da un elemento singolo alto due metri che non si può coricare. Cambiano il tipo di veicolo, il modo di stivare, i vincoli in cassa e a volte la necessità di una sponda idraulica allo scarico. Sono informazioni da avere prima: scoprire in consegna che al cantiere non c'è modo di scaricare significa far tornare indietro la merce, con il rischio di movimentazione che questo comporta.",
      "La seconda variabile è il tempo. Nell'arredo su misura le consegne sono quasi sempre legate a un montaggio in cantiere, dove ogni giorno ha un costo che non è quello del trasporto. Una data concordata e mantenuta vale più di una consegna rapida ma incerta, e quando qualcosa slitta la cosa utile è saperlo in anticipo, non il giorno stesso.",
      "Insieme alla merce viaggiano i documenti: documento di trasporto, elenco dei colli, identificazione dei componenti nel caso di pezzi smontati, indicazioni di montaggio dove servono. La merce che arriva senza documentazione utilizzabile resta ferma, ed è un fermo che si paga in cantiere.",
      "Alla consegna il controllo è dell'integrità dei colli e della corrispondenza con l'ordine: eventuali danni vanno rilevati subito, perché documentati in quel momento si risolvono e scoperti dopo diventano una discussione. Se il pezzo arriva come è partito, il ciclo ha funzionato per intero — dalla progettazione alla scatola aperta in cantiere. Ed è l'unica verifica che conta davvero: tutto quello che è stato deciso in progettazione, saldato, brunito, verniciato e imballato esiste solo se arriva integro a destinazione.",
    ],
  },
];

export const lavorazioneBySlug = (slug: string) => lavorazioni.find((l) => l.slug === slug);
