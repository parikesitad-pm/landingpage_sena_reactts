import Container from '@/components/atoms/Container';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function RemembranceSection() {
  const { t } = useTranslation();

  return (
    <section
      id="family-legacy"
      className="py-16 sm:py-24 bg-[var(--background)] border-t border-[var(--border)] scroll-mt-12 transition-colors"
      aria-labelledby="remembrance-title"
    >
      <Container size="md">
        <div className="bg-[var(--surface)] rounded-3xl p-8 sm:p-12 border border-[var(--border)] shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden">
          {/* Subtle warm accent watermark icon */}
          <div className="absolute -right-6 -bottom-6 text-[var(--border)] opacity-40 pointer-events-none">
            <Heart className="w-36 h-36 stroke-[1]" />
          </div>

          <div className="relative z-10 max-w-xl text-left">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#C98F55] uppercase block mb-3">
              {t('remembrance.eyebrow')}
            </span>

            <h2
              id="remembrance-title"
              className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] font-sans tracking-tight mb-6"
            >
              {t('remembrance.title')}
            </h2>

            <div className="space-y-4 text-[var(--muted-foreground)] text-base sm:text-lg leading-relaxed">
              <p>{t('remembrance.p1')}</p>
              <p>{t('remembrance.p2')}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98F55]" />
              <span>{t('remembrance.tag')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
