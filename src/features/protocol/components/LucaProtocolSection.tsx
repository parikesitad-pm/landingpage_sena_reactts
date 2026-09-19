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

  // Early trigger rootMargin for fast mobile scrolling (Requirement 15)
  const isInView = useInView(sectionRef, {
    threshold: 0.1,
    rootMargin: '0px 0px 15% 0px',
    once: true,
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  // Sequence steps 0..15
  // Step 1: Boot line 1
  // Step 2: Boot line 2 (+90ms)
  // Step 3: Boot line 3 (+90ms)
  // Step 4: Pause 120ms -> Eyebrow
  // Step 5: Title (+100ms)
  // Step 6: Subtitle (+100ms)
  // Step 7: Stamp lands (+120ms, duration 300ms)
  // Step 8: Punchline appeal.allowed = false (+300ms)
  // Step 9: Articles I-V divider (+120ms)
  // Steps 10..14: Rules 01..05 stagger (+70ms each)
  // Step 15: All complete
  const [step, setStep] = useState(prefersReducedMotion ? 15 : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStep(15);
      return;
    }

    if (!isInView || step > 0) return;

    // Trigger exact visual sequence
    const timers: ReturnType<typeof setTimeout>[] = [];

    // STEP 1: Boot line 1
    timers.push(setTimeout(() => setStep(1), 0));
    // Boot line 2 (~90ms)
    timers.push(setTimeout(() => setStep(2), 90));
    // Boot line 3 (~90ms)
    timers.push(setTimeout(() => setStep(3), 180));

    // STEP 2 & 3: Pause ~120ms -> Eyebrow
    timers.push(setTimeout(() => setStep(4), 300));
    // STEP 4: Title
    timers.push(setTimeout(() => setStep(5), 400));
    // STEP 5: Subtitle
    timers.push(setTimeout(() => setStep(6), 500));

    // STEP 6: POPO APPROVED Stamp lands
    timers.push(setTimeout(() => setStep(7), 620));

    // STEP 7: Stamp punchline appeal.allowed = false;
    timers.push(setTimeout(() => setStep(8), 920));

    // STEP 8: Articles I-V divider
    timers.push(setTimeout(() => setStep(9), 1040));

    // STEP 9: Staggered rules 01..05 (70ms apart)
    timers.push(setTimeout(() => setStep(10), 1110));
    timers.push(setTimeout(() => setStep(11), 1180));
    timers.push(setTimeout(() => setStep(12), 1250));
    timers.push(setTimeout(() => setStep(13), 1320));
    timers.push(setTimeout(() => setStep(14), 1390));
    timers.push(setTimeout(() => setStep(15), 1500));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isInView, prefersReducedMotion, step]);

  const isVisible = (targetStep: number) => prefersReducedMotion || step >= targetStep;

  return (
    <section
      ref={sectionRef}
      id="protocol"
      aria-label="Luca Protocol"
      className="py-20 sm:py-24 bg-[var(--surface-soft)] border-y border-[var(--border)] scroll-mt-16 sm:scroll-mt-20 transition-colors duration-300"
    >
      <Container>
        {/* ========================================================================= */}
        {/* STEP 1: PROTOCOL BOOT SEQUENCE (MUST APPEAR BEFORE TITLE - LOCKED ORDER)  */}
        {/* ========================================================================= */}
        <div
          className="mb-8 p-3.5 sm:p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] font-mono text-xs shadow-xs select-none"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-[var(--muted-foreground)]">
            {/* Boot line 1 */}
            <div
              className={cn(
                'flex items-center gap-1.5 transition-all duration-200 text-[var(--accent)] font-semibold',
                isVisible(1) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              )}
            >
              <span className="opacity-70">&gt;</span>
              <span>protocol.version = &ldquo;1.0&rdquo;;</span>
              {step === 1 && <span className="animate-pulse">▌</span>}
            </div>

            {/* Boot line 2 */}
            <div
              className={cn(
                'flex items-center gap-1.5 transition-all duration-200 text-[var(--foreground)]',
                isVisible(2) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              )}
            >
              <span className="text-[var(--accent)] opacity-70">&gt;</span>
              <span>momo.love = Infinity;</span>
              {step === 2 && (
                <span className="text-[var(--accent)] animate-pulse">▌</span>
              )}
            </div>

            {/* Boot line 3 */}
            <div
              className={cn(
                'flex items-center gap-1.5 transition-all duration-200 text-[var(--foreground)]',
                isVisible(3) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              )}
            >
              <span className="text-[var(--accent)] opacity-70">&gt;</span>
              <span>authority.level = &ldquo;Popo&rdquo;;</span>
              {step === 3 && (
                <span className="text-[var(--accent)] animate-pulse">▌</span>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEPS 3..7: TITLE, DESCRIPTION, STAMP & PUNCHLINE                        */}
        {/* ========================================================================= */}
        <div className="relative mb-12 sm:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              {/* STEP 3: Eyebrow */}
              <div
                className={cn(
                  'transition-all duration-300',
                  isVisible(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                )}
              >
                <span className="font-mono text-xs font-semibold tracking-widest text-[#C98F55] uppercase block mb-2">
                  {t('lucaProtocol.eyebrow')}
                </span>
              </div>

              {/* STEP 4: Title */}
              <h2
                className={cn(
                  'text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-[var(--foreground)] tracking-tight mb-3 transition-all duration-300',
                  isVisible(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                )}
              >
                {t('lucaProtocol.title')}
              </h2>

              {/* STEP 5: Description */}
              <p
                className={cn(
                  'text-base sm:text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed transition-all duration-300',
                  isVisible(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                )}
              >
                {t('lucaProtocol.subtitle')}
              </p>
            </div>

            {/* Stamp & Punchline Container */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 self-start lg:self-auto">
              {/* STEP 6: POPO APPROVED Stamp with physical impact */}
              <div
                aria-hidden="true"
                className={cn(
                  'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded border-2 border-dashed border-amber-600/70 dark:border-amber-400/70 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold tracking-widest uppercase select-none shadow-xs transition-all duration-300',
                  isVisible(7)
                    ? 'opacity-100 scale-100 -rotate-2'
                    : 'opacity-0 scale-115 rotate-0 pointer-events-none'
                )}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{t('lucaProtocol.popoApproved')}</span>
              </div>

              {/* STEP 7: Stamp Punchline (immediately follows stamp landing) */}
              <div
                className={cn(
                  'font-mono text-xs font-semibold px-3 py-1.5 rounded bg-rose-500/10 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20 transition-all duration-200 select-none',
                  isVisible(8) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                )}
              >
                <code>appeal.allowed = false;</code>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 8 & 9: ARTICLES I — V & RULES 01..05                                 */}
        {/* ========================================================================= */}
        <div className="mb-12">
          {/* STEP 8: Articles Divider */}
          <div
            className={cn(
              'flex items-center gap-2 mb-4 font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider transition-all duration-300',
              isVisible(9) ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Articles I &ndash; V &middot; Non-Negotiable Decrees</span>
          </div>

          {/* STEP 9: The Five Rules Grid (Staggered Entrance) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {RULES.map((rule, idx) => {
              const ruleVisible = isVisible(10 + idx);
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
                    <div className="font-mono font-bold text-base sm:text-lg leading-snug min-h-[3rem] flex items-start">
                      <span className="sr-only">{rule.canonical}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          isRule05
                            ? 'text-amber-700 dark:text-amber-300 font-extrabold'
                            : 'text-[var(--foreground)]'
                        )}
                      >
                        {rule.canonical}
                      </span>
                    </div>
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
