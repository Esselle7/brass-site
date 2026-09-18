import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LavorazioneView } from "@/views/LavorazioneView";
import { lavorazioneBySlug, lavorazioni } from "@/data/lavorazioni";
import { t } from "@/lib/i18n";
import { lingue } from "@/lib/alternate";

export function generateStaticParams() {
  return lavorazioni.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = lavorazioneBySlug(slug);
  if (!l) return {};
  return {
    title: `${l.titolo} — ${t("it").pagine.lavorazioni.metaSuffisso}`,
    description: l.sommario,
    alternates: {
      canonical: `/lavorazioni/${l.slug}`,
      languages: lingue(`/lavorazioni/${l.slug}`),
    },
    openGraph: { title: l.titolo, description: l.sommario },
  };
}

export default async function PaginaLavorazione({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = lavorazioneBySlug(slug);
  if (!l) notFound();
  return <LavorazioneView l={l} lingua="it" />;
}
