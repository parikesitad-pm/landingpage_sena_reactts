import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  asAnchor?: boolean;
  href?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  asAnchor,
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 shadow-sm hover:shadow active:scale-[0.98]',
    secondary:
      'bg-[var(--surface-soft)] text-[var(--foreground)] hover:bg-[var(--border)] active:scale-[0.98]',
    outline:
      'border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-soft)] hover:border-[var(--accent)] active:scale-[0.98]',
    ghost:
      'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-soft)] active:scale-[0.98]',
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (asAnchor && href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
