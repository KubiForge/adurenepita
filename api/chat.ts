import type { IncomingMessage, ServerResponse } from 'http';
import { checkRateLimit } from './_lib/rateLimiter';
import { detectLanguage } from './_lib/languageDetector';
import { detectEmergency } from './_lib/emergencyDetector';
import { findNearbySupportCenters } from './_lib/locationHelper';
import { retrieveKnowledge } from './_lib/knowledgeBase';
import { callAI } from './_lib/aiClient';
import { ChatResponsePayload, ChatQuickAction } from '../src/types/chat';

// Extend IncomingMessage and ServerResponse for Vercel/Node environment
interface VercelApiRequest extends IncomingMessage {
  query?: { [key: string]: string | string[] };
  cookies?: { [key: string]: string };
  body?: any;
}

interface VercelApiResponse extends ServerResponse {
  send?: (body: any) => VercelApiResponse;
  json?: (jsonBody: any) => VercelApiResponse;
  status?: (statusCode: number) => VercelApiResponse;
}

/**
 * Helper to write JSON response across various serverless runtimes
 */
function sendJsonResponse(res: VercelApiResponse, statusCode: number, data: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(statusCode).json(data);
    return;
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

/**
 * Helper to parse JSON body from incoming stream if not pre-parsed
 */
async function parseRequestBody(req: VercelApiRequest): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      // Protection against oversized payloads (> 50KB)
      if (raw.length > 50000) {
        raw = '';
        req.destroy();
        resolve({});
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req: VercelApiRequest, res: VercelApiResponse) {
  // Set security and CORS headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJsonResponse(res, 405, {
      success: false,
      error: 'Method not allowed. Only POST requests are permitted.',
    });
    return;
  }

  // 1. Rate Limiting Check
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    sendJsonResponse(res, 429, {
      success: false,
      error: `Too many requests. Please wait ${rateCheck.resetSeconds} seconds before sending another message.`,
      retryAfter: rateCheck.resetSeconds,
    });
    return;
  }

  // 2. Parse and Validate Request Payload
  const body = await parseRequestBody(req);
  const rawMessage = body?.message;

  if (!rawMessage || typeof rawMessage !== 'string' || !rawMessage.trim()) {
    sendJsonResponse(res, 400, {
      success: false,
      error: 'Invalid request: "message" is required and must be a non-empty string.',
    });
    return;
  }

  const userMessage = rawMessage.trim().slice(0, 2000);
  const explicitLanguage = body?.language as 'si' | 'en' | 'ta' | undefined;
  const userLocation = body?.userLocation as { latitude?: number; longitude?: number } | undefined;

  // 3. Language Identification
  const language = detectLanguage(userMessage, explicitLanguage);

  // 4. CRITICAL: DETERMINISTIC EMERGENCY DETECTION LAYER
  const emergencyDetection = detectEmergency(userMessage, language);

  // -------------------------------------------------------------------------
  // EMERGENCY OVERRIDE:
  // When an emergency is detected, do NOT send the message to Gemini/AI.
  // Immediately return structured emergency response and activate emergency UI.
  // -------------------------------------------------------------------------
  if (emergencyDetection.isEmergency) {
    const emergencySuggestions: ChatQuickAction[] = [
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

    const emergencyReply =
      language === 'si'
        ? `🚨 **හදිසි අනතුරු ඇඟවීමයි: ඔබේ මිතුරාට/රෝගියාට ක්ෂණික වෛද්‍ය ප්‍රතිකාර අවශ්‍යයි!**\n\nAI පිළිතුරු ලැබෙන තෙක් බලා නොසිටින්න. වහාම 1990 (සුවසැරිය නොමිලේ ගිලන්රථ සේවය) අමතන්න.\n\n• රෝගියා සමඟම රැඳී සිටින්න. ඔවුන් තනි කර දමා නොයන්න.\n• රෝගියා සාමාන්‍ය ලෙස හුස්ම ගන්නවාදැයි පරීක්ෂා කරන්න. හුස්ම ගැනීම අපහසු නම් 1990 හදිසි ඇමතුම් නිලධාරියාගේ උපදෙස් ඒ මොහොතේම පිළිපදින්න.\n• රෝගියා සිහිසුන් නම්, සිරුර පැත්තකට හරවා තබන්න (Recovery Position).\n• කිසි විටෙකත් වතුර, කිරි, ආහාර හෝ කිසිදු ඖෂධයක් ලබා නොදෙන්න.\n• කෘත්‍රිමව වමනය කරවීමට කිසිසේත්ම උත්සාහ නොකරන්න.`
        : language === 'ta'
        ? `🚨 **அவசர மருத்துவ எச்சரிக்கை: உடனடி மருத்துவ உதவி தேவைப்படலாம்!**\n\nAI பதிலுக்காகக் காத்திருக்காமல், உடனே 1990 (சுவசரிய இலவச அவசர ஊர்தி) ஐ அழைக்கவும்.\n\n• பாதிக்கப்பட்ட நபருடன் பாதுகாப்பாக இருங்கள்; அவரைத் தனியாக விட்டுவிடாதீர்கள்.\n• அவர் சாதாரணமாகச் சுவாசிக்கிறாரா எனப் பார்க்கவும். சுவாசம் தடைப்பட்டால் 1990 அதிகாரியின் வழிகாட்டல்களை உடனே பின்பற்றவும்.\n• மயக்கத்தில் இருந்தால் அவரைப் பக்கவாட்டில் படுக்க வைக்கவும் (Recovery Position).\n• மயக்கத்தில் உள்ளவருக்கு உணவு, தண்ணீர் அல்லது மருந்துகளைக் கொடுக்காதீர்கள்.\n• வாந்தி எடுக்க வைக்க முயற்சிக்காதீர்கள்.`
        : `🚨 **EMERGENCY DETECTED: Your friend may need immediate medical attention.**\n\nDO NOT wait for an AI response. Call 1990 (Suwaseriya Free National Ambulance) immediately.\n\n• Stay with the affected person safely. Do not leave them unattended.\n• Check whether the person is breathing normally. If not, call 1990 immediately and follow emergency dispatcher instructions.\n• If the person is unconscious but breathing, place them into the RECOVERY POSITION (on their side with airway tilted open).\n• DO NOT give food, water, drinks, or medication to an unconscious person.\n• DO NOT attempt to induce vomiting.\n• Do not delay emergency assistance to collect additional information.`;

    const emergencyResponse: ChatResponsePayload = {
      success: true,
      reply: emergencyReply,
      language,
      emergency: true,
      safetyLevel: emergencyDetection.level,
      safetyReason: emergencyDetection.reason,
      emergencyData: emergencyDetection.guidance,
      suggestions: emergencySuggestions,
    };

    sendJsonResponse(res, 200, emergencyResponse);
    return;
  }

  // -------------------------------------------------------------------------
  // 5. NORMAL AI FLOW (Non-Emergency Queries)
  // Proceed to Gemini / Grok with full AASHI personality and knowledge base.
  // -------------------------------------------------------------------------

  // Sanitize and validate conversation history
  const rawHistory = Array.isArray(body?.history) ? body.history : [];
  const history: Array<{ role: 'user' | 'assistant'; content: string }> = rawHistory
    .slice(-10)
    .filter(
      (item: any) =>
        item &&
        (item.sender === 'user' || item.sender === 'assistant' || item.role === 'user' || item.role === 'assistant') &&
        typeof (item.content || item.reply) === 'string'
    )
    .map((item: any) => ({
      role: (item.sender || item.role) === 'user' ? ('user' as const) : ('assistant' as const),
      content: String(item.content || item.reply).slice(0, 1500),
    }));

  // Knowledge Retrieval and Proximity Support Search
  const { sources } = retrieveKnowledge(userMessage);

  const lowerQuery = userMessage.toLowerCase();
  const asksForCenters =
    lowerQuery.includes('centre') ||
    lowerQuery.includes('center') ||
    lowerQuery.includes('hospital') ||
    lowerQuery.includes('rehab') ||
    lowerQuery.includes('clinic') ||
    lowerQuery.includes('near me') ||
    lowerQuery.includes('මධ්‍යස්ථාන') ||
    lowerQuery.includes('රෝහල') ||
    lowerQuery.includes('පුනරුත්ථාපන') ||
    lowerQuery.includes('ළඟම') ||
    lowerQuery.includes('மறுவாழ்வு') ||
    lowerQuery.includes('மருத்துவமனை') ||
    userLocation?.latitude != null;

  let nearbyCenters = undefined;
  if (asksForCenters) {
    nearbyCenters = findNearbySupportCenters(
      userLocation?.latitude,
      userLocation?.longitude,
      userMessage,
      4
    );
  }

  try {
    const aiResult = await callAI({
      userMessage,
      history,
      language,
      emergencyResult: emergencyDetection,
    });

    const suggestions: ChatQuickAction[] = [];
    if (language === 'si') {
      suggestions.push({ label: '📍 ළඟම ප්‍රතිකාර මධ්‍යස්ථාන', action: 'location' });
      suggestions.push({ label: '💊 මත්ද්‍රව්‍ය පිළිබඳ තොරතුරු', action: 'navigate', payload: '/drugs' });
      suggestions.push({ label: '🤝 මිතුරෙකුට උදව් කරන්නේ කෙසේද?', action: 'chat', payload: 'මගේ මිතුරෙකු මත්ද්‍රව්‍ය ගන්නවා, මම කොහොමද උදව් කරන්නේ?' });
      suggestions.push({ label: '🧭 පියවරෙන් පියවර Wizard', action: 'wizard' });
    } else if (language === 'ta') {
      suggestions.push({ label: '📍 அருகிலுள்ள மையங்கள்', action: 'location' });
      suggestions.push({ label: '💊 போதைப்பொருள் தகவல்', action: 'navigate', payload: '/drugs' });
      suggestions.push({ label: '🤝 நண்பருக்கு உதவுவது எப்படி?', action: 'chat', payload: 'போதைப்பொருளுக்கு அடிமையான என் நண்பருக்கு நான் எப்படி உதவுவது?' });
      suggestions.push({ label: '🧭 வழிகாட்டி விஸார்ட்', action: 'wizard' });
    } else {
      suggestions.push({ label: '📍 Find Nearby Centers', action: 'location' });
      suggestions.push({ label: '💊 Drug Information', action: 'navigate', payload: '/drugs' });
      suggestions.push({ label: '🤝 How to Help a Friend', action: 'chat', payload: 'How can I support a friend struggling with addiction?' });
      suggestions.push({ label: '🧭 Guided Support Wizard', action: 'wizard' });
    }

    const responsePayload: ChatResponsePayload = {
      success: true,
      reply: aiResult.reply,
      language,
      emergency: false,
      safetyLevel: emergencyDetection.level,
      safetyReason: emergencyDetection.reason,
      sources: sources.length > 0 ? sources : undefined,
      suggestions,
      nearbyCenters,
    };

    sendJsonResponse(res, 200, responsePayload);
  } catch (error: any) {
    console.error('[ApiChat] Unexpected execution error:', error);
    sendJsonResponse(res, 500, {
      success: false,
      error: 'An unexpected error occurred while processing your recovery inquiry. Please try again or call 1990 for emergency medical support.',
    });
  }
}
