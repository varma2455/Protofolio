import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  FileText, 
  Download, 
  Sun, 
  Moon, 
  Terminal, 
  Github, 
  Linkedin,
  ArrowUpRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { profileData } from '../../data/profile';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Expertise', href: '/#expertise' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080A0F]/85 dark:bg-[#080A0F]/85 light:bg-white/85 backdrop-blur-md border-b border-white/10 light:border-slate-200/80 shadow-lg shadow-black/5 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-violet/20 border border-white/10 flex items-center justify-center text-accent-blue group-hover:border-accent-blue/40 transition-colors">
              <Terminal className="w-4 h-4 text-accent-blue" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-tight text-white light:text-slate-900 group-hover:text-accent-blue transition-colors">
                {profileData.brand}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400 light:text-slate-500 uppercase tracking-wider">
                  MERN Architect
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#10141D]/70 light:bg-slate-100/80 border border-white/5 light:border-slate-200 px-4 py-1.5 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }
                }}
                className="px-3.5 py-1.5 text-xs font-mono text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-900 rounded-full hover:bg-white/5 light:hover:bg-white transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 border border-white/5 light:border-slate-200 text-slate-300 light:text-slate-700 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Resume Preview Trigger */}
            <button
              onClick={onOpenResumeModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200 border border-white/5 light:border-slate-200 text-xs font-mono text-slate-300 light:text-slate-700 transition-colors"
              title="Preview authentic resume PDF"
            >
              <FileText className="w-3.5 h-3.5 text-accent-blue" />
              <span>Preview</span>
            </button>

            {/* Resume Direct Download CTA */}
            <a
              href="/resume/Yeswanth_Varma_MERN_Developer.pdf"
              download="Yeswanth_Varma_MERN_Developer.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet hover:opacity-95 text-white text-xs font-mono font-medium shadow-md shadow-accent-blue/15 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl bg-white/5 light:bg-slate-100 text-slate-300 light:text-slate-700"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open mobile menu"
              className="p-2 rounded-xl bg-white/5 light:bg-slate-100 text-slate-300 light:text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-white/10 light:border-slate-200 bg-[#080A0F] light:bg-white px-4 pt-4 pb-6 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="px-4 py-2.5 rounded-lg text-sm font-mono text-slate-300 light:text-slate-700 hover:bg-white/5 light:hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 light:border-slate-200 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResumeModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 light:bg-slate-100 text-xs font-mono text-slate-200 light:text-slate-800"
                >
                  <FileText className="w-4 h-4 text-accent-blue" />
                  Preview Resume PDF
                </button>

                <a
                  href="/resume/Yeswanth_Varma_MERN_Developer.pdf"
                  download="Yeswanth_Varma_MERN_Developer.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent-blue text-white text-xs font-mono font-medium shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Download Full Resume
                </a>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <a
                    href={profileData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={profileData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
