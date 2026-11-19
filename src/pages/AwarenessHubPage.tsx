import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES_DATA, Article, FAQS_DATA } from '../data/awarenessData';
import { InteractiveQuiz } from '../components/awareness/InteractiveQuiz';
import { Button } from '../components/common/Button';
import {
  BookOpen,
  HelpCircle,
  Download,
  ArrowRight,
  Baby,
  GraduationCap,
  Users,
  BriefcaseBusiness,
  HeartPulse,
  AlertTriangle,
  ShieldCheck,
  ExternalLink,
  PhoneCall,
  X,
  Search,
  ShieldAlert,
  ChevronDown,
} from 'lucide-react';
import { CONTACT_INFO, telephoneHref } from '../config/contactInfo';
import { ASSETS } from '../config/assets';
import { useLanguage } from '../context/LanguageContext';

const GLOSSARY_ENTRIES = [
  {
    term: 'Substance use disorder',
    definition: 'A health condition involving continued substance use despite significant harm or difficulty controlling use. A qualified health professional makes any diagnosis.',
  },
  {
    term: 'Tolerance',
    definition: 'A reduced response to a substance after repeated use. Tolerance does not mean a person is safe from overdose or other harm.',
  },
  {
    term: 'Withdrawal',
    definition: 'Physical or psychological symptoms that can occur when a person reduces or stops a substance after repeated use. Alcohol and some sedative withdrawal can be life-threatening.',
  },
  {
    term: 'Overdose',
    definition: 'A medical emergency caused by a toxic amount or combination of substances. Call 1990 immediately if someone is unresponsive, having seizures, or struggling to breathe.',
  },
  {
    term: 'Naloxone',
    definition: 'A medicine that can temporarily reverse an opioid overdose. Public availability and access pathways in Sri Lanka have not been verified for this resource.',
  },
  {
    term: 'Recovery',
    definition: 'A personal process of improving health and wellbeing. It can involve professional treatment, social support, and changes over time; there is no single path.',
  },
  {
    term: 'Stigma',
    definition: 'Negative stereotypes or unfair treatment that can make it harder for people to seek support. Respectful, person-first language helps reduce stigma.',
  },
];

interface AudienceGuidance {
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  steps: string[];
  warning: string;
  officialUrl: string;
  officialLabel: string;
}

