/**
 * RandomArrowGenerator.ts
 * Seeded generative arrow parameter engine for VARMA.DEV Midnight Navy Design System.
 * Uses refined champagne gold (#D6B36A) with warm bronze accents (#B99555).
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
  curveCurvature: number;
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

// Refined Obsidian Gold palette: Metallic Champagne Gold dominant with warm bronze-gold accents
const PALETTES = [
  { primary: '#D6B36A', glow: 'rgba(214, 179, 106, 0.25)', secondary: '#B99555' }, // Champagne Gold dominant
  { primary: '#E5C98A', glow: 'rgba(214, 179, 106, 0.28)', secondary: '#D6B36A' }, // Light Champagne Gold
  { primary: '#B99555', glow: 'rgba(185, 149, 85, 0.24)', secondary: '#D6B36A' }, // Warm Bronze Gold
  { primary: '#D6B36A', glow: 'rgba(214, 179, 106, 0.25)', secondary: '#E5C98A' }, // Dual Gold
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

  // Palette: Mostly cyan, occasional violet
  const paletteIdx = Math.floor(rand() * PALETTES.length);
  const palette = PALETTES[paletteIdx];

  // Entry and Exit edges
  let entryIdx = Math.floor(rand() * EDGES.length);
  if (phase === 'paint') {
    entryIdx = (entryIdx + 3) % EDGES.length;
  }
  const entryEdge = EDGES[entryIdx];

  let exitIdx = (entryIdx + 2 + Math.floor(rand() * 4)) % EDGES.length;
  const exitEdge = EDGES[exitIdx];

  const shape = SHAPES[Math.floor(rand() * SHAPES.length)];

  return {
    id: `${id}-${phase}`,
    shape,
    color: palette.primary,
    glowColor: palette.glow,
    secondaryColor: palette.secondary,
    entryEdge,
    exitEdge,
    entryDuration: 0.28 + rand() * 0.1,
    drawDuration: phase === 'boundary' ? 0.42 + rand() * 0.15 : 0.35 + rand() * 0.1,
    exitDuration: 0.2 + rand() * 0.08,
    sweepDirection: 'ltr',
    curveCurvature: 0.2 + rand() * 0.25,
    scale: 0.9 + rand() * 0.2,
  };
}
