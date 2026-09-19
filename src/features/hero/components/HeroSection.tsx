import { Sparkles, ArrowDown } from 'lucide-react';
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ResponsiveImage from '@/components/atoms/ResponsiveImage';
import { siteContent } from '@/data/siteContent';
import { calculateAge } from '@/lib/age';

export default function HeroSection() {
  const age = calculateAge(siteContent.child.birthDate);

  return (
    <section
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-8 pb-16 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Gentle background ambient dots & delicate lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="15%" cy="20%" r="3" fill="#C98F55" opacity="0.3" />
          <circle cx="85%" cy="30%" r="2" fill="#2F3437" opacity="0.2" />
          <circle cx="75%" cy="75%" r="4" fill="#C98F55" opacity="0.25" />
          <circle cx="10%" cy="80%" r="2.5" fill="#C98F55" opacity="0.2" />
          <path
            d="M 60 100 Q 180 50 300 120"
            stroke="#E8DFCFA0"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left / Editorial Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Badges & Logo Lockup */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#FFFDF8] border border-[#E7E0D6] pl-2 pr-3.5 py-1 rounded-full shadow-xs">
                <img
                  src="/branding/luca-logo-mark.png"
                  alt=""
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain"
                />
                <span className="font-mono text-xs font-semibold tracking-wider text-[#8C6E4A]">
                  LUCA &middot; EST. 2025
                </span>
              </div>
              <Badge variant="accent" dot>
                {siteContent.hero.eyebrow}
              </Badge>
            </div>

            {/* Main H1 Title (single H1 on homepage) */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#2F3437] font-sans leading-[1.1]"
            >
              <span className="block">Muhammad Gabriel</span>
              <span className="block text-[#C98F55] mt-1">Luca Senna</span>
            </h1>

            {/* Semantic introductory entity context */}
            <p className="mt-4 text-xs sm:text-sm font-mono text-[#8C8479] max-w-xl">
              {siteContent.hero.introEntity}
            </p>

            {/* Poetic description */}
            <p className="mt-5 text-lg sm:text-xl text-[#73706A] leading-relaxed max-w-xl font-sans">
              {siteContent.hero.description}
            </p>

            {/* Metadata Pills: Dynamic Age + Birth Date */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-[#FFFDF8] border border-[#E7E0D6] px-4 py-2 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C98F55]" />
                <span className="text-xs font-mono text-[#73706A]">
                  Current Age:
                </span>
                <strong className="text-xs font-mono text-[#2F3437] font-semibold">
                  {age.formatted}
                </strong>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#FFFDF8] border border-[#E7E0D6] px-4 py-2 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C98F55]" />
                <time
                  dateTime={siteContent.child.birthDate}
                  className="text-xs font-mono text-[#2F3437]"
                >
                  {siteContent.hero.birthDateFormatted}
                </time>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8 pt-2 flex flex-wrap items-center gap-4">
              <Button asAnchor href="#story" size="lg" className="group">
                <span>{siteContent.hero.ctaText}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </Button>

              <a
                href="#memories"
                className="text-sm font-medium text-[#73706A] hover:text-[#2F3437] px-4 py-3 rounded-full hover:bg-[#F2ECE1] transition-colors"
              >
                View Moments &rarr;
              </a>
            </div>
          </div>

          {/* Right / Hero Editorial Frame Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Outer decorative card frame */}
              <div className="absolute -inset-3 bg-[#EFE7DA] rounded-3xl -rotate-1 shadow-sm" />
              <div className="absolute -inset-1 bg-[#FAF2E8] rounded-3xl rotate-1" />

              {/* Main Photo Container */}
              <div className="relative bg-[#FFFDF8] p-3 sm:p-4 rounded-3xl border border-[#E5DDD0] shadow-[0_12px_32px_rgba(47,52,55,0.06)]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#F0E9DC]">
                  <ResponsiveImage
                    basePath="/images/senna/muhammad-gabriel-luca-senna-hero"
                    alt="Portrait of Muhammad Gabriel Luca Senna"
                    priority={true}
                    width={1086}
                    height={1448}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 450px"
                    className="w-full h-full"
                    imgClassName="object-cover object-center"
                  />

                  {/* Corner Accent Badge with Symbol Mark */}
                  <div className="absolute bottom-3 right-3 bg-[#FFFDF8]/90 backdrop-blur-xs pl-2 pr-3 py-1.5 rounded-full border border-[#E7E0D6] shadow-xs flex items-center gap-1.5">
                    <img
                      src="/branding/luca-logo-mark.png"
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="font-mono text-[11px] font-semibold text-[#8C6E4A] tracking-wider uppercase">
                      LUCA &middot; 2025
                    </span>
                  </div>
                </div>

                {/* Sub-caption below frame */}
                <div className="pt-3 px-1 flex items-center justify-between text-xs text-[#8C8479]">
                  <span className="font-mono text-[11px]">
                    portrait.capture
                  </span>
                  <span className="font-mono text-[11px]">Luca</span>
                </div>
              </div>

              {/* Delicate celestial SVG accent stars */}
              <div className="absolute -top-6 -right-6 text-[#C98F55] opacity-80 pointer-events-none">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -left-4 text-[#D8AF7F] opacity-60 pointer-events-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
