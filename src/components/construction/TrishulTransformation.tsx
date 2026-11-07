/**
 * TrishulTransformation.tsx
 * Isolated component orchestrating the Sudarshan Chakra → Trishul transformation animation.
 * 
 * Timeline & Construction Architecture:
 * - 0% scroll: Chakra visible; on opposite side, only a tiny glowing blue starting point/seed.
 * - 10–25%: Atom-like particles emerge from the Chakra and converge at the starting point, forming the base.
 * - 25–45%: Particles progressively assemble the long central shaft from bottom upward.
 * - 45–65%: Shaft completes, and lower ornamental collars and crescent junction bracket develop.
 * - 65–85%: The three upper prongs (central spearhead + two outer curved blades) take shape.
 * - 85–100%: Fine details, metallic highlights, and electric blue edge glow lock into place; completed Trishul illuminates.
 * - Reversible: Scrolling upward smoothly reverses the construction and returns particles to the Chakra.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlobalArrowPool } from './GlobalArrowPool';

gsap.registerPlugin(ScrollTrigger);

interface TrishulAnchorPoint {
  x: number;
  y: number;
  group: 'base' | 'shaft_lower' | 'shaft_upper' | 'collar' | 'prongs' | 'details';
  scrollStart: number;
  scrollEnd: number;
}

// Generate the 160 deterministic skeleton anchor points of the Trishul
const generateTrishulAnchors = (): TrishulAnchorPoint[] => {
  const points: TrishulAnchorPoint[] = [];

  // 1. Base Stand & Seed (20 points) -> [0.10, 0.25]
  points.push({ x: 0, y: 96, group: 'base', scrollStart: 0.10, scrollEnd: 0.15 });
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    points.push({
      x: Math.cos(angle) * 7,
      y: 96 + Math.sin(angle) * 6,
      group: 'base',
      scrollStart: 0.12 + (i / 8) * 0.10,
      scrollEnd: 0.16 + (i / 8) * 0.08,
    });
  }
  for (let i = -5; i <= 5; i++) {
    points.push({
      x: i * 2.2,
      y: 104,
      group: 'base',
      scrollStart: 0.18 + Math.abs(i) * 0.012,
      scrollEnd: 0.23 + Math.abs(i) * 0.004,
    });
  }

  // 2. Shaft Lower (28 points) -> [0.25, 0.35]
  for (let y = 90; y >= 45; y -= 3) {
    const pFrac = (90 - y) / 45;
    points.push({
      x: 0,
      y,
      group: 'shaft_lower',
      scrollStart: 0.25 + pFrac * 0.08,
      scrollEnd: 0.28 + pFrac * 0.07,
    });
  }
  // Lower collar at y = 65
  [-7, -4, 4, 7].forEach((x) => {
    points.push({ x, y: 65, group: 'shaft_lower', scrollStart: 0.29, scrollEnd: 0.34 });
  });

  // 3. Shaft Upper (26 points) -> [0.35, 0.45]
  for (let y = 42; y >= -10; y -= 3) {
    const pFrac = (42 - y) / 52;
    points.push({
      x: 0,
      y,
      group: 'shaft_upper',
      scrollStart: 0.35 + pFrac * 0.08,
      scrollEnd: 0.38 + pFrac * 0.07,
    });
  }
  // Mid damru ornamental knot at y = 35
  [
    { x: -6, y: 32 }, { x: 6, y: 32 },
    { x: -6, y: 38 }, { x: 6, y: 38 },
    { x: -3, y: 35 }, { x: 3, y: 35 },
  ].forEach((pt) => {
    points.push({ ...pt, group: 'shaft_upper', scrollStart: 0.37, scrollEnd: 0.43 });
  });

  // 4. Collar & Crescent Junction Bracket (24 points) -> [0.45, 0.65]
  // Upper collar
  [-6, -3, 3, 6].forEach((x) => {
    points.push({ x, y: 5, group: 'collar', scrollStart: 0.46, scrollEnd: 0.52 });
  });
  // Crescent bracket spanning -18 to +18 at y = -18
  for (let i = -10; i <= 10; i++) {
    const x = (i / 10) * 18;
    const y = -12 - (1 - Math.cos((i / 10) * (Math.PI / 2))) * 6;
    points.push({
      x,
      y,
      group: 'collar',
      scrollStart: 0.50 + (Math.abs(i) / 10) * 0.12,
      scrollEnd: 0.54 + (Math.abs(i) / 10) * 0.10,
    });
  }

  // 5. The Three Upper Prongs (60 points) -> [0.65, 0.85]
  // Central Spearhead Blade (24 points)
  for (let y = -22; y >= -96; y -= 4) {
    const pFrac = (-22 - y) / 74;
    // Spine
    points.push({
      x: 0,
      y,
      group: 'prongs',
      scrollStart: 0.65 + pFrac * 0.16,
      scrollEnd: 0.68 + pFrac * 0.16,
    });
    // Blade edge pairs
    if (y > -75 && y < -55) {
      points.push({
        x: -4.5,
        y,
        group: 'prongs',
        scrollStart: 0.70 + pFrac * 0.12,
        scrollEnd: 0.74 + pFrac * 0.10,
      });
      points.push({
        x: 4.5,
        y,
        group: 'prongs',
        scrollStart: 0.70 + pFrac * 0.12,
        scrollEnd: 0.74 + pFrac * 0.10,
      });
    }
  }

  // Left Outer Curved Prong (18 points)
  for (let step = 0; step <= 12; step++) {
    const u = step / 12;
    // Parametric cubic curve
    const x = -10 + u * -26 + Math.sin(u * Math.PI) * -8;
    const y = -18 + u * -66;
    points.push({
      x,
      y,
      group: 'prongs',
      scrollStart: 0.66 + u * 0.16,
      scrollEnd: 0.70 + u * 0.14,
    });
  }

  // Right Outer Curved Prong (18 points) - exact mirror
  for (let step = 0; step <= 12; step++) {
    const u = step / 12;
    const x = 10 + u * 26 + Math.sin(u * Math.PI) * 8;
    const y = -18 + u * -66;
    points.push({
      x,
      y,
      group: 'prongs',
      scrollStart: 0.66 + u * 0.16,
      scrollEnd: 0.70 + u * 0.14,
    });
  }

  // 6. Fine Details & Illumination (16 points) -> [0.85, 0.98]
  // Spear tip spark
  points.push({ x: 0, y: -98, group: 'details', scrollStart: 0.86, scrollEnd: 0.94 });
  // Left and right prong tips
  points.push({ x: -30, y: -86, group: 'details', scrollStart: 0.88, scrollEnd: 0.95 });
  points.push({ x: 30, y: -86, group: 'details', scrollStart: 0.88, scrollEnd: 0.95 });
  // Edge laser spines
  for (let i = 1; i <= 6; i++) {
    points.push({
      x: -i * 4.5,
      y: -50 - i * 5,
      group: 'details',
      scrollStart: 0.86 + i * 0.015,
      scrollEnd: 0.92 + i * 0.012,
    });
    points.push({
      x: i * 4.5,
      y: -50 - i * 5,
      group: 'details',
      scrollStart: 0.86 + i * 0.015,
      scrollEnd: 0.92 + i * 0.012,
    });
  }

  return points;
};

const TRISHUL_ANCHORS = generateTrishulAnchors();

export const TrishulTransformation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const [, setRenderTrigger] = useState(0);

  // Orbital atom particles array
  const particlesRef = useRef<
    Array<{
      anchorIndex: number;
      orbitSeed: number;
      orbitSpeed: number;
      curveDip: number;
      tail: Array<{ x: number; y: number; alpha: number }>;
    }>
  >(
    TRISHUL_ANCHORS.map((_, i) => ({
      anchorIndex: i,
      orbitSeed: (i * 1.61803398875) % 1,
      orbitSpeed: 0.8 + ((i * 37) % 50) / 70,
      curveDip: (((i * 73) % 100) - 50) * 1.8,
      tail: [],
    }))
  );

  // Synchronize with scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      targetProgressRef.current = p;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // Link with GSAP ScrollTrigger for coordinated synchronization
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        targetProgressRef.current = self.progress;
      },
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      trigger.kill();
    };
  }, []);

  // Main 60fps animation loop for atom particles
  const animate = useCallback((timestamp: number) => {
    // Read live scroll progress directly on each frame for instant synchronization with Lenis & touch
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetProgressRef.current = Math.min(1, Math.max(0, scrollY / maxScroll));
      }
    }

    // Smooth exponential lerp (0.14) ensures fluid reverse and forward scroll reaction
    currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.14;
    const progress = currentProgressRef.current;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isDesktop = vw > 1024;
        const trishulScale = isDesktop ? 1.0 : 0.65;

        // Current coordinates of Chakra and Trishul
        const chakraCenter = GlobalArrowPool.circleCenter;
        const chakraX = chakraCenter.x;
        const chakraY = chakraCenter.y;

        // Trishul is positioned stably and symmetrically on the opposite (left) side
        const trishulX = isDesktop ? 125 : 68;
        const trishulY = isDesktop ? vh * 0.38 : 78;

        // Check prefers-reduced-motion
        const prefersReducedMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Render traveling atom particles (active between progress 0.10 and 0.98)
        if (!prefersReducedMotion && progress >= 0.08) {
          const particles = particlesRef.current;

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const anchor = TRISHUL_ANCHORS[p.anchorIndex];

            // Particle timeline: start when scroll reaches scrollStart, arrive at scrollEnd
            if (progress < anchor.scrollStart) {
              // Not yet started
              p.tail = [];
              continue;
            }

            const targetWorldX = trishulX + anchor.x * trishulScale;
            const targetWorldY = trishulY + anchor.y * trishulScale;

            if (progress >= anchor.scrollEnd) {
              // Settled at Trishul anchor position
              p.tail = [];

              // At >= 95% progress, a selected subset of particles orbit around the completed Trishul
              if (progress >= 0.95 && i % 18 === 0) {
                const orbitAngle = timestamp * 0.002 * p.orbitSpeed + p.orbitSeed * Math.PI * 2;
                const orbRadiusX = 24 * trishulScale;
                const orbRadiusY = 14 * trishulScale;
                const ox = targetWorldX + Math.cos(orbitAngle) * orbRadiusX;
                const oy = targetWorldY + Math.sin(orbitAngle) * orbRadiusY;

                ctx.save();
                ctx.beginPath();
                ctx.arc(ox, oy, 1.8, 0, Math.PI * 2);
                ctx.fillStyle = '#00E5FF';
                ctx.shadowColor = '#00E5FF';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.restore();
              }
              continue;
            }

            // Particle is IN FLIGHT between Chakra and Trishul anchor!
            const u = (progress - anchor.scrollStart) / (anchor.scrollEnd - anchor.scrollStart);
            // Smooth easeInOutQuad curve
            const ease = u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u;

            // Curved orbital flight trajectory from Chakra (right) to Trishul (left)
            const dx = targetWorldX - chakraX;
            const dy = targetWorldY - chakraY;

            // Base linear interpolation
            let curX = chakraX + dx * ease;
            let curY = chakraY + dy * ease;

            // Add parabolic arc and harmonic atom orbit oscillation
            const arcH = Math.sin(ease * Math.PI) * (p.curveDip || 40);
            const orbitHarmonic = Math.sin(ease * Math.PI * 5 + p.orbitSeed * 10) * (6 * (1 - ease));

            curY += arcH * 0.4 + orbitHarmonic;
            curX += Math.cos(ease * Math.PI * 4 + p.orbitSeed * 10) * (4 * (1 - ease));

            // Record tail for motion blur
            p.tail.unshift({ x: curX, y: curY, alpha: 0.9 });
            if (p.tail.length > 5) p.tail.pop();

            // Draw glowing luminous particle
            ctx.save();

            // Comet tail
            for (let t = 0; t < p.tail.length; t++) {
              const pt = p.tail[t];
              const r = Math.max(0.8, 2.2 - t * 0.4);
              const a = pt.alpha * (1 - t / p.tail.length) * 0.6;
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(56, 189, 248, ${a})`;
              ctx.fill();
            }

            // Main Atom Core
            ctx.beginPath();
            ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#00E5FF';
            ctx.shadowBlur = 10;
            ctx.fill();

            // Cyan Quantum Halo
            ctx.beginPath();
            ctx.arc(curX, curY, 4.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
            ctx.fill();

            ctx.restore();
          }
        }
      }
    }

    // Trigger shallow render update for SVG clip & illumination sync
    setRenderTrigger((prev) => (prev + 1) % 1000);

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Keep canvas size synchronized with window size
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [animate]);

  const progress = currentProgressRef.current;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const isDesktop = vw > 1024;
  const trishulScale = isDesktop ? 1.0 : 0.65;

  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
  const trishulX = isDesktop ? 125 : 68;
  const trishulY = isDesktop ? vh * 0.38 : 78;

  // Progressive construction calculations:
  // 1. Base Stand: Formed between 0.10 and 0.25
  const baseProgress = Math.min(1, Math.max(0, (progress - 0.10) / 0.15));

  // 2. Shaft: Drawn upward between 0.25 and 0.45
  const shaftProgress = Math.min(1, Math.max(0, (progress - 0.25) / 0.20));
  // Shaft top coordinate moves from 96 down to -10 as shaftProgress advances
  const shaftTopY = 96 - shaftProgress * 106;

  // 3. Lower Structure & Collars: Formed between 0.45 and 0.65
  const collarProgress = Math.min(1, Math.max(0, (progress - 0.45) / 0.20));

  // 4. Three Upper Prongs: Formed between 0.65 and 0.85
  const prongsProgress = Math.min(1, Math.max(0, (progress - 0.65) / 0.20));
  // Prongs top coordinate moves from -18 up to -100
  const prongsTopY = -18 - prongsProgress * 82;

  // 5. Illumination & Glow: 0.85 to 1.0
  const illuminationProgress = Math.min(1, Math.max(0, (progress - 0.85) / 0.15));

  // Status label for HUD telemetry
  let statusText = 'ATOMS CONVERGING // 20%';
  if (progress >= 0.95) statusText = 'TRISHUL // CONSTRUCTED';
  else if (progress >= 0.85) statusText = 'ILLUMINATION // 90%';
  else if (progress >= 0.65) statusText = 'FORGING PRONGS // 75%';
  else if (progress >= 0.45) statusText = 'COLLAR & DAMRU // 55%';
  else if (progress >= 0.25) statusText = 'ASSEMBLING SHAFT // 35%';

  return (
    <>
      {/* 1. Atom Particles Flight Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-44"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* 2. Precision SVG Vector Trishul Structure */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-45 overflow-visible"
        style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.5))' }}
      >
        <defs>
          {/* Electric Blue Edge Glow Filter */}
          <filter id="trishul-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="seed-pulse-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* High-Gloss Metallic Blue & Silver Gradients */}
          <linearGradient id="trishul-blade-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#00E5FF" />
            <stop offset="60%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <linearGradient id="trishul-shaft-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="30%" stopColor="#00E5FF" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="trishul-silver-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Dynamic Clip Path for Vertical Shaft: grows from bottom (y=96) to top (y=-10) */}
          <clipPath id="trishul-shaft-clip">
            <rect
              x="-50"
              y={shaftTopY}
              width="100"
              height={Math.max(0, 98 - shaftTopY)}
            />
          </clipPath>

          {/* Dynamic Clip Path for Upper Prongs: grows upward from y=-18 to y=-100 */}
          <clipPath id="trishul-prongs-clip">
            <rect
              x="-60"
              y={prongsTopY}
              width="120"
              height={Math.max(0, -16 - prongsTopY)}
            />
          </clipPath>
        </defs>

        {/* =========================================================================
            TRISHUL STRUCTURE AT (trishulX, trishulY)
            ========================================================================= */}
        <g transform={`translate(${trishulX}, ${trishulY}) scale(${trishulScale})`}>
          
          {/* A. PERMANENT STARTING SEED POINT AT THE VERY BOTTOM (y = 96) */}
          <g transform="translate(0, 96)">
            {/* Luminous Pulsing Seed Halo */}
            <circle
              cx="0"
              cy="0"
              r="7"
              fill="rgba(0, 229, 255, 0.25)"
              filter="url(#seed-pulse-glow)"
              className="animate-pulse"
            />
            <circle
              cx="0"
              cy="0"
              r="3.5"
              fill="#00E5FF"
              filter="url(#seed-pulse-glow)"
            />
            <circle
              cx="0"
              cy="0"
              r="1.8"
              fill="#FFFFFF"
            />
            {/* Tiny initial pedestal stand tick */}
            <line
              x1="-8"
              y1="8"
              x2="8"
              y2="8"
              stroke="rgba(56, 189, 248, 0.6)"
              strokeWidth="1.2"
            />
          </g>

          {/* B. LOWER BASE FINIAL (Formed between 0.10 and 0.25) */}
          {baseProgress > 0 && (
            <g opacity={baseProgress}>
              {/* Metallic Base Diamond */}
              <polygon
                points="-9,96 0,105 9,96 0,90"
                fill="url(#trishul-silver-accent)"
                stroke="rgba(0, 229, 255, 0.7)"
                strokeWidth="1"
                filter="url(#trishul-glow)"
              />
              {/* Bottom Pedestal Bracket */}
              <path
                d="M -12,105 L 12,105 L 8,107 L -8,107 Z"
                fill="#0F172A"
                stroke="rgba(56, 189, 248, 0.5)"
                strokeWidth="0.8"
              />
            </g>
          )}

          {/* C. LONG CENTRAL SHAFT (Assembled upward between 0.25 and 0.45) */}
          {shaftProgress > 0 && (
            <g clipPath="url(#trishul-shaft-clip)">
              {/* Solid Metallic Shaft Body */}
              <rect
                x="-2.2"
                y="-10"
                width="4.4"
                height="106"
                rx="1.2"
                fill="url(#trishul-shaft-gradient)"
                stroke="rgba(56, 189, 248, 0.6)"
                strokeWidth="0.8"
                filter={illuminationProgress > 0.5 ? 'url(#trishul-glow)' : undefined}
              />
              {/* Luminous Core Laser Conduit */}
              <line
                x1="0"
                y1="-10"
                x2="0"
                y2="96"
                stroke="#00E5FF"
                strokeWidth="1.2"
                opacity="0.95"
              />
              {/* Glowing Forging Bead at current shaft construction front */}
              {shaftProgress < 1 && (
                <g transform={`translate(0, ${shaftTopY})`}>
                  <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" filter="url(#trishul-glow)" />
                  <circle cx="0" cy="0" r="6" fill="rgba(0, 229, 255, 0.5)" />
                </g>
              )}
            </g>
          )}

          {/* D. ORNAMENTAL COLLARS & CRESCENT JUNCTION (Formed between 0.45 and 0.65) */}
          {collarProgress > 0 && (
            <g opacity={collarProgress}>
              {/* Lower Grip Collar (y = 65) */}
              <rect
                x="-6.5"
                y="63.5"
                width="13"
                height="3.5"
                rx="1.5"
                fill="url(#trishul-silver-accent)"
                stroke="#00E5FF"
                strokeWidth="0.8"
              />

              {/* Mid Damru-Style Ornamental Knot (y = 35) */}
              <g transform="translate(0, 35)">
                <polygon
                  points="-6,-3 6,-3 -6,3 6,3"
                  fill="url(#trishul-blade-gradient)"
                  stroke="rgba(0, 229, 255, 0.8)"
                  strokeWidth="0.8"
                />
                <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
              </g>

              {/* Upper Collar (y = 5) */}
              <rect
                x="-7"
                y="3"
                width="14"
                height="4"
                rx="1.5"
                fill="url(#trishul-silver-accent)"
                stroke="#00E5FF"
                strokeWidth="0.8"
              />

              {/* Crescent Junction Bracket (y = -18 to -10) */}
              <path
                d="M -18,-18 C -12,-10 12,-10 18,-18 C 12,-14 -12,-14 -18,-18 Z"
                fill="url(#trishul-silver-accent)"
                stroke="rgba(0, 229, 255, 0.85)"
                strokeWidth="1"
                filter={illuminationProgress > 0.5 ? 'url(#trishul-glow)' : undefined}
              />
            </g>
          )}

          {/* E. THE THREE UPPER PRONGS (Assembled between 0.65 and 0.85) */}
          {prongsProgress > 0 && (
            <g clipPath="url(#trishul-prongs-clip)">
              {/* 1. Left Outer Curved Blade */}
              <path
                d="M -6,-18 C -16,-24 -34,-45 -34,-65 C -34,-75 -32,-82 -29,-85 C -28,-82 -28,-72 -26,-65 C -24,-48 -14,-28 -6,-18 Z"
                fill="url(#trishul-blade-gradient)"
                stroke="rgba(0, 229, 255, 0.75)"
                strokeWidth="1"
                filter={illuminationProgress > 0.3 ? 'url(#trishul-glow)' : undefined}
              />
              {/* Left Energy Conduit Spine */}
              <path
                d="M -8,-18 C -14,-26 -28,-48 -28,-78"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="0.8"
                opacity="0.9"
              />

              {/* 2. Right Outer Curved Blade */}
              <path
                d="M 6,-18 C 16,-24 34,-45 34,-65 C 34,-75 32,-82 29,-85 C 28,-82 28,-72 26,-65 C 24,-48 14,-28 6,-18 Z"
                fill="url(#trishul-blade-gradient)"
                stroke="rgba(0, 229, 255, 0.75)"
                strokeWidth="1"
                filter={illuminationProgress > 0.3 ? 'url(#trishul-glow)' : undefined}
              />
              {/* Right Energy Conduit Spine */}
              <path
                d="M 8,-18 C 14,-26 28,-48 28,-78"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="0.8"
                opacity="0.9"
              />

              {/* 3. Central Spearhead Blade */}
              <path
                d="M -3.5,-18 L -4.5,-60 L -7,-75 L 0,-96 L 7,-75 L 4.5,-60 L 3.5,-18 Z"
                fill="url(#trishul-blade-gradient)"
                stroke="rgba(0, 229, 255, 0.85)"
                strokeWidth="1"
                filter={illuminationProgress > 0.3 ? 'url(#trishul-glow)' : undefined}
              />
              {/* Center Blade Spine Ridge */}
              <line
                x1="0"
                y1="-18"
                x2="0"
                y2="-92"
                stroke="#F0F9FF"
                strokeWidth="1.1"
                opacity="0.95"
              />

              {/* Glowing Forging Beads at current prong tips */}
              {prongsProgress < 1 && (
                <g transform={`translate(0, ${prongsTopY})`}>
                  <circle cx="0" cy="0" r="3" fill="#FFFFFF" filter="url(#trishul-glow)" />
                </g>
              )}
            </g>
          )}

          {/* F. COMPLETED ILLUMINATION & AURA (At 85% to 100%) */}
          {illuminationProgress > 0 && (
            <g opacity={illuminationProgress}>
              {/* Electric Blue Aura Outline */}
              <circle cx="0" cy="-96" r="3.2" fill="#FFFFFF" filter="url(#trishul-glow)" />
              <circle cx="-29" cy="-85" r="2.5" fill="#FFFFFF" filter="url(#trishul-glow)" />
              <circle cx="29" cy="-85" r="2.5" fill="#FFFFFF" filter="url(#trishul-glow)" />

              {/* Ambient Telemetry Ring behind the Trishul head */}
              <circle
                cx="0"
                cy="-45"
                r="44"
                fill="none"
                stroke="rgba(0, 229, 255, 0.15)"
                strokeWidth="0.8"
                strokeDasharray="4 6"
              />
            </g>
          )}

          {/* G. TELEMETRY HUD BADGE UNDER TRISHUL (Visible only when construction begins: progress >= 0.10) */}
          {progress >= 0.10 && (
            <g transform="translate(0, 122)" opacity={Math.min(1, (progress - 0.10) / 0.08)}>
              <rect
                x="-78"
                y="-10"
                width="156"
                height="20"
                rx="10"
                fill="#070E1A"
                stroke="rgba(56, 189, 248, 0.35)"
                strokeWidth="0.9"
              />
              <circle
                cx="-64"
                cy="0"
                r="2.5"
                fill="#00E5FF"
                filter="url(#trishul-glow)"
                className={progress < 0.95 ? 'animate-ping' : undefined}
              />
              <text
                x="5"
                y="3"
                textAnchor="middle"
                fill="#38BDF8"
                fontSize="7.5"
                fontFamily="monospace"
                letterSpacing="0.8"
                fontWeight="bold"
              >
                {statusText}
              </text>
            </g>
          )}

        </g>
      </svg>
    </>
  );
};

export default TrishulTransformation;