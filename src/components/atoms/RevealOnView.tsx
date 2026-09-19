import { useRef, type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

export interface RevealOnViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function RevealOnView({
  children,
  className,
  delay = 0,
  duration = 600,
}: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.3, once: true });
  const prefersReducedMotion = usePrefersReducedMotion();

  const isRevealed = prefersReducedMotion || isInView;

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: prefersReducedMotion ? '0ms' : `${duration}ms`,
        transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
      }}
      className={cn(
        'transition-all ease-out',
        isRevealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none',
        className
      )}
    >
      {children}
    </div>
  );
}
