/**
 * ArrowConstructionSequence.ts
 * Coordinates timing, easing curves, velocities and trajectories for nested
 * box construction stages throughout VARMA.DEV.
 */

export interface SequenceConfig {
  borderDuration: number;
  entranceDuration: number;
  exitDuration: number;
  paintDuration: number;
  easeEntrance: string;
  easeDraw: string;
  easeExit: string;
}

export const SEQUENCE_PRESETS: Record<'section' | 'card' | 'micro' | 'text', SequenceConfig> = {
  section: {
    borderDuration: 0.9,
    entranceDuration: 0.45,
    exitDuration: 0.35,
    paintDuration: 0.8,
    easeEntrance: 'power2.out',
    easeDraw: 'power1.inOut',
    easeExit: 'power3.in',
  },
  card: {
    borderDuration: 0.65,
    entranceDuration: 0.35,
    exitDuration: 0.3,
    paintDuration: 0.55,
    easeEntrance: 'power2.out',
    easeDraw: 'power1.inOut',
    easeExit: 'power2.in',
  },
  micro: {
    borderDuration: 0.35,
    entranceDuration: 0.25,
    exitDuration: 0.25,
    paintDuration: 0.3,
    easeEntrance: 'power1.out',
    easeDraw: 'power1.inOut',
    easeExit: 'power2.in',
  },
  text: {
    borderDuration: 0.2,
    entranceDuration: 0.3,
    exitDuration: 0.25,
    paintDuration: 0.45,
    easeEntrance: 'power2.out',
    easeDraw: 'power1.inOut',
    easeExit: 'power2.in',
  },
};
