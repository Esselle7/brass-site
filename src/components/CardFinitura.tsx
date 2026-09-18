import Link from "next/link";
import { ImmagineAsset } from "./ImmagineAsset";
import { famigliaById, type Finitura } from "@/data/finiture";
import { metalliEn } from "@/data/finiture.en";
import { hrefFinitura, type Lingua } from "@/lib/i18n";
import { senzaAccenti } from "@/lib/slug";
import s from "./card-finitura.module.css";

/**
 * La card è server-rendered: le 29 finiture sono nel DOM anche senza JavaScript.
 * I data-* servono al filtro (che è l'unica cosa che richiede JS) e all'effetto di luce radente.
 */
export function CardFinitura({
  f,
  priorita,
  lingua = "it",
}: {
  f: Finitura;
  priorita?: boolean;
  lingua?: Lingua;
}) {
  const fam = famigliaById(f.famiglia);
  const nome = lingua === "en" ? f.nomeEn : f.nomeIt;
  const nomeFam = lingua === "en" ? fam.nomeEn : fam.nome;
  const metallo = lingua === "en" ? (metalliEn[f.metalloBase] ?? f.metalloBase) : f.metalloBase;

  return (
    <Link
      href={hrefFinitura(f, lingua)}
      prefetch={false}
      className={s.card}
      data-finitura
      data-famiglia={f.famiglia}
      data-cerca={senzaAccenti(`${f.codice} ${f.nomeIt} ${f.nomeEn} ${nomeFam} ${metallo}`)}
    >
      <span className={s.figura}>
        <ImmagineAsset
          cartella="grid"
          nome={f.immagine}
          alt={
            lingua === "en"
              ? `Sample of the ${f.nomeEn} finish on ${metallo.toLowerCase()}`
              : `Campione della finitura ${f.nomeIt} su ${metallo.toLowerCase()}`
          }
          className={s.img}
          priorita={priorita}
          sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 300px"
        />
        <span className={s.luce} aria-hidden="true" />
      </span>
      <span className={s.meta}>
        <span>
          <span className={s.nome}>{nome}</span>
          <span className={s.fam}>
            {nomeFam} · {metallo.toLowerCase()}
          </span>
        </span>
        <span className={s.codice}>{f.codice}</span>
      </span>
    </Link>
  );
}
