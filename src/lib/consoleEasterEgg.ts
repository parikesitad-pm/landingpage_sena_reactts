declare global {
  interface Window {
    __LUCA_CONSOLE_SHOWN__?: boolean;
  }
}

/**
 * Tasteful production-only developer console easter egg.
 * Runs once during application bootstrap with Tokyo Night styling.
 */
export function showConsoleEasterEgg(): void {
  if (typeof window === 'undefined') return;
  if (window.__LUCA_CONSOLE_SHOWN__) return;
  window.__LUCA_CONSOLE_SHOWN__ = true;

  try {
    const mono =
      'font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, Consolas, monospace;';
    const titleGold = `color: #e0af68; font-size: 15px; font-weight: 800; ${mono}`;
    const badgeMuted = `color: #565f89; font-size: 11px; font-weight: 500; ${mono}`;
    const introMuted = `color: #9aa5ce; font-size: 12px; font-style: italic; ${mono}`;
    const propBlue = `color: #7aa2f7; font-size: 12px; ${mono}`;
    const opCyan = `color: #89ddff; font-size: 12px; ${mono}`;
    const strGreen = `color: #9ece6a; font-size: 12px; ${mono}`;
    const numGold = `color: #e0af68; font-size: 12px; font-weight: 600; ${mono}`;
    const commentMuted = `color: #565f89; font-size: 12px; font-style: italic; ${mono}`;
    const dividerStyle = `color: #34364a; font-size: 11px; ${mono}`;
    const footerGold = `color: #e0af68; font-size: 12px; font-weight: 600; ${mono}`;
    const ctaGreen = `color: #73daca; font-size: 12px; font-weight: 500; ${mono}`;

    console.log(
      '%c✦ LUCA  %cEST. 2025\n\n' +
        '%cHello, curious human.\n\n' +
        '%cprotocol.version %c= %c"1.0"%c;\n' +
        '%cmomo.love %c= %cInfinity%c;\n' +
        '%cauthority.level %c= %c"Popo"%c;\n\n' +
        '%ccrafted.by %c= %c"Popo"%c;\n' +
        '%cbuilt.for %c= %c"Luca"%c;\n\n' +
        '%c// Popo wrote the code. Luca writes the story.\n\n' +
        '%cfuture.path %c= %c"Luca decides"%c;\n\n' +
        '%c────────────────────────────────────\n' +
        '%cJust a proud Popo & Momo. ♥\n' +
        '%cSay hi to Luca → https://wa.me/6282298503412',
      titleGold,
      badgeMuted,
      introMuted,
      propBlue,
      opCyan,
      strGreen,
      opCyan,
      propBlue,
      opCyan,
      numGold,
      opCyan,
      propBlue,
      opCyan,
      strGreen,
      opCyan,
      propBlue,
      opCyan,
      strGreen,
      opCyan,
      propBlue,
      opCyan,
      strGreen,
      opCyan,
      commentMuted,
      propBlue,
      opCyan,
      strGreen,
      opCyan,
      dividerStyle,
      footerGold,
      ctaGreen
    );
  } catch {
    // Gracefully handle environments where console styles are unsupported
  }
}
