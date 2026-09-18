import type { Metadata } from "next";
import Link from "next/link";
import { FormRichiesta } from "@/components/FormRichiesta";
import { azienda, indirizzoRiga } from "@/data/azienda";
import { lingue } from "@/lib/alternate";
import s from "@/views/contatti.module.css";

export const metadata: Metadata = {
  title: "Contatti",
  description: `Brass Style S.R.L., ${indirizzoRiga}. Telefono ${azienda.telefono.display}, ${azienda.email}. Richieste di preventivo e campioni per lavorazione e finitura metalli.`,
  alternates: { canonical: "/contatti", languages: lingue("/contatti") },
};

export default function Contatti() {
  return (
    <div className="wrap">
      <header className={s.testata}>
        <h1>Contatti</h1>
        <p className={s.intro}>
          Per un preventivo servono tre cose: cosa devi produrre, in che finitura e in quanti pezzi.
          Il disegno può arrivare dopo — si parte anche da uno schizzo.
        </p>
      </header>

      <div className={s.colonne}>
        <section className={s.blocco} aria-labelledby="h-dati">
          <h2 id="h-dati">Dove siamo</h2>
          <address className={s.dati}>
            <p>
              <strong>{azienda.ragioneSociale}</strong>
              <br />
              {azienda.indirizzo.via}
              <br />
              {azienda.indirizzo.cap} {azienda.indirizzo.citta} ({azienda.indirizzo.provincia})
            </p>
            <p>
              <a className="link" href={azienda.telefono.href}>
                {azienda.telefono.display}
              </a>
              <br />
              <a className="link" href={`mailto:${azienda.email}`}>
                {azienda.email}
              </a>
            </p>
            <p className={s.secondario}>
              {azienda.orari.display}
              <br />
              P.IVA {azienda.piva}
            </p>
          </address>

          <div className={s.rimandi}>
            <h3>Prima di scrivere</h3>
            <ul>
              <li>
                <Link className="link" href="/finiture">
                  Guarda il campionario
                </Link>{" "}
                e segnati i codici che ti interessano: la risposta diventa immediata.
              </li>
              <li>
                <Link className="link" href="/lavorazioni">
                  Leggi cosa serve al reparto
                </Link>{" "}
                per ogni lavorazione: è l&apos;elenco di quello che ti chiederemmo comunque.
              </li>
            </ul>
          </div>
        </section>

        <section className={s.blocco} aria-labelledby="h-form">
          <h2 id="h-form">Richiedi un preventivo</h2>
          <p className={s.introForm}>
            Cinque campi. Se hai già scelto delle finiture dal campionario, sono già qui sotto.
          </p>
          <FormRichiesta />
        </section>
      </div>
    </div>
  );
}
