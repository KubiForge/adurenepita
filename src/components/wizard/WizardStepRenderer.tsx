import React, { useState } from 'react';
import { WizardAnswers, WizardPurpose, UserSituation, ConcernDuration, CurrentState, SupportPreference, PersonNeedingSupport, UseFrequency, PreviousSupport } from '../../types/wizard';
import { PROVINCES_AND_DISTRICTS } from '../../data/sriLankaData';
import { DRUGS_DATA } from '../../data/drugsData';
import { CONTACT_INFO } from '../../config/contactInfo';
import { Check, Search, AlertCircle, Info, Sparkles, MapPin } from 'lucide-react';

interface WizardStepRendererProps {
  currentStep: number;
  answers: WizardAnswers;
  onChange: (updated: Partial<WizardAnswers>) => void;
  onEditStep: (stepNumber: number) => void;
}

export const WizardStepRenderer: React.FC<WizardStepRendererProps> = ({
  currentStep,
  answers,
  onChange,
  onEditStep,
}) => {
  const [substanceSearch, setSubstanceSearch] = useState('');

  // STEP 01 - PURPOSE
  if (currentStep === 1) {
    const purposeOptions: { id: WizardPurpose; title: string; desc: string }[] = [
      {
        id: 'stop_using',
        title: 'I want to stop using substances',
        desc: 'Compassionate, non-judgmental guidance and safe medical withdrawal navigation.',
      },
      {
        id: 'reduce_use',
        title: 'I want to reduce my substance use',
        desc: 'Explore support and speak with a qualified professional about safer next steps.',
      },
      {
        id: 'drug_info',
        title: 'I want information about drugs',
        desc: 'Evidence-based pharmacology, risks, warning signs, and facts.',
      },
      {
        id: 'worried_about_someone',
        title: 'I am worried about someone',
        desc: 'Advice on compassionate communication, boundary setting, and family support.',
      },
      {
        id: 'health_concern',
        title: 'I have health concerns',
        desc: 'Recognizing urgent medical signs, toxicity, and clinical care direction.',
      },
      {
        id: 'professional_support',
        title: 'I need professional support',
        desc: 'Explore listed Sri Lankan counselling and rehabilitation services.',
      },
      {
        id: 'rehabilitation_facilities',
        title: 'I am looking for rehabilitation facilities',
        desc: 'Compare listed services and confirm suitability directly with a qualified provider.',
      },
      {
        id: 'exploring_options',
        title: 'I am exploring options privately',
        desc: 'Take your time. You can skip questions and view information without sharing your identity.',
      },
      {
        id: 'prevention_info',
        title: 'I want prevention education',
        desc: 'Resources for university students, educators, schools, and communities.',
      },
    ];

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gold font-semibold">Step 01 of 10</span>
          <h2 className="text-2xl font-bold font-heading text-ivory mt-1">What brings you here today?</h2>
          <p className="text-xs text-ivory/60 mt-2 max-w-md mx-auto">
            Select the statement that best matches your current focus. Your draft stays in this browser session unless you explicitly submit it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {purposeOptions.map((opt) => {
            const isSelected = answers.purpose === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onChange({ purpose: opt.id })}
                className={`p-4 rounded-xl text-left border transition-all relative flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-charcoal border-gold shadow-gold-subtle ring-1 ring-gold'
                    : 'bg-midnight/70 border-charcoal-light hover:border-gold/40 hover:bg-charcoal/50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-sm text-ivory group-hover:text-champagne transition-colors">
                      {opt.title}
                    </h3>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ml-2 ${
                        isSelected ? 'border-gold bg-gold text-midnight' : 'border-charcoal-light'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-xs text-ivory/60 mt-1.5 leading-snug">{opt.desc}</p>
                </div>
          </button>
            );
          })}
        </div>
        {answers.purpose === 'other' && (
          <label className="mx-auto block max-w-xl text-xs font-semibold text-ivory/80">
            What would you like support with? (Optional)
            <input value={answers.purposeOther || ''} onChange={(event) => onChange({ purposeOther: event.currentTarget.value.slice(0, 240) })} maxLength={240} className="mt-2 min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight px-3 text-sm" />
          </label>
        )}
      </div>
    );
  }

  // STEP 02 - SITUATION
  if (currentStep === 2) {
    const personOptions: { id: PersonNeedingSupport; label: string }[] = [
      { id: 'myself', label: 'Myself' },
      { id: 'family_member', label: 'A family member' },
      { id: 'friend', label: 'A friend' },
      { id: 'partner', label: 'My partner' },
      { id: 'someone_under_care', label: 'Someone under my care' },
      { id: 'someone_else', label: 'Someone else' },
      { id: 'prefer_not_to_say', label: 'Prefer not to say' },
    ];
    const situationOptions: { id: UserSituation; label: string }[] = [
      { id: 'currently_using', label: 'Currently using regularly' },
      { id: 'recently_stopped', label: 'Recently stopped / in early recovery' },
      { id: 'trying_to_reduce', label: 'Trying to reduce or cut down' },
      { id: 'difficult_to_stay_away', label: 'Finding it difficult to stay away (cravings)' },
      { id: 'considering_help', label: 'Considering professional help for the first time' },
      { id: 'unsure', label: 'Unsure / Exploring options quietly' },
    ];

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gold font-semibold">Step 02 of 10</span>
          <h2 className="text-2xl font-bold font-heading text-ivory mt-1">Who are you seeking support for?</h2>
        </div>

        <div className="space-y-2.5 max-w-xl mx-auto">
          <p className="text-xs font-semibold text-gold">Who are you seeking support for?</p>
          <div className="flex flex-wrap gap-2">
            {personOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => onChange({ personNeedingSupport: option.id })}
                className={`px-3 py-2 rounded-lg text-xs border ${answers.personNeedingSupport === option.id ? 'bg-charcoal border-gold text-gold' : 'bg-midnight border-charcoal-light text-ivory/70'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {answers.personNeedingSupport === 'someone_else' && (
            <label className="block pt-2 text-xs text-ivory/75">
              Optional description (no names needed)
              <input value={answers.personDescription || ''} onChange={(event) => onChange({ personDescription: event.currentTarget.value.slice(0, 120) })} maxLength={120} className="mt-2 min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight px-3 text-sm" />
            </label>
          )}
          <p className="text-xs font-semibold text-gold pt-2">Which best describes the current situation?</p>
          {situationOptions.map((opt) => {
            const isSelected = answers.situation === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onChange({ situation: opt.id })}
                className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-charcoal border-gold shadow-gold-subtle'
                    : 'bg-midnight/70 border-charcoal-light hover:border-gold/40'
                }`}
              >
                <div>
                  <span className="font-semibold text-sm text-ivory block">{opt.label}</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-gold bg-gold text-midnight' : 'border-charcoal-light'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // STEP 03 - SUBSTANCE (Searchable Multi-Select)
  if (currentStep === 3) {
    const allSubstances = [
      { id: 'methamphetamine', label: 'Methamphetamine (Crystal Meth / ICE)' },
      { id: 'heroin', label: 'Heroin (Brown Sugar / Kudu)' },
      { id: 'alcohol', label: 'Alcohol (Arrack / Beer / Spirits)' },
      { id: 'cannabis', label: 'Cannabis (Ganja / KG / Weed)' },
      { id: 'prescription_drugs', label: 'Prescription Medication Misuse (Benzos, Tramadol, Pregabalin)' },
      { id: 'benzodiazepines', label: 'Benzodiazepines (for example, diazepam)' },
      { id: 'tramadol', label: 'Tramadol' },
      { id: 'pregabalin', label: 'Pregabalin' },
      { id: 'tobacco', label: 'Tobacco & Nicotine (Cigarettes, Vapes)' },
      { id: 'cocaine', label: 'Cocaine & Crack' },
      { id: 'multiple_substances', label: 'Multiple substances' },
      { id: 'other', label: 'Other synthetic or unknown substance' },
      { id: 'not_sure', label: "I'm not sure" },
      { id: 'prefer_not_to_say', label: 'Prefer not to say' },
    ];

    const filtered = allSubstances.filter(
      (s) => s.label.toLowerCase().includes(substanceSearch.toLowerCase())
    );

    const toggleSubstance = (id: string) => {
      let current = [...answers.substances];
      if (id === 'prefer_not_to_say' || id === 'not_sure') {
        current = [id];
      } else {
        current = current.filter((x) => x !== 'prefer_not_to_say' && x !== 'not_sure');
        if (current.includes(id)) {
          current = current.filter((x) => x !== id);
        } else {
          current.push(id);
        }
      }
      onChange({ substances: current });
    };

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gold font-semibold">Step 03 of 10</span>
          <h2 className="text-2xl font-bold font-heading text-ivory mt-1">Which substance are you concerned about?</h2>
          <p className="text-xs text-ivory/60 mt-1">Select all that apply. Search by common or local names.</p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto mb-4">
          <Search className="w-4 h-4 text-ivory/40 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search substance (e.g. ICE, Alcohol, Tramadol)..."
            value={substanceSearch}
            onChange={(e) => setSubstanceSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-sm focus:outline-none focus:border-gold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto">
          {filtered.map((s) => {
            const isSelected = answers.substances.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggleSubstance(s.id)}
                className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-charcoal border-gold shadow-gold-subtle'
                    : 'bg-midnight/70 border-charcoal-light hover:border-gold/30'
                }`}
              >
                <div>
                  <span className="font-semibold text-xs text-ivory block">{s.label}</span>
                </div>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ml-2 ${
                    isSelected ? 'border-gold bg-gold text-midnight' : 'border-charcoal-light'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
        {answers.substances.includes('other') && (
          <label className="mx-auto block max-w-xl text-xs font-semibold text-ivory/80">
            Other substance (optional)
            <input value={answers.substanceOther || ''} onChange={(event) => onChange({ substanceOther: event.currentTarget.value.slice(0, 120) })} maxLength={120} className="mt-2 min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight px-3 text-sm" />
          </label>
        )}
      </div>
    );
  }

  // STEP 04 - DURATION
  if (currentStep === 4) {
    const durations: { id: ConcernDuration; label: string }[] = [
      { id: 'less_than_1_month', label: 'Less than one month' },
      { id: '1_to_6_months', label: '1 to 6 months' },
      { id: '6_to_12_months', label: '6 to 12 months' },
      { id: '1_to_3_years', label: '1 to 3 years' },
      { id: 'more_than_3_years', label: 'More than 3 years' },
      { id: 'not_sure', label: "I'm not sure" },
      { id: 'prefer_not_to_say', label: 'Prefer not to say' },
    ];

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gold font-semibold">Step 04 of 10</span>
          <h2 className="text-2xl font-bold font-heading text-ivory mt-1">How long has this been a concern?</h2>
          <p className="text-xs text-ivory/60 mt-1">This helps tailor support pathways; it is not a diagnostic score.</p>
        </div>

        <div className="space-y-2.5 max-w-md mx-auto">
          {durations.map((d) => {
            const isSelected = answers.duration === d.id;
            return (
              <button
                key={d.id}
                onClick={() => onChange({ duration: d.id })}
                className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-charcoal border-gold shadow-gold-subtle'
                    : 'bg-midnight/70 border-charcoal-light hover:border-gold/30'
                }`}
              >
                <div>
                  <span className="font-semibold text-sm text-ivory block">{d.label}</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-gold bg-gold text-midnight' : 'border-charcoal-light'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // STEP 05 - CURRENT STATE (Checks for urgent symptoms)
  if (currentStep === 5) {
    const frequencyOptions: { id: UseFrequency; label: string }[] = [
      { id: 'daily', label: 'Daily or nearly daily' },
      { id: 'several_times_week', label: 'Several times a week' },
      { id: 'weekly_or_less', label: 'Weekly or less often' },
      { id: 'unsure', label: 'Not sure' },
      { id: 'prefer_not_to_say', label: 'Prefer not to say' },
    ];
    const stateOptions: { id: CurrentState; label: string }[] = [
      { id: 'using_regularly', label: 'Using regularly / daily' },
      { id: 'using_occasionally', label: 'Using occasionally / on weekends' },
      { id: 'recently_stopped', label: 'Recently stopped / in initial recovery' },
      { id: 'experiencing_cravings', label: 'Experiencing intense cravings or urge to reuse' },
      {
        id: 'possible_withdrawal',
        label: 'Experiencing possible withdrawal symptoms; I want medical guidance',
      },
      { id: 'not_currently_using', label: 'Not currently using (seeking info or helping someone)' },
      { id: 'prefer_not_to_say', label: 'Prefer not to say' },
    ];

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gold font-semibold">Step 05 of 10</span>
          <h2 className="text-2xl font-bold font-heading text-ivory mt-1">Which statement best describes things right now?</h2>
        </div>

        <div className="space-y-2.5 max-w-xl mx-auto">
          {stateOptions.map((opt) => {
            const isSelected = answers.currentState === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  onChange({ currentState: opt.id });
                }}
                className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-charcoal border-gold shadow-gold-subtle'
                    : 'bg-midnight/70 border-charcoal-light hover:border-gold/30'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-ivory">{opt.label}</span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-gold bg-gold text-midnight' : 'border-charcoal-light'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
        <fieldset className="max-w-xl mx-auto pt-3">
          <legend className="text-xs font-semibold text-gold mb-2">If relevant, how often has use been occurring?</legend>
          <div className="flex flex-wrap gap-2">
            {frequencyOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => onChange({ useFrequency: option.id })}
                className={`px-3 py-2 rounded-lg text-xs border ${answers.useFrequency === option.id ? 'bg-charcoal border-gold text-gold' : 'bg-midnight border-charcoal-light text-ivory/70'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="max-w-xl mx-auto rounded-2xl border border-red-300/40 bg-red-950/20 p-4">
          <legend className="px-2 text-sm font-bold text-red-100">Are any severe symptoms happening now? (Optional)</legend>
          <p className="mb-3 text-xs leading-5 text-red-100/75">Seizure, severe confusion, loss of consciousness, difficulty breathing, severe chest pain, suspected overdose, or immediate risk of harm.</p>
          <label className="flex items-start gap-3 text-sm text-red-50">
            <input type="checkbox" checked={(answers.urgentSymptoms || []).includes('immediate_emergency')} onChange={(event) => onChange({ urgentSymptoms: event.currentTarget.checked ? ['immediate_emergency'] : [] })} className="mt-1 h-4 w-4 accent-red-500" />
            <span>This may be an emergency</span>
          </label>
          {(answers.urgentSymptoms || []).includes('immediate_emergency') && (
            <div role="alert" className="mt-4 rounded-xl border border-red-300/50 bg-red-950/50 p-4 text-sm text-white">
              <strong className="block">Please seek emergency medical help now.</strong>
              <span className="mt-1 block text-xs text-red-100/80">Do not wait to finish this guide. In Sri Lanka, call Suwaseriya ambulance at {CONTACT_INFO.emergency.ambulance.number}.</span>
              <a href={`tel:${CONTACT_INFO.emergency.ambulance.number}`} className="mt-3 inline-flex min-h-11 items-center rounded-xl bg-red-100 px-4 font-bold text-red-950">Call {CONTACT_INFO.emergency.ambulance.number}</a>
            </div>
          )}
        </fieldset>
      </div>
    );
  }

  // STEP 06 - MAIN CONCERNS (Multi-Select)
  if (currentStep === 6) {
    const concernOptions = [
      { id: 'physical_health', label: 'Physical health & organ damage' },
      { id: 'mental_wellbeing', label: 'Mental wellbeing & depression/anxiety' },
      { id: 'family_relationships', label: 'Family relationships & trust' },
      { id: 'education_academics', label: 'University / school studies' },
      { id: 'employment_career', label: 'Job & employment stability' },
      { id: 'financial_strain', label: 'Financial debt or money problems' },
      { id: 'difficulty_stopping', label: 'Difficulty stopping once started' },
      { id: 'fear_of_withdrawal', label: 'Fear of withdrawal sickness' },
      { id: 'social_isolation', label: 'Social isolation' },
      { id: 'legal_concerns', label: 'Legal concerns' },
      { id: 'safety_concerns', label: 'Safety concerns' },
      { id: 'other', label: 'Something else' },
    ];

    const toggleConcern = (id: string) => {
      const current = answers.concerns.includes(id)
        ? answers.concerns.filter((c) => c !== id)
        : [...answers.concerns, id];
      onChange({ concerns: current });
    };

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gold font-semibold">Step 06 of 10</span>
          <h2 className="text-2xl font-bold font-heading text-ivory mt-1">What are you most concerned about?</h2>
          <p className="text-xs text-ivory/60 mt-1">Select all areas where you are feeling strain.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {concernOptions.map((opt) => {
            const isSelected = answers.concerns.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleConcern(opt.id)}
                className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-charcoal border-gold shadow-gold-subtle'
                    : 'bg-midnight/70 border-charcoal-light hover:border-gold/30'
                }`}
              >
                <div>
                  <span className="font-semibold text-xs text-ivory block">{opt.label}</span>
                </div>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ml-2 ${
                    isSelected ? 'border-gold bg-gold text-midnight' : 'border-charcoal-light'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
        {answers.concerns.includes('other') && (
          <label className="mx-auto block max-w-xl text-xs font-semibold text-ivory/80">
            Optional context
            <input value={answers.concernOther || ''} onChange={(event) => onChange({ concernOther: event.currentTarget.value.slice(0, 240) })} maxLength={240} className="mt-2 min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight px-3 text-sm" />
          </label>
        )}
      </div>
    );
  }

  // STEP 07 - SUPPORT PREFERENCE
  if (currentStep === 7) {
    const preferences: { id: SupportPreference; label: string; desc: string }[] = [
      {
        id: 'educational_info',
        label: 'Educational Information & Science',
        desc: 'Understand the biological and psychological aspects of substances.',
      },
      {
        id: 'ai_guided_support',
        label: 'Confidential AI-Guided Support',
        desc: 'Have anonymous, private conversations at your own pace.',
      },
      {
        id: 'professional_counseling',
        label: 'Professional One-on-One Counseling',
        desc: 'Connect with certified clinical psychologists or centers like Mel Medura.',
      },
      {
        id: 'rehabilitation_info',
        label: 'Inpatient Rehabilitation Facilities',
        desc: 'Information regarding state and accredited residential recovery centers.',
      },
      {
        id: 'family_support',
        label: 'Family & Loved One Guidance',
        desc: 'Strategies for parents, siblings, and partners supporting someone.',
      },
      {
        id: 'not_sure',
        label: "I'm not sure yet",
        desc: 'Explore all available pathways quietly without obligation.',
      },
    ];

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gold font-semibold">Step 07 of 10</span>
          <h2 className="text-2xl font-bold font-heading text-ivory mt-1">What type of help would you prefer?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {preferences.map((p) => {
            const isSelected = answers.supportPreference === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onChange({ supportPreference: p.id })}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-charcoal border-gold shadow-gold-subtle'
                    : 'bg-midnight/70 border-charcoal-light hover:border-gold/30'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-sm text-ivory">{p.label}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ml-2 ${
                        isSelected ? 'border-gold bg-gold text-midnight' : 'border-charcoal-light'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-xs text-ivory/60 mt-1">{p.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // STEP 08 - LOCATION (Province -> District)
  if (currentStep === 8) {
    const selectedProvinceObj = PROVINCES_AND_DISTRICTS.find((p) => p.name === answers.province);

    return (
      <div className="space-y-5 max-w-xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gold font-semibold">Step 08 of 10</span>
          <h2 className="text-2xl font-bold font-heading text-ivory mt-1">Where would you prefer to find support?</h2>
          <p className="text-xs text-ivory/60 mt-1">
            Optional: Selecting your province and district narrows down certified local hospital units.
          </p>
        </div>

        {/* Province Select */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold mb-1.5">
            Select Province
          </label>
          <select
            value={answers.province || ''}
            onChange={(e) => onChange({ province: e.target.value, district: '' })}
            className="w-full p-3.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-sm focus:outline-none focus:border-gold"
          >
            <option value="">-- Choose Province --</option>
            {PROVINCES_AND_DISTRICTS.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dependent District Select */}
        {selectedProvinceObj && (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gold mb-1.5">
              Select District in {selectedProvinceObj.name}
            </label>
            <select
              value={answers.district || ''}
              onChange={(e) => onChange({ district: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-sm focus:outline-none focus:border-gold"
            >
              <option value="">-- Choose District --</option>
              {selectedProvinceObj.districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Optional Locality / Town */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ivory/70 mb-1.5">
            Nearest Town / Locality (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Nugegoda, Kandy Town, Maharagama..."
            value={answers.locality || ''}
            onChange={(e) => onChange({ locality: e.target.value })}
            className="w-full p-3.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-sm focus:outline-none focus:border-gold"
          />
        </div>
      </div>
    );
  }

  // STEP 09 - ADDITIONAL CONTEXT
  if (currentStep === 9) {
    const previousSupportOptions: { id: PreviousSupport; label: string }[] = [
      { id: 'currently_receiving', label: 'Currently receiving support' },
      { id: 'received_before', label: 'Received support before' },
      { id: 'not_yet', label: 'Have not received support yet' },
      { id: 'prefer_not_to_say', label: 'Prefer not to say' },
    ];
    return (
      <div className="space-y-4 max-w-xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gold font-semibold">Step 09 of 10</span>
          <h2 className="text-2xl font-bold font-heading text-ivory mt-1">Is there anything else you would like us to know?</h2>
          <p className="text-xs text-ivory/60 mt-1">Optional. Only share what you are comfortable including in a request.</p>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-xs font-semibold text-gold">Have you received support before?</legend>
          <div className="flex flex-wrap gap-2">
            {previousSupportOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => onChange({ previousSupport: option.id })}
                className={`px-3 py-2 rounded-lg text-xs border ${answers.previousSupport === option.id ? 'bg-charcoal border-gold text-gold' : 'bg-midnight border-charcoal-light text-ivory/70'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="p-3 rounded-lg bg-charcoal border border-gold/20 text-xs text-ivory/70 flex items-start gap-2 mb-2">
          <Info className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
          <span>
            <strong>Privacy Reminder:</strong> This draft stays in the current browser session. Do not include unnecessary personal identifiers such as your full legal name, national identity card number, or home address.
          </span>
        </div>

        <textarea
          rows={5}
          placeholder="Optional context or anything important to your support..."
          value={answers.additionalContext || ''}
          onChange={(e) => onChange({ additionalContext: e.target.value.slice(0, 2000) })}
          maxLength={2000}
          className="w-full p-4 rounded-xl bg-midnight border border-charcoal-light text-ivory text-sm focus:outline-none focus:border-gold leading-relaxed"
        />
        <label className="block text-xs font-semibold text-ivory/80">
          Optional health information relevant to support (do not enter identifying information)
          <textarea
            rows={3}
            maxLength={1000}
            value={answers.healthInfo || ''}
            onChange={(event) => onChange({ healthInfo: event.target.value.slice(0, 1000) })}
            className="mt-1 w-full p-3 rounded-xl bg-midnight border border-charcoal-light text-ivory"
          />
        </label>
      </div>
    );
  }

  // STEP 10 - REVIEW & EXPLICIT CONSENT
  if (currentStep === 10) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gold font-semibold">Step 10 of 10</span>
          <h2 className="text-2xl font-bold font-heading text-ivory mt-1">Review your answers</h2>
          <p className="text-xs text-ivory/60 mt-1">
            Check your choices. Nothing is sent to a support service. You can prepare a report locally and choose whether to share it.
          </p>
        </div>

        <div className="charcoal-card divide-y divide-charcoal-light">
          {/* Summary Row 1: Purpose */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-gold uppercase tracking-wider font-semibold block">Primary Goal</span>
              <span className="text-sm font-bold text-ivory capitalize">
                {answers.purpose?.replace(/_/g, ' ') || 'Not specified'}
              </span>
            </div>
            <button
              onClick={() => onEditStep(1)}
              className="text-xs text-gold underline hover:text-champagne font-medium"
            >
              Edit
            </button>
          </div>

          {/* Summary Row 2: Substances */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-gold uppercase tracking-wider font-semibold block">Substance(s) of Focus</span>
              <span className="text-sm font-medium text-ivory">
                {answers.substances.length > 0
                  ? answers.substances.map((s) => s.replace(/_/g, ' ')).join(', ')
                  : 'None selected'}
              </span>
            </div>
            <button
              onClick={() => onEditStep(3)}
              className="text-xs text-gold underline hover:text-champagne font-medium"
            >
              Edit
            </button>
          </div>

          {/* Summary Row 3: Support & Location */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-gold uppercase tracking-wider font-semibold block">Preferred Support & Area</span>
              <span className="text-sm font-medium text-ivory">
                {answers.supportPreference?.replace(/_/g, ' ') || 'General'}{' '}
                {answers.district ? `• ${answers.district} District` : ''}
              </span>
            </div>
            <button
              onClick={() => onEditStep(7)}
              className="text-xs text-gold underline hover:text-champagne font-medium"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="charcoal-card divide-y divide-charcoal-light">
          <div className="p-4 flex items-center justify-between">
            <div><span className="text-xs text-gold uppercase font-semibold block">Who needs support?</span><span className="text-sm text-ivory">{answers.personNeedingSupport?.replace(/_/g, ' ') || 'Not specified'}</span></div>
            <button type="button" onClick={() => onEditStep(2)} className="text-xs text-gold underline">Edit</button>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div><span className="text-xs text-gold uppercase font-semibold block">Current situation and frequency</span><span className="text-sm text-ivory">{answers.situation?.replace(/_/g, ' ') || 'Not specified'} · {answers.useFrequency?.replace(/_/g, ' ') || 'Frequency not specified'}</span></div>
            <button type="button" onClick={() => onEditStep(2)} className="text-xs text-gold underline">Edit</button>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div><span className="text-xs text-gold uppercase font-semibold block">Previous support</span><span className="text-sm text-ivory">{answers.previousSupport?.replace(/_/g, ' ') || 'Not specified'}</span></div>
            <button type="button" onClick={() => onEditStep(9)} className="text-xs text-gold underline">Edit</button>
          </div>
        </div>

        {/* Session-only acknowledgement; support submission consent is requested separately. */}
        <div className="p-4 rounded-xl bg-charcoal border border-gold/30 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={answers.privacyNoticeAcknowledged || false}
              onChange={(e) => onChange({ privacyNoticeAcknowledged: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-charcoal-light text-gold focus:ring-gold bg-midnight"
            />
            <span className="text-xs text-ivory/90 leading-relaxed">
              I understand this guide provides support navigation, not medical advice. My answers are saved for this browser session and are not automatically sent to a support service.
            </span>
          </label>
        </div>
      </div>
    );
  }

  return null;
};
