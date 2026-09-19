import MilestoneCard from '@/components/molecules/MilestoneCard';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { formatLocalizedDate, formatLocalizedAge } from '@/i18n/formatters';
import type { Milestone } from '@/types/milestone';

export default function MilestoneTimeline() {
  const { t } = useTranslation();
  const { activeLocale } = usePreferences();

  const birthDateFormatted = formatLocalizedDate('2025-02-13', activeLocale);
  const oneYearDateFormatted = formatLocalizedDate('2026-02-13', activeLocale);
  const sevenMonthsAge = formatLocalizedAge(
    { years: 0, months: 7, days: 0 },
    activeLocale
  );
  const oneYearAge = formatLocalizedAge(
    { years: 1, months: 0, days: 0 },
    activeLocale
  );

  const localizedMilestones: Milestone[] = [
    {
      id: 'hello-world',
      title: t('milestones.helloWorld'),
      description: t('milestones.helloWorldDesc'),
      date: birthDateFormatted,
      icon: 'birth',
      confirmed: true,
    },
    {
      id: 'tiny-teeth',
      title: t('milestones.tinyTeeth'),
      description: t('milestones.tinyTeethDesc'),
      ageText: `~${sevenMonthsAge}`,
      icon: 'tooth',
      confirmed: true,
    },
    {
      id: 'brave-chapter',
      title: t('milestones.braveChapter'),
      description: t('milestones.braveChapterDesc'),
      icon: 'health',
      confirmed: true,
    },
    {
      id: 'first-steps',
      title: t('milestones.firstSteps'),
      description: t('milestones.firstStepsDesc'),
      ageText: `~${oneYearAge}`,
      icon: 'steps',
      confirmed: true,
    },
    {
      id: 'one-whole-year',
      title: t('milestones.oneYear'),
      description: t('milestones.oneYearDesc'),
      date: oneYearDateFormatted,
      icon: 'birthday',
      confirmed: true,
    },
    {
      id: 'future-adventures',
      title: t('milestones.backToAdventures'),
      description: t('milestones.backToAdventuresDesc'),
      icon: 'family',
      confirmed: true,
    },
  ];

  return (
    <div className="relative max-w-2xl mx-auto pl-2 sm:pl-4 text-left">
      {localizedMilestones.map((milestone, idx) => (
        <MilestoneCard
          key={milestone.id}
          milestone={milestone}
          isLast={idx === localizedMilestones.length - 1}
        />
      ))}

      {/* Continuation node */}
      <div className="flex items-start gap-4 sm:gap-6 pt-2">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--surface-soft)] border border-[var(--border)] text-[#C98F55]">
          <Clock className="w-4 h-4 animate-pulse" />
        </div>
        <div className="pt-1.5 pb-4">
          <p className="text-sm sm:text-base font-semibold text-[var(--foreground)]">
            {t('milestones.endingText')}
          </p>
          <span className="font-mono text-xs text-[#C98F55] tracking-wider uppercase">
            {t('milestones.continuedText')}
          </span>
        </div>
      </div>
    </div>
  );
}
