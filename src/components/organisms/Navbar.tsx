import { useState } from 'react';
import { Menu } from 'lucide-react';
import LogoMark from '@/components/atoms/LogoMark';
import NavLink from '@/components/molecules/NavLink';
import MobileNavigation from '@/components/organisms/MobileNavigation';
import PreferencesMenu from '@/features/preferences/components/PreferencesMenu';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;
  const { t } = useTranslation();

  const navItems = [
    { label: t('nav.story'), href: '#story' },
    { label: t('nav.growingUp'), href: '#milestones' },
    { label: t('nav.memories'), href: '#memories' },
    { label: t('nav.family'), href: '#family' },
    { label: t('nav.brand'), href: '#brand-mark' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-[0_2px_10px_rgba(0,0,0,0.04)] py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <LogoMark />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        {/* Right side controls: Preferences menu + "For Senna" pill */}
        <div className="hidden md:flex items-center gap-3">
          <PreferencesMenu />

          <a
            href="#for-senna"
            className="text-xs font-mono font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] bg-[var(--surface-soft)] hover:bg-[var(--border)] px-3.5 py-1.5 rounded-full border border-[var(--border)] transition-colors"
          >
            {t('nav.forSenna')} &rarr;
          </a>
        </div>

        {/* Mobile controls: Preferences menu + menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <PreferencesMenu />

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-[var(--foreground)] hover:bg-[var(--surface-soft)] transition-colors focus-visible:outline-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}
