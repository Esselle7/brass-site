/** Unica funzione di slug del progetto: i codici finitura e i titoli passano tutti da qui. */
export const slugify = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Normalizzazione per la RICERCA: minuscole e accenti via, ma trattini e spazi restano —
 * altrimenti «MA-04» non troverebbe più nulla (il codice contiene il trattino).
 */
export const senzaAccenti = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
