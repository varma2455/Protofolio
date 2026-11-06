import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import { HomePage } from './pages/Home/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetail/ProjectDetailPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { ResumeModal } from './components/common/ResumeModal';
import { CustomCursor } from './components/common/CustomCursor';
import { ShaderBackground } from './components/common/ShaderBackground';

// Route change scroll restoration helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Only scroll to top if not targeting an anchor hash
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export const AppContent: React.FC = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      {/* Dynamic GLSL WebGL Background */}
      <ShaderBackground />

      {/* Interactive Cursor Reticle */}
      <CustomCursor />

      <Routes>
        <Route
          path="/"
          element={<HomePage onOpenResumeModal={() => setResumeModalOpen(true)} />}
        />
        <Route
          path="/projects/:id"
          element={<ProjectDetailPage onOpenResumeModal={() => setResumeModalOpen(true)} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global Resume Preview Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
};

export const App: React.FC = () => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
