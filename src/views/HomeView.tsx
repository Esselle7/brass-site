import type { CSSProperties } from "react";
import Link from "next/link";
import { CardFinitura } from "@/components/CardFinitura";
import { ImmagineAsset } from "@/components/ImmagineAsset";
import { finiture, famiglie } from "@/data/finiture";
import { lavorazioni } from "@/data/lavorazioni";
import { lavorazioniEn } from "@/data/lavorazioni.en";
import { azienda } from "@/data/azienda";
import { hrefLavorazione, via, type Lingua } from "@/lib/i18n";
import s from "./home.module.css";

/**
 * La home è una sola: due lingue, un solo markup (DRY — prima erano due file gemelli che
 * divergevano al primo ritocco). Il testo di pagina sta qui sotto in `copy`; le stringhe di
 * interfaccia restano nel dizionario di src/lib/i18n.ts.
 *
 * Movimento: tutto in CSS scroll-driven (animation-timeline), zero librerie, zero JS.
 * Ogni reveal parte da uno stato GIÀ leggibile se l'animazione non gira (browser senza
 * animation-timeline, prefers-reduced-motion, crawler): il contenuto non è mai gated.
 */

/** Otto campioni di famiglie diverse per la griglia: è una vetrina, non il campionario intero. */
const inVetrina = ["TR-01", "SA-02", "NU-02", "MA-04", "OS-03", "MT-01", "PA-03", "TR-05"].map(
  (c) => finiture.find((f) => f.codice === c)!,
);

/** La striscia dell'hero mostra TUTTE e 29 le finiture, in fila, due volte: la seconda copia
 *  serve solo a chiudere l'anello del movimento senza stacchi (29 × 1,8 KB in AVIF). */
const striscia = [...finiture, ...finiture];

