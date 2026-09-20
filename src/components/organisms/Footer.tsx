import { ArrowUp, Heart } from 'lucide-react';
import LogoMark from '@/components/atoms/LogoMark';
import { siteContent } from '@/data/siteContent';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { localeToPathPrefix } from '@/features/preferences/lib/locale';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const { activeLocale } = usePreferences();
  const prefix = localeToPathPrefix(activeLocale);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--surface)] pt-12 sm:pt-16 pb-[calc(2.5rem+env(safe-area-inset-bottom))] lg:pb-16 text-[var(--muted-foreground)] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border)]">
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <LogoMark variant="compact" />
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
              {t('hero.description')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2">
            <a
              href={`/${prefix}/#story`}
              className="text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              {t('nav.story')}
            </a>
            <a
              href={`/${prefix}/#changelog`}
              className="text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              {t('nav.changelog')}
            </a>
            <Link
              to={`/${prefix}/moments`}
              className="text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              {t('nav.moments')}
            </Link>
            <a
              href={`/${prefix}/#family`}
              className="text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              {t('nav.family')}
            </a>
            <Link
              to={`/${prefix}/brand-mark`}
              className="text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors underline decoration-[var(--border)] underline-offset-4"
            >
              {t('footer.brandLink')}
            </Link>

            {/* Desktop-only back to top button to avoid duplicate floating control on mobile/tablet */}
            <button
              type="button"
              onClick={scrollToTop}
              className="hidden lg:inline-flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] bg-[var(--surface-soft)] hover:bg-[var(--border)] border border-[var(--border)] px-4 py-2 rounded-full transition-colors cursor-pointer focus-visible:outline-2 ml-2"
            >
              <span>{t('footer.backToTop')}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dedication Row */}
        <div className="pt-8 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#C98F55] fill-[#C98F55]" />
            <span>
              for{' '}
              <strong className="font-semibold text-[var(--foreground)]">
                Muhammad Gabriel Luca Senna
              </strong>
            </span>
          </div>

          {/* Build Signature */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <code className="text-[11px] font-mono text-[var(--muted-foreground)] bg-[var(--surface-soft)] px-3 py-1 rounded-md border border-[var(--border)] shadow-2xs">
              {siteContent.footer.portfolioMetadata}
            </code>
          </div>

          {/* Optional Closing Line */}
          <span className="font-mono text-[11px] text-[var(--muted-foreground)]/80 italic">
            &ldquo;Hello, World. Keep becoming.&rdquo;
          </span>

          {/* Copyright & Author Row */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-[var(--muted-foreground)]">
            <span>&copy; {currentYear} &middot; Our Little Senna</span>
            <span>&middot;</span>
            <span>{t('footer.crafted')}</span>
            <span>&middot;</span>
            <a
              href="https://github.com/parikesitad-pm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-2 transition-colors"
            >
              {t('footer.author')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
