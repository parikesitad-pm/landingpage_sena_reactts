import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

interface MobileBackToTopProps {
  sentinelId?: string;
}

export default function MobileBackToTop({
  sentinelId = 'hero-scroll-sentinel',
}: MobileBackToTopProps) {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { lenis } = useSmoothScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hero / sentinel still visible -> Back to Top hidden
        // sentinel has moved above viewport (top <= 0) -> Back to Top visible
        const isPastHero =
          !entry.isIntersecting && entry.boundingClientRect.top <= 0;
        setIsVisible(isPastHero);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [sentinelId]);

  const handleScrollToTop = () => {
    if (prefersReducedMotion) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label={t('footer.backToTop')}
      title={t('footer.backToTop')}
      className={`lg:hidden fixed right-4 bottom-[calc(16px+env(safe-area-inset-bottom))] sm:right-6 sm:bottom-[calc(24px+env(safe-area-inset-bottom))] z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] text-[var(--accent)] hover:text-[var(--accent-strong)] hover:border-[var(--accent)]/60 shadow-md focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-2 scale-[0.96] pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 text-[var(--accent)] stroke-[2.25]" />
      <span className="sr-only">{t('footer.backToTop')}</span>
    </button>
  );
}
