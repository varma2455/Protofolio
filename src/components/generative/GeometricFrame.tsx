import React from 'react';

export interface GeometricFrameProps {
  children?: React.ReactNode;
  variant?: 'cyber-card' | 'hud-bracket' | 'circuit-grid' | 'minimal-corner';
  glowColor?: string;
  borderColor?: string;
  className?: string;
  isActive?: boolean;
  coordinates?: string;
  cornerCrosshairs?: boolean;
}

export const GeometricFrame: React.FC<GeometricFrameProps> = ({
  children,
  variant = 'hud-bracket',
  glowColor = '#00E5FF',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  className = '',
  coordinates,
  cornerCrosshairs = true,
}) => {
  return (
    <div
      className={`relative rounded-2xl glass-panel transition-all duration-500 group ${className}`}
      style={{
        borderColor: borderColor,
        boxShadow: `0 10px 40px -10px rgba(0, 0, 0, 0.5)`,
      }}
    >
      {/* Corner Brackets / Crosshairs */}
      {cornerCrosshairs && (
        <>
          {/* Top-Left */}
          <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none transition-colors duration-300"
               style={{ borderColor: glowColor }} />
          {/* Top-Right */}
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 pointer-events-none transition-colors duration-300"
               style={{ borderColor: glowColor }} />
          {/* Bottom-Left */}
          <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none transition-colors duration-300"
               style={{ borderColor: glowColor }} />
          {/* Bottom-Right */}
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 pointer-events-none transition-colors duration-300"
               style={{ borderColor: glowColor }} />
        </>
      )}

      {/* Coordinate Tag */}
      {coordinates && (
        <div className="absolute top-2 right-4 pointer-events-none">
          <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">
            [{coordinates}]
          </span>
        </div>
      )}

      {/* Ambient Inner Node Glow on Hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}15 0%, transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GeometricFrame;
