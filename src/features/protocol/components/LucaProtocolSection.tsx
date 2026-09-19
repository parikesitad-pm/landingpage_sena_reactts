import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, Sparkles, Scale, HeartHandshake } from 'lucide-react';
import Container from '@/components/atoms/Container';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface RuleItem {
  id: string;
  canonical: string;
  noteKey: string;
}

const RULES: RuleItem[] = [
  {
    id: '01',
    canonical: 'Sayang sama Momo.',
    noteKey: 'lucaProtocol.rules.01.note',
  },
  {
    id: '02',
    canonical: 'Sayang sama Momo.',
    noteKey: 'lucaProtocol.rules.02.note',
  },
  {
    id: '03',
    canonical: 'Sayang sama Momo.',
    noteKey: 'lucaProtocol.rules.03.note',
  },
  {
    id: '04',
    canonical: 'Nurut sama Momo.',
    noteKey: 'lucaProtocol.rules.04.note',
  },
  {
    id: '05',
    canonical: 'Tunduk sama Popo.',
    noteKey: 'lucaProtocol.rules.05.note',
  },
];

export default function LucaProtocolSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  // Early trigger rootMargin for fast mobile scrolling (Requirement 15)
  const isInView = useInView(sectionRef, {
    threshold: 0.1,
    rootMargin: '0px 0px 15% 0px',
    once: true,
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  // Sequence steps 0..10
  // Step 1: Heading block
  // Step 2: Inline protocol row (+140ms)
  // Step 3: POPO APPROVED stamp lands (+260ms)
  // Step 4: Articles I-V divider (+250ms)
  // Steps 5..9: Rules 01..05 stagger (+70ms each)
  // Step 10: All complete
  const [step, setStep] = useState(prefersReducedMotion ? 10 : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStep(10);
      return;
    }

    if (!isInView || hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // STEP 1: Heading block
    timers.push(setTimeout(() => setStep(1), 0));
    // STEP 2: Inline protocol row (~140ms)
    timers.push(setTimeout(() => setStep(2), 140));
    // STEP 3: POPO APPROVED Stamp lands (~400ms)
    timers.push(setTimeout(() => setStep(3), 400));
    // STEP 4: Articles I-V divider (~650ms)
    timers.push(setTimeout(() => setStep(4), 650));
    // STEPS 5..9: Staggered rules 01..05 (70ms apart)
    timers.push(setTimeout(() => setStep(5), 720));
    timers.push(setTimeout(() => setStep(6), 790));
    timers.push(setTimeout(() => setStep(7), 860));
    timers.push(setTimeout(() => setStep(8), 930));
    timers.push(setTimeout(() => setStep(9), 1000));
    timers.push(setTimeout(() => setStep(10), 1100));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isInView, prefersReducedMotion]);

  const isVisible = (targetStep: number) =>
    prefersReducedMotion || step >= targetStep;

  return (
    <section
      ref={sectionRef}
      id="protocol"
      aria-label="Luca Protocol"
      className="py-20 sm:py-24 bg-[var(--surface-soft)] border-y border-[var(--border)] scroll-mt-16 sm:scroll-mt-20 transition-colors duration-300"
    >
      <Container>
        {/* ========================================================================= */}
        {/* 1. HEADING BLOCK FIRST (EYEBROW, TITLE, SUBTITLE)                          */}
        {/* ========================================================================= */}
        <div className="max-w-2xl mb-6 sm:mb-7">
          {/* Eyebrow */}
          <div
            className={cn(
              'transition-all duration-300',
              isVisible(1)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            )}
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-[#C98F55] uppercase block mb-2">
              {t('lucaProtocol.eyebrow')}
            </span>
          </div>

          {/* Title */}
          <h2
            className={cn(
              'text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-[var(--foreground)] tracking-tight mb-3 transition-all duration-300',
              isVisible(1)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            )}
          >
            {t('lucaProtocol.title')}
          </h2>

          {/* Subtitle / Description */}
          <p
            className={cn(
              'text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed transition-all duration-300',
              isVisible(1)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            )}
          >
            {t('lucaProtocol.subtitle')}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. FOUR INLINE PROTOCOL LINES (SINGLE HORIZONTAL GROUPED ROW)             */}
        {/* ========================================================================= */}
        <div
          className={cn(
            'mb-6 sm:mb-7 transition-all duration-300',
            isVisible(2)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          )}
        >
          <div className="inline-flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2.5 px-4 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] font-mono text-xs text-[var(--foreground)] shadow-xs select-none">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-[var(--accent)] font-semibold">&gt;</span>
              <span>protocol.version = &ldquo;1.0&rdquo;;</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-[var(--accent)] font-semibold">&gt;</span>
              <span>momo.love = Infinity;</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-[var(--accent)] font-semibold">&gt;</span>
              <span>authority.level = &ldquo;Popo&rdquo;;</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-[var(--accent)] font-semibold">&gt;</span>
              <span>appeal.allowed = false;</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. POPO APPROVED STAMP (APPEARS AFTER THE INLINE PROTOCOL ROW)             */}
        {/* ========================================================================= */}
        <div
          className={cn(
            'mb-10 sm:mb-12 transition-all duration-300',
            isVisible(3) ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            aria-hidden="true"
            className={cn(
              'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded border-2 border-dashed border-amber-600/70 dark:border-amber-400/70 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold tracking-widest uppercase select-none shadow-xs',
              isVisible(3)
                ? 'opacity-100 scale-100 -rotate-2 animate-stamp'
                : 'opacity-0 scale-115 rotate-0 pointer-events-none'
            )}
            style={{
              transformOrigin: 'center center',
            }}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{t('lucaProtocol.popoApproved')}</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. ARTICLES I — V & RULES 01..05                                         */}
        {/* ========================================================================= */}
        <div className="mb-12">
          {/* Articles Divider */}
          <div
            className={cn(
              'flex items-center gap-2 mb-4 font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider transition-all duration-300',
              isVisible(4) ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Articles I &ndash; V &middot; Non-Negotiable Decrees</span>
          </div>

          {/* The Five Rules Grid (Staggered Entrance) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {RULES.map((rule, idx) => {
              const ruleVisible = isVisible(5 + idx);
              const isRule05 = rule.id === '05';

              return (
                <div
                  key={rule.id}
                  className={cn(
                    'group relative p-4 sm:p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between',
                    ruleVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 pointer-events-none',
                    isRule05
                      ? 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/50 shadow-xs'
                      : 'bg-[var(--surface)] border-[var(--border)]'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs text-[var(--muted-foreground)]">
                      <span className="font-semibold text-[var(--foreground)]">
                        RULE {rule.id}
                      </span>
                      {isRule05 ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30">
                          FINAL AUTHORITY
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-soft)] border border-[var(--border)]">
                          CONST
                        </span>
                      )}
                    </div>

                    {/* Canonical Decree */}
                    <p
                      className={cn(
                        'font-mono font-bold text-base sm:text-lg leading-snug min-h-[3rem] flex items-start',
                        isRule05
                          ? 'text-amber-700 dark:text-amber-300 font-extrabold'
                          : 'text-[var(--foreground)]'
                      )}
                    >
                      {rule.canonical}
                    </p>
                  </div>

                  {/* Localized explanation note */}
                  <div className="mt-3 pt-3 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed">
                    {t(rule.noteKey)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supporting Policies: Anti-Bullying & Mischief Training */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Policy 1: House Protection Policy (Anti-Bullying) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-amber-700 dark:text-amber-400 mb-2 font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>{t('lucaProtocol.protection.eyebrow')}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-3">
                {t('lucaProtocol.protection.title')}
              </h3>
              <p className="text-[var(--muted-foreground)] text-sm sm:text-base leading-relaxed">
                {t('lucaProtocol.protection.text')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono bg-amber-500/10 text-amber-800 dark:text-amber-300 font-semibold border border-amber-500/20">
                {t('lucaProtocol.protection.tag')}
              </span>
              <code className="text-[11px] font-mono text-[var(--muted-foreground)]">
                outsideBullies = false;
              </code>
            </div>
          </div>

          {/* Policy 2: Mischief Training ("Belajar Nakal Sama Popo") */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] mb-2 font-semibold">
                <HeartHandshake className="w-4 h-4" />
                <span>{t('lucaProtocol.mischief.eyebrow')}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-3">
                {t('lucaProtocol.mischief.title')}
              </h3>

              {/* Canonical Quote */}
              <blockquote className="p-3.5 rounded-lg bg-[var(--surface-soft)] border-l-3 border-[var(--accent)] mb-3">
                <p className="font-mono text-sm sm:text-base font-semibold text-[var(--foreground)] italic">
                  &ldquo;{t('lucaProtocol.mischief.canonical')}&rdquo;
                </p>
                <cite className="block text-right font-mono text-xs text-[var(--muted-foreground)] mt-1 not-italic">
                  {t('lucaProtocol.mischief.quoteAuthor')}
                </cite>
              </blockquote>

              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                {t('lucaProtocol.mischief.supporting')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--surface-soft)] text-[var(--foreground)] font-medium border border-[var(--border)]">
                trainingGround = &ldquo;home&rdquo;;
              </span>
              <code className="text-[11px] font-mono text-[var(--muted-foreground)]">
                difficulty = &ldquo;unfair&rdquo;;
              </code>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
