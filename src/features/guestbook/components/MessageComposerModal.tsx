import { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Sparkles,
  Share2,
  Copy,
  Check,
  Smile,
  Stamp,
  CreditCard,
} from 'lucide-react';
import Button from '@/components/atoms/Button';
import { useTranslation } from 'react-i18next';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { cn } from '@/lib/utils';

export interface MessageComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialMessage?: string;
}

const CURATED_EMOJIS = [
  '♥',
  '✨',
  '👋',
  '🥹',
  '😂',
  '🚀',
  '💻',
  '🦉',
  '🌱',
  '⭐',
  '🧸',
  '🎉',
];

interface ReactionItem {
  id: string;
  label: string;
  badge: string;
}

const LUCA_REACTIONS: ReactionItem[] = [
  { id: 'hello-world', label: '✦ Hello, World!', badge: 'Hello, World!' },
  { id: 'momo-approved', label: '♥ Momo Approved', badge: 'Momo Approved' },
  { id: 'popo-approved', label: '⚖ Popo Approved', badge: 'Popo Approved' },
  { id: 'keep-becoming', label: '🚀 Keep Becoming', badge: 'Keep Becoming' },
  { id: 'still-growing', label: '🌱 Still Growing', badge: 'Still Growing' },
  { id: 'future-builder', label: '💻 Future Builder', badge: 'Future Builder' },
  {
    id: 'tunduk-popo',
    label: '😂 Tunduk sama Popo',
    badge: 'Tunduk sama Popo',
  },
];

type CardPresetId = 'none' | 'certificate' | 'lucaCard' | 'loveMeter';

export function buildGuestMessage(
  message: string,
  senderName?: string,
  reaction?: string | null,
  cardPreset?: CardPresetId,
  locale?: string
): string {
  const isId = locale === 'id';
  const greeting = isId ? 'Halo Luca! 👋' : 'Hello Luca! 👋';
  const cleanMsg = message.trim();
  const cleanName = senderName?.trim();

  const signoff = cleanName
    ? isId
      ? `— dari ${cleanName} ✦`
      : `— from ${cleanName} ✦`
    : isId
      ? '— dari seseorang yang mampir ke cerita kecilmu ✦'
      : '— from someone visiting your little corner of the internet ✦';

  const parts: string[] = [greeting];

  if (cleanMsg) {
    parts.push(cleanMsg);
  }

  if (reaction) {
    parts.push(`[${reaction}]`);
  }

  if (cardPreset === 'certificate') {
    parts.push(
      `[POPO AUTHORITY CERTIFICATE]\nReviewed by: POPO\nStatus: APPROVED\nAppeal: DENIED\nauthority.level = "Popo";`
    );
  } else if (cardPreset === 'lucaCard') {
    parts.push(
      `[LUCA CARD ✦ EST. 2025]\nmomo.love = Infinity;\nauthority.level = "Popo";\nHello, World. Keep becoming.`
    );
  } else if (cardPreset === 'loveMeter') {
    parts.push(
      `[LUCA LOVE METER]\nCuriosity: 100% | Momo Love: ∞ | Popo Authority: MAX | Bullies: 0`
    );
  }

  parts.push(signoff);
  return parts.join('\n\n');
}

