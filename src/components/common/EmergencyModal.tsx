import React from 'react';
import { Modal } from './Modal';
import { useSafety } from '../../context/SafetyContext';
import { BRAND } from '../../config/brand';
import { AlertOctagon, PhoneCall, HeartPulse, ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyModalOpen, closeEmergencyModal, emergencyReason } = useSafety();

  return (
    <Modal
      isOpen={isEmergencyModalOpen}
      onClose={closeEmergencyModal}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-2.5 text-red-400">
          <AlertOctagon className="w-6 h-6 animate-pulse" />
          <span>Immediate Emergency & Crisis Support</span>
        </div>
      }
    >
      <div className="space-y-6">
        {emergencyReason && (
          <div className="p-4 rounded-lg bg-red-950/60 border border-red-500/40 text-sm text-red-200">
            <p className="font-semibold text-red-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Safety Engine Alert:</span>
            </p>
            <p className="mt-1">{emergencyReason}</p>
          </div>
        )}

        <div>
          <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">
            Sri Lankan Emergency Hotlines (Toll-Free & Confidential)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BRAND.emergencyContacts.map((contact) => (
              <a
                key={contact.id}
                href={`tel:${contact.number.replace(/\s+/g, '')}`}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between group ${
                  contact.primary
                    ? 'bg-charcoal border-gold/40 hover:border-gold hover:shadow-gold-subtle'
                    : 'bg-midnight/70 border-charcoal-light hover:border-gold/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-midnight text-gold border border-gold/20">
                      {contact.badge}
                    </span>
                    <span className="text-[11px] text-ivory/50">{contact.hours}</span>
                  </div>
                  <h4 className="font-bold text-ivory text-sm group-hover:text-champagne transition-colors">
                    {contact.name}
                  </h4>
                  <p className="text-xs text-ivory/60 mt-1 leading-snug">
                    {contact.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-charcoal-light flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-champagne">
                    {contact.number}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold group-hover:underline">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Life-Saving Action Steps */}
        <div className="p-4 rounded-xl bg-charcoal-light/60 border border-charcoal-light text-xs text-ivory/80 space-y-2">
          <h4 className="font-bold text-champagne flex items-center gap-1.5 text-sm">
            <HeartPulse className="w-4 h-4 text-red-400" />
            <span>If Someone Has Collapsed or Stopped Breathing (Overdose Protocol):</span>
          </h4>
          <ol className="list-decimal pl-4 space-y-1 text-ivory/70 leading-relaxed">
            <li><strong>Call 1990 immediately</strong>. State your exact district, city, and nearest landmark clearly.</li>
            <li><strong>Check breathing</strong>: If breathing has stopped, tilt head back gently to clear the airway.</li>
            <li><strong>Recovery Position</strong>: If unconscious but breathing, roll them onto their side with their top knee bent to prevent choking on fluids or vomit.</li>
            <li><strong>Stay with the person</strong>: Keep them warm and awake if possible. Never give alcohol, caffeine, or induce vomiting.</li>
          </ol>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="charcoal" onClick={closeEmergencyModal} size="sm">
            Close Notice
          </Button>
        </div>
      </div>
    </Modal>
  );
};
