import { CONTACT_INFO } from '../config/contactInfo';

export interface Article {
  id: string;
  slug: string;
  title: string;
  titleSi: string;
  titleTa: string;
  category: 'Prevention' | 'Family & Friends' | 'Clinical Science' | 'Recovery';
  readTime: string;
  summary: string;
  summarySi: string;
  summaryTa: string;
  content: string[];
  contentSi: string[];
  contentTa: string[];
  publishedDate: string;
  author: string;
  verifiedMedicalReview: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionSi: string;
  questionTa: string;
  options: {
    text: string;
    textSi: string;
    textTa: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationSi: string;
  explanationTa: string;
  citation: string;
  citationSi: string;
  citationTa: string;
}

export interface FaqItem {
  id: string;
  question: string;
  questionSi: string;
  questionTa: string;
  answer: string;
  answerSi: string;
  answerTa: string;
  category: 'general' | 'confidentiality' | 'services' | 'ai';
}

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-talk-to-friend',
    slug: 'how-to-talk-to-a-friend',
    title: 'How to Talk to a Friend or Sibling You Are Worried About: A Compassionate Guide',
    titleSi: 'මත්ද්‍රව්‍යවලට යොමුවී ඇති මිතුරෙකු හෝ පවුලේ සාමාජිකයෙකු සමඟ කතා කරන්නේ කෙසේද?',
    titleTa: 'கவலைக்குரிய நண்பர் அல்லது உடன்பிறந்தவருடன் எவ்வாறு பேசுவது?',
    category: 'Family & Friends',
    readTime: '5 min read',
    summary: 'Discover non-confrontational, evidence-informed communication techniques that preserve dignity and foster openness instead of triggering defensiveness.',
    summarySi: 'චෝදනා කිරීමෙන් හෝ බියවැද්දීමෙන් තොරව, කරුණාවෙන් සහ ගෞරවයෙන් යුතුව ඔවුන්ට සහයෝගය ලබාදිය හැකි මනෝවිද්‍යාත්මක ක්‍රම.',
    summaryTa: 'குற்றம் சாட்டாமல், மரியாதையுடனும் அக்கறையுடனும் பேசுவதற்கான நடைமுறை வழிகள்.',
    content: [
      'When you suspect a close friend or family member is struggling with substance use, your natural impulse may be confrontation, anger, or frantic pleading. However, clinical evidence shows that aggressive interventions usually heighten guilt, shame, and defensive denial.',
      '1. Choose a calm, private, and sober moment: Never initiate an emotionally charged conversation when the person is actively intoxicated or undergoing severe withdrawal.',
      '2. Use "I" statements rather than "You" accusations: Say "I have noticed you seem overwhelmed and I am worried about your health", rather than "You are destroying this family".',
      '3. Listen with empathy rather than preaching: Recovery begins when an individual feels understood rather than cornered.',
      `4. Offer practical connection to professional support: Offer to accompany them to a confidential counseling appointment or call the ${CONTACT_INFO.emergency.drugHelpline.number} hotline together.`,
    ],
    contentSi: [
      'මිතුරෙකු හෝ පවුලේ අයෙකු මත්ද්‍රව්‍යවලට ඇබ්බැහිවී ඇති බව දැනගත් විට බැනවැදීම හෝ තරවටු කිරීම ඔවුන්ව තව තවත් ඒ තුළ සඟවා තැබීමට හේතුවේ.',
      '1. සන්සුන් අවස්ථාවක් තෝරාගන්න: ඔහු හෝ ඇය මත්ද්‍රව්‍ය භාවිත කර සිටින හෝ උද්වේගකර අවස්ථාවකදී කතා කිරීමෙන් වළකින්න.',
      '2. චෝදනා නොකර ඔබේ ආදරය හා කනස්සල්ල ප්‍රකාශ කරන්න: "ඔයා ඔක්කොම විනාශ කරනවා" වෙනුවට "ඔයාගේ සෞඛ්‍යය ගැන මට ලොකු බයක් දැනෙනවා, මම ඔයාට උදව් කරන්න කැමතියි" වැනි වදන් භාවිතා කරන්න.',
      '3. සවන්දෙන්න: ඔවුන්ගේ වේදනාවට සහ ගැටලුවලට සාවධානව සවන් දෙන්න.',
      `4. වෘත්තීය සහය වෙත මඟපෙන්වන්න: ඔවුන් සමඟ ${CONTACT_INFO.emergency.drugHelpline.number} අංකයට කතා කිරීමට හෝ මෙල් මැදුර වැනි උපදේශන මධ්‍යස්ථානයකට යාමට උදව් වන්න.`,
    ],
    contentTa: [
      'நெருக்கமான ஒருவர் போதைப்பொருள் பயன்பாட்டால் சிரமப்படுகிறார் என நீங்கள் கவலைப்பட்டால், கோபமாக எதிர்கொள்வது அவரை மேலும் தனிமைப்படுத்தலாம்.',
      '1. அமைதியான, தனிப்பட்ட நேரத்தைத் தேர்ந்தெடுக்கவும். அவர் போதையில் இருக்கும்போது அல்லது கடுமையான விலகல் அறிகுறிகள் இருக்கும்போது பேச வேண்டாம்.',
      '2. குற்றம் சாட்டுவதற்குப் பதிலாக உங்கள் கவலையைச் சொல்லுங்கள். “உங்கள் உடல்நலத்தைப் பற்றி நான் கவலைப்படுகிறேன்” என்று கூறலாம்.',
      '3. அறிவுரை கூறுவதற்கு முன் கவனமாகக் கேளுங்கள். மரியாதையுடனான உரையாடல் ஆதரவை நாட உதவும்.',
      `4. தொழில்முறை உதவியைப் பெறத் துணைபுரியுங்கள். ரகசிய ஆலோசனை எண்ணான ${CONTACT_INFO.emergency.drugHelpline.number} ஐ ஒன்றாக அழைக்கலாம்.`,
    ],
    publishedDate: '2026-11-01',
    author: 'Leo Club Clinical Advisory Team',
    verifiedMedicalReview: true,
  },
  {
    id: 'art-ice-epidemic',
    slug: 'ice-epidemic-in-sri-lanka',
    title: 'The Methamphetamine (ICE) Crisis: What Every University Student and Parent Must Know',
    titleSi: 'ශ්‍රී ලංකාවේ අයිස් (ICE) උවදුර: තරුණයින් සහ දෙමාපියන් අනිවාර්යයෙන්ම දැනගත යුතු කරුණු',
    titleTa: 'இலங்கையில் ஐஸ் போதைப்பொருள்: இளைஞர்களும் பெற்றோரும் அறிய வேண்டியவை',
    category: 'Prevention',
    readTime: '6 min read',
    summary: 'An investigative, medically grounded exploration of why crystalline methamphetamine spreads, its neurotoxic effects, and how to spot danger before irreversible harm.',
    summarySi: 'අයිස් මත්ද්‍රව්‍ය මොළයට සහ ශරීරයට සිදුකරන බිහිසුණු හානිය සහ එයින් ගැලවීමේ විද්‍යාත්මක මාවත.',
    summaryTa: 'ஐஸ் போதைப்பொருளின் உடல்நல ஆபத்துகள், எச்சரிக்கை அறிகுறிகள் மற்றும் உதவி பெறும் வழிகள்.',
    content: [
      'In recent years, Sri Lanka has witnessed a dramatic shift from traditional plant-based substances to synthetic crystalline methamphetamine (ICE). Highly potent and aggressively marketed by trafficking networks, ICE poses unprecedented neurotoxic risks.',
      'Chemically, methamphetamine floods the brain with unprecedented quantities of dopamine—up to ten times greater than natural pleasure rewards. This causes rapid neuroreceptor burnout, leading to rapid psychological dependence.',
      'Physical indicators include rapid weight loss, erratic sleeplessness spanning multiple days, severe dental degradation, and acute paranoid delusions.',
      'Prompt intervention with licensed psychiatric professionals and structured rehabilitation centers (such as NDDCB facilities) is vital. Sustainable recovery is fully achievable with timely, dedicated care.',
    ],
    contentSi: [
      'මෑත වසරවලදී ශ්‍රී ලංකාව තුළ ශීඝ්‍රයෙන් ව්‍යාප්ත වූ අයිස් මත්ද්‍රව්‍යය, මොළයේ ස්නායු සෛලවලට ක්ෂණික සහ බරපතල හානි පමුණුවයි.',
      'එය භාවිතයෙන් පසු මොළයේ ඩොපමින් හෝමෝනය අසාමාන්‍ය ලෙස ඉහළ දමන අතර, භාවිතය නැවැත්වූ විගස දරුණු මානසික අවපීඩනයක් ඇතිවේ.',
      'නොනිදා සිටීම, ශරීරය කෙට්ටුවීම, අස්වාභාවික සැකය සහ දත් දිරායාම මෙහි ප්‍රධාන ලක්ෂණ වේ.',
      'කලින් හඳුනාගෙන වෛද්‍ය සහ පුනරුත්ථාපන සහය ලබාගැනීමෙන් මෙම උවදුරෙන් සම්පූර්ණයෙන්ම සුවය ලැබිය හැකිය.',
    ],
    contentTa: [
      'ஐஸ் எனப்படும் மெத்தாம்பெட்டமைன் மூளையையும் உடலையும் கடுமையாகப் பாதிக்கக்கூடிய ஒரு தூண்டூட்டும் போதைப்பொருள்.',
      'இது மூளையின் வெகுமதி அமைப்பை பாதித்து, விரைவான சார்புநிலையையும் மனநலப் பிரச்சினைகளையும் ஏற்படுத்தலாம்.',
      'தூக்கமின்மை, எடை குறைதல், கடுமையான சந்தேக உணர்வு மற்றும் பற்கள் சேதமடைதல் ஆகியவை கவனிக்க வேண்டிய அறிகுறிகள்.',
      'தகுதியுள்ள மருத்துவ நிபுணர் மற்றும் மறுவாழ்வு சேவையின் உதவியை விரைவாக நாடுங்கள். சரியான பராமரிப்புடன் மீட்பு சாத்தியமாகும்.',
    ],
    publishedDate: '2026-10-25',
    author: 'Medical & Public Health Working Group',
    verifiedMedicalReview: true,
  },
  {
    id: 'art-withdrawal-science',
    slug: 'the-science-of-withdrawal',
    title: 'The Physiology of Withdrawal: Why Medical Supervision is Essential for Alcohol & Sedatives',
    titleSi: 'විෂහරණයේ විද්‍යාත්මක පසුබිම: මත්පැන් හා නිදිපෙති නවත්වන විට වෛද්‍ය අධීක්ෂණය අත්‍යවශ්‍ය වන්නේ ඇයි?',
    titleTa: 'மதுபானம் அல்லது மயக்க மருந்துகளை நிறுத்தும்போது மருத்துவக் கண்காணிப்பு ஏன் அவசியம்?',
    category: 'Clinical Science',
    readTime: '7 min read',
    summary: 'Understand the biological mechanisms of chemical dependency, why abrupt cessation can cause fatal seizures, and how safe medical detoxification works.',
    summarySi: 'අධිකව මත්පැන් බොන්නන් එකවර නැවැත්වීමේදී ඇතිවන මාරාන්තික වලිප්පුව සහ ආරක්ෂිත රෝහල් ප්‍රතිකාර.',
    summaryTa: 'சில பொருட்களைத் திடீரென நிறுத்துவதால் ஏற்படக்கூடிய ஆபத்துகளையும் மருத்துவ உதவியின் முக்கியத்துவத்தையும் அறியுங்கள்.',
    content: [
      'A dangerous misconception persists that stopping all substance intake immediately ("cold turkey") on one’s own is the bravest and most effective path. For certain substances, this myth can be lethal.',
      'Chronic alcohol and benzodiazepine exposure causes neuroadaptation: the brain depresses GABA inhibitory signaling and upregulates excitatory glutamate pathways to function under sedation.',
      'When the substance is abruptly removed, the brain undergoes severe glutamate hyperexcitability. This causes tremors, hypertension, Delirium Tremens (DTs), and generalized grand mal seizures that can be fatal without inpatient medical stabilization.',
      'In a hospital setting, physicians administer tapering doses of long-acting sedatives, hydration, and vitamin B (thiamine) to protect the brain, allowing a safe and comfortable transition to rehabilitation.',
    ],
    contentSi: [
      'මත්පැන් හෝ නිදිපෙති වෛද්‍ය උපදෙස් නොමැතිව එකවර නැවැත්වීම ජීවිතයට මාරාන්තික විය හැක.',
      'නිරන්තර භාවිතය නිසා මොළයේ ස්නායු සමතුලිතතාවය වෙනස්වන බැවින්, හදිසියේ නැවැත්වීමේදී වලිප්පුව සහ සිහිවිකල්වීම ඇතිවිය හැක.',
      'රෝහල් විෂහරණ ඒකකයකදී (Hospital Detox Unit) වෛද්‍යවරුන් විසින් සුදුසු ඖෂධ මඟින් මෙම අතුරු ආබාධ පාලනය කර ආරක්ෂිතව සුවපත් කරයි.',
    ],
    contentTa: [
      'மதுபானம் அல்லது சில மயக்க மருந்துகளை மருத்துவ ஆலோசனையின்றி திடீரென நிறுத்துவது உயிருக்கு ஆபத்தாக இருக்கலாம்.',
      'நீண்டகாலப் பயன்பாடு மூளையின் செயல்பாட்டை மாற்றுகிறது. திடீரென நிறுத்தினால் நடுக்கம், குழப்பம் அல்லது வலிப்பு ஏற்படலாம்.',
      'இந்த அறிகுறிகள் கடுமையாக இருக்கலாம். ஆபத்தான விலகல் அறிகுறிகள் தோன்றினால் உடனடியாக மருத்துவ உதவியை நாடுங்கள்.',
      'மருத்துவர்கள் கண்காணிப்பில் பொருத்தமான சிகிச்சை அளித்து, பாதுகாப்பான முறையில் மீட்பு சேவைகளுக்குச் செல்ல உதவுவர்.',
    ],
    publishedDate: '2026-10-18',
    author: 'Addiction Medicine Consultant Review',
    verifiedMedicalReview: true,
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Is it safe for someone with severe long-term daily alcohol dependence to stop completely cold-turkey without medical supervision?',
    questionSi: 'දීර්ඝ කාලයක් දිනපතා අධිකව මත්පැන් පානය කරන අයෙකුට කිසිදු වෛද්‍ය උපදෙසක් නොමැතිව එකවරම නැවැත්වීම ආරක්ෂිතද?',
    questionTa: 'நீண்டகாலமாக தினமும் அதிகமாக மதுபானம் பயன்படுத்தும் ஒருவர் மருத்துவக் கண்காணிப்பின்றி திடீரென நிறுத்துவது பாதுகாப்பானதா?',
    options: [
      { text: 'Yes, sheer willpower is always the safest method.', textSi: 'ඔව්, අධිෂ්ඨානය තිබේ නම් එය වඩාත්ම ආරක්ෂිතය.', textTa: 'ஆம், மனவலிமை மட்டுமே எப்போதும் பாதுகாப்பான வழி.', isCorrect: false },
      { text: 'No, abrupt alcohol withdrawal can trigger life-threatening seizures and Delirium Tremens.', textSi: 'නැත, හදිසියේ නැවැත්වීමෙන් මාරාන්තික වලිප්පුව සහ Delirium Tremens ඇතිවිය හැක.', textTa: 'இல்லை. திடீரென நிறுத்துவது உயிருக்கு ஆபத்தான வலிப்பையும் கடுமையான குழப்பநிலையையும் ஏற்படுத்தலாம்.', isCorrect: true },
      { text: 'Yes, withdrawal only lasts 1 hour and has no physical risks.', textSi: 'ඔව්, එහි කිසිදු ශාරීරික අවදානමක් නොමැත.', textTa: 'ஆம், விலகல் ஒரு மணி நேரம் மட்டுமே நீடிக்கும்; உடல் ஆபத்து இல்லை.', isCorrect: false },
    ],
    explanation: 'Chronic alcohol suppresses brain excitability; abrupt cessation causes a hyper-adrenergic storm and potentially fatal seizures. Medical inpatient detoxification is required.',
    explanationSi: 'අධික මත්පැන් පානය කළ අයෙකු එකවර නැවැත්වූ විට මොළයේ ස්නායු අධික ලෙස උද්දීපනය වී වලිප්පුව සහ මරණය පවා සිදුවිය හැකිය.',
    explanationTa: 'நீண்டகால மதுபானப் பயன்பாட்டைத் திடீரென நிறுத்துவது மூளையின் செயல்பாட்டை மிகையாகத் தூண்டி வலிப்பையும் உயிருக்கு ஆபத்தையும் ஏற்படுத்தலாம். மருத்துவக் கண்காணிப்பில் சிகிச்சை பெறுவது அவசியம்.',
    citation: 'WHO Management of Substance Abuse & British Medical Journal (BMJ), 2023.',
    citationSi: 'ලෝක සෞඛ්‍ය සංවිධානයේ මත්ද්‍රව්‍ය භාවිතය කළමනාකරණ මාර්ගෝපදේශ සහ බ්‍රිතාන්‍ය වෛද්‍ය සඟරාව, 2023.',
    citationTa: 'உலக சுகாதார அமைப்பின் போதைப்பொருள் பயன்பாட்டு மேலாண்மை வழிகாட்டுதல்கள் மற்றும் பிரிட்டிஷ் மருத்துவ இதழ், 2023.',
  },
  {
    id: 'q2',
    question: 'What is the official toll-free hotline of Sri Lanka’s National Dangerous Drugs Control Board (NDDCB) for free, confidential guidance?',
    questionSi: 'ශ්‍රී ලංකාවේ අන්තරායකර ඖෂධ පාලක ජාතික මණ්ඩලයේ (NDDCB) නොමිලේ උපදේශනය සපයන නිල හදිසි අංකය කුමක්ද?',
    questionTa: 'இலங்கையில் இலவசமான ரகசிய போதைப்பொருள் ஆலோசனைக்கான அதிகாரப்பூர்வ உதவி எண் எது?',
    options: [
      { text: CONTACT_INFO.emergency.police.number, textSi: CONTACT_INFO.emergency.police.number, textTa: CONTACT_INFO.emergency.police.number, isCorrect: false },
      { text: CONTACT_INFO.emergency.drugHelpline.number, textSi: CONTACT_INFO.emergency.drugHelpline.number, textTa: CONTACT_INFO.emergency.drugHelpline.number, isCorrect: true },
      { text: CONTACT_INFO.emergency.ambulance.number, textSi: CONTACT_INFO.emergency.ambulance.number, textTa: CONTACT_INFO.emergency.ambulance.number, isCorrect: false },
      { text: '100', textSi: '100', textTa: '100', isCorrect: false },
    ],
    explanation: `${CONTACT_INFO.emergency.drugHelpline.number} is the NDDCB dedicated confidential hotline. ${CONTACT_INFO.emergency.ambulance.number} is for emergency ambulance dispatch, and ${CONTACT_INFO.emergency.police.number} is for police.`,
    explanationSi: `${CONTACT_INFO.emergency.drugHelpline.number} යනු NDDCB මත්ද්‍රව්‍ය නිවාරණ සහ උපදේශන ක්ෂණික දුරකථන අංකයයි. ${CONTACT_INFO.emergency.ambulance.number} යනු සුවසැරිය ගිලන්රථ සේවයයි.`,
    explanationTa: `${CONTACT_INFO.emergency.drugHelpline.number} என்பது ரகசிய போதைப்பொருள் ஆலோசனைக்கான எண். ${CONTACT_INFO.emergency.ambulance.number} என்பது அவசர ஊர்தி சேவை; ${CONTACT_INFO.emergency.police.number} என்பது காவல்துறை அவசர எண்.`,
    citation: 'National Dangerous Drugs Control Board Sri Lanka.',
    citationSi: 'ශ්‍රී ලංකා අන්තරායකර ඖෂධ පාලක ජාතික මණ්ඩලය.',
    citationTa: 'இலங்கை தேசிய அபாயகரமான போதைப்பொருள் கட்டுப்பாட்டு வாரியம்.',
  },
  {
    id: 'q3',
    question: 'Can someone use the Beyond the Darkness AI Assistant without sharing their real name or phone number?',
    questionSi: 'Beyond the Darkness AI සහයකයා භාවිතා කිරීමේදී ඔබගේ නම හෝ දුරකථන අංකය ලබාදීම අනිවාර්යද?',
    questionTa: 'இந்த உதவிச் சேவையைப் பயன்படுத்த உங்கள் பெயர் அல்லது தொலைபேசி எண்ணைப் பகிர வேண்டுமா?',
    options: [
      { text: 'No, your national identity card is required to open the website.', textSi: 'ඔව්, ජාතික හැඳුනුම්පත් අංකය ලබාදිය යුතුය.', textTa: 'இல்லை, இணையதளத்தைத் திறக்க அடையாள அட்டை அவசியம்.', isCorrect: false },
      { text: 'Yes, full anonymous browsing and educational AI chat are completely preserved.', textSi: 'නැත, කිසිදු පෞද්ගලික තොරතුරක් නොමැතිව නිර්නාමිකව ආරක්ෂිතව තොරතුරු ලබාගත හැක.', textTa: 'ஆம், தனிப்பட்ட விவரங்களை வழங்காமல் தகவல்களைப் பார்வையிடவும் கல்வி வழிகாட்டுதலைப் பெறவும் முடியும்.', isCorrect: true },
      { text: 'Only if you register with a credit card.', textSi: 'ක්‍රෙඩිට් කාඩ් පතක් ලබාදිය යුතුය.', textTa: 'கடன் அட்டையுடன் பதிவு செய்தால் மட்டுமே முடியும்.', isCorrect: false },
    ],
    explanation: 'Beyond the Darkness is designed with a strict privacy-first architecture. General education and AI guidance require zero personal identifiers.',
    explanationSi: 'මෙම වේදිකාව පරිශීලකයාගේ රහස්‍යභාවය සුරැකෙන පරිදි නිර්මාණය කර ඇති බැවින් නිර්නාමිකව භාවිතා කළ හැකිය.',
    explanationTa: 'இந்தத் தளம் தனியுரிமையை முன்னிலைப்படுத்துகிறது. பொதுவான கல்வித் தகவல்களைப் பார்வையிட தனிப்பட்ட அடையாள விவரங்கள் தேவையில்லை.',
    citation: 'Beyond the Darkness Privacy & Safeguarding Policy, Section 14.',
    citationSi: 'බියෙන් ඔබ්බට පෞද්ගලිකත්ව හා ආරක්ෂණ ප්‍රතිපත්තියේ 14 වන කොටස.',
    citationTa: 'இருளுக்கு அப்பால் தனியுரிமை மற்றும் பாதுகாப்புக் கொள்கையின் 14ஆம் பிரிவு.',
  },
  {
    id: 'q4',
    question: `Which of the following is an emergency sign of an acute opioid (heroin) overdose requiring immediate ${CONTACT_INFO.emergency.ambulance.number} ambulance dispatch?`,
    questionSi: `හෙරොයින් අධිමාත්‍රාවක් ශරීරගත වූ විට (Overdose) වහාම ${CONTACT_INFO.emergency.ambulance.number} ගිලන්රථය ඇමතිය යුතු හදිසි අනතුරු ඇඟවීමේ ලක්ෂණය කුමක්ද?`,
    questionTa: `ஹெரோயின் மிகைமருந்து உட்கொள்ளலில் உடனே ${CONTACT_INFO.emergency.ambulance.number} அவசர ஊர்தியை அழைக்க வேண்டிய அறிகுறி எது?`,
    options: [
      { text: 'Extremely slow or stopped breathing, blue lips, and unresponsiveness.', textSi: 'හුස්ම ගැනීම අතිශය මන්දගාමී වීම, තොල් නිල් පැහැවීම සහ සිහිසුන් වීම.', textTa: 'மிக மெதுவாக அல்லது சுவாசிக்காமல் இருப்பது, உதடுகள் நீலமாதல், பதிலளிக்காமை.', isCorrect: true },
      { text: 'Mild headache after eating food.', textSi: 'කෑම ගැනීමෙන් පසු ඇතිවන සුළු හිසරදය.', textTa: 'உணவுக்குப் பிறகு ஏற்படும் லேசான தலைவலி.', isCorrect: false },
      { text: 'Drinking three cups of water.', textSi: 'වතුර කෝප්ප 3ක් බීම.', textTa: 'மூன்று குவளை தண்ணீர் குடித்தல்.', isCorrect: false },
    ],
    explanation: 'Opioids depress the respiratory center of the brainstem. Respiratory failure and cyanosis (blueness around mouth/nails) indicate imminent death without emergency resuscitation.',
    explanationSi: 'ඔපියොයිඩ් මගින් මොළයේ ශ්වසන මධ්‍යස්ථානය අඩපණ කරන බැවින් හුස්ම ගැනීම නතරවීම සහ සිරුර නිල්වීම ක්ෂණික වෛද්‍ය ප්‍රතිකාර අවශ්‍ය මාරාන්තික තත්ත්වයකි.',
    explanationTa: 'சில போதைப்பொருட்கள் மூளையின் சுவாசக் கட்டுப்பாட்டைத் தளர்த்துகின்றன. சுவாசம் நின்றுவிடுதல் அல்லது உடல் நீலமாதல் உயிருக்கு ஆபத்தானது; உடனடி மருத்துவ உதவி தேவை.',
    citation: 'World Health Organization (WHO) Opioid Overdose Management Guidelines.',
    citationSi: 'ලෝක සෞඛ්‍ය සංවිධානයේ ඔපියොයිඩ් අධිමාත්‍රා කළමනාකරණ මාර්ගෝපදේශ.',
    citationTa: 'உலக சுகாதார அமைப்பின் ஓபியாய்டு மிகைமருந்து மேலாண்மை வழிகாட்டுதல்கள்.',
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'confidentiality',
    question: 'Is my conversation with the Beyond the Darkness AI Assistant confidential?',
    questionSi: 'AI සහයකයා සමඟ මා කරන සංවාදය රහසිගතද?',
    questionTa: 'உதவியாளருடனான எனது உரையாடல் ரகசியமானதா?',
    answer: 'The AI Assistant is an educational tool, not a confidential clinical service. Messages may be processed by the platform and its configured AI provider to generate a response. Avoid sharing your name, contact details, exact location, or other identifying or sensitive health information. Review the Privacy Policy for current data-handling details.',
    answerSi: 'AI සහයකයා අධ්‍යාපනික මෙවලමක් පමණක් වන අතර රහස්‍ය වෛද්‍ය හෝ උපදේශන සේවාවක් නොවේ. පිළිතුරක් ලබාදීමට ඔබේ පණිවිඩ පද්ධතිය සහ එහි වින්‍යාස කර ඇති AI සේවා සපයන්නා මඟින් සැකසිය හැක. ඔබේ නම, දුරකථන අංකය, නිශ්චිත ස්ථානය හෝ හඳුනාගත හැකි සංවේදී සෞඛ්‍ය තොරතුරු ඇතුළත් නොකරන්න. දත්ත භාවිතය පිළිබඳ විස්තර සඳහා රහස්‍යතා ප්‍රතිපත්තිය කියවන්න.',
    answerTa: 'இந்த உதவியாளர் கல்விக்கான கருவி மட்டுமே; ரகசிய மருத்துவ அல்லது ஆலோசனைச் சேவை அல்ல. பதில் உருவாக்க உங்கள் செய்திகள் தளத்தாலும் அது பயன்படுத்தும் சேவை வழங்குநராலும் செயலாக்கப்படலாம். உங்கள் பெயர், தொடர்பு விவரம், துல்லியமான இடம் அல்லது உங்களை அடையாளம் காணக்கூடிய உடல்நலத் தகவல்களைப் பகிர வேண்டாம். தரவு கையாளுதல் விவரங்களுக்கு தனியுரிமைக் கொள்கையைப் படிக்கவும்.',
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Does the AI Assistant provide medical diagnosis or prescribe medication?',
    questionSi: 'AI සහයකයා මඟින් රෝග විනිශ්චයක් හෝ ඖෂධ නිර්දේශ කිරීමක් සිදුකරන්නේද?',
    questionTa: 'உதவியாளர் நோயறிதல் செய்கிறாரா அல்லது மருந்து பரிந்துரைக்கிறாரா?',
    answer: 'No. The AI Assistant does not diagnose, prescribe medicines, or create personal detox plans. Use the support directory to contact a service directly; availability and suitability must be confirmed with that provider.',
    answerSi: 'නැත. AI සහයකයා රෝග විනිශ්චය කිරීම, ඖෂධ නියම කිරීම හෝ පුද්ගලික විෂහරණ සැලසුම් සකස් කිරීම සිදු නොකරයි. සේවාවක් සම්බන්ධ කරගැනීමට සහාය නාමාවලිය භාවිතා කර එම ආයතනයෙන්ම ලබාගත හැකි සේවා සහ සුදුසුකම තහවුරු කරගන්න.',
    answerTa: 'இல்லை. இந்த உதவியாளர் நோயறிதல் செய்யவோ மருந்து வழங்கவோ தனிப்பட்ட நச்சுநீக்கத் திட்டம் அமைக்கவோ மாட்டார். சேவையை நேரடியாகத் தொடர்புகொண்டு அதன் கிடைப்பையும் பொருத்தத்தையும் உறுதிப்படுத்த ஆதரவு மையப் பட்டியலைப் பயன்படுத்தவும்.',
  },
  {
    id: 'faq-3',
    category: 'services',
    question: 'Are government rehabilitation and treatment centers in Sri Lanka free?',
    questionSi: 'ශ්‍රී ලංකාවේ රජයේ පුනරුත්ථාපන මධ්‍යස්ථාන නොමිලේ ක්‍රියාත්මක වන්නේද?',
    questionTa: 'இலங்கையில் அரச மறுவாழ்வு மையங்கள் இலவசமாகச் செயல்படுகின்றனவா?',
    answer: 'Costs, eligibility, and services vary by facility and may change. Contact the specific government or non-profit provider to confirm current fees, admission criteria, and available care before travelling.',
    answerSi: 'ගාස්තු, සුදුසුකම් සහ සේවා එක් එක් මධ්‍යස්ථානය අනුව වෙනස් වන අතර කාලයත් සමඟ වෙනස් විය හැක. යාමට පෙර වත්මන් ගාස්තු, ඇතුළත් වීමේ කොන්දේසි සහ ලබාගත හැකි සේවා සෘජුවම අදාළ රජයේ හෝ ලාභ නොලබන ආයතනයෙන් තහවුරු කරගන්න.',
    answerTa: 'கட்டணம், தகுதி மற்றும் சேவைகள் மையத்துக்கு மையம் மாறுபடும்; காலத்திற்கேற்பவும் மாறலாம். செல்லும்முன் தற்போதைய கட்டணம், சேர்க்கை விதிமுறைகள் மற்றும் கிடைக்கும் சேவைகளை அந்த அரச அல்லது இலாப நோக்கமற்ற நிறுவனத்திடம் உறுதிப்படுத்தவும்.',
  },
  {
    id: 'faq-4',
    category: 'general',
    question: 'What is the role of the Leo Club of University of Sri Jayewardenepura in this initiative?',
    questionSi: 'මෙම වැඩසටහන තුළ ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලයීය ලියෝ සමාජයේ කාර්යභාරය කුමක්ද?',
    questionTa: 'இந்த முயற்சியில் ஸ்ரீ ஜயவர்தனபுர பல்கலைக்கழக லியோ கழகத்தின் பங்கு என்ன?',
    answer: 'The Leo Club of University of Sri Jayewardenepura (Lions International, Leo District 306 D2) is the organizing body leading the "Beyond the Darkness – අඳුරෙන් එළියට" initiative. The club leads digital innovation, community prevention campaigns, youth workshops, and bridge-building between vulnerable communities and certified professional healthcare systems.',
    answerSi: 'ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලයීය ලියෝ සමාජය (ලියෝ දිස්ත්‍රික් 306 D2) විසින් තරුණ ප්‍රජාව මත්ද්‍රව්‍ය උවදුරෙන් මුදවාගැනීම සඳහා තාක්ෂණය, දැනුවත්භාවය සහ වෘත්තීය සෞඛ්‍ය සේවාවන් ඒකාබද්ධ කරමින් මෙම වැඩසටහන මෙහෙයවනු ලබයි.',
    answerTa: 'ஸ்ரீ ஜயவர்தனபுர பல்கலைக்கழக லியோ கழகம் இந்த முயற்சியை வழிநடத்துகிறது. இளைஞர்களுக்கான தடுப்பு விழிப்புணர்வு, சமூக நிகழ்ச்சிகள் மற்றும் தகுதியான சுகாதாரச் சேவைகளுடன் இணைக்கும் பணிகளை இது ஒருங்கிணைக்கிறது.',
  },
];
