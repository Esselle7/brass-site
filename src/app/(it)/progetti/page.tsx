import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopmentBanner } from "@/components/InDevelopmentBanner";
import { lingue } from "@/lib/alternate";
import s from "@/views/progetti.module.css";

export const metadata: Metadata = {
  title: "Progetti realizzati",
  description:
    "Progetti di arredo realizzati da Brass Style per brand e studi di progettazione. Pagina in preparazione: le immagini dei lavori sono in raccolta.",
  alternates: { canonical: "/progetti", languages: lingue("/progetti") },
  robots: { index: false, follow: true },
};

/** Pagina interamente a segnaposto: nessun progetto è stato ancora fornito (docs/asset-mancanti.md). */
const slot = [
  { titolo: "Progetto 1", tipo: "Contract alberghiero", nota: "dettaglio, non attribuibile se c'è NDA" },
  { titolo: "Progetto 2", tipo: "Arredo residenziale su misura", nota: "vista d'insieme" },
  { titolo: "Progetto 3", tipo: "Retail / showroom", nota: "dettaglio di finitura a confronto" },
  { titolo: "Progetto 4", tipo: "Illuminazione decorativa", nota: "dettaglio di giunzione" },
  { titolo: "Progetto 5", tipo: "Complemento d'arredo", nota: "pezzo finito su fondo neutro" },
];

export default function Progetti() {
  return (
    <>
      <InDevelopmentBanner cosaManca="Nessuna immagine di progetti realizzati è ancora disponibile: qui sotto ci sono i posti già pronti, con il formato che serve per ciascuno. L'elenco completo è in docs/asset-mancanti.md." />

      <div className="wrap">
        <header className={s.testata}>
          <h1>Progetti</h1>
          <p className={s.intro}>
            Un terzista viene scelto su «cosa hai già fatto, e per chi». Questa pagina esiste per
            quello — ed è vuota finché non ci sono le immagini vere. Nessun rendering finto, nessuna
            foto d&apos;archivio comprata: se un progetto non lo abbiamo fatto noi, qui non c&apos;è.
          </p>
          <p className={s.intro}>
            Molti lavori sono coperti da accordi di riservatezza con i brand: in quel caso servono
            scatti di dettaglio non attribuibili, che mostrano la lavorazione senza identificare il
            prodotto.
          </p>
        </header>

        <div className={s.griglia}>
          {slot.map((p) => (
            <article key={p.titolo} className={s.slot}>
              <div className={s.figura}>
                <span className={s.etichetta}>Immagine mancante</span>
                <span className={s.formato}>3:2 orizzontale · lato lungo ≥ 2400 px</span>
              </div>
              <h2 className={s.titolo}>{p.titolo}</h2>
              <p className={s.tipo}>{p.tipo}</p>
              <p className={s.nota}>{p.nota}</p>
            </article>
          ))}
        </div>

        <section className={s.intanto}>
          <h2>Intanto</h2>
          <p>
            Quello che possiamo mostrare oggi sono le finiture e il ciclo di lavorazione: sono
            reali, verificabili e già in pagina.
          </p>
          <div className={s.azioni}>
            <Link href="/finiture" className="btn">
              Il campionario
            </Link>
            <Link href="/lavorazioni" className="btn btn--fantasma">
              Le lavorazioni
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
