import Container from '@/components/atoms/Container';
import { siteContent } from '@/data/siteContent';
import { Terminal, Sparkles } from 'lucide-react';

export default function FutureSection() {
  return (
    <section
      id="future"
      className="py-16 sm:py-24 bg-[#F8F5EF] border-t border-[#E7E0D6] scroll-mt-12"
      aria-labelledby="future-title"
    >
      <Container size="md">
        <div className="bg-[#FFFDF8] rounded-3xl p-8 sm:p-10 border border-[#E7E0D6] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-[#C98F55] mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold tracking-widest uppercase">
              {siteContent.future.eyebrow}
            </span>
          </div>

          <h2
            id="future-title"
            className="text-2xl sm:text-3xl font-bold text-[#2F3437] font-sans tracking-tight mb-4"
          >
            {siteContent.future.title}
          </h2>

          <p className="text-base text-[#73706A] max-w-lg leading-relaxed mb-6">
            {siteContent.future.description}
          </p>

          {/* Subtle JetBrains Mono easter egg */}
          <div className="inline-flex items-center gap-2.5 bg-[#2F3437] text-[#FAF7F2] px-4 py-2 rounded-xl shadow-xs border border-[#1E2224]">
            <Terminal className="w-3.5 h-3.5 text-[#C98F55]" />
            <code className="font-mono text-xs tracking-wide">
              {siteContent.future.codeEasterEgg}
            </code>
          </div>
        </div>
      </Container>
    </section>
  );
}
