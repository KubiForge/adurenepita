import { SafetyLevel, SourceCitation, ChatMessage } from '../types/chat';
import { DRUGS_DATA } from '../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../data/sriLankaData';
import { apiService } from './apiService';
import { API_CONFIG } from '../config/api';

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

    // LEVEL 4 CRISIS RESPONSE
    if (level === 4) {
      if (language === 'si') {
        return {
          safetyLevel: 4,
          safetyReason: reason,
          content: `ඔබ විඳින වේදනාව මට තේරෙනවා. කරුණාකර තනිවම මේ පීඩනය දරාගන්න එපා. ඔබේ ජීවිතය අතිශය වටිනවා.

වහාම මෙම ක්ෂණික සහන සේවාවන් අමතන්න (නොමිලේ හා පූර්ණ රහසිගතයි):
• CCC මානසික සුවතා දුරකථන සේවය: 1333 (පැය 24 පුරා)
• මිත්‍රයෝ සංවිධානය (Sumithrayo): 011 269 2909 / 011 268 2535
• ජාතික මානසික සුවතා සේවය (NIMH): 1926
• හදිසි වෛද්‍ය ගිලන්රථ සේවය: 1990

කරුණාකර දැන්ම ඔබට සමීප විශ්වාසවන්ත අයෙකුට කතා කරන්න, නැතහොත් ළඟම ඇති රෝහලේ හදිසි ප්‍රතිකාර ඒකකයට යොමුවන්න. මම AI සහායකයෙකු බැවින් ක්ෂණික හදිසි සේවා යැවීමට මට නොහැකිය.`,
          sources: [
            {
              id: 'crisis-ccc-1333',
              title: 'CCCline 1333 Crisis Support Service',
              organization: 'CCC Foundation Sri Lanka',
              url: 'https://1333.lk',
            },
          ],
          suggestedQuickActions: [
            { label: '1333 අමතන්න (නොමිලේ)', action: 'call', payload: '1333' },
            { label: '1990 ගිලන්රථය', action: 'call', payload: '1990' },
          ],
        };
      }

      return {
        safetyLevel: 4,
        safetyReason: reason,
        content: `I hear how much pain you are experiencing right now. Please know you do not have to carry this alone, and your life matters deeply.

Please connect immediately with trained professionals who can help you right this second:
• CCC Crisis & Emotional Support Helpline: 1333 (Toll-Free, 24/7)
• Sumithrayo Crisis Befriending: 011 269 2909 / 011 268 2535
• National Mental Health Helpline (NIMH): 1926 (24/7)
• Suwaseriya Emergency Medical Ambulance: 1990

Please reach out to a trusted family member, close friend, or proceed immediately to the nearest hospital emergency department. As an AI assistant, I cannot dispatch emergency crews or guarantee human monitoring.`,
        sources: [
          {
            id: 'crisis-ccc-1333',
            title: 'CCCline 1333 Crisis Support Service',
            organization: 'CCC Foundation Sri Lanka',
            url: 'https://1333.lk',
          },
        ],
        suggestedQuickActions: [
          { label: 'Call 1333 (Crisis Line)', action: 'call', payload: '1333' },
          { label: 'Call 1990 (Ambulance)', action: 'call', payload: '1990' },
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
1. වහාම 1990 (සුවසැරිය නොමිලේ ගිලන්රථ සේවය) අමතන්න.
2. පුද්ගලයා සිහිසුන් නම්, සිරුර පැත්තකට හරවා තබන්න (Recovery Position) එවිට වමනය නිසා හුස්ම හිරවීම වළකී.
3. කෘත්‍රිමව වමනය කරවීමට හෝ කෝපි/මත්පැන් දීමට උත්සාහ නොකරන්න.
4. සහය පැමිණෙන තෙක් ඔවුන් සමඟ රැඳී සිටින්න.

මත්ද්‍රව්‍ය පිළිබඳ ක්ෂණික උපදෙස් සඳහා NDDCB 1927 අමතන්න. මා සමඟ කතා කිරීමට කාලය නාස්ති නොකර වෛද්‍ය සහය ලබාගන්න!`,
          sources: [
            {
              id: 'who-overdose',
              title: 'Emergency Management of Acute Overdose',
              organization: 'World Health Organization (WHO)',
              url: 'https://www.who.int/news-room/fact-sheets/detail/opioid-overdose',
            },
          ],
          suggestedQuickActions: [
            { label: '1990 ගිලන්රථය අමතන්න', action: 'call', payload: '1990' },
            { label: '1927 NDDCB අමතන්න', action: 'call', payload: '1927' },
          ],
        };
      }

      return {
        safetyLevel: 3,
        safetyReason: reason,
        content: `URGENT MEDICAL ALERT: The symptoms you described (difficulty breathing, loss of consciousness, chest pain, or suspected overdose) require IMMEDIATE emergency medical attention.

Take immediate action right now:
1. Call 1990 (Suwaseriya Free National Ambulance) immediately.
2. If the person is unconscious, place them into the recovery position (on their side) to keep their airway clear.
3. Do not attempt to induce vomiting or give them home remedies.
4. Stay with the person until medical responders arrive.

For urgent substance guidance, call NDDCB hotline 1927. Do not delay emergency care to chat with an AI!`,
        sources: [
          {
            id: 'who-overdose',
            title: 'Emergency Management of Acute Overdose',
            organization: 'World Health Organization (WHO)',
            url: 'https://www.who.int/news-room/fact-sheets/detail/opioid-overdose',
          },
        ],
        suggestedQuickActions: [
          { label: 'Call 1990 Ambulance Now', action: 'call', payload: '1990' },
          { label: 'Call 1927 NDDCB Hotline', action: 'call', payload: '1927' },
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
• NDDCB නිල උපදේශන සේවය (1927) අමතා රහසිගතව කතා කරන්න.
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
            { label: '1927 අමතන්න (NDDCB)', action: 'call', payload: '1927' },
            { label: 'ප්‍රතිකාර මධ්‍යස්ථාන සොයන්න', action: 'navigate', payload: '/support-directory' },
            { label: 'මඟපෙන්වූ පියවර අරඹන්න', action: 'wizard' },
          ],
        };
      }

      return {
        safetyLevel: 2,
        content: `Thank you for sharing what you are going through. Reaching out and wanting to change is a courageous and hopeful first step. You deserve compassion, dignity, and evidence-based support—never judgment.

Important Clinical Safety Note:
If you have been using heavy alcohol or sedatives/benzodiazepines daily, stopping abruptly on your own ("cold turkey") can be medically dangerous due to seizure risks. Medically supervised detoxification under psychiatric care ensures you can withdraw safely and comfortably.

Constructive next steps you can take today:
1. Speak confidentially with a counselor at the NDDCB Hotline: 1927 (Toll-Free).
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
          { label: 'Call 1927 (NDDCB Hotline)', action: 'call', payload: '1927' },
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
