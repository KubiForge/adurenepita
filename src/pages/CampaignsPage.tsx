import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAMPAIGN_EVENTS, VOLUNTEER_ROLES } from '../data/campaignData';
import { ASSETS } from '../config/assets';
import { CONTACT_INFO } from '../config/contactInfo';
import { SUPPORT_CENTERS_DATA } from '../data/sriLankaData';
import { campaignService } from '../services/campaignService';
import { Button } from '../components/common/Button';
import {
  Calendar,
  Users,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  School,
  Building2,
  Handshake,
  ClipboardCheck,
  ExternalLink,
  ShieldCheck,
  Send,
  Star,
  MapPin,
} from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  const verifiedCenters = SUPPORT_CENTERS_DATA.filter((center) => center.verificationStatus === 'verified');
  const listedDistrictCount = new Set(verifiedCenters.map((center) => center.district)).size;
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [registrationName, setRegistrationName] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [participantType, setParticipantType] = useState('University or community member');
  const [registrationAdultConfirmed, setRegistrationAdultConfirmed] = useState(false);
  const [registrationConsent, setRegistrationConsent] = useState(false);
  const [registrationSubmitting, setRegistrationSubmitting] = useState(false);
  const [registrationReceipt, setRegistrationReceipt] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const [feedbackEventId, setFeedbackEventId] = useState(CAMPAIGN_EVENTS[0]?.id ?? '');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackPrivacyConfirmed, setFeedbackPrivacyConfirmed] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackReceipt, setFeedbackReceipt] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState(VOLUNTEER_ROLES[0].title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [volunteerConsent, setVolunteerConsent] = useState(false);
  const [volunteerReceipt, setVolunteerReceipt] = useState<string | null>(null);
  const [volunteerError, setVolunteerError] = useState<string | null>(null);

  const createIdempotencyKey = () => window.crypto.randomUUID();

  const handleRegistrationSubmit = async (e: React.FormEvent<HTMLFormElement>, eventId: string) => {
    e.preventDefault();
    if (!registrationConsent || !registrationAdultConfirmed) return;

    setRegistrationSubmitting(true);
    setRegistrationError(null);
    try {
      const receipt = await campaignService.registerForEvent({
        eventId,
        fullName: registrationName.trim(),
        email: registrationEmail.trim(),
        participantType,
        adultOrGuardian: registrationAdultConfirmed,
        consentToContact: registrationConsent,
        idempotencyKey: createIdempotencyKey(),
      });
      setRegistrationReceipt(receipt.reference);
    } catch (error) {
      setRegistrationError(error instanceof Error ? error.message : 'Your registration could not be sent. Please try again.');
    } finally {
      setRegistrationSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!feedbackPrivacyConfirmed) return;

    setFeedbackSubmitting(true);
    setFeedbackError(null);
    try {
      const receipt = await campaignService.submitFeedback({
        eventId: feedbackEventId,
        rating: feedbackRating,
        feedback: feedbackText.trim(),
        confirmsNoPersonalDetails: feedbackPrivacyConfirmed,
        idempotencyKey: createIdempotencyKey(),
      });
      setFeedbackReceipt(receipt.reference);
    } catch (error) {
      setFeedbackError(error instanceof Error ? error.message : 'Your feedback could not be sent. Please try again.');
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!volunteerConsent) return;

    setIsSubmitting(true);
    setVolunteerError(null);
    try {
      const receipt = await campaignService.applyToVolunteer({
        fullName: volunteerName.trim(),
        email: volunteerEmail.trim(),
        phone: volunteerPhone.trim(),
        roleId: VOLUNTEER_ROLES.find((role) => role.title === selectedRole)?.id ?? VOLUNTEER_ROLES[0].id,
        consentToContact: volunteerConsent,
        idempotencyKey: createIdempotencyKey(),
      });
      setVolunteerReceipt(receipt.reference);
    } catch (error) {
      setVolunteerError(error instanceof Error ? error.message : 'Your application could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="campaigns-page mx-auto w-full max-w-7xl space-y-12 px-4 py-8 sm:space-y-16 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          Youth Leadership In Action
        </span>
        <h1 className="break-words text-3xl font-bold font-heading text-ivory sm:text-4xl">
          Campaigns & Community Engagement
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          Led by the Leo Club of University of Sri Jayewardenepura, our campaigns combine physical university drives, island-wide school caravans, and youth empowerment.
        </p>
      </div>

      <section className="relative isolate grid grid-cols-1 items-center gap-6 overflow-hidden rounded-2xl border border-gold/30 p-5 sm:gap-8 sm:rounded-3xl sm:p-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${ASSETS.campaignsBg})` }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight via-midnight/90 to-midnight/55" />
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-midnight/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
            <HeartHandshake className="h-4 w-4" />
            Beyond the Stigma
          </span>
          <h2 className="max-w-2xl text-3xl sm:text-4xl font-bold font-heading text-ivory">
            A community that makes hope visible.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-ivory/80">
            Join youth-led awareness work that replaces stigma with knowledge, connection, and compassionate support.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-champagne">
            Learn about our mission <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-2xl border border-gold/30 bg-midnight/70 shadow-2xl sm:max-w-[260px]">
          <img
            src={ASSETS.campaignPoster}
            alt="Beyond the Darkness awareness campaign poster"
            className="aspect-square w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* Campaign Events Timeline */}
      <section aria-labelledby="campaign-calendar-title" className="space-y-5">
        <div className="flex items-start gap-3 border-b border-charcoal-light pb-3">
          <Calendar className="w-5 h-5 text-gold" />
          <h2 id="campaign-calendar-title" className="font-heading font-bold text-xl text-ivory">
            Official Campaign Phases & Upcoming Events
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 sm:gap-6">
          {CAMPAIGN_EVENTS.map((event) => (
            <article key={event.id} className="campaign-event-card charcoal-card flex min-w-0 flex-col justify-between border-charcoal-light p-5 sm:p-6">
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex rounded-full border border-gold/30 bg-midnight px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                    {event.phase}
                  </span>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-950/30 px-2.5 py-1 text-[10px] font-semibold capitalize text-emerald-300">
                    {event.status}
                  </span>
                </div>

                <h3 className="break-words font-heading text-lg font-bold text-ivory">
                  {event.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-ivory/70">
                  {event.description}
                </p>
              </div>

              <div className="mt-5 space-y-2 border-t border-charcoal-light pt-4 text-xs text-ivory/65">
                <p className="flex items-start gap-2"><Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" /><span><strong>Timeline:</strong> {event.date}</span></p>
                <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" /><span><strong>Venue:</strong> {event.location}</span></p>
                <p className="flex items-start gap-2"><Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" /><span><strong>Audience:</strong> {event.targetAudience}</span></p>
              </div>

              <button
                type="button"
                className="btn-charcoal mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
                aria-expanded={selectedEventId === event.id}
                aria-controls={`event-registration-${event.id}`}
                onClick={() => {
                  setSelectedEventId((current) => current === event.id ? null : event.id);
                  setRegistrationReceipt(null);
                  setRegistrationError(null);
                }}
              >
                <ClipboardCheck className="h-4 w-4 text-gold" />
                {selectedEventId === event.id ? 'Close Registration' : 'Register Interest'}
              </button>

              {selectedEventId === event.id && (
                <form
                  id={`event-registration-${event.id}`}
                  onSubmit={(eventForm) => handleRegistrationSubmit(eventForm, event.id)}
                  className="mt-4 space-y-3 rounded-xl border border-gold/20 bg-midnight/70 p-4"
                >
                  {registrationReceipt ? (
                    <div className="space-y-2 text-center" role="status">
                      <CheckCircle2 className="mx-auto h-7 w-7 text-emerald-400" />
                      <p className="text-sm font-bold text-ivory">Registration received</p>
                      <p className="text-xs text-ivory/65">Reference: <span className="font-mono text-gold">{registrationReceipt}</span></p>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-sm font-bold text-ivory">Register for {event.phase}</h4>
                      <p className="text-[11px] leading-5 text-ivory/55">
                        For people aged 18+ or an adult registering on behalf of a school or organization. Do not submit a child’s personal details.
                      </p>
                      <label className="block text-xs font-semibold text-ivory" htmlFor={`registration-name-${event.id}`}>Full name</label>
                      <input
                        id={`registration-name-${event.id}`}
                        autoComplete="name"
                        required
                        maxLength={100}
                        value={registrationName}
                        onChange={(input) => setRegistrationName(input.target.value)}
                        className="w-full min-w-0 rounded-lg border border-charcoal-light bg-charcoal px-3 py-2.5 text-sm text-ivory focus:border-gold focus:outline-none"
                      />
                      <label className="block text-xs font-semibold text-ivory" htmlFor={`registration-email-${event.id}`}>Email address</label>
                      <input
                        id={`registration-email-${event.id}`}
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        value={registrationEmail}
                        onChange={(input) => setRegistrationEmail(input.target.value)}
                        className="w-full min-w-0 rounded-lg border border-charcoal-light bg-charcoal px-3 py-2.5 text-sm text-ivory focus:border-gold focus:outline-none"
                      />
                      <label className="block text-xs font-semibold text-ivory" htmlFor={`registration-type-${event.id}`}>I am registering as</label>
                      <select
                        id={`registration-type-${event.id}`}
                        value={participantType}
                        onChange={(input) => setParticipantType(input.target.value)}
                        className="w-full min-w-0 rounded-lg border border-charcoal-light bg-charcoal px-3 py-2.5 text-sm text-ivory focus:border-gold focus:outline-none"
                      >
                        <option>University or community member</option>
                        <option>Parent or guardian</option>
                        <option>Teacher or school representative</option>
                        <option>NGO or health professional</option>
                      </select>
                      <label className="flex items-start gap-2 text-[11px] leading-5 text-ivory/75">
                        <input
                          type="checkbox"
                          required
                          checked={registrationAdultConfirmed}
                          onChange={(input) => setRegistrationAdultConfirmed(input.target.checked)}
                          className="mt-1 h-4 w-4 shrink-0 accent-[#d8be82]"
                        />
                        <span>I confirm I am 18 or older, or I am a parent, guardian, or authorized school representative.</span>
                      </label>
                      <label className="flex items-start gap-2 text-[11px] leading-5 text-ivory/75">
                        <input
                          type="checkbox"
                          required
                          checked={registrationConsent}
                          onChange={(input) => setRegistrationConsent(input.target.checked)}
                          className="mt-1 h-4 w-4 shrink-0 accent-[#d8be82]"
                        />
                        <span>I consent to the project team using these details to respond to this registration request.</span>
                      </label>
                      {registrationError && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-950/30 p-2.5 text-xs text-red-200">{registrationError} <a className="font-semibold underline" href={`mailto:${CONTACT_INFO.project.email}`}>Contact the project team</a>.</p>}
                      <Button type="submit" variant="gold" size="md" className="min-h-11 w-full" isLoading={registrationSubmitting} disabled={!registrationConsent || !registrationAdultConfirmed}>
                        Submit Registration
                      </Button>
                    </>
                  )}
                </form>
              )}
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="campaign-scope-title" className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">Program Scope & Reporting</span>
          <h2 id="campaign-scope-title" className="font-heading text-2xl font-bold text-ivory sm:text-3xl">
            Measure impact with transparent reporting
          </h2>
          <p className="text-xs leading-5 text-ivory/60">
            These figures describe scheduled activities and current directory coverage, not campaign outcomes. Participation and success metrics will only be published after they are collected and reviewed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { value: CAMPAIGN_EVENTS.length, label: 'Scheduled campaign phases', icon: Calendar },
            { value: verifiedCenters.length, label: 'Verified facility listings', icon: ShieldCheck },
            { value: listedDistrictCount, label: 'Districts with listed facilities', icon: MapPin },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="charcoal-card flex items-center gap-4 border-gold/20 p-4 sm:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-2xl font-bold text-champagne">{value}</p>
                <p className="text-xs text-ivory/60">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-charcoal-light bg-midnight/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div>
              <h3 className="text-sm font-bold text-ivory">Campaign annual report</h3>
              <p className="mt-1 text-xs leading-5 text-ivory/55">
                No verified annual campaign outcome report is published yet. National substance statistics are available separately with their sources and methodology.
              </p>
            </div>
          </div>
          <Link to="/statistics" className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-gold/30 px-3 py-2 text-xs font-semibold text-champagne hover:bg-gold/10">
            View sourced statistics <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="partnership-title" className="rounded-2xl border border-gold/20 bg-gradient-to-br from-charcoal/80 to-midnight p-5 sm:rounded-3xl sm:p-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">CSR, NGO & Institutional Partnerships</span>
          <h2 id="partnership-title" className="mt-1 font-heading text-2xl font-bold text-ivory sm:text-3xl">
            Build prevention programs together
          </h2>
          <p className="mt-2 text-xs leading-5 text-ivory/60">
            Schools, universities, health providers, NGOs, and responsible CSR teams can contact the project team to discuss outreach, referrals, or resource support. Partnership requests are reviewed before any public listing or program commitment.
          </p>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { title: 'Schools & Colleges', text: 'Plan age-appropriate prevention sessions.', icon: School },
            { title: 'NGOs & Care Providers', text: 'Coordinate verified referral pathways.', icon: Handshake },
            { title: 'CSR & Employers', text: 'Support community education and access.', icon: Building2 },
          ].map(({ title, text, icon: Icon }) => (
            <a
              key={title}
              href={`mailto:${CONTACT_INFO.project.email}?subject=${encodeURIComponent(`${title} partnership inquiry`)}`}
              className="group flex min-h-24 items-start gap-3 rounded-xl border border-ivory/10 bg-midnight/60 p-4 transition hover:border-gold/35"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span>
                <span className="block text-sm font-bold text-ivory">{title}</span>
                <span className="mt-1 block text-xs leading-5 text-ivory/55">{text}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-champagne">
                  Contact team <ExternalLink className="h-3 w-3" />
                </span>
              </span>
            </a>
          ))}
        </div>
        <Link to="/network" className="mt-4 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-gold hover:text-champagne">
          Explore the professional and NGO network <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      <section aria-labelledby="campaign-feedback-title" className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">Community Feedback</span>
          <h2 id="campaign-feedback-title" className="font-heading text-2xl font-bold text-ivory sm:text-3xl">
            Help us improve future programs
          </h2>
          <p className="text-xs leading-5 text-ivory/60">
            Feedback is optional and does not ask for your name or contact details. Please do not include personal, medical, or identifying information.
          </p>
          <div className="flex items-start gap-2 rounded-xl border border-gold/15 bg-gold/5 p-3 text-[11px] leading-5 text-ivory/60">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            Feedback is used to improve outreach; it is not a clinical or emergency support channel.
          </div>
        </div>
        <div className="charcoal-card border-charcoal-light p-5 sm:p-6">
          {feedbackReceipt ? (
            <div className="space-y-3 py-4 text-center" role="status">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
              <h3 className="font-heading text-xl font-bold text-ivory">Feedback received</h3>
              <p className="text-xs text-ivory/60">Confirmation reference: <span className="font-mono text-gold">{feedbackReceipt}</span></p>
              <button type="button" className="text-xs font-semibold text-gold underline" onClick={() => {
                setFeedbackReceipt(null);
                setFeedbackText('');
                setFeedbackPrivacyConfirmed(false);
              }}>Share more feedback</button>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label htmlFor="campaign-feedback-event" className="mb-1 block text-xs font-semibold text-ivory">Program</label>
                <select id="campaign-feedback-event" value={feedbackEventId} onChange={(event) => setFeedbackEventId(event.target.value)} className="min-h-11 w-full rounded-xl border border-charcoal-light bg-midnight px-3 py-2.5 text-sm text-ivory focus:border-gold focus:outline-none">
                  {CAMPAIGN_EVENTS.map((event) => <option key={event.id} value={event.id}>{event.title}</option>)}
                </select>
              </div>
              <fieldset>
                <legend className="mb-2 text-xs font-semibold text-ivory">How helpful was the program?</legend>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Program rating">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      role="radio"
                      aria-checked={feedbackRating === rating}
                      aria-label={`${rating} out of 5`}
                      onClick={() => setFeedbackRating(rating)}
                      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-xl border px-3 text-xs font-bold transition ${feedbackRating === rating ? 'border-gold bg-gold/15 text-champagne' : 'border-charcoal-light bg-midnight text-ivory/60 hover:border-gold/40'}`}
                    >
                      <Star className={`h-3.5 w-3.5 ${feedbackRating === rating ? 'fill-current' : ''}`} />{rating}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="campaign-feedback-text" className="mb-1 block text-xs font-semibold text-ivory">What worked well, or what should improve? (Optional)</label>
                <textarea id="campaign-feedback-text" rows={4} maxLength={800} value={feedbackText} onChange={(event) => setFeedbackText(event.target.value)} className="w-full resize-y rounded-xl border border-charcoal-light bg-midnight p-3 text-sm text-ivory focus:border-gold focus:outline-none" />
                <p className="mt-1 text-right text-[10px] text-ivory/40">{feedbackText.length}/800</p>
              </div>
              <label className="flex items-start gap-2 text-[11px] leading-5 text-ivory/70">
                <input type="checkbox" required checked={feedbackPrivacyConfirmed} onChange={(event) => setFeedbackPrivacyConfirmed(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#d8be82]" />
                <span>I have not included identifying or personal health information in my feedback.</span>
              </label>
              {feedbackError && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-950/30 p-3 text-xs text-red-200">{feedbackError} If you need support, visit <Link to="/get-help" className="underline">Get Help</Link>.</p>}
              <Button type="submit" variant="gold" size="md" className="min-h-11 w-full" disabled={!feedbackPrivacyConfirmed || !feedbackEventId} isLoading={feedbackSubmitting}>
                <Send className="mr-2 h-4 w-4" /> Submit Anonymous Feedback
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Volunteer Registration Section */}
      <section aria-labelledby="volunteer-section-title" className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            Join the Movement
          </span>
          <h2 id="volunteer-section-title" className="text-2xl sm:text-3xl font-bold font-heading text-ivory">
            Volunteer with Leo Club of USJ
          </h2>
          <p className="text-xs text-ivory/70 leading-relaxed">
            Whether you are a university undergraduate, health advocate, content creator, or empathetic listener, we welcome your dedication. Volunteers receive comprehensive orientation on clinical boundaries and safeguarding protocols.
          </p>

          <div className="space-y-3 pt-2">
            {VOLUNTEER_ROLES.map((role) => (
                <div key={role.id} className="rounded-xl border border-charcoal-light bg-charcoal p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-ivory">{role.title}</h4>
                    <span className="shrink-0 text-[11px] text-gold font-mono">{role.commitment}</span>
                </div>
                <p className="text-xs text-ivory/60 mt-1 leading-snug">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Form */}
        <div className="min-w-0 charcoal-card border-gold/30 p-5 sm:p-8 lg:col-span-6">
          {!volunteerReceipt ? (
            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-ivory">
                Volunteer Application Form
              </h3>
              <p className="text-xs leading-5 text-ivory/60">
                Your details are used only to review this application and contact you about the selected role. They are not sent until the secure submission service is configured.
              </p>

              <div>
                <label htmlFor="volunteer-name" className="block text-xs font-semibold text-ivory mb-1">Your Full Name</label>
                <input
                  id="volunteer-name"
                  type="text"
                  required
                  autoComplete="name"
                  maxLength={100}
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label htmlFor="volunteer-email" className="block text-xs font-semibold text-ivory mb-1">Email Address</label>
                <input
                  id="volunteer-email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  value={volunteerEmail}
                  onChange={(e) => setVolunteerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label htmlFor="volunteer-phone" className="block text-xs font-semibold text-ivory mb-1">WhatsApp / Phone Number</label>
                <input
                  id="volunteer-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  maxLength={32}
                  value={volunteerPhone}
                  onChange={(e) => setVolunteerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label htmlFor="volunteer-role" className="block text-xs font-semibold text-ivory mb-1">Preferred Volunteer Role</label>
                <select
                  id="volunteer-role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                >
                  {VOLUNTEER_ROLES.map((r) => (
                    <option key={r.id} value={r.title}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-start gap-2 text-[11px] leading-5 text-ivory/70">
                <input
                  type="checkbox"
                  required
                  checked={volunteerConsent}
                  onChange={(event) => setVolunteerConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#d8be82]"
                />
                <span>I consent to the project team using these details to review my volunteer application and contact me about next steps.</span>
              </label>

              {volunteerError && (
                <p role="alert" className="rounded-lg border border-red-500/30 bg-red-950/30 p-3 text-xs leading-5 text-red-200">
                  {volunteerError}{' '}
                  <a className="font-semibold underline" href={`mailto:${CONTACT_INFO.project.email}`}>Contact the project team</a>.
                </p>
              )}

              <div className="pt-1">
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="min-h-11 w-full"
                  disabled={!volunteerConsent}
                  isLoading={isSubmitting}
                >
                  Submit Volunteer Registration
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 py-8 text-center animate-fade-in" role="status">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-ivory">
                Application Received!
              </h3>
              <p className="mx-auto max-w-sm text-xs leading-relaxed text-ivory/70">
                Your application was received by the project team. Confirmation reference: <span className="font-mono text-gold">{volunteerReceipt}</span>
              </p>
              <Button variant="charcoal" size="sm" onClick={() => {
                setVolunteerReceipt(null);
                setVolunteerName('');
                setVolunteerEmail('');
                setVolunteerPhone('');
                setVolunteerConsent(false);
              }}>
                Register Another Volunteer
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
