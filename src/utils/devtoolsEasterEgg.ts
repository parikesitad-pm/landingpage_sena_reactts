let hasInitialized = false;

/**
 * Tasteful console easter egg for visitors who open browser DevTools.
 * Runs strictly once per page load with zero impact on rendering, SEO, or a11y.
 */
export function initDevToolsEasterEgg(): void {
  if (typeof window === 'undefined' || hasInitialized) return;
  hasInitialized = true;

  try {
    const goldStyle =
      'color: #e0af68; font-weight: 700; font-size: 13px; font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, Consolas, monospace;';
    const bodyStyle =
      'color: #c0caf5; font-size: 11px; font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, Consolas, monospace; line-height: 1.5;';
    const codeStyle =
      'color: #7aa2f7; font-size: 11px; font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, Consolas, monospace;';
    const closeStyle =
      'color: #a9b1d6; font-style: italic; font-size: 11px; font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, Consolas, monospace;';

    console.log(
      '%c✦ LUCA\n' +
        '%cHello, curious human.\n\n' +
        '%cmomo.love = Infinity;\nauthority.level = "Popo";\n\n' +
        '%cHello, World.\nKeep becoming.',
      goldStyle,
      bodyStyle,
      codeStyle,
      closeStyle
    );
  } catch {
    // Gracefully ignore environments where console or CSS logging is restricted
  }
}
