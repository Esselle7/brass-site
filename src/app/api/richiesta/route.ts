import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { azienda } from "@/data/azienda";
import { finiture } from "@/data/finiture";

export const runtime = "nodejs";

/**
 * Endpoint della richiesta campioni.
 *
 * Invariante SPEC §3: «una richiesta di preventivo non si perde mai». Quindi l'ordine è
 * 1) valida  2) SCRIVI su disco  3) prova a mandare l'email.
 * Se l'invio email fallisce la richiesta è già persistita e l'utente vede un errore esplicito
 * con i recapiti diretti — mai un «grazie» su un invio fallito.
 *
 * L'email passa da Resend (scelta del committente): la chiave sta in .env.local, MAI nel repo.
 */

const CODICI = new Set(finiture.map((f) => f.codice));
const MAX_TESTO = 200;

/** Rate limit elementare in memoria: 5 richieste per IP ogni 10 minuti. */
const finestra = 10 * 60 * 1000;
const tetto = 5;
const visite = new Map<string, number[]>();

function troppeRichieste(ip: string) {
  const ora = Date.now();
  const recenti = (visite.get(ip) ?? []).filter((t) => ora - t < finestra);
  recenti.push(ora);
  visite.set(ip, recenti);
  return recenti.length > tetto;
}

const testo = (v: unknown, max = MAX_TESTO) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

// Validazione volutamente permissiva sulla forma, stretta su ciò che conta (c'è una @, un punto
// nel dominio, niente spazi): l'unico modo di sapere se un'email esiste è scriverle.
const emailValida = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "sconosciuto";

  if (troppeRichieste(ip)) {
    return Response.json(
      { errore: "Troppe richieste ravvicinate da questa connessione." },
      { status: 429 },
    );
  }

  let corpo: Record<string, unknown>;
  try {
    corpo = await req.json();
  } catch {
    return Response.json({ errore: "Richiesta non leggibile." }, { status: 400 });
  }

  // honeypot: risposta 200 senza fare nulla, così il bot non impara nulla
  if (testo(corpo.sito)) return Response.json({ ok: true });

  const email = testo(corpo.email, 254).toLowerCase();
  const consenso = corpo.consenso === "si" || corpo.consenso === true;
  const nomeAzienda = testo(corpo.azienda);
  const quantita = testo(corpo.quantita, 300);
  const codici = Array.isArray(corpo.finiture)
    ? corpo.finiture.filter((c): c is string => typeof c === "string" && CODICI.has(c)).slice(0, 10)
    : [];

  const mancanti: string[] = [];
  if (!nomeAzienda) mancanti.push("azienda");
  if (!emailValida(email)) mancanti.push("email");
  if (!consenso) mancanti.push("consenso privacy");
  if (mancanti.length) {
    return Response.json(
      { errore: `Campi obbligatori mancanti o non validi: ${mancanti.join(", ")}.` },
      { status: 422 },
    );
  }

  const richiesta = {
    ricevutaIl: new Date().toISOString(),
    azienda: nomeAzienda,
    email,
    finiture: codici,
    quantita,
    consenso: true,
    ip,
  };

  // 1) persistenza PRIMA dell'invio: se qui fallisce, non si va avanti e lo si dice.
  try {
    const cartella = join(process.cwd(), "data", "richieste");
    await mkdir(cartella, { recursive: true });
    const giorno = richiesta.ricevutaIl.slice(0, 10);
    await appendFile(join(cartella, `${giorno}.jsonl`), `${JSON.stringify(richiesta)}\n`, "utf8");
  } catch (e) {
    console.error("[richiesta] persistenza fallita", e);
    return Response.json(
      {
        errore:
          "Non siamo riusciti a registrare la richiesta: per non perderla, scrivici direttamente.",
      },
      { status: 500 },
    );
  }

  // 2) invio email
  const chiave = process.env.RESEND_API_KEY;
  const mittente = process.env.RESEND_FROM;
  const destinatario = process.env.RICHIESTE_A ?? azienda.email;

  if (!chiave || !mittente) {
    console.warn("[richiesta] RESEND_API_KEY/RESEND_FROM assenti: richiesta salvata, email non inviata");
    return Response.json(
      {
        errore:
          "La richiesta è stata registrata ma la notifica email non è ancora configurata su questo ambiente.",
      },
      { status: 503 },
    );
  }

  const elencoFiniture = codici.length
    ? codici
        .map((c) => {
          const f = finiture.find((x) => x.codice === c)!;
          return `- ${c} ${f.nomeIt} (${f.metalloBase})`;
        })
        .join("\n")
    : "— nessuna finitura selezionata —";

  const testoEmail = [
    `Azienda: ${nomeAzienda}`,
    `Email: ${email}`,
    `Quantità indicativa: ${quantita || "non indicata"}`,
    "",
    "Finiture richieste:",
    elencoFiniture,
    "",
    `Ricevuta il ${new Date(richiesta.ricevutaIl).toLocaleString("it-IT")}`,
  ].join("\n");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${chiave}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: mittente,
        to: [destinatario],
        reply_to: email,
        subject: `Richiesta campioni — ${nomeAzienda}${codici.length ? ` (${codici.join(", ")})` : ""}`,
        text: testoEmail,
      }),
    });
    if (!r.ok) throw new Error(`Resend ha risposto ${r.status}`);
  } catch (e) {
    console.error("[richiesta] invio email fallito (richiesta comunque salvata)", e);
    return Response.json(
      {
        errore:
          "La richiesta è registrata, ma la notifica all'azienda non è partita: conviene avvisarci anche per telefono o email.",
      },
      { status: 502 },
    );
  }

  // conferma automatica al mittente: se fallisce, non invalida la richiesta
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${chiave}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: mittente,
        to: [email],
        subject: `Abbiamo ricevuto la tua richiesta — ${azienda.nome}`,
        text: [
          `Grazie, abbiamo ricevuto la richiesta di ${nomeAzienda}.`,
          "",
          "Riepilogo:",
          elencoFiniture,
          quantita ? `Quantità indicativa: ${quantita}` : "",
          "",
          `Ti risponde l'ufficio tecnico. Per urgenze: ${azienda.telefono.display}.`,
          `${azienda.ragioneSociale} — ${azienda.indirizzo.via}, ${azienda.indirizzo.cap} ${azienda.indirizzo.citta} (${azienda.indirizzo.provincia})`,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
  } catch (e) {
    console.error("[richiesta] conferma al mittente non inviata", e);
  }

  return Response.json({ ok: true });
}
