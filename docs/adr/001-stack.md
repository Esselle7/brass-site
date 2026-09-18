# ADR-001 — Stack del sito Brass Style
**Stato:** ~~proposta~~ **SUPERATA dalla decisione del committente (2026-09-18): Next 16.3.5, React ovunque.**
**Data:** 2026-09-18 · **Verificato:** versioni da registry.npmjs.org in sessione (`next` latest = 16.3.5, ri-verificato)

> **Esito.** L'analisi qui sotto raccomandava Astro con isole React. Il committente ha scelto
> **Next 16.3.5 con React su tutto il sito**, motivazione registrata: un solo modello mentale per chi
> implementa, e nessun costo di migrazione se in futuro arrivano un'area riservata o un preventivatore
> server-side. La raccomandazione resta scritta con i suoi numeri — non è stata cancellata perché fra
> sei mesi il «perché» deve essere leggibile, inclusa la strada non presa.
>
> **Conseguenze della deviazione, da presidiare (Fase 8 della SPEC):**
> - l'idratazione si paga anche sulle ~10 pagine di contenuto che non hanno interattività: il budget
>   **INP < 200 ms** diventa un criterio da misurare, non un vantaggio di partenza;
> - il punto 8 (niente Lenis) e il punto 7 (niente DB) **restano validi**: non dipendono dal framework;
> - `next/image` sostituisce la pipeline `<picture>` manuale per le 29 schede — va verificato che non
>   ri-comprima gli AVIF già ottimizzati in `assets/optimized/`.

1. **Contesto** — Vetrina B2B di un terzista: ~10 pagine statiche + 29 schede finitura, IT/EN, SEO locale e di settore determinante, conversione = richiesta preventivo/campioni. Niente login, niente DB, niente transazioni.
2. **Contesto (misure, non opinioni)** — I 4 riferimenti di lusso aperti in browser (bulgari, gucci, fantini, decastelli) **non caricano Lenis né WebGL** e pesano 1,3–2,5 MB; il sito attuale pesa **89 MB** (`docs/as-is.md` §1). Il committente propone React «perché è la più nuova e performante»: ipotesi, non misura — e «Next 15» è già due major indietro (ultima: **16.3.5**).
3. **Decisione** — **Astro 7.3.3**, con **isole React** SOLO per filtro campionario e form; CSS a token; **GSAP 3.15.0** per le poche animazioni; **niente Lenis, niente Three.js**; hosting statico su **Cloudflare Pages**.
4. **Gate che decide** — §2 natura del dominio: content/SEO → archetipo «Sito/Landing» → stack noto Astro. Nessun gate successivo impone di deviare, quindi non si devia.
5. **Perché non Next 16** — zero JS di default batte l'idratazione sull'INP quando non c'è rendering ibrido né API da servire; ISR non serve a contenuto che non cambia da solo (YAGNI).
6. **Perché React resta** — le 2 sole superfici interattive sono isole React: per chi implementa *è* React, senza pagarlo sulle altre 10 pagine.
7. **Perché niente DB** — N=29 finiture: contenuto in Markdown/JSON versionato. Un DB qui è astrazione senza volume (§9.0).
8. **Perché niente Lenis** — 4/4 dei riferimenti usano lo scroll nativo: 3,7 KB e un frame di latenza per un effetto che il lusso non fa.
9. **Alternative scartate** — Next 16 (rivalutare solo se arriva un'area riservata o un preventivatore server-side) · WordPress (nessuna redazione, costo di manutenzione e sicurezza) · HTML a mano (filtro + doppia lingua → copia-incolla, cioè la duplicazione già presente oggi, `as-is.md` §2.8).
10. **Conseguenze** — Componenti `.astro` + 2 componenti React; i18n nativo Astro. L'hosting va comunque rifatto: il dominio punta oggi al server Exchange con certificato errato (`as-is.md` §3.3). Debito accettato: una futura migrazione Astro→Next non è gratis.
