import type { Metadata } from "next";
import { CampionarioView } from "@/views/CampionarioView";
import { t } from "@/lib/i18n";
import { lingue } from "@/lib/alternate";

const p = t("it").pagine.finiture;

export const metadata: Metadata = {
  title: p.metaTitolo,
  description: p.metaDescrizione,
  alternates: { canonical: "/finiture", languages: lingue("/finiture") },
};

export default function PaginaFiniture() {
  return <CampionarioView lingua="it" />;
}
