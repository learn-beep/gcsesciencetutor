// GCSE Science: one codebase for the science home (sub = 'science') and the three subject sections.
// Facts about each subject live here; pages read the current subject from site.json.
import site from '../data/site.json';

export type Sub = 'biology' | 'chemistry' | 'physics';
export const SUBJECTS: { sub: Sub; name: string; code: string; letter: string; p1: string; p2: string; motif: string }[] = [
  { sub: 'biology', name: 'Biology', code: '8461', letter: 'B', p1: '4.1 to 4.4', p2: '4.5 to 4.7', motif: 'neuron' },
  { sub: 'chemistry', name: 'Chemistry', code: '8462', letter: 'C', p1: '4.1 to 4.5', p2: '4.6 to 4.10', motif: 'flask' },
  { sub: 'physics', name: 'Physics', code: '8463', letter: 'P', p1: '4.1 to 4.4', p2: '4.5 to 4.8', motif: 'circuit' },
];
export const SUB = (site as any).sub as Sub | 'science';
export const IS_HOME = SUB === 'science';
export const SUBJ = SUBJECTS.find((s) => s.sub === SUB) || SUBJECTS[0];
export const S = IS_HOME ? 'Science' : SUBJ.name;               // "Biology"
export const s = S.toLowerCase();                               // "biology"
export const SEP = SUBJ.code;                                   // "8461"
export const QUAL = `GCSE ${S}`;                                // "GCSE Biology"
export const TRI_PAPER = (n: 1 | 2) => `8464/${SUBJ.letter}/${n}H`;
export const AQA_SEP = `https://www.aqa.org.uk/subjects/${SUBJ.sub}/gcse/${SUBJ.sub}-${SUBJ.code}/assessment-resources`;
export const AQA_TRI = 'https://www.aqa.org.uk/subjects/science/gcse/combined-science-trilogy-8464/assessment-resources';

// Paper content: separate science paper 1 and paper 2 sections.
export const PAPER_SECTIONS: Record<Sub, { p1: string[]; p2: string[] }> = {
  biology: { p1: ['4.1', '4.2', '4.3', '4.4'], p2: ['4.5', '4.6', '4.7'] },
  chemistry: { p1: ['4.1', '4.2', '4.3', '4.4', '4.5'], p2: ['4.6', '4.7', '4.8', '4.9', '4.10'] },
  physics: { p1: ['4.1', '4.2', '4.3', '4.4'], p2: ['4.5', '4.6', '4.7', '4.8'] },
};
export const paperOf = (code: string) => (PAPER_SECTIONS[SUBJ.sub].p1.includes(code.split('.').slice(0, 2).join('.')) ? 1 : 2);

