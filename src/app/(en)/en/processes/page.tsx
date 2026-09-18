import type { Metadata } from "next";
import { LavorazioniView } from "@/views/LavorazioniView";
import { t } from "@/lib/i18n";
import { lingue } from "@/lib/alternate";

const p = t("en").pagine.lavorazioni;

export const metadata: Metadata = {
  title: p.metaTitolo,
  description: p.metaDescrizione,
  alternates: { canonical: "/en/processes", languages: lingue("/lavorazioni") },
};

export default function ProcessesPage() {
  return <LavorazioniView lingua="en" />;
}
