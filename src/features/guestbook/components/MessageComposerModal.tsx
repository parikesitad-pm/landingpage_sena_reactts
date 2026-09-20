import { useState, useRef, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import {
  X,
  Send,
  Sparkles,
  Smile,
  Copy,
  Check,
  CreditCard,
  Stamp,
  Share2,
  ChevronDown,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { cn } from '@/lib/utils';

export interface MessageComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialMessage?: string;
}

const QUICK_EMOJIS = [
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

const LUCA_STICKERS = [
  { id: 'hello', label: '✦ Hello, World!' },
  { id: 'momoApproved', label: '♥ Momo Approved' },
  { id: 'popoApproved', label: '⚖ Popo Approved' },
  { id: 'keepBecoming', label: '🚀 Keep Becoming' },
  { id: 'growing', label: '🌱 Still Growing' },
  { id: 'engineer', label: '💻 Future Builder' },
  { id: 'respectPopo', label: '😂 Tunduk sama Popo' },
];

type CardPresetId = 'none' | 'certificate' | 'card' | 'loveMeter';

function buildGuestMessage(
  userText: string,
  name: string,
  reaction: string | null,
  cardPreset: CardPresetId,
  locale: string
): string {
  const parts: string[] = [];

  const displayName = name.trim() || 'Visitor';
  const signoff =
    locale === 'id'
      ? `— Dikirim oleh: ${displayName}\n(untuk Muhammad Gabriel Luca Senna)`
      : `— From: ${displayName}\n(for Muhammad Gabriel Luca Senna)`;

  if (userText.trim()) {
    parts.push(userText.trim());
  }

  if (reaction) {
    parts.push(`[${reaction}]`);
  }

  if (cardPreset === 'certificate') {
    parts.push(
      `[POPO AUTHORITY CERTIFICATE]\nReviewed by: POPO | Status: APPROVED | Appeal: DENIED\nauthority.level = "Popo"; momo.love = Infinity;`
    );
  } else if (cardPreset === 'card') {
    parts.push(
      `[✦ LUCA CARD]\nmomo.love = Infinity;\nauthority.level = "Popo";\nHello, World. Keep becoming.`
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
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trap, body scroll lock & exact position restoration
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    const scrollY = window.scrollY;

    const originalOverflow = document.body.style.overflow;
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

    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 80);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
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

  const ChatBubblePreview = ({ isCompact = false }: { isCompact?: boolean }) => (
    <div
      className={cn(
        'bg-[var(--surface-soft)] rounded-2xl p-3 sm:p-3.5 border border-[var(--border)] flex flex-col justify-between',
        !isCompact && 'flex-1 min-h-[260px]'
      )}
    >
      {/* Header inside chat preview */}
      <div className="pb-2.5 border-b border-[var(--border)] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#C98F55] text-white flex items-center justify-center font-bold text-[11px]">
            {(senderName.trim() || 'V')[0].toUpperCase()}
          </div>
          <div className="leading-tight">
            <span className="font-semibold text-[var(--foreground)] block text-xs">
              {senderName.trim() || 'Visitor'}
            </span>
            <span className="text-[10px] text-[var(--muted-foreground)]">
              for Luca
            </span>
          </div>
        </div>
        <span className="font-mono text-[10px] text-[var(--muted-foreground)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
          WhatsApp
        </span>
      </div>

      {/* Chat Message Bubble */}
      <div className="my-2.5 flex justify-end">
        <div className="max-w-[94%] bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-br-xs p-3 shadow-2xs text-left">
          <div className="text-xs font-sans text-[var(--foreground)] whitespace-pre-wrap leading-relaxed break-words">
            {finalFormattedMessage}
          </div>

          {/* Bubble timestamp & status */}
          <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] font-mono text-[var(--muted-foreground)]">
            <span>{currentTime}</span>
            <span className="text-[#73daca]">✓✓</span>
          </div>
        </div>
      </div>

      {/* Preview Footer note */}
      <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
        <span>WhatsApp export preview</span>
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
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="composer-modal-title"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6"
    >
      <div
        ref={modalRef}
        className="w-[calc(100vw-16px)] sm:w-[min(920px,calc(100vw-48px))] max-h-[calc(100dvh-16px)] sm:max-h-[min(780px,calc(100dvh-48px))] bg-[var(--surface)] border border-[var(--border)] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left transition-all"
      >
        {/* Compact Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-soft)] flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[var(--accent)]/15 flex items-center justify-center text-[#C98F55] flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2
                id="composer-modal-title"
                className="text-sm sm:text-base font-bold font-sans text-[var(--foreground)] leading-tight"
              >
                {t('guestbook.modalTitle', 'Leave a Little Message for Luca')}
              </h2>
              <p className="text-[11px] sm:text-xs text-[var(--muted-foreground)] line-clamp-1">
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
            className="p-1.5 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors focus-visible:outline-2"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto min-h-0 p-3.5 sm:p-5 lg:p-6">
          <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:gap-6 gap-4">
            {/* Left Column: Composer & Luca Lab */}
            <div className="flex flex-col space-y-3 sm:space-y-3.5">
              {/* Sender Name */}
              <div>
                <label
                  htmlFor="modal-sender-name"
                  className="block text-[11px] font-mono uppercase tracking-wider text-[var(--foreground)] mb-1 font-semibold"
                >
                  {t('guestbook.nameLabel')}
                </label>
                <input
                  id="modal-sender-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={t('guestbook.namePlaceholder')}
                  className="w-full h-10 px-3 py-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 text-xs sm:text-sm focus:outline-none focus:border-[#C98F55] transition-all"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="modal-message"
                    className="block text-[11px] font-mono uppercase tracking-wider text-[var(--foreground)] font-semibold"
                  >
                    {t('guestbook.messageLabel')}{' '}
                    <span className="text-[#C98F55]">*</span>
                  </label>
                  <span
                    className={cn(
                      'text-[10px] font-mono',
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
                  rows={3}
                  maxLength={maxChars}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errorMessage && e.target.value.trim())
                      setErrorMessage('');
                  }}
                  placeholder={t('guestbook.messagePlaceholder')}
                  className="w-full p-3 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 text-xs sm:text-sm focus:outline-none focus:border-[#C98F55] transition-all resize-none"
                />

                {errorMessage && (
                  <p className="mt-1 text-xs font-medium text-[#f7768e]">
                    {errorMessage}
                  </p>
                )}
              </div>

              {/* Quick Emojis */}
              <div>
                <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono text-[var(--muted-foreground)]">
                  <Smile className="w-3 h-3 text-[#C98F55]" />
                  <span>Quick Emojis</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {QUICK_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleEmojiClick(emoji)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)] hover:border-[#C98F55] flex items-center justify-center text-xs sm:text-sm hover:scale-110 active:scale-95 transition-all"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Luca Lab Tools */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#C98F55] font-semibold">
                    Luca Lab Playground
                  </span>
                  {(selectedReaction || selectedCard !== 'none') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedReaction(null);
                        setSelectedCard('none');
                      }}
                      className="text-[10px] font-mono text-[var(--muted-foreground)] hover:text-[#f7768e] transition-colors"
                    >
                      Clear Stamps
                    </button>
                  )}
                </div>

                {/* Subtabs */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-soft)] border border-[var(--border)] mb-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('message')}
                    className={cn(
                      'flex-1 py-1 px-2.5 rounded-lg text-xs font-mono transition-all',
                      activeTab === 'message'
                        ? 'bg-[var(--surface)] text-[var(--foreground)] font-semibold shadow-2xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    )}
                  >
                    Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('reactions')}
                    className={cn(
                      'flex-1 py-1 px-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-1',
                      activeTab === 'reactions'
                        ? 'bg-[var(--surface)] text-[var(--foreground)] font-semibold shadow-2xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    )}
                  >
                    <span>Reactions</span>
                    {selectedReaction && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C98F55]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cards')}
                    className={cn(
                      'flex-1 py-1 px-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-1',
                      activeTab === 'cards'
                        ? 'bg-[var(--surface)] text-[var(--foreground)] font-semibold shadow-2xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    )}
                  >
                    <span>Cards</span>
                    {selectedCard !== 'none' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C98F55]" />
                    )}
                  </button>
                </div>

                {/* Subtab Content */}
                {activeTab === 'message' && (
                  <div className="p-2.5 rounded-xl bg-[var(--surface-soft)]/60 border border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed">
                    <p>
                      Tulis harapan kecil, pesan hangat, atau sekadar menyapa
                      Luca. Pesanmu akan diformat rapi dan dibuka di WhatsApp
                      keluarga Luca.
                    </p>
                  </div>
                )}

                {activeTab === 'reactions' && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[var(--muted-foreground)] block">
                      Pilih satu stempel reaksi khas Luca:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {LUCA_STICKERS.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            setSelectedReaction(
                              selectedReaction === item.label
                                ? null
                                : item.label
                            )
                          }
                          className={cn(
                            'px-2.5 py-1 rounded-full text-xs font-mono transition-all border',
                            selectedReaction === item.label
                              ? 'bg-[#C98F55] text-white border-[#C98F55] shadow-2xs'
                              : 'bg-[var(--surface-soft)] text-[var(--foreground)] border-[var(--border)] hover:border-[#C98F55]/60'
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'cards' && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[var(--muted-foreground)] block">
                      Sematkan kartu mini spesial Luca:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {/* Certificate */}
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
                          'p-2 rounded-xl border text-left transition-all flex flex-col justify-between',
                          selectedCard === 'certificate'
                            ? 'bg-[#C98F55]/15 border-[#C98F55] text-[var(--foreground)] shadow-2xs'
                            : 'bg-[var(--surface-soft)] border-[var(--border)] hover:border-[#C98F55]/50 text-[var(--muted-foreground)]'
                        )}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <Stamp className="w-3 h-3 text-[#C98F55]" />
                          <span className="text-[9px] font-mono text-[#f7768e] font-bold">
                            POPO
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[var(--foreground)] block leading-tight">
                          Popo Certificate
                        </span>
                        <span className="text-[9px] font-mono text-[var(--muted-foreground)] mt-0.5">
                          Status: APPROVED
                        </span>
                      </button>

                      {/* Card */}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCard(
                            selectedCard === 'card' ? 'none' : 'card'
                          )
                        }
                        className={cn(
                          'p-2 rounded-xl border text-left transition-all flex flex-col justify-between',
                          selectedCard === 'card'
                            ? 'bg-[#C98F55]/15 border-[#C98F55] text-[var(--foreground)] shadow-2xs'
                            : 'bg-[var(--surface-soft)] border-[var(--border)] hover:border-[#C98F55]/50 text-[var(--muted-foreground)]'
                        )}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <CreditCard className="w-3 h-3 text-[#C98F55]" />
                          <span className="text-[9px] font-mono text-[#C98F55]">
                            2025
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[var(--foreground)] block leading-tight">
                          ✦ LUCA Card
                        </span>
                        <span className="text-[9px] font-mono text-[var(--muted-foreground)] mt-0.5">
                          momo.love = ∞
                        </span>
                      </button>

                      {/* Love Meter */}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCard(
                            selectedCard === 'loveMeter' ? 'none' : 'loveMeter'
                          )
                        }
                        className={cn(
                          'p-2 rounded-xl border text-left transition-all flex flex-col justify-between',
                          selectedCard === 'loveMeter'
                            ? 'bg-[#C98F55]/15 border-[#C98F55] text-[var(--foreground)] shadow-2xs'
                            : 'bg-[var(--surface-soft)] border-[var(--border)] hover:border-[#C98F55]/50 text-[var(--muted-foreground)]'
                        )}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <Sparkles className="w-3 h-3 text-[#C98F55]" />
                          <span className="text-[9px] font-mono text-[#73daca]">
                            100%
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[var(--foreground)] block leading-tight">
                          Love Meter
                        </span>
                        <span className="text-[9px] font-mono text-[var(--muted-foreground)] mt-0.5">
                          Momo: ∞ | Popo: MAX
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile / Tablet Collapsible Preview */}
              <div className="lg:hidden border border-[var(--border)] rounded-2xl bg-[var(--surface-soft)]/60 overflow-hidden pt-1">
                <button
                  type="button"
                  onClick={() => setIsMobilePreviewOpen(!isMobilePreviewOpen)}
                  className="w-full px-3.5 py-2 flex items-center justify-between text-xs font-mono text-[var(--foreground)] hover:bg-[var(--surface-soft)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold uppercase tracking-wider text-[11px]">
                      Live Chat Preview
                    </span>
                    <span className="text-[10px] text-[var(--muted-foreground)]">
                      ({hasContent ? 'ready ✦' : 'drafting...'})
                    </span>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                    <span>{isMobilePreviewOpen ? 'Hide' : 'Preview message'}</span>
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        isMobilePreviewOpen && 'rotate-180'
                      )}
                    />
                  </span>
                </button>
                {isMobilePreviewOpen && (
                  <div className="p-2.5 border-t border-[var(--border)]">
                    <ChatBubblePreview isCompact />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Desktop Live Chat Preview */}
            <div className="hidden lg:flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                  Live Chat Preview
                </span>

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

              <ChatBubblePreview />
            </div>
          </div>
        </div>

        {/* Compact Modal Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-[var(--border)] bg-[var(--surface-soft)] flex flex-col sm:flex-row items-center justify-between gap-2.5 flex-shrink-0">
          <div className="text-xs text-[var(--muted-foreground)] text-center sm:text-left flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#73daca]" />
            <span className="font-mono text-[11px]">
              Destination &bull; Popo & Momo &bull; WhatsApp
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              className="flex-1 sm:flex-none justify-center h-9 sm:h-10 text-xs sm:text-sm px-4"
            >
              {t('common.cancel', 'Cancel')}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleShare}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 sm:h-10 text-xs sm:text-sm px-3"
              title="Share via device sheet"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </Button>

            <Button
              type="button"
              size="md"
              onClick={handleSendWhatsApp}
              className="flex-1 sm:flex-none justify-center gap-2 h-9 sm:h-10 text-xs sm:text-sm px-5 shadow-xs"
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
