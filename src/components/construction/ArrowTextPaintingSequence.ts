/**
 * ArrowTextPaintingSequence.ts
 * Manages text painting animations across cards, headings, and descriptions.
 */

export interface TextPaintParams {
  id: string;
  charCount: number;
  duration: number;
  color: string;
}

export function computeTextPaintDuration(charCount: number): number {
  if (charCount <= 20) return 0.35;
  if (charCount <= 60) return 0.5;
  if (charCount <= 140) return 0.65;
  return 0.85;
}
