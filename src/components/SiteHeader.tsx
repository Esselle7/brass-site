import Link from "next/link";
import { ContatoreSelezione } from "./ContatoreSelezione";
import { SelettoreLingua } from "./SelettoreLingua";
import { azienda } from "@/data/azienda";
import { finiture } from "@/data/finiture";
import { lavorazioni } from "@/data/lavorazioni";
import { hrefFinitura, hrefLavorazione, t, via, type Lingua } from "@/lib/i18n";
import s from "./site-header.module.css";

/**
 * Nessuna voce punta a una pagina che non esiste: il sito vecchio aveva 28 href="#"
 * (docs/as-is.md §2.2) ed è l'errore da non ripetere. Vale anche per le tendine: ogni riga
 * è una pagina vera e indicizzabile, non un'etichetta finta.
 *
 * Forma: in cima la barra è larga quanto lo schermo e porta marchio + scritta «Brass Style»;
 * scendendo si raccoglie in un'isola centrata e la scritta sfuma, resta il solo marchio.
 * È una transizione guidata dallo scroll in CSS (`animation-timeline: scroll(root)`):
 * nessun listener, nessun re-render, e dove non è supportata resta la forma compatta.
 *
 * Le tendine si aprono in :hover e in :focus-within — da tastiera senza una riga di JS.
 * Il menu mobile è un <details>: idem.
 */

/** Le stesse otto della home: la tendina è una scorciatoia, non un secondo campionario. */
const inTendina = ["TR-01", "SA-02", "NU-02", "MA-04", "OS-03", "MT-01", "PA-03", "TR-05"].map(
  (c) => finiture.find((f) => f.codice === c)!,
);

export function SiteHeader({ lingua }: { lingua: Lingua }) {
  const d = t(lingua);
  const voci = [
    { href: via("finiture", lingua), label: d.nav.finiture, tendina: "finiture" as const },
    { href: via("lavorazioni", lingua), label: d.nav.lavorazioni, tendina: "lavorazioni" as const },
    { href: via("azienda", lingua), label: d.nav.azienda, tendina: null },
    { href: via("progetti", lingua), label: d.nav.progetti, tendina: null },
    { href: via("contatti", lingua), label: d.nav.contatti, tendina: null },
  ];

  return (
    <header className={s.header}>
      <div className={s.guscio}>
        <div className={s.barra}>
          <Link href={via("home", lingua)} className={s.logo} aria-label={`${azienda.nome} — home`}>
            <img
              src="/media/logo/minimal-96.webp"
              width={96}
              height={99}
              alt=""
              className={s.marchio}
              fetchPriority="high"
            />
            <span className={s.logoTesto}>{azienda.nome}</span>
          </Link>

          <nav className={s.navDesktop} aria-label={d.menu.principale}>
            <ul>
              {voci.map((v) => (
                <li key={v.href} className={v.tendina ? s.conTendina : undefined}>
                  <Link href={v.href} className={s.voce}>
                    {v.label}
                  </Link>

                  {v.tendina === "finiture" && (
                    <div className={s.tendina}>
                      <div className={s.tendinaDentro}>
                        <p className={s.tendinaTitolo}>{d.pagine.finiture.titolo}</p>
                        <ul className={s.tendinaGriglia}>
                          {inTendina.map((f) => (
                            <li key={f.codice}>
                              <Link href={hrefFinitura(f, lingua)} prefetch={false}>
                                <span className={s.tendinaCodice}>{f.codice}</span>
                                {lingua === "en" ? f.nomeEn : f.nomeIt}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href={via("finiture", lingua)} className={`link ${s.tendinaTutte}`}>
                          {d.scheda.tutteLeFiniture(finiture.length)}
                        </Link>
                      </div>
                    </div>
                  )}

                  {v.tendina === "lavorazioni" && (
                    <div className={s.tendina}>
                      <div className={s.tendinaDentro}>
                        <p className={s.tendinaTitolo}>{d.pagine.lavorazioni.titolo}</p>
                        <ul className={s.tendinaGriglia}>
                          {lavorazioni.map((l, i) => (
                            <li key={l.slug}>
                              <Link href={hrefLavorazione(lingua, l)} prefetch={false}>
                                <span className={s.tendinaCodice}>
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                {lingua === "en" ? l.titoloEn : l.titolo}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.azioni}>
            <span className={s.soloDesktop}>
              <SelettoreLingua lingua={lingua} />
            </span>
            <ContatoreSelezione lingua={lingua} />
            <Link href={via("campioni", lingua)} className={`btn ${s.cta}`}>
              {d.nav.campioni}
            </Link>
          </div>

          <details className={s.menuMobile}>
            <summary aria-label={d.menu.apri}>
              <span aria-hidden="true">Menu</span>
            </summary>
            <nav aria-label={`${d.menu.principale} (mobile)`}>
              <ul>
                {voci.map((v) => (
                  <li key={v.href}>
                    <Link href={v.href}>{v.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href={via("campioni", lingua)}>{d.nav.campioni}</Link>
                </li>
                <li className={s.vociLingua}>
                  <SelettoreLingua lingua={lingua} />
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