export const AwarenessHubPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'articles' | 'quiz' | 'downloads'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedGuidance, setSelectedGuidance] = useState<AudienceGuidance | null>(null);
  const [glossaryQuery, setGlossaryQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS_DATA[0]?.id ?? null);

  useEffect(() => {
    if (!selectedGuidance) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedGuidance(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedGuidance]);

  const downloadableResources = [
    {
      title: 'Family Guide: Recognizing Early Signs of Substance Distress in Students',
      size: 'Plain-text guide',
      category: 'Family Guide',
      content: 'BEYOND THE DARKNESS - FAMILY GUIDE\n\nEarly warning signs:\n- Sudden behavioral or relationship changes\n- Unexplained sleep, appetite, weight or attendance changes\n- Secretiveness, missing money or confiscated items\n- Mood swings, agitation or unusual paranoia\n\nRecommended response:\n1. Choose a calm and private moment.\n2. Use "I am concerned" statements rather than accusations.\n3. Listen without threats or humiliation.\n4. Seek professional support through a verified service.\n5. For immediate danger, call 1990 or attend the nearest hospital emergency department.\n\nNDDCB confidential drug counseling: 1927',
    },
    {
      title: 'Emergency Overdose Protocol & Recovery Position One-Pager',
      size: 'Plain-text guide',
      category: 'Clinical Protocol',
      content: 'BEYOND THE DARKNESS - OVERDOSE RESPONSE\n\nEmergency signs:\n- Slow, shallow or stopped breathing\n- Unresponsiveness or inability to wake\n- Blue or grey lips and fingertips\n- Seizures or collapse\n\nImmediate actions:\n1. Call 1990 now.\n2. Follow the dispatcher instructions.\n3. If breathing is absent, begin CPR if trained.\n4. Place an unconscious breathing person in the recovery position.\n5. Do not leave the person alone.\n\nDo not induce vomiting or give food, drink or unknown medicines.',
    },
    {
      title: 'Methamphetamine (ICE) Facts for University Students',
      size: 'Plain-text guide',
      category: 'Youth Prevention',
      content: 'BEYOND THE DARKNESS - METHAMPHETAMINE AWARENESS\n\nKey facts:\n- Crystal methamphetamine ("ICE") strongly activates the brain reward system.\n- It can cause severe agitation, psychosis, overheating and cardiac danger.\n- Dependence can develop quickly.\n- There is no safe dosage or "purity" assumption.\n\nPrevention:\n- Know peer and social-media pressure warning signs.\n- Leave a setting immediately if illegal drugs are present.\n- Tell a trusted adult or counselor early.\n- Contact NDDCB 1927 for confidential guidance.',
    },
    {
      title: 'School & College Prevention Session Outline',
      size: 'Plain-text guide',
      category: 'School & College',
      content: 'BEYOND THE DARKNESS - PREVENTION SESSION OUTLINE\n\nSuggested 30-minute discussion:\n1. Set a respectful, stigma-free ground rule; do not ask students to disclose personal or family experiences.\n2. Discuss health effects, peer pressure, myths, and how to seek help from a trusted adult.\n3. Practice safe ways to leave an unsafe situation and support a peer without confrontation.\n4. Review emergency signs and call 1990 for an immediate medical emergency.\n5. Share current, verified local support contacts.\n\nThis outline is educational, not a clinical intervention or safeguarding protocol. Schools should follow their own child-protection policies.',
    },
    {
      title: 'Workplace Prevention & Support Checklist',
      size: 'Plain-text guide',
      category: 'Workplace',
      content: 'BEYOND THE DARKNESS - WORKPLACE CHECKLIST\n\n- Publish a clear, health-focused substance-use and safety policy.\n- Train supervisors to respond to immediate danger and contact emergency services.\n- Provide a private route to occupational health or a qualified support service.\n- Do not ask managers to diagnose a medical condition or promise absolute confidentiality.\n- Limit information-sharing to a legitimate need and follow applicable Sri Lankan law.\n- Review procedures with qualified legal and occupational-health advisers.\n\nThis checklist is a starting point, not legal advice or a substitute for professional training.',
    },
  ];

  const audienceGuides: AudienceGuidance[] = [
    {
      title: 'Children & Young People',
      text: 'Age-appropriate information, refusal skills, pressure awareness, and a clear route to a trusted adult.',
      icon: Baby,
      steps: [
        'Learn that drug use can cause immediate injury, poisoning, overdose, and harmful decisions.',
        'Practice simple refusal phrases and leave unsafe situations without delay.',
        'Tell a trusted parent, teacher, school counselor, or another safe adult as soon as possible.',
        'If a child is unresponsive or has difficulty breathing, call 1990 and follow dispatcher instructions.',
      ],
      warning: 'Do not confront, shame, or investigate an intoxicated child alone.',
      officialUrl: 'https://www.unodc.org/unodc/en/drugs/prevention.html',
      officialLabel: 'UNODC prevention guidance',
    },
    {
      title: 'University & School Students',
      text: 'Recognize common drugs, fake substances, peer pressure, sleep deprivation, and emergency symptoms.',
      icon: GraduationCap,
      steps: [
        'Learn the names, visible forms, and common emergency signs of substances you may encounter.',
        'Recognize that counterfeit pills and unknown powders may contain dangerous or lethal substances.',
        'Create a buddy safety plan for parties and difficult situations; never leave someone at risk alone.',
        'Use campus counselors, student well-being services, or NDDCB 1927 for confidential support.',
      ],
      warning: 'Never assume that a pill, powder, vape, or drink is safe because it is offered by a friend.',
      officialUrl: 'https://www.who.int/health-topics/drugs-psychoactive',
      officialLabel: 'WHO substance-use guidance',
    },
    {
      title: 'Families & Friends',
      text: 'Use calm, non-shaming communication, recognize warning signs, set boundaries, and seek professional help.',
      icon: Users,
      steps: [
        'Choose a private, calm moment and begin with specific observations rather than accusations.',
        'Use "I am concerned about..." language and listen without interruption or humiliation.',
        'Set clear safety boundaries and identify who can provide immediate or professional support.',
        'Offer to attend an appointment or call NDDCB 1927 together.',
      ],
      warning: 'Do not confront someone during intoxication or severe withdrawal, especially for alcohol or sedatives.',
      officialUrl: 'https://www.nddcb.gov.lk/',
      officialLabel: 'NDDCB Sri Lanka guidance',
    },
    {
      title: 'Employers & Workplace Leaders',
      text: 'Build prevention policies, confidential support pathways, fair procedures, and safe incident response.',
      icon: BriefcaseBusiness,
      steps: [
        'Publish a clear prevention and health-support policy rather than relying only on punishment.',
        'Provide confidential referral options, occupational-health access, and accommodation procedures.',
        'Train managers to recognize impairment, respond to emergencies, and avoid medical diagnosis.',
        'Protect privacy, apply fair procedures, and follow Sri Lankan labor and human-rights obligations.',
      ],
      warning: 'Never substitute workplace discipline or testing for immediate emergency medical response.',
      officialUrl: 'https://www.labourdept.gov.lk/',
      officialLabel: 'Sri Lanka Department of Labour',
    },
  ];

  const downloadResource = (title: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          Educational Knowledge Platform
        </span>
        <h1 className="break-words text-3xl font-bold font-heading text-ivory sm:text-4xl">
          Awareness Hub & Community Resources
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          Evidence-based prevention information for Sri Lankan children, students, families, workplaces, and communities. Every health claim should be read with its source and last-review date.
        </p>
      </div>

      <section aria-labelledby="audience-guidance-title" className="space-y-5">
        <div className="max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Self-guided learning modules</span>
          <h2 id="audience-guidance-title" className="mt-2 text-2xl font-heading font-bold text-ivory">
            Practical Guidance for Every Community
          </h2>
          <p className="mt-2 text-xs leading-5 text-ivory/50">
            These are informational modules, not accredited clinical or professional training.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {audienceGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <button
                key={guide.title}
                type="button"
                onClick={() => setSelectedGuidance(guide)}
                className="charcoal-card p-5 border-gold/15 text-left transition hover:-translate-y-1 hover:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/60"
                aria-label={`Open guidance for ${guide.title}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/20 bg-midnight text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-ivory">{guide.title}</h3>
                <p className="mt-3 text-xs leading-5 text-ivory/65">{guide.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 border-t border-charcoal-light pt-3 text-xs font-bold text-gold">
                  Open guidance
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]" aria-label="Critical awareness guidance">
        <article className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6">
          <div className="flex items-center gap-2 text-red-300">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="font-heading text-xl font-bold">Recognize an Overdose</h2>
          </div>
          <p className="mt-3 text-xs leading-6 text-ivory/70">
            Emergency signs include slow or stopped breathing, blue/grey lips, unresponsiveness, seizure,
            chest pain, severe agitation, collapse, or extreme overheating.
          </p>
          <p className="mt-3 text-xs font-semibold leading-6 text-red-100">
            Call 1990 Suwaseriya immediately. Do not leave the person alone.
          </p>
          <a
            href={telephoneHref(CONTACT_INFO.emergency.ambulance.number)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-400/40 px-4 py-2 text-xs font-bold text-red-100"
          >
            <PhoneCall className="h-4 w-4" />
            Call 1990
          </a>
        </article>

        <article className="rounded-2xl border border-gold/20 bg-charcoal/45 p-6">
          <div className="flex items-center gap-2 text-gold">
            <HeartPulse className="h-5 w-5" />
            <h2 className="font-heading text-xl font-bold text-ivory">What Is Rehabilitation?</h2>
          </div>
          <p className="mt-3 text-xs leading-6 text-ivory/70">
            Rehabilitation is a structured, voluntary or court-directed process that may include medical
            withdrawal care, addiction medicine, counseling, family support, relapse prevention, and
            social reintegration.
          </p>
          <p className="mt-3 text-xs leading-6 text-ivory/55">
            Alcohol and benzodiazepine withdrawal can be life-threatening. Never stop these substances
            suddenly without supervised medical advice.
          </p>
        </article>
      </section>

      <section aria-labelledby="safe-disposal-title" className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-gold/20 bg-charcoal/55 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Safe disposal</span>
              <h2 id="safe-disposal-title" className="mt-1 font-heading text-xl font-bold text-ivory">
                Unused medicines and unknown substances
              </h2>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-xs leading-5 text-ivory/65">
            <li>Do not share, sell, flush, burn, or pour medicines into drains. Ask a licensed pharmacist or hospital pharmacy for the currently accepted local disposal route.</li>
            <li>Do not touch, taste, crush, burn, or move an unknown or suspected illicit substance. Keep others away and seek appropriate emergency or police assistance if there is an immediate risk.</li>
            <li>Keep medicines away from children and pets while arranging safe advice. Do not put loose needles or sharps into ordinary waste.</li>
          </ul>
          <a href="https://www.nmra.gov.lk/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-champagne underline">
            Ask the National Medicines Regulatory Authority <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <p className="mt-2 text-[10px] leading-4 text-ivory/40">
            This page does not confirm that a medicine take-back program is available near you.
          </p>
        </article>

        <article className="rounded-2xl border border-red-400/20 bg-red-950/15 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-200" aria-hidden="true" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-200">Opioid overdose response</span>
              <h2 className="mt-1 font-heading text-xl font-bold text-ivory">Naloxone and local availability</h2>
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-ivory/65">
            WHO notes that naloxone can reverse an opioid overdose when given in time. We have not
            verified a Sri Lankan public access or distribution pathway for naloxone, so do not assume it
            is available. If an overdose is suspected, call 1990 immediately and follow the dispatcher’s
            directions; do not delay emergency care.
          </p>
          <a href="https://www.who.int/news-room/fact-sheets/detail/opioid-overdose" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-champagne underline">
            WHO: opioid overdose information <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </article>
      </section>

      <section aria-labelledby="glossary-title" className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Plain-language terminology</span>
            <h2 id="glossary-title" className="mt-1 font-heading text-2xl font-bold text-ivory">Substance-use glossary</h2>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-ivory/50">
              Definitions are educational, not diagnostic. Ask a qualified health professional about personal concerns.
            </p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-ivory/40" aria-hidden="true" />
            <label htmlFor="glossary-search" className="sr-only">Search glossary terms</label>
            <input id="glossary-search" type="search" value={glossaryQuery} onChange={(event) => setGlossaryQuery(event.target.value)} placeholder="Search a term..." className="min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight pl-10 pr-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GLOSSARY_ENTRIES.filter((entry) => `${entry.term} ${entry.definition}`.toLowerCase().includes(glossaryQuery.trim().toLowerCase())).map((entry) => (
            <article key={entry.term} className="rounded-xl border border-charcoal-light bg-charcoal/45 p-4">
              <h3 className="text-sm font-bold text-champagne">{entry.term}</h3>
              <p className="mt-2 text-xs leading-5 text-ivory/65">{entry.definition}</p>
            </article>
          ))}
        </div>
        {GLOSSARY_ENTRIES.every((entry) => !`${entry.term} ${entry.definition}`.toLowerCase().includes(glossaryQuery.trim().toLowerCase())) && (
          <p className="rounded-xl border border-charcoal-light bg-charcoal/45 p-4 text-xs text-ivory/60">No glossary terms match that search.</p>
        )}
      </section>

      {selectedGuidance && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="audience-guidance-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-midnight/85 backdrop-blur-md"
            onClick={() => setSelectedGuidance(null)}
            aria-label="Close guidance"
          />
          <div className="relative z-10 flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gold/30 bg-charcoal shadow-2xl sm:max-h-[85vh]">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-charcoal-light px-5 py-4 sm:px-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                  Prevention guidance
                </span>
                <h2 id="audience-guidance-modal-title" className="mt-2 font-heading text-2xl font-bold text-ivory">
                  {selectedGuidance.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGuidance(null)}
                className="rounded-full border border-ivory/10 p-2 text-ivory/60 transition hover:border-gold/40 hover:text-gold"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-8 sm:pb-8">
            <p className="mt-4 text-sm leading-6 text-ivory/70">{selectedGuidance.text}</p>

            <ol className="mt-6 space-y-3">
              {selectedGuidance.steps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-xl border border-charcoal-light bg-midnight/55 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">
                    {index + 1}
                  </span>
                  <p className="text-xs leading-5 text-ivory/75">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-5 rounded-xl border border-red-400/25 bg-red-950/20 p-4">
              <p className="text-xs font-bold text-red-200">Important safety note</p>
              <p className="mt-1 text-xs leading-5 text-ivory/65">{selectedGuidance.warning}</p>
            </div>

            <a
              href={selectedGuidance.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2.5 text-xs font-bold text-champagne transition hover:border-gold/60 hover:bg-gold/5"
            >
              {selectedGuidance.officialLabel}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-charcoal-light pb-2">
        <div className="mx-auto flex w-full max-w-full overflow-x-auto p-1 sm:w-fit sm:justify-center rounded-xl bg-charcoal border border-charcoal-light">
          <button
            onClick={() => setActiveTab('articles')}
            className={`shrink-0 px-3 py-2 sm:px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'articles' ? 'bg-gold text-midnight' : 'text-ivory/70 hover:text-ivory'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('awareness.articlesTab')}</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`shrink-0 px-3 py-2 sm:px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz' ? 'bg-gold text-midnight' : 'text-ivory/70 hover:text-ivory'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{t('awareness.quizTab')}</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`shrink-0 px-3 py-2 sm:px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'downloads' ? 'bg-gold text-midnight' : 'text-ivory/70 hover:text-ivory'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{t('awareness.downloadsTab')}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-charcoal-light bg-charcoal/45 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-ivory">{t('awareness.languageHeading')}</p>
            <p className="mt-1 text-[11px] leading-5 text-ivory/50">
              {t('awareness.languageDescription')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('awareness.chooseLanguage')}>
            <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')} className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-semibold ${language === 'en' ? 'border-gold/50 bg-gold/10 text-champagne' : 'border-charcoal-light text-ivory/65'}`}>
              {t('awareness.english')}
            </button>
            <button type="button" aria-pressed={language === 'si'} onClick={() => setLanguage('si')} className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-semibold ${language === 'si' ? 'border-gold/50 bg-gold/10 text-champagne' : 'border-charcoal-light text-ivory/65'}`}>
              {t('awareness.sinhala')}
            </button>
            <button type="button" aria-pressed={language === 'ta'} onClick={() => setLanguage('ta')} className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-semibold ${language === 'ta' ? 'border-gold/50 bg-gold/10 text-champagne' : 'border-charcoal-light text-ivory/65'}`}>
              {t('awareness.tamil')}
            </button>
          </div>
      </div>

      {/* TAB 1: ARTICLES */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_DATA.map((art) => (
            <div key={art.id} className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between charcoal-card-hover">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-midnight text-gold border border-gold/30 uppercase font-bold tracking-wider">
                    {art.category}
                  </span>
                  <span className="text-[11px] text-ivory/50">{art.readTime}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-ivory leading-snug">
                  {language === 'si' ? art.titleSi : language === 'ta' ? art.titleTa : art.title}
                </h3>

                <p className="text-xs text-ivory/70 leading-relaxed line-clamp-3">
                  {language === 'si' ? art.summarySi : language === 'ta' ? art.summaryTa : art.summary}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-charcoal-light flex items-center justify-between">
                <span className="text-[11px] text-ivory/40">{art.publishedDate}</span>
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs font-semibold text-gold hover:underline flex items-center gap-1"
                >
                  <span>{t('awareness.readArticle')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: INTERACTIVE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="py-4">
          <InteractiveQuiz language={language} />
        </div>
      )}

      {/* TAB 3: DOWNLOADABLE MATERIALS */}
      {activeTab === 'downloads' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {downloadableResources.map((res, i) => (
            <div key={i} className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between charcoal-card-hover">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-1">
                  {res.category}
                </span>
                <h3 className="font-heading font-bold text-base text-ivory">
                  {res.title}
                </h3>
                <span className="text-[11px] font-mono text-ivory/50 block">{res.size}</span>
              </div>

              <div className="mt-6 pt-3 border-t border-charcoal-light">
                <Button
                  variant="charcoal"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => downloadResource(res.title, res.content)}
                  leftIcon={<Download className="w-3.5 h-3.5 text-gold" />}
                >
                  Download Plain-text Guide
                </Button>
              </div>
            </div>
          ))}
          <article className="charcoal-card flex flex-col justify-between border-charcoal-light p-5">
            <div>
              <img src={ASSETS.campaignPoster} alt="Beyond the Darkness prevention campaign poster" className="aspect-square w-full rounded-xl border border-charcoal-light object-contain" loading="lazy" />
              <h3 className="mt-3 font-heading text-base font-bold text-ivory">Prevention campaign poster</h3>
              <p className="mt-1 text-xs leading-5 text-ivory/55">Existing project poster image. Check current dates and contacts before printing or sharing.</p>
            </div>
            <a href={ASSETS.campaignPoster} download="beyond-the-darkness-campaign-poster.webp" className="btn-charcoal mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold">
              <Download className="h-3.5 w-3.5 text-gold" /> Download Poster
            </a>
          </article>
          <article className="charcoal-card flex flex-col justify-between border-charcoal-light p-5">
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                <BookOpen className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-heading text-base font-bold text-ivory">NDDCB public education video</h3>
              <p className="mt-1 text-xs leading-5 text-ivory/55">External video linked from the National Dangerous Drugs Control Board website. Check its language and date before using it in a class.</p>
            </div>
            <a href="https://www.youtube.com/watch?v=UQjIzVlRlNk" target="_blank" rel="noopener noreferrer" className="btn-charcoal mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold">
              Watch official resource <ExternalLink className="h-3.5 w-3.5 text-gold" />
            </a>
          </article>
        </div>
      )}

      <section aria-labelledby="education-faq-title" className="mx-auto w-full max-w-4xl space-y-3">
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Frequently asked questions</span>
          <h2 id="education-faq-title" className="mt-1 font-heading text-2xl font-bold text-ivory">
            Common questions about support and privacy
          </h2>
        </div>
        {FAQS_DATA.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <article key={faq.id} className="overflow-hidden rounded-xl border border-charcoal-light bg-charcoal/45">
              <button type="button" onClick={() => setOpenFaqId(isOpen ? null : faq.id)} aria-expanded={isOpen} aria-controls={`awareness-faq-${faq.id}`} className="flex min-h-12 w-full items-center justify-between gap-3 p-4 text-left">
                <span className="text-sm font-semibold text-ivory">{language === 'si' ? faq.questionSi : language === 'ta' ? faq.questionTa : faq.question}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-gold transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {isOpen && (
                <p id={`awareness-faq-${faq.id}`} className="border-t border-charcoal-light px-4 py-3 text-xs leading-5 text-ivory/65">
                  {language === 'si' ? faq.answerSi : language === 'ta' ? faq.answerTa : faq.answer}
                </p>
              )}
            </article>
          );
        })}
        <Link to="/#faq" className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-champagne underline">
          Visit all website FAQs <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-midnight/80 backdrop-blur-md"
            onClick={() => setSelectedArticle(null)}
          />
          <div className="relative w-full max-w-3xl charcoal-card bg-charcoal border-gold/30 p-6 sm:p-8 z-10 my-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-light mb-4">
              <span className="text-xs uppercase tracking-wider text-gold font-bold">
                {selectedArticle.category} • {selectedArticle.readTime}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-ivory/60 hover:text-gold text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <h2 className="text-2xl font-bold font-heading text-ivory mb-1">
              {language === 'si' ? selectedArticle.titleSi : language === 'ta' ? selectedArticle.titleTa : selectedArticle.title}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-ivory/80 leading-relaxed">
              {(language === 'si' ? selectedArticle.contentSi : language === 'ta' ? selectedArticle.contentTa : selectedArticle.content).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-charcoal-light flex items-center justify-between text-xs text-ivory/50">
              <span>Author: {selectedArticle.author}</span>
              <span className="text-emerald-400 font-semibold">Clinically Verified Monograph</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
