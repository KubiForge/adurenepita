import React from 'react';
import { BRAND } from '../config/brand';
import { ASSETS } from '../config/assets';
import { Shield, Heart, Award, CheckCircle2, ExternalLink } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal border border-gold/30 text-xs font-bold text-gold">
          <Award className="w-4 h-4" />
          <span>Leo Club of University of Sri Jayewardenepura</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-ivory">
          About Beyond the Darkness
          <span className="block font-sinhalaSerif text-gold text-2xl sm:text-3xl mt-2 font-semibold">
            අඳුරෙන් එළියට - අපගේ මෙහෙවර
          </span>
        </h1>
        <p className="text-base text-ivory/80 leading-relaxed font-sans">
          A youth-led, evidence-informed digital initiative dedicated to substance prevention, compassionate support navigation, and bridging individuals to accredited healthcare in Sri Lanka.
        </p>
      </div>

      {/* Organizational Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            The Organizing Body
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ivory">
            Leo Club of University of Sri Jayewardenepura
          </h2>
          <p className="text-xs text-gold/80 font-sinhalaSerif">
            ලියෝ දිස්ත්‍රික් 306 D2 • Lions International
          </p>
          <p className="text-sm text-ivory/80 leading-relaxed">
            The Leo Club of University of Sri Jayewardenepura operates under Lions International (Leo District 306 D2) as one of Sri Lanka’s most active university-based youth humanitarian organizations. Comprising undergraduate leaders across multiple academic faculties—including Medical Sciences, Applied Sciences, Humanities, Management, and Technology—the club leads impactful community service initiatives across the island.
          </p>
          <p className="text-sm text-ivory/80 leading-relaxed">
            Recognizing the alarming spread of illicit synthetic substances among youth and university communities, the club initiated <strong>"Beyond the Darkness – අඳුරෙන් එළියට"</strong> to dismantle stigma and replace fear with verified science, confidential technology, and clinical connection.
          </p>
        </div>

        <div className="charcoal-card p-8 border-gold/30 space-y-6">
          <h3 className="font-heading font-bold text-xl text-champagne">
            Official Campaign Message
          </h3>
          <div className="p-4 rounded-xl bg-midnight border border-gold/30 text-center">
            <span className="text-lg font-bold text-gold tracking-wider">
              {BRAND.slogan}
            </span>
          </div>
          <div className="text-xs text-ivory/70 leading-relaxed space-y-2">
            <p>
              <strong>PREVENT:</strong> Eradicating drug experimentation through youth peer mentorship and factual pharmacology.
            </p>
            <p>
              <strong>SUPPORT:</strong> Providing dignified, completely anonymous AI assistance and guided navigation.
            </p>
            <p>
              <strong>CONNECT:</strong> Directing users safely to verified Sri Lankan healthcare professionals and hospitals.
            </p>
          </div>
        </div>
      </div>

      {/* Ethical Governance & Reference Transparency */}
      <div className="p-8 rounded-2xl bg-charcoal border border-charcoal-light space-y-4">
        <h3 className="font-heading font-bold text-xl text-ivory flex items-center gap-2">
          <Shield className="w-5 h-5 text-gold" />
          <span>Ethical Governance & Reference Independence</span>
        </h3>
        <p className="text-xs text-ivory/70 leading-relaxed">
          In designing this platform, the project team studied leading global and Sri Lankan digital health platforms, including Shatterproof, Partnership to End Addiction (drugfree.org), SAMHSA, NDDCB Sri Lanka, and ADIC Sri Lanka. These references served purely as inspiration for empathetic navigation and data storytelling.
        </p>
        <p className="text-xs text-ivory/70 leading-relaxed">
          <strong>Important Disclosure:</strong> Mention of these organizations does not imply formal endorsement, legal partnership, or commercial affiliation unless an explicit bilateral agreement is formalized. All local service details and phone lines (such as NDDCB 1927) are independently verified before publication.
        </p>
      </div>
    </div>
  );
};
