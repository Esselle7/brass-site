import type { Metadata } from "next";
import Link from "next/link";
import { InDevelopmentBanner } from "@/components/InDevelopmentBanner";
import { via } from "@/lib/i18n";
import { lingue } from "@/lib/alternate";
import s from "@/views/progetti.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Furniture projects made by Brass Style for brands and design studios. Page in preparation: the images are being collected.",
  alternates: { canonical: "/en/projects", languages: lingue("/progetti") },
  robots: { index: false, follow: true },
};

const slot = [
  { titolo: "Project 1", tipo: "Hospitality contract", nota: "detail, non-attributable where an NDA applies" },
  { titolo: "Project 2", tipo: "Bespoke residential", nota: "overall view" },
  { titolo: "Project 3", tipo: "Retail / showroom", nota: "finishes compared in detail" },
  { titolo: "Project 4", tipo: "Decorative lighting", nota: "joint detail" },
  { titolo: "Project 5", tipo: "Furnishing component", nota: "finished piece on a neutral ground" },
];

export default function ProjectsEn() {
  return (
    <>
      <InDevelopmentBanner
        lingua="en"
        cosaManca="No images of completed projects are available yet: below are the places already prepared, each with the format required. The full list is in docs/asset-mancanti.md."
      />

      <div className="wrap">
        <header className={s.testata}>
          <h1>Projects</h1>
          <p className={s.intro}>
            A subcontractor is chosen on “what have you already made, and for whom”. This page
            exists for that — and it stays empty until the real images exist. No fake renders, no
            bought stock photography: if we did not make it, it is not here.
          </p>
          <p className={s.intro}>
            Much of the work is covered by confidentiality agreements with the brands: in those
            cases what is needed are non-attributable detail shots, showing the work without
            identifying the product.
          </p>
        </header>

        <div className={s.griglia}>
          {slot.map((p) => (
            <article key={p.titolo} className={s.slot}>
              <div className={s.figura}>
                <span className={s.etichetta}>Image missing</span>
                <span className={s.formato}>3:2 landscape · long side ≥ 2400 px</span>
              </div>
              <h2 className={s.titolo}>{p.titolo}</h2>
              <p className={s.tipo}>{p.tipo}</p>
              <p className={s.nota}>{p.nota}</p>
            </article>
          ))}
        </div>

        <section className={s.intanto}>
          <h2>In the meantime</h2>
          <p>
            What we can show today are the finishes and the production cycle: they are real,
            verifiable and already on this site.
          </p>
          <div className={s.azioni}>
            <Link href={via("finiture", "en")} className="btn">
              The finish range
            </Link>
            <Link href={via("lavorazioni", "en")} className="btn btn--fantasma">
              The processes
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
