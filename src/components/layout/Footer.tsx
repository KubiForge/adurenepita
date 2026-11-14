import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ExternalLink, Heart, Mail, MapPin, PhoneCall, Shield } from 'lucide-react';
import { BRAND } from '../../config/brand';
import { ASSETS } from '../../config/assets';
import { ORGANIZATION_LOGOS } from '../../data/organizationLogos';
import { LogoPlaceholder } from '../common/LogoPlaceholder';

const KUBI_FORGE_URL = 'https://kubiforge.vercel.app';

const footerLinkClass =
  'inline-flex text-sm text-ivory/60 transition duration-200 hover:translate-x-0.5 hover:text-champagne';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-midnight text-ivory/80">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,190,130,0.08),transparent_68%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <section aria-labelledby="footer-showcase-title" className="border-b border-ivory/10 pb-7">
          <div className="mb-5 text-center">
            <h2 id="footer-showcase-title" className="font-heading text-2xl font-semibold text-ivory sm:text-3xl">
              Together for a Brighter Tomorrow
            </h2>
            <p className="mt-1.5 text-xs text-ivory/50">
              Organization and Leo identity marks supplied for this initiative.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {ORGANIZATION_LOGOS.map((item) => (
              <LogoPlaceholder
                key={item.label}
                label={item.label}
                category={item.category}
                src={item.src}
                showcase
                className="rounded-xl border-gold/20 bg-charcoal/35 hover:bg-charcoal/60"
              />
            ))}
          </div>
        </section>

        <section
          aria-label="Footer navigation and support"
          className="grid grid-cols-1 gap-7 border-b border-ivory/10 py-7 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          <div>
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Project Identity</h2>
            <div className="flex items-center gap-3">
              <LogoPlaceholder
                label="Beyond the Darkness"
                category="Project identity"
                src={ASSETS.logo}
                compact
                className="w-16 shrink-0 rounded-xl border-gold/25 bg-charcoal/60"
              />
              <div>
                <p className="font-heading text-lg font-semibold leading-tight tracking-wide text-ivory">
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

          <div>
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Navigation</h2>
            <ul className="space-y-2.5">
              <li><Link to="/" className={footerLinkClass}>Home</Link></li>
              <li><Link to="/about" className={footerLinkClass}>About Us</Link></li>
              <li><Link to="/learn" className={footerLinkClass}>Drug Education</Link></li>
              <li><Link to="/get-help" className={footerLinkClass}>Get Help</Link></li>
              <li><Link to="/support-directory" className={footerLinkClass}>Find Support</Link></li>
              <li><Link to="/awareness-hub" className={footerLinkClass}>Awareness Hub</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Community & Action</h2>
            <ul className="space-y-2.5">
              <li><Link to="/campaigns" className={footerLinkClass}>Campaigns</Link></li>
              <li><Link to="/community" className={footerLinkClass}>Community</Link></li>
              <li><Link to="/statistics" className={footerLinkClass}>Data & Impact</Link></li>
              <li>
                <Link to="/donate" className={`${footerLinkClass} items-center gap-2 text-champagne`}>
                  <Heart className="h-3.5 w-3.5 text-gold" /> Donate
                </Link>
              </li>
              <li>
                <Link to="/admin" className={`${footerLinkClass} items-center gap-2`}>
                  <Shield className="h-3.5 w-3.5 text-gold/70" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-300">
              <PhoneCall className="h-3.5 w-3.5" /> Emergency Helplines
            </h2>
            <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              <li className="rounded-xl border border-ivory/10 bg-charcoal/45 px-3 py-2 transition hover:border-gold/25 hover:bg-charcoal/70">
                <a className="flex items-center justify-between gap-2" href="tel:1927">
                  <span className="text-[10px] leading-4 text-ivory/70">NDDCB Drug Helpline</span>
                  <span className="font-mono text-sm font-bold text-champagne">1927</span>
                </a>
                <p className="mt-0.5 text-[9px] text-ivory/40">Toll-free 24/7 counseling & info</p>
              </li>
              <li className="rounded-xl border border-ivory/10 bg-charcoal/45 px-3 py-2 transition hover:border-gold/25 hover:bg-charcoal/70">
                <a className="flex items-center justify-between gap-2" href="tel:1990">
                  <span className="text-[10px] leading-4 text-ivory/70">Suwaseriya Ambulance</span>
                  <span className="font-mono text-sm font-bold text-red-300">1990</span>
                </a>
                <p className="mt-0.5 text-[9px] text-ivory/40">Medical emergencies</p>
              </li>
              <li className="rounded-xl border border-ivory/10 bg-charcoal/45 px-3 py-2 transition hover:border-gold/25 hover:bg-charcoal/70">
                <a className="flex items-center justify-between gap-2" href="tel:1333">
                  <span className="text-[10px] leading-4 text-ivory/70">CCC Emotional Support</span>
                  <span className="font-mono text-sm font-bold text-champagne">1333</span>
                </a>
                <p className="mt-0.5 text-[9px] text-ivory/40">Crisis and emotional support</p>
              </li>
              <li className="rounded-xl border border-ivory/10 bg-charcoal/45 px-3 py-2 transition hover:border-gold/25 hover:bg-charcoal/70">
                <a className="flex items-center justify-between gap-2" href="tel:119">
                  <span className="text-[10px] leading-4 text-ivory/70">Police Emergency</span>
                  <span className="font-mono text-sm font-bold text-red-300">119</span>
                </a>
                <p className="mt-0.5 text-[9px] text-ivory/40">Immediate police assistance</p>
              </li>
            </ul>
          </div>
        </section>

        <section
          aria-label="Organization headquarters"
          className="flex flex-col gap-3 border-b border-ivory/10 py-5 text-xs md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-ivory/55">
            <span className="font-semibold text-ivory/80">{BRAND.orgName}</span>
            <span className="hidden text-gold/50 sm:inline">•</span>
            <span>{BRAND.parentOrg} • {BRAND.district}</span>
            <span className="hidden text-gold/50 sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-gold/75" />Gangodawila, Nugegoda, Sri Lanka</span>
          </div>
          <a
            href="mailto:contact@leousj.org"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-champagne transition hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" /> Contact Project Team
          </a>
        </section>

        <section aria-labelledby="footer-disclaimer-title" className="border-b border-ivory/10 py-5">
          <h2 id="footer-disclaimer-title" className="text-[10px] font-bold uppercase tracking-[0.18em] text-ivory/65">
            Clinical Governance & Legal Disclaimer
          </h2>
          <p className="mt-1.5 text-[11px] leading-5 text-ivory/45">
            BEYOND THE DARKNESS is an educational, awareness, and support navigational digital platform organized by the Leo Club of University of Sri Jayewardenepura. The platform and its AI Assistant do not provide medical diagnosis, clinical treatment plans, pharmaceutical prescriptions, or emergency dispatch services. Always consult certified healthcare professionals or hospital psychiatry units for clinical concerns. If you or someone you know is in immediate life-threatening physical danger, contact emergency medical services (1990) or the police (119) immediately.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-3 pt-4 text-[10px] text-ivory/45 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p className="leading-5">
            &copy; {new Date().getFullYear()} Beyond the Darkness. Organized by Leo Club of University of Sri Jayewardenepura (Leo District 306 D2).
          </p>
          <nav aria-label="Legal and contact links" className="flex flex-wrap items-center gap-x-3 gap-y-1 md:justify-center">
            <a href="mailto:contact@leousj.org?subject=Privacy%20Policy%20Request" title="Request the privacy policy by email" className="transition hover:text-champagne">Privacy Policy</a>
            <span aria-hidden="true" className="text-gold/40">|</span>
            <a href="mailto:contact@leousj.org?subject=Terms%20of%20Use%20Request" title="Request the terms of use by email" className="transition hover:text-champagne">Terms of Use</a>
            <span aria-hidden="true" className="text-gold/40">|</span>
            <a href="mailto:contact@leousj.org" className="transition hover:text-champagne">Contact</a>
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
