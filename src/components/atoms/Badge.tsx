import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'accent' | 'mono';
  dot?: boolean;
  children: ReactNode;
}

export default function Badge({
  variant = 'neutral',
  dot = false,
  children,
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    neutral:
      'bg-[var(--surface-soft)] text-[var(--foreground)] border border-[var(--border)]',
    accent:
      'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20',
    mono: 'font-mono bg-[var(--surface-soft)] text-[var(--foreground)] border border-[var(--border)] text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />}
      {children}
    </span>
  );
}
