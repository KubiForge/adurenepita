import React, { useEffect, useState } from 'react';
import { Modal } from '../common/Modal';
import { WizardStepRenderer } from './WizardStepRenderer';
import { WizardCompletionDashboard } from './WizardCompletionDashboard';
import { WizardAnswers } from '../../types/wizard';
import { Button } from '../common/Button';
import { ArrowLeft, ArrowRight, Sparkles, Check, Compass, Languages, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CreativeWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToChat: (initialMessage?: string) => void;
}

export const CreativeWizardModal: React.FC<CreativeWizardModalProps> = ({
  isOpen,
  onClose,
  onSwitchToChat,
}) => {
  const { language, setLanguage } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [answers, setAnswers] = useState<WizardAnswers>({
    substances: [],
    concerns: [],
  });
  const stageLabels = {
    en: ['Understanding your needs', 'Understanding the situation', 'Identifying the substance', 'Understanding the timeline', 'Current situation and safety', 'Areas of concern', 'Preferred support', 'Finding local help', 'Additional context', 'Reviewing your support request'],
    si: ['ඔබේ අවශ්‍යතා හඳුනාගැනීම', 'තත්ත්වය තේරුම් ගැනීම', 'ද්‍රව්‍යය හඳුනාගැනීම', 'කාලසීමාව තේරුම් ගැනීම', 'වත්මන් තත්ත්වය සහ ආරක්ෂාව', 'ඔබේ ප්‍රධාන ගැටලු', 'ඔබ කැමති සහාය', 'ප්‍රදේශයේ සහාය සොයාගැනීම', 'අමතර තොරතුරු', 'ඔබේ සහාය ඉල්ලීම සමාලෝචනය'],
    ta: ['உங்கள் தேவைகளைப் புரிந்துகொள்வது', 'நிலையைப் புரிந்துகொள்வது', 'பொருளை அடையாளம் காணுதல்', 'காலத்தைப் புரிந்துகொள்வது', 'தற்போதைய நிலையும் பாதுகாப்பும்', 'கவலைக்குரிய விடயங்கள்', 'விரும்பும் உதவி', 'உள்ளூர் உதவியைத் தேடுதல்', 'கூடுதல் தகவல்', 'உதவி கோரிக்கையை மதிப்பாய்வு செய்தல்'],
  }[language];
  const activeSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((step) =>
    !(step === 4 && ['drug_info', 'prevention_info'].includes(answers.purpose || '')),
  );
  const activeIndex = Math.max(0, activeSteps.indexOf(currentStep));
  const journeyCopy = {
    en: { title: 'Your Path to Support', subtitle: 'Every journey is different. Let’s find the right support for you.', privacy: 'Your answers stay in this browser session and are not automatically sent to an organization.', back: 'Back', skip: 'Skip for now', next: 'Continue', complete: 'Review support options', chat: 'Continue with AI chat' },
    si: { title: 'ඔබට සහාය ලැබෙන මඟ', subtitle: 'සෑම ගමනක්ම වෙනස්. ඔබට ගැළපෙන සහාය සොයා ගනිමු.', privacy: 'ඔබේ පිළිතුරු මෙම බ්‍රවුසර සැසිය තුළ පමණක් සුරැකේ. කිසිදු ආයතනයකට ස්වයංක්‍රීයව යවන්නේ නැත.', back: 'ආපසු', skip: 'දැනට මඟහරින්න', next: 'ඉදිරියට', complete: 'සහාය විකල්ප බලන්න', chat: 'AI සහායක සමඟ ඉදිරියට යන්න' },
    ta: { title: 'உதவிக்கான உங்கள் பாதை', subtitle: 'ஒவ்வொரு பயணமும் தனித்துவமானது. உங்களுக்கு ஏற்ற உதவியைத் தேடுவோம்.', privacy: 'உங்கள் பதில்கள் இந்த உலாவி அமர்வில் மட்டுமே சேமிக்கப்படும். எந்த நிறுவனத்திற்கும் தானாக அனுப்பப்படாது.', back: 'பின்னால்', skip: 'இப்போது தவிர்க்கவும்', next: 'தொடரவும்', complete: 'உதவி விருப்பங்களைப் பார்க்கவும்', chat: 'AI உதவியாளருடன் தொடரவும்' },
  }[language];

  useEffect(() => {
    if (!isOpen) return;
    try {
      const saved = window.sessionStorage.getItem('btd-support-journey');
      if (!saved) return;
      const parsed = JSON.parse(saved) as {
        answers?: WizardAnswers;
        currentStep?: number;
        isCompleted?: boolean;
      };
      if (parsed.answers) setAnswers(parsed.answers);
      if (parsed.currentStep) setCurrentStep(parsed.currentStep);
      if (parsed.isCompleted) setIsCompleted(parsed.isCompleted);
    } catch (error) {
      console.warn('The saved support journey could not be restored.', error);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    try {
      window.sessionStorage.setItem(
        'btd-support-journey',
        JSON.stringify({ answers, currentStep, isCompleted }),
      );
    } catch (error) {
      console.warn('The support journey could not be saved locally.', error);
    }
  }, [answers, currentStep, isCompleted, isOpen]);

  const updateAnswers = (patch: Partial<WizardAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
  };

  const handleNext = () => {
    if (currentStep === 10 && !answers.privacyNoticeAcknowledged) {
      setValidationMessage('Acknowledge the privacy notice to view your plan. This does not submit your answers.');
      return;
    }
    setValidationMessage(null);
    const nextStep = activeSteps[activeIndex + 1];
    if (nextStep !== undefined && currentStep !== 10) {
      setCurrentStep(nextStep);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    const previousStep = activeSteps[activeIndex - 1];
    if (previousStep !== undefined) {
      setCurrentStep(previousStep);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleReset = () => {
    if (window.confirm('Clear all answers and start "Your Path to Support" again?')) {
      setAnswers({ substances: [], concerns: [] });
      setCurrentStep(1);
      setIsCompleted(false);
      window.sessionStorage.removeItem('btd-support-journey');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      className="support-journey-modal"
      title={
        <div className="flex min-w-0 items-center gap-2">
          <Compass className="h-5 w-5 shrink-0 text-gold" />
          <div className="min-w-0">
            <span className="block truncate">{journeyCopy.title}</span>
            <span className="block text-[10px] font-normal text-ivory/50 sm:text-xs">
              {journeyCopy.subtitle}
            </span>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <a href="tel:1990" className="flex min-h-11 items-center justify-between rounded-xl border border-red-300/30 bg-red-950/20 px-3 text-xs font-semibold text-red-100">
          <span>Medical emergency in Sri Lanka?</span>
          <span className="underline">Call Suwaseriya 1990</span>
        </a>
        <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] leading-4 text-ivory/60" role="status">
          <ShieldCheck className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          <span>{journeyCopy.privacy}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Languages className="h-4 w-4 text-gold" aria-hidden="true" />
          <label htmlFor="journey-language" className="sr-only">Experience language</label>
          <select
            id="journey-language"
            value={language}
            onChange={(event) => setLanguage(event.target.value as 'en' | 'si' | 'ta')}
            className="rounded-lg border border-gold/30 bg-midnight px-3 py-2 text-xs font-semibold text-ivory"
          >
            <option value="en">English</option>
            <option value="si">&#x0DC3;&#x0DD2;&#x0D82;&#x0DC4;&#x0DC5;</option>
            <option value="ta">&#x0BA4;&#x0BAE;&#x0BBF;&#x0BB4;&#x0BCD;</option>
          </select>
        </div>
        </div>
        {/* Progress Bar (Visible during steps 1-10) */}
        {!isCompleted && (
          <div>
            <div className="mb-2 flex items-end justify-between gap-3 text-xs text-ivory/60">
              <div>
                <span className="block font-semibold text-gold">{stageLabels[currentStep - 1]}</span>
                <span className="mt-0.5 block">Step {activeIndex + 1} of {activeSteps.length} · {Math.round(((activeIndex + 1) / activeSteps.length) * 100)}%</span>
              </div>
              <button
                onClick={() => {
                  const message = `Hi, I am at Step ${currentStep} of "Your Path to Support" and would prefer to talk naturally. Can you help me?`;
                  onClose();
                  onSwitchToChat(message);
                }}
                className="text-xs text-gold/80 hover:text-champagne flex items-center gap-1 underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{journeyCopy.chat}</span>
              </button>
            </div>

            <div className="w-full bg-midnight rounded-full h-2 overflow-hidden border border-charcoal-light">
              <div
                className="h-full rounded-full bg-gold transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / activeSteps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Wizard Content Body */}
        <div className="min-h-[380px] flex flex-col justify-between">
          {!isCompleted ? (
            <WizardStepRenderer
              currentStep={currentStep}
              answers={answers}
              onChange={updateAnswers}
              onEditStep={(step) => setCurrentStep(step)}
            />
          ) : (
            <WizardCompletionDashboard
              answers={answers}
              onReset={handleReset}
              onContinueChat={(prompt) => {
                onClose();
                onSwitchToChat(prompt);
              }}
              onClose={onClose}
            />
          )}

          {/* Navigation Controls (Only during steps 1-10) */}
          {!isCompleted && (
            <div className="pt-6 border-t border-charcoal-light flex items-center justify-between mt-6">
              <div>
                {activeIndex > 0 && (
                  <Button
                    variant="charcoal"
                    size="sm"
                    onClick={handleBack}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    {journeyCopy.back}
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentStep < 10 && currentStep !== 1 && (
                  <Button variant="ghost" size="sm" onClick={handleSkip}>
                    {journeyCopy.skip}
                  </Button>
                )}

                <Button
                  variant="gold"
                  size="md"
                  onClick={handleNext}
                  rightIcon={
                    currentStep === 10 ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )
                  }
                >
                  {currentStep === 10 ? journeyCopy.complete : journeyCopy.next}
                </Button>
              </div>
            </div>
          )}
          {validationMessage && !isCompleted && (
            <p role="alert" className="mt-3 text-right text-xs text-amber-200">{validationMessage}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};
