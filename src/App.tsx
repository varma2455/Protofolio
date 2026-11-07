import React from 'react';
import { useLenis } from './hooks/useLenis';
import { useActiveSection } from './hooks/useActiveSection';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollConstructionController } from './components/construction/ScrollConstructionController';
import { GlobalArrowOverlay } from './components/construction/GlobalArrowOverlay';

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll
  useLenis();

  // Track active section for navbar highlighting
  const activeSection = useActiveSection([
    'hero',
    'about',
    'tech-stack',
    'projects',
    'experience',
    'skills',
    'education',
    'resume',
    'contact',
  ]);

  return (
    <div className="relative min-h-screen bg-[#0C0B09] text-[#F5F0E6] selection:bg-[#D6B36A]/25 selection:text-[#F5F0E6]">
      {/* Refined Obsidian Gold Ambient Lighting Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ambient-light-orb top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#D6B36A]/05" />
        <div className="ambient-light-orb top-[40%] right-[-150px] w-[600px] h-[600px] bg-[#B99555]/04" />
        <div className="ambient-light-orb bottom-[10%] left-[-150px] w-[700px] h-[700px] bg-[#211D17]/35" />
      </div>

      {/* CENTRAL SCROLL-TRIGGERED ARROW PAINTING CONTROLLER */}
      <ScrollConstructionController />

      {/* EXACTLY 8 PERSISTENT INTELLIGENT ARROW AGENTS & CIRCULAR HOME FORMATION */}
      <GlobalArrowOverlay />

      {/* Main Website Structure */}
      <div className="relative z-10">
        <Navbar activeSection={activeSection} />
        
        <main>
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Technology Stack Section */}
          <TechStack />

          {/* Projects Section */}
          <Projects />

          {/* Experience Section */}
          <Experience />

          {/* Skills Section */}
          <Skills />

          {/* Education Section */}
          <Education />

          {/* Resume Section */}
          <Resume />

          {/* Contact Section */}
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
