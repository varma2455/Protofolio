/**
 * ScrollConstructionController.tsx
 * Master scroll coordinator for VARMA.DEV's Arrow-Painting Website.
 * - Detects first scroll to dismiss initial empty state prompt and initiate Arrow 1
 * - Coordinates GSAP ScrollTrigger and IntersectionObserver for all sections and regions
 * - Ensures completed content remains crisp and fully interactive
 * - Provides accessibility fallback and mode toggles
 */

import React, { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InitialScrollPrompt } from './InitialScrollPrompt';
import { Paintbrush, Eye } from 'lucide-react';
import { GlobalArrowPool } from './GlobalArrowPool';
import { ArrowTaskManager } from './ArrowTaskManager';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollConstructionControllerProps {
  sections?: string[];
}

export const ScrollConstructionController: React.FC<ScrollConstructionControllerProps> = ({
  sections = [
    'hero',
    'about',
    'tech-stack',
    'projects',
    'experience',
    'skills',
    'education',
    'resume',
    'contact',
    'footer',
  ],
}) => {
  const [hasStartedScroll, setHasStartedScroll] = useState<boolean>(false);
  const [isInstantMode, setIsInstantMode] = useState<boolean>(false);

  // Trigger initiation of the construction experience
  const initiateExperience = useCallback(() => {
    setHasStartedScroll(true);
    GlobalArrowPool.setStarted(true);

    // Trigger hero section sequence immediately
    window.dispatchEvent(
      new CustomEvent('start-section-hero', {
        detail: { sectionId: 'hero' },
      })
    );

    // Refresh GSAP triggers after state update
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, []);

  // Listen for initial user interaction (wheel, touch, key, scroll) or auto-initiate
  useEffect(() => {
    if (hasStartedScroll) return;

    // Requirement 3: Start with short cinematic introduction, then automatically reveal
    const autoRevealTimer = setTimeout(() => {
      initiateExperience();
    }, 1200);

    const handleFirstScroll = () => {
      clearTimeout(autoRevealTimer);
      initiateExperience();
    };

    window.addEventListener('wheel', handleFirstScroll, { passive: true, once: true });
    window.addEventListener('touchmove', handleFirstScroll, { passive: true, once: true });
    window.addEventListener('scroll', handleFirstScroll, { passive: true, once: true });
    
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        clearTimeout(autoRevealTimer);
        initiateExperience();
      }
    };
    window.addEventListener('click', handleAnchorClick);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'Space'].includes(e.code)) {
        clearTimeout(autoRevealTimer);
        initiateExperience();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { once: true });

    return () => {
      clearTimeout(autoRevealTimer);
      window.removeEventListener('wheel', handleFirstScroll);
      window.removeEventListener('touchmove', handleFirstScroll);
      window.removeEventListener('scroll', handleFirstScroll);
      window.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasStartedScroll, initiateExperience]);

  // Set up ScrollTrigger & IntersectionObserver for progressive reveal
  useEffect(() => {
    if (!hasStartedScroll) return;

    // Observe individual construction regions as they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const regionId = entry.target.getAttribute('data-construction-id');
            const stage = entry.target.getAttribute('data-construction-stage');
            if (regionId && stage === 'hidden') {
              window.dispatchEvent(
                new CustomEvent(`construct-region-${regionId}`, {
                  detail: { id: regionId },
                })
              );
            }
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
      }
    );

    // Observe all regions currently in DOM
    const regionEls = document.querySelectorAll('[data-construction-id]');
    regionEls.forEach((el) => observer.observe(el));

    // ScrollTriggers for major section milestones (enter & enterBack)
    const triggers: ScrollTrigger[] = [];

    sections.forEach((sectionId) => {
      const sectionEl = document.getElementById(sectionId);
      if (!sectionEl) return;

      const trigger = ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 85%',
        onEnter: () => {
          window.dispatchEvent(
            new CustomEvent(`start-section-${sectionId}`, {
              detail: { sectionId },
            })
          );
        },
        onEnterBack: () => {
          window.dispatchEvent(
            new CustomEvent(`start-section-${sectionId}`, {
              detail: { sectionId },
            })
          );
        },
      });

      triggers.push(trigger);
    });

    return () => {
      observer.disconnect();
      triggers.forEach((t) => t.kill());
    };
  }, [hasStartedScroll, sections]);

  // Toggle instant mode
  const toggleInstantMode = () => {
    if (!isInstantMode) {
      setIsInstantMode(true);
      setHasStartedScroll(true);
      GlobalArrowPool.setStarted(true);
      ArrowTaskManager.triggerInstantReveal();
      window.dispatchEvent(new CustomEvent('construct-all-regions'));
    } else {
      setIsInstantMode(false);
      ArrowTaskManager.resetInstantReveal();
      window.location.reload();
    }
  };

  return (
    <>
      {/* Pitch dark initial state prompt */}
      <InitialScrollPrompt
        isVisible={!hasStartedScroll}
        onInitiateScroll={initiateExperience}
      />

      {/* Floating Mode Toggle in bottom right */}
      {hasStartedScroll && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            type="button"
            onClick={toggleInstantMode}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[rgba(214,179,106,0.20)] bg-[#211D17]/90 backdrop-blur-md text-[11px] font-mono text-[#F5F0E6] hover:border-[#D6B36A]/50 transition-all duration-200 shadow-xl cursor-pointer"
            title="Toggle between live arrow painting and instant reveal"
          >
            {isInstantMode ? (
              <>
                <Paintbrush size={13} className="text-[#D6B36A]" />
                <span>Re-enable Arrow Painting</span>
              </>
            ) : (
              <>
                <Eye size={13} className="text-[#B99555]" />
                <span>Instant Reveal Mode</span>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollConstructionController;
