import { SafetyLevel, SourceCitation, ChatMessage } from '../types/chat';
import { DRUGS_DATA } from '../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../data/sriLankaData';
import { apiService } from './apiService';
import { API_CONFIG } from '../config/api';
import { CONTACT_INFO } from '../config/contactInfo';

export interface AIResponseResult {
  content: string;
  safetyLevel: SafetyLevel;
  safetyReason?: string;
  sources: SourceCitation[];
  suggestedQuickActions?: { label: string; action: string; payload?: string }[];
}

export interface SendMessageParams {
  message: string;
  conversationHistory?: ChatMessage[];
  language?: 'si' | 'en' | 'ta';
}

class GrokService {
  /**
   * Analyzes message content across Sinhala, English, and Tamil for safety hazards.
   */
  classifySafetyLevel(text: string): { level: SafetyLevel; reason?: string } {
    const lower = text.toLowerCase();

    // LEVEL 4: Immediate Danger / Self-Harm / Crisis
    const level4Keywords = [
      'suicide', 'kill myself', 'end my life', 'want to die', 'cutting my wrist', 'hang myself',
      'දිවි නසා', 'මැරෙන්න', 'මැරෙනවා', 'ජීවිතේ එපා', 'ජීවත් වෙන්න බෑ', 'මැරෙන්න හිතෙනවා',
      'தற்கொலை', 'சாக வேண்டும்', 'வாழ விருப்பமில்லை', 'என்னை அழிக்க',
    ];
    for (const kw of level4Keywords) {
      if (lower.includes(kw)) {
        return {
          level: 4,
          reason: 'Immediate self-harm or crisis indicator detected in conversation.',
        };
      }
    }

    // LEVEL 3: Urgent Medical Concern / Overdose / Severe Toxicity / Seizures
    const level3Keywords = [
      'overdose', "can't breathe", 'cannot breathe', 'unconscious', 'passed out', 'seizure', 'convulsion',
      'chest pain', 'lips turning blue', 'turning blue', 'vomiting blood',
      'අධික මාත්‍රාව', 'හුස්ම ගන්න බෑ', 'සිහිය නෑ', 'සිහිසුන්', 'වලිප්පුව', 'පපුවේ තද කැක්කුම', 'තොල් නිල්', 'ලේ වමනය',
      'சுவாசிக்க முடியவில்லை', 'மயக்கம்', 'நெஞ்சு வலி', 'வலிப்பு', 'நீல நிற உதடுகள்',
    ];
    for (const kw of level3Keywords) {
      if (lower.includes(kw)) {
        return {
          level: 3,
          reason: 'Acute medical emergency or overdose warning signs detected.',
        };
      }
    }

    // LEVEL 2: Personal Recovery / Severe Cravings / Withdrawal Concerns
    const level2Keywords = [
      'cravings', 'withdrawal', 'addicted', 'want to stop', 'hooked', 'relapse', 'scared to stop',
      'shakes in the morning', 'cold turkey', 'need help to quit',
      'නවත්වන්න ඕන', 'ඇබ්බැහි', 'නැවැත්තුවම අමාරුයි', 'වෙව්ලනවා', 'බයයි', 'උදව් ඕන',
      'நிறுத்த வேண்டும்', 'அடிமையாகிவிட்டேன்', 'உதவி தேவை',
    ];
    for (const kw of level2Keywords) {
      if (lower.includes(kw)) {
        return {
          level: 2,
          reason: 'Personal recovery or dependence concern disclosed.',
        };
      }
    }

    // LEVEL 1: General educational information
    return { level: 1 };
  }

