/**
 * UNICA sorgente di verità dei dati aziendali.
 * Footer, pagina contatti, JSON-LD e form leggono da qui: cambiarli qui li cambia ovunque.
 * Dati verificati su docs/as-is.md §2.10 (rilevati dal sito attuale, 18/09/2026).
 */
export const azienda = {
  ragioneSociale: "Brass Style S.R.L.",
  nome: "Brass Style",
  claim: "Lavorazione e finitura metalli per l'arredo",
  fondazione: 1985,
  luogoFondazione: "Figino Serenza (CO)",
  indirizzo: {
    via: "Via Provinciale per Bulgorello, 3",
    cap: "22070",
    citta: "Vertemate con Minoprio",
    provincia: "CO",
    regione: "Lombardia",
    paese: "IT",
  },
  telefono: { display: "+39 031 780 800", href: "tel:+39031780800" },
  email: "info@brassstyle.com",
  piva: "01530540135",
  orari: { display: "Lunedì – Venerdì, 8:00 – 17:30", schema: "Mo-Fr 08:00-17:30" },
  direzioneCoordinamento: "Jechijo Srl",
  sito: "https://www.brassstyle.com",
} as const;

export const indirizzoRiga = `${azienda.indirizzo.via}, ${azienda.indirizzo.cap} ${azienda.indirizzo.citta} (${azienda.indirizzo.provincia})`;
