import type { FamigliaId } from "./finiture";

/**
 * Versione EN dei testi delle finiture. Vive in un file separato dall'italiano perché il
 * contenuto italiano è ancora una bozza da validare (docs/contenuti-da-validare.md): quando
 * l'ufficio tecnico corregge una scheda, si cambia la riga IT e poi la sua gemella qui.
 * scripts/validate-content.mjs verifica che ci sia una voce EN per ogni codice: se ne manca una
 * il build fallisce, così una finitura non può finire in inglese senza testo.
 */

export const metalliEn: Record<string, string> = {
  Ottone: "Brass",
  Rame: "Copper",
  Bronzo: "Bronze",
  Acciaio: "Steel",
  Alluminio: "Aluminium",
  Ferro: "Iron",
};

export const famiglieEn: Record<FamigliaId, string> = {
  trasparenti:
    "The metal stays visible: the surface is worked, sealed with a clear coat, and the colour is the alloy's own.",
  satinate:
    "Light is broken mechanically by a grain — straight, crossed or orbital. The direction of the scratch is part of the design.",
  nuvolate:
    "Oxidation applied by pad, deliberately uneven: the tone gathers in clouds and no two pieces are identical.",
  patinate:
    "Chemical patinas that age the surface under control, from the lightest tone through to rose.",
  marmo:
    "Veining drawn by hand in successive coats of paint: the metal takes on the pattern of stone while staying metal.",
  ossidate:
    "Deep burnishing and oxidation: the colour comes from a chemical reaction in the alloy, not from a pigment laid on top.",
  materiche:
    "Surfaces where the relief or the inclusion is felt by hand before it is seen.",
};

export const protezioneEn: Record<FamigliaId, string> = {
  trasparenti: "Liquid clear coat, matt or gloss on request",
  satinate: "Matt liquid clear coat",
  nuvolate: "Matt liquid clear coat",
  patinate: "Matt liquid clear coat",
  marmo: "Liquid paint cycle, matt finish",
  ossidate: "Matt liquid clear coat; microcrystalline wax on request",
  materiche: "Matt liquid clear coat",
};

export const manutenzioneEn: Record<FamigliaId, string> = {
  trasparenti:
    "A soft dry cloth, or barely damp with water. No acidic, alkaline or abrasive cleaners: the clear coat is the only layer between the metal and the air.",
  satinate:
    "A soft cloth, wiped along the direction of the grain. Avoid abrasive pads: they reopen the grain and make it uneven.",
  nuvolate:
    "A soft dry cloth. At most a heavily diluted neutral detergent; never acidic or paste cleaners, which strip the oxide and leave a pale mark.",
  patinate:
    "A soft dry cloth. The patina is chemical and thin: no abrasives, no acidic products.",
  marmo:
    "A soft cloth with neutral detergent. No solvents: the effect is built up in coats of paint and solvent dissolves them.",
  ossidate:
    "A dry cloth. Fingerprints should be wiped straight away: the oil from a hand marks the oxide and stays visible.",
  materiche:
    "A soft dry cloth, following the relief. Avoid pressure washing and abrasive products.",
};

export const usoEn = "Indoor";

