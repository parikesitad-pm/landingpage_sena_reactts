import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';
import MilestoneTimeline from '@/features/milestones/components/MilestoneTimeline';
import { siteContent } from '@/data/siteContent';

export default function MilestonesSection() {
  return (
    <section
      id="milestones"
      className="py-20 sm:py-28 bg-[#F8F5EF] scroll-mt-12"
      aria-labelledby="milestones-title"
    >
      <Container size="md">
        <SectionTitle
          eyebrow={siteContent.milestones.eyebrow}
          title={siteContent.milestones.title}
          description={siteContent.milestones.subtitle}
          align="center"
        />

        <div className="mt-12 bg-[#FFFDF8] rounded-3xl p-6 sm:p-10 border border-[#E7E0D6] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <MilestoneTimeline />
        </div>
      </Container>
    </section>
  );
}
