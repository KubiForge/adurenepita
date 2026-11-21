import { buildSystemPrompt } from './systemPrompt';
import { retrieveKnowledge } from './knowledgeBase';
import { EmergencyDetectionResult } from './emergencyDetector';

export interface GrokMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GrokCompletionResult {
  reply: string;
  modelUsed: string;
  fallbackUsed: boolean;
  error?: string;
}

const XAI_API_ENDPOINT = 'https://api.x.ai/v1/chat/completions';
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_MODEL = 'gemini-flash-latest';
const DEFAULT_XAI_MODEL = 'grok-2-latest';
const REQUEST_TIMEOUT_MS = 25000;

export async function callGrokChat(params: {
  userMessage: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  language: 'si' | 'en' | 'ta';
  emergencyResult: EmergencyDetectionResult;
}): Promise<GrokCompletionResult> {
  const { userMessage, history, language, emergencyResult } = params;
  const provider = process.env.AI_PROVIDER?.trim().toLowerCase() || 'gemini';
  const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
  const xaiApiKey = process.env.XAI_API_KEY?.trim();
  const apiKey = provider === 'gemini' ? geminiApiKey : xaiApiKey;
  const model = provider === 'gemini'
    ? process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL
    : process.env.XAI_MODEL?.trim() || DEFAULT_XAI_MODEL;

  // Retrieve grounded knowledge context
  const { groundingText } = retrieveKnowledge(userMessage);

  // If the selected provider key is not configured, fall back to the verified rule-based knowledge engine
  if (!apiKey) {
    console.warn(`[GrokClient] ${provider === 'gemini' ? 'GEMINI_API_KEY' : 'XAI_API_KEY'} environment variable is not configured. Utilizing grounded recovery engine.`);
    return {
      reply: generateGroundedFallbackResponse(userMessage, language, emergencyResult),
      modelUsed: 'grounded-safety-fallback',
      fallbackUsed: true,
    };
  }

  // Construct message array
  const systemPrompt = buildSystemPrompt(language, groundingText);
  const messages: GrokMessage[] = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-8).map((h) => ({
      role: h.role,
      content: h.content.slice(0, 1500),
    })),
    { role: 'user', content: userMessage.slice(0, 2000) },
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const isGemini = provider === 'gemini';
    const response = await fetch(
      isGemini
        ? `${GEMINI_API_ENDPOINT}/${encodeURIComponent(model)}:generateContent`
        : XAI_API_ENDPOINT,
      {
        method: 'POST',
        headers: isGemini
          ? {
              'Content-Type': 'application/json',
              'x-goog-api-key': apiKey,
            }
          : {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
        body: JSON.stringify(
          isGemini
            ? {
                systemInstruction: {
                  parts: [{ text: systemPrompt }],
                },
                contents: [
                  ...history.slice(-8).map((h) => ({
                    role: h.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: h.content.slice(0, 1500) }],
                  })),
                  {
                    role: 'user',
                    parts: [{ text: userMessage.slice(0, 2000) }],
                  },
                ],
                generationConfig: {
                  temperature: 0.3,
                  maxOutputTokens: 1000,
                },
              }
            : {
                model,
                messages,
                temperature: 0.3,
                max_tokens: 1000,
              }
        ),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorStatus = response.status;
      let errorText = '';
      try {
        const errorJson = await response.json();
        errorText = errorJson?.error?.message || response.statusText;
      } catch {
        errorText = response.statusText;
      }

      console.warn(`[GrokClient] ${isGemini ? 'Gemini' : 'xAI Grok'} API error (${errorStatus}): ${errorText}. Using grounded fallback.`);

      return {
        reply: generateGroundedFallbackResponse(userMessage, language, emergencyResult),
        modelUsed: model,
        fallbackUsed: true,
        error: `${isGemini ? 'Gemini' : 'xAI'} API returned status ${errorStatus}`,
      };
    }

    const data = await response.json();
    const reply = isGemini
      ? data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('').trim()
      : data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error(`Empty response received from ${isGemini ? 'Gemini' : 'Grok'} API`);
    }

    return {
      reply,
      modelUsed: data.model || model,
      fallbackUsed: false,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    const isTimeout = err?.name === 'AbortError';
    console.warn(`[GrokClient] Request error (${isTimeout ? 'Timeout' : 'Exception'}): ${err?.message || err}. Using grounded fallback.`);

    return {
      reply: generateGroundedFallbackResponse(userMessage, language, emergencyResult),
      modelUsed: model,
      fallbackUsed: true,
      error: isTimeout ? 'Request timed out after 25s' : 'Network/service unreachable',
    };
  }
}

