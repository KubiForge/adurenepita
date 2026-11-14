export type UserRole = 'ADMIN' | 'USER';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
  emailVerified: boolean;
  mustChangePassword?: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userEmail: string;
  userRole: UserRole;
  action: string;
  targetCollection: string;
  targetRecordId?: string;
  details: string;
  ipAddress?: string;
}

export interface SystemHealthMetrics {
  frontendStatus: 'healthy' | 'degraded' | 'offline';
  backendStatus: 'connected' | 'mock_mode' | 'error';
  appsScriptLatencyMs: number;
  sheetsConnection: 'connected' | 'syncing' | 'error';
  driveConnection: 'accessible' | 'permission_denied' | 'error';
  grokApiStatus: 'ready' | 'rate_limited' | 'error' | 'not_configured';
  grokLatencyMs: number;
  totalAiRequestsToday: number;
  totalTokensUsed: number;
  estimatedCostUSD: number;
  quotaRemainingPercent: number;
  lastBackupTimestamp: string;
  errorRatePercent: number;
}
