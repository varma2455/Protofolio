/**
 * SectionRevealTimeline.tsx
 * Coordinates the sequential reveal of multiple content construction regions
 * within a single section. Ensures that elements construct in artistic succession:
 * Region 1: Arrow 1 draws -> Arrow 2 paints -> complete
 * Region 2: Arrow 1 draws -> Arrow 2 paints -> complete
 * Region 3: ...
 */

import React, { useEffect, useRef } from 'react';

export interface SectionRevealTimelineProps {
  sectionId: string;
  regionIds: string[];
  autoStart?: boolean;
  staggerDelay?: number;
  children: React.ReactNode;
  className?: string;
}

export const SectionRevealTimeline: React.FC<SectionRevealTimelineProps> = ({
  sectionId,
  regionIds,
  autoStart = false,
  staggerDelay = 120,
  children,
  className = '',
}) => {
  const currentIndexRef = useRef<number>(-1);
  const isStartedRef = useRef<boolean>(false);

  // Trigger next region in the sequence
  const triggerNextRegion = () => {
    currentIndexRef.current += 1;
    if (currentIndexRef.current < regionIds.length) {
      const nextId = regionIds[currentIndexRef.current];
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent(`construct-region-${nextId}`, {
            detail: { id: nextId, section: sectionId },
          })
        );
      }, staggerDelay);
    }
  };

  // Start sequence for this section
  const startSequence = () => {
    if (isStartedRef.current) return;
    isStartedRef.current = true;
    triggerNextRegion();
  };

  useEffect(() => {
    // Listen for completion of any region in this section
    const handleRegionComplete = (e: any) => {
      const currentRegionId = regionIds[currentIndexRef.current];
      if (e?.detail?.id === currentRegionId) {
        triggerNextRegion();
      }
    };

    // Listen for start trigger for this section
    const handleSectionStart = (e: any) => {
      if (e?.detail?.sectionId === sectionId || e?.detail?.sectionId === 'all') {
        startSequence();
      }
    };

    window.addEventListener('construction-region-complete' as any, handleRegionComplete);
    window.addEventListener(`start-section-${sectionId}` as any, handleSectionStart);
    window.addEventListener('start-all-sections' as any, handleSectionStart);

    if (autoStart) {
      const t = setTimeout(startSequence, 200);
      return () => clearTimeout(t);
    }

    return () => {
      window.removeEventListener('construction-region-complete' as any, handleRegionComplete);
      window.removeEventListener(`start-section-${sectionId}` as any, handleSectionStart);
      window.removeEventListener('start-all-sections' as any, handleSectionStart);
    };
  }, [sectionId, regionIds, autoStart, staggerDelay]);

  return <div className={`relative ${className}`}>{children}</div>;
};

export default SectionRevealTimeline;
