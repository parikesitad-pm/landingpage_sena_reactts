import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If user prefers reduced motion, preserve native scrolling without Lenis interpolation
    if (prefersReducedMotion || typeof window === 'undefined') {
      return;
    }

    // Initialize Lenis with restrained configuration (Requirement 9 & 10)
    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      syncTouch: false, // Do not hijack mobile touch behavior
      autoRaf: false, // Single RAF loop controlled manually
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Single isolated RAF loop (Requirement 15)
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle hash anchor clicks smoothly with offset consideration
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Only handle local hash links like #story, #protocol, etc.
      if (href?.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          // Scroll with breathing room for sticky navbar (64px)
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -32,
            duration: 0.9,
          });
          // Update URL hash without jumping
          window.history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [prefersReducedMotion]);

  const scrollTo = (target: string | HTMLElement, offset = -32) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 0.9 });
    } else {
      // Native fallback
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
