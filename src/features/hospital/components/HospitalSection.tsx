import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import ResponsiveImage from "@/components/atoms/ResponsiveImage";
import { siteContent } from "@/data/siteContent";
import { ShieldCheck } from "lucide-react";

export default function HospitalSection() {
  return (
    <section
      id="brave-chapter"
      className="py-20 sm:py-28 bg-[#FFFDF8] border-t border-[#E7E0D6] scroll-mt-12"
      aria-labelledby="brave-chapter-title"
    >
      <Container size="lg">
        <SectionTitle
          eyebrow={siteContent.hospital.eyebrow}
          title={siteContent.hospital.title}
          align="center"
        />

        <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
          {siteContent.hospital.paragraphs.map((p, i) => (
            <p key={i} className="text-base sm:text-lg text-[#73706A] leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Real photo progression: care -> rest -> recovery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Hospital Care 1 */}
          <figure className="bg-[#FAF6EE] p-3 rounded-2xl border border-[#EAE0D0] shadow-xs">
            <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl bg-[#F0EAE0]">
              <ResponsiveImage
                basePath="/images/senna/senna-dirawat-01"
                alt="Luca resting during medical care"
                width={1303}
                height={1207}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="w-full h-full"
                imgClassName="object-cover object-center"
              />
            </div>
            <figcaption className="pt-3 px-1 text-left">
              <span className="font-mono text-xs font-semibold text-[#8C6E4A] uppercase tracking-wider block">
                Cared For
              </span>
              <p className="text-xs sm:text-sm text-[#73706A] mt-0.5">
                Resting safely when fever called for extra attention.
              </p>
            </figcaption>
          </figure>

          {/* Hospital Care 2 */}
          <figure className="bg-[#FAF6EE] p-3 rounded-2xl border border-[#EAE0D0] shadow-xs">
            <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl bg-[#F0EAE0]">
              <ResponsiveImage
                basePath="/images/senna/senna-dirawat-02"
                alt="Senna resting peacefully under family watch"
                width={1374}
                height={1145}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="w-full h-full"
                imgClassName="object-cover object-center"
              />
            </div>
            <figcaption className="pt-3 px-1 text-left">
              <span className="font-mono text-xs font-semibold text-[#8C6E4A] uppercase tracking-wider block">
                A Little Brave Heart
              </span>
              <p className="text-xs sm:text-sm text-[#73706A] mt-0.5">
                Small hands, quiet courage, and steady healing.
              </p>
            </figcaption>
          </figure>

          {/* After Hospital / Recovery */}
          <figure className="bg-[#FAF6EE] p-3 rounded-2xl border border-[#EAE0D0] shadow-xs relative">
            <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl bg-[#F0EAE0]">
              <ResponsiveImage
                basePath="/images/senna/senna-setelah-dirawat"
                alt="Senna smiling brightly and recovered after care"
                width={1024}
                height={1536}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="w-full h-full"
                imgClassName="object-cover object-center"
              />
            </div>
            <figcaption className="pt-3 px-1 text-left">
              <div className="flex items-center gap-1 text-[#2E7D32]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                  Back &amp; Smiling
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#73706A] mt-0.5">
                Fully recovered, energized, and ready for new joys.
              </p>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
