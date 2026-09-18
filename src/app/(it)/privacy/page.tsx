import type { Metadata } from "next";
import { InDevelopmentBanner } from "@/components/InDevelopmentBanner";
import { azienda, indirizzoRiga } from "@/data/azienda";
import { lingue } from "@/lib/alternate";
import s from "@/views/privacy.module.css";

export const metadata: Metadata = {
  title: "Informativa privacy",
  description:
    "Quali dati raccoglie il modulo di richiesta campioni di Brass Style, dove finiscono e per quanto restano.",
  alternates: { canonical: "/privacy", languages: lingue("/privacy") },
  robots: { index: false, follow: true },
};

/**
 * Il testo legale completo lo redige l'azienda (o il suo consulente): qui c'è solo ciò che è
 * verificabile nel codice, cioè cosa fa davvero il modulo. Non si inventa un'informativa.
 */
export default function Privacy() {
  return (
    <>
      <InDevelopmentBanner cosaManca="L'informativa legale completa non è ancora stata redatta dall'azienda. Qui sotto c'è il comportamento reale del sito, verificabile nel codice: è la base fattuale su cui il consulente scriverà il testo definitivo." />

      <div className="wrap">
        <header className={s.testata}>
          <h1>Privacy</h1>
          <p className={s.intro}>
            Cosa succede davvero ai dati che lasci su questo sito, oggi, nel codice che gira.
          </p>
        </header>

        <div className={`prosa ${s.corpo}`}>
          <h2>Titolare</h2>
          <p>
            {azienda.ragioneSociale}, {indirizzoRiga}. P.IVA {azienda.piva}. Contatti:{" "}
            <a className="link" href={`mailto:${azienda.email}`}>
              {azienda.email}
            </a>{" "}
            ·{" "}
            <a className="link" href={azienda.telefono.href}>
              {azienda.telefono.display}
            </a>
            .
          </p>

          <h2>Quali dati raccoglie il modulo</h2>
          <p>
            Azienda, indirizzo email, codici delle finiture selezionate, quantità indicativa e il
            consenso. Insieme alla richiesta viene registrato l&apos;indirizzo IP da cui arriva,
            usato solo per limitare gli invii automatici.
          </p>

          <h2>Dove finiscono</h2>
          <p>
            La richiesta viene salvata su file sul server del sito e inviata per email
            all&apos;indirizzo dell&apos;azienda tramite il servizio Resend, che agisce come
            fornitore dell&apos;invio. Ricevi una copia di conferma allo stesso indirizzo email che
            hai indicato. Nessun altro destinatario, nessun CRM, nessun sistema di marketing
            automatico.
          </p>

          <h2>Cosa il sito NON fa</h2>
          <ul>
            <li>Non usa cookie di profilazione né pixel pubblicitari.</li>
            <li>Non carica servizi di terze parti prima di un&apos;azione tua.</li>
            <li>Non cede i tuoi dati a nessuno per finalità commerciali.</li>
          </ul>

          <h2>Da completare</h2>
          <p className="da-confermare">
            Base giuridica, tempi di conservazione, elenco dei responsabili del trattamento e
            modalità di esercizio dei diritti: sono le parti che spettano all&apos;azienda e al suo
            consulente, e non vengono scritte da chi realizza il sito.
          </p>
        </div>
      </div>
    </>
  );
}
