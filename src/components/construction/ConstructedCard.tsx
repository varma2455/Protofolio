/**
 * ConstructedCard.tsx
 * Level 1 Inner Card Construction Component for VARMA.DEV.
 * 
 * In a section containing cards (e.g. Card 1, Card 2, Card 3, Card 4):
 * 1. Card 1 waits until outer container is constructed and it is Card 1's turn.
 * 2. An arrow enters from a random edge.
 * 3. Draws the card's complete rounded rectangular border.
 * 4. Exits the screen.
 * 5. A different arrow enters and paints the card's dark background.
 * 6. Exits the screen.
 * 7. Activates internal elements (icon, heading, description, badges, buttons).
 * 8. Upon completion, triggers Card 2 to begin with different arrow paths!
 */

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { useConstruction, ConstructionProvider } from './ConstructionContext';
import { generateArrowParams } from './RandomArrowGenerator';
import { ArrowBoundaryPainter } from './ArrowBoundaryPainter';
import { ArrowTextPainter } from './ArrowTextPainter';
import { ArrowTaskManager } from './ArrowTaskManager';

export interface ConstructedCardProps {
  id: string;
  children: React.ReactNode;
  accentColor?: string;
  borderRadius?: number;
  className?: string;
  onCardComplete?: () => void;
}

export type CardStage =
  | 'hidden'
  | 'arrow_border_enter'
  | 'drawing_border'
  | 'arrow_border_exit'
  | 'border_done'
  | 'arrow_fill_enter'
  | 'painting_fill'
  | 'arrow_fill_exit'
  | 'content_active'
  | 'completed';

