import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface NavbarProps {
  activeSection?: string;
  onOpenResumeModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'hero', onOpenResumeModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'MERN Stack', href: '#tech-stack' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#05060A]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="group flex items-center gap-2.5 text-white focus:outline-none"
            aria-label="VARMA.DEV Home"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00E5FF] p-[1px] shadow-[0_0_15px_rgba(108,99,255,0.4)]">
              <div className="w-full h-full bg-[#05060A] rounded-[7px] flex items-center justify-center group-hover:bg-[#0B0E17] transition-colors">
                <span className="font-mono font-bold text-xs bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] bg-clip-text text-transparent">
                  V
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg tracking-wider text-white group-hover:text-[#00E5FF] transition-colors">
                VARMA<span className="text-[#00E5FF]">.DEV</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 -mt-1 hidden sm:block">
                MERN ARCHITECT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-[#00E5FF] bg-white/[0.06] border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Social Links */}
            <a
              href="https://github.com/varma2455"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-all hover:scale-105"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/in/yeswanth-varma-pothuri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg text-slate-300 hover:text-[#00E5FF] bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-all hover:scale-105"
            >
              <LinkedinIcon size={18} />
            </a>

            {/* Resume Button */}
            {onOpenResumeModal ? (
              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(108,99,255,0.35)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] active:scale-95"
              >
                <FileText size={14} />
                <span>Resume</span>
              </button>
            ) : (
              <a
                href="/resume/Yeswanth_Varma_MERN_Developer.pdf"
                download="Yeswanth_Varma_MERN_Developer.pdf"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(108,99,255,0.35)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] active:scale-95"
              >
                <FileText size={14} />
                <span>Resume</span>
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/[0.05] border border-white/[0.1] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-xl glass-panel border border-white/[0.12] bg-[#05060A]/95 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-mono tracking-wide ${
                      isActive
                        ? 'text-[#00E5FF] bg-white/[0.08] font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={14} className={isActive ? 'opacity-100' : 'opacity-40'} />
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/varma2455"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.08]"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/yeswanth-varma-pothuri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-300 hover:text-[#00E5FF] bg-white/[0.04] border border-white/[0.08]"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                </div>

                <a
                  href="/resume/Yeswanth_Varma_MERN_Developer.pdf"
                  download="Yeswanth_Varma_MERN_Developer.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#00E5FF]"
                >
                  <FileText size={14} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
