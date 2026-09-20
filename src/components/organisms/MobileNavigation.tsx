import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import LogoMark from '@/components/atoms/LogoMark';
import { Link } from 'react-router-dom';

import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { localeToPathPrefix } from '@/features/preferences/lib/locale';

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
}

export default function MobileNavigation({
  isOpen,
  onClose,
  navItems,
}: MobileNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeLocale } = usePreferences();
  const prefix = localeToPathPrefix(activeLocale);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-start md:hidden"
    >
      <div
        ref={containerRef}
        className="w-full bg-[var(--surface)] border-b border-[var(--border)] shadow-xl px-6 py-5 transition-all text-left"
      >
        <div className="flex items-center justify-between pb-5 border-b border-[var(--border)]">
          <LogoMark />
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-soft)] focus-visible:outline-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 py-6">
          {navItems.map((item) => {
            const isHash =
              item.href.includes('#') || item.href.startsWith('http');
            if (isHash) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="px-3 py-3 text-lg font-medium text-[var(--foreground)] hover:text-[#C98F55] hover:bg-[var(--surface-soft)] rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="px-3 py-3 text-lg font-medium text-[var(--foreground)] hover:text-[#C98F55] hover:bg-[var(--surface-soft)] rounded-xl transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center text-xs font-mono text-[var(--muted-foreground)]">
          <span className="font-semibold text-[var(--foreground)]">
            LUCA &middot; EST. 2025
          </span>
          <Link
            to={`/${prefix}/brand-mark`}
            onClick={onClose}
            className="text-[#C98F55] hover:underline"
          >
            {navItems.find((i) => i.href.includes('brand-mark'))?.label ||
              'The Mark'}{' '}
            &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
