import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../../types';

interface ProjectMockup3DProps {
  project: Project;
}

export const ProjectMockup3D: React.FC<ProjectMockup3DProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 220, damping: 25 });
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), { stiffness: 200, damping: 20 });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      className="relative w-full h-[340px] sm:h-[400px] flex items-center justify-center [perspective:1200px] select-none overflow-hidden"
    >
      {/* 3D Tilting Studio Canvas */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[420px] transition-transform duration-100 ease-out"
      >
        {/* Studio MacBook Hardware Mockup */}
        <div className="relative rounded-2xl bg-[#1B2230] p-2.5 pb-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/15">
          {/* Top Notch & Camera Bezel */}
          <div className="flex items-center justify-between px-2 pb-2 text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            <div className="px-3 py-0.5 rounded-md bg-black/40 text-[10px] text-slate-300 font-mono flex items-center gap-1.5 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>https://{project.id}.varma.dev</span>
            </div>
            <span className="text-[9px] text-slate-500 font-mono">1080p Retina</span>
          </div>

          {/* Screen Content Viewport */}
          <div className="relative rounded-xl overflow-hidden bg-[#0A0E17] border border-white/10 aspect-[16/10] p-3 text-white font-sans">
            {/* Dynamic Project UI Mockup based on project ID */}
            {project.id === 'food-delivery' && (
              <div className="h-full flex flex-col justify-between text-xs">
                {/* Navbar */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="font-heading font-bold text-accent-blue text-sm">CraveExpress MERN</span>
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-accent-blue/15 text-accent-blue">Customer / Admin</span>
                    <span className="text-emerald-400 font-bold">Cart: 3 items</span>
                  </div>
                </div>
                {/* Food Grid Mock */}
                <div className="grid grid-cols-2 gap-2 my-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="h-10 rounded bg-gradient-to-tr from-amber-500/20 to-orange-500/20 mb-1.5 flex items-center justify-center font-mono text-[10px] text-amber-300">
                      Gourmet Burger
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span>₹249</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">+ Added</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="h-10 rounded bg-gradient-to-tr from-rose-500/20 to-red-500/20 mb-1.5 flex items-center justify-center font-mono text-[10px] text-rose-300">
                      Artisan Pizza
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span>₹399</span>
                      <span className="px-1.5 py-0.2 rounded bg-white/10 text-slate-300">Add to Cart</span>
                    </div>
                  </div>
                </div>
                {/* Footer status */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] font-mono text-slate-400">
                  <span>MongoDB Atlas Synced</span>
                  <span className="text-emerald-400">RESTful Express 200 OK</span>
                </div>
              </div>
            )}

            {project.id === 'ecommerce-platform' && (
              <div className="h-full flex flex-col justify-between text-xs">
                {/* Navbar */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="font-heading font-bold text-accent-violet text-sm">StoreFront PRO</span>
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-accent-violet/15 text-accent-violet">Role: Admin</span>
                    <span className="text-slate-300">Filter: In Stock</span>
                  </div>
                </div>
                {/* Product catalog */}
                <div className="grid grid-cols-3 gap-1.5 my-2">
                  {['Audio Pro', 'Minimal Watch', 'Mechanical Key'].map((item, i) => (
                    <div key={i} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-center">
                      <div className="h-8 rounded bg-gradient-to-br from-indigo-500/20 to-blue-500/20 mb-1 flex items-center justify-center font-mono text-[8px] text-indigo-300">
                        SKU-0{i + 1}
                      </div>
                      <div className="text-[9px] truncate font-medium">{item}</div>
                      <div className="text-[8px] text-accent-blue font-mono">₹{1299 + i * 500}</div>
                    </div>
                  ))}
                </div>
                {/* Footer status */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] font-mono text-slate-400">
                  <span>Lean Query Projection</span>
                  <span className="text-emerald-400">Payload: 34KB</span>
                </div>
              </div>
            )}

            {project.id === 'chat-application' && (
              <div className="h-full flex flex-col justify-between text-xs">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-heading font-bold text-sm">#engineering-core</span>
                  </div>
                  <span className="text-[9px] font-mono text-accent-cyan">Socket.io WSS</span>
                </div>
                {/* Messages stream */}
                <div className="space-y-1.5 my-2 text-[10px] font-mono">
                  <div className="p-1.5 rounded-lg bg-white/5 max-w-[80%] text-slate-300">
                    <span className="text-accent-blue font-bold">Varma:</span> Push dispatched to staging cluster.
                  </div>
                  <div className="p-1.5 rounded-lg bg-accent-violet/20 border border-accent-violet/30 max-w-[80%] ml-auto text-right text-slate-200">
                    Verified sub-40ms latency!
                  </div>
                  <div className="text-[8px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                    <span>Peer typing...</span>
                  </div>
                </div>
                {/* Input bar */}
                <div className="p-1.5 rounded bg-white/5 border border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-500">
                  <span>Type encrypted message...</span>
                  <span className="text-accent-violet">Send ↵</span>
                </div>
              </div>
            )}

            {/* Specular Glare Reflection Sheen */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18) 0%, transparent 60%)`,
              }}
              className="absolute inset-0 pointer-events-none"
            />
          </div>
        </div>

        {/* Floating Companion Mobile Screen in 3D Perspective */}
        <motion.div
          style={{
            translateZ: 40,
            translateX: 80,
            translateY: -30,
          }}
          className="absolute -right-4 -bottom-6 w-32 sm:w-36 rounded-2xl bg-[#0A0D14] p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.9)] border border-white/20 hidden sm:block"
        >
          {/* Dynamic Island */}
          <div className="w-10 h-2.5 mx-auto rounded-full bg-black mb-1.5 border border-white/10" />
          {/* Mobile Screen */}
          <div className="rounded-xl bg-[#10141D] p-2 text-[8px] font-mono border border-white/5 space-y-1">
            <div className="text-accent-blue font-bold flex items-center justify-between">
              <span>{project.categoryType.toUpperCase()}</span>
              <span className="text-emerald-400">● 60 FPS</span>
            </div>
            <div className="h-6 rounded bg-white/5 flex items-center justify-center text-slate-400">
              Mobile Responsive
            </div>
            <div className="h-2 rounded bg-accent-blue/20 w-3/4" />
            <div className="h-2 rounded bg-white/5 w-1/2" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
