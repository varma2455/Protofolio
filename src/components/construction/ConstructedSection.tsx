/**
 * ConstructedSection.tsx
 * Level 0 Outer Container Construction Component for VARMA.DEV.
 * 
 * When section scrolls into view:
 * 1. Screen is empty/dark.
 * 2. An arrow enters the viewport from a random edge.
 * 3. It travels to the outer container boundary.
 * 4. It progressively traces the outer perimeter with a thin glowing cyan or violet stroke.
 * 5. Arrow exits the screen after completing the border.
 * 6. The outer container remains visible and activates inner card construction.
 */

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { generateArrowParams } from './RandomArrowGenerator';
import { ArrowBoundaryPainter } from './ArrowBoundaryPainter';
import { ConstructionProvider } from './ConstructionContext';
import { ArrowTaskManager } from './ArrowTaskManager';

export interface ConstructedSectionProps {
  id: string;
  children: React.ReactNode;
  accentColor?: string;
  borderRadius?: number;
  className?: string;
  frameTitle?: string;
  priority?: number;
  onComplete?: () => void;
}

export const ConstructedSection: React.FC<ConstructedSectionProps> = ({
  id,
  children,
  accentColor = '#D6B36A',
  borderRadius = 24,
  className = '',
  frameTitle,
  priority = 0,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [stage, setStage] = useState<'hidden' | 'entrance' | 'drawing' | 'exit' | 'active'>('hidden');
  const [boundaryProgress, setBoundaryProgress] = useState(0);
  const [arrowPos, setArrowPos] = useState<{ x: number; y: number; angle: number } | null>(null);

  const arrowParams = useMemo(() => {
    const params = generateArrowParams(id, 'boundary');
    params.color = accentColor;
    params.glowColor = `${accentColor}88`;
    params.drawDuration = 0.85;
    return params;
  }, [id, accentColor]);

  // Measure dimensions with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width || el.offsetWidth || 1100);
      const h = Math.round(rect.height || el.offsetHeight || 600);
      if (w > 0 && h > 0) {
        setDimensions({ width: w, height: h });
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Compute off-screen entrance / exit coordinates relative to container
  const getOffscreenCoord = useCallback((edge: string) => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;
    const rect = containerRef.current
      ? containerRef.current.getBoundingClientRect()
      : { left: 0, top: 0 };

    const margin = 160;
    let x = 0;
    let y = 0;

    switch (edge) {
      case 'left':
      case 'top-left':
      case 'bottom-left':
        x = -rect.left - margin;
        y = vh * 0.3 - rect.top;
        break;
      case 'right':
      case 'top-right':
      case 'bottom-right':
        x = vw - rect.left + margin;
        y = vh * 0.3 - rect.top;
        break;
      case 'top':
        x = vw * 0.5 - rect.left;
        y = -rect.top - margin;
        break;
      case 'bottom':
        x = vw * 0.5 - rect.left;
        y = vh - rect.top + margin;
        break;
      default:
        x = -rect.left - margin;
        y = -rect.top - margin;
    }

    return { x, y };
  }, []);

  const startConstruction = useCallback(() => {
    if (stage !== 'hidden') return;

    if (ArrowTaskManager.isTaskCompleted(`section-${id}`)) {
      setStage('active');
      setBoundaryProgress(1);
      if (onComplete) onComplete();
      return;
    }

    ArrowTaskManager.registerTask({
      id: `section-${id}`,
      targetId: id,
      type: 'boundary',
      getBounds: () => (containerRef.current ? containerRef.current.getBoundingClientRect() : null),
      borderRadius,
      priority: 1000,
      status: 'pending',
      assignedArrowId: null,
      onProgress: (p) => {
        setBoundaryProgress(p);
        if (p > 0 && p < 1) {
          setStage('drawing');
        } else if (p >= 1) {
          setStage('active');
        }
      },
      onComplete: () => {
        setStage('active');
        setBoundaryProgress(1);
        if (onComplete) onComplete();
      },
    });

    // Safety watchdog: Guarantee section activation within 2.5s
    const safety = setTimeout(() => {
      setStage('active');
      setBoundaryProgress(1);
      if (onComplete) onComplete();
    }, 2500);

    return () => clearTimeout(safety);
  }, [stage, id, borderRadius, onComplete]);

  // Listen for trigger event or viewport intersection
  useEffect(() => {
    const handleTrigger = (e: any) => {
      if (e?.type === 'construct-all-regions') {
        setStage('active');
        setBoundaryProgress(1);
        setArrowPos(null);
        if (onComplete) onComplete();
        return;
      }
      if (e?.detail?.id === id || e?.detail?.sectionId === id || e?.detail?.id === 'all') {
        startConstruction();
      }
    };

    window.addEventListener(`start-section-${id}` as any, handleTrigger);
    window.addEventListener(`construct-section-${id}` as any, handleTrigger);
    window.addEventListener('construct-all-regions' as any, handleTrigger);

    // Also observe intersection with viewport
    const el = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (el) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && stage === 'hidden' && dimensions.width > 0) {
              startConstruction();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    }

    return () => {
      window.removeEventListener(`start-section-${id}` as any, handleTrigger);
      window.removeEventListener(`construct-section-${id}` as any, handleTrigger);
      window.removeEventListener('construct-all-regions' as any, handleTrigger);
      if (observer) observer.disconnect();
    };
  }, [id, stage, dimensions.width, startConstruction]);

  const isBoundaryDrawing = stage === 'drawing';
  const isBoundaryDrawn = ['exit', 'active'].includes(stage);
  const isCompleted = stage === 'active';

  return (
    <div
      ref={containerRef}
      id={`section-container-${id}`}
      data-constructed-section={id}
      data-construction-stage={stage}
      className={`relative w-full rounded-[${borderRadius}px] transition-all duration-300 ${className}`}
      style={{
        borderRadius,
      }}
    >
      {/* Outer Boundary Painter SVG */}
      <ArrowBoundaryPainter
        width={dimensions.width}
        height={dimensions.height}
        progress={boundaryProgress}
        params={arrowParams}
        shape="rounded"
        borderRadius={borderRadius}
        isDrawing={isBoundaryDrawing}
        isCompleted={isBoundaryDrawn}
      />

      {/* Off-screen Flying Arrow Head during Entrance & Exit */}
      {arrowPos && (stage === 'entrance' || stage === 'exit') && (
        <div
          className="absolute inset-0 pointer-events-none overflow-visible z-40"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          <svg className="w-full h-full overflow-visible">
            <g transform={`translate(${arrowPos.x}, ${arrowPos.y}) rotate(${arrowPos.angle})`}>
              <circle cx="0" cy="0" r="10" fill={arrowParams.glowColor} />
              <polygon
                points="-10,-7 10,0 -10,7 -4,0"
                fill="#F5F0E6"
                filter={`drop-shadow(0 0 6px ${arrowParams.color})`}
              />
              <circle cx="2" cy="0" r="2.5" fill={arrowParams.color} />
              <circle cx="10" cy="0" r="1.5" fill="#F5F0E6" />
            </g>
          </svg>
        </div>
      )}

      {/* Frame Header Telemetry Badge */}
      {frameTitle && isBoundaryDrawn && (
        <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#14120F] border border-[rgba(214,179,106,0.20)] text-[10px] font-mono text-[#B9B2A5] z-30 flex items-center gap-2 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] animate-pulse" />
          <span>{frameTitle}</span>
        </div>
      )}

      {/* Inner Nested Children via ConstructionProvider */}
      <div
        className={`relative w-full z-10 transition-opacity duration-300 ${
          isBoundaryDrawn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ConstructionProvider
          id={id}
          isParentActive={isBoundaryDrawn}
          isParentCompleted={isCompleted}
          staggerDelay={120}
        >
          {children}
        </ConstructionProvider>
      </div>
    </div>
  );
};

export default ConstructedSection;
