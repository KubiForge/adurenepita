import React, { createContext, useContext, useState } from 'react';
import { SafetyLevel } from '../types/chat';

interface SafetyContextType {
  isEmergencyModalOpen: boolean;
  emergencyReason: string | null;
  currentSafetyLevel: SafetyLevel;
  triggerSafetyInterruption: (level: SafetyLevel, reason?: string) => void;
  openEmergencyModal: (reason?: string) => void;
  closeEmergencyModal: () => void;
}

const SafetyContext = createContext<SafetyContextType>({
  isEmergencyModalOpen: false,
  emergencyReason: null,
  currentSafetyLevel: 1,
  triggerSafetyInterruption: () => {},
  openEmergencyModal: () => {},
  closeEmergencyModal: () => {},
});

export const SafetyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState<string | null>(null);
  const [currentSafetyLevel, setCurrentSafetyLevel] = useState<SafetyLevel>(1);

  const triggerSafetyInterruption = (level: SafetyLevel, reason?: string) => {
    setCurrentSafetyLevel(level);
    if (level >= 3) {
      setEmergencyReason(
        reason ||
          (level === 4
            ? 'Immediate Crisis / Self-Harm Risk Detected'
            : 'Urgent Medical Attention / Overdose Warning Signs Detected')
      );
      setIsEmergencyModalOpen(true);
    }
  };

  const openEmergencyModal = (reason?: string) => {
    setEmergencyReason(reason || null);
    setIsEmergencyModalOpen(true);
  };

  const closeEmergencyModal = () => {
    setIsEmergencyModalOpen(false);
    setEmergencyReason(null);
  };

  return (
    <SafetyContext.Provider
      value={{
        isEmergencyModalOpen,
        emergencyReason,
        currentSafetyLevel,
        triggerSafetyInterruption,
        openEmergencyModal,
        closeEmergencyModal,
      }}
    >
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => useContext(SafetyContext);
