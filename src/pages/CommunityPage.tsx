import React from 'react';
import {
  Heart,
  Users,
  Megaphone,
  BookOpen,
  School,
  HandHeart,
  Shield,
  Mic,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';
import { CONTACT_INFO, telephoneHref } from '../config/contactInfo';

export const CommunityPage: React.FC = () => {
  const volunteerOpportunities = [
    {
      icon: School,
      title: 'School Outreach Programs',
      description: 'Join our teams visiting schools across Sri Lanka to deliver age-appropriate drug prevention education.',
      commitment: '4–8 hrs/month',
      locations: 'Western, Central, Southern Provinces',
    },
    {
      icon: Megaphone,
      title: 'Community Awareness Events',
      description: 'Help organize and facilitate public awareness campaigns, workshops, and community gatherings.',
      commitment: '1–2 events/month',
      locations: 'Island-wide',
    },
    {
      icon: HandHeart,
      title: 'Peer Support Facilitation',
      description: 'Trained volunteers who have personal experience with recovery journey supporting others through facilitated discussions.',
      commitment: '2–4 hrs/week',
      locations: 'Colombo, Kandy, Galle',
    },
    {
      icon: BookOpen,
      title: 'English Educational Content & Media',
      description: 'Help create clear and accessible English-language educational resources for the community.',
      commitment: 'Flexible, remote',
      locations: 'Remote / Online',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          United for Recovery & Prevention
        </span>
        <h1 className="text-4xl font-bold font-heading text-ivory">
          Join the Community
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          Be part of a compassionate network of youth leaders, recovering individuals, family advocates, and mental health champions across Sri Lanka.
        </p>
      </div>

      {/* 3 Main Action Cards (Screen 06 reference) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="charcoal-card p-6 border-gold/40 flex flex-col justify-between charcoal-card-hover">
          <div>
            <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-ivory mb-2">
              Volunteer with Us
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Support awareness campaigns, school caravans, and community outreach activities organized by the Leo Club of University of Sri Jayewardenepura.
            </p>
          </div>
          <a
            href="#volunteer-section"
            className="mt-6 text-xs font-bold text-gold flex items-center gap-1.5 hover:text-champagne transition-colors"
          >
            <span>Explore Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="charcoal-card p-6 border-purple-500/40 flex flex-col justify-between charcoal-card-hover">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-ivory mb-2">
              Recovery Stories & Consent
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Learn how lived experience should be shared voluntarily and safely. Story submissions are not currently open.
            </p>
          </div>
          <a
            href="#story-section"
            className="mt-6 text-xs font-bold text-purple-400 flex items-center gap-1.5 hover:text-purple-300 transition-colors"
          >
            <span>Read our story-sharing policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="charcoal-card p-6 border-teal-500/40 flex flex-col justify-between charcoal-card-hover">
          <div>
            <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-ivory mb-2">
              Join a Campaign
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Participate in upcoming campus drives, high school workshops, and public marches advocating for evidence-based drug policies.
            </p>
          </div>
          <a
            href="/campaigns"
            className="mt-6 text-xs font-bold text-teal-400 flex items-center gap-1.5 hover:text-teal-300 transition-colors"
          >
            <span>View Upcoming Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <section id="support-groups" className="space-y-6" aria-labelledby="support-groups-heading">
        <div className="border-b border-charcoal-light pb-3">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            Peer & Family Support
          </span>
          <h2 id="support-groups-heading" className="text-2xl font-bold font-heading text-ivory">
            Explore recovery support options
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ivory/65">
            The right support is personal. These approaches are options to discuss with a qualified
            provider; local availability and suitability vary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="charcoal-card p-6 border-charcoal-light">
            <Users className="w-6 h-6 text-gold mb-3" aria-hidden="true" />
            <h3 className="font-heading font-bold text-lg text-ivory">Peer support</h3>
            <p className="mt-2 text-sm leading-relaxed text-ivory/65">
              Peer groups can offer shared experience and connection alongside professional care.
              Ask about the facilitator, privacy expectations, and moderation before joining.
            </p>
          </article>
          <article className="charcoal-card p-6 border-charcoal-light">
            <Heart className="w-6 h-6 text-purple-300 mb-3" aria-hidden="true" />
            <h3 className="font-heading font-bold text-lg text-ivory">Family support</h3>
            <p className="mt-2 text-sm leading-relaxed text-ivory/65">
              Families and carers can seek separate guidance, practical coping support, and help
              setting healthy boundaries without blame or pressure.
            </p>
          </article>
        </div>

        <div className="charcoal-card p-6 sm:p-8 border-charcoal-light">
          <h3 className="font-heading font-bold text-lg text-ivory">Different recovery approaches</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ['12-step fellowships', 'Peer-led, structured mutual-help programs.'],
              ['SMART Recovery', 'A skills-based, secular mutual-help approach.'],
              ['Faith-based support', 'Spiritual or faith communities, when chosen by the person.'],
              ['Secular support', 'Peer support without a religious or spiritual framework.'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-xl border border-ivory/10 bg-midnight/60 p-4">
                <h4 className="text-sm font-bold text-ivory">{title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-ivory/60">{description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ivory/55">
            These are not endorsements or a claim that a particular group is available locally.
            Support groups do not replace medical care. For current Sri Lankan referrals, contact
            the NDDCB helpline or search the support directory.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={telephoneHref(CONTACT_INFO.emergency.drugHelpline.number)}
              className="btn-gold inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold"
            >
              <PhoneCall className="h-4 w-4" />
              Call NDDCB {CONTACT_INFO.emergency.drugHelpline.number}
            </a>
            <a
              href="/support-directory"
              className="btn-charcoal inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-champagne"
            >
              Find support services
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <aside className="rounded-2xl border border-gold/20 bg-gold/5 p-6" aria-labelledby="community-rules-heading">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <h3 id="community-rules-heading" className="font-heading font-bold text-lg text-ivory">
                No shaming. No judgment.
              </h3>
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-ivory/70 sm:grid-cols-2">
                <li>Use respectful, non-stigmatizing language; no harassment or discrimination.</li>
                <li>Protect privacy: never share another person’s identity, story, or health details.</li>
                <li>Share personal experience, not diagnoses, treatment instructions, or promises.</li>
                <li>Ask for consent before sharing or discussing anyone else’s recovery journey.</li>
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-ivory/55">
                This website does not currently host a live peer forum or moderated group. Do not
                post crisis details here; use the emergency and crisis contacts instead. Moderation
                and reporting controls must be in place before any online group is launched.
              </p>
            </div>
          </div>
        </aside>
      </section>

      {/* Volunteer Opportunities Grid */}
      <div id="volunteer-section" className="space-y-6 pt-6">
        <div className="border-b border-charcoal-light pb-3">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            Roles & Impact
          </span>
          <h2 className="text-2xl font-bold font-heading text-ivory">
            Available Volunteer Roles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {volunteerOpportunities.map((opp, idx) => {
            const Icon = opp.icon;
            return (
              <div key={idx} className="charcoal-card p-6 border-charcoal-light flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-base text-ivory">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-ivory/70 leading-relaxed">
                    {opp.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-[11px] text-gold/80 font-mono pt-1">
                    <span>⏱ {opp.commitment}</span>
                    <span>📍 {opp.locations}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div id="story-section" className="charcoal-card p-6 sm:p-10 border-gold/40 max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider border border-gold/30">
          <Mic className="w-3.5 h-3.5" />
          <span>Recovery stories & consent</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ivory">
          Lived experience, shared with care
        </h2>
        <p className="text-sm text-ivory/70 leading-relaxed">
          No recovery stories are currently published or accepted through this page. We will not
          invent testimonials or publish a story without the author’s informed, voluntary consent
          and an identity-safety review.
        </p>
        <ul className="space-y-2 text-sm leading-relaxed text-ivory/65">
          <li>• A future submission process should explain where a story appears and who can see it.</li>
          <li>• Consent must be specific and revocable before publication, without affecting access to care.</li>
          <li>• Submissions must be checked for identifying details and never include another person’s story without permission.</li>
        </ul>
        <p className="text-xs text-ivory/50">
          Please do not email personal health details or a story to request information about the process.
        </p>
        <a
          href={`mailto:${CONTACT_INFO.project.email}?subject=Recovery%20story%20process%20question`}
          className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:text-champagne"
        >
          Ask about the future story-submission process
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
