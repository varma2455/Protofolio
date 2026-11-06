import React, { useMemo } from 'react';
import { ArrowPath } from './ArrowPath';
import { SeededPRNG, generateArrowPath, ArrowSpec } from '../../utils/generativeMath';

export interface ArrowFormationProps {
  seed?: number;
  count?: number;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  mode?: 'hero-converge' | 'circuit-network' | 'timeline-flow' | 'portal-converge' | 'constellation' | 'custom';
  customArrows?: ArrowSpec[];
  colors?: string[];
  glowColors?: string[];
  duration?: number;
  stagger?: number;
  className?: string;
  onFormationComplete?: () => void;
}

export const ArrowFormation: React.FC<ArrowFormationProps> = ({
  seed = 101,
  count = 7,
  width = '100%',
  height = '100%',
  viewBox = '0 0 1000 600',
  mode = 'circuit-network',
  customArrows,
  colors = ['#00E5FF', '#6C63FF', '#A855F7', '#38BDF8'],
  glowColors = ['rgba(0, 229, 255, 0.4)', 'rgba(108, 99, 255, 0.4)', 'rgba(168, 85, 247, 0.4)'],
  duration = 1.4,
  stagger = 0.22,
  className = '',
  onFormationComplete,
}) => {
  const arrows = useMemo(() => {
    if (customArrows && customArrows.length > 0) {
      return customArrows;
    }

    const prng = new SeededPRNG(seed);
    const result: ArrowSpec[] = [];

    // Parse viewBox dimensions
    const parts = viewBox.split(' ').map(Number);
    const vbW = parts[2] || 1000;
    const vbH = parts[3] || 600;

    if (mode === 'hero-converge') {
      // Arrows spawn from outer perimeters and travel toward the center brand focal point
      const centerX = vbW * 0.5;
      const centerY = vbH * 0.48;

      for (let i = 0; i < count; i++) {
        const side = i % 4; // 0: top, 1: right, 2: bottom, 3: left
        let startX = 0;
        let startY = 0;

        if (side === 0) {
          startX = prng.range(vbW * 0.15, vbW * 0.85);
          startY = prng.range(20, 60);
        } else if (side === 1) {
          startX = prng.range(vbW * 0.85, vbW * 0.95);
          startY = prng.range(vbH * 0.2, vbH * 0.8);
        } else if (side === 2) {
          startX = prng.range(vbW * 0.15, vbW * 0.85);
          startY = prng.range(vbH * 0.85, vbH * 0.95);
        } else {
          startX = prng.range(vbW * 0.05, vbW * 0.15);
          startY = prng.range(vbH * 0.2, vbH * 0.8);
        }

        // Target slightly offset around center for aesthetic distribution
        const angle = (i / count) * Math.PI * 2;
        const targetRadius = prng.range(60, 160);
        const endX = centerX + Math.cos(angle) * targetRadius;
        const endY = centerY + Math.sin(angle) * targetRadius;

        const type = prng.pick(['curved', 'diagonal', 'orthogonal']) as any;
        const curvature = prng.range(-0.35, 0.35);
        const { path, endAngle } = generateArrowPath(startX, startY, endX, endY, type, curvature);

        result.push({
          id: `hero-arrow-${i}`,
          d: path,
          startX,
          startY,
          endX,
          endY,
          length: 400,
          color: colors[i % colors.length],
          glowColor: glowColors[i % glowColors.length],
          strokeWidth: prng.range(1.2, 2.2),
          delay: i * stagger,
          duration: duration + prng.range(-0.2, 0.3),
          hasArrowHead: true,
          arrowHeadAngle: endAngle,
          type,
        });
      }
    } else if (mode === 'portal-converge') {
      // Concentric arrows spiraling inwards to contact button/portal
      const targetX = vbW * 0.5;
      const targetY = vbH * 0.5;

      for (let i = 0; i < count; i++) {
        const radius = prng.range(220, 380);
        const startAngle = (i / count) * Math.PI * 2 + prng.range(-0.2, 0.2);
        const startX = targetX + Math.cos(startAngle) * radius;
        const startY = targetY + Math.sin(startAngle) * radius;

        const endAngleOffset = startAngle + Math.PI * 0.85;
        const endRadius = prng.range(40, 80);
        const endX = targetX + Math.cos(endAngleOffset) * endRadius;
        const endY = targetY + Math.sin(endAngleOffset) * endRadius;

        const { path, endAngle } = generateArrowPath(startX, startY, endX, endY, 'curved', 0.4);

        result.push({
          id: `portal-arrow-${i}`,
          d: path,
          startX,
          startY,
          endX,
          endY,
          length: 350,
          color: colors[i % colors.length],
          glowColor: glowColors[i % glowColors.length],
          strokeWidth: prng.range(1.3, 2.0),
          delay: i * stagger,
          duration,
          hasArrowHead: true,
          arrowHeadAngle: endAngle,
          type: 'curved',
        });
      }
    } else if (mode === 'timeline-flow') {
      // Continuous zigzagging spine arrows linking milestones
      let currX = vbW * 0.2;
      let currY = 60;
      const stepY = (vbH - 120) / count;

      for (let i = 0; i < count; i++) {
        const nextX = i % 2 === 0 ? vbW * 0.8 : vbW * 0.2;
        const nextY = currY + stepY;

        const { path, endAngle } = generateArrowPath(currX, currY, nextX, nextY, 'orthogonal');

        result.push({
          id: `timeline-arrow-${i}`,
          d: path,
          startX: currX,
          startY: currY,
          endX: nextX,
          endY: nextY,
          length: 500,
          color: colors[i % colors.length],
          glowColor: glowColors[i % glowColors.length],
          strokeWidth: 1.8,
          delay: i * stagger,
          duration,
          hasArrowHead: true,
          arrowHeadAngle: endAngle,
          type: 'orthogonal',
        });

        currX = nextX;
        currY = nextY;
      }
    } else {
      // Default circuit network: organic arrows establishing geometric structure
      for (let i = 0; i < count; i++) {
        const startX = prng.range(vbW * 0.05, vbW * 0.95);
        const startY = prng.range(vbH * 0.05, vbH * 0.95);
        const dx = prng.range(-300, 300);
        const dy = prng.range(-200, 200);

        const endX = Math.max(20, Math.min(vbW - 20, startX + dx));
        const endY = Math.max(20, Math.min(vbH - 20, startY + dy));

        const type = prng.pick(['curved', 'orthogonal', 'diagonal']) as any;
        const curvature = prng.range(-0.3, 0.3);
        const { path, endAngle } = generateArrowPath(startX, startY, endX, endY, type, curvature);

        result.push({
          id: `circuit-arrow-${i}`,
          d: path,
          startX,
          startY,
          endX,
          endY,
          length: 300,
          color: colors[i % colors.length],
          glowColor: glowColors[i % glowColors.length],
          strokeWidth: prng.range(1.2, 2.0),
          delay: i * stagger,
          duration,
          hasArrowHead: prng.chance(0.85),
          arrowHeadAngle: endAngle,
          type,
        });
      }
    }

    return result;
  }, [seed, count, viewBox, mode, customArrows, colors, glowColors, duration, stagger]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none overflow-visible ${className}`}
    >
      <defs>
        {/* Luminous Core Filter */}
        <filter id="generative-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Render all arrow paths progressively */}
      {arrows.map((arrow, idx) => (
        <ArrowPath
          key={arrow.id}
          id={arrow.id}
          d={arrow.d}
          color={arrow.color}
          glowColor={arrow.glowColor}
          strokeWidth={arrow.strokeWidth}
          duration={arrow.duration}
          delay={arrow.delay}
          hasArrowHead={arrow.hasArrowHead}
          arrowHeadAngle={arrow.arrowHeadAngle}
          onComplete={idx === arrows.length - 1 ? onFormationComplete : undefined}
        />
      ))}

      {/* Geometric Intersection Connection Nodes */}
      {arrows.map((arrow, idx) => (
        <g key={`node-${arrow.id}`}>
          <circle
            cx={arrow.startX}
            cy={arrow.startY}
            r={2.5}
            fill="#FFFFFF"
            opacity={0.4}
          />
          <circle
            cx={arrow.endX}
            cy={arrow.endY}
            r={3.5}
            fill={arrow.color}
            filter="drop-shadow(0 0 5px #00E5FF)"
            style={{
              animation: `pulse-subtle ${2 + (idx % 3)}s infinite ease-in-out`,
            }}
          />
        </g>
      ))}
    </svg>
  );
};

export default ArrowFormation;
