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
import { GenerativeArrowEngine } from './generative/GenerativeArrowEngine';
import { KineticText } from './generative/KineticText';
import { GeometricFrame } from './generative/GeometricFrame';
import { ArrowPath } from './generative/ArrowPath';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 left-0 w-[500px] h-[500px] bg-[#6C63FF]/10 -translate-y-1/2" />
      <div className="ambient-light-orb bottom-10 right-10 w-[400px] h-[400px] bg-[#00E5FF]/08" />

      {/* GENERATIVE ARROW ENGINE: Timeline Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <GenerativeArrowEngine
          id="experience-arrow-engine"
          preset="experience"
          seed={4491}
          arrowCount={8}
          viewBox="0 0 1200 800"
          colorPalette={['#00E5FF', '#6C63FF', '#10B981']}
          triggerOnScroll={true}
          scrollTriggerStart="top 75%"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
            <Briefcase size={13} />
            <span>04 // INDUSTRY INTERNSHIPS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            <KineticText
              text="Engineering & Development"
              variant="letter-reveal"
              delay={0.1}
              className="mr-2"
            />
            <span className="text-gradient-cyan-blue">
              <KineticText
                text="Experience"
                variant="gradient-wipe"
                delay={0.4}
              />
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mt-3 text-base sm:text-lg">
            Practical hands-on industry roles authoring full-stack web applications, REST services, and database persistence layers.
          </p>
        </div>

        {/* Continuous Arrow Timeline Layout */}
        <div className="relative border-l-2 border-white/[0.08] ml-4 sm:ml-8 space-y-12">
          
          {/* Animated Connecting SVG Spine Arrow */}
          <div className="absolute -left-[1px] top-0 bottom-0 w-2 pointer-events-none overflow-visible">
            <svg className="w-4 h-full overflow-visible" fill="none">
              <ArrowPath
                d="M 1 0 L 1 600"
                color="#00E5FF"
                glowColor="rgba(0, 229, 255, 0.5)"
                strokeWidth={2}
                duration={2.2}
                hasArrowHead={true}
                arrowHeadAngle={90}
                showParticle={true}
              />
            </svg>
          </div>

          {experienceData.map((exp, index) => (
            <div key={exp.company} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Node Orb (Ignites as arrow reaches it) */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#05060A] border-2 border-[#00E5FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-transform">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-ping" />
              </div>

              {/* Experience Card wrapped in GeometricFrame */}
              <GeometricFrame
                coordinates={`EXP_STAGE_0${index + 1}`}
                glowColor={index === 0 ? '#00E5FF' : '#6C63FF'}
                className="p-6 sm:p-8 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              >
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#6C63FF]/20 border border-[#6C63FF]/30 text-[#00E5FF]">
                        {exp.periodBadge}
                      </span>
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <Calendar size={13} />
                        {exp.duration}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-2xl text-white">
                      {exp.position}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-1 text-slate-300 font-mono text-xs">
                      <Building size={14} className="text-purple-400" />
                      <span className="font-bold text-white">{exp.company}</span>
                      <span className="text-slate-500">&bull;</span>
                      <span className="text-slate-400">{exp.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start lg:self-auto">
                    <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                      <ShieldCheck size={14} />
                      <span>Verified Tenure</span>
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <span className="text-[#00E5FF]">&rarr;</span> Key Engineering Contributions:
                  </h4>
                  <ul className="space-y-2 font-mono text-xs text-slate-300">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="text-[#00E5FF] flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-6">
                    <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block font-bold mb-2 flex items-center gap-1.5">
                      <Award size={14} />
                      <span>Key Highlights &amp; Milestones</span>
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {exp.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="text-xs font-mono text-slate-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies Used Chips */}
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                    Technologies &amp; Tools Utilized:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-200 transition-colors group-hover:border-[#00E5FF]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GeometricFrame>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
