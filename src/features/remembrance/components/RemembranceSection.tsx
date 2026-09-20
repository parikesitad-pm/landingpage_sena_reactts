import { useRef } from 'react';
import Container from '@/components/atoms/Container';
import { Heart, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

export default function RemembranceSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2, once: true });
  const prefersReducedMotion = usePrefersReducedMotion();

  const isRevealed = prefersReducedMotion || isInView;

  return (
    <section
      ref={sectionRef}
      id="always-in-our-hearts"
      className="py-16 sm:py-24 bg-[var(--background)] border-t border-[var(--border)] scroll-mt-12 transition-colors"
      aria-labelledby="remembrance-title"
    >
      <Container size="md">
        <div
          style={{
            transitionDuration: prefersReducedMotion ? '0ms' : '700ms',
          }}
          className={cn(
            'bg-[var(--surface)] rounded-3xl p-8 sm:p-12 md:p-14 border border-[var(--border)] shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden transition-all ease-out',
            isRevealed
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          )}
        >
          {/* Subtle warm accent watermark icon */}
          <div className="absolute -right-6 -bottom-6 text-[var(--border)] opacity-30 pointer-events-none">
            <Heart className="w-40 h-40 stroke-[1]" />
          </div>

          <div className="relative z-10 max-w-xl text-left">
            {/* Eyebrow */}
            <span className="font-mono text-xs font-semibold tracking-widest text-[#C98F55] uppercase block mb-3">
              {t('remembrance.eyebrow', 'ALWAYS IN OUR HEARTS')}
            </span>

            {/* Main Headline */}
            <h2
              id="remembrance-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)] font-sans tracking-tight mb-4"
            >
              {t('remembrance.title', 'Before Luca, There Was Junior')}
            </h2>

            {/* Date Tag Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-soft)] border border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)] mb-6">
              <Calendar className="w-3.5 h-3.5 text-[#C98F55]" />
              <time dateTime="2023-04-10">
                {t('remembrance.dateText', '10 April 2023')}
              </time>
            </div>

            {/* Narrative Body */}
            <div className="space-y-4 text-[var(--muted-foreground)] text-base sm:text-lg leading-relaxed">
              <p>{t('remembrance.p1')}</p>
              <p>{t('remembrance.p2')}</p>

              {/* Key Quote — Emotional Pause */}
              <div
                style={{
                  transitionDuration: prefersReducedMotion ? '0ms' : '800ms',
                  transitionDelay: prefersReducedMotion ? '0ms' : '200ms',
                }}
                className={cn(
                  'my-7 pl-5 py-2 border-l-2 border-[#C98F55] bg-[var(--surface-soft)]/50 rounded-r-2xl transition-all ease-out',
                  isRevealed
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-3'
                )}
              >
                <blockquote className="font-sans text-lg sm:text-xl font-medium text-[var(--foreground)] italic leading-snug">
                  &ldquo;{t('remembrance.quote')}&rdquo;
                </blockquote>
              </div>

              <p>{t('remembrance.p3')}</p>
              <p>{t('remembrance.p4')}</p>
            </div>

            {/* Soft Transition Bridge into Luca's Brave Chapter */}
            <div className="mt-10 pt-6 border-t border-[var(--border)]">
              <p className="text-xs sm:text-sm font-sans text-[var(--muted-foreground)] leading-relaxed italic">
                {t('remembrance.bridge')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
