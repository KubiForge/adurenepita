import { EmergencyGuidance } from '../types/chat';

export interface EmergencyDetectionResult {
  isEmergency: boolean;
  level: 1 | 2 | 3 | 4;
  category?: 'acute_unconscious_breathing' | 'acute_overdose_pills' | 'acute_seizure_fits' | 'acute_chest_pain' | 'crisis_self_harm' | 'withdrawal_urgent' | 'general';
  reason?: string;
  guidance?: EmergencyGuidance;
}

// ---------------------------------------------------------------------------
// 1. LEVEL 4: Suicidal Ideation / Severe Self-Harm / Crisis
// ---------------------------------------------------------------------------
const LEVEL_4_PATTERNS: RegExp[] = [
  // English
  /suicide/i,
  /kill\s+(my\s*self|himself|herself|themselves)/i,
  /end\s+my\s+life/i,
  /want\s+to\s+die/i,
  /cut(ting)?\s+(my|his|her)\s+wrist/i,
  /hang(ing)?\s+(my\s*self|himself|herself)/i,
  /od\s+on\s+purpose/i,
  /jump\s+off/i,
  // Sinhala
  /දිවි\s*නසා/u,
  /මැරෙන්න/u,
  /මැරෙනවා/u,
  /ජීවිතේ\s*එපා/u,
  /ජීවත්\s*වෙන්න\s*බෑ/u,
  /ජීවත්\s*වෙන්න\s*බැ/u,
  /ජීවිතය\s*නැති\s*කර/u,
  /මැරෙන්න\s*(හිතෙනවා|ඕන|ඕනෙ|හදනවා)/u,
  /අත\s*කපාග/u,
  // Singlish
  /marenna\s*(ona|one|hithanawa|hadanawa)/i,
  /jeewithe\s*epa/i,
  /jeewath\s*wenna\s*(ba|be)/i,
  /divi\s*nasa/i,
  // Tamil
  /தற்கொலை/u,
  /சாக\s*வேண்டும்/u,
  /வாழ\s*விருப்பமில்லை/u,
  /என்னை\s*அழிக்க/u,
  /உயிரை\s*மாய்க்க/u,
];

