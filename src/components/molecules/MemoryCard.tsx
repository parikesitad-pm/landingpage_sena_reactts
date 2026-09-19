import type { Memory } from '@/types/memory';
import ResponsiveImage from '@/components/atoms/ResponsiveImage';
import { cn } from '@/lib/utils';

export interface MemoryCardProps {
  memory: Memory;
  aspectRatio?: 'portrait' | 'square' | 'landscape' | 'auto';
  className?: string;
  sizes?: string;
}

export default function MemoryCard({
  memory,
  aspectRatio = 'portrait',
  className,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: MemoryCardProps) {
  const aspectClasses = {
    portrait: 'aspect-[4/5]',
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    auto: 'aspect-auto',
  };

  return (
    <figure
      className={cn(
        'group relative flex flex-col bg-[var(--surface)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300',
        className
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden w-full bg-[var(--surface-soft)]',
          aspectClasses[aspectRatio]
        )}
      >
        <ResponsiveImage
          basePath={memory.image}
          alt={memory.alt}
          sizes={sizes}
          className="w-full h-full"
          imgClassName="group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      <figcaption className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <p className="text-sm sm:text-base font-medium text-[var(--foreground)] leading-snug">
          {memory.caption}
        </p>

        {memory.date && (
          <time
            dateTime={memory.date}
            className="mt-3 font-mono text-xs text-[var(--muted-foreground)] tracking-wider block"
          >
            {memory.date}
          </time>
        )}
      </figcaption>
    </figure>
  );
}
