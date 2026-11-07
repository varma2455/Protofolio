/**
 * InitialScrollPrompt.tsx
 * Obsidian Gold initial website state overlay for VARMA.DEV.
 * Displays when website first loads:
 * - Deep Obsidian Black canvas (#0C0B09)
 * - Refined glowing scroll indicator in champagne gold (#D6B36A)
 * - Disappears on first scroll as Arrow 1 enters to construct the first region
 */

import React from 'react';
import { ArrowDown } from 'lucide-react';

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
      className={`fixed inset-0 z-40 flex flex-col items-center justify-between py-12 px-6 transition-all duration-700 pointer-events-none ${
        isVisible ? 'opacity-100 bg-[#0C0B09]/80 backdrop-blur-sm' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Top Header Tag */}
      <div className="flex flex-col items-center pointer-events-auto cursor-pointer" onClick={onInitiateScroll}>
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(56,189,248,0.30)] bg-[#070E1A] shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
          <span className="text-xs font-mono tracking-widest text-[#F0F9FF]">
            VARMA.DEV &bull; SUDARSHAN CHAKRA // 10 ARROW AGENTS
          </span>
        </div>
      </div>

      {/* Spacer where the 10-Arrow Rotating Chakra Energy Wheel is centered */}
      <div className="w-72 h-72 pointer-events-none" />

      {/* Bottom Instructions and CTA */}
      <div
        className="pointer-events-auto flex flex-col items-center text-center max-w-md cursor-pointer select-none"
        onClick={onInitiateScroll}
      >
        <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#F5F0E6] tracking-tight mb-2">
          Intelligent Motion Architecture
        </h2>
        
        <p className="text-xs sm:text-sm text-[#B9B2A5] font-mono mb-6 max-w-xs leading-relaxed">
          10 autonomous arrow agents physically construct the website as you scroll.
        </p>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 font-mono text-[11px] tracking-widest text-[#38BDF8]">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B132B] border border-[rgba(56,189,248,0.35)] shadow-md">
            <ArrowDown className="w-4 h-4 text-[#00E5FF] animate-bounce" />
            <span className="font-bold text-[#F0F9FF]">SCROLL TO DISPATCH CHAKRA AGENTS</span>
          </div>
          <span className="text-[10px] text-[#94A3B8]">// SCROLL SPEED ADAPTS ROTATION & CONCURRENCY</span>
        </div>

        {/* Quick View Alternative */}
        <div className="mt-6">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('construct-all-regions'));
            }}
            className="text-[11px] font-mono text-[#B9B2A5] hover:text-[#F5F0E6] underline decoration-[#B9B2A5]/40 underline-offset-4 transition-colors cursor-pointer"
          >
            Or reveal all instantly &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialScrollPrompt;
