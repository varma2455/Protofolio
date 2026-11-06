/**
 * ConstructedContainer.tsx
 * Inner layout container that hosts multiple ConstructedCards or components.
 */

import React, { useRef, useState, useEffect } from 'react';
import { useConstruction } from './ConstructionContext';

export interface ConstructedContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  gridCols?: string;
}

export const ConstructedContainer: React.FC<ConstructedContainerProps> = ({
  id,
  children,
  className = '',
}) => {
  const { isParentActive } = useConstruction();

  return (
    <div
      id={`container-${id}`}
      data-constructed-container={id}
      className={`relative w-full transition-opacity duration-300 ${
        isParentActive ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default ConstructedContainer;
