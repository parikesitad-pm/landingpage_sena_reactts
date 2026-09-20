/**
 * Global Scroll Restoration & Reload Reset Manager
 * Applies globally to all pages, routes, and locales.
 */

declare global {
  interface Window {
    __LUCA_LOCALE_SWITCH_PROGRESS__?: number;
    __LUCA_IS_SWITCHING_LOCALE__?: boolean;
    __LUCA_INITIAL_RELOAD_CHECKED__?: boolean;
  }
}

/**
 * Checks if the current page load was triggered by a real browser reload.
 * Uses the Navigation Timing API.
 */
export function isHardReload(): boolean {
  if (typeof window === 'undefined' || typeof performance === 'undefined') {
    return false;
  }

  const navEntry = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;

  return navEntry?.type === 'reload';
}

/**
 * Initializes global scroll restoration at application bootstrap.
 * Must be executed synchronously before React mounts and before normal navigation.
 */
export function initGlobalScrollRestoration(): void {
  if (typeof window === 'undefined') return;

  // 1. Disable automatic native browser scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // 2. Immediate reset on hard reload
  if (isHardReload()) {
    // If a stale hash remained in the URL during hard refresh, remove it cleanly
    if (window.location.hash) {
      history.replaceState(
        history.state,
        '',
        window.location.pathname + window.location.search
      );
    }

    // Immediately snap viewport to top before first paint without smooth animation
    if (document.documentElement) {
      document.documentElement.style.scrollBehavior = 'auto';
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    requestAnimationFrame(() => {
      if (document.documentElement) {
        document.documentElement.style.scrollBehavior = '';
      }
    });
  }
}

/**
 * Captures current relative scroll progress before a language switch
 * so the destination locale layout can restore the equivalent reading position.
 */
export function captureLocaleSwitchProgress(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

  window.__LUCA_LOCALE_SWITCH_PROGRESS__ = progress;
  window.__LUCA_IS_SWITCHING_LOCALE__ = true;
}
