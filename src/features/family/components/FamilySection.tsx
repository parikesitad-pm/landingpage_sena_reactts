import Container from '@/components/atoms/Container';
import SectionTitle from '@/components/atoms/SectionTitle';
import ResponsiveImage from '@/components/atoms/ResponsiveImage';
import { siteContent } from '@/data/siteContent';
import { Heart } from 'lucide-react';

export default function FamilySection() {
  return (
    <section
      id="family"
      className="py-20 sm:py-28 bg-[#F8F5EF] border-t border-[#E7E0D6] scroll-mt-12"
      aria-labelledby="family-title"
    >
      <Container size="lg">
        <SectionTitle
          eyebrow={siteContent.family.eyebrow}
          title={siteContent.family.title}
          description={siteContent.family.description}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Popo Photo */}
          <div className="md:col-span-3 flex flex-col items-center">
            <figure className="w-full bg-[#FFFDF8] p-3 rounded-2xl border border-[#E7E0D6] shadow-xs">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-[#F0E9DC]">
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
                <span className="font-sans text-sm font-semibold text-[#2F3437]">
                  Popo
                </span>
                <span className="block font-mono text-xs text-[#8C8479]">
                  Guiding warmth
                </span>
              </figcaption>
            </figure>
          </div>

          {/* Center Main: Senna with Popo & Momo */}
          <div className="md:col-span-6 flex flex-col items-center">
            <figure className="w-full bg-[#FFFDF8] p-4 rounded-3xl border border-[#E2D6C4] shadow-md relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-[#EFE7DA]">
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
                    Together
                  </span>
                </div>
                <p className="font-sans text-base font-bold text-[#2F3437]">
                  Growing Up with Popo &amp; Momo
                </p>
                <p className="text-xs sm:text-sm text-[#73706A] mt-1">
                  The warmest hands and biggest smiles along the journey.
                </p>
              </figcaption>
            </figure>
          </div>

          {/* Momo Photo */}
          <div className="md:col-span-3 flex flex-col items-center">
            <figure className="w-full bg-[#FFFDF8] p-3 rounded-2xl border border-[#E7E0D6] shadow-xs">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-[#F0E9DC]">
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
                <span className="font-sans text-sm font-semibold text-[#2F3437]">
                  Momo
                </span>
                <span className="block font-mono text-xs text-[#8C8479]">
                  Endless gentle care
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
