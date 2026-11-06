import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  Server, 
  Terminal, 
  Code2, 
  ArrowRight, 
  Cpu, 
  Sparkles,
  Repeat
} from 'lucide-react';
import { MongoDbIcon, ExpressIcon, ReactIcon, NodeIcon } from './Icons';
import { ContentConstructionRegion } from './construction/ContentConstructionRegion';
import { SectionRevealTimeline } from './construction/SectionRevealTimeline';

interface StackTier {
  id: string;
  letter: string;
  name: string;
  role: string;
  color: string;
  bgGlow: string;
  borderColor: string;
  textColor: string;
  icon: React.FC<{ size?: number; className?: string }>;
  tagline: string;
  description: string;
  keyFeatures: string[];
  codeHighlight: string;
  responsibilities: string[];
}

export const TechStack: React.FC = () => {
  const [activeTierId, setActiveTierId] = useState<string>('react');

  const tiers: StackTier[] = [
    {
      id: 'react',
      letter: 'R',
      name: 'React.js',
      role: 'Client Presentation & Interactive State Layer',
      color: '#00E5FF',
      bgGlow: 'rgba(0, 229, 255, 0.15)',
      borderColor: 'border-[#00E5FF]/40',
      textColor: 'text-[#00E5FF]',
      icon: ReactIcon,
      tagline: 'Component-driven reactive user interfaces with sub-second rendering.',
      description:
        'React serves as the front-of-house orchestration engine. Through custom hooks, Context API state management, and reusable component hierarchies, it transforms asynchronous REST and WebSocket payloads into fluid, accessible user experiences.',
      keyFeatures: [
        'Single Page Application (SPA) routing with dynamic segment guards',
        'State persistence across browser refreshes via Context API and Storage APIs',
        'Custom hooks for throttled real-time search, cart mutations, and socket listeners',
        'Virtual DOM reconciliation optimized with React.memo and useMemo',
      ],
      codeHighlight: `// Contextual Cart & Auth Hook
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('CartContext must be within Provider');
  return context;
};`,
      responsibilities: [
        'Declarative UI state mapping',
        'Client-side input sanitation',
        'Real-time WebSocket event listeners',
      ],
    },
    {
      id: 'node',
      letter: 'N',
      name: 'Node.js',
      role: 'Asynchronous Event-Driven Runtime',
      color: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-400',
      icon: NodeIcon,
      tagline: 'High-throughput non-blocking I/O event loops powering concurrency.',
      description:
        'The foundational JavaScript engine running V8 on the server. Handles thousands of concurrent TCP sockets, processes file payloads, and schedules asynchronous background tasks without thread-locking bottlenecks.',
      keyFeatures: [
        'Non-blocking event-driven concurrency for I/O bound web services',
        'Cluster module scalability for multi-core hardware saturation',
        'Stream-based memory management for large file serialization',
        'Native asynchronous error handling and graceful shutdown hooks',
      ],
      codeHighlight: `// Socket.io Runtime Server Instance
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
  pingTimeout: 60000,
});`,
      responsibilities: [
        'TCP & WebSocket lifecycle management',
        'Environment config orchestration',
        'Stream processing & Buffer pipelines',
      ],
    },
    {
      id: 'express',
      letter: 'E',
      name: 'Express.js',
      role: 'Decoupled Middleware & REST Routing Layer',
      color: '#F59E0B',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'border-amber-500/40',
      textColor: 'text-amber-400',
      icon: ExpressIcon,
      tagline: 'Minimalist robust HTTP server pipeline with custom middleware chains.',
      description:
        'Express orchestrates request-response cycles. Acts as the traffic director verifying tokens, validating payload schemas, formatting errors into standardized responses, and forwarding clean parameters to service logic.',
      keyFeatures: [
        'Modular route segmenting with Express Router and nested endpoints',
        'JWT bearer authorization middleware verifying cryptographically signed tokens',
        'Rate limiting guards (express-rate-limit) and Helmet security headers',
        'Standardized error interceptor forwarding unified JSON exceptions',
      ],
      codeHighlight: `// Bearer Token Validation Middleware
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};`,
      responsibilities: [
        'CORS policy configuration',
        'Route parameter validation',
        'Authentication and Role guards',
      ],
    },
    {
      id: 'mongo',
      letter: 'M',
      name: 'MongoDB',
      role: 'Flexible Document Database & Aggregation Engine',
      color: '#34D399',
      bgGlow: 'rgba(52, 211, 153, 0.15)',
      borderColor: 'border-emerald-400/40',
      textColor: 'text-emerald-400',
      icon: MongoDbIcon,
      tagline: 'Schema-rich NoSQL persistence engineered for rapid hierarchical JSON.',
      description:
        'MongoDB stores application states as flexible BSON documents. Leveraging Mongoose schemas for validation, compound indexes for querying sub-10ms results, and aggregation pipelines for multi-stage analytics.',
      keyFeatures: [
        'Complex multi-stage aggregation pipelines for analytics and order totals',
        'Compound indexing strategies ensuring indexed index scans',
        'Referenced models with Mongoose .populate() for relationship integrity',
        'Atlas cloud clustering with automated geo-redundant backups',
      ],
      codeHighlight: `// Mongoose Schema with Pre-Save Encryption
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});`,
      responsibilities: [
        'Document schema validation',
        'Data indexing & query optimization',
        'ACID transactions across multi-documents',
      ],
    },
  ];

  const activeTier = tiers.find((t) => t.id === activeTierId) || tiers[0];
  const regionSequence = ['tech-header', 'tech-tabs', 'tech-active-card', 'tech-flow'];

  return (
    <section id="tech-stack" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/4 right-0 w-[500px] h-[500px] bg-[#00E5FF]/08" />
      <div className="ambient-light-orb bottom-10 left-10 w-[450px] h-[450px] bg-[#6C63FF]/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionRevealTimeline sectionId="tech-stack" regionIds={regionSequence}>
          
          {/* 1. Section Header */}
          <ContentConstructionRegion
            id="tech-header"
            shape="chamfer"
            borderRadius={12}
            accentColor="#00E5FF"
            priority={1}
            className="mb-14 max-w-2xl"
          >
            <div className="p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
                <Layers size={13} />
                <span>SECTION 02 // ARCHITECTURE MATRIX</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                The <span className="text-gradient-cyan-blue">MERN Stack</span> Ecosystem
              </h2>
              <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
                Each layer operates with a dedicated responsibility, linked by type-safe contracts and JSON serialization.
              </p>
            </div>
          </ContentConstructionRegion>

          {/* 2. Four Layer Selection Tabs */}
          <ContentConstructionRegion
            id="tech-tabs"
            shape="rounded"
            borderRadius={16}
            accentColor="#6C63FF"
            priority={2}
            className="mb-8 w-full"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                const isActive = tier.id === activeTierId;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setActiveTierId(tier.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? `bg-white/[0.08] ${tier.borderColor} shadow-lg shadow-black/40`
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-heading font-black text-sm ${
                        isActive
                          ? 'bg-gradient-to-br from-white/20 to-white/05 text-white'
                          : 'bg-white/[0.04] text-slate-400'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className={`block font-heading font-bold text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {tier.name}
                      </span>
                      <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {tier.letter} // TIER
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </ContentConstructionRegion>

          {/* 3. Detailed Active Tier Card */}
          <ContentConstructionRegion
            id="tech-active-card"
            shape="rounded"
            borderRadius={20}
            accentColor={activeTier.color}
            priority={3}
            className="w-full mb-8"
          >
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-extrabold text-lg text-white"
                      style={{ backgroundColor: activeTier.color }}
                    >
                      {activeTier.letter}
                    </span>
                    <div>
                      <h3 className="font-heading font-extrabold text-2xl text-white">
                        {activeTier.name}
                      </h3>
                      <p className="font-mono text-xs text-slate-400">
                        {activeTier.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    {activeTier.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      Architectural Capabilities:
                    </span>
                    <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-slate-300">
                      {activeTier.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#00E5FF] font-mono mt-0.5">&bull;</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Code Highlight */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                  <div className="rounded-xl bg-[#090D16] border border-white/[0.08] p-4 font-mono text-xs overflow-x-auto text-slate-300 shadow-xl">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.06] text-[10px] text-slate-500">
                      <span>SYNTAX HIGHLIGHT // CODE BASE</span>
                      <span className="text-emerald-400">ES6+ TS</span>
                    </div>
                    <pre className="text-slate-300 leading-relaxed">
                      <code>{activeTier.codeHighlight}</code>
                    </pre>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                      Primary Responsibilities:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeTier.responsibilities.map((r, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 text-[11px]"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </ContentConstructionRegion>

          {/* 4. Full-Duplex Architectural Flow Banner */}
          <ContentConstructionRegion
            id="tech-flow"
            shape="chamfer"
            borderRadius={16}
            accentColor="#10B981"
            priority={4}
            className="w-full"
          >
            <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <Repeat size={16} className="text-[#00E5FF] animate-spin" style={{ animationDuration: '6s' }} />
                <span>
                  <strong>Full-Duplex Pipeline:</strong> React Client &harr; Axios/Socket.io &harr; Express Gateway &harr; MongoDB Documents
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  JWT Secured
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  WebSocket Ready
                </span>
              </div>
            </div>
          </ContentConstructionRegion>

        </SectionRevealTimeline>
      </div>
    </section>
  );
};

export default TechStack;
