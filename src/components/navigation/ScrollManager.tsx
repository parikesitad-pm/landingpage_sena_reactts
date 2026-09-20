import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { pathPrefixToLocale } from '@/features/preferences/lib/locale';
import { isHardReload } from '@/lib/scrollRestoration';

function getCanonicalPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && pathPrefixToLocale(parts[0])) {
    const sub = parts.slice(1).join('/');
    return sub ? `/${sub}` : '/';
  }
  return pathname || '/';
}

/**
 * Global ScrollManager
 * Enforces clean scroll reset on hard refresh and new page navigation,
 * while preserving reading location during theme & language changes.
 */
export default function ScrollManager() {
  const location = useLocation();
  const { lenis } = useSmoothScroll();
  const prevPathnameRef = useRef<string | null>(null);
  const prevCanonicalRef = useRef<string | null>(null);
  const isInitialMountRef = useRef<boolean>(true);

  useLayoutEffect(() => {
    const isInitial = isInitialMountRef.current;
    isInitialMountRef.current = false;

    const currentCanonical = getCanonicalPath(location.pathname);
    const prevCanonical = prevCanonicalRef.current;
    const isPathChanged =
      prevPathnameRef.current !== null &&
      location.pathname !== prevPathnameRef.current;
    const isCanonicalChanged =
      prevCanonical !== null && currentCanonical !== prevCanonical;
    const isLocaleSwitch = isPathChanged && !isCanonicalChanged;

    prevPathnameRef.current = location.pathname;
    prevCanonicalRef.current = currentCanonical;

    // =========================================================================
    // 1. Initial Page Mount (Hard Reload vs Direct Hash Entry)
    // =========================================================================
    if (isInitial) {
      if (isHardReload()) {
        // Hard reload must always reset to top without animation
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        lenis?.scrollTo(0, { immediate: true });
        return;
      }

      // First visit with hash (e.g. direct link /en/#protocol)
      if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, {
              offset: -32,
              immediate: true,
            });
          } else {
            target.scrollIntoView({ behavior: 'auto' });
          }
          return;
        }
      }

      // First visit without hash
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      lenis?.scrollTo(0, { immediate: true });
      return;
    }

    // =========================================================================
    // 2. Language Switch Exception (Preserve Context / Section / Relative Progress)
    // =========================================================================
    if (isLocaleSwitch || window.__LUCA_IS_SWITCHING_LOCALE__) {
      window.__LUCA_IS_SWITCHING_LOCALE__ = false;

      // If URL contains a hash section (e.g. /id/#protocol -> /en/#protocol)
      if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, {
              offset: -32,
              immediate: true,
            });
          } else {
            target.scrollIntoView({ behavior: 'auto' });
          }
          window.__LUCA_LOCALE_SWITCH_PROGRESS__ = undefined;
          return;
        }
      }

      // If on dedicated page without hash (e.g. /id/moments -> /ja/moments), restore relative progress
      if (window.__LUCA_LOCALE_SWITCH_PROGRESS__ !== undefined) {
        const progress = window.__LUCA_LOCALE_SWITCH_PROGRESS__;
        window.__LUCA_LOCALE_SWITCH_PROGRESS__ = undefined;

        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const targetY = maxScroll > 0 ? progress * maxScroll : 0;

        window.scrollTo({ top: targetY, left: 0, behavior: 'auto' });
        lenis?.scrollTo(targetY, { immediate: true });
        return;
      }

      // Language switch default: keep current scroll naturally
      return;
    }

    // =========================================================================
    // 3. New Page Navigation (e.g. / -> /moments, /moments -> /logo-philosophy)
    // =========================================================================
    if (isCanonicalChanged) {
      if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, {
              offset: -32,
              immediate: true,
            });
          } else {
            target.scrollIntoView({ behavior: 'auto' });
          }
          return;
        }
      }

      // New page without hash always starts at top
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      lenis?.scrollTo(0, { immediate: true });
      return;
    }

    // =========================================================================
    // 4. Same Page Hash Change (e.g. clicking /#protocol while on /)
    // =========================================================================
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target as HTMLElement, {
            offset: -32,
            duration: 0.9,
          });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [location.pathname, location.hash, lenis]);

  return null;
}
