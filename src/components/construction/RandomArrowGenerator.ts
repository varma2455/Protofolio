/**
 * RandomArrowGenerator.ts
 * Seeded generative arrow parameter engine for VARMA.DEV.
 * Provides deterministic, visually balanced trajectories, palettes,
 * shapes, and timings for boundary tracing and text painting arrows.
 */

export type ArrowEdge =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type ArrowShape = 'stealth' | 'chevron' | 'plasma' | 'needle';

export interface ArrowTrajectoryParams {
  id: string;
  shape: ArrowShape;
  color: string;
  glowColor: string;
  secondaryColor: string;
  entryEdge: ArrowEdge;
  exitEdge: ArrowEdge;
  entryDuration: number;
  drawDuration: number;
  exitDuration: number;
  sweepDirection: 'ltr' | 'rtl' | 'ttb' | 'diagonal';
  curveCurvature: number; // Curve bend factor for entrance/exit
  scale: number;
}

// Seeded PRNG using hash of string
function hashString(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PALETTES = [
  { primary: '#00E5FF', glow: 'rgba(0, 229, 255, 0.55)', secondary: '#6C63FF' }, // Electric Cyan
  { primary: '#6C63FF', glow: 'rgba(108, 99, 255, 0.55)', secondary: '#00E5FF' }, // Electric Violet
  { primary: '#A855F7', glow: 'rgba(168, 85, 247, 0.55)', secondary: '#38BDF8' }, // Neon Purple
  { primary: '#38BDF8', glow: 'rgba(56, 189, 248, 0.55)', secondary: '#A855F7' }, // Ice Blue
  { primary: '#10B981', glow: 'rgba(16, 185, 129, 0.55)', secondary: '#00E5FF' }, // Neon Emerald
];

const EDGES: ArrowEdge[] = [
  'top',
  'bottom',
  'left',
  'right',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

const SHAPES: ArrowShape[] = ['stealth', 'chevron', 'plasma', 'needle'];

export function generateArrowParams(
  id: string,
  phase: 'boundary' | 'paint' = 'boundary'
): ArrowTrajectoryParams {
  const seed = hashString(`${id}-${phase}`);
  const rand = seededRandom(seed);

  // Palette
  const paletteIdx = Math.floor(rand() * PALETTES.length);
  const palette = PALETTES[paletteIdx];

  // Entry and Exit edges
  let entryIdx = Math.floor(rand() * EDGES.length);
  // Ensure paint phase enters from a different edge than boundary
  if (phase === 'paint') {
    entryIdx = (entryIdx + 3) % EDGES.length;
  }
  const entryEdge = EDGES[entryIdx];

  // Exit edge must be different from entry
  let exitIdx = (entryIdx + 2 + Math.floor(rand() * 4)) % EDGES.length;
  const exitEdge = EDGES[exitIdx];

  const shape = SHAPES[Math.floor(rand() * SHAPES.length)];

  // Sweeps:
  const sweeps: ('ltr' | 'rtl' | 'ttb' | 'diagonal')[] = ['ltr', 'diagonal', 'ltr', 'diagonal'];
  const sweepDirection = sweeps[Math.floor(rand() * sweeps.length)];

  return {
    id: `${id}-${phase}`,
    shape,
    color: palette.primary,
    glowColor: palette.glow,
    secondaryColor: palette.secondary,
    entryEdge,
    exitEdge,
    entryDuration: 0.55 + rand() * 0.25,
    drawDuration: phase === 'boundary' ? 0.9 + rand() * 0.35 : 0.85 + rand() * 0.3,
    exitDuration: 0.4 + rand() * 0.2,
    sweepDirection,
    curveCurvature: 0.2 + rand() * 0.3,
    scale: 0.9 + rand() * 0.25,
  };
}
