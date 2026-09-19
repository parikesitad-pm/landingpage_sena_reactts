import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';
import MemoryGallery from '@/features/memories/components/MemoryGallery';
import { useTranslation } from 'react-i18next';

export default function MemoriesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="memories"
      className="py-20 sm:py-28 bg-[var(--surface)] border-t border-[var(--border)] scroll-mt-16 sm:scroll-mt-20 transition-colors"
      aria-labelledby="memories-title"
    >
      <Container size="lg">
        <SectionTitle
          eyebrow={t('memories.eyebrow')}
          title={t('memories.title')}
          description={t('memories.subtitle')}
          align="center"
        />

        <div className="mt-12">
          <MemoryGallery />
        </div>
      </Container>
    </section>
  );
}
