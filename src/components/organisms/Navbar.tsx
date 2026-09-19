import { useState } from 'react';
import { Menu } from 'lucide-react';
import LogoMark from '@/components/atoms/LogoMark';
import NavLink from '@/components/molecules/NavLink';
import MobileNavigation from '@/components/organisms/MobileNavigation';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Story', href: '#story' },
  { label: 'Growing Up', href: '#milestones' },
  { label: 'Memories', href: '#memories' },
  { label: 'Family', href: '#family' },
  { label: 'The Mark', href: '#brand-mark' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-[#FFFDF8]/90 backdrop-blur-md border-b border-[#E7E0D6]/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <LogoMark />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        {/* Action / Portfolio pill */}
        <div className="hidden md:flex items-center">
          <a
            href="#for-senna"
            className="text-xs font-mono font-medium text-[#73706A] bg-[#F2ECE1]/80 hover:bg-[#EAE2D4] px-3.5 py-1.5 rounded-full border border-[#E2D8C7] transition-colors"
          >
            For Senna &rarr;
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-lg text-[#2F3437] hover:bg-[#F2ECE1] transition-colors focus-visible:outline-2"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={NAV_ITEMS}
      />
    </header>
  );
}
