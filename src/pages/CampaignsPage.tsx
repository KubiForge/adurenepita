import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAMPAIGN_EVENTS, VOLUNTEER_ROLES } from '../data/campaignData';
import { ASSETS } from '../config/assets';
import { Button } from '../components/common/Button';
import { Calendar, Users, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState(VOLUNTEER_ROLES[0].title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setVolunteerSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          Youth Leadership In Action
        </span>
        <h1 className="text-4xl font-bold font-heading text-ivory">
          Campaigns & Community Engagement
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          Led by the Leo Club of University of Sri Jayewardenepura, our campaigns combine physical university drives, island-wide school caravans, and youth empowerment.
        </p>
      </div>

      <section className="relative isolate grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-8 items-center overflow-hidden rounded-3xl border border-gold/30 p-6 sm:p-10">
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
        <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl border border-gold/30 bg-midnight/70 shadow-2xl">
          <img
            src={ASSETS.campaignPoster}
            alt="Beyond the Darkness awareness campaign poster"
            className="aspect-square w-full object-contain"
            loading="lazy"
          />
        </div>
      </section>

      {/* Campaign Events Timeline */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-charcoal-light pb-3">
          <Calendar className="w-5 h-5 text-gold" />
          <h2 className="font-heading font-bold text-xl text-ivory">
            Official Campaign Phases & Upcoming Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAMPAIGN_EVENTS.map((event) => (
            <div key={event.id} className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between charcoal-card-hover">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider px-2 py-0.5 rounded bg-midnight border border-gold/30 inline-block mb-3">
                  {event.phase}
                </span>

                <h3 className="font-heading font-bold text-lg text-ivory">
                  {event.title}
                </h3>

                <p className="text-xs text-ivory/70 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-light text-xs text-ivory/60 space-y-1">
                <div><strong>Timeline:</strong> {event.date}</div>
                <div><strong>Venue:</strong> {event.location}</div>
                <div><strong>Target Audience:</strong> {event.targetAudience}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer Registration Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            Join the Movement
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ivory">
            Volunteer with Leo Club of USJ
          </h2>
          <p className="text-xs text-ivory/70 leading-relaxed">
            Whether you are a university undergraduate, health advocate, content creator, or empathetic listener, we welcome your dedication. Volunteers receive comprehensive orientation on clinical boundaries and safeguarding protocols.
          </p>

          <div className="space-y-3 pt-2">
            {VOLUNTEER_ROLES.map((role) => (
              <div key={role.id} className="p-4 rounded-xl bg-charcoal border border-charcoal-light">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-ivory">{role.title}</h4>
                  <span className="text-[11px] text-gold font-mono">{role.commitment}</span>
                </div>
                <p className="text-xs text-ivory/60 mt-1 leading-snug">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Form */}
        <div className="lg:col-span-6 charcoal-card p-6 sm:p-8 border-gold/30">
          {!volunteerSubmitted ? (
            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-ivory">
                Volunteer Application Form
              </h3>
              <p className="text-xs text-ivory/60">
                No account required. We will reach out via WhatsApp/email.
              </p>

              <div>
                <label className="block text-xs font-semibold text-ivory mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Fernando"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ivory mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. kasun@usj.ac.lk"
                  value={volunteerEmail}
                  onChange={(e) => setVolunteerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ivory mb-1">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 071 234 5678"
                  value={volunteerPhone}
                  onChange={(e) => setVolunteerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ivory mb-1">Preferred Volunteer Role</label>
                <select
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

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Submit Volunteer Registration
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-ivory">
                Application Received!
              </h3>
              <p className="text-xs text-ivory/70 leading-relaxed max-w-sm mx-auto">
                Thank you for offering your energy. The Leo Club project coordinator will contact you via WhatsApp for orientation details.
              </p>
              <Button variant="charcoal" size="sm" onClick={() => setVolunteerSubmitted(false)}>
                Register Another Volunteer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
