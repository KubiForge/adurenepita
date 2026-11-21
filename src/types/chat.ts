export type SafetyLevel = 1 | 2 | 3 | 4;

export interface SourceCitation {
  id: string;
  title: string;
  organization: string;
  url: string;
  publishDate?: string;
  snippet?: string;
}

export interface EmergencyGuidance {
  isEmergency: boolean;
  severity: 'critical' | 'urgent' | 'moderate' | 'standard';
  title: string;
  emergencyNumber: string; // "1990" (Suwaseriya Ambulance)
  crisisNumber: string;    // "1333" (CCC Crisis Helpline)
  nddcbNumber: string;     // "1927" (NDDCB Drug Helpline)
  nimhNumber: string;      // "1926" (National Institute of Mental Health)
  immediateInstructions: string[];
  doNotInstructions: string[];
  recommendedAction: string;
}

export interface NearbySupportResult {
  id: string;
  name: string;
  nameSi?: string;
  nameTa?: string;
  phone: string;
  alternativePhone?: string;
  address: string;
  addressSi?: string;
  district: string;
  city: string;
  distanceKm?: number;
  serviceTypes: string[];
  isFreeOrGovernmentFunded?: boolean;
  verificationStatus?: 'verified' | 'unverified' | 'pending';
  verifiedBy?: string;
  mapsUrl?: string;
}

export interface ChatQuickAction {
  label: string;
  action: 'chat' | 'navigate' | 'call' | 'location' | 'clear' | 'wizard' | string;
  payload?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language?: 'si' | 'en' | 'ta';
  safetyLevel?: SafetyLevel;
  safetyReason?: string;
  emergencyData?: EmergencyGuidance;
  nearbyCenters?: NearbySupportResult[];
  sources?: SourceCitation[];
  isStreaming?: boolean;
  suggestedQuickActions?: ChatQuickAction[];
  isError?: boolean;
}

export interface ChatResponsePayload {
  success: boolean;
  reply: string;
  language: 'si' | 'en' | 'ta';
  emergency: boolean;
  safetyLevel?: SafetyLevel;
  safetyReason?: string;
  emergencyData?: EmergencyGuidance;
  sources?: SourceCitation[];
  suggestions?: ChatQuickAction[];
  nearbyCenters?: NearbySupportResult[];
  error?: string;
}

export interface ChatFeedback {
  messageId: string;
  isHelpful: boolean;
  rating?: number;
  comment?: string;
  category?: 'clarity' | 'accuracy' | 'empathy' | 'safety' | 'other';
  submittedAt: string;
}

export interface ConversationSession {
  sessionId: string;
  startedAt: string;
  language: 'si' | 'en' | 'ta';
  messageCount: number;
  highestSafetyLevel: SafetyLevel;
}
