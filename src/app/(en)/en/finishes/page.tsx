import type { Metadata } from "next";
import { CampionarioView } from "@/views/CampionarioView";
import { t } from "@/lib/i18n";
import { lingue } from "@/lib/alternate";

const p = t("en").pagine.finiture;

export const metadata: Metadata = {
  title: p.metaTitolo,
  description: p.metaDescrizione,
  alternates: { canonical: "/en/finishes", languages: lingue("/finiture") },
};

export default function FinishesPage() {
  return <CampionarioView lingua="en" />;
}
