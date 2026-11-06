import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  GitBranch,
  Building2
} from 'lucide-react';
import { experienceData } from '../../data/experience';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#080A0F] dark:bg-[#080A0F] light:bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/20 text-accent-violet text-xs font-mono font-medium mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>INDUSTRY WORKFLOWS & INTERNSHIPS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white light:text-slate-900 tracking-tight">
            Experience & Professional Growth
          </h2>
          <p className="text-slate-400 light:text-slate-600 font-mono text-sm mt-2 max-w-2xl">
            Practical development internships delivering responsive web interfaces, RESTful APIs, and collaborative version control within production frameworks.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 light:border-slate-300 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#10141D] light:bg-white border-2 border-accent-blue flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent-blue" />
              </div>

              {/* Main Card */}
              <div className="rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 p-6 sm:p-8 shadow-xl">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5 light:border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-accent-blue" />
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-white light:text-slate-900">
                        {exp.company}
                      </h3>
                    </div>
                    <div className="text-accent-blue font-mono text-sm font-semibold mt-0.5">
                      {exp.position}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-white/5 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-white/5 light:border-slate-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-accent-violet" />
                      <span>{exp.duration}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
                      {exp.periodBadge}
                    </span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="text-sm text-slate-300 light:text-slate-600 mt-4 leading-relaxed font-sans">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="mt-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-slate-500 mb-3">
                    Core Engineering Deliverables:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-start gap-2.5 text-xs text-slate-300 light:text-slate-700 font-sans p-2 rounded-lg bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                        <span className="leading-snug">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Utilized */}
                <div className="mt-6 pt-4 border-t border-white/5 light:border-slate-200 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono text-slate-500 mr-2">Technologies:</span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#080A0F] light:bg-slate-100 border border-white/5 light:border-slate-200 text-xs font-mono text-slate-300 light:text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
