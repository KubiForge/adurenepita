import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ExternalLink, Heart, Mail, MapPin, PhoneCall, Shield } from 'lucide-react';
import { BRAND } from '../../config/brand';
import { LogoPlaceholder } from '../common/LogoPlaceholder';

const KUBI_FORGE_URL = 'https://kubiforge.vercel.app';

const footerLinkClass = 'text-sm text-ivory/60 transition-colors hover:text-champagne';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-gold/15 bg-midnight text-ivory/80">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,190,130,0.08),transparent_68%)]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 border-b border-ivory/10 pb-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="space-y-5 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-4">
              <LogoPlaceholder
                label="Beyond the Darkness"
                category="Project identity"
                compact
                className="w-20 shrink-0 rounded-xl border-gold/25 bg-charcoal/70"
              />
              <div>
                <p className="font-heading text-lg font-semibold tracking-wide text-ivory sm:text-xl">BEYOND THE DARKNESS</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-ivory/45">A youth-led initiative</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ivory/60">
              A youth-led, evidence-informed digital initiative for substance prevention, compassionate support navigation, and access to healthcare in Sri Lanka.
            </p>
            <span className="inline-flex rounded-full border border-gold/20 bg-charcoal/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-gold">
              {BRAND.slogan}
            </span>
          </div>

          <div>
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Navigation</h2>
            <ul className="space-y-3">
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
            <ul className="space-y-3">
              <li><Link to="/campaigns" className={footerLinkClass}>Campaigns</Link></li>
              <li><Link to="/community" className={footerLinkClass}>Community</Link></li>
              <li><Link to="/statistics" className={footerLinkClass}>Data & Impact</Link></li>
              <li>
                <Link to="/donate" className="inline-flex items-center gap-2 text-sm text-champagne transition-colors hover:text-ivory">
                  <Heart className="h-3.5 w-3.5 text-gold" /> Donate
                </Link>
              </li>
              <li>
                <Link to="/admin" className={footerLinkClass}>
                  <span className="inline-flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-gold/70" /> Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-300">
              <PhoneCall className="h-3.5 w-3.5" /> Emergency Helplines
            </h2>
            <ul className="space-y-3 text-xs">
              <li className="rounded-xl border border-ivory/10 bg-charcoal/55 p-3">
                <div className="flex items-center justify-between gap-3"><span className="text-ivory/75">NDDCB Drug Helpline</span><a className="font-mono font-bold text-champagne hover:text-white" href="tel:1927">1927</a></div>
                <p className="mt-1 text-[10px] text-ivory/40">Toll-free 24/7 counseling & information</p>
              </li>
              <li className="rounded-xl border border-ivory/10 bg-charcoal/55 p-3">
                <div className="flex items-center justify-between gap-3"><span className="text-ivory/75">Suwaseriya Ambulance</span><a className="font-mono font-bold text-red-300 hover:text-white" href="tel:1990">1990</a></div>
                <p className="mt-1 text-[10px] text-ivory/40">Medical emergencies</p>
              </li>
              <li className="rounded-xl border border-ivory/10 bg-charcoal/55 p-3">
                <div className="flex items-center justify-between gap-3"><span className="text-ivory/75">CCC Emotional Support</span><a className="font-mono font-bold text-champagne hover:text-white" href="tel:1333">1333</a></div>
                <p className="mt-1 text-[10px] text-ivory/40">Crisis and emotional support</p>
              </li>
              <li className="rounded-xl border border-ivory/10 bg-charcoal/55 p-3">
                <div className="flex items-center justify-between gap-3"><span className="text-ivory/75">Police Emergency</span><a className="font-mono font-bold text-red-300 hover:text-white" href="tel:119">119</a></div>
                <p className="mt-1 text-[10px] text-ivory/40">Immediate police assistance</p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Leo Club Headquarters</h2>
            <p className="text-sm font-semibold leading-6 text-ivory/80">{BRAND.orgName}</p>
            <p className="mt-2 text-xs leading-5 text-ivory/50">{BRAND.parentOrg} · {BRAND.district}</p>
            <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-ivory/50">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/80" />
              Gangodawila, Nugegoda, Sri Lanka
            </p>
            <a href="mailto:contact@leousj.org" className="mt-3 inline-flex items-center gap-2 text-xs text-champagne transition hover:text-white">
              <Mail className="h-3.5 w-3.5" /> Contact Project Team
            </a>
          </div>
        </div>

        <div className="border-b border-ivory/10 py-6 text-xs leading-6 text-ivory/45">
          <p className="font-semibold text-ivory/65">Clinical Governance & Legal Disclaimer</p>
          <p className="mt-1">
            BEYOND THE DARKNESS is an educational, awareness, and support navigational digital platform organized by the Leo Club of University of Sri Jayewardenepura. The platform and its AI Assistant do not provide medical diagnosis, clinical treatment plans, pharmaceutical prescriptions, or emergency dispatch services. Always consult certified healthcare professionals or hospital psychiatry units for clinical concerns. If you or someone you know is in immediate life-threatening physical danger, contact emergency medical services (1990) or the police (119) immediately.
          </p>
        </div>

        <div className="flex flex-col gap-5 pt-6 text-xs text-ivory/45 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl">
            &copy; {new Date().getFullYear()} Beyond the Darkness. Organized by Leo Club of University of Sri Jayewardenepura (Leo District 306 D2).
          </p>
          <nav aria-label="Legal and contact links" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="mailto:contact@leousj.org?subject=Privacy%20Policy%20Request" title="Request the privacy policy by email" className={footerLinkClass}>Privacy Policy</a>
            <a href="mailto:contact@leousj.org?subject=Terms%20of%20Use%20Request" title="Request the terms of use by email" className={footerLinkClass}>Terms of Use</a>
            <a href="mailto:contact@leousj.org" className={footerLinkClass}>Contact</a>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-4 lg:justify-end">
            <p className="text-xs text-ivory/45">
              Designed &amp; Developed with care by{' '}
              <a href={KUBI_FORGE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-champagne transition hover:text-white">
                Kubi Forge <ExternalLink className="ml-1 inline h-3 w-3" />
              </a>
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-ivory/10 bg-charcoal/70 px-3 py-2 text-ivory/60 transition hover:border-gold/35 hover:text-champagne"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
