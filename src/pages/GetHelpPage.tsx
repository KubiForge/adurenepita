import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { CONTACT_INFO, telephoneHref } from '../config/contactInfo';
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
  const pathways = [
    {
      title: 'Check Your Substance-Use Risk',
      desc: 'A private, non-diagnostic questionnaire with mild, moderate, severe, and emergency risk guidance.',
      actionLabel: 'Start Confidential Assessment',
      actionType: 'navigate',
      link: '/assessment',
    },
    {
      title: 'I Want to Stop Using Substances',
      desc: 'You are taking a brave, life-changing step. We provide compassionate guidance without judgment, safe medical detox advice, and links to free local clinics.',
      actionLabel: 'Explore Personal Recovery',
      actionType: 'wizard',
    },
    {
      title: 'I Am Worried About a Friend or Family Member',
      desc: 'Discover how to talk with a loved one without causing defensiveness or anger, set healthy boundaries, and connect them with trusted counseling.',
      actionLabel: 'Support a Loved One',
      actionType: 'chat',
      prompt: 'How can I compassionately support a close friend or sibling struggling with substance use?',
    },
    {
      title: 'I Have Urgent Health Concerns or Symptoms',
      desc: `Learn to recognize acute toxicity, severe withdrawal hazards, and when emergency ${CONTACT_INFO.emergency.ambulance.number} medical assistance is essential.`,
      actionLabel: 'Check Emergency Guidance',
      actionType: 'chat',
      prompt: 'What are the urgent medical warning signs and withdrawal risks I should watch out for?',
    },
    {
      title: 'I Need Certified Professional Support',
      desc: 'Find verified state and accredited non-profit centers across all 9 provinces and 25 districts with direct phone lines and verified hours.',
      actionLabel: 'Find Support Centers',
      actionType: 'navigate',
      link: '/support-directory',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          Compassionate & Confidential Support
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-ivory">
          A Safe Place to Ask for Help
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed max-w-2xl mx-auto">
          Whatever you or your loved one is facing, you do not have to walk this path in silence or shame. Choose a pathway below or speak privately with our AI Assistant.
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
          <span>Need Immediate Life-Saving Assistance?</span>
        </div>
        <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
          If someone is unresponsive, having a seizure, experiencing severe chest pains, or having extreme difficulty breathing, call the <strong>Suwaseriya Free Ambulance Service</strong> immediately. For confidential substance crisis advice, call the <strong>NDDCB Hotline</strong> (toll-free).
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <a
            href={telephoneHref(CONTACT_INFO.emergency.ambulance.number)}
            className="btn-gold px-4 py-2.5 rounded-lg text-xs font-bold inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {CONTACT_INFO.emergency.ambulance.number} (Medical Emergency)</span>
          </a>
          <a
            href={telephoneHref(CONTACT_INFO.emergency.drugHelpline.number)}
            className="btn-charcoal px-4 py-2.5 rounded-lg text-xs font-bold inline-flex items-center gap-2 text-champagne"
          >
            <PhoneCall className="w-4 h-4 text-gold" />
            <span>Call {CONTACT_INFO.emergency.drugHelpline.number} (NDDCB Drug Helpline)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
