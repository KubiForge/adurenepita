import React from 'react';
import { NearbySupportResult } from '../../types/chat';
import { MapPin, Phone, ExternalLink, ShieldCheck, Navigation } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface NearbyCentersCardProps {
  centers: NearbySupportResult[];
}

export const NearbyCentersCard: React.FC<NearbyCentersCardProps> = ({ centers }) => {
  const { language } = useLanguage();

  if (!centers || centers.length === 0) return null;

  return (
    <div className="my-3 space-y-2.5 rounded-2xl border border-gold/30 bg-midnight/90 p-3.5 sm:p-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-charcoal-light pb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gold" />
          <h4 className="font-heading text-xs sm:text-sm font-bold text-ivory">
            {language === 'si'
              ? 'තහවුරු කරන ලද සහන හා ප්‍රතිකාර මධ්‍යස්ථාන'
              : language === 'ta'
              ? 'சரிபார்க்கப்பட்ட ஆதரவு மற்றும் சிகிச்சை மையங்கள்'
              : 'Verified Support & Rehabilitation Centres'}
          </h4>
        </div>
        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold border border-gold/30">
          Sri Lanka Directory
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
        {centers.map((center) => (
          <div
            key={center.id}
            className="flex flex-col justify-between rounded-xl border border-charcoal-light bg-charcoal/70 p-3 hover:border-gold/50 transition-all hover:bg-charcoal"
          >
            <div>
              <div className="flex items-start justify-between gap-1.5">
                <h5 className="font-bold text-xs sm:text-sm text-ivory leading-tight">
                  {language === 'si' && center.nameSi ? center.nameSi : language === 'ta' && center.nameTa ? center.nameTa : center.name}
                </h5>
                {center.distanceKm != null && (
                  <span className="shrink-0 rounded bg-gold/20 px-1.5 py-0.5 text-[10px] font-bold text-gold">
                    {center.distanceKm} km
                  </span>
                )}
              </div>

              <p className="mt-1 text-[11px] text-ivory/60 leading-tight">
                {language === 'si' && center.addressSi ? center.addressSi : center.address}
              </p>

              {/* Service Badges */}
              <div className="mt-2 flex flex-wrap gap-1">
                {center.serviceTypes.map((st, i) => (
                  <span
                    key={i}
                    className="rounded bg-midnight px-1.5 py-0.5 text-[9px] font-medium uppercase text-ivory/70 border border-charcoal-light"
                  >
                    {st.replace(/_/g, ' ')}
                  </span>
                ))}
                {center.isFreeOrGovernmentFunded && (
                  <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
                    Free / Govt
                  </span>
                )}
              </div>
            </div>

            {/* Actions: Call & Directions */}
            <div className="mt-3 pt-2 border-t border-charcoal-light/60 flex items-center justify-between gap-2 text-xs">
              <a
                href={`tel:${center.phone}`}
                className="inline-flex items-center gap-1.5 font-bold text-gold hover:text-champagne transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{center.phone}</span>
              </a>

              {center.mapsUrl && (
                <a
                  href={center.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-ivory/70 hover:text-gold transition-colors"
                >
                  <Navigation className="h-3 w-3 text-gold" />
                  <span>
                    {language === 'si' ? 'මඟ පෙන්වීම්' : language === 'ta' ? 'திசைகள்' : 'Directions'}
                  </span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              )}
            </div>

            {center.verifiedBy && (
              <div className="mt-1.5 flex items-center gap-1 text-[9px] text-emerald-400/80">
                <ShieldCheck className="h-3 w-3" />
                <span>Verified: {center.verifiedBy}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
