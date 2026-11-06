import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowRight, 
  Layers, 
  Database, 
  AlertCircle, 
  X, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';
import { projectsData } from '../data/projects';
import type { Project } from '../types';
import { GithubIcon } from './Icons';
import { ContentConstructionRegion } from './construction/ContentConstructionRegion';
import { SectionRevealTimeline } from './construction/SectionRevealTimeline';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'architecture' | 'schema' | 'workflows' | 'challenges'>('architecture');

  const categories = [
    { id: 'all', label: 'All Flagship Projects' },
    { id: 'mern', label: 'MERN Stack' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'realtime', label: 'Real-Time & WebSockets' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.categoryType === selectedCategory);

  const regionSequence = ['projects-header', 'projects-filter', 'proj-0', 'proj-1', 'proj-2'];

  return (
    <section id="projects" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/4 left-1/3 w-[500px] h-[500px] bg-[#6C63FF]/10" />
      <div className="ambient-light-orb bottom-20 right-10 w-[450px] h-[450px] bg-[#00E5FF]/08" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionRevealTimeline sectionId="projects" regionIds={regionSequence}>
          
          {/* 1. Section Header */}
          <ContentConstructionRegion
            id="projects-header"
            shape="chamfer"
            borderRadius={12}
            accentColor="#00E5FF"
            priority={1}
            className="mb-10 max-w-2xl"
          >
            <div className="p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
                <FolderGit2 size={13} />
                <span>03 // FLAGSHIP CASE STUDIES</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Production-Grade <span className="text-gradient-cyan-blue">Full-Stack Solutions</span>
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
                Comprehensive case studies highlighting data schemas, state orchestration, decoupled REST controllers, and real-time socket events.
              </p>
            </div>
          </ContentConstructionRegion>

          {/* 2. Filter Pills */}
          <ContentConstructionRegion
            id="projects-filter"
            shape="rounded"
            borderRadius={12}
            accentColor="#6C63FF"
            priority={2}
            className="mb-12 w-full"
          >
            <div className="flex flex-wrap gap-2 p-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white font-bold shadow-lg shadow-[#6C63FF]/20'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ContentConstructionRegion>

          {/* 3. Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const borderColors = ['#00E5FF', '#6C63FF', '#A855F7'];
              const accent = borderColors[idx % borderColors.length];

              return (
                <ContentConstructionRegion
                  key={project.id}
                  id={`proj-${idx}`}
                  shape="rounded"
                  borderRadius={20}
                  accentColor={accent}
                  priority={3 + idx}
                  className="flex flex-col h-full"
                >
                  <div className="flex flex-col h-full justify-between p-6 sm:p-7">
                    <div>
                      {/* Top Bar with Number & Category */}
                      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                        <span className="font-mono text-xs text-[#00E5FF] font-semibold">
                          0{idx + 1} // CASE STUDY
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-white/[0.05] border border-white/[0.08] text-slate-300">
                          {project.category}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-2 leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-xs font-mono text-[#00E5FF] mb-3">
                        {project.tagline}
                      </p>

                      {/* Summary */}
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                        {project.shortDescription}
                      </p>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.slice(0, 5).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Architecture Highlight Snippet */}
                      <div className="p-3.5 rounded-xl bg-[#080C14] border border-white/[0.06] mb-6">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                          Solution Strategy:
                        </span>
                        <p className="text-xs font-mono text-slate-300 line-clamp-2">
                          {project.solutionStrategy}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCaseStudy(project);
                          setActiveModalTab('architecture');
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#00E5FF] hover:text-white transition-colors cursor-pointer group"
                      >
                        <span>Deep Dive Case Study</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20 transition-all"
                            aria-label="GitHub Repository"
                          >
                            <GithubIcon size={14} />
                          </a>
                        )}
                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
                            aria-label="Live Demo"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ContentConstructionRegion>
              );
            })}
          </div>

        </SectionRevealTimeline>
      </div>

      {/* Case Study Deep Dive Modal */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#090D18] border border-white/10 shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-[#05060A]">
              <div>
                <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider block mb-1">
                  CASE STUDY DOSSIER // {activeCaseStudy.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                  {activeCaseStudy.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCaseStudy(null)}
                className="p-2 rounded-lg bg-white/[0.05] text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-white/[0.08] bg-white/[0.02] px-6 gap-4 text-xs font-mono">
              {[
                { id: 'architecture', label: 'System Architecture' },
                { id: 'schema', label: 'Database Design' },
                { id: 'workflows', label: 'Data Workflows' },
                { id: 'challenges', label: 'Engineering Challenges' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveModalTab(tab.id as any)}
                  className={`py-3.5 border-b-2 font-medium cursor-pointer transition-colors ${
                    activeModalTab === tab.id
                      ? 'border-[#00E5FF] text-[#00E5FF]'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 font-sans">
              {activeModalTab === 'architecture' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-white text-base">Full-Stack Architecture Overview</h4>
                  <p className="leading-relaxed">{activeCaseStudy.fullOverview}</p>
                  
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="font-mono text-xs text-[#00E5FF] block mb-2 uppercase">Problem Statement:</span>
                    <p className="font-mono text-xs text-slate-300">{activeCaseStudy.problemStatement}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="font-mono text-xs text-emerald-400 block mb-2 uppercase">Solution Strategy:</span>
                    <p className="font-mono text-xs text-slate-300">{activeCaseStudy.solutionStrategy}</p>
                  </div>
                </div>
              )}

              {activeModalTab === 'schema' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-white text-base">MongoDB Models &amp; Collections</h4>
                  <div className="space-y-3">
                    {activeCaseStudy.databaseDesign.map((model, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="flex items-center gap-2 mb-2">
                          <Database size={15} className="text-emerald-400" />
                          <span className="font-heading font-bold text-white text-sm">{model.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">({model.purpose})</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {model.fields.map((f, fIdx) => (
                            <span key={fIdx} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] font-mono text-[11px] text-slate-300">
                              {f.name}: <span className="text-[#00E5FF]">{f.type}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalTab === 'workflows' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-white text-base">State &amp; API Workflows</h4>
                  <div className="space-y-4">
                    {activeCaseStudy.workflows.map((wf, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-[#00E5FF] font-bold">{wf.title}</span>
                          <span className="text-slate-500 text-[10px]">{wf.audience}</span>
                        </div>
                        <ul className="space-y-1 font-mono text-xs text-slate-300">
                          {wf.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <span className="text-emerald-400">{sIdx + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalTab === 'challenges' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-white text-base">Solved Engineering Challenges</h4>
                  <div className="space-y-3">
                    {activeCaseStudy.challenges.map((ch, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5 font-mono text-xs">
                        <span className="text-amber-400 font-bold block">Challenge #{i + 1}: {ch.problem}</span>
                        <p className="text-slate-300"><strong className="text-slate-400">Solution:</strong> {ch.solution}</p>
                        <p className="text-emerald-400"><strong className="text-slate-400">Outcome:</strong> {ch.outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/[0.08] bg-[#05060A] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">VARMA.DEV ARCHITECTURE RECORD</span>
              <div className="flex items-center gap-3">
                {activeCaseStudy.githubUrl && (
                  <a
                    href={activeCaseStudy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white transition-colors"
                  >
                    <GithubIcon size={14} />
                    <span>View Repository</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveCaseStudy(null)}
                  className="px-4 py-1.5 rounded-lg bg-[#6C63FF] text-white hover:bg-[#584fed] transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
