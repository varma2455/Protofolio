/**
 * ContentConstructionRegion.tsx
 * The master construction block for VARMA.DEV.
 * Executes the complete 2-arrow lifecycle:
 * 1. Screen is empty/dark.
 * 2. Arrow 1 enters from outside the viewport, physically traces the container boundary,
 *    and dashes off-screen.
 * 3. Container boundary remains visible and empty.
 * 4. Arrow 2 enters from a different edge carrying glowing paint.
 * 5. Arrow 2 sweeps across interior, physically painting text and elements via moving clip-path.
 * 6. Arrow 2 dashes off-screen, leaving the content permanently visible and fully interactive.
 */

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { generateArrowParams, ArrowTrajectoryParams } from './RandomArrowGenerator';
import { ArrowBoundaryPainter } from './ArrowBoundaryPainter';
import { ArrowTextPainter } from './ArrowTextPainter';
import { PaintRevealText } from './PaintRevealText';

export type ConstructionStage =
  | 'hidden'
  | 'arrow1_entrance'
  | 'arrow1_drawing'
  | 'arrow1_exit'
  | 'boundary_empty'
  | 'arrow2_entrance'
  | 'arrow2_painting'
  | 'arrow2_exit'
  | 'revealed';

export interface ContentConstructionRegionProps {
  id: string;
  children: React.ReactNode;
  shape?: 'rounded' | 'rectangular' | 'chamfer';
  borderRadius?: number;
  accentColor?: string;
  minHeight?: number | string;
  className?: string;
  contentClassName?: string;
  autoTrigger?: boolean;
  triggerDelay?: number;
  priority?: number;
  onComplete?: () => void;
}

