import React, { useState } from 'react';
import { WizardAnswers } from '../../types/wizard';
import { DRUGS_DATA } from '../../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../../data/sriLankaData';
import { Sparkles, MapPin, BookOpen, PhoneCall, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

interface WizardCompletionDashboardProps {
  answers: WizardAnswers;
  onReset: () => void;
  onContinueChat: (initialPrompt?: string) => void;
  onClose: () => void;
}

export const WizardCompletionDashboard: React.FC<WizardCompletionDashboardProps> = ({
  answers,
  onReset,
  onContinueChat,
  onClose,
}) => {
  const { isAuthenticated } = useAuth();
  const [shareConsent, setShareConsent] = useState(false);
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestReference, setRequestReference] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  // Matched substance records
  const matchedDrugs = DRUGS_DATA.filter(
    (d) => answers.substances.includes(d.slug) || answers.substances.includes(d.id)
  );

  // Matched centers by district or province
  const matchedCenters = SUPPORT_CENTERS_DATA.filter((c) => {
    if (answers.district && c.district.toLowerCase() === answers.district.toLowerCase()) {
      return true;
    }
    if (answers.province && c.province.toLowerCase() === answers.province.toLowerCase()) {
      return true;
    }
    return false;
  });

  const centersToDisplay = matchedCenters.length > 0 ? matchedCenters : SUPPORT_CENTERS_DATA.slice(0, 2);
  const supportMethod = answers.supportPreference === 'professional_counseling'
    ? 'professional_guidance'
    : answers.supportPreference === 'rehabilitation_info'
    ? 'visit_institution'
    : answers.supportPreference === 'ai_guided_support'
    ? 'online_assistance'
    : 'not_sure';

  const submitSupportRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!shareConsent || !contactInfo.trim()) return;
    setIsSubmittingRequest(true);
    setRequestError(null);
    try {
      const response = await apiService.request<{ reference: string }>('/api/support-requests', {
        body: {
          supportMethod,
          contactMethod,
          contactInfo: contactInfo.trim(),
          province: answers.province || '',
          district: answers.district || '',
          additionalDetails: [answers.additionalContext, answers.healthInfo]
            .filter(Boolean)
            .join('\n\n')
            .slice(0, 2000),
          assessment: { ...answers, consentedToReferral: true },
          dataShareConsent: true,
          policyVersion: '2026-11-13',
          idempotencyKey: window.crypto.randomUUID(),
        },
      });
      setRequestReference(response.data?.reference || 'Request received');
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'The request could not be submitted. Please try again.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-charcoal to-midnight border border-gold/30 shadow-gold-subtle">
        <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-6 h-6 text-gold" />
        </div>
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          Navigation Pathway Ready
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ivory mt-1">
          Your Personalized Support Plan
        </h2>
        <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
          ඔබ වෙනුවෙන්ම සකස් කළ පුද්ගලාරෝපිත මඟපෙන්වීම
        </p>
        <p className="text-xs text-ivory/70 mt-2 max-w-lg mx-auto leading-relaxed">
          Based on your choices, here is a curated path connecting you with evidence-based resources, verified local care, and confidential support.
        </p>
      </div>

      {/* Grid of Pathways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pathway 1: Recommended Care Centers */}
        <div className="charcoal-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-gold" />
              <h3 className="font-heading font-bold text-lg text-ivory">
                Verified Local Care Centers
              </h3>
            </div>
            <p className="text-xs text-ivory/60 mb-4">
              {answers.district
                ? `Certified support centers located near ${answers.district} District:`
                : 'National certified centers across Sri Lanka:'}
            </p>

            <div className="space-y-3">
              {centersToDisplay.map((center) => (
                <div
                  key={center.id}
                  className="p-3.5 rounded-xl bg-midnight/80 border border-charcoal-light flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-ivory">{center.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">{center.nameSi}</p>
                    <p className="text-xs text-ivory/60 mt-1">{center.city} • {center.province}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-charcoal-light flex items-center justify-between">
                    <span className="text-xs font-mono text-champagne font-bold">{center.phone}</span>
                    <a
                      href={`tel:${center.phone.replace(/\s+/g, '')}`}
                      className="text-xs text-gold hover:underline flex items-center gap-1 font-semibold"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-charcoal-light">
            <Link
              to="/support-directory"
              onClick={onClose}
              className="text-xs text-gold hover:underline flex items-center justify-between font-semibold"
            >
              <span>Explore all Sri Lankan centers on Interactive Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Pathway 2: Verified Knowledge & Evidence */}
        <div className="charcoal-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-gold" />
              <h3 className="font-heading font-bold text-lg text-ivory">
                Evidence-Based Drug Insights
              </h3>
            </div>
            <p className="text-xs text-ivory/60 mb-4">
              Verified pharmacological knowledge and safe cessation guidance:
            </p>

            {matchedDrugs.length > 0 ? (
              <div className="space-y-3">
                {matchedDrugs.map((drug) => (
                  <div key={drug.id} className="p-3.5 rounded-xl bg-midnight/80 border border-charcoal-light">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-ivory">{drug.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-charcoal text-gold border border-gold/20">
                        {drug.classification}
                      </span>
                    </div>
                    <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">{drug.nameSi}</p>
                    <p className="text-xs text-ivory/60 mt-2 line-clamp-2 leading-relaxed">
                      {drug.description}
                    </p>
                    <div className="mt-2 text-[11px] text-red-300/80">
                      <strong>Key Watch:</strong> {drug.emergencySigns[0]}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-midnight/80 border border-charcoal-light text-xs text-ivory/70 space-y-2">
                <p>
                  Browse our full, peer-reviewed Drug Knowledge Library covering pharmacological effects, withdrawal hazards, and evidence-based interventions.
                </p>
                <Link
                  to="/learn"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-gold hover:underline font-semibold"
                >
                  <span>Open Knowledge Library</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-charcoal-light">
            <Link
              to="/learn"
              onClick={onClose}
              className="text-xs text-gold hover:underline flex items-center justify-between font-semibold"
            >
              <span>View full medical details and peer citations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* AI Assistant Handover CTA */}
      <div className="p-6 rounded-2xl bg-charcoal border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-gold/15 text-gold border border-gold/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-base text-ivory">
              Continue Seamlessly with Beyond the Darkness AI
            </h4>
            <p className="text-xs text-ivory/70 mt-0.5">
              Talk through your situation confidentially in Sinhala, English, or Tamil with our AI Assistant.
            </p>
          </div>
        </div>

        <section className="charcoal-card p-5 space-y-4">
          <div>
            <h3 className="font-heading font-bold text-ivory">Request confidential follow-up</h3>
            <p className="text-xs text-ivory/60 mt-1">
              Your answers are currently held only in this open browser session. They are not sent unless you sign in and submit below.
            </p>
          </div>
          {requestReference ? (
            <div role="status" className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 text-xs text-emerald-200">
              Request {requestReference} was submitted. You can follow its status from your <Link to="/profile" onClick={onClose} className="underline">account page</Link>.
            </div>
          ) : !isAuthenticated ? (
            <div className="flex flex-wrap gap-3 text-xs">
              <Link to="/profile?auth=register" onClick={onClose} className="btn-gold px-4 py-2 rounded-xl font-bold">Create account to continue</Link>
              <Link to="/profile" onClick={onClose} className="btn-charcoal px-4 py-2 rounded-xl">Sign in</Link>
            </div>
          ) : (
            <form onSubmit={submitSupportRequest} className="space-y-3">
              <label className="block text-xs text-ivory/80">Preferred reply method
                <select value={contactMethod} onChange={(event) => setContactMethod(event.target.value as 'phone' | 'email')} className="mt-1 w-full p-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory">
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                </select>
              </label>
              <label className="block text-xs text-ivory/80">{contactMethod === 'phone' ? 'Phone number' : 'Email address'}
                <input
                  type={contactMethod === 'phone' ? 'tel' : 'email'}
                  required
                  maxLength={180}
                  value={contactInfo}
                  onChange={(event) => setContactInfo(event.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory"
                />
              </label>
              <label className="flex items-start gap-2 text-xs text-ivory/80">
                <input type="checkbox" checked={shareConsent} onChange={(event) => setShareConsent(event.target.checked)} required className="mt-0.5" />
                <span>I explicitly consent to send my assessment answers and contact information to the platform's support team for review and follow-up. This does not automatically contact a treatment center.</span>
              </label>
              {requestError && <p role="alert" className="text-xs text-red-300">{requestError}</p>}
              <Button type="submit" variant="gold" size="sm" disabled={!shareConsent || !contactInfo.trim() || isSubmittingRequest}>
                {isSubmittingRequest ? 'Submitting...' : 'Submit support request'}
              </Button>
            </form>
          )}
        </section>

        <Button
          variant="gold"
          size="md"
          onClick={() => {
            const prompt = `I completed the guided wizard with focus on ${answers.purpose?.replace(
              /_/g,
              ' '
            )} and ${answers.substances.join(', ') || 'general substances'}. Can you advise me on my next steps?`;
            onContinueChat(prompt);
          }}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Chat with AI Assistant
        </Button>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onReset}
          className="text-xs text-ivory/50 hover:text-gold flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start wizard over from Step 1</span>
        </button>

        <Button variant="charcoal" size="sm" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
};
