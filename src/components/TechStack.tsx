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
import { GenerativeArrowEngine } from './generative/GenerativeArrowEngine';
import { KineticText } from './generative/KineticText';
import { ColorReveal } from './generative/ColorReveal';
import { GeometricFrame } from './generative/GeometricFrame';

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
  if (!context) throw new Error('useCartContext inside CartProvider');
  return context;
};`,
      responsibilities: [
        'Render dynamic UI catalogs and order workflows',
        'Execute client-side form validation before payload dispatch',
        'Maintain WebSocket listeners for real-time live chat streams',
      ],
    },
    {
      id: 'node',
      letter: 'N',
      name: 'Node.js',
      role: 'Runtime Environment & Asynchronous I/O Engine',
      color: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-400',
      icon: NodeIcon,
      tagline: 'High-concurrency non-blocking event-driven execution runtime.',
      description:
        'Node.js powers the underlying server architecture, utilizing the V8 JavaScript engine and libuv event loop to handle concurrent client connections, asynchronous disk I/O, and socket pool multiplexing with minimal memory footprint.',
      keyFeatures: [
        'Non-blocking event loop handling hundreds of simultaneous client requests',
        'Native asynchronous promise handling (async/await) without thread locking',
        'Stream processing for file payloads and HTTP responses',
        'Environment variable configuration and secure process management',
      ],
      codeHighlight: `// Asynchronous Server Initialization
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, credentials: true }
});
server.listen(PORT, () => console.log(\`Server on \${PORT}\`));`,
      responsibilities: [
        'Orchestrate the HTTP server and WebSocket listener',
        'Manage process life-cycle and environment variables',
        'Handle asynchronous I/O and non-blocking database queries',
      ],
    },
    {
      id: 'express',
      letter: 'E',
      name: 'Express.js',
      role: 'RESTful API Routing, Controllers & Middleware Gateway',
      color: '#F59E0B',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'border-amber-500/40',
      textColor: 'text-amber-400',
      icon: ExpressIcon,
      tagline: 'Structured modular endpoints with bulletproof middleware protection.',
      description:
        'Express coordinates the REST API architecture. It sanitizes incoming JSON payloads, enforces JWT authentication guards, routes requests to modular domain controllers, and captures errors in a centralized pipeline.',
      keyFeatures: [
        'Modular route decoupling (/api/auth, /api/orders, /api/products, /api/chat)',
        'Stateless JWT bearer authentication middleware and role-based checks',
        'Strict CORS configuration, request logging with Morgan, and body parsing',
        'Centralized asynchronous error-handling middleware preventing unhandled crashes',
      ],
      codeHighlight: `// Role-Verification Middleware Chain
export const verifyRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: Insufficient privileges' });
    }
    next();
  };
};`,
      responsibilities: [
        'Route HTTP GET, POST, PUT, DELETE to isolated controllers',
        'Validate incoming JSON schemas and sanitize queries',
        'Enforce authentication and role permissions before business logic',
      ],
    },
    {
      id: 'mongodb',
      letter: 'M',
      name: 'MongoDB & Mongoose',
      role: 'Document Persistence & Schema Modeling Layer',
      color: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-400',
      icon: MongoDbIcon,
      tagline: 'Flexible JSON-like document persistence with indexed queries and relationships.',
      description:
        'MongoDB Atlas stores persistent domain entities in flexible BSON documents. Mongoose models enforce schema validation, pre-save encryption hooks for Bcrypt passwords, and indexed query execution for sub-10ms lookup times.',
      keyFeatures: [
        'Document schema modeling with strict type constraints via Mongoose ODM',
        'Compound indexing on frequently filtered fields (e.g., category, status, user ID)',
        'Pre-save lifecycle hooks for password hashing prior to disk write',
        'Relational population and aggregation pipelines for order summaries and audit logs',
      ],
      codeHighlight: `// Mongoose Schema with Indexed Querying
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: [{ item: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }, quantity: Number }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['Placed', 'Preparing', 'OutForDelivery', 'Delivered'], default: 'Placed' }
}, { timestamps: true });`,
      responsibilities: [
        'Persist user credentials, product catalogs, and transaction records',
        'Execute atomic mutations during cart checkouts and order transitions',
        'Provide durable historical logs for real-time chat messages',
      ],
    },
    {
      id: 'socketio',
      letter: 'S',
      name: 'Socket.io',
      role: 'Real-Time Bidirectional Event Streaming',
      color: '#A855F7',
      bgGlow: 'rgba(168, 85, 247, 0.15)',
      borderColor: 'border-purple-500/40',
      textColor: 'text-purple-400',
      icon: Code2,
      tagline: 'Sub-100ms bidirectional event transport for instant multi-user messaging.',
      description:
        'Socket.io establishes persistent, low-latency WebSocket connections between clients and the Node server, powering live chat rooms, typing indicators, active presence detection, and instant push events.',
      keyFeatures: [
        'WebSocket transport with seamless HTTP long-polling fallback',
        'Handshake authentication with JWT verification prior to socket connection',
        'Room-based broadcasting for isolated one-to-one and multi-user chat channels',
        'Automatic reconnection, heartbeat ping/pong, and disconnect cleanup routines',
      ],
      codeHighlight: `// Real-Time Room Emission
socket.on('send_message', async ({ roomId, message, senderId }) => {
  const savedMsg = await Message.create({ roomId, sender: senderId, text: message });
  io.to(roomId).emit('receive_message', savedMsg);
});`,
      responsibilities: [
        'Broadcast low-latency messages without polling overhead',
        'Emit live typing notifications and active online presence updates',
        'Isolate conversations into secure socket rooms',
      ],
    },
  ];

  const activeTier = tiers.find((t) => t.id === activeTierId) || tiers[0];
  const ActiveIcon = activeTier.icon;

  return (
    <section id="tech-stack" className="relative py-28 bg-[#05060A] overflow-hidden">
      {/* Background Subtle Cyber Glow */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/3 right-10 w-[500px] h-[500px] bg-[#00E5FF]/08" />
      <div className="ambient-light-orb bottom-10 left-10 w-[450px] h-[450px] bg-[#6C63FF]/10" />

      {/* GENERATIVE ARROW ENGINE: Living Technical Network */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-75">
        <GenerativeArrowEngine
          id="tech-network-engine"
          preset="tech"
          seed={5912}
          arrowCount={9}
          viewBox="0 0 1200 700"
          colorPalette={['#00E5FF', '#10B981', '#F59E0B', '#A855F7']}
          triggerOnScroll={true}
          scrollTriggerStart="top 75%"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#00E5FF] mb-3">
            <Cpu size={13} />
            <span>02 // ARCHITECTURAL TOOLKIT</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            <KineticText
              text="Interactive MERN"
              variant="letter-reveal"
              delay={0.1}
              className="mr-2"
            />
            <span className="text-gradient-cyan-blue">
              <KineticText
                text="Technology Stack"
                variant="gradient-wipe"
                delay={0.35}
              />
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mt-3 text-base sm:text-lg">
            A cohesive full-stack architecture engineered from client state to database persistence. Click each tier to inspect its implementation.
          </p>
        </div>

        {/* M-E-R-N Tier Selector Cards Connected with Dynamic Focus */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10 relative">
          {tiers.map((tier) => {
            const isSelected = tier.id === activeTierId;
            const Icon = tier.icon;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setActiveTierId(tier.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'glass-panel border-2 ' + tier.borderColor + ' shadow-[0_0_25px_' + tier.bgGlow + ']'
                    : 'glass-panel border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.03]'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: tier.color }}
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-extrabold text-lg transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: isSelected ? tier.bgGlow : 'rgba(255, 255, 255, 0.04)',
                      color: tier.color,
                      border: `1px solid ${isSelected ? tier.color : 'rgba(255, 255, 255, 0.1)'}`,
                    }}
                  >
                    {tier.letter}
                  </div>
                  <Icon size={20} className={isSelected ? tier.textColor : 'text-slate-400'} />
                </div>

                <h3 className="font-heading font-bold text-base text-white mb-0.5">
                  {tier.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 block truncate">
                  {tier.role.split('&')[0]}
                </span>

                {/* Connecting arrow indicator on active */}
                {isSelected && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-mono" style={{ color: tier.color }}>
                    <span>&darr; ACTIVE TIER</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Tier Breakdown Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Details Panel (7 cols) */}
          <GeometricFrame
            coordinates={`TIER_${activeTier.letter}`}
            glowColor={activeTier.color}
            className="lg:col-span-7 p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-heading font-extrabold text-2xl"
                  style={{
                    backgroundColor: activeTier.bgGlow,
                    color: activeTier.color,
                    border: `1px solid ${activeTier.color}`,
                  }}
                >
                  {activeTier.letter}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    {activeTier.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {activeTier.role}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300">
                <Sparkles size={13} className={activeTier.textColor} />
                <span>Tier Architecture</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              {activeTier.description}
            </p>

            {/* Core Capabilities */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <span className="text-[#00E5FF]">&rarr;</span> Architectural Capabilities
              </h4>
              <div className="space-y-2.5">
                {activeTier.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-colors"
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: activeTier.color }}
                    />
                    <span className="text-xs text-slate-300 font-mono leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Responsibilities */}
            <div className="pt-4 border-t border-white/[0.08]">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                Core System Responsibilities
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-mono">
                {activeTier.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ArrowRight size={13} className={activeTier.textColor} />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GeometricFrame>

          {/* Right Code Blueprint & Data Flow (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Code Snippet Blueprint with ColorReveal */}
            <ColorReveal
              direction="diagonal"
              gradientType="blue-cyan"
              className="rounded-2xl"
            >
              <div className="rounded-2xl bg-[#080B12] border border-white/[0.1] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-[#05060A] border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[11px] font-mono text-slate-400 ml-2">
                      {activeTier.id}.architecture.ts
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    VERIFIED IMPLEMENTATION
                  </span>
                </div>
                <pre className="p-4 sm:p-5 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed bg-[#05060A]/90">
                  <code>{activeTier.codeHighlight}</code>
                </pre>
              </div>
            </ColorReveal>

            {/* End-to-End Data Flow Blueprint */}
            <GeometricFrame
              coordinates="DATA_FLOW_MERN"
              glowColor="#00E5FF"
              className="p-6"
            >
              <h4 className="font-heading font-bold text-sm text-white mb-4 flex items-center gap-2">
                <Repeat size={16} className="text-[#00E5FF]" />
                <span>Full-Stack Data Flow Lifecycle</span>
              </h4>

              <div className="relative pl-6 space-y-4 border-l-2 border-white/[0.08] font-mono text-xs">
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#00E5FF] border-2 border-[#05060A]" />
                  <span className="text-white font-semibold block">1. Client Interaction (React)</span>
                  <span className="text-slate-400 text-[11px]">User triggers cart mutation or dispatches chat message via custom hook.</span>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-[#05060A]" />
                  <span className="text-white font-semibold block">2. REST / Socket Gateway (Express &amp; Socket.io)</span>
                  <span className="text-slate-400 text-[11px]">Request arrives at server; JWT middleware validates claims; route controller handles logic.</span>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-[#05060A]" />
                  <span className="text-white font-semibold block">3. Execution &amp; Persistence (Node &amp; MongoDB)</span>
                  <span className="text-slate-400 text-[11px]">Mongoose executes indexed queries, writes audit records, and broadcasts event to peers.</span>
                </div>
              </div>
            </GeometricFrame>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TechStack;
