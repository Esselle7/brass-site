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
    default: `${azienda.ragioneSociale} — lavorazione e finitura metalli per l'arredo`,
    template: `%s — ${azienda.nome}`,
  },
  description:
    "Terzista di lavorazione e finitura metalli per l'arredo di alta gamma: 29 finiture a campionario, 10 lavorazioni interne dalla progettazione al trasporto. Vertemate con Minoprio (CO), dal 1985.",
  alternates: { canonical: "/", languages: { it: "/", en: "/en" } },
  openGraph: { type: "website", locale: "it_IT", siteName: azienda.nome, url: azienda.sito },
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
    "Lavorazione e finitura di metalli per l'arredo di alta gamma in conto terzi: progettazione, lavorazioni meccaniche, saldatura, brunitura, verniciatura a liquido, assemblaggio e imballo.",
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

export default function LayoutIt({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${display.variable} ${testo.variable}`}>
      <body>
        <a className="salta" href="#contenuto">
          {t("it").vaiAlContenuto}
        </a>
        <ScorrimentoFluido />
        <SiteHeader lingua="it" />
        <main id="contenuto">{children}</main>
        <SiteFooter lingua="it" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
