import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopmentBanner } from "@/components/InDevelopmentBanner";
import { ImmagineAsset } from "@/components/ImmagineAsset";
import { azienda } from "@/data/azienda";
import { lavorazioni } from "@/data/lavorazioni";
import { finiture } from "@/data/finiture";
import { lingue } from "@/lib/alternate";
import s from "@/views/azienda.module.css";

export const metadata: Metadata = {
  title: "Azienda — dal 1985, lavorazione metalli per l'arredo",
  description:
    "Brass Style nasce a Figino Serenza nel 1985 come laboratorio artigiano di arredi in ottone. Oggi lavora e finisce metalli per l'arredo di alta gamma a Vertemate con Minoprio (CO).",
  alternates: { canonical: "/azienda", languages: lingue("/azienda") },
};

export default function Azienda() {
  return (
    <>
      <InDevelopmentBanner cosaManca="Mancano le fotografie dello stabilimento e l'elenco del parco macchine: i riquadri vuoti qui sotto sono i posti già pronti ad accoglierli. Il resto della pagina è contenuto reale." />

      <div className="wrap">
        <header className={s.testata}>
          <h1>Dal {azienda.fondazione}, una sola cosa fatta bene.</h1>
          <p className={s.sommario}>
            Nata a {azienda.luogoFondazione} nel {azienda.fondazione} come piccola realtà artigiana
            specializzata nella produzione di arredi in ottone, Brass Style è cresciuta fino a
            diventare un riferimento nella lavorazione e nella finitura dei metalli.
          </p>
        </header>

        <section className={s.storia}>
          <div className="prosa">
            <p>
              L&apos;esperienza maturata in oltre quarant&apos;anni di attività, unita alla
              professionalità del team, alla competenza tecnica e alla costante ricerca della
              qualità, ci ha permesso di affermarci come azienda altamente specializzata nella
              realizzazione di arredamenti su misura e complementi d&apos;arredo in metallo.
            </p>
            <p>
              La nostra filosofia si fonda sull&apos;incontro tra tradizione artigianale e
              innovazione tecnologica, dove creatività, precisione e attenzione al dettaglio si
              traducono in prodotti unici, progettati e realizzati su misura per soddisfare le
              esigenze di ogni cliente. Ogni progetto è sviluppato con la massima cura in tutte le
              sue fasi, dalla progettazione alla realizzazione, nel rispetto dei più elevati
              standard qualitativi e della migliore tradizione manifatturiera italiana.
            </p>
            <p>
              L&apos;impiego di macchinari e tecnologie all&apos;avanguardia ci consente di
              garantire elevati livelli di precisione, affidabilità e qualità del prodotto finito.
            </p>
          </div>

          <dl className={s.numeri}>
            <div>
              <dt>{azienda.fondazione}</dt>
              <dd>anno di fondazione, a {azienda.luogoFondazione}</dd>
            </div>
            <div>
              <dt>{lavorazioni.length}</dt>
              <dd>lavorazioni interne, dalla progettazione al trasporto</dd>
            </div>
            <div>
              <dt>{finiture.length}</dt>
              <dd>finiture a campionario, ognuna con la sua scheda</dd>
            </div>
          </dl>
        </section>

        <section className={s.stabilimento} aria-labelledby="h-stabilimento">
          <h2 id="h-stabilimento">Lo stabilimento</h2>
          <p className={s.introSezione}>
            Qui andranno le fotografie del reparto: una per stazione di processo, orizzontali, fatte
            in azienda. Sono l&apos;unico asset che nessuna conversione può creare.
          </p>
          <div className={s.slot}>
            {[
              "Reparto lavorazioni meccaniche",
              "Postazioni di saldatura",
              "Reparto brunitura",
              "Cabina di verniciatura",
              "Area assemblaggio",
              "Area imballo e spedizione",
            ].map((titolo) => (
              <div key={titolo} className={s.placeholder}>
                <span className={s.placeholderEtichetta}>Foto mancante</span>
                <span className={s.placeholderTitolo}>{titolo}</span>
                <span className={s.placeholderNota}>
                  orizzontale, lato lungo ≥ 3000 px — anche fatta col telefono
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={s.macchine} aria-labelledby="h-macchine">
          <h2 id="h-macchine">Parco macchine</h2>
          <p className={s.introSezione}>
            L&apos;elenco delle macchine è la risposta più concreta alla domanda «cosa riuscite a
            fare internamente?». Non è ancora stato fornito: appena arriva, prende il posto di questo
            riquadro.
          </p>
          <div className={s.placeholderTesto}>
            <strong>Da raccogliere in azienda:</strong> elenco delle macchine per reparto (marca,
            modello, corse di lavoro), numero di postazioni di saldatura, dimensioni massime
            lavorabili, eventuali certificazioni.
          </div>
        </section>

        <section className={s.ciclo} aria-labelledby="h-ciclo">
          <h2 id="h-ciclo">Cosa facciamo, in ordine</h2>
          <ol className={s.fasi}>
            {lavorazioni.map((l, i) => (
              <li key={l.slug}>
                <Link href={`/lavorazioni/${l.slug}`} prefetch={false}>
                  <span className={s.fasePos}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{l.titolo}</span>
                </Link>
              </li>
            ))}
          </ol>
          <figure className={s.figuraCiclo}>
            <ImmagineAsset
              cartella="full"
              nome="montaggio"
              alt="Illustrazione della fase di montaggio: linee oro su fondo nero"
              sizes="(max-width: 900px) 100vw, 520px"
            />
            <figcaption>
              Le illustrazioni di processo sono material grafico esistente dell&apos;azienda, non
              fotografie: il reparto vero arriva con gli scatti.
            </figcaption>
          </figure>
        </section>

        <section className={s.dati} aria-labelledby="h-dati">
          <h2 id="h-dati">Dati societari</h2>
          <table className="specifiche">
            <tbody>
              <tr>
                <th scope="row">Ragione sociale</th>
                <td>{azienda.ragioneSociale}</td>
              </tr>
              <tr>
                <th scope="row">Sede</th>
                <td>
                  {azienda.indirizzo.via}, {azienda.indirizzo.cap} {azienda.indirizzo.citta} (
                  {azienda.indirizzo.provincia})
                </td>
              </tr>
              <tr>
                <th scope="row">Partita IVA</th>
                <td>{azienda.piva}</td>
              </tr>
              <tr>
                <th scope="row">Direzione e coordinamento</th>
                <td>{azienda.direzioneCoordinamento}</td>
              </tr>
              <tr>
                <th scope="row">Orari</th>
                <td>{azienda.orari.display}</td>
              </tr>
            </tbody>
          </table>
          <Link href="/contatti" className="btn">
            Contatti e preventivi
          </Link>
        </section>
      </div>
    </>
  );
}
