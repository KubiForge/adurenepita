import React from 'react';
import { AlertTriangle, Siren, WifiOff } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';

export const EmergencyBanner: React.FC = () => {
  const { t } = useLanguage();
  const { openEmergencyModal } = useSafety();

  return (
    <header className="relative z-10 border-b border-white/20 bg-[#8b1e2d] px-2.5 py-1.5 pt-[max(0.375rem,env(safe-area-inset-top))] text-white sm:px-4 sm:py-2">
      <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-2 sm:min-h-0">
        <div className="hidden min-w-0 items-center gap-2 text-xs md:flex">
          <AlertTriangle className="h-4 w-4 shrink-0 text-white/90" />
          <span className="truncate">{t('emergency.banner')}</span>
        </div>

        <p className="max-w-[210px] text-[9.5px] leading-[1.35] text-white/90 md:hidden">
          {t('emergency.mobileBanner')}
        </p>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
          <a
            href="/offline-emergency.html"
            aria-label={t('emergency.offline')}
            title={t('emergency.offline')}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-white/35 px-2 text-[10px] font-bold text-white hover:bg-white/10 sm:px-3 sm:text-xs"
          >
            <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t('emergency.offline')}</span>
          </a>
          <button
            type="button"
            onClick={() => openEmergencyModal()}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-[#701625] px-2.5 text-[10px] font-bold text-white ring-1 ring-white/30 transition hover:bg-[#5d1020] sm:px-3 sm:text-xs"
            aria-label={t('emergency.btn')}
          >
            <Siren className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t('emergency.getHelp')}</span>
            <span className="sm:hidden">{t('emergency.mobileBtn')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