// ---------------------------------------------------------------------------
// 2. LEVEL 3: Acute Life-Threatening Medical Emergencies
// (Unconsciousness, Breathing Failure, Overdose, Seizures, Chest Pain, Poisoning)
// ---------------------------------------------------------------------------
const LEVEL_3_PATTERNS: RegExp[] = [
  // --- A. Unconsciousness / Loss of Consciousness / Unresponsiveness ---
  // English
  /unconscious/i,
  /unconcious/i,
  /unresponsive/i,
  /(is|are|am|was|were)\s+not\s+responding/i,
  /isn'?t\s+responding/i,
  /not\s+responding/i,
  /passed\s*out/i,
  /passing\s*out/i,
  /black(ed)?\s*out/i,
  /lost\s+consciousness/i,
  /fainted/i,
  /collapsed/i,
  /not\s+waking\s+up/i,
  /won'?t\s+wake\s+up/i,
  /wont\s+wake\s+up/i,
  /can'?t\s+wake\s+up/i,
  /cannot\s+wake\s+up/i,
  /unable\s+to\s+wake/i,
  // Sinhala - Handles both 'නැ' (short vowel) and 'නෑ' (long vowel) and all grammatical inflections
  /සිහිය(ක්)?\s*(නැ|නෑ|නැහැ|නෑහැ|නැති|නැතුව|නැතිව|නැත|නැතිවු|නැතිවුණා|නැතිවුනා|නැති\s*වෙලා|නෑනෙ|නෑනේ|නැනෙ|නැනේ|නැ\s*වගේ|නෑ\s*වගේ)/u,
  /සිහි(යක්)?\s*(නැ|නෑ|නැහැ|නැති|නැතුව|නැතිව)/u,
  /සිහිසුන්/u,
  /සිහිනැති/u,
  /සිහි\s*නැති/u,
  /සිහිමුර්ජා/u,
  /අසිහිය/u,
  /ප්‍රතිචාර\s*(නැ|නෑ|නැහැ|දක්වන්නෙ\s*නෑ|දක්වන්නේ\s*නැ)/u,
  /කතා\s*කරන්නෙ\s*(නෑ|නැ)/u,
  /ඇහැරෙන්නෙ\s*(නෑ|නැ)/u,
  /ඇහැරවන්න\s*(බෑ|බැ)/u,
  /නැගිටින්නෙ\s*(නෑ|නැ)/u,
  /නැගිටින්න\s*(බෑ|බැ)/u,
  /කලන්තෙ/u,
  /කලන්තය/u,
  /කඩාගෙන\s*වැටු/u,
  /වැටිලා\s*සිහිය/u,
  // Singlish
  /sihiya(k)?\s*(na|naha|ne|nathi|nathuwa|nethuwa|nethi|nathi\s*wela|nethiwela|nehe)/i,
  /sihi\s*(na|naha|nathi|nathuwa)/i,
  /unconscious/i,
  /not\s*responding/i,
  /katha\s*karanne\s*(na|ne|naha)/i,
  /aherenne\s*(na|ne|naha)/i,
  /aherenna\s*(ba|be)/i,
  /negitinne\s*(na|ne|naha)/i,
  /negitinna\s*(ba|be)/i,
  /watila\s*sihiya/i,
  /wetila\s*sihiya/i,
  // Tamil
  /மயக்கம்/u,
  /மயங்கி/u,
  /மயக்கமடைந்து/u,
  /சுயநினைவின்றி/u,
  /சுயநினைவு\s*(இல்லை|இழந்து|இழந்த)/u,
  /பதிலளிக்கவில்லை/u,
  /எழுப்ப\s*முடியவில்லை/u,

  // --- B. Breathing Difficulty / Stoppage / Suffocation ---
  // English
  /(not|is\s+not|isn'?t|stopped|stops|hardly)\s+breathing/i,
  /(can't|cannot|unable\s+to|struggling\s+to|trouble|difficulty)\s+breathe/i,
  /difficulty\s+(in\s+)?breathing/i,
  /shortness\s+of\s+breath/i,
  /gasping\s+for\s+(air|breath)/i,
  /choking/i,
  /suffocating/i,
  /airway\s+blocked/i,
  /turning\s+blue/i,
  /blue\s+lips/i,
  /lips\s+(turned|turning)\s+blue/i,
  // Sinhala
  /හුස්ම\s*ගන්න\s*(බෑ|බැ|අමාරුයි|නෑ|නැ)/u,
  /හුස්ම\s*(නෑ|නැ|නැහැ|නැති|නැතුව|නැතිව)/u,
  /හුස්ම\s*(ගන්නේ|ගන්නෙ)\s*(නෑ|නැ|නැහැ)/u,
  /හුස්ම\s*හිර/u,
  /හුස්ම\s*වැටෙන්නෙ\s*(නෑ|නැ)/u,
  /පපුව\s*හිර/u,
  /තොල්\s*නිල්/u,
  // Singlish
  /husma\s*ganna\s*(ba|be|amarui)/i,
  /husma\s*(ganne|ganna)\s*(na|ne|naha|nethi)/i,
  /husma\s*(na|ne|naha|nathi|nathuwa|nethuwa)/i,
  /husma\s*hira/i,
  /breathe\s*karanna\s*(ba|be|amarui)/i,
  // Tamil
  /சுவாசிக்க\s*முடியவில்லை/u,
  /சுவாசம்\s*(இல்லை|நின்றுவிட்டது)/u,
  /மூச்சு\s*(விட\s*முடியவில்லை|இல்லை|திணறல்)/u,
  /நீல\s*நிற\s*உதடுகள்/u,

  // --- C. Drug Overdose / Too Many Pills / Severe Poisoning ---
  // English
  /overdose/i,
  /overdosed/i,
  /over\s+dose/i,
  /too\s+many\s+(pills|tablets|meds|medications|drugs|capsules)/i,
  /took\s+too\s+(many|much)/i,
  /drank\s+too\s+much/i,
  /swallowed\s+(pills|poison|toxic)/i,
  /poisoning/i,
  /poisoned/i,
  // Sinhala
  /අධික\s*මාත්‍රාව/u,
  /ඕවඩෝස්/u,
  /ඕවර්ඩෝස්/u,
  /මාත්‍රාව\s*වැඩි/u,
  /පෙති\s*ගොඩක්\s*(බීලා|බීල|අරන්|අරගෙන)/u,
  /බෙහෙත්\s*වැඩි/u,
  /විෂ\s*වෙලා/u,
  /විෂ\s*බීලා/u,
  // Singlish
  /overdose/i,
  /over\s*dose/i,
  /od\s*(wela|un|una)/i,
  /pethi\s*godak\s*(beela|bila|aran|aragaththa)/i,
  /beheth\s*wadi\s*wela/i,
  /wisha\s*wela/i,
  // Tamil
  /அளவுக்கு\s*மீறிய/u,
  /மிகைமருந்து/u,
  /அதிகமாக\s*(மாத்திரை|மருந்து)/u,
  /விஷம்/u,

  // --- D. Seizures / Fits / Convulsions ---
  // English
  /seizure/i,
  /seizures/i,
  /seizing/i,
  /having\s+(a\s+)?seizure/i,
  /convulsion/i,
  /convulsions/i,
  /convulsing/i,
  /having\s+(a\s+)?fit/i,
  /having\s+fits/i,
  /fits\s+coming/i,
  /shaking\s+uncontrollably/i,
  /foaming\s+at\s+(the\s+)?mouth/i,
  // Sinhala
  /වලිප්පුව/u,
  /වලිප්පුවක්/u,
  /පෙණ\s*දානවා/u,
  /කටින්\s*පෙණ/u,
  /දත්\s*පූට්ටු/u,
  /වෙව්ලනවා\s*තදින්/u,
  // Singlish
  /fits/i,
  /fits\s*(enawa|hadila|hedila|wela|gahanawa)/i,
  /seizure/i,
  /walippuwa/i,
  /walippuwak/i,
  /pena\s*danawa/i,
  // Tamil
  /வலிப்பு/u,
  /வலிப்பு\s*(வருகிறது|ஏற்படுகிறது|வந்துவிட்டது)/u,

  // --- E. Severe Chest Pain / Heart Emergencies ---
  // English
  /(severe|crushing|sharp|heavy)\s+chest\s+pain/i,
  /chest\s+pain/i,
  /heart\s+attack/i,
  /heart\s+stopped/i,
  /vomiting\s+blood/i,
  // Sinhala
  /පපුවේ\s*(තද\s*)?කැක්කුම/u,
  /පපුවේ\s*අමාරුව/u,
  /පපුව\s*තද/u,
  /ලේ\s*වමනය/u,
  // Singlish
  /chest\s*pain/i,
  /papuwe\s*kakkuma/i,
  /papuwa\s*(ridenawa|kakkumai)/i,
  // Tamil
  /நெஞ்சு\s*வலி/u,
  /மாரடைப்பு/u,
  /இரத்த\s*வாந்தி/u,
];

// ---------------------------------------------------------------------------
// 3. LEVEL 2: Personal Recovery / Severe Cravings / Urgent Withdrawal
// ---------------------------------------------------------------------------
const LEVEL_2_PATTERNS: RegExp[] = [
  /cravings/i,
  /withdrawal/i,
  /addicted/i,
  /want\s+to\s+quit/i,
  /want\s+to\s+stop/i,
  /cold\s+turkey/i,
  /relapse/i,
  /shakes\s+in\s+the\s+morning/i,
  /detox/i,
  // Sinhala
  /නවත්වන්න\s*(ඕන|ඕනෙ|අවශ්‍යයි)/u,
  /ඇබ්බැහි/u,
  /නැවැත්තුවම\s*(අමාරුයි|අවුල්)/u,
  /වෙව්ලනවා/u,
  /විෂහරණය/u,
  // Singlish
  /nawaththanna\s*(ona|one)/i,
  /abbahi/i,
  // Tamil
  /நிறுத்த\s*வேண்டும்/u,
  /அடிமையாகி/u,
  /மீட்பு/u,
];

export function detectEmergency(
  text: string,
  lang: 'si' | 'en' | 'ta' = 'en'
): EmergencyDetectionResult {
  const normalized = text.trim();
  if (!normalized) {
    return { isEmergency: false, level: 1, category: 'general' };
  }

  // 1. Check Level 4 Crisis (Self-Harm / Suicide)
  for (const pattern of LEVEL_4_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        isEmergency: true,
        level: 4,
        category: 'crisis_self_harm',
        reason:
          lang === 'si'
            ? 'ක්ෂණික දිවි නසාගැනීමේ හෝ ආත්ම හානි අනතුරු ඇඟවීමක් හඳුනාගැනිණි.'
            : lang === 'ta'
            ? 'உடனடி தற்கொலை அல்லது சுய தீங்கு எச்சரிக்கை கண்டறியப்பட்டது.'
            : 'Immediate self-harm or emotional crisis warning detected.',
        guidance: buildEmergencyGuidance(4, lang),
      };
    }
  }

  // 2. Check Level 3 Acute Medical Emergency (Unconsciousness, Breathing, Overdose, Seizures, Chest Pain)
  for (const pattern of LEVEL_3_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        isEmergency: true,
        level: 3,
        category: 'acute_unconscious_breathing',
        reason:
          lang === 'si'
            ? 'හුස්ම ගැනීමේ අපහසුව, සිහිසුන් බව, අධික මාත්‍රාව හෝ වලිප්පුව වැනි ජීවිතයට තර්ජනාත්මක වෛද්‍ය හදිසි තත්ත්වයක් හඳුනාගැනිණි.'
            : lang === 'ta'
            ? 'சுவாசக் குறைபாடு, மயக்கம், மிகைமருந்து அல்லது வலிப்பு போன்ற அவசர மருத்துவ நிலை கண்டறியப்பட்டது.'
            : 'Life-threatening medical emergency detected (unconsciousness, breathing difficulty, overdose, or seizure).',
        guidance: buildEmergencyGuidance(3, lang),
      };
    }
  }

  // 3. Check Level 2 Withdrawal / Personal Dependence
  for (const pattern of LEVEL_2_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        isEmergency: false,
        level: 2,
        category: 'withdrawal_urgent',
        reason:
          lang === 'si'
            ? 'පුනරුත්ථාපනය හෝ ඇබ්බැහිවීමෙන් මිදීමේ අවශ්‍යතාවය ප්‍රකාශ විය.'
            : lang === 'ta'
            ? 'மீட்பு அல்லது அடிமையாதல் குறித்த கவலை தெரிவிக்கப்பட்டது.'
            : 'Personal recovery or substance dependence support required.',
      };
    }
  }

  return {
    isEmergency: false,
    level: 1,
    category: 'general',
  };
}

