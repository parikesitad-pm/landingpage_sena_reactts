import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import ResponsiveImage from "@/components/atoms/ResponsiveImage";
import { siteContent } from "@/data/siteContent";
import { Calendar, HeartHandshake } from "lucide-react";

export default function StorySection() {
  return (
    <section
      id="story"
      className="py-20 sm:py-28 bg-[#FFFDF8] border-y border-[#E7E0D6] scroll-mt-12"
      aria-labelledby="story-title"
    >
      <Container size="lg">
        <SectionTitle
          eyebrow={siteContent.story.eyebrow}
          title={siteContent.story.title}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Newborn Photograph with editorial border */}
          <div className="md:col-span-5 flex justify-center">
            <figure className="relative w-full max-w-sm">
              <div className="relative overflow-hidden rounded-2xl border border-[#E5DDD0] shadow-md bg-[#F4EDE2] aspect-[4/5]">
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
              <figcaption className="mt-3 text-center font-mono text-xs text-[#8C8479]">
                <span>13 February 2025 &middot; Day 1</span>
              </figcaption>
            </figure>
          </div>

          {/* Narrative Story Copy */}
          <div className="md:col-span-7 flex flex-col justify-center text-left">
            <div className="space-y-5 text-[#73706A] text-base sm:text-lg leading-relaxed">
              <p className="font-medium text-[#2F3437] text-lg sm:text-xl">
                {siteContent.story.paragraphs[0]}
              </p>
              <p>
                {siteContent.story.paragraphs[1]}
              </p>
            </div>

            {/* Little arrival metadata highlight */}
            <div className="mt-8 pt-6 border-t border-[#EFEAE2] grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#EAE2D4]">
                <div className="flex items-center gap-2 text-[#C98F55] mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase">
                    Arrival
                  </span>
                </div>
                <time
                  dateTime={siteContent.story.birthMetadata.iso}
                  className="text-sm sm:text-base font-bold text-[#2F3437] block font-sans"
                >
                  {siteContent.story.birthMetadata.date}
                </time>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#EAE2D4]">
                <div className="flex items-center gap-2 text-[#C98F55] mb-1">
                  <HeartHandshake className="w-4 h-4" />
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase">
                    Journey
                  </span>
                </div>
                <span className="text-sm sm:text-base font-bold text-[#2F3437] block font-sans">
                  Just Beginning
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
