export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export type SupportedLocale = "en" | "id" | "zh-CN" | "ja" | "ko";
export type LanguagePreference = "system" | SupportedLocale;

export interface LocaleDefinition {
  code: SupportedLocale;
  label: string;
  nativeLabel: string;
  pathPrefix: string;
}

export const SUPPORTED_LOCALES: LocaleDefinition[] = [
  { code: "en", label: "English", nativeLabel: "English", pathPrefix: "en" },
  { code: "id", label: "Indonesian", nativeLabel: "Bahasa Indonesia", pathPrefix: "id" },
  { code: "zh-CN", label: "Chinese (Simplified)", nativeLabel: "中文", pathPrefix: "zh-cn" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", pathPrefix: "ja" },
  { code: "ko", label: "Korean", nativeLabel: "한국어", pathPrefix: "ko" },
];
