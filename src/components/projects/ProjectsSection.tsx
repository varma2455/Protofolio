import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Sparkles, Filter } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mern' | 'ecommerce' | 'realtime'>('all');

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: projectsData.length },
    { id: 'mern', label: 'Food Delivery (MERN)', count: projectsData.filter(p => p.categoryType === 'mern').length },
    { id: 'ecommerce', label: 'E-Commerce Platform', count: projectsData.filter(p => p.categoryType === 'ecommerce').length },
    { id: 'realtime', label: 'Real-Time WebSockets', count: projectsData.filter(p => p.categoryType === 'realtime').length },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.categoryType === activeFilter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#080A0F] dark:bg-[#080A0F] light:bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-mono font-medium mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>FLAGSHIP ARCHITECTURES & REPOSITORIES</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white light:text-slate-900 tracking-tight">
              Selected Engineering Work
            </h2>
            <p className="text-slate-400 light:text-slate-600 font-mono text-sm mt-2 max-w-2xl">
              Applications designed, developed and engineered through practical problem solving. Each project includes complete architecture blueprints and full case studies.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#10141D] light:bg-white p-1.5 rounded-2xl border border-white/5 light:border-slate-200">
            {filterTabs.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-accent-blue text-white shadow-sm'
                      : 'text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20' : 'bg-white/5'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
