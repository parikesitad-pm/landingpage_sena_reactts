import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import id from './locales/id/translation.json';
import zhCN from './locales/zh-CN/translation.json';
import ja from './locales/ja/translation.json';
import ko from './locales/ko/translation.json';

export const resources = {
  en: { translation: en },
  id: { translation: id },
  'zh-CN': { translation: zhCN },
  ja: { translation: ja },
  ko: { translation: ko },
} as const;

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
