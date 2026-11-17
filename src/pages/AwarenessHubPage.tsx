import React, { useEffect, useState } from 'react';
import { ARTICLES_DATA, Article } from '../data/awarenessData';
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
} from 'lucide-react';
import { CONTACT_INFO, telephoneHref } from '../config/contactInfo';

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
  const [activeTab, setActiveTab] = useState<'articles' | 'quiz' | 'downloads'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedGuidance, setSelectedGuidance] = useState<AudienceGuidance | null>(null);

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
      size: 'PDF • 1.4 MB',
      category: 'Family Guide',
      content: 'BEYOND THE DARKNESS - FAMILY GUIDE\n\nEarly warning signs:\n- Sudden behavioral or relationship changes\n- Unexplained sleep, appetite, weight or attendance changes\n- Secretiveness, missing money or confiscated items\n- Mood swings, agitation or unusual paranoia\n\nRecommended response:\n1. Choose a calm and private moment.\n2. Use "I am concerned" statements rather than accusations.\n3. Listen without threats or humiliation.\n4. Seek professional support through a verified service.\n5. For immediate danger, call 1990 or attend the nearest hospital emergency department.\n\nNDDCB confidential drug counseling: 1927',
    },
    {
      title: 'Emergency Overdose Protocol & Recovery Position One-Pager',
      size: 'PDF • 850 KB',
      category: 'Clinical Protocol',
      content: 'BEYOND THE DARKNESS - OVERDOSE RESPONSE\n\nEmergency signs:\n- Slow, shallow or stopped breathing\n- Unresponsiveness or inability to wake\n- Blue or grey lips and fingertips\n- Seizures or collapse\n\nImmediate actions:\n1. Call 1990 now.\n2. Follow the dispatcher instructions.\n3. If breathing is absent, begin CPR if trained.\n4. Place an unconscious breathing person in the recovery position.\n5. Do not leave the person alone.\n\nDo not induce vomiting or give food, drink or unknown medicines.',
    },
    {
      title: 'Methamphetamine (ICE) Facts for University Students',
      size: 'PDF • 2.1 MB',
      category: 'Youth Prevention',
      content: 'BEYOND THE DARKNESS - METHAMPHETAMINE AWARENESS\n\nKey facts:\n- Crystal methamphetamine ("ICE") strongly activates the brain reward system.\n- It can cause severe agitation, psychosis, overheating and cardiac danger.\n- Dependence can develop quickly.\n- There is no safe dosage or "purity" assumption.\n\nPrevention:\n- Know peer and social-media pressure warning signs.\n- Leave a setting immediately if illegal drugs are present.\n- Tell a trusted adult or counselor early.\n- Contact NDDCB 1927 for confidential guidance.',
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
        <h1 className="text-4xl font-bold font-heading text-ivory">
          Awareness Hub & Community Resources
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          Evidence-based prevention information for Sri Lankan children, students, families, workplaces, and communities. Every health claim should be read with its source and last-review date.
        </p>
      </div>

      <section aria-labelledby="audience-guidance-title" className="space-y-5">
        <div className="max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Prevention by audience</span>
          <h2 id="audience-guidance-title" className="mt-2 text-2xl font-heading font-bold text-ivory">
            Practical Guidance for Every Community
          </h2>
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
            <span>Educational Articles</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`shrink-0 px-3 py-2 sm:px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz' ? 'bg-gold text-midnight' : 'text-ivory/70 hover:text-ivory'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`shrink-0 px-3 py-2 sm:px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'downloads' ? 'bg-gold text-midnight' : 'text-ivory/70 hover:text-ivory'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Downloadable Materials</span>
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
                  {art.title}
                </h3>

                <p className="text-xs text-ivory/70 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-charcoal-light flex items-center justify-between">
                <span className="text-[11px] text-ivory/40">{art.publishedDate}</span>
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs font-semibold text-gold hover:underline flex items-center gap-1"
                >
                  <span>Read Full Article</span>
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
          <InteractiveQuiz />
        </div>
      )}

      {/* TAB 3: DOWNLOADABLE MATERIALS */}
      {activeTab === 'downloads' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                  Download Free Guide
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

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
              {selectedArticle.title}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-ivory/80 leading-relaxed">
              {selectedArticle.content.map((p, i) => (
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
