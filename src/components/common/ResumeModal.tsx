import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const resumeUrl = '/resume/Yeswanth_Varma_MERN_Developer.pdf';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#10141D] dark:bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 rounded-2xl shadow-2xl z-10 overflow-hidden text-slate-100 light:text-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 light:border-slate-200 bg-[#080A0F]/60 light:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white light:text-slate-900 leading-tight">
                    Yeswanth Varma — MERN Stack Resume
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 light:text-slate-500 font-mono mt-0.5">
                    <span>PDF • ~70 KB</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Authentic Document
                    </span>
                    <span>•</span>
                    <span>Updated 2026</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  download="Yeswanth_Varma_MERN_Developer.pdf"
                  onClick={handleDownload}
                  className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-accent-blue hover:bg-accent-blueHover text-white text-xs font-medium font-mono transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 light:bg-slate-200 light:hover:bg-slate-300 text-xs font-mono text-slate-300 light:text-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  New Tab
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 light:bg-slate-200 text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Viewer Body */}
            <div className="flex-1 w-full bg-[#080A0F] light:bg-slate-100 p-2 sm:p-4 overflow-hidden min-h-[500px]">
              <div className="w-full h-[65vh] rounded-lg overflow-hidden border border-white/5 light:border-slate-300 bg-white shadow-inner">
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0`}
                  title="Yeswanth Varma MERN Resume"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Footer with quick action on mobile */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 light:border-slate-200 bg-[#080A0F]/60 light:bg-slate-50 text-xs text-slate-400">
              <span className="font-mono text-slate-400 light:text-slate-500">
                Primary Stack: MongoDB • Express.js • React.js • Node.js
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  download="Yeswanth_Varma_MERN_Developer.pdf"
                  onClick={handleDownload}
                  className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-blue text-white font-mono"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
                <button
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-mono transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
