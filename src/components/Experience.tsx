import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Building 
} from 'lucide-react';
import { experienceData } from '../data/experience';
import { 
  ConstructedSection, 
  ConstructedContainer, 
  ConstructedCard, 
  ConstructedIcon, 
  ConstructedHeading, 
  ConstructedDescription, 
  ConstructedBadge 
} from './construction';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 bg-[#0C0B09] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 left-0 w-[500px] h-[500px] bg-[#D6B36A]/05 -translate-y-1/2" />
      <div className="ambient-light-orb bottom-10 right-10 w-[400px] h-[400px] bg-[#B99555]/04" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LEVEL 0: Outer Section Container */}
        <ConstructedSection
          id="experience"
          accentColor="#D6B36A"
          borderRadius={24}
          frameTitle="SYS://INDUSTRY_TRACK_RECORD"
          className="p-6 sm:p-10 border border-[rgba(214,179,106,0.20)] bg-[#14120F]/60 backdrop-blur-sm"
        >
          {/* Section Header */}
          <div className="mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#D6B36A] mb-3">
              <Briefcase size={13} />
              <span>04 // INDUSTRY INTERNSHIPS</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E6] tracking-tight">
              Engineering &amp; Development <span className="text-gradient-gold">Experience</span>
            </h2>
            <p className="mt-3 text-[#B9B2A5] text-sm sm:text-base font-sans">
              Professional hands-on software development internships building production-grade MERN architectures, responsive components, and backend endpoints.
            </p>
          </div>

          {/* LEVEL 1: Inner Cards */}
          <ConstructedContainer id="experience-cards" className="space-y-8 mb-8">
            {experienceData.map((exp, idx) => {
              const borderColors = ['#D6B36A', '#B99555'];
              const accent = borderColors[idx % borderColors.length];

              return (
                <ConstructedCard
                  key={idx}
                  id={`exp-card-${idx}`}
                  accentColor={accent}
                  borderRadius={20}
                  className="p-6 sm:p-8"
                >
                  {/* Top Bar with Icon, Title, and Date */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-[rgba(214,179,106,0.20)] mb-6">
                    <div className="flex items-start gap-4">
                      {/* LEVEL 2: Icon */}
                      <ConstructedIcon
                        id={`exp-icon-${idx}`}
                        icon={Building}
                        color={accent}
                        containerSize={44}
                      />
                      <div>
                        {/* LEVEL 2: Heading */}
                        <ConstructedHeading
                          id={`exp-head-${idx}`}
                          as="h3"
                          accentColor={accent}
                          className="text-xl sm:text-2xl text-[#F5F0E6] mb-1"
                        >
                          {exp.company}
                        </ConstructedHeading>
                        <span className="font-mono text-sm text-[#D6B36A] font-medium">
                          {exp.position}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#F5F0E6] shrink-0 self-start">
                      <Calendar size={13} className="text-[#D6B36A]" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* LEVEL 2: Description */}
                  <ConstructedDescription
                    id={`exp-desc-${idx}`}
                    accentColor={accent}
                    className="mb-6 text-sm leading-relaxed text-[#B9B2A5]"
                  >
                    {exp.description}
                  </ConstructedDescription>

                  {/* Contributions List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-mono text-[#B9B2A5] uppercase tracking-widest block mb-2">
                      Verified Technical Deliverables:
                    </span>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F0E6]">
                          <CheckCircle2 size={15} className="text-[#D6B36A] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* LEVEL 2: Badges */}
                  <div className="pt-4 border-t border-[rgba(214,179,106,0.20)] flex flex-wrap gap-2">
                    {exp.technologies.map((tech, tIdx) => (
                      <ConstructedBadge
                        key={tIdx}
                        id={`exp-badge-${idx}-${tIdx}`}
                        color={accent}
                      >
                        {tech}
                      </ConstructedBadge>
                    ))}
                  </div>
                </ConstructedCard>
              );
            })}
          </ConstructedContainer>

          {/* Audit Card */}
          <ConstructedCard
            id="exp-card-audit"
            accentColor="#D6B36A"
            borderRadius={16}
            className="p-5"
          >
            <div className="flex items-center justify-between flex-wrap gap-3 font-mono text-xs text-[#B9B2A5]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-[#D6B36A]" />
                <span className="text-[#F5F0E6]">All listed internships backed by verified certificates of completion and project deliverables.</span>
              </div>
              <span className="text-[11px] text-[#D6B36A] font-semibold">
                AUDIT STATUS: 100% VERIFIED
              </span>
            </div>
          </ConstructedCard>

        </ConstructedSection>
      </div>
    </section>
  );
};

export default Experience;
