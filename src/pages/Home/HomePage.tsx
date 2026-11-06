import React from 'react';
import { HeroSection } from '../../components/hero/HeroSection';
import { AboutSection } from '../../components/about/AboutSection';
import { ExpertiseSection } from '../../components/expertise/ExpertiseSection';
import { ProjectsSection } from '../../components/projects/ProjectsSection';
import { ExperienceSection } from '../../components/experience/ExperienceSection';
import { EducationSection } from '../../components/education/EducationSection';
import { ResumeSection } from '../../components/resume/ResumeSection';
import { ContactSection } from '../../components/contact/ContactSection';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';

interface HomePageProps {
  onOpenResumeModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenResumeModal }) => {
  return (
    <div className="min-h-screen bg-[#080A0F] dark:bg-[#080A0F] light:bg-[#F8FAFC] text-slate-100 light:text-slate-900 transition-colors duration-300">
      <Navbar onOpenResumeModal={onOpenResumeModal} />
      
      <main>
        <HeroSection onOpenResumeModal={onOpenResumeModal} />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ResumeSection onOpenResumeModal={onOpenResumeModal} />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};
