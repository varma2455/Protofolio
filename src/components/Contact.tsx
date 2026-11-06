import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { triggerConfetti } from '../utils/confetti';
import { ContentConstructionRegion } from './construction/ContentConstructionRegion';
import { SectionRevealTimeline } from './construction/SectionRevealTimeline';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = 'yeswanthvarma684280@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    triggerConfetti();

    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.open(mailtoUrl, '_blank');
  };

  const regionSequence = ['contact-header', 'contact-info', 'contact-form'];

  return (
    <section id="contact" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/4 left-10 w-[500px] h-[500px] bg-[#6C63FF]/10" />
      <div className="ambient-light-orb bottom-10 right-10 w-[450px] h-[450px] bg-[#00E5FF]/08" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionRevealTimeline sectionId="contact" regionIds={regionSequence}>
          
          {/* 1. Section Header */}
          <ContentConstructionRegion
            id="contact-header"
            shape="chamfer"
            borderRadius={12}
            accentColor="#00E5FF"
            priority={1}
            className="mb-14 max-w-2xl"
          >
            <div className="p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
                <Mail size={13} />
                <span>08 // TRANSMISSION TERMINAL</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Initiate Direct <span className="text-gradient-cyan-blue">Transmission</span>
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
                Available for Software Engineering roles, MERN Stack opportunities, and high-impact technical collaborations.
              </p>
            </div>
          </ContentConstructionRegion>

          {/* 2. Grid Layout: Info & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Direct Communication Info */}
            <div className="lg:col-span-5">
              <ContentConstructionRegion
                id="contact-info"
                shape="rounded"
                borderRadius={20}
                accentColor="#6C63FF"
                priority={2}
                className="w-full"
              >
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white mb-2">
                      Direct Channels
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-sans">
                      Feel free to reach out via direct email, LinkedIn, or send a transmission through the portal.
                    </p>
                  </div>

                  {/* Email Card with One-Click Copy */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] shrink-0">
                        <Mail size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block">Verified Email</span>
                        <span className="text-xs font-mono text-white truncate block">{emailAddress}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                      title="Copy email to clipboard"
                    >
                      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Social Channels */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                      Professional Networks:
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href="https://github.com/varma2455"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all flex items-center gap-3 group"
                      >
                        <GithubIcon size={18} className="text-slate-400 group-hover:text-white" />
                        <div>
                          <span className="font-heading font-semibold text-xs text-white block">GitHub</span>
                          <span className="font-mono text-[10px] text-slate-500">@varma2455</span>
                        </div>
                      </a>

                      <a
                        href="https://linkedin.com/in/yeswanth-varma-pothuri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00E5FF]/40 transition-all flex items-center gap-3 group"
                      >
                        <LinkedinIcon size={18} className="text-slate-400 group-hover:text-[#00E5FF]" />
                        <div>
                          <span className="font-heading font-semibold text-xs text-white block">LinkedIn</span>
                          <span className="font-mono text-[10px] text-slate-500">in/yeswanth-varma</span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Fast Telemetry Strip */}
                  <div className="pt-4 border-t border-white/[0.06] space-y-2 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-purple-400" />
                      <span>Andhra Pradesh, India (IST / UTC +5:30)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={13} className="text-emerald-400" />
                      <span>Typical Response Window: Sub-24 Hours</span>
                    </div>
                  </div>
                </div>
              </ContentConstructionRegion>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <ContentConstructionRegion
                id="contact-form"
                shape="rounded"
                borderRadius={20}
                accentColor="#00E5FF"
                priority={3}
                className="w-full"
              >
                <div className="p-6 sm:p-8">
                  {submitted ? (
                    <div className="text-center py-12 space-y-4 font-mono">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={32} />
                      </div>
                      <h4 className="font-heading font-bold text-xl text-white">Transmission Prepared</h4>
                      <p className="text-slate-400 text-xs max-w-sm mx-auto font-sans">
                        Your message payload has been formatted. If your default mail client did not open automatically, you can reach out directly to{' '}
                        <span className="text-[#00E5FF] font-mono">{emailAddress}</span>.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        Send Another Transmission
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Jane Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00E5FF]/50 transition-colors font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                            Your Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="jane@organization.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00E5FF]/50 transition-colors font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                          Subject
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. MERN Full-Stack Opportunity / Collaboration"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00E5FF]/50 transition-colors font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                          Message Payload *
                        </label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Detail your requirements, project architecture, or interview availability..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00E5FF]/50 transition-colors font-sans resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white font-heading font-semibold text-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#6C63FF]/25 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send size={16} />
                        <span>Dispatch Transmission</span>
                      </button>
                    </form>
                  )}
                </div>
              </ContentConstructionRegion>
            </div>

          </div>
        </SectionRevealTimeline>
      </div>
    </section>
  );
};

export default Contact;
