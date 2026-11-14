import React from 'react';
import { SupportCenter } from '../../types/directory';
import { PhoneCall, MapPin, Clock, Globe, ShieldCheck, Flag, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

interface SupportCenterCardProps {
  center: SupportCenter;
  isSelected?: boolean;
  onSelect: () => void;
  onRequestReferral: (center: SupportCenter) => void;
  onReportError: (center: SupportCenter) => void;
}

export const SupportCenterCard: React.FC<SupportCenterCardProps> = ({
  center,
  isSelected = false,
  onSelect,
  onRequestReferral,
  onReportError,
}) => {
  return (
    <div
      className={`charcoal-card p-5 sm:p-6 transition-all duration-200 border ${
        isSelected
          ? 'border-gold shadow-gold-subtle bg-charcoal'
          : 'border-charcoal-light hover:border-gold/40'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-midnight text-gold border border-gold/30">
            {center.organizationType}
          </span>
          <span className="text-xs text-ivory/60 font-semibold">
            {center.district} • {center.city}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified: {center.lastVerifiedDate}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold font-heading text-ivory leading-snug">
        {center.name}
      </h3>

      <p className="text-xs text-ivory/70 line-clamp-2 leading-relaxed mb-4">
        {center.description}
      </p>

      {/* Details List */}
      <div className="space-y-2 text-xs text-ivory/70 border-t border-b border-charcoal-light py-3 mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
          <span>{center.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <span>{center.operatingHours}</span>
        </div>

        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-gold flex-shrink-0" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <a
            href={`tel:${center.phone.replace(/\s+/g, '')}`}
            className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{center.phone}</span>
          </a>

          <Button variant="charcoal" size="sm" onClick={onSelect}>
            View on Map
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onRequestReferral(center)}
            className="text-xs text-champagne hover:text-gold font-semibold underline flex items-center gap-1"
          >
            <span>Request Referral</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onReportError(center)}
            className="text-[11px] text-ivory/40 hover:text-red-400 transition-colors flex items-center gap-1"
            title="Report inaccurate contact or address details"
          >
            <Flag className="w-3 h-3" />
            <span className="hidden sm:inline">Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
