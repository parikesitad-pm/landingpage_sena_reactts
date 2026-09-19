import Container from '@/components/atoms/Container';
import { useTranslation } from 'react-i18next';
import { Heart, Sparkles, Compass } from 'lucide-react';

export default function FamilyHopeSection() {
  const { t } = useTranslation();

  return (
    <section
      id="our-hope"
      className="py-24 sm:py-36 bg-[var(--surface-soft)] border-t border-[var(--border)] scroll-mt-12 transition-colors"
      aria-labelledby="family-hope-title"
    >
      <Container size="md">
        <div className="bg-[var(--surface)] rounded-3xl p-8 sm:p-14 lg:p-16 border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.03)] text-center relative overflow-hidden">
          {/* Subtle celestial watermark */}
          <div className="absolute -top-10 -left-10 text-[var(--border)] opacity-30 pointer-events-none">
            <Compass className="w-48 h-48 stroke-[0.7]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4 text-[#C98F55]">
              <Sparkles className="w-4 h-4" />
              <span className="font-mono text-xs font-semibold tracking-widest uppercase">
                {t('hopes.eyebrow')}
              </span>
            </div>

            {/* Main Section Heading */}
            <h2
              id="family-hope-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-[var(--foreground)] tracking-tight mb-6"
            >
              {t('hopes.title')}
            </h2>

            {/* Large Guiding Statement */}
            <div className="mb-10 pb-8 border-b border-[var(--border)]">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-sans text-[var(--foreground)] tracking-tight leading-snug">
                &ldquo;{t('hopes.headline')}&rdquo;
              </p>
              <p className="mt-3 font-mono text-xs sm:text-sm text-[#C98F55] tracking-wide font-medium">
                {t('hopes.pillars')}
              </p>
            </div>

            {/* Emotional Narrative Body */}
            <div className="space-y-6 text-left text-[var(--muted-foreground)] text-base sm:text-lg leading-relaxed font-normal">
              <p className="font-medium text-[var(--foreground)]">
                {t('hopes.p1')}
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] italic text-[var(--foreground)]">
                <p>{t('hopes.p2')}</p>
              </div>

              <p>{t('hopes.p3')}</p>

              <p>{t('hopes.p4')}</p>

              <p className="font-medium text-[var(--foreground)]">
                {t('hopes.p5')}
              </p>
            </div>

            {/* Benediction */}
            <div className="mt-12 pt-8 border-t border-[var(--border)]">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--surface-soft)] text-[#C98F55] mb-3">
                <Heart className="w-4 h-4 fill-[#C98F55]" />
              </div>
              <p className="font-serif italic text-lg sm:text-xl text-[var(--foreground)] max-w-xl mx-auto leading-relaxed">
                &ldquo;{t('hopes.benediction')}&rdquo;
              </p>

              <div className="mt-8 flex flex-col items-center gap-3">
                <span className="font-mono text-sm font-semibold tracking-wider text-[#C98F55]">
                  {t('hopes.philosophySignature')}
                </span>
                <code className="text-xs font-mono text-[var(--muted-foreground)] bg-[var(--surface-soft)] px-3 py-1 rounded-md border border-[var(--border)]">
                  {t('hopes.easterEgg')}
                </code>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