/** codice → { processo, note } in inglese */
export const finitureEn: Record<string, { processo: string; note: string }> = {
  "TR-01": {
    processo:
      "Brass brushed vertically, degreased and sealed with a clear coat. No colour is added: the warm yellow and the long highlight along the grain belong to the alloy.",
    note: "It is the reference finish of the range: the one every other sample is compared against.",
  },
  "TR-02": {
    processo:
      "A brushed surface brought to a bronze tone with a light chemical pass, then sealed clear. The tone stays warm and dark without turning brown.",
    note: "On large pieces the direction of the grain has to be decided at design stage: it changes how the light reads.",
  },
  "TR-03": {
    processo:
      "Copper cleaned, evened out and sealed with a clear coat so it does not shift over time. An almost flat surface, full colour.",
    note: "⚠️ The archive photograph of this sample is soft and shows little of the grain (docs/asset-mancanti.md): it needs reshooting.",
  },
  "TR-04": {
    processo:
      "Copper worked with an orbital sander: the light does not run in a single direction but turns in small overlapping circles. Sealed with a clear coat.",
    note: "Orbital grain hides machining marks on wide surfaces better than a straight grain does.",
  },
  "TR-05": {
    processo:
      "The piece goes through a tumbler with abrasive media: edges soften and the surface takes an even micro-grain, then a clear coat.",
    note: "It is the only finish in the range that also changes the edge of the piece, not just its surface.",
  },
  "SA-01": {
    processo:
      "A double satin pass at 90°: the second crosses the first and produces a dense weave that damps directional reflections.",
    note: "It carries fingerprints well: the usual choice for handles and surfaces that get touched.",
  },
  "SA-02": {
    processo:
      "Cross satin brought to a bronze tone: the weave stays legible under the colour and the dark ground makes the grid stand out.",
    note: "This sample has the most pronounced grain in the whole range: the finish reads from across a room.",
  },
  "SA-03": {
    processo:
      "As SA-02, with an ageing pass that darkens the hollows of the weave and leaves the ridges catching the light.",
    note: "The contrast between ridges and ground depends on brushing pressure: agree it on a sample piece.",
  },
  "SA-04": {
    processo:
      "Fine sandblasting followed by a light finish: the surface turns matt and even, with a diffuse silvery light instead of a reflection.",
    note: "Matting and tone depend on the grit used: say in your request whether you need it lighter or greyer.",
  },
  "SA-05": {
    processo:
      "Straight medium-grain satin on brass, neutral in tone, sealed matt. It is the shop's standard satin finish.",
    note: "«CDF» is the internal code of this sample. ⚠️ To be confirmed before it goes in a catalogue.",
  },
  "NU-01": {
    processo:
      "Oxidation applied by pad with short contact times: the ground stays light and the clouding barely hinted at.",
    note: "The most even of the family: suited to large surfaces where strong patches would be distracting.",
  },
  "NU-02": {
    processo:
      "Oxidation applied by pad in an uneven spread: the denser areas form the characteristic cloud. Darkness is controlled by contact time.",
    note: "The medium tone is the most requested of the family; no two pieces are ever identical, and that is intended.",
  },
  "NU-03": {
    processo:
      "The same process as NU-02 with long contact times: the ground goes to a deep brown and the clouds remain as lighter areas.",
    note: "For pieces that will sit side by side, run the whole order through the same bath to hold the tone.",
  },
  "NU-04": {
    processo:
      "Clouding followed by a light mechanical pass on the raised areas: the effect is of a piece worn and polished by use.",
    note: "The pass concentrates where the piece would actually be touched: mark it on the drawing.",
  },
  "PA-01": {
    processo:
      "A light chemical patina that softens the yellow of brass towards a warm beige, keeping the surface compact and free of veining.",
    note: "The most neutral finish in the range: it sits well next to pale timber and stone.",
  },
  "PA-02": {
    processo:
      "The same patina as PA-01 taken further: the tone drops towards taupe and the surface gains a slight depth.",
    note: "An intermediate tone: if the project will be produced in batches over time, keep a signed reference sample.",
  },
  "PA-03": {
    processo:
      "A patina that brings out the copper content of the alloy: the result is a dusty rose, cool and not glossy.",
    note: "Rose is the tone most sensitive to the starting alloy: sample it on the actual material of the project.",
  },
  "MA-01": {
    processo:
      "A pale sprayed ground with veins drawn by hand with a fine brush, sealed with a matt clear coat. Every piece is drawn individually.",
    note: "The veins follow the piece: on surfaces that meet, continuity and direction must be agreed beforehand.",
  },
  "MA-02": {
    processo:
      "An ivory-ground variant with sparser veining and restrained contrast: the pattern reads close up, from a distance it stays a pale surface.",
    note: "The easiest variant to repeat across repeat batches.",
  },
  "MA-03": {
    processo:
      "A brown-green ground worked with a sponge and then finished: the veining is not linear but made of overlapping patches, with a barely perceptible relief.",
    note: "A surface that hides fingerprints well: suited to tops and skirtings.",
  },
  "MA-04": {
    processo:
      "A deep green ground with pale veins drawn by hand, in the spirit of alpine green marbles. Matt sealed.",
    note: "Dark green throws edges into relief: on welded pieces the weld dressing has to be impeccable.",
  },
  "MA-05": {
    processo:
      "A rust ground with dark veins and lighter areas, built up in several coats with sponge and brush. The most textural variant of the family.",
    note: "With MA-03 it is the one that best carries large surfaces without showing repetition.",
  },
  "OS-01": {
    processo:
      "Deep oxidation followed by a pad pass on the raised areas: the ground stays dark brown, the relief comes back into the light.",
    note: "The classic finish of period furniture: the contrast is decided on the piece, not in a catalogue.",
  },
  "OS-02": {
    processo:
      "Burnishing spread unevenly, leaving a smoke-grey veil over the metal: the surface looks hazed rather than coloured.",
    note: "On pieces polished before burnishing the smoke stays more transparent; on satin grounds it becomes more opaque.",
  },
  "OS-03": {
    processo:
      "Oxidation pushed until the cool tones appear: the blue-grey that emerges is a stage of the reaction, not a pigment.",
    note: "The hardest finish to repeat identically: always plan a control sample for each batch.",
  },
  "OS-04": {
    processo:
      "A variant of Cloudy Blue in which the reaction is stopped earlier: the warm bronze of the ground and the cool areas on the surface coexist.",
    note: "The balance of warm and cool changes from piece to piece: that is the signature of the finish.",
  },
  "OS-05": {
    processo:
      "Oxidation applied as a gradient: the tone runs from light to dark along the piece with no steps. It requires a continuous spread, in a single pass.",
    note: "On long pieces the direction of the gradient must be marked on the drawing. «F» is the internal code of the sample, ⚠️ to be confirmed.",
  },
  "MT-01": {
    processo:
      "Brass treated so that the surface breaks into micro-facets: light is returned as points rather than continuously.",
    note: "Under direct light the bright point moves with the viewer: judge it in person, a photograph only shows part of it.",
  },
  "MT-02": {
    processo:
      "A liquid paint cycle with a textured finish in deep burgundy: the colour is solid and the surface has a grain you can feel.",
    note: "The only finish in the range whose colour does not come from the metal: choose it on the physical sample.",
  },
};
