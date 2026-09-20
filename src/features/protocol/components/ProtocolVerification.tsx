import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface VerificationItem {
  id: string;
  translationKey: string;
}

const ITEMS: VerificationItem[] = [
  { id: 'momoLove', translationKey: 'lucaProtocol.verification.momoLove' },
  { id: 'popoAuthority', translationKey: 'lucaProtocol.verification.popoAuthority' },
  { id: 'bulliesBlocked', translationKey: 'lucaProtocol.verification.bulliesBlocked' },
  { id: 'mischiefAvailable', translationKey: 'lucaProtocol.verification.mischiefAvailable' },
];

export default function ProtocolVerification() {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Step 0: not started
  // Steps 1..4: items revealed
  // Step 5: final status line revealed
  const [visibleStep, setVisibleStep] = useState<number>(0);
  const hasTriggeredRef = useRef<boolean>(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleStep(5);
      return;
    }

    const element = containerRef.current;
    if (!element || hasTriggeredRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          observer.disconnect();

          // Sequential reveal with ~90ms step delay
          let current = 0;
          const interval = setInterval(() => {
            current += 1;
            setVisibleStep(current);
            if (current >= 5) {
              clearInterval(interval);
            }
          }, 90);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-label="Protocol Verification"
      className="mt-10 sm:mt-12 max-w-lg mx-auto p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs transition-colors"
    >
      {/* Verification Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border)] font-mono text-[11px] select-none">
        <div className="flex items-center gap-2 text-[var(--muted-foreground)] font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#73daca] animate-pulse" />
          <span>{t('lucaProtocol.verification.title')}</span>
        </div>
        <div
          className={`inline-flex items-center gap-1 text-[var(--accent)] font-medium transition-opacity duration-300 ${
            visibleStep >= 5 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[var(--accent)]" />
          <span>{t('lucaProtocol.verification.badge')}</span>
        </div>
      </div>

      {/* Verification Items List */}
      <ul className="mt-3.5 space-y-2 font-mono text-xs sm:text-[13px] text-[var(--foreground)]" role="list">
        {ITEMS.map((item, index) => {
          const isRevealed = visibleStep > index;

          return (
            <li
              key={item.id}
              className={`flex items-center gap-2.5 transition-all duration-200 ${
                isRevealed
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[#2e7d5b] dark:text-[#73daca] bg-[#2e7d5b]/10 dark:bg-[#73daca]/10 border border-[#2e7d5b]/30 dark:border-[#73daca]/30"
                aria-hidden="true"
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span>{t(item.translationKey)}</span>
            </li>
          );
        })}
      </ul>

      {/* Protocol Final Status Line */}
      <div
        className={`mt-4 pt-3.5 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs transition-all duration-300 ${
          visibleStep >= 5
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-1'
        }`}
      >
        <code className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)] shadow-2xs">
          <span className="text-[var(--muted-foreground)]">protocol.status =&nbsp;</span>
          <span className="text-[var(--accent)] font-bold tracking-wide">&ldquo;ENFORCED&rdquo;;</span>
        </code>
        <span className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider select-none hidden sm:inline">
          System Validated
        </span>
      </div>
    </div>
  );
}
