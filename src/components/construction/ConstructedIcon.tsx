/**
 * ConstructedIcon.tsx
 * Level 2 Micro-Construction Component: Icon Container & Glowing Icon.
 * An arrow traces the icon container's micro-border, then reveals the glowing icon inside.
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { useConstruction } from './ConstructionContext';
import { generateArrowParams } from './RandomArrowGenerator';

export interface ConstructedIconProps {
  id: string;
  icon: React.FC<{ size?: number; className?: string }>;
  size?: number;
  color?: string;
  className?: string;
  containerSize?: number;
}

export const ConstructedIcon: React.FC<ConstructedIconProps> = ({
  id,
  icon: IconComponent,
  size = 18,
  color = '#D6B36A',
  className = '',
  containerSize = 38,
}) => {
  const { isParentActive, activeChildIndex, registerChild, notifyChildComplete } = useConstruction();
  const [childIndex, setChildIndex] = useState<number>(-1);
  const [stage, setStage] = useState<'hidden' | 'drawing' | 'revealed'>('hidden');
  const [drawProgress, setDrawProgress] = useState<number>(0);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const idx = registerChild(id);
    setChildIndex(idx);
  }, [id, registerChild]);

  // Global instant reveal listener
  useEffect(() => {
    const handleInstant = () => {
      hasTriggeredRef.current = true;
      setStage('revealed');
      setDrawProgress(1);
      notifyChildComplete(id, childIndex);
    };
    window.addEventListener('construct-all-regions', handleInstant);
    return () => window.removeEventListener('construct-all-regions', handleInstant);
  }, [id, childIndex, notifyChildComplete]);

  const arrowParams = useMemo(() => {
    return generateArrowParams(id, 'boundary');
  }, [id]);

  useEffect(() => {
    if (
      isParentActive &&
      childIndex !== -1 &&
      activeChildIndex >= childIndex &&
      !hasTriggeredRef.current
    ) {
      hasTriggeredRef.current = true;
      setStage('drawing');

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        setStage('revealed');
        setDrawProgress(1);
        notifyChildComplete(id, childIndex);
        return;
      }

      const obj = { p: 0 };
      gsap.to(obj, {
        p: 1,
        duration: 0.35,
        ease: 'power1.inOut',
        onUpdate: () => setDrawProgress(obj.p),
        onComplete: () => {
          setStage('revealed');
          notifyChildComplete(id, childIndex);
        },
      });

      // Safety watchdog: Guarantee reveal within 500ms
      const safety = setTimeout(() => {
        setStage('revealed');
        setDrawProgress(1);
        notifyChildComplete(id, childIndex);
      }, 500);

      return () => clearTimeout(safety);
    }
  }, [isParentActive, activeChildIndex, childIndex, id, notifyChildComplete]);

  const perimeter = containerSize * 4;
  const strokeDashoffset = perimeter * (1 - drawProgress);

  return (
    <div
      id={`icon-${id}`}
      data-constructed-icon={id}
      className={`relative inline-flex items-center justify-center rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)] overflow-visible ${className}`}
      style={{
        width: containerSize,
        height: containerSize,
      }}
    >
      {/* SVG Tracer */}
      <svg
        width={containerSize}
        height={containerSize}
        className="absolute inset-0 overflow-visible pointer-events-none"
      >
        <rect
          x="1"
          y="1"
          width={containerSize - 2}
          height={containerSize - 2}
          rx="10"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray={perimeter}
          strokeDashoffset={stage === 'revealed' ? 0 : strokeDashoffset}
          strokeLinecap="round"
          opacity={stage === 'hidden' ? 0 : 0.9}
          filter={`drop-shadow(0 0 4px ${color})`}
        />
        {stage === 'drawing' && (
          <circle
            cx={drawProgress * containerSize}
            cy="1"
            r="2.5"
            fill="#FFFFFF"
            filter={`drop-shadow(0 0 4px ${color})`}
          />
        )}
      </svg>

      {/* Real Icon revealed in wake */}
      <div
        className={`transition-all duration-300 ${
          stage === 'revealed' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{ color }}
      >
        <IconComponent size={size} />
      </div>
    </div>
  );
};

export default ConstructedIcon;
