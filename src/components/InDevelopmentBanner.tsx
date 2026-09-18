import { t, type Lingua } from "@/lib/i18n";
import s from "./banner.module.css";

/**
 * UNICO componente per le pagine i cui contenuti (foto di reparto, progetti realizzati,
 * testo legale) non esistono ancora. Riusato ovunque, dichiarato in docs/asset-mancanti.md.
 * Deve essere ovvio per chi guarda: sta in cima alla pagina, nel colore d'allarme del sistema.
 */
export function InDevelopmentBanner({
  cosaManca,
  lingua = "it",
}: {
  cosaManca: string;
  lingua?: Lingua;
}) {
  const d = t(lingua);
  return (
    <aside className={s.banner} role="note" aria-label={d.banner.stato}>
      <div className={`wrap ${s.dentro}`}>
        <strong className={s.titolo}>{d.banner.titolo}</strong>
        <p className={s.testo}>{cosaManca}</p>
      </div>
    </aside>
  );
}
