/**
 * Global Scroll Restoration & Reload Reset Manager
 * Applies globally to all pages, routes, and locales.
 */

export type ScrollSnapshot = {
  sectionId?: string;
  offsetWithinSection?: number;
  absoluteY: number;
  relativeProgress?: number;
};

declare global {
  interface Window {
    __LUCA_SCROLL_SNAPSHOT__?: ScrollSnapshot;
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
 * Captures semantic scroll snapshot before a language switch
 * Records sectionId + offsetWithinSection, absoluteY, and relativeProgress.
 */
export function captureScrollSnapshot(): ScrollSnapshot {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { absoluteY: 0, relativeProgress: 0 };
  }

  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const relativeProgress = scrollY / maxScroll;

  // Probe line just below the sticky navbar (64px + safe margin)
  const probeY = 80;

  // Find candidate sections with IDs
  const candidateElements = Array.from(
    document.querySelectorAll<HTMLElement>(
      'section[id], [id].scroll-reveal, [id].scroll-mt-12, main [id]'
    )
  );

  let bestSectionId: string | undefined;
  let bestOffset = 0;

  // Priority 1: Check if probe line falls directly inside a section with an id
  for (const el of candidateElements) {
    const id = el.id;
    if (!id || id === 'root' || id.includes('sentinel')) continue;

    const rect = el.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom > probeY) {
      bestSectionId = id;
      bestOffset = Math.max(0, probeY - rect.top);
      break;
    }
  }

  // Priority 2: If probe line is between sections, find the closest section above or near
  if (!bestSectionId) {
    let minDistance = Infinity;
    for (const el of candidateElements) {
      const id = el.id;
      if (!id || id === 'root' || id.includes('sentinel')) continue;

      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.top - probeY);
      if (dist < minDistance) {
        minDistance = dist;
        bestSectionId = id;
        bestOffset = Math.max(0, probeY - rect.top);
      }
    }
  }

  const snapshot: ScrollSnapshot = {
    sectionId: bestSectionId,
    offsetWithinSection: bestOffset,
    absoluteY: scrollY,
    relativeProgress,
  };

  window.__LUCA_SCROLL_SNAPSHOT__ = snapshot;
  window.__LUCA_IS_SWITCHING_LOCALE__ = true;

  return snapshot;
}
