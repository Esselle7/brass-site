"use client";

import Link from "next/link";
import { useSelezione } from "@/lib/selezione";
import { t, via, type Lingua } from "@/lib/i18n";
import s from "./contatore.module.css";

/** Compare solo quando c'è qualcosa in selezione: niente badge «0» permanente. */
export function ContatoreSelezione({ lingua }: { lingua: Lingua }) {
  const selezione = useSelezione();
  if (selezione.length === 0) return null;
  return (
    <Link href={via("campioni", lingua)} className={s.contatore}>
      <span className={s.numero}>{selezione.length}</span>{" "}
      <span className={s.etichetta}>{t(lingua).campione.contatore(selezione.length)}</span>
    </Link>
  );
}
