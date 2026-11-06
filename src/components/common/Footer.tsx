import React from 'react';
import { Terminal, ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { profileData } from '../../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 light:border-slate-200 bg-[#06080C] light:bg-slate-100 py-16 text-slate-400 light:text-slate-600 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-white/5 light:border-slate-200">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-lg text-white light:text-slate-900 tracking-tight">
                {profileData.brand}
              </span>
            </div>

            <p className="text-xs text-slate-400 light:text-slate-600 font-sans max-w-sm mb-4 leading-relaxed">
              {profileData.tagline}
            </p>

            <div className="text-[11px] text-slate-500">
              Designed & Engineered with MERN Stack Principles by Yeswanth Varma Pothuri.
            </div>
          </div>

          {/* Quick Nav Links (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-white light:text-slate-900 font-bold mb-3 uppercase tracking-wider text-[11px]">
                Navigation
              </div>
              <ul className="space-y-2">
                <li><a href="#hero" className="hover:text-accent-blue transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-accent-blue transition-colors">About</a></li>
                <li><a href="#expertise" className="hover:text-accent-blue transition-colors">Expertise</a></li>
                <li><a href="#projects" className="hover:text-accent-blue transition-colors">Projects</a></li>
                <li><a href="#experience" className="hover:text-accent-blue transition-colors">Experience</a></li>
              </ul>
            </div>

            <div>
              <div className="text-white light:text-slate-900 font-bold mb-3 uppercase tracking-wider text-[11px]">
                Engineering
              </div>
              <ul className="space-y-2">
                <li><a href="/projects/food-delivery" className="hover:text-accent-blue transition-colors">Food Delivery</a></li>
                <li><a href="/projects/ecommerce-platform" className="hover:text-accent-blue transition-colors">E-Commerce</a></li>
                <li><a href="/projects/chat-application" className="hover:text-accent-blue transition-colors">Real-Time Chat</a></li>
                <li><a href="#resume" className="hover:text-accent-blue transition-colors">Resume PDF</a></li>
                <li><a href="#contact" className="hover:text-accent-blue transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Right Connect & Back to top (3 cols) */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full">
            <div className="flex items-center gap-3 mb-6">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-200 light:hover:bg-slate-300 text-slate-300 light:text-slate-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-200 light:hover:bg-slate-300 text-accent-blue transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.contact.email}`}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-200 light:hover:bg-slate-300 text-accent-violet transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-200 text-xs text-slate-300 light:text-slate-700 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} VARMA.DEV • Yeswanth Varma Pothuri. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Bhimavaram, Andhra Pradesh</span>
            <span>•</span>
            <span className="text-emerald-400">SRKR Engineering College '27</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
