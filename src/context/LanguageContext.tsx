import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  si: {
    // Brand & Identity
    'app.title': 'BEYOND THE DARKNESS – අඳුරෙන් එළියට',
    'app.tagline': 'අඳුරෙන් එළියට. වඩාත් දීප්තිමත් හෙට දිනක් කරා.',
    'app.promise': 'බියක් සැකක් නැතිව විමසිය හැකි ආරක්ෂිත ඉඩක්. විශ්වාසදායී තොරතුරු, වෘත්තීය සහය සහ බලාපොරොත්තුව වෙත මාවතක්.',
    'app.slogan': 'PREVENT • SUPPORT • CONNECT',
    'app.org': 'ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලයීය ලියෝ සමාජය',
    'app.district': 'ලියෝ දිස්ත්‍රික් 306 D2',

    // Navigation
    'nav.home': 'මුල් පිටුව',
    'nav.about': 'අප ගැන',
    'nav.learn': 'දැනුවත්භාවය',
    'nav.getHelp': 'සහය ලබාගන්න',
    'nav.findSupport': 'ප්‍රතිකාර මධ්‍යස්ථාන',
    'nav.awarenessHub': 'තොරතුරු කේන්ද්‍රය',
    'nav.campaigns': 'ක්‍රියාකාරකම්',
    'nav.statistics': 'දත්ත හා බලපෑම',
    'nav.donate': 'ආධාර කරන්න',
    'nav.aiAssistant': 'AI සහයකයා අමතන්න',
    'nav.adminPortal': 'පරිපාලක පිවිසුම',

    // Emergency Bar
    'emergency.title': 'හදිසි අවස්ථාවක්ද?',
    'emergency.banner': 'අධික මාත්‍රාවක් හෝ ක්ෂණික ශාරීරික අවදානමක් ඇත්නම් වහාම 1990 අමතන්න. මත්ද්‍රව්‍ය තොරතුරු සඳහා 1927 අමතන්න.',
    'emergency.btn': 'හදිසි දුරකථන අංක',
    'emergency.call1927': '1927 අමතන්න (NDDCB)',
    'emergency.call1990': '1990 අමතන්න (සුවසැරිය)',
    'emergency.call1333': '1333 අමතන්න (CCC)',

    // Common CTA
    'cta.talkToAi': 'AI සහයකයා සමඟ කතා කරන්න',
    'cta.findHelp': 'සහය සොයාගන්න',
    'cta.startWizard': 'මඟපෙන්වූ පියවර අරඹන්න',
    'cta.readMore': 'තව කියවන්න',
    'cta.learnMore': 'වැඩිදුර විස්තර',
    'cta.close': 'වසන්න',
    'cta.back': 'ආපසු',
    'cta.continue': 'ඉදිරියට',
    'cta.submit': 'යොමු කරන්න',
    'cta.reset': 'නැවත මුල සිට',
    'cta.skip': 'මඟහරින්න',
    'cta.search': 'සොයන්න',
    'cta.filter': 'පෙරහන්',
    'cta.viewDetails': 'විස්තර බලන්න',
    'cta.callNow': 'දැන්ම අමතන්න',

    // Safety Disclaimers
    'safety.disclaimer': 'අවවාදයයි: මෙම වේදිකාව සහ AI සහායකයා වෛද්‍යවරයෙකු හෝ හදිසි සේවාවක් වෙනුවට ක්‍රියා නොකරයි. ඔබේ සෞඛ්‍ය තත්ත්වය පිළිබඳව සුදුසුකම්ලත් සෞඛ්‍ය වෘත්තිකයෙකුගෙන් උපදෙස් ලබාගන්න.',
    'safety.crisis': 'ඔබට හෝ වෙනත් අයෙකුට ක්ෂණික ශාරීරික අනතුරක් ඇත්නම්, ප්‍රමාද නොවී 1990 (සුවසැරිය) හෝ 1927 (NDDCB) අමතන්න.',

    // Wizard
    'wizard.badge': 'ක්‍රියේටිව් AI මඟපෙන්වුම',
    'wizard.title': 'ඔබේ අවශ්‍යතාවය අනුව පියවරෙන් පියවර මඟපෙන්වීම',
    'wizard.step': 'පියවර',
    'wizard.of': 'න්',
  },
  en: {
    // Brand & Identity
    'app.title': 'BEYOND THE DARKNESS – අඳුරෙන් එළියට',
    'app.tagline': 'Beyond the Darkness. Towards a Brighter Tomorrow.',
    'app.promise': 'A safe place to ask. A trusted path to information, professional support and hope.',
    'app.slogan': 'PREVENT • SUPPORT • CONNECT',
    'app.org': 'Leo Club of University of Sri Jayewardenepura',
    'app.district': 'Leo District 306 D2',

    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.learn': 'Drug Education',
    'nav.getHelp': 'Get Help',
    'nav.findSupport': 'Find Support',
    'nav.awarenessHub': 'Awareness Hub',
    'nav.campaigns': 'Campaigns',
    'nav.statistics': 'Data & Impact',
    'nav.donate': 'Donate',
    'nav.aiAssistant': 'Talk to AI',
    'nav.adminPortal': 'Admin Portal',

    // Emergency Bar
    'emergency.title': 'Emergency Support',
    'emergency.banner': 'If experiencing an overdose or severe medical danger, call 1990 immediately. For confidential drug counseling, call 1927.',
    'emergency.btn': 'Emergency Numbers',
    'emergency.call1927': 'Call 1927 (NDDCB)',
    'emergency.call1990': 'Call 1990 (Suwaseriya)',
    'emergency.call1333': 'Call 1333 (CCC Crisis)',

    // Common CTA
    'cta.talkToAi': 'Talk to AI Assistant',
    'cta.findHelp': 'Find Help Now',
    'cta.startWizard': 'Start Guided Wizard',
    'cta.readMore': 'Read More',
    'cta.learnMore': 'Learn More',
    'cta.close': 'Close',
    'cta.back': 'Back',
    'cta.continue': 'Continue',
    'cta.submit': 'Submit',
    'cta.reset': 'Reset',
    'cta.skip': 'Skip',
    'cta.search': 'Search',
    'cta.filter': 'Filter',
    'cta.viewDetails': 'View Details',
    'cta.callNow': 'Call Now',

    // Safety Disclaimers
    'safety.disclaimer': 'Notice: This platform and AI Assistant do not replace qualified medical diagnosis or emergency care. Always consult certified healthcare professionals.',
    'safety.crisis': 'If you or someone around you is in immediate physical danger, call 1990 (Ambulance) or 1927 (NDDCB) without delay.',

    // Wizard
    'wizard.badge': 'Creative AI Guided Wizard',
    'wizard.title': 'Step-by-Step Personalized Navigation',
    'wizard.step': 'Step',
    'wizard.of': 'of',
  },
  ta: {
    // Brand & Identity
    'app.title': 'BEYOND THE DARKNESS – අඳුරෙන් එළියට',
    'app.tagline': 'இருளைத் தாண்டி. பிரகாசமான நாளையை நோக்கி.',
    'app.promise': 'கேட்பதற்கு ஒரு பாதுகாப்பான இடம். தகவல், தொழில்முறை ஆதரவு மற்றும் நம்பிக்கைக்கு ஒரு நம்பகமான பாதை.',
    'app.slogan': 'PREVENT • SUPPORT • CONNECT',
    'app.org': 'ஸ்ரீ ஜெயவர்த்தனபுர பல்கலைக்கழக லியோ கழகம்',
    'app.district': 'லியோ மாவட்டம் 306 D2',

    // Navigation
    'nav.home': 'முகப்பு',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.learn': 'போதைப்பொருள் கல்வி',
    'nav.getHelp': 'உதவி பெறுங்கள்',
    'nav.findSupport': 'ஆதரவு மையம்',
    'nav.awarenessHub': 'விழிப்புணர்வு தளம்',
    'nav.campaigns': 'இயக்கங்கள்',
    'nav.statistics': 'தரவு & தாக்கம்',
    'nav.donate': 'நன்கொடை',
    'nav.aiAssistant': 'AI உதவியாளர்',
    'nav.adminPortal': 'நிர்வாக தளம்',

    // Emergency Bar
    'emergency.title': 'அவசர உதவி',
    'emergency.banner': 'மருத்துவ அவசரநிலை அல்லது தீவிர ஆபத்து ஏற்பட்டால் உடனடியாக 1990 ஐ அழைக்கவும். போதைப்பொருள் தகவல் ஆலோசனைக்கு 1927 ஐ அழைக்கவும்.',
    'emergency.btn': 'அவசர எண்கள்',
    'emergency.call1927': '1927 ஐ அழைக்கவும் (NDDCB)',
    'emergency.call1990': '1990 ஐ அழைக்கவும் (சுவசரிய)',
    'emergency.call1333': '1333 ஐ அழைக்கவும் (CCC)',

    // Common CTA
    'cta.talkToAi': 'AI உதவியாளரிடம் பேசுங்கள்',
    'cta.findHelp': 'உதவி பெறுங்கள்',
    'cta.startWizard': 'வழிகாட்டப்பட்ட பாதையைத் தொடங்குங்கள்',
    'cta.readMore': 'மேலும் வாசிக்க',
    'cta.learnMore': 'மேலும் அறிய',
    'cta.close': 'மூடு',
    'cta.back': 'பின்செல்',
    'cta.continue': 'தொடரவும்',
    'cta.submit': 'சமர்ப்பிக்கவும்',
    'cta.reset': 'மீட்டமைக்க',
    'cta.skip': 'தவிர்க்கவும்',
    'cta.search': 'தேடுக',
    'cta.filter': 'வடிகட்டிகள்',
    'cta.viewDetails': 'விவரங்கள்',
    'cta.callNow': 'இப்போது அழைக்கவும்',

    // Safety Disclaimers
    'safety.disclaimer': 'கவனிக்க: இந்த தளம் மற்றும் AI உதவியாளர் மருத்துவ நிபுணரின் ஆலோசனைக்கோ அல்லது அவசர சிகிச்சைக்கோ மாற்றாகாது.',
    'safety.crisis': 'உடனடி உடல் ஆபத்து இருந்தால் உடனே 1990 (ஆம்புலன்ஸ்) அல்லது 1927 (NDDCB) அழைக்கவும்.',

    // Wizard
    'wizard.badge': 'AI வழிகாட்டி விஸார்ட்',
    'wizard.title': 'படி-படியான தனிப்பயனாக்கப்பட்ட வழிகாட்டுதல்',
    'wizard.step': 'படி',
    'wizard.of': 'இல்',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'si',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('btd_lang') as Language;
    return saved === 'en' || saved === 'ta' || saved === 'si' ? saved : 'si';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('btd_lang', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
