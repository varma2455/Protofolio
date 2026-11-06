/**
 * PaintRevealText.tsx
 * Synchronized text and content reveal component.
 * Uses a dynamic clipping mask and liquid-light effect driven by Arrow 2's progress.
 * Leaves text permanently revealed, readable, and interactive once complete.
 */

import React from 'react';

export interface PaintRevealTextProps {
  children: React.ReactNode;
  progress: number; // 0 to 1
  isPainting: boolean;
  isRevealed: boolean;
  accentColor?: string;
  className?: string;
}

export const PaintRevealText: React.FC<PaintRevealTextProps> = ({
  children,
  progress,
  isPainting,
  isRevealed,
  accentColor = '#00E5FF',
  className = '',
}) => {
  // If permanently revealed, clear clip path and enable full pointer interaction
  if (isRevealed) {
    return (
      <div className={`relative w-full transition-opacity duration-300 pointer-events-auto opacity-100 ${className}`}>
        {children}
      </div>
    );
  }

  // If not yet reached painting phase, content is 100% hidden
  if (!isPainting && progress <= 0) {
    return (
      <div
        className={`relative w-full opacity-0 pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        {children}
      </div>
    );
  }

  // Active painting: Angled diagonal clip path synchronized with the arrow paintbrush
  const p = Math.min(1, Math.max(0, progress));
  const topEdge = p * 115;
  const bottomEdge = Math.max(0, p * 115 - 15);
  const clipPathStyle = `polygon(0% 0%, ${topEdge.toFixed(1)}% 0%, ${bottomEdge.toFixed(1)}% 100%, 0% 100%)`;

  return (
    <div
      className={`relative w-full transition-none pointer-events-none ${className}`}
      style={{
        clipPath: clipPathStyle,
        WebkitClipPath: clipPathStyle,
        opacity: 1,
      }}
    >
      {/* Real JSX content underneath */}
      {children}
    </div>
  );
};

export default PaintRevealText;
