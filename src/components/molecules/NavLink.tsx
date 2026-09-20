import type { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
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
  const isHashOrExternal = href.startsWith('http') || href.includes('#');

  const content = (
    <>
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[var(--accent)] rounded-full" />
      )}
    </>
  );

  const classes = cn(
    'relative text-sm font-medium transition-colors py-1 px-2.5 rounded-md focus-visible:outline-2',
    isActive
      ? 'text-[var(--foreground-strong)] font-semibold'
      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
    className
  );

  if (isHashOrExternal) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={classes}>
      {content}
    </Link>
  );
}
