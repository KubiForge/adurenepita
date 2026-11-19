import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { CONTACT_INFO, telephoneHref } from '../config/contactInfo';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Compass,
  MapPin,
  PhoneCall,
  Heart,
  ShieldAlert,
  ArrowRight,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';

interface GetHelpPageProps {
  onOpenAiChat: (initialPrompt?: string) => void;
  onOpenWizard: () => void;
}

export const GetHelpPage: React.FC<GetHelpPageProps> = ({ onOpenAiChat, onOpenWizard }) => {
  const { t } = useLanguage();
  const pathways = [
    {
      title: t('help.riskTitle'),
      desc: t('help.riskDescription'),
      actionLabel: t('help.assessmentAction'),
      actionType: 'navigate',
      link: '/assessment',
    },
    {
      title: t('help.stopTitle'),
      desc: t('help.stopDescription'),
      actionLabel: t('help.recoveryAction'),
      actionType: 'wizard',
    },
    {
      title: t('help.friendTitle'),
      desc: t('help.friendDescription'),
      actionLabel: t('help.friendAction'),
      actionType: 'chat',
      prompt: t('chat.quickFriendPrompt'),
    },
    {
      title: t('help.urgentTitle'),
      desc: t('help.urgentDescription', { number: CONTACT_INFO.emergency.ambulance.number }),
      actionLabel: t('help.urgentAction'),
      actionType: 'chat',
      prompt: t('help.urgentPrompt'),
    },
    {
      title: t('help.supportTitle'),
      desc: t('help.supportDescription'),
      actionLabel: t('chat.quickCenters'),
      actionType: 'navigate',
      link: '/support-directory',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          {t('help.eyebrow')}
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-ivory">
          {t('help.title')}
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed max-w-2xl mx-auto">
          {t('help.intro')}
        </p>
      </div>

      {/* Pathways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pathways.map((p, idx) => (
          <div key={idx} className="charcoal-card p-6 sm:p-8 border-gold/30 flex flex-col justify-between charcoal-card-hover">
            <div>
              <h3 className="font-heading font-bold text-xl text-ivory">
                {p.title}
              </h3>
              <p className="text-xs text-ivory/70 leading-relaxed">
                {p.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-charcoal-light flex items-center justify-between">
              {p.actionType === 'wizard' && (
                <Button variant="gold" size="sm" onClick={onOpenWizard} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {p.actionLabel}
                </Button>
              )}
              {p.actionType === 'chat' && (
                <Button variant="gold" size="sm" onClick={() => onOpenAiChat(p.prompt)} rightIcon={<Sparkles className="w-4 h-4" />}>
                  {p.actionLabel}
                </Button>
              )}
              {p.actionType === 'navigate' && p.link && (
                <Link to={p.link}>
                  <Button variant="gold" size="sm" rightIcon={<MapPin className="w-4 h-4" />}>
                    {p.actionLabel}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Immediate Emergency Action Alert */}
      <div className="p-8 rounded-2xl bg-charcoal border border-red-500/40 space-y-4">
        <div className="flex items-center gap-2 text-red-400 font-bold text-lg">
          <ShieldAlert className="w-6 h-6 animate-pulse" />
          <span>{t('help.emergencyTitle')}</span>
        </div>
        <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
          {t('help.emergencyDescription')}
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <a
            href={telephoneHref(CONTACT_INFO.emergency.ambulance.number)}
            className="btn-gold px-4 py-2.5 rounded-lg text-xs font-bold inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t('help.callAmbulance', { number: CONTACT_INFO.emergency.ambulance.number })}</span>
          </a>
          <a
            href={telephoneHref(CONTACT_INFO.emergency.drugHelpline.number)}
            className="btn-charcoal px-4 py-2.5 rounded-lg text-xs font-bold inline-flex items-center gap-2 text-champagne"
          >
            <PhoneCall className="w-4 h-4 text-gold" />
            <span>{t('help.callHelpline', { number: CONTACT_INFO.emergency.drugHelpline.number })}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
