import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { ContentConstructionRegion } from './construction/ContentConstructionRegion';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#030407] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-15 pointer-events-none" />
      <div className="ambient-light-orb bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#6C63FF]/08" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ContentConstructionRegion
          id="footer-terminal"
          shape="chamfer"
          borderRadius={20}
          accentColor="#00E5FF"
          priority={1}
          className="w-full"
        >
          <div className="p-8 sm:p-10 space-y-10">
            {/* Top Footer Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/[0.08] items-start">
              
              {/* Brand & Mission (5 cols) */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00E5FF] p-[1px] shadow-[0_0_15px_rgba(108,99,255,0.4)]">
                    <div className="w-full h-full bg-[#05060A] rounded-[7px] flex items-center justify-center">
                      <span className="font-mono font-bold text-xs bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] bg-clip-text text-transparent">
                        V
                      </span>
                    </div>
                  </div>
                  <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                    VARMA<span className="text-[#00E5FF]">.DEV</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed max-w-sm">
                  Portfolio of Yeswanth Varma Pothuri. Engineered exclusively for scalable MERN stack architectures, robust REST APIs, and responsive digital products.
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://github.com/varma2455"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon size={16} />
                  </a>
                  <a
                    href="https://linkedin.com/in/yeswanth-varma-pothuri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#00E5FF]/10 border border-white/[0.08] text-slate-300 hover:text-[#00E5FF] transition-all"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                  <a
                    href="mailto:yeswanthvarma684280@gmail.com"
                    className="px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-[#00E5FF] transition-all"
                  >
                    yeswanthvarma684280@gmail.com
                  </a>
                </div>
              </div>

              {/* Quick Nav Links (4 cols) */}
              <div className="md:col-span-4 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] font-bold flex items-center gap-1.5">
                  <span>&rarr;</span> Site Navigation
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors py-1 flex items-center gap-1"
                    >
                      <span className="text-slate-600 text-[10px]">&gt;</span>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Stack Specifications (3 cols) */}
              <div className="md:col-span-3 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                  <span>&rarr;</span> Engineered With
                </h4>
                <div className="space-y-1.5 text-[11px] font-mono text-slate-400">
                  <div className="text-slate-300">&bull; React 19 + TypeScript + Vite</div>
                  <div>&bull; Generative 2-Arrow Motion Engine</div>
                  <div>&bull; GSAP &bull; ScrollTrigger &bull; Three.js</div>
                  <div>&bull; Tailwind CSS v4 &bull; Lenis Scroll</div>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <ShieldCheck size={14} />
                  <span>100% Verified Details</span>
                </div>
              </div>

            </div>

            {/* Bottom Footer Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
              <div>
                &copy; {new Date().getFullYear()} Yeswanth Varma Pothuri &bull; VARMA.DEV &bull; All Rights Reserved.
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all text-xs cursor-pointer"
                >
                  <span>Back to Top</span>
                  <ArrowUp size={13} className="text-[#00E5FF]" />
                </button>
              </div>
            </div>
          </div>
        </ContentConstructionRegion>
      </div>
    </footer>
  );
};

export default Footer;