const copy = {
  it: {
    kicker: `${azienda.indirizzo.citta} (${azienda.indirizzo.provincia}) · dal ${azienda.fondazione}`,
    h1: ["Ventinove finiture,", "una sola officina."],
    sottotitolo:
      "Lavoriamo e finiamo ottone e rame per l'arredo di alta gamma. Progettazione, lavorazioni meccaniche, saldatura, brunitura, verniciatura a liquido, assemblaggio e imballo: il ciclo è interno, l'interlocutore è uno solo.",
    ctaCampionario: "Apri il campionario",
    ctaLavorazioni: "Come lavoriamo",
    manifesto:
      "L'ottone entra grezzo ed esce finito. Sotto lo stesso tetto: disegno esecutivo, taglio, saldatura, brunitura, verniciatura, montaggio e imballo.",
    manifestoNota:
      "Niente pezzi che girano la provincia fra una fase e l'altra, niente rimpalli fra fornitori. Una sola responsabilità, dal disegno al pallet.",
    numeri: [
      { n: String(azienda.fondazione), d: `dal primo laboratorio a ${azienda.luogoFondazione}` },
      { n: String(finiture.length), d: "finiture a campionario, ognuna con la sua scheda" },
      { n: String(lavorazioni.length), d: "lavorazioni interne, dalla progettazione al trasporto" },
    ],
    cicloTitolo: "Il ciclo, per intero",
    cicloTesto:
      "«La brunitura la fate voi o la mandate fuori?» è la prima domanda al telefono. Questa è la risposta, fase per fase: dieci lavorazioni, lo stesso stabilimento, l'ordine in cui avvengono davvero.",
    cicloTutte: "Tutte le lavorazioni →",
    videoTitolo: "La finitura è un gesto",
    videoTesto:
      "Una molatura ripresa in reparto. Nessuna finitura del campionario nasce da un catalogo: nasce da una mano che guarda la superficie mentre cambia.",
    videoDidascalia: "Ripresa in reparto, senza audio.",
    campionarioTitolo: "Il campionario",
    campionarioTesto:
      "Il modo più rapido per capire se sappiamo fare quello che ti serve: guarda la superficie, leggi come si ottiene, chiedi il campione fisico.",
    campionarioTutte: `Tutte le ${finiture.length} finiture →`,
    perche: [
      {
        titolo: "Un solo interlocutore",
        testo:
          "Chi risponde al telefono ha visto il pezzo. Non c'è una catena di fornitori da tenere allineata: preventivo, campione e consegna passano dalle stesse mani.",
        img: "saldatura",
        alt: "Illustrazione della fase di saldatura",
      },
      {
        titolo: "Il campione prima dell'ordine",
        testo:
          "Ogni finitura ha un campione fisico e lo spediamo. Sul metallo vero, sotto la luce del tuo showroom, una finitura si giudica in trenta secondi.",
        img: "brunitura",
        alt: "Illustrazione della fase di brunitura",
      },
      {
        titolo: "Ripetibile alla seconda serie",
        testo:
          "Attrezzature, riferimenti di posizionamento e sequenza delle operazioni restano gli stessi: la finitura del riassortimento è quella del primo lotto.",
        img: "verniciatura",
        alt: "Illustrazione della fase di verniciatura a liquido",
      },
    ],
    percheTitolo: "Perché un terzista solo",
    marquee: "Parliamo del tuo pezzo",
    chiusuraTitolo: "Lavoriamo per chi disegna arredo, non per chi lo compra",
    chiusuraTesto: `Siamo un terzista: il nostro cliente è il brand, lo studio, il contract. Dal ${azienda.fondazione} a ${azienda.luogoFondazione}, oggi a ${azienda.indirizzo.citta}.`,
    ctaCampioni: "Richiedi i campioni",
    ctaAzienda: "Chi siamo",
  },
  en: {
    kicker: `${azienda.indirizzo.citta} (${azienda.indirizzo.provincia}) · since ${azienda.fondazione}`,
    h1: ["Twenty-nine finishes,", "one workshop."],
    sottotitolo:
      "We work and finish brass and copper for high-end furniture. Design engineering, machining, welding, burnishing, liquid painting, assembly and packing: the cycle is in-house, and so is the person you talk to.",
    ctaCampionario: "Open the finish range",
    ctaLavorazioni: "How we work",
    manifesto:
      "Brass comes in raw and goes out finished. Under one roof: production drawing, cutting, welding, burnishing, painting, assembly and packing.",
    manifestoNota:
      "No parts touring the province between one stage and the next, no supplier passing the blame. One responsibility, from the drawing to the pallet.",
    numeri: [
      { n: String(azienda.fondazione), d: `from the first workshop in ${azienda.luogoFondazione}` },
      { n: String(finiture.length), d: "finishes in the range, each with its own sheet" },
      { n: String(lavorazioni.length), d: "in-house processes, from design to delivery" },
    ],
    cicloTitolo: "The full cycle",
    cicloTesto:
      "“Do you burnish in-house or send it out?” is the first question on the phone. This is the answer, stage by stage: ten processes, one plant, in the order they actually happen.",
    cicloTutte: "All processes →",
    videoTitolo: "A finish is a gesture",
    videoTesto:
      "Grinding, filmed on the shop floor. No finish in the range comes out of a catalogue: it comes from a hand watching the surface as it changes.",
    videoDidascalia: "Filmed in the workshop, no sound.",
    campionarioTitolo: "The finish range",
    campionarioTesto:
      "The fastest way to know whether we can do what you need: look at the surface, read how it is obtained, ask for the physical sample.",
    campionarioTutte: `All ${finiture.length} finishes →`,
    perche: [
      {
        titolo: "One person to talk to",
        testo:
          "Whoever answers the phone has seen the part. There is no chain of suppliers to keep aligned: quotation, sample and delivery go through the same hands.",
        img: "saldatura",
        alt: "Illustration of the welding stage",
      },
      {
        titolo: "The sample before the order",
        testo:
          "Every finish has a physical sample and we ship it. On real metal, under the light of your own showroom, a finish is judged in thirty seconds.",
        img: "brunitura",
        alt: "Illustration of the burnishing stage",
      },
      {
        titolo: "Repeatable on the second run",
        testo:
          "Fixtures, locating references and the order of operations stay the same: the finish on the repeat order is the finish of the first batch.",
        img: "verniciatura",
        alt: "Illustration of the liquid painting stage",
      },
    ],
    percheTitolo: "Why a single subcontractor",
    marquee: "Let's talk about your part",
    chiusuraTitolo: "We work for the people who design furniture, not for the people who buy it",
    chiusuraTesto: `We are a subcontractor: our client is the brand, the studio, the contract firm. From ${azienda.fondazione} in ${azienda.luogoFondazione}, today in ${azienda.indirizzo.citta}.`,
    ctaCampioni: "Request samples",
    ctaAzienda: "About us",
  },
} as const;

