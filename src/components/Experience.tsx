import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Building 
} from 'lucide-react';
import { experienceData } from '../data/experience';
import { ContentConstructionRegion } from './construction/ContentConstructionRegion';
import { SectionRevealTimeline } from './construction/SectionRevealTimeline';

export const Experience: React.FC = () => {
  const regionSequence = ['exp-header', 'exp-0', 'exp-1', 'exp-banner'];

  return (
    <section id="experience" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 left-0 w-[500px] h-[500px] bg-[#6C63FF]/10 -translate-y-1/2" />
      <div className="ambient-light-orb bottom-10 right-10 w-[400px] h-[400px] bg-[#00E5FF]/08" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionRevealTimeline sectionId="experience" regionIds={regionSequence}>
          
          {/* 1. Section Header */}
          <ContentConstructionRegion
            id="exp-header"
            shape="chamfer"
            borderRadius={12}
            accentColor="#00E5FF"
            priority={1}
            className="mb-14 max-w-2xl"
          >
            <div className="p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
                <Briefcase size={13} />
                <span>04 // INDUSTRY INTERNSHIPS</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Engineering &amp; Development <span className="text-gradient-cyan-blue">Experience</span>
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
                Professional hands-on software development internships building production-grade MERN architectures, responsive components, and backend endpoints.
              </p>
            </div>
          </ContentConstructionRegion>

          {/* 2. Timeline Cards */}
          <div className="space-y-8 relative mb-12">
            {experienceData.map((exp, idx) => {
              const borderColors = ['#00E5FF', '#6C63FF'];
              const accent = borderColors[idx % borderColors.length];

              return (
                <ContentConstructionRegion
                  key={idx}
                  id={`exp-${idx}`}
                  shape="rounded"
                  borderRadius={20}
                  accentColor={accent}
                  priority={2 + idx}
                  className="w-full"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-white/[0.08] mb-6">
                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <Building size={16} className="text-[#00E5FF]" />
                          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                            {exp.company}
                          </h3>
                        </div>
                        <span className="font-mono text-sm text-indigo-400 font-medium">
                          {exp.position}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 shrink-0 self-start">
                        <Calendar size={13} className="text-[#00E5FF]" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                      {exp.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                        Verified Technical Key Contributions:
                      </span>
                      <ul className="space-y-2">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </ContentConstructionRegion>
              );
            })}
          </div>

          {/* 3. Verification Badge */}
          <ContentConstructionRegion
            id="exp-banner"
            shape="chamfer"
            borderRadius={16}
            accentColor="#10B981"
            priority={5}
            className="w-full"
          >
            <div className="p-4 sm:p-5 flex items-center justify-between flex-wrap gap-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-emerald-400" />
                <span>All listed internships backed by verified certificates of completion and project deliverables.</span>
              </div>
              <span className="text-[11px] text-[#00E5FF] font-semibold">
                AUDIT STATUS: 100% VERIFIED
              </span>
            </div>
          </ContentConstructionRegion>

        </SectionRevealTimeline>
      </div>
    </section>
  );
};

export default Experience;
