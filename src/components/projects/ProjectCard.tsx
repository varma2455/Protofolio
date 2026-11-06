import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  ArrowRight, 
  Layers, 
  Server, 
  Database, 
  Radio, 
  CheckCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-3xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 overflow-hidden shadow-xl hover:border-accent-blue/30 transition-all duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Visual Mockup & Architecture Preview (5 cols) */}
        <div className="lg:col-span-5 relative p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#151B26] to-[#0A0D14] light:from-slate-100 light:to-slate-50 border-b lg:border-b-0 lg:border-r border-white/5 light:border-slate-200 overflow-hidden">
          
          {/* Ambient Colored Backlight */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[90px] opacity-20 pointer-events-none"
            style={{ backgroundColor: project.previewMockup.accentColor }}
          />

          {/* Card Top Metadata */}
          <div className="relative z-10 flex items-center justify-between">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-medium border"
              style={{
                borderColor: `${project.previewMockup.accentColor}40`,
                backgroundColor: `${project.previewMockup.accentColor}15`,
                color: project.previewMockup.accentColor,
              }}
            >
              {project.previewMockup.badge}
            </span>

            <span className="text-[11px] font-mono text-slate-500">
              0{index + 1} // CASE STUDY
            </span>
          </div>

          {/* Interactive Abstract Mockup Display */}
          <div className="relative z-10 my-8 p-5 rounded-2xl bg-[#080A0F]/80 light:bg-white border border-white/10 light:border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 light:border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 truncate max-w-[150px]">
                {project.id}.api.cluster
              </span>
            </div>

            {/* Architecture Stack Mini Bars */}
            <div className="mt-4 space-y-2.5 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-white/5 light:bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300 light:text-slate-800">
                  <Layers className="w-3.5 h-3.5 text-accent-blue" />
                  <span>React Client</span>
                </div>
                <span className="text-[10px] text-emerald-400">Reactive</span>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 light:bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300 light:text-slate-800">
                  <Server className="w-3.5 h-3.5 text-accent-violet" />
                  <span>Express & Node</span>
                </div>
                <span className="text-[10px] text-accent-violet">REST Endpoints</span>
              </div>

              <div className="p-2.5 rounded-lg bg-white/5 light:bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300 light:text-slate-800">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>MongoDB Engine</span>
                </div>
                <span className="text-[10px] text-accent-blue">Persistent</span>
              </div>
            </div>
          </div>

          {/* Quick Challenge Snapshot */}
          <div className="relative z-10 text-xs font-mono text-slate-400 light:text-slate-600 bg-white/5 light:bg-slate-100 p-3 rounded-xl border border-white/5 light:border-slate-200">
            <span className="text-white light:text-slate-900 font-semibold">Core Focus: </span>
            {project.challenges[0].solution.slice(0, 95)}...
          </div>
        </div>

        {/* Right Column: Project Details & Case Study Link (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 light:text-slate-500 mb-2">
              <span>{project.category}</span>
              <span>•</span>
              <span className="text-emerald-400">Authentic Implementation</span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white light:text-slate-900 group-hover:text-accent-blue transition-colors mb-3">
              {project.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 light:text-slate-600 leading-relaxed mb-6 font-sans">
              {project.shortDescription}
            </p>

            {/* Key Features Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {project.keyFeatures.slice(0, 4).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 light:text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                  <span>{feat.title}</span>
                </div>
              ))}
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 light:bg-slate-100 text-slate-300 light:text-slate-700 border border-white/5 light:border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 light:border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 border border-white/5 light:border-slate-200 text-xs font-mono text-slate-300 light:text-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Repository</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 border border-white/5 light:border-slate-200 text-xs font-mono text-slate-300 light:text-slate-700 transition-colors"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Documentation</span>
                </a>
              )}
            </div>

            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue hover:bg-accent-blueHover text-white text-xs font-mono font-semibold shadow-md shadow-accent-blue/20 transition-all hover:gap-3"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </motion.article>
  );
};