// Required practicals: separate-science number, name, whether it is in Combined Science (and its Trilogy number),
// and what the written papers ask about it. Written by the site from the specification and the mark schemes; being checked by our tutor.
export type RP = { code: string; name: string; tri: number | null; asks: string };
export const PRACTICALS: Record<Sub, RP[]> = {
  biology: [
    { code: 'RP1', name: 'Microscopy', tri: 1, asks: 'Use a light microscope to view and draw cells, with a scale bar. Papers ask for the order of objective lenses, staining, calculating magnification (image size ÷ real size) and converting between mm and µm.' },
    { code: 'RP2', name: 'Microbiology: effect of antiseptics or antibiotics on bacterial growth', tri: null, asks: 'Aseptic technique, incubation at 25 °C, measuring clear zones and calculating their area with πr². Papers ask why lids are taped but not sealed and why the loop is flamed.' },
    { code: 'RP3', name: 'Osmosis in plant tissue', tri: 2, asks: 'Potato cylinders in a range of sugar or salt concentrations; percentage change in mass; plotting it against concentration and reading off where the line crosses zero. Papers ask why the cylinders are blotted dry and why percentage change is used.' },
    { code: 'RP4', name: 'Food tests', tri: 3, asks: "Benedict's (reducing sugars, heat, blue to brick red), iodine (starch, orange to blue-black), biuret (protein, blue to purple), ethanol or Sudan III (lipids). Papers ask for the colour changes and the hazards." },
    { code: 'RP5', name: 'Effect of pH on amylase', tri: 4, asks: 'Starch and amylase at different pH with buffers, sampling into iodine every 30 seconds until it stays orange. Papers ask how to control temperature, how to work out the rate (1000 ÷ time) and why there is an optimum pH.' },
    { code: 'RP6', name: 'Light intensity and photosynthesis', tri: 5, asks: 'Pondweed and a lamp at different distances, counting bubbles or measuring gas volume. Papers ask about the inverse square law (light intensity ∝ 1/d²), keeping temperature constant and limiting factors.' },
    { code: 'RP7', name: 'Reaction time', tri: 6, asks: 'The ruler-drop test, repeated and averaged, before and after a factor such as caffeine. Papers ask about control variables, repeating and spotting anomalies.' },
    { code: 'RP8', name: 'Light or gravity and seedling growth', tri: null, asks: 'Germinating seedlings with light from one side or on their side, measuring the direction and length of growth. Papers ask about auxin and how to make the results valid.' },
    { code: 'RP9', name: 'Field investigations: quadrats and transects', tri: 7, asks: 'Random quadrats to estimate population size (mean per quadrat × area), and a transect to see how a species changes with a factor such as light. Papers ask how to place quadrats randomly and how many to use.' },
    { code: 'RP10', name: 'Temperature and the rate of decay', tri: null, asks: 'Milk, lipase and phenolphthalein at different temperatures, timing the colour change as fatty acids lower the pH. Papers ask why the rate rises then falls and how to keep the volumes the same.' },
  ],
  chemistry: [
    { code: 'RP1', name: 'Making a pure, dry sample of a soluble salt', tri: 8, asks: 'Add an excess of insoluble base or metal carbonate to warm acid, filter off the excess, evaporate and crystallise. Papers ask why excess is used, why you stop heating before it is dry, and the hazards.' },
    { code: 'RP2', name: 'Titration of a strong acid and a strong alkali', tri: null, asks: 'Pipette, burette, indicator, concordant results within 0.10 cm³. Papers ask for the colour change, why the burette is rinsed, and the concentration calculation (higher tier).' },
    { code: 'RP3', name: 'Electrolysis of aqueous solutions', tri: 9, asks: 'Inert electrodes in a salt solution; identifying the products and testing the gases. Papers ask why hydrogen forms at the cathode with a reactive metal and how to collect the gases.' },
    { code: 'RP4', name: 'Temperature changes in reactions', tri: 10, asks: 'A polystyrene cup with a lid, measuring the highest temperature as one reagent is added in portions. Papers ask why the cup is insulated, how to find the maximum from a graph and the effect of heat loss.' },
    { code: 'RP5', name: 'Rates of reaction', tri: 11, asks: 'Volume of gas collected over time, or the disappearing cross with sodium thiosulfate and acid. Papers ask about plotting a curve, the gradient as rate, a tangent (higher tier) and the effect of concentration.' },
    { code: 'RP6', name: 'Chromatography', tri: 12, asks: 'Pencil start line, solvent below the line, Rf = distance moved by the spot ÷ distance moved by the solvent. Papers ask why pencil is used and how to identify a pure substance (one spot).' },
    { code: 'RP7', name: 'Identifying ions', tri: null, asks: 'Flame tests, sodium hydroxide for metal ions (precipitate colours), and tests for carbonate, halide and sulfate ions. Papers ask for the colours and why nitric acid comes before silver nitrate.' },
    { code: 'RP8', name: 'Water purification and analysis', tri: 13, asks: 'Test the pH, find the mass of dissolved solids by evaporation, and distil salty water. Papers ask how to check the water is pure (boiling point 100 °C) and why the condenser is cooled.' },
  ],
  physics: [
    { code: 'RP1', name: 'Specific heat capacity', tri: 14, asks: 'An insulated block with a heater, joulemeter (or V × I × t) and thermometer. c = ΔE ÷ (m Δθ) from the gradient of temperature against energy. Papers ask about insulation, heat loss and why the temperature keeps rising after the heater is off.' },
    { code: 'RP2', name: 'Thermal insulation', tri: null, asks: 'Beakers of hot water wrapped in different materials or thicknesses, temperature recorded over time. Papers ask about control variables and reading a cooling curve.' },
    { code: 'RP3', name: 'Resistance of a wire and of circuits', tri: 15, asks: 'Ammeter in series, voltmeter in parallel, R = V ÷ I for lengths of wire, then resistors in series and parallel. Papers ask about the wire heating up and the zero error at the crocodile clip.' },
    { code: 'RP4', name: 'I–V characteristics', tri: 16, asks: 'A variable resistor or power supply to vary the current through a resistor, filament lamp and diode, reversing the supply for negative values. Papers ask for the shape of each graph and why the lamp’s resistance rises.' },
    { code: 'RP5', name: 'Density', tri: 17, asks: 'Mass on a balance; volume from measurements for regular objects or a displacement (eureka) can for irregular ones. ρ = m ÷ V. Papers ask about reading the meniscus and the uncertainty in each measurement.' },
    { code: 'RP6', name: 'Force and extension of a spring', tri: 18, asks: 'Add masses, measure extension (not length) with a ruler and fiducial marker. Plot force against extension; the gradient is the spring constant up to the limit of proportionality.' },
    { code: 'RP7', name: 'Force, mass and acceleration', tri: 19, asks: 'A trolley pulled by hanging masses with light gates or ticker tape. Papers ask why masses are moved from the trolley to the hanger (constant total mass) and how to find acceleration.' },
    { code: 'RP8', name: 'Waves in a ripple tank and on a string', tri: 20, asks: 'Measure several wavelengths at once with a ruler and a strobe or photo; count waves for frequency; v = f λ. Papers ask why you measure across ten waves and how to make the waves visible.' },
    { code: 'RP9', name: 'Reflection and refraction of light', tri: null, asks: 'A ray box, slit and glass block or mirror, angles measured from the normal with a protractor. Papers ask why a thin ray is needed and how to mark the ray accurately.' },
    { code: 'RP10', name: 'Infrared radiation and surfaces', tri: 21, asks: 'A Leslie cube with matt black, shiny black, white and silver faces, measured with an infrared detector at the same distance. Papers ask which surface emits most and how to make it a fair test.' },
  ],
};

