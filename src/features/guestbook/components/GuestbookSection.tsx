import { useState } from 'react';
import Container from '@/components/atoms/Container';
import RevealOnView from '@/components/atoms/RevealOnView';
import Button from '@/components/atoms/Button';
import { MessageSquareHeart, Send, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function GuestbookSection() {
  const { t } = useTranslation();
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setErrorMessage(t('guestbook.errorRequired'));
      return;
    }

    setErrorMessage('');

    const trimmedName = senderName.trim();
    const formattedText = trimmedName
      ? `Halo, ini pesan untuk Luca dari ${trimmedName}:\n\n${trimmedMessage}`
      : `Halo, ini pesan untuk Luca:\n\n${trimmedMessage}`;

    const waUrl = `https://wa.me/6282298503412?text=${encodeURIComponent(formattedText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="guestbook"
      className="py-20 sm:py-28 bg-[var(--surface-soft)] border-t border-[var(--border)] scroll-mt-12 transition-colors"
      aria-labelledby="guestbook-title"
    >
      <Container size="md">
        <div className="bg-[var(--surface)] rounded-3xl p-8 sm:p-12 border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="max-w-xl mx-auto text-center">
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

            <form onSubmit={handleSubmit} className="text-left space-y-5">
              <div>
                <label
                  htmlFor="guestbook-name"
                  className="block text-xs font-mono uppercase tracking-wider text-[var(--foreground)] mb-2"
                >
                  {t('guestbook.nameLabel')}
                </label>
                <input
                  id="guestbook-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={t('guestbook.namePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 text-sm focus:outline-none focus:border-[#C98F55] focus:ring-1 focus:ring-[#C98F55] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="guestbook-message"
                  className="block text-xs font-mono uppercase tracking-wider text-[var(--foreground)] mb-2"
                >
                  {t('guestbook.messageLabel')}{' '}
                  <span className="text-[#C98F55]">*</span>
                </label>
                <textarea
                  id="guestbook-message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errorMessage && e.target.value.trim()) {
                      setErrorMessage('');
                    }
                  }}
                  placeholder={t('guestbook.messagePlaceholder')}
                  aria-invalid={Boolean(errorMessage)}
                  aria-describedby={
                    errorMessage ? 'guestbook-error' : undefined
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 text-sm focus:outline-none focus:border-[#C98F55] focus:ring-1 focus:ring-[#C98F55] transition-all resize-y"
                />
                {errorMessage && (
                  <p
                    id="guestbook-error"
                    className="mt-2 text-xs font-medium text-[#f7768e]"
                  >
                    {errorMessage}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('guestbook.sendButton')}</span>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 text-center">
                <MessageSquareHeart className="w-3.5 h-3.5 text-[#C98F55]" />
                <p className="text-xs text-[var(--muted-foreground)]">
                  {t('guestbook.disclaimer')}
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
