import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Layers, 
  Server, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Workflow, 
  Code2, 
  Table, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';

interface ProjectDetailPageProps {
  onOpenResumeModal: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onOpenResumeModal }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#080A0F] text-white flex flex-col items-center justify-center p-6 font-mono">
        <h1 className="text-3xl font-heading font-bold mb-4">Project Not Found</h1>
        <p className="text-slate-400 mb-6">The requested case study does not exist.</p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-accent-blue text-white text-xs"
        >
          Return to VARMA.DEV Home
        </Link>
      </div>
    );
  }

  // Find next project for continuous navigation
  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <div className="min-h-screen bg-[#080A0F] dark:bg-[#080A0F] light:bg-[#F8FAFC] text-slate-100 light:text-slate-900 transition-colors duration-300">
      <Navbar onOpenResumeModal={onOpenResumeModal} />

      <main className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 light:border-slate-200">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Selected Engineering Work</span>
            </Link>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 light:bg-slate-200 text-xs font-mono text-slate-300 light:text-slate-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Hero Header */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium mb-4"
              style={{
                backgroundColor: `${project.previewMockup.accentColor}15`,
                borderColor: `${project.previewMockup.accentColor}30`,
                color: project.previewMockup.accentColor,
                borderWidth: 1,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{project.category}</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white light:text-slate-900 tracking-tight leading-[1.1] mb-6">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 light:text-slate-600 font-sans max-w-3xl leading-relaxed">
              {project.tagline}
            </p>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 light:border-slate-200 text-xs font-mono">
              <div>
                <span className="text-slate-500 uppercase text-[10px] block mb-1">Architecture</span>
                <span className="text-white light:text-slate-900 font-semibold">{project.previewMockup.badge}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block mb-1">Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {project.status}
                </span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block mb-1">Stack Layers</span>
                <span className="text-white light:text-slate-900 font-semibold">MongoDB / Express / React / Node</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block mb-1">Auth Mechanism</span>
                <span className="text-accent-blue font-semibold">Stateless JWT + RBAC</span>
              </div>
            </div>
          </div>

          {/* 1. Overview & 2. Problem & 3. Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Overview (12 cols) */}
            <div className="lg:col-span-12 p-6 sm:p-8 rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200">
              <h2 className="font-heading font-bold text-xl text-white light:text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent-blue" />
                <span>1. Architectural Overview</span>
              </h2>
              <p className="text-slate-300 light:text-slate-600 font-sans leading-relaxed text-sm sm:text-base">
                {project.fullOverview}
              </p>
            </div>

            {/* Problem Statement (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200">
              <div className="flex items-center gap-2 text-rose-400 mb-3">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-heading font-bold text-lg text-white light:text-slate-900">
                  2. Problem Statement
                </h3>
              </div>
              <p className="text-slate-300 light:text-slate-600 font-sans leading-relaxed text-sm">
                {project.problemStatement}
              </p>
            </div>

            {/* Solution Strategy (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <Lightbulb className="w-5 h-5" />
                <h3 className="font-heading font-bold text-lg text-white light:text-slate-900">
                  3. Solution & Technical Strategy
                </h3>
              </div>
              <p className="text-slate-300 light:text-slate-600 font-sans leading-relaxed text-sm">
                {project.solutionStrategy}
              </p>
            </div>

          </div>

          {/* 4. Main Key Features */}
          <div className="mb-16">
            <h2 className="font-heading font-bold text-2xl text-white light:text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-accent-violet" />
              <span>4. Engineered Features Breakdown</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-blue/10 text-accent-blue flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-white light:text-slate-900 mb-1.5">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-400 light:text-slate-600 font-sans leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Role Workflows if available */}
          {project.workflows.length > 0 && (
            <div className="mb-16">
              <h2 className="font-heading font-bold text-2xl text-white light:text-slate-900 mb-6 flex items-center gap-2">
                <Workflow className="w-6 h-6 text-accent-cyan" />
                <span>Multi-Role Operational Workflows</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.workflows.map((wf, wIdx) => (
                  <div
                    key={wIdx}
                    className="p-6 rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-accent-blue mb-1">
                        {wf.audience}
                      </div>
                      <h3 className="font-heading font-bold text-lg text-white light:text-slate-900 mb-4">
                        {wf.title}
                      </h3>

                      <ol className="space-y-3 font-sans text-xs text-slate-300 light:text-slate-700">
                        {wf.steps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="font-mono text-accent-blue font-bold shrink-0">
                              0{sIdx + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. System Architecture Blueprint */}
          <div className="mb-16">
            <h2 className="font-heading font-bold text-2xl text-white light:text-slate-900 mb-6 flex items-center gap-2">
              <Server className="w-6 h-6 text-accent-blue" />
              <span>5. System Architecture Blueprint</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.architectureDiagram.map((layer, lIdx) => (
                <div
                  key={lIdx}
                  className="p-5 rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                      Tier 0{lIdx + 1}
                    </span>
                    <h4 className="font-heading font-bold text-base text-white light:text-slate-900 mb-1">
                      {layer.title}
                    </h4>
                    <p className="text-xs text-accent-blue font-mono mb-4">
                      {layer.role}
                    </p>

                    <div className="space-y-2 text-xs font-sans text-slate-300 light:text-slate-600 mb-4">
                      {layer.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5">
                          <span className="text-accent-blue font-bold">•</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 light:border-slate-200 flex flex-wrap gap-1 font-mono text-[10px]">
                    {layer.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/5 light:bg-slate-100 text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Technology Stack Deep Dive */}
          <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200">
            <h2 className="font-heading font-bold text-2xl text-white light:text-slate-900 mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-emerald-400" />
              <span>6. Technology Stack Specification</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                <div className="text-accent-blue font-bold mb-1">MongoDB & Mongoose</div>
                <p className="text-slate-300 light:text-slate-700 font-sans">{project.primaryTech.mongo}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                <div className="text-accent-violet font-bold mb-1">Express.js Framework</div>
                <p className="text-slate-300 light:text-slate-700 font-sans">{project.primaryTech.express}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                <div className="text-emerald-400 font-bold mb-1">React.js Client</div>
                <p className="text-slate-300 light:text-slate-700 font-sans">{project.primaryTech.react}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                <div className="text-amber-400 font-bold mb-1">Node.js Server Runtime</div>
                <p className="text-slate-300 light:text-slate-700 font-sans">{project.primaryTech.node}</p>
              </div>
            </div>
          </div>

          {/* 7. Database Schemas (Implementation Details) */}
          <div className="mb-16">
            <h2 className="font-heading font-bold text-2xl text-white light:text-slate-900 mb-6 flex items-center gap-2">
              <Table className="w-6 h-6 text-accent-blue" />
              <span>7. Database Schemas & Data Modeling</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {project.databaseDesign.map((schema, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 p-6 overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 light:border-slate-200 mb-4">
                    <h3 className="font-heading font-bold text-lg text-white light:text-slate-900">
                      {schema.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-blue/10 text-accent-blue">
                      Mongoose Model
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 light:text-slate-600 font-sans mb-4">
                    {schema.purpose}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-white/5 light:border-slate-200 text-slate-500 text-[10px]">
                          <th className="pb-2">Field</th>
                          <th className="pb-2">Type</th>
                          <th className="pb-2">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 light:divide-slate-100 text-slate-300 light:text-slate-700">
                        {schema.fields.map((f, fIdx) => (
                          <tr key={fIdx}>
                            <td className="py-2 text-accent-blue font-semibold">{f.name}</td>
                            <td className="py-2 text-accent-violet">{f.type}</td>
                            <td className="py-2 text-slate-400 light:text-slate-600 text-[11px]">{f.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Development Challenges & Solutions */}
          <div className="mb-16">
            <h2 className="font-heading font-bold text-2xl text-white light:text-slate-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <span>8. Development Challenges & Solutions</span>
            </h2>

            <div className="space-y-4">
              {project.challenges.map((c, cIdx) => (
                <div
                  key={cIdx}
                  className="p-6 rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
                >
                  <div className="lg:col-span-4">
                    <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block mb-1">
                      Challenge 0{cIdx + 1}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-white light:text-slate-900">
                      {c.problem}
                    </h4>
                  </div>

                  <div className="lg:col-span-5 font-sans text-xs text-slate-300 light:text-slate-600">
                    <span className="text-[10px] font-mono text-accent-blue uppercase tracking-wider block mb-1">
                      Engineered Strategy
                    </span>
                    <p>{c.solution}</p>
                  </div>

                  <div className="lg:col-span-3 p-3 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200 text-xs font-mono">
                    <span className="text-[10px] text-emerald-400 uppercase tracking-wider block mb-0.5">
                      Verified Outcome
                    </span>
                    <span className="text-white light:text-slate-900">{c.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Project Teaser Bar */}
          <div className="mt-20 pt-8 border-t border-white/10 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase">Next Flagship Project:</span>
              <div className="text-lg font-heading font-bold text-white light:text-slate-900">
                {nextProject.title}
              </div>
            </div>

            <Link
              to={`/projects/${nextProject.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-blue hover:bg-accent-blueHover text-white text-xs font-mono font-semibold transition-all hover:gap-3"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
