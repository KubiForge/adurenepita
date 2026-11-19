import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  Handshake,
  HeartHandshake,
  MapPin,
  PhoneCall,
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import { CONTACT_INFO, telephoneHref } from '../config/contactInfo';
import { SUPPORT_CENTERS_DATA } from '../data/sriLankaData';
import type { SupportCenter } from '../types/directory';

type NetworkFilter = 'all' | SupportCenter['organizationType'];

const NETWORK_FILTERS: { id: NetworkFilter; label: string }[] = [
  { id: 'all', label: 'All organizations' },
  { id: 'government', label: 'Government' },
  { id: 'hospital', label: 'Hospitals' },
  { id: 'ngo', label: 'NGOs' },
  { id: 'community', label: 'Community' },
];

const SERVICE_LABELS: Record<SupportCenter['serviceTypes'][number], string> = {
  counseling: 'Counseling',
  rehabilitation: 'Rehabilitation',
  medical: 'Medical care',
  referral: 'Referral service',
  family_support: 'Family support',
  hotline: 'Helpline',
  peer_support: 'Peer support',
};

const OFFICIAL_RESOURCES = [
  {
    name: 'National Dangerous Drugs Control Board',
    detail: 'National drug information and counseling',
    phone: CONTACT_INFO.emergency.drugHelpline.number,
    href: 'https://nddcb.gov.lk/',
    category: 'Government',
  },
  {
    name: 'National Institute of Mental Health',
    detail: 'Mental health information and hospital services',
    phone: CONTACT_INFO.emergency.mentalHealth.number,
    href: 'https://nimh.health.gov.lk/',
    category: 'Government hospital',
  },
  {
    name: 'Sri Lanka Medical Council',
    detail: 'Check the registration of medical practitioners',
    href: 'https://slmc.gov.lk/en',
    category: 'Professional regulator',
  },
];

