import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EmergencyBanner: React.FC = () => {
  const { t } = useTranslation();

  const contacts = [
    { href: 'tel:1927', label: t('emergency.call1927'), icon: <PhoneCall className='w-3 h-3'/> },
    { href: 'tel:1990', label: t('emergency.call1990'), icon: <PhoneCall className='w-3 h-3'/> },
    { href: 'tel:1333', label: t('emergency.call1333'), icon: <PhoneCall className='w-3 h-3'/> },
  ];

  return (
    <header className="bg-[#8b0000] text-ivory/90 border-b border-red-900 flex flex-col sm:flex-row items-center justify-between px-4 py-2 text-sm">
      {/* Left side – warning icon + message */}
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-gold/80 flex-shrink-0" />
        <span>{t('emergency.banner')}</span>
      </div>

      {/* Right side – contact buttons */}
      <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
        {contacts.map((c) => (
          <a
            key={c.href}
            href={c.href}
            className="inline-flex items-center gap-1 rounded-full bg-charcoal/30 px-2.5 py-1 text-xs text-ivory/80 hover:bg-charcoal/50 hover:text-gold transition-colors"
          >
            {c.icon}
            <span>{c.label}</span>
          </a>
        ))}
      </div>
    </header>
  );
};