  /**
   * Retrieves relevant knowledge chunks from approved database (RAG)
   */
  retrieveKnowledgeContext(query: string): { contextSummary: string; sources: SourceCitation[] } {
    const lower = query.toLowerCase();
    const matchedSources: SourceCitation[] = [];
    let contextSummary = '';

    for (const drug of DRUGS_DATA) {
      const matchDrug =
        lower.includes(drug.name.toLowerCase()) ||
        lower.includes(drug.nameSi) ||
        lower.includes(drug.slug) ||
        drug.commonNames.some((cn) => lower.includes(cn.toLowerCase())) ||
        drug.aliases.some((al) => lower.includes(al.toLowerCase()));

      if (matchDrug) {
        contextSummary += `Substance: ${drug.name} (${drug.nameSi}). Classification: ${drug.classification}.\n`;
        contextSummary += `Description: ${drug.description}\n`;
        contextSummary += `Short-term effects: ${drug.shortTermEffects.slice(0, 3).join(', ')}\n`;
        contextSummary += `Emergency signs: ${drug.emergencySigns.join(', ')}\n`;
        contextSummary += `Withdrawal: ${drug.withdrawalRisks.join(', ')}\n`;
        contextSummary += `Treatment: ${drug.evidenceBasedTreatment}\n\n`;

        for (const src of drug.sources) {
          if (!matchedSources.some((s) => s.id === src.id)) {
            matchedSources.push(src);
          }
        }
      }
    }

    // If query mentions centers, locations or districts
    for (const center of SUPPORT_CENTERS_DATA) {
      if (
        lower.includes(center.district.toLowerCase()) ||
        lower.includes(center.city.toLowerCase()) ||
        lower.includes('rehab') ||
        lower.includes('hospital') ||
        lower.includes('මධ්‍යස්ථාන') ||
        lower.includes('පුනරුත්ථාපන')
      ) {
        if (matchedSources.length < 4) {
          matchedSources.push({
            id: center.id,
            title: `${center.name} (${center.district})`,
            organization: 'Verified Sri Lankan Support Directory',
            url: center.website || 'https://nddcb.gov.lk',
            snippet: `Phone: ${center.phone} | Address: ${center.address}`,
          });
        }
      }
    }

    return { contextSummary, sources: matchedSources };
  }

  /**
   * Standard sendMessage entry point used by AssistantPage and external callers
   */
  async sendMessage(params: SendMessageParams): Promise<AIResponseResult> {
    const { message, conversationHistory = [], language = 'en' } = params;

    // Check if real Apps Script backend is configured
    if (API_CONFIG.appsScriptUrl && !API_CONFIG.isDemoMode) {
      try {
        const res = await apiService.request<AIResponseResult>('/api/ai/chat', {
          method: 'POST',
          body: {
            message,
            history: conversationHistory.slice(-6),
            language,
          },
        });

        if (res.success && res.data && res.data.content) {
          return res.data;
        }
      } catch (err) {
        console.warn('[GrokService] Remote Apps Script endpoint failed, using local safety engine:', err);
      }
    }

    // Fall back to local safety engine and grounded knowledge base
    return this.generateResponse(message, conversationHistory, language);
  }

