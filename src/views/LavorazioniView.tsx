import Link from "next/link";
import { ImmagineAsset } from "@/components/ImmagineAsset";
import { lavorazioni } from "@/data/lavorazioni";
import { lavorazioniEn } from "@/data/lavorazioni.en";
import { hrefLavorazione, t, type Lingua } from "@/lib/i18n";
import s from "./lavorazioni-view.module.css";

export function LavorazioniView({ lingua }: { lingua: Lingua }) {
  const p = t(lingua).pagine.lavorazioni;
  const en = lingua === "en";

  return (
    <div className="wrap">
      <header className={s.testata}>
        <h1>{p.titolo}</h1>
        <p className={s.intro}>{p.intro}</p>
      </header>

      <ol className={s.elenco}>
        {lavorazioni.map((l, i) => (
          <li key={l.slug}>
            <Link href={hrefLavorazione(lingua, l)} prefetch={false} className={s.riga}>
              <span className={s.numero}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.figura}>
                <ImmagineAsset
                  cartella="full"
                  nome={l.immagine}
                  alt={
                    en
                      ? `Illustration of the ${l.titoloEn.toLowerCase()} stage`
                      : `Illustrazione della fase di ${l.titolo.toLowerCase()}`
                  }
                  className={s.img}
                  sizes="(max-width: 700px) 100vw, 260px"
                  priorita={i < 2}
                />
              </span>
              <span className={s.testo}>
                <span className={s.titolo}>{en ? l.titoloEn : l.titolo}</span>
                <span className={s.sommario}>
                  {en ? lavorazioniEn[l.slug].sommario : l.sommario}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
