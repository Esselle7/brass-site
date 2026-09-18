import { Campionario } from "@/components/Campionario";
import { CardFinitura } from "@/components/CardFinitura";
import { famiglie, finiture } from "@/data/finiture";
import { famiglieEn } from "@/data/finiture.en";
import { t, type Lingua } from "@/lib/i18n";
import s from "./campionario-view.module.css";

/** Una sola vista per le due lingue: cambia il dizionario, non la struttura. */
export function CampionarioView({ lingua }: { lingua: Lingua }) {
  const d = t(lingua);
  const p = d.pagine.finiture;

  const conteggi = [
    { id: "tutte" as const, nome: d.campionario.tutte, quante: finiture.length },
    ...famiglie.map((f) => ({
      id: f.id,
      nome: lingua === "en" ? f.nomeEn : f.nome,
      quante: finiture.filter((x) => x.famiglia === f.id).length,
    })),
  ];

  return (
    <div className="wrap">
      <header className={s.testata}>
        <h1>{p.titolo}</h1>
        <div className={s.intro}>
          <p>{p.intro}</p>
          <p className={s.nota}>{p.nota}</p>
        </div>
      </header>

      <section className={s.campionario} aria-label={p.titolo}>
        <Campionario famiglie={conteggi} totale={finiture.length} lingua={lingua}>
          {finiture.map((f, i) => (
            <CardFinitura key={f.codice} f={f} priorita={i < 4} lingua={lingua} />
          ))}
        </Campionario>
      </section>

      <section className={s.famiglie} aria-label={p.comeOrganizzato}>
        <h2>{p.comeOrganizzato}</h2>
        <dl className={s.elencoFamiglie}>
          {famiglie.map((f) => (
            <div key={f.id}>
              <dt>{lingua === "en" ? f.nomeEn : f.nome}</dt>
              <dd>{lingua === "en" ? famiglieEn[f.id] : f.descrizione}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
