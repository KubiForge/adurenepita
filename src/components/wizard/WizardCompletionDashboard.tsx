import React, { useState } from 'react';
import { WizardAnswers } from '../../types/wizard';
import { DRUGS_DATA } from '../../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../../data/sriLankaData';
import { Sparkles, MapPin, BookOpen, PhoneCall, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';
import { SupportRequestModal } from './SupportRequestModal';
import { CONTACT_INFO } from '../../config/contactInfo';

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
  const [supportRequestOpen, setSupportRequestOpen] = useState(false);
  // Matched substance records
  const matchedDrugs = DRUGS_DATA.filter(
    (d) => answers.substances.includes(d.slug) || answers.substances.includes(d.id)
  );

  const preferredService = answers.supportPreference === 'professional_counseling'
    ? 'counseling'
    : answers.supportPreference === 'healthcare_professional'
      ? 'medical'
      : answers.supportPreference === 'rehabilitation_info'
        ? 'rehabilitation'
        : undefined;
  const centersToDisplay = SUPPORT_CENTERS_DATA
    .filter((center) => center.verificationStatus === 'verified')
    .map((center) => {
      const districtMatch = Boolean(answers.district && center.district.toLowerCase() === answers.district.toLowerCase());
      const provinceMatch = Boolean(answers.province && center.province.toLowerCase() === answers.province.toLowerCase());
      const serviceMatch = Boolean(preferredService && center.serviceTypes.includes(preferredService));
      return { center, score: (districtMatch ? 8 : 0) + (provinceMatch ? 4 : 0) + (serviceMatch ? 3 : 0) };
    })
    .filter(({ center, score }) => score > 0 || (!answers.district && !answers.province && !preferredService && center.serviceTypes.includes('rehabilitation')))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ center }) => center);
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-charcoal to-midnight border border-gold/30 shadow-gold-subtle">
        <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-6 h-6 text-gold" />
        </div>
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          Your next steps
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ivory mt-1">
          Your Personalized Path to Support
        </h2>
        <p className="text-xs text-ivory/70 mt-2 max-w-lg mx-auto leading-relaxed">
          These options reflect what you chose to share. They are support suggestions, not a diagnosis or clinical assessment.
        </p>
      </div>

      {answers.urgentSymptoms?.includes('immediate_emergency') && (
        <div role="alert" className="rounded-2xl border border-red-300/50 bg-red-950/40 p-5 text-red-50">
          <h3 className="font-bold">Emergency help comes first</h3>
          <p className="mt-1 text-sm">Do not wait to complete a support request. Call Sri Lanka's Suwaseriya ambulance service at {CONTACT_INFO.emergency.ambulance.number} for immediate medical help.</p>
          <a href={`tel:${CONTACT_INFO.emergency.ambulance.number}`} className="mt-3 inline-flex min-h-11 items-center rounded-xl bg-red-100 px-4 font-bold text-red-950">Call {CONTACT_INFO.emergency.ambulance.number}</a>
        </div>
      )}

      <section className="rounded-2xl border border-gold/25 bg-midnight/60 p-5">
        <h3 className="font-heading text-lg font-bold text-ivory">A few possible next steps</h3>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-ivory/75">
          {answers.purpose === 'drug_info' || answers.purpose === 'prevention_info' ? (
            <li>Explore the learning library for information related to your questions.</li>
          ) : (
            <li>Consider speaking with a qualified healthcare professional or counsellor about the concern.</li>
          )}
          {answers.currentState === 'possible_withdrawal' && <li>Ask a medical professional for guidance about possible withdrawal; alcohol and sedative withdrawal can be dangerous without medical care.</li>}
          {answers.purpose === 'worried_about_someone' && <li>Consider seeking guidance for yourself as someone supporting another person. Share only information you are authorized to share.</li>}
          <li>Contact a service directly to confirm its current availability, eligibility, and referral process.</li>
        </ul>
      </section>

      {/* Grid of Pathways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pathway 1: Recommended Care Centers */}
        <div className="charcoal-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-gold" />
              <h3 className="font-heading font-bold text-lg text-ivory">
                Relevant Support Services
              </h3>
            </div>
            <p className="text-xs text-ivory/60 mb-4">
              {answers.district
                ? `Verified listings in or relevant to ${answers.district}. Please contact each service to confirm current availability.`
                : 'Verified listings that may fit your preferences. Please confirm services directly.'}
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
                        Verified listing
                      </span>
                    </div>
                    <p className="text-xs text-ivory/60 mt-1">{center.city} • {center.province}</p>
                  </div>

                  <div className="mt-2 text-xs text-ivory/60">
                    <p>{center.address}</p>
                    <p className="mt-1">Last verified {center.lastVerifiedDate} by {center.verifiedBy}</p>
                    {center.email && <p className="mt-1">{center.email}</p>}
                    {center.website && <a className="mt-1 inline-block text-gold underline" href={center.website} target="_blank" rel="noreferrer">Visit official website</a>}
                    <a className="ml-3 inline-block text-gold underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`} target="_blank" rel="noreferrer">Directions</a>
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
            {centersToDisplay.length === 0 && (
              <p className="rounded-xl border border-charcoal-light bg-midnight/70 p-4 text-xs leading-5 text-ivory/65">
                No verified listing matched the details selected. Browse the support directory or contact the NDDCB helpline on 1927 for guidance. Current service availability should be confirmed directly.
              </p>
            )}
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
              Brief educational information to help you prepare questions for a qualified professional. Do not stop alcohol or sedative medicines suddenly without medical guidance.
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
              Continue without an account. No assessment answers are included automatically; share only what you are comfortable having processed by the AI service.
            </p>
          </div>
        </div>

        <section className="charcoal-card p-5 space-y-4">
          <div>
            <h3 className="font-heading font-bold text-ivory">Request Help / Ask for Support</h3>
            <p className="text-xs text-ivory/60 mt-1">
              Prepare a simple support summary that you can voluntarily show to a qualified professional. No account or sign-in is required.
            </p>
          </div>
          <Button variant="gold" size="sm" onClick={() => setSupportRequestOpen(true)}>
            Create My Support Request
          </Button>
        </section>

        <Button
          variant="gold"
          size="md"
          onClick={() => {
            const prompt = 'I would like general guidance about finding support and possible next steps. Please do not assume any personal or health details.';
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
      <SupportRequestModal
        isOpen={supportRequestOpen}
        onClose={() => setSupportRequestOpen(false)}
        answers={answers}
        centers={centersToDisplay}
      />
    </div>
  );
};
