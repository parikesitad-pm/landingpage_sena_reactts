import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';
import MemoryGallery from '@/features/memories/components/MemoryGallery';
import { siteContent } from '@/data/siteContent';

export default function MemoriesSection() {
  return (
    <section
      id="memories"
      className="py-20 sm:py-28 bg-[#FFFDF8] border-t border-[#E7E0D6] scroll-mt-12"
      aria-labelledby="memories-title"
    >
      <Container size="lg">
        <SectionTitle
          eyebrow={siteContent.memories.eyebrow}
          title={siteContent.memories.title}
          description={siteContent.memories.subtitle}
          align="center"
        />

        <div className="mt-12">
          <MemoryGallery />
        </div>
      </Container>
    </section>
  );
}
