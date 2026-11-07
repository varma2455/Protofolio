/**
 * GlobalArrowOverlay.tsx
 * Full-viewport SVG overlay that renders EXACTLY 10 persistent arrow agents and their
 * Sudarshan Chakra-inspired circular energy wheel formation.
 * - All 10 arrows exist permanently and are never duplicated or cloned.
 * - Circular chakra formation rotates smoothly; speed scales dynamically with scroll velocity.
 * - Dispatches arrows to boundary and text tasks, then returns them smoothly to their exact circular slots.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GlobalArrowPool, ArrowAgent } from './GlobalArrowPool';
import { ArrowTaskManager, ConstructionTask } from './ArrowTaskManager';
import { scrollVelocity } from './ScrollVelocityController';

export const GlobalArrowOverlay: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [, setRenderTrigger] = useState(0);

  // Position and state tracking refs for 60fps rendering without full React tree re-renders
  const animFrameRef = useRef<number | null>(null);
  const homeCircleRotationRef = useRef<number>(0);
  const currentSpeedRef = useRef<number>(0.32);

  // Per-agent flight animation data for EXACTLY 10 Arrow Agents
  const flightDataRef = useRef<
    Array<{
      startX: number;
      startY: number;
      startAngle: number;
      targetX: number;
      targetY: number;
      startTime: number;
      duration: number;
      // For boundary tracing
      bounds?: DOMRect;
      borderRadius?: number;
      perimeter?: number;
    }>
  >(
    Array.from({ length: 10 }, () => ({
      startX: 0,
      startY: 0,
      startAngle: 0,
      targetX: 0,
      targetY: 0,
      startTime: 0,
      duration: 1000,
    }))
  );

  // Get point and tangent angle at fraction p (0..1) around rounded rectangle
  const getRoundedRectPoint = (
    bounds: DOMRect,
    r: number,
    p: number
  ): { x: number; y: number; angle: number } => {
    const w = bounds.width;
    const h = bounds.height;
    r = Math.min(r, w / 2, h / 2);

    const topLen = w - 2 * r;
    const rightLen = h - 2 * r;
    const bottomLen = w - 2 * r;
    const leftLen = h - 2 * r;
    const cornerLen = (Math.PI * r) / 2;
    const total = 2 * topLen + 2 * rightLen + 4 * cornerLen;

    let dist = p * total;

    // 1. Top edge (left to right)
    if (dist <= topLen) {
      return {
        x: bounds.left + r + dist,
        y: bounds.top,
        angle: 0,
      };
    }
    dist -= topLen;

    // 2. Top-right corner
    if (dist <= cornerLen) {
      const angle = (dist / cornerLen) * (Math.PI / 2);
      return {
        x: bounds.left + w - r + Math.sin(angle) * r,
        y: bounds.top + r - Math.cos(angle) * r,
        angle: (angle * 180) / Math.PI,
      };
    }
    dist -= cornerLen;

    // 3. Right edge (top to bottom)
    if (dist <= rightLen) {
      return {
        x: bounds.left + w,
        y: bounds.top + r + dist,
        angle: 90,
      };
    }
    dist -= rightLen;

    // 4. Bottom-right corner
    if (dist <= cornerLen) {
      const angle = (dist / cornerLen) * (Math.PI / 2);
      return {
        x: bounds.left + w - r + Math.cos(angle) * r,
        y: bounds.top + h - r + Math.sin(angle) * r,
        angle: 90 + (angle * 180) / Math.PI,
      };
    }
    dist -= cornerLen;

    // 5. Bottom edge (right to left)
    if (dist <= bottomLen) {
      return {
        x: bounds.left + w - r - dist,
        y: bounds.top + h,
        angle: 180,
      };
    }
    dist -= bottomLen;

    // 6. Bottom-left corner
    if (dist <= cornerLen) {
      const angle = (dist / cornerLen) * (Math.PI / 2);
      return {
        x: bounds.left + r - Math.sin(angle) * r,
        y: bounds.top + h - r + Math.cos(angle) * r,
        angle: 180 + (angle * 180) / Math.PI,
      };
    }
    dist -= cornerLen;

    // 7. Left edge (bottom to top)
    if (dist <= leftLen) {
      return {
        x: bounds.left,
        y: bounds.top + h - r - dist,
        angle: 270,
      };
    }
    dist -= leftLen;

    // 8. Top-left corner
    const angle = (dist / cornerLen) * (Math.PI / 2);
    return {
      x: bounds.left + r - Math.cos(angle) * r,
      y: bounds.top + r - Math.sin(angle) * r,
      angle: 270 + (angle * 180) / Math.PI,
    };
  };

  // Main 60fps Animation Loop
  const animate = useCallback((timestamp: number) => {
    // 1. Rotate Sudarshan Chakra continuously (speed dynamically scales with scroll velocity)
    const baseRotationSpeed = 0.32; // degrees/frame idle
    const targetSpeed = baseRotationSpeed * scrollVelocity.speedMultiplier;
    // Exponential smoothing for fluid acceleration & deceleration without jumps
    currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.08;
    homeCircleRotationRef.current = (homeCircleRotationRef.current + currentSpeedRef.current) % 360;

    GlobalArrowPool.circleRotation = homeCircleRotationRef.current;
    GlobalArrowPool.stepCircleCenter();

    const pool = GlobalArrowPool;
    const taskMgr = ArrowTaskManager;

    // 2. Update each of the EXACTLY 10 Arrow Agents
    for (let i = 0; i < pool.agents.length; i++) {
      const agent = pool.agents[i];
      const flight = flightDataRef.current[i];
      const homePos = pool.getHomePosition(agent.index);

      // STATE: HOME -> Sitting securely in Sudarshan Chakra circular docking position
      if (agent.state === 'home') {
        agent.x = homePos.x;
        agent.y = homePos.y;
        agent.angle = homePos.angle;
        agent.trail = [];
        continue;
      }

      // STATE: TRAVELING -> Flying smoothly from rotating chakra slot toward target
      if (agent.state === 'traveling') {
        if (flight.startTime === 0) {
          flight.startX = agent.x;
          flight.startY = agent.y;
          flight.startAngle = agent.angle;
          flight.startTime = timestamp;
          // Travel duration dynamically scaled by scroll velocity
          flight.duration = scrollVelocity.scaleDuration(650);
        }

        const elapsed = timestamp - flight.startTime;
        const p = Math.min(1, elapsed / flight.duration);
        // Smooth easeInOutQuad curve
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;

        agent.x = flight.startX + (agent.targetX - flight.startX) * ease;
        agent.y = flight.startY + (agent.targetY - flight.startY) * ease;

        const dx = agent.targetX - flight.startX;
        const dy = agent.targetY - flight.startY;
        agent.angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        // Record trailing electric particle
        agent.trail.unshift({ x: agent.x, y: agent.y, opacity: 0.85 });
        if (agent.trail.length > 8) agent.trail.pop();

        if (p >= 1) {
          // Reached target -> transition to WORKING
          agent.state = 'working';
          flight.startTime = 0;
        }
        continue;
      }

      // STATE: WORKING -> Performing boundary drawing or text painting
      if (agent.state === 'working') {
        const taskId = agent.currentTaskId;
        const task = taskId ? (taskMgr as any).tasks.get(taskId) as ConstructionTask | undefined : undefined;

        if (!task || task.status === 'completed') {
          // Task was aborted or completed -> transition to RETURNING
          agent.state = 'returning';
          flight.startTime = 0;
          continue;
        }

        if (flight.startTime === 0) {
          flight.startTime = timestamp;
          const bounds = task.getBounds();
          flight.bounds = bounds || undefined;
          flight.borderRadius = task.borderRadius || 20;

          // Scale working duration based on task type and scroll velocity
          const baseDuration = task.type === 'boundary' ? 1200 : 800;
          flight.duration = scrollVelocity.scaleDuration(baseDuration);
        }

        const elapsed = timestamp - flight.startTime;
        const p = Math.min(1, elapsed / flight.duration);
        agent.taskProgress = p;

        const bounds = task.getBounds() || flight.bounds;

        if (bounds) {
          if (task.type === 'boundary') {
            // Trace perimeter of target bounding box
            const pt = getRoundedRectPoint(bounds, flight.borderRadius || 20, p);
            agent.x = pt.x;
            agent.y = pt.y;
            agent.angle = pt.angle;
          } else {
            // Text painting: sweep across the text bounding box from left to right
            agent.x = bounds.left + bounds.width * p;
            agent.y = bounds.top + bounds.height * 0.5;
            agent.angle = 0;
          }

          // Report progress back to task listener
          task.onProgress?.(p, { x: agent.x, y: agent.y, angle: agent.angle });
        }

        // Record trailing particle
        agent.trail.unshift({ x: agent.x, y: agent.y, opacity: 0.95 });
        if (agent.trail.length > 10) agent.trail.pop();

        if (p >= 1) {
          // Work complete! Notify task manager and return arrow to home chakra
          taskMgr.completeTask(task, agent);
          agent.state = 'returning';
          flight.startTime = 0;
        }
        continue;
      }

      // STATE: RETURNING -> Flying back to circular home slot on the rotating chakra
      if (agent.state === 'returning') {
        if (flight.startTime === 0) {
          flight.startX = agent.x;
          flight.startY = agent.y;
          flight.startTime = timestamp;
          flight.duration = scrollVelocity.scaleDuration(600);
        }

        const elapsed = timestamp - flight.startTime;
        const p = Math.min(1, elapsed / flight.duration);
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;

        // Target is the rotating home position on the chakra
        const currentHome = pool.getHomePosition(agent.index);

        agent.x = flight.startX + (currentHome.x - flight.startX) * ease;
        agent.y = flight.startY + (currentHome.y - flight.startY) * ease;

        const dx = currentHome.x - flight.startX;
        const dy = currentHome.y - flight.startY;
        agent.angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        agent.trail.unshift({ x: agent.x, y: agent.y, opacity: 0.7 * (1 - p) });
        if (agent.trail.length > 6) agent.trail.pop();

        if (p >= 1) {
          // Docked back into exact rotating chakra slot!
          agent.state = 'home';
          agent.x = currentHome.x;
          agent.y = currentHome.y;
          agent.angle = currentHome.angle;
          agent.trail = [];
          flight.startTime = 0;
        }
      }
    }

    // Force shallow re-render of SVG elements
    setRenderTrigger((prev) => (prev + 1) % 1000);

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [animate]);

  const pool = GlobalArrowPool;
  const center = pool.circleCenter;
  const radius = pool.circleRadius;
  const rotation = homeCircleRotationRef.current;

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-45 overflow-visible"
      style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.5))' }}
    >
      <defs>
        {/* Futuristic Electric Blue & Silver Shading Filters */}
        <filter id="chakra-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="blade-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* High-Tech Metallic Blue Gradients */}
        <linearGradient id="arrow-blue-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0F9FF" />
          <stop offset="25%" stopColor="#00E5FF" />
          <stop offset="65%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        <linearGradient id="arrow-silver-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#BAE6FD" />
          <stop offset="75%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        {/* Sudarshan Chakra Serrated Aerodynamic Blade Gradient */}
        <linearGradient id="chakra-blade-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#0284C7" stopOpacity="0.8" />
          <stop offset="85%" stopColor="#1E293B" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#030712" stopOpacity="0.9" />
        </linearGradient>

        {/* Central Core Gradient */}
        <radialGradient id="chakra-core-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
          <stop offset="45%" stopColor="#0284C7" stopOpacity="0.85" />
          <stop offset="75%" stopColor="#0B132B" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#030712" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* =========================================================================
          1. THE ROTATING SUDARSHAN CHAKRA ENERGY FORMATION (Home Docking Ring)
          ========================================================================= */}
      <g transform={`translate(${center.x}, ${center.y})`}>
        {/* Fully Synchronized Rotating Chakra Disc Group */}
        <g transform={`rotate(${rotation})`}>
          {/* Outer Electric Atmosphere Ring */}
          <circle
            r={radius * 1.3}
            fill="none"
            stroke="rgba(0, 229, 255, 0.12)"
            strokeWidth="1"
            strokeDasharray="6 8"
          />

          {/* Outer Luminous Energy Halo Ring */}
          <circle
            r={radius * 1.15}
            fill="none"
            stroke="rgba(56, 189, 248, 0.28)"
            strokeWidth="1.2"
            filter="url(#chakra-glow)"
          />

          {/* 10 SUDARSHAN CHAKRA BLADE EXTENSIONS (Serrated aerodynamic energy fins) */}
          {Array.from({ length: 10 }).map((_, i) => {
            const bladeAngle = i * 36 + 18; // Exactly halfway between each of the 10 arrows
            return (
              <g key={`chakra-blade-${i}`} transform={`rotate(${bladeAngle})`}>
                {/* Curved Aerodynamic Blade Fin */}
                <path
                  d={`M -7,-${radius * 0.88} 
                      C -4,-${radius * 1.05} 6,-${radius * 1.16} 16,-${radius * 1.28} 
                      C 11,-${radius * 1.15} 4,-${radius * 1.02} 2,-${radius * 0.88} Z`}
                  fill="url(#chakra-blade-gradient)"
                  stroke="rgba(0, 229, 255, 0.65)"
                  strokeWidth="0.8"
                  filter="url(#blade-glow)"
                />
                {/* Internal Luminous Energy Spine */}
                <path
                  d={`M -2,-${radius * 0.95} L 12,-${radius * 1.22}`}
                  stroke="#F0F9FF"
                  strokeWidth="0.85"
                  opacity="0.9"
                />
                {/* Micro-spark at blade tip */}
                <circle
                  cx="16"
                  cy={-radius * 1.28}
                  r="1.2"
                  fill="#FFFFFF"
                  filter="url(#chakra-glow)"
                />
              </g>
            );
          })}

          {/* Outer Circumference Carrier Track */}
          <circle
            r={radius}
            fill="none"
            stroke="rgba(56, 189, 248, 0.45)"
            strokeWidth="1.6"
          />

          {/* 30 Precision Circumferential Hash Marks */}
          {Array.from({ length: 30 }).map((_, idx) => (
            <line
              key={`hash-${idx}`}
              x1="0"
              y1={-radius - 3}
              x2="0"
              y2={-radius + 3}
              stroke="rgba(0, 229, 255, 0.35)"
              strokeWidth="0.8"
              transform={`rotate(${idx * 12})`}
            />
          ))}

          {/* 10 Radial Energy Spokes connecting Hub to Rim */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={`spoke-${i}`} transform={`rotate(${i * 36})`}>
              <line
                x1="0"
                y1={-24}
                x2="0"
                y2={-radius + 6}
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="1"
              />
              {/* Spoke Energy Relay Node */}
              <circle
                cx="0"
                cy={-radius * 0.58}
                r="1.8"
                fill="#38BDF8"
                stroke="rgba(0, 229, 255, 0.5)"
                strokeWidth="0.5"
              />
            </g>
          ))}

          {/* Inner Concentric Circular Precision Rings */}
          <circle
            r={radius * 0.65}
            fill="none"
            stroke="rgba(0, 229, 255, 0.3)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle
            r={radius * 0.45}
            fill="none"
            stroke="rgba(148, 163, 184, 0.22)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />

          {/* Refined Central Power Hub */}
          <circle
            r="24"
            fill="#070E1A"
            stroke="rgba(56, 189, 248, 0.55)"
            strokeWidth="1.5"
          />

          {/* 10 Precision Notches around Central Hub Rim */}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`hub-notch-${i}`}
              x1="0"
              y1="-24"
              x2="0"
              y2="-21"
              stroke="#00E5FF"
              strokeWidth="1.2"
              transform={`rotate(${i * 36})`}
            />
          ))}

          {/* Mid Hub Ring */}
          <circle
            r="16"
            fill="#030712"
            stroke="rgba(0, 229, 255, 0.45)"
            strokeWidth="1"
          />

          {/* Core Energy Nucleus */}
          <circle
            r="8"
            fill="url(#chakra-core-gradient)"
            filter="url(#hub-glow)"
          />
          <circle
            r="4.5"
            fill="#00E5FF"
            filter="url(#chakra-glow)"
          />
          <circle
            r="2"
            fill="#FFFFFF"
          />

          {/* 10 Permanent Holographic Docking Sockets */}
          {pool.agents.map((agent) => {
            const angleRad = agent.homeAngle;
            const relX = Math.cos(angleRad) * radius;
            const relY = Math.sin(angleRad) * radius;
            const isAway = agent.state !== 'home';

            return (
              <g key={`dock-${agent.id}`} transform={`translate(${relX}, ${relY})`}>
                {/* Outer socket bracket */}
                <circle
                  r="8"
                  fill={isAway ? 'rgba(3, 7, 18, 0.75)' : 'none'}
                  stroke={isAway ? 'rgba(0, 229, 255, 0.6)' : 'rgba(56, 189, 248, 0.25)'}
                  strokeWidth="1.2"
                  strokeDasharray={isAway ? '2 3' : undefined}
                />
                {/* Deployed blinking cradle beacon */}
                {isAway && (
                  <circle
                    r="2.5"
                    fill="#00E5FF"
                    filter="url(#chakra-glow)"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Telemetry HUD Badge under the Sudarshan Chakra (stays horizontally oriented) */}
        <g transform={`translate(0, ${radius + 28})`}>
          <rect
            x="-92"
            y="-11"
            width="184"
            height="22"
            rx="11"
            fill="#070E1A"
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth="1"
          />
          <circle
            cx="-76"
            cy="0"
            r="3"
            fill="#00E5FF"
            filter="url(#chakra-glow)"
          />
          <text
            x="-4"
            y="3.5"
            textAnchor="middle"
            fill="#38BDF8"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="1"
            fontWeight="bold"
          >
            SUDARSHAN CHAKRA // 10 AGENTS
          </text>
          <text
            x="76"
            y="3.5"
            textAnchor="end"
            fill="#00E5FF"
            fontSize="7.5"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {scrollVelocity.speedMultiplier.toFixed(1)}X
          </text>
        </g>
      </g>

      {/* =========================================================================
          2. THE EXACTLY 10 ARROW AGENTS (Never more, never less)
          ========================================================================= */}
      {pool.agents.map((agent) => {
        return (
          <g key={agent.id}>
            {/* Luminous Particle Trail */}
            {agent.trail.map((pt, tIdx) => {
              const r = Math.max(1, 3.4 - tIdx * 0.3);
              const op = pt.opacity * (1 - tIdx / agent.trail.length);
              return (
                <circle
                  key={tIdx}
                  cx={pt.x}
                  cy={pt.y}
                  r={r}
                  fill={agent.color}
                  opacity={op}
                />
              );
            })}

            {/* Arrow Agent Group: positioned at (agent.x, agent.y) rotated to agent.angle */}
            <g
              transform={`translate(${agent.x}, ${agent.y}) rotate(${agent.angle})`}
            >
              {/* Soft Energy Halo */}
              <circle
                cx="0"
                cy="0"
                r="12"
                fill={agent.glowColor}
                opacity="0.4"
                filter="url(#chakra-glow)"
              />

              {/* High-Gloss Aerodynamic Supersonic Arrowhead */}
              <polygon
                points="-11,-7 11,0 -11,7 -5,0"
                fill={agent.index % 2 === 0 ? 'url(#arrow-blue-metallic)' : 'url(#arrow-silver-blue)'}
                stroke={agent.color}
                strokeWidth="1"
                filter="url(#blade-glow)"
              />

              {/* Aerodynamic Dual Stabilizer Fins */}
              <polygon
                points="-13,-8 -7,-5 -11,-3"
                fill="url(#arrow-blue-metallic)"
                stroke={agent.color}
                strokeWidth="0.5"
                opacity="0.85"
              />
              <polygon
                points="-13,8 -7,5 -11,3"
                fill="url(#arrow-blue-metallic)"
                stroke={agent.color}
                strokeWidth="0.5"
                opacity="0.85"
              />

              {/* Glowing Luminous Tip Particles */}
              <circle cx="11" cy="0" r="2.2" fill="#FFFFFF" />
              <circle cx="4" cy="0" r="1.6" fill={agent.color} />
              <circle cx="-1" cy="0" r="1.2" fill="#00E5FF" opacity="0.8" />

              {/* Agent ID Micro-Label when deployed */}
              {agent.state !== 'home' && (
                <g transform="translate(-13, -11)">
                  <rect
                    x="-10"
                    y="-6"
                    width="22"
                    height="11"
                    rx="3.5"
                    fill="#070E1A"
                    stroke={agent.color}
                    strokeWidth="0.9"
                  />
                  <text
                    x="1"
                    y="2"
                    textAnchor="middle"
                    fill={agent.color}
                    fontSize="6.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    A{agent.index + 1}
                  </text>
                </g>
              )}
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export default GlobalArrowOverlay;