"use client";

import { commuta, useSelezione, MAX_CAMPIONI } from "@/lib/selezione";
import { t, type Lingua } from "@/lib/i18n";
import s from "./bottone-campione.module.css";

/** Aggiunge la finitura alla richiesta campioni: il form arriverà già compilato con i codici. */
export function BottoneCampione({
  codice,
  nome,
  lingua = "it",
}: {
  codice: string;
  nome: string;
  lingua?: Lingua;
}) {
  const d = t(lingua).campione;
  const selezione = useSelezione();
  const dentro = selezione.includes(codice);
  const pieno = !dentro && selezione.length >= MAX_CAMPIONI;

  return (
    <div className={s.gruppo}>
      <button
        type="button"
        className={`btn ${dentro ? "btn--fantasma" : ""}`}
        onClick={() => commuta(codice)}
        disabled={pieno}
        aria-pressed={dentro}
      >
        {dentro ? d.togli(codice) : d.aggiungi}
      </button>
      {pieno && <p className={s.limite}>{d.limite(MAX_CAMPIONI)}</p>}
      <span className="sr-only">{nome}</span>
    </div>
  );
}
