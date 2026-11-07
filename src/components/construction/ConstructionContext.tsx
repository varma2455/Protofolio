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
  const [activeChildIndex, setActiveChildIndex] = useState<number>(instantMode ? 999 : 0);
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
        const nextIndex = Math.max(prev, index + 1);
        if (nextIndex >= childrenListRef.current.length) {
          if (onAllChildrenComplete) onAllChildrenComplete();
        }
        return nextIndex;
      });
    }, staggerDelay);
  }, [staggerDelay, onAllChildrenComplete]);

  // Global instant reveal listener
  React.useEffect(() => {
    const handleInstant = () => {
      setActiveChildIndex(999);
      if (onAllChildrenComplete) onAllChildrenComplete();
    };
    window.addEventListener('construct-all-regions', handleInstant);
    return () => window.removeEventListener('construct-all-regions', handleInstant);
  }, [onAllChildrenComplete]);

  // Safety watchdog: Once parent is active, ensure all children eventually construct
  React.useEffect(() => {
    if (!isParentActive) return;

    const watchdog = setTimeout(() => {
      setActiveChildIndex((prev) => {
        const total = childrenListRef.current.length;
        if (prev < total) {
          if (onAllChildrenComplete) onAllChildrenComplete();
          return total;
        }
        return prev;
      });
    }, 3200);

    return () => clearTimeout(watchdog);
  }, [isParentActive, onAllChildrenComplete]);

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
