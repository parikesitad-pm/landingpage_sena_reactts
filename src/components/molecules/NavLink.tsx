import type { AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  isActive?: boolean;
}

export default function NavLink({
  href,
  label,
  isActive = false,
  className,
  ...props
}: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'relative text-sm font-medium transition-colors py-1 px-2.5 rounded-md focus-visible:outline-2',
        isActive
          ? 'text-[var(--foreground-strong)] font-semibold'
          : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
        className
      )}
      {...props}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[var(--accent)] rounded-full" />
      )}
    </a>
  );
}
