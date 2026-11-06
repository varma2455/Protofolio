/**
 * Seeded deterministic Pseudo-Random Number Generator (PRNG)
 * Ensures generative arrow paths, lengths, and angles remain identical across reloads
 * while offering organic, balanced, and aesthetic compositions.
 */
export class SeededPRNG {
  private s: number;

  constructor(seed: number = 42) {
    this.s = seed % 2147483647;
    if (this.s <= 0) this.s += 2147483646;
  }

  // Generates next float between 0 (inclusive) and 1 (exclusive)
  public next(): number {
    this.s = (this.s * 16807) % 2147483647;
    return (this.s - 1) / 2147483646;
  }

  // Returns float in range [min, max)
  public range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  // Returns integer in range [min, max]
  public rangeInt(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1));
  }

  // Pick random element from array
  public pick<T>(arr: T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }

  // Boolean with probability p
  public chance(p: number = 0.5): boolean {
    return this.next() < p;
  }
}

export interface ArrowSpec {
  id: string;
  d: string; // SVG path data
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  length: number;
  color: string;
  glowColor: string;
  strokeWidth: number;
  delay: number;
  duration: number;
  hasArrowHead: boolean;
  arrowHeadAngle: number;
  type: 'straight' | 'curved' | 'orthogonal' | 'diagonal';
  targetElementId?: string;
  pulseSpeed?: number;
}

/**
 * Generates an SVG path string for a straight, diagonal, curved, or orthogonal arrow.
 */
export function generateArrowPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  type: 'straight' | 'curved' | 'orthogonal' | 'diagonal' = 'curved',
  curvature: number = 0.3
): { path: string; endAngle: number } {
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (type === 'straight' || type === 'diagonal') {
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return {
      path: `M ${x1} ${y1} L ${x2} ${y2}`,
      endAngle: angle,
    };
  }

  if (type === 'orthogonal') {
    // 90-degree circuit-like elbow path
    const midX = x1 + dx * 0.5;
    const angle = Math.atan2(y2 - y1, 0) * (180 / Math.PI);
    return {
      path: `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`,
      endAngle: Math.atan2(0, x2 - midX) * (180 / Math.PI),
    };
  }

  // Smooth quadratic or cubic bezier curve
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  // Perpendicular offset for curvature
  const perpX = -dy * curvature;
  const perpY = dx * curvature;
  const cpX = midX + perpX;
  const cpY = midY + perpY;

  // Tangent at end of quadratic bezier (derivative at t=1: 2*(P2 - P1))
  const endAngle = Math.atan2(y2 - cpY, x2 - cpX) * (180 / Math.PI);

  return {
    path: `M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`,
    endAngle,
  };
}
