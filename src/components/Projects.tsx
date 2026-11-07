import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowRight, 
  Database, 
  X, 
  CheckCircle2 
} from 'lucide-react';
import { projectsData } from '../data/projects';
import type { Project } from '../types';
import { GithubIcon } from './Icons';
import { 
  ConstructedSection, 
  ConstructedContainer, 
  ConstructedCard, 
  ConstructedIcon, 
  ConstructedHeading, 
  ConstructedDescription, 
  ConstructedBadge, 
  ConstructedButton 
} from './construction';

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
    <section id="projects" className="relative py-28 bg-[#0C0B09] overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/4 left-1/3 w-[500px] h-[500px] bg-[#D6B36A]/05" />
      <div className="ambient-light-orb bottom-20 right-10 w-[450px] h-[450px] bg-[#B99555]/04" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LEVEL 0: Outer Section Container */}
        <ConstructedSection
          id="projects"
          accentColor="#D6B36A"
          borderRadius={24}
          frameTitle="SYS://FLAGSHIP_SOLUTIONS_MATRIX"
          className="p-6 sm:p-10 border border-[rgba(214,179,106,0.20)] bg-[#14120F]/60 backdrop-blur-sm"
        >
          {/* Section Header */}
          <div className="mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#D6B36A] mb-3">
              <FolderGit2 size={13} />
              <span>03 // FLAGSHIP CASE STUDIES</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E6] tracking-tight">
              Production-Grade <span className="text-gradient-gold">Full-Stack Solutions</span>
            </h2>
            <p className="mt-3 text-[#B9B2A5] text-sm sm:text-base font-sans">
              Comprehensive case studies highlighting data schemas, state orchestration, decoupled REST controllers, and real-time socket events.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#211D17] text-[#D6B36A] font-bold border border-[#D6B36A]/40 shadow-sm'
                    : 'bg-[#191713] text-[#B9B2A5] hover:text-[#F5F0E6] hover:bg-[#211D17] border border-[rgba(214,179,106,0.20)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* LEVEL 1: Inner Cards Grid */}
          <ConstructedContainer id="projects-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const borderColors = ['#D6B36A', '#B99555', '#E5C98A'];
              const accent = borderColors[idx % borderColors.length];

              return (
                <ConstructedCard
                  key={project.id}
                  id={`proj-card-${project.id}`}
                  accentColor={accent}
                  borderRadius={20}
                  className="p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Bar with Number & Category */}
                    <div className="flex items-center justify-between pb-4 border-b border-[rgba(214,179,106,0.20)] mb-4">
                      {/* LEVEL 2: Nested Icon */}
                      <div className="flex items-center gap-3">
                        <ConstructedIcon
                          id={`proj-icon-${project.id}`}
                          icon={FolderGit2}
                          color={accent}
                          containerSize={38}
                        />
                        <span className="font-mono text-xs text-[#D6B36A] font-semibold">
                          0{idx + 1} // CASE STUDY
                        </span>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-[#B9B2A5]">
                        {project.category}
                      </span>
                    </div>

                    {/* LEVEL 2: Heading */}
                    <ConstructedHeading
                      id={`proj-head-${project.id}`}
                      as="h3"
                      accentColor={accent}
                      className="text-xl sm:text-2xl text-[#F5F0E6] mb-1.5"
                    >
                      {project.title}
                    </ConstructedHeading>

                    <span className="text-xs font-mono text-[#D6B36A] block mb-3">
                      {project.tagline}
                    </span>

                    {/* LEVEL 2: Description */}
                    <ConstructedDescription
                      id={`proj-desc-${project.id}`}
                      accentColor={accent}
                      className="mb-5 text-sm leading-relaxed text-[#B9B2A5]"
                    >
                      {project.shortDescription}
                    </ConstructedDescription>

                    {/* LEVEL 2: Technology Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.slice(0, 4).map((tech, tIdx) => (
                        <ConstructedBadge
                          key={tIdx}
                          id={`proj-tech-${project.id}-${tIdx}`}
                          color={accent}
                        >
                          {tech}
                        </ConstructedBadge>
                      ))}
                    </div>

                    {/* Solution Strategy Snippet */}
                    <div className="p-3.5 rounded-xl bg-[#14120F] border border-[rgba(214,179,106,0.20)] mb-5">
                      <span className="text-[10px] font-mono text-[#B9B2A5] uppercase tracking-widest block mb-1">
                        Solution Architecture:
                      </span>
                      <p className="text-xs font-mono text-[#F5F0E6] line-clamp-2">
                        {project.solutionStrategy}
                      </p>
                    </div>
                  </div>

                  {/* LEVEL 2: Action Buttons */}
                  <div className="pt-4 border-t border-[rgba(214,179,106,0.20)] flex items-center justify-between">
                    <ConstructedButton
                      id={`proj-btn-modal-${project.id}`}
                      onClick={() => {
                        setActiveCaseStudy(project);
                        setActiveModalTab('architecture');
                      }}
                      accentColor={accent}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#D6B36A] hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Deep Dive Case Study</span>
                      <ArrowRight size={13} />
                    </ConstructedButton>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-[#B9B2A5] hover:text-[#F5F0E6] hover:border-[#D6B36A]/40 transition-all cursor-pointer"
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
                          className="p-2 rounded-lg bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-[#B9B2A5] hover:text-[#D6B36A] hover:border-[#D6B36A]/40 transition-all cursor-pointer"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </ConstructedCard>
              );
            })}
          </ConstructedContainer>

        </ConstructedSection>
      </div>

      {/* Case Study Deep Dive Modal */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0C0B09]/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#14120F] border border-[rgba(214,179,106,0.20)] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[rgba(214,179,106,0.20)] bg-[#0C0B09]">
              <div>
                <span className="text-xs font-mono text-[#D6B36A] uppercase tracking-wider block mb-1">
                  CASE STUDY DOSSIER // {activeCaseStudy.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#F5F0E6]">
                  {activeCaseStudy.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCaseStudy(null)}
                className="p-2 rounded-lg bg-[#211D17] text-[#B9B2A5] hover:text-[#F5F0E6] border border-[rgba(214,179,106,0.20)] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex border-b border-[rgba(214,179,106,0.20)] bg-[#0C0B09]/60 px-6 gap-4 text-xs font-mono">
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
                      ? 'border-[#D6B36A] text-[#D6B36A]'
                      : 'border-transparent text-[#B9B2A5] hover:text-[#F5F0E6]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#B9B2A5] font-sans">
              {activeModalTab === 'architecture' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-[#F5F0E6] text-base">Full-Stack Architecture Overview</h4>
                  <p className="leading-relaxed">{activeCaseStudy.fullOverview}</p>
                  
                  <div className="p-4 rounded-xl bg-[#191713] border border-[rgba(214,179,106,0.20)]">
                    <span className="font-mono text-xs text-[#D6B36A] block mb-2 uppercase">Problem Statement:</span>
                    <p className="font-mono text-xs text-[#F5F0E6]">{activeCaseStudy.problemStatement}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#191713] border border-[rgba(214,179,106,0.20)]">
                    <span className="font-mono text-xs text-[#B99555] block mb-2 uppercase">Solution Strategy:</span>
                    <p className="font-mono text-xs text-[#F5F0E6]">{activeCaseStudy.solutionStrategy}</p>
                  </div>
                </div>
              )}

              {activeModalTab === 'schema' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-[#F5F0E6] text-base">MongoDB Models &amp; Collections</h4>
                  <div className="space-y-3">
                    {activeCaseStudy.databaseDesign.map((model, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#191713] border border-[rgba(214,179,106,0.20)]">
                        <div className="flex items-center gap-2 mb-2">
                          <Database size={15} className="text-[#D6B36A]" />
                          <span className="font-heading font-bold text-[#F5F0E6] text-sm">{model.name}</span>
                          <span className="text-[10px] font-mono text-[#B9B2A5]">({model.purpose})</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {model.fields.map((f, fIdx) => (
                            <span key={fIdx} className="px-2 py-0.5 rounded bg-[#211D17] border border-[rgba(214,179,106,0.20)] font-mono text-[11px] text-[#F5F0E6]">
                              {f.name}: <span className="text-[#D6B36A]">{f.type}</span>
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
                  <h4 className="font-heading font-bold text-[#F5F0E6] text-base">State &amp; API Workflows</h4>
                  <div className="space-y-4">
                    {activeCaseStudy.workflows.map((wf, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#191713] border border-[rgba(214,179,106,0.20)] space-y-2">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-[#D6B36A] font-bold">{wf.title}</span>
                          <span className="text-[#B9B2A5] text-[10px]">{wf.audience}</span>
                        </div>
                        <ul className="space-y-1 font-mono text-xs text-[#F5F0E6]">
                          {wf.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <span className="text-[#D6B36A]">{sIdx + 1}.</span>
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
                  <h4 className="font-heading font-bold text-[#F5F0E6] text-base">Solved Engineering Challenges</h4>
                  <div className="space-y-3">
                    {activeCaseStudy.challenges.map((ch, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[#191713] border border-[rgba(214,179,106,0.20)] space-y-1.5 font-mono text-xs">
                        <span className="text-[#D6B36A] font-bold block">Challenge #{i + 1}: {ch.problem}</span>
                        <p className="text-[#F5F0E6]"><strong className="text-[#B9B2A5]">Solution:</strong> {ch.solution}</p>
                        <p className="text-[#B99555]"><strong className="text-[#B9B2A5]">Outcome:</strong> {ch.outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[rgba(214,179,106,0.20)] bg-[#0C0B09] flex items-center justify-between text-xs font-mono">
              <span className="text-[#B9B2A5]">VARMA.DEV ARCHITECTURE RECORD</span>
              <div className="flex items-center gap-3">
                {activeCaseStudy.githubUrl && (
                  <a
                    href={activeCaseStudy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#211D17] hover:bg-[#28241e] text-[#F5F0E6] border border-[rgba(214,179,106,0.20)] transition-colors cursor-pointer"
                  >
                    <GithubIcon size={14} />
                    <span>View Repository</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveCaseStudy(null)}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#D6B36A] to-[#B99555] text-[#0C0B09] font-bold hover:brightness-110 transition-colors cursor-pointer"
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
