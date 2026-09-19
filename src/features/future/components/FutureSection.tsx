import Container from '@/components/atoms/Container';
import { useTranslation } from 'react-i18next';
import { Terminal, Sparkles } from 'lucide-react';

export default function FutureSection() {
  const { t } = useTranslation();

  return (
    <section
      id="future"
      className="py-16 sm:py-24 bg-[var(--background)] border-t border-[var(--border)] scroll-mt-12 transition-colors"
      aria-labelledby="future-title"
    >
      <Container size="md">
        <div className="bg-[var(--surface)] rounded-3xl p-8 sm:p-12 border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-[#C98F55] mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold tracking-widest uppercase">
              {t('poposDream.eyebrow')}
            </span>
          </div>

          <h2
            id="future-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--foreground)] font-sans tracking-tight mb-4"
          >
            {t('poposDream.title')}
          </h2>

          <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-lg leading-relaxed mb-8">
            {t('poposDream.description')}
          </p>

          {/* JetBrains Mono Easter Egg distinguishing Popo's dream from Luca's freedom */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-[var(--surface-soft)] text-[var(--foreground)] px-5 py-3 rounded-2xl border border-[var(--border)] shadow-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#C98F55]" />
              <code className="font-mono text-xs text-[var(--muted-foreground)]">
                {t('poposDream.codeSource')}
              </code>
            </div>
            <span className="hidden sm:inline text-[var(--border)]">
              &bull;
            </span>
            <code className="font-mono text-xs font-semibold text-[#C98F55]">
              {t('poposDream.codePath')}
            </code>
          </div>
        </div>
      </Container>
    </section>
  );
}
