/**
 * ArrowTextPainter.tsx
 * Midnight Navy paintbrush / stylus representation of Arrow 2.
 * Emits refined soft illumination in champagne gold (#D6B36A) and warm bronze (#B99555).
 */

import React, { useId } from 'react';
import { ArrowTrajectoryParams } from './RandomArrowGenerator';

export interface ArrowTextPainterProps {
  width: number;
  height: number;
  progress: number; // 0 to 1
  params: ArrowTrajectoryParams;
  isPainting: boolean;
  arrowPos?: { x: number; y: number; angle: number } | null;
  className?: string;
}

export const ArrowTextPainter: React.FC<ArrowTextPainterProps> = ({
  width,
  height,
  progress,
  params,
  isPainting,
  arrowPos,
  className = '',
}) => {
  const filterId = useId();

  if (!isPainting || width <= 0 || height <= 0) return null;

  let posX = arrowPos ? arrowPos.x : progress * width;
  let posY = arrowPos ? arrowPos.y : (height * 0.15) + (progress * height * 0.7);
  let angle = arrowPos ? arrowPos.angle : Math.atan2(height * 0.7, width) * (180 / Math.PI);

  const sparkles = [
    { dx: -14, dy: -6, r: 2.0, opacity: 0.7 },
    { dx: -22, dy: 5, r: 1.5, opacity: 0.5 },
    { dx: -30, dy: -3, r: 1.2, opacity: 0.4 },
  ];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-visible z-30 ${className}`}
      style={{ width, height }}
    >
      <svg
        width={width}
        height={height}
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`paint-glow-${filterId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id={`brush-laser-${filterId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D6B36A" stopOpacity="0" />
            <stop offset="35%" stopColor="#D6B36A" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#F5F0E6" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#B99555" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#B99555" stopOpacity="0" />
          </linearGradient>

          <radialGradient id={`paint-aura-${filterId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5F0E6" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#D6B36A" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#B99555" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#B99555" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft Paint Curtain at the sweep frontier */}
        <line
          x1={posX}
          y1={0}
          x2={posX - 10}
          y2={height}
          stroke={`url(#brush-laser-${filterId})`}
          strokeWidth="2"
          filter={`url(#paint-glow-${filterId})`}
          opacity={0.8}
        />

        {/* Radiant Stylus Arrow Head */}
        <g transform={`translate(${posX}, ${posY}) rotate(${angle})`}>
          <circle
            cx="0"
            cy="0"
            r="12"
            fill={`url(#paint-aura-${filterId})`}
          />

          {sparkles.map((sp, idx) => (
            <circle
              key={idx}
              cx={sp.dx}
              cy={sp.dy}
              r={sp.r}
              fill="#D6B36A"
              opacity={sp.opacity}
            />
          ))}

          {/* Futuristic Stylus Dart */}
          <polygon
            points="-10,-6 12,0 -10,6 -4,0"
            fill="#F5F0E6"
            filter="drop-shadow(0 0 5px #D6B36A)"
          />

          <circle cx="12" cy="0" r="1.5" fill="#F5F0E6" />
          <circle cx="4" cy="0" r="2" fill="#D6B36A" />
        </g>
      </svg>
    </div>
  );
};
