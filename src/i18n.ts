import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import si from './locales/si.json';
import ta from './locales/ta.json';

i18n
  .use(LanguageDetector) // auto-detect from localStorage, navigator, htmlTag
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      si: { translation: si },
      ta: { translation: ta },
    },
    fallbackLng: 'en',
    detection: {
      // order: where to read the language from
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'], // persist selection
    },
    interpolation: { escapeValue: false }, // React already escapes
  });

export default i18n;

