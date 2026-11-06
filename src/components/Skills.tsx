import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Server, 
  Database, 
  GitBranch, 
  Sparkles, 
  Code 
} from 'lucide-react';
import { skillCategories } from '../data/skills';
import { ContentConstructionRegion } from './construction/ContentConstructionRegion';
import { SectionRevealTimeline } from './construction/SectionRevealTimeline';

export const Skills: React.FC = () => {
  const [selectedCatId, setSelectedCatId] = useState<string>('all');

  const categoryIcons: Record<string, any> = {
    frontend: Layers,
    backend: Server,
    database: Database,
    realtime: Sparkles,
    workflow: GitBranch,
    programming: Code,
    core_cs: Cpu,
  };

  const filteredCategories = selectedCatId === 'all'
    ? skillCategories
    : skillCategories.filter((c) => c.id === selectedCatId);

  const regionSequence = ['skills-header', 'skills-filter', 'skills-grid'];

  return (
    <section id="skills" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/4 right-0 w-[450px] h-[450px] bg-[#6C63FF]/10" />
      <div className="ambient-light-orb bottom-10 left-10 w-[400px] h-[400px] bg-[#00E5FF]/08" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionRevealTimeline sectionId="skills" regionIds={regionSequence}>
          
          {/* 1. Section Header */}
          <ContentConstructionRegion
            id="skills-header"
            shape="chamfer"
            borderRadius={12}
            accentColor="#00E5FF"
            priority={1}
            className="mb-10 max-w-2xl"
          >
            <div className="p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
                <Cpu size={13} />
                <span>05 // TECHNICAL MATRIX</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Skills &amp; Technical <span className="text-gradient-cyan-blue">Expertise</span>
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
                A verified breakdown of language proficiencies, backend systems, database patterns, and modern frontend frameworks.
              </p>
            </div>
          </ContentConstructionRegion>

          {/* 2. Category Filters */}
          <ContentConstructionRegion
            id="skills-filter"
            shape="rounded"
            borderRadius={12}
            accentColor="#6C63FF"
            priority={2}
            className="mb-12 w-full"
          >
            <div className="flex flex-wrap gap-2 p-3">
              <button
                type="button"
                onClick={() => setSelectedCatId('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                  selectedCatId === 'all'
                    ? 'bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white font-bold'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                All Categories
              </button>
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                    selectedCatId === cat.id
                      ? 'bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white font-bold'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </ContentConstructionRegion>

          {/* 3. Skill Cards Grid */}
          <ContentConstructionRegion
            id="skills-grid"
            shape="rounded"
            borderRadius={20}
            accentColor="#A855F7"
            priority={3}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 sm:p-8">
              {filteredCategories.map((cat) => {
                const Icon = categoryIcons[cat.id] || Cpu;
                return (
                  <div
                    key={cat.id}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00E5FF]/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/[0.06]">
                        <div className="p-2 rounded-lg bg-white/[0.04] text-[#00E5FF]">
                          <Icon size={16} />
                        </div>
                        <h3 className="font-heading font-bold text-base text-white">
                          {cat.title}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {cat.skills.map((s, sIdx) => (
                          <div key={sIdx} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                            <div className="flex items-center justify-between text-xs font-mono mb-1">
                              <span className="text-white font-medium">{s.name}</span>
                              <span className="text-[10px] text-[#00E5FF] px-1.5 py-0.5 rounded bg-[#00E5FF]/10">
                                {s.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                              {s.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>VERIFIED PRODUCTION LEVEL</span>
                      <span className="text-emerald-400">ACTIVE</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ContentConstructionRegion>

        </SectionRevealTimeline>
      </div>
    </section>
  );
};

export default Skills;
