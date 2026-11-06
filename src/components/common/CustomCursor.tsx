import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'drag'>('default');

  const mouseX = useSpring(0, { stiffness: 450, damping: 35 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 35 });

  const auraX = useSpring(0, { stiffness: 180, damping: 25 });
  const auraY = useSpring(0, { stiffness: 180, damping: 25 });

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers and no reduced-motion
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!hasPointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      auraX.set(e.clientX);
      auraY.set(e.clientY);

      // Check target element for custom data-cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorVariant('text');
          setCursorText('VIEW');
        } else if (type === 'drag') {
          setCursorVariant('drag');
          setCursorText('3D');
        } else if (type === 'copy') {
          setCursorVariant('text');
          setCursorText('COPY');
        } else {
          setCursorVariant('hover');
          setCursorText('');
        }
      } else if (target.closest('a, button, [role="button"], input, textarea')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [mouseX, mouseY, auraX, auraY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Lagging Aura / Reticle */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorVariant === 'text' ? 56 : cursorVariant === 'drag' ? 48 : cursorVariant === 'hover' ? 44 : 26,
          height: cursorVariant === 'text' ? 56 : cursorVariant === 'drag' ? 48 : cursorVariant === 'hover' ? 44 : 26,
          backgroundColor:
            cursorVariant === 'text' || cursorVariant === 'drag'
              ? 'rgba(100, 140, 255, 0.95)'
              : cursorVariant === 'hover'
              ? 'rgba(100, 140, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.04)',
          borderColor:
            cursorVariant === 'hover' || cursorVariant === 'text'
              ? 'rgba(100, 140, 255, 0.8)'
              : 'rgba(255, 255, 255, 0.25)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 280 }}
        className="rounded-full border backdrop-blur-[2px] flex items-center justify-center shadow-lg"
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold text-white tracking-widest">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Pinpoint Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorVariant === 'text' || cursorVariant === 'drag' ? 0 : cursorVariant === 'hover' ? 1.5 : 1,
          opacity: cursorVariant === 'text' || cursorVariant === 'drag' ? 0 : 1,
        }}
        className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_#648CFF]"
      />
    </div>
  );
};
