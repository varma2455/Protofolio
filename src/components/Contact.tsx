import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { triggerConfetti } from '../utils/confetti';
import { 
  ConstructedSection, 
  ConstructedContainer, 
  ConstructedCard, 
  ConstructedIcon, 
  ConstructedHeading, 
  ConstructedDescription, 
  ConstructedBadge, 
  ConstructedButton 
} from './construction';

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

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/4 left-10 w-[500px] h-[500px] bg-[#D6B36A]/05" />
      <div className="ambient-light-orb bottom-10 right-10 w-[450px] h-[450px] bg-[#B99555]/04" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LEVEL 0: Outer Section Container */}
        <ConstructedSection
          id="contact"
          accentColor="#D6B36A"
          borderRadius={24}
          frameTitle="SYS://TRANSMISSION_TERMINAL_08"
          className="p-6 sm:p-10 border border-[rgba(214,179,106,0.20)] bg-[#14120F]/60 backdrop-blur-sm"
        >
          {/* Section Header */}
          <div className="mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#D6B36A] mb-3">
              <Mail size={13} />
              <span>08 // TRANSMISSION TERMINAL</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E6] tracking-tight">
              Initiate Direct <span className="text-gradient-gold">Transmission</span>
            </h2>
            <p className="mt-3 text-[#B9B2A5] text-sm sm:text-base font-sans">
              Available for Software Engineering roles, MERN Stack opportunities, and high-impact technical collaborations.
            </p>
          </div>

          {/* LEVEL 1: Inner Cards Grid */}
          <ConstructedContainer id="contact-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* CARD 1: Direct Information */}
            <div className="lg:col-span-5">
              <ConstructedCard
                id="contact-card-info"
                accentColor="#D6B36A"
                borderRadius={20}
                className="p-6 sm:p-8 space-y-6"
              >
                <div>
                  {/* LEVEL 2: Icon & Heading */}
                  <div className="flex items-center gap-3 mb-2">
                    <ConstructedIcon
                      id="contact-icon-mail"
                      icon={Mail}
                      color="#D6B36A"
                      containerSize={40}
                    />
                    <ConstructedHeading
                      id="contact-head-direct"
                      as="h3"
                      accentColor="#D6B36A"
                      className="text-xl text-[#F5F0E6]"
                    >
                      Direct Channels
                    </ConstructedHeading>
                  </div>

                  <ConstructedDescription
                    id="contact-desc-direct"
                    accentColor="#B99555"
                    className="text-sm text-[#B9B2A5] font-sans"
                  >
                    Reach out via direct email, LinkedIn, or send a transmission through the portal.
                  </ConstructedDescription>
                </div>

                {/* Email Box */}
                <div className="p-4 rounded-xl bg-[#14120F] border border-[rgba(214,179,106,0.20)] flex items-center justify-between gap-3">
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-[#B9B2A5] uppercase block">Verified Email</span>
                    <span className="text-xs font-mono text-[#F5F0E6] truncate block">{emailAddress}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-[#211D17] hover:bg-[#28241e] text-[#B9B2A5] hover:text-[#F5F0E6] border border-[rgba(214,179,106,0.20)] transition-colors cursor-pointer shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copied ? <Check size={16} className="text-[#D6B36A]" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Social Badges */}
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#B9B2A5] uppercase tracking-widest block">
                    Professional Networks:
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="https://github.com/varma2455"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)] hover:border-[#D6B36A]/40 transition-all flex items-center gap-3 cursor-pointer group"
                    >
                      <GithubIcon size={18} className="text-[#B9B2A5] group-hover:text-[#F5F0E6]" />
                      <div>
                        <span className="font-heading font-semibold text-xs text-[#F5F0E6] block">GitHub</span>
                        <span className="font-mono text-[10px] text-[#B9B2A5]">@varma2455</span>
                      </div>
                    </a>

                    <a
                      href="https://linkedin.com/in/yeswanth-varma-pothuri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)] hover:border-[#D6B36A]/40 transition-all flex items-center gap-3 cursor-pointer group"
                    >
                      <LinkedinIcon size={18} className="text-[#B9B2A5] group-hover:text-[#D6B36A]" />
                      <div>
                        <span className="font-heading font-semibold text-xs text-[#F5F0E6] block">LinkedIn</span>
                        <span className="font-mono text-[10px] text-[#B9B2A5]">in/yeswanth</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Telemetry info */}
                <div className="pt-4 border-t border-[rgba(214,179,106,0.20)] space-y-2 text-xs font-mono text-[#B9B2A5]">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-[#D6B36A]" />
                    <span>Andhra Pradesh, India (IST / UTC +5:30)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-[#B99555]" />
                    <span>Response Window: Sub-24 Hours</span>
                  </div>
                </div>
              </ConstructedCard>
            </div>

            {/* CARD 2: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <ConstructedCard
                id="contact-card-form"
                accentColor="#D6B36A"
                borderRadius={20}
                className="p-6 sm:p-8"
              >
                {submitted ? (
                  <div className="text-center py-12 space-y-4 font-mono">
                    <div className="w-16 h-16 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-[#D6B36A] flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} />
                    </div>
                    <ConstructedHeading
                      id="contact-submit-head"
                      as="h4"
                      accentColor="#D6B36A"
                      className="text-xl text-[#F5F0E6] font-bold"
                    >
                      Transmission Prepared
                    </ConstructedHeading>
                    <p className="text-[#B9B2A5] text-xs max-w-sm mx-auto font-sans">
                      Your message payload has been formatted. If your default mail client did not open automatically, reach out directly to{' '}
                      <span className="text-[#D6B36A] font-mono">{emailAddress}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-lg bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-[#F5F0E6] text-xs hover:bg-[#28241e] transition-colors cursor-pointer"
                    >
                      Send Another Transmission
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-[#B9B2A5] uppercase tracking-wider mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jane Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#14120F] border border-[rgba(214,179,106,0.20)] text-[#F5F0E6] placeholder-[#8C8275] text-sm focus:outline-none focus:border-[#D6B36A]/60 transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-[#B9B2A5] uppercase tracking-wider mb-1.5">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane@organization.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#14120F] border border-[rgba(214,179,106,0.20)] text-[#F5F0E6] placeholder-[#8C8275] text-sm focus:outline-none focus:border-[#D6B36A]/60 transition-colors font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#B9B2A5] uppercase tracking-wider mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. MERN Full-Stack Opportunity / Collaboration"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#14120F] border border-[rgba(214,179,106,0.20)] text-[#F5F0E6] placeholder-[#8C8275] text-sm focus:outline-none focus:border-[#D6B36A]/60 transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#B9B2A5] uppercase tracking-wider mb-1.5">
                        Message Payload *
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Detail your requirements, project architecture, or interview availability..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#14120F] border border-[rgba(214,179,106,0.20)] text-[#F5F0E6] placeholder-[#8C8275] text-sm focus:outline-none focus:border-[#D6B36A]/60 transition-colors font-sans resize-none"
                      />
                    </div>

                    <ConstructedButton
                      id="contact-btn-submit"
                      type="submit"
                      accentColor="#D6B36A"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B99555] text-[#0C0B09] font-heading font-bold text-sm hover:brightness-110 shadow-md shadow-[#D6B36A]/20 gap-2 cursor-pointer"
                    >
                      <Send size={16} />
                      <span>Dispatch Transmission</span>
                    </ConstructedButton>
                  </form>
                )}
              </ConstructedCard>
            </div>

          </ConstructedContainer>

        </ConstructedSection>
      </div>
    </section>
  );
};

export default Contact;
