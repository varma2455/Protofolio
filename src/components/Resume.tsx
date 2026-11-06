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
import { ContentConstructionRegion } from './construction/ContentConstructionRegion';
import { SectionRevealTimeline } from './construction/SectionRevealTimeline';

export const Resume: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const resumePdfUrl = '/resume/Yeswanth_Varma_MERN_Developer.pdf';

  const handleDownload = () => {
    triggerConfetti();
  };

  const regionSequence = ['resume-header', 'resume-hub', 'resume-breakdown'];

  return (
    <section id="resume" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 right-1/4 w-[450px] h-[450px] bg-[#6C63FF]/10" />
      <div className="ambient-light-orb bottom-10 left-10 w-[400px] h-[400px] bg-[#00E5FF]/08" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionRevealTimeline sectionId="resume" regionIds={regionSequence}>
          
          {/* 1. Section Header */}
          <ContentConstructionRegion
            id="resume-header"
            shape="chamfer"
            borderRadius={12}
            accentColor="#00E5FF"
            priority={1}
            className="mb-14 max-w-2xl"
          >
            <div className="p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
                <FileText size={13} />
                <span>07 // CREDENTIAL VERIFICATION</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Curriculum Vitae &amp; <span className="text-gradient-cyan-blue">Resume Hub</span>
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
                Review verified academic metrics, internship track records, and production applications in standard PDF format.
              </p>
            </div>
          </ContentConstructionRegion>

          {/* 2. Primary Resume Card */}
          <ContentConstructionRegion
            id="resume-hub"
            shape="rounded"
            borderRadius={20}
            accentColor="#6C63FF"
            priority={2}
            className="w-full mb-10"
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C63FF]/20 to-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">
                      Yeswanth_Varma_MERN_Developer.pdf
                    </h3>
                    <span className="font-mono text-xs text-slate-400">
                      Standard ATS-Compliant PDF &bull; Current for 2026/2027 Engineering Roles
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <a
                    href={resumePdfUrl}
                    download="Yeswanth_Varma_MERN_Developer.pdf"
                    onClick={handleDownload}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white font-heading font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#6C63FF]/25 cursor-pointer"
                  >
                    <Download size={16} />
                    <span>Download PDF</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-heading font-medium text-sm hover:bg-white/10 hover:border-[#00E5FF]/30 transition-all duration-200 cursor-pointer"
                  >
                    <Eye size={16} className="text-[#00E5FF]" />
                    <span>Quick Preview</span>
                  </button>
                </div>
              </div>

              {/* Verified Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02]">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span>SRKR B.Tech CSE (6.99 CGPA)</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02]">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span>2 MERN Stack Internships</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02]">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span>3 Production-Grade Applications</span>
                </div>
              </div>
            </div>
          </ContentConstructionRegion>

          {/* 3. Breakdown of Highlights */}
          <ContentConstructionRegion
            id="resume-breakdown"
            shape="chamfer"
            borderRadius={16}
            accentColor="#10B981"
            priority={3}
            className="w-full"
          >
            <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#00E5FF]" />
                <span>Need a tailored version or reference verification? Available for immediate direct technical interview screening.</span>
              </div>
              <a
                href="mailto:yeswanthvarma684280@gmail.com"
                className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/10 text-[#00E5FF] hover:bg-white/10 transition-colors shrink-0"
              >
                Inquire via Email &rarr;
              </a>
            </div>
          </ContentConstructionRegion>

        </SectionRevealTimeline>
      </div>

      {/* Quick Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl h-[85vh] rounded-2xl bg-[#090D18] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/[0.08] bg-[#05060A]">
              <span className="font-mono text-xs text-[#00E5FF]">DOCUMENT PREVIEW // YESWANTH_VARMA_MERN.PDF</span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/[0.05] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 w-full bg-slate-900">
              <iframe
                src={`${resumePdfUrl}#toolbar=0`}
                title="Resume Preview"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Resume;
