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
  accentColor = '#00E5FF',
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
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
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

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setStage('active');
      setBoundaryProgress(1);
      if (onComplete) onComplete();
      return;
    }

    const { width, height } = dimensions;
    const r = Math.min(borderRadius, width / 2 || 20, height / 2 || 20);
    const startX = r;
    const startY = 0;

    const entrance = getOffscreenCoord(arrowParams.entryEdge);
    const exit = getOffscreenCoord(arrowParams.exitEdge);

    const tl = gsap.timeline({
      onComplete: () => {
        setStage('active');
        setArrowPos(null);
        if (onComplete) onComplete();
      },
    });

    // 1. Entrance: Arrow flies from off-screen to container boundary
    tl.add(() => setStage('entrance'));
    const arrowObj = { x: entrance.x, y: entrance.y };
    tl.to(arrowObj, {
      x: startX,
      y: startY,
      duration: arrowParams.entryDuration,
      ease: 'power2.out',
      onUpdate: () => {
        const angle = Math.atan2(startY - arrowObj.y, startX - arrowObj.x) * (180 / Math.PI);
        setArrowPos({ x: arrowObj.x, y: arrowObj.y, angle });
      },
    });

    // 2. Drawing: Arrow physically traces outer container perimeter
    tl.add(() => {
      setStage('drawing');
      setArrowPos(null);
    });

    const drawObj = { p: 0 };
    tl.to(drawObj, {
      p: 1,
      duration: arrowParams.drawDuration,
      ease: 'power1.inOut',
      onUpdate: () => {
        setBoundaryProgress(drawObj.p);
      },
    });

    // 3. Exit: Arrow accelerates and leaves the viewport
    tl.add(() => setStage('exit'));
    const exitObj = { x: startX, y: startY };
    tl.to(exitObj, {
      x: exit.x,
      y: exit.y,
      duration: arrowParams.exitDuration,
      ease: 'power3.in',
      onUpdate: () => {
        const angle = Math.atan2(exit.y - exitObj.y, exit.x - exitObj.x) * (180 / Math.PI);
        setArrowPos({ x: exitObj.x, y: exitObj.y, angle });
      },
    });
  }, [stage, dimensions, borderRadius, arrowParams, getOffscreenCoord, onComplete]);

  // Listen for trigger event
  useEffect(() => {
    const handleTrigger = (e: any) => {
      if (e?.detail?.id === id || e?.detail?.sectionId === id || e?.detail?.id === 'all') {
        startConstruction();
      }
    };

    window.addEventListener(`start-section-${id}` as any, handleTrigger);
    window.addEventListener(`construct-section-${id}` as any, handleTrigger);
    window.addEventListener('construct-all-regions' as any, handleTrigger);

    return () => {
      window.removeEventListener(`start-section-${id}` as any, handleTrigger);
      window.removeEventListener(`construct-section-${id}` as any, handleTrigger);
      window.removeEventListener('construct-all-regions' as any, handleTrigger);
    };
  }, [id, startConstruction]);

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
                fill="#FFFFFF"
                filter={`drop-shadow(0 0 6px ${arrowParams.color})`}
              />
              <circle cx="2" cy="0" r="2.5" fill={arrowParams.color} />
              <circle cx="10" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      )}

      {/* Frame Header Telemetry Badge */}
      {frameTitle && isBoundaryDrawn && (
        <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#05060A] border border-white/10 text-[10px] font-mono text-slate-400 z-30 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
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
