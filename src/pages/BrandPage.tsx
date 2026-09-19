import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import LucaLogo from '@/components/atoms/LucaLogo';
import { siteContent } from '@/data/siteContent';
import {
  Code,
  Compass,
  Sparkles,
  HeartHandshake,
  ArrowLeft,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { pathPrefixToLocale } from '@/features/preferences/lib/locale';

export default function BrandPage() {
  const { lang } = useParams<{ lang?: string }>();
  const { setActiveLocaleOverride } = usePreferences();
  const { t } = useTranslation();
  const { brand } = siteContent;

  useEffect(() => {
    if (lang) {
      const resolved = pathPrefixToLocale(lang);
      if (resolved) {
        setActiveLocaleOverride(resolved);
      }
    }
  }, [lang, setActiveLocaleOverride]);

  const meanings = [
    {
      title: t('brand.createTitle'),
      symbol: '< >',
      description: t('brand.createDesc'),
      icon: <Code className="w-5 h-5 text-[#C98F55]" />,
    },
    {
      title: t('brand.wonderTitle'),
      symbol: '✦',
      description: t('brand.wonderDesc'),
      icon: <Sparkles className="w-5 h-5 text-[#C98F55]" />,
    },
    {
      title: t('brand.exploreTitle'),
      symbol: 'Orbit',
      description: t('brand.exploreDesc'),
      icon: <Compass className="w-5 h-5 text-[#C98F55]" />,
    },
    {
      title: t('brand.becomeTitle'),
      symbol: 'Hello, World.',
      description: t('brand.becomeDesc'),
      icon: <HeartHandshake className="w-5 h-5 text-[#C98F55]" />,
    },
  ];

  return (
    <MainLayout>
      <div className="py-16 sm:py-24 bg-[var(--background)] transition-colors">
        <Container size="lg">
          {/* Back link */}
          <div className="mb-8">
            <Link
              to={`/${pathPrefixToLocale(lang || '') ? lang : 'en'}/`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Editorial Header */}
          <div className="max-w-2xl text-left mb-12">
            <span className="font-mono text-xs font-semibold text-[#C98F55] tracking-widest uppercase block mb-2">
              {t('brand.eyebrow')}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-sans text-[var(--foreground)] tracking-tight">
              {t('brand.title')}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
              {t('brand.narrativeIntro')}
            </p>
          </div>

          {/* Primary Logo Showcase */}
          <div className="bg-[var(--surface)] rounded-3xl p-8 sm:p-14 border border-[var(--border)] shadow-sm mb-12 text-center">
            <div className="max-w-md mx-auto py-6">
              <LucaLogo
                alt="LUCA — Muhammad Gabriel Luca Senna Logo"
                width={600}
                height={300}
                className="w-full mx-auto"
              />
            </div>

            <div className="mt-8 pt-8 border-t border-[var(--border)] max-w-xl mx-auto">
              <span className="font-mono text-xs font-semibold text-[#C98F55] tracking-wider uppercase block mb-1">
                CORE PHILOSOPHY
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] font-sans">
                &ldquo;{brand.philosophy}&rdquo;
              </p>
              <p className="mt-4 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {brand.narrative.details}
              </p>
            </div>
          </div>

          {/* Symbol Anatomy */}
          <div className="mb-14 text-left">
            <h2 className="text-2xl font-bold font-sans text-[var(--foreground)] mb-6">
              Symbol Anatomy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {meanings.map((item) => (
                <div
                  key={item.title}
                  className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-soft)] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-mono text-sm font-bold text-[#C98F55]">
                      {item.symbol}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--foreground)] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why "Build With Purpose" */}
          <div className="bg-[var(--surface-soft)] rounded-3xl p-8 sm:p-10 border border-[var(--border)] mb-14 text-left">
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-[var(--foreground)] mb-3">
              Why &ldquo;Build With Purpose&rdquo;?
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-3xl">
              <p>
                &ldquo;Build With Purpose&rdquo; is never meant as a rigid
                expectation or prescribed destiny for Luca. It is simply a
                gentle value: that whatever he chooses to build or explore in
                life, he does so with care, empathy, and positive meaning for
                people.
              </p>
              <p>
                Whether he builds software as an engineer or explores other
                creative horizons, curiosity is at its best when it serves human
                kindness.
              </p>
            </div>
          </div>

          {/* Return Home CTA */}
          <div className="text-center pt-4">
            <Link to="/">
              <Button size="lg">{t('hero.ctaExplore')}</Button>
            </Link>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
}
