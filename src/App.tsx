import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { HomePage } from './pages/Home/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetail/ProjectDetailPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { ResumeModal } from './components/common/ResumeModal';

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
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
