/**
 * Versione EN delle pagine lavorazione. Stesso principio del file finiture.en.ts: il testo
 * italiano è la sorgente, questo è la sua traduzione, e scripts/validate-content.mjs pretende
 * una voce EN per ogni slug — con lo stesso minimo di 300 parole richiesto dalla SPEC.
 */
export const lavorazioniEn: Record<
  string,
  { sommario: string; corpo: string[]; cosaServe: string[] }
> = {
  progettazione: {
    sommario:
      "From the designer's drawing to a drawing that can be produced: sections, thicknesses, joints and finish decided before the first tube is cut.",
    cosaServe: [
      "A 2D drawing or 3D model, dimensioned or not",
      "The finish you want, or at least the family (clear, clouded, marble effect…)",
      "Indicative quantity and what the piece is for",
    ],
    corpo: [
      "Design engineering is the point where a drawing becomes a piece that can be made. A rendering does not tell you which thickness carries the span, where a weld can run without staying in sight, how the object comes apart for transport, what radius the bend can take without opening up the surface. These are all decisions that, if postponed, come back in the workshop as scrap.",
      "The work starts from whatever the client has: a complete 3D model, a 2D drawing with the essential dimensions, sometimes only a sketch with an overall size. On that basis the geometry of the piece is rebuilt, tube sections and sheet thicknesses are set, and it is decided how the components join and which parts stay demountable. Those choices are never only structural: every joint has an effect on the finish, because a badly dressed weld shows far more under burnishing than under an opaque paint.",
      "For that reason the finish is chosen here and not at the end. A clouded surface needs a different preparation from a cross satin; a marble effect needs a continuous, paintable ground; a clear finish forgives no machining mark, because it has nothing to hide behind. Deciding the finish at design stage means setting tolerances and the order of operations to suit the result you want from the outset.",
      "The second theme is repeatability. A one-off can be solved in many ways; a production run needs fixtures, locating references and an assembly order that stay the same from the first piece to the last. In the same phase we assess whether a dedicated fixture is worth building, how many pieces make it sustainable, and which intermediate checks are needed.",
      "This phase produces one thing only: a shared production drawing, with the critical points declared and the finish chosen. From there the work moves to the prototype, which exists to verify on a real piece what has so far been decided on paper.",
    ],
  },
  prototipazione: {
    sommario:
      "The first piece exists to be argued over: you look at it, measure it, change it. Then it becomes the rule for the whole run.",
    cosaServe: [
      "An approved production drawing or an updated 3D model",
      "A sample of the finish required, if a reference already exists",
      "Who approves the prototype, and within what timeframe",
    ],
    corpo: [
      "The prototype is the first piece you can hold in your hand, and that is exactly its purpose: to get the person who drew it and the people who have to make it to agree on a real object rather than an image. It is the moment when everything a 3D model cannot show comes out — the weight, the sound, the play between two components, how a finish actually behaves on a curved surface.",
      "It is built with the same operations as the production run, not with shortcuts: cutting, bending, machining, welding and dressing. A prototype made differently from production tells you very little, because it does not test the cycle that will actually be used. On the piece we check the critical dimensions, the strength of the joints, how the visible surfaces behave and whether the chosen finish is feasible.",
      "Engineering it for production is the least visible and most decisive part. It means turning a piece that works into a piece that can be repeated: defining the order of operations, the locating references, the welding fixtures that hold the geometry, the points where inspection has to happen during the cycle rather than at the end. This is also where we decide what is worth making in one piece and what is better split, because a piece made in two parts and joined well often costs less than a single piece that is hard to hold in tolerance.",
      "Almost always the prototype produces changes. That is its purpose: changing now costs one piece, changing after the run has started costs a batch. Revisions go back onto the drawing, so that the approved version is one version, and it is the one that goes into production.",
      "Once approved, the prototype becomes the physical reference for the order: the signed sample the production pieces are compared against, finish included — and on an approved sample a finish stops being a description and becomes an object. From then on any dispute has a physical term of comparison, and arguments about what was agreed stop being a matter of opinion.",
    ],
  },
  "prototipazione-imballi": {
    sommario:
      "A piece finished well and packed badly arrives ruined. Packaging is designed and tested like the product itself.",
    cosaServe: [
      "Destination and intended transport (road, sea, air)",
      "Whether the piece travels assembled or knocked down",
      "Any end-client requirements on packaging materials and markings",
    ],
    corpo: [
      "On a piece with a visible finish, packaging is not an accessory: it is the last operation. A burnished or liquid-painted surface marks with very little, and the damage does not happen in the workshop but in handling, loading and repeated resting. That is why packaging is prototyped: it gets built, loaded, moved, and we look at what actually happens to the piece.",
      "Packaging design starts from the geometry and the fragility of the object. We establish where the piece can be touched and where it cannot, which points carry load, how it is restrained so it cannot move, and which materials can sit against the finished surface without leaving traces. The wrong adhesive film on fresh paint is a classic: it protects for a week and leaves its mark forever.",
      "The second criterion is whoever will open the crate. On site, the person unpacking is often not the person who ordered: the packaging has to make it obvious how the piece comes out without being forced, and how it goes back in if installation slips. Packaging that opens one way, and obviously so, prevents more damage than another layer of padding.",
      "Then there are the transport constraints: pallet dimensions, stackability, weight per package, resistance to humidity for sea freight, any markings the consignee requires. These constraints change the packaging design and sometimes the piece itself, because a demountable component travels better and takes less space.",
      "The packaging prototype is tested fully loaded, not empty, and corrected until the piece comes out of the crate the way it went in. From that point on, packaging enters the cycle with the same instructions as any other operation, and its repeatability counts as much as that of the finish. Whoever packs follows a sheet, not their memory: materials, sequence and restraint points are written down, and changing them requires a new test, not a decision taken on the spot.",
    ],
  },
  "lavorazioni-meccaniche": {
    sommario:
      "Cutting, drilling, milling, turning, bending: the geometry of the piece takes shape here, and with it the quality of the surface that will be finished.",
    cosaServe: [
      "A dimensioned drawing with the tolerances that actually matter",
      "Material and starting section, if already defined",
      "Which surfaces are visible, so they can be protected during machining",
    ],
    corpo: [
      "Machining is the phase where the material takes the shape of the drawing: cutting to length, drilling, tapping, milling, turning, bending and rolling of profiles. In high-end furniture these operations have a particularity that sets them apart from industrial engineering: almost every machined surface will remain visible, so the quality of the cut and of the chip is not only a dimensional matter — it is already an aesthetic one.",
      "Brass machines well but it is soft: it marks, it takes an impression, and a badly chosen clamping arrangement leaves a print that no later finish fully recovers. So we always work on two levels at once — how to hold the piece in tolerance and how not to damage it while holding it. Protected jaws, clean supports, an order of operations designed to reduce repositioning: none of this appears on the drawing, and all of it decides the outcome.",
      "Tolerances are concentrated where they are needed. A piece of furniture does not need everything to be tight: it needs the interfaces to be precise — where components mate, where a screw goes, where a glass or a top rests. Stating which dimensions are critical, and which are not, is the most effective way of keeping cost where it belongs.",
      "Bending deserves a note of its own, because it is irreversible and because it works on the outer surface: the radius is chosen for the material and the thickness, and on a satin finish the direction of the bend relative to the grain changes the visual result. This too is decided beforehand, not after.",
      "The phase ends with a set of components ready to be joined: cut to size, deburred, with visible surfaces protected and with the references that welding and assembly will need already on the piece. Burrs are removed before the finish and not after, because a live edge cuts whoever assembles it and, under paint, leaves a dark line that shows the moment light catches it sideways.",
    ],
  },
  saldatura: {
    sommario:
      "Joining without it showing: on a visible piece, a good weld is one that, once dressed, no longer exists.",
    cosaServe: [
      "Which joints must remain invisible",
      "Structural requirements of the piece (load, cantilevers, fixing points)",
      "The intended finish: it decides how far the weld has to be dressed",
    ],
    corpo: [
      "In furniture fabrication welding has a constraint that structural steelwork does not: it has to hold and it must not show. On an object that will be burnished or left clear, the bead cannot simply be covered — it has to be dressed, brought back to level and blended until the surface is continuous again, because every discontinuity reacts to chemical treatment differently from the surrounding metal and reappears as a shadow.",
      "The process is chosen for the material, the thickness and the position of the joint. On brass and copper heat input has to be watched closely: these materials conduct heat very quickly, tend to distort and can oxidise along the bead. A badly planned tacking sequence produces a piece that twists as it cools, and no amount of dressing straightens it without leaving marks.",
      "For that reason the geometry is held by fixtures and references: the piece is always positioned the same way, tacked in a set order, and completed by alternating sides to balance distortion. On repeat runs, the welding fixture is what makes the tenth piece the same as the first.",
      "After welding comes dressing: grinding, levelling and blending of the bead, then re-homogenising the surface with the same operation as the rest of the piece — satin in the same direction, brushing, sandblasting. It is the longest phase and the least visible in the final result, and it is exactly where a well-made piece shows itself.",
      "How far the dressing is taken depends on the chosen finish: under an opaque paint there is more margin, under a clear coat there is almost none. This is why the finish enters the conversation at design stage, and why the shop wants to know it before welding rather than after. Where an invisible joint would cost too much, the alternative is to declare it: a joint designed to be seen, aligned and regular, is a detail; a joint badly hidden is a defect.",
    ],
  },
  "brunitura-e-ossidazione": {
    sommario:
      "The colour is born from a chemical reaction in the metal: it is not a layer laid on top, it is the surface itself changing.",
    cosaServe: [
      "An approved reference sample, or the finish family you want",
      "Whether the pieces will sit side by side (it changes how the batch is handled)",
      "Number of pieces, and whether repeat orders are expected",
    ],
    corpo: [
      "Burnishing and oxidation are chemical conversion treatments: the surface of the metal reacts and changes colour in depth instead of receiving a pigment. The difference shows immediately on an edge — a burnished piece, when worn, still shows metal, not paint flaking off.",
      "The result depends on three things that have to be held together: the starting alloy, the preparation of the surface and the contact time. The alloy decides the range of tone available: the same treatment on brasses with different copper content gives different colours, which is why a sample must always be re-checked on the actual material of the order. Preparation decides evenness: a trace of grease or a fingerprint leaves a mark that only appears once the reaction has happened. Time decides depth: the same products take you from light brown to black, passing through the warm intermediate tones.",
      "The families of the range come from this. Clouded finishes are obtained by applying the product with a pad in a deliberately uneven way, so the tone gathers into patches. Deep oxidised finishes work on long contact times. Graded finishes need a continuous spread in a single pass, because every restart leaves a step. Aged finishes add a mechanical pass after the reaction, which brings the raised areas back into the light as wear would.",
      "Variation is part of the result, but it has to be governed. For pieces that will sit side by side it is best to run the whole order in the same cycle and the same bath, and to keep a control sample for the batch: two identical pieces produced months apart can differ, and saying so beforehand avoids a dispute afterwards.",
      "Once the reaction is complete the surface has to be stopped and protected, normally with a matt clear coat or, where requested, with wax. Without protection the oxidation continues, and a piece delivered today is no longer the same piece six months later.",
    ],
  },
  "verniciatura-a-liquido": {
    sommario:
      "From the clear coat that protects a burnished surface to a marble effect drawn by hand: the liquid paint cycle closes almost every finish in the range.",
    cosaServe: [
      "The finish or sample code (e.g. MA-04)",
      "The gloss level you want: matt, satin or gloss",
      "Whether the piece is for indoor use or for particular conditions",
    ],
    corpo: [
      "Liquid painting has two different roles in this cycle. The first is protective: it is the clear coat that stops an oxidation and preserves it over time, and that on a clear or satin finish is the only layer between the metal and the air. The second is decorative: it is the technique used to build marble effects and textured finishes, where the colour does not come from the metal but is drawn on top of it.",
      "In both cases the result is decided in the preparation. The surface has to be clean, degreased and even: any residue becomes a visible defect, and under a clear coat there is nothing to conceal it. Where needed, a primer is applied to even out absorption and give adhesion; the choice of primer changes with the metal and with the intended appearance.",
      "Marble effects are hand work in several stages. The ground is laid, the veins are drawn with a fine brush or a sponge, the contrasts are adjusted, and a clear coat fixes the drawing and sets the gloss level. Every piece is drawn individually: on surfaces that meet, continuity and direction of the veining have to be agreed in advance, because they are a design decision and not an execution detail.",
      "Gloss level has to be stated explicitly. Matt, satin and gloss change the perception of the same colour radically: a matt black absorbs light and flattens volume, the same black in gloss returns every reflection in the room and shows every ripple in the sheet. Neither is better in absolute terms; what matters is which one suits the piece and the place it will stand in.",
      "Before delivery the surface is inspected in raking light, which is how defects actually reveal themselves: from there the piece goes to assembly or straight to packing, where the first rule is not to touch it more than necessary.",
    ],
  },
  assemblaggio: {
    sommario:
      "Finished components become the piece the client will see: assembly happens on already-finished surfaces, and nothing can be corrected any more.",
    cosaServe: [
      "Bill of components and assembly scheme",
      "Hardware and components supplied by the client, if any",
      "Whether the piece is delivered assembled or knocked down",
    ],
    corpo: [
      "Assembly is the last phase in which the piece takes shape, and the first in which a mistake cannot be undone: the work is on already-finished components, where a tool that slips or a dirty bench means redoing the finish, not touching it up. That is why assembly is prepared — protected benches, gloves, dedicated tooling, a defined sequence — rather than improvised on the day.",
      "Assembly follows the scheme set during engineering: which components go together first, which screws are torqued, where adjustment elements are needed to take up the tolerances of the piece and of the place it will be installed in. In bespoke furniture the second part matters as much as the first: a perfect structure with no way of being adjusted on site becomes somebody else's problem.",
      "This is also where hardware comes together, often supplied in part by the client: hinges, runners, fixing systems, electrical components when the piece is lit. They are checked for compatibility and function before closing up, because dismantling an assembled piece to replace a component puts it at risk again.",
      "Inspection at this stage is both functional and visual. Functional: everything that moves moves as it should, everything that fastens holds. Visual: visible surfaces are examined in raking light, checking alignments, the gaps between components and the continuity of the finish between different pieces that will stand next to each other after installation.",
      "The last decision is whether the piece leaves assembled or knocked down. A large object delivered assembled reduces work on site but increases transport risk and packaging cost; knocked down is safer but needs clear instructions and identified components. It is a decision to take with the client, before the piece reaches the packing area. For pieces that leave knocked down, a trial assembly in the workshop remains compulsory: everything is checked for fit, then dismantled with the components already identified for site.",
    ],
  },
  imballaggio: {
    sommario:
      "The final packaging is the one tested at prototype stage: materials compatible with the finish, pieces restrained, opening made obvious.",
    cosaServe: [
      "Delivery address and method (site, warehouse, forwarder)",
      "Marking and labelling requirements of the consignee",
      "Whether sea freight packaging or long storage is needed",
    ],
    corpo: [
      "Packing carries out what packaging prototyping established: it is not something improvised at the end of the cycle but an operation with defined materials, a defined sequence and checks of its own. On pieces with a visible finish it is also the last chance to look at the product before it disappears into a crate.",
      "The materials in contact come first. Every surface has its incompatibilities: adhesive films that leave residue on fresh paint, foams that emboss soft surfaces, papers that hold moisture. The shop rule is simple — whatever touches the piece must have been tested on that finish, not generically considered protective.",
      "Then there is mechanical restraint. The piece must not move inside the packaging: damage does not come from a single impact but from micro-vibration repeated over hundreds of kilometres, which wears the protection away exactly at the bearing points. Restraint goes on the points that carry load, never on visible surfaces, and the weight is distributed so the package can be stacked if the shipment requires it.",
      "Good packaging also tells you how it opens. This way up, lifting points, the order in which components come out, a list of what is inside: on site the person opening is almost never the person who ordered, and an ambiguous opening causes more damage than an awkward journey. Where pieces leave knocked down, component identification and assembly documentation travel with the package.",
      "The final check is that what has been packed matches what was ordered, package by package. It is a mundane step and it remains the most effective way of avoiding the worst phone call: the one where a piece is missing from an installation that has already started. The count is done by two people, against a written list, and it closes the order: from there the piece is no longer in the shop's hands, and it is the last moment when a mistake still costs little.",
    ],
  },
  trasporto: {
    sommario:
      "Delivery is part of the order: agreed dates, the right vehicle for the piece, and documents that arrive with the goods.",
    cosaServe: [
      "Requested delivery date and time window",
      "Conditions at the unloading point (tail lift, access, hours)",
      "The site or warehouse reference the shipment should be addressed to",
    ],
    corpo: [
      "Transport closes the cycle and inherits all of its risk: a piece machined, finished and packed with care can be compromised in an hour of badly organised travel. That is why shipping is planned together with production and not afterwards, taking account of how bulky the piece is, how it has been packed and where it has to arrive.",
      "The vehicle is chosen for the piece. A load of palletised, stackable components travels on different logic from a single two-metre element that cannot be laid down. The type of vehicle changes, so does the way it is stowed, the restraint inside the body and sometimes the need for a tail lift at unloading. This is information to have beforehand: discovering at delivery that the site has no way of unloading means sending the goods back, with all the handling risk that implies.",
      "The second variable is time. In bespoke furniture, deliveries are almost always tied to an installation on site, where every day has a cost that is not the cost of transport. An agreed date that is kept is worth more than a fast but uncertain delivery, and when something slips the useful thing is to know in advance, not on the day.",
      "Documents travel with the goods: delivery note, package list, component identification for knocked-down pieces, assembly instructions where needed. Goods that arrive without usable documentation stand still, and that delay is paid for on site.",
      "On delivery the check is on the integrity of the packages and on their correspondence with the order: any damage must be recorded immediately, because documented at that moment it gets resolved, and discovered later it becomes an argument. If the piece arrives as it left, the whole cycle has worked — from design engineering to the crate opened on site. And that is the only verification that really counts: everything decided in design, welded, burnished, painted and packed exists only if it arrives intact.",
    ],
  },
};
