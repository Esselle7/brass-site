import Link from "next/link";
import { ImmagineAsset } from "@/components/ImmagineAsset";
import { VisoreFinitura } from "@/components/VisoreFinitura";
import { BottoneCampione } from "@/components/BottoneCampione";
import { CardFinitura } from "@/components/CardFinitura";
import { famigliaById, finiture, type Finitura } from "@/data/finiture";
import {
  famiglieEn,
  finitureEn,
  manutenzioneEn,
  metalliEn,
  protezioneEn,
  usoEn,
} from "@/data/finiture.en";
import { azienda } from "@/data/azienda";
import { t, via, type Lingua } from "@/lib/i18n";
import s from "./scheda-view.module.css";

const slugPer = (f: Finitura, l: Lingua) => (l === "en" ? f.slugEn : f.slug);

export function SchedaFinituraView({ f, lingua }: { f: Finitura; lingua: Lingua }) {
  const d = t(lingua);
  const en = lingua === "en";
  const fam = famigliaById(f.famiglia);
  const testiEn = finitureEn[f.codice];

  const nome = en ? f.nomeEn : f.nomeIt;
  const nomeFam = en ? fam.nomeEn : fam.nome;
  const metallo = en ? (metalliEn[f.metalloBase] ?? f.metalloBase) : f.metalloBase;
  const processo = en ? testiEn.processo : f.processo;
  const note = en ? testiEn.note : f.note;
  const protezione = en ? protezioneEn[f.famiglia] : f.protezione;
  const manutenzione = en ? manutenzioneEn[f.famiglia] : f.manutenzione;
  const uso = en ? usoEn : f.uso;
  const supporti = en
    ? f.applicabileSu.map((m) => metalliEn[m] ?? m)
    : f.applicabileSu;

  const i = finiture.findIndex((x) => x.codice === f.codice);
  const prec = i > 0 ? finiture[i - 1] : null;
  const succ = i < finiture.length - 1 ? finiture[i + 1] : null;
  const sorelle = finiture.filter((x) => x.famiglia === f.famiglia && x.codice !== f.codice);
  const base = via("finiture", lingua);

  const alt = en
    ? `Sample of the ${f.nomeEn} finish on ${metallo.toLowerCase()}, at full resolution`
    : `Campione della finitura ${f.nomeIt} su ${metallo.toLowerCase()}, a risoluzione piena`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${nome} — ${f.codice}`,
    sku: f.codice,
    category: `${en ? "Finish" : "Finitura"} ${nomeFam.toLowerCase()}`,
    material: metallo,
    description: processo,
    image: `${azienda.sito}/media/images/full/${f.immagine}.webp`,
    inLanguage: lingua,
    brand: { "@type": "Brand", name: azienda.nome },
  };

  return (
    <div className="wrap">
      <nav className={s.briciole} aria-label={d.scheda.percorso}>
        <Link href={base}>{d.scheda.campionarioBriciola}</Link>
        <span aria-hidden="true">/</span>
        <span>{nomeFam}</span>
      </nav>

      <article className={s.scheda}>
        <div className={s.colonnaImmagine}>
          <figure className={s.figura}>
            <ImmagineAsset cartella="full" nome={f.immagine} alt={alt} priorita className={s.img} />
            <VisoreFinitura
              nome={nome}
              codice={f.codice}
              immagine={f.immagine}
              alt={alt}
              lingua={lingua}
              precedente={prec ? { slug: slugPer(prec, lingua), nome: en ? prec.nomeEn : prec.nomeIt } : null}
              successiva={succ ? { slug: slugPer(succ, lingua), nome: en ? succ.nomeEn : succ.nomeIt } : null}
            />
          </figure>
          <p className={s.didascalia}>{d.scheda.didascalia}</p>
        </div>

        <div className={s.colonnaTesto}>
          <p className={s.codice}>{f.codice}</p>
          <h1>{nome}</h1>
          <p className={s.nomeEn} lang={en ? "it" : "en"}>
            {en ? f.nomeIt : f.nomeEn}
          </p>

          <p className={s.processo}>{processo}</p>

          <table className="specifiche">
            <tbody>
              <tr>
                <th scope="row">{d.scheda.metalloBase}</th>
                <td>{metallo}</td>
              </tr>
              <tr>
                <th scope="row">{d.scheda.applicabileSu}</th>
                <td>{supporti.join(" · ")}</td>
              </tr>
              <tr>
                <th scope="row">{d.scheda.famiglia}</th>
                <td>
                  <Link className="link" href={base}>
                    {nomeFam}
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">{d.scheda.protezione}</th>
                <td>{protezione}</td>
              </tr>
              <tr>
                <th scope="row">{d.scheda.manutenzione}</th>
                <td>{manutenzione}</td>
              </tr>
              <tr>
                <th scope="row">{d.scheda.uso}</th>
                <td>{uso}</td>
              </tr>
              <tr>
                <th scope="row">{d.scheda.pezzoMax}</th>
                <td className="da-confermare">{d.scheda.pezzoMaxValore}</td>
              </tr>
              <tr>
                <th scope="row">{d.scheda.note}</th>
                <td>{note}</td>
              </tr>
            </tbody>
          </table>

          <div className={`${s.azioni} no-print`}>
            <BottoneCampione codice={f.codice} nome={nome} lingua={lingua} />
            <Link href={via("contatti", lingua)} className="link">
              {d.scheda.preventivo}
            </Link>
          </div>
        </div>
      </article>

      <nav className={`${s.prevNext} no-print`} aria-label={d.scheda.precedenteSuccessiva}>
        {prec ? (
          <Link href={`${base}/${slugPer(prec, lingua)}`}>
            <span aria-hidden="true">←</span> {prec.codice} {en ? prec.nomeEn : prec.nomeIt}
          </Link>
        ) : (
          <span />
        )}
        {succ && (
          <Link href={`${base}/${slugPer(succ, lingua)}`} className={s.avanti}>
            {succ.codice} {en ? succ.nomeEn : succ.nomeIt} <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>

      {sorelle.length > 0 && (
        <section className={`${s.correlate} no-print`}>
          <h2>{d.scheda.altreFamiglia(nomeFam)}</h2>
          <p className={s.correlateIntro}>{en ? famiglieEn[f.famiglia] : fam.descrizione}</p>
          <div className={s.grigliaCorrelate}>
            {sorelle.map((x) => (
              <CardFinitura key={x.codice} f={x} lingua={lingua} />
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
