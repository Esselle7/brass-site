"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { percorsi, t, type Lingua } from "@/lib/i18n";
import s from "./selettore-lingua.module.css";

/**
 * Porta alla stessa pagina nell'altra lingua leggendo il <link rel="alternate" hreflang> che
 * Next ha già messo nel <head>: così la coppia è per costruzione la stessa che vede Google
 * (e che scripts/check-seo.mjs verifica reciproca), e nel bundle client non finisce nessuna
 * mappa di rotte — cioè nessun dato delle 29 finiture e delle 10 lavorazioni.
 * Senza JavaScript il link punta alla home dell'altra lingua: degrada, non si rompe.
 */
export function SelettoreLingua({ lingua }: { lingua: Lingua }) {
  const altra: Lingua = lingua === "it" ? "en" : "it";
  const pathname = usePathname();
  const [href, setHref] = useState<string>(percorsi.home[altra]);

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${altra}"]`,
    );
    setHref(link ? new URL(link.href).pathname : percorsi.home[altra]);
  }, [pathname, altra]);

  return (
    <Link href={href} className={s.selettore} hrefLang={altra} lang={altra}>
      {t(lingua).altraLingua}
    </Link>
  );
}
