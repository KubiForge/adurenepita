import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Link } from 'react-router-dom';
import { SupportCenter } from '../../types/directory';
import { Button } from '../common/Button';
import { apiService } from '../../services/apiService';
import { ShieldCheck, PhoneCall, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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
  const { isAuthenticated } = useAuth();
  const [preferredLanguage, setPreferredLanguage] = useState<'si' | 'en' | 'ta'>('si');
  const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'in_person'>('phone');
  const [contactInfo, setContactInfo] = useState('');
  const [briefConcern, setBriefConcern] = useState('');
  const [explicitConsent, setExplicitConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestReference, setRequestReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!center) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!explicitConsent || !contactInfo.trim()) return;

    setIsSubmitting(true);
    setError(null);
    const requestPayload = {
      centerId: center.id,
      supportMethod: 'professional_guidance',
      contactMethod: contactMethod === 'in_person' ? 'phone' : contactMethod,
      contactInfo,
      additionalDetails: briefConcern.trim(),
      province: center.province,
      district: center.district,
      assessment: {
        purpose: 'professional_support',
        preferredLanguage,
        consentedToReferral: true,
      },
      dataShareConsent: true,
      policyVersion: '2026-11-13',
      idempotencyKey: window.crypto.randomUUID(),
    };

    try {
      const response = await apiService.request<{ reference: string }>('/api/support-requests', {
        method: 'POST',
        body: requestPayload,
      });
      setRequestReference(response.data?.reference || null);
      setIsSuccess(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'The request could not be submitted. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setContactInfo('');
    setBriefConcern('');
    setExplicitConsent(false);
    setError(null);
    setRequestReference(null);
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
      {!isAuthenticated ? (
        <div className="space-y-4 text-sm">
          <p className="text-ivory/75">Sign in with a verified account to submit a confidential request. You can also contact {center.name} directly at <strong className="text-gold">{center.phone}</strong>.</p>
          <div className="flex gap-3">
            <Link to="/profile" onClick={onClose} className="btn-gold px-4 py-2 rounded-xl text-xs font-bold">Sign in</Link>
            <Link to="/profile?auth=register" onClick={onClose} className="btn-charcoal px-4 py-2 rounded-xl text-xs">Create account</Link>
          </div>
        </div>
      ) : !isSuccess ? (
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
              Your AI conversation history is not included. This request is reviewed by the platform support team; it is not automatically sent to the institution. You may also contact this facility directly at {center.phone}.
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
                I explicitly consent to share the contact details and information entered here with the platform support team so they can review my request and respond with support options. I understand this does not schedule an appointment or automatically share my details with {center.name}.
              </span>
            </label>
          </div>

          {error && <p role="alert" className="p-3 rounded-xl bg-red-950/70 border border-red-800 text-xs text-red-200 flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</p>}

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
          {requestReference && <p className="font-mono text-gold text-sm">{requestReference}</p>}
          <p className="text-xs text-ivory/70 max-w-md mx-auto leading-relaxed">
            Your request has been sent to the platform's confidential support queue for review. The institution has not been contacted on your behalf. You can track updates from your account or contact {center.name} directly at <strong>{center.phone}</strong>.
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
