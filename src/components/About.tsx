import React from 'react';
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
import { KineticText } from './generative/KineticText';
import { ContentConstructionRegion } from './construction/ContentConstructionRegion';
import { SectionRevealTimeline } from './construction/SectionRevealTimeline';

export const About: React.FC = () => {
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

  const regionSequence = ['about-header', 'about-bio', 'about-principles', 'about-metrics'];

  return (
    <section id="about" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/2 left-0 w-[450px] h-[450px] bg-[#6C63FF]/10 -translate-y-1/2" />
      <div className="ambient-light-orb bottom-0 right-0 w-[400px] h-[400px] bg-[#00E5FF]/08" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionRevealTimeline sectionId="about" regionIds={regionSequence}>
          
          {/* 1. Section Header */}
          <ContentConstructionRegion
            id="about-header"
            shape="chamfer"
            borderRadius={12}
            accentColor="#00E5FF"
            priority={1}
            className="mb-14 max-w-2xl"
          >
            <div className="p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
                <User size={13} />
                <span>SECTION 01 // ARCHITECT DOSSIER</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                Engineering With <span className="text-gradient-cyan-blue">Precision &amp; Purpose</span>
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
                A methodical approach to scalable full-stack JavaScript architectures, database schemas, and modern user experiences.
              </p>
            </div>
          </ContentConstructionRegion>

          {/* 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Narrative Bio Card */}
            <div className="lg:col-span-7 space-y-6">
              <ContentConstructionRegion
                id="about-bio"
                shape="rounded"
                borderRadius={20}
                accentColor="#6C63FF"
                priority={2}
                className="w-full"
              >
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 pb-3 border-b border-white/[0.08]">
                    <Target size={14} />
                    <span>ENGINEERING PHILOSOPHY &amp; BACKGROUND</span>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    I am <strong className="text-white font-semibold">Yeswanth Varma Pothuri</strong>, a dedicated MERN Stack Developer currently pursuing my Bachelor of Technology in Computer Science and Engineering at{' '}
                    <span className="text-white underline decoration-[#00E5FF]/40 decoration-1 underline-offset-4">
                      SRKR Engineering College, Bhimavaram
                    </span>{' '}
                    (Graduation Class of 2027, current CGPA: 6.99).
                  </p>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    My engineering focus revolves around crafting cohesive web applications where high-performance frontend state transitions blend seamlessly with secure, decoupled backend services. I prioritize clean codebases, transactional integrity, and scalable RESTful API designs over quick fixes.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <GraduationCap size={14} className="text-[#00E5FF]" />
                      <span>B.Tech CSE &bull; 2023–2027</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <MapPin size={14} className="text-purple-400" />
                      <span>Andhra Pradesh, India</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Immediate Internship/FTE Availability</span>
                    </div>
                  </div>
                </div>
              </ContentConstructionRegion>

              {/* Verified Metrics Strip */}
              <ContentConstructionRegion
                id="about-metrics"
                shape="chamfer"
                borderRadius={16}
                accentColor="#10B981"
                priority={3}
                className="w-full"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 text-center font-mono">
                  <div className="p-3 rounded-lg bg-white/[0.02]">
                    <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-white">3</span>
                    <span className="text-[11px] text-slate-400">Flagship Apps</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02]">
                    <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-[#00E5FF]">2</span>
                    <span className="text-[11px] text-slate-400">Industry Internships</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02]">
                    <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-indigo-400">6.99</span>
                    <span className="text-[11px] text-slate-400">B.Tech CGPA</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02]">
                    <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-emerald-400">100%</span>
                    <span className="text-[11px] text-slate-400">Verified Credentials</span>
                  </div>
                </div>
              </ContentConstructionRegion>
            </div>

            {/* Right Column: Architectural Principles Grid */}
            <div className="lg:col-span-5">
              <ContentConstructionRegion
                id="about-principles"
                shape="rounded"
                borderRadius={20}
                accentColor="#38BDF8"
                priority={4}
                className="w-full"
              >
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] pb-3 border-b border-white/[0.08]">
                    <Code size={14} />
                    <span>CORE ENGINEERING PILLARS</span>
                  </div>

                  <div className="space-y-4">
                    {principles.map((p, idx) => {
                      const Icon = p.icon;
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-3 mb-1.5">
                            <div className="p-2 rounded-lg bg-white/[0.04]">
                              <Icon size={15} className={p.color} />
                            </div>
                            <h4 className="font-heading font-semibold text-sm text-white">{p.title}</h4>
                          </div>
                          <p className="text-slate-400 text-xs leading-relaxed pl-10">
                            {p.description}
                          </p>
                        </div>
                      );
                    })}
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

export default About;
