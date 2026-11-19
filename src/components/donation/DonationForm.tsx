import React from 'react';
import { AlertTriangle, Mail, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../../config/contactInfo';
import { useLanguage } from '../../context/LanguageContext';

export const DonationForm: React.FC = () => {
  const { t } = useLanguage();
  return (
  <section
    aria-labelledby="donation-status-title"
    className="mx-auto w-full max-w-3xl rounded-2xl border border-red-400/25 bg-charcoal/70 p-5 sm:rounded-3xl sm:p-8"
  >
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-red-400/25 bg-red-950/30 text-red-200">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-200">{t('donate.paused')}</span>
        <h2 id="donation-status-title" className="mt-1 font-heading text-xl font-bold text-ivory sm:text-2xl">
          {t('donate.unavailable')}
        </h2>
      </div>
    </div>

    <p className="mt-4 text-sm leading-6 text-ivory/70">
      {t('donate.formDescription')}
    </p>

    <div className="mt-4 flex items-start gap-2 rounded-xl border border-gold/15 bg-midnight/60 p-3 text-xs leading-5 text-ivory/60">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
      <p>
        {t('donate.securityNotice')}
      </p>
    </div>

    <a
      href={`mailto:${CONTACT_INFO.project.email}?subject=${encodeURIComponent(t('donate.emailSubject'))}`}
      className="btn-gold mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold sm:w-auto"
    >
      <Mail className="h-4 w-4" aria-hidden="true" />
      {t('donate.askTeam')}
    </a>
  </section>
  );
};
