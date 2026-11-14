import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { WizardStepRenderer } from './WizardStepRenderer';
import { WizardCompletionDashboard } from './WizardCompletionDashboard';
import { WizardAnswers } from '../../types/wizard';
import { Button } from '../common/Button';
import { ArrowLeft, ArrowRight, Sparkles, X, Check, Compass } from 'lucide-react';
import { useSafety } from '../../context/SafetyContext';

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

  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [answers, setAnswers] = useState<WizardAnswers>({
    substances: [],
    concerns: [],
  });

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
    setAnswers({ substances: [], concerns: [] });
    setCurrentStep(1);
    setIsCompleted(false);
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
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-gold" />
          <span>Creative AI Guided Wizard • පියවරෙන් පියවර මඟපෙන්වීම</span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Progress Bar (Visible during steps 1-10) */}
        {!isCompleted && (
          <div>
            <div className="flex items-center justify-between text-xs text-ivory/60 mb-2">
              <span className="font-semibold text-gold">
                Step {currentStep} of 10
              </span>
              <button
                onClick={() => {
                  const message = `Hi, I was exploring the Creative Wizard at Step ${currentStep} and I would prefer to talk naturally. Can you help me?`;
                  onClose();
                  onSwitchToChat(message);
                }}
                className="text-xs text-gold/80 hover:text-champagne flex items-center gap-1 underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Switch to Natural Chat</span>
              </button>
            </div>

            <div className="w-full bg-midnight rounded-full h-2 overflow-hidden border border-charcoal-light">
              <div
                className="bg-gradient-to-r from-bronze via-gold to-champagne h-full transition-all duration-300 rounded-full"
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
