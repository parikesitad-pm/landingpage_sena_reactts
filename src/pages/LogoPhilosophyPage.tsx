import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import LucaLogo from '@/components/atoms/LucaLogo';
import {
  Code,
  Compass,
  Sparkles,
  HeartHandshake,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import {
  pathPrefixToLocale,
  localeToPathPrefix,
} from '@/features/preferences/lib/locale';
import NotFoundPage from '@/pages/NotFoundPage';

export default function LogoPhilosophyPage() {
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
  const protocolPath = `/${prefix}/#protocol`;

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

  const values = [
    {
      title: t('brand.valCurious'),
      description: t('brand.valCuriousDesc'),
    },
    {
      title: t('brand.valGrowing'),
      description: t('brand.valGrowingDesc'),
    },
    {
      title: t('brand.valBrighter'),
      description: t('brand.valBrighterDesc'),
    },
    {
      title: t('brand.valPurpose'),
      description: t('brand.valPurposeDesc'),
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-[var(--background)] transition-colors">
        <Container size="lg">
          {/* Back link */}
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
          <div className="max-w-2xl text-left mb-12 scroll-reveal">
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
          <div className="bg-[var(--surface)] rounded-3xl p-8 sm:p-14 border border-[var(--border)] shadow-sm mb-14 text-center logo-scroll-reveal">
            <div className="max-w-md mx-auto py-6">
              <LucaLogo
                alt="LUCA — Muhammad Gabriel Luca Senna Logo"
                width={600}
                height={300}
                className="w-full mx-auto filter drop-shadow-xs"
              />
            </div>

            <div className="mt-8 pt-8 border-t border-[var(--border)] max-w-xl mx-auto">
              <span className="font-mono text-xs font-semibold text-[#C98F55] tracking-wider uppercase block mb-1">
                CORE PHILOSOPHY
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] font-sans">
                &ldquo;{t('brand.philosophy')}&rdquo;
              </p>
              <p className="mt-4 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                {t('brand.intro')}
              </p>
            </div>
          </div>

          {/* 4 Cards: Symbol Anatomy */}
          <div className="mb-14 text-left">
            <h2 className="text-2xl font-bold font-sans text-[var(--foreground)] mb-6 scroll-reveal">
              Symbol Anatomy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {meanings.map((item) => (
                <div
                  key={item.title}
                  className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs hover:border-[#C98F55]/60 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs font-semibold px-2 py-1 rounded-md bg-[var(--surface-soft)] text-[#C98F55]">
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

          {/* Guiding Values */}
          <div className="mb-14 bg-[var(--surface)] rounded-3xl p-8 sm:p-10 border border-[var(--border)]">
            <div className="text-center max-w-xl mx-auto mb-8 scroll-reveal">
              <span className="font-mono text-xs font-semibold text-[#C98F55] tracking-widest uppercase block mb-1">
                {t('brand.valuesEyebrow')}
              </span>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                {t('brand.valuesTitle')}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-2">
                {t('brand.valuesSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => (
                <div
                  key={val.title}
                  className="p-5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-sans text-base font-bold text-[var(--foreground)] mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C98F55]" />
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted-foreground)]">
              <span>{t('brand.taglineHuman')}</span>
              <span className="text-[#C98F55]">
                EST. 2025 &middot; Muhammad Gabriel Luca Senna
              </span>
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

          {/* Cross-Link to Luca Protocol on Homepage */}
          <div className="bg-[var(--surface)] rounded-2xl p-6 sm:p-8 border border-[var(--border)] text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--surface-soft)] text-[#C98F55] mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-sm font-serif italic text-[var(--foreground)] mb-1">
              The logo tells the story. The Protocol runs the house.
            </p>
            <p className="text-xs font-mono text-[var(--muted-foreground)] mb-5">
              authority.level = &quot;Popo&quot;; momo.love = Infinity;
            </p>
            <a
              href={protocolPath}
              className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#C98F55] hover:underline underline-offset-4"
            >
              <span>Read Luca Protocol &rarr;</span>
            </a>
          </div>

          {/* Return Home CTA */}
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