// Physics: the equations students must recall, and those given on AQA's equation sheet in the exam.
// Written by the site from the specification; being checked by our tutor. [equation, words, separate physics only, higher tier only]
export const RECALL: [string, string, boolean, boolean][] = [
  ['W = m g', 'weight = mass × gravitational field strength', false, false],
  ['W = F s', 'work done = force × distance (along the line of action of the force)', false, false],
  ['F = k e', 'force applied to a spring = spring constant × extension', false, false],
  ['M = F d', 'moment of a force = force × distance (normal to direction of force)', true, false],
  ['p = F / A', 'pressure = force normal to a surface ÷ area of that surface', true, false],
  ['s = v t', 'distance travelled = speed × time', false, false],
  ['a = Δv / t', 'acceleration = change in velocity ÷ time taken', false, false],
  ['F = m a', 'resultant force = mass × acceleration', false, false],
  ['p = m v', 'momentum = mass × velocity', false, true],
  ['Eₖ = ½ m v²', 'kinetic energy = 0.5 × mass × speed²', false, false],
  ['Eₚ = m g h', 'gravitational potential energy = mass × gravitational field strength × height', false, false],
  ['P = E / t', 'power = energy transferred ÷ time', false, false],
  ['P = W / t', 'power = work done ÷ time', false, false],
  ['efficiency = useful output energy ÷ total input energy', 'or useful power output ÷ total power input', false, false],
  ['Q = I t', 'charge flow = current × time', false, false],
  ['V = I R', 'potential difference = current × resistance', false, false],
  ['P = V I', 'power = potential difference × current', false, false],
  ['P = I² R', 'power = current² × resistance', false, false],
  ['E = P t', 'energy transferred = power × time', false, false],
  ['E = Q V', 'energy transferred = charge flow × potential difference', false, false],
  ['ρ = m / V', 'density = mass ÷ volume', false, false],
  ['v = f λ', 'wave speed = frequency × wavelength', false, false],
];
export const GIVEN: [string, string, boolean, boolean][] = [
  ['v² − u² = 2 a s', '(final velocity)² − (initial velocity)² = 2 × acceleration × distance', false, false],
  ['F = m Δv / Δt', 'force = mass × change in velocity ÷ time taken', true, true],
  ['Eₑ = ½ k e²', 'elastic potential energy = 0.5 × spring constant × extension²', false, false],
  ['ΔE = m c Δθ', 'change in thermal energy = mass × specific heat capacity × temperature change', false, false],
  ['T = 1 / f', 'period = 1 ÷ frequency', false, false],
  ['magnification = image height ÷ object height', '', true, false],
  ['F = B I l', 'force on a conductor in a magnetic field = magnetic flux density × current × length', false, true],
  ['E = m L', 'thermal energy for a change of state = mass × specific latent heat', false, false],
  ['Vₚ Iₚ = Vₛ Iₛ', 'potential difference × current across the primary coil = across the secondary coil (100% efficient transformer)', false, true],
  ['Vₚ / Vₛ = nₚ / nₛ', 'ratio of potential differences = ratio of turns (transformer)', true, false],
  ['p = h ρ g', 'pressure due to a column of liquid = height × density × gravitational field strength', true, true],
  ['p V = constant', 'pressure × volume, for a fixed mass of gas at constant temperature', true, false],
];

// Papers AQA has since taken off its website (the copies here are AQA's own PDFs from other sites).
export const WITHDRAWN: Record<Sub, string[]> = {
  biology: ['june-2018-8461-02', 'june-2019-8461-01', 'june-2019-8461-02'],
  chemistry: ['june-2019-8462-02'],
  physics: ['june-2018-8463-01', 'june-2019-8463-01', 'june-2019-8464-02'],
};
export const isWithdrawn = (slug: string) => (WITHDRAWN[SUBJ.sub] || []).includes(slug);
