
import React, { useEffect, useRef, useState } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const languageOptions = [
    { value: 'en' as const, label: t('language.en'), short: 'EN' },
    { value: 'si' as const, label: t('language.si'), short: 'සිං' },
    { value: 'ta' as const, label: t('language.ta'), short: 'த' },
  ];

  const active = languageOptions.find(
    (option) => option.value === language
  );

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div
      ref={selectorRef}
      className="language-selector relative z-[100] inline-flex"
    >
      <button
        type="button"
        aria-label={t('accessibility.language')}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((previous) => !previous)}
        className="
          group inline-flex h-10 items-center gap-2
          rounded-xl border border-gold/30
          bg-white/10 px-3.5
          text-xs font-semibold text-ivory
          shadow-sm backdrop-blur-xl
          transition-all duration-200
          hover:border-gold/60 hover:bg-white/15
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-gold/60
        "
      >
        <Languages className="h-4 w-4 text-gold" />

        <span>{active?.short ?? 'EN'}</span>

        <ChevronDown
          className={`h-3.5 w-3.5 text-gold/70 transition-transform duration-200 ${open ? 'rotate-180' : ''
            }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="
            absolute right-0 top-full mt-2
            z-[110] w-48
            overflow-hidden rounded-2xl
            border border-gold/20
            bg-[#18191b]
            shadow-[0_12px_40px_rgba(0,0,0,0.35)]
            animate-in fade-in slide-in-from-top-2
            duration-200
          "
        >
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/70">
              Language
            </p>
            <p className="mt-1 text-xs text-ivory/50">
              Choose your preferred language
            </p>
          </div>

          <div className="p-1.5">
            {languageOptions.map((option) => {
              const selected = language === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => {
                    setLanguage(option.value);
                    setOpen(false);
                  }}
                  className={`
                    flex w-full items-center justify-between
                    rounded-xl px-3 py-3
                    text-left text-sm
                    transition-all duration-150
                    ${selected
                      ? 'bg-gold/10 text-gold'
                      : 'text-ivory/80 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <span className="font-medium">
                    {option.label}
                  </span>

                  {selected && (
                    <Check className="h-4 w-4 text-gold" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
