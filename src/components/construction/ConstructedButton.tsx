/**
 * ConstructedButton.tsx
 * Level 2 Micro-Construction Component: Action buttons and CTAs.
 * An arrow traces the button boundary and unmasks the interactive CTA.
 */

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useConstruction } from './ConstructionContext';

export interface ConstructedButtonProps {
  id: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  accentColor?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const ConstructedButton: React.FC<ConstructedButtonProps> = ({
  id,
  children,
  onClick,
  accentColor = '#D6B36A',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const { isParentActive, activeChildIndex, registerChild, notifyChildComplete } = useConstruction();
  const [childIndex, setChildIndex] = useState<number>(-1);
  const [stage, setStage] = useState<'hidden' | 'drawing' | 'revealed'>('hidden');
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const idx = registerChild(id);
    setChildIndex(idx);
  }, [id, registerChild]);

  // Global instant reveal listener
  useEffect(() => {
    const handleInstant = () => {
      hasTriggeredRef.current = true;
      setStage('revealed');
      notifyChildComplete(id, childIndex);
    };
    window.addEventListener('construct-all-regions', handleInstant);
    return () => window.removeEventListener('construct-all-regions', handleInstant);
  }, [id, childIndex, notifyChildComplete]);

  // Sequential construction activation
  useEffect(() => {
    if (
      isParentActive &&
      childIndex !== -1 &&
      activeChildIndex >= childIndex &&
      !hasTriggeredRef.current
    ) {
      hasTriggeredRef.current = true;
      setStage('drawing');

      const timer = setTimeout(() => {
        setStage('revealed');
        notifyChildComplete(id, childIndex);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isParentActive, activeChildIndex, childIndex, id, notifyChildComplete]);

  return (
    <button
      id={`btn-${id}`}
      data-constructed-button={id}
      type={type}
      disabled={disabled || stage !== 'revealed'}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center transition-all duration-300 cursor-pointer ${
        stage === 'revealed'
          ? 'opacity-100 pointer-events-auto scale-100'
          : stage === 'drawing'
          ? 'opacity-90 pointer-events-none scale-98 border border-[#D6B36A] shadow-[0_0_12px_rgba(214,179,106,0.30)]'
          : 'opacity-0 pointer-events-none scale-90'
      } ${className}`}
      style={{
        boxShadow: stage === 'drawing' ? `0 0 10px ${accentColor}` : undefined,
      }}
    >
      {children}
    </button>
  );
};

export default ConstructedButton;
