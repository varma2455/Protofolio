import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Code, 
  Server, 
  Database, 
  Cpu, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Layers,
  CheckCircle,
  Lightbulb
} from 'lucide-react';
import { profileData } from '../../data/profile';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#080A0F] dark:bg-[#080A0F] light:bg-[#F8FAFC]">
      {/* Background Decorative Pattern */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Eyebrow & Title */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/20 text-accent-violet text-xs font-mono font-medium mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>ENGINEERING PHILOSOPHY & IDENTITY</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white light:text-slate-900 tracking-tight">
            More than just writing code.
          </h2>
          <p className="text-slate-400 light:text-slate-600 font-mono text-sm mt-2 max-w-2xl">
            Designing resilient systems where frontend interfaces, API protocols, and database structures integrate cleanly.
          </p>
        </div>

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Portrait & Personal Info Panel (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Visual Portrait Card */}
            <div className="rounded-2xl bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 p-4 shadow-xl">
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-black">
                <img
                  src="/images/varma_profile.png"
                  alt="Yeswanth Varma Pothuri Portrait"
                  className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-transparent to-transparent opacity-75" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-heading font-bold text-lg">
                    {profileData.name}
                  </div>
                  <div className="text-accent-blue font-mono text-xs mt-0.5">
                    {profileData.title}
                  </div>
                </div>
              </div>

              {/* Personal Info Quick Grid */}
              <div className="mt-4 pt-4 border-t border-white/5 light:border-slate-200 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-400 light:text-slate-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-accent-blue" />
                    <span>Location</span>
                  </div>
                  <div className="text-white light:text-slate-900 font-semibold truncate">
                    Bhimavaram, India
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-400 light:text-slate-500 mb-1">
                    <GraduationCap className="w-3.5 h-3.5 text-accent-violet" />
                    <span>Education</span>
                  </div>
                  <div className="text-white light:text-slate-900 font-semibold truncate">
                    B.Tech CSE (SRKR)
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-400 light:text-slate-500 mb-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Primary Stack</span>
                  </div>
                  <div className="text-white light:text-slate-900 font-semibold">
                    MERN Ecosystem
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white/5 light:bg-slate-50 border border-white/5 light:border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-400 light:text-slate-500 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Graduation</span>
                  </div>
                  <div className="text-white light:text-slate-900 font-semibold">
                    2027 (CGPA: 6.99)
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate Quote Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 border border-accent-blue/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                <p className="text-xs font-mono text-slate-300 light:text-slate-700 leading-relaxed italic">
                  "{profileData.tagline}"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Professional Narrative & Philosophy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Editorial Bio Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-slate-300 light:text-slate-600 leading-relaxed">
              <p>
                I am a full-stack web developer passionate about engineering reliable software systems from the database layer to user interactions. Currently pursuing my Bachelor of Technology in Computer Science and Engineering at <strong className="text-white light:text-slate-900 font-semibold">SRKR Engineering College, Bhimavaram (2023–2027)</strong>, my work centers entirely on the <strong className="text-accent-blue font-semibold">MERN Stack (MongoDB, Express.js, React.js, and Node.js)</strong>.
              </p>

              <p>
                My development experience is rooted in hands-on application engineering. From building an end-to-end multi-role food ordering platform with customer, restaurant admin, and delivery driver workflows to architecting high-performance e-commerce shopping systems and real-time Socket.io chat platforms, I focus on solving concrete engineering challenges: secure stateless JWT authentication, role-based authorization guards, lean query projection, and responsive UI performance.
              </p>

              <p>
                Through internships at <strong className="text-white light:text-slate-900 font-semibold">Blackbucks Engineers</strong> and <strong className="text-white light:text-slate-900 font-semibold">1Stop.ai</strong>, I have collaborated in agile workflows, constructed RESTful API routes, designed normalized MongoDB schemas, and practiced disciplined version control with Git and GitHub.
              </p>
            </div>

            {/* Development Philosophy Cards */}
            <div className="pt-4 border-t border-white/10 light:border-slate-200">
              <h3 className="font-heading font-bold text-xl text-white light:text-slate-900 mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-accent-blue" />
                <span>Development Principles</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileData.philosophy.map((item, index) => {
                  const [title, desc] = item.split(': ');
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-[#10141D] light:bg-white border border-white/5 light:border-slate-200 hover:border-accent-blue/30 transition-all editorial-card"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <CheckCircle className="w-4 h-4 text-accent-blue shrink-0" />
                        <h4 className="font-heading font-semibold text-sm text-white light:text-slate-900">
                          {title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 light:text-slate-600 font-sans leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Architecture Focus Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 light:bg-slate-100 border border-white/5 light:border-slate-200 text-center">
                <Server className="w-5 h-5 text-accent-blue mx-auto mb-1" />
                <div className="font-heading font-semibold text-xs text-white light:text-slate-900">REST APIs</div>
                <div className="text-[10px] font-mono text-slate-400">Node & Express</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 light:bg-slate-100 border border-white/5 light:border-slate-200 text-center">
                <Database className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <div className="font-heading font-semibold text-xs text-white light:text-slate-900">Data Modeling</div>
                <div className="text-[10px] font-mono text-slate-400">MongoDB & ODM</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 light:bg-slate-100 border border-white/5 light:border-slate-200 text-center">
                <Cpu className="w-5 h-5 text-accent-violet mx-auto mb-1" />
                <div className="font-heading font-semibold text-xs text-white light:text-slate-900">Real-Time</div>
                <div className="text-[10px] font-mono text-slate-400">Socket.io Events</div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
