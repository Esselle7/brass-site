import Link from "next/link";

export default function NonTrovata() {
  return (
    <div className="wrap" style={{ paddingBlock: "clamp(64px, 12vw, 160px)", maxWidth: "62ch" }}>
      <h1>Pagina non trovata</h1>
      <p style={{ color: "var(--muted)", marginTop: "var(--s5)" }}>
        L&apos;indirizzo non corrisponde a nessuna pagina del sito. Le due cose che quasi sempre si
        stanno cercando sono il campionario delle finiture e i contatti.
      </p>
      <div style={{ display: "flex", gap: "var(--s3)", flexWrap: "wrap", marginTop: "var(--s6)" }}>
        <Link href="/finiture" className="btn">
          Campionario finiture
        </Link>
        <Link href="/contatti" className="btn btn--fantasma">
          Contatti
        </Link>
      </div>
    </div>
  );
}
