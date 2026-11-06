import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Server, 
  Database, 
  ShieldCheck, 
  Radio, 
  ArrowRight, 
  Play, 
  Check, 
  Terminal as TerminalIcon,
  Cpu
} from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  clientPayload: string;
  apiRoute: string;
  authHeader: string;
  middlewareAction: string;
  dbQuery: string;
  realtimeAction?: string;
  response: string;
}

export const ArchitectureVisualizer: React.FC = () => {
  const scenarios: SimulationScenario[] = [
    {
      id: 'order',
      name: 'Order Placement (Food Delivery)',
      description: 'End-to-end transactional checkout across React Context, Express Auth Middleware, and MongoDB Order Document.',
      clientPayload: '{ items: [{ id: "pizza_01", qty: 2 }], total: 640 }',
      apiRoute: 'POST /api/orders/checkout',
      authHeader: 'Bearer eyJhbGciOiJIUzI1NiIsIn...',
      middlewareAction: 'JWT verified: customer_role confirmed',
      dbQuery: 'Order.create({ user: req.user._id, items, status: "Placed" })',
      realtimeAction: 'Socket.emit("order_created", { orderId: "ORD-9421" })',
      response: '201 Created • { success: true, orderId: "ORD-9421" }',
    },
    {
      id: 'chat',
      name: 'Real-Time Message (Socket.io)',
      description: 'Low-latency bi-directional WebSocket event delivery with asynchronous MongoDB chat log persistence.',
      clientPayload: '{ room: "group_dev", message: "Build shipped to staging" }',
      apiRoute: 'WSS /socket.io/?token=jwt_bearer',
      authHeader: 'Socket Handshake Auth: User Verified',
      middlewareAction: 'Socket.join("group_dev") • Room authorized',
      dbQuery: 'Message.create({ room, sender, text, timestamp }) [async]',
      realtimeAction: 'io.to("group_dev").emit("new_message", payload)',
      response: '101 Switching Protocols • Latency: 28ms',
    },
    {
      id: 'catalog',
      name: 'Optimized Catalog Query (E-Commerce)',
      description: 'Indexed MongoDB query with lean projection and React lazy rendering.',
      clientPayload: '{ category: "electronics", page: 1, limit: 12 }',
      apiRoute: 'GET /api/products?cat=electronics&p=1',
      authHeader: 'Public Route (Guest / Customer)',
      middlewareAction: 'Cache Header Evaluation & Query Sanitizer',
      dbQuery: 'Product.find({ category }).select("title price images").lean()',
      response: '200 OK • Payload: 34KB (reduced from 450KB)',
    },
  ];

  const [activeScenarioId, setActiveScenarioId] = useState<string>('order');
  const [activeStep, setActiveStep] = useState<number>(3); // 0: client, 1: middleware, 2: db, 3: completed
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const active = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    setTimeout(() => {
      setActiveStep(1);
    }, 700);

    setTimeout(() => {
      setActiveStep(2);
    }, 1500);

    setTimeout(() => {
      setActiveStep(3);
      setIsSimulating(false);
    }, 2300);
  };

  return (
    <div className="w-full bg-[#10141D] dark:bg-[#10141D] light:bg-white border border-white/10 light:border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 light:border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-ping" />
            <span className="text-xs font-mono uppercase tracking-wider text-accent-blue font-semibold">
              Interactive System Flow
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl text-white light:text-slate-900 mt-1">
            MERN Architectural Execution Flow
          </h3>
          <p className="text-xs text-slate-400 light:text-slate-500 font-mono mt-0.5">
            Select a transaction below to trace the request through client, API middleware, and database layers.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
            isSimulating
              ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30 cursor-not-allowed'
              : 'bg-accent-blue hover:bg-accent-blueHover text-white shadow-md shadow-accent-blue/20'
          }`}
        >
          {isSimulating ? (
            <>
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              <span>Tracing Pipeline...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Request</span>
            </>
          )}
        </button>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-5 pb-6">
        {scenarios.map((sc) => {
          const isSelected = sc.id === activeScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioId(sc.id);
                setActiveStep(3);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                isSelected
                  ? 'bg-accent-blue/15 text-accent-blue border-accent-blue/40 shadow-sm'
                  : 'bg-white/5 light:bg-slate-100 text-slate-400 light:text-slate-600 border-white/5 light:border-slate-200 hover:text-white light:hover:text-slate-900'
              }`}
            >
              {sc.name}
            </button>
          );
        })}
      </div>

      {/* Node Pipeline Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {/* Step 1: React Client */}
        <motion.div
          animate={{
            borderColor: activeStep >= 0 ? '#648CFF' : 'rgba(255,255,255,0.08)',
            backgroundColor: activeStep === 0 ? 'rgba(100,140,255,0.08)' : 'rgba(21,27,38,0.7)',
          }}
          className="p-4 rounded-xl border border-white/10 light:border-slate-200 light:bg-slate-50 flex flex-col justify-between relative overflow-hidden transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs font-heading font-bold text-white light:text-slate-900">
                1. Client Layer
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-blue/10 text-accent-blue">
              React 18 SPA
            </span>
          </div>

          <div className="mt-3 space-y-2 text-[11px] font-mono">
            <div className="text-slate-400 light:text-slate-500">
              <span className="text-slate-500">Dispatch:</span>{' '}
              <span className="text-accent-blue font-semibold">{active.apiRoute}</span>
            </div>
            <div className="p-2 rounded bg-black/40 light:bg-white border border-white/5 light:border-slate-200 text-slate-300 light:text-slate-700 truncate">
              {active.clientPayload}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 light:border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>State: React Context</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> Dispatched
            </span>
          </div>
        </motion.div>

        {/* Step 2: Express & Middleware */}
        <motion.div
          animate={{
            borderColor: activeStep >= 1 ? '#9575FF' : 'rgba(255,255,255,0.08)',
            backgroundColor: activeStep === 1 ? 'rgba(149,117,255,0.08)' : 'rgba(21,27,38,0.7)',
          }}
          className="p-4 rounded-xl border border-white/10 light:border-slate-200 light:bg-slate-50 flex flex-col justify-between relative overflow-hidden transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent-violet/10 flex items-center justify-center text-accent-violet">
                <Server className="w-4 h-4" />
              </div>
              <span className="text-xs font-heading font-bold text-white light:text-slate-900">
                2. API & Security Layer
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-violet/10 text-accent-violet">
              Express / JWT
            </span>
          </div>

          <div className="mt-3 space-y-2 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-slate-400 light:text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-violet" />
              <span className="truncate">{active.authHeader}</span>
            </div>
            <div className="p-2 rounded bg-black/40 light:bg-white border border-white/5 light:border-slate-200 text-slate-300 light:text-slate-700 truncate">
              {active.middlewareAction}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 light:border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Runtime: Node.js</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> Authorized
            </span>
          </div>
        </motion.div>

        {/* Step 3: MongoDB Persistence */}
        <motion.div
          animate={{
            borderColor: activeStep >= 2 ? '#38BDF8' : 'rgba(255,255,255,0.08)',
            backgroundColor: activeStep === 2 ? 'rgba(56,189,248,0.08)' : 'rgba(21,27,38,0.7)',
          }}
          className="p-4 rounded-xl border border-white/10 light:border-slate-200 light:bg-slate-50 flex flex-col justify-between relative overflow-hidden transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                <Database className="w-4 h-4" />
              </div>
              <span className="text-xs font-heading font-bold text-white light:text-slate-900">
                3. Persistence & Sync
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan">
              MongoDB ODM
            </span>
          </div>

          <div className="mt-3 space-y-2 text-[11px] font-mono">
            <div className="text-slate-400 light:text-slate-500">
              <span className="text-slate-500">Mongoose:</span>
            </div>
            <div className="p-2 rounded bg-black/40 light:bg-white border border-white/5 light:border-slate-200 text-slate-300 light:text-slate-700 truncate">
              {active.dbQuery}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 light:border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Indexes: Compound</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> Committed
            </span>
          </div>
        </motion.div>
      </div>

      {/* Real-Time Event & Response Terminal Banner */}
      <div className="mt-5 p-3.5 rounded-xl bg-[#080A0F] light:bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-2.5">
          <TerminalIcon className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-400">Response Pipeline:</span>
          <span className="text-emerald-400 font-semibold">{active.response}</span>
        </div>
        {active.realtimeAction && (
          <div className="flex items-center gap-2 text-accent-violet">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[11px] truncate">{active.realtimeAction}</span>
          </div>
        )}
      </div>
    </div>
  );
};
