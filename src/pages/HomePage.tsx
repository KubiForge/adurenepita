import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO, telephoneHref } from '../config/contactInfo';
import { useLanguage } from '../context/LanguageContext';
import { DRUGS_DATA } from '../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../data/sriLankaData';
import { DRUG_IMAGE_ENTRIES } from '../data/drugImages';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface HomePageProps {
  onOpenAiChat: () => void;
  onOpenWizard: () => void;
}

const SUBSTANCE_CARDS_PER_PAGE = 3;
const thalangamaCenter = SUPPORT_CENTERS_DATA.find((center) => center.id === 'cnt-nddcb-thalangama');
const melMeduraCenter = SUPPORT_CENTERS_DATA.find((center) => center.id === 'cnt-mel-medura');

if (!thalangamaCenter || !melMeduraCenter) {
  throw new Error('Featured support center contact data is missing.');
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAiChat, onOpenWizard }) => {
  const { language, t } = useLanguage();
  const [openFaqId, setOpenFaqId] = React.useState<string | null>(FAQS_DATA[0].id);
  const [substancePage, setSubstancePage] = React.useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const substancePageCount = Math.ceil(DRUGS_DATA.length / SUBSTANCE_CARDS_PER_PAGE);
  const displayedSubstances = Array.from(
    { length: Math.min(SUBSTANCE_CARDS_PER_PAGE, DRUGS_DATA.length) },
    (_, slot) => DRUGS_DATA[(substancePage * SUBSTANCE_CARDS_PER_PAGE + slot) % DRUGS_DATA.length],
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  React.useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener('change', updateMotionPreference);
    return () => motionPreference.removeEventListener('change', updateMotionPreference);
  }, []);

  React.useEffect(() => {
    if (prefersReducedMotion || substancePageCount <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setSubstancePage((current) => (current + 1) % substancePageCount);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, substancePageCount]);

  return (
    <div className="homepage-page space-y-20 pb-16 sm:space-y-24">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="cinematic-hero relative flex items-center">
        <div className="cinematic-hero__inner">
          <div className="cinematic-hero__content">
            <p className="cinematic-hero__eyebrow">
              <span className="cinematic-hero__eyebrow-mark" aria-hidden="true" />
              {t('app.slogan')}
            </p>

            <h1 className="cinematic-hero__title">
              <span>{t('home.heroTitle')}</span>
              <span className="cinematic-hero__title-gold">{t('app.tagline')}</span>
            </h1>

            <div className="cinematic-hero__copy">
              <p>{t('home.heroDescription')}</p>
            </div>

            <div className="cinematic-hero__actions">
              <Button
                variant="gold"
                size="lg"
                onClick={onOpenAiChat}
                className="cinematic-hero__action cinematic-hero__action-primary"
                leftIcon={<Sparkles className="cinematic-hero__action-icon h-5 w-5" />}
              >
                {t('cta.talkToAi')}
              </Button>

              <Button
                variant="charcoal"
                size="lg"
                onClick={onOpenWizard}
                className="cinematic-hero__action cinematic-hero__action-secondary"
                leftIcon={<Compass className="cinematic-hero__action-icon h-5 w-5 text-gold" />}
              >
                {t('cta.startWizard')}
              </Button>

              <Link
                to="/support-directory"
                className="cinematic-hero__action cinematic-hero__action-secondary"
              >
                <MapPin className="cinematic-hero__action-icon h-4 w-4 text-gold" aria-hidden="true" />
                <span>{t('home.findCare')}</span>
              </Link>
            </div>

            <p className="cinematic-hero__promise">
              <span>{t('home.promiseLabel')}</span>
              {t('app.promise')}
            </p>
          </div>
        </div>

        <a
          href="#homepage-mission"
          className="cinematic-hero__scroll"
          aria-label={t('home.scrollDiscover')}
        >
          <span>{t('home.scrollDiscover')}</span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </a>
      </section>

      {/* 2. MISSION & VISION: PREVENT • SUPPORT • CONNECT */}
      <section id="homepage-mission" className="homepage-mission max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            {t('home.philosophy')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-ivory mt-1">
            {t('app.slogan')}
          </h2>
        </div>

        <div className="homepage-mission-grid grid grid-cols-1 gap-3 md:grid-cols-3 sm:gap-5">
          <div className="premium-feature-card charcoal-card p-6 sm:p-8 border-gold/30 text-center">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-champagne mb-2">
              {t('home.prevent')}
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              {t('home.preventDescription')}
            </p>
          </div>

          <div className="premium-feature-card charcoal-card p-6 sm:p-8 border-gold/30 text-center">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-champagne mb-2">
              {t('home.support')}
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              {t('home.supportDescription')}
            </p>
          </div>

          <div className="premium-feature-card charcoal-card p-6 sm:p-8 border-gold/30 text-center">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-heading text-champagne mb-2">
              {t('home.connect')}
            </h3>
            <p className="text-xs text-ivory/70 leading-relaxed">
              {t('home.connectDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHY THIS INITIATIVE MATTERS */}
      <section className="homepage-reality border-y border-charcoal-light/70 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="homepage-reality-grid grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 items-center lg:gap-14">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-gold font-bold">
                {t('home.realityEyebrow')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-ivory">
                {t('home.realityTitle')}
              </h2>
              <p className="text-sm text-ivory/80 leading-relaxed">
                {t('home.realityParagraph1')}
              </p>
              <p className="text-sm text-ivory/80 leading-relaxed">
                {t('home.realityParagraph2')}
              </p>
              <p className="text-sm text-ivory/80 leading-relaxed">
                {t('home.realityParagraph3')}
              </p>
            </div>

            <div className="homepage-impact-grid grid grid-cols-2 gap-3 sm:gap-4">
              <div className="impact-stat-card charcoal-card p-5 border-charcoal-light">
                <span className="impact-stat-icon" aria-hidden="true"><Users className="h-4 w-4" /></span>
                <div className="text-3xl font-bold font-mono text-champagne">58%+</div>
                <div className="text-xs text-ivory font-semibold mt-1">{t('home.statYouth')}</div>
                <p className="text-[11px] text-ivory/60 mt-1">{t('home.statYouthDescription')}</p>
              </div>

              <div className="impact-stat-card charcoal-card p-5 border-charcoal-light">
                <span className="impact-stat-icon" aria-hidden="true"><MapPin className="h-4 w-4" /></span>
                <div className="text-3xl font-bold font-mono text-gold">25</div>
                <div className="text-xs text-ivory font-semibold mt-1">{t('home.statDistricts')}</div>
                <p className="text-[11px] text-ivory/60 mt-1">{t('home.statDistrictsDescription')}</p>
              </div>

              <div className="impact-stat-card charcoal-card p-5 border-charcoal-light">
                <span className="impact-stat-icon" aria-hidden="true"><ShieldCheck className="h-4 w-4" /></span>
                <div className="text-3xl font-bold font-mono text-champagne">100%</div>
                <div className="text-xs text-ivory font-semibold mt-1">{t('home.statAnonymous')}</div>
                <p className="text-[11px] text-ivory/60 mt-1">{t('home.statAnonymousDescription')}</p>
              </div>

              <div className="impact-stat-card charcoal-card p-5 border-charcoal-light">
                <span className="impact-stat-icon" aria-hidden="true"><Compass className="h-4 w-4" /></span>
                <div className="text-3xl font-bold font-mono text-gold">1</div>
                <div className="text-xs text-ivory font-semibold mt-1">{t('home.statLanguages')}</div>
                <p className="text-[11px] text-ivory/60 mt-1">{t('language.en')}, {t('language.si')}, {t('language.ta')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DRUG AWARENESS HIGHLIGHTS */}
      <section className="homepage-substances max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-gold font-bold">
              {t('home.drugLibraryEyebrow')}
            </span>
            <h2 className="text-3xl font-bold font-heading text-ivory mt-1">
              {t('nav.learn')}
            </h2>
          </div>
          <Link to="/learn" className="text-xs text-gold hover:underline font-semibold flex items-center gap-1">
            <span>{t('home.openLibrary')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          className="substance-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label={t('home.featuredSubstances')}
        >
          <div className="homepage-substances-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {displayedSubstances.map((drug, index) => {
              const imageEntry = DRUG_IMAGE_ENTRIES.find((entry) => entry.monographSlug === drug.slug);
              const drugName = language === 'si' ? drug.nameSi : language === 'ta' ? drug.nameTa : drug.name;
              const drugDescription = language === 'si' ? drug.descriptionSi : language === 'ta' ? drug.descriptionTa : drug.description;
              return (
                <article
                  key={drug.id}
                  className="substance-card charcoal-card"
                  style={{ animationDelay: `${index * 75}ms` }}
                  aria-roledescription="slide"
                  aria-label={t('home.carouselItem', { name: drugName, current: substancePage + 1, total: substancePageCount })}
                >
                  <div className="substance-card__header">
                    {imageEntry && (
                      <img
                        src={`/assets/drugs/${imageEntry.file}`}
                        alt={t('home.drugIllustration', { name: drugName })}
                        className="substance-card__image"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div className="substance-card__meta">
                      <span className="substance-card__classification">
                        {drug.classification}
                      </span>
                      <span className="substance-card__review">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                        {t('home.medicallyReviewed')}
                      </span>
                    </div>
                  </div>

                  <div className="substance-card__content">
                    <h3 className="font-heading font-bold text-lg text-ivory">
                      {drugName}
                    </h3>

                    <p className="text-xs text-ivory/70 mt-3 line-clamp-3 leading-relaxed">
                      {drugDescription}
                    </p>

                    <div className="substance-card__alert">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <p>
                        <strong>{t('home.emergencyAlert')}:</strong> {t('home.callEmergency')}
                      </p>
                    </div>

                    <Link
                      to={`/learn/${drug.slug}`}
                      className="substance-card__link"
                    >
                      <span>{t('home.readMonograph')}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="substance-carousel__controls" aria-label={t('home.carouselControls')}>
            <div className="substance-carousel__buttons">
              <button
                type="button"
                className="substance-carousel__button"
                aria-label={t('home.previousCards')}
                onClick={() => setSubstancePage((current) => (current - 1 + substancePageCount) % substancePageCount)}
                disabled={substancePageCount <= 1}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="substance-carousel__dots" role="tablist" aria-label={t('home.chooseCardSet')}>
                {Array.from({ length: substancePageCount }, (_, page) => (
                  <button
                    key={page}
                    type="button"
                    role="tab"
                    className={`substance-carousel__dot${page === substancePage ? ' is-active' : ''}`}
                    aria-label={t('home.showCardSet', { current: page + 1 })}
                    aria-selected={page === substancePage}
                    onClick={() => setSubstancePage(page)}
                  />
                ))}
              </div>

              <button
                type="button"
                className="substance-carousel__button"
                aria-label={t('home.nextCards')}
                onClick={() => setSubstancePage((current) => (current + 1) % substancePageCount)}
                disabled={substancePageCount <= 1}
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CREATIVE GUIDED WIZARD HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="charcoal-card p-8 sm:p-12 border-gold/40 bg-gradient-to-br from-charcoal via-charcoal to-midnight relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">
              <Compass className="w-4 h-4" />
              <span>{t('home.wizardEyebrow')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-ivory">
              {t('home.wizardTitle')}
            </h2>
            <p className="text-sm text-ivory/70 leading-relaxed">
              {t('home.wizardDescription')}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="gold"
                size="md"
                onClick={onOpenWizard}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {t('cta.startWizard')}
              </Button>
              <Button variant="charcoal" size="md" onClick={onOpenAiChat}>
                {t('cta.talkToAi')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FIND LOCAL CARE DIRECTORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            {t('home.supportDirectory')}
          </span>
          <h2 className="text-3xl font-bold font-heading text-ivory mt-1">
            {t('home.careTitle')}
          </h2>
          <p className="text-xs text-ivory/60 mt-2">
            {t('home.careDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between">
            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-midnight text-gold border border-gold/20 font-bold uppercase">
                {t('home.government')}
              </span>
              <h3 className="font-heading font-bold text-base text-ivory mt-2">
                {language === 'si' ? thalangamaCenter.nameSi : language === 'ta' ? thalangamaCenter.nameTa : thalangamaCenter.name}
              </h3>
              <p className="text-xs text-ivory/60 mt-2">
                {t('home.thalangamaDescription')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal-light flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-champagne">{thalangamaCenter.phone}</span>
              <a href={telephoneHref(thalangamaCenter.phone)} className="text-xs text-gold font-semibold hover:underline">
                {t('cta.callNow')}
              </a>
            </div>
          </div>

          <div className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between">
            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-midnight text-gold border border-gold/20 font-bold uppercase">
                {t('home.nonprofit')}
              </span>
              <h3 className="font-heading font-bold text-base text-ivory mt-2">
                {language === 'si' ? melMeduraCenter.nameSi : language === 'ta' ? melMeduraCenter.nameTa : melMeduraCenter.name}
              </h3>
              <p className="text-xs text-ivory/60 mt-2">
                {t('home.melMeduraDescription')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal-light flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-champagne">{melMeduraCenter.phone}</span>
              <a href={telephoneHref(melMeduraCenter.phone)} className="text-xs text-gold font-semibold hover:underline">
                {t('cta.callNow')}
              </a>
            </div>
          </div>

          <div className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between">
            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-midnight text-gold border border-gold/20 font-bold uppercase">
                {t('home.hospital')}
              </span>
              <h3 className="font-heading font-bold text-base text-ivory mt-2">
                {t('home.mentalHealthInstitute')}
              </h3>
              <p className="text-xs text-ivory/60 mt-2">
                {t('home.mentalHealthDescription')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal-light flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-champagne">{CONTACT_INFO.emergency.mentalHealth.number}</span>
              <a href={telephoneHref(CONTACT_INFO.emergency.mentalHealth.number)} className="text-xs text-gold font-semibold hover:underline">
                {t('cta.callNow')}
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/support-directory">
            <Button variant="gold" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              {t('home.openMap')}
            </Button>
          </Link>
        </div>
      </section>

      {/* 7. UPCOMING CAMPAIGN ACTIVITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-gold font-bold">
              {t('home.youthInAction')}
            </span>
            <h2 className="text-3xl font-bold font-heading text-ivory mt-1">
              {t('home.campaignsTitle')}
            </h2>
          </div>
          <Link to="/campaigns" className="text-xs text-gold hover:underline font-semibold flex items-center gap-1">
            <span>{t('home.volunteer')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAMPAIGN_EVENTS.map((ev) => (
            <div key={ev.id} className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-1">
                  {language === 'si' ? ev.phaseSi : language === 'ta' ? ev.phaseTa : ev.phase}
                </span>
                <h3 className="font-heading font-bold text-base text-ivory">
                  {language === 'si' ? ev.titleSi : language === 'ta' ? ev.titleTa : ev.title}
                </h3>
                <p className="text-xs text-ivory/60 mt-3 leading-relaxed">
                  {language === 'si' ? ev.descriptionSi : language === 'ta' ? ev.descriptionTa : ev.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-charcoal-light text-xs text-ivory/50 space-y-1">
                <div><strong>{t('home.date')}:</strong> {language === 'si' ? ev.dateSi : language === 'ta' ? ev.dateTa : ev.date}</div>
                <div><strong>{t('home.location')}:</strong> {language === 'si' ? ev.locationSi : language === 'ta' ? ev.locationTa : ev.location}</div>
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
            {t('home.donationTitle')}
          </h2>
          <p className="text-xs text-ivory/70 max-w-xl mx-auto mt-2 leading-relaxed">
            {t('home.donationDescription')}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/donate">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('nav.donate')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            {t('home.faqEyebrow')}
          </span>
          <h2 className="text-3xl font-bold font-heading text-ivory mt-1">
            {t('home.faqTitle')}
          </h2>
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
                  aria-expanded={isOpen}
                  aria-controls={`homepage-faq-${faq.id}`}
                >
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-ivory">
                      {language === 'si' ? faq.questionSi : language === 'ta' ? faq.questionTa : faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`homepage-faq-${faq.id}`}
                    className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-ivory/80 leading-relaxed border-t border-charcoal-light/60 space-y-2"
                  >
                    <p>{language === 'si' ? faq.answerSi : language === 'ta' ? faq.answerTa : faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
