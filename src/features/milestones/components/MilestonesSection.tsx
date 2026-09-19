import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';
import MilestoneTimeline from '@/features/milestones/components/MilestoneTimeline';
import { useTranslation } from 'react-i18next';

export default function MilestonesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="milestones"
      className="py-20 sm:py-28 bg-[var(--background)] scroll-mt-12 transition-colors"
      aria-labelledby="milestones-title"
    >
      <Container size="md">
        <SectionTitle
          eyebrow={t('milestones.eyebrow')}
          title={t('milestones.title')}
          description={t('milestones.subtitle')}
          align="center"
        />

        <div className="mt-12 bg-[var(--surface)] rounded-3xl p-6 sm:p-10 border border-[var(--border)] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <MilestoneTimeline />
        </div>
      </Container>
    </section>
  );
}
