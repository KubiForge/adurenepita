import { CONTACT_INFO } from '../config/contactInfo';

export interface Article {
  id: string;
  slug: string;
  title: string;
  titleSi: string;
  category: 'Prevention' | 'Family & Friends' | 'Clinical Science' | 'Recovery';
  readTime: string;
  summary: string;
  summarySi: string;
  content: string[];
  contentSi: string[];
  publishedDate: string;
  author: string;
  verifiedMedicalReview: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionSi: string;
  options: {
    text: string;
    textSi: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationSi: string;
  citation: string;
}

export interface FaqItem {
  id: string;
  question: string;
  questionSi: string;
  answer: string;
  answerSi: string;
  category: 'general' | 'confidentiality' | 'services' | 'ai';
}

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-talk-to-friend',
    slug: 'how-to-talk-to-a-friend',
    title: 'How to Talk to a Friend or Sibling You Are Worried About: A Compassionate Guide',
    titleSi: 'මත්ද්‍රව්‍යවලට යොමුවී ඇති මිතුරෙකු හෝ පවුලේ සාමාජිකයෙකු සමඟ කතා කරන්නේ කෙසේද?',
    category: 'Family & Friends',
    readTime: '5 min read',
    summary: 'Discover non-confrontational, evidence-informed communication techniques that preserve dignity and foster openness instead of triggering defensiveness.',
    summarySi: 'චෝදනා කිරීමෙන් හෝ බියවැද්දීමෙන් තොරව, කරුණාවෙන් සහ ගෞරවයෙන් යුතුව ඔවුන්ට සහයෝගය ලබාදිය හැකි මනෝවිද්‍යාත්මක ක්‍රම.',
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
    publishedDate: '2026-11-01',
    author: 'Leo Club Clinical Advisory Team',
    verifiedMedicalReview: true,
  },
  {
    id: 'art-ice-epidemic',
    slug: 'ice-epidemic-in-sri-lanka',
    title: 'The Methamphetamine (ICE) Crisis: What Every University Student and Parent Must Know',
    titleSi: 'ශ්‍රී ලංකාවේ අයිස් (ICE) උවදුර: තරුණයින් සහ දෙමාපියන් අනිවාර්යයෙන්ම දැනගත යුතු කරුණු',
    category: 'Prevention',
    readTime: '6 min read',
    summary: 'An investigative, medically grounded exploration of why crystalline methamphetamine spreads, its neurotoxic effects, and how to spot danger before irreversible harm.',
    summarySi: 'අයිස් මත්ද්‍රව්‍ය මොළයට සහ ශරීරයට සිදුකරන බිහිසුණු හානිය සහ එයින් ගැලවීමේ විද්‍යාත්මක මාවත.',
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
    publishedDate: '2026-10-25',
    author: 'Medical & Public Health Working Group',
    verifiedMedicalReview: true,
  },
  {
    id: 'art-withdrawal-science',
    slug: 'the-science-of-withdrawal',
    title: 'The Physiology of Withdrawal: Why Medical Supervision is Essential for Alcohol & Sedatives',
    titleSi: 'විෂහරණයේ විද්‍යාත්මක පසුබිම: මත්පැන් හා නිදිපෙති නවත්වන විට වෛද්‍ය අධීක්ෂණය අත්‍යවශ්‍ය වන්නේ ඇයි?',
    category: 'Clinical Science',
    readTime: '7 min read',
    summary: 'Understand the biological mechanisms of chemical dependency, why abrupt cessation can cause fatal seizures, and how safe medical detoxification works.',
    summarySi: 'අධිකව මත්පැන් බොන්නන් එකවර නැවැත්වීමේදී ඇතිවන මාරාන්තික වලිප්පුව සහ ආරක්ෂිත රෝහල් ප්‍රතිකාර.',
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
    options: [
      { text: 'Yes, sheer willpower is always the safest method.', textSi: 'ඔව්, අධිෂ්ඨානය තිබේ නම් එය වඩාත්ම ආරක්ෂිතය.', isCorrect: false },
      { text: 'No, abrupt alcohol withdrawal can trigger life-threatening seizures and Delirium Tremens.', textSi: 'නැත, හදිසියේ නැවැත්වීමෙන් මාරාන්තික වලිප්පුව සහ Delirium Tremens ඇතිවිය හැක.', isCorrect: true },
      { text: 'Yes, withdrawal only lasts 1 hour and has no physical risks.', textSi: 'ඔව්, එහි කිසිදු ශාරීරික අවදානමක් නොමැත.', isCorrect: false },
    ],
    explanation: 'Chronic alcohol suppresses brain excitability; abrupt cessation causes a hyper-adrenergic storm and potentially fatal seizures. Medical inpatient detoxification is required.',
    explanationSi: 'අධික මත්පැන් පානය කළ අයෙකු එකවර නැවැත්වූ විට මොළයේ ස්නායු අධික ලෙස උද්දීපනය වී වලිප්පුව සහ මරණය පවා සිදුවිය හැකිය.',
    citation: 'WHO Management of Substance Abuse & British Medical Journal (BMJ), 2023.',
  },
  {
    id: 'q2',
    question: 'What is the official toll-free hotline of Sri Lanka’s National Dangerous Drugs Control Board (NDDCB) for free, confidential guidance?',
    questionSi: 'ශ්‍රී ලංකාවේ අන්තරායකර ඖෂධ පාලක ජාතික මණ්ඩලයේ (NDDCB) නොමිලේ උපදේශනය සපයන නිල හදිසි අංකය කුමක්ද?',
    options: [
      { text: CONTACT_INFO.emergency.police.number, textSi: CONTACT_INFO.emergency.police.number, isCorrect: false },
      { text: CONTACT_INFO.emergency.drugHelpline.number, textSi: CONTACT_INFO.emergency.drugHelpline.number, isCorrect: true },
      { text: CONTACT_INFO.emergency.ambulance.number, textSi: CONTACT_INFO.emergency.ambulance.number, isCorrect: false },
      { text: '100', textSi: '100', isCorrect: false },
    ],
    explanation: `${CONTACT_INFO.emergency.drugHelpline.number} is the NDDCB dedicated confidential hotline. ${CONTACT_INFO.emergency.ambulance.number} is for emergency ambulance dispatch, and ${CONTACT_INFO.emergency.police.number} is for police.`,
    explanationSi: `${CONTACT_INFO.emergency.drugHelpline.number} යනු NDDCB මත්ද්‍රව්‍ය නිවාරණ සහ උපදේශන ක්ෂණික දුරකථන අංකයයි. ${CONTACT_INFO.emergency.ambulance.number} යනු සුවසැරිය ගිලන්රථ සේවයයි.`,
    citation: 'National Dangerous Drugs Control Board Sri Lanka.',
  },
  {
    id: 'q3',
    question: 'Can someone use the Beyond the Darkness AI Assistant without sharing their real name or phone number?',
    questionSi: 'Beyond the Darkness AI සහයකයා භාවිතා කිරීමේදී ඔබගේ නම හෝ දුරකථන අංකය ලබාදීම අනිවාර්යද?',
    options: [
      { text: 'No, your national identity card is required to open the website.', textSi: 'ඔව්, ජාතික හැඳුනුම්පත් අංකය ලබාදිය යුතුය.', isCorrect: false },
      { text: 'Yes, full anonymous browsing and educational AI chat are completely preserved.', textSi: 'නැත, කිසිදු පෞද්ගලික තොරතුරක් නොමැතිව නිර්නාමිකව ආරක්ෂිතව තොරතුරු ලබාගත හැක.', isCorrect: true },
      { text: 'Only if you register with a credit card.', textSi: 'ක්‍රෙඩිට් කාඩ් පතක් ලබාදිය යුතුය.', isCorrect: false },
    ],
    explanation: 'Beyond the Darkness is designed with a strict privacy-first architecture. General education and AI guidance require zero personal identifiers.',
    explanationSi: 'මෙම වේදිකාව පරිශීලකයාගේ රහස්‍යභාවය සුරැකෙන පරිදි නිර්මාණය කර ඇති බැවින් නිර්නාමිකව භාවිතා කළ හැකිය.',
    citation: 'Beyond the Darkness Privacy & Safeguarding Policy, Section 14.',
  },
  {
    id: 'q4',
    question: `Which of the following is an emergency sign of an acute opioid (heroin) overdose requiring immediate ${CONTACT_INFO.emergency.ambulance.number} ambulance dispatch?`,
    questionSi: `හෙරොයින් අධිමාත්‍රාවක් ශරීරගත වූ විට (Overdose) වහාම ${CONTACT_INFO.emergency.ambulance.number} ගිලන්රථය ඇමතිය යුතු හදිසි අනතුරු ඇඟවීමේ ලක්ෂණය කුමක්ද?`,
    options: [
      { text: 'Extremely slow or stopped breathing, blue lips, and unresponsiveness.', textSi: 'හුස්ම ගැනීම අතිශය මන්දගාමී වීම, තොල් නිල් පැහැවීම සහ සිහිසුන් වීම.', isCorrect: true },
      { text: 'Mild headache after eating food.', textSi: 'කෑම ගැනීමෙන් පසු ඇතිවන සුළු හිසරදය.', isCorrect: false },
      { text: 'Drinking three cups of water.', textSi: 'වතුර කෝප්ප 3ක් බීම.', isCorrect: false },
    ],
    explanation: 'Opioids depress the respiratory center of the brainstem. Respiratory failure and cyanosis (blueness around mouth/nails) indicate imminent death without emergency resuscitation.',
    explanationSi: 'ඔපියොයිඩ් මගින් මොළයේ ශ්වසන මධ්‍යස්ථානය අඩපණ කරන බැවින් හුස්ම ගැනීම නතරවීම සහ සිරුර නිල්වීම ක්ෂණික වෛද්‍ය ප්‍රතිකාර අවශ්‍ය මාරාන්තික තත්ත්වයකි.',
    citation: 'World Health Organization (WHO) Opioid Overdose Management Guidelines.',
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'confidentiality',
    question: 'Is my conversation with the Beyond the Darkness AI Assistant confidential?',
    questionSi: 'AI සහයකයා සමඟ මා කරන සංවාදය රහසිගතද?',
    answer: 'The AI Assistant is an educational tool, not a confidential clinical service. Messages may be processed by the platform and its configured AI provider to generate a response. Avoid sharing your name, contact details, exact location, or other identifying or sensitive health information. Review the Privacy Policy for current data-handling details.',
    answerSi: 'AI සහයකයා අධ්‍යාපනික මෙවලමක් පමණක් වන අතර රහස්‍ය වෛද්‍ය හෝ උපදේශන සේවාවක් නොවේ. පිළිතුරක් ලබාදීමට ඔබේ පණිවිඩ පද්ධතිය සහ එහි වින්‍යාස කර ඇති AI සේවා සපයන්නා මඟින් සැකසිය හැක. ඔබේ නම, දුරකථන අංකය, නිශ්චිත ස්ථානය හෝ හඳුනාගත හැකි සංවේදී සෞඛ්‍ය තොරතුරු ඇතුළත් නොකරන්න. දත්ත භාවිතය පිළිබඳ විස්තර සඳහා රහස්‍යතා ප්‍රතිපත්තිය කියවන්න.',
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Does the AI Assistant provide medical diagnosis or prescribe medication?',
    questionSi: 'AI සහයකයා මඟින් රෝග විනිශ්චයක් හෝ ඖෂධ නිර්දේශ කිරීමක් සිදුකරන්නේද?',
    answer: 'No. The AI Assistant does not diagnose, prescribe medicines, or create personal detox plans. Use the support directory to contact a service directly; availability and suitability must be confirmed with that provider.',
    answerSi: 'නැත. AI සහයකයා රෝග විනිශ්චය කිරීම, ඖෂධ නියම කිරීම හෝ පුද්ගලික විෂහරණ සැලසුම් සකස් කිරීම සිදු නොකරයි. සේවාවක් සම්බන්ධ කරගැනීමට සහාය නාමාවලිය භාවිතා කර එම ආයතනයෙන්ම ලබාගත හැකි සේවා සහ සුදුසුකම තහවුරු කරගන්න.',
  },
  {
    id: 'faq-3',
    category: 'services',
    question: 'Are government rehabilitation and treatment centers in Sri Lanka free?',
    questionSi: 'ශ්‍රී ලංකාවේ රජයේ පුනරුත්ථාපන මධ්‍යස්ථාන නොමිලේ ක්‍රියාත්මක වන්නේද?',
    answer: 'Costs, eligibility, and services vary by facility and may change. Contact the specific government or non-profit provider to confirm current fees, admission criteria, and available care before travelling.',
    answerSi: 'ගාස්තු, සුදුසුකම් සහ සේවා එක් එක් මධ්‍යස්ථානය අනුව වෙනස් වන අතර කාලයත් සමඟ වෙනස් විය හැක. යාමට පෙර වත්මන් ගාස්තු, ඇතුළත් වීමේ කොන්දේසි සහ ලබාගත හැකි සේවා සෘජුවම අදාළ රජයේ හෝ ලාභ නොලබන ආයතනයෙන් තහවුරු කරගන්න.',
  },
  {
    id: 'faq-4',
    category: 'general',
    question: 'What is the role of the Leo Club of University of Sri Jayewardenepura in this initiative?',
    questionSi: 'මෙම වැඩසටහන තුළ ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලයීය ලියෝ සමාජයේ කාර්යභාරය කුමක්ද?',
    answer: 'The Leo Club of University of Sri Jayewardenepura (Lions International, Leo District 306 D2) is the organizing body leading the "Beyond the Darkness – අඳුරෙන් එළියට" initiative. The club leads digital innovation, community prevention campaigns, youth workshops, and bridge-building between vulnerable communities and certified professional healthcare systems.',
    answerSi: 'ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලයීය ලියෝ සමාජය (ලියෝ දිස්ත්‍රික් 306 D2) විසින් තරුණ ප්‍රජාව මත්ද්‍රව්‍ය උවදුරෙන් මුදවාගැනීම සඳහා තාක්ෂණය, දැනුවත්භාවය සහ වෘත්තීය සෞඛ්‍ය සේවාවන් ඒකාබද්ධ කරමින් මෙම වැඩසටහන මෙහෙයවනු ලබයි.',
  },
];
