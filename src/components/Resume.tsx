import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { 
  ConstructedSection, 
  ConstructedContainer, 
  ConstructedCard, 
  ConstructedIcon, 
  ConstructedHeading, 
  ConstructedDescription, 
  ConstructedBadge, 
  ConstructedButton 
} from './construction';

export const Resume: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const resumePdfUrl = '/resume/Yeswanth_Varma_MERN_Developer.pdf';

  const handleDownload = () => {
    triggerConfetti();
    const link = document.createElement('a');
    link.href = resumePdfUrl;
    link.download = 'Yeswanth_Varma_MERN_Developer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="relative py-28 overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 right-1/4 w-[450px] h-[450px] bg-[#D6B36A]/05" />
      <div className="ambient-light-orb bottom-10 left-10 w-[400px] h-[400px] bg-[#B99555]/04" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LEVEL 0: Outer Section Container */}
        <ConstructedSection
          id="resume"
          accentColor="#D6B36A"
          borderRadius={24}
          frameTitle="SYS://VERIFIED_CURRICULUM_VITAE"
          className="p-6 sm:p-10 border border-[rgba(214,179,106,0.20)] bg-[#14120F]/60 backdrop-blur-sm"
        >
          {/* Section Header */}
          <div className="mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#D6B36A] mb-3">
              <FileText size={13} />
              <span>07 // CREDENTIAL VERIFICATION</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E6] tracking-tight">
              Curriculum Vitae &amp; <span className="text-gradient-gold">Resume Hub</span>
            </h2>
            <p className="mt-3 text-[#B9B2A5] text-sm sm:text-base font-sans">
              Review verified academic metrics, internship track records, and production applications in standard PDF format.
            </p>
          </div>

          {/* LEVEL 1: Inner Cards */}
          <ConstructedContainer id="resume-cards" className="space-y-8 mb-8">
            
            {/* CARD 1: Primary Resume File & Actions */}
            <ConstructedCard
              id="resume-card-main"
              accentColor="#D6B36A"
              borderRadius={20}
              className="p-6 sm:p-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[rgba(214,179,106,0.20)]">
                <div className="flex items-center gap-4">
                  {/* LEVEL 2: Icon */}
                  <ConstructedIcon
                    id="resume-icon-pdf"
                    icon={FileText}
                    color="#D6B36A"
                    containerSize={52}
                    size={24}
                  />
                  <div>
                    {/* LEVEL 2: Heading */}
                    <ConstructedHeading
                      id="resume-head-filename"
                      as="h3"
                      accentColor="#D6B36A"
                      className="text-lg sm:text-xl text-[#F5F0E6] mb-1"
                    >
                      Yeswanth_Varma_MERN_Developer.pdf
                    </ConstructedHeading>
                    {/* LEVEL 2: Description */}
                    <ConstructedDescription
                      id="resume-desc-spec"
                      accentColor="#B99555"
                      className="text-xs text-[#B9B2A5]"
                    >
                      Standard ATS-Compliant PDF &bull; Current for 2026/2027 Engineering Roles
                    </ConstructedDescription>
                  </div>
                </div>

                {/* LEVEL 2: Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <ConstructedButton
                    id="resume-btn-download"
                    onClick={handleDownload}
                    accentColor="#D6B36A"
                    className="flex-1 md:flex-initial gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B99555] text-[#0C0B09] font-heading font-bold text-sm hover:brightness-110 shadow-md shadow-[#D6B36A]/20 cursor-pointer"
                  >
                    <Download size={16} />
                    <span>Download PDF</span>
                  </ConstructedButton>

                  <ConstructedButton
                    id="resume-btn-preview"
                    onClick={() => setIsPreviewOpen(true)}
                    accentColor="#B99555"
                    className="flex-1 md:flex-initial gap-2 px-5 py-3 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-[#F5F0E6] font-heading font-medium text-sm hover:bg-[#28241e] cursor-pointer"
                  >
                    <Eye size={16} className="text-[#D6B36A]" />
                    <span>Quick Preview</span>
                  </ConstructedButton>
                </div>
              </div>

              {/* LEVEL 2: Verification Badges */}
              <div className="flex flex-wrap gap-3 pt-6 font-mono text-xs text-[#B9B2A5]">
                <ConstructedBadge id="resume-badge-cgpa" color="#D6B36A">
                  <CheckCircle2 size={14} className="mr-1.5 text-[#D6B36A]" />
                  SRKR B.Tech CSE (6.99 CGPA)
                </ConstructedBadge>
                <ConstructedBadge id="resume-badge-intern" color="#B99555">
                  <CheckCircle2 size={14} className="mr-1.5 text-[#D6B36A]" />
                  2 MERN Stack Internships
                </ConstructedBadge>
                <ConstructedBadge id="resume-badge-apps" color="#D6B36A">
                  <CheckCircle2 size={14} className="mr-1.5 text-[#D6B36A]" />
                  3 Production-Grade Applications
                </ConstructedBadge>
              </div>
            </ConstructedCard>

            {/* CARD 2: Direct Inquiries */}
            <ConstructedCard
              id="resume-card-inquire"
              accentColor="#D6B36A"
              borderRadius={18}
              className="p-6"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#B9B2A5]">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-[#D6B36A]" />
                  <span className="text-[#F5F0E6]">Available for immediate direct technical interview screening &amp; code walkthroughs.</span>
                </div>
                <a
                  href="mailto:yeswanthvarma684280@gmail.com"
                  className="px-4 py-2 rounded-lg bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-[#D6B36A] hover:bg-[#28241e] transition-colors shrink-0 cursor-pointer"
                >
                  Inquire via Email &rarr;
                </a>
              </div>
            </ConstructedCard>

          </ConstructedContainer>

        </ConstructedSection>
      </div>

      {/* Quick Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C0B09]/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl h-[85vh] rounded-2xl bg-[#14120F] border border-[rgba(214,179,106,0.20)] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[rgba(214,179,106,0.20)] bg-[#0C0B09]">
              <span className="font-mono text-xs text-[#D6B36A]">DOCUMENT PREVIEW // YESWANTH_VARMA_MERN.PDF</span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-lg text-[#B9B2A5] hover:text-[#F5F0E6] bg-[#211D17] border border-[rgba(214,179,106,0.20)] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 w-full bg-[#0C0B09]">
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
