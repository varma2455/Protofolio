import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Trophy 
} from 'lucide-react';
import { educationData, certificationsData } from '../data/education';
import { 
  ConstructedSection, 
  ConstructedContainer, 
  ConstructedCard, 
  ConstructedIcon, 
  ConstructedHeading, 
  ConstructedDescription, 
  ConstructedBadge 
} from './construction';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-28 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 left-10 w-[450px] h-[450px] bg-[#D6B36A]/05" />
      <div className="ambient-light-orb bottom-10 right-10 w-[400px] h-[400px] bg-[#B99555]/04" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LEVEL 0: Outer Section Container */}
        <ConstructedSection
          id="education"
          accentColor="#D6B36A"
          borderRadius={24}
          frameTitle="SYS://ACADEMIC_RECORD_VERIFIED"
          className="p-6 sm:p-10 border border-[rgba(214,179,106,0.20)] bg-[#14120F]/60 backdrop-blur-sm"
        >
          {/* Section Header */}
          <div className="mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#D6B36A] mb-3">
              <GraduationCap size={13} />
              <span>06 // ACADEMIC RECORD</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E6] tracking-tight">
              Education &amp; <span className="text-gradient-gold">Credentials</span>
            </h2>
            <p className="mt-3 text-[#B9B2A5] text-sm sm:text-base font-sans">
              Formal computer science education and verified academic achievements at SRKR Engineering College.
            </p>
          </div>

          {/* LEVEL 1: Education Cards Grid */}
          <ConstructedContainer id="education-cards" className="space-y-8 mb-10">
            {educationData.map((edu, idx) => {
              const borderColors = ['#D6B36A', '#B99555', '#E5C98A'];
              const accent = borderColors[idx % borderColors.length];

              return (
                <ConstructedCard
                  key={idx}
                  id={`edu-card-${idx}`}
                  accentColor={accent}
                  borderRadius={20}
                  className="p-6 sm:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-[rgba(214,179,106,0.20)] mb-6">
                    <div className="flex items-start gap-4">
                      {/* LEVEL 2: Icon */}
                      <ConstructedIcon
                        id={`edu-icon-${idx}`}
                        icon={GraduationCap}
                        color={accent}
                        containerSize={44}
                      />
                      <div>
                        <span className="text-xs font-mono text-[#D6B36A] uppercase tracking-wider block mb-1">
                          {edu.degree}
                        </span>
                        {/* LEVEL 2: Heading */}
                        <ConstructedHeading
                          id={`edu-head-${idx}`}
                          as="h3"
                          accentColor={accent}
                          className="text-xl sm:text-2xl text-[#F5F0E6] mb-1"
                        >
                          {edu.institution}
                        </ConstructedHeading>
                        <div className="flex items-center gap-2 font-mono text-xs text-[#B9B2A5]">
                          <MapPin size={13} className="text-[#B99555]" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-1.5 shrink-0">
                      <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#F5F0E6]">
                        <Calendar size={13} className="text-[#D6B36A]" />
                        <span>{edu.duration}</span>
                      </div>
                      <span className="px-3 py-1 rounded-md bg-[#D6B36A]/10 text-[#D6B36A] font-mono text-xs font-bold border border-[#D6B36A]/30">
                        {edu.scoreType}: {edu.score}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#B9B2A5] uppercase tracking-widest block mb-2">
                      Academic Focus &amp; Core Subjects:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {edu.focus.map((f, fIdx) => (
                        <ConstructedBadge
                          key={fIdx}
                          id={`edu-badge-${idx}-${fIdx}`}
                          color={accent}
                        >
                          <CheckCircle2 size={13} className="mr-1.5 text-[#D6B36A]" />
                          {f}
                        </ConstructedBadge>
                      ))}
                    </div>
                  </div>
                </ConstructedCard>
              );
            })}
          </ConstructedContainer>

          {/* LEVEL 1: Certifications Card */}
          <ConstructedCard
            id="edu-card-certs"
            accentColor="#D6B36A"
            borderRadius={20}
            className="p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-[rgba(214,179,106,0.20)] mb-6">
              <ConstructedIcon
                id="edu-cert-trophy"
                icon={Trophy}
                color="#D6B36A"
                containerSize={38}
              />
              <span className="font-mono text-xs text-[#D6B36A] font-semibold tracking-wider">
                VERIFIED PROFESSIONAL CERTIFICATIONS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certificationsData.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="p-4 rounded-xl bg-[#211D17] border border-[rgba(214,179,106,0.20)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D6B36A]/10 text-[#D6B36A] border border-[#D6B36A]/30">
                        {cert.badge}
                      </span>
                    </div>
                    <ConstructedHeading
                      id={`cert-head-${cIdx}`}
                      as="h4"
                      accentColor="#D6B36A"
                      className="text-sm text-[#F5F0E6] mb-1"
                    >
                      {cert.title}
                    </ConstructedHeading>
                    <span className="text-xs font-mono text-[#B9B2A5] block mb-2">{cert.issuer}</span>
                    <ConstructedDescription
                      id={`cert-desc-${cIdx}`}
                      accentColor="#B99555"
                      className="text-xs text-[#B9B2A5]"
                    >
                      {cert.description}
                    </ConstructedDescription>
                  </div>
                </div>
              ))}
            </div>
          </ConstructedCard>

        </ConstructedSection>
      </div>
    </section>
  );
};

export default Education;
