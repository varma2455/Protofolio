import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export interface KineticTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p' | 'div';
  variant?: 'letter-reveal' | 'outline-to-solid' | 'gradient-wipe' | 'glow-focus';
  color?: string;
  gradient?: string;
  delay?: number;
  stagger?: number;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
  isActive?: boolean;
  onComplete?: () => void;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  as: Component = 'span',
  variant = 'letter-reveal',
  color = '#FFFFFF',
  gradient = 'linear-gradient(135deg, #00E5FF 0%, #6C63FF 50%, #A855F7 100%)',
  delay = 0,
  stagger = 0.025,
  className = '',
  highlightWords = [],
  highlightColor = '#00E5FF',
  isActive = true,
  onComplete,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const words = text.split(' ');

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
      onComplete?.();
      return;
    }

    const container = containerRef.current;
    const letters = container.querySelectorAll('.kinetic-char');

    if (variant === 'letter-reveal') {
      gsap.set(letters, {
        opacity: 0,
        y: 18,
        rotateX: -45,
        filter: 'blur(4px)',
      });

      gsap.to(letters, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger,
        delay,
        ease: 'power3.out',
        onComplete,
      });
    } else if (variant === 'outline-to-solid') {
      gsap.set(container, {
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)',
        opacity: 0.8,
      });

      gsap.to(container, {
        color: color,
        WebkitTextStroke: '0px transparent',
        opacity: 1,
        duration: 0.9,
        delay,
        ease: 'power2.inOut',
        onComplete,
      });
    } else if (variant === 'gradient-wipe') {
      gsap.set(container, {
        backgroundPosition: '200% center',
      });

      gsap.to(container, {
        backgroundPosition: '0% center',
        duration: 1.1,
        delay,
        ease: 'power2.out',
        onComplete,
      });
    } else {
      // glow-focus
      gsap.fromTo(
        container,
        { textShadow: '0 0 25px rgba(0, 229, 255, 0.8)', opacity: 0.3 },
        { textShadow: '0 0 0px transparent', opacity: 1, duration: 1.2, delay, onComplete }
      );
    }
  }, [isActive, delay, stagger, variant, color, onComplete]);

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block select-text ${className}`}
      style={{
        perspective: '800px',
        color: variant === 'outline-to-solid' ? 'transparent' : undefined,
      }}
    >
      {variant === 'letter-reveal' ? (
        words.map((word, wIdx) => {
          const isHighlighted = highlightWords.some(
            (hw) => hw.toLowerCase() === word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
          );

          return (
            <span
              key={wIdx}
              className={`inline-block whitespace-nowrap mr-[0.28em] ${
                isHighlighted ? 'font-bold' : ''
              }`}
              style={{
                color: isHighlighted ? highlightColor : undefined,
                textShadow: isHighlighted ? `0 0 16px ${highlightColor}66` : undefined,
              }}
            >
              {word.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="kinetic-char inline-block"
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </span>
              ))}
            </span>
          );
        })
      ) : (
        <span
          style={{
            backgroundImage: variant === 'gradient-wipe' ? gradient : undefined,
            WebkitBackgroundClip: variant === 'gradient-wipe' ? 'text' : undefined,
            color: variant === 'gradient-wipe' ? 'transparent' : undefined,
            backgroundSize: variant === 'gradient-wipe' ? '200% auto' : undefined,
          }}
        >
          {text}
        </span>
      )}
    </Component>
  );
};

export default KineticText;
