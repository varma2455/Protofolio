import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Trophy 
} from 'lucide-react';
import { educationData, certificationsData } from '../data/education';
import { ContentConstructionRegion } from './construction/ContentConstructionRegion';
import { SectionRevealTimeline } from './construction/SectionRevealTimeline';

export const Education: React.FC = () => {
  const regionSequence = ['edu-header', 'edu-0', 'edu-1', 'edu-2', 'edu-certs'];

  return (
    <section id="education" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 left-10 w-[450px] h-[450px] bg-[#6C63FF]/10" />
      <div className="ambient-light-orb bottom-10 right-10 w-[400px] h-[400px] bg-[#00E5FF]/08" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionRevealTimeline sectionId="education" regionIds={regionSequence}>
          
          {/* 1. Section Header */}
          <ContentConstructionRegion
            id="edu-header"
            shape="chamfer"
            borderRadius={12}
            accentColor="#00E5FF"
            priority={1}
            className="mb-14 max-w-2xl"
          >
            <div className="p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
                <GraduationCap size={13} />
                <span>06 // ACADEMIC RECORD</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Education &amp; <span className="text-gradient-cyan-blue">Credentials</span>
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
                Formal computer science education and verified academic achievements at SRKR Engineering College.
              </p>
            </div>
          </ContentConstructionRegion>

          {/* 2. Education Cards */}
          <div className="space-y-8 mb-12">
            {educationData.map((edu, idx) => {
              const borderColors = ['#00E5FF', '#6C63FF', '#A855F7'];
              const accent = borderColors[idx % borderColors.length];

              return (
                <ContentConstructionRegion
                  key={idx}
                  id={`edu-${idx}`}
                  shape="rounded"
                  borderRadius={20}
                  accentColor={accent}
                  priority={2 + idx}
                  className="w-full"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-white/[0.08] mb-6">
                      <div>
                        <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider block mb-1">
                          {edu.degree}
                        </span>
                        <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                          {edu.institution}
                        </h3>
                        <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mt-1">
                          <MapPin size={13} className="text-purple-400" />
                          <span>{edu.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end gap-1.5 shrink-0">
                        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                          <Calendar size={13} className="text-[#00E5FF]" />
                          <span>{edu.duration}</span>
                        </div>
                        <span className="px-3 py-1 rounded-md bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-xs font-bold border border-[#00E5FF]/20">
                          {edu.scoreType}: {edu.score}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                        Academic Focus &amp; Core Subjects:
                      </span>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {edu.focus.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ContentConstructionRegion>
              );
            })}
          </div>

          {/* 3. Certifications Grid */}
          <ContentConstructionRegion
            id="edu-certs"
            shape="rounded"
            borderRadius={20}
            accentColor="#10B981"
            priority={6}
            className="w-full"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 pb-4 border-b border-white/[0.08] mb-6 font-mono text-xs text-[#00E5FF]">
                <Trophy size={15} />
                <span>VERIFIED PROFESSIONAL CERTIFICATIONS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {certificationsData.map((cert, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {cert.badge}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-white">{cert.title}</h4>
                      <span className="text-xs font-mono text-slate-400 block mt-0.5">{cert.issuer}</span>
                      <p className="text-xs text-slate-400 mt-2 font-sans">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ContentConstructionRegion>

        </SectionRevealTimeline>
      </div>
    </section>
  );
};

export default Education;
