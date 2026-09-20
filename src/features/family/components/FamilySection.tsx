import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';
import ResponsiveImage from '@/components/atoms/ResponsiveImage';
import TypingText from '@/components/atoms/TypingText';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FamilySection() {
  const { t } = useTranslation();

  return (
    <section
      id="family"
      className="py-20 sm:py-28 bg-[var(--background)] border-t border-[var(--border)] scroll-mt-16 sm:scroll-mt-20 transition-colors"
      aria-labelledby="family-title"
    >
      <Container size="lg">
        <div className="scroll-reveal">
          <SectionTitle
            eyebrow={t('family.eyebrow')}
            title={t('family.title')}
            description={t('family.description')}
            align="center"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Popo Photo */}
          <div className="md:col-span-3 flex flex-col items-center">
            <figure className="w-full bg-[var(--surface)] p-3 rounded-2xl border border-[var(--border)] shadow-xs">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-[var(--surface-soft)]">
                <ResponsiveImage
                  basePath="/images/senna/popo"
                  alt="Popo"
                  width={1024}
                  height={1536}
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="w-full h-full"
                  imgClassName="object-cover object-center"
                />
              </div>
              <figcaption className="pt-3 text-center">
                <span className="font-sans text-sm font-semibold text-[var(--foreground)]">
                  <TypingText
                    text="Popo"
                    speed={45}
                    delay={150}
                    cursor
                    cursorChar="_"
                    cursorClassName="text-[var(--accent)]"
                    hideCursorOnComplete
                    cursorBlinkMsAfterComplete={400}
                  />
                </span>
                <span className="block font-mono text-xs text-[var(--muted-foreground)]">
                  {t('family.popoRole')}
                </span>
              </figcaption>
            </figure>
          </div>

          {/* Center Main: Senna with Popo & Momo */}
          <div className="md:col-span-6 flex flex-col items-center">
            <figure className="w-full bg-[var(--surface)] p-4 rounded-3xl border border-[var(--border)] shadow-md relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-[var(--surface-soft)]">
                <ResponsiveImage
                  basePath="/images/senna/senna-with-popo-and-momo"
                  alt="Senna spending time with Popo and Momo"
                  width={1254}
                  height={1254}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                  className="w-full h-full"
                  imgClassName="object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <figcaption className="pt-4 text-center">
                <div className="inline-flex items-center gap-1.5 text-[#C98F55] mb-1">
                  <Heart className="w-3.5 h-3.5 fill-[#C98F55]" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                    {t('family.togetherTag')}
                  </span>
                </div>
                <p className="font-sans text-base font-bold text-[var(--foreground)]">
                  {t('family.togetherTitle')}
                </p>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                  {t('family.togetherDesc')}
                </p>
              </figcaption>
            </figure>
          </div>

          {/* Momo Photo */}
          <div className="md:col-span-3 flex flex-col items-center">
            <figure className="w-full bg-[var(--surface)] p-3 rounded-2xl border border-[var(--border)] shadow-xs">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-[var(--surface-soft)]">
                <ResponsiveImage
                  basePath="/images/senna/momo"
                  alt="Momo"
                  width={1024}
                  height={1536}
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="w-full h-full"
                  imgClassName="object-cover object-center"
                />
              </div>
              <figcaption className="pt-3 text-center">
                <span className="font-sans text-sm font-semibold text-[var(--foreground)]">
                  <TypingText
                    text="Momo"
                    speed={45}
                    delay={300}
                    cursor
                    cursorChar="_"
                    cursorClassName="text-[var(--accent)]"
                    hideCursorOnComplete
                    cursorBlinkMsAfterComplete={400}
                  />
                </span>
                <span className="block font-mono text-xs text-[var(--muted-foreground)]">
                  {t('family.momoRole')}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Soft transition into the deeper family story */}
        <div className="mt-14 pt-8 border-t border-[var(--border)] text-center max-w-xl mx-auto">
          <p className="text-xs sm:text-sm font-sans text-[var(--muted-foreground)] leading-relaxed italic">
            {t(
              'family.bridge',
              "Before Luca's little adventures began, this family already carried a love that never left."
            )}
          </p>
        </div>
      </Container>
    </section>
  );
}
