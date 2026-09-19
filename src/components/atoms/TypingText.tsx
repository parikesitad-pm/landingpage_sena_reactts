import { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

export interface TypingTextProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // initial delay in ms
  startOnView?: boolean;
  active?: boolean;
  cursor?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  hideCursorOnComplete?: boolean;
  cursorBlinkMsAfterComplete?: number;
  onComplete?: () => void;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export default function TypingText({
  text,
  speed = 45,
  delay = 0,
  startOnView = true,
  active = true,
  cursor = true,
  cursorChar = '▌',
  cursorClassName = 'text-[var(--accent)]',
  hideCursorOnComplete = true,
  cursorBlinkMsAfterComplete = 600,
  onComplete,
  className,
  as: Component = 'span',
}: TypingTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.25, once: true });
  const prefersReducedMotion = usePrefersReducedMotion();

  const [displayedText, setDisplayedText] = useState(
    prefersReducedMotion ? text : ''
  );
  const [showCursor, setShowCursor] = useState(!prefersReducedMotion && cursor);

  // If reduced motion is requested, render full text immediately without animation
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setShowCursor(false);
      onComplete?.();
    }
  }, [prefersReducedMotion, text, onComplete]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const shouldStart = active && (!startOnView || isInView);
    if (!shouldStart) return;

    let currentIndex = 0;
    let timer: ReturnType<typeof setInterval>;
    let cursorTimer: ReturnType<typeof setTimeout>;

    const startDelayTimer = setTimeout(() => {
      timer = setInterval(() => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayedText(text.slice(0, currentIndex));
        } else {
          clearInterval(timer);
          onComplete?.();

          if (hideCursorOnComplete) {
            cursorTimer = setTimeout(() => {
              setShowCursor(false);
            }, cursorBlinkMsAfterComplete);
          }
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startDelayTimer);
      if (timer) clearInterval(timer);
      if (cursorTimer) clearTimeout(cursorTimer);
    };
  }, [
    text,
    speed,
    delay,
    active,
    startOnView,
    isInView,
    prefersReducedMotion,
    hideCursorOnComplete,
    cursorBlinkMsAfterComplete,
    onComplete,
  ]);

  return (
    <Component
      ref={containerRef as any}
      className={cn('inline-block', className)}
    >
      {/* Screen readers read complete text instantly without stutter */}
      <span className="sr-only">{text}</span>

      {/* Visual presentation */}
      <span aria-hidden="true">
        {displayedText}
        {cursor && showCursor && (
          <span
            className={cn(
              'inline-block ml-0.5 animate-pulse select-none font-mono font-normal',
              cursorClassName
            )}
          >
            {cursorChar}
          </span>
        )}
      </span>
    </Component>
  );
}
