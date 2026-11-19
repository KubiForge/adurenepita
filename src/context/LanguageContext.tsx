import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import i18n from '../i18n';

export type AppLanguage = 'en' | 'si' | 'ta';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => undefined,
  t: (key: string, values?: Record<string, string | number>) =>
    String(values ? i18n.t(key, values) : i18n.t(key)),
});

const isAppLanguage = (value: string | null): value is AppLanguage =>
  value === 'en' || value === 'si' || value === 'ta';

const getSavedLanguage = (): AppLanguage => {
  try {
    const savedLanguage = window.localStorage.getItem('btd_lang');
    return isAppLanguage(savedLanguage) ? savedLanguage : 'en';
  } catch (error) {
    console.warn('Saved language preference could not be read.', error);
    return 'en';
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<AppLanguage>(getSavedLanguage);
  const [languageRevision, setLanguageRevision] = useState(0);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem('btd_lang', language);
    } catch (error) {
      console.warn('Language preference could not be saved.', error);
    }
    void i18n.changeLanguage(language).then(() => {
      document.title = String(i18n.t('app.documentTitle'));
      setLanguageRevision((revision) => revision + 1);
    });
  }, [language]);

  const t = useCallback(
    (key: string, values?: Record<string, string | number>): string =>
      String(values ? i18n.t(key, values) : i18n.t(key)),
    [languageRevision],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