export function buildEmergencyGuidance(
  level: 3 | 4,
  lang: 'si' | 'en' | 'ta' = 'en'
): EmergencyGuidance {
  if (level === 4) {
    // Crisis / Suicidal Ideation Guidance
    if (lang === 'si') {
      return {
        isEmergency: true,
        severity: 'critical',
        title: 'ක්ෂණික මානසික සහන හා අර්බුද කළමනාකරණය',
        emergencyNumber: '1990',
        crisisNumber: '1333',
        nddcbNumber: '1927',
        nimhNumber: '1926',
        immediateInstructions: [
          'ඔබ තනිවම නොවේ. කරුණාකර වහාම 1333 (CCC Crisis Support - නොමිලේ, පැය 24 පුරා) හෝ 1926 (NIMH මානසික සුවතා සේවය) අමතන්න.',
          'ප්‍රමාද නොවී ඔබට විශ්වාසවන්ත සමීපතමයෙකුට කතා කරන්න හෝ ළඟම ඇති රෝහලේ හදිසි ප්‍රතිකාර ඒකකයට (ETU) යොමුවන්න.',
          'මෙම අසීරු මොහොත පාලනය කරගැනීමට සුදුසුකම්ලත් උපදේශකයින් හා වෛද්‍යවරුන් සූදානමින් සිටී.',
        ],
        doNotInstructions: [
          'තනිවම මෙම පීඩනය විඳදරාගැනීමට හෝ මත්ද්‍රව්‍ය මඟින් වේදනාව සමනය කරගැනීමට උත්සාහ නොකරන්න.',
        ],
        recommendedAction: 'Call 1333 or 1926 immediately for free, 100% confidential emotional crisis intervention.',
      };
    }

    if (lang === 'ta') {
      return {
        isEmergency: true,
        severity: 'critical',
        title: 'உடனடி மனநல மற்றும் நெருக்கடி உதவி',
        emergencyNumber: '1990',
        crisisNumber: '1333',
        nddcbNumber: '1927',
        nimhNumber: '1926',
        immediateInstructions: [
          'நீங்கள் தனியாக இல்லை. உடனே 1333 (இலவச, 24/7 நெருக்கடி உதவி) அல்லது 1926 (தேசிய மனநல உதவி) அழைக்கவும்.',
          'நம்பகமான ஒருவருடன் உடனடியாகப் பேசுங்கள் அல்லது அருகிலுள்ள மருத்துவமனையின் அவசரப் பிரிவை அணுகவும்.',
          'பயிற்சி பெற்ற ஆலோசகர்கள் எந்தவித தீர்ப்பும் இன்றி உங்களுக்கு உதவ தயாராக உள்ளனர்.',
        ],
        doNotInstructions: [
          'இந்தத் துயரத்தைத் தனியாகச் சுமக்கவோ போதைப்பொருட்களால் கட்டுப்படுத்தவோ முயற்சிக்காதீர்கள்.',
        ],
        recommendedAction: 'Call 1333 or 1926 immediately for free, confidential crisis support.',
      };
    }

    return {
      isEmergency: true,
      severity: 'critical',
      title: 'Immediate Crisis & Emotional Support',
      emergencyNumber: '1990',
      crisisNumber: '1333',
      nddcbNumber: '1927',
      nimhNumber: '1926',
      immediateInstructions: [
        'You are not alone. Please call 1333 (CCC Crisis Helpline - Toll-Free, 24/7) or 1926 (NIMH Mental Health) right now.',
        'Reach out immediately to someone you trust, or go directly to the nearest hospital Emergency Treatment Unit (ETU).',
        'Trained, compassionate crisis professionals are ready to support you confidentially without any judgment.',
      ],
      doNotInstructions: [
        'Do not stay alone or attempt to suppress overwhelming feelings using substances.',
      ],
      recommendedAction: 'Call 1333 or 1926 immediately for free, confidential emotional crisis support.',
    };
  }

  // Level 3: Overdose / Unconsciousness / Respiratory Emergency Guidance
  if (lang === 'si') {
    return {
      isEmergency: true,
      severity: 'critical',
      title: 'හදිසි අනතුරු ඇඟවීමයි: ඔබේ මිතුරාට/රෝගියාට ක්ෂණික වෛද්‍ය ප්‍රතිකාර අවශ්‍යයි!',
      emergencyNumber: '1990',
      crisisNumber: '1333',
      nddcbNumber: '1927',
      nimhNumber: '1926',
      immediateInstructions: [
        'AI පිළිතුරු ලැබෙන තෙක් නොසිට, වහාම 1990 (සුවසැරිය නොමිලේ ගිලන්රථ සේවය) අමතන්න.',
        'රෝගියා සමඟම රැඳී සිටින්න. ඔවුන් තනි කර දමා නොයන්න.',
        'රෝගියා සාමාන්‍ය ලෙස හුස්ම ගන්නවාදැයි පරීක්ෂා කරන්න. හුස්ම ගැනීම අපහසු නම් හෝ නැවතී ඇත්නම් 1990 හදිසි ඇමතුම් නිලධාරියාගේ උපදෙස් ඒ මොහොතේම පිළිපදින්න.',
        'රෝගියා සිහිසුන්ව හුස්ම ගන්නේ නම්, සිරුර පැත්තකට හරවා තබන්න (Recovery Position) එවිට වමනය නිසා හුස්ම හිරවීම වළකී.',
        'අමතර තොරතුරු රැස් කිරීමට කාලය නාස්ති නොකර වහාම හදිසි ඇමතුම ලබාගන්න.',
      ],
      doNotInstructions: [
        'සිහිසුන් හෝ අඩසිහි පුද්ගලයෙකුට කිසි විටෙකත් වතුර, කිරි, තේ, කෝපි හෝ කිසිදු ඖෂධයක් ලබා නොදෙන්න.',
        'කෘත්‍රිමව වමනය කරවීමට කිසිසේත්ම උත්සාහ නොකරන්න (හුස්ම හිරවීමේ මාරාන්තික අවදානමක් පවතී).',
      ],
      recommendedAction: 'CALL 1990 NOW. Do not wait for AI. Stay with the person.',
    };
  }

  if (lang === 'ta') {
    return {
      isEmergency: true,
      severity: 'critical',
      title: 'அவசர மருத்துவ எச்சரிக்கை: உடனடி மருத்துவ உதவி தேவைப்படலாம்!',
      emergencyNumber: '1990',
      crisisNumber: '1333',
      nddcbNumber: '1927',
      nimhNumber: '1926',
      immediateInstructions: [
        'AI பதிலுக்காகக் காத்திருக்காமல், உடனே 1990 (சுவசரிய இலவச அவசர ஊர்தி) ஐ அழைக்கவும்.',
        'பாதிக்கப்பட்ட நபருடன் பாதுகாப்பாக இருங்கள்; அவரைத் தனியாக விட்டுவிடாதீர்கள்.',
        'அவர் சாதாரணமாகச் சுவாசிக்கிறாரா எனப் பார்க்கவும். சுவாசம் தடைப்பட்டால் 1990 அதிகாரியின் வழிகாட்டல்களை உடனே பின்பற்றவும்.',
        'மயக்கத்தில் இருந்தால் அவரைப் பக்கவாட்டில் படுக்க வைக்கவும் (Recovery Position).',
      ],
      doNotInstructions: [
        'மயக்கத்தில் உள்ளவருக்கு தண்ணீர், உணவு, காபி அல்லது மருந்துகளைக் கொடுக்காதீர்கள்.',
        'வாந்தி எடுக்க வைக்க முயற்சிக்காதீர்கள்.',
      ],
      recommendedAction: 'CALL 1990 IMMEDIATELY. Do not wait for AI.',
    };
  }

  return {
    isEmergency: true,
    severity: 'critical',
    title: 'EMERGENCY DETECTED: Your friend may need immediate medical attention.',
    emergencyNumber: '1990',
    crisisNumber: '1333',
    nddcbNumber: '1927',
    nimhNumber: '1926',
    immediateInstructions: [
      'DO NOT wait for an AI response. Call 1990 (Suwaseriya Free National Ambulance) immediately.',
      'Stay with the affected person safely. Do not leave them unattended.',
      'Check whether the person is breathing normally. If they are not breathing normally, call 1990 immediately and follow the emergency dispatcher\'s instructions.',
      'If the person is unconscious but breathing, place them into the RECOVERY POSITION (on their side with airway tilted open).',
      'Do not delay emergency assistance to collect additional information.',
    ],
    doNotInstructions: [
      'DO NOT give food, water, drinks, coffee, or medication to an unconscious person.',
      'DO NOT attempt to induce vomiting (high risk of fatal airway choking/aspiration).',
    ],
    recommendedAction: 'CALL 1990 IMMEDIATELY. Do not wait. Stay with the person.',
  };
}
