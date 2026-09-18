import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchedaFinituraView } from "@/views/SchedaFinituraView";
import { famigliaById, finiture, finituraBySlug } from "@/data/finiture";
import { finitureEn, metalliEn } from "@/data/finiture.en";
import { lingue } from "@/lib/alternate";

export function generateStaticParams() {
  return finiture.map((f) => ({ slug: f.slugEn }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = finituraBySlug(slug, "en");
  if (!f) return {};
  const fam = famigliaById(f.famiglia);
  const metallo = metalliEn[f.metalloBase] ?? f.metalloBase;
  const processo = finitureEn[f.codice].processo;
  return {
    title: `${f.nomeEn} ${f.codice} — ${fam.nomeEn.toLowerCase()} finish on ${metallo.toLowerCase()}`,
    description: `${f.nomeEn} (${f.codice}): ${processo.slice(0, 150)}`,
    alternates: {
      canonical: `/en/finishes/${f.slugEn}`,
      languages: lingue(`/finiture/${f.slug}`),
    },
    openGraph: {
      title: `${f.nomeEn} — ${f.codice}`,
      description: processo,
      images: [{ url: `/media/images/full/${f.immagine}.webp` }],
    },
  };
}

export default async function FinishPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = finituraBySlug(slug, "en");
  if (!f) notFound();
  return <SchedaFinituraView f={f} lingua="en" />;
}
