import MainLayout from "@/components/layout/MainLayout";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import { siteContent } from "@/data/siteContent";
import { Code, Compass, Sparkles, HeartHandshake, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandPage() {
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
    <MainLayout>
      <div className="py-16 sm:py-24 bg-[#F8F5EF]">
        <Container size="lg">
          {/* Back link */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#73706A] hover:text-[#2F3437] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Editorial Header */}
          <div className="max-w-2xl text-left mb-12">
            <span className="font-mono text-xs font-semibold text-[#C98F55] tracking-widest uppercase block mb-2">
              BRAND IDENTITY &amp; PHILOSOPHY
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-sans text-[#2F3437] tracking-tight">
              The Mark of Luca
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#73706A] leading-relaxed">
              This mark was created as a timeless personal identity for{" "}
              <strong className="text-[#2F3437] font-semibold">
                Muhammad Gabriel Luca Senna
              </strong>
              . It represents his very first portfolio — a bridge connecting family warmth, childhood wonder, and future possibilities.
            </p>
          </div>

          {/* Primary Logo Showcase */}
          <div className="bg-[#FFFDF8] rounded-3xl p-8 sm:p-14 border border-[#E5DDD0] shadow-sm mb-12 text-center">
            <div className="max-w-md mx-auto py-6">
              <img
                src="/branding/luca-logo.png"
                alt="LUCA — Muhammad Gabriel Luca Senna Logo"
                width={600}
                height={300}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>

            <div className="mt-8 pt-8 border-t border-[#EFEAE2] max-w-xl mx-auto">
              <span className="font-mono text-xs font-semibold text-[#C98F55] tracking-wider uppercase block mb-1">
                CORE PHILOSOPHY
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-[#2F3437] font-sans">
                &ldquo;{brand.philosophy}&rdquo;
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#73706A] leading-relaxed">
                {brand.narrative.details}
              </p>
            </div>
          </div>

          {/* Symbol Anatomy */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold font-sans text-[#2F3437] mb-6">
              Symbol Anatomy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brand.meaning.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#FFFDF8] p-6 rounded-2xl border border-[#E7E0D6] shadow-xs"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF2E8] flex items-center justify-center">
                      {getMeaningIcon(item.title)}
                    </div>
                    <span className="font-mono text-sm font-bold text-[#8C6E4A]">
                      {item.symbol}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#2F3437] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#73706A] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why "Build With Purpose" */}
          <div className="bg-[#FAF6EE] rounded-3xl p-8 sm:p-10 border border-[#E5DDD0] mb-14">
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#2F3437] mb-3">
              Why &ldquo;Build With Purpose&rdquo;?
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#73706A] leading-relaxed max-w-3xl">
              <p>
                &ldquo;Build With Purpose&rdquo; is never meant as a rigid expectation or prescribed destiny for Luca. It is simply a gentle value: that whatever he chooses to build or explore in life, he does so with care, empathy, and positive meaning for people.
              </p>
              <p>
                Whether he builds software as an engineer or explores other creative horizons, curiosity is at its best when it serves human kindness.
              </p>
            </div>
          </div>

          {/* Return Home CTA */}
          <div className="text-center pt-4">
            <Link to="/">
              <Button size="lg">Explore Luca&apos;s Story</Button>
            </Link>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
}
