import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import type {
  ThemePreference,
  ResolvedTheme,
  SupportedLocale,
  LanguagePreference,
} from "../types";
import {
  getStoredThemePreference,
  resolveTheme,
  applyTheme,
  setStoredThemePreference,
} from "../lib/theme";
import {
  getStoredLanguagePreference,
  resolveLocale,
  setStoredLanguagePreference,
} from "../lib/locale";
import i18n from "@/i18n/config";

interface PreferencesContextType {
  themePreference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (pref: ThemePreference) => void;
  languagePreference: LanguagePreference;
  activeLocale: SupportedLocale;
  setLanguage: (pref: LanguagePreference) => void;
  setActiveLocaleOverride: (locale: SupportedLocale) => void;
}

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  // Theme state
  const [themePref, setThemePref] = useState<ThemePreference>(() => getStoredThemePreference());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(getStoredThemePreference())
  );

  // Language state
  const [langPref, setLangPref] = useState<LanguagePreference>(() =>
    getStoredLanguagePreference()
  );
  const [activeLocale, setActiveLocale] = useState<SupportedLocale>(() =>
    resolveLocale(getStoredLanguagePreference())
  );

  // Sync theme changes
  const setTheme = useCallback((newPref: ThemePreference) => {
    setThemePref(newPref);
    setStoredThemePreference(newPref);
    const resolved = resolveTheme(newPref);
    setResolvedTheme(resolved);
  }, []);

  // Sync language changes
  const setLanguage = useCallback((newPref: LanguagePreference) => {
    setLangPref(newPref);
    setStoredLanguagePreference(newPref);
    const resolved = resolveLocale(newPref);
    setActiveLocale(resolved);
    i18n.changeLanguage(resolved);
    if (typeof document !== "undefined") {
      document.documentElement.lang = resolved;
    }
  }, []);

  // Allow URL-based override for locale
  const setActiveLocaleOverride = useCallback((locale: SupportedLocale) => {
    setActiveLocale(locale);
    i18n.changeLanguage(locale);
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, []);

  // Listen to OS theme changes when in "system" mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (themePref === "system") {
        const nextResolved: ResolvedTheme = mediaQuery.matches ? "dark" : "light";
        setResolvedTheme(nextResolved);
        applyTheme(nextResolved);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Apply current theme
    applyTheme(resolvedTheme);

    // Enable smooth transitions only after initial load to avoid white flash
    const timer = setTimeout(() => {
      document.documentElement.dataset.themeReady = "true";
    }, 50);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      clearTimeout(timer);
    };
  }, [themePref, resolvedTheme]);

  // Initial i18n & HTML lang sync
  useEffect(() => {
    i18n.changeLanguage(activeLocale);
    document.documentElement.lang = activeLocale;
  }, [activeLocale]);

  return (
    <PreferencesContext.Provider
      value={{
        themePreference: themePref,
        resolvedTheme,
        setTheme,
        languagePreference: langPref,
        activeLocale,
        setLanguage,
        setActiveLocaleOverride,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesContextType {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