  /**
   * Generates a grounded, empathetic, source-referenced response
   */
  async generateResponse(
    message: string,
    history: ChatMessage[],
    language: 'si' | 'en' | 'ta'
  ): Promise<AIResponseResult> {
    const { level, reason } = this.classifySafetyLevel(message);
    const { contextSummary, sources } = this.retrieveKnowledgeContext(message);
    const { drugHelpline, ambulance, crisisSupport, sumithrayo, mentalHealth } = CONTACT_INFO.emergency;

    // LEVEL 4 CRISIS RESPONSE
    if (level === 4) {
      if (language === 'si') {
        return {
          safetyLevel: 4,
          safetyReason: reason,
          content: `ඔබ විඳින වේදනාව මට තේරෙනවා. කරුණාකර තනිවම මේ පීඩනය දරාගන්න එපා. ඔබේ ජීවිතය අතිශය වටිනවා.

වහාම මෙම ක්ෂණික සහන සේවාවන් අමතන්න (නොමිලේ හා පූර්ණ රහසිගතයි):
• CCC මානසික සුවතා දුරකථන සේවය: ${crisisSupport.number} (පැය 24 පුරා)
• මිත්‍රයෝ සංවිධානය (Sumithrayo): ${sumithrayo.number} / ${sumithrayo.alternateNumber}
• ජාතික මානසික සුවතා සේවය (NIMH): ${mentalHealth.number}
• හදිසි වෛද්‍ය ගිලන්රථ සේවය: ${ambulance.number}

කරුණාකර දැන්ම ඔබට සමීප විශ්වාසවන්ත අයෙකුට කතා කරන්න, නැතහොත් ළඟම ඇති රෝහලේ හදිසි ප්‍රතිකාර ඒකකයට යොමුවන්න. මම AI සහායකයෙකු බැවින් ක්ෂණික හදිසි සේවා යැවීමට මට නොහැකිය.`,
          sources: [
            {
              id: 'crisis-ccc-1333',
              title: `${crisisSupport.name}`,
              organization: 'CCC Foundation Sri Lanka',
              url: 'https://1333.lk',
            },
          ],
          suggestedQuickActions: [
            { label: `${crisisSupport.number} අමතන්න (නොමිලේ)`, action: 'call', payload: crisisSupport.number },
            { label: `${ambulance.number} ගිලන්රථය`, action: 'call', payload: ambulance.number },
          ],
        };
      }

      if (language === 'ta') {
        return {
          safetyLevel: 4,
          safetyReason: reason,
          content: `நீங்கள் அனுபவிக்கும் துயரம் மிகவும் கடினமானது. தயவுசெய்து இதைத் தனியாகச் சுமக்க வேண்டாம்; உங்கள் உயிர் மிகவும் மதிப்புமிக்கது.\n\nஉடனடியாக உதவிக்கு அழைக்கவும்:\n• நெருக்கடி உதவி: ${crisisSupport.number}\n• சுமித்ரயோ: ${sumithrayo.number} / ${sumithrayo.alternateNumber}\n• மனநல உதவி: ${mentalHealth.number}\n• அவசர ஊர்தி: ${ambulance.number}\n\nநம்பகமான ஒருவரை உடனே அணுகவும் அல்லது அருகிலுள்ள மருத்துவமனையின் அவசரப் பிரிவுக்குச் செல்லவும். நான் தானியங்கி உதவியாளர் மட்டுமே; அவசரக் குழுவை அனுப்ப முடியாது.`,
          sources: [
            {
              id: 'crisis-ccc-1333',
              title: 'நெருக்கடி மற்றும் மனநல உதவி',
              organization: 'இலங்கை நெருக்கடி உதவி சேவை',
              url: 'https://1333.lk',
            },
          ],
          suggestedQuickActions: [
            { label: `${crisisSupport.number} ஐ அழைக்கவும்`, action: 'call', payload: crisisSupport.number },
            { label: `${ambulance.number} அவசர ஊர்தியை அழைக்கவும்`, action: 'call', payload: ambulance.number },
          ],
        };
      }

      return {
        safetyLevel: 4,
        safetyReason: reason,
        content: `I hear how much pain you are experiencing right now. Please know you do not have to carry this alone, and your life matters deeply.

Please connect immediately with trained professionals who can help you right this second:
• CCC Crisis & Emotional Support Helpline: ${crisisSupport.number} (Toll-Free, 24/7)
• Sumithrayo Crisis Befriending: ${sumithrayo.number} / ${sumithrayo.alternateNumber}
• National Mental Health Helpline (NIMH): ${mentalHealth.number} (24/7)
• Suwaseriya Emergency Medical Ambulance: ${ambulance.number}

Please reach out to a trusted family member, close friend, or proceed immediately to the nearest hospital emergency department. As an AI assistant, I cannot dispatch emergency crews or guarantee human monitoring.`,
        sources: [
          {
            id: 'crisis-ccc-1333',
            title: `${crisisSupport.name}`,
            organization: 'CCC Foundation Sri Lanka',
            url: 'https://1333.lk',
          },
        ],
        suggestedQuickActions: [
          { label: `Call ${crisisSupport.number} (Crisis Line)`, action: 'call', payload: crisisSupport.number },
          { label: `Call ${ambulance.number} (Ambulance)`, action: 'call', payload: ambulance.number },
        ],
      };
    }

    // LEVEL 3 URGENT MEDICAL EMERGENCY / OVERDOSE
    if (level === 3) {
      if (language === 'si') {
        return {
          safetyLevel: 3,
          safetyReason: reason,
          content: `අවධානය යොමුකරන්න: ඔබ සඳහන් කළ ලක්ෂණ (හුස්ම ගැනීමේ අපහසුව, සිහිය නැතිවීම, අධික මාත්‍රාව හෝ වලිප්පුව) ක්ෂණික වෛද්‍ය මැදිහත්වීමක් අවශ්‍ය හදිසි අවස්ථාවක් පෙන්නුම් කරයි.

ප්‍රමාද නොවී දැන්ම ක්‍රියාත්මක වන්න:
1. වහාම ${ambulance.number} (සුවසැරිය නොමිලේ ගිලන්රථ සේවය) අමතන්න.
2. පුද්ගලයා සිහිසුන් නම්, සිරුර පැත්තකට හරවා තබන්න (Recovery Position) එවිට වමනය නිසා හුස්ම හිරවීම වළකී.
3. කෘත්‍රිමව වමනය කරවීමට හෝ කෝපි/මත්පැන් දීමට උත්සාහ නොකරන්න.
4. සහය පැමිණෙන තෙක් ඔවුන් සමඟ රැඳී සිටින්න.

මත්ද්‍රව්‍ය පිළිබඳ ක්ෂණික උපදෙස් සඳහා NDDCB ${drugHelpline.number} අමතන්න. මා සමඟ කතා කිරීමට කාලය නාස්ති නොකර වෛද්‍ය සහය ලබාගන්න!`,
          sources: [
            {
              id: 'who-overdose',
              title: 'Emergency Management of Acute Overdose',
              organization: 'World Health Organization (WHO)',
              url: 'https://www.who.int/news-room/fact-sheets/detail/opioid-overdose',
            },
          ],
          suggestedQuickActions: [
            { label: `${ambulance.number} ගිලන්රථය අමතන්න`, action: 'call', payload: ambulance.number },
            { label: `${drugHelpline.number} NDDCB අමතන්න`, action: 'call', payload: drugHelpline.number },
          ],
        };
      }

      if (language === 'ta') {
        return {
          safetyLevel: 3,
          safetyReason: reason,
          content: `அவசர மருத்துவ எச்சரிக்கை: நீங்கள் கூறிய அறிகுறிகள் உடனடி மருத்துவ உதவி தேவைப்படுவதைக் குறிக்கின்றன.\n\n1. உடனே ${ambulance.number} அவசர ஊர்தியை அழைக்கவும்.\n2. நபர் மயக்கத்தில் இருந்தால், சுவாசப்பாதை திறந்திருக்கும் வகையில் அவரைப் பக்கவாட்டில் படுக்க வைக்கவும்.\n3. வாந்தி வரச் செய்யவோ வீட்டுச் சிகிச்சை அளிக்கவோ வேண்டாம்.\n4. மருத்துவ உதவி வரும் வரை அவருடன் இருங்கள்.\n\nபோதைப்பொருள் தொடர்பான ஆலோசனைக்கு ${drugHelpline.number} ஐ அழைக்கவும். அவசர சிகிச்சையைத் தாமதிக்க வேண்டாம்.`,
          sources: [
            {
              id: 'who-overdose',
              title: 'மிகைமருந்து அவசரநிலை மேலாண்மை',
              organization: 'உலக சுகாதார நிறுவனம்',
              url: 'https://www.who.int/news-room/fact-sheets/detail/opioid-overdose',
            },
          ],
          suggestedQuickActions: [
            { label: `${ambulance.number} அவசர ஊர்தியை அழைக்கவும்`, action: 'call', payload: ambulance.number },
            { label: `${drugHelpline.number} உதவி எண்ணை அழைக்கவும்`, action: 'call', payload: drugHelpline.number },
          ],
        };
      }

      return {
        safetyLevel: 3,
        safetyReason: reason,
        content: `URGENT MEDICAL ALERT: The symptoms you described (difficulty breathing, loss of consciousness, chest pain, or suspected overdose) require IMMEDIATE emergency medical attention.

Take immediate action right now:
1. Call ${ambulance.number} (Suwaseriya Free National Ambulance) immediately.
2. If the person is unconscious, place them into the recovery position (on their side) to keep their airway clear.
3. Do not attempt to induce vomiting or give them home remedies.
4. Stay with the person until medical responders arrive.

For urgent substance guidance, call NDDCB hotline ${drugHelpline.number}. Do not delay emergency care to chat with an AI!`,
        sources: [
          {
            id: 'who-overdose',
            title: 'Emergency Management of Acute Overdose',
            organization: 'World Health Organization (WHO)',
            url: 'https://www.who.int/news-room/fact-sheets/detail/opioid-overdose',
          },
        ],
        suggestedQuickActions: [
          { label: `Call ${ambulance.number} Ambulance Now`, action: 'call', payload: ambulance.number },
          { label: `Call ${drugHelpline.number} NDDCB Hotline`, action: 'call', payload: drugHelpline.number },
        ],
      };
    }

    // LEVEL 2 RECOVERY SUPPORT
    if (level === 2) {
      if (language === 'si') {
        return {
          safetyLevel: 2,
          content: `ඔබ ඔබේ තත්ත්වය මා සමඟ බෙදාගැනීම ගැන ස්තූතියි. මත්ද්‍රව්‍ය භාවිතයෙන් ඉවත්වීමට සිතීමම ඔබ තැබූ ඉතා ධෛර්යවන්ත පළමු පියවරයි. මම කිසිවිටෙකත් ඔබව විනිශ්චය කරන්නේ නැත.

වැදගත් සෞඛ්‍ය අනතුරු ඇඟවීමක්:
මත්පැන් හෝ ඇතැම් නිදිපෙති (Benzodiazepines) වසර ගණනාවක් භාවිතා කර ඇත්නම්, කිසිදු වෛද්‍ය උපදෙසක් නොමැතිව එකවර හදිසියේ නැවැත්වීම (Cold Turkey) ශාරීරිකව අනතුරුදායක විය හැක. එබැවින් වෛද්‍යවරයෙකුගේ උපදෙස් මත ආරක්ෂිතව විෂහරණය සිදුකිරීම ඉතා වැදගත්ය.

ඔබට ලබාගත හැකි මඟපෙන්වීම්:
• NDDCB නිල උපදේශන සේවය (${drugHelpline.number}) අමතා රහසිගතව කතා කරන්න.
• කොළඹ හෝ ප්‍රදේශයේ පිළිගත් ප්‍රතිකාර මධ්‍යස්ථානයක් (උදා: මෙල් මැදුර හෝ රජයේ ශික්ෂණ රෝහල් මනෝ වෛද්‍ය ඒකක) වෙත යොමුවන්න.
• අපගේ "Creative Wizard" මඟින් ඔබේ ප්‍රදේශයේ ඇති සේවාවන් සොයාගන්න.

මම AI සහායකයෙකු වන අතර වෛද්‍ය රෝග විනිශ්චයක් හෝ තනි ප්‍රතිකාර සැලැස්මක් ලබාදිය නොහැක. සුදුසුකම්ලත් වෛද්‍යවරයෙකු හමුවීම නිර්දේශ කරමි.`,
          sources: [
            {
              id: 'nddcb-support',
              title: 'Rehabilitation & Counseling Pathways',
              organization: 'NDDCB Sri Lanka',
              url: 'https://nddcb.gov.lk',
            },
          ],
          suggestedQuickActions: [
            { label: `${drugHelpline.number} අමතන්න (NDDCB)`, action: 'call', payload: drugHelpline.number },
            { label: 'ප්‍රතිකාර මධ්‍යස්ථාන සොයන්න', action: 'navigate', payload: '/support-directory' },
            { label: 'මඟපෙන්වූ පියවර අරඹන්න', action: 'wizard' },
          ],
        };
      }

      if (language === 'ta') {
        return {
          safetyLevel: 2,
          content: `உங்கள் நிலையைப் பகிர்ந்ததற்கு நன்றி. உதவி நாடுவது துணிச்சலான முதல் படியாகும். நீங்கள் மரியாதையுடனும் அக்கறையுடனும் நடத்தப்பட வேண்டும்.\n\nமுக்கியமான பாதுகாப்பு அறிவிப்பு: நீண்டகாலமாக மதுபானம் அல்லது சில தூக்க மருந்துகளைப் பயன்படுத்தி வந்தால், மருத்துவ ஆலோசனையின்றி திடீரென நிறுத்துவது ஆபத்தான வலிப்பு உள்ளிட்ட பாதிப்புகளை ஏற்படுத்தலாம். மருத்துவரின் கண்காணிப்பில் பாதுகாப்பான சிகிச்சை பெறவும்.\n\n• ரகசிய ஆலோசனைக்கு ${drugHelpline.number} ஐ அழைக்கவும்.\n• நம்பகமான மருத்துவமனை அல்லது சிகிச்சை மையத்தை அணுகவும்.\n• அருகிலுள்ள உதவி மையங்களைக் கண்டறிய ஆதரவு மையப் பட்டியலைப் பயன்படுத்தவும்.\n\nநான் தானியங்கி உதவியாளர் மட்டுமே; நோயறிதலோ தனிப்பட்ட சிகிச்சைத் திட்டமோ வழங்க முடியாது.`,
          sources: [
            {
              id: 'nddcb-support',
              title: 'சிகிச்சை மற்றும் ஆலோசனை உதவி',
              organization: 'தேசிய உதவி சேவை',
              url: 'https://nddcb.gov.lk',
            },
          ],
          suggestedQuickActions: [
            { label: `${drugHelpline.number} ஐ அழைக்கவும்`, action: 'call', payload: drugHelpline.number },
            { label: 'ஆதரவு மையங்களைக் கண்டறியவும்', action: 'navigate', payload: '/support-directory' },
            { label: 'வழிகாட்டுதலைத் தொடங்கவும்', action: 'wizard' },
          ],
        };
      }

      return {
        safetyLevel: 2,
        content: `Thank you for sharing what you are going through. Reaching out and wanting to change is a courageous and hopeful first step. You deserve compassion, dignity, and evidence-based support—never judgment.

Important Clinical Safety Note:
If you have been using heavy alcohol or sedatives/benzodiazepines daily, stopping abruptly on your own ("cold turkey") can be medically dangerous due to seizure risks. Medically supervised detoxification under psychiatric care ensures you can withdraw safely and comfortably.

Constructive next steps you can take today:
1. Speak confidentially with a counselor at the NDDCB Hotline: ${drugHelpline.number} (Toll-Free).
2. Visit a trusted center such as Mel Medura or a government hospital psychiatric unit for confidential consultation.
3. Use our Creative Wizard to explore tailored local services across Sri Lanka's 25 districts.

Reminder: I am an AI assistant, not a doctor. I cannot generate an individual detox plan, but I can guide you to verified professional care.`,
        sources: [
          {
            id: 'nddcb-support',
            title: 'Rehabilitation & Counseling Pathways',
            organization: 'NDDCB Sri Lanka',
            url: 'https://nddcb.gov.lk',
          },
        ],
        suggestedQuickActions: [
          { label: `Call ${drugHelpline.number} (NDDCB Hotline)`, action: 'call', payload: drugHelpline.number },
          { label: 'Find Support Centers', action: 'navigate', payload: '/support-directory' },
          { label: 'Launch Guided Wizard', action: 'wizard' },
        ],
      };
    }

    // LEVEL 1 GENERAL INFORMATION (Default)
    if (language === 'si') {
      const substanceMention = DRUGS_DATA.find(
        (d) =>
          message.toLowerCase().includes(d.name.toLowerCase()) ||
          message.includes(d.nameSi) ||
          d.commonNames.some((c) => message.toLowerCase().includes(c.toLowerCase()))
      );

      if (substanceMention) {
        return {
          safetyLevel: 1,
          content: `${substanceMention.nameSi} (${substanceMention.name}) පිළිබඳ විද්‍යාත්මක තොරතුරු:

• වර්ගීකරණය: ${substanceMention.classification}
• කෙටි විස්තරය: ${substanceMention.descriptionSi}

ප්‍රධාන කෙටිකාලීන බලපෑම්:
${substanceMention.shortTermEffectsSi.slice(0, 3).map((e) => '• ' + e).join('\n')}

දිගුකාලීන සෞඛ්‍ය අවදානම්:
${substanceMention.longTermPhysicalEffectsSi.slice(0, 3).map((e) => '• ' + e).join('\n')}

විෂහරණය හා ප්‍රතිකාර:
${substanceMention.evidenceBasedTreatmentSi}

වැඩිදුර තොරතුරු අවශ්‍ය නම් හෝ ප්‍රතිකාර මධ්‍යස්ථාන සොයාගැනීමට අවශ්‍ය නම් මට පවසන්න. මම AI සහායකයෙකු වන අතර වෛද්‍ය උපදෙස් වෙනුවට මෙය භාවිතා නොකරන්න.`,
          sources: substanceMention.sources,
          suggestedQuickActions: [
            { label: 'ප්‍රතිකාර මධ්‍යස්ථාන සොයන්න', action: 'navigate', payload: '/support-directory' },
            { label: 'මිතුරෙකුට උපකාර කරන්නේ කෙසේද?', action: 'chat', payload: 'මගේ මිතුරෙකු මත්ද්‍රව්‍ය ගන්නවා, මම කොහොමද උදව් කරන්නේ?' },
          ],
        };
      }

      return {
        safetyLevel: 1,
        content: `ස්තූතියි ඔබේ විමසීමට. BEYOND THE DARKNESS වේදිකාව මත්ද්‍රව්‍ය පිළිබඳ නිවැරදි විද්‍යාත්මක දැනුම, නිවාරණය, මෙන්ම ප්‍රතිකාර හා පුනරුත්ථාපන සේවා පිළිබඳ තොරතුරු ලබාදීමට සූදානම්.

ඔබට මාර්ගෝපදේශ ලබාගත හැකි ප්‍රධාන අංශ:
• විවිධ මත්ද්‍රව්‍යවල (අයිස්, හෙරොයින්, මත්පැන්, ගංජා ආදී) සෞඛ්‍ය හා මානසික අවදානම්
• මිතුරෙකු හෝ පවුලේ අයෙකු පිළිබඳ ඇති ගැටලු සාකච්ඡා කිරීම
• ශ්‍රී ලංකාවේ පළාත් 9 සහ දිස්ත්‍රික් 25 පුරා පිහිටි රජයේ හා නොමිලේ ක්‍රියාත්මක ප්‍රතිකාර මධ්‍යස්ථාන
• අපගේ "Creative Wizard" පියවරෙන් පියවර මඟපෙන්වීම

ඔබට දැනගැනීමට අවශ්‍ය නිශ්චිත කාරණය කුමක්දැයි මට පවසන්න. මම AI සහායකයෙකු වන අතර වෛද්‍යවරයෙකු වෙනුවට ක්‍රියා නොකරන බව කරුණාවෙන් සලකන්න.`,
        sources: [
          {
            id: 'btd-manifesto',
            title: 'Beyond the Darkness Knowledge Base',
            organization: 'Leo Club of USJ',
            url: 'https://nddcb.gov.lk',
          },
        ],
        suggestedQuickActions: [
          { label: 'අයිස් (ICE) පිළිබඳ තොරතුරු', action: 'chat', payload: 'අයිස් (ICE) මත්ද්‍රව්‍යයේ බලපෑම් මොනවාද?' },
          { label: 'ප්‍රතිකාර මධ්‍යස්ථාන සොයන්න', action: 'navigate', payload: '/support-directory' },
          { label: 'මඟපෙන්වූ Wizard අරඹන්න', action: 'wizard' },
        ],
      };
    }

    if (language === 'ta') {
      const substanceMention = DRUGS_DATA.find(
        (drug) =>
          message.toLowerCase().includes(drug.name.toLowerCase()) ||
          message.toLowerCase().includes(drug.slug) ||
          message.includes(drug.nameTa) ||
          drug.commonNames.some((commonName) => message.toLowerCase().includes(commonName.toLowerCase()))
      );

      if (substanceMention) {
        return {
          safetyLevel: 1,
          content: `${substanceMention.nameTa} தொடர்பான தகவல்:\n\n${substanceMention.descriptionTa}\n\nஒவ்வொருவருக்கும் ஏற்படும் பாதிப்புகள் மாறுபடலாம். உடல்நலப் பிரச்சினை அல்லது அவசர அறிகுறிகள் இருந்தால் உடனடியாக மருத்துவ உதவியை நாடுங்கள். சிகிச்சை மற்றும் ஆதரவு மையங்களைப் பற்றித் தெரிந்துகொள்ள விரும்பினால் கேளுங்கள். நான் தானியங்கி உதவியாளர் மட்டுமே; மருத்துவ நோயறிதல் வழங்க முடியாது.`,
          sources: [
            {
              id: 'btd-substance-info',
              title: 'சரிபார்க்கப்பட்ட சுகாதாரத் தகவல்',
              organization: 'இலங்கை ஆதரவு சேவை',
              url: 'https://nddcb.gov.lk',
            },
          ],
          suggestedQuickActions: [
            { label: 'ஆதரவு மையங்களைக் கண்டறியவும்', action: 'navigate', payload: '/support-directory' },
            { label: 'வழிகாட்டுதலைத் தொடங்கவும்', action: 'wizard' },
          ],
        };
      }

      return {
        safetyLevel: 1,
        content: `வணக்கம். போதைப்பொருட்களின் உடல்நல ஆபத்துகள், எச்சரிக்கை அறிகுறிகள் மற்றும் இலங்கையில் கிடைக்கும் நம்பகமான சுகாதார ஆதரவு குறித்து உதவ முடியும்.\n\nஉங்களுக்கு எந்தத் தகவல் தேவை என்பதைச் சொல்லுங்கள். நான் தானியங்கி உதவியாளர் மட்டுமே; மருத்துவரோ அவசரச் சேவையோ அல்ல.`,
        sources: [
          {
            id: 'btd-overview',
            title: 'போதைப்பொருள் தடுப்பு மற்றும் விழிப்புணர்வு',
            organization: 'இலங்கை சுகாதார ஆதரவு சேவை',
            url: 'https://nddcb.gov.lk',
          },
        ],
        suggestedQuickActions: [
          { label: 'ஐஸ் பற்றிய தகவல்', action: 'chat', payload: 'ஐஸ் பயன்பாட்டின் உடல்நல ஆபத்துகள் என்ன?' },
          { label: 'ஆதரவு மையங்களைக் கண்டறியவும்', action: 'navigate', payload: '/support-directory' },
          { label: 'வழிகாட்டுதலைத் தொடங்கவும்', action: 'wizard' },
        ],
      };
    }

    // English Default
    const substanceMention = DRUGS_DATA.find(
      (d) =>
        message.toLowerCase().includes(d.name.toLowerCase()) ||
        message.toLowerCase().includes(d.slug) ||
        d.commonNames.some((c) => message.toLowerCase().includes(c.toLowerCase()))
    );

    if (substanceMention) {
      return {
        safetyLevel: 1,
        content: `Evidence-based overview for ${substanceMention.name}:

• Classification: ${substanceMention.classification}
• Description: ${substanceMention.description}

Key Short-Term Effects:
${substanceMention.shortTermEffects.slice(0, 3).map((e) => '• ' + e).join('\n')}

Long-Term Health Risks:
${substanceMention.longTermPhysicalEffects.slice(0, 3).map((e) => '• ' + e).join('\n')}

Evidence-Based Care Pathways:
${substanceMention.evidenceBasedTreatment}

Notice: This information is compiled from verified peer-reviewed publications and clinical health registries. I am an AI assistant and cannot provide clinical diagnosis.`,
        sources: substanceMention.sources,
        suggestedQuickActions: [
          { label: 'Find Verified Centers', action: 'navigate', payload: '/support-directory' },
          { label: 'How to Help a Friend', action: 'chat', payload: 'How can I support a friend struggling with substances?' },
        ],
      };
    }

    return {
      safetyLevel: 1,
      content: `Hello. I am the Beyond the Darkness AI Assistant. I can help answer questions regarding substance pharmacology, health risks, prevention, and navigating certified healthcare services across Sri Lanka.

How I can assist you:
• Reliable information on substances (ICE, Heroin, Alcohol, Cannabis, Pharmaceuticals)
• Guidance on supporting a concerned friend, sibling, or family member
• Finding verified treatment centers across Sri Lanka's 9 provinces and 25 districts
• Our 10-step Creative Guided Wizard for personalized navigation

What would you like to explore today? Please note: I am an AI assistant and not a medical doctor or emergency service.`,
      sources: [
        {
          id: 'btd-overview',
          title: 'Evidence-Based Drug Prevention and Awareness',
          organization: 'Leo Club of USJ & NDDCB',
          url: 'https://nddcb.gov.lk',
        },
      ],
      suggestedQuickActions: [
        { label: 'Learn about ICE / Meth', action: 'chat', payload: 'What are the dangers of Crystal Meth / ICE?' },
        { label: 'Find Support Centers', action: 'navigate', payload: '/support-directory' },
        { label: 'Launch Guided Wizard', action: 'wizard' },
      ],
    };
  }
}

export const grokService = new GrokService();
