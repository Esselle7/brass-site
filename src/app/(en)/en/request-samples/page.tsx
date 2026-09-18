import type { Metadata } from "next";
import Link from "next/link";
import { FormRichiesta } from "@/components/FormRichiesta";
import { azienda } from "@/data/azienda";
import { finiture } from "@/data/finiture";
import { via } from "@/lib/i18n";
import { lingue } from "@/lib/alternate";
import s from "@/views/richiedi.module.css";

export const metadata: Metadata = {
  title: "Request samples",
  description:
    "Choose up to ten finishes from the range and receive the physical samples: five fields, no price list to fill in.",
  alternates: { canonical: "/en/request-samples", languages: lingue("/richiedi-campioni") },
};

export default function RequestSamplesEn() {
  return (
    <div className="wrap">
      <header className={s.testata}>
        <h1>Request samples</h1>
        <p className={s.intro}>
          A finish is chosen by touching it. Select up to ten codes from the range and the physical
          samples reach you, each with its technical sheet.
        </p>
      </header>

      <div className={s.colonne}>
        <section aria-labelledby="h-form">
          <h2 id="h-form" className="sr-only">
            Request form
          </h2>
          <FormRichiesta lingua="en" />
        </section>

        <aside className={s.lato}>
          <h2>How it works</h2>
          <ol className={s.passi}>
            <li>
              <Link className="link" href={via("finiture", "en")}>
                Open the finish range
              </Link>{" "}
              and add the finishes you are interested in: there are {finiture.length}, each with a
              code and a sheet.
            </li>
            <li>You fill in five fields. The codes you chose travel with the request.</li>
            <li>
              The technical office replies, usually within two working days. If it is urgent:{" "}
              <a className="link" href={azienda.telefono.href}>
                {azienda.telefono.display}
              </a>
              .
            </li>
          </ol>
          <p className={s.nota}>
            The samples are real pieces made in the workshop: shipping is free for companies and
            design studios. <em>Shipping terms to be confirmed with the company.</em>
          </p>
        </aside>
      </div>
    </div>
  );
}
