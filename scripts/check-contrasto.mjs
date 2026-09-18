#!/usr/bin/env node
/**
 * Gate di accessibilità sui token (SPEC §2 «Accessibilità»): legge gli hex da src/app/globals.css
 * e calcola il rapporto WCAG 2.1 di ogni coppia effettivamente usata nel sito.
 * Esce ≠ 0 se una coppia scende sotto la sua soglia. Nessun valore è scritto a mano qui:
 * se cambia il token, cambia il numero.
 */
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const css = readFileSync(join(resolve(import.meta.dirname, ".."), "src/app/globals.css"), "utf8");

const token = (nome) => {
  const m = css.match(new RegExp(`--${nome}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --${nome} non trovato in globals.css`);
  return m[1];
};

const lum = (hex) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/** [testo, fondo, soglia, dove si usa] — soglia 4,5 corpo · 3,0 testo grande o bordo attivo */
const coppie = [
  ["ink", "canvas", 4.5, "testo corrente"],
  ["ink", "surface", 4.5, "testo nelle card"],
  ["ink", "surface-2", 4.5, "testo nei riquadri"],
  ["muted", "canvas", 4.5, "testo secondario e placeholder"],
  ["muted", "surface", 4.5, "meta delle card"],
  ["muted", "surface-2", 4.5, "meta nei riquadri"],
  ["brass", "canvas", 4.5, "link e codici finitura"],
  ["brass", "surface", 4.5, "link dentro le card"],
  ["brass", "surface-2", 4.5, "link nei riquadri"],
  ["brass-hi", "canvas", 3.0, "hover e bordi"],
  ["canvas", "brass", 4.5, "testo del bottone primario"],
  ["ink", "rust", 4.5, "banner «pagina in sviluppo»"],
  ["rust-chiaro", "surface", 4.5, "etichetta «foto mancante»"],
];

let falliti = 0;
for (const [a, b, soglia, dove] of coppie) {
  const r = ratio(token(a), token(b));
  const ok = r >= soglia;
  if (!ok) falliti++;
  console.log(
    `${ok ? "✓" : "✗"} --${a} su --${b}  ${r.toFixed(2)}:1  (min ${soglia.toFixed(1)})  ${dove}`,
  );
}

if (falliti) {
  console.error(`\n✗ ${falliti} coppie sotto soglia WCAG: il design system non è pubblicabile.\n`);
  process.exit(1);
}
console.log(`\n✓ ${coppie.length} coppie di token verificate, tutte a norma.`);
