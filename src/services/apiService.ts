import { API_CONFIG } from '../config/api';
import { ApiResponse } from '../types';
import { DRUGS_DATA } from '../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../data/sriLankaData';
import { KEY_STATISTICS } from '../data/statisticsData';
import { getFirebaseAuth, isFirebaseConfigured } from './firebaseAuth';

interface ApiRequestOptions {
  method?: string;
  body?: object;
  idToken?: string;
}

class ApiService {
  private baseUrl = API_CONFIG.appsScriptUrl;

  async request<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    const requiresAuthentication =
      endpoint.startsWith('/api/admin/') ||
      endpoint.startsWith('/api/users/') ||
      endpoint.startsWith('/api/user/') ||
      endpoint.startsWith('/api/auth/') ||
      endpoint === '/api/auth/me' ||
      endpoint === '/api/support-requests' ||
      endpoint === '/api/wizard/submit';

    if (!this.baseUrl || API_CONFIG.isDemoMode) {
      if (requiresAuthentication) {
        throw new Error('Secure account services are unavailable until the backend is configured.');
      }
      return this.mockResponseHandler<T>(endpoint, options);
    }

    let idToken = options.idToken;
    if (requiresAuthentication && !idToken && isFirebaseConfigured) {
      idToken = await getFirebaseAuth().currentUser?.getIdToken();
    }
    if (requiresAuthentication && !idToken) {
      throw new Error('Sign in with a verified account to continue.');
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          endpoint,
          method: options.method || 'POST',
          payload: { ...options.body, ...(idToken ? { idToken } : {}) },
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Apps Script HTTP error: ${response.status}`);
      }

      const json = await response.json() as ApiResponse<T>;
      if (!json.success) {
        throw new Error(json.error || 'The request could not be completed.');
      }
      return json;
    } catch (error) {
      if (requiresAuthentication) {
        throw error;
      }
      console.warn(`[ApiService] Apps Script request failed for ${endpoint}; using local read-only demo data.`);
      return this.mockResponseHandler<T>(endpoint, options);
    } finally {
      window.clearTimeout(timeout);
    }
  }

  private mockResponseHandler<T>(endpoint: string, options: ApiRequestOptions): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const timestamp = new Date().toISOString();

        if (endpoint === '/api/drugs') {
          resolve({
            success: true,
            data: DRUGS_DATA as unknown as T,
            timestamp,
          });
          return;
        }

        if (endpoint.startsWith('/api/drugs/')) {
          const slug = endpoint.replace('/api/drugs/', '');
          const drug = DRUGS_DATA.find((d) => d.slug === slug || d.id === slug);
          resolve({
            success: !!drug,
            data: drug as unknown as T,
            error: drug ? undefined : 'Drug record not found',
            timestamp,
          });
          return;
        }

        if (endpoint === '/api/support-centers') {
          resolve({
            success: true,
            data: SUPPORT_CENTERS_DATA as unknown as T,
            timestamp,
          });
          return;
        }

        if (endpoint === '/api/admin/analytics') {
          resolve({
            success: true,
            data: {
              totalEducationalVisits: 14280,
              wizardCompletions: 1845,
              aiConversationsCount: 3412,
              verifiedDonationsLKR: 845000,
              verifiedCentersCount: SUPPORT_CENTERS_DATA.length,
              approvedKnowledgeRecords: DRUGS_DATA.length,
              pendingReferralRequests: 3,
            } as unknown as T,
            timestamp,
          });
          return;
        }

        // Generic success for submissions (e.g. support-requests, donations, feedback)
        resolve({
          success: true,
          data: { id: `rec-${Date.now()}`, status: 'received' } as unknown as T,
          timestamp,
        });
      }, 200);
    });
  }
}

export const apiService = new ApiService();
