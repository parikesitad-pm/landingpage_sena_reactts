import type { SupportedLocale, LanguagePreference } from "../types";

const LANGUAGE_STORAGE_KEY = "luca-language";

export function detectDeviceLocale(): SupportedLocale {
  if (typeof window === "undefined" || !navigator) return "en";

  const languages = navigator.languages || [navigator.language];
  for (const lang of languages) {
    if (!lang) continue;
    const normalized = lang.toLowerCase();
    if (normalized.startsWith("id")) return "id";
    if (normalized.startsWith("zh")) return "zh-CN";
    if (normalized.startsWith("ja")) return "ja";
    if (normalized.startsWith("ko")) return "ko";
    if (normalized.startsWith("en")) return "en";
  }

  return "en";
}

export function getStoredLanguagePreference(): LanguagePreference {
  if (typeof window === "undefined") return "system";
  try {
    const val = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (
      val === "system" ||
      val === "en" ||
      val === "id" ||
      val === "zh-CN" ||
      val === "ja" ||
      val === "ko"
    ) {
      return val as LanguagePreference;
    }
  } catch {
    // Ignore storage failures
  }
  return "system";
}

export function resolveLocale(preference: LanguagePreference): SupportedLocale {
  if (preference === "system") {
    return detectDeviceLocale();
  }
  return preference;
}

export function setStoredLanguagePreference(preference: LanguagePreference): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, preference);
  } catch {
    // Ignore storage failures
  }
}

export function localeToPathPrefix(locale: SupportedLocale): string {
  if (locale === "zh-CN") return "zh-cn";
  return locale;
}

export function pathPrefixToLocale(prefix: string): SupportedLocale | null {
  const norm = prefix.toLowerCase();
  if (norm === "en") return "en";
  if (norm === "id") return "id";
  if (norm === "zh-cn" || norm === "zh") return "zh-CN";
  if (norm === "ja") return "ja";
  if (norm === "ko") return "ko";
  return null;
}
