"use client";

import { useSyncExternalStore } from "react";

/**
 * La selezione dei campioni vive in localStorage e sopravvive al cambio pagina.
 * Niente stato globale, niente provider: una chiave, un evento, tre funzioni.
 * Se localStorage non è disponibile (Safari privato, storage bloccato) la selezione
 * semplicemente non persiste — nessuna eccezione arriva in pagina.
 */
const CHIAVE = "brass-selezione";
const EVENTO = "brass-selezione-cambiata";

const leggi = (): string[] => {
  try {
    const raw = localStorage.getItem(CHIAVE);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
};

const scrivi = (codici: string[]) => {
  try {
    localStorage.setItem(CHIAVE, JSON.stringify(codici));
  } catch {
    /* storage non disponibile: la selezione resta valida solo per questa pagina */
  }
  window.dispatchEvent(new Event(EVENTO));
};

export const MAX_CAMPIONI = 10;

export function commuta(codice: string) {
  const attuali = leggi();
  if (attuali.includes(codice)) {
    scrivi(attuali.filter((c) => c !== codice));
    return;
  }
  if (attuali.length >= MAX_CAMPIONI) return;
  scrivi([...attuali, codice]);
}

export function rimuovi(codice: string) {
  scrivi(leggi().filter((c) => c !== codice));
}

export function svuota() {
  scrivi([]);
}

/** Cache della lettura: useSyncExternalStore richiede un riferimento stabile. */
let snapshot: string[] = [];
let serializzato = "[]";

const sottoscrivi = (cb: () => void) => {
  window.addEventListener(EVENTO, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENTO, cb);
    window.removeEventListener("storage", cb);
  };
};

const leggiStabile = () => {
  const attuali = leggi();
  const s = JSON.stringify(attuali);
  if (s !== serializzato) {
    serializzato = s;
    snapshot = attuali;
  }
  return snapshot;
};

const VUOTO: string[] = [];

export function useSelezione(): string[] {
  return useSyncExternalStore(sottoscrivi, leggiStabile, () => VUOTO);
}
