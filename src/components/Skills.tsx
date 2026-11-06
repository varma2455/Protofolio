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
import { GenerativeArrowEngine } from './generative/GenerativeArrowEngine';
import { KineticText } from './generative/KineticText';
import { GeometricFrame } from './generative/GeometricFrame';
import { ColorReveal } from './generative/ColorReveal';

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

  return (
    <section id="skills" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/4 right-0 w-[450px] h-[450px] bg-[#6C63FF]/10" />
      <div className="ambient-light-orb bottom-10 left-10 w-[400px] h-[400px] bg-[#00E5FF]/08" />

      {/* GENERATIVE ARROW ENGINE: Dynamic Skill Constellation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
        <GenerativeArrowEngine
          id="skills-constellation-engine"
          preset="skills"
          seed={9301}
          arrowCount={10}
          viewBox="0 0 1300 850"
          colorPalette={['#00E5FF', '#6C63FF', '#A855F7']}
          triggerOnScroll={true}
          scrollTriggerStart="top 75%"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
              <Cpu size={13} />
              <span>05 // TECHNICAL MATRIX</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              <KineticText
                text="Skills & Engineering"
                variant="letter-reveal"
                delay={0.1}
                className="mr-2"
              />
              <span className="text-gradient-cyan-blue">
                <KineticText
                  text="Constellation"
                  variant="gradient-wipe"
                  delay={0.35}
                />
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mt-3 text-base sm:text-lg">
              Full-spectrum technical proficiencies organized across frontend, backend, database modeling, and computer science foundations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1 rounded-xl glass-panel border border-white/[0.08] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setSelectedCatId('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCatId === 'all'
                  ? 'bg-[#6C63FF] text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              All Domains
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCatId(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedCatId === cat.id
                    ? 'bg-[#6C63FF] text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {cat.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid with Constellation Connection Frames */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, idx) => {
            const Icon = categoryIcons[category.id] || Cpu;
            return (
              <GeometricFrame
                key={category.id}
                coordinates={`SKILL_NODE_${idx + 1}`}
                glowColor={idx % 2 === 0 ? '#00E5FF' : '#A855F7'}
                className="p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#00E5FF]">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-white">
                          {category.title}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-400">
                          {category.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                    {category.description}
                  </p>

                  {/* Skills List with Dynamic Arrow Connectors */}
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          skill.highlight
                            ? 'bg-gradient-to-r from-[#6C63FF]/15 to-transparent border border-[#6C63FF]/30 shadow-[0_0_12px_rgba(108,99,255,0.15)]'
                            : 'bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.1]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-mono font-bold flex items-center gap-1.5 ${
                            skill.highlight ? 'text-[#00E5FF]' : 'text-slate-200'
                          }`}>
                            <span className="text-slate-500 text-[10px]">&rarr;</span>
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
                              CORE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Count */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{category.skills.length} Specialized Competencies</span>
                  <span className="text-emerald-400">&bull; Verified</span>
                </div>
              </GeometricFrame>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
