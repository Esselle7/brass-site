"use client";

import { useState } from "react";
import Link from "next/link";
import { rimuovi, svuota, useSelezione } from "@/lib/selezione";
import { azienda } from "@/data/azienda";
import { t, via, type Lingua } from "@/lib/i18n";
import s from "./form.module.css";

type Stato = { tipo: "fermo" } | { tipo: "invio" } | { tipo: "ok" } | { tipo: "errore"; msg: string };

/**
 * Cinque campi, decisi con il committente: azienda, email, finiture scelte, quantità, consenso.
 * La validazione vera è lato server (src/app/api/richiesta/route.ts): qui c'è solo l'aiuto
 * immediato all'utente. Il campo `sito` è un honeypot: i bot lo compilano, le persone no.
 */
export function FormRichiesta({ lingua = "it" }: { lingua?: Lingua }) {
  const selezione = useSelezione();
  const [stato, setStato] = useState<Stato>({ tipo: "fermo" });
  const d = t(lingua).form;

  async function invia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (stato.tipo === "invio") return; // niente doppio invio
    const form = e.currentTarget;
    const dati = Object.fromEntries(new FormData(form).entries());
    setStato({ tipo: "invio" });
    try {
      const r = await fetch("/api/richiesta", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...dati, finiture: selezione, lingua }),
      });
      const corpo = await r.json().catch(() => ({}));
      if (!r.ok) {
        setStato({ tipo: "errore", msg: corpo?.errore ?? d.erroreGenerico });
        return;
      }
      svuota();
      form.reset();
      setStato({ tipo: "ok" });
    } catch {
      setStato({ tipo: "errore", msg: d.erroreRete });
    }
  }

  if (stato.tipo === "ok") {
    return (
      <div className={s.esito} role="status">
        <h2>{d.okTitolo}</h2>
        <p>
          {d.okTesto}{" "}
          <a className="link" href={azienda.telefono.href}>
            {azienda.telefono.display}
          </a>
          .
        </p>
        <Link href={via("finiture", lingua)} className="btn btn--fantasma">
          {d.okTorna}
        </Link>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={invia}>
      <div className={s.campo}>
        <label htmlFor="azienda">
          {d.azienda} <span aria-hidden="true">*</span>
        </label>
        <input id="azienda" name="azienda" required autoComplete="organization" />
      </div>

      <div className={s.campo}>
        <label htmlFor="email">
          {d.email} <span aria-hidden="true">*</span>
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <fieldset className={s.finiture}>
        <legend>{d.finitureScelte}</legend>
        {selezione.length === 0 ? (
          <p className={s.vuoto}>
            {d.nessunaFinitura}{" "}
            <Link href={via("finiture", lingua)} className="link">
              {d.scegliDalCampionario}
            </Link>{" "}
            {d.oppureInvia}
          </p>
        ) : (
          <ul className={s.chip}>
            {selezione.map((c) => (
              <li key={c}>
                <span>{c}</span>
                <button type="button" onClick={() => rimuovi(c)} aria-label={d.togli(c)}>
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      <div className={s.campo}>
        <label htmlFor="quantita">{d.quantita}</label>
        <input id="quantita" name="quantita" placeholder={d.quantitaPlaceholder} />
      </div>

      {/* honeypot: fuori dal flusso visivo e dalla tabulazione, non nascosto con display:none */}
      <div className={s.trappola} aria-hidden="true">
        <label htmlFor="sito">{d.honeypot}</label>
        <input id="sito" name="sito" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={s.consenso}>
        <input id="consenso" name="consenso" type="checkbox" required value="si" />
        <label htmlFor="consenso">
          {d.consensoPre}
          <Link href={via("privacy", lingua)} className="link">
            {d.consensoLink}
          </Link>{" "}
          {d.consensoPost} <span aria-hidden="true">*</span>
        </label>
      </div>

      {stato.tipo === "errore" && (
        <p className={s.errore} role="alert">
          {stato.msg} {d.erroreCoda}{" "}
          <a className="link" href={`mailto:${azienda.email}`}>
            {azienda.email}
          </a>{" "}
          {d.erroreOppure}{" "}
          <a className="link" href={azienda.telefono.href}>
            {azienda.telefono.display}
          </a>
          .
        </p>
      )}

      <button type="submit" className="btn" disabled={stato.tipo === "invio"}>
        {stato.tipo === "invio" ? d.inviando : d.invia}
      </button>
    </form>
  );
}
