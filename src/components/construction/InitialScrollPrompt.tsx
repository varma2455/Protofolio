/**
 * InitialScrollPrompt.tsx
 * Initial website state overlay for VARMA.DEV.
 * Displays when website first loads:
 * - Pitch dark cinematic background
 * - Content areas are hidden and empty
 * - Shows only a subtle, sophisticated scroll indicator
 * - Disappears on first scroll as Arrow 1 enters to construct the first region
 */

import React from 'react';
import { ChevronDown, ArrowDown } from 'lucide-react';

export interface InitialScrollPromptProps {
  isVisible: boolean;
  onInitiateScroll?: () => void;
}

export const InitialScrollPrompt: React.FC<InitialScrollPromptProps> = ({
  isVisible,
  onInitiateScroll,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-700 pointer-events-none ${
        isVisible ? 'opacity-100 bg-[#05060A]/85 backdrop-blur-md' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="pointer-events-auto flex flex-col items-center text-center px-6 py-8 max-w-md cursor-pointer select-none group"
        onClick={onInitiateScroll}
      >
        {/* Futuristic Brand Monogram */}
        <div className="mb-6 flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
          <span className="text-xs font-mono tracking-widest text-slate-300">
            VARMA.DEV &bull; MERN ARCHITECT
          </span>
        </div>

        {/* Primary Prompt Action */}
        <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight mb-2">
          Interactive Motion Canvas
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-400 font-mono mb-8 max-w-xs leading-relaxed">
          The interface is constructed live by animated arrows as you scroll.
        </p>

        {/* Animated Scroll Arrow Indicator */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Glowing pulse rings */}
          <div className="w-14 h-14 rounded-full border border-[#00E5FF]/40 flex items-center justify-center relative group-hover:border-[#00E5FF] group-hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all duration-300">
            <span className="absolute inset-0 rounded-full border border-[#00E5FF]/20 animate-ping" />
            <ArrowDown className="w-6 h-6 text-[#00E5FF] animate-bounce" />
          </div>

          <div className="mt-4 flex flex-col items-center gap-1 font-mono text-[10px] tracking-widest text-[#00E5FF]">
            <span className="font-bold">SCROLL TO DRAW INTERFACE</span>
            <span className="text-slate-500">// [ WHEEL &bull; TOUCH &bull; DRAG ]</span>
          </div>
        </div>

        {/* Quick View Alternative */}
        <div className="mt-8">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('construct-all-regions'));
            }}
            className="text-[11px] font-mono text-slate-500 hover:text-white underline decoration-slate-700 underline-offset-4 transition-colors cursor-pointer"
          >
            Or click to reveal all immediately &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialScrollPrompt;