export const ConstructedCard: React.FC<ConstructedCardProps> = ({
  id,
  children,
  accentColor = '#D6B36A',
  borderRadius = 16,
  className = '',
  onCardComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isParentActive, activeChildIndex, registerChild, notifyChildComplete } = useConstruction();

  const [childIndex, setChildIndex] = useState<number>(-1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [stage, setStage] = useState<CardStage>('hidden');

  const [boundaryProgress, setBoundaryProgress] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [arrowPos, setArrowPos] = useState<{ x: number; y: number; angle: number } | null>(null);

  // Register in parent context
  useEffect(() => {
    const idx = registerChild(id);
    setChildIndex(idx);
  }, [id, registerChild]);

  // Parameters for border arrow and fill arrow
  const borderArrowParams = useMemo(() => {
    const p = generateArrowParams(id, 'boundary');
    p.color = accentColor;
    p.glowColor = `${accentColor}77`;
    p.drawDuration = 0.55;
    return p;
  }, [id, accentColor]);

  const fillArrowParams = useMemo(() => {
    const p = generateArrowParams(id, 'paint');
    p.drawDuration = 0.45;
    return p;
  }, [id]);

  // Measure size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width || el.offsetWidth || 300);
      const h = Math.round(rect.height || el.offsetHeight || 150);
      if (w > 0 && h > 0) {
        setDimensions({ width: w, height: h });
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const getOffscreenCoord = useCallback((edge: string) => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;
    const rect = containerRef.current
      ? containerRef.current.getBoundingClientRect()
      : { left: 0, top: 0 };

    const margin = 140;
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

  // Card Construction Sequence with 10 Arrow Agents Pool
  const runCardConstruction = useCallback(() => {
    if (stage !== 'hidden') return;

    if (ArrowTaskManager.isTaskCompleted(`card-boundary-${id}`)) {
      setStage('completed');
      setBoundaryProgress(1);
      setFillProgress(1);
      notifyChildComplete(id, childIndex);
      if (onCardComplete) onCardComplete();
      return;
    }

    ArrowTaskManager.registerTask({
      id: `card-boundary-${id}`,
      targetId: id,
      type: 'boundary',
      getBounds: () => (containerRef.current ? containerRef.current.getBoundingClientRect() : null),
      borderRadius,
      priority: 800 - childIndex * 10,
      status: 'pending',
      assignedArrowId: null,
      onProgress: (p) => {
        setBoundaryProgress(p);
        if (p > 0 && p < 1) {
          setStage('drawing_border');
        } else if (p >= 1) {
          setStage('content_active');
          setFillProgress(1);
        }
      },
      onComplete: () => {
        setBoundaryProgress(1);
        setFillProgress(1);
        setStage('content_active');
        setTimeout(() => {
          setStage('completed');
          notifyChildComplete(id, childIndex);
          if (onCardComplete) onCardComplete();
        }, 180);
      },
    });

    // Safety watchdog: Ensure card content activates even if delayed
    const safety = setTimeout(() => {
      setStage('content_active');
      setBoundaryProgress(1);
      setFillProgress(1);
      setTimeout(() => {
        setStage('completed');
        notifyChildComplete(id, childIndex);
        if (onCardComplete) onCardComplete();
      }, 200);
    }, 2200);

    return () => clearTimeout(safety);
  }, [stage, id, childIndex, borderRadius, notifyChildComplete, onCardComplete]);

  const hasTriggeredRef = useRef(false);

  // Global instant reveal listener
  useEffect(() => {
    const handleInstant = () => {
      hasTriggeredRef.current = true;
      setStage('completed');
      setBoundaryProgress(1);
      setFillProgress(1);
      setArrowPos(null);
      notifyChildComplete(id, childIndex);
      if (onCardComplete) onCardComplete();
    };
    window.addEventListener('construct-all-regions', handleInstant);
    return () => window.removeEventListener('construct-all-regions', handleInstant);
  }, [id, childIndex, notifyChildComplete, onCardComplete]);

  // Check if it's this card's turn
  useEffect(() => {
    if (
      isParentActive &&
      childIndex !== -1 &&
      activeChildIndex >= childIndex &&
      !hasTriggeredRef.current
    ) {
      hasTriggeredRef.current = true;
      runCardConstruction();
    }
  }, [isParentActive, activeChildIndex, childIndex, runCardConstruction]);

  const isBorderDrawing = stage === 'drawing_border';
  const isBorderDrawn = [
    'arrow_border_exit',
    'border_done',
    'arrow_fill_enter',
    'painting_fill',
    'arrow_fill_exit',
    'content_active',
    'completed',
  ].includes(stage);

  const isPaintingFill = stage === 'painting_fill';
  const isContentActive = stage === 'content_active' || stage === 'completed';

  const activeParams =
    stage === 'arrow_border_enter' || stage === 'arrow_border_exit'
      ? borderArrowParams
      : fillArrowParams;

  return (
    <div
      ref={containerRef}
      id={`card-${id}`}
      data-constructed-card={id}
      data-card-stage={stage}
      className={`relative rounded-[${borderRadius}px] transition-all duration-300 ${className}`}
      style={{
        borderRadius,
      }}
    >
      {/* 1. Border Drawing SVG */}
      <ArrowBoundaryPainter
        width={dimensions.width}
        height={dimensions.height}
        progress={boundaryProgress}
        params={borderArrowParams}
        shape="rounded"
        borderRadius={borderRadius}
        isDrawing={isBorderDrawing}
        isCompleted={isBorderDrawn}
      />

      {/* 2. Background Painting Sweep Laser */}
      <ArrowTextPainter
        width={dimensions.width}
        height={dimensions.height}
        progress={fillProgress}
        params={fillArrowParams}
        isPainting={isPaintingFill}
      />

      {/* 3. Off-screen Flying Arrow Head */}
      {arrowPos && (stage === 'arrow_border_enter' || stage === 'arrow_border_exit' || stage === 'arrow_fill_enter' || stage === 'arrow_fill_exit') && (
        <div
          className="absolute inset-0 pointer-events-none overflow-visible z-40"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          <svg className="w-full h-full overflow-visible">
            <g transform={`translate(${arrowPos.x}, ${arrowPos.y}) rotate(${arrowPos.angle})`}>
              <circle cx="0" cy="0" r="8" fill={activeParams.glowColor} />
              <polygon
                points="-9,-6 9,0 -9,6 -4,0"
                fill="#F5F0E6"
                filter={`drop-shadow(0 0 6px ${activeParams.color})`}
              />
              <circle cx="2" cy="0" r="2" fill={activeParams.color} />
              <circle cx="9" cy="0" r="1.5" fill="#F5F0E6" />
            </g>
          </svg>
        </div>
      )}

      {/* 4. Card Surface & Inner Children */}
      <div
        className={`relative w-full h-full rounded-[${borderRadius}px] transition-all duration-300 ${
          isContentActive
            ? 'bg-[#191713] shadow-xl border border-[rgba(214,179,106,0.20)]'
            : isBorderDrawn
            ? 'bg-transparent'
            : 'opacity-0'
        }`}
        style={{
          borderRadius,
        }}
      >
        <ConstructionProvider
          id={id}
          isParentActive={isContentActive}
          isParentCompleted={stage === 'completed'}
          staggerDelay={80}
        >
          {children}
        </ConstructionProvider>
      </div>
    </div>
  );
};

export default ConstructedCard;
