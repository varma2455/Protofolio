/**
 * ConstructedDescription.tsx
 * Level 2 Micro-Construction Component: Card Description text.
 * Arrow sweeps across the text block, painting the muted gray description into view.
 */

import React, { useRef, useState, useEffect } from 'react';
import { useConstruction } from './ConstructionContext';
import { ArrowTaskManager } from './ArrowTaskManager';

export interface ConstructedDescriptionProps {
  id: string;
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
}

export const ConstructedDescription: React.FC<ConstructedDescriptionProps> = ({
  id,
  children,
  accentColor = '#B99555',
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

      if (ArrowTaskManager.isTaskCompleted(`desc-${id}`)) {
        setStage('revealed');
        setPaintProgress(1);
        notifyChildComplete(id, childIndex);
        return;
      }

      ArrowTaskManager.registerTask({
        id: `desc-${id}`,
        targetId: id,
        type: 'text',
        getBounds: () => (containerRef.current ? containerRef.current.getBoundingClientRect() : null),
        priority: 650 - childIndex * 5,
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
      <p
        id={`desc-${id}`}
        data-constructed-description={id}
        className={`font-sans text-[#B9B2A5] text-xs sm:text-sm leading-relaxed transition-opacity ${
          stage === 'hidden' ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        style={{
          clipPath: clipPathStyle,
          WebkitClipPath: clipPathStyle,
        }}
      >
        {children}
      </p>

      {/* Sweep frontier indicator */}
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
        </div>
      )}
    </div>
  );
};

export default ConstructedDescription;
