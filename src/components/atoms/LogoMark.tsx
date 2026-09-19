import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import LucaLogo from '@/components/atoms/LucaLogo';

export interface LogoMarkProps {
  className?: string;
  variant?: 'full' | 'mark' | 'compact';
  height?: number;
}

export default function LogoMark({
  className,
  variant = 'compact',
  height = 36,
}: LogoMarkProps) {
  if (variant === 'full') {
    return (
      <Link
        to="/"
        className={cn('inline-block focus-visible:outline-2 group', className)}
        aria-label="Muhammad Gabriel Luca Senna - Home"
      >
        <LucaLogo
          alt="LUCA - Muhammad Gabriel Luca Senna Logo"
          width={280}
          height={140}
          className="h-auto w-auto max-h-16 group-hover:opacity-90 transition-opacity"
        />
      </Link>
    );
  }

  if (variant === 'mark') {
    return (
      <Link
        to="/"
        className={cn(
          'inline-flex items-center focus-visible:outline-2 group',
          className
        )}
        aria-label="Muhammad Gabriel Luca Senna - Home"
      >
        <img
          src="/branding/luca-logo-mark.png"
          alt="LUCA Symbol Mark"
          width={height}
          height={height}
          style={{ height: `${height}px`, width: `${height}px` }}
          className="object-contain group-hover:scale-105 transition-transform"
        />
      </Link>
    );
  }

  // "compact" (default for Navbar)
  return (
    <Link
      to="/"
      className={cn(
        'inline-flex items-center gap-2.5 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors focus-visible:outline-2 group',
        className
      )}
      aria-label="Muhammad Gabriel Luca Senna - Home"
    >
      <img
        src="/branding/luca-logo-mark.png"
        alt=""
        width={32}
        height={32}
        className="w-8 h-8 object-contain group-hover:rotate-6 transition-transform duration-300"
      />
      <div className="flex flex-col text-left">
        <span className="font-sans text-xl font-bold tracking-wider leading-none text-[var(--foreground-strong)] group-hover:text-[var(--accent)] transition-colors">
          LUCA
        </span>
        <span className="font-mono text-[9px] text-[var(--muted-foreground)] tracking-wider leading-tight uppercase">
          EST. 2025
        </span>
      </div>
    </Link>
  );
}
