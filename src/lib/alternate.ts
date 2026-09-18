import { finiture } from "@/data/finiture";
import { lavorazioni } from "@/data/lavorazioni";
import { percorsi, slugLavorazione, type Lingua } from "./i18n";

/**
 * Mappa completa IT ↔ EN di tutte le rotte del sito, generata dai dati: serve al selettore di
 * lingua (che conosce solo il pathname) e agli `hreflang`. Se una pagina esiste in una lingua
 * sola, semplicemente non compare qui e il selettore rimanda alla home dell'altra lingua.
 */
const coppie: [string, string][] = [
  ...Object.values(percorsi).map((p) => [p.it, p.en] as [string, string]),
  ...finiture.map(
    (f) =>
      [`${percorsi.finiture.it}/${f.slug}`, `${percorsi.finiture.en}/${f.slugEn}`] as [
        string,
        string,
      ],
  ),
  ...lavorazioni.map(
    (l) =>
      [
        `${percorsi.lavorazioni.it}/${l.slug}`,
        `${percorsi.lavorazioni.en}/${slugLavorazione(l.titoloEn, l.slug, "en")}`,
      ] as [string, string],
  ),
];

const daIt = new Map(coppie);
const daEn = new Map(coppie.map(([it, en]) => [en, it]));

/** Dato un pathname e la sua lingua, restituisce l'URL della stessa pagina nell'altra lingua. */
export function altraLingua(pathname: string, lingua: Lingua): string {
  const pulito = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (lingua === "it") return daIt.get(pulito) ?? percorsi.home.en;
  return daEn.get(pulito) ?? percorsi.home.it;
}

/** Coppia hreflang da mettere in `alternates.languages` dei metadata. */
export function lingue(pathIt: string) {
  return { it: pathIt, en: daIt.get(pathIt) ?? percorsi.home.en };
}
