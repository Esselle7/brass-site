import type { MetadataRoute } from "next";
import { azienda } from "@/data/azienda";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /progetti e /privacy sono ancora a segnaposto: non vanno indicizzate finché è così
        disallow: ["/api/", "/progetti", "/privacy", "/en/projects", "/en/privacy"],
      },
    ],
    sitemap: `${azienda.sito}/sitemap.xml`,
  };
}
