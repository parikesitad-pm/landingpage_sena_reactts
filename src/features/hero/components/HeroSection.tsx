import { useState } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ResponsiveImage from '@/components/atoms/ResponsiveImage';
import TypingText from '@/components/atoms/TypingText';
import { siteContent } from '@/data/siteContent';
import { calculateAge } from '@/lib/age';
import { useTranslation } from 'react-i18next';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { localeToPathPrefix } from '@/features/preferences/lib/locale';
import { Link } from 'react-router-dom';
import { formatLocalizedDate, formatLocalizedAge } from '@/i18n/formatters';

export default function HeroSection() {
  const { t } = useTranslation();
  const { activeLocale } = usePreferences();
  const prefix = localeToPathPrefix(activeLocale);
  const [heroLine1Done, setHeroLine1Done] = useState(false);
  const age = calculateAge(siteContent.child.birthDate);
  const localizedAge = formatLocalizedAge(age, activeLocale);
  const localizedBirthDate = formatLocalizedDate(
    siteContent.child.birthDate,
    activeLocale
  );

  return (
    <section
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-8 pb-16 overflow-hidden transition-colors"
      aria-labelledby="hero-title"
    >
      {/* Gentle background ambient dots & delicate lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="15%" cy="20%" r="3" fill="#C98F55" opacity="0.4" />
          <circle cx="85%" cy="30%" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="75%" cy="75%" r="4" fill="#C98F55" opacity="0.3" />
          <circle cx="10%" cy="80%" r="2.5" fill="#C98F55" opacity="0.25" />
          <path
            d="M 60 100 Q 180 50 300 120"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.15"
          />
        </svg>
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left / Editorial Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Badges & Logo Lockup */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] pl-2 pr-3.5 py-1 rounded-full shadow-xs">
                <img
                  src="/branding/luca-logo-mark.png"
                  alt=""
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain"
                />
                <span className="font-mono text-xs font-semibold tracking-wider text-[#C98F55]">
                  LUCA &middot; EST. 2025
                </span>
              </div>
              <Badge variant="accent" dot>
                {t('hero.eyebrow')}
              </Badge>
            </div>

            {/* Main H1 Title (single H1 on homepage) */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[var(--foreground)] font-sans leading-[1.1] min-h-[2.2em]"
            >
              <span className="sr-only">Muhammad Gabriel Luca Senna</span>
              <span aria-hidden="true" className="block">
                <TypingText
                  text="Muhammad Gabriel"
                  speed={42}
                  delay={250}
                  startOnView={false}
                  cursor={!heroLine1Done}
                  cursorChar="▌"
                  cursorClassName="text-[#C98F55]"
                  hideCursorOnComplete={true}
                  cursorBlinkMsAfterComplete={0}
                  onComplete={() => setHeroLine1Done(true)}
                  className="block"
                />
                <TypingText
                  text="Luca Senna"
                  speed={42}
                  delay={80}
                  active={heroLine1Done}
                  startOnView={false}
                  cursor={true}
                  cursorChar="▌"
                  cursorClassName="text-[#C98F55]"
                  hideCursorOnComplete={true}
                  cursorBlinkMsAfterComplete={700}
                  className="block text-[#C98F55] mt-1"
                />
              </span>
            </h1>

            {/* Semantic introductory entity context */}
            <p className="mt-4 text-xs sm:text-sm font-mono text-[var(--muted-foreground)] max-w-xl">
              {t('hero.introEntity')}
            </p>

            {/* Poetic description */}
            <p className="mt-5 text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-xl font-sans">
              {t('hero.description')}
            </p>

            {/* Metadata Pills: Localized Dynamic Age + Localized Birth Date */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] px-4 py-2 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C98F55]" />
                <span className="text-xs font-mono text-[var(--muted-foreground)]">
                  {t('hero.currentAge')}
                </span>
                <strong className="text-xs font-mono text-[var(--foreground)] font-semibold">
                  {localizedAge}
                </strong>
              </div>

              <div className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] px-4 py-2 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C98F55]" />
                <time
                  dateTime={siteContent.child.birthDate}
                  className="text-xs font-mono text-[var(--foreground)]"
                >
                  {localizedBirthDate}
                </time>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8 pt-2 flex flex-wrap items-center gap-4">
              <Button asAnchor href="#story" size="lg" className="group">
                <span>{t('hero.ctaExplore')}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </Button>

              <Link
                to={`/${prefix}/moments`}
                className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] px-4 py-3 rounded-full hover:bg-[var(--surface-soft)] transition-colors"
              >
                {t('hero.ctaMemories')} &rarr;
              </Link>
            </div>
          </div>

          {/* Right / Hero Editorial Frame Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Outer decorative card frame */}
              <div className="absolute -inset-3 bg-[var(--surface-soft)] rounded-3xl -rotate-1 shadow-sm" />
              <div className="absolute -inset-1 bg-[var(--border)] rounded-3xl rotate-1 opacity-50" />

              {/* Main Photo Container */}
              <div className="relative bg-[var(--surface)] p-3 sm:p-4 rounded-3xl border border-[var(--border)] shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--surface-soft)]">
                  <ResponsiveImage
                    basePath="/images/senna/muhammad-gabriel-luca-senna-hero"
                    alt="Portrait of Muhammad Gabriel Luca Senna"
                    priority={true}
                    width={1086}
                    height={1448}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 450px"
                    className="w-full h-full"
                    imgClassName="object-cover object-center"
                  />

                  {/* Corner Accent Badge with Symbol Mark */}
                  <div className="absolute bottom-3 right-3 bg-[var(--surface)]/90 backdrop-blur-xs pl-2 pr-3 py-1.5 rounded-full border border-[var(--border)] shadow-xs flex items-center gap-1.5">
                    <img
                      src="/branding/luca-logo-mark.png"
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="font-mono text-[11px] font-semibold text-[#C98F55] tracking-wider uppercase">
                      LUCA &middot; 2025
                    </span>
                  </div>
                </div>

                {/* Sub-caption below frame */}
                <div className="pt-3 px-1 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                  <span className="font-mono text-[11px]">
                    portrait.capture
                  </span>
                  <span className="font-mono text-[11px]">Luca</span>
                </div>
              </div>

              {/* Celestial SVG accents */}
              <div className="absolute -top-6 -right-6 text-[#C98F55] opacity-80 pointer-events-none">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -left-4 text-[#C98F55] opacity-60 pointer-events-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
