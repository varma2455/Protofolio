import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export interface ArrowPathProps {
  id?: string;
  d: string;
  color?: string;
  glowColor?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  triggerProgress?: number; // 0 to 1 if manually driven
  isAnimated?: boolean;
  hasArrowHead?: boolean;
  arrowHeadSize?: number;
  arrowHeadAngle?: number;
  showParticle?: boolean;
  particleSize?: number;
  onComplete?: () => void;
  className?: string;
  dashed?: boolean;
}

export const ArrowPath: React.FC<ArrowPathProps> = ({
  id,
  d,
  color = '#00E5FF',
  glowColor = 'rgba(0, 229, 255, 0.5)',
  strokeWidth = 1.5,
  duration = 1.6,
  delay = 0,
  isAnimated = true,
  hasArrowHead = true,
  arrowHeadSize = 7,
  arrowHeadAngle = 0,
  showParticle = true,
  particleSize = 3,
  onComplete,
  className = '',
  dashed = false,
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const arrowHeadRef = useRef<SVGPolygonElement>(null);
  const particleRef = useRef<SVGCircleElement>(null);
  const [pathLength, setPathLength] = useState<number>(300);

  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    setPathLength(len);

    const path = pathRef.current;
    const glowPath = glowPathRef.current;
    const arrowHead = arrowHeadRef.current;
    const particle = particleRef.current;

    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !isAnimated) {
      if (path) path.style.strokeDashoffset = '0';
      if (glowPath) glowPath.style.strokeDashoffset = '0';
      if (arrowHead) arrowHead.style.opacity = '1';
      if (particle) particle.style.opacity = '1';
      onComplete?.();
      return;
    }

    // Set initial dasharray
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    if (glowPath) {
      glowPath.style.strokeDasharray = `${len}`;
      glowPath.style.strokeDashoffset = `${len}`;
    }

    if (arrowHead) {
      arrowHead.style.opacity = '0';
    }

    if (particle) {
      particle.style.opacity = '0';
    }

    // GSAP progressive drawing timeline
    const tl = gsap.timeline({
      delay,
      onComplete: () => {
        onComplete?.();
      },
    });

    const progressObj = { val: 0 };

    tl.to(progressObj, {
      val: 1,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        const offset = len * (1 - progressObj.val);
        if (path) path.style.strokeDashoffset = `${offset}`;
        if (glowPath) glowPath.style.strokeDashoffset = `${offset}`;

        // Move particle along path
        if (particle && path) {
          try {
            const currentPoint = path.getPointAtLength(len * progressObj.val);
            particle.setAttribute('cx', `${currentPoint.x}`);
            particle.setAttribute('cy', `${currentPoint.y}`);
            particle.style.opacity = progressObj.val < 0.98 ? '1' : '0.2';
          } catch (e) {
            // Ignore SVG bounds check in test environments
          }
        }
      },
    });

    // Arrowhead reveal at destination
    if (arrowHead) {
      tl.to(
        arrowHead,
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'back.out(2)',
        },
        `-=${duration * 0.25}`
      );
    }

    return () => {
      tl.kill();
    };
  }, [d, delay, duration, isAnimated, onComplete]);

  // Compute end point of path for the arrowhead orientation
  let endX = 0;
  let endY = 0;
  try {
    if (pathRef.current) {
      const p = pathRef.current.getPointAtLength(pathLength);
      endX = p.x;
      endY = p.y;
    }
  } catch (e) {
    // fallback
  }

  return (
    <g id={id} className={`generative-arrow-path ${className}`}>
      {/* Background Glow Layer */}
      <path
        ref={glowPathRef}
        d={d}
        fill="none"
        stroke={glowColor}
        strokeWidth={strokeWidth * 3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: 'blur(3px)',
          opacity: 0.75,
        }}
      />

      {/* Main Core Luminous Vector Path */}
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashed ? '4 4' : undefined}
      />

      {/* Traveling Luminous Tip Particle */}
      {showParticle && (
        <circle
          ref={particleRef}
          r={particleSize}
          fill="#FFFFFF"
          filter="drop-shadow(0 0 6px #00E5FF)"
        />
      )}

      {/* Futuristic Chevron Arrowhead */}
      {hasArrowHead && (
        <polygon
          ref={arrowHeadRef}
          points={`0,-${arrowHeadSize} ${arrowHeadSize * 1.5},0 0,${arrowHeadSize} ${arrowHeadSize * 0.4},0`}
          fill={color}
          filter={`drop-shadow(0 0 5px ${glowColor})`}
          transform={`translate(${endX}, ${endY}) rotate(${arrowHeadAngle})`}
          style={{ transformOrigin: '0 0' }}
        />
      )}
    </g>
  );
};

export default ArrowPath;
