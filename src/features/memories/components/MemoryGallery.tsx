import MemoryCard from '@/components/molecules/MemoryCard';
import { useTranslation } from 'react-i18next';
import type { Memory } from '@/types/memory';

export default function MemoryGallery() {
  const { t } = useTranslation();

  const localizedMemories: Memory[] = [
    {
      id: 'memory-moment-01',
      image: '/images/senna/senna-little-moment-01',
      alt: 'Muhammad Gabriel Luca Senna looking curiously during an everyday family moment',
      caption: t('memories.moment1'),
      category: 'everyday',
      featured: true,
    },
    {
      id: 'memory-moment-02',
      image: '/images/senna/senna-little-moment-02',
      alt: 'Luca enjoying an everyday family memory',
      caption: t('memories.moment2'),
      category: 'everyday',
      featured: true,
    },
    {
      id: 'memory-family',
      image: '/images/senna/senna-with-popo-and-momo',
      alt: 'Senna spending time with Popo and Momo',
      caption: t('memories.momentFamily'),
      category: 'family',
      featured: true,
    },
    {
      id: 'memory-recovery',
      image: '/images/senna/senna-setelah-dirawat',
      alt: 'Senna smiling happily after recovering from hospital care',
      caption: t('memories.momentRecovery'),
      category: 'recovery',
      featured: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
      {localizedMemories.map((memory) => (
        <MemoryCard
          key={memory.id}
          memory={memory}
          aspectRatio="portrait"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
        />
      ))}
    </div>
  );
}
