#!/usr/bin/env node
/**
 * Misura il peso trasferito di una pagina, con cache vuota e con gzip attivo — cioè come lo
 * paga un browser reale al primo caricamento. Non stima: scarica ogni risorsa e somma i byte.
 *
 *   node scripts/misura-peso.mjs http://127.0.0.1:3210/finiture [budgetKB]
 *
 * Conta: documento HTML, CSS, JS, font preload, e TUTTE le immagini della pagina nella variante
 * che il browser sceglierebbe (AVIF quando c'è il <source>, altrimenti il src del tag).
 * Esce ≠ 0 se supera il budget passato: è il gate di Fase 8 della SPEC.
 */
import http from "node:http";
import { gunzipSync } from "node:zlib";

const url = process.argv[2] ?? "http://127.0.0.1:3210/";
const budgetKB = Number(process.argv[3] ?? 0);

/*
 * Si usa node:http a basso livello e NON fetch(): undici decomprime da solo e riscrive
 * l'header, restituendo i byte decompressi — cioè un numero che nessun browser trasferisce mai.
 * Qui si contano i byte grezzi che arrivano dal socket, con gzip richiesto esplicitamente.
 */
const scarica = (u) =>
  new Promise((risolvi) => {
    const req = http.get(u, { headers: { "accept-encoding": "gzip" } }, (res) => {
      let byte = 0;
      const pezzi = [];
      res.on("data", (c) => {
        byte += c.length;
        pezzi.push(c);
      });
      res.on("end", () => {
        const grezzo = Buffer.concat(pezzi);
        const testo =
          res.headers["content-encoding"] === "gzip" ? gunzipSync(grezzo) : grezzo;
        risolvi({ u, byte, testo, errore: res.statusCode >= 400 ? res.statusCode : undefined });
      });
    });
    req.on("error", () => risolvi({ u, byte: 0, errore: "connessione" }));
  });

const doc = await scarica(url);
const html = doc.testo.toString("utf8");
const base = new URL(url);
const assoluto = (p) => new URL(p, base).href;

const risorse = new Map();
const aggiungi = (p, tipo) => {
  if (!p || p.startsWith("data:")) return;
  const a = assoluto(p);
  if (!risorse.has(a)) risorse.set(a, tipo);
};

for (const m of html.matchAll(/<script[^>]+src="([^"]+)"/g)) aggiungi(m[1], "js");
for (const m of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)) aggiungi(m[1], "css");
for (const m of html.matchAll(/<link[^>]+as="font"[^>]+href="([^"]+)"/g)) aggiungi(m[1], "font");
for (const m of html.matchAll(/<link[^>]+href="([^"]+)"[^>]+as="font"/g)) aggiungi(m[1], "font");
// <picture>: vince il <source> AVIF; le <img> senza picture usano il proprio src
for (const m of html.matchAll(/<source[^>]+srcSet="([^"]+)"/gi)) aggiungi(m[1].split(" ")[0], "img");
for (const m of html.matchAll(/<source[^>]+srcset="([^"]+)"/gi)) aggiungi(m[1].split(" ")[0], "img");
const avif = new Set([...risorse.keys()].filter((k) => k.endsWith(".avif")).map((k) => k.replace(/\.avif$/, "")));
for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
  const a = assoluto(m[1]);
  if (!avif.has(a.replace(/\.webp$/, ""))) aggiungi(m[1], "img");
}
for (const m of html.matchAll(/<video[^>]+poster="([^"]+)"/g)) aggiungi(m[1], "img");

const scaricate = await Promise.all([...risorse.keys()].map(scarica));

const per = { documento: doc.byte };
for (const r of scaricate) {
  const tipo = risorse.get(r.u);
  per[tipo] = (per[tipo] ?? 0) + r.byte;
}
const totale = Object.values(per).reduce((a, b) => a + b, 0);
const kb = (b) => `${(b / 1024).toFixed(1)} KB`;

console.log(`\n${url}`);
console.log(`  richieste          ${scaricate.length + 1}`);
for (const [tipo, byte] of Object.entries(per).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${tipo.padEnd(18)} ${kb(byte)}`);
}
console.log(`  ${"TOTALE".padEnd(18)} ${kb(totale)}`);

const errori = scaricate.filter((r) => r.errore);
if (errori.length) {
  console.error(`\n✗ ${errori.length} risorse non caricate:`);
  for (const e of errori) console.error(`  ${e.errore} ${e.u}`);
  process.exit(1);
}

if (budgetKB) {
  const ok = totale / 1024 <= budgetKB;
  console.log(`  budget             ${budgetKB} KB → ${ok ? "✓ rispettato" : "✗ SFORATO"}\n`);
  if (!ok) process.exit(1);
} else {
  console.log("");
}
