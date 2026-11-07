/**
 * ConstructedHeading.tsx
 * Level 2 Micro-Construction Component: Card Heading.
 * An arrow sweeps across horizontally, painting the heading text with glowing stroke.
 */

import React, { useRef, useState, useEffect } from 'react';
import { useConstruction } from './ConstructionContext';
import { ArrowTaskManager } from './ArrowTaskManager';

export interface ConstructedHeadingProps {
  id: string;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  accentColor?: string;
  className?: string;
}

export const ConstructedHeading: React.FC<ConstructedHeadingProps> = ({
  id,
  children,
  as: Component = 'h3',
  accentColor = '#D6B36A',
  className = '',
}) => {
  const { isParentActive, activeChildIndex, registerChild, notifyChildComplete } = useConstruction();
  const [childIndex, setChildIndex] = useState<number>(-1);
  const [stage, setStage] = useState<'hidden' | 'painting' | 'revealed'>('hidden');
  const [paintProgress, setPaintProgress] = useState<number>(0);
  const hasTriggeredRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idx = registerChild(id);
    setChildIndex(idx);
  }, [id, registerChild]);

  // Global instant reveal listener
  useEffect(() => {
    const handleInstant = () => {
      hasTriggeredRef.current = true;
      setStage('revealed');
      setPaintProgress(1);
      notifyChildComplete(id, childIndex);
    };
    window.addEventListener('construct-all-regions', handleInstant);
    return () => window.removeEventListener('construct-all-regions', handleInstant);
  }, [id, childIndex, notifyChildComplete]);

  // Painting sweep animation via 10-arrow pool
  useEffect(() => {
    if (
      isParentActive &&
      childIndex !== -1 &&
      activeChildIndex >= childIndex &&
      !hasTriggeredRef.current
    ) {
      hasTriggeredRef.current = true;
      setStage('painting');

      if (ArrowTaskManager.isTaskCompleted(`heading-${id}`)) {
        setStage('revealed');
        setPaintProgress(1);
        notifyChildComplete(id, childIndex);
        return;
      }

      ArrowTaskManager.registerTask({
        id: `heading-${id}`,
        targetId: id,
        type: 'text',
        getBounds: () => (containerRef.current ? containerRef.current.getBoundingClientRect() : null),
        priority: 700 - childIndex * 5,
        status: 'pending',
        assignedArrowId: null,
        onProgress: (p) => {
          setPaintProgress(p);
          if (p >= 1) {
            setStage('revealed');
          }
        },
        onComplete: () => {
          setStage('revealed');
          setPaintProgress(1);
          notifyChildComplete(id, childIndex);
        },
      });

      // Safety watchdog: Guarantee reveal within 800ms
      const safety = setTimeout(() => {
        setStage('revealed');
        setPaintProgress(1);
        notifyChildComplete(id, childIndex);
      }, 800);

      return () => clearTimeout(safety);
    }
  }, [isParentActive, activeChildIndex, childIndex, id, notifyChildComplete]);

  const p = Math.min(1, Math.max(0, paintProgress));
  const clipPathStyle =
    stage === 'revealed'
      ? 'none'
      : stage === 'hidden'
      ? 'inset(0 100% 0 0)'
      : `inset(0 ${(100 - p * 100).toFixed(1)}% 0 0)`;

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Real Heading */}
      <Component
        id={`heading-${id}`}
        data-constructed-heading={id}
        className={`font-heading font-extrabold text-[#F5F0E6] transition-opacity ${
          stage === 'hidden' ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        style={{
          clipPath: clipPathStyle,
          WebkitClipPath: clipPathStyle,
        }}
      >
        {children}
      </Component>

      {/* Paint Arrow Head at the sweep frontier */}
      {stage === 'painting' && (
        <div
          className="absolute top-0 bottom-0 pointer-events-none z-10 flex items-center"
          style={{ left: `${p * 100}%`, transform: 'translateX(-50%)' }}
        >
          <div
            className="w-0.5 h-full"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 0 8px ${accentColor}`,
            }}
          />
          <svg width="12" height="12" viewBox="0 0 12 12" className="overflow-visible -ml-1">
            <polygon points="0,2 10,6 0,10 3,6" fill="#F5F0E6" filter={`drop-shadow(0 0 4px ${accentColor})`} />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ConstructedHeading;
