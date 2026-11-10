import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../config/brand';
import { ASSETS } from '../config/assets';
import { useLanguage } from '../context/LanguageContext';
import { DRUGS_DATA } from '../data/drugsData';
import { FAQS_DATA } from '../data/awarenessData';
import { KEY_STATISTICS } from '../data/statisticsData';
import { CAMPAIGN_EVENTS } from '../data/campaignData';
import { Button } from '../components/common/Button';
import {
  Sparkles,
  Compass,
  MapPin,
  Heart,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  BookOpen,
  Users,
  Activity,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

interface HomePageProps {
  onOpenAiChat: () => void;
  onOpenWizard: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAiChat, onOpenWizard }) => {
  const { t, language } = useLanguage();
  const [openFaqId, setOpenFaqId] = React.useState<string | null>(FAQS_DATA[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-24 pb-16">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-16">
        {/* Abstract Gold & Darkness Atmospheric Glows */}
        <div className="absolute inset-0 bg-midnight pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Campaign Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal border border-gold/30 shadow-gold-subtle">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                <span className="text-xs uppercase tracking-wider text-gold font-bold">
                  {BRAND.slogan}
                </span>
              </div>

              {/* Bilingual Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-ivory tracking-tight leading-[1.1]">
                  Beyond the Darkness.
                  <span className="block gold-gradient-text mt-1">
                    Towards a Brighter Tomorrow.
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl font-sinhalaSerif text-gold/90 font-semibold mt-3">
                  අඳුරෙන් එළියට. වඩාත් දීප්තිමත් හෙට දිනක් කරා.
                </h2>
              </div>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-ivory/80 max-w-2xl font-sans leading-relaxed">
                {BRAND.heroSubtext}
              </p>
              <p className="text-sm text-gold/80 font-sinhalaSerif">
                {BRAND.heroSubtextSinhala}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={onOpenAiChat}
                  className="shadow-gold-glow"
                  leftIcon={<Sparkles className="w-5 h-5" />}
                >
                  {t('cta.talkToAi')}
                </Button>

                <Button
                  variant="charcoal"
                  size="lg"
                  onClick={onOpenWizard}
                  leftIcon={<Compass className="w-5 h-5 text-gold" />}
                >
                  Launch Creative Wizard
                </Button>

                <Link to="/support-directory">
                  <Button variant="outline" size="lg" leftIcon={<MapPin className="w-4 h-4 text-gold" />}>
                    Find Care Centers
                  </Button>
                </Link>
              </div>

              {/* Promise Card */}
              <div className="p-4 rounded-xl bg-charcoal/80 border border-gold/20 max-w-xl text-xs text-ivory/70 leading-relaxed">
                <strong className="text-champagne block mb-1">Our Core Promise:</strong>
                {BRAND.promise}
              </div>
            </div>

            {/* Right Column: Campaign Artwork & Atmosphere */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm sm:max-w-md w-full">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold/30 via-champagne/20 to-bronze/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-2xl bg-charcoal">
                  <img
                    src={ASSETS.campaignPoster}
                    alt="Beyond the Darkness Official Campaign Poster"
                    className="w-full h-auto object-cover transform group-hover:scale-102 transition duration-500"
                  />
                  <div className="p-4 bg-gradient-to-t from-midnight via-midnight/90 to-transparent absolute bottom-0 inset-x-0">
                    <span className="text-[11px] uppercase tracking-wider text-gold font-bold block">
                      Official Initiative Identity
                    </span>
                    <span className="text-xs text-ivory font-medium">
                      Leo Club of University of Sri Jayewardenepura
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION: PREVENT • SUPPORT • CONNECT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            Guiding Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-ivory mt-1">
            Prevent. Support. Connect.
          </h2>
          <p className="text-sm text-gold/80 font-sinhalaSerif mt-1">
            දැනුවත්භාවයෙන් නිවාරණය. තාක්ෂණයෙන් සහයෝගය. මානුෂීය බැඳීමෙන් බලාපොරොත්තුව.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="charcoal-card p-8 border-gold/30 charcoal-card-hover text-center">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-champagne mb-2">
              PREVENT (නිවාරණය)
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Equipping university students, school pupils, and families with rigorous, evidence-based knowledge to demystify peer pressure and prevent initial drug experimentation.
            </p>
          </div>

          <div className="charcoal-card p-8 border-gold/30 charcoal-card-hover text-center">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-champagne mb-2">
              SUPPORT (සහයෝගය)
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Offering an empathetic, completely anonymous AI-powered assistant and 10-step guided intake wizard that eliminates stigma and fear of judgment.
            </p>
          </div>

          <div className="charcoal-card p-8 border-gold/30 charcoal-card-hover text-center">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-champagne mb-2">
              CONNECT (සම්බන්ධීකරණය)
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Bridging vulnerable individuals directly with verified Sri Lankan hospitals, NDDCB centers, and non-profit psychosocial counseling facilities across all 25 districts.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHY THIS INITIATIVE MATTERS */}
      <section className="bg-charcoal/50 border-y border-charcoal-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-gold font-bold">
                The Sri Lankan Reality
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-ivory">
                Why Beyond the Darkness Matters Right Now
              </h2>
              <p className="text-xs text-gold/80 font-sinhalaSerif">
                අද දවසේ ශ්‍රී ලංකාව මුහුණදෙන අභියෝගය සහ අපගේ කාර්යභාරය
              </p>
              <p className="text-sm text-ivory/80 leading-relaxed">
                In recent years, the illicit drug landscape in Sri Lanka has undergone an alarming transformation. The emergence and aggressive proliferation of crystalline methamphetamine (ICE) and diverted pharmaceuticals have severely impacted university youth and adolescents.
              </p>
              <p className="text-sm text-ivory/80 leading-relaxed">
                Traditional barriers to recovery—such as deep social stigma, fear of legal repercussions, lack of localized verified information, and shame—prevent thousands from seeking timely medical care before irreversible neurotoxic harm occurs.
              </p>
              <p className="text-sm text-ivory/80 leading-relaxed">
                The <strong>Leo Club of University of Sri Jayewardenepura</strong> established this digital bridge to guarantee that any young person or parent in distress can ask questions safely, access verified science, and discover immediate local medical support.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="charcoal-card p-5 border-charcoal-light">
                <div className="text-3xl font-bold font-mono text-champagne">58%+</div>
                <div className="text-xs text-ivory font-semibold mt-1">Youth Inquiries</div>
                <p className="text-[11px] text-ivory/60 mt-1">Aged 18–29 seeking rehabilitation</p>
              </div>

              <div className="charcoal-card p-5 border-charcoal-light">
                <div className="text-3xl font-bold font-mono text-gold">25</div>
                <div className="text-xs text-ivory font-semibold mt-1">Districts Mapped</div>
                <p className="text-[11px] text-ivory/60 mt-1">All 9 Sri Lankan provinces covered</p>
              </div>

              <div className="charcoal-card p-5 border-charcoal-light">
                <div className="text-3xl font-bold font-mono text-champagne">100%</div>
                <div className="text-xs text-ivory font-semibold mt-1">Anonymous & Free</div>
                <p className="text-[11px] text-ivory/60 mt-1">Zero forced registration</p>
              </div>

              <div className="charcoal-card p-5 border-charcoal-light">
                <div className="text-3xl font-bold font-mono text-gold">3</div>
                <div className="text-xs text-ivory font-semibold mt-1">Languages Supported</div>
                <p className="text-[11px] text-ivory/60 mt-1">සිංහල • English • தமிழ்</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DRUG AWARENESS HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-gold font-bold">
              Evidence-Based Monograph Library
            </span>
            <h2 className="text-3xl font-bold font-heading text-ivory mt-1">
              Substance Awareness & Education
            </h2>
            <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
              විද්‍යාත්මක හා වෛද්‍යමය තොරතුරු පිරික්සන්න
            </p>
          </div>
          <Link to="/learn" className="text-xs text-gold hover:underline font-semibold flex items-center gap-1">
            <span>Explore Full Knowledge Centre</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DRUGS_DATA.slice(0, 3).map((drug) => (
            <div key={drug.id} className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between charcoal-card-hover">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-midnight text-gold border border-gold/30 uppercase font-bold tracking-wider">
                    {drug.classification}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Medically Reviewed
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-ivory">
                  {drug.name}
                </h3>
                <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
                  {drug.nameSi}
                </p>

                <p className="text-xs text-ivory/70 mt-3 line-clamp-3 leading-relaxed">
                  {drug.description}
                </p>

                <div className="mt-4 pt-3 border-t border-charcoal-light text-xs text-ivory/60 space-y-1">
                  <div>
                    <strong className="text-red-300">Emergency Alert:</strong>{' '}
                    <span>{drug.emergencySigns[0]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-charcoal-light flex items-center justify-between">
                <Link
                  to={`/learn/${drug.slug}`}
                  className="text-xs font-semibold text-gold hover:text-champagne flex items-center gap-1"
                >
                  <span>Read Clinical Monograph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CREATIVE GUIDED WIZARD HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="charcoal-card p-8 sm:p-12 border-gold/40 bg-gradient-to-br from-charcoal via-charcoal to-midnight relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">
              <Compass className="w-4 h-4" />
              <span>Interactive Step-by-Step Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-ivory">
              Not Sure Where to Begin? Use Our Creative Wizard.
            </h2>
            <p className="text-sm text-gold/80 font-sinhalaSerif">
              ඔබේ අවශ්‍යතාවයට ගැළපෙන සහයෝගය පියවරෙන් පියවර සොයාගන්න
            </p>
            <p className="text-sm text-ivory/70 leading-relaxed">
              If typing a detailed message feels daunting or confusing, our 10-step conversational wizard guides you gently through your situation, primary concerns, and preferred local support options.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="gold"
                size="md"
                onClick={onOpenWizard}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch 10-Step Wizard
              </Button>
              <Button variant="charcoal" size="md" onClick={onOpenAiChat}>
                Talk to AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FIND LOCAL CARE DIRECTORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            Verified Support Directory
          </span>
          <h2 className="text-3xl font-bold font-heading text-ivory mt-1">
            Certified Sri Lankan Care Centers
          </h2>
          <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
            දිවයින පුරා රජයේ හා පිළිගත් ප්‍රතිකාර මධ්‍යස්ථාන
          </p>
          <p className="text-xs text-ivory/60 mt-2">
            Explore state rehabilitation centers and government hospital psychiatric clinics mapped with verified contacts and operating hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between">
            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-midnight text-gold border border-gold/20 font-bold uppercase">
                Government Facility
              </span>
              <h3 className="font-heading font-bold text-base text-ivory mt-2">
                NDDCB Thalangama Rehabilitation Centre
              </h3>
              <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
                තලංගම ප්‍රතිකාර හා පුනරුත්ථාපන මධ්‍යස්ථානය
              </p>
              <p className="text-xs text-ivory/60 mt-2">
                Battaramulla, Colombo • 24-hour residential facilities, multi-disciplinary detox, and counseling.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal-light flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-champagne">011 278 8040</span>
              <a href="tel:0112788040" className="text-xs text-gold font-semibold hover:underline">
                Call Now
              </a>
            </div>
          </div>

          <div className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between">
            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-midnight text-gold border border-gold/20 font-bold uppercase">
                NGO / Sumithrayo
              </span>
              <h3 className="font-heading font-bold text-base text-ivory mt-2">
                Mel Medura (Sumithrayo Care)
              </h3>
              <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
                මෙල් මැදුර මත්ද්‍රව්‍ය නිවාරණ හා සහන මධ්‍යස්ථානය
              </p>
              <p className="text-xs text-ivory/60 mt-2">
                Horton Place, Colombo 07 • Free, confidential drop-in counseling, relapse prevention, and family healing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal-light flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-champagne">011 269 3460</span>
              <a href="tel:0112693460" className="text-xs text-gold font-semibold hover:underline">
                Call Now
              </a>
            </div>
          </div>

          <div className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between">
            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-midnight text-gold border border-gold/20 font-bold uppercase">
                National Hospital
              </span>
              <h3 className="font-heading font-bold text-base text-ivory mt-2">
                National Institute of Mental Health (NIMH)
              </h3>
              <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
                ජාතික මානසික විද්‍යායතනය - අංගොඩ
              </p>
              <p className="text-xs text-ivory/60 mt-2">
                Angoda • Tertiary psychiatric stabilization, emergency 24/7 care for severe withdrawal and acute psychosis.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal-light flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-champagne">1926</span>
              <a href="tel:1926" className="text-xs text-gold font-semibold hover:underline">
                Call Now
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/support-directory">
            <Button variant="gold" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Interactive Sri Lanka Map & 25 Districts
            </Button>
          </Link>
        </div>
      </section>

      {/* 7. UPCOMING CAMPAIGN ACTIVITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-gold font-bold">
              Youth In Action
            </span>
            <h2 className="text-3xl font-bold font-heading text-ivory mt-1">
              Campaign Drives & Events
            </h2>
            <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
              ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලයීය ලියෝ සමාජයේ ඉදිරි ක්‍රියාකාරකම්
            </p>
          </div>
          <Link to="/campaigns" className="text-xs text-gold hover:underline font-semibold flex items-center gap-1">
            <span>Volunteer & Get Involved</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAMPAIGN_EVENTS.map((ev) => (
            <div key={ev.id} className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-1">
                  {ev.phase}
                </span>
                <h3 className="font-heading font-bold text-base text-ivory">
                  {ev.title}
                </h3>
                <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
                  {ev.titleSi}
                </p>
                <p className="text-xs text-ivory/60 mt-3 leading-relaxed">
                  {ev.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-charcoal-light text-xs text-ivory/50 space-y-1">
                <div><strong>Date:</strong> {ev.date}</div>
                <div><strong>Location:</strong> {ev.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. DONATION CALLOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="charcoal-card p-8 sm:p-12 border-gold/30 bg-gradient-to-r from-charcoal via-midnight to-charcoal text-center">
          <Heart className="w-10 h-10 text-gold fill-gold/20 mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ivory">
            Support Drug Prevention & Recovery in Sri Lanka
          </h2>
          <p className="text-xs text-gold/80 font-sinhalaSerif mt-1">
            අපගේ තරුණ පරපුර මත්ද්‍රව්‍ය උවදුරෙන් මුදවාගැනීමට ඔබටත් දායක විය හැකිය
          </p>
          <p className="text-xs text-ivory/70 max-w-xl mx-auto mt-2 leading-relaxed">
            Every verified contribution supports university campus awareness workshops, digital health tool maintenance, and peer guidance programs. Complete financial records are maintained for institutional transparency.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/donate">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Make a Contribution
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-bold font-heading text-ivory mt-1">
            Common Inquiries & Privacy Information
          </h2>
          <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
            නිතර අසන ප්‍රශ්න සහ පිළිතුරු
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="charcoal-card border border-charcoal-light overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-charcoal-light/30 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-ivory">{faq.question}</h3>
                    <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">{faq.questionSi}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-ivory/80 leading-relaxed border-t border-charcoal-light/60 space-y-2">
                    <p>{faq.answer}</p>
                    <p className="text-xs text-gold/80 font-sinhalaSerif">{faq.answerSi}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. CONTACT & ORGANIZATION DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-midnight border border-charcoal-light flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-gold font-bold">
              Organizational Headquarters
            </span>
            <h3 className="text-xl font-bold font-heading text-ivory mt-1">
              Leo Club of University of Sri Jayewardenepura
            </h3>
            <p className="text-xs text-ivory/60 mt-1">
              Lions International • Leo District 306 D2 • Gangodawila, Nugegoda, Sri Lanka
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/about">
              <Button variant="charcoal" size="sm">
                About the Organization
              </Button>
            </Link>
            <a
              href="mailto:contact@leousj.org"
              className="btn-gold px-4 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5"
            >
              Contact Project Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
