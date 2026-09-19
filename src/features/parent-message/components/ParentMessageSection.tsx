import Container from '@/components/atoms/Container';
import { siteContent } from '@/data/siteContent';

export default function ParentMessageSection() {
  return (
    <section
      id="for-senna"
      className="py-24 sm:py-32 bg-[#FFFDF8] border-t border-[#E7E0D6] scroll-mt-12"
      aria-labelledby="parent-message-title"
    >
      <Container size="md">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#C98F55] uppercase block mb-3">
            {siteContent.parentMessage.eyebrow}
          </span>

          <h2
            id="parent-message-title"
            className="text-3xl sm:text-4xl font-bold text-[#2F3437] font-sans tracking-tight mb-10"
          >
            {siteContent.parentMessage.title}
          </h2>

          <div className="space-y-6 text-[#73706A] text-lg sm:text-xl font-normal leading-relaxed">
            {siteContent.parentMessage.paragraphs.map((para, idx) => (
              <p key={idx} className="italic font-serif text-[#444A4E]">
                &ldquo;{para}&rdquo;
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#EFEAE2] inline-block">
            <span className="font-mono text-xs text-[#8C8479] tracking-wider uppercase block">
              {siteContent.parentMessage.signoff}
            </span>
            <span className="font-sans text-sm font-semibold text-[#2F3437] mt-1 block">
              Mom &amp; Dad
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
