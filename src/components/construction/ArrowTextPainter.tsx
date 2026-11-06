/**
 * ArrowTextPainter.tsx
 * Visual representation of Arrow 2 acting as a radiant paintbrush / laser pen.
 * Moves across the container interior, emitting glowing paint trails,
 * sparkles, and a radiant beam that physically writes/reveals the website content.
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

  // Calculate current paintbrush coordinates
  let posX = arrowPos ? arrowPos.x : progress * width;
  let posY = arrowPos ? arrowPos.y : (height * 0.15) + (progress * height * 0.7);
  let angle = arrowPos ? arrowPos.angle : Math.atan2(height * 0.7, width) * (180 / Math.PI);

  // Generate trailing paint sparkles based on progress
  const sparkles = [
    { dx: -18, dy: -8, r: 2.5, opacity: 0.8 },
    { dx: -28, dy: 6, r: 2.0, opacity: 0.6 },
    { dx: -36, dy: -4, r: 1.5, opacity: 0.5 },
    { dx: -12, dy: 10, r: 3.0, opacity: 0.9 },
    { dx: -45, dy: 2, r: 1.2, opacity: 0.4 },
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
          <filter id={`paint-glow-${filterId}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id={`brush-laser-${filterId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={params.color} stopOpacity="0" />
            <stop offset="30%" stopColor={params.color} stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="70%" stopColor={params.secondaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={params.secondaryColor} stopOpacity="0" />
          </linearGradient>

          <radialGradient id={`paint-aura-${filterId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="30%" stopColor={params.color} stopOpacity="0.85" />
            <stop offset="70%" stopColor={params.secondaryColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={params.color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Vertical/Diagonal Glowing Paint Curtain at the sweep frontier */}
        <line
          x1={posX}
          y1={0}
          x2={posX - 15}
          y2={height}
          stroke={`url(#brush-laser-${filterId})`}
          strokeWidth="3.5"
          filter={`url(#paint-glow-${filterId})`}
          opacity={0.85}
        />

        {/* Secondary thinner laser core */}
        <line
          x1={posX}
          y1={0}
          x2={posX - 15}
          y2={height}
          stroke="#FFFFFF"
          strokeWidth="1.2"
          opacity={0.9}
        />

        {/* Radiant Paintbrush Arrow Head */}
        <g transform={`translate(${posX}, ${posY}) rotate(${angle})`}>
          {/* Glowing Aura Orb */}
          <circle
            cx="0"
            cy="0"
            r="16"
            fill={`url(#paint-aura-${filterId})`}
            filter={`url(#paint-glow-${filterId})`}
          />

          {/* Trailing Paint Sparkles */}
          {sparkles.map((sp, idx) => (
            <circle
              key={idx}
              cx={sp.dx}
              cy={sp.dy}
              r={sp.r}
              fill={params.color}
              opacity={sp.opacity}
              filter={`url(#paint-glow-${filterId})`}
            />
          ))}

          {/* Paint Stream Ribbon behind the arrow */}
          <path
            d="M -30 -4 Q -15 0 0 0 Q -15 0 -30 4 Z"
            fill={params.secondaryColor}
            opacity={0.7}
          />

          {/* Arrow 2 Futuristic Paint Stylus / Dart Head */}
          <polygon
            points="-12,-8 14,0 -12,8 -6,0"
            fill="#FFFFFF"
            filter={`drop-shadow(0 0 8px ${params.color})`}
          />

          {/* Pure Radiant Tip */}
          <circle cx="14" cy="0" r="2.5" fill="#FFFFFF" />
          <circle cx="5" cy="0" r="3" fill={params.color} />
        </g>
      </svg>
    </div>
  );
};
