#!/usr/bin/env node
/**
 * Gate di contenuto (Fail Fast): esce ≠ 0 e nomina il record se qualcosa manca.
 * Gira prima di `next build` (vedi package.json) — meglio non compilare che pubblicare una
 * scheda muta o una <img> che punta a un file inesistente.
 *
 * Controlla:
 *  - 29 finiture, codici e slug univoci, campi obbligatori non vuoti;
 *  - per ogni finitura: grid/<img>.avif, grid/<img>.webp, full/<img>.avif, full/<img>.webp;
 *  - 10 lavorazioni, slug univoci, testo ≥ 300 parole (requisito SEO della SPEC §2), immagini esistenti;
 *  - per ogni finitura e per ogni lavorazione, la voce inglese corrispondente.
 *
 * I dati vivono in TypeScript: qui si compilano in un temp con tsc (già dipendenza) e si leggono.
 */
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const out = join(root, ".validate-tmp");
const media = join(root, "assets", "optimized", "images");

rmSync(out, { recursive: true, force: true });

// tsconfig usa e getta: serve solo per risolvere gli alias @/* come li risolve Next
const configTmp = join(root, "tsconfig.validate.json");
writeFileSync(
  configTmp,
  JSON.stringify({
    compilerOptions: {
      outDir: out,
      module: "commonjs",
      target: "es2022",
      moduleResolution: "node",
      skipLibCheck: true,
      esModuleInterop: true,
      baseUrl: ".",
      paths: { "@/*": ["./src/*"] },
      noEmit: false,
    },
    files: [
      "src/data/finiture.ts",
      "src/data/finiture.en.ts",
      "src/data/lavorazioni.ts",
      "src/data/lavorazioni.en.ts",
      "src/lib/slug.ts",
    ],
  }),
);
try {
  execFileSync(join(root, "node_modules", ".bin", "tsc"), ["-p", configTmp], {
    cwd: root,
    stdio: "inherit",
  });
} finally {
  rmSync(configTmp, { force: true });
}

const require = createRequire(import.meta.url);
const { finiture, famiglie } = require(join(out, "data", "finiture.js"));
const { lavorazioni } = require(join(out, "data", "lavorazioni.js"));
const { finitureEn } = require(join(out, "data", "finiture.en.js"));
const { lavorazioniEn } = require(join(out, "data", "lavorazioni.en.js"));

const errori = [];
const err = (msg) => errori.push(msg);

// ——— finiture ———
const ATTESE = 29;
if (finiture.length !== ATTESE) err(`finiture: sono ${finiture.length}, ne servono ${ATTESE}`);

const obbligatori = [
  "codice",
  "slug",
  "nomeIt",
  "nomeEn",
  "famiglia",
  "metalloBase",
  "processo",
  "protezione",
  "manutenzione",
  "uso",
  "note",
  "immagine",
];
const visti = new Set();
const famigliaIds = new Set(famiglie.map((f) => f.id));

for (const f of finiture) {
  const id = f.codice || f.immagine || "(record senza codice)";
  for (const campo of obbligatori) {
    const v = f[campo];
    if (typeof v !== "string" || v.trim() === "") err(`${id}: campo obbligatorio "${campo}" vuoto`);
  }
  if (!Array.isArray(f.applicabileSu) || f.applicabileSu.length === 0)
    err(`${id}: "applicabileSu" vuoto`);
  if (!famigliaIds.has(f.famiglia)) err(`${id}: famiglia "${f.famiglia}" non esiste`);
  if (!("pezzoMax" in f)) err(`${id}: "pezzoMax" va dichiarato, anche a null`);
  for (const chiave of [f.codice, f.slug]) {
    if (visti.has(chiave)) err(`${id}: "${chiave}" duplicato`);
    visti.add(chiave);
  }
  for (const [dir, ext] of [
    ["grid", "avif"],
    ["grid", "webp"],
    ["full", "avif"],
    ["full", "webp"],
  ]) {
    const p = join(media, dir, `${f.immagine}.${ext}`);
    if (!existsSync(p)) err(`${id}: manca l'immagine ${dir}/${f.immagine}.${ext}`);
  }
}

// ——— traduzioni EN delle finiture ———
for (const f of finiture) {
  const en = finitureEn[f.codice];
  if (!en) {
    err(`${f.codice}: manca la voce inglese in src/data/finiture.en.ts`);
    continue;
  }
  for (const campo of ["processo", "note"]) {
    if (typeof en[campo] !== "string" || en[campo].trim() === "")
      err(`${f.codice} (EN): campo "${campo}" vuoto`);
  }
}

// ——— lavorazioni ———
const MIN_PAROLE = 300;
const slugLav = new Set();
for (const l of lavorazioni) {
  const id = l.slug || l.titolo || "(lavorazione senza slug)";
  for (const campo of ["slug", "titolo", "titoloEn", "sommario", "immagine"]) {
    if (typeof l[campo] !== "string" || l[campo].trim() === "")
      err(`lavorazione ${id}: campo "${campo}" vuoto`);
  }
  if (slugLav.has(l.slug)) err(`lavorazione ${id}: slug duplicato`);
  slugLav.add(l.slug);

  const parole = (l.corpo || []).join(" ").split(/\s+/).filter(Boolean).length;
  if (parole < MIN_PAROLE)
    err(`lavorazione ${id}: ${parole} parole di testo, ne servono almeno ${MIN_PAROLE}`);

  const en = lavorazioniEn[l.slug];
  if (!en) {
    err(`lavorazione ${id}: manca la voce inglese in src/data/lavorazioni.en.ts`);
  } else {
    if (typeof en.sommario !== "string" || en.sommario.trim() === "")
      err(`lavorazione ${id} (EN): "sommario" vuoto`);
    if (!Array.isArray(en.cosaServe) || en.cosaServe.length === 0)
      err(`lavorazione ${id} (EN): "cosaServe" vuoto`);
    const paroleEn = (en.corpo || []).join(" ").split(/\s+/).filter(Boolean).length;
    if (paroleEn < MIN_PAROLE)
      err(`lavorazione ${id} (EN): ${paroleEn} parole di testo, ne servono almeno ${MIN_PAROLE}`);
  }

  for (const img of [l.immagine, ...(l.immagineSecondaria ? [l.immagineSecondaria] : [])]) {
    for (const ext of ["avif", "webp"]) {
      const p = join(media, "full", `${img}.${ext}`);
      if (!existsSync(p)) err(`lavorazione ${id}: manca l'immagine full/${img}.${ext}`);
    }
  }
}
if (lavorazioni.length !== 10) err(`lavorazioni: sono ${lavorazioni.length}, ne servono 10`);

rmSync(out, { recursive: true, force: true });

if (errori.length) {
  console.error(`\n✗ contenuto incompleto — ${errori.length} problemi:\n`);
  for (const e of errori) console.error(`  · ${e}`);
  console.error("");
  process.exit(1);
}
console.log(
  `✓ contenuto valido — ${finiture.length} finiture (${famiglie.length} famiglie) e ${lavorazioni.length} lavorazioni, IT + EN, immagini tutte presenti`,
);
