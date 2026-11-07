import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export interface ColorRevealProps {
  children: React.ReactNode;
  isActive?: boolean;
  delay?: number;
  duration?: number;
  direction?: 'radial' | 'left-to-right' | 'top-to-bottom' | 'diagonal';
  gradientType?: 'cyan-violet' | 'blue-cyan' | 'electric-mern';
  className?: string;
  onRevealComplete?: () => void;
}

export const ColorReveal: React.FC<ColorRevealProps> = ({
  children,
  isActive = true,
  delay = 0,
  duration = 1.2,
  direction = 'diagonal',
  gradientType = 'cyan-violet',
  className = '',
  onRevealComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowOverlayRef = useRef<HTMLDivElement>(null);

  const gradients: Record<string, string> = {
    'gold-obsidian': 'linear-gradient(135deg, rgba(214, 179, 106, 0.22) 0%, rgba(185, 149, 85, 0.18) 50%, rgba(229, 201, 138, 0.22) 100%)',
    'cyan-violet': 'linear-gradient(135deg, rgba(214, 179, 106, 0.22) 0%, rgba(185, 149, 85, 0.18) 50%, rgba(229, 201, 138, 0.22) 100%)',
    'blue-cyan': 'linear-gradient(90deg, rgba(214, 179, 106, 0.25) 0%, rgba(185, 149, 85, 0.25) 100%)',
    'electric-mern': 'linear-gradient(135deg, rgba(214, 179, 106, 0.2) 0%, rgba(185, 149, 85, 0.15) 30%, rgba(229, 201, 138, 0.22) 70%, rgba(185, 149, 85, 0.25) 100%)',
  };

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (containerRef.current) {
        containerRef.current.style.clipPath = 'inset(0 0 0 0)';
        containerRef.current.style.opacity = '1';
      }
      onRevealComplete?.();
      return;
    }

    const container = containerRef.current;
    const glowOverlay = glowOverlayRef.current;

    const tl = gsap.timeline({
      delay,
      onComplete: () => {
        onRevealComplete?.();
      },
    });

    if (direction === 'diagonal') {
      gsap.set(container, {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        opacity: 0.6,
      });

      tl.to(container, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        opacity: 1,
        duration,
        ease: 'power3.inOut',
      });
    } else if (direction === 'left-to-right') {
      gsap.set(container, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0.5,
      });

      tl.to(container, {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration,
        ease: 'power3.out',
      });
    } else if (direction === 'top-to-bottom') {
      gsap.set(container, {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0.5,
      });

      tl.to(container, {
        clipPath: 'inset(0 0 0% 0)',
        opacity: 1,
        duration,
        ease: 'power3.out',
      });
    } else {
      // radial liquid expansion
      gsap.set(container, {
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 0.4,
      });

      tl.to(container, {
        clipPath: 'circle(150% at 50% 50%)',
        opacity: 1,
        duration,
        ease: 'power2.inOut',
      });
    }

    // Flash a liquid light wave across the revealed boundary
    if (glowOverlay) {
      tl.fromTo(
        glowOverlay,
        { opacity: 0.8, x: '-100%' },
        { opacity: 0, x: '100%', duration: duration * 0.85, ease: 'power2.out' },
        `-=${duration * 0.75}`
      );
    }

    return () => {
      tl.kill();
    };
  }, [isActive, delay, duration, direction, onRevealComplete]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Liquid Glow Mask */}
      <div
        className="absolute inset-0 pointer-events-none rounded-inherit z-0"
        style={{ background: gradients[gradientType] || gradients['cyan-violet'] }}
      />

      {/* Shimmering Scan Wave */}
      <div
        ref={glowOverlayRef}
        className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-r from-transparent via-[#D6B36A]/30 to-transparent"
        style={{ transform: 'translateX(-100%)' }}
      />

      {/* Actual Revealed Content */}
      <div ref={containerRef} className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ColorReveal;
