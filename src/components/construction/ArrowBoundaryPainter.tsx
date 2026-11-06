/**
 * ArrowBoundaryPainter.tsx
 * Renders the physical boundary tracing for a container:
 * - Animated SVG path with stroke-dashoffset
 * - Physically attached Arrowhead leading the stroke at the exact point & tangent
 * - Glowing luminous trail and particle spark
 */

import React, { useRef, useEffect, useState, useId } from 'react';
import { ArrowTrajectoryParams } from './RandomArrowGenerator';

export interface ArrowBoundaryPainterProps {
  width: number;
  height: number;
  progress: number; // 0 to 1
  params: ArrowTrajectoryParams;
  shape?: 'rounded' | 'rectangular' | 'chamfer';
  borderRadius?: number;
  isDrawing: boolean;
  isCompleted: boolean;
  arrowPos?: { x: number; y: number; angle: number } | null;
  className?: string;
}

export const ArrowBoundaryPainter: React.FC<ArrowBoundaryPainterProps> = ({
  width,
  height,
  progress,
  params,
  shape = 'rounded',
  borderRadius = 16,
  isDrawing,
  isCompleted,
  arrowPos,
  className = '',
}) => {
  const filterId = useId();
  const pathRef = useRef<SVGPathElement>(null);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [headPos, setHeadPos] = useState<{ x: number; y: number; angle: number }>({
    x: borderRadius,
    y: 0,
    angle: 0,
  });

  // Generate perimeter path data
  const generatePath = () => {
    if (width <= 0 || height <= 0) return '';
    const r = Math.min(borderRadius, width / 2, height / 2);

    if (shape === 'chamfer') {
      const c = Math.min(18, width / 4, height / 4);
      return `M ${c} 0 L ${width - c} 0 L ${width} ${c} L ${width} ${height - c} L ${width - c} ${height} L ${c} ${height} L 0 ${height - c} L 0 ${c} Z`;
    }

    if (shape === 'rectangular') {
      return `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`;
    }

    // Smooth rounded rectangle starting top-left
    return `M ${r} 0 
            L ${width - r} 0 
            A ${r} ${r} 0 0 1 ${width} ${r} 
            L ${width} ${height - r} 
            A ${r} ${r} 0 0 1 ${width - r} ${height} 
            L ${r} ${height} 
            A ${r} ${r} 0 0 1 0 ${height - r} 
            L 0 ${r} 
            A ${r} ${r} 0 0 1 ${r} 0 Z`;
  };

  const pathD = generatePath();

  // Measure path length
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        setTotalLength(len);
      } catch (e) {
        setTotalLength((width + height) * 2);
      }
    }
  }, [width, height, shape, borderRadius]);

  // Compute position and tangent angle for Arrow 1 along perimeter
  useEffect(() => {
    if (arrowPos) {
      setHeadPos(arrowPos);
      return;
    }

    if (!isDrawing || totalLength <= 0 || !pathRef.current) return;

    try {
      const currentDist = totalLength * Math.min(1, Math.max(0, progress));
      const pt = pathRef.current.getPointAtLength(currentDist);
      const lookAhead = Math.min(totalLength, currentDist + 3);
      const aheadPt = pathRef.current.getPointAtLength(lookAhead);
      const angle = Math.atan2(aheadPt.y - pt.y, aheadPt.x - pt.x) * (180 / Math.PI);

      setHeadPos({ x: pt.x, y: pt.y, angle });
    } catch (e) {
      // fallback
    }
  }, [progress, isDrawing, totalLength, arrowPos]);

  if (width <= 0 || height <= 0) return null;

  const strokeDashoffset = isCompleted ? 0 : totalLength * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-visible z-20 ${className}`}
      style={{ width, height }}
    >
      <svg
        width={width}
        height={height}
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id={`grad-${filterId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={params.color} stopOpacity="1" />
            <stop offset="60%" stopColor={params.secondaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={params.color} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Measuring & Reference Path */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="transparent"
          strokeWidth="1"
        />

        {/* Subtle Static Guide Border once completed */}
        {isCompleted && (
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
        )}

        {/* Luminous Glow Stroke */}
        {(isDrawing || isCompleted) && totalLength > 0 && (
          <path
            d={pathD}
            fill="none"
            stroke={params.glowColor}
            strokeWidth={isCompleted ? 2 : 4}
            strokeDasharray={totalLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter={`url(#glow-${filterId})`}
            opacity={isCompleted ? 0.4 : 0.85}
          />
        )}

        {/* Crisp Foreground Stroke */}
        {(isDrawing || isCompleted) && totalLength > 0 && (
          <path
            d={pathD}
            fill="none"
            stroke={`url(#grad-${filterId})`}
            strokeWidth={isCompleted ? 1.5 : 2.5}
            strokeDasharray={totalLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        )}

        {/* Physical Arrow 1 Head leading the stroke */}
        {isDrawing && (
          <g
            transform={`translate(${headPos.x}, ${headPos.y}) rotate(${headPos.angle})`}
            className="transition-transform duration-75 ease-out"
          >
            {/* Luminous Arrow Head Aura */}
            <circle cx="0" cy="0" r="8" fill={params.glowColor} filter={`url(#glow-${filterId})`} />

            {/* Futuristic Arrow Head */}
            <polygon
              points="-9,-7 9,0 -9,7 -4,0"
              fill="#FFFFFF"
              filter={`drop-shadow(0 0 6px ${params.color})`}
            />

            {/* Glowing Core Dot */}
            <circle cx="2" cy="0" r="2.5" fill={params.color} />
            <circle cx="9" cy="0" r="1.5" fill="#FFFFFF" />
          </g>
        )}
      </svg>
    </div>
  );
};
