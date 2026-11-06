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
import { SectionTransition } from './components/generative/SectionTransition';

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
    <div className="relative min-h-screen bg-[#05060A] text-[#F5F7FA] selection:bg-[#6C63FF]/30 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ambient-light-orb top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#6C63FF]/10" />
        <div className="ambient-light-orb top-[40%] right-[-150px] w-[600px] h-[600px] bg-[#00E5FF]/06" />
        <div className="ambient-light-orb bottom-[10%] left-[-150px] w-[700px] h-[700px] bg-[#A855F7]/08" />
      </div>

      {/* Main Website Structure */}
      <div className="relative z-10">
        <Navbar activeSection={activeSection} />
        
        <main>
          {/* Hero Section */}
          <Hero />

          {/* Section Transition 01 */}
          <SectionTransition
            fromSection="HERO"
            toSection="ABOUT"
            direction="down"
            coordinates="16.54°N, 81.52°E"
          />

          {/* About Section */}
          <About />

          {/* Section Transition 02 */}
          <SectionTransition
            fromSection="ABOUT"
            toSection="TECH_STACK"
            direction="diagonal-right"
            coordinates="MERN_STACK_V4"
          />

          {/* Technology Stack Section */}
          <TechStack />

          {/* Section Transition 03 */}
          <SectionTransition
            fromSection="TECH_STACK"
            toSection="PROJECTS"
            direction="down"
            coordinates="FLAGSHIP_CASES"
          />

          {/* Projects Section */}
          <Projects />

          {/* Section Transition 04 */}
          <SectionTransition
            fromSection="PROJECTS"
            toSection="EXPERIENCE"
            direction="diagonal-left"
            coordinates="INDUSTRY_INTERN"
          />

          {/* Experience Section */}
          <Experience />

          {/* Section Transition 05 */}
          <SectionTransition
            fromSection="EXPERIENCE"
            toSection="SKILLS"
            direction="down"
            coordinates="MATRIX_SKILLS"
          />

          {/* Skills Section */}
          <Skills />

          {/* Section Transition 06 */}
          <SectionTransition
            fromSection="SKILLS"
            toSection="EDUCATION"
            direction="diagonal-right"
            coordinates="SRKR_CSE_2027"
          />

          {/* Education Section */}
          <Education />

          {/* Section Transition 07 */}
          <SectionTransition
            fromSection="EDUCATION"
            toSection="RESUME"
            direction="down"
            coordinates="VERIFIED_CV"
          />

          {/* Resume Section */}
          <Resume />

          {/* Section Transition 08 */}
          <SectionTransition
            fromSection="RESUME"
            toSection="CONTACT"
            direction="diagonal-left"
            coordinates="TRANSMISSION_PORTAL"
          />

          {/* Contact Section */}
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
