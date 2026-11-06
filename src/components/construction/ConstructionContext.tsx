/**
 * ConstructionContext.tsx
 * Hierarchical React context coordinating multi-level nested box construction.
 * Level 0 (ConstructedSection) -> Level 1 (ConstructedCard) -> Level 2 (Icon, Heading, Description, Badges, Buttons)
 */

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export interface ConstructionContextType {
  parentId: string;
  isParentActive: boolean;
  isParentCompleted: boolean;
  activeChildIndex: number;
  registerChild: (childId: string) => number;
  notifyChildComplete: (childId: string, index: number) => void;
  instantMode: boolean;
}

const defaultContext: ConstructionContextType = {
  parentId: 'root',
  isParentActive: true,
  isParentCompleted: false,
  activeChildIndex: 0,
  registerChild: () => 0,
  notifyChildComplete: () => {},
  instantMode: false,
};

export const ConstructionContext = createContext<ConstructionContextType>(defaultContext);

export const useConstruction = () => useContext(ConstructionContext);

export interface ConstructionProviderProps {
  id: string;
  isParentActive: boolean;
  isParentCompleted?: boolean;
  instantMode?: boolean;
  staggerDelay?: number;
  onAllChildrenComplete?: () => void;
  children: React.ReactNode;
}

export const ConstructionProvider: React.FC<ConstructionProviderProps> = ({
  id,
  isParentActive,
  isParentCompleted = false,
  instantMode = false,
  staggerDelay = 80,
  onAllChildrenComplete,
  children,
}) => {
  const [activeChildIndex, setActiveChildIndex] = useState<number>(0);
  const childrenListRef = useRef<string[]>([]);

  const registerChild = useCallback((childId: string) => {
    const list = childrenListRef.current;
    const existingIdx = list.indexOf(childId);
    if (existingIdx !== -1) return existingIdx;
    list.push(childId);
    return list.length - 1;
  }, []);

  const notifyChildComplete = useCallback((childId: string, index: number) => {
    setTimeout(() => {
      setActiveChildIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= childrenListRef.current.length) {
          if (onAllChildrenComplete) onAllChildrenComplete();
        }
        return nextIndex;
      });
    }, staggerDelay);
  }, [staggerDelay, onAllChildrenComplete]);

  return (
    <ConstructionContext.Provider
      value={{
        parentId: id,
        isParentActive,
        isParentCompleted,
        activeChildIndex,
        registerChild,
        notifyChildComplete,
        instantMode,
      }}
    >
      {children}
    </ConstructionContext.Provider>
  );
};
