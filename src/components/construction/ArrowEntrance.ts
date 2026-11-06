/**
 * ArrowEntrance.ts
 * Manages arrow entrance flight paths from outside viewport edges
 * to the target container's destination coordinates with natural easing.
 */

import { ArrowEdge } from './RandomArrowGenerator';

export interface EntranceCoordinates {
  startX: number;
  startY: number;
  controlX: number;
  controlY: number;
  targetX: number;
  targetY: number;
  pathD: string;
}

/**
 * Computes entrance trajectory curve from beyond the viewport edges
 * to the target element's starting anchor point.
 */
export function computeEntrancePath(
  targetX: number,
  targetY: number,
  edge: ArrowEdge,
  viewWidth = typeof window !== 'undefined' ? window.innerWidth : 1920,
  viewHeight = typeof window !== 'undefined' ? window.innerHeight : 1080
): EntranceCoordinates {
  const margin = 160; // Distance offscreen
  let startX = 0;
  let startY = 0;

  switch (edge) {
    case 'top':
      startX = targetX + (Math.random() * 200 - 100);
      startY = -margin;
      break;
    case 'bottom':
      startX = targetX + (Math.random() * 200 - 100);
      startY = viewHeight + margin;
      break;
    case 'left':
      startX = -margin;
      startY = targetY + (Math.random() * 200 - 100);
      break;
    case 'right':
      startX = viewWidth + margin;
      startY = targetY + (Math.random() * 200 - 100);
      break;
    case 'top-left':
      startX = -margin;
      startY = -margin;
      break;
    case 'top-right':
      startX = viewWidth + margin;
      startY = -margin;
      break;
    case 'bottom-left':
      startX = -margin;
      startY = viewHeight + margin;
      break;
    case 'bottom-right':
      startX = viewWidth + margin;
      startY = viewHeight + margin;
      break;
    default:
      startX = -margin;
      startY = targetY;
  }

  // Smooth quadratic Bezier control point with dynamic organic curvature
  const midX = (startX + targetX) / 2;
  const midY = (startY + targetY) / 2;
  const offset = 80;
  const controlX = midX + (startY > targetY ? offset : -offset);
  const controlY = midY + (startX > targetX ? -offset : offset);

  const pathD = `M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;

  return {
    startX,
    startY,
    controlX,
    controlY,
    targetX,
    targetY,
    pathD,
  };
}