export default function MessageComposerModal({
  isOpen,
  onClose,
  initialName = '',
  initialMessage = '',
}: MessageComposerModalProps) {
  const { t } = useTranslation();
  const { activeLocale } = usePreferences();

  const [senderName, setSenderName] = useState(initialName);
  const [message, setMessage] = useState(initialMessage);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardPresetId>('none');
  const [activeTab, setActiveTab] = useState<'message' | 'reactions' | 'cards'>(
    'message'
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trap and escape key
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on textarea
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const finalFormattedMessage = buildGuestMessage(
    message,
    senderName,
    selectedReaction,
    selectedCard,
    activeLocale
  );

  const hasContent = message.trim().length > 0;
  const maxChars = 600;
  const charsRemaining = maxChars - message.length;

  const handleEmojiClick = (emoji: string) => {
    if (message.length + emoji.length > maxChars) return;
    setMessage((prev) => prev + emoji);
    if (errorMessage) setErrorMessage('');
  };

  const handleSendWhatsApp = () => {
    if (!hasContent) {
      setErrorMessage(t('guestbook.errorRequired'));
      setActiveTab('message');
      textareaRef.current?.focus();
      return;
    }

    const waUrl = `https://wa.me/6282298503412?text=${encodeURIComponent(finalFormattedMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleShare = async () => {
    if (!hasContent) {
      setErrorMessage(t('guestbook.errorRequired'));
      setActiveTab('message');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Message for Luca',
          text: finalFormattedMessage,
        });
      } catch {
        // User canceled share
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(finalFormattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(finalFormattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="composer-modal-title"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        ref={modalRef}
        className="w-full max-w-4xl bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden my-auto text-left transition-all"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-soft)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)]/15 flex items-center justify-center text-[#C98F55]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="composer-modal-title"
                className="text-base sm:text-lg font-bold font-sans text-[var(--foreground)]"
              >
                {t('guestbook.modalTitle', 'Leave a Little Message for Luca')}
              </h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                {t(
                  'guestbook.modalSubtitle',
                  'Compose, decorate with Luca Lab, & preview before sending'
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors focus-visible:outline-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two Columns on Desktop, Single Column on Mobile */}
        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[calc(85vh-130px)] overflow-y-auto">
          {/* Left Column: Composer & Luca Lab (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Sender Name */}
            <div>
              <label
                htmlFor="modal-sender-name"
                className="block text-xs font-mono uppercase tracking-wider text-[var(--foreground)] mb-1.5"
              >
                {t('guestbook.nameLabel')}
              </label>
              <input
                id="modal-sender-name"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={t('guestbook.namePlaceholder')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 text-sm focus:outline-none focus:border-[#C98F55] focus:ring-1 focus:ring-[#C98F55] transition-all"
              />
            </div>

            {/* Message Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="modal-message"
                  className="block text-xs font-mono uppercase tracking-wider text-[var(--foreground)]"
                >
                  {t('guestbook.messageLabel')}{' '}
                  <span className="text-[#C98F55]">*</span>
                </label>
                <span
                  className={cn(
                    'text-[11px] font-mono',
                    charsRemaining < 50
                      ? 'text-[#f7768e]'
                      : 'text-[var(--muted-foreground)]'
                  )}
                >
                  {charsRemaining} chars
                </span>
              </div>

              <textarea
                ref={textareaRef}
                id="modal-message"
                rows={4}
                maxLength={maxChars}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errorMessage && e.target.value.trim())
                    setErrorMessage('');
                }}
                placeholder={t('guestbook.messagePlaceholder')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 text-sm focus:outline-none focus:border-[#C98F55] focus:ring-1 focus:ring-[#C98F55] transition-all resize-none"
              />

              {errorMessage && (
                <p className="mt-1 text-xs font-medium text-[#f7768e]">
                  {errorMessage}
                </p>
              )}
            </div>

            {/* Quick Emoji Bar */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5 text-xs font-mono text-[var(--muted-foreground)]">
                <Smile className="w-3.5 h-3.5 text-[#C98F55]" />
                <span>Quick Emojis</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CURATED_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleEmojiClick(emoji)}
                    className="w-8 h-8 rounded-lg bg-[var(--surface-soft)] hover:bg-[var(--border)] border border-[var(--border)] text-sm flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                    title={`Add ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* LUCA LAB Playground */}
            <div className="pt-2 border-t border-[var(--border)]">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#C98F55] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Luca Lab Tools</span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center p-0.5 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)] text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setActiveTab('message')}
                    className={cn(
                      'px-2.5 py-1 rounded-md transition-all',
                      activeTab === 'message'
                        ? 'bg-[var(--surface)] text-[var(--foreground)] font-semibold shadow-xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    )}
                  >
                    Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('reactions')}
                    className={cn(
                      'px-2.5 py-1 rounded-md transition-all',
                      activeTab === 'reactions'
                        ? 'bg-[var(--surface)] text-[var(--foreground)] font-semibold shadow-xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    )}
                  >
                    Reactions
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cards')}
                    className={cn(
                      'px-2.5 py-1 rounded-md transition-all',
                      activeTab === 'cards'
                        ? 'bg-[var(--surface)] text-[var(--foreground)] font-semibold shadow-xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    )}
                  >
                    Cards
                  </button>
                </div>
              </div>

              {/* Tab 1: Message / Clean instructions */}
              {activeTab === 'message' && (
                <div className="p-3 rounded-xl bg-[var(--surface-soft)]/60 border border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed">
                  <p>
                    Tulis harapan kecil, pesan hangat, atau sekadar menyapa
                    Luca. Pesanmu akan diformat rapi dan dibuka di WhatsApp
                    keluarga Luca.
                  </p>
                </div>
              )}

              {/* Tab 2: LUCA Sticker / Reaction Pack */}
              {activeTab === 'reactions' && (
                <div className="space-y-2">
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Pilih stempel teks LUCA untuk disematkan pada pesan:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {LUCA_REACTIONS.map((item) => {
                      const isSelected = selectedReaction === item.badge;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            setSelectedReaction(isSelected ? null : item.badge)
                          }
                          className={cn(
                            'px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5',
                            isSelected
                              ? 'bg-[#C98F55]/15 border-[#C98F55] text-[#C98F55] font-bold shadow-xs'
                              : 'bg-[var(--surface-soft)] border-[var(--border)] text-[var(--foreground)] hover:border-[#C98F55]/50'
                          )}
                        >
                          <Stamp className="w-3 h-3" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 3: Shareable Mini Cards / Presets */}
              {activeTab === 'cards' && (
                <div className="space-y-2.5">
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Sematkan kartu mini spesial ke dalam pesan:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* Preset 1: Popo Authority Certificate */}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCard(
                          selectedCard === 'certificate'
                            ? 'none'
                            : 'certificate'
                        )
                      }
                      className={cn(
                        'p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between',
                        selectedCard === 'certificate'
                          ? 'bg-[#C98F55]/15 border-[#C98F55] text-[var(--foreground)] shadow-xs'
                          : 'bg-[var(--surface-soft)] border-[var(--border)] hover:border-[#C98F55]/50 text-[var(--muted-foreground)]'
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Stamp className="w-3.5 h-3.5 text-[#C98F55]" />
                        <span className="text-[10px] font-mono text-[#f7768e] font-bold">
                          POPO
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[var(--foreground)] block">
                        Authority Certificate
                      </span>
                      <span className="text-[10px] font-mono text-[var(--muted-foreground)]">
                        Status: APPROVED
                      </span>
                    </button>

                    {/* Preset 2: Luca Card */}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCard(
                          selectedCard === 'lucaCard' ? 'none' : 'lucaCard'
                        )
                      }
                      className={cn(
                        'p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between',
                        selectedCard === 'lucaCard'
                          ? 'bg-[#C98F55]/15 border-[#C98F55] text-[var(--foreground)] shadow-xs'
                          : 'bg-[var(--surface-soft)] border-[var(--border)] hover:border-[#C98F55]/50 text-[var(--muted-foreground)]'
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <CreditCard className="w-3.5 h-3.5 text-[#C98F55]" />
                        <span className="text-[10px] font-mono text-[#C98F55]">
                          2025
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[var(--foreground)] block">
                        ✦ LUCA Card
                      </span>
                      <span className="text-[10px] font-mono text-[var(--muted-foreground)]">
                        Keep becoming.
                      </span>
                    </button>

                    {/* Preset 3: Luca Love Meter */}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCard(
                          selectedCard === 'loveMeter' ? 'none' : 'loveMeter'
                        )
                      }
                      className={cn(
                        'p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between',
                        selectedCard === 'loveMeter'
                          ? 'bg-[#C98F55]/15 border-[#C98F55] text-[var(--foreground)] shadow-xs'
                          : 'bg-[var(--surface-soft)] border-[var(--border)] hover:border-[#C98F55]/50 text-[var(--muted-foreground)]'
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#C98F55]" />
                        <span className="text-[10px] font-mono text-[#73daca]">
                          100%
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[var(--foreground)] block">
                        Love Meter
                      </span>
                      <span className="text-[10px] font-mono text-[var(--muted-foreground)]">
                        Momo: ∞ | Popo: MAX
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Chat Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                Live Chat Preview
              </span>

              {/* Fake delivery state indicator */}
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    hasContent
                      ? 'bg-[#73daca] animate-pulse'
                      : 'bg-[var(--border)]'
                  )}
                />
                <span className="text-[11px] font-mono text-[var(--muted-foreground)]">
                  {hasContent ? 'ready to send ✦' : 'drafting...'}
                </span>
              </div>
            </div>

            {/* Chat Screen Frame */}
            <div className="flex-1 bg-[var(--surface-soft)] rounded-2xl p-4 border border-[var(--border)] flex flex-col justify-between min-h-[260px]">
              {/* Header inside chat preview */}
              <div className="pb-3 border-b border-[var(--border)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#C98F55] text-white flex items-center justify-center font-bold text-xs">
                    {(senderName.trim() || 'V')[0].toUpperCase()}
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--foreground)] block leading-tight">
                      {senderName.trim() || 'Visitor'}
                    </span>
                    <span className="text-[10px] text-[var(--muted-foreground)]">
                      to Muhammad Gabriel Luca Senna
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[var(--muted-foreground)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
                  WhatsApp
                </span>
              </div>

              {/* Chat Message Bubble */}
              <div className="my-3 flex justify-end">
                <div className="max-w-[92%] bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-br-xs p-3.5 shadow-sm text-left">
                  <div className="text-xs font-sans text-[var(--foreground)] whitespace-pre-wrap leading-relaxed break-words">
                    {finalFormattedMessage}
                  </div>

                  {/* Bubble timestamp & status */}
                  <div className="mt-2 flex items-center justify-end gap-1 text-[10px] font-mono text-[var(--muted-foreground)]">
                    <span>{currentTime}</span>
                    <span className="text-[#73daca]">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Preview Footer note */}
              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
                <span>Exact WhatsApp export text</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 hover:text-[var(--foreground)] text-[11px] font-mono"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-[#73daca]" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--surface-soft)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[var(--muted-foreground)] text-center sm:text-left">
            <span>Destination: </span>
            <code className="font-mono text-[var(--foreground)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
              +62 822-9850-3412
            </code>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              className="flex-1 sm:flex-none justify-center"
            >
              {t('common.cancel', 'Cancel')}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleShare}
              className="hidden sm:inline-flex items-center gap-1.5"
              title="Share via device sheet"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </Button>

            <Button
              type="button"
              size="md"
              onClick={handleSendWhatsApp}
              className="flex-1 sm:flex-none justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('guestbook.sendButton', 'Send via WhatsApp')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
