import type { MetadataRoute } from "next";
import { finiture } from "@/data/finiture";
import { lavorazioni } from "@/data/lavorazioni";
import { azienda } from "@/data/azienda";
import { hrefFinitura, hrefLavorazione, percorsi, type Lingua } from "@/lib/i18n";

export const dynamic = "force-static";

/** Una sola sorgente: le rotte nascono dagli stessi dati che generano le pagine, in due lingue. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${azienda.sito}${p}`;
  const lingue: Lingua[] = ["it", "en"];

  const fisse = (["home", "finiture", "lavorazioni", "azienda", "campioni", "contatti"] as const).flatMap(
    (rotta) =>
      lingue.map((l) => ({
        url: url(percorsi[rotta][l]),
        changeFrequency: "monthly" as const,
        priority: rotta === "home" ? 1 : 0.8,
      })),
  );

  const schede = lingue.flatMap((l) =>
    finiture.map((f) => ({
      url: url(hrefFinitura(f, l)),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  );

  const fasi = lingue.flatMap((l) =>
    lavorazioni.map((lav) => ({
      url: url(hrefLavorazione(l, lav)),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  );

  return [...fisse, ...schede, ...fasi];
}