/** Il manifesto si illumina parola per parola sullo scroll: serve un indice per scalare il range. */
function Manifesto({ testo }: { testo: string }) {
  const parole = testo.split(" ");
  return (
    <p className={s.manifesto}>
      {parole.map((p, i) => (
        <span
          key={`${p}-${i}`}
          className={s.parola}
          style={{ "--i": i, "--n": parole.length } as CSSProperties}
        >
          {p}{" "}
        </span>
      ))}
    </p>
  );
}

export function HomeView({ lingua }: { lingua: Lingua }) {
  const c = copy[lingua];
  const sommario = (slug: string, it: string) =>
    lingua === "en" ? (lavorazioniEn[slug]?.sommario ?? it) : it;

  return (
    <>
      {/* ——— 0. Il sipario: il marchio a schermo pieno, poi si alza. Dura 2,6 s, non blocca
          nulla (pointer-events: none) e con prefers-reduced-motion non compare affatto. ——— */}
      <div className={s.sipario} aria-hidden="true">
        <img
          src="/media/logo/scritta-420.webp"
          width={420}
          height={300}
          alt=""
          className={s.siparioLogo}
          fetchPriority="high"
        />
      </div>

      {/* ——— 1. Hero: media a tutto schermo, la nav ci galleggia sopra ——— */}
      <section className={s.hero}>
        <div className={s.heroSfondo} aria-hidden="true">
          <ImmagineAsset
            cartella="full"
            nome="hero"
            alt=""
            priorita
            className={s.heroImg}
            sizes="100vw"
          />
        </div>

        <div className={`wrap ${s.heroDentro}`}>
          <p className={s.kicker}>{c.kicker}</p>
          <h1 className={s.h1}>
            {c.h1.map((riga, i) => (
              <span key={riga} className={s.riga} style={{ "--i": i } as CSSProperties}>
                <span>{riga}</span>
              </span>
            ))}
          </h1>
          <p className={s.sottotitolo}>{c.sottotitolo}</p>
          <div className={s.azioni}>
            <Link href={via("finiture", lingua)} className="btn">
              {c.ctaCampionario}
            </Link>
            <Link href={via("lavorazioni", lingua)} className={s.freccia}>
              {c.ctaLavorazioni}
            </Link>
          </div>
        </div>

        {/* La vetrina: tutte e 29 le finiture in una riga sola, che gira piano da sé e
            accelera quando scorri. È decorativa — le stesse finiture, cliccabili, stanno
            nel campionario più in basso e su /finiture. */}
        <div className={s.vetrina} aria-hidden="true">
          <div className={s.vetrinaDeriva}>
            <div className={s.vetrinaPista}>
              {striscia.map((f, i) => (
                <span key={`${f.codice}-${i}`} className={s.tessera}>
                  <ImmagineAsset
                    cartella="strip"
                    nome={f.immagine}
                    alt=""
                    className={s.tesseraImg}
                    sizes="160px"
                    priorita={i < 10}
                  />
                  <span className={s.tesseraCodice}>{f.codice}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— 2. Manifesto: cosa facciamo, in una frase che si accende parola per parola ——— */}
      <section className={`wrap ${s.dichiarazione}`} aria-label={c.manifesto}>
        <Manifesto testo={c.manifesto} />
        <div className={s.dichiarazioneCoda}>
          <p className={s.nota}>{c.manifestoNota}</p>
          <dl className={s.numeri}>
            {c.numeri.map((v) => (
              <div key={v.n} className={s.rivela}>
                <dt>{v.n}</dt>
                <dd>{v.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ——— 3. Il ciclo: dieci righe, la riga attiva si accende ——— */}
      <section className={`wrap ${s.ciclo}`} aria-labelledby="h-ciclo">
        <header className={s.testata}>
          <h2 id="h-ciclo" className={s.rivela}>
            {c.cicloTitolo}
          </h2>
          <p className={s.rivela}>{c.cicloTesto}</p>
          <Link href={via("lavorazioni", lingua)} className={`link ${s.rivela}`}>
            {c.cicloTutte}
          </Link>
        </header>

        <ol className={s.fasi}>
          {lavorazioni.map((l, i) => (
            <li key={l.slug} className={s.rivela} style={{ "--i": i } as CSSProperties}>
              <Link href={hrefLavorazione(lingua, l)} prefetch={false} className={s.fase}>
                <span className={s.faseNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.faseTitolo}>
                  {lingua === "en" ? l.titoloEn : l.titolo}
                </span>
                <span className={s.faseSommario}>{sommario(l.slug, l.sommario)}</span>
                <span className={s.faseFreccia} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ——— 4. Il video come sfondo: una schermata intera, il testo ci sta sopra ——— */}
      <section className={s.video} aria-labelledby="h-video">
        {/*
          preload="none" + autoplay: il browser non scarica finché la sezione non è in vista
          (Chrome/Safari non avviano un autoplay fuori schermo). Muto e in loop, quindi nessun
          audio a sorpresa; chi ha prefers-reduced-motion vede solo il poster, via CSS.
        */}
        <video
          className={s.videoMedia}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/media/video/culture-poster.jpg"
          width={1920}
          height={1080}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/media/video/culture-1080.av1.mp4" type="video/mp4; codecs=av01.0.05M.08" />
          {/* chi non decodifica AV1 (Safari senza hardware) prende il 720: 1,25 MB invece di 2,9 */}
          <source src="/media/video/culture-720.mp4" type="video/mp4" />
        </video>
        <div className={s.videoVelo} aria-hidden="true" />
        <div className={`wrap ${s.videoTesto}`}>
          <h2 id="h-video">{c.videoTitolo}</h2>
          <p>{c.videoTesto}</p>
          <p className={s.didascalia}>{c.videoDidascalia}</p>
        </div>
      </section>

      {/* ——— 5. Il campionario ——— */}
      <section className={`wrap ${s.campionario}`} aria-labelledby="h-campionario">
        <header className={s.testata}>
          <h2 id="h-campionario" className={s.rivela}>
            {c.campionarioTitolo}
          </h2>
          <p className={s.rivela}>{c.campionarioTesto}</p>
          <Link href={via("finiture", lingua)} className={`link ${s.rivela}`}>
            {c.campionarioTutte}
          </Link>
        </header>

        <div className={s.griglia}>
          {inVetrina.map((f, i) => (
            <div key={f.codice} className={s.rivela} style={{ "--i": i % 4 } as CSSProperties}>
              <CardFinitura f={f} lingua={lingua} />
            </div>
          ))}
        </div>

        <p className={s.famiglie}>
          {famiglie.map((f) => (lingua === "en" ? f.nomeEn : f.nome)).join(" · ")}
        </p>
      </section>

      {/* ——— 6. Le tre ragioni: le schede si impilano una sull'altra (position: sticky) ——— */}
      <section className={s.motivi} aria-labelledby="h-motivi">
        <div className="wrap">
          <h2 id="h-motivi" className={`${s.motiviTitolo} ${s.rivela}`}>
            {c.percheTitolo}
          </h2>
        </div>
        <div className={`wrap ${s.pila}`}>
          {c.perche.map((m, i) => (
            <article
              key={m.titolo}
              className={s.scheda}
              style={{ "--i": i, "--n": c.perche.length } as CSSProperties}
            >
              <div className={s.schedaTesto}>
                <span className={s.schedaNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{m.titolo}</h3>
                <p>{m.testo}</p>
              </div>
              <div className={s.schedaFigura}>
                <ImmagineAsset
                  cartella="full"
                  nome={m.img}
                  alt={m.alt}
                  className={s.schedaImg}
                  sizes="(max-width: 900px) 92vw, 560px"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ——— 7. Chiusura ——— */}
      <section className={s.chiusura} aria-labelledby="h-chiusura">
        <div className={s.marquee} aria-hidden="true">
          <div className={s.marqueePista}>
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i}>
                {c.marquee} <i>·</i>
              </span>
            ))}
          </div>
        </div>
        <div className={`wrap ${s.chiusuraDentro}`}>
          <img
            src="/media/logo/minimal-96.webp"
            width={96}
            height={99}
            alt=""
            className={`${s.sigillo} ${s.rivela}`}
            loading="lazy"
          />
          <h2 id="h-chiusura" className={s.rivela}>
            {c.chiusuraTitolo}
          </h2>
          <p className={s.rivela}>{c.chiusuraTesto}</p>
          <div className={`${s.azioni} ${s.rivela}`}>
            <Link href={via("campioni", lingua)} className="btn">
              {c.ctaCampioni}
            </Link>
            <Link href={via("azienda", lingua)} className={s.freccia}>
              {c.ctaAzienda}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
