/**
 * GlobalArrowOverlay.tsx
 * Full-viewport SVG overlay that renders EXACTLY 8 persistent arrow agents and their circular home formation.
 * - All 8 arrows exist permanently and are never duplicated or cloned.
 * - Circular formation rotates continuously; velocity scales with visitor scroll speed.
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

  // Per-agent flight animation data
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
    Array.from({ length: 8 }, () => ({
      startX: 0,
      startY: 0,
      startAngle: 0,
      targetX: 0,
      targetY: 0,
      startTime: 0,
      duration: 1000,
    }))
  );

  // Calculate perimeter distance around a rounded rectangle
  const computeRoundedRectPerimeter = (w: number, h: number, r: number) => {
    return 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;
  };

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
    // 1. Rotate Home Circle continuously (speed scales with scroll velocity)
    const baseRotationSpeed = 0.35; // degrees/frame
    const speedMult = scrollVelocity.speedMultiplier;
    homeCircleRotationRef.current = (homeCircleRotationRef.current + baseRotationSpeed * speedMult) % 360;
    GlobalArrowPool.circleRotation = homeCircleRotationRef.current;
    GlobalArrowPool.stepCircleCenter();

    const pool = GlobalArrowPool;
    const taskMgr = ArrowTaskManager;

    // 2. Update each of the EXACTLY 8 Arrow Agents
    for (let i = 0; i < pool.agents.length; i++) {
      const agent = pool.agents[i];
      const flight = flightDataRef.current[i];
      const homePos = pool.getHomePosition(agent.index);

      // STATE: HOME -> Sitting in circular formation
      if (agent.state === 'home') {
        agent.x = homePos.x;
        agent.y = homePos.y;
        agent.angle = homePos.angle;
        agent.trail = [];
        continue;
      }

      // STATE: TRAVELING -> Flying from circular home position to target
      if (agent.state === 'traveling') {
        if (flight.startTime === 0) {
          flight.startX = agent.x;
          flight.startY = agent.y;
          flight.startAngle = agent.angle;
          flight.startTime = timestamp;
          // Travel duration scaled by scroll velocity
          flight.duration = scrollVelocity.scaleDuration(650);
        }

        const elapsed = timestamp - flight.startTime;
        const p = Math.min(1, elapsed / flight.duration);
        // Smooth easeInOutQuad
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;

        agent.x = flight.startX + (agent.targetX - flight.startX) * ease;
        agent.y = flight.startY + (agent.targetY - flight.startY) * ease;

        const dx = agent.targetX - flight.startX;
        const dy = agent.targetY - flight.startY;
        agent.angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        // Record trailing particle
        agent.trail.unshift({ x: agent.x, y: agent.y, opacity: 0.8 });
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
        agent.trail.unshift({ x: agent.x, y: agent.y, opacity: 0.9 });
        if (agent.trail.length > 10) agent.trail.pop();

        if (p >= 1) {
          // Work complete! Notify task manager and return arrow to home circle
          taskMgr.completeTask(task, agent);
          agent.state = 'returning';
          flight.startTime = 0;
        }
        continue;
      }

      // STATE: RETURNING -> Flying back to circular home slot
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

        // Target is the rotating home position
        const currentHome = pool.getHomePosition(agent.index);

        agent.x = flight.startX + (currentHome.x - flight.startX) * ease;
        agent.y = flight.startY + (currentHome.y - flight.startY) * ease;

        const dx = currentHome.x - flight.startX;
        const dy = currentHome.y - flight.startY;
        agent.angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        agent.trail.unshift({ x: agent.x, y: agent.y, opacity: 0.6 * (1 - p) });
        if (agent.trail.length > 6) agent.trail.pop();

        if (p >= 1) {
          // Docked back into circular home position!
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

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-45 overflow-visible"
      style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.5))' }}
    >
      <defs>
        {/* Metallic Gold & Silver Shading Filters */}
        <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E6" />
          <stop offset="50%" stopColor="#D6B36A" />
          <stop offset="100%" stopColor="#B99555" />
        </linearGradient>

        <linearGradient id="silver-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>

      {/* =========================================================================
          1. THE PERSISTENT CIRCULAR FORMATION (Home Docking Ring)
          ========================================================================= */}
      <g transform={`translate(${center.x}, ${center.y})`}>
        {/* Outer Orbital Orbit Ring */}
        <circle
          r={radius}
          fill="none"
          stroke="rgba(214, 179, 106, 0.22)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />

        {/* Inner Gyroscopic Ring */}
        <circle
          r={radius * 0.65}
          fill="none"
          stroke="rgba(214, 179, 106, 0.15)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Central Core Telemetry Reticle */}
        <circle
          r="16"
          fill="#14120F"
          stroke="rgba(214, 179, 106, 0.35)"
          strokeWidth="1.2"
        />
        <circle r="4" fill="#D6B36A" filter="url(#gold-glow)" />

        {/* Telemetry Micro-Badge under the ring */}
        <g transform={`translate(0, ${radius + 22})`}>
          <rect
            x="-65"
            y="-10"
            width="130"
            height="20"
            rx="10"
            fill="#14120F"
            stroke="rgba(214, 179, 106, 0.25)"
            strokeWidth="1"
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill="#D6B36A"
            fontSize="8.5"
            fontFamily="monospace"
            letterSpacing="1"
          >
            8 ARROW AGENTS // POOL
          </text>
        </g>

        {/* 8 Permanent Circular Docking Sockets (Ghost rings when arrow is deployed) */}
        {pool.agents.map((agent) => {
          const homePos = pool.getHomePosition(agent.index);
          const relX = homePos.x - center.x;
          const relY = homePos.y - center.y;
          const isAway = agent.state !== 'home';

          return (
            <g key={`dock-${agent.id}`} transform={`translate(${relX}, ${relY})`}>
              <circle
                r="7"
                fill={isAway ? 'rgba(33, 29, 23, 0.6)' : 'none'}
                stroke={isAway ? 'rgba(214, 179, 106, 0.35)' : 'none'}
                strokeWidth="1"
                strokeDasharray={isAway ? '2 2' : undefined}
              />
              {isAway && (
                <circle r="2" fill="#D6B36A" opacity="0.4" />
              )}
            </g>
          );
        })}
      </g>

      {/* =========================================================================
          2. THE EXACTLY 8 ARROW AGENTS (Never more, never less)
          ========================================================================= */}
      {pool.agents.map((agent) => {
        return (
          <g key={agent.id}>
            {/* Luminous Particle Trail */}
            {agent.trail.map((pt, tIdx) => {
              const r = Math.max(1, 3.2 - tIdx * 0.3);
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
                r="11"
                fill={agent.glowColor}
                opacity="0.35"
              />

              {/* High-Gloss Aerodynamic Arrowhead */}
              <polygon
                points="-10,-6 8,0 -10,6 -4,0"
                fill={agent.index % 2 === 0 ? 'url(#gold-metallic)' : 'url(#silver-metallic)'}
                stroke={agent.color}
                strokeWidth="1"
                filter="url(#gold-glow)"
              />

              {/* Glowing Luminous Tip Particle */}
              <circle cx="8" cy="0" r="2" fill="#F5F0E6" />
              <circle cx="2" cy="0" r="1.5" fill={agent.color} />

              {/* Agent ID Micro-Label when deployed */}
              {agent.state !== 'home' && (
                <g transform="translate(-12, -10)">
                  <rect
                    x="-10"
                    y="-6"
                    width="20"
                    height="10"
                    rx="3"
                    fill="#14120F"
                    stroke={agent.color}
                    strokeWidth="0.8"
                  />
                  <text
                    x="0"
                    y="1.5"
                    textAnchor="middle"
                    fill={agent.color}
                    fontSize="6"
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
