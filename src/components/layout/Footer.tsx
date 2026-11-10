import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { BRAND } from '../../config/brand';
import { PhoneCall, Shield, Heart, ExternalLink, ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-midnight border-t border-charcoal-light text-ivory/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-charcoal-light">
          {/* Col 1 & 2: Brand & Campaign Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-ivory/70 leading-relaxed max-w-sm pt-2">
              {BRAND.promise}
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded bg-charcoal text-gold text-xs font-semibold tracking-wider border border-gold/20">
                {BRAND.slogan}
              </span>
            </div>
            <p className="text-xs text-ivory/50 leading-relaxed font-sans pt-1">
              {BRAND.secondarySlogan}
            </p>
            <div className="text-xs text-ivory/60 pt-2">
              <p className="font-semibold text-ivory/90">{BRAND.orgName}</p>
              <p>{BRAND.parentOrg} • {BRAND.district}</p>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4 font-sans">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-gold transition-colors">
                  {t('nav.learn')}
                </Link>
              </li>
              <li>
                <Link to="/get-help" className="hover:text-gold transition-colors">
                  {t('nav.getHelp')}
                </Link>
              </li>
              <li>
                <Link to="/support-directory" className="hover:text-gold transition-colors">
                  {t('nav.findSupport')}
                </Link>
              </li>
              <li>
                <Link to="/awareness-hub" className="hover:text-gold transition-colors">
                  {t('nav.awarenessHub')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Data */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4 font-sans">
              Community & Action
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/campaigns" className="hover:text-gold transition-colors">
                  {t('nav.campaigns')}
                </Link>
              </li>
              <li>
                <Link to="/statistics" className="hover:text-gold transition-colors">
                  {t('nav.statistics')}
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-gold transition-colors flex items-center gap-1.5 text-champagne">
                  <Heart className="w-3.5 h-3.5 text-gold" />
                  <span>{t('nav.donate')}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-gold transition-colors flex items-center gap-1.5 text-ivory/60">
                  <Shield className="w-3.5 h-3.5 text-gold/60" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Sri Lankan Emergency Helplines */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400 mb-4 font-sans flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4" />
              <span>National Hotlines</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-charcoal border border-charcoal-light">
                <div className="font-bold text-gold flex items-center justify-between">
                  <span>NDDCB Drug Helpline</span>
                  <a href="tel:1927" className="text-sm underline font-mono text-champagne">1927</a>
                </div>
                <div className="text-[11px] text-ivory/60">Toll-free 24/7 counseling & info</div>
              </div>

              <div className="p-2.5 rounded-lg bg-charcoal border border-charcoal-light">
                <div className="font-bold text-red-400 flex items-center justify-between">
                  <span>Suwaseriya Ambulance</span>
                  <a href="tel:1990" className="text-sm underline font-mono text-white">1990</a>
                </div>
                <div className="text-[11px] text-ivory/60">Overdose & medical emergency</div>
              </div>

              <div className="p-2.5 rounded-lg bg-charcoal border border-charcoal-light">
                <div className="font-bold text-gold flex items-center justify-between">
                  <span>CCC Emotional Support</span>
                  <a href="tel:1333" className="text-sm underline font-mono text-champagne">1333</a>
                </div>
                <div className="text-[11px] text-ivory/60">Crisis & suicide prevention line</div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical & Legal Disclaimer */}
        <div className="py-6 border-b border-charcoal-light text-xs text-ivory/50 leading-relaxed">
          <p className="font-semibold text-ivory/70 mb-1">
            Clinical Governance & Legal Disclaimer:
          </p>
          <p>
            BEYOND THE DARKNESS – අඳුරෙන් එළියට is an educational, awareness, and support navigational digital platform organized by the Leo Club of University of Sri Jayewardenepura. The platform and its AI Assistant do not provide medical diagnosis, clinical treatment plans, pharmaceutical prescriptions, or emergency dispatch services. Always consult certified healthcare professionals or hospital psychiatry units for clinical concerns. If you or someone you know is in immediate life-threatening physical danger, contact emergency medical services (1990) or the police (119) immediately.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>
            &copy; {new Date().getFullYear()} Beyond the Darkness. Organized by Leo Club of University of Sri Jayewardenepura (Leo District 306 D2).
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gold/80 font-sinhalaSerif">අඳුරෙන් එළියට - නව හෙට දිනක් කරා</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-charcoal hover:bg-gold/20 text-ivory hover:text-gold transition-colors flex items-center gap-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
