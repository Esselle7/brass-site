"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FamigliaId } from "@/data/finiture";
import { senzaAccenti } from "@/lib/slug";
import { t as dizionario, via, type Lingua } from "@/lib/i18n";
import s from "./campionario.module.css";

type Fam = { id: FamigliaId | "tutte"; nome: string; quante: number };


/**
 * Il filtro lavora sul DOM già renderizzato dal server (le card sono `children`):
 * senza JavaScript le 29 finiture restano tutte in pagina, con JavaScript si nascondono
 * quelle che non passano. Nessun re-render di 29 nodi React, nessun layout shift oltre
 * quello voluto dal filtro.
 */
export function Campionario({
  famiglie,
  totale,
  lingua = "it",
  children,
}: {
  famiglie: Fam[];
  totale: number;
  lingua?: Lingua;
  children: React.ReactNode;
}) {
  const d = dizionario(lingua).campionario;
  const griglia = useRef<HTMLDivElement>(null);
  const [famiglia, setFamiglia] = useState<FamigliaId | "tutte">("tutte");
  const [query, setQuery] = useState("");
  const [visibili, setVisibili] = useState(totale);

  const applica = useCallback(() => {
    const radice = griglia.current;
    if (!radice) return;
    const q = senzaAccenti(query.trim());
    let n = 0;
    for (const el of radice.querySelectorAll<HTMLElement>("[data-finitura]")) {
      const okFam = famiglia === "tutte" || el.dataset.famiglia === famiglia;
      const okQ = q === "" || (el.dataset.cerca ?? "").includes(q);
      const mostra = okFam && okQ;
      el.hidden = !mostra;
      if (mostra) n++;
    }
    setVisibili(n);
  }, [famiglia, query]);

  useEffect(() => {
    applica();
  }, [applica]);

  /* Luce radente: un solo listener passivo per tutta la griglia, non 29. */
  const muoviLuce = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-finitura]");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    card.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const azzera = () => {
    setFamiglia("tutte");
    setQuery("");
  };

  return (
    <>
      <div className={s.controlli}>
        <div className={s.filtri} role="group" aria-label={d.filtra}>
          {famiglie.map((f) => (
            <button
              key={f.id}
              type="button"
              className={s.pill}
              aria-pressed={famiglia === f.id}
              onClick={() => setFamiglia(f.id)}
            >
              {f.nome} <span className={s.quante}>{f.quante}</span>
            </button>
          ))}
        </div>

        <div className={s.ricerca}>
          <label htmlFor="cerca-finitura" className="sr-only">
            {d.cerca}
          </label>
          <input
            id="cerca-finitura"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={d.cercaPlaceholder}
            autoComplete="off"
          />
        </div>
      </div>

      <p className={s.conteggio} aria-live="polite">
        {visibili === totale ? d.finiture(totale) : d.finitureSu(visibili, totale)}
      </p>

      <div className={s.griglia} ref={griglia} onPointerMove={muoviLuce}>
        {children}
      </div>

      {visibili === 0 && (
        <div className={s.vuoto}>
          <h3>{d.vuotoTitolo(query)}</h3>
          <p>{d.vuotoTesto}</p>
          <div className={s.vuotoAzioni}>
            <button type="button" className="btn btn--fantasma" onClick={azzera}>
              {d.mostraTutte(totale)}
            </button>
            <a className="btn" href={via("contatti", lingua)}>
              {d.chiediQuella}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
