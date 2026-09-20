import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { pathPrefixToLocale } from '@/features/preferences/lib/locale';
import { isHardReload, type ScrollSnapshot } from '@/lib/scrollRestoration';

function getCanonicalPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && pathPrefixToLocale(parts[0])) {
    const sub = parts.slice(1).join('/');
    return sub ? `/${sub}` : '/';
  }
  return pathname || '/';
}

interface NavigationState {
  preserveScroll?: boolean;
  reason?: string;
  scrollSnapshot?: ScrollSnapshot;
}

/**
 * Global ScrollManager
 *
 * Navigation Rules:
 * - HARD REFRESH: top (behavior: 'auto')
 * - NEW PAGE NAVIGATION: top (behavior: 'auto')
 * - ANCHOR CLICK: target section (smooth scroll)
 * - THEME CHANGE: preserve exact current viewport (0px movement, no action)
 * - LANGUAGE CHANGE: preserve logical section & offset or relative progress
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

    const navState = location.state as NavigationState | undefined;
    const currentCanonical = getCanonicalPath(location.pathname);
    const prevCanonical = prevCanonicalRef.current;
    const isPathChanged =
      prevPathnameRef.current !== null &&
      location.pathname !== prevPathnameRef.current;
    const isCanonicalChanged =
      prevCanonical !== null && currentCanonical !== prevCanonical;

    const isLocaleSwitch =
      navState?.preserveScroll === true ||
      navState?.reason === 'locale-change' ||
      window.__LUCA_IS_SWITCHING_LOCALE__ ||
      (isPathChanged && !isCanonicalChanged);

    prevPathnameRef.current = location.pathname;
    prevCanonicalRef.current = currentCanonical;

    // =========================================================================
    // 1. Initial Page Mount (Hard Reload vs Direct Entry)
    // =========================================================================
    if (isInitial) {
      if (isHardReload()) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        lenis?.scrollTo(0, { immediate: true });
        return;
      }

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

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      lenis?.scrollTo(0, { immediate: true });
      return;
    }

    // =========================================================================
    // 2. Language Switch Exception (Preserve Section + Offset / Relative Progress)
    // =========================================================================
    if (isLocaleSwitch) {
      window.__LUCA_IS_SWITCHING_LOCALE__ = false;
      const snapshot =
        navState?.scrollSnapshot || window.__LUCA_SCROLL_SNAPSHOT__;
      window.__LUCA_SCROLL_SNAPSHOT__ = undefined;

      const restoreScroll = () => {
        // Priority A: Target section from snapshot or hash
        const targetSectionId =
          snapshot?.sectionId ||
          (location.hash ? location.hash.replace(/^#/, '') : undefined);

        if (targetSectionId) {
          const targetEl = document.getElementById(targetSectionId);
          if (targetEl) {
            const rect = targetEl.getBoundingClientRect();
            const currentScrollY =
              window.scrollY || document.documentElement.scrollTop;
            const elementTopInDocument = rect.top + currentScrollY;
            const probeY = 80;
            const offset = snapshot?.offsetWithinSection ?? 0;
            const targetY = Math.max(0, elementTopInDocument - probeY + offset);

            if (lenis) {
              lenis.scrollTo(targetY, { immediate: true });
            } else {
              window.scrollTo({ top: targetY, left: 0, behavior: 'auto' });
            }
            return;
          }
        }

        // Priority B: Relative progress (for dedicated pages like /moments or /logo-philosophy)
        if (snapshot?.relativeProgress !== undefined) {
          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const targetY = snapshot.relativeProgress * maxScroll;
          if (lenis) {
            lenis.scrollTo(targetY, { immediate: true });
          } else {
            window.scrollTo({ top: targetY, left: 0, behavior: 'auto' });
          }
          return;
        }

        // Priority C: Absolute Y fallback
        if (snapshot?.absoluteY !== undefined) {
          if (lenis) {
            lenis.scrollTo(snapshot.absoluteY, { immediate: true });
          } else {
            window.scrollTo({ top: snapshot.absoluteY, left: 0, behavior: 'auto' });
          }
        }
      };

      // Restore immediately in layout effect before browser paint
      restoreScroll();

      // Second check in next animation frame to accommodate font loading & DOM reflow
      const rafId = requestAnimationFrame(restoreScroll);
      return () => cancelAnimationFrame(rafId);
    }

    // =========================================================================
    // 3. New Canonical Page Navigation (e.g. / -> /moments, /moments -> /logo-philosophy)
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

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      lenis?.scrollTo(0, { immediate: true });
      return;
    }

    // =========================================================================
    // 4. Same Page Hash Navigation (e.g. clicking /#protocol while on /)
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
  }, [location.pathname, location.hash, location.state, lenis]);

  return null;
}
