import { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface Token {
  type:
    | 'keyword'
    | 'identifier'
    | 'object'
    | 'property'
    | 'function'
    | 'string'
    | 'infinity'
    | 'operator'
    | 'punct';
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
      { type: 'operator', text: ' = ' },
      { type: 'string', text: '"Muhammad Gabriel Luca Senna"' },
      { type: 'punct', text: ';' },
    ],
  },
  {
    raw: 'const born = "2025-02-13";',
    tokens: [
      { type: 'keyword', text: 'const ' },
      { type: 'identifier', text: 'born' },
      { type: 'operator', text: ' = ' },
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
      { type: 'object', text: 'dream' },
      { type: 'punct', text: '.' },
      { type: 'property', text: 'source' },
      { type: 'operator', text: ' = ' },
      { type: 'string', text: '"Popo"' },
      { type: 'punct', text: ';' },
    ],
  },
  {
    raw: 'future.path = "Luca decides";',
    tokens: [
      { type: 'object', text: 'future' },
      { type: 'punct', text: '.' },
      { type: 'property', text: 'path' },
      { type: 'operator', text: ' = ' },
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
      { type: 'object', text: 'momo' },
      { type: 'punct', text: '.' },
      { type: 'property', text: 'love' },
      { type: 'operator', text: ' = ' },
      { type: 'infinity', text: 'Infinity' },
      { type: 'punct', text: ';' },
    ],
  },
  {
    raw: '',
    tokens: [],
  },
  {
    raw: 'faith.keep("close");',
    tokens: [
      { type: 'object', text: 'faith' },
      { type: 'punct', text: '.' },
      { type: 'function', text: 'keep' },
      { type: 'punct', text: '(' },
      { type: 'string', text: '"close"' },
      { type: 'punct', text: ');' },
    ],
  },
  {
    raw: 'kindness.mode = "always";',
    tokens: [
      { type: 'object', text: 'kindness' },
      { type: 'punct', text: '.' },
      { type: 'property', text: 'mode' },
      { type: 'operator', text: ' = ' },
      { type: 'string', text: '"always"' },
      { type: 'punct', text: ';' },
    ],
  },
  {
    raw: '',
    tokens: [],
  },
  {
    raw: 'responsibility.finish("what_you_start");',
    tokens: [
      { type: 'object', text: 'responsibility' },
      { type: 'punct', text: '.' },
      { type: 'function', text: 'finish' },
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
      { type: 'object', text: 'journey' },
      { type: 'punct', text: '.' },
      { type: 'property', text: 'status' },
      { type: 'operator', text: ' = ' },
      { type: 'string', text: '"just getting started"' },
      { type: 'punct', text: ';' },
    ],
  },
];

const RAW_CODE_TEXT = CODE_LINES.map((l) => l.raw).join('\n');

