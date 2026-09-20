import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';
import Button from '@/components/atoms/Button';
import MemoryGallery from '@/features/memories/components/MemoryGallery';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import {
  pathPrefixToLocale,
  localeToPathPrefix,
} from '@/features/preferences/lib/locale';
import NotFoundPage from '@/pages/NotFoundPage';

export default function MomentsPage() {
  const { lang } = useParams<{ lang?: string }>();
  const { activeLocale, setActiveLocaleOverride } = usePreferences();
  const { t } = useTranslation();

  const isInvalidLocale =
    lang !== undefined && pathPrefixToLocale(lang) === null;

  useEffect(() => {
    if (isInvalidLocale) return;

    if (lang) {
      const resolved = pathPrefixToLocale(lang);
      if (resolved) {
        setActiveLocaleOverride(resolved);
      }
    }
  }, [lang, isInvalidLocale, setActiveLocaleOverride]);

  if (isInvalidLocale) {
    return <NotFoundPage />;
  }

  const prefix = localeToPathPrefix(activeLocale);
  const homePath = `/${prefix}/`;

  return (
    <div className="py-16 sm:py-24 bg-[var(--background)] transition-colors min-h-screen">
      <Container size="lg">
        {/* Top Back Link */}
        <div className="mb-8">
          <Link
            to={homePath}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('notFound.returnHome')}</span>
          </Link>
        </div>

        <div
          id="hero-scroll-sentinel"
          aria-hidden="true"
          className="h-px pointer-events-none"
        />

        {/* Editorial Header */}
        <div className="max-w-2xl text-left mb-12">
          <SectionTitle
            eyebrow={t('memories.eyebrow')}
            title={t('memories.title')}
            description={t('memories.subtitle')}
            align="left"
          />
        </div>

        {/* Photo Gallery Grid */}
        <div className="mt-8 mb-16">
          <MemoryGallery />
        </div>

        {/* Bottom Back / Navigation CTA */}
        <div className="text-center pt-8 border-t border-[var(--border)]">
          <Link to={homePath}>
            <Button size="lg" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>{t('notFound.returnHome')}</span>
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
