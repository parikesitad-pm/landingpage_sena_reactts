import Container from "@/components/atoms/Container";
import { siteContent } from "@/data/siteContent";
import { Heart } from "lucide-react";

export default function RemembranceSection() {
  return (
    <section
      id="family-legacy"
      className="py-16 sm:py-24 bg-[#F8F5EF] border-t border-[#E7E0D6] scroll-mt-12"
      aria-labelledby="remembrance-title"
    >
      <Container size="md">
        <div className="bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 border border-[#E4DACB] shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden">
          {/* Subtle warm accent watermark icon */}
          <div className="absolute -right-6 -bottom-6 text-[#F5EDE1] pointer-events-none">
            <Heart className="w-36 h-36 stroke-[1]" />
          </div>

          <div className="relative z-10 max-w-xl">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#C98F55] uppercase block mb-3">
              {siteContent.remembrance.eyebrow}
            </span>

            <h2
              id="remembrance-title"
              className="text-2xl sm:text-3xl font-bold text-[#2F3437] font-sans tracking-tight mb-6"
            >
              {siteContent.remembrance.title}
            </h2>

            <div className="space-y-4 text-[#73706A] text-base sm:text-lg leading-relaxed">
              <p>
                {siteContent.remembrance.paragraph1}
              </p>
              <p>
                {siteContent.remembrance.paragraph2}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EFEAE2] flex items-center gap-2 text-xs font-mono text-[#8C8479]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98F55]" />
              <span>damai di surga &middot; forever loved</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
