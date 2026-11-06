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
import { GenerativeArrowEngine } from './generative/GenerativeArrowEngine';
import { KineticText } from './generative/KineticText';
import { GeometricFrame } from './generative/GeometricFrame';
import { ColorReveal } from './generative/ColorReveal';

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

    // Trigger local feedback
    setSubmitted(true);
    triggerConfetti();

    // Construct mailto link
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 left-1/4 w-[500px] h-[500px] bg-[#6C63FF]/10" />
      <div className="ambient-light-orb bottom-10 right-10 w-[450px] h-[450px] bg-[#00E5FF]/08" />

      {/* GENERATIVE ARROW ENGINE: Luminous Portal Convergence */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <GenerativeArrowEngine
          id="contact-portal-engine"
          preset="contact"
          seed={7702}
          arrowCount={12}
          viewBox="0 0 1300 800"
          colorPalette={['#00E5FF', '#6C63FF', '#A855F7', '#38BDF8']}
          triggerOnScroll={true}
          scrollTriggerStart="top 75%"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
            <Mail size={13} />
            <span>08 // INITIATE TRANSMISSION</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            <KineticText
              text="Let's Engineer"
              variant="letter-reveal"
              delay={0.1}
              className="mr-2"
            />
            <span className="text-gradient-cyan-blue">
              <KineticText
                text="Something Exceptional"
                variant="gradient-wipe"
                delay={0.35}
              />
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mt-3 text-base sm:text-lg">
            Available for full-time engineering roles, software internships, and high-impact MERN stack initiatives.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contacts & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card in GeometricFrame */}
            <GeometricFrame
              coordinates="MAIL_PORTAL"
              glowColor="#00E5FF"
              className="p-6 sm:p-7"
            >
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
                <span className="text-[#00E5FF]">&rarr;</span> Direct Email Channel
              </span>
              <a
                href={`mailto:${emailAddress}`}
                className="font-heading font-extrabold text-lg sm:text-xl text-white hover:text-[#00E5FF] transition-colors break-all block mb-4"
              >
                {emailAddress}
              </a>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/[0.08] transition-all active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="text-[#00E5FF]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white transition-all shadow-[0_0_15px_rgba(108,99,255,0.3)] active:scale-95 group"
                >
                  <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  <span>Send Mail</span>
                </a>
              </div>
            </GeometricFrame>

            {/* Coordinates & Availability Card */}
            <GeometricFrame
              coordinates="RESPONSE_SLA"
              glowColor="#6C63FF"
              className="p-6 sm:p-7 space-y-4 font-mono text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Location</span>
                  <span className="text-white font-semibold">Bhimavaram, Andhra Pradesh, India</span>
                  <span className="text-slate-500 text-[11px] block">Open to Remote &amp; On-Site Opportunities</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[#00E5FF]">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Response Turnaround</span>
                  <span className="text-white font-semibold">Within 24 Hours</span>
                  <span className="text-slate-500 text-[11px] block">Mon – Sun (Actively Checking Inbox)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Academic Availability</span>
                  <span className="text-white font-semibold">Class of 2027 Graduate</span>
                  <span className="text-slate-500 text-[11px] block">Available for Internships &amp; Roles</span>
                </div>
              </div>
            </GeometricFrame>

            {/* Social Network Hub */}
            <GeometricFrame
              cornerCrosshairs={false}
              className="p-6"
            >
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-4 flex items-center gap-1">
                <span className="text-[#00E5FF]">&rarr;</span> Verified Social Profiles
              </span>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/varma2455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.15] transition-all flex items-center gap-2.5 text-xs font-mono text-slate-200"
                >
                  <GithubIcon size={18} />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/in/yeswanth-varma-pothuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-[#00E5FF]/10 border border-white/[0.06] hover:border-[#00E5FF]/30 transition-all flex items-center gap-2.5 text-xs font-mono text-slate-200"
                >
                  <LinkedinIcon size={18} className="text-[#00E5FF]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </GeometricFrame>

          </div>

          {/* Right Column: Interactive Contact Transmission Form (7 cols) */}
          <GeometricFrame
            coordinates="MSG_DISPATCH_CORE"
            glowColor="#00E5FF"
            className="lg:col-span-7 p-7 sm:p-9"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  Send a Direct Message
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Transmits directly via mail client protocol
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/20 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="font-heading font-bold text-xl text-white">
                  Transmission Prepared!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-mono max-w-md mx-auto leading-relaxed">
                  Your mail client has been opened with your message. If it didn't trigger, please send directly to <strong className="text-white">{emailAddress}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-xl text-xs font-mono bg-white/[0.08] hover:bg-white/[0.12] text-white cursor-pointer"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00E5FF] focus:bg-white/[0.05] text-white outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1 uppercase tracking-wider">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00E5FF] focus:bg-white/[0.05] text-white outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 uppercase tracking-wider">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    placeholder="MERN Engineering Role / Project Discussion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00E5FF] focus:bg-white/[0.05] text-white outline-none transition-all placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 uppercase tracking-wider">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your engineering role, project scope, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00E5FF] focus:bg-white/[0.05] text-white outline-none transition-all placeholder:text-slate-600 resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#6C63FF] via-[#5244E3] to-[#00E5FF] hover:opacity-95 shadow-[0_0_25px_rgba(108,99,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] active:scale-95 transition-all group cursor-pointer"
                  >
                    <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                    <span>Transmit Message Now</span>
                  </button>
                </div>

                <div className="text-[10px] text-slate-500 text-center pt-2">
                  <span>SSL / HTTPS Secured Client Transmission &bull; No third-party data tracking</span>
                </div>
              </form>
            )}
          </GeometricFrame>

        </div>

      </div>
    </section>
  );
};

export default Contact;
