export type Language = 'si' | 'en' | 'ta';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface NavItem {
  id: string;
  labelEn: string;
  labelSi: string;
  labelTa: string;
  path: string;
  badge?: string;
  isAction?: boolean;
}

export interface UserSession {
  anonymousId: string;
  language: Language;
  createdAt: string;
}
