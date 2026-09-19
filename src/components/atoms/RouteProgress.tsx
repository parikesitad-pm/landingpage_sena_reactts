import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function RouteProgress() {
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [showSparkle, setShowSparkle] = useState(false);

  const isFirstMount = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  // Clear running timers
  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    clearTimers();

    if (isFirstMount.current) {
      isFirstMount.current = false;
      // Quick subtle hydration sweep
      setVisible(true);
      setProgress(0.2);

      const t1 = setTimeout(() => {
        setProgress(1.0);
        setShowSparkle(true);
      }, 150);

      const t2 = setTimeout(() => {
        setVisible(false);
        setShowSparkle(false);
        setProgress(0);
      }, 450);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    // On subsequent route navigations:
    // Small appearance delay (120ms) to avoid flicker if navigation is instantaneous
    timerRef.current = setTimeout(() => {
      setVisible(true);
      setProgress(0.12);

      // Smooth perceived acceleration toward ~80%
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 0.82) {
            if (progressIntervalRef.current)
              clearInterval(progressIntervalRef.current);
            return 0.82;
          }
          return prev + (0.82 - prev) * 0.25;
        });
      }, 50);

      // Finish quickly
      const finishTimer = setTimeout(() => {
        if (progressIntervalRef.current)
          clearInterval(progressIntervalRef.current);
        setProgress(1.0);
        setShowSparkle(true);

        const fadeTimer = setTimeout(() => {
          setVisible(false);
          setShowSparkle(false);
          setProgress(0);
        }, 220);

        return () => clearTimeout(fadeTimer);
      }, 280);

      return () => clearTimeout(finishTimer);
    }, 120);

    return () => {
      clearTimers();
    };
  }, [location.pathname, location.search, prefersReducedMotion]);

  if (prefersReducedMotion || !visible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none transition-opacity duration-200"
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Progress Bar Line */}
      <div
        className="h-[2px] sm:h-[2.5px] w-full bg-[var(--accent)] origin-left transition-transform duration-200 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          boxShadow:
            '0 0 10px color-mix(in srgb, var(--accent) 45%, transparent)',
        }}
      />

      {/* Subtle LUCA amber sparkle tip micro-detail */}
      {showSparkle && progress >= 0.95 && (
        <span
          className="absolute -top-1.5 font-mono text-[10px] text-[var(--accent)] select-none opacity-90 transition-opacity duration-150"
          style={{
            left: 'calc(100% - 14px)',
          }}
        >
          ✦
        </span>
      )}
    </div>
  );
}
