import React from 'react';
import { AlertTriangle, Siren } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';

export const EmergencyBanner: React.FC = () => {
  const { t } = useLanguage();
  const { openEmergencyModal } = useSafety();

  return (
    <header className="relative z-10 border-b border-red-900/80 bg-[#8b0000] px-3 py-1.5 text-ivory/90 sm:px-4 sm:py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="hidden min-w-0 items-center gap-2 text-xs md:flex">
          <AlertTriangle className="h-4 w-4 shrink-0 text-gold/80" />
          <span className="truncate">{t('emergency.banner')}</span>
        </div>

        <button
          type="button"
          onClick={() => openEmergencyModal('Immediate emergency support requested')}
          className="mx-auto inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-red-950/70 px-3.5 text-xs font-bold text-white ring-1 ring-red-200/40 transition hover:bg-red-950 md:mx-0 sm:px-4"
        >
          <Siren className="h-3.5 w-3.5" />
          <span>Get Emergency Help</span>
        </button>
      </div>
    </header>
  );
};
