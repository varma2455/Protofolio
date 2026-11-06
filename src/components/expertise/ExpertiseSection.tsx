import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Layers, 
  Server, 
  Database, 
  Terminal, 
  Radio, 
  Code, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  GitBranch,
  Boxes,
  FileCode,
  Layout,
  Smartphone,
  Network,
  Cable,
  Lock,
  Workflow,
  GitFork,
  RefreshCw,
  Zap,
  Send,
  Bug,
  Coffee,
  Binary,
  Table,
  HardDrive
} from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { TechCategoryType, TechItem } from '../../types';
import { ArchitectureVisualizer } from '../common/ArchitectureVisualizer';
import { MernStackVisualizer3D } from './MernStackVisualizer3D';

export const ExpertiseSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TechCategoryType>('frontend');
  const [hoveredSkill, setHoveredSkill] = useState<TechItem | null>(null);

  const getCategoryIcon = (id: TechCategoryType) => {
    switch (id) {
      case 'frontend':
        return Layers;
      case 'backend':
        return Server;
      case 'database':
        return Database;
      case 'workflow':
        return Terminal;
      case 'realtime':
        return Radio;
      case 'programming':
        return Code;
      case 'core_cs':
        return Cpu;
      default:
        return Wrench;
    }
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return Layers;
      case 'FileCode':
        return FileCode;
      case 'Layout':
        return Layout;
      case 'Smartphone':
        return Smartphone;
      case 'Boxes':
        return Boxes;
      case 'Cpu':
        return Cpu;
      case 'Server':
        return Server;
      case 'Network':
        return Network;
      case 'Cable':
        return Cable;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Lock':
        return Lock;
      case 'Workflow':
        return Workflow;
      case 'Database':
        return Database;
      case 'Layers':
        return Layers;
      case 'GitFork':
        return GitFork;
      case 'RefreshCw':
        return RefreshCw;
      case 'Zap':
        return Zap;
      case 'GitBranch':
        return GitBranch;
      case 'Send':
        return Send;
      case 'Terminal':
        return Terminal;
      case 'Bug':
        return Bug;
      case 'Radio':
        return Radio;
      case 'Code':
        return Code;
      case 'Coffee':
        return Coffee;
      case 'Binary':
        return Binary;
      case 'Table':
        return Table;
      case 'HardDrive':
        return HardDrive;
      default:
        return Code;
    }
  };

  const activeCategory = skillCategories.find((c) => c.id === selectedCategory) || skillCategories[0];

  return (
    <section id="expertise" className="py-24 relative overflow-hidden bg-[#080A0F] dark:bg-[#080A0F] light:bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-mono font-medium mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>MERN STACK ARCHITECTURE & TOOLKIT</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white light:text-slate-900 tracking-tight">
            Technology is my toolkit.
          </h2>
          <p className="text-slate-400 light:text-slate-600 font-mono text-sm mt-2 max-w-2xl">
            Clean categorization of technologies utilized in production and academic engineering. No arbitrary percentages — only authentic implementation competence.
          </p>
        </div>

        {/* 3D MERN Architecture Matrix Visualization */}
        <div className="mb-10">
          <MernStackVisualizer3D
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {skillCategories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            const isSelected = category.id === selectedCategory;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-accent-blue/15 text-accent-blue border-accent-blue/40 shadow-sm'
                    : 'bg-[#10141D] light:bg-white text-slate-400 light:text-slate-600 border-white/5 light:border-slate-200 hover:text-white light:hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-accent-blue' : 'text-slate-400'}`} />
                <span className="font-medium">{category.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 light:bg-slate-100 text-slate-500 font-mono">
                  {category.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details & Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Category Banner & Scope (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-accent-blue/10 text-accent-blue text-[11px] font-mono mb-3">
              <Sparkles className="w-3 h-3" />
              <span>{activeCategory.badge}</span>
            </div>
            
            <h3 className="font-heading font-bold text-2xl text-white light:text-slate-900 mb-3">
              {activeCategory.title}
            </h3>
            
            <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed font-sans mb-6">
              {activeCategory.description}
            </p>

            {/* Hovered Skill Detail Inspector */}
            <div className="p-4 rounded-xl bg-[#080A0F] light:bg-slate-50 border border-white/5 light:border-slate-200 text-xs">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                Active Inspection
              </div>
              {hoveredSkill ? (
                <div>
                  <div className="font-heading font-bold text-sm text-accent-blue">
                    {hoveredSkill.name}
                  </div>
                  <p className="text-slate-300 light:text-slate-700 font-mono text-xs mt-1">
                    {hoveredSkill.description}
                  </p>
                  {hoveredSkill.projectsUsed.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-white/5 light:border-slate-200">
                      <span className="text-[10px] font-mono text-slate-400">Implemented in:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {hoveredSkill.projectsUsed.map((pId) => (
                          <span
                            key={pId}
                            className="px-2 py-0.5 rounded bg-accent-blue/10 text-accent-blue text-[10px] font-mono"
                          >
                            #{pId}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-slate-400 italic font-mono text-[11px]">
                  Hover over any technology card on the right to inspect architecture notes & project implementations.
                </div>
              )}
            </div>
          </div>

          {/* Technology Cards Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {activeCategory.skills.map((skill, index) => {
                const SkillIcon = getSkillIcon(skill.iconName);
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    className="p-5 rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 hover:border-accent-blue/40 transition-all cursor-pointer group editorial-card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 light:bg-slate-100 flex items-center justify-center text-slate-300 light:text-slate-700 group-hover:bg-accent-blue/10 group-hover:text-accent-blue transition-colors">
                        <SkillIcon className="w-5 h-5" />
                      </div>
                      {skill.highlight && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                          Primary
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading font-bold text-base text-white light:text-slate-900 group-hover:text-accent-blue transition-colors mb-1.5">
                      {skill.name}
                    </h4>

                    <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed font-sans line-clamp-2">
                      {skill.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/5 light:border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>
                        {skill.projectsUsed.length > 0
                          ? `${skill.projectsUsed.length} projects`
                          : 'Core coursework'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-accent-blue" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Live Architecture Simulation Section */}
        <div className="mt-12">
          <ArchitectureVisualizer />
        </div>

      </div>
    </section>
  );
};
