import dimensioni from "@/data/dimensioni.json";

type Cartella = keyof typeof dimensioni;

type Props = {
  cartella: Cartella;
  nome: string;
  alt: string;
  className?: string;
  /** true solo per l'immagine sopra la piega: tutto il resto è lazy (invariante SPEC §3). */
  priorita?: boolean;
  sizes?: string;
};

/**
 * <picture> AVIF + fallback WebP, con width/height MISURATI (src/data/dimensioni.json,
 * generato con ffprobe sugli asset reali): niente CLS, niente next/image che ri-comprime
 * file già ottimizzati (vedi next.config.ts).
 */
export function ImmagineAsset({ cartella, nome, alt, className, priorita, sizes }: Props) {
  const misure = (dimensioni[cartella] as Record<string, number[]>)[nome];
  if (!misure) throw new Error(`Immagine sconosciuta: ${cartella}/${nome}`);
  const [w, h] = misure;
  const base = `/media/images/${cartella}/${nome}`;
  return (
    <picture>
      <source srcSet={`${base}.avif`} type="image/avif" sizes={sizes} />
      <img
        src={`${base}.webp`}
        width={w}
        height={h}
        alt={alt}
        className={className}
        sizes={sizes}
        loading={priorita ? "eager" : "lazy"}
        fetchPriority={priorita ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}
