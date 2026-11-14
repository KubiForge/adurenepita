import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Building2,
  ExternalLink,
  Heart,
  Link2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ASSETS } from '../config/assets';
import { BRAND } from '../config/brand';
import { ORGANIZATION_LOGOS } from '../data/organizationLogos';
import { LogoPlaceholder } from '../components/common/LogoPlaceholder';

const KUBI_FORGE_URL = 'https://kubiforge.vercel.app';

const Reveal: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } motion-reduce:transform-none motion-reduce:transition-none ${className}`}
    >
      {children}
    </div>
  );
};

const SectionHeading: React.FC<{ eyebrow: string; title: string; description?: string; id?: string }> = ({
  eyebrow,
  title,
  description,
  id,
}) => (
  <div className="mb-9 max-w-3xl">
    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
    <h2 id={id} className="mt-3 text-3xl font-semibold leading-tight text-ivory sm:text-4xl">{title}</h2>
    {description && <p className="mt-3 max-w-2xl text-sm leading-7 text-ivory/60">{description}</p>}
  </div>
);

const missionItems = [
  {
    title: 'PREVENT',
    description: 'Awareness and evidence-based education.',
    icon: BookOpen,
  },
  {
    title: 'SUPPORT',
    description: 'Compassionate and confidential assistance.',
    icon: Heart,
  },
  {
    title: 'CONNECT',
    description: 'Access to verified healthcare services.',
    icon: Link2,
  },
];

export const AboutPage: React.FC = () => (
  <div className="overflow-hidden pb-16">
    <section
      aria-labelledby="about-hero-title"
      className="relative isolate mx-auto mt-6 flex min-h-[540px] max-w-[1440px] items-center overflow-hidden rounded-[2rem] border border-gold/15 bg-midnight bg-cover bg-center px-5 py-16 sm:mx-6 sm:px-10 lg:mx-8 lg:min-h-[590px] lg:px-16"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(10, 11, 13, 0.98) 0%, rgba(10, 11, 13, 0.92) 42%, rgba(10, 11, 13, 0.52) 100%), linear-gradient(0deg, rgba(10, 11, 13, 0.5), transparent 55%), url(${ASSETS.heroBg})`,
      }}
    >
      <div className="relative flex max-w-3xl flex-col">
        <div className="order-1 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-midnight/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-champagne backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          A Youth-Led Initiative
        </div>
        <div className="order-2 mt-4 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.14em] text-ivory/50">
          <Building2 className="h-3.5 w-3.5 shrink-0 text-gold" />
          Organized by Leo Club of University of Sri Jayewardenepura
        </div>

        <h1 id="about-hero-title" className="order-3 mt-7 font-heading text-5xl font-semibold leading-[0.95] tracking-tight text-ivory sm:text-6xl lg:text-7xl">
          Beyond the <span className="gold-gradient-text">Darkness</span>
        </h1>
        <p className="order-4 mt-6 max-w-2xl font-heading text-2xl leading-snug text-champagne/95 sm:text-3xl">
          A brighter tomorrow begins with awareness, compassion and action.
        </p>
        <p className="order-6 mt-5 max-w-2xl text-sm leading-7 text-ivory/75 sm:order-5 sm:text-base">
          A youth-led, evidence-informed digital initiative dedicated to substance prevention, compassionate support navigation, and bridging individuals to accredited healthcare in Sri Lanka.
        </p>

        <div className="order-5 mt-8 flex flex-wrap gap-3 sm:order-6">
          <a href="#purpose" className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold">
            Discover our purpose <ArrowRight className="h-4 w-4" />
          </a>
          <Link to="/get-help" className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-midnight/50 px-5 py-3 text-xs font-semibold text-ivory transition hover:border-gold/50 hover:text-champagne">
            Find support
          </Link>
        </div>

      </div>
    </section>

    <div className="mx-auto mt-20 max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8 lg:space-y-24">
      <Reveal>
        <section aria-labelledby="identity-title">
          <SectionHeading
            id="identity-title"
            eyebrow="Organization identity"
            title="Driven by Purpose. Powered by People."
            description="Official organizational and Leo identity marks supplied for this initiative."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
            {ORGANIZATION_LOGOS.map((item) => (
              <LogoPlaceholder
                key={item.label}
                label={item.label}
                category={item.category}
                src={item.src}
                className="min-h-44 bg-charcoal/55"
              />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="purpose" aria-labelledby="organizing-body-title" className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-5 lg:col-span-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">The Organizing Body</p>
            <h2 id="organizing-body-title" className="max-w-2xl text-3xl font-semibold leading-tight text-ivory sm:text-4xl">
              Leo Club of University of Sri Jayewardenepura
            </h2>
            <div className="space-y-5 border-l border-gold/30 pl-5 text-sm leading-7 text-ivory/70 sm:pl-6">
              <p>
                The <strong className="font-semibold text-champagne">Leo Club of University of Sri Jayewardenepura</strong> operates under Lions International (Leo District 306 D2) as one of Sri Lanka’s most active university-based youth humanitarian organizations. Comprising undergraduate leaders across multiple academic faculties—including Medical Sciences, Applied Sciences, Humanities, Management, and Technology—the club leads impactful community service initiatives across the island.
              </p>
              <p>
                Recognizing the alarming spread of illicit synthetic substances among youth and university communities, the club initiated <strong className="font-semibold text-champagne">“Beyond the Darkness”</strong> to dismantle stigma and replace fear with <strong className="font-semibold text-champagne">verified science, confidential technology, and clinical connection.</strong>
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-charcoal/95 via-charcoal/80 to-midnight p-6 shadow-charcoal-elevated backdrop-blur-xl sm:p-8 lg:col-span-5">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Campaign identity</p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-champagne">PREVENT <span className="text-gold/60">•</span> SUPPORT <span className="text-gold/60">•</span> CONNECT</h3>
              <div className="mt-7 space-y-5">
                <p className="text-sm leading-6 text-ivory/75"><strong className="text-gold">PREVENT:</strong> Eradicating drug experimentation through youth peer mentorship and factual pharmacology.</p>
                <p className="text-sm leading-6 text-ivory/75"><strong className="text-gold">SUPPORT:</strong> Providing dignified, completely anonymous AI assistance and guided navigation.</p>
                <p className="text-sm leading-6 text-ivory/75"><strong className="text-gold">CONNECT:</strong> Directing users safely to verified Sri Lankan healthcare professionals and hospitals.</p>
              </div>
            </div>
            <div className="relative mt-8 border-t border-gold/15 pt-4 text-[10px] uppercase tracking-[0.18em] text-ivory/40">
              {BRAND.secondarySlogan}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="mission-title">
          <SectionHeading
            id="mission-title"
            eyebrow="Our mission"
            title="Our Mission & Values"
            description="Three commitments. One compassionate path."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {missionItems.map(({ title, description, icon: Icon }, index) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-gold/[0.045] sm:p-8"
              >
                <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center justify-between">
                  <span className="text-xs font-mono text-gold/55">0{index + 1}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-midnight/70 text-champagne transition group-hover:border-gold/50">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="relative mt-8 font-heading text-2xl font-semibold tracking-wide text-ivory">{title}</h3>
                <p className="relative mt-2 max-w-xs text-sm leading-6 text-ivory/60">{description}</p>
                <div className="relative mt-6 h-px w-12 bg-gradient-to-r from-gold/70 to-transparent transition-all duration-300 group-hover:w-20" />
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="governance-title" className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-charcoal/80 to-midnight/90 p-6 shadow-charcoal-elevated backdrop-blur-xl sm:p-9 lg:p-11">
          <div aria-hidden="true" className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gold/[0.06] blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-[auto_1fr] md:gap-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-midnight text-champagne">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Transparency & independence</p>
              <h2 id="governance-title" className="mt-2 text-2xl font-semibold text-ivory sm:text-3xl">Ethical Governance & Reference Independence</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-ivory/70">
                <p>
                  In designing this platform, the project team studied leading global and Sri Lankan digital health platforms, including Shatterproof, Partnership to End Addiction (drugfree.org), SAMHSA, NDDCB Sri Lanka, and ADIC Sri Lanka. These references served purely as inspiration for empathetic navigation and data storytelling.
                </p>
                <p>
                  <strong className="text-champagne">Important Disclosure:</strong> Mention of these organizations does not imply formal endorsement, legal partnership, or commercial affiliation unless an explicit bilateral agreement is formalized. All local service details and phone lines (such as NDDCB 1927) are independently verified before publication.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="kubi-title" className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-midnight p-6 shadow-[0_22px_80px_-44px_rgba(216,190,130,0.45)] sm:p-9 lg:p-12">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(216,190,130,0.13),transparent_38%)]" />
          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Development & technology credit</p>
              <h2 id="kubi-title" className="mt-3 text-3xl font-semibold leading-tight text-ivory sm:text-4xl">Crafted with Purpose. Built with Technology.</h2>
              <p className="mt-4 font-heading text-xl text-champagne">Designed and developed by Kubi Forge.</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-ivory/65">
                Kubi Forge is a software development team focused on transforming meaningful ideas into impactful digital experiences. We are proud to have designed and developed the Beyond the Darkness digital platform.
              </p>
              <a
                href={KUBI_FORGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold"
              >
                Explore Kubi Forge →
              </a>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-gold/25 bg-charcoal/70 p-5 shadow-charcoal-elevated backdrop-blur-xl sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-gold/15 pb-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ivory/45">Designed & developed by</span>
                  <ExternalLink className="h-4 w-4 text-gold" />
                </div>
                <img
                  src={ASSETS.kubiForgeShowcase}
                  alt="Kubi Forge Startup Hub showcase"
                  className="mt-5 aspect-video w-full rounded-2xl border border-gold/20 object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <p className="mt-5 text-center font-heading text-3xl font-semibold tracking-[0.12em] text-champagne">KUBI FORGE</p>
                <a
                  href={KUBI_FORGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-between gap-3 text-sm font-semibold text-champagne transition hover:text-ivory"
                >
                  <span className="break-all">kubiforge.vercel.app</span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="ecosystem-title">
          <SectionHeading
            id="ecosystem-title"
            eyebrow="Official organization logos"
            title="Organizations & Leo Identities"
            description="The complete set of organizational, Leo, university and leadership marks supplied for this initiative."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
            {ORGANIZATION_LOGOS.map((item) => (
              <LogoPlaceholder
                key={item.label}
                label={item.label}
                category={item.category}
                src={item.src}
                className="min-h-40 bg-charcoal/55"
              />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  </div>
);
