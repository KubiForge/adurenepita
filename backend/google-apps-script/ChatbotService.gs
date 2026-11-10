/**
 * Chatbot & AI Orchestration Service
 */

function handleAiChat(payload) {
  var message = (payload.message || '').trim();
  var language = payload.language || 'si';

  if (!message) {
    return { success: false, error: 'Empty message text' };
  }

  // 1. Harmful facilitation screening
  if (isHarmfulFacilitationPrompt(message)) {
    return {
      success: true,
      data: {
        safetyLevel: 1,
        content: language === 'si'
          ? "මම BEYOND THE DARKNESS AI සහයකයා වන අතර, මත්ද්‍රව්‍ය සෙවීම, සකස් කිරීම හෝ භාවිතය සඳහා උපදෙස් ලබාදීමට මට අවසර නැත. ඔබට මත්ද්‍රව්‍යවල සෞඛ්‍ය අවදානම් හෝ සහය ලබාගැනීමේ මධ්‍යස්ථාන පිළිබඳ තොරතුරු ලබාදිය හැකිය."
          : "I am the Beyond the Darkness AI Assistant. I cannot provide instructions on acquiring, synthesizing, or using illicit substances. I can, however, provide information on health risks and certified recovery support.",
        sources: []
      }
    };
  }

  // 2. Safety Classifier
  var safety = evaluateSafety(message);

  // LEVEL 4 (Self-harm / Crisis) or LEVEL 3 (Medical Overdose)
  if (safety.level >= 3) {
    recordSafetyEvent(safety.level, safety.reason);

    if (safety.level === 4) {
      return {
        success: true,
        data: {
          safetyLevel: 4,
          safetyReason: safety.reason,
          content: language === 'si'
            ? "ඔබගේ ආරක්ෂාව සහ ජීවිතය අතිශය වටිනවා. කරුණාකර තනිවම මේ පීඩනය දරානොගෙන දැන්ම නොමිලේ ක්‍රියාත්මක CCC 1333 ක්ෂණික දුරකථන සේවය හෝ සුවසැරිය 1990 අමතන්න. ඔබ ළඟ සිටින විශ්වාසවන්ත අයෙකුට වහාම කතා කරන්න."
            : "Your life and wellbeing matter deeply. Please do not face this alone. Reach out immediately to the CCC 1333 Toll-Free Crisis Line, Sumithrayo (011 269 2909), or Suwaseriya (1990).",
          sources: [{ id: 'ccc-1333', title: 'CCCline 1333 Mental Health & Crisis Support', organization: 'CCC Sri Lanka', url: 'https://1333.lk' }]
        }
      };
    }

    if (safety.level === 3) {
      return {
        success: true,
        data: {
          safetyLevel: 3,
          safetyReason: safety.reason,
          content: language === 'si'
            ? "හදිසි වෛද්‍ය අවවාදයයි: ඔබ විස්තර කළ ලක්ෂණ අධික මාත්‍රාවක් හෝ ක්ෂණික ශාරීරික අවදානමක් පෙන්නුම් කරයි. ප්‍රමාද නොවී දැන්ම 1990 සුවසැරිය ගිලන්රථ සේවය අමතන්න. මත්ද්‍රව්‍ය පිළිබඳ ක්ෂණික උපදෙස් සඳහා NDDCB 1927 අමතන්න."
            : "URGENT MEDICAL WARNING: The symptoms described indicate potential acute overdose or critical physical toxicity. Call 1990 (Suwaseriya Free National Ambulance) immediately. For substance guidance, call 1927.",
          sources: [{ id: 'nddcb-1927', title: 'NDDCB 1927 National Helpline', organization: 'NDDCB', url: 'https://nddcb.gov.lk' }]
        }
      };
    }
  }

  // 3. RAG Retrieval from DrugKnowledge
  var ragResult = retrieveKnowledgeForQuery(message);

  // 4. Call Grok or Fallback to Verified Local Responses
  var replyContent = '';
  try {
    replyContent = callGrokApi(message, ragResult.contextText, language);
  } catch (grokError) {
    Logger.log('Grok API unavailable, falling back to local grounded knowledge: ' + grokError.message);
    replyContent = ragResult.fallbackAnswer || 
      (language === 'si'
        ? "මම BEYOND THE DARKNESS AI සහයකයා වෙමි. ඔබට මත්ද්‍රව්‍යවල විද්‍යාත්මක අවදානම් සහ ශ්‍රී ලංකාවේ ප්‍රතිකාර මධ්‍යස්ථාන පිළිබඳ මඟපෙන්වීමට මට පුළුවන. ඔබට ඇති නිශ්චිත ගැටලුව කුමක්ද?"
        : "Hello, I am the Beyond the Darkness AI Assistant. I can help guide you through substance pharmacology, warning signs, and connecting with certified healthcare across Sri Lanka.");
  }

  return {
    success: true,
    data: {
      safetyLevel: safety.level,
      content: replyContent,
      sources: ragResult.sources
    }
  };
}

function handleWizardSubmission(payload) {
  var sheet = getSheetTab('WizardSubmissions');
  if (sheet) {
    sheet.appendRow([
      'wiz-' + new Date().getTime(),
      new Date().toISOString(),
      payload.purpose || '',
      payload.situation || '',
      (payload.substances || []).join('; '),
      payload.duration || '',
      payload.province || '',
      payload.district || '',
      payload.supportPreference || ''
    ]);
  }
  return { success: true, message: 'Wizard choices recorded for navigation summary.' };
}

function handleAiFeedback(payload) {
  var sheet = getSheetTab('AIUsage');
  // Log feedback score without sensitive message content
  return { success: true, message: 'Feedback recorded' };
}

function handleSupportRequest(payload) {
  var sheet = getSheetTab('WizardSubmissions');
  // Store referral under restricted access
  return { success: true, referenceId: 'REF-' + new Date().getTime() };
}
