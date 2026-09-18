import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchedaFinituraView } from "@/views/SchedaFinituraView";
import { famigliaById, finiture, finituraBySlug } from "@/data/finiture";
import { lingue } from "@/lib/alternate";

export function generateStaticParams() {
  return finiture.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = finituraBySlug(slug);
  if (!f) return {};
  const fam = famigliaById(f.famiglia);
  return {
    title: `${f.nomeIt} ${f.codice} — finitura ${fam.nome.toLowerCase()} su ${f.metalloBase.toLowerCase()}`,
    description: `${f.nomeIt} (${f.codice}): ${f.processo.slice(0, 150)}`,
    alternates: {
      canonical: `/finiture/${f.slug}`,
      languages: lingue(`/finiture/${f.slug}`),
    },
    openGraph: {
      title: `${f.nomeIt} — ${f.codice}`,
      description: f.processo,
      images: [{ url: `/media/images/full/${f.immagine}.webp` }],
    },
  };
}

export default async function SchedaFinitura({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = finituraBySlug(slug);
  if (!f) notFound();
  return <SchedaFinituraView f={f} lingua="it" />;
}
