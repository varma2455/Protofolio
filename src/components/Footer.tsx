import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { 
  ConstructedSection, 
  ConstructedHeading, 
  ConstructedDescription 
} from './construction';

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
    <footer className="relative bg-[#0C0B09] border-t border-[rgba(214,179,106,0.20)] pt-16 pb-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-15 pointer-events-none" />
      <div className="ambient-light-orb bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#D6B36A]/04" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* LEVEL 0: Outer Section Frame */}
        <ConstructedSection
          id="footer"
          accentColor="#D6B36A"
          borderRadius={24}
          frameTitle="SYS://PORTFOLIO_TERMINAL_SIGNATURE"
          className="p-8 sm:p-10 border border-[rgba(214,179,106,0.20)] bg-[#14120F]/60 backdrop-blur-sm"
        >
          <div className="space-y-10">
            {/* Top Footer Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[rgba(214,179,106,0.20)] items-start">
              
              {/* Brand & Mission (5 cols) */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D6B36A] to-[#B99555] p-[1px] shadow-[0_0_12px_rgba(214,179,106,0.2)]">
                    <div className="w-full h-full bg-[#0C0B09] rounded-[7px] flex items-center justify-center">
                      <span className="font-mono font-bold text-xs bg-gradient-to-r from-[#D6B36A] to-[#B99555] bg-clip-text text-transparent">
                        V
                      </span>
                    </div>
                  </div>
                  <ConstructedHeading
                    id="footer-brand"
                    as="span"
                    accentColor="#D6B36A"
                    className="font-heading font-extrabold text-xl tracking-wider text-[#F5F0E6]"
                  >
                    VARMA<span className="text-[#D6B36A]">.DEV</span>
                  </ConstructedHeading>
                </div>

                <ConstructedDescription
                  id="footer-desc"
                  accentColor="#B99555"
                  className="text-xs sm:text-sm text-[#B9B2A5] font-mono leading-relaxed max-w-sm"
                >
                  Portfolio of Yeswanth Varma Pothuri. Engineered exclusively for scalable MERN stack architectures, robust REST APIs, and responsive digital products.
                </ConstructedDescription>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://github.com/varma2455"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#211D17] hover:bg-[#28241e] border border-[rgba(214,179,106,0.20)] text-[#B9B2A5] hover:text-[#F5F0E6] transition-all cursor-pointer"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon size={16} />
                  </a>
                  <a
                    href="https://linkedin.com/in/yeswanth-varma-pothuri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#211D17] hover:bg-[#28241e] border border-[rgba(214,179,106,0.20)] text-[#B9B2A5] hover:text-[#D6B36A] transition-all cursor-pointer"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                  <a
                    href="mailto:yeswanthvarma684280@gmail.com"
                    className="px-3 py-2 rounded-xl bg-[#211D17] hover:bg-[#28241e] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#B9B2A5] hover:text-[#D6B36A] transition-all cursor-pointer"
                  >
                    yeswanthvarma684280@gmail.com
                  </a>
                </div>
              </div>

              {/* Quick Nav Links (4 cols) */}
              <div className="md:col-span-4 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#D6B36A] font-bold flex items-center gap-1.5">
                  <span>&rarr;</span> Site Navigation
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-[#B9B2A5] hover:text-[#F5F0E6] transition-colors py-1 flex items-center gap-1 cursor-pointer"
                    >
                      <span className="text-[#B99555] text-[10px]">&gt;</span>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Stack Specifications (3 cols) */}
              <div className="md:col-span-3 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#D6B36A] font-bold flex items-center gap-1.5">
                  <span>&rarr;</span> Engineered With
                </h4>
                <div className="space-y-1.5 text-[11px] font-mono text-[#B9B2A5]">
                  <div className="text-[#F5F0E6]">&bull; React 19 + TypeScript + Vite</div>
                  <div>&bull; Global Nested Arrow Construction</div>
                  <div>&bull; GSAP &bull; ScrollTrigger &bull; Three.js</div>
                  <div>&bull; Obsidian Gold Design System</div>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#D6B36A]">
                  <ShieldCheck size={14} />
                  <span>100% Verified Details</span>
                </div>
              </div>

            </div>

            {/* Bottom Footer Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#B9B2A5]">
              <div>
                &copy; {new Date().getFullYear()} Yeswanth Varma Pothuri &bull; VARMA.DEV &bull; All Rights Reserved.
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#211D17] hover:bg-[#28241e] border border-[rgba(214,179,106,0.20)] text-[#F5F0E6] transition-all text-xs cursor-pointer"
                >
                  <span>Back to Top</span>
                  <ArrowUp size={13} className="text-[#D6B36A]" />
                </button>
              </div>
            </div>
          </div>
        </ConstructedSection>
      </div>
    </footer>
  );
};

export default Footer;
