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
  Cpu 
} from 'lucide-react';
import { Scene3D } from './Scene3D';
import { GithubIcon, LinkedinIcon } from './Icons';
import { 
  ConstructedSection, 
  ConstructedCard, 
  ConstructedHeading, 
  ConstructedDescription, 
  ConstructedBadge, 
  ConstructedButton 
} from './construction';

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
    { name: 'MongoDB', icon: Database, color: '#D6B36A' },
    { name: 'Express.js', icon: Server, color: '#B99555' },
    { name: 'React 19', icon: Layers, color: '#E5C98A' },
    { name: 'Node.js', icon: Terminal, color: '#D6B36A' },
    { name: 'Socket.io', icon: Code2, color: '#B99555' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#0C0B09]"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-35 pointer-events-none" />

      {/* Refined Ambient Lighting Orbs */}
      <div className="ambient-light-orb top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D6B36A]/05" />
      <div className="ambient-light-orb top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[360px] bg-[#B99555]/04" />
      <div className="ambient-light-orb bottom-10 right-10 w-[420px] h-[420px] bg-[#211D17]/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* LEVEL 0: Outer Section Frame */}
        <ConstructedSection
          id="hero"
          accentColor="#D6B36A"
          borderRadius={28}
          frameTitle="SYS://HERO_COMMAND_INTERFACE"
          className="p-6 sm:p-10 border border-[rgba(214,179,106,0.20)] bg-[#14120F]/70 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: 7 columns */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
              
              {/* Telemetry Badge */}
              <ConstructedBadge id="hero-badge-status" color="#D6B36A" className="px-4 py-1.5 rounded-full text-xs">
                <span className="w-2 h-2 rounded-full bg-[#D6B36A] animate-pulse mr-2" />
                MERN STACK ARCHITECT &amp; DEVELOPER // [SRKR &bull; CSE &bull; 2027]
              </ConstructedBadge>

              {/* Developer Name */}
              <div className="w-full">
                <ConstructedHeading
                  id="hero-head-name"
                  as="h1"
                  accentColor="#D6B36A"
                  className="text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#F5F0E6] leading-[1.05]"
                >
                  <span className="text-xs font-mono tracking-widest uppercase text-[#B9B2A5] block mb-2 font-normal">
                    PORTFOLIO OF
                  </span>
                  Yeswanth Varma <span className="text-gradient-gold">Pothuri</span>
                </ConstructedHeading>
              </div>

              {/* Developer Title & Headline */}
              <ConstructedHeading
                id="hero-head-subtitle"
                as="h2"
                accentColor="#B99555"
                className="text-xl sm:text-2xl text-[#F5F0E6] font-semibold leading-snug"
              >
                <span className="text-[#D6B36A] font-bold">MERN Stack Developer</span> &bull;{' '}
                Building High-Performance Full-Stack Web Applications with{' '}
                <span className="text-[#D6B36A]">Scalable Architecture</span> and Real-Time Systems.
              </ConstructedHeading>

              {/* Bio Narrative Card */}
              <ConstructedCard
                id="hero-card-bio"
                accentColor="#B99555"
                borderRadius={18}
                className="p-5 w-full space-y-4"
              >
                <ConstructedDescription
                  id="hero-desc-narrative"
                  accentColor="#B99555"
                  className="text-[#B9B2A5] text-sm sm:text-base leading-relaxed"
                >
                  B.Tech Computer Science student at{' '}
                  <span className="text-[#F5F0E6] font-medium border-b border-[#D6B36A]/40">
                    SRKR Engineering College (2023–2027)
                  </span>
                  . Experienced in production-ready MERN development, real-time WebSocket communication,
                  and clean decoupled REST APIs through professional internships at{' '}
                  <span className="text-[#D6B36A]">Blackbucks Engineers</span> and{' '}
                  <span className="text-[#B99555]">1Stop.ai</span>.
                </ConstructedDescription>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {techBadges.map((badge, idx) => (
                    <ConstructedBadge
                      key={idx}
                      id={`hero-tech-badge-${idx}`}
                      color={badge.color}
                    >
                      <badge.icon size={13} className="mr-1.5" style={{ color: badge.color }} />
                      {badge.name}
                    </ConstructedBadge>
                  ))}
                </div>
              </ConstructedCard>

              {/* CTA Buttons Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ConstructedButton
                  id="hero-btn-explore"
                  onClick={() => scrollToSection('projects')}
                  accentColor="#D6B36A"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B99555] text-[#0C0B09] font-heading font-bold text-sm tracking-wide shadow-md shadow-[#D6B36A]/20 gap-2 cursor-pointer hover:brightness-110"
                >
                  <span>Explore Flagship Projects</span>
                  <ArrowRight className="w-4 h-4 text-[#0C0B09]" />
                </ConstructedButton>

                <ConstructedButton
                  id="hero-btn-resume"
                  onClick={onOpenResumeModal ? onOpenResumeModal : () => scrollToSection('resume')}
                  accentColor="#B99555"
                  className="px-5 py-3 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-[#F5F0E6] font-heading font-medium text-sm hover:bg-[#28241d] hover:border-[#D6B36A]/40 gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#D6B36A]" />
                  <span>Resume PDF</span>
                </ConstructedButton>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="p-3 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-[#B9B2A5] hover:text-[#F5F0E6] hover:border-[#D6B36A]/40 transition-all duration-300 cursor-pointer"
                  title="Get In Touch"
                >
                  <Mail className="w-4 h-4 text-[#D6B36A]" />
                </button>

                <div className="flex items-center gap-2 pl-2 border-l border-[rgba(214,179,106,0.20)]">
                  <a
                    href="https://github.com/varma2455"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-[#B9B2A5] hover:text-[#D6B36A] hover:border-[#D6B36A]/30 transition-all duration-200 cursor-pointer"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon size={16} />
                  </a>
                  <a
                    href="https://linkedin.com/in/yeswanth-varma-pothuri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-[#B9B2A5] hover:text-[#D6B36A] hover:border-[#D6B36A]/30 transition-all duration-200 cursor-pointer"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: 5 columns */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* CARD: 3D Object Inspector Card */}
              <ConstructedCard
                id="hero-card-3d"
                accentColor="#D6B36A"
                borderRadius={24}
                className="w-full max-w-[460px] overflow-hidden"
              >
                <div className="relative w-full h-[420px] sm:h-[460px] flex flex-col">
                  {/* Top Panel Bar */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(214,179,106,0.20)] bg-[#14120F] z-20">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                      <span className="text-[11px] font-mono text-[#B9B2A5] ml-2">
                        SYS://VARMA.DEV/MERN_CORE
                      </span>
                    </div>

                    <div className="flex items-center bg-[#211D17] rounded-lg p-0.5 border border-[rgba(214,179,106,0.20)]">
                      <button
                        type="button"
                        onClick={() => setActiveTab('3d')}
                        className={`px-2 py-0.5 text-[10px] font-mono rounded cursor-pointer transition-colors ${
                          activeTab === '3d'
                            ? 'bg-[#D6B36A] text-[#0C0B09] font-bold'
                            : 'text-[#B9B2A5] hover:text-[#F5F0E6]'
                        }`}
                      >
                        3D OBJECT
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('specs')}
                        className={`px-2 py-0.5 text-[10px] font-mono rounded cursor-pointer transition-colors ${
                          activeTab === 'specs'
                            ? 'bg-[#B99555] text-[#0C0B09] font-bold'
                            : 'text-[#B9B2A5] hover:text-[#F5F0E6]'
                        }`}
                      >
                        AUDIT
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  {activeTab === '3d' ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-[#0C0B09]/50">
                      <Scene3D className="w-full h-full" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 rounded-xl bg-[#14120F]/90 backdrop-blur-md border border-[rgba(214,179,106,0.20)] pointer-events-none z-10">
                        <div className="flex items-center gap-2">
                          <Cpu size={14} className="text-[#D6B36A] animate-pulse" />
                          <span className="text-[11px] font-mono text-[#F5F0E6]">
                            INTELLIGENT 3D AGENT
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#B9B2A5]">
                          PARALLAX &bull; ACTIVE
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col justify-between overflow-y-auto font-mono text-xs bg-[#191713]">
                      <div className="space-y-3 text-[#B9B2A5]">
                        <div className="p-3 rounded-lg bg-[#211D17] border border-[rgba(214,179,106,0.20)]">
                          <span className="text-[#B9B2A5] block text-[10px] uppercase">Candidate</span>
                          <span className="text-[#F5F0E6] font-semibold">Yeswanth Varma Pothuri</span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#211D17] border border-[rgba(214,179,106,0.20)]">
                          <span className="text-[#B9B2A5] block text-[10px] uppercase">Academic Status</span>
                          <span className="text-[#F5F0E6]">B.Tech CSE &bull; SRKR Engineering College (2023–2027)</span>
                          <span className="text-[#D6B36A] text-[11px] block mt-0.5 font-bold">CGPA: 6.99</span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#211D17] border border-[rgba(214,179,106,0.20)]">
                          <span className="text-[#B9B2A5] block text-[10px] uppercase">Verified Internships</span>
                          <div className="mt-1 space-y-1">
                            <div className="text-[#F5F0E6]">&bull; Blackbucks Engineers (MERN Stack Intern)</div>
                            <div className="text-[#F5F0E6]">&bull; 1Stop.ai (Web Development Intern)</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[rgba(214,179,106,0.20)] flex items-center justify-between text-[11px] text-[#B9B2A5]">
                        <span>STATUS: READY FOR INTERVIEWS</span>
                        <button
                          type="button"
                          onClick={() => setActiveTab('3d')}
                          className="text-[#D6B36A] hover:underline cursor-pointer"
                        >
                          &larr; Return to 3D
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ConstructedCard>

              {/* CARD: Metrics Strip */}
              <ConstructedCard
                id="hero-card-metrics"
                accentColor="#B99555"
                borderRadius={16}
                className="w-full max-w-[460px] mt-4 p-3"
              >
                <div className="grid grid-cols-3 gap-3 text-center font-mono">
                  <div>
                    <span className="block font-heading font-extrabold text-lg text-[#F5F0E6]">3+</span>
                    <span className="text-[10px] text-[#B9B2A5]">MERN Apps</span>
                  </div>
                  <div>
                    <span className="block font-heading font-extrabold text-lg text-[#D6B36A]">2</span>
                    <span className="text-[10px] text-[#B9B2A5]">Internships</span>
                  </div>
                  <div>
                    <span className="block font-heading font-extrabold text-lg text-[#B99555]">2027</span>
                    <span className="text-[10px] text-[#B9B2A5]">B.Tech Grad</span>
                  </div>
                </div>
              </ConstructedCard>

            </div>

          </div>
        </ConstructedSection>

      </div>
    </section>
  );
};

export default Hero;
