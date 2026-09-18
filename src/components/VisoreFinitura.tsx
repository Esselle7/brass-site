"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ImmagineAsset } from "./ImmagineAsset";
import { t, via, type Lingua } from "@/lib/i18n";
import s from "./visore.module.css";

type Props = {
  nome: string;
  codice: string;
  immagine: string;
  alt: string;
  precedente: { slug: string; nome: string } | null;
  successiva: { slug: string; nome: string } | null;
  lingua?: Lingua;
};

/**
 * Il visore è un <dialog> nativo: focus intrappolato, Esc che chiude e focus restituito
 * all'elemento di partenza li dà il browser, senza codice nostro.
 * ←/→ passano alla finitura precedente/successiva — il bug riprodotto in docs/as-is.md §2.1
 * (click su una card che non apriva nulla) qui non può ripresentarsi: senza JS l'immagine
 * grande è comunque in pagina, il dialog è un di più.
 */
export function VisoreFinitura({
  nome,
  codice,
  immagine,
  alt,
  precedente,
  successiva,
  lingua = "it",
}: Props) {
  const d = t(lingua).visore;
  const base = via("finiture", lingua);
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dlg = dialog.current;
    if (!dlg) return;
    const suTasto = (e: KeyboardEvent) => {
      if (!dlg.open) return;
      if (e.key === "ArrowLeft" && precedente) router.push(`${base}/${precedente.slug}`);
      if (e.key === "ArrowRight" && successiva) router.push(`${base}/${successiva.slug}`);
    };
    document.addEventListener("keydown", suTasto);
    return () => document.removeEventListener("keydown", suTasto);
  }, [precedente, successiva, router, base]);

  return (
    <>
      <button
        type="button"
        className={s.apri}
        onClick={() => dialog.current?.showModal()}
        aria-label={d.ingrandisci(nome)}
      >
        <span className={s.lente} aria-hidden="true">
          {d.etichetta}
        </span>
      </button>

      <dialog
        ref={dialog}
        className={s.dialog}
        aria-label={d.aRisoluzionePiena(codice, nome)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className={s.contenuto}>
          <ImmagineAsset cartella="full" nome={immagine} alt={alt} className={s.img} />
          <div className={s.barra}>
            <p className={s.titolo}>
              <span className={s.codice}>{codice}</span> {nome}
            </p>
            <div className={s.navigazione}>
              {precedente && (
                <a
                  className={s.freccia}
                  href={`${base}/${precedente.slug}`}
                  aria-label={d.precedente(precedente.nome)}
                >
                  ← {precedente.nome}
                </a>
              )}
              {successiva && (
                <a
                  className={s.freccia}
                  href={`${base}/${successiva.slug}`}
                  aria-label={d.successiva(successiva.nome)}
                >
                  {successiva.nome} →
                </a>
              )}
              <button
                type="button"
                className={s.chiudi}
                onClick={() => dialog.current?.close()}
                aria-label={d.chiudiVisore}
              >
                {d.chiudi}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
