import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';
import { Language } from '../../types';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'si', label: 'Sinhala', native: 'සිංහල' },
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  return (
    <div className={`inline-flex items-center gap-1 bg-charcoal/80 border border-gold/20 rounded-full p-1 text-xs ${className}`}>
      <Globe className="w-3.5 h-3.5 text-gold/80 ml-1.5 hidden sm:inline" />
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          className={`px-2.5 py-1 rounded-full font-medium transition-all ${
            language === l.code
              ? 'bg-gold text-midnight font-bold shadow-sm'
              : 'text-ivory/70 hover:text-ivory hover:bg-charcoal-light'
          }`}
          aria-label={`Switch language to ${l.label}`}
        >
          {l.native}
        </button>
      ))}
    </div>
  );
};
