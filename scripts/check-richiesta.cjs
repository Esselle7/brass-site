const assert = require("node:assert");
const { onRequestPost } = require("../.check/functions/api/richiesta.js");
const { finiture } = require("../.check/src/data/finiture.js");

const kv = [];
const env = { RICHIESTE: { put: async (k, v) => void kv.push([k, v]) } }; // niente RESEND: si ferma al 503

const post = (body, ip = "1.2.3.4") =>
  onRequestPost({
    request: new Request("https://x/api/richiesta", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify(body),
    }),
    env,
  });

(async () => {
  // 1) campi mancanti → 422, niente scritto
  let r = await post({ email: "non-una-email", azienda: "" });
  assert.equal(r.status, 422, "422 sui campi mancanti");
  assert.equal(kv.length, 0, "niente persistenza su richiesta invalida");

  // 2) honeypot → 200 silenzioso
  r = await post({ sito: "bot", azienda: "X", email: "a@b.it", consenso: "si" });
  assert.equal(r.status, 200);
  assert.equal(kv.length, 0, "il bot non persiste nulla");

  // 3) richiesta valida → persistita PRIMA dell'email; senza chiave Resend → 503 esplicito
  r = await post({
    azienda: "Ferramenta Rossi",
    email: "Info@Rossi.IT",
    consenso: "si",
    quantita: "2 pezzi",
    finiture: [finiture[0].codice, "CODICE-INVENTATO"],
  });
  assert.equal(r.status, 503, "senza RESEND_API_KEY: 503, mai un grazie");
  assert.equal(kv.length, 1, "la richiesta valida è persistita");
  const salvata = JSON.parse(kv[0][1]);
  assert.equal(salvata.email, "info@rossi.it");
  assert.deepEqual(salvata.finiture, [finiture[0].codice], "codici inesistenti scartati");

  // 4) rate limit: 5 per IP ogni 10 minuti
  for (let i = 0; i < 4; i++) await post({ azienda: "A", email: "a@b.it", consenso: "si" });
  r = await post({ azienda: "A", email: "a@b.it", consenso: "si" });
  assert.equal(r.status, 429, "sesta richiesta dallo stesso IP bloccata");

  console.log("✓ endpoint richiesta: 4 check verdi (validazione, honeypot, persistenza-prima-email, rate limit)");
})();
