import { familyMemories } from '@/features/memories/data/memories';
import MemoryCard from '@/components/molecules/MemoryCard';

export default function MemoryGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
      {familyMemories.map((memory) => (
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
