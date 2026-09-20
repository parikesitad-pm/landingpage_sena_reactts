import { useTranslation } from 'react-i18next';
import { Sparkles, GitCommit, ArrowUpRight } from 'lucide-react';
import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';

interface ChangelogEntry {
  version: string;
  tagKey: string;
  titleKey: string;
  dateKey: string;
  noteKey: string;
  isUpcoming?: boolean;
}

const ENTRIES: ChangelogEntry[] = [
  {
    version: 'v0.1.0',
    tagKey: 'changelog.entries.v010.tag',
    titleKey: 'changelog.entries.v010.title',
    dateKey: 'changelog.entries.v010.date',
    noteKey: 'changelog.entries.v010.note',
  },
  {
    version: 'v0.7.x',
    tagKey: 'changelog.entries.v07x.tag',
    titleKey: 'changelog.entries.v07x.title',
    dateKey: 'changelog.entries.v07x.date',
    noteKey: 'changelog.entries.v07x.note',
  },
  {
    version: 'v1.0.0',
    tagKey: 'changelog.entries.v100.tag',
    titleKey: 'changelog.entries.v100.title',
    dateKey: 'changelog.entries.v100.date',
    noteKey: 'changelog.entries.v100.note',
  },
  {
    version: 'v1.x',
    tagKey: 'changelog.entries.v1x.tag',
    titleKey: 'changelog.entries.v1x.title',
    dateKey: 'changelog.entries.v1x.date',
    noteKey: 'changelog.entries.v1x.note',
  },
  {
    version: 'NEXT',
    tagKey: 'changelog.entries.next.tag',
    titleKey: 'changelog.entries.next.title',
    dateKey: 'changelog.entries.next.date',
    noteKey: 'changelog.entries.next.note',
    isUpcoming: true,
  },
];

export default function LucaChangelogSection() {
  const { t } = useTranslation();

  return (
    <section
      id="changelog"
      aria-label="Luca Changelog"
      className="py-20 sm:py-28 bg-[var(--surface-soft)] border-t border-[var(--border)] scroll-mt-16 sm:scroll-mt-20 transition-colors duration-300"
    >
      <Container size="md">
        <SectionTitle
          eyebrow={t('changelog.eyebrow')}
          title={t('changelog.title')}
          description={t('changelog.subtitle')}
          align="center"
        />

        {/* Release Entries Grid */}
        <div className="mt-12 space-y-3.5 sm:space-y-4">
          {ENTRIES.map((entry) => {
            const isNext = entry.isUpcoming;

            return (
              <div
                key={entry.version}
                className="group relative p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-200 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    {/* Version Tag */}
                    <span
                      className="font-mono text-xs font-bold px-2.5 py-1 rounded-md border tracking-wide select-none"
                      style={{
                        backgroundColor: isNext
                          ? 'var(--accent-soft)'
                          : 'var(--surface-soft)',
                        borderColor: isNext
                          ? 'var(--accent)'
                          : 'var(--border)',
                        color: isNext
                          ? 'var(--foreground-strong)'
                          : 'var(--accent-strong)',
                      }}
                    >
                      {entry.version}
                    </span>

                    {/* Tag / Category */}
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                      {t(entry.tagKey)}
                    </span>
                  </div>

                  {/* Date or Age Context */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted-foreground)]">
                    <GitCommit className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                    <span>{t(entry.dateKey)}</span>
                  </div>
                </div>

                {/* Entry Title */}
                <h3 className="text-lg sm:text-xl font-bold font-sans text-[var(--foreground)] mb-1.5 flex items-center gap-1.5">
                  <span>{t(entry.titleKey)}</span>
                  {isNext && (
                    <ArrowUpRight className="w-4 h-4 text-[var(--accent)] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </h3>

                {/* Narrative Note */}
                <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                  {t(entry.noteKey)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Status & Emotional Philosophy */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-[var(--border)] text-center flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] font-mono text-xs shadow-2xs select-none">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-[var(--muted-foreground)]">status =&nbsp;</span>
            <span className="text-[var(--accent)] font-semibold">&ldquo;growing&rdquo;;</span>
          </div>

          <p className="text-sm sm:text-base font-medium text-[var(--foreground)] max-w-md mx-auto leading-relaxed">
            {t('changelog.closing')}
          </p>
        </div>
      </Container>
    </section>
  );
}
