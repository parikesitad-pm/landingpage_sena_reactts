import { useTranslation } from 'react-i18next';
import { ShieldAlert, Sparkles, Scale, HeartHandshake } from 'lucide-react';
import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';

interface RuleItem {
  id: string;
  canonical: string;
  noteKey: string;
}

const RULES: RuleItem[] = [
  { id: '01', canonical: 'Sayang sama Momo.', noteKey: 'lucaProtocol.rules.01.note' },
  { id: '02', canonical: 'Sayang sama Momo.', noteKey: 'lucaProtocol.rules.02.note' },
  { id: '03', canonical: 'Sayang sama Momo.', noteKey: 'lucaProtocol.rules.03.note' },
  { id: '04', canonical: 'Nurut sama Momo.', noteKey: 'lucaProtocol.rules.04.note' },
  { id: '05', canonical: 'Tunduk sama Popo.', noteKey: 'lucaProtocol.rules.05.note' },
];

export default function LucaProtocolSection() {
  const { t } = useTranslation();

  return (
    <section
      id="protocol"
      aria-label="Luca Protocol"
      className="py-20 sm:py-24 bg-[var(--surface-soft)] border-y border-[var(--border)] transition-colors duration-300"
    >
      <Container>
        {/* Section Header */}
        <div className="relative mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <SectionTitle
                eyebrow={t('lucaProtocol.eyebrow')}
                title={t('lucaProtocol.title')}
                description={t('lucaProtocol.subtitle')}
                align="left"
                className="mb-0"
              />
            </div>

            {/* Playful Rubber Stamp */}
            <div className="self-start sm:self-auto flex items-center">
              <div
                aria-hidden="true"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border-2 border-dashed border-amber-600/60 dark:border-amber-400/60 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold tracking-widest uppercase -rotate-2 select-none shadow-xs"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{t('lucaProtocol.popoApproved')}</span>
              </div>
            </div>
          </div>

          {/* Protocol Metadata Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-4 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] font-mono text-xs text-[var(--muted-foreground)]">
            <span className="text-[var(--accent)] font-semibold">
              protocol.version = &ldquo;1.0&rdquo;;
            </span>
            <span className="hidden sm:inline text-[var(--border)]">&bull;</span>
            <span>momo.love = Infinity;</span>
            <span className="hidden sm:inline text-[var(--border)]">&bull;</span>
            <span>authority.level = &ldquo;Popo&rdquo;;</span>
            <span className="hidden sm:inline text-[var(--border)]">&bull;</span>
            <span className="text-rose-600 dark:text-rose-400 font-medium">appeal.allowed = false;</span>
          </div>
        </div>

        {/* The Five Rules Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Articles I &ndash; V &middot; Non-Negotiable Decrees</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {RULES.map((rule) => (
              <div
                key={rule.id}
                className="group relative p-4 sm:p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs text-[var(--muted-foreground)]">
                    <span className="font-semibold text-[var(--foreground)]">
                      RULE {rule.id}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-soft)] border border-[var(--border)]">
                      CONST
                    </span>
                  </div>
                  {/* Canonical Indonesian rule preserved in all locales */}
                  <p className="font-mono font-bold text-base sm:text-lg text-[var(--foreground)] leading-snug">
                    {rule.canonical}
                  </p>
                </div>

                {/* Localized explanation note */}
                <div className="mt-3 pt-3 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {t(rule.noteKey)}
                </div>
              </div>
            ))}
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
