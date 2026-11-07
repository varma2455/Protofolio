import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  Server, 
  Terminal, 
  ArrowRight 
} from 'lucide-react';
import { MongoDbIcon, ExpressIcon, ReactIcon, NodeIcon } from './Icons';
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

interface StackTier {
  id: string;
  letter: string;
  name: string;
  role: string;
  color: string;
  borderColor: string;
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
      color: '#D6B36A',
      borderColor: 'border-[#D6B36A]/40',
      icon: ReactIcon,
      tagline: 'Component-driven reactive user interfaces with sub-second rendering.',
      description:
        'React serves as the front-of-house orchestration engine. Through custom hooks, Context API state management, and reusable component hierarchies, it transforms asynchronous REST and WebSocket payloads into fluid, accessible user experiences.',
      keyFeatures: [
        'Single Page Application (SPA) routing with dynamic segment guards',
        'State persistence across browser refreshes via Context API and Storage APIs',
        'Custom hooks for throttled real-time search, cart mutations, and socket listeners',
      ],
      codeHighlight: `// Contextual Cart & Auth Hook
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('CartContext must be within Provider');
  return context;
};`,
      responsibilities: ['Declarative UI state mapping', 'Client-side input sanitation', 'Real-time WebSocket event listeners'],
    },
    {
      id: 'node',
      letter: 'N',
      name: 'Node.js',
      role: 'Asynchronous Event-Driven Runtime',
      color: '#B99555',
      borderColor: 'border-[#B99555]/40',
      icon: NodeIcon,
      tagline: 'High-throughput non-blocking I/O event loops powering concurrency.',
      description:
        'The foundational JavaScript engine running V8 on the server. Handles thousands of concurrent TCP sockets, processes file payloads, and schedules asynchronous background tasks without thread-locking bottlenecks.',
      keyFeatures: [
        'Non-blocking event-driven concurrency for I/O bound web services',
        'Cluster module scalability for multi-core hardware saturation',
        'Stream-based memory management for large file serialization',
      ],
      codeHighlight: `// Socket.io Runtime Server Instance
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
  pingTimeout: 60000,
});`,
      responsibilities: ['TCP & WebSocket lifecycle management', 'Environment config orchestration', 'Stream processing & Buffer pipelines'],
    },
    {
      id: 'express',
      letter: 'E',
      name: 'Express.js',
      role: 'Decoupled Middleware & REST Routing Layer',
      color: '#E5C98A',
      borderColor: 'border-[#E5C98A]/40',
      icon: ExpressIcon,
      tagline: 'Minimalist robust HTTP server pipeline with custom middleware chains.',
      description:
        'Express orchestrates request-response cycles. Acts as the traffic director verifying tokens, validating payload schemas, formatting errors into standardized responses, and forwarding clean parameters to service logic.',
      keyFeatures: [
        'Modular route segmenting with Express Router and nested endpoints',
        'JWT bearer authorization middleware verifying cryptographically signed tokens',
        'Rate limiting guards (express-rate-limit) and Helmet security headers',
      ],
      codeHighlight: `// Bearer Token Validation Middleware
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};`,
      responsibilities: ['CORS policy configuration', 'Route parameter validation', 'Authentication and Role guards'],
    },
    {
      id: 'mongo',
      letter: 'M',
      name: 'MongoDB',
      role: 'Flexible Document Database & Aggregation Engine',
      color: '#D6B36A',
      borderColor: 'border-[#D6B36A]/40',
      icon: MongoDbIcon,
      tagline: 'Schema-rich NoSQL persistence engineered for rapid hierarchical JSON.',
      description:
        'MongoDB stores application states as flexible BSON documents. Leveraging Mongoose schemas for validation, compound indexes for querying sub-10ms results, and aggregation pipelines for multi-stage analytics.',
      keyFeatures: [
        'Complex multi-stage aggregation pipelines for analytics and order totals',
        'Compound indexing strategies ensuring indexed index scans',
        'Referenced models with Mongoose .populate() for relationship integrity',
      ],
      codeHighlight: `// Mongoose Schema with Pre-Save Encryption
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});`,
      responsibilities: ['Document schema validation', 'Data indexing & query optimization', 'ACID transactions across multi-documents'],
    },
  ];

  const activeTier = tiers.find((t) => t.id === activeTierId) || tiers[0];

  return (
    <section id="tech-stack" className="relative py-28 bg-[#0C0B09] overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      <div className="ambient-light-orb top-1/4 right-0 w-[500px] h-[500px] bg-[#D6B36A]/04" />
      <div className="ambient-light-orb bottom-10 left-10 w-[450px] h-[450px] bg-[#B99555]/05" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LEVEL 0: Outer Section Container */}
        <ConstructedSection
          id="tech-stack"
          accentColor="#D6B36A"
          borderRadius={24}
          frameTitle="SYS://MERN_ARCHITECTURE_MATRIX"
          className="p-6 sm:p-10 border border-[rgba(214,179,106,0.20)] bg-[#14120F]/60 backdrop-blur-sm"
        >
          {/* Section Header */}
          <div className="mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#211D17] border border-[rgba(214,179,106,0.20)] text-xs font-mono text-[#D6B36A] mb-3">
              <Layers size={13} />
              <span>SECTION 02 // ARCHITECTURE MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#F5F0E6] tracking-tight">
              The <span className="text-gradient-gold">MERN Stack</span> Ecosystem
            </h2>
            <p className="mt-3 text-[#B9B2A5] text-sm sm:text-base font-sans">
              Each layer operates with a dedicated responsibility, linked by type-safe contracts and JSON serialization.
            </p>
          </div>

          {/* LEVEL 1: Four Nested Inner Cards constructed one by one */}
          <ConstructedContainer id="tech-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const isActive = tier.id === activeTierId;

              return (
                <ConstructedCard
                  key={tier.id}
                  id={`tech-card-${tier.id}`}
                  accentColor={tier.color}
                  borderRadius={18}
                  className="p-6 flex flex-col justify-between cursor-pointer"
                >
                  <div onClick={() => setActiveTierId(tier.id)}>
                    {/* Top Row: Icon container + Letter Badge */}
                    <div className="flex items-center justify-between pb-4 border-b border-[rgba(214,179,106,0.20)] mb-4">
                      {/* LEVEL 2: Nested Icon */}
                      <ConstructedIcon
                        id={`tech-icon-${tier.id}`}
                        icon={Icon}
                        color={tier.color}
                        containerSize={42}
                      />
                      <span className="text-xs font-mono font-bold text-[#B9B2A5] px-2 py-0.5 rounded bg-[#211D17] border border-[rgba(214,179,106,0.20)]">
                        {tier.letter} // TIER
                      </span>
                    </div>

                    {/* LEVEL 2: Heading */}
                    <ConstructedHeading
                      id={`tech-heading-${tier.id}`}
                      as="h3"
                      accentColor={tier.color}
                      className="text-lg text-[#F5F0E6] mb-1"
                    >
                      {tier.name}
                    </ConstructedHeading>

                    <span className="text-[11px] font-mono text-[#B9B2A5] block mb-3">
                      {tier.role}
                    </span>

                    {/* LEVEL 2: Description */}
                    <ConstructedDescription
                      id={`tech-desc-${tier.id}`}
                      accentColor={tier.color}
                      className="mb-4 text-xs line-clamp-3 text-[#B9B2A5]"
                    >
                      {tier.tagline}
                    </ConstructedDescription>

                    {/* LEVEL 2: Micro Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tier.responsibilities.slice(0, 2).map((resp, rIdx) => (
                        <ConstructedBadge
                          key={rIdx}
                          id={`tech-badge-${tier.id}-${rIdx}`}
                          color={tier.color}
                        >
                          {resp}
                        </ConstructedBadge>
                      ))}
                    </div>
                  </div>

                  {/* LEVEL 2: Action Button */}
                  <div className="pt-4 mt-4 border-t border-[rgba(214,179,106,0.20)] flex items-center justify-between">
                    <ConstructedButton
                      id={`tech-btn-${tier.id}`}
                      onClick={() => setActiveTierId(tier.id)}
                      accentColor={tier.color}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono ${
                        isActive
                          ? 'bg-[#D6B36A]/20 text-[#D6B36A] border border-[#D6B36A]/40'
                          : 'bg-[#211D17] text-[#F5F0E6] hover:text-white border border-[rgba(214,179,106,0.20)]'
                      }`}
                    >
                      <span>{isActive ? 'Active Blueprint' : 'Inspect Details'}</span>
                    </ConstructedButton>

                    <ArrowRight size={14} className="text-[#B9B2A5]" />
                  </div>
                </ConstructedCard>
              );
            })}
          </ConstructedContainer>

          {/* LEVEL 1: Active Detail Inspector Card */}
          <ConstructedCard
            id={`tech-detail-${activeTier.id}`}
            accentColor={activeTier.color}
            borderRadius={20}
            className="p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <ConstructedIcon
                    id={`tech-detail-icon-${activeTier.id}`}
                    icon={activeTier.icon}
                    color={activeTier.color}
                    containerSize={46}
                  />
                  <div>
                    <ConstructedHeading
                      id={`tech-detail-head-${activeTier.id}`}
                      as="h3"
                      accentColor={activeTier.color}
                      className="text-2xl text-[#F5F0E6]"
                    >
                      {activeTier.name} Deep Architecture
                    </ConstructedHeading>
                    <span className="text-xs font-mono text-[#B9B2A5]">
                      {activeTier.role}
                    </span>
                  </div>
                </div>

                <ConstructedDescription
                  id={`tech-detail-desc-${activeTier.id}`}
                  accentColor={activeTier.color}
                  className="text-sm sm:text-base text-[#B9B2A5]"
                >
                  {activeTier.description}
                </ConstructedDescription>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-[#B9B2A5] uppercase tracking-wider block">
                    Verified Capabilities:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeTier.keyFeatures.map((feat, fIdx) => (
                      <ConstructedBadge
                        key={fIdx}
                        id={`tech-feat-${activeTier.id}-${fIdx}`}
                        color={activeTier.color}
                      >
                        &bull; {feat}
                      </ConstructedBadge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Code Sandbox */}
              <div className="lg:col-span-5 rounded-xl bg-[#14120F] border border-[rgba(214,179,106,0.20)] p-4 font-mono text-xs overflow-x-auto text-[#F5F0E6] shadow-xl">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[rgba(214,179,106,0.20)] text-[10px] text-[#B9B2A5]">
                  <span>PRODUCTION SYNTAX // {activeTier.name}</span>
                  <span className="text-[#D6B36A]">ES6+ TS</span>
                </div>
                <pre className="text-[#F5F0E6] leading-relaxed">
                  <code>{activeTier.codeHighlight}</code>
                </pre>
              </div>

            </div>
          </ConstructedCard>

        </ConstructedSection>
      </div>
    </section>
  );
};

export default TechStack;
