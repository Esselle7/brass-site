"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Scorrimento «posato»: la rotella non salta di 100px, la pagina insegue con una rampa che
 * si smorza. È l'unica libreria di movimento del sito (3 KB gzip) ed è qui perché a mano
 * si riscrive male: intercettare wheel/touch senza rompere tastiera, ancore e barra di scorrimento
 * non è una manciata di righe.
 *
 * Non entra mai se l'utente ha chiesto meno movimento: in quel caso lo scroll resta quello nativo.
 * Senza JavaScript la pagina scorre normalmente: è un miglioramento, non un requisito.
 */
export function ScorrimentoFluido() {
  useEffect(() => {
    const menoMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (menoMovimento.matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.5,
      // ease-out-expo: la stessa curva di --ease, così il sito si muove tutto allo stesso modo
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
