import { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface Token {
  type: 'keyword' | 'identifier' | 'property' | 'method' | 'string' | 'punct';
  text: string;
}

interface LineDef {
  tokens: Token[];
  raw: string;
}

const CODE_LINES: LineDef[] = [
  {
    raw: 'const name = "Muhammad Gabriel Luca Senna";',
    tokens: [
      { type: 'keyword', text: 'const ' },
      { type: 'identifier', text: 'name' },
      { type: 'punct', text: ' = ' },
      { type: 'string', text: '"Muhammad Gabriel Luca Senna"' },
      { type: 'punct', text: ';' },
    ],
  },
  {
    raw: 'const born = "2025-02-13";',
    tokens: [
      { type: 'keyword', text: 'const ' },
      { type: 'identifier', text: 'born' },
      { type: 'punct', text: ' = ' },
      { type: 'string', text: '"2025-02-13"' },
      { type: 'punct', text: ';' },
    ],
  },
  {
    raw: '',
    tokens: [],
  },
  {
    raw: 'dream.source = "Popo";',
    tokens: [
      { type: 'identifier', text: 'dream' },
      { type: 'punct', text: '.' },
      { type: 'property', text: 'source' },
      { type: 'punct', text: ' = ' },
      { type: 'string', text: '"Popo"' },
      { type: 'punct', text: ';' },
    ],
  },
  {
    raw: 'future.path = "Luca decides";',
    tokens: [
      { type: 'identifier', text: 'future' },
      { type: 'punct', text: '.' },
      { type: 'property', text: 'path' },
      { type: 'punct', text: ' = ' },
      { type: 'string', text: '"Luca decides"' },
      { type: 'punct', text: ';' },
    ],
  },
  {
    raw: '',
    tokens: [],
  },
  {
    raw: 'momo.love = Infinity;',
    tokens: [
      { type: 'identifier', text: 'momo' },
      { type: 'punct', text: '.' },
      { type: 'property', text: 'love' },
      { type: 'punct', text: ' = ' },
      { type: 'keyword', text: 'Infinity' },
      { type: 'punct', text: ';' },
    ],
  },
  {
    raw: 'faith.keep("close");',
    tokens: [
      { type: 'identifier', text: 'faith' },
      { type: 'punct', text: '.' },
      { type: 'method', text: 'keep' },
      { type: 'punct', text: '(' },
      { type: 'string', text: '"close"' },
      { type: 'punct', text: ');' },
    ],
  },
  {
    raw: 'kindness.mode = "always";',
    tokens: [
      { type: 'identifier', text: 'kindness' },
      { type: 'punct', text: '.' },
      { type: 'property', text: 'mode' },
      { type: 'punct', text: ' = ' },
      { type: 'string', text: '"always"' },
      { type: 'punct', text: ';' },
    ],
  },
  {
    raw: 'responsibility.finish("what_you_start");',
    tokens: [
      { type: 'identifier', text: 'responsibility' },
      { type: 'punct', text: '.' },
      { type: 'method', text: 'finish' },
      { type: 'punct', text: '(' },
      { type: 'string', text: '"what_you_start"' },
      { type: 'punct', text: ');' },
    ],
  },
  {
    raw: '',
    tokens: [],
  },
  {
    raw: 'journey.status = "just getting started";',
    tokens: [
      { type: 'identifier', text: 'journey' },
      { type: 'punct', text: '.' },
      { type: 'property', text: 'status' },
      { type: 'punct', text: ' = ' },
      { type: 'string', text: '"just getting started"' },
      { type: 'punct', text: ';' },
    ],
  },
];

const RAW_CODE_TEXT = CODE_LINES.map((l) => l.raw).join('\n');

export default function LucaCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3, once: true });
  const prefersReducedMotion = usePrefersReducedMotion();

  const [currentLine, setCurrentLine] = useState(
    prefersReducedMotion ? CODE_LINES.length : -1
  );
  const [charOffset, setCharOffset] = useState(prefersReducedMotion ? 999 : 0);
  const [isCompleted, setIsCompleted] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentLine(CODE_LINES.length);
      setCharOffset(999);
      setIsCompleted(true);
      return;
    }

    if (isInView && currentLine === -1) {
      setCurrentLine(0);
      setCharOffset(0);
    }
  }, [isInView, prefersReducedMotion, currentLine]);

  // Line by line typing effect
  useEffect(() => {
    if (
      prefersReducedMotion ||
      currentLine < 0 ||
      currentLine >= CODE_LINES.length
    )
      return;

    const line = CODE_LINES[currentLine];
    // If empty line, jump to next immediately
    if (!line.raw || line.raw.length === 0) {
      const emptyTimer = setTimeout(() => {
        setCurrentLine((c) => c + 1);
        setCharOffset(0);
      }, 70);
      return () => clearTimeout(emptyTimer);
    }

    let charCount = 0;
    const interval = setInterval(() => {
      charCount++;
      setCharOffset(charCount);

      if (charCount >= line.raw.length) {
        clearInterval(interval);
        setTimeout(() => {
          if (currentLine + 1 < CODE_LINES.length) {
            setCurrentLine((c) => c + 1);
            setCharOffset(0);
          } else {
            setIsCompleted(true);
          }
        }, 110);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [currentLine, prefersReducedMotion]);

  // Helper to render partially typed line with token colors
  const renderTokensWithLimit = (tokens: Token[], limit: number) => {
    let remaining = limit;
    const elements = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (remaining <= 0) break;

      const take = Math.min(token.text.length, remaining);
      const textChunk = token.text.slice(0, take);
      remaining -= take;

      let colorClass = 'text-[var(--foreground)]';
      if (token.type === 'keyword') {
        colorClass = 'text-amber-700 dark:text-amber-300 font-semibold';
      } else if (token.type === 'property') {
        colorClass = 'text-[#8C6E4A] dark:text-[#D3AA69]';
      } else if (token.type === 'method') {
        colorClass = 'text-[#A87236] dark:text-[#E0BA7B] font-medium';
      } else if (token.type === 'string') {
        colorClass = 'text-[#4F6A5B] dark:text-[#88A898]';
      } else if (token.type === 'punct') {
        colorClass = 'text-[var(--subtle-foreground)]';
      }

      elements.push(
        <span key={i} className={colorClass}>
          {textChunk}
        </span>
      );
    }

    return elements;
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-xl mx-auto rounded-2xl bg-[var(--surface-soft)] border border-[var(--border)] shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden text-left"
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DDD0] dark:bg-[#3A3D3F]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DDD0] dark:bg-[#3A3D3F]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DDD0] dark:bg-[#3A3D3F]" />
          <span className="ml-2 font-mono text-xs font-semibold text-[var(--muted-foreground)]">
            luca.ts
          </span>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--surface-soft)] border border-[var(--border)] text-[var(--muted-foreground)]">
          TypeScript
        </span>
      </div>

      {/* Accessible semantic code representation */}
      <pre className="sr-only">
        <code>{RAW_CODE_TEXT}</code>
      </pre>

      {/* Editor Body */}
      <div
        aria-hidden="true"
        className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[360px] flex flex-col justify-between"
      >
        <div className="space-y-1">
          {CODE_LINES.map((line, idx) => {
            const isPast =
              idx < currentLine || prefersReducedMotion || isCompleted;
            const isCurrent =
              idx === currentLine && !prefersReducedMotion && !isCompleted;

            if (line.raw.length === 0) {
              return <div key={idx} className="h-4" />;
            }

            return (
              <div key={idx} className="flex items-baseline gap-3">
                <span className="text-[11px] text-[var(--subtle-foreground)] select-none w-5 text-right opacity-60">
                  {idx + 1}
                </span>
                <div className="flex-1 whitespace-pre font-mono">
                  {isPast &&
                    renderTokensWithLimit(line.tokens, line.raw.length)}
                  {isCurrent && renderTokensWithLimit(line.tokens, charOffset)}
                  {isCurrent && (
                    <span className="inline-block ml-0.5 text-[#C98F55] font-mono animate-pulse">
                      ▌
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ready indicator */}
        <div className="mt-5 pt-3 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs text-[var(--muted-foreground)]">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-[#C98F55] font-medium transition-opacity duration-500',
              isCompleted ? 'opacity-100' : 'opacity-0'
            )}
          >
            ready. ✦
          </span>
          <span className="text-[11px] opacity-70">
            journey.status = &ldquo;just getting started&rdquo;
          </span>
        </div>
      </div>
    </div>
  );
}
