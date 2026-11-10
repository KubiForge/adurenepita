import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { SupportCenter, SupportReferralRequest } from '../../types/directory';
import { Button } from '../common/Button';
import { apiService } from '../../services/apiService';
import { ShieldCheck, PhoneCall, Mail, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReferralRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  center: SupportCenter | null;
}

export const ReferralRequestModal: React.FC<ReferralRequestModalProps> = ({
  isOpen,
  onClose,
  center,
}) => {
  const [preferredLanguage, setPreferredLanguage] = useState<'si' | 'en' | 'ta'>('si');
  const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'in_person'>('phone');
  const [contactInfo, setContactInfo] = useState('');
  const [briefConcern, setBriefConcern] = useState('');
  const [explicitConsent, setExplicitConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!center) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!explicitConsent || !contactInfo.trim()) return;

    setIsSubmitting(true);
    const requestPayload: SupportReferralRequest = {
      centerId: center.id,
      preferredLanguage,
      contactMethod,
      contactInfo,
      briefConcern: briefConcern.trim() || undefined,
      explicitConsentGiven: true,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    try {
      await apiService.request('/api/support-requests', {
        method: 'POST',
        body: requestPayload,
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Referral submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setContactInfo('');
    setBriefConcern('');
    setExplicitConsent(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      maxWidth="lg"
      title={
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-gold" />
          <span>Confidential Professional Referral Pathway</span>
        </div>
      }
    >
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-charcoal border border-charcoal-light">
            <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
              Selected Care Facility
            </span>
            <h4 className="font-bold text-sm text-ivory mt-0.5">{center.name}</h4>
            <p className="text-xs text-ivory/60 mt-0.5">{center.city} • Official Tel: {center.phone}</p>
          </div>

          <div className="p-3 rounded-lg bg-midnight/80 border border-gold/20 text-xs text-ivory/70 space-y-1">
            <p className="font-semibold text-gold">Strict Privacy & Autonomy Guarantee:</p>
            <p>
              Your AI conversation history is NEVER shared with third parties or medical units. You may also contact this facility directly using their public phone ({center.phone}) without completing this form.
            </p>
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-xs font-semibold text-ivory mb-1">
              Preferred Language for Communication (භාෂාව)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'si', label: 'සිංහල (Sinhala)' },
                { id: 'en', label: 'English' },
                { id: 'ta', label: 'தமிழ் (Tamil)' },
              ].map((l) => (
                <button
                  type="button"
                  key={l.id}
                  onClick={() => setPreferredLanguage(l.id as any)}
                  className={`p-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    preferredLanguage === l.id
                      ? 'bg-charcoal border-gold text-gold'
                      : 'bg-midnight border-charcoal-light text-ivory/70 hover:border-gold/30'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block text-xs font-semibold text-ivory mb-1">
              Preferred Contact Channel
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setContactMethod('phone')}
                className={`p-2.5 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                  contactMethod === 'phone'
                    ? 'bg-charcoal border-gold text-gold'
                    : 'bg-midnight border-charcoal-light text-ivory/70'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Telephone / WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setContactMethod('email')}
                className={`p-2.5 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                  contactMethod === 'email'
                    ? 'bg-charcoal border-gold text-gold'
                    : 'bg-midnight border-charcoal-light text-ivory/70'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Notice</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-xs font-semibold text-ivory mb-1">
              {contactMethod === 'phone' ? 'Phone Number or WhatsApp (දුරකථන අංකය)' : 'Email Address'}
            </label>
            <input
              type={contactMethod === 'phone' ? 'tel' : 'email'}
              required
              placeholder={contactMethod === 'phone' ? 'e.g. 077 123 4567' : 'e.g. help@example.com'}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
            />
          </div>

          {/* Brief Concern (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-ivory mb-1">
              Brief Concern or Preferred Time (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Inquiring about outpatient counseling for alcohol use; prefer a callback after 5:00 PM."
              value={briefConcern}
              onChange={(e) => setBriefConcern(e.target.value)}
              className="w-full p-3 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold leading-relaxed"
            />
          </div>

          {/* Explicit Consent */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={explicitConsent}
                onChange={(e) => setExplicitConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-charcoal-light text-gold focus:ring-gold bg-midnight"
              />
              <span className="text-[11px] text-ivory/80 leading-snug">
                I give explicit consent for this contact detail to be securely transmitted to {center.name} for the sole purpose of scheduling an appointment.
              </span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-charcoal-light">
            <Button variant="charcoal" size="sm" type="button" onClick={handleReset}>
              Cancel
            </Button>
            <Button
              variant="gold"
              size="sm"
              type="submit"
              disabled={!explicitConsent || !contactInfo.trim() || isSubmitting}
              isLoading={isSubmitting}
            >
              Submit Confidential Request
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-heading text-ivory">
            Referral Request Transmitted Confidentially
          </h3>
          <p className="text-xs text-gold/80 font-sinhalaSerif">
            ඔබගේ ඉල්ලීම සාර්ථකව යොමුකරන ලදී
          </p>
          <p className="text-xs text-ivory/70 max-w-md mx-auto leading-relaxed">
            Your inquiry has been queued for {center.name}. A representative will reach out via your preferred method. Remember, you can also call them directly at <strong>{center.phone}</strong> anytime during operating hours.
          </p>
          <div className="pt-4">
            <Button variant="gold" size="sm" onClick={handleReset}>
              Close & Return to Directory
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
