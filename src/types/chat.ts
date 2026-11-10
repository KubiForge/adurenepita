export type SafetyLevel = 1 | 2 | 3 | 4;

export interface SourceCitation {
  id: string;
  title: string;
  organization: string;
  url: string;
  publishDate?: string;
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language?: 'si' | 'en' | 'ta';
  safetyLevel?: SafetyLevel;
  safetyReason?: string;
  sources?: SourceCitation[];
  isStreaming?: boolean;
  suggestedQuickActions?: {
    label: string;
    action: string;
    payload?: string;
  }[];
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
