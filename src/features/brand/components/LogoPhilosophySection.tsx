import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';
import LucaLogo from '@/components/atoms/LucaLogo';
import { Code, Compass, Sparkles, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LogoPhilosophySection() {
  const { t } = useTranslation();

  const meanings = [
    {
      title: t('brand.createTitle'),
      symbol: '< >',
      description: t('brand.createDesc'),
      icon: <Code className="w-5 h-5 text-[#C98F55]" />,
    },
    {
      title: t('brand.wonderTitle'),
      symbol: '✦',
      description: t('brand.wonderDesc'),
      icon: <Sparkles className="w-5 h-5 text-[#C98F55]" />,
    },
    {
      title: t('brand.exploreTitle'),
      symbol: 'Orbit',
      description: t('brand.exploreDesc'),
      icon: <Compass className="w-5 h-5 text-[#C98F55]" />,
    },
    {
      title: t('brand.becomeTitle'),
      symbol: 'Hello, World.',
      description: t('brand.becomeDesc'),
      icon: <HeartHandshake className="w-5 h-5 text-[#C98F55]" />,
    },
  ];

  const values = [
    {
      title: t('brand.valCurious'),
      description: t('brand.valCuriousDesc'),
    },
    {
      title: t('brand.valGrowing'),
      description: t('brand.valGrowingDesc'),
    },
    {
      title: t('brand.valBrighter'),
      description: t('brand.valBrighterDesc'),
    },
    {
      title: t('brand.valPurpose'),
      description: t('brand.valPurposeDesc'),
    },
  ];

  return (
    <section
      id="brand-mark"
      className="py-20 sm:py-32 bg-[var(--surface-soft)] border-t border-[var(--border)] scroll-mt-12 transition-colors"
      aria-labelledby="logo-philosophy-title"
    >
      <Container size="lg">
        {/* Section Heading */}
        <SectionTitle
          eyebrow={t('brand.eyebrow')}
          title={t('brand.title')}
          description={t('brand.intro')}
          align="center"
        />

        {/* Hero Logo Card Preview */}
        <div className="mt-8 mb-16 bg-[var(--surface)] rounded-3xl p-8 sm:p-14 border border-[var(--border)] shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col items-center text-center relative overflow-hidden">
          {/* Ambient decorative border */}
          <div className="absolute inset-2 sm:inset-3 border border-[var(--border)] rounded-2xl pointer-events-none opacity-60" />

          {/* Actual Approved Logo Artwork */}
          <div className="relative z-10 max-w-md w-full py-4 px-2">
            <LucaLogo
              alt="LUCA — Muhammad Gabriel Luca Senna Logo Artwork"
              width={600}
              height={300}
              className="w-full h-auto object-contain mx-auto filter drop-shadow-xs"
            />
          </div>

          {/* Core Philosophy Statement */}
          <div className="mt-6 pt-6 border-t border-[var(--border)] relative z-10 max-w-xl">
            <p className="font-sans text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
              &ldquo;{t('brand.philosophy')}&rdquo;
            </p>
            <p className="mt-3 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              {t('brand.narrativeIntro')}
            </p>
          </div>
        </div>

        {/* 4 Meaning Blocks: Create, Wonder, Explore, Become */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {meanings.map((block) => (
            <div
              key={block.title}
              className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] shadow-xs hover:border-[#C98F55]/60 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center">
                    {block.icon}
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-soft)] text-[#C98F55]">
                    {block.symbol}
                  </span>
                </div>

                <h3 className="font-sans text-lg font-bold text-[var(--foreground)] mb-2">
                  {block.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {block.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)]">
                <span className="font-mono text-[10px] text-[var(--muted-foreground)] tracking-widest uppercase">
                  Symbolic Meaning
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Core Values & "Build With Purpose" Detail */}
        <div className="mt-16 bg-[var(--surface)] rounded-3xl p-8 sm:p-10 border border-[var(--border)]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-mono text-xs font-semibold text-[#C98F55] tracking-widest uppercase block mb-1">
              {t('brand.valuesEyebrow')}
            </span>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              {t('brand.valuesTitle')}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">
              {t('brand.valuesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="p-5 rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-sans text-base font-bold text-[var(--foreground)] mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C98F55]" />
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted-foreground)]">
            <span>{t('brand.taglineHuman')}</span>
            <span className="text-[#C98F55]">
              EST. 2025 &middot; Muhammad Gabriel Luca Senna
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
