import React, { useState } from 'react';
import { MapPin, ShieldCheck, X, Navigation } from 'lucide-react';
import { PROVINCES_AND_DISTRICTS } from '../../data/sriLankaData';
import { useLanguage } from '../../context/LanguageContext';

interface LocationConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelected: (location?: { latitude: number; longitude: number }, districtName?: string) => void;
}

export const LocationConsentModal: React.FC<LocationConsentModalProps> = ({
  isOpen,
  onClose,
  onLocationSelected,
}) => {
  const { language } = useLanguage();
  const [isLocating, setIsLocating] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRequestGps = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        onLocationSelected({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        onClose();
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation denied or failed:', err);
        setErrorMsg('Location permission was denied or timed out. You can select your district below instead.');
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  const handleManualDistrictSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDistrict) return;
    onLocationSelected(undefined, selectedDistrict);
    onClose();
  };

  const allDistricts = PROVINCES_AND_DISTRICTS.flatMap((p) => p.districts);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-gold/40 bg-midnight p-5 sm:p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-ivory/60 hover:text-gold hover:bg-charcoal transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 border-b border-charcoal-light pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 border border-gold/30 text-gold">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-ivory">
              {language === 'si'
                ? 'ළඟම ඇති සේවාවන් සොයන්න'
                : language === 'ta'
                ? 'அருகிலுள்ள மையங்களைக் கண்டறியவும்'
                : 'Find Support Centres Near You'}
            </h3>
            <p className="text-[11px] text-ivory/60">
              {language === 'si' ? 'ස්ථාන අවසරය සහ පෞද්ගලිකත්වය' : 'Location consent & privacy'}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-ivory/80 leading-relaxed">
          {language === 'si'
            ? 'ශ්‍රී ලංකාවේ පිළිගත් ප්‍රතිකාර මධ්‍යස්ථාන, රජයේ රෝහල් සහ හදිසි ඒකක ඔබ සිටින ස්ථානයට ඇති දුර අනුව සෙවීමට පමණක් ඔබගේ ස්ථාන දත්ත භාවිතා වේ. මෙම තොරතුරු කිසිදු සේවාදායකයක සටහන් නොවේ.'
            : 'AASHI uses your location solely to calculate distance to verified rehabilitation facilities and government hospitals. Your location is never logged or stored on any server.'}
        </p>

        {errorMsg && (
          <div className="mt-2.5 rounded-xl border border-amber-500/40 bg-amber-950/30 p-2.5 text-xs text-amber-200">
            {errorMsg}
          </div>
        )}

        <div className="mt-4 space-y-3">
          {/* Button: Automatic GPS Location */}
          <button
            onClick={handleRequestGps}
            disabled={isLocating}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-champagne hover:opacity-90 active:scale-98 text-midnight font-bold py-3 px-4 shadow-gold-subtle transition-all text-xs sm:text-sm disabled:opacity-50"
          >
            <Navigation className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>
              {isLocating
                ? language === 'si' ? 'ස්ථානය ලබා ගනිමින්...' : 'Detecting your location...'
                : language === 'si' ? 'මගේ වත්මන් ස්ථානය බෙදාගන්න' : 'Use Current Device Location'}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 text-[11px] text-ivory/40">
            <div className="flex-1 border-t border-charcoal-light"></div>
            <span>{language === 'si' ? 'හෝ දිස්ත්‍රික්කය තෝරන්න' : 'or choose district manually'}</span>
            <div className="flex-1 border-t border-charcoal-light"></div>
          </div>

          {/* Form: Manual District Selection */}
          <form onSubmit={handleManualDistrictSubmit} className="space-y-2">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full rounded-xl border border-charcoal-light bg-charcoal px-3 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
            >
              <option value="">
                {language === 'si' ? '-- දිස්ත්‍රික්කය තෝරන්න --' : '-- Select Sri Lankan District --'}
              </option>
              {allDistricts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name} {language === 'si' ? `(${d.nameSi})` : language === 'ta' ? `(${d.nameTa})` : ''}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={!selectedDistrict}
              className="w-full rounded-xl border border-gold/40 bg-midnight hover:bg-charcoal py-2 text-xs font-semibold text-gold disabled:opacity-40 transition-colors"
            >
              {language === 'si' ? 'මෙම දිස්ත්‍රික්කයේ සේවාවන් සොයන්න' : 'Search Centers in Selected District'}
            </button>
          </form>
        </div>

        <div className="mt-4 pt-3 border-t border-charcoal-light/60 flex items-center justify-center gap-1.5 text-[10px] text-ivory/50">
          <ShieldCheck className="h-3 w-3 text-gold" />
          <span>100% Confidential & Secure • No GPS data is stored</span>
        </div>
      </div>
    </div>
  );
};
