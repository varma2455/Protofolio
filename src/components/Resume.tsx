import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  X
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { GenerativeArrowEngine } from './generative/GenerativeArrowEngine';
import { KineticText } from './generative/KineticText';
import { GeometricFrame } from './generative/GeometricFrame';

export const Resume: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const resumePdfUrl = '/resume/Yeswanth_Varma_MERN_Developer.pdf';

  const handleDownload = () => {
    triggerConfetti();
  };

  return (
    <section id="resume" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 right-1/4 w-[450px] h-[450px] bg-[#6C63FF]/10" />
      <div className="ambient-light-orb bottom-10 left-10 w-[400px] h-[400px] bg-[#00E5FF]/08" />

      {/* GENERATIVE ARROWS: Resume Document Vectors */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <GenerativeArrowEngine
          id="resume-arrow-engine"
          preset="ambient"
          seed={3821}
          arrowCount={7}
          viewBox="0 0 1200 700"
          colorPalette={['#00E5FF', '#6C63FF', '#10B981']}
          triggerOnScroll={true}
          scrollTriggerStart="top 75%"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
            <FileText size={13} />
            <span>07 // CREDENTIAL VERIFICATION</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            <KineticText
              text="Curriculum Vitae &"
              variant="letter-reveal"
              delay={0.1}
              className="mr-2"
            />
            <span className="text-gradient-cyan-blue">
              <KineticText
                text="Resume"
                variant="gradient-wipe"
                delay={0.35}
              />
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mt-3 text-base sm:text-lg">
            Download the official engineering resume or inspect verified credentials and project milestones online.
          </p>
        </div>

        {/* Main Resume Showcase Card wrapped in GeometricFrame */}
        <GeometricFrame
          coordinates="CV_VERIFIED_DOC"
          glowColor="#00E5FF"
          className="p-8 sm:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Highlights & Verification (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  <span>Verified 2026 Resume</span>
                </span>
                <span className="text-xs font-mono text-slate-500">
                  PDF &bull; 69.6 KB &bull; Direct Local File
                </span>
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
                  Yeswanth Varma Pothuri
                </h3>
                <p className="text-sm font-mono text-[#00E5FF]">
                  MERN Stack Developer &bull; B.Tech CSE (2023–2027) &bull; SRKR Engineering College
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                Includes full technical breakdowns of 3 flagship MERN projects (Online Food Delivery, E-Commerce Platform, Real-Time Socket.io Chat), 2 industry software internships (Blackbucks Engineers &amp; 1Stop.ai), academic score records (CGPA 6.99, Intermediate 85.3%), and complete contact coordinates.
              </p>

              {/* Verified Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#00E5FF]" />
                  <span>MERN Stack Architecture Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#00E5FF]" />
                  <span>2 Industry Software Internships</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#00E5FF]" />
                  <span>REST API &amp; Socket.io Expertise</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#00E5FF]" />
                  <span>Live GitHub Repositories Linked</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08]">
                <a
                  href={resumePdfUrl}
                  download="Yeswanth_Varma_MERN_Developer.pdf"
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#6C63FF] via-[#5244E3] to-[#00E5FF] hover:opacity-95 shadow-[0_0_25px_rgba(108,99,255,0.4)] active:scale-95 transition-all group"
                >
                  <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume (PDF)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs font-medium text-slate-200 glass-panel hover:text-white hover:border-[#00E5FF]/40 transition-all active:scale-95 group cursor-pointer"
                >
                  <Eye size={16} className="text-[#00E5FF] group-hover:scale-110 transition-transform" />
                  <span>Interactive Preview</span>
                </button>
              </div>

            </div>

            {/* Right Column: Visual Preview Sheet (5 cols) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div
                onClick={() => setIsPreviewOpen(true)}
                className="w-full max-w-sm rounded-2xl glass-panel border border-white/[0.12] p-5 cursor-pointer group hover:border-[#00E5FF]/40 hover:-translate-y-1 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Document Mockup Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-[#00E5FF]" />
                    <span className="text-[11px] font-mono text-white font-bold">
                      RESUME_SNAPSHOT.PDF
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                    <Eye size={12} />
                    <span>Expand</span>
                  </span>
                </div>

                {/* Simulated Document Blocks */}
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[#00E5FF] font-bold block">YESWANTH VARMA POTHURI</span>
                    <span className="text-slate-400 text-[10px] block mt-0.5">MERN Stack Developer &bull; Bhimavaram, AP</span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Education</span>
                    <span className="text-white block">SRKR Engineering College &bull; CSE</span>
                    <span className="text-emerald-400 text-[10px] block">2023–2027 &bull; CGPA: 6.99</span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Experience</span>
                    <span className="text-white block">&bull; Blackbucks Engineers (MERN Intern)</span>
                    <span className="text-white block">&bull; 1Stop.ai (Web Development Intern)</span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Flagship Projects</span>
                    <span className="text-slate-300 block">&bull; Online Food Delivery (MERN)</span>
                    <span className="text-slate-300 block">&bull; E-Commerce Web App (MERN)</span>
                    <span className="text-slate-300 block">&bull; Real-Time Socket.io Chat</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] text-center">
                  <span className="text-[11px] font-mono text-[#00E5FF] group-hover:underline flex items-center justify-center gap-1">
                    <span>Click to Open Full Document Viewer</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </GeometricFrame>

      </div>

      {/* Modal Document Viewer */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <GeometricFrame
            coordinates="PDF_VIEWER"
            glowColor="#00E5FF"
            className="w-full max-w-4xl h-[88vh] bg-[#080B12] shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
          >
            {/* Viewer Header */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-[#00E5FF]" />
                <span className="font-heading font-bold text-white text-sm sm:text-base">
                  Yeswanth Varma Pothuri — Resume Preview
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={resumePdfUrl}
                  download="Yeswanth_Varma_MERN_Developer.pdf"
                  onClick={handleDownload}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] cursor-pointer"
                  aria-label="Close Preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Viewer Body: Embedded iframe with fallback */}
            <div className="flex-1 w-full h-full bg-[#11141F] relative">
              <iframe
                src={`${resumePdfUrl}#toolbar=0`}
                title="Yeswanth Varma Resume"
                className="w-full h-full border-none"
              />
            </div>

            {/* Viewer Footer */}
            <div className="p-3 px-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400 bg-[#080B12]">
              <span>Verified Local PDF Document</span>
              <a
                href={resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] hover:underline flex items-center gap-1"
              >
                <span>Open in Full Browser Tab</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </GeometricFrame>
        </div>
      )}

    </section>
  );
};

export default Resume;
