import type { Metadata } from "next";
import Link from "next/link";
import { FormRichiesta } from "@/components/FormRichiesta";
import { azienda } from "@/data/azienda";
import { finiture } from "@/data/finiture";
import { lingue } from "@/lib/alternate";
import s from "@/views/richiedi.module.css";

export const metadata: Metadata = {
  title: "Richiedi i campioni",
  description:
    "Scegli fino a 10 finiture dal campionario e ricevi i campioni fisici: cinque campi, nessun listino da compilare.",
  alternates: { canonical: "/richiedi-campioni", languages: lingue("/richiedi-campioni") },
};

export default function RichiediCampioni() {
  return (
    <div className="wrap">
      <header className={s.testata}>
        <h1>Richiedi i campioni</h1>
        <p className={s.intro}>
          Una finitura si sceglie toccandola. Seleziona fino a dieci codici dal campionario e ti
          arrivano i campioni fisici, con la scheda tecnica di ciascuno.
        </p>
      </header>

      <div className={s.colonne}>
        <section aria-labelledby="h-form">
          <h2 id="h-form" className="sr-only">
            Modulo di richiesta
          </h2>
          <FormRichiesta />
        </section>

        <aside className={s.lato}>
          <h2>Come funziona</h2>
          <ol className={s.passi}>
            <li>
              <Link className="link" href="/finiture">
                Apri il campionario
              </Link>{" "}
              e aggiungi alla richiesta le finiture che ti interessano: sono {finiture.length}, con
              codice e scheda.
            </li>
            <li>Compili cinque campi. I codici scelti viaggiano con la richiesta.</li>
            <li>
              Ti risponde l&apos;ufficio tecnico, di norma entro due giorni lavorativi. Per
              un&apos;urgenza:{" "}
              <a className="link" href={azienda.telefono.href}>
                {azienda.telefono.display}
              </a>
              .
            </li>
          </ol>
          <p className={s.nota}>
            I campioni sono pezzi reali lavorati in reparto: la spedizione è gratuita per aziende e
            studi di progettazione.{" "}
            <em>Condizioni di spedizione da confermare con l&apos;azienda.</em>
          </p>
        </aside>
      </div>
    </div>
  );
}
