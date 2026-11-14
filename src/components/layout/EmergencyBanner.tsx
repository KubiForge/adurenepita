import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CONTACT_INFO, telephoneHref } from '../../config/contactInfo';

export const EmergencyBanner: React.FC = () => {
  const { t } = useLanguage();

  const contacts = [
    { contact: CONTACT_INFO.emergency.drugHelpline, label: t('emergency.call1927') },
    { contact: CONTACT_INFO.emergency.ambulance, label: t('emergency.call1990') },
    { contact: CONTACT_INFO.emergency.crisisSupport, label: t('emergency.call1333') },
  ];

  return (
    <header className="relative z-10 bg-[#8b0000] text-ivory/90 border-b border-red-900 flex flex-col sm:flex-row items-center justify-between px-4 py-2 text-sm">
      {/* Left side – warning icon + message */}
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-gold/80 flex-shrink-0" />
        <span>{t('emergency.banner')}</span>
      </div>

      {/* Right side – contact buttons */}
      <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
        {contacts.map((c) => (
          <a
            key={c.contact.id}
            href={telephoneHref(c.contact.number)}
            className="inline-flex items-center gap-1 rounded-full bg-charcoal/30 px-2.5 py-1 text-xs text-ivory/80 hover:bg-charcoal/50 hover:text-gold transition-colors"
          >
            <PhoneCall className='w-3 h-3'/>
            <span>{c.label} ({c.contact.number})</span>
          </a>
        ))}
      </div>
    </header>
  );
};
