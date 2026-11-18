import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ExternalLink, Heart, Mail, MapPin, PhoneCall, Shield, WifiOff } from 'lucide-react';
import { BRAND } from '../../config/brand';
import { ASSETS } from '../../config/assets';
import { CONTACT_INFO, telephoneHref } from '../../config/contactInfo';
import { ORGANIZATION_LOGOS } from '../../data/organizationLogos';
import { useLanguage } from '../../context/LanguageContext';
import { LogoPlaceholder } from '../common/LogoPlaceholder';

const KUBI_FORGE_URL = 'https://kubiforge.vercel.app';

const footerLinkClass =
  'inline-flex text-sm text-ivory/60 transition duration-200 hover:translate-x-0.5 hover:text-champagne';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer-shell relative overflow-hidden border-t border-gold/15 bg-midnight text-ivory/80">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,190,130,0.08),transparent_68%)]"
      />
      <div className="footer-inner relative mx-auto max-w-7xl px-4 pb-5 pt-7 sm:px-6 lg:px-8 lg:pt-8">
        <section aria-labelledby="footer-showcase-title" className="footer-showcase border-b border-ivory/10 pb-6">
          <div className="footer-showcase__heading mb-4 text-center">
            <span className="footer-showcase__mark" aria-hidden="true">
              <Heart className="h-5 w-5 fill-current" />
            </span>
            <h2 id="footer-showcase-title" className="mt-1 font-heading text-xl font-semibold text-ivory sm:text-2xl">
              Together for a Brighter Tomorrow
            </h2>
            <p className="mt-1 text-[10px] text-ivory/50 sm:text-xs">
              A shared commitment to prevention, support, and recovery.
            </p>
          </div>
          <div className="footer-logo-grid grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {ORGANIZATION_LOGOS.map((item) => (
              <LogoPlaceholder
                key={item.label}
                label={item.label}
                category={item.category}
                src={item.src}
                showcase
                className="footer-logo-item rounded-lg border-gold/20 bg-charcoal/35 hover:bg-charcoal/60"
              />
            ))}
          </div>
        </section>

        <section
          aria-label="Footer navigation and support"
          className="footer-main-grid grid grid-cols-1 gap-6 border-b border-ivory/10 py-6 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.95fr_1.25fr] lg:gap-7"
        >
          <div className="footer-column">
            <h2 className="footer-column__title mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Project Identity</h2>
            <div className="footer-project-lockup flex items-center gap-3">
              <LogoPlaceholder
                label="Beyond the Darkness"
                category="Project identity"
                src={ASSETS.logo}
                compact
                className="footer-project-logo w-14 shrink-0 rounded-lg border-gold/25 bg-charcoal/60"
              />
              <div>
                <p className="font-heading text-base font-semibold leading-tight tracking-wide text-ivory">
                  BEYOND THE DARKNESS
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-ivory/45">A Youth-Led Initiative</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-xs leading-5 text-ivory/60">
              A youth-led, evidence-informed digital initiative for substance prevention, compassionate support navigation, and access to healthcare in Sri Lanka.
            </p>
            <span className="mt-3 inline-flex rounded-full border border-gold/20 bg-charcoal/70 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-gold">
              {BRAND.slogan}
            </span>
          </div>

          <div className="footer-column">
            <h2 className="footer-column__title mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{t('footer.navigation')}</h2>
            <ul className="footer-link-list space-y-2">
              <li><Link to="/" className={footerLinkClass}>{t('nav.home')}</Link></li>
              <li><Link to="/about" className={footerLinkClass}>{t('nav.about')}</Link></li>
              <li><Link to="/learn" className={footerLinkClass}>{t('nav.learn')}</Link></li>
              <li><Link to="/get-help" className={footerLinkClass}>{t('nav.getHelp')}</Link></li>
              <li><Link to="/support-directory" className={footerLinkClass}>{t('nav.findSupport')}</Link></li>
              <li><Link to="/network" className={footerLinkClass}>{t('nav.network')}</Link></li>
              <li><Link to="/awareness-hub" className={footerLinkClass}>{t('nav.awarenessHub')}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h2 className="footer-column__title mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{t('footer.communityAction')}</h2>
            <ul className="footer-link-list space-y-2">
              <li><Link to="/campaigns" className={footerLinkClass}>{t('nav.campaigns')}</Link></li>
              <li><Link to="/community" className={footerLinkClass}>{t('nav.community')}</Link></li>
              <li><Link to="/statistics" className={footerLinkClass}>{t('nav.statistics')}</Link></li>
              <li>
                <Link to="/donate" className={`${footerLinkClass} items-center gap-2 text-champagne`}>
                  <Heart className="h-3.5 w-3.5 text-gold" /> {t('nav.donate')}
                </Link>
              </li>
              <li>
                <Link to="/admin" className={`${footerLinkClass} items-center gap-2`}>
                  <Shield className="h-3.5 w-3.5 text-gold/70" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column footer-emergency-column">
            <h2 className="footer-column__title mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-300">
              <PhoneCall className="h-3.5 w-3.5" /> {t('footer.emergencyHelplines')}
            </h2>
            <ul className="footer-emergency-list grid grid-cols-2 gap-2">
              {[
                CONTACT_INFO.emergency.drugHelpline,
                CONTACT_INFO.emergency.ambulance,
                CONTACT_INFO.emergency.crisisSupport,
                CONTACT_INFO.emergency.police,
              ].map((contact) => (
                <li key={contact.id} className="footer-emergency-item rounded-lg border border-ivory/10 bg-charcoal/45 px-2.5 py-2 transition hover:border-gold/25 hover:bg-charcoal/70">
                  <a className="flex items-center justify-between gap-2" href={telephoneHref(contact.number)}>
                    <span className="text-[10px] leading-4 text-ivory/70">{contact.footerLabel}</span>
                    <span className={`font-mono text-sm font-bold ${contact.id === 'ambulance' || contact.id === 'police' ? 'text-red-300' : 'text-champagne'}`}>
                      {contact.number}
                    </span>
                  </a>
                  <p className="mt-0.5 text-[9px] text-ivory/40">{contact.footerDescription}</p>
                </li>
              ))}
            </ul>
            <a
              href="/offline-emergency.html"
              className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-300/30 px-3 py-2 text-xs font-semibold text-red-100 hover:bg-red-950/50"
            >
              <WifiOff className="h-4 w-4" aria-hidden="true" />
              {t('emergency.offline')}
            </a>
          </div>
        </section>

        <section
          aria-label="Organization headquarters"
          className="footer-org-info flex flex-col gap-3 border-b border-ivory/10 py-4 text-xs md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-ivory/55">
            <span className="font-semibold text-ivory/80">{BRAND.orgName}</span>
            <span className="hidden text-gold/50 sm:inline">•</span>
            <span>{BRAND.parentOrg} • {BRAND.district}</span>
            <span className="hidden text-gold/50 sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-gold/75" />{CONTACT_INFO.project.address}</span>
          </div>
          <a
            href={`mailto:${CONTACT_INFO.project.email}`}
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-champagne transition hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" /> Contact Project Team
          </a>
        </section>

        <section aria-labelledby="footer-disclaimer-title" className="footer-disclaimer border-b border-ivory/10 py-4">
          <h2 id="footer-disclaimer-title" className="text-[10px] font-bold uppercase tracking-[0.18em] text-ivory/65">
            Clinical Governance & Legal Disclaimer
          </h2>
          <p className="mt-1.5 text-[11px] leading-5 text-ivory/45">
            BEYOND THE DARKNESS is an educational, awareness, and support navigational digital platform organized by the Leo Club of University of Sri Jayewardenepura. The platform and its AI Assistant do not provide medical diagnosis, clinical treatment plans, pharmaceutical prescriptions, or emergency dispatch services. Always consult certified healthcare professionals or hospital psychiatry units for clinical concerns. If you or someone you know is in immediate life-threatening physical danger, contact emergency medical services ({CONTACT_INFO.emergency.ambulance.number}) or the police ({CONTACT_INFO.emergency.police.number}) immediately.
          </p>
        </section>

        <div className="footer-bottom grid grid-cols-1 gap-3 pt-4 text-[10px] text-ivory/45 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p className="leading-5">
            &copy; {new Date().getFullYear()} Beyond the Darkness. Organized by Leo Club of University of Sri Jayewardenepura (Leo District 306 D2).
          </p>
          <nav aria-label="Legal and contact links" className="flex flex-wrap items-center gap-x-3 gap-y-1 md:justify-center">
            <Link to="/privacy" className="transition hover:text-champagne">Privacy Policy</Link>
            <span aria-hidden="true" className="text-gold/40">|</span>
            <Link to="/terms" className="transition hover:text-champagne">Terms of Use</Link>
            <span aria-hidden="true" className="text-gold/40">|</span>
            <Link to="/legal-policy" className="transition hover:text-champagne">Legal & Rights</Link>
          </nav>
          <div className="flex items-center justify-between gap-4 md:justify-end">
            <p>
              Designed &amp; Developed with care by{' '}
              <a href={KUBI_FORGE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-champagne transition hover:text-white">
                Kubi Forge <ExternalLink className="ml-0.5 inline h-3 w-3" />
              </a>
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-ivory/10 bg-charcoal/60 px-2.5 py-1.5 transition hover:border-gold/35 hover:text-champagne"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3 w-3" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
