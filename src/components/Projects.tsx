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
import { GenerativeArrowEngine } from './generative/GenerativeArrowEngine';
import { KineticText } from './generative/KineticText';
import { ColorReveal } from './generative/ColorReveal';
import { GeometricFrame } from './generative/GeometricFrame';

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

  return (
    <section id="projects" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/4 left-1/3 w-[500px] h-[500px] bg-[#6C63FF]/10" />
      <div className="ambient-light-orb bottom-20 right-10 w-[450px] h-[450px] bg-[#00E5FF]/08" />

      {/* GENERATIVE ARROWS: Project Frame Construction Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <GenerativeArrowEngine
          id="projects-arrow-engine"
          preset="projects"
          seed={8812}
          arrowCount={9}
          viewBox="0 0 1300 800"
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
              <FolderGit2 size={13} />
              <span>03 // FLAGSHIP CASE STUDIES</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              <KineticText
                text="Production-Grade"
                variant="letter-reveal"
                delay={0.1}
                className="mr-2"
              />
              <span className="text-gradient-cyan-blue">
                <KineticText
                  text="MERN Implementations"
                  variant="gradient-wipe"
                  delay={0.35}
                />
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mt-3 text-base sm:text-lg">
              Detailed architectural case studies featuring role-based authentication, real-time socket communication, and optimized MongoDB query patterns.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl glass-panel border border-white/[0.08] self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#6C63FF] text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid with Geometric Frame Construction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, pIdx) => (
            <GeometricFrame
              key={project.id}
              coordinates={`PRJ_0${pIdx + 1}`}
              glowColor="#00E5FF"
              className="flex flex-col overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] group"
            >
              {/* Card Header & Preview Glow with ColorReveal */}
              <ColorReveal
                direction="top-to-bottom"
                gradientType={pIdx === 0 ? 'cyan-violet' : pIdx === 1 ? 'blue-cyan' : 'electric-mern'}
                delay={pIdx * 0.15}
              >
                <div
                  className="p-6 sm:p-7 relative border-b border-white/[0.08]"
                  style={{
                    background:
                      project.id === 'food-delivery'
                        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(5, 6, 10, 0.95) 100%)'
                        : project.id === 'ecommerce-platform'
                        ? 'linear-gradient(135deg, rgba(108, 99, 255, 0.12) 0%, rgba(5, 6, 10, 0.95) 100%)'
                        : 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(5, 6, 10, 0.95) 100%)',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-slate-300">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-white group-hover:text-[#00E5FF] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>
              </ColorReveal>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Chips with Directional Indicators */}
                  <div className="mb-6">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
                      <span className="text-[#00E5FF]">&rarr;</span> Key Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/[0.06] text-slate-300 transition-colors group-hover:border-[#00E5FF]/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 6 && (
                        <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/[0.02] text-slate-500">
                          +{project.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCaseStudy(project);
                      setActiveModalTab('architecture');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] hover:opacity-95 shadow-[0_0_15px_rgba(108,99,255,0.3)] transition-all active:scale-95 group/btn cursor-pointer"
                  >
                    <span>View Architectural Blueprint</span>
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                    >
                      <GithubIcon size={14} />
                      <span>Source Code</span>
                    </a>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono text-[#00E5FF] hover:text-white bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 transition-colors"
                      >
                        <ExternalLink size={14} />
                        <span>Live / README</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </GeometricFrame>
          ))}
        </div>

      </div>

      {/* In-Depth Case Study Modal with Geometric Accents */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <GeometricFrame
            coordinates={`MODAL_${activeCaseStudy.id.toUpperCase()}`}
            glowColor="#00E5FF"
            className="w-full max-w-4xl max-h-[90vh] bg-[#080B12] shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#00E5FF] uppercase tracking-wider block mb-1">
                  CASE STUDY ARCHITECTURE // MERN ECOSYSTEM
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  {activeCaseStudy.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeCaseStudy.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/[0.06] border border-white/[0.1] text-xs font-mono inline-flex items-center gap-1.5"
                >
                  <GithubIcon size={14} />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveCaseStudy(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] cursor-pointer"
                  aria-label="Close Case Study"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/[0.08] overflow-x-auto text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveModalTab('architecture')}
                className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeModalTab === 'architecture'
                    ? 'border-[#00E5FF] text-[#00E5FF] font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers size={14} />
                <span>Architecture Layers</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab('schema')}
                className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeModalTab === 'schema'
                    ? 'border-[#00E5FF] text-[#00E5FF] font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database size={14} />
                <span>Database Schemas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab('workflows')}
                className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeModalTab === 'workflows'
                    ? 'border-[#00E5FF] text-[#00E5FF] font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu size={14} />
                <span>Operational Workflows</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab('challenges')}
                className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeModalTab === 'challenges'
                    ? 'border-[#00E5FF] text-[#00E5FF] font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertCircle size={14} />
                <span>Engineering Challenges Solved</span>
              </button>
            </div>

            {/* Modal Tab Content Area */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Problem & Solution Strip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-500/[0.04] border border-red-500/20">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold block mb-1">
                    Problem Statement
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {activeCaseStudy.problemStatement}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                    Solution Strategy
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {activeCaseStudy.solutionStrategy}
                  </p>
                </div>
              </div>

              {/* TAB 1: Architecture Layers */}
              {activeModalTab === 'architecture' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <span className="text-[#00E5FF]">&rarr;</span> System Tier Breakdown
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCaseStudy.architectureDiagram.map((layer, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl glass-panel border border-white/[0.08]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-heading font-bold text-sm text-white">
                            {layer.title}
                          </h5>
                          <span className="text-[10px] font-mono text-[#00E5FF] px-2 py-0.5 rounded bg-[#00E5FF]/10">
                            {layer.role}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {layer.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <ul className="space-y-1.5 text-[11px] text-slate-400 font-mono">
                          {layer.details.map((d, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#00E5FF]" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: Database Schemas */}
              {activeModalTab === 'schema' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <span className="text-[#00E5FF]">&rarr;</span> Mongoose Models &amp; Collections
                  </h4>
                  <div className="space-y-4">
                    {activeCaseStudy.databaseDesign.map((schema, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl glass-panel border border-white/[0.08]"
                      >
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/[0.06]">
                          <span className="font-heading font-bold text-sm text-emerald-400">
                            {schema.name}
                          </span>
                          <span className="text-xs text-slate-400">{schema.purpose}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-3 font-mono text-xs">
                          {schema.fields.map((f, i) => (
                            <div
                              key={i}
                              className="p-2 rounded bg-white/[0.02] border border-white/[0.04]"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white">{f.name}</span>
                                <span className="text-[10px] text-[#00E5FF]">{f.type}</span>
                              </div>
                              <span className="text-[10px] text-slate-500 block mt-0.5">
                                {f.desc}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Operational Workflows */}
              {activeModalTab === 'workflows' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <span className="text-[#00E5FF]">&rarr;</span> Role-Based Execution Pipelines
                  </h4>
                  <div className="space-y-4">
                    {activeCaseStudy.workflows.map((wf, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl glass-panel border border-white/[0.08]"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-heading font-bold text-sm text-white">
                            {wf.title}
                          </h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">
                            {wf.audience}
                          </span>
                        </div>
                        <ol className="space-y-2 text-xs font-mono text-slate-300">
                          {wf.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-white/[0.05] border border-white/[0.1] text-center text-[10px] text-[#00E5FF] flex-shrink-0 flex items-center justify-center font-bold">
                                {sIdx + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Engineering Challenges */}
              {activeModalTab === 'challenges' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <span className="text-[#00E5FF]">&rarr;</span> Solved Engineering Hurdles
                  </h4>
                  <div className="space-y-4">
                    {activeCaseStudy.challenges.map((ch, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl glass-panel border border-white/[0.08] space-y-3"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block font-bold mb-1">
                            Obstacle
                          </span>
                          <p className="text-xs font-mono text-slate-300">{ch.problem}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider block font-bold mb-1">
                            Technical Solution
                          </span>
                          <p className="text-xs font-mono text-slate-300">{ch.solution}</p>
                        </div>
                        <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-emerald-400">
                          <CheckCircle2 size={14} />
                          <span>Outcome: {ch.outcome}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">
                Verified Repository &bull; {activeCaseStudy.id}
              </span>
              <button
                type="button"
                onClick={() => setActiveCaseStudy(null)}
                className="px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </GeometricFrame>
        </div>
      )}

    </section>
  );
};

export default Projects;
