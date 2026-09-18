import Link from "next/link";
import { ImmagineAsset } from "@/components/ImmagineAsset";
import { CardFinitura } from "@/components/CardFinitura";
import { lavorazioni, type Lavorazione } from "@/data/lavorazioni";
import { lavorazioniEn } from "@/data/lavorazioni.en";
import { famigliaById, finiture } from "@/data/finiture";
import { famiglieEn } from "@/data/finiture.en";
import { azienda } from "@/data/azienda";
import { hrefLavorazione, t, via, type Lingua } from "@/lib/i18n";
import s from "./lavorazione-view.module.css";

export function LavorazioneView({ l, lingua }: { l: Lavorazione; lingua: Lingua }) {
  const d = t(lingua);
  const p = d.pagine.lavorazioni;
  const en = lingua === "en";
  const testiEn = lavorazioniEn[l.slug];

  const titolo = en ? l.titoloEn : l.titolo;
  const sommario = en ? testiEn.sommario : l.sommario;
  const corpo = en ? testiEn.corpo : l.corpo;
  const cosaServe = en ? testiEn.cosaServe : l.cosaServe;

  const i = lavorazioni.findIndex((x) => x.slug === l.slug);
  const prec = i > 0 ? lavorazioni[i - 1] : null;
  const succ = i < lavorazioni.length - 1 ? lavorazioni[i + 1] : null;

  const correlate = (l.famiglieCorrelate ?? []).flatMap((fam) =>
    finiture.filter((f) => f.famiglia === fam).slice(0, 2),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: titolo,
    serviceType: titolo,
    description: sommario,
    inLanguage: lingua,
    provider: {
      "@type": "LocalBusiness",
      name: azienda.ragioneSociale,
      "@id": `${azienda.sito}/#azienda`,
    },
    areaServed: "IT",
  };

  return (
    <div className="wrap">
      <nav className={s.briciole} aria-label={d.scheda.percorso}>
        <Link href={via("lavorazioni", lingua)}>{p.titolo}</Link>
        <span aria-hidden="true">/</span>
        <span>{p.fase(i + 1, lavorazioni.length)}</span>
      </nav>

      <article>
        <header className={s.testata}>
          <div>
            <h1>{titolo}</h1>
            <p className={s.sommario}>{sommario}</p>
            <p className={s.en} lang={en ? "it" : "en"}>
              {en ? l.titolo : l.titoloEn}
            </p>
          </div>
          <figure className={s.figura}>
            <ImmagineAsset
              cartella="full"
              nome={l.immagine}
              alt={
                en
                  ? `Illustration of the ${l.titoloEn.toLowerCase()} stage: gold lines on a black ground`
                  : `Illustrazione della fase di ${l.titolo.toLowerCase()}: linee oro su fondo nero`
              }
              className={s.img}
              priorita
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </figure>
        </header>

        <div className={s.corpo}>
          <div className="prosa">
            {corpo.map((par, k) => (
              <p key={k}>{par}</p>
            ))}
          </div>

          <aside className={s.lato}>
            <h2>{p.cosaServe}</h2>
            <ul>
              {cosaServe.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            {l.immagineSecondaria && (
              <ImmagineAsset
                cartella="full"
                nome={l.immagineSecondaria}
                alt={
                  en
                    ? `Second illustration of the ${l.titoloEn.toLowerCase()} stage`
                    : `Seconda illustrazione della fase di ${l.titolo.toLowerCase()}`
                }
                className={s.imgLato}
                sizes="(max-width: 900px) 100vw, 320px"
              />
            )}
            <Link href={via("contatti", lingua)} className="btn">
              {p.parliamo}
            </Link>
          </aside>
        </div>
      </article>

      {correlate.length > 0 && (
        <section className={s.correlate}>
          <h2>{p.finitureQui}</h2>
          <p className={s.correlateIntro}>
            {(l.famiglieCorrelate ?? [])
              .map((f) => (en ? famigliaById(f).nomeEn : famigliaById(f).nome))
              .join(" · ")}
          </p>
          <div className={s.griglia}>
            {correlate.map((f) => (
              <CardFinitura key={f.codice} f={f} lingua={lingua} />
            ))}
          </div>
          <Link href={via("finiture", lingua)} className="link">
            {d.scheda.tutteLeFiniture(finiture.length)}
          </Link>
        </section>
      )}

      <nav className={s.prevNext} aria-label={p.precedenteSuccessiva}>
        {prec ? (
          <Link href={hrefLavorazione(lingua, prec)}>
            <span aria-hidden="true">←</span> {en ? prec.titoloEn : prec.titolo}
          </Link>
        ) : (
          <span />
        )}
        {succ && (
          <Link href={hrefLavorazione(lingua, succ)} className={s.avanti}>
            {en ? succ.titoloEn : succ.titolo} <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
