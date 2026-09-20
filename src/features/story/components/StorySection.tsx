import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';
import ResponsiveImage from '@/components/atoms/ResponsiveImage';
import { siteContent } from '@/data/siteContent';
import { Calendar, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { formatLocalizedDate } from '@/i18n/formatters';

export default function StorySection() {
  const { t } = useTranslation();
  const { activeLocale } = usePreferences();
  const localizedArrivalDate = formatLocalizedDate(
    siteContent.child.birthDate,
    activeLocale
  );

  return (
    <section
      id="story"
      className="py-20 sm:py-28 bg-[var(--surface)] border-y border-[var(--border)] scroll-mt-16 sm:scroll-mt-20 transition-colors"
      aria-labelledby="story-title"
    >
      <Container size="lg">
        <div className="scroll-reveal">
          <SectionTitle
            eyebrow={t('story.eyebrow')}
            title={t('story.title')}
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Newborn Photograph with editorial border */}
          <div className="md:col-span-5 flex justify-center">
            <figure className="relative w-full max-w-sm photo-scroll-reveal">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-md bg-[var(--surface-soft)] aspect-[4/5]">
                <ResponsiveImage
                  basePath="/images/senna/muhammad-gabriel-luca-senna-newborn"
                  alt="Newborn Muhammad Gabriel Luca Senna shortly after birth"
                  width={1122}
                  height={1402}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 400px"
                  className="w-full h-full"
                  imgClassName="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs text-[var(--muted-foreground)]">
                <span>{localizedArrivalDate} &middot; Day 1</span>
              </figcaption>
            </figure>
          </div>

          {/* Narrative Story Copy */}
          <div className="md:col-span-7 flex flex-col justify-center text-left">
            <div className="space-y-5 text-[var(--muted-foreground)] text-base sm:text-lg leading-relaxed">
              <p className="font-medium text-[var(--foreground)] text-lg sm:text-xl">
                {t('story.p1')}
              </p>
              <p>{t('story.p2')}</p>
            </div>

            {/* Little arrival metadata highlight */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)]">
                <div className="flex items-center gap-2 text-[#C98F55] mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase">
                    {t('story.arrival')}
                  </span>
                </div>
                <time
                  dateTime={siteContent.story.birthMetadata.iso}
                  className="text-sm sm:text-base font-bold text-[var(--foreground)] block font-sans"
                >
                  {localizedArrivalDate}
                </time>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)]">
                <div className="flex items-center gap-2 text-[#C98F55] mb-1">
                  <HeartHandshake className="w-4 h-4" />
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase">
                    {t('story.journey')}
                  </span>
                </div>
                <span className="text-sm sm:text-base font-bold text-[var(--foreground)] block font-sans">
                  {t('story.journeyVal')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
