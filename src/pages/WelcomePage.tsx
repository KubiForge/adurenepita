import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, UserPlus, AlertTriangle, Shield, Eye, Lock } from 'lucide-react';
import { ASSETS } from '../config/assets';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: ArrowRight,
      title: 'Continue as Guest',
      desc: 'Browse educational resources, search for support services, and explore awareness campaigns — anonymous & quick, no registration needed.',
      action: () => navigate('/learn'),
      style: {
        border: '1.5px solid rgba(216,190,130,0.3)',
        background: 'rgba(36,36,38,0.9)',
      },
      iconBg: 'rgba(216,190,130,0.12)',
      iconColor: '#D8BE82',
      badgeText: 'Anonymous',
      badgeColor: 'rgba(216,190,130,0.15)',
      badgeTextColor: '#D8BE82',
    },
    {
      icon: UserPlus,
      title: 'Create an Account',
      desc: 'Save your progress, get personalised resources, bookmark rehabilitation services, and track your recovery journey in a secure private space.',
      action: () => navigate('/profile'),
      style: {
        border: '1.5px solid rgba(216,190,130,0.5)',
        background: 'linear-gradient(135deg, rgba(216,190,130,0.08), rgba(36,36,38,0.95))',
      },
      iconBg: 'rgba(216,190,130,0.15)',
      iconColor: '#D8BE82',
      badgeText: 'Recommended',
      badgeColor: 'rgba(216,190,130,0.2)',
      badgeTextColor: '#D8BE82',
    },
    {
      icon: AlertTriangle,
      title: 'I Need Immediate Help',
      desc: 'If you or someone you know is in crisis or experiencing an acute medical emergency right now, view verified urgent support options immediately.',
      action: () => {
        window.location.href = 'tel:1927';
      },
      style: {
        border: '1.5px solid rgba(220,50,50,0.4)',
        background: 'rgba(40,16,16,0.95)',
      },
      iconBg: 'rgba(220,50,50,0.15)',
      iconColor: '#f87171',
      badgeText: 'Emergency',
      badgeColor: 'rgba(220,50,50,0.15)',
      badgeTextColor: '#f87171',
    },
  ];

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background with Hero Doorway */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center opacity-40 pointer-events-none"
        style={{ backgroundImage: `url(${ASSETS.heroBg})` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-midnight/90 via-midnight/95 to-midnight pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl space-y-10">
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="text-xs text-ivory/60 hover:text-gold flex items-center gap-1.5 transition-colors font-semibold"
          >
            ← Back to Homepage
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Confidential & Secure Entry</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-ivory">
            Welcome to <span className="text-gold">BEYOND THE DARKNESS</span>
          </h1>
          <p className="text-sm sm:text-base text-ivory/70 max-w-xl mx-auto">
            A safe, non-judgmental space for drug prevention, education, recovery support, and hope. How would you like to continue?
          </p>
        </div>

        {/* 3 Entry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                onClick={card.action}
                style={card.style}
                className="p-6 rounded-2xl text-left transition-all hover:-translate-y-1 hover:shadow-gold-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      style={{ background: card.iconBg }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <Icon className="w-6 h-6" style={{ color: card.iconColor }} />
                    </div>
                    <span
                      style={{ background: card.badgeColor, color: card.badgeTextColor }}
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    >
                      {card.badgeText}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-ivory mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-ivory/70 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-charcoal-light flex items-center justify-between text-xs font-semibold text-gold">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Privacy Assurance Banner */}
        <div className="charcoal-card p-6 border-gold/20 space-y-3">
          <h4 className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-gold" />
            <span>Our Confidentiality Guarantee</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-ivory/70">
            <div className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span>Browsing is completely anonymous. We never track your personal identity.</span>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span>All communications are protected under strict medical privacy standards.</span>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span>No user data is ever sold or exposed to external commercial platforms.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