export const ContentConstructionRegion: React.FC<ContentConstructionRegionProps> = ({
  id,
  children,
  shape = 'rounded',
  borderRadius = 16,
  accentColor,
  minHeight,
  className = '',
  contentClassName = '',
  autoTrigger = false,
  triggerDelay = 0,
  priority = 0,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [stage, setStage] = useState<ConstructionStage>('hidden');

  // Animation values
  const [boundaryProgress, setBoundaryProgress] = useState(0);
  const [paintProgress, setPaintProgress] = useState(0);
  const [arrowPos, setArrowPos] = useState<{ x: number; y: number; angle: number } | null>(null);

  // Generate deterministic arrow params for this region
  const arrow1Params = useMemo(() => {
    const params = generateArrowParams(id, 'boundary');
    if (accentColor) {
      params.color = accentColor;
      params.glowColor = `${accentColor}88`;
    }
    return params;
  }, [id, accentColor]);

  const arrow2Params = useMemo(() => {
    return generateArrowParams(id, 'paint');
  }, [id]);

  // Measure dimensions with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Compute off-screen coordinates relative to container
  const getOffscreenCoord = useCallback((edge: string, r: number) => {
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
        y = vh * 0.4 - rect.top;
        break;
      case 'right':
      case 'top-right':
      case 'bottom-right':
        x = vw - rect.left + margin;
        y = vh * 0.4 - rect.top;
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

  // Main 2-Arrow Construction Timeline
  const startConstruction = useCallback(() => {
    if (stage !== 'hidden') return;

    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setStage('revealed');
      setBoundaryProgress(1);
      setPaintProgress(1);
      if (onComplete) onComplete();
      return;
    }

    const { width, height } = dimensions;
    const r = Math.min(borderRadius, width / 2 || 16, height / 2 || 16);
    const startPerimeterX = r;
    const startPerimeterY = 0;

    const entrance1 = getOffscreenCoord(arrow1Params.entryEdge, r);
    const exit1 = getOffscreenCoord(arrow1Params.exitEdge, r);
    const entrance2 = getOffscreenCoord(arrow2Params.entryEdge, r);
    const exit2 = getOffscreenCoord(arrow2Params.exitEdge, r);

    const tl = gsap.timeline({
      delay: triggerDelay,
      onComplete: () => {
        setStage('revealed');
        setArrowPos(null);
        if (onComplete) onComplete();
      },
    });

    // ==========================================
    // PHASE 1: ARROW 1 (Boundary Tracer)
    // ==========================================

    // 1A. Arrow 1 Entrance: Flies in from outside viewport to perimeter start
    tl.add(() => {
      setStage('arrow1_entrance');
    });

    const arrow1EntranceObj = { x: entrance1.x, y: entrance1.y };
    tl.to(arrow1EntranceObj, {
      x: startPerimeterX,
      y: startPerimeterY,
      duration: arrow1Params.entryDuration,
      ease: 'power2.out',
      onUpdate: () => {
        const angle =
          Math.atan2(startPerimeterY - arrow1EntranceObj.y, startPerimeterX - arrow1EntranceObj.x) *
          (180 / Math.PI);
        setArrowPos({ x: arrow1EntranceObj.x, y: arrow1EntranceObj.y, angle });
      },
    });

    // 1B. Arrow 1 Boundary Drawing: Traces the perimeter
    tl.add(() => {
      setStage('arrow1_drawing');
      setArrowPos(null); // Handed off to ArrowBoundaryPainter's native path follower
    });

    const boundaryObj = { progress: 0 };
    tl.to(boundaryObj, {
      progress: 1,
      duration: arrow1Params.drawDuration,
      ease: 'power1.inOut',
      onUpdate: () => {
        setBoundaryProgress(boundaryObj.progress);
      },
    });

    // 1C. Arrow 1 Exit: Accelerates and shoots off-screen
    tl.add(() => {
      setStage('arrow1_exit');
    });

    const arrow1ExitObj = { x: startPerimeterX, y: startPerimeterY };
    tl.to(arrow1ExitObj, {
      x: exit1.x,
      y: exit1.y,
      duration: arrow1Params.exitDuration,
      ease: 'power3.in',
      onUpdate: () => {
        const angle =
          Math.atan2(exit1.y - arrow1ExitObj.y, exit1.x - arrow1ExitObj.x) * (180 / Math.PI);
        setArrowPos({ x: arrow1ExitObj.x, y: arrow1ExitObj.y, angle });
      },
    });

    // 1D. Empty boundary state (brief breath)
    tl.add(() => {
      setStage('boundary_empty');
      setArrowPos(null);
    }, '+=0.08');

    // ==========================================
    // PHASE 2: ARROW 2 (Text Painter)
    // ==========================================

    // 2A. Arrow 2 Entrance: Flies in from a DIFFERENT edge
    tl.add(() => {
      setStage('arrow2_entrance');
    });

    const targetPaintStartX = 10;
    const targetPaintStartY = height * 0.2;
    const arrow2EntranceObj = { x: entrance2.x, y: entrance2.y };

    tl.to(arrow2EntranceObj, {
      x: targetPaintStartX,
      y: targetPaintStartY,
      duration: arrow2Params.entryDuration,
      ease: 'power2.out',
      onUpdate: () => {
        const angle =
          Math.atan2(
            targetPaintStartY - arrow2EntranceObj.y,
            targetPaintStartX - arrow2EntranceObj.x
          ) * (180 / Math.PI);
        setArrowPos({ x: arrow2EntranceObj.x, y: arrow2EntranceObj.y, angle });
      },
    });

    // 2B. Arrow 2 Painting Sweep: Sweeps across the interior, painting text
    tl.add(() => {
      setStage('arrow2_painting');
      setArrowPos(null); // Handed off to ArrowTextPainter's sweep
    });

    const paintObj = { progress: 0 };
    tl.to(paintObj, {
      progress: 1,
      duration: arrow2Params.drawDuration,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPaintProgress(paintObj.progress);
      },
    });

    // 2C. Arrow 2 Exit: Shoots off-screen into another direction
    tl.add(() => {
      setStage('arrow2_exit');
    });

    const arrow2ExitObj = { x: width - 10, y: height * 0.8 };
    tl.to(arrow2ExitObj, {
      x: exit2.x,
      y: exit2.y,
      duration: arrow2Params.exitDuration,
      ease: 'power3.in',
      onUpdate: () => {
        const angle =
          Math.atan2(exit2.y - arrow2ExitObj.y, exit2.x - arrow2ExitObj.x) * (180 / Math.PI);
        setArrowPos({ x: arrow2ExitObj.x, y: arrow2ExitObj.y, angle });
      },
    });
  }, [
    stage,
    dimensions,
    borderRadius,
    arrow1Params,
    arrow2Params,
    triggerDelay,
    getOffscreenCoord,
    onComplete,
  ]);

  // Auto trigger or event-based trigger
  useEffect(() => {
    if (autoTrigger && stage === 'hidden' && dimensions.width > 0) {
      startConstruction();
    }
  }, [autoTrigger, stage, dimensions.width, startConstruction]);

  // Listen for global custom trigger event for this region id
  useEffect(() => {
    const handleTrigger = (e: CustomEvent) => {
      if (e.detail?.id === id || e.detail?.id === 'all') {
        startConstruction();
      }
    };

    window.addEventListener(`construct-region-${id}` as any, handleTrigger as any);
    window.addEventListener('construct-all-regions' as any, handleTrigger as any);

    return () => {
      window.removeEventListener(`construct-region-${id}` as any, handleTrigger as any);
      window.removeEventListener('construct-all-regions' as any, handleTrigger as any);
    };
  }, [id, startConstruction]);

  const isBoundaryDrawing = stage === 'arrow1_drawing';
  const isBoundaryDrawn = [
    'arrow1_exit',
    'boundary_empty',
    'arrow2_entrance',
    'arrow2_painting',
    'arrow2_exit',
    'revealed',
  ].includes(stage);

  const isPainting = stage === 'arrow2_painting';
  const isRevealed = stage === 'revealed';

  // Render flying arrow during entrance/exit
  const showEntranceExitArrow =
    arrowPos !== null &&
    (stage === 'arrow1_entrance' ||
      stage === 'arrow1_exit' ||
      stage === 'arrow2_entrance' ||
      stage === 'arrow2_exit');

  const activeParams =
    stage === 'arrow1_entrance' || stage === 'arrow1_exit' ? arrow1Params : arrow2Params;

  return (
    <div
      ref={containerRef}
      id={`region-${id}`}
      data-construction-id={id}
      data-construction-stage={stage}
      data-construction-priority={priority}
      className={`relative ${className}`}
      style={{
        minHeight: minHeight || undefined,
      }}
    >
      {/* 1. Boundary Drawing Layer (Arrow 1) */}
      <ArrowBoundaryPainter
        width={dimensions.width}
        height={dimensions.height}
        progress={boundaryProgress}
        params={arrow1Params}
        shape={shape}
        borderRadius={borderRadius}
        isDrawing={isBoundaryDrawing}
        isCompleted={isBoundaryDrawn}
      />

      {/* 2. Text Painting Layer (Arrow 2) */}
      <ArrowTextPainter
        width={dimensions.width}
        height={dimensions.height}
        progress={paintProgress}
        params={arrow2Params}
        isPainting={isPainting}
      />

      {/* 3. Entrance / Exit Flying Arrow Layer */}
      {showEntranceExitArrow && (
        <div
          className="absolute inset-0 pointer-events-none overflow-visible z-40"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          <svg className="w-full h-full overflow-visible">
            <g
              transform={`translate(${arrowPos.x}, ${arrowPos.y}) rotate(${arrowPos.angle})`}
            >
              {/* Luminous Core Glow */}
              <circle cx="0" cy="0" r="10" fill={activeParams.glowColor} />

              {/* Arrow Head */}
              <polygon
                points="-10,-7 10,0 -10,7 -4,0"
                fill="#FFFFFF"
                filter={`drop-shadow(0 0 6px ${activeParams.color})`}
              />
              <circle cx="2" cy="0" r="2.5" fill={activeParams.color} />
              <circle cx="10" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      )}

      {/* 4. Real Content with Synchronized Mask Reveal */}
      <div
        className={`w-full transition-all duration-300 ${contentClassName} ${
          isRevealed
            ? 'glass-card-premium border border-white/[0.08] shadow-2xl'
            : isBoundaryDrawn
            ? 'bg-transparent'
            : 'opacity-0'
        }`}
        style={{
          borderRadius,
        }}
      >
        <PaintRevealText
          progress={paintProgress}
          isPainting={isPainting}
          isRevealed={isRevealed}
          accentColor={arrow2Params.color}
        >
          {children}
        </PaintRevealText>
      </div>
    </div>
  );
};

export default ContentConstructionRegion;
