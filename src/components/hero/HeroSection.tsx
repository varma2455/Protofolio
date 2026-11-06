import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowDown, 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Sparkles, 
  Terminal, 
  Layers, 
  Database, 
  Server, 
  Code2,
  ExternalLink
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { HeroVisual3D } from './HeroVisual3D';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  const techPills = [
    { label: 'MongoDB', icon: Database, color: 'text-emerald-400', border: 'border-emerald-500/20' },
    { label: 'Express.js', icon: Server, color: 'text-slate-300', border: 'border-slate-500/20' },
    { label: 'React.js', icon: Layers, color: 'text-accent-blue', border: 'border-accent-blue/20' },
    { label: 'Node.js', icon: Terminal, color: 'text-emerald-500', border: 'border-emerald-500/20' },
    { label: 'Socket.io', icon: Code2, color: 'text-accent-violet', border: 'border-accent-violet/20' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-radial-hero"
    >
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern light:bg-grid-pattern-light bg-[size:40px_40px] opacity-25 pointer-events-none" />

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-accent-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-mono font-medium tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
              <span>{profileData.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white light:text-slate-900 leading-[1.08] mb-6">
              Engineering the web,{' '}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-purple-400 bg-clip-text text-transparent">
                one meaningful experience
              </span>{' '}
              at a time.
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 light:text-slate-600 max-w-2xl leading-relaxed mb-8">
              {profileData.heroDescription}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs font-mono text-slate-400 light:text-slate-500 mr-2">Core Toolkit:</span>
              {techPills.map((pill) => {
                const IconComponent = pill.icon;
                return (
                  <div
                    key={pill.label}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#10141D] light:bg-slate-100 border ${pill.border} text-xs font-mono text-slate-300 light:text-slate-700 shadow-sm`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${pill.color}`} />
                    <span>{pill.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-accent-blue hover:bg-accent-blueHover text-white text-sm font-mono font-semibold shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore My Work</span>
              </a>

              <button
                onClick={onOpenResumeModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#151B26] light:bg-white border border-white/10 light:border-slate-300 hover:border-accent-blue/40 text-slate-200 light:text-slate-800 text-sm font-mono hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-accent-blue" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Links & Authentic Direct Access */}
            <div className="flex items-center gap-5 pt-4 border-t border-white/10 light:border-slate-200 w-full">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-accent-blue" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={`mailto:${profileData.contact.email}`}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white light:text-slate-600 light:hover:text-slate-900 transition-colors"
              >
                <Mail className="w-4 h-4 text-accent-violet" />
                <span>{profileData.contact.email}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Editorial Portrait & Engineering Composition (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            {/* Subtle 3D Ambient Cluster Node */}
            <div className="absolute -top-16 -right-16 w-80 h-80 pointer-events-none hidden sm:block">
              <HeroVisual3D />
            </div>

            <div className="relative w-full max-w-md">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-accent-blue/30 via-accent-violet/20 to-transparent blur-lg opacity-70" />

              {/* Main Card */}
              <div className="relative rounded-3xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 p-3 sm:p-4 shadow-2xl overflow-hidden">
                
                {/* Window Control Bar */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-white/5 light:border-slate-200 text-xs font-mono text-slate-400 light:text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] text-slate-400">yeswanth_varma.tsx</span>
                  <span className="text-[10px] text-accent-blue">MERN Stack</span>
                </div>

                {/* Profile Image with subtle editorial treatment */}
                <div className="relative mt-3 rounded-2xl overflow-hidden aspect-square bg-[#080A0F] border border-white/5 group">
                  <img
                    src="/images/varma_profile.png"
                    alt="Yeswanth Varma Pothuri"
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-transparent to-transparent opacity-80" />

                  {/* Overlaid Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 p-3 rounded-xl bg-[#10141D]/90 backdrop-blur-md border border-white/10">
                    <div>
                      <div className="text-xs font-heading font-bold text-white">
                        {profileData.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        SRKR CSE '27 • Bhimavaram
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-mono text-emerald-400 font-medium">
                        Open for Roles
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">
                        Full-Stack MERN
                      </span>
                    </div>
                  </div>
                </div>

                {/* Micro Stats Bar */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-center font-mono">
                  <div className="p-2 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                    <div className="text-sm font-bold text-accent-blue">3</div>
                    <div className="text-[10px] text-slate-400">Flagships</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                    <div className="text-sm font-bold text-accent-violet">2</div>
                    <div className="text-[10px] text-slate-400">Internships</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                    <div className="text-sm font-bold text-emerald-400">6.99</div>
                    <div className="text-[10px] text-slate-400">CGPA</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <a
            href="#about"
            aria-label="Scroll to About section"
            className="group flex flex-col items-center gap-2 text-slate-400 hover:text-accent-blue transition-colors"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase opacity-75 group-hover:opacity-100">
              Scroll Down
            </span>
            <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-accent-blue/30 flex items-center justify-center bg-white/5 group-hover:bg-accent-blue/10 transition-all">
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
