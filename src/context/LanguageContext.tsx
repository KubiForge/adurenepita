import React, { createContext, useContext, useEffect } from 'react';
import english from '../locales/en.json';

interface LanguageContextType {
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  t: (key: string) => english[key as keyof typeof english] || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    localStorage.setItem('btd_lang', 'en');
    document.documentElement.lang = 'en';
  }, []);

  const t = (key: string): string => english[key as keyof typeof english] || key;

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
