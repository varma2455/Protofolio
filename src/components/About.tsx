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
import { 
  ConstructedSection, 
  ConstructedContainer, 
  ConstructedCard, 
  ConstructedIcon, 
  ConstructedHeading, 
  ConstructedDescription, 
  ConstructedBadge 
} from './construction';

export const About: React.FC = () => {
  const principles = [
    {
      title: 'Decoupled Component Architecture',
      description: 'Building maintainable, reusable, and testable code from modular React UI components to structured Express controllers.',
      icon: Layers,
      color: '#D6B36A',
    },
    {
      title: 'Full-Stack Cohesion',
      description: 'Harmonizing responsive frontend state with robust RESTful APIs, optimized JSON serialization, and persistent MongoDB schemas.',
      icon: Cpu,
      color: '#B99555',
    },
    {
      title: 'Transactional Reliability & Security',
      description: 'Strict JWT authentication pipelines, salted bcrypt password encryption, and role-based access control (RBAC).',
      icon: ShieldCheck,
      color: '#D6B36A',
    },
    {
      title: 'Continuous Software Craftsmanship',
      description: 'Participating in competitive college hackathons, exploring modern engineering patterns, and shipping functional web systems.',
      icon: Terminal,
      color: '#B99555',
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#0C0B09] overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/2 left-0 w-[450px] h-[450px] bg-[#D6B36A]/05 -translate-y-1/2" />
      <div className="ambient-light-orb bottom-0 right-0 w-[400px] h-[400px] bg-[#B99555]/04" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LEVEL 0: Outer Section Container */}
        <ConstructedSection
          id="about"
          accentColor="#D6B36A"
          borderRadius={24}
          frameTitle="SYS://ARCHITECT_DOSSIER_01"
          className="p-6 sm:p-10 border border-[rgba(214,179,106,0.20)] bg-[#14120F]/60 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#D6B36A] mb-3">
              <User size={13} />
              <span>SECTION 01 // ARCHITECT DOSSIER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#F5F0E6] tracking-tight">
              Engineering With <span className="text-gradient-gold">Precision &amp; Purpose</span>
            </h2>
            <p className="mt-3 text-[#B9B2A5] text-sm sm:text-base font-sans">
              A methodical approach to scalable full-stack JavaScript architectures, database schemas, and modern user experiences.
            </p>
          </div>

          {/* LEVEL 1: Inner Cards Grid */}
          <ConstructedContainer id="about-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Narrative Card + Metrics Card */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* CARD 1: Narrative Bio */}
              <ConstructedCard
                id="about-card-bio"
                accentColor="#D6B36A"
                borderRadius={20}
                className="p-6 sm:p-8 space-y-5"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-[rgba(214,179,106,0.20)]">
                  <ConstructedIcon
                    id="about-icon-target"
                    icon={Target}
                    color="#D6B36A"
                    containerSize={36}
                  />
                  <span className="font-mono text-xs text-[#D6B36A] font-semibold tracking-wider">
                    ENGINEERING PHILOSOPHY &amp; BACKGROUND
                  </span>
                </div>

                <ConstructedHeading
                  id="about-head-name"
                  as="h3"
                  accentColor="#D6B36A"
                  className="text-xl text-[#F5F0E6]"
                >
                  Yeswanth Varma Pothuri
                </ConstructedHeading>

                <ConstructedDescription
                  id="about-desc-narrative"
                  accentColor="#B99555"
                  className="space-y-3 text-[#B9B2A5]"
                >
                  <span>
                    MERN Stack Developer currently pursuing my Bachelor of Technology in Computer Science and Engineering at{' '}
                    <strong className="text-[#F5F0E6]">SRKR Engineering College, Bhimavaram</strong> (Graduation Class of 2027, CGPA: 6.99).
                  </span>
                  <span className="block mt-2">
                    My engineering focus revolves around crafting cohesive web applications where high-performance frontend state transitions blend seamlessly with secure, decoupled backend services.
                  </span>
                </ConstructedDescription>

                {/* LEVEL 2: Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <ConstructedBadge id="about-badge-grad" color="#D6B36A">
                    <GraduationCap size={13} className="mr-1.5 text-[#D6B36A]" />
                    B.Tech CSE &bull; 2023–2027
                  </ConstructedBadge>
                  <ConstructedBadge id="about-badge-loc" color="#B99555">
                    <MapPin size={13} className="mr-1.5 text-[#B99555]" />
                    Andhra Pradesh, India
                  </ConstructedBadge>
                  <ConstructedBadge id="about-badge-avail" color="#D6B36A">
                    <CheckCircle2 size={13} className="mr-1.5 text-[#D6B36A]" />
                    Immediate Availability
                  </ConstructedBadge>
                </div>
              </ConstructedCard>

              {/* CARD 2: Verified Metrics Strip */}
              <ConstructedCard
                id="about-card-metrics"
                accentColor="#B99555"
                borderRadius={18}
                className="p-5"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                  <div className="p-3 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)]">
                    <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-[#F5F0E6]">3</span>
                    <span className="text-[11px] text-[#B9B2A5]">Flagship Apps</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)]">
                    <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-[#D6B36A]">2</span>
                    <span className="text-[11px] text-[#B9B2A5]">Industry Internships</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)]">
                    <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-[#B99555]">6.99</span>
                    <span className="text-[11px] text-[#B9B2A5]">B.Tech CGPA</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)]">
                    <span className="block text-2xl sm:text-3xl font-heading font-extrabold text-[#D6B36A]">100%</span>
                    <span className="text-[11px] text-[#B9B2A5]">Verified Details</span>
                  </div>
                </div>
              </ConstructedCard>

            </div>

            {/* Right 5 Columns: Core Principles Bento Card */}
            <div className="lg:col-span-5">
              <ConstructedCard
                id="about-card-principles"
                accentColor="#D6B36A"
                borderRadius={20}
                className="p-6 sm:p-8 space-y-5"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-[rgba(214,179,106,0.20)]">
                  <ConstructedIcon
                    id="about-icon-code"
                    icon={Code}
                    color="#D6B36A"
                    containerSize={36}
                  />
                  <span className="font-mono text-xs text-[#D6B36A] font-semibold tracking-wider">
                    CORE ENGINEERING PILLARS
                  </span>
                </div>

                <div className="space-y-4">
                  {principles.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)]"
                      >
                        <div className="flex items-center gap-3 mb-1.5">
                          <ConstructedIcon
                            id={`about-princ-icon-${idx}`}
                            icon={Icon}
                            color={p.color}
                            containerSize={32}
                            size={14}
                          />
                          <ConstructedHeading
                            id={`about-princ-head-${idx}`}
                            as="h4"
                            accentColor={p.color}
                            className="font-heading font-semibold text-sm text-[#F5F0E6]"
                          >
                            {p.title}
                          </ConstructedHeading>
                        </div>
                        <ConstructedDescription
                          id={`about-princ-desc-${idx}`}
                          accentColor={p.color}
                          className="text-[#B9B2A5] text-xs leading-relaxed pl-11"
                        >
                          {p.description}
                        </ConstructedDescription>
                      </div>
                    );
                  })}
                </div>
              </ConstructedCard>
            </div>

          </ConstructedContainer>

        </ConstructedSection>
      </div>
    </section>
  );
};

export default About;
