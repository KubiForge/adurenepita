import React, { useEffect, useState } from 'react';
import { Modal } from '../common/Modal';
import { WizardStepRenderer } from './WizardStepRenderer';
import { WizardCompletionDashboard } from './WizardCompletionDashboard';
import { WizardAnswers } from '../../types/wizard';
import { Button } from '../common/Button';
import { ArrowLeft, ArrowRight, Sparkles, Check, Compass, Languages } from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';
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
  const { openEmergencyModal } = useSafety();
  const { language, setLanguage } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [answers, setAnswers] = useState<WizardAnswers>({
    substances: [],
    concerns: [],
  });
  const stageLabels = [
    'Understanding your needs',
    'Understanding the situation',
    'Identifying the substance',
    'Understanding the timeline',
    'Current situation and safety',
    'Areas of concern',
    'Preferred support',
    'Finding local help',
    'Additional context',
    'Reviewing your support request',
  ];

  useEffect(() => {
    if (!isOpen) return;
    try {
      const saved = window.localStorage.getItem('btd-support-journey');
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
      window.localStorage.setItem(
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
    if (currentStep < 10) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
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
      window.localStorage.removeItem('btd-support-journey');
    }
  };

  const handleEmergencyTrigger = (reason: string) => {
    openEmergencyModal(reason);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        <div className="flex min-w-0 items-center gap-2">
          <Compass className="h-5 w-5 shrink-0 text-gold" />
          <div className="min-w-0">
            <span className="block truncate">Your Path to Support</span>
            <span className="block text-[10px] font-normal text-ivory/50 sm:text-xs">
              Personalized Recovery &amp; Support Guide
            </span>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-end gap-2">
          <Languages className="h-4 w-4 text-gold" aria-hidden="true" />
          <label htmlFor="journey-language" className="sr-only">Experience language</label>
          <select
            id="journey-language"
            value={language}
            onChange={(event) => setLanguage(event.target.value as 'en' | 'si' | 'ta')}
            className="rounded-lg border border-gold/30 bg-midnight px-3 py-2 text-xs font-semibold text-ivory"
          >
            <option value="en">English</option>
            <option value="si">සිංහල</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>
        {/* Progress Bar (Visible during steps 1-10) */}
        {!isCompleted && (
          <div>
            <div className="mb-2 flex items-end justify-between gap-3 text-xs text-ivory/60">
              <div>
                <span className="block font-semibold text-gold">{stageLabels[currentStep - 1]}</span>
                <span className="mt-0.5 block">Step {currentStep} of 10 · {Math.round((currentStep / 10) * 100)}%</span>
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
                <span>Continue with AI chat</span>
              </button>
            </div>

            <div className="w-full bg-midnight rounded-full h-2 overflow-hidden border border-charcoal-light">
              <div
                className="h-full rounded-full bg-gold transition-all duration-300"
                style={{ width: `${(currentStep / 10) * 100}%` }}
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
              onEmergencyTrigger={handleEmergencyTrigger}
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
                {currentStep > 1 && (
                  <Button
                    variant="charcoal"
                    size="sm"
                    onClick={handleBack}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Back
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentStep < 10 && currentStep !== 1 && (
                  <Button variant="ghost" size="sm" onClick={handleSkip}>
                    Skip for now
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
                  {currentStep === 10 ? 'Complete & View Plan' : 'Continue'}
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
