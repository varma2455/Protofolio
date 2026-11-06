import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Trophy
} from 'lucide-react';
import { educationData, certificationsData } from '../data/education';
import { GenerativeArrowEngine } from './generative/GenerativeArrowEngine';
import { KineticText } from './generative/KineticText';
import { GeometricFrame } from './generative/GeometricFrame';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 left-10 w-[450px] h-[450px] bg-[#6C63FF]/10" />
      <div className="ambient-light-orb bottom-10 right-10 w-[400px] h-[400px] bg-[#00E5FF]/08" />

      {/* GENERATIVE ARROWS: Academic Timeline Vectors */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <GenerativeArrowEngine
          id="education-timeline-engine"
          preset="education"
          seed={1109}
          arrowCount={8}
          viewBox="0 0 1200 700"
          colorPalette={['#00E5FF', '#6C63FF', '#A855F7']}
          triggerOnScroll={true}
          scrollTriggerStart="top 75%"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
            <GraduationCap size={13} />
            <span>06 // ACADEMIC RECORD</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            <KineticText
              text="Education &"
              variant="letter-reveal"
              delay={0.1}
              className="mr-2"
            />
            <span className="text-gradient-cyan-blue">
              <KineticText
                text="Credentials"
                variant="gradient-wipe"
                delay={0.35}
              />
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mt-3 text-base sm:text-lg">
            Rigorous computer science curriculum, foundational analytical background, and continuous certification.
          </p>
        </div>

        {/* Education Timeline / Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {educationData.map((item, idx) => (
            <GeometricFrame
              key={item.degree}
              coordinates={`EDU_0${idx + 1}`}
              glowColor={idx === 0 ? '#00E5FF' : '#6C63FF'}
              className={`p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1.5 transition-transform ${
                idx === 0 ? 'border-[#00E5FF]/40 shadow-[0_15px_35px_rgba(0,229,255,0.1)]' : ''
              }`}
            >
              {idx === 0 && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white shadow-sm uppercase tracking-wider">
                    Current Degree
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <Calendar size={13} />
                    {item.duration}
                  </span>
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#00E5FF]">
                    {item.scoreType}: {item.score}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-white mb-1.5">
                  {item.degree}
                </h3>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 mb-6">
                  <MapPin size={13} className="text-purple-400 flex-shrink-0" />
                  <span>{item.institution}</span>
                  <span className="text-slate-500">&bull;</span>
                  <span className="text-slate-400">{item.location}</span>
                </div>

                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                    <span className="text-[#00E5FF]">&rarr;</span> Core Focus &amp; Curriculum:
                  </span>
                  <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                    {item.focus.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#00E5FF] flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-500">
                <span>Verified Academic Milestone</span>
              </div>
            </GeometricFrame>
          ))}
        </div>

        {/* Certifications & Extracurricular Section */}
        <GeometricFrame
          coordinates="CERT_SYMPOSIA"
          glowColor="#A855F7"
          className="p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
            <div className="p-2.5 rounded-xl bg-[#6C63FF]/20 border border-[#6C63FF]/30 text-[#00E5FF]">
              <Trophy size={20} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-white">
                Technical Certifications &amp; Symposia
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Hands-on training, industry internship credentials, and hackathon participation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certificationsData.map((cert) => (
              <div
                key={cert.title}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00E5FF]/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.05] text-slate-400">
                    {cert.issuer}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400">
                    {cert.badge}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-sm text-white mb-2">
                  {cert.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </GeometricFrame>

      </div>
    </section>
  );
};

export default Education;
