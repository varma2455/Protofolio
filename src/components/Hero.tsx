import React, { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Terminal, 
  Layers, 
  Database, 
  Server, 
  Code2, 
  Sparkles, 
  ShieldCheck,
  Cpu,
  UserCheck
} from 'lucide-react';
import { Scene3D } from './Scene3D';
import { GithubIcon, LinkedinIcon } from './Icons';
import { GenerativeArrowEngine } from './generative/GenerativeArrowEngine';
import { KineticText } from './generative/KineticText';
import { ColorReveal } from './generative/ColorReveal';
import { GeometricFrame } from './generative/GeometricFrame';

interface HeroProps {
  onOpenResumeModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'specs'>('3d');
  const [arrowsConstructed, setArrowsConstructed] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const techBadges = [
    { name: 'MongoDB', icon: Database, color: 'text-emerald-400', border: 'border-emerald-500/20' },
    { name: 'Express.js', icon: Server, color: 'text-amber-400', border: 'border-amber-500/20' },
    { name: 'React 19', icon: Layers, color: 'text-cyan-400', border: 'border-cyan-500/20' },
    { name: 'Node.js', icon: Terminal, color: 'text-emerald-400', border: 'border-emerald-500/20' },
    { name: 'Socket.io', icon: Code2, color: 'text-purple-400', border: 'border-purple-500/20' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#05060A]"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="ambient-light-orb top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#6C63FF]/15" />
      <div className="ambient-light-orb top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[360px] bg-[#00E5FF]/10" />
      <div className="ambient-light-orb bottom-10 right-10 w-[420px] h-[420px] bg-[#A855F7]/10" />

      {/* GENERATIVE ARROW ENGINE: Hero Formation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
        <GenerativeArrowEngine
          id="hero-arrow-engine"
          preset="hero"
          seed={3482}
          arrowCount={11}
          viewBox="0 0 1400 900"
          colorPalette={['#00E5FF', '#6C63FF', '#A855F7', '#38BDF8']}
          autoPlay={true}
          triggerOnScroll={false}
          onConstructionPhaseChange={(phase) => {
            if (phase === 'transform') setArrowsConstructed(true);
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Information & CTAs (7 columns) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status & Telemetry Badge with Color Reveal */}
            <ColorReveal
              direction="left-to-right"
              gradientType="blue-cyan"
              duration={0.9}
              className="rounded-full mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#05060A]/80 border border-[#6C63FF]/40 text-[#00E5FF] text-xs font-mono font-medium tracking-wide shadow-[0_0_15px_rgba(108,99,255,0.3)]">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span>MERN STACK ARCHITECT &amp; DEVELOPER</span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline-block ml-1">
                  // [SRKR &bull; CSE &bull; 2027]
                </span>
              </div>
            </ColorReveal>

            {/* Developer Name & Subtitle with Kinetic Typography */}
            <div className="mb-4">
              <span className="text-xs font-mono tracking-widest uppercase text-slate-400 block mb-2">
                PORTFOLIO OF
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.05]">
                <KineticText
                  text="Yeswanth Varma"
                  variant="letter-reveal"
                  delay={0.15}
                  stagger={0.03}
                  className="mr-3"
                />
                <span className="text-gradient-cyan-blue block sm:inline">
                  <KineticText
                    text="Pothuri"
                    variant="letter-reveal"
                    delay={0.5}
                    stagger={0.03}
                    highlightWords={['Pothuri']}
                    highlightColor="#00E5FF"
                  />
                </span>
              </h1>
            </div>

            {/* Kinetic Headline */}
            <div className="text-xl sm:text-2xl font-heading font-semibold text-slate-200 mb-4 leading-snug">
              <KineticText
                text="Building scalable applications."
                variant="letter-reveal"
                delay={0.7}
                stagger={0.02}
                className="text-slate-100 mr-2"
              />
              <span className="text-[#00E5FF]">
                <KineticText
                  text="Engineering seamless experiences."
                  variant="gradient-wipe"
                  delay={1.1}
                />
              </span>
            </div>

            {/* Supporting Bio with Masked Outline Reveal */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              Full-Stack Web Developer dedicated exclusively to the MERN ecosystem. Specializing in high-throughput Express REST APIs, modular React single-page architectures, indexed MongoDB data models, and real-time Socket.io communication.
            </p>

            {/* Core Tech Pills with Directional Hover Indicators */}
            <div className="flex flex-wrap items-center gap-2 mb-9">
              <span className="text-xs font-mono text-slate-500 mr-1 flex items-center gap-1">
                <span className="text-[#00E5FF]">&rarr;</span> Primary Stack:
              </span>
              {techBadges.map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <div
                    key={badge.name}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B0E17] border ${badge.border} text-xs font-mono text-slate-300 shadow-sm transition-transform hover:-translate-y-1 hover:border-[#00E5FF]/40`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${badge.color}`} />
                    <span>{badge.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Action CTAs with Generative Arrow Directives */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#6C63FF] via-[#5244E3] to-[#00E5FF] hover:opacity-95 shadow-[0_0_25px_rgba(108,99,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] transition-all active:scale-95 group relative overflow-hidden"
              >
                {/* Subtle Directional Pointer */}
                <span className="relative z-10">Explore Featured Projects</span>
                <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1 text-cyan-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              </button>

              {onOpenResumeModal ? (
                <button
                  type="button"
                  onClick={onOpenResumeModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-slate-200 glass-panel hover:text-white hover:border-[#00E5FF]/40 transition-all active:scale-95 group"
                >
                  <Download size={16} className="text-[#00E5FF] group-hover:translate-y-0.5 transition-transform" />
                  <span>Resume Preview</span>
                </button>
              ) : (
                <a
                  href="/resume/Yeswanth_Varma_MERN_Developer.pdf"
                  download="Yeswanth_Varma_MERN_Developer.pdf"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-slate-200 glass-panel hover:text-white hover:border-[#00E5FF]/40 transition-all active:scale-95 group"
                >
                  <Download size={16} className="text-[#00E5FF] group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume (PDF)</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-purple-400" />
                <span>Get in Touch</span>
                <span className="text-[#00E5FF] text-xs">&rarr;</span>
              </button>
            </div>

            {/* Social Links & Verified Indicator */}
            <div className="flex items-center gap-5 pt-4 border-t border-white/[0.08] w-full">
              <span className="text-xs font-mono text-slate-500">Connect:</span>
              <a
                href="https://github.com/varma2455"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-1.5 rounded-md bg-white/[0.04] group-hover:bg-white/[0.08] border border-white/[0.08]">
                  <GithubIcon size={15} />
                </div>
                <span>varma2455</span>
              </a>

              <a
                href="https://linkedin.com/in/yeswanth-varma-pothuri"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-[#00E5FF] transition-colors group"
              >
                <div className="p-1.5 rounded-md bg-white/[0.04] group-hover:bg-[#00E5FF]/10 border border-white/[0.08] group-hover:border-[#00E5FF]/30">
                  <LinkedinIcon size={15} />
                </div>
                <span>yeswanth-varma-pothuri</span>
              </a>

              <div className="ml-auto hidden md:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <ShieldCheck size={14} />
                <span>Verified Resume Data</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Developer Core / Architectural Showcase (5 columns) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* View Switcher Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl glass-panel border border-white/[0.08] mb-3 self-end z-20">
              <button
                type="button"
                onClick={() => setActiveTab('3d')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === '3d'
                    ? 'bg-[#6C63FF] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles size={13} />
                <span>3D Gyroscope</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'specs'
                    ? 'bg-[#6C63FF] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu size={13} />
                <span>Dev Blueprint</span>
              </button>
            </div>

            {/* Geometric Frame with Crosshairs */}
            <GeometricFrame
              coordinates="HERO_V3D"
              glowColor="#00E5FF"
              className="w-full h-[450px] sm:h-[500px] overflow-hidden flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              {activeTab === '3d' ? (
                <div className="w-full h-full relative">
                  <Scene3D />
                  {/* Floating Controls Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="px-2.5 py-1 rounded-md bg-[#05060A]/80 border border-white/[0.08] backdrop-blur-md">
                      <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        GENERATIVE 3D QUANTUM CORE
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      PARALLAX &bull; ACTIVE
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full p-6 flex flex-col justify-between overflow-y-auto font-mono text-xs">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                      <span className="text-[#00E5FF] font-bold tracking-wider flex items-center gap-2">
                        <UserCheck size={15} />
                        DEVELOPER PROFILE AUDIT
                      </span>
                      <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        ACTIVE
                      </span>
                    </div>

                    <div className="space-y-3 text-slate-300">
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-slate-500 block text-[10px] uppercase">Candidate</span>
                        <span className="text-white font-semibold">Yeswanth Varma Pothuri</span>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-slate-500 block text-[10px] uppercase">Academic Status</span>
                        <span className="text-white">B.Tech CSE &bull; SRKR Engineering College (2023–2027)</span>
                        <span className="text-[#00E5FF] text-[11px] block mt-0.5">CGPA: 6.99</span>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-slate-500 block text-[10px] uppercase">Verified Internships</span>
                        <div className="mt-1 space-y-1">
                          <div className="text-slate-200">&bull; Blackbucks Engineers (MERN Stack Intern)</div>
                          <div className="text-slate-200">&bull; 1Stop.ai (Web Development Intern)</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-slate-500 block text-[10px] uppercase">Flagship Solutions</span>
                        <span className="text-slate-200">Food Delivery MERN &bull; E-Commerce Platform &bull; Real-Time Socket Chat</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-500">
                    <span>STATUS: READY FOR INTERVIEWS</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('3d')}
                      className="text-[#00E5FF] hover:underline"
                    >
                      &larr; Return to 3D
                    </button>
                  </div>
                </div>
              )}
            </GeometricFrame>

            {/* Quick Metrics Strip with Geometric Construction */}
            <div className="grid grid-cols-3 gap-3 w-full mt-4">
              <GeometricFrame cornerCrosshairs={false} className="p-3 text-center">
                <span className="block font-heading font-extrabold text-lg text-white">3+</span>
                <span className="text-[10px] font-mono text-slate-400">MERN Apps</span>
              </GeometricFrame>
              <GeometricFrame cornerCrosshairs={false} className="p-3 text-center">
                <span className="block font-heading font-extrabold text-lg text-[#00E5FF]">2</span>
                <span className="text-[10px] font-mono text-slate-400">Internships</span>
              </GeometricFrame>
              <GeometricFrame cornerCrosshairs={false} className="p-3 text-center">
                <span className="block font-heading font-extrabold text-lg text-purple-400">2027</span>
                <span className="text-[10px] font-mono text-slate-400">B.Tech Grad</span>
              </GeometricFrame>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
