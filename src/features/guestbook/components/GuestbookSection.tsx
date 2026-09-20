import { useState } from 'react';
import Container from '@/components/atoms/Container';
import RevealOnView from '@/components/atoms/RevealOnView';
import Button from '@/components/atoms/Button';
import { Sparkles, MessageCircleCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MessageComposerModal from './MessageComposerModal';

export default function GuestbookSection() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="guestbook"
      className="py-20 sm:py-28 bg-[var(--surface-soft)] border-t border-[var(--border)] scroll-mt-12 transition-colors scroll-reveal"
      aria-labelledby="guestbook-title"
    >
      <Container size="md">
        <div className="bg-[var(--surface)] rounded-3xl p-8 sm:p-14 border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden text-center">
          <div className="max-w-xl mx-auto">
            <RevealOnView duration={600}>
              <div className="inline-flex items-center gap-2 mb-3 text-[#C98F55]">
                <Sparkles className="w-4 h-4" />
                <span className="font-mono text-xs font-semibold tracking-widest uppercase">
                  {t('guestbook.eyebrow', 'GUESTBOOK & LITTLE WISHES')}
                </span>
              </div>

              <h2
                id="guestbook-title"
                className="text-3xl sm:text-4xl font-bold font-sans text-[var(--foreground)] tracking-tight mb-3"
              >
                {t('guestbook.title', 'Leave a Message for Luca')}
              </h2>

              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed mb-8">
                {t(
                  'guestbook.subtitle',
                  'Share a little wish, a warm thought, or simply say hello to Luca.'
                )}
              </p>

              {/* Centered CTA Button — Opens Modal Immediately */}
              <div className="flex flex-col items-center gap-4">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3.5 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all gap-2.5 rounded-full"
                >
                  <Sparkles className="w-4 h-4 text-[#C98F55]" />
                  <span>{t('guestbook.openComposer', 'Leave a Message')}</span>
                </Button>

                {/* Microcopy info badges */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-[var(--muted-foreground)] pt-2">
                  <span className="inline-flex items-center gap-1.5">
                    <MessageCircleCode className="w-3.5 h-3.5 text-[#C98F55]" />
                    {t(
                      'guestbook.previewMicrocopy',
                      'Preview before sending · WhatsApp'
                    )}
                  </span>
                  <span className="hidden sm:inline opacity-40">&bull;</span>
                  <span>
                    {t(
                      'guestbook.featuresMicrocopy',
                      'Emoji · Reactions · Luca Cards'
                    )}
                  </span>
                </div>
              </div>
            </RevealOnView>
          </div>
        </div>
      </Container>

      {/* Full Message Composer Modal */}
      <MessageComposerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
