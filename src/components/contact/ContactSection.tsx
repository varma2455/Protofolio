import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Send, 
  Copy, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '../../data/profile';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-spam trap
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject line is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide message details';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Spam Honeypot Check
    if (formData.honeypot) {
      console.warn('Spam bot detected via honeypot');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // In production, integrate Formspree or custom Node/Express endpoint
      // Simulate realistic API transport with fallback mailto
      await new Promise((resolve) => setTimeout(resolve, 900));

      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch {
        // safe fallback
      }

      // Prepare mailto link as reliable secondary delivery backup
      const mailtoLink = `mailto:${profileData.contact.email}?subject=${encodeURIComponent(
        `[VARMA.DEV Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      
      // Allow user to also send via default email client if desired
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1500);

    } catch (err: any) {
      setSubmitError('Unable to send transmission. Please email directly at yeswanthvarma684280@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#080A0F] dark:bg-[#080A0F] light:bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-mono font-medium mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT & COLLABORATE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white light:text-slate-900 tracking-tight">
            Have something interesting to build?
          </h2>
          <p className="text-slate-400 light:text-slate-600 font-mono text-sm mt-2 max-w-2xl">
            I'm open to connecting with developers, engineering teams and organizations working on meaningful digital products.
          </p>
        </div>

        {/* Contact Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels & Information (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contact Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 shadow-xl">
              <h3 className="font-heading font-bold text-xl text-white light:text-slate-900 mb-2">
                Direct Communication
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-600 font-sans mb-6">
                Feel free to reach out directly via email, phone, or professional networks.
              </p>

              {/* Email Block with Copy Button */}
              <div className="p-4 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200 mb-4">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">
                  Primary Email
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${profileData.contact.email}`}
                    className="font-mono text-xs sm:text-sm text-accent-blue font-semibold hover:underline truncate"
                  >
                    {profileData.contact.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 light:bg-slate-200 text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Phone Block */}
              <div className="p-4 rounded-xl bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200 mb-4">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">
                  Phone (India)
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent-violet shrink-0" />
                  <a
                    href={`tel:${profileData.contact.phone}`}
                    className="font-mono text-xs sm:text-sm text-white light:text-slate-900 hover:text-accent-blue transition-colors font-medium"
                  >
                    {profileData.contact.phone}
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/5 light:border-slate-200 grid grid-cols-2 gap-3">
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-50 light:hover:bg-slate-100 border border-white/5 light:border-slate-200 flex items-center justify-between text-xs font-mono text-slate-300 light:text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>

                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 light:bg-slate-50 light:hover:bg-slate-100 border border-white/5 light:border-slate-200 flex items-center justify-between text-xs font-mono text-slate-300 light:text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-accent-blue" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Atmospheric Telemetry & Availability Notice Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#10141D] to-[#0A0D15] border border-white/10 text-xs font-mono shadow-xl relative overflow-hidden">
              {/* Radar Sweep Effect */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Direct Uplink Active</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  IST (UTC +5:30)
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span className="text-slate-500">Coordinates:</span>
                  <span className="text-slate-300">16.5449° N, 81.5212° E (AP)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Primary Hub:</span>
                  <span className="text-accent-blue font-semibold">SRKR Engineering College</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Security Layer:</span>
                  <span className="text-accent-violet">TLS 1.3 End-to-End Handshake</span>
                </div>
              </div>

              <p className="text-slate-400 light:text-slate-600 font-sans mt-3 pt-2 border-t border-white/5 leading-relaxed text-xs">
                Currently available for Full-Stack MERN Developer and Web Engineering opportunities.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 shadow-xl">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center text-center font-mono"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-white light:text-slate-900 mb-2">
                      Transmission Dispatched
                    </h3>
                    <p className="text-xs text-slate-400 light:text-slate-600 max-w-md mb-6 leading-relaxed">
                      Thank you, <strong className="text-white light:text-slate-900">{formData.name}</strong>. Your message details have been validated. Opening direct email client dispatch as well.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-mono transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Honeypot anti-spam (hidden) */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono text-slate-400 light:text-slate-600 uppercase mb-2">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Satya Nadella"
                          className={`w-full px-4 py-3 rounded-xl bg-[#080A0F] light:bg-slate-50 border text-xs sm:text-sm text-white light:text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition-all ${
                            errors.name ? 'border-rose-500' : 'border-white/10 light:border-slate-300'
                          }`}
                        />
                        {errors.name && (
                          <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono text-slate-400 light:text-slate-600 uppercase mb-2">
                          Your Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 rounded-xl bg-[#080A0F] light:bg-slate-50 border text-xs sm:text-sm text-white light:text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition-all ${
                            errors.email ? 'border-rose-500' : 'border-white/10 light:border-slate-300'
                          }`}
                        />
                        {errors.email && (
                          <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 light:text-slate-600 uppercase mb-2">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project Discussion / Engineering Role Opportunity"
                        className={`w-full px-4 py-3 rounded-xl bg-[#080A0F] light:bg-slate-50 border text-xs sm:text-sm text-white light:text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition-all ${
                          errors.subject ? 'border-rose-500' : 'border-white/10 light:border-slate-300'
                        }`}
                      />
                      {errors.subject && (
                        <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 light:text-slate-600 uppercase mb-2">
                        Message Details <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your product requirements, engineering challenges, or available technical role..."
                        className={`w-full px-4 py-3 rounded-xl bg-[#080A0F] light:bg-slate-50 border text-xs sm:text-sm text-white light:text-slate-900 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition-all resize-none ${
                          errors.message ? 'border-rose-500' : 'border-white/10 light:border-slate-300'
                        }`}
                      />
                      {errors.message && (
                        <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {submitError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent-blue hover:bg-accent-blueHover text-white text-xs sm:text-sm font-mono font-semibold shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/35 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Transmitting Payload...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Dispatch Transmission</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
