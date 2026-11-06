import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle,
  Zap
} from 'lucide-react';
import { Project } from '../../types';
import { ProjectMockup3D } from './ProjectMockup3D';

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
      className="group relative rounded-3xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 overflow-hidden shadow-2xl hover:border-accent-blue/40 transition-all duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Realistic 3D Mockup Stage (6 cols) */}
        <div className="lg:col-span-6 relative p-4 sm:p-6 flex flex-col justify-between bg-gradient-to-br from-[#121722] via-[#0A0D15] to-[#080A0F] light:from-slate-100 light:to-slate-50 border-b lg:border-b-0 lg:border-r border-white/5 light:border-slate-200 overflow-hidden">
          
          {/* Ambient Colored Backlight */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[110px] opacity-25 pointer-events-none"
            style={{ backgroundColor: project.previewMockup.accentColor }}
          />

          {/* Card Top Metadata */}
          <div className="relative z-10 flex items-center justify-between mb-2">
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
              0{index + 1} // FLAGSHIP ARCHITECTURE
            </span>
          </div>

          {/* Realistic 3D Studio Mockup with Perspective Tilt */}
          <div className="relative z-10 my-auto">
            <ProjectMockup3D project={project} />
          </div>

          {/* Quick Architecture Insight Tag */}
          <div className="relative z-10 mt-3 text-xs font-mono text-slate-400 light:text-slate-600 bg-white/5 light:bg-slate-100 p-3 rounded-xl border border-white/5 light:border-slate-200 flex items-center justify-between">
            <span className="truncate">
              <strong className="text-white light:text-slate-900">Key Solution: </strong>
              {project.challenges[0].solution.slice(0, 85)}...
            </span>
            <span className="text-[10px] font-mono text-emerald-400 shrink-0 ml-2">● Verified</span>
          </div>
        </div>

        {/* Right Column: Project Details & Case Study Link (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 light:text-slate-500 mb-2">
              <span>{project.category}</span>
              <span>•</span>
              <span className="text-emerald-400">Authentic MERN Stack</span>
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
