import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  BookOpen, 
  CheckCircle,
  Building
} from 'lucide-react';
import { educationData, certificationsData } from '../../data/education';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[#080A0F] dark:bg-[#080A0F] light:bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>RIGOROUS ACADEMIC PEDIGREE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white light:text-slate-900 tracking-tight">
            Academic Foundation
          </h2>
          <p className="text-slate-400 light:text-slate-600 font-mono text-sm mt-2 max-w-2xl">
            Undergraduate Computer Science curriculum at SRKR Engineering College grounded in Data Structures, Database Architecture, and Computer Science fundamentals.
          </p>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 p-6 flex flex-col justify-between hover:border-accent-blue/30 transition-all editorial-card"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                    {edu.duration}
                  </span>
                  <div className="flex items-center gap-1 font-bold text-white light:text-slate-900">
                    <span className="text-accent-blue">{edu.score}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({edu.scoreType})</span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-white light:text-slate-900 mb-1 leading-snug">
                  {edu.degree}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 light:text-slate-600 font-sans mb-4">
                  <Building className="w-3.5 h-3.5 text-accent-violet shrink-0" />
                  <span>{edu.institution}, {edu.location}</span>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/5 light:border-slate-200">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Academic Scope:
                  </span>
                  {edu.focus.map((item, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-1.5 text-xs text-slate-300 light:text-slate-700 font-sans">
                      <span className="text-accent-blue mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 light:border-slate-200 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Institution Verified</span>
                <span className="text-emerald-400 font-medium">Valid</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications & Technical Achievements */}
        <div className="rounded-3xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-accent-blue" />
            <h3 className="font-heading font-bold text-xl text-white light:text-slate-900">
              Certifications & Extracurriculars
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certificationsData.map((cert, cIdx) => (
              <div
                key={cIdx}
                className="p-4 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-blue/10 text-accent-blue">
                      {cert.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{cert.issuer}</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white light:text-slate-900 mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-400 light:text-slate-600 font-sans leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
