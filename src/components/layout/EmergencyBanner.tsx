import React from 'react';
import { AlertTriangle, Siren } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';

export const EmergencyBanner: React.FC = () => {
  const { t } = useLanguage();
  const { openEmergencyModal } = useSafety();

  return (
    <header className="relative z-10 border-b border-red-900/80 bg-[#8b0000] px-2.5 py-1.5 pt-[max(0.375rem,env(safe-area-inset-top))] text-ivory/90 sm:px-4 sm:py-2">
      <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-2 sm:min-h-0">
        <div className="hidden min-w-0 items-center gap-2 text-xs md:flex">
          <AlertTriangle className="h-4 w-4 shrink-0 text-gold/80" />
          <span className="truncate">{t('emergency.banner')}</span>
        </div>

        <p className="max-w-[210px] text-[9.5px] leading-[1.35] text-ivory/85 md:hidden">
          If experiencing an overdose or severe medical danger, get help immediately.
        </p>

        <button
          type="button"
          onClick={() => openEmergencyModal('Immediate emergency support requested')}
          className="ml-auto inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full bg-red-950/70 px-2.5 text-[10px] font-bold text-white ring-1 ring-red-200/40 transition hover:bg-red-950 sm:px-3 sm:text-xs md:mx-0"
        >
          <Siren className="h-3.5 w-3.5" />
          <span>Get Emergency Help</span>
        </button>
      </div>
    </header>
  );
};
