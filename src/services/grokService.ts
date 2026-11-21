import {
  SafetyLevel,
  SourceCitation,
  ChatMessage,
  EmergencyGuidance,
  NearbySupportResult,
  ChatQuickAction,
  ChatResponsePayload,
} from '../types/chat';
import { DRUGS_DATA } from '../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../data/sriLankaData';
import { CONTACT_INFO } from '../config/contactInfo';
import { detectEmergency, EmergencyDetectionResult } from './emergencyDetector';

export interface AIResponseResult {
  content: string;
  safetyLevel: SafetyLevel;
  safetyReason?: string;
  emergency?: boolean;
  emergencyData?: EmergencyGuidance;
  sources: SourceCitation[];
  suggestedQuickActions?: ChatQuickAction[];
  nearbyCenters?: NearbySupportResult[];
  language?: 'si' | 'en' | 'ta';
}

export interface SendMessageParams {
  message: string;
  conversationHistory?: ChatMessage[];
  language?: 'si' | 'en' | 'ta';
  userLocation?: { latitude: number; longitude: number };
}

class GrokService {
  /**
   * Request user geolocation with explicit consent handling
   */
  async requestUserLocation(): Promise<{ latitude: number; longitude: number } | null> {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      return null;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn('[GrokService] Geolocation error or denied:', error.message);
          resolve(null);
        },
        { timeout: 10000, enableHighAccuracy: false }
      );
    });
  }

  /**
   * Primary entry point.
   * If an emergency is detected, it immediately activates the Emergency Override
   * and returns the emergency response WITHOUT calling Gemini or waiting for network.
   */
  async sendMessage(params: SendMessageParams): Promise<AIResponseResult> {
    const { message, conversationHistory = [], language = 'en', userLocation } = params;

    // 1. DETERMINISTIC EMERGENCY CHECK FIRST
    const emergencyCheck = detectEmergency(message, language);
    if (emergencyCheck.isEmergency) {
      // Emergency override: Return immediately without sending to Gemini
      return this.buildEmergencyResponse(emergencyCheck, language);
    }

    // 2. Normal Non-Emergency Flow -> Send to serverless API (/api/chat)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: conversationHistory.slice(-8).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
          language,
          userLocation,
        }),
      });

      if (response.ok) {
        const data: ChatResponsePayload = await response.json();
        if (data.success && data.reply) {
          return {
            content: data.reply,
            safetyLevel: data.safetyLevel || (data.emergency ? 3 : 1),
            safetyReason: data.safetyReason,
            emergency: data.emergency,
            emergencyData: data.emergencyData,
            sources: data.sources || [],
            suggestedQuickActions: data.suggestions,
            nearbyCenters: data.nearbyCenters,
            language: data.language || language,
          };
        }
      }

      // If server returned an error response
      const errorJson = await response.json().catch(() => null);
      if (response.status === 429) {
        throw new Error(errorJson?.error || 'Rate limit reached. Please wait a moment before sending another message.');
      }
    } catch (err: any) {
      console.warn('[GrokService] Serverless API error, using verified local safety engine:', err?.message || err);
    }

    // Client-side grounded fallback engine
    return this.generateResponse(message, conversationHistory, language);
  }

  /**
   * Deterministic client-side safety classification
   */
  classifySafetyLevel(text: string): { level: SafetyLevel; reason?: string } {
    const result = detectEmergency(text);
    return {
      level: result.level,
      reason: result.reason,
    };
  }

  /**
   * Builds an immediate emergency response without contacting the LLM
   */
  buildEmergencyResponse(
    emergencyCheck: EmergencyDetectionResult,
    language: 'si' | 'en' | 'ta'
  ): AIResponseResult {
    const g = emergencyCheck.guidance;
    const emergencyReply =
      language === 'si'
        ? `🚨 **හදිසි අනතුරු ඇඟවීමයි: ඔබේ මිතුරාට/රෝගියාට ක්ෂණික වෛද්‍ය ප්‍රතිකාර අවශ්‍යයි!**\n\nAI පිළිතුරු ලැබෙන තෙක් බලා නොසිටින්න. වහාම 1990 (සුවසැරිය නොමිලේ ගිලන්රථ සේවය) අමතන්න.\n\n• රෝගියා සමඟම රැඳී සිටින්න. ඔවුන් තනි කර දමා නොයන්න.\n• රෝගියා සාමාන්‍ය ලෙස හුස්ම ගන්නවාදැයි පරීක්ෂා කරන්න. හුස්ම ගැනීම අපහසු නම් 1990 හදිසි ඇමතුම් නිලධාරියාගේ උපදෙස් ඒ මොහොතේම පිළිපදින්න.\n• රෝගියා සිහිසුන්ව හුස්ම ගන්නේ නම්, සිරුර පැත්තකට හරවා තබන්න (Recovery Position) එවිට වමනය නිසා හුස්ම හිරවීම වළකී.\n• කිසි විටෙකත් වතුර, කිරි, තේ, කෝපි හෝ කිසිදු ඖෂධයක් ලබා නොදෙන්න.\n• කෘත්‍රිමව වමනය කරවීමට කිසිසේත්ම උත්සාහ නොකරන්න.`
        : language === 'ta'
        ? `🚨 **அவசர மருத்துவ எச்சரிக்கை: உங்கள் நண்பருக்கு உடனடி மருத்துவ உதவி தேவைப்படலாம்!**\n\nAI பதிலுக்காகக் காத்திருக்காமல், உடனே 1990 (சுவசரிய இலவச அவசர ஊர்தி) ஐ அழைக்கவும்.\n\n• பாதிக்கப்பட்ட நபருடன் பாதுகாப்பாக இருங்கள்; அவரைத் தனியாக விட்டுவிடாதீர்கள்.\n• அவர் சாதாரணமாகச் சுவாசிக்கிறாரா எனப் பார்க்கவும். சுவாசம் தடைப்பட்டால் 1990 அதிகாரியின் வழிகாட்டல்களை உடனே பின்பற்றவும்.\n• மயக்கத்தில் இருந்தால் அவரைப் பக்கவாட்டில் படுக்க வைக்கவும் (Recovery Position).\n• மயக்கத்தில் உள்ளவருக்கு உணவு, தண்ணீர், காபி அல்லது மருந்துகளைக் கொடுக்காதீர்கள்.\n• வாந்தி எடுக்க வைக்க முயற்சிக்காதீர்கள்.`
        : `🚨 **EMERGENCY DETECTED: Your friend may need immediate medical attention.**\n\nDO NOT wait for an AI response. Call 1990 (Suwaseriya Free National Ambulance) immediately.\n\n• Stay with the affected person safely. Do not leave them unattended.\n• Check whether the person is breathing normally. If not, call 1990 immediately and follow emergency dispatcher instructions.\n• If the person is unconscious but breathing, place them into the RECOVERY POSITION (on their side with airway tilted open).\n• DO NOT give food, water, drinks, or medication to an unconscious person.\n• DO NOT attempt to induce vomiting.\n• Do not delay emergency assistance to collect additional information.`;

    const suggestions: ChatQuickAction[] = [
      {
        label: language === 'si' ? '🚨 1990 සුවසැරිය අමතන්න' : language === 'ta' ? '🚨 1990 அவசர ஊர்தி' : '🚨 CALL 1990 NOW',
        action: 'call',
        payload: '1990',
      },
      {
        label: language === 'si' ? '📞 1927 NDDCB උපදේශනය' : '📞 1927 NDDCB Hotline',
        action: 'call',
        payload: '1927',
      },
      {
        label: language === 'si' ? '📞 1333 මානසික සහනය' : '📞 1333 Crisis Support',
        action: 'call',
        payload: '1333',
      },
    ];

    return {
      content: emergencyReply,
      safetyLevel: emergencyCheck.level,
      safetyReason: emergencyCheck.reason,
      emergency: true,
      emergencyData: g,
      sources: [
        {
          id: 'suwaseriya-1990',
          title: '1990 Suwaseriya National Ambulance Service',
          organization: 'Ministry of Health Sri Lanka',
          url: 'https://1990.lk',
          snippet: 'Free Pre-Hospital Emergency Medical Care - Toll Free: 1990',
        },
      ],
      suggestedQuickActions: suggestions,
      language,
    };
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
   * Grounded local fallback engine when network or server is offline
   */
  async generateResponse(
    message: string,
    history: ChatMessage[],
    language: 'si' | 'en' | 'ta' = 'en'
  ): Promise<AIResponseResult> {
    const emergencyCheck = detectEmergency(message, language);
    if (emergencyCheck.isEmergency) {
      return this.buildEmergencyResponse(emergencyCheck, language);
    }

    const { sources } = this.retrieveKnowledgeContext(message);

    const substanceMention = DRUGS_DATA.find(
      (d) =>
        message.toLowerCase().includes(d.name.toLowerCase()) ||
        message.toLowerCase().includes(d.slug) ||
        (d.nameSi && message.includes(d.nameSi)) ||
        d.commonNames.some((c) => message.toLowerCase().includes(c.toLowerCase()))
    );

    if (substanceMention) {
      return {
        content:
          language === 'si'
            ? `${substanceMention.nameSi} (${substanceMention.name}) පිළිබඳ විද්‍යාත්මක තොරතුරු:\n\n• වර්ගීකරණය: ${substanceMention.classification}\n• විස්තරය: ${substanceMention.descriptionSi}\n\nප්‍රධාන කෙටිකාලීන බලපෑම්:\n${substanceMention.shortTermEffectsSi.slice(0, 3).map((e) => '• ' + e).join('\n')}\n\nදිගුකාලීන සෞඛ්‍ය අවදානම්:\n${substanceMention.longTermPhysicalEffectsSi.slice(0, 3).map((e) => '• ' + e).join('\n')}\n\nවිෂහරණය හා ප්‍රතිකාර:\n${substanceMention.evidenceBasedTreatmentSi}\n\nවැඩිදුර තොරතුරු අවශ්‍ය නම් හෝ ප්‍රතිකාර මධ්‍යස්ථාන සොයාගැනීමට අවශ්‍ය නම් මට පවසන්න.`
            : language === 'ta'
            ? `${substanceMention.nameTa} தொடர்பான தகவல்:\n\n${substanceMention.descriptionTa}\n\nஒவ்வொருவருக்கும் ஏற்படும் பாதிப்புகள் மாறுபடலாம். உடல்நலப் பிரச்சினை அல்லது அவசர அறிகுறிகள் இருந்தால் உடனடியாக மருத்துவ உதவியை நாடுங்கள்.`
            : `Evidence-based overview for ${substanceMention.name}:\n\n• Classification: ${substanceMention.classification}\n• Description: ${substanceMention.description}\n\nKey Short-Term Effects:\n${substanceMention.shortTermEffects.slice(0, 3).map((e) => '• ' + e).join('\n')}\n\nLong-Term Health Risks:\n${substanceMention.longTermPhysicalEffects.slice(0, 3).map((e) => '• ' + e).join('\n')}\n\nEvidence-Based Care Pathways:\n${substanceMention.evidenceBasedTreatment}`,
        safetyLevel: 1,
        emergency: false,
        sources: substanceMention.sources,
        suggestedQuickActions: [
          { label: 'Find Verified Centers', action: 'navigate', payload: '/support-directory' },
          { label: 'How to Help a Friend', action: 'chat', payload: 'How can I support a friend struggling with addiction?' },
        ],
      };
    }

    return {
      content:
        language === 'si'
          ? `ආයුබෝවන්. මම AASHI, Beyond the Darkness හි නිල පුනරුත්ථාපන හා සහන සහායකයා.\n\nමම ඔබට මත්ද්‍රව්‍ය පිළිබඳ නිවැරදි විද්‍යාත්මක දැනුම, නිවාරණය, මෙන්ම ප්‍රතිකාර හා පුනරුත්ථාපන සේවා පිළිබඳ තොරතුරු ලබාදීමට සූදානම්.\n\nඔබට අවශ්‍ය සහය කුමක්දැයි පවසන්න.`
          : language === 'ta'
          ? `வணக்கம். நான் AASHI, Beyond the Darkness இன் மீட்பு உதவியாளர். போதைப்பொருள் விழிப்புணர்வு, அடிமையாதல், மறுவாழ்வு மையங்கள் குறித்து உதவ முடியும்.`
          : `Hello. I am AASHI, the official recovery assistant of Beyond the Darkness.\n\nI can help answer questions regarding substance pharmacology, health risks, prevention, and navigating verified treatment services across Sri Lanka.\n\nHow can I help you today?`,
      safetyLevel: 1,
      emergency: false,
      sources,
      suggestedQuickActions: [
        { label: '📍 Find Support Centers', action: 'location' },
        { label: '💊 Drug Information', action: 'navigate', payload: '/drugs' },
        { label: '🧭 Launch Guided Wizard', action: 'wizard' },
      ],
    };
  }
}

export const grokService = new GrokService();
