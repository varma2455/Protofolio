import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowPath } from './ArrowPath';
import { SeededPRNG, generateArrowPath, ArrowSpec } from '../../utils/generativeMath';

gsap.registerPlugin(ScrollTrigger);

export interface GenerativeArrowEngineProps {
  id?: string;
  seed?: number;
  arrowCount?: number;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  preset?: 'hero' | 'about' | 'tech' | 'projects' | 'experience' | 'skills' | 'education' | 'contact' | 'ambient';
  density?: 'sparse' | 'normal' | 'dense';
  colorPalette?: string[];
  autoPlay?: boolean;
  triggerOnScroll?: boolean;
  scrollTriggerStart?: string;
  className?: string;
  onConstructionPhaseChange?: (phase: 'spawn' | 'travel' | 'connect' | 'transform') => void;
  onTargetTriggered?: (targetId: string) => void;
}

export const GenerativeArrowEngine: React.FC<GenerativeArrowEngineProps> = ({
  id = 'generative-engine',
  seed = 2026,
  arrowCount,
  width = '100%',
  height = '100%',
  viewBox = '0 0 1200 800',
  preset = 'ambient',
  density = 'normal',
  colorPalette = ['#00E5FF', '#6C63FF', '#A855F7', '#38BDF8'],
  autoPlay = true,
  triggerOnScroll = true,
  scrollTriggerStart = 'top 80%',
  className = '',
  onConstructionPhaseChange,
  onTargetTriggered,
}) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [activePhase, setActivePhase] = useState<'spawn' | 'travel' | 'connect' | 'transform'>('spawn');
  const [isTriggered, setIsTriggered] = useState<boolean>(!triggerOnScroll || autoPlay);

  // Density factor
  const count = useMemo(() => {
    if (arrowCount) return arrowCount;
    if (density === 'sparse') return 5;
    if (density === 'dense') return 14;
    return 8; // normal
  }, [arrowCount, density]);

  // Generate deterministic arrow specifications based on preset
  const arrows = useMemo(() => {
    const prng = new SeededPRNG(seed);
    const result: ArrowSpec[] = [];

    const parts = viewBox.split(' ').map(Number);
    const vbW = parts[2] || 1200;
    const vbH = parts[3] || 800;

    // Palette variants
    const glowMap: Record<string, string> = {
      '#00E5FF': 'rgba(0, 229, 255, 0.45)',
      '#6C63FF': 'rgba(108, 99, 255, 0.45)',
      '#A855F7': 'rgba(168, 85, 247, 0.45)',
      '#38BDF8': 'rgba(56, 189, 248, 0.45)',
      '#10B981': 'rgba(16, 185, 129, 0.45)',
      '#F59E0B': 'rgba(245, 158, 11, 0.45)',
    };

    if (preset === 'hero') {
      // Hero preset: majestic inward converging & orbital arrows framing name & 3D scene
      const focalX = vbW * 0.38;
      const focalY = vbH * 0.48;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const dist = prng.range(320, 520);
        const startX = focalX + Math.cos(angle) * dist;
        const startY = focalY + Math.sin(angle) * dist;

        // Converge toward key landmarks
        const targetRadius = prng.range(80, 200);
        const targetAngle = angle + prng.range(-0.5, 0.5);
        const endX = focalX + Math.cos(targetAngle) * targetRadius;
        const endY = focalY + Math.sin(targetAngle) * targetRadius;

        const type = (i % 2 === 0 ? 'curved' : 'orthogonal') as any;
        const curvature = prng.range(-0.35, 0.35);
        const { path, endAngle } = generateArrowPath(startX, startY, endX, endY, type, curvature);

        const color = colorPalette[i % colorPalette.length];

        result.push({
          id: `hero-gen-${i}`,
          d: path,
          startX,
          startY,
          endX,
          endY,
          length: 450,
          color,
          glowColor: glowMap[color] || 'rgba(0, 229, 255, 0.4)',
          strokeWidth: prng.range(1.2, 2.2),
          delay: i * 0.18,
          duration: prng.range(1.2, 1.8),
          hasArrowHead: true,
          arrowHeadAngle: endAngle,
          type,
          targetElementId: `hero-anchor-${i}`,
        });
      }
    } else if (preset === 'tech') {
      // Tech network preset: M-E-R-N 4-node interconnectivity
      // Simulates circuit pathways connecting MongoDB, Express, React, and Node
      const nodeX = [vbW * 0.2, vbW * 0.4, vbW * 0.6, vbW * 0.8];
      const nodeY = [vbH * 0.3, vbH * 0.7, vbH * 0.3, vbH * 0.7];

      for (let i = 0; i < count; i++) {
        const fromIdx = i % 4;
        const toIdx = (i + 1 + Math.floor(prng.next() * 2)) % 4;

        const startX = nodeX[fromIdx] + prng.range(-30, 30);
        const startY = nodeY[fromIdx] + prng.range(-20, 20);
        const endX = nodeX[toIdx] + prng.range(-30, 30);
        const endY = nodeY[toIdx] + prng.range(-20, 20);

        const type = 'orthogonal';
        const { path, endAngle } = generateArrowPath(startX, startY, endX, endY, type);
        const color = colorPalette[i % colorPalette.length];

        result.push({
          id: `tech-gen-${i}`,
          d: path,
          startX,
          startY,
          endX,
          endY,
          length: 380,
          color,
          glowColor: glowMap[color] || 'rgba(0, 229, 255, 0.4)',
          strokeWidth: 1.8,
          delay: i * 0.2,
          duration: 1.3,
          hasArrowHead: true,
          arrowHeadAngle: endAngle,
          type,
        });
      }
    } else if (preset === 'contact') {
      // Portal convergence: arrows funnel into the message transmission core
      const targetX = vbW * 0.5;
      const targetY = vbH * 0.52;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = prng.range(260, 480);
        const startX = targetX + Math.cos(angle) * radius;
        const startY = targetY + Math.sin(angle) * radius;

        const endRadius = prng.range(50, 110);
        const endX = targetX + Math.cos(angle + 0.3) * endRadius;
        const endY = targetY + Math.sin(angle + 0.3) * endRadius;

        const { path, endAngle } = generateArrowPath(startX, startY, endX, endY, 'curved', 0.25);
        const color = colorPalette[i % colorPalette.length];

        result.push({
          id: `contact-gen-${i}`,
          d: path,
          startX,
          startY,
          endX,
          endY,
          length: 420,
          color,
          glowColor: glowMap[color] || 'rgba(0, 229, 255, 0.4)',
          strokeWidth: prng.range(1.4, 2.0),
          delay: i * 0.16,
          duration: 1.4,
          hasArrowHead: true,
          arrowHeadAngle: endAngle,
          type: 'curved',
        });
      }
    } else {
      // Ambient / About / Projects / Experience / Skills / Education
      // Balanced geometric network creating dynamic construction lines
      for (let i = 0; i < count; i++) {
        const startX = prng.range(vbW * 0.05, vbW * 0.95);
        const startY = prng.range(vbH * 0.08, vbH * 0.92);
        const dx = prng.range(-350, 350);
        const dy = prng.range(-220, 220);

        const endX = Math.max(30, Math.min(vbW - 30, startX + dx));
        const endY = Math.max(30, Math.min(vbH - 30, startY + dy));

        const type = prng.pick(['curved', 'orthogonal', 'diagonal']) as any;
        const curvature = prng.range(-0.3, 0.3);
        const { path, endAngle } = generateArrowPath(startX, startY, endX, endY, type, curvature);
        const color = colorPalette[i % colorPalette.length];

        result.push({
          id: `ambient-gen-${i}`,
          d: path,
          startX,
          startY,
          endX,
          endY,
          length: 320,
          color,
          glowColor: glowMap[color] || 'rgba(0, 229, 255, 0.4)',
          strokeWidth: prng.range(1.2, 1.8),
          delay: i * 0.18,
          duration: prng.range(1.2, 1.6),
          hasArrowHead: prng.chance(0.85),
          arrowHeadAngle: endAngle,
          type,
        });
      }
    }

    return result;
  }, [seed, count, viewBox, preset, colorPalette]);

  // ScrollTrigger integration
  useEffect(() => {
    if (!triggerOnScroll || !containerRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsTriggered(true);
      setActivePhase('transform');
      return;
    }

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: scrollTriggerStart,
      onEnter: () => {
        setIsTriggered(true);
        setActivePhase('travel');
        onConstructionPhaseChange?.('travel');

        // Transition through connect and transform
        setTimeout(() => {
          setActivePhase('connect');
          onConstructionPhaseChange?.('connect');
        }, 800);

        setTimeout(() => {
          setActivePhase('transform');
          onConstructionPhaseChange?.('transform');
        }, 1600);
      },
      once: true,
    });

    return () => {
      st.kill();
    };
  }, [triggerOnScroll, scrollTriggerStart, onConstructionPhaseChange]);

  return (
    <svg
      ref={containerRef}
      id={id}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Ambient Arrow Glow Filter */}
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Render arrows when triggered */}
      {isTriggered &&
        arrows.map((arrow, idx) => (
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
            onComplete={() => {
              if (arrow.targetElementId) {
                onTargetTriggered?.(arrow.targetElementId);
              }
            }}
          />
        ))}

      {/* Geometric Terminal Nodes (Intersections) */}
      {isTriggered &&
        arrows.map((arrow, idx) => (
          <g key={`terminal-${arrow.id}`}>
            {/* Origin Node */}
            <circle
              cx={arrow.startX}
              cy={arrow.startY}
              r={2}
              fill="#FFFFFF"
              opacity={0.3}
            />

            {/* Destination Pulsing Anchor Node */}
            <circle
              cx={arrow.endX}
              cy={arrow.endY}
              r={3.2}
              fill={arrow.color}
              filter={`drop-shadow(0 0 6px ${arrow.color})`}
              style={{
                animation: `pulse-subtle ${2 + (idx % 2.5)}s infinite ease-in-out`,
              }}
            />

            {/* Small Crosshair Tick at Destination */}
            <path
              d={`M ${arrow.endX - 5} ${arrow.endY} H ${arrow.endX + 5} M ${arrow.endX} ${arrow.endY - 5} V ${arrow.endY + 5}`}
              stroke={arrow.color}
              strokeWidth={0.8}
              opacity={0.4}
            />
          </g>
        ))}
    </svg>
  );
};

export default GenerativeArrowEngine;
