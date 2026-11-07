import React from 'react';
import { ArrowPath } from './ArrowPath';

export interface SectionTransitionProps {
  fromSection: string;
  toSection: string;
  direction?: 'down' | 'diagonal-left' | 'diagonal-right';
  coordinates?: string;
  className?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  fromSection,
  toSection,
  direction = 'down',
  coordinates = '16.54°N, 81.52°E',
  className = '',
}) => {
  let pathD = 'M 500 0 L 500 80';
  let arrowAngle = 90;

  if (direction === 'diagonal-right') {
    pathD = 'M 300 0 Q 400 40 700 80';
    arrowAngle = 25;
  } else if (direction === 'diagonal-left') {
    pathD = 'M 700 0 Q 600 40 300 80';
    arrowAngle = 155;
  }

  return (
    <div className={`relative w-full h-20 overflow-hidden flex items-center justify-center pointer-events-none select-none z-20 ${className}`}>
      {/* Background Central Tick Line */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Center SVG Connector Arrow */}
      <svg
        width="1000"
        height="80"
        viewBox="0 0 1000 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-5xl"
      >
        <ArrowPath
          d={pathD}
          color="#D6B36A"
          glowColor="rgba(214, 179, 106, 0.35)"
          strokeWidth={1.4}
          duration={1.2}
          hasArrowHead={true}
          arrowHeadAngle={arrowAngle}
          showParticle={true}
        />

        {/* Start and End Anchor Calibrators */}
        <circle cx="500" cy="6" r="3" fill="#B99555" filter="drop-shadow(0 0 4px #B99555)" />
        <circle cx="500" cy="74" r="3" fill="#D6B36A" filter="drop-shadow(0 0 4px #D6B36A)" />
      </svg>

      {/* Ambient Telemetry Badge */}
      <div className="absolute px-3 py-0.5 rounded-full bg-[#0C0B09]/80 border border-[rgba(214,179,106,0.20)] backdrop-blur-md flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] animate-ping" />
        <span className="text-[9px] font-mono tracking-widest text-[#B9B2A5] uppercase">
          LINK: {fromSection} &rarr; {toSection} // {coordinates}
        </span>
      </div>
    </div>
  );
};

export default SectionTransition;