export const ProfessionalNetworkPage: React.FC = () => {
  const [filter, setFilter] = useState<NetworkFilter>('all');
  const [search, setSearch] = useState('');
  const verifiedCenters = useMemo(
    () => SUPPORT_CENTERS_DATA.filter((center) => center.verificationStatus === 'verified'),
    [],
  );
  const filteredCenters = useMemo(() => {
    const query = search.trim().toLowerCase();
    return verifiedCenters.filter((center) => {
      const matchesType = filter === 'all' || center.organizationType === filter;
      const searchableContent = [
        center.name,
        center.city,
        center.district,
        center.province,
        ...center.serviceTypes.map((service) => SERVICE_LABELS[service]),
      ].join(' ').toLowerCase();
      return matchesType && (!query || searchableContent.includes(query));
    });
  }, [filter, search, verifiedCenters]);

  const organizationTypeLabel = (type: SupportCenter['organizationType']) => {
    if (type === 'ngo') return 'Non-government organization';
    if (type === 'government') return 'Government service';
    if (type === 'hospital') return 'Hospital';
    return 'Community service';
  };

  return (
    <div className="network-page mx-auto w-full max-w-7xl space-y-12 px-4 py-8 sm:space-y-16 sm:px-6 sm:py-12 lg:px-8">
      <header className="relative isolate overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-charcoal to-midnight p-5 sm:rounded-3xl sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 -z-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
            <HeartHandshake className="h-4 w-4" /> Professional & NGO Network
          </span>
          <h1 className="break-words font-heading text-3xl font-bold text-ivory sm:text-4xl">
            Connect with verified care organizations
          </h1>
          <p className="text-sm leading-6 text-ivory/70">
            Find verified hospital, government, and non-government support listings, understand how referrals work, and learn how to check a professional’s credentials.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link to="/support-directory" className="btn-gold inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold">
              Browse care directory <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/campaigns" className="btn-charcoal inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold">
              Join outreach programs <Users className="h-4 w-4 text-gold" />
            </Link>
          </div>
        </div>
      </header>

      <section aria-labelledby="provider-list-title" className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">Institutional Directory</span>
            <h2 id="provider-list-title" className="mt-1 font-heading text-2xl font-bold text-ivory sm:text-3xl">
              Verified hospitals, services & NGOs
            </h2>
            <p className="mt-2 text-xs leading-5 text-ivory/55">
              Only listings currently marked verified in the support directory appear here. Verification applies to the organization listing and contact details, not to an individual clinician’s license.
            </p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-ivory/40" aria-hidden="true" />
            <label htmlFor="network-search" className="sr-only">Search organizations and services</label>
            <input
              id="network-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search organization, district, care..."
              className="min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight pl-10 pr-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" role="group" aria-label="Filter organization type">
          {NETWORK_FILTERS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
              className={`min-h-10 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                filter === option.id
                  ? 'border-gold/50 bg-gold/10 text-champagne'
                  : 'border-charcoal-light bg-midnight text-ivory/65 hover:border-gold/30'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-ivory/55" aria-live="polite">
          Showing <strong className="text-ivory">{filteredCenters.length}</strong> verified organizations
        </p>

        {filteredCenters.length ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredCenters.map((center) => (
              <article key={center.id} className="network-center-card charcoal-card flex min-w-0 flex-col border-charcoal-light p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <span className="rounded-full border border-gold/25 bg-gold/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold">
                    {organizationTypeLabel(center.organizationType)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/30 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified {center.lastVerifiedDate}
                  </span>
                </div>
                <h3 className="mt-3 break-words font-heading text-lg font-bold text-ivory">{center.name}</h3>
                <p className="mt-1 flex items-start gap-2 text-xs text-ivory/60">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{center.city}, {center.district}, {center.province}</span>
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {center.serviceTypes.map((service) => (
                    <span key={service} className="rounded-full border border-ivory/10 bg-midnight px-2.5 py-1 text-[10px] text-ivory/70">
                      {SERVICE_LABELS[service]}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-charcoal-light pt-4">
                  <a href={telephoneHref(center.phone)} className="btn-gold inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-bold">
                    <PhoneCall className="h-3.5 w-3.5" /> {center.phone}
                  </a>
                  {center.website && (
                    <a href={center.website} target="_blank" rel="noopener noreferrer" className="btn-charcoal inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold">
                      Official website <ExternalLink className="h-3.5 w-3.5 text-gold" />
                    </a>
                  )}
                  <span className="basis-full text-[10px] text-ivory/40">Listing reviewed by {center.verifiedBy}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-charcoal-light bg-charcoal/50 p-6 text-center">
            <p className="text-sm font-semibold text-ivory">No verified listings match those filters.</p>
            <button type="button" onClick={() => { setFilter('all'); setSearch(''); }} className="mt-3 text-xs font-semibold text-gold underline">
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section aria-labelledby="professional-verification-title" className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div className="rounded-2xl border border-gold/20 bg-charcoal/60 p-5 sm:p-7">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
              <Stethoscope className="h-5 w-5" />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold">Professional Verification</span>
              <h2 id="professional-verification-title" className="mt-1 font-heading text-xl font-bold text-ivory">
                Check credentials before care
              </h2>
            </div>
          </div>
          <ul className="mt-4 space-y-3 text-xs leading-5 text-ivory/65">
            <li>For medical doctors, confirm registration directly with the Sri Lanka Medical Council.</li>
            <li>For psychologists and counselors, ask about qualifications, relevant experience, supervision, confidentiality, and scope of practice.</li>
            <li>The public directory currently lists organizations and facilities; it does not publish individual clinician profiles.</li>
          </ul>
          <a href="https://slmc.gov.lk/en" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-champagne hover:text-gold">
            Visit Sri Lanka Medical Council <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="rounded-2xl border border-charcoal-light bg-midnight/70 p-5 sm:p-7">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">Government & National Resources</span>
          <div className="mt-4 space-y-3">
            {OFFICIAL_RESOURCES.map((resource) => (
              <article key={resource.name} className="flex flex-col gap-2 rounded-xl border border-ivory/10 bg-charcoal/50 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="break-words text-xs font-bold text-ivory">{resource.name}</p>
                  <p className="mt-1 text-[11px] text-ivory/50">{resource.detail}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {resource.phone && <a href={telephoneHref(resource.phone)} className="inline-flex min-h-9 items-center gap-1.5 text-xs font-bold text-champagne"><PhoneCall className="h-3.5 w-3.5 text-gold" />{resource.phone}</a>}
                  <a href={resource.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${resource.name}`} className="grid h-9 w-9 place-items-center rounded-full border border-gold/20 text-gold hover:bg-gold/10">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="referral-workflow-title" className="space-y-5">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">Consent-Based Referral Workflow</span>
          <h2 id="referral-workflow-title" className="mt-1 font-heading text-2xl font-bold text-ivory sm:text-3xl">
            A clear path from search to support
          </h2>
        </div>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            'Choose a service and check its contact and operating details.',
            'Request a referral through the directory and provide explicit consent.',
            'The platform support team reviews your request and responds with options; it does not book an appointment for you.',
            'For immediate danger, call emergency services directly. Do not wait for an online referral.',
          ].map((step, index) => (
            <li key={step} className="rounded-xl border border-charcoal-light bg-charcoal/60 p-4">
              <span className="font-mono text-lg font-bold text-gold">0{index + 1}</span>
              <p className="mt-2 text-xs leading-5 text-ivory/70">{step}</p>
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/support-directory" className="btn-gold inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold">
            Open support directory <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/get-help" className="btn-charcoal inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold">
            Urgent help options <PhoneCall className="h-4 w-4 text-gold" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="network-partners-title" className="rounded-2xl border border-gold/20 bg-gradient-to-br from-charcoal/75 to-midnight p-5 sm:rounded-3xl sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">NGO, Volunteer & CSR Partnerships</span>
            <h2 id="network-partners-title" className="mt-1 font-heading text-2xl font-bold text-ivory">
              Help strengthen the network
            </h2>
            <p className="mt-2 text-xs leading-5 text-ivory/60">
              We welcome inquiries from qualified care providers, NGOs, schools, universities, and responsible CSR teams. Listings are not endorsements; each is reviewed before publication.
            </p>
          </div>
          <a href={`mailto:${CONTACT_INFO.project.email}?subject=${encodeURIComponent('Professional and NGO network inquiry')}`} className="btn-gold inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold">
            <Handshake className="h-4 w-4" /> Contact the team
          </a>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 border-t border-ivory/10 pt-4">
          <Link to="/community" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-charcoal-light px-3 py-2 text-xs font-semibold text-ivory/75 hover:border-gold/35">
            Volunteer network <Users className="h-3.5 w-3.5 text-gold" />
          </Link>
          <Link to="/campaigns" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-charcoal-light px-3 py-2 text-xs font-semibold text-ivory/75 hover:border-gold/35">
            Campaign partnerships <Building2 className="h-3.5 w-3.5 text-gold" />
          </Link>
        </div>
      </section>
    </div>
  );
};
