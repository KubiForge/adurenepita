import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Scale,
  ShieldCheck,
  HeartHandshake,
  BriefcaseBusiness,
  Landmark,
  UserCheck,
  FileText,
  ExternalLink,
  ChevronDown,
  PhoneCall,
  AlertTriangle,
} from 'lucide-react';
import { CONTACT_INFO, telephoneHref } from '../config/contactInfo';

interface PolicySection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  summary: string;
  points: string[];
  sources: Array<{ name: string; url: string }>;
}

const policySections: PolicySection[] = [
  {
    id: 'terms',
    title: 'Terms of Use & Medical Disclaimer',
    icon: FileText,
    summary:
      'Information and support-navigation tools are provided for education and referral. They do not establish a doctor-patient or counselor-client relationship.',
    points: [
      'Do not use the website or AI assistant to delay emergency care or replace examination by a qualified health professional.',
      'The platform does not guarantee the availability, accreditation, outcome, or suitability of any external organization.',
      'Users are responsible for their decisions and should independently verify medical, legal, and treatment information.',
      'No person should submit another person’s information or publish a recovery story without that person’s informed consent.',
    ],
    sources: [
      { name: 'Sri Lanka Ministry of Health', url: 'https://health.gov.lk/' },
      { name: 'National Dangerous Drugs Control Board', url: 'https://nddcb.gov.lk/' },
    ],
  },
  {
    id: 'drug-laws',
    title: 'Sri Lankan Drug Laws & Your Rights',
    icon: Scale,
    summary:
      'Sri Lanka regulates controlled drugs primarily through the Poisons, Opium and Dangerous Drugs Ordinance and related legislation, regulations, and court orders. Possession, supply, trafficking, and treatment obligations can have serious legal consequences.',
    points: [
      'A person should not assume that casual use, possession, or sharing substances is lawful.',
      'Court-directed treatment, rehabilitation, bail, and sentencing decisions require verified legal advice.',
      'Consent, privacy, and access to qualified healthcare are not a substitute for legal representation.',
      'Drug policy and penalties can change. Confirm the current law before relying on a general summary.',
    ],
    sources: [
      { name: 'National Dangerous Drugs Control Board', url: 'https://www.nddcb.gov.lk/' },
      { name: 'Sri Lanka Ministry of Justice', url: 'https://moj.gov.lk/' },
      { name: 'LawNet - Sri Lanka Department of Legal Affairs', url: 'https://www.lawnet.gov.lk/' },
    ],
  },
  {
    id: 'rehabilitation',
    title: 'Treatment, Rehabilitation & Voluntary Care',
    icon: HeartHandshake,
    summary:
      'Where possible, people affected by substance use should receive dignified, evidence-based care. Court referral or compulsory treatment may involve separate legal procedures and due-process protections.',
    points: [
      'Ask a facility for its licensing or registration status and an explanation of treatment rules before admission.',
      'Withdrawal from alcohol or benzodiazepines can be dangerous and requires medical supervision.',
      'Request a written description of admission, discharge, family access, fees, and complaint procedures.',
      'Compulsory or court-ordered care may be subject to specific legal safeguards; obtain independent legal advice.',
    ],
    sources: [
      { name: 'National Institute of Mental Health', url: 'https://nimh.health.gov.lk/' },
      { name: 'Sri Lanka Ministry of Health', url: 'https://health.gov.lk/' },
      { name: 'National Dangerous Drugs Control Board', url: 'https://www.nddcb.gov.lk/' },
    ],
  },
  {
    id: 'crisis-response',
    title: 'Crisis Handling & Suicide Prevention',
    icon: AlertTriangle,
    summary:
      'This website is not an emergency service and does not monitor conversations or submissions in real time. Use direct emergency and crisis services when immediate help is needed.',
    points: [
      'For overdose, serious injury, loss of consciousness, or immediate medical danger, call Suwaseriya ambulance at 1990.',
      'If someone may act on thoughts of suicide or self-harm, help them contact CCC at 1333, stay with a trusted person if safe, and seek urgent in-person care. Call 1990 for immediate medical danger.',
      'NDDCB at 1927 can provide drug-related information and support; it is not an emergency dispatch service.',
      'Do not wait for a website response, account message, or group moderator during a crisis. If there is immediate danger to someone else, contact emergency services.',
    ],
    sources: [
      { name: 'Suwaseriya Ambulance Service', url: 'https://www.1990.lk/' },
      { name: 'National Dangerous Drugs Control Board', url: 'https://nddcb.gov.lk/' },
      { name: 'National Institute of Mental Health', url: 'https://nimh.health.gov.lk/' },
    ],
  },
  {
    id: 'content-review',
    title: 'Evidence, Authors & Content Review',
    icon: FileText,
    summary:
      'Health information should be traceable to reliable sources and clearly distinguish editorial updates from clinical review.',
    points: [
      'Medically substantive pages should name the author or responsible organization, identify a qualified reviewer and their role, show the review date, and link to source references.',
      'A named clinical reviewer and professional review date are not listed for this page; its content should not be treated as professionally reviewed medical advice.',
      'Use current, evidence-based and non-stigmatizing language. Do not use sensational imagery, fabricated testimonials, or imply that one recovery path works for everyone.',
      'Sources support general education only. They do not establish an individual diagnosis or replace advice from a qualified health professional.',
    ],
    sources: [
      { name: 'WHO mhGAP Intervention Guide', url: 'https://www.who.int/publications/i/item/9789241549790' },
      { name: 'Sri Lanka Ministry of Health', url: 'https://health.gov.lk/' },
      { name: 'National Dangerous Drugs Control Board', url: 'https://nddcb.gov.lk/' },
    ],
  },
  {
    id: 'community-moderation',
    title: 'Community Standards & Moderation',
    icon: UserCheck,
    summary:
      'Peer and family support should be respectful, privacy-conscious, and clear about its limits. This website does not currently host a live forum or user-posted group.',
    points: [
      'No shaming, harassment, discrimination, stigmatizing language, or pressure to disclose personal experiences.',
      'Do not share another person’s identity, health information, or recovery story without their explicit consent.',
      'Peer support is not clinical care. Do not post diagnoses, treatment instructions, dangerous withdrawal advice, or promises of recovery.',
      'Before any online community launches, it must have published rules, trained moderation, reporting and removal processes, and a crisis escalation plan. These controls are not currently offered on this site.',
    ],
    sources: [
      { name: 'Data Protection Authority, Sri Lanka', url: 'https://www.dpa.gov.lk/' },
      { name: 'National Dangerous Drugs Control Board', url: 'https://nddcb.gov.lk/' },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy, Confidentiality & Consent',
    icon: ShieldCheck,
    summary:
      'The platform applies privacy minimization and explicit consent. Browsing drug education and using general guidance does not require revealing identity, and referral information should be shared only with the user’s informed approval.',
    points: [
      'Do not submit National Identity Card numbers, full addresses, medical records, or passwords unless a verified service specifically requires them.',
      'Referral consent should identify what is being shared, with whom, and for what purpose.',
      'Administrative staff may access only records needed for the assigned role and lawful process.',
      'AI conversations are not a private clinical record unless the platform clearly states otherwise.',
      'When configured, account sign-in uses Firebase Authentication with email verification. This does not mean the site provides an encrypted clinical-record vault; no such health-record feature is claimed here.',
      'Guided assessment answers remain in the browser unless a user explicitly submits a support request. Account or support-service records may be held by their respective services; this page does not specify their retention period.',
      'The profile page cannot currently delete a Firebase account or support-service records. Clearing browser data only removes local browser data and does not delete server-held records.',
      'Ask the project team about retention, access, correction, or deletion before submitting personal information. Do not create an account or submit health details if you are uncomfortable with the available information.',
    ],
    sources: [
      { name: 'Data Protection Authority, Sri Lanka', url: 'https://www.dpa.gov.lk/' },
      { name: 'Human Rights Commission of Sri Lanka', url: 'https://hrcsl.lk/' },
    ],
  },
  {
    id: 'mandatory-reporting',
    title: 'Mandatory Reporting & High-Risk Disclosures',
    icon: AlertTriangle,
    summary:
      'General confidentiality does not eliminate every legal, safeguarding, or emergency responsibility. Specific reporting duties can depend on age, imminent danger, abuse, violence, or a court or statutory mandate.',
    points: [
      'The platform should never promise absolute confidentiality where abuse, child protection, immediate danger, or lawful reporting duties may apply.',
      'Professionals and organizations must follow their statutory obligations, professional codes, and organizational safeguarding procedures.',
      'A suspected child at risk should be referred through the appropriate Sri Lankan child protection authority or emergency channel.',
      'Immediate violence or life-threatening danger should be handled through police or ambulance services, not through this website.',
    ],
    sources: [
      { name: 'Ministry of Women and Child Affairs', url: 'https://www.womenchildmin.gov.lk/' },
      { name: 'National Child Protection Authority', url: 'https://www.childprotection.gov.lk/' },
      { name: 'Police Emergency Services', url: 'https://www.police.lk/' },
    ],
  },
  {
    id: 'insurance-employment',
    title: 'Insurance, Employment & Discrimination Rights',
    icon: BriefcaseBusiness,
    summary:
      'Insurance and employment decisions involving health, rehabilitation, or criminal records can be complex. Treatment status or a past allegation does not automatically determine the outcome of benefits or employment rights.',
    points: [
      'Ask for the exact policy term or employment policy in writing before relying on verbal information.',
      'Request an accommodation or workplace support process through the appropriate human resources or occupational health channel.',
      'Seek confidential advice from a qualified employment lawyer or labor authority if a person faces unfair discrimination.',
      'Do not disclose health or recovery details more widely than necessary for insurance or employment purposes.',
    ],
    sources: [
      { name: 'Department of Labour Sri Lanka', url: 'https://www.labourdept.gov.lk/' },
      { name: 'Sri Lanka Insurance Regulatory Commission', url: 'https://www.ircsl.gov.lk/' },
      { name: 'Human Rights Commission of Sri Lanka', url: 'https://hrcsl.lk/' },
    ],
  },
  {
    id: 'legal-aid',
    title: 'Legal Aid, Complaints & Independent Advice',
    icon: Landmark,
    summary:
      'People involved in court cases or concerned about their rights can seek independent legal advice and should not rely on this page as legal representation.',
    points: [
      'Use the Legal Aid Commission for eligibility and appointment information.',
      'For a privacy complaint, request access, correction, or deletion through the platform contact channel.',
      'For unfair treatment or human-rights concerns, contact the Human Rights Commission of Sri Lanka.',
      'Keep dates, written notices, facility names, and reference numbers when making a complaint.',
    ],
    sources: [
      { name: 'Legal Aid Commission of Sri Lanka', url: 'https://www.legalaid.gov.lk/' },
      { name: 'Human Rights Commission of Sri Lanka', url: 'https://hrcsl.lk/' },
      { name: 'Sri Lanka Ministry of Justice', url: 'https://moj.gov.lk/' },
    ],
  },
];

const PolicyCard: React.FC<{ section: PolicySection; initiallyOpen?: boolean }> = ({ section, initiallyOpen = false }) => {
  const [open, setOpen] = useState(initiallyOpen);
  const Icon = section.icon;

  return (
    <article id={section.id} className="scroll-mt-28 overflow-hidden rounded-2xl border border-gold/15 bg-charcoal/45">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
        aria-expanded={open}
        aria-controls={`${section.id}-panel`}
      >
        <span className="flex gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-midnight text-gold">
            <Icon className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-heading text-lg font-semibold text-ivory sm:text-xl">
              {section.title}
            </span>
            <span className="mt-2 block max-w-3xl text-sm leading-6 text-ivory/60">
              {section.summary}
            </span>
          </span>
        </span>
        <ChevronDown
          className={`mt-2 h-5 w-5 shrink-0 text-gold transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id={`${section.id}-panel`} className="border-t border-gold/10 px-5 pb-6 pt-5 sm:px-20 sm:pb-7">
          <ul className="space-y-3 text-sm leading-6 text-ivory/75">
            {section.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
              Official sources
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {section.sources.map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/10 px-3 py-2 text-xs text-champagne transition hover:border-gold/40 hover:bg-gold/5"
                >
                  {source.name}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export const LegalPolicyPage: React.FC = () => {
  const location = useLocation();
  const routeSection = location.pathname === '/privacy'
    ? 'privacy'
    : location.pathname === '/terms'
      ? 'terms'
      : location.hash.replace('#', '') || '';

  useEffect(() => {
    if (!routeSection) return;
    window.requestAnimationFrame(() => {
      document.getElementById(routeSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.pathname, routeSection]);

  return (
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <header className="max-w-4xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
        <FileText className="h-3.5 w-3.5" />
        Legal, Rights & Policy
      </span>
      <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
        Legal Guidance & Privacy
      </h1>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-ivory/65 sm:text-base">
        General information to help Sri Lankan users understand rights, confidentiality, treatment,
        insurance, employment, legal aid, and safeguarding. This page is not legal advice and does
        not replace a qualified lawyer or official government guidance.
      </p>
      <p className="mt-4 max-w-3xl text-xs leading-5 text-ivory/50">
        Content owner: Beyond the Darkness project team. Named clinical reviewer and professional
        review date: not listed; clinical review has not been verified.
      </p>
    </header>

    <section className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4" aria-label="Important notices">
      <div className="rounded-2xl border border-gold/15 bg-charcoal/35 p-5">
        <Scale className="h-5 w-5 text-gold" />
        <h2 className="mt-3 font-semibold text-ivory">Legal rights vary by case</h2>
        <p className="mt-2 text-xs leading-5 text-ivory/55">
          Confirm current laws and procedures with a licensed Sri Lankan lawyer or official authority.
        </p>
      </div>
      <div className="rounded-2xl border border-gold/15 bg-charcoal/35 p-5">
        <UserCheck className="h-5 w-5 text-gold" />
        <h2 className="mt-3 font-semibold text-ivory">Consent is specific</h2>
        <p className="mt-2 text-xs leading-5 text-ivory/55">
          Personal or medical information should be shared only for a stated purpose and with explicit consent.
        </p>
      </div>
      <div className="rounded-2xl border border-red-400/25 bg-red-950/20 p-5">
        <PhoneCall className="h-5 w-5 text-red-300" />
        <h2 className="mt-3 font-semibold text-ivory">Immediate danger</h2>
        <p className="mt-2 text-xs leading-5 text-ivory/55">
          Call{' '}
          <a className="font-bold text-red-200" href={telephoneHref(CONTACT_INFO.emergency.ambulance.number)}>
            {CONTACT_INFO.emergency.ambulance.number}
          </a>{' '}
          or{' '}
          <a className="font-bold text-red-200" href={telephoneHref(CONTACT_INFO.emergency.police.number)}>
            {CONTACT_INFO.emergency.police.number}
          </a>{' '}
          for emergency assistance.
        </p>
      </div>
      <div className="rounded-2xl border border-red-400/25 bg-red-950/20 p-5">
        <AlertTriangle className="h-5 w-5 text-red-300" />
        <h2 className="mt-3 font-semibold text-ivory">Suicide or emotional crisis</h2>
        <p className="mt-2 text-xs leading-5 text-ivory/55">
          Call{' '}
          <a className="font-bold text-red-200" href={telephoneHref(CONTACT_INFO.emergency.crisisSupport.number)}>
            {CONTACT_INFO.emergency.crisisSupport.number}
          </a>{' '}
          for crisis support. For immediate medical danger, call{' '}
          <a className="font-bold text-red-200" href={telephoneHref(CONTACT_INFO.emergency.ambulance.number)}>
            {CONTACT_INFO.emergency.ambulance.number}
          </a>
          . Do not wait for this website to respond.
        </p>
      </div>
    </section>

    <section className="mt-10 space-y-4" aria-label="Legal and policy topics">
      {policySections.map((section) => (
        <PolicyCard
          key={section.id}
          section={section}
          initiallyOpen={section.id === routeSection}
        />
      ))}
    </section>

    <section className="mt-10 grid gap-4 rounded-3xl border border-gold/20 bg-gradient-to-br from-charcoal to-midnight p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-ivory">Need help accessing rights or a service?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ivory/60">
          Find verified support organizations or contact the project team for a directory and documentation review.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/support-directory"
          className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold"
        >
          Find Support
        </Link>
        <a
          href={`mailto:${CONTACT_INFO.project.email}?subject=Legal%20or%20Policy%20Information%20Request`}
          className="btn-charcoal inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold text-champagne"
        >
          Contact the Project
        </a>
      </div>
    </section>

    <p className="mt-6 text-xs leading-5 text-ivory/45">
      Content updated: 18 November 2026; this is not a professional review date. Laws, services, and
      helpline availability may change. Verify current details with the relevant authority.
    </p>
  </div>
  );
};

