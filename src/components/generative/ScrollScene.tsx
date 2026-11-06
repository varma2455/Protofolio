import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollSceneProps {
  id: string;
  children: (phaseState: {
    phase: 'A' | 'B' | 'C' | 'D' | 'E';
    progress: number;
    isArrowsActive: boolean;
    isColorActive: boolean;
    isTextActive: boolean;
  }) => React.ReactNode;
  triggerOffset?: string;
  scrub?: boolean | number;
  className?: string;
  onPhaseChange?: (phase: 'A' | 'B' | 'C' | 'D' | 'E') => void;
}

export const ScrollScene: React.FC<ScrollSceneProps> = ({
  id,
  children,
  triggerOffset = 'top 75%',
  scrub = false,
  className = '',
  onPhaseChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setPhase('E');
      setProgress(1);
      onPhaseChange?.('E');
      return;
    }

    const element = containerRef.current;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: triggerOffset,
      end: 'bottom 25%',
      onEnter: () => {
        // Sequentially advance through phases B -> C -> D -> E
        setPhase('B');
        onPhaseChange?.('B');

        const tl = gsap.timeline();
        tl.to({}, { duration: 0.4, onComplete: () => { setPhase('C'); onPhaseChange?.('C'); } });
        tl.to({}, { duration: 0.5, onComplete: () => { setPhase('D'); onPhaseChange?.('D'); } });
        tl.to({}, { duration: 0.6, onComplete: () => { setPhase('E'); onPhaseChange?.('E'); } });
      },
      onUpdate: (self) => {
        setProgress(self.progress);
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [id, triggerOffset, onPhaseChange]);

  const isArrowsActive = phase !== 'A';
  const isColorActive = phase === 'C' || phase === 'D' || phase === 'E';
  const isTextActive = phase === 'D' || phase === 'E';

  return (
    <div ref={containerRef} id={id} className={`relative scroll-scene ${className}`}>
      {children({
        phase,
        progress,
        isArrowsActive,
        isColorActive,
        isTextActive,
      })}
    </div>
  );
};

export default ScrollScene;
