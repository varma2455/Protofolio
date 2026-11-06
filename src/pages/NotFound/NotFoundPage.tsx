import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, ArrowLeft } from 'lucide-react';
import { profileData } from '../../data/profile';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080A0F] text-slate-100 flex flex-col items-center justify-center p-6 text-center font-mono relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-md p-8 rounded-3xl bg-[#10141D] border border-white/10 shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
          <Terminal className="w-6 h-6" />
        </div>

        <span className="text-xs font-mono text-accent-blue uppercase tracking-wider">
          HTTP 404 • Resource Not Found
        </span>

        <h1 className="font-heading font-extrabold text-4xl text-white mt-2 mb-3">
          Route Undefined
        </h1>

        <p className="text-xs text-slate-400 mb-6 font-sans leading-relaxed">
          The requested route does not map to any active controller or view in {profileData.brand}.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue text-white text-xs font-mono font-medium hover:bg-accent-blueHover transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
