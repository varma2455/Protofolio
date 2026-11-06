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
import { KineticText } from './generative/KineticText';
import { ContentConstructionRegion } from './construction/ContentConstructionRegion';
import { SectionRevealTimeline } from './construction/SectionRevealTimeline';

interface HeroProps {
  onOpenResumeModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'specs'>('3d');

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

  const heroRegionSequence = [
    'hero-badge',
    'hero-title',
    'hero-headline',
    'hero-bio',
    'hero-cta',
    'hero-card',
    'hero-metrics',
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <SectionRevealTimeline sectionId="hero" regionIds={heroRegionSequence}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Information & CTAs (7 columns) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
              
              {/* 1. Status & Telemetry Badge */}
              <ContentConstructionRegion
                id="hero-badge"
                shape="rounded"
                borderRadius={9999}
                accentColor="#00E5FF"
                priority={1}
                className="inline-block"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide text-[#00E5FF] bg-[#00E5FF]/05">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                  <span>MERN STACK ARCHITECT &amp; DEVELOPER</span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block ml-1">
                    // [SRKR &bull; CSE &bull; 2027]
                  </span>
                </div>
              </ContentConstructionRegion>

              {/* 2. Developer Name & Subtitle */}
              <ContentConstructionRegion
                id="hero-title"
                shape="chamfer"
                borderRadius={12}
                accentColor="#6C63FF"
                priority={2}
                className="w-full"
              >
                <div className="p-3 sm:p-4">
                  <span className="text-xs font-mono tracking-widest uppercase text-slate-400 block mb-1">
                    PORTFOLIO OF
                  </span>
                  <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.05]">
                    <KineticText
                      text="Yeswanth Varma"
                      variant="letter-reveal"
                      delay={0.1}
                      stagger={0.03}
                      className="mr-3"
                    />
                    <span className="text-gradient-cyan-blue block sm:inline">
                      <KineticText
                        text="Pothuri"
                        variant="letter-reveal"
                        delay={0.4}
                        stagger={0.03}
                        highlightWords={['Pothuri']}
                        highlightColor="#00E5FF"
                      />
                    </span>
                  </h1>
                </div>
              </ContentConstructionRegion>

              {/* 3. Kinetic Headline */}
              <ContentConstructionRegion
                id="hero-headline"
                shape="rounded"
                borderRadius={12}
                accentColor="#38BDF8"
                priority={3}
                className="w-full"
              >
                <div className="p-3 text-xl sm:text-2xl font-heading font-semibold text-slate-200 leading-snug">
                  Building High-Performance Full-Stack Web Applications with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#6C63FF] to-[#A855F7] font-bold">
                    Scalable Architecture
                  </span>{' '}
                  and Real-Time Systems.
                </div>
              </ContentConstructionRegion>

              {/* 4. Bio Description & Tech Badges */}
              <ContentConstructionRegion
                id="hero-bio"
                shape="rounded"
                borderRadius={16}
                accentColor="#A855F7"
                priority={4}
                className="w-full"
              >
                <div className="p-4 space-y-4">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    B.Tech Computer Science student at{' '}
                    <span className="text-white font-medium border-b border-[#00E5FF]/40">
                      SRKR Engineering College (2023–2027)
                    </span>
                    . Experienced in production-ready MERN development, real-time WebSocket communication,
                    and clean decoupled REST APIs through professional internships at{' '}
                    <span className="text-[#00E5FF]">Blackbucks Engineers</span> and{' '}
                    <span className="text-purple-400">1Stop.ai</span>.
                  </p>

                  {/* Micro-Pill Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {techBadges.map((badge, idx) => {
                      const Icon = badge.icon;
                      return (
                        <div
                          key={idx}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.03] border ${badge.border} text-xs font-mono text-slate-300 transition-all hover:bg-white/[0.07]`}
                        >
                          <Icon size={12} className={badge.color} />
                          <span>{badge.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ContentConstructionRegion>

              {/* 5. CTAs and Social Links */}
              <ContentConstructionRegion
                id="hero-cta"
                shape="rounded"
                borderRadius={16}
                accentColor="#10B981"
                priority={5}
                className="w-full"
              >
                <div className="p-4 flex flex-wrap items-center gap-4">
                  {/* Primary CTA: View Projects */}
                  <button
                    type="button"
                    onClick={() => scrollToSection('projects')}
                    className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white font-heading font-semibold text-sm tracking-wide shadow-lg shadow-[#6C63FF]/25 hover:shadow-[#00E5FF]/40 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Explore Flagship Projects</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Secondary CTA: Download Resume */}
                  {onOpenResumeModal ? (
                    <button
                      type="button"
                      onClick={onOpenResumeModal}
                      className="px-5 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-heading font-medium text-sm hover:bg-white/10 hover:border-[#00E5FF]/40 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
                    >
                      <Download className="w-4 h-4 text-[#00E5FF] group-hover:-translate-y-0.5 transition-transform" />
                      <span>Resume PDF</span>
                    </button>
                  ) : (
                    <a
                      href="/resume/Yeswanth_Varma_MERN_Developer.pdf"
                      download="Yeswanth_Varma_MERN_Developer.pdf"
                      className="px-5 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-heading font-medium text-sm hover:bg-white/10 hover:border-[#00E5FF]/40 transition-all duration-300 flex items-center gap-2 cursor-pointer group"
                    >
                      <Download className="w-4 h-4 text-[#00E5FF] group-hover:-translate-y-0.5 transition-transform" />
                      <span>Resume PDF</span>
                    </a>
                  )}

                  {/* Contact Direct Link */}
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white hover:border-[#A855F7]/40 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    title="Get In Touch"
                  >
                    <Mail className="w-4 h-4" />
                  </button>

                  {/* Verified Social Profiles */}
                  <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                    <a
                      href="https://github.com/varma2455"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200"
                      aria-label="GitHub Profile"
                    >
                      <GithubIcon size={16} />
                    </a>
                    <a
                      href="https://linkedin.com/in/yeswanth-varma-pothuri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 transition-all duration-200"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedinIcon size={16} />
                    </a>
                  </div>
                </div>
              </ContentConstructionRegion>

            </div>

            {/* Right Column: Interactive 3D Developer Object & Telemetry (5 columns) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* 6. Interactive 3D Card / Profile Inspector */}
              <ContentConstructionRegion
                id="hero-card"
                shape="rounded"
                borderRadius={24}
                accentColor="#00E5FF"
                priority={6}
                className="w-full max-w-[460px]"
              >
                <div className="relative w-full h-[440px] sm:h-[480px] rounded-[24px] overflow-hidden flex flex-col">
                  {/* Top Panel Bar */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-black/40 z-20">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2">
                        SYS://VARMA.DEV/MERN_CORE
                      </span>
                    </div>

                    {/* Toggle View Mode */}
                    <div className="flex items-center bg-white/[0.06] rounded-lg p-0.5 border border-white/10">
                      <button
                        type="button"
                        onClick={() => setActiveTab('3d')}
                        className={`px-2 py-0.5 text-[10px] font-mono rounded cursor-pointer transition-colors ${
                          activeTab === '3d'
                            ? 'bg-[#6C63FF] text-white font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        3D OBJECT
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('specs')}
                        className={`px-2 py-0.5 text-[10px] font-mono rounded cursor-pointer transition-colors ${
                          activeTab === 'specs'
                            ? 'bg-[#00E5FF] text-black font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        VERIFIED AUDIT
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  {activeTab === '3d' ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Scene3D className="w-full h-full" />
                      
                      {/* Floating HUD Telemetry Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#05060A]/85 backdrop-blur-md border border-white/10 pointer-events-none z-10">
                        <div className="flex items-center gap-2">
                          <Cpu size={14} className="text-[#00E5FF] animate-pulse" />
                          <span className="text-[11px] font-mono text-slate-200">
                            INTELLIGENT 3D AGENT
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
                          className="text-[#00E5FF] hover:underline cursor-pointer"
                        >
                          &larr; Return to 3D
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ContentConstructionRegion>

              {/* 7. Metrics Strip */}
              <ContentConstructionRegion
                id="hero-metrics"
                shape="rounded"
                borderRadius={16}
                accentColor="#6C63FF"
                priority={7}
                className="w-full max-w-[460px] mt-4"
              >
                <div className="grid grid-cols-3 gap-3 p-3 text-center font-mono">
                  <div>
                    <span className="block font-heading font-extrabold text-lg text-white">3+</span>
                    <span className="text-[10px] text-slate-400">MERN Apps</span>
                  </div>
                  <div>
                    <span className="block font-heading font-extrabold text-lg text-[#00E5FF]">2</span>
                    <span className="text-[10px] text-slate-400">Internships</span>
                  </div>
                  <div>
                    <span className="block font-heading font-extrabold text-lg text-purple-400">2027</span>
                    <span className="text-[10px] text-slate-400">B.Tech Grad</span>
                  </div>
                </div>
              </ContentConstructionRegion>

            </div>
          </div>
        </SectionRevealTimeline>
      </div>
    </section>
  );
};

export default Hero;
