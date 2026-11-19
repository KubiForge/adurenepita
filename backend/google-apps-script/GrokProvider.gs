/**
 * Grok API Server-Side Provider
 * Securely calls xAI Grok API using the GROK_API_KEY stored in Script Properties.
 */

function callGrokApi(userPrompt, retrievedContext, language) {
  var scriptProperties = PropertiesService.getScriptProperties();
  var apiKey = scriptProperties.getProperty('GROK_API_KEY');
  var model = scriptProperties.getProperty('GROK_MODEL') || 'grok-4.3';

  if (!apiKey) {
    throw new Error('GROK_API_KEY is not configured in Script Properties. Please configure it in Project Settings.');
  }

  var systemInstructions = 
    "You are the official AI Assistant for 'BEYOND THE DARKNESS – අඳුරෙන් එළියට', organized by the Leo Club of University of Sri Jayewardenepura, Sri Lanka.\n" +
    "CORE PROMISE: A safe place to ask. A trusted path to information, professional support and hope.\n" +
    "CLINICAL BOUNDARIES:\n" +
    "- You are an educational and navigational guide, NOT a doctor, therapist, or emergency service.\n" +
    "- Never diagnose medical conditions or calculate addiction severity scores.\n" +
    "- Never prescribe medication or calculate pharmaceutical doses.\n" +
    "- Never advise abrupt cold-turkey cessation for alcohol or benzodiazepines as withdrawal can trigger fatal seizures.\n" +
    "- Never assist with acquiring, synthesizing, preparing, concealing, or consuming illicit substances.\n" +
    "- Ground all answers strictly in the retrieved Sri Lankan knowledge base and reputable health sources (NDDCB, WHO, SAMHSA).\n" +
    "- Respond with empathy, respect, and zero stigma.\n" +
    "- Respond exclusively in the selected language: " + language + ". Use fluent, respectful Sinhala for si, Tamil for ta, and English for en. Do not mix languages or add untranslated English words; keep only unavoidable phone numbers, URLs, and official abbreviations.\n\n" +
    "APPROVED KNOWLEDGE CONTEXT:\n" + retrievedContext;

  var payload = {
    model: model,
    messages: [
      { role: 'system', content: systemInstructions },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.3,
    max_completion_tokens: 800
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch('https://api.x.ai/v1/chat/completions', options);
  var statusCode = response.getResponseCode();
  var responseText = response.getContentText();

  if (statusCode !== 200) {
    throw new Error('Grok API responded with status ' + statusCode + ': ' + responseText);
  }

  var parsed = JSON.parse(responseText);
  var choice = parsed.choices && parsed.choices[0];
  var replyContent = choice ? choice.message.content : '';

  // Log non-sensitive usage metrics to AIUsage sheet
  var totalTokens = parsed.usage ? parsed.usage.total_tokens : 0;
  recordAiUsage(model, totalTokens, 200);

  return replyContent;
}
