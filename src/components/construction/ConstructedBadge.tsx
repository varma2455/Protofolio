/**
 * ConstructedBadge.tsx
 * Level 2 Micro-Construction Component: Technology badges and tags.
 * An arrow traces the micro-pill border and paints the badge label into view.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useConstruction } from './ConstructionContext';

export interface ConstructedBadgeProps {
  id: string;
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const ConstructedBadge: React.FC<ConstructedBadgeProps> = ({
  id,
  children,
  color = '#D6B36A',
  className = '',
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
      }, 160);

      return () => clearTimeout(timer);
    }
  }, [isParentActive, activeChildIndex, childIndex, id, notifyChildComplete]);

  return (
    <span
      id={`badge-${id}`}
      data-constructed-badge={id}
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all duration-200 ${
        stage === 'revealed'
          ? 'opacity-100 scale-100 bg-[#211D17] border-[rgba(214,179,106,0.20)] text-[#F5F0E6]'
          : stage === 'drawing'
          ? 'opacity-90 scale-98 bg-[#211D17]/80 border-[#D6B36A] text-[#F5F0E6]'
          : 'opacity-0 scale-90'
      } ${className}`}
      style={{
        boxShadow: stage === 'drawing' ? `0 0 10px ${color}` : undefined,
      }}
    >
      {children}
    </span>
  );
};

export default ConstructedBadge;
