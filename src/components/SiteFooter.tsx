import Link from "next/link";
import { azienda } from "@/data/azienda";
import { t, via, type Lingua } from "@/lib/i18n";
import s from "./site-footer.module.css";

/** Tutti i dati vengono da src/data/azienda.ts: footer, contatti e JSON-LD non si contraddicono. */
export function SiteFooter({ lingua }: { lingua: Lingua }) {
  const d = t(lingua);
  const voci: [string, string][] = [
    [via("finiture", lingua), d.footer.campionario],
    [via("lavorazioni", lingua), d.nav.lavorazioni],
    [via("azienda", lingua), d.nav.azienda],
    [via("progetti", lingua), d.nav.progetti],
    [via("campioni", lingua), d.nav.campioni],
    [via("contatti", lingua), d.nav.contatti],
  ];

  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.dentro}`}>
        <div className={s.colonna}>
          <img
            src="/media/logo/scritta-180.webp"
            width={180}
            height={128}
            alt={azienda.ragioneSociale}
            className={s.logo}
            loading="lazy"
          />
          <p className={s.claim}>
            {lingua === "it"
              ? `${azienda.claim}. Dal ${azienda.fondazione}.`
              : `Metal working and finishing for furniture. Since ${azienda.fondazione}.`}
          </p>
        </div>

        <address className={s.colonna}>
          <p>
            {azienda.indirizzo.via}
            <br />
            {azienda.indirizzo.cap} {azienda.indirizzo.citta} ({azienda.indirizzo.provincia})
            {lingua === "en" ? " — Italy" : ""}
          </p>
          <p>
            <a className="link" href={azienda.telefono.href}>
              {azienda.telefono.display}
            </a>
            <br />
            <a className="link" href={`mailto:${azienda.email}`}>
              {azienda.email}
            </a>
          </p>
          <p className={s.orari}>
            {lingua === "it" ? azienda.orari.display : "Monday – Friday, 8:00 – 17:30"}
          </p>
        </address>

        <nav className={s.colonna} aria-label="Footer">
          <ul>
            {voci.map(([href, label]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`wrap ${s.basso}`}>
        <p>
          © {new Date().getFullYear()} {azienda.ragioneSociale} — {lingua === "it" ? "P.IVA" : "VAT"}{" "}
          {azienda.piva}. {d.footer.direzione(azienda.direzioneCoordinamento)}
        </p>
        <p>
          <Link href={via("privacy", lingua)} className="link">
            {d.footer.privacy}
          </Link>
        </p>
      </div>
    </footer>
  );
}
