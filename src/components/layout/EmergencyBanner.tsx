import React from 'react';
import { PhoneCall, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';

export const EmergencyBanner: React.FC = () => {
  const { t } = useLanguage();
  const { openEmergencyModal } = useSafety();
  const isHome = useLocation().pathname === '/';

  return (
    <aside
      aria-label="Crisis & Medical Emergency Support"
      className={`relative z-50 border-b border-red-500/30 text-ivory text-xs py-2 px-4 transition-all ${
        isHome ? 'bg-red-950/55' : 'bg-red-950/80'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span className="font-medium text-ivory/90 hidden sm:inline">
            {t('emergency.banner')}
          </span>
          <span className="font-medium text-ivory/90 sm:hidden">
            හදිසි අවස්ථාවක්ද? 1990 (ගිලන්රථ) / 1927 (මත්ද්‍රව්‍ය උපදේශන)
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <a
            href="tel:1927"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-charcoal hover:bg-gold/20 text-gold border border-gold/30 font-semibold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1927 NDDCB</span>
          </a>

          <a
            href="tel:1990"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-bold transition-colors shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1990 සුවසැරිය</span>
          </a>

          <button
            onClick={() => openEmergencyModal()}
            className="hidden md:inline-flex items-center gap-1 text-ivory/70 hover:text-gold text-xs underline ml-1"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-gold" />
            <span>{t('emergency.btn')}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
