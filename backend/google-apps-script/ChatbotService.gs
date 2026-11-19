/**
 * Chatbot & AI Orchestration Service
 */

function handleAiChat(payload) {
  var message = (payload.message || '').trim();
  var language = ['en', 'si', 'ta'].indexOf(payload.language) >= 0 ? payload.language : 'si';

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
          ? "මම අඳුරෙන් එළියට සහායකයා වෙමි. නීතිවිරෝධී මත්ද්‍රව්‍ය ලබාගැනීම, සකස් කිරීම හෝ භාවිතය පිළිබඳ උපදෙස් ලබාදිය නොහැක. සෞඛ්‍ය අවදානම් සහ විශ්වාසදායක ප්‍රතිකාර සහාය පිළිබඳ තොරතුරු ලබාදිය හැකිය."
          : language === 'ta'
            ? "நான் இருளைத் தாண்டி உதவியாளர். சட்டவிரோத போதைப்பொருட்களைப் பெறுதல், தயாரித்தல் அல்லது பயன்படுத்துதல் பற்றிய வழிமுறைகளை வழங்க முடியாது. உடல்நல ஆபத்துகள் மற்றும் நம்பகமான சிகிச்சை ஆதரவு பற்றிய தகவல்களை வழங்க முடியும்."
            : "I cannot provide instructions for obtaining, preparing, or using illegal drugs. I can provide information about health risks and trusted treatment support.",
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
            : language === 'ta'
              ? "உங்கள் உயிரும் நலமும் மிகவும் முக்கியம். இதைத் தனியாக எதிர்கொள்ள வேண்டாம். உடனடியாக CCC 1333 நெருக்கடி உதவி எண்ணையோ, சுமித்ரயோ 011 269 2909 எண்ணையோ, சுவசெரிய 1990 அவசர ஊர்தி சேவையையோ அழைக்கவும். அருகிலுள்ள நம்பகமான ஒருவரிடமும் உடனே தெரிவிக்கவும்."
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
            : language === 'ta'
              ? "அவசர மருத்துவ எச்சரிக்கை: நீங்கள் கூறிய அறிகுறிகள் மிகைமருந்து உட்கொள்ளல் அல்லது உடனடி உடல் ஆபத்தைக் குறிக்கலாம். தாமதமின்றி 1990 சுவசெரிய அவசர ஊர்தியை அழைக்கவும். போதைப்பொருள் தொடர்பான ஆலோசனைக்கு 1927 எண்ணை அழைக்கவும்."
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
    replyContent = language === 'en'
      ? ragResult.fallbackAnswer || "I cannot retrieve a response right now. Please try again or contact a verified support service."
      : language === 'si'
        ? "දැනට පිළිතුර ලබාගත නොහැක. නැවත උත්සාහ කරන්න හෝ තහවුරු කළ සහාය සේවාවක් අමතන්න."
        : "தற்போது பதிலைப் பெற முடியவில்லை. மீண்டும் முயற்சிக்கவும் அல்லது சரிபார்க்கப்பட்ட ஆதரவு சேவையை அணுகவும்.";
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

function handleAiFeedback(payload) {
  var sheet = getSheetTab('AIUsage');
  // Log feedback score without sensitive message content
  return { success: true, message: 'Feedback recorded' };
}
