import type { Metadata } from "next";
import Link from "next/link";
import { FormRichiesta } from "@/components/FormRichiesta";
import { azienda, indirizzoRiga } from "@/data/azienda";
import { via } from "@/lib/i18n";
import { lingue } from "@/lib/alternate";
import s from "@/views/contatti.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Brass Style S.R.L., ${indirizzoRiga}, Italy. Phone ${azienda.telefono.display}, ${azienda.email}. Quotation and sample requests for metal working and finishing.`,
  alternates: { canonical: "/en/contact", languages: lingue("/contatti") },
};

export default function ContactEn() {
  return (
    <div className="wrap">
      <header className={s.testata}>
        <h1>Contact</h1>
        <p className={s.intro}>
          A quotation needs three things: what you have to produce, in which finish, and in what
          quantity. The drawing can follow — a sketch is enough to start.
        </p>
      </header>

      <div className={s.colonne}>
        <section className={s.blocco} aria-labelledby="h-where">
          <h2 id="h-where">Where we are</h2>
          <address className={s.dati}>
            <p>
              <strong>{azienda.ragioneSociale}</strong>
              <br />
              {azienda.indirizzo.via}
              <br />
              {azienda.indirizzo.cap} {azienda.indirizzo.citta} ({azienda.indirizzo.provincia}) —
              Italy
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
              Monday – Friday, 8:00 – 17:30 (CET)
              <br />
              VAT {azienda.piva}
            </p>
          </address>

          <div className={s.rimandi}>
            <h3>Before you write</h3>
            <ul>
              <li>
                <Link className="link" href={via("finiture", "en")}>
                  Look through the finish range
                </Link>{" "}
                and note the codes you are interested in: it makes the answer immediate.
              </li>
              <li>
                <Link className="link" href={via("lavorazioni", "en")}>
                  Read what the shop needs
                </Link>{" "}
                for each process: it is the list we would ask you for anyway.
              </li>
            </ul>
          </div>
        </section>

        <section className={s.blocco} aria-labelledby="h-form">
          <h2 id="h-form">Request a quotation</h2>
          <p className={s.introForm}>
            Five fields. If you have already chosen finishes from the range, they are already below.
          </p>
          <FormRichiesta lingua="en" />
        </section>
      </div>
    </div>
  );
}
