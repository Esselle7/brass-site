import type { Metadata } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import { ScorrimentoFluido } from "@/components/ScorrimentoFluido";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { azienda } from "@/data/azienda";
import { t } from "@/lib/i18n";
import "../globals.css";

/* Bodoni Moda: la stessa didone del marchio (ottone inciso, grazie sottilissime).
   L'asse `opsz` serve per non perdere le aste fini nei titoli grandi. */
const display = Bodoni_Moda({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-display",
});

const testo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-testo",
});

export const metadata: Metadata = {
  metadataBase: new URL(azienda.sito),
  title: {
    default: `${azienda.ragioneSociale} — metal working and finishing for furniture`,
    template: `%s — ${azienda.nome}`,
  },
  description:
    "Subcontract metal working and finishing for high-end furniture: 29 finishes with technical sheets, 10 in-house processes from design engineering to delivery. Near Como, Italy, since 1985.",
  alternates: { canonical: "/en", languages: { it: "/", en: "/en" } },
  openGraph: { type: "website", locale: "en_GB", siteName: azienda.nome, url: `${azienda.sito}/en` },
  robots: { index: true, follow: true },
};

/** JSON-LD: legge la stessa sorgente di footer e pagina contatti (invariante SPEC §3). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${azienda.sito}/#azienda`,
  name: azienda.ragioneSociale,
  url: azienda.sito,
  email: azienda.email,
  telephone: azienda.telefono.display,
  vatID: azienda.piva,
  foundingDate: String(azienda.fondazione),
  description:
    "Subcontract metal working and finishing for high-end furniture: design engineering, machining, welding, burnishing, liquid painting, assembly and packing.",
  address: {
    "@type": "PostalAddress",
    streetAddress: azienda.indirizzo.via,
    postalCode: azienda.indirizzo.cap,
    addressLocality: azienda.indirizzo.citta,
    addressRegion: azienda.indirizzo.provincia,
    addressCountry: azienda.indirizzo.paese,
  },
  openingHours: azienda.orari.schema,
};

export default function LayoutEn({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${testo.variable}`}>
      <body>
        <a className="salta" href="#contenuto">
          {t("en").vaiAlContenuto}
        </a>
        <ScorrimentoFluido />
        <SiteHeader lingua="en" />
        <main id="contenuto">{children}</main>
        <SiteFooter lingua="en" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
