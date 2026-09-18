import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LavorazioneView } from "@/views/LavorazioneView";
import { lavorazioni } from "@/data/lavorazioni";
import { lavorazioniEn } from "@/data/lavorazioni.en";
import { slugLavorazione, t } from "@/lib/i18n";
import { lingue } from "@/lib/alternate";

const perSlugEn = (slug: string) =>
  lavorazioni.find((l) => slugLavorazione(l.titoloEn, l.slug, "en") === slug);

export function generateStaticParams() {
  return lavorazioni.map((l) => ({ slug: slugLavorazione(l.titoloEn, l.slug, "en") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = perSlugEn(slug);
  if (!l) return {};
  const sommario = lavorazioniEn[l.slug].sommario;
  return {
    title: `${l.titoloEn} — ${t("en").pagine.lavorazioni.metaSuffisso}`,
    description: sommario,
    alternates: {
      canonical: `/en/processes/${slug}`,
      languages: lingue(`/lavorazioni/${l.slug}`),
    },
    openGraph: { title: l.titoloEn, description: sommario },
  };
}

export default async function ProcessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = perSlugEn(slug);
  if (!l) notFound();
  return <LavorazioneView l={l} lingua="en" />;
}
