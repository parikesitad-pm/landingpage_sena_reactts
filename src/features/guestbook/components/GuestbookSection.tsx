import { useState } from 'react';
import Container from '@/components/atoms/Container';
import RevealOnView from '@/components/atoms/RevealOnView';
import Button from '@/components/atoms/Button';
import { MessageSquareHeart, Sparkles, Send, PenTool } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MessageComposerModal from './MessageComposerModal';

export default function GuestbookSection() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');
  const [quickName, setQuickName] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <section
      id="guestbook"
      className="py-20 sm:py-28 bg-[var(--surface-soft)] border-t border-[var(--border)] scroll-mt-12 transition-colors scroll-reveal"
      aria-labelledby="guestbook-title"
    >
      <Container size="md">
        <div className="bg-[var(--surface)] rounded-3xl p-8 sm:p-12 border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden text-center">
          <div className="max-w-xl mx-auto">
            <RevealOnView duration={600}>
              <div className="inline-flex items-center gap-2 mb-3 text-[#C98F55]">
                <Sparkles className="w-4 h-4" />
                <span className="font-mono text-xs font-semibold tracking-widest uppercase">
                  {t('guestbook.eyebrow')}
                </span>
              </div>

              <h2
                id="guestbook-title"
                className="text-3xl sm:text-4xl font-bold font-sans text-[var(--foreground)] tracking-tight mb-3"
              >
                {t('guestbook.title')}
              </h2>

              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed mb-8">
                {t('guestbook.subtitle')}
              </p>
            </RevealOnView>

            {/* Interactive Composer Trigger Area */}
            <div className="bg-[var(--surface-soft)] rounded-2xl p-6 border border-[var(--border)] text-left shadow-xs mb-6">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#C98F55] font-semibold">
                <PenTool className="w-3.5 h-3.5" />
                <span>Guestbook Composer &bull; Luca Lab</span>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  placeholder={t('guestbook.namePlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 text-sm focus:outline-none focus:border-[#C98F55] transition-all"
                />

                <textarea
                  rows={3}
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  onClick={handleOpenModal}
                  placeholder={t('guestbook.messagePlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 text-sm focus:outline-none focus:border-[#C98F55] transition-all resize-none cursor-pointer"
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-[var(--muted-foreground)]">
                  Klik untuk membuka live preview & stempel Luca Lab
                </span>

                <Button
                  type="button"
                  size="md"
                  onClick={handleOpenModal}
                  className="w-full sm:w-auto justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('guestbook.openComposer', 'Leave a Message')}</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-center text-xs text-[var(--muted-foreground)]">
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#C98F55]" />
              <p>{t('guestbook.disclaimer')}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Full Message Composer Modal */}
      <MessageComposerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialName={quickName}
        initialMessage={quickMessage}
      />
    </section>
  );
}
