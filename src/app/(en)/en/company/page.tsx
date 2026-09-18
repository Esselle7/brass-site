import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopmentBanner } from "@/components/InDevelopmentBanner";
import { ImmagineAsset } from "@/components/ImmagineAsset";
import { azienda } from "@/data/azienda";
import { lavorazioni } from "@/data/lavorazioni";
import { finiture } from "@/data/finiture";
import { hrefLavorazione, via } from "@/lib/i18n";
import { lingue } from "@/lib/alternate";
import s from "@/views/azienda.module.css";

export const metadata: Metadata = {
  title: "Company — metal working for furniture since 1985",
  description:
    "Brass Style started in Figino Serenza in 1985 as a workshop making brass furniture. Today it works and finishes metal for high-end furniture in Vertemate con Minoprio, near Como.",
  alternates: { canonical: "/en/company", languages: lingue("/azienda") },
};

export default function CompanyEn() {
  return (
    <>
      <InDevelopmentBanner
        lingua="en"
        cosaManca="The photographs of the workshop and the list of machinery are still missing: the empty frames below are the places already prepared for them. The rest of this page is real content."
      />

      <div className="wrap">
        <header className={s.testata}>
          <h1>Since {azienda.fondazione}, one thing done well.</h1>
          <p className={s.sommario}>
            Founded in {azienda.luogoFondazione} in {azienda.fondazione} as a small workshop making
            brass furniture, Brass Style has grown into a reference point in the working and
            finishing of metals.
          </p>
        </header>

        <section className={s.storia}>
          <div className="prosa">
            <p>
              Over forty years of experience, together with the professionalism of the team,
              technical competence and a constant search for quality, have made us a company
              specialised in bespoke furniture and metal furnishing components.
            </p>
            <p>
              Our approach rests on the meeting of craft tradition and technological innovation,
              where creativity, precision and attention to detail turn into unique products,
              designed and made to measure for each client. Every project is developed with care
              through all its stages, from design engineering to production, to the highest quality
              standards and in the best Italian manufacturing tradition.
            </p>
            <p>
              Modern machinery and technology let us guarantee high levels of precision,
              reliability and quality in the finished product.
            </p>
          </div>

          <dl className={s.numeri}>
            <div>
              <dt>{azienda.fondazione}</dt>
              <dd>founded, in {azienda.luogoFondazione}</dd>
            </div>
            <div>
              <dt>{lavorazioni.length}</dt>
              <dd>in-house processes, from design engineering to delivery</dd>
            </div>
            <div>
              <dt>{finiture.length}</dt>
              <dd>finishes in the range, each with its own sheet</dd>
            </div>
          </dl>
        </section>

        <section className={s.stabilimento} aria-labelledby="h-works">
          <h2 id="h-works">The workshop</h2>
          <p className={s.introSezione}>
            The photographs of the shop floor belong here: one per process station, in landscape,
            taken on site. They are the one asset no file conversion can produce.
          </p>
          <div className={s.slot}>
            {[
              "Machining department",
              "Welding stations",
              "Burnishing department",
              "Paint booth",
              "Assembly area",
              "Packing and dispatch",
            ].map((titolo) => (
              <div key={titolo} className={s.placeholder}>
                <span className={s.placeholderEtichetta}>Photograph missing</span>
                <span className={s.placeholderTitolo}>{titolo}</span>
                <span className={s.placeholderNota}>
                  landscape, long side ≥ 3000 px — a phone photograph will do
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={s.macchine} aria-labelledby="h-machines">
          <h2 id="h-machines">Machinery</h2>
          <p className={s.introSezione}>
            The list of machines is the most concrete answer to “what can you actually do in-house?”.
            It has not been provided yet: as soon as it arrives, it takes the place of this box.
          </p>
          <div className={s.placeholderTesto}>
            <strong>To be collected on site:</strong> list of machines by department (make, model,
            working envelope), number of welding stations, maximum workable dimensions, any
            certifications.
          </div>
        </section>

        <section className={s.ciclo} aria-labelledby="h-cycle">
          <h2 id="h-cycle">What we do, in order</h2>
          <ol className={s.fasi}>
            {lavorazioni.map((l, i) => (
              <li key={l.slug}>
                <Link href={hrefLavorazione("en", l)} prefetch={false}>
                  <span className={s.fasePos}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{l.titoloEn}</span>
                </Link>
              </li>
            ))}
          </ol>
          <figure className={s.figuraCiclo}>
            <ImmagineAsset
              cartella="full"
              nome="montaggio"
              alt="Illustration of the assembly stage: gold lines on a black ground"
              sizes="(max-width: 900px) 100vw, 520px"
            />
            <figcaption>
              The process illustrations are existing graphic material, not photographs: the real
              shop floor arrives with the photographs.
            </figcaption>
          </figure>
        </section>

        <section className={s.dati} aria-labelledby="h-legal">
          <h2 id="h-legal">Company details</h2>
          <table className="specifiche">
            <tbody>
              <tr>
                <th scope="row">Registered name</th>
                <td>{azienda.ragioneSociale}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>
                  {azienda.indirizzo.via}, {azienda.indirizzo.cap} {azienda.indirizzo.citta} (
                  {azienda.indirizzo.provincia}), Italy
                </td>
              </tr>
              <tr>
                <th scope="row">VAT number</th>
                <td>{azienda.piva}</td>
              </tr>
              <tr>
                <th scope="row">Direction and coordination</th>
                <td>{azienda.direzioneCoordinamento}</td>
              </tr>
              <tr>
                <th scope="row">Opening hours</th>
                <td>Monday – Friday, 8:00 – 17:30 (CET)</td>
              </tr>
            </tbody>
          </table>
          <Link href={via("contatti", "en")} className="btn">
            Contact and quotations
          </Link>
        </section>
      </div>
    </>
  );
}
