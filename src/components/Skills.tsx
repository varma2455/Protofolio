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
import { 
  ConstructedSection, 
  ConstructedContainer, 
  ConstructedCard, 
  ConstructedIcon, 
  ConstructedHeading, 
  ConstructedDescription, 
  ConstructedBadge 
} from './construction';

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
    <section id="skills" className="relative py-28 bg-[#0C0B09] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/4 right-0 w-[450px] h-[450px] bg-[#D6B36A]/05" />
      <div className="ambient-light-orb bottom-10 left-10 w-[400px] h-[400px] bg-[#B99555]/04" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LEVEL 0: Outer Section Container */}
        <ConstructedSection
          id="skills"
          accentColor="#D6B36A"
          borderRadius={24}
          frameTitle="SYS://CAPABILITY_MATRIX"
          className="p-6 sm:p-10 border border-[rgba(214,179,106,0.20)] bg-[#14120F]/60 backdrop-blur-sm"
        >
          {/* Section Header */}
          <div className="mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#D6B36A] mb-3">
              <Cpu size={13} />
              <span>05 // TECHNICAL MATRIX</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E6] tracking-tight">
              Skills &amp; Technical <span className="text-gradient-gold">Expertise</span>
            </h2>
            <p className="mt-3 text-[#B9B2A5] text-sm sm:text-base font-sans">
              A verified breakdown of language proficiencies, backend systems, database patterns, and modern frontend frameworks.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              type="button"
              onClick={() => setSelectedCatId('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                selectedCatId === 'all'
                  ? 'bg-[#211D17] text-[#D6B36A] font-bold border border-[#D6B36A]/40'
                  : 'bg-[#191713] text-[#B9B2A5] hover:text-[#F5F0E6] border border-[rgba(214,179,106,0.20)]'
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
                    ? 'bg-[#211D17] text-[#D6B36A] font-bold border border-[#D6B36A]/40'
                    : 'bg-[#191713] text-[#B9B2A5] hover:text-[#F5F0E6] border border-[rgba(214,179,106,0.20)]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* LEVEL 1: Category Cards Grid */}
          <ConstructedContainer id="skills-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat, idx) => {
              const Icon = categoryIcons[cat.id] || Cpu;
              const borderColors = ['#D6B36A', '#B99555', '#E5C98A', '#D6B36A'];
              const accent = borderColors[idx % borderColors.length];

              return (
                <ConstructedCard
                  key={cat.id}
                  id={`skills-card-${cat.id}`}
                  accentColor={accent}
                  borderRadius={20}
                  className="p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[rgba(214,179,106,0.20)]">
                      <ConstructedIcon
                        id={`skills-icon-${cat.id}`}
                        icon={Icon}
                        color={accent}
                        containerSize={36}
                      />
                      <ConstructedHeading
                        id={`skills-head-${cat.id}`}
                        as="h3"
                        accentColor={accent}
                        className="font-heading font-bold text-base text-[#F5F0E6]"
                      >
                        {cat.title}
                      </ConstructedHeading>
                    </div>

                    {/* Skill items */}
                    <div className="space-y-3">
                      {cat.skills.map((s, sIdx) => (
                        <div key={sIdx} className="p-2.5 rounded-lg bg-[#211D17] border border-[rgba(214,179,106,0.20)]">
                          <div className="flex items-center justify-between text-xs font-mono mb-1">
                            <span className="text-[#F5F0E6] font-medium">{s.name}</span>
                            <ConstructedBadge
                              id={`skills-badge-${cat.id}-${sIdx}`}
                              color={accent}
                            >
                              {s.category}
                            </ConstructedBadge>
                          </div>
                          <ConstructedDescription
                            id={`skills-desc-${cat.id}-${sIdx}`}
                            accentColor={accent}
                            className="text-[11px] text-[#B9B2A5] leading-relaxed font-sans"
                          >
                            {s.description}
                          </ConstructedDescription>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[rgba(214,179,106,0.20)] flex items-center justify-between text-[10px] font-mono text-[#B9B2A5]">
                    <span>VERIFIED PRODUCTION LEVEL</span>
                    <span className="text-[#D6B36A]">ACTIVE</span>
                  </div>
                </ConstructedCard>
              );
            })}
          </ConstructedContainer>

        </ConstructedSection>
      </div>
    </section>
  );
};

export default Skills;
