import React from 'react';
import { SupportCenter } from '../../types/directory';
import { PhoneCall, MapPin, Clock, Globe, ShieldCheck, Flag, ArrowUpRight, MessageSquareText, Navigation, ExternalLink } from 'lucide-react';
import { Button } from '../common/Button';
import { SUPPORT_PROGRAM_FILTERS } from '../../types/directory';

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

        {center.verificationStatus === 'verified' ? (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Last verified: {center.lastVerifiedDate}</span>
          </div>
        ) : (
          <span className="text-xs text-amber-200 font-semibold bg-amber-950/50 px-2.5 py-0.5 rounded-full border border-amber-700">
            Verification: {center.verificationStatus.replace('_', ' ')}
          </span>
        )}
      </div>
      <p className="mb-2 text-[10px] text-ivory/45">
        Last updated: {center.lastUpdatedDate || 'Not recorded'}
        {center.verificationStatus === 'verified' && ` · Verified by ${center.verifiedBy}`}
      </p>

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
          {center.website ? (
            <a
              href={center.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              Official website
            </a>
          ) : (
            <span>Official contact details available</span>
          )}
        </div>
      </div>

      <div className="mb-4 space-y-3">
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-gold">Services listed</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {center.serviceTypes.map((service) => (
              <span key={service} className="capitalize rounded-full border border-ivory/10 bg-midnight px-2.5 py-1 text-[10px] text-ivory/70">
                {service.replace('_', ' ')}
              </span>
            ))}
            {center.programs?.map((program) => {
              const label = SUPPORT_PROGRAM_FILTERS.find((option) => option.id === program)?.label || program;
              return (
                <span key={program} className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1 text-[10px] text-champagne">
                  {label}
                </span>
              );
            })}
          </div>
          {!center.programs?.length && (
            <p className="mt-2 text-[10px] text-ivory/45">
              No additional program or population tags have been confirmed for this listing.
            </p>
          )}
        </div>

        <dl className="grid gap-2 rounded-xl border border-charcoal-light bg-midnight/50 p-3 text-[11px] sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-ivory/65">Licensing / accreditation</dt>
            <dd className="mt-0.5 text-ivory/50">
              {center.accreditation
                ? `${center.accreditation.label} — ${center.accreditation.authority} (verified ${center.accreditation.lastVerifiedDate})`
                : 'No verified details listed; contact the facility to confirm.'}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ivory/65">Waiting time</dt>
            <dd className="mt-0.5 text-ivory/50">{center.waitingTime || 'Not published; contact the facility.'}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ivory/65">Cost</dt>
            <dd className="mt-0.5 text-ivory/50">{center.costInformation || 'Not published; confirm directly.'}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ivory/65">Insurance</dt>
            <dd className="mt-0.5 text-ivory/50">{center.insuranceInformation || 'Not listed; confirm directly.'}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-semibold text-ivory/65">Referral process</dt>
            <dd className="mt-0.5 text-ivory/50">
              {center.referralProcess || center.admissionRequirements || 'Not published; contact the facility.'}
            </dd>
          </div>
        </dl>
        <p className="text-[10px] leading-relaxed text-ivory/45">
          Listing verification does not confirm licensing, service availability, cost, or eligibility.
          Please confirm these details with the provider before making plans.
        </p>
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
          <a
            href={`sms:${center.phone.replace(/\s+/g, '')}?body=${encodeURIComponent('I need confidential information about rehabilitation or support. Please advise.')}`}
            className="btn-charcoal px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5"
            aria-label={`Send SMS to ${center.name}`}
          >
            <MessageSquareText className="w-3.5 h-3.5 text-gold" />
            <span>SMS</span>
          </a>

          <Button variant="charcoal" size="sm" onClick={onSelect}>
            View on Map
          </Button>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${center.latitude},${center.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-charcoal px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5"
          >
            <Navigation className="h-3.5 w-3.5 text-gold" />
            Directions
          </a>
          {center.appointmentUrl && (
            <a
              href={center.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-charcoal px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5"
            >
              Online appointment
              <ExternalLink className="h-3.5 w-3.5 text-gold" />
            </a>
          )}
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
