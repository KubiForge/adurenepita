/**
 * Backend API & Environment Configuration
 * Maps logical endpoints to the Google Apps Script Web App or local mock provider.
 */

export const API_CONFIG = {
  // Google Apps Script Web App Deployment URL
  // Configurable via VITE_APPS_SCRIPT_URL in .env
  appsScriptUrl: import.meta.env.VITE_APPS_SCRIPT_URL || '',

  // Environment Mode
  isProduction: import.meta.env.PROD,
  isDemoMode: !import.meta.env.VITE_APPS_SCRIPT_URL,

  // Selected AI Provider
  aiProvider: 'grok', // 'grok' | 'gemini' | 'openai'
  aiModel: 'grok-beta',

  // Request timeouts in milliseconds
  timeoutMs: 15000,

  // Rate limiting (frontend protection before sending to Apps Script)
  maxChatMessagesPerSession: 30,

  // Feature Flags
  features: {
    voiceInput: false, // Planned for Phase 7 as per proposal
    realTimeGrok: true,
    leafletMaps: true,
    interactiveQuiz: true,
    donationsEnabled: true,
  },
};