export default function LucaCodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    threshold: 0.2,
    rootMargin: '100px 0px 0px 0px',
    once: true,
  });
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
      // Short 180ms delay before code starts typing
      const initTimer = setTimeout(() => {
        setCurrentLine(0);
        setCharOffset(0);
      }, 180);
      return () => clearTimeout(initTimer);
    }
  }, [isInView, prefersReducedMotion, currentLine]);

  // Line by line typing effect (18-26ms per character)
  useEffect(() => {
    if (
      prefersReducedMotion ||
      currentLine < 0 ||
      currentLine >= CODE_LINES.length
    )
      return;

    const line = CODE_LINES[currentLine];
    // Empty line: short 120ms pause, then advance
    if (!line.raw || line.raw.length === 0) {
      const emptyTimer = setTimeout(() => {
        setCurrentLine((c) => c + 1);
        setCharOffset(0);
      }, 120);
      return () => clearTimeout(emptyTimer);
    }

    let charCount = 0;
    const interval = setInterval(() => {
      charCount++;
      setCharOffset(charCount);

      if (charCount >= line.raw.length) {
        clearInterval(interval);
        // Logical block pauses (160ms)
        setTimeout(() => {
          if (currentLine + 1 < CODE_LINES.length) {
            setCurrentLine((c) => c + 1);
            setCharOffset(0);
          } else {
            // Final ready state ~250ms after final line
            setTimeout(() => {
              setIsCompleted(true);
            }, 250);
          }
        }, 160);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [currentLine, prefersReducedMotion]);

  // Render partially typed line with Tokyo Night semantic token colors
  const renderTokensWithLimit = (tokens: Token[], limit: number) => {
    let remaining = limit;
    const elements = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (remaining <= 0) break;

      const take = Math.min(token.text.length, remaining);
      const textChunk = token.text.slice(0, take);
      remaining -= take;

      let colorStyle = { color: '#c0caf5' };
      if (token.type === 'keyword') {
        colorStyle = { color: '#bb9af7' }; // Tokyo Night violet
      } else if (token.type === 'object') {
        colorStyle = { color: '#7aa2f7' }; // Tokyo Night cyan-blue
      } else if (token.type === 'property') {
        colorStyle = { color: '#7dcfff' }; // Tokyo Night cyan
      } else if (token.type === 'function') {
        colorStyle = { color: '#7aa2f7' }; // Tokyo Night soft blue
      } else if (token.type === 'string') {
        colorStyle = { color: '#9ece6a' }; // Tokyo Night soft green
      } else if (token.type === 'infinity') {
        colorStyle = { color: '#e0af68' }; // Tokyo Night warm gold / LUCA amber
      } else if (token.type === 'operator') {
        colorStyle = { color: '#a9b1d6' }; // Tokyo Night soft operator gray
      } else if (token.type === 'punct') {
        colorStyle = { color: '#8990b3' }; // Subtle punctuation
      }

      elements.push(
        <span key={i} style={colorStyle}>
          {textChunk}
        </span>
      );
    }

    return elements;
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-xl mx-auto rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] overflow-hidden text-left border"
      style={{
        backgroundColor: '#1a1b26', // Tokyo Night background
        borderColor: '#34364a',
      }}
    >
      {/* Editor Chrome & Tabs */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b select-none"
        style={{
          backgroundColor: '#202231', // Tokyo Night surface
          borderColor: '#34364a',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Three Restrained Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
          </div>

          {/* Active File Tab */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-t text-xs font-mono font-medium border-t-2"
            style={{
              backgroundColor: '#1a1b26',
              color: '#c0caf5',
              borderTopColor: '#7aa2f7',
            }}
          >
            <span style={{ color: '#7aa2f7' }}>TS</span>
            <span>luca.ts</span>
          </div>
        </div>

        {/* TypeScript Badge */}
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded font-semibold border tracking-wide"
            style={{
              backgroundColor: '#24283b',
              color: '#7aa2f7',
              borderColor: '#3b4261',
            }}
          >
            TypeScript v5.7
          </span>
        </div>
      </div>

      {/* Accessible semantic code for screen readers */}
      <pre className="sr-only">
        <code>{RAW_CODE_TEXT}</code>
      </pre>

      {/* Editor Body with Active Line Highlighting */}
      <div
        aria-hidden="true"
        className="p-3 sm:p-5 font-mono text-[11px] sm:text-xs md:text-sm leading-relaxed overflow-x-auto min-h-[380px] flex flex-col justify-between"
        style={{ color: '#c0caf5' }}
      >
        <div className="space-y-0.5">
          {CODE_LINES.map((line, idx) => {
            const isPast =
              idx < currentLine || prefersReducedMotion || isCompleted;
            const isCurrent =
              idx === currentLine && !prefersReducedMotion && !isCompleted;

            if (line.raw.length === 0) {
              return (
                <div key={idx} className="flex items-baseline gap-3 h-4">
                  <span
                    className="text-[11px] select-none w-5 text-right font-mono"
                    style={{ color: '#565f89', opacity: 0.5 }}
                  >
                    {idx + 1}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={cn(
                  'flex items-baseline gap-3 px-1.5 py-0.5 rounded transition-colors duration-150',
                  isCurrent && 'bg-[#24283b]/80 shadow-[inset_2px_0_0_#7aa2f7]'
                )}
              >
                {/* Line Numbers in JetBrains Mono */}
                <span
                  className="text-[11px] select-none w-5 text-right font-mono flex-shrink-0"
                  style={{
                    color: isCurrent ? '#c0caf5' : '#565f89',
                    opacity: isCurrent ? 1 : 0.6,
                  }}
                >
                  {idx + 1}
                </span>

                {/* Line Code Content */}
                <div className="flex-1 whitespace-pre font-mono">
                  {isPast &&
                    renderTokensWithLimit(line.tokens, line.raw.length)}
                  {isCurrent && renderTokensWithLimit(line.tokens, charOffset)}
                  {isCurrent && (
                    <span
                      className="inline-block ml-0.5 font-mono animate-pulse"
                      style={{ color: '#e0af68' }} // LUCA gold cursor
                    >
                      ▌
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Editor Status Bar / Ready Indicator */}
        <div
          className="mt-4 pt-3 border-t flex items-center justify-between font-mono text-xs select-none"
          style={{
            borderColor: '#34364a',
            color: '#565f89',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 font-semibold transition-opacity duration-300',
                isCompleted ? 'opacity-100' : 'opacity-0'
              )}
              style={{ color: '#e0af68' }}
            >
              ready. ✦
            </span>
            <span
              className="text-[10px] hidden sm:inline"
              style={{ color: '#565f89' }}
            >
              UTF-8 &middot; LF
            </span>
          </div>

          <span className="text-[11px]" style={{ color: '#9ece6a' }}>
            journey.status = &ldquo;just getting started&rdquo;
          </span>
        </div>
      </div>
    </div>
  );
}