/**
 * High-quality, empathetic, medically verified fallback response
 * generated when xAI API is unreachable, unconfigured, or throttled.
 */
function generateGroundedFallbackResponse(
  query: string,
  lang: 'si' | 'en' | 'ta',
  emergency: EmergencyDetectionResult
): string {
  // If emergency is detected, return immediate life-saving response
  if (emergency.isEmergency && emergency.guidance) {
    const g = emergency.guidance;
    const instructions = g.immediateInstructions.join('\n');
    const doNots = g.doNotInstructions.length > 0 ? `\n\nනොකළ යුතු දෑ:\n${g.doNotInstructions.join('\n')}` : '';

    if (lang === 'si') {
      return `⚠️ **${g.title}**\n\nවහාම ක්‍රියාත්මක වන්න:\n${instructions}${doNots}\n\n📞 **සුවසැරිය නොමිලේ ගිලන්රථය:** ${g.emergencyNumber}\n📞 **NDDCB උපදේශන සේවය:** ${g.nddcbNumber}\n📞 **මානසික සහන සේවය (CCC):** ${g.crisisNumber}\n\nකරුණාකර දැන්ම වෛද්‍ය සහය ලබාගන්න!`;
    } else if (lang === 'ta') {
      return `⚠️ **${g.title}**\n\nஉடனடியாகச் செயல்படவும்:\n${instructions}\n\n📞 **அவசர ஊர்தி:** ${g.emergencyNumber}\n📞 **ஆலோசனை உதவி:** ${g.nddcbNumber}\n📞 **நெருக்கடி உதவி:** ${g.crisisNumber}\n\nமருத்துவ உதவியைத் தாமதிக்க வேண்டாம்!`;
    } else {
      return `⚠️ **${g.title}**\n\nTAKE IMMEDIATE ACTION:\n${instructions}\n\n📞 **Suwaseriya Emergency Ambulance:** ${g.emergencyNumber}\n📞 **NDDCB Drug Helpline:** ${g.nddcbNumber}\n📞 **CCC Crisis Support:** ${g.crisisNumber}\n\nPlease prioritize emergency medical assistance immediately!`;
    }
  }

  // General grounded response
  const lower = query.toLowerCase();

  // Out of topic check for fallback
  const isOffTopic =
    /\b(code|program|python|javascript|java|c\+\+|html|css|sql|math|homework|derivative|integral|football|cricket|movie|song|actor)\b/i.test(lower);

  if (isOffTopic) {
    if (lang === 'si') {
      return 'මම AASHI, Beyond the Darkness හි නිල පුනරුත්ථාපන හා සහන සහායකයා. මත්ද්‍රව්‍ය පිළිබඳ දැනුවත්භාවය, ඇබ්බැහිවීම්, පුනරුත්ථාපන මධ්‍යස්ථාන, උපදේශනය සහ සුවවීමේ මඟපෙන්වීම් සම්බන්ධව මට ඔබට උදව් කළ හැකිය. මෙම විෂයයන් තුළ ඔබට අවශ්‍ය උපකාරයක් තිබේද?';
    } else if (lang === 'ta') {
      return 'நான் AASHI, Beyond the Darkness மீட்பு உதவியாளர். போதைப்பொருள் விழிப்புணர்வு, அடிமையாதல், மறுவாழ்வு மையங்கள், ஆலோசனை மற்றும் மீட்பு ஆதரவு ஆகியவற்றில் மட்டுமே என்னால் உதவ முடியும். இந்தப் பிரிவுகளில் நான் உங்களுக்கு உதவ முடியுமா?';
    } else {
      return 'I’m AASHI, the Beyond the Darkness recovery assistant. I can help with drug awareness, substance-related concerns, addiction recovery, rehabilitation, counselling, and related support. Is there something in these areas I can help you with?';
    }
  }

  // Substance inquiry or recovery guidance
  if (lang === 'si') {
    return `ස්තූතියි මා හා සම්බන්ධවීම ගැන. මම AASHI, Beyond the Darkness හි සුවතා සහායකයා.

මත්ද්‍රව්‍ය භාවිතයෙන් මිදීම හෝ ඒ පිළිබඳ නිවැරදි තොරතුරු සෙවීම ඔබ තැබූ ඉතා ධෛර්යවන්ත පියවරකි. කිසිදු විනිශ්චයකින් තොරව ඔබට උපකාර කිරීමට අපි සූදානම්.

ඔබට ලබාගත හැකි ප්‍රධාන මඟපෙන්වීම්:
• ශ්‍රී ලංකාවේ දිස්ත්‍රික්ක 25 පුරා පිහිටි රජයේ හා නොමිලේ ක්‍රියාත්මක ප්‍රතිකාර සහ පුනරුත්ථාපන මධ්‍යස්ථාන තොරතුරු
• මත්ද්‍රව්‍යවල සෞඛ්‍ය අවදානම් හා ආරක්ෂිත විෂහරණ ක්‍රමවේද
• පවුලේ සාමාජිකයෙකුට හෝ මිතුරෙකුට සහය වන ආකාරය

📞 **නොමිලේ රහසිගත උපදෙස් සඳහා:**
• අන්තරායකර ඖෂධ පාලක ජාතික මණ්ඩලය (NDDCB): 1927
• සුවසැරිය ගිලන්රථ සේවය (හදිසි අවස්ථා සඳහා): 1990
• CCC මානසික සුවතා සේවය: 1333

ඔබට අවශ්‍ය නිශ්චිත තොරතුර කුමක්දැයි පවසන්න. මම AI සහායකයෙකු වන අතර වෛද්‍ය උපදෙස් වෙනුවට මෙය භාවිතා නොකරන්න.`;
  }

  if (lang === 'ta') {
    return `வணக்கம். நான் AASHI, Beyond the Darkness இன் மீட்பு உதவியாளர்.

உதவி நாடுவது ஒரு துணிச்சலான படியாகும். நாங்கள் உங்களை மதிக்கிறோம், தீர்ப்பின்றி ஆதரிக்கிறோம்.

நாங்கள் உதவக்கூடிய முக்கிய பகுதிகள்:
• இலங்கையின் 25 மாவட்டங்களிலும் உள்ள இலவச மற்றும் அரச சிகிச்சை மையங்கள்
• போதைப்பொருள் உடல்நல ஆபத்துகள் மற்றும் பாதுகாப்பான மருத்துவ சிகிச்சை வழிகாட்டல்
• நண்பர் அல்லது குடும்பத்தினருக்கு உதவும் முறைகள்

📞 **இலவச ரகசிய உதவி எண்கள்:**
• தேசிய போதைப்பொருள் உதவி (NDDCB): 1927
• சுவசரிய அவசர ஊர்தி: 1990
• மனநல நெருக்கடி உதவி: 1333

உங்களுக்கு என்ன தகவல் தேவை என்பதை தயங்காமல் கேளுங்கள். நான் தானியங்கி உதவியாளர் மட்டுமே; அவசர மருத்துவ சிகிச்சைக்குப் பதிலாக இதைப் பயன்படுத்த வேண்டாம்.`;
  }

  return `Hello. I am AASHI, the official recovery companion of Beyond the Darkness.

Reaching out and seeking reliable information or recovery support is a courageous and hopeful step. You are met here with dignity, safety, and compassion—never judgment.

How I can assist you today:
• Locating verified, certified rehabilitation centres and hospital psychiatric clinics across Sri Lanka
• Evidence-based facts on substances, pharmacology, and withdrawal risks
• Guidance on how to safely support a loved one struggling with addiction
• Navigating confidential recovery pathways

Important Contacts across Sri Lanka:
• 1927 — NDDCB Drug Information & Counseling Helpline (Toll-Free, 24/7)
• 1990 — 1990 Suwaseriya Emergency Medical Ambulance (Free, 24/7)
• 1333 — CCC Crisis Support Helpline (Toll-Free, 24/7)
• 1926 — NIMH National Mental Health Helpline (Toll-Free, 24/7)

How can I help you today? Please note: I am an AI recovery assistant, not a doctor or emergency service.`;
}
