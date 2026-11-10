import React from 'react';
import { WizardAnswers } from '../../types/wizard';
import { DRUGS_DATA } from '../../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../../data/sriLankaData';
import { Sparkles, MapPin, BookOpen, PhoneCall, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

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
