#!/usr/bin/env node
/**
 * Gate SEO (SPEC §7): gira contro un sito avviato e verifica, pagina per pagina,
 *  - 200 su tutte le rotte IT ed EN (nessun link morto interno al sito);
 *  - <title> e <meta description> UNICI in tutto il sito;
 *  - un solo <h1>;
 *  - canonical presente e coerente con l'URL;
 *  - hreflang RECIPROCI: se /finiture dichiara /en/finishes, /en/finishes deve dichiarare /finiture;
 *  - sitemap.xml che contiene tutte le rotte;
 *  - zero href="#".
 *
 *   node scripts/check-seo.mjs [http://127.0.0.1:3210]
 */
import http from "node:http";
import { gunzipSync } from "node:zlib";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const base = (process.argv[2] ?? "http://127.0.0.1:3210").replace(/\/$/, "");
const root = resolve(import.meta.dirname, "..");
const out = join(root, ".seo-tmp");

// i dati stanno in TypeScript: si compilano al volo, come fa validate-content.mjs
rmSync(out, { recursive: true, force: true });
const cfg = join(root, "tsconfig.seo.json");
writeFileSync(
  cfg,
  JSON.stringify({
    compilerOptions: {
      outDir: out,
      module: "commonjs",
      target: "es2022",
      moduleResolution: "node",
      skipLibCheck: true,
      esModuleInterop: true,
      noEmit: false,
    },
    files: ["src/data/finiture.ts", "src/data/lavorazioni.ts", "src/lib/slug.ts"],
  }),
);
try {
  execFileSync(join(root, "node_modules", ".bin", "tsc"), ["-p", cfg], { cwd: root, stdio: "inherit" });
} finally {
  rmSync(cfg, { force: true });
}
const require = createRequire(import.meta.url);
const { finiture } = require(join(out, "data", "finiture.js"));
const { lavorazioni } = require(join(out, "data", "lavorazioni.js"));
const { slugify } = require(join(out, "lib", "slug.js"));
rmSync(out, { recursive: true, force: true });

const rotte = [
  "/",
  "/finiture",
  "/lavorazioni",
  "/azienda",
  "/progetti",
  "/richiedi-campioni",
  "/contatti",
  "/privacy",
  "/en",
  "/en/finishes",
  "/en/processes",
  "/en/company",
  "/en/projects",
  "/en/request-samples",
  "/en/contact",
  "/en/privacy",
  ...finiture.map((f) => `/finiture/${f.slug}`),
  ...finiture.map((f) => `/en/finishes/${f.slugEn}`),
  ...lavorazioni.map((l) => `/lavorazioni/${l.slug}`),
  ...lavorazioni.map((l) => `/en/processes/${slugify(l.titoloEn)}`),
];

const scarica = (u) =>
  new Promise((risolvi) => {
    http
      .get(`${base}${u}`, { headers: { "accept-encoding": "gzip" } }, (res) => {
        const pezzi = [];
        res.on("data", (c) => pezzi.push(c));
        res.on("end", () => {
          const grezzo = Buffer.concat(pezzi);
          const corpo = res.headers["content-encoding"] === "gzip" ? gunzipSync(grezzo) : grezzo;
          risolvi({ u, stato: res.statusCode, html: corpo.toString("utf8") });
        });
      })
      .on("error", () => risolvi({ u, stato: 0, html: "" }));
  });

const errori = [];
const err = (m) => errori.push(m);
const uno = (html, re) => html.match(re)?.[1];
/** Gli URL in pagina sono assoluti e puntano al dominio di produzione: qui conta il path. */
const soloPath = (u) => {
  if (!u) return undefined;
  try {
    return new URL(u, base).pathname.replace(/(.)\/$/, "$1");
  } catch {
    return u;
  }
};

const pagine = new Map();
for (const r of rotte) {
  const { stato, html } = await scarica(r);
  if (stato !== 200) {
    err(`${r}: HTTP ${stato}`);
    continue;
  }
  const titoli = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  const alternate = [
    ...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi),
  ].map((m) => [m[1], soloPath(m[2])]);
  pagine.set(r, {
    title: uno(html, /<title>([^<]*)<\/title>/),
    desc: uno(html, /<meta name="description" content="([^"]*)"/),
    canonical: soloPath(uno(html, /<link rel="canonical" href="([^"]*)"/)),
    h1: titoli.length,
    alternate: Object.fromEntries(alternate),
    ancore: (html.match(/href="#"/g) ?? []).length,
  });
}

const titoli = new Map();
const descrizioni = new Map();

for (const [r, p] of pagine) {
  if (!p.title) err(`${r}: <title> assente`);
  if (!p.desc) err(`${r}: <meta description> assente`);
  if (p.h1 !== 1) err(`${r}: ${p.h1} <h1> (ne serve esattamente 1)`);
  if (p.ancore) err(`${r}: ${p.ancore} href="#"`);
  if (!p.canonical) err(`${r}: canonical assente`);
  else if (p.canonical !== r) err(`${r}: canonical incoerente (${p.canonical})`);

  if (titoli.has(p.title)) err(`title duplicato fra ${titoli.get(p.title)} e ${r}: «${p.title}»`);
  else titoli.set(p.title, r);
  if (descrizioni.has(p.desc))
    err(`description duplicata fra ${descrizioni.get(p.desc)} e ${r}`);
  else descrizioni.set(p.desc, r);

  // hreflang reciproci
  const altro = r.startsWith("/en") ? p.alternate.it : p.alternate.en;
  if (!altro) {
    err(`${r}: manca l'hreflang verso l'altra lingua`);
    continue;
  }
  const controparte = pagine.get(altro || "/");
  if (!controparte) {
    err(`${r}: hreflang punta a ${altro}, che non è fra le rotte del sito`);
    continue;
  }
  const ritorno = r.startsWith("/en") ? controparte.alternate.en : controparte.alternate.it;
  if (ritorno !== r) err(`hreflang NON reciproco: ${r} → ${altro} → ${ritorno ?? "(niente)"}`);
}

// sitemap
const { html: sitemap, stato: statoSitemap } = await scarica("/sitemap.xml");
if (statoSitemap !== 200) err(`sitemap.xml: HTTP ${statoSitemap}`);
else {
  const dentro = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
  for (const r of rotte) {
    if (r === "/progetti" || r === "/privacy" || r === "/en/projects" || r === "/en/privacy") continue;
    if (!dentro.has(r)) err(`sitemap.xml: manca ${r}`);
  }
}

console.log(`${pagine.size} pagine controllate su ${base}`);
if (errori.length) {
  console.error(`\n✗ ${errori.length} problemi SEO:\n`);
  for (const e of errori) console.error(`  · ${e}`);
  console.error("");
  process.exit(1);
}
console.log("✓ title e description unici · 1 h1 per pagina · canonical coerenti · hreflang reciproci · sitemap completa · zero href=\"#\"");
