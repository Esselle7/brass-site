import type { Metadata } from "next";
import { InDevelopmentBanner } from "@/components/InDevelopmentBanner";
import { azienda, indirizzoRiga } from "@/data/azienda";
import { lingue } from "@/lib/alternate";
import s from "@/views/privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "What data the Brass Style sample request form collects, where it goes and how long it is kept.",
  alternates: { canonical: "/en/privacy", languages: lingue("/privacy") },
  robots: { index: false, follow: true },
};

export default function PrivacyEn() {
  return (
    <>
      <InDevelopmentBanner
        lingua="en"
        cosaManca="The full legal notice has not been drafted by the company yet. What follows is the site's actual behaviour, verifiable in the code: it is the factual basis the legal text will be written on."
      />

      <div className="wrap">
        <header className={s.testata}>
          <h1>Privacy</h1>
          <p className={s.intro}>
            What actually happens to the data you leave on this site, today, in the code that runs.
          </p>
        </header>

        <div className={`prosa ${s.corpo}`}>
          <h2>Data controller</h2>
          <p>
            {azienda.ragioneSociale}, {indirizzoRiga}, Italy. VAT {azienda.piva}. Contact:{" "}
            <a className="link" href={`mailto:${azienda.email}`}>
              {azienda.email}
            </a>{" "}
            ·{" "}
            <a className="link" href={azienda.telefono.href}>
              {azienda.telefono.display}
            </a>
            .
          </p>

          <h2>What the form collects</h2>
          <p>
            Company name, email address, the codes of the finishes you selected, an indicative
            quantity and your consent. The IP address the request comes from is recorded with it,
            used only to limit automated submissions.
          </p>

          <h2>Where it goes</h2>
          <p>
            The request is saved to a file on the site's server and sent by email to the company
            address through the Resend service, which acts as the sending provider. You receive a
            confirmation copy at the same email address you gave. No other recipients, no CRM, no
            marketing automation.
          </p>

          <h2>What the site does NOT do</h2>
          <ul>
            <li>It uses no profiling cookies and no advertising pixels.</li>
            <li>It loads no third-party services before an action of yours.</li>
            <li>It passes your data to no one for commercial purposes.</li>
          </ul>

          <h2>Still to be completed</h2>
          <p className="da-confermare">
            Legal basis, retention periods, the list of data processors and how to exercise your
            rights: these are the parts that belong to the company and its adviser, and they are not
            written by whoever builds the site.
          </p>
        </div>
      </div>
    </>
  );
}
