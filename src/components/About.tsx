import React, { useState } from 'react';
import { 
  User, 
  Target, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  Terminal, 
  Code
} from 'lucide-react';
import { profileData } from '../data/profile';
import { GenerativeArrowEngine } from './generative/GenerativeArrowEngine';
import { KineticText } from './generative/KineticText';
import { ColorReveal } from './generative/ColorReveal';
import { GeometricFrame } from './generative/GeometricFrame';

export const About: React.FC = () => {
  const [arrowsActive, setArrowsActive] = useState(false);

  const principles = [
    {
      title: 'Decoupled Component Architecture',
      description: 'Building maintainable, reusable, and testable code from modular React UI components to structured Express controllers.',
      icon: Layers,
      color: 'text-cyan-400',
    },
    {
      title: 'Full-Stack Cohesion',
      description: 'Harmonizing responsive frontend state with robust RESTful APIs, optimized JSON serialization, and persistent MongoDB schemas.',
      icon: Cpu,
      color: 'text-indigo-400',
    },
    {
      title: 'Transactional Reliability & Security',
      description: 'Strict JWT authentication pipelines, salted bcrypt password encryption, and role-based access control (RBAC).',
      icon: ShieldCheck,
      color: 'text-emerald-400',
    },
    {
      title: 'Continuous Software Craftsmanship',
      description: 'Participating in competitive college hackathons, exploring modern engineering patterns, and shipping functional web systems.',
      icon: Terminal,
      color: 'text-amber-400',
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/2 left-0 w-[450px] h-[450px] bg-[#6C63FF]/10 -translate-y-1/2" />
      <div className="ambient-light-orb bottom-0 right-0 w-[400px] h-[400px] bg-[#00E5FF]/08" />

      {/* GENERATIVE ARROWS: About Section Construction */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <GenerativeArrowEngine
          id="about-arrow-engine"
          preset="about"
          seed={7189}
          arrowCount={9}
          viewBox="0 0 1300 800"
          colorPalette={['#00E5FF', '#6C63FF', '#A855F7']}
          triggerOnScroll={true}
          scrollTriggerStart="top 75%"
          onConstructionPhaseChange={(phase) => {
            if (phase === 'travel' || phase === 'connect') setArrowsActive(true);
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
            <User size={13} />
            <span>01 // ABOUT THE DEVELOPER</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            <KineticText
              text="Engineering with Purpose &"
              variant="letter-reveal"
              delay={0.1}
              className="mr-2"
            />
            <span className="text-gradient-cyan-blue">
              <KineticText
                text="Architectural Rigor"
                variant="gradient-wipe"
                delay={0.4}
              />
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mt-3 text-base sm:text-lg">
            A developer who bridges the gap between clean frontend interactions and resilient backend systems.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative & Philosophy (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Bio Card in Geometric Frame */}
            <GeometricFrame
              coordinates="ABOUT_DEV_01"
              glowColor="#6C63FF"
              className="p-6 sm:p-8"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none text-white">
                <Code size={120} />
              </div>

              <h3 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2.5">
                <Target size={20} className="text-[#00E5FF]" />
                <span>The MERN Stack Focus</span>
              </h3>

              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base font-sans">
                <p>
                  I am a Full-Stack Web Developer focused exclusively on developing modern, high-performance web applications using <strong className="text-white bg-[#00E5FF]/10 px-1 py-0.5 rounded border border-[#00E5FF]/20">MongoDB, Express.js, React.js, and Node.js</strong>.
                </p>
                <p>
                  Currently pursuing my <strong className="text-white">B.Tech in Computer Science and Engineering at SRKR Engineering College (2023–2027)</strong>, I have dedicated my time to understanding the nuances of the JavaScript runtime, designing scalable REST API architectures, and implementing low-latency real-time applications with Socket.io.
                </p>
                <p>
                  Rather than jumping between disconnected languages, I have chosen depth over superficial breadth—mastering the end-to-end MERN pipeline from browser state management down to database query indexing and schema relations.
                </p>
              </div>

              {/* Verified College & Location Badges */}
              <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#6C63FF]/15 border border-[#6C63FF]/30 text-[#00E5FF]">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Education</span>
                    <span className="text-sm font-semibold text-white">SRKR Engineering College</span>
                    <span className="text-xs text-slate-400 block">B.Tech CSE &bull; Class of 2027</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Location</span>
                    <span className="text-sm font-semibold text-white">Bhimavaram, Andhra Pradesh</span>
                    <span className="text-xs text-slate-400 block">India</span>
                  </div>
                </div>
              </div>
            </GeometricFrame>

            {/* Core Architectural Pillars with Color Reveal */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 px-1 flex items-center gap-2">
                <span className="text-[#00E5FF]">&rarr;</span> Engineering Principles
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {principles.map((principle, pIdx) => {
                  const Icon = principle.icon;
                  return (
                    <ColorReveal
                      key={principle.title}
                      direction="radial"
                      gradientType={pIdx % 2 === 0 ? 'cyan-violet' : 'blue-cyan'}
                      delay={pIdx * 0.12}
                      className="rounded-xl"
                    >
                      <div className="p-4 rounded-xl bg-[#0B0E17]/90 border border-white/[0.08] hover:border-white/[0.2] transition-all h-full">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={16} className={principle.color} />
                          <h5 className="font-heading font-semibold text-sm text-white">
                            {principle.title}
                          </h5>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {principle.description}
                        </p>
                      </div>
                    </ColorReveal>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Verified Details & Telemetry (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Developer Snapshot Card in Geometric Frame */}
            <GeometricFrame
              coordinates="TELEMETRY_PROFILE"
              glowColor="#00E5FF"
              className="p-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] font-bold">
                  VERIFIED PROFILE METRICS
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-3 font-mono text-xs">
                {profileData.quickInfo.map((info, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-[#00E5FF]/20 transition-colors"
                  >
                    <span className="text-slate-400">{info.label}</span>
                    <span className="font-semibold text-white text-right">{info.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">CGPA</span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  6.99 / 10.0
                </span>
              </div>
            </GeometricFrame>

            {/* Core Competencies Quick List */}
            <GeometricFrame
              cornerCrosshairs={false}
              className="p-6"
            >
              <h4 className="font-heading font-bold text-sm text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Verified Technical Scope</span>
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>React.js SPA, Virtual DOM, Hooks, Context</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Node.js / Express.js RESTful API Routing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>MongoDB Atlas, Mongoose ODM, Schema Indexing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>Socket.io Bidirectional WebSocket Streams</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>JWT Authentication, Bcrypt Salted Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  <span>Git, GitHub Collaborative Branching &amp; PRs</span>
                </div>
              </div>
            </GeometricFrame>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
