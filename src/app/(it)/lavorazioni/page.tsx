import type { Metadata } from "next";
import { LavorazioniView } from "@/views/LavorazioniView";
import { t } from "@/lib/i18n";
import { lingue } from "@/lib/alternate";

const p = t("it").pagine.lavorazioni;

export const metadata: Metadata = {
  title: p.metaTitolo,
  description: p.metaDescrizione,
  alternates: { canonical: "/lavorazioni", languages: lingue("/lavorazioni") },
};

export default function PaginaLavorazioni() {
  return <LavorazioniView lingua="it" />;
}
