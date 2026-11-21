import { callGeminiChat, GeminiCompletionResult } from './geminiClient';
import { callGrokChat, GrokCompletionResult } from './grokClient';
import { EmergencyDetectionResult } from './emergencyDetector';

export async function callAI(params: {
  userMessage: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  language: 'si' | 'en' | 'ta';
  emergencyResult: EmergencyDetectionResult;
}): Promise<GeminiCompletionResult | GrokCompletionResult> {
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const xaiKey = process.env.XAI_API_KEY?.trim();

  // If xAI key is provided with 'xai-' prefix and provider is grok, use Grok
  if (provider === 'grok' || (xaiKey && xaiKey.startsWith('xai-') && !geminiKey)) {
    return callGrokChat(params);
  }

  // Default to Gemini (Google Generative AI)
  return callGeminiChat(params);
}
