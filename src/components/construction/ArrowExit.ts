/**
 * ArrowExit.ts
 * Manages arrow exit trajectories from container completion coordinates
 * outward to off-screen viewport edges with rapid acceleration.
 */

import { ArrowEdge } from './RandomArrowGenerator';

export interface ExitCoordinates {
  startX: number;
  startY: number;
  controlX: number;
  controlY: number;
  exitX: number;
  exitY: number;
  pathD: string;
}

/**
 * Computes exit trajectory from the finish point to outside the viewport
 */
export function computeExitPath(
  startX: number,
  startY: number,
  edge: ArrowEdge,
  viewWidth = typeof window !== 'undefined' ? window.innerWidth : 1920,
  viewHeight = typeof window !== 'undefined' ? window.innerHeight : 1080
): ExitCoordinates {
  const margin = 200;
  let exitX = 0;
  let exitY = 0;

  switch (edge) {
    case 'top':
      exitX = startX + (Math.random() * 300 - 150);
      exitY = -margin;
      break;
    case 'bottom':
      exitX = startX + (Math.random() * 300 - 150);
      exitY = viewHeight + margin;
      break;
    case 'left':
      exitX = -margin;
      exitY = startY + (Math.random() * 300 - 150);
      break;
    case 'right':
      exitX = viewWidth + margin;
      exitY = startY + (Math.random() * 300 - 150);
      break;
    case 'top-left':
      exitX = -margin;
      exitY = -margin;
      break;
    case 'top-right':
      exitX = viewWidth + margin;
      exitY = -margin;
      break;
    case 'bottom-left':
      exitX = -margin;
      exitY = viewHeight + margin;
      break;
    case 'bottom-right':
      exitX = viewWidth + margin;
      exitY = viewHeight + margin;
      break;
    default:
      exitX = viewWidth + margin;
      exitY = -margin;
  }

  const midX = (startX + exitX) / 2;
  const midY = (startY + exitY) / 2;
  const controlX = midX + 60;
  const controlY = midY - 60;

  const pathD = `M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${exitX.toFixed(1)} ${exitY.toFixed(1)}`;

  return {
    startX,
    startY,
    controlX,
    controlY,
    exitX,
    exitY,
    pathD,
  };
}
