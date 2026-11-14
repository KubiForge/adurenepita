import React, { useState } from 'react';
import {
  Heart,
  Users,
  Megaphone,
  BookOpen,
  School,
  HandHeart,
  Send,
  CheckCircle,
  Shield,
  Mic,
  ArrowRight,
} from 'lucide-react';
import { ASSETS } from '../config/assets';

export const CommunityPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [storyFormSubmitted, setStoryFormSubmitted] = useState(false);

  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    interest: 'School Outreach Programs',
    message: '',
  });

  const [storyForm, setStoryForm] = useState({
    title: '',
    pseudonym: 'Anonymous Friend',
    substanceExperience: 'Alcohol',
    story: '',
    consentPublish: false,
  });

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

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.consentPublish) {
      alert('Please confirm your consent for publishing an anonymous moderated story.');
      return;
    }
    setStoryFormSubmitted(true);
  };

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
              Share Your Story (Anonymous)
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Give hope to others through your lived experience. Every recovery journey shared helps break the stigma surrounding addiction in Sri Lanka.
            </p>
          </div>
          <a
            href="#story-section"
            className="mt-6 text-xs font-bold text-purple-400 flex items-center gap-1.5 hover:text-purple-300 transition-colors"
          >
            <span>Share Anonymously</span>
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

      {/* Story Submission Form (Anonymous & Moderated) */}
      <div id="story-section" className="charcoal-card p-6 sm:p-10 border-gold/40 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider border border-gold/30">
            <Mic className="w-3.5 h-3.5" />
            <span>Inspire Hope Anonymously</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ivory">
            Share Your Recovery Story
          </h2>
          <p className="text-xs text-ivory/70 max-w-lg mx-auto leading-relaxed">
            Your lived experience can help a young person in Sri Lanka realize that recovery is possible. Submissions are reviewed by our team before publication to safeguard identities.
          </p>
        </div>

        {storyFormSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-ivory">Thank You for Your Bravery</h3>
            <p className="text-xs text-emerald-300 max-w-md mx-auto">
              Your anonymous story has been safely submitted for moderation. Your vulnerability will help save lives.
            </p>
          </div>
        ) : (
          <form onSubmit={handleStorySubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ivory/80 mb-1">
                  Story Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Finding the Light After Five Years of Darkness"
                  value={storyForm.title}
                  onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ivory/80 mb-1">
                  Pseudonym (Keeps you anonymous)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Recovering Student from Kandy"
                  value={storyForm.pseudonym}
                  onChange={(e) => setStoryForm({ ...storyForm, pseudonym: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ivory/80 mb-1">
                Your Story & Message of Hope
              </label>
              <textarea
                rows={5}
                placeholder="Share your experience: What helped you take the first step towards recovery? What would you tell someone struggling right now?"
                value={storyForm.story}
                onChange={(e) => setStoryForm({ ...storyForm, story: e.target.value })}
                required
                className="w-full p-3.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold leading-relaxed"
              />
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={storyForm.consentPublish}
                onChange={(e) => setStoryForm({ ...storyForm, consentPublish: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-charcoal-light text-gold focus:ring-gold bg-midnight"
              />
              <span className="text-xs text-ivory/70 leading-relaxed">
                I confirm that this story is my own personal experience and I consent to it being published anonymously to inspire others.
              </span>
            </label>

            <button
              type="submit"
              className="btn-gold w-full py-3 rounded-xl font-bold shadow-gold-subtle flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-midnight" />
              <span className="text-midnight">Submit Anonymous Story</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
