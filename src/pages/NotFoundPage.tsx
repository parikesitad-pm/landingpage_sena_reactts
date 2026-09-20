import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Compass, Sparkles, ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import LogoMark from '@/components/atoms/LogoMark';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { localeToPathPrefix } from '@/features/preferences/lib/locale';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const { activeLocale } = usePreferences();
  const prefix = localeToPathPrefix(activeLocale);

  useEffect(() => {
    document.title = '404 · Page Not Found | LUCA';
  }, []);

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col items-center justify-center py-16 sm:py-24 px-4">
        <Container size="sm" className="text-center">
          {/* Logo Brand Mark */}
          <div className="flex justify-center mb-6">
            <LogoMark variant="compact" />
          </div>

          {/* 404 Badge with Gold ✦ */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-soft)] border border-[var(--border)] font-mono text-xs text-[var(--muted-foreground)] mb-6 select-none">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-bold text-[var(--foreground)]">404</span>
            <span>&middot;</span>
            <span className="text-[var(--accent)]">✦</span>
            <span>ERROR_NOT_FOUND</span>
          </div>

          {/* Large Warm 404 & Headline */}
          <div className="space-y-3 mb-6">
            <h1 className="text-6xl sm:text-7xl font-bold font-sans tracking-tight text-[var(--foreground)]">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--foreground-strong)]">
              {t('notFound.title')}
            </h2>
          </div>

          {/* Editorial Description */}
          <p className="text-[var(--muted-foreground)] text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-6">
            {t('notFound.description')}
          </p>

          {/* Technical Status Line */}
          <div className="mb-8 flex justify-center">
            <code className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)] font-mono text-xs shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[var(--accent)] animate-spin-slow" />
              <span className="text-[var(--muted-foreground)]">route.status =&nbsp;</span>
              <span className="text-[var(--accent)] font-semibold">&ldquo;lost&rdquo;;</span>
            </code>
          </div>

          {/* CTA & Tiny Code Joke */}
          <div className="flex flex-col items-center gap-3">
            <Link to={`/${prefix}/`}>
              <Button variant="primary" size="lg" className="gap-2 shadow-sm">
                <ArrowLeft className="w-4 h-4" />
                <span>{t('notFound.returnHome')}</span>
              </Button>
            </Link>

            <span className="font-mono text-[11px] text-[var(--muted-foreground)]/70 select-none">
              return home;
            </span>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
}
