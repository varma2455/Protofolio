import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  Sparkles,
  Layers,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const resumeUrl = '/resume/Yeswanth_Varma_MERN_Developer.pdf';

  const triggerDownloadConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-[#080A0F] dark:bg-[#080A0F] light:bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-mono font-medium mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>VERIFIED PROFESSIONAL PROFILE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white light:text-slate-900 tracking-tight">
            Let's talk about opportunities.
          </h2>
          <p className="text-slate-400 light:text-slate-600 font-mono text-sm mt-2 max-w-2xl">
            Download or preview the authentic MERN Stack Developer resume detailing technical proficiencies, project outcomes, and academic standing.
          </p>
        </div>

        {/* Resume Presentation Showcase Box */}
        <div className="rounded-3xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Preview Pane (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 light:border-slate-200">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Official MERN Developer Resume</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">PDF Document</span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white light:text-slate-900 mb-4">
                  Yeswanth Varma Pothuri
                </h3>

                <p className="text-sm text-slate-300 light:text-slate-600 leading-relaxed font-sans mb-8">
                  A comprehensive engineering summary highlighting development across MongoDB, Express.js, React.js, and Node.js. Outlines flagship food delivery systems, e-commerce architectures, real-time Socket.io applications, and Blackbucks Engineers internship contributions.
                </p>

                {/* Metadata Badge Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono mb-8">
                  <div className="p-3 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                    <div className="text-[10px] text-slate-500 uppercase">Format</div>
                    <div className="text-white light:text-slate-900 font-semibold mt-0.5">Adobe PDF</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                    <div className="text-[10px] text-slate-500 uppercase">File Size</div>
                    <div className="text-white light:text-slate-900 font-semibold mt-0.5">~69.6 KB</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                    <div className="text-[10px] text-slate-500 uppercase">Candidate</div>
                    <div className="text-white light:text-slate-900 font-semibold mt-0.5">Yeswanth Varma</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                    <div className="text-[10px] text-slate-500 uppercase">Updated</div>
                    <div className="text-white light:text-slate-900 font-semibold mt-0.5">November 2026</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/5 light:border-slate-200 flex flex-wrap items-center gap-4">
                <a
                  href={resumeUrl}
                  download="Yeswanth_Varma_MERN_Developer.pdf"
                  onClick={triggerDownloadConfetti}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent-blue hover:bg-accent-blueHover text-white text-xs font-mono font-semibold shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/35 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>

                <button
                  onClick={onOpenResumeModal}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 border border-white/10 light:border-slate-300 text-xs font-mono text-slate-200 light:text-slate-800 transition-colors"
                >
                  <Eye className="w-4 h-4 text-accent-blue" />
                  <span>Interactive Preview</span>
                </button>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/5 light:hover:bg-slate-100 text-xs font-mono text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Tab</span>
                </a>
              </div>
            </div>

            {/* Right Mini Document Preview Mockup (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-[#080A0F] light:bg-slate-100 flex items-center justify-center">
              <div 
                onClick={onOpenResumeModal}
                className="w-full max-w-sm rounded-2xl bg-[#151B26] light:bg-white border border-white/10 light:border-slate-300 shadow-2xl p-5 cursor-pointer group hover:scale-[1.02] transition-all duration-300 relative"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/5 light:border-slate-200 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent-blue" />
                    <span>MERN_Resume.pdf</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">Click to View</span>
                </div>

                <div className="mt-4 space-y-3 font-mono text-[11px] text-slate-400 light:text-slate-500">
                  <div className="h-3 w-3/4 rounded bg-white/10 light:bg-slate-200" />
                  <div className="h-2 w-1/2 rounded bg-white/5 light:bg-slate-100" />
                  <div className="h-2 w-full rounded bg-white/5 light:bg-slate-100 mt-4" />
                  <div className="h-2 w-5/6 rounded bg-white/5 light:bg-slate-100" />
                  <div className="h-2 w-2/3 rounded bg-white/5 light:bg-slate-100" />

                  <div className="pt-4 mt-4 border-t border-white/5 light:border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold mb-1">PROJECT SNAPSHOTS:</div>
                    <div className="space-y-1 text-slate-300 light:text-slate-700 text-[10px]">
                      <div>1. Online Food Delivery Application (MERN)</div>
                      <div>2. E-Commerce Website (React / Node / Mongo)</div>
                      <div>3. Real-Time Chat App (Socket.io)</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 light:border-slate-200 flex items-center justify-center text-xs font-mono text-accent-blue group-hover:underline">
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Click to open full high-res viewer
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
