import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import { siteContent } from "@/data/siteContent";
import { Code, Compass, Sparkles, HeartHandshake } from "lucide-react";

export default function LogoPhilosophySection() {
  const { brand } = siteContent;

  const getMeaningIcon = (title: string) => {
    switch (title) {
      case "Create":
        return <Code className="w-5 h-5 text-[#C98F55]" />;
      case "Wonder":
        return <Sparkles className="w-5 h-5 text-[#C98F55]" />;
      case "Explore":
        return <Compass className="w-5 h-5 text-[#C98F55]" />;
      case "Become":
        return <HeartHandshake className="w-5 h-5 text-[#C98F55]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C98F55]" />;
    }
  };

  return (
    <section
      id="brand-mark"
      className="py-20 sm:py-32 bg-[#FAF6EE] border-t border-[#E7E0D6] scroll-mt-12"
      aria-labelledby="logo-philosophy-title"
    >
      <Container size="lg">
        {/* Section Heading */}
        <SectionTitle
          eyebrow="BRAND IDENTITY &amp; PHILOSOPHY"
          title="The Mark of Luca"
          description="This little mark was created for Luca as more than a logo. It is a gentle symbol of curiosity, growth, and the bright story still being written."
          align="center"
        />

        {/* Hero Logo Card Preview */}
        <div className="mt-8 mb-16 bg-[#FFFDF8] rounded-3xl p-8 sm:p-14 border border-[#E5DDD0] shadow-[0_4px_24px_rgba(47,52,55,0.03)] flex flex-col items-center text-center relative overflow-hidden">
          {/* Ambient decorative border */}
          <div className="absolute inset-2 sm:inset-3 border border-[#F0E8DC] rounded-2xl pointer-events-none" />

          {/* Actual Approved Logo Artwork */}
          <div className="relative z-10 max-w-md w-full py-4 px-2">
            <img
              src="/branding/luca-logo.png"
              alt="LUCA — Muhammad Gabriel Luca Senna Logo Artwork"
              width={600}
              height={300}
              className="w-full h-auto object-contain mx-auto filter drop-shadow-xs"
            />
          </div>

          {/* Core Philosophy Statement */}
          <div className="mt-6 pt-6 border-t border-[#EFEAE2] relative z-10 max-w-xl">
            <p className="font-sans text-xl sm:text-2xl font-bold text-[#2F3437] tracking-tight">
              &ldquo;{brand.philosophy}&rdquo;
            </p>
            <p className="mt-3 text-sm sm:text-base text-[#73706A] leading-relaxed">
              {brand.narrative.intro}
            </p>
          </div>
        </div>

        {/* 4 Meaning Blocks: Create, Wonder, Explore, Become */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brand.meaning.map((block) => (
            <div
              key={block.title}
              className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#E7E0D6] shadow-xs hover:border-[#C98F55]/60 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF2E8] border border-[#E9DAC8] flex items-center justify-center">
                    {getMeaningIcon(block.title)}
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F4ECE1] text-[#8C6E4A]">
                    {block.symbol}
                  </span>
                </div>

                <h3 className="font-sans text-lg font-bold text-[#2F3437] mb-2">
                  {block.title}
                </h3>
                <p className="text-sm text-[#73706A] leading-relaxed">
                  {block.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F2ECE1]">
                <span className="font-mono text-[10px] text-[#A8A095] tracking-widest uppercase">
                  Symbolic Meaning
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Core Values & "Build With Purpose" Detail */}
        <div className="mt-16 bg-[#FFFDF8] rounded-3xl p-8 sm:p-10 border border-[#E7E0D6]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-mono text-xs font-semibold text-[#C98F55] tracking-widest uppercase block mb-1">
              GUIDING VALUES
            </span>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#2F3437]">
              Growing With Intention
            </h3>
            <p className="text-sm text-[#73706A] mt-2">
              Gentle principles to guide Luca&apos;s journey, held with warmth rather than rigid expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brand.values.map((val) => (
              <div
                key={val.title}
                className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#EAE2D4] flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-sans text-base font-bold text-[#2F3437] mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C98F55]" />
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#73706A] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#EFEAE2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8C8479]">
            <span>A more human tomorrow.</span>
            <span className="text-[#C98F55]">EST. 2025 &middot; Muhammad Gabriel Luca Senna</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
