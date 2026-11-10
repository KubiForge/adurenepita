import { API_CONFIG } from '../config/api';
import { ApiResponse } from '../types';
import { DRUGS_DATA } from '../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../data/sriLankaData';
import { KEY_STATISTICS } from '../data/statisticsData';

class ApiService {
  private baseUrl = API_CONFIG.appsScriptUrl;

  /**
   * Dispatches a request to Google Apps Script or falls back to local verified data
   */
  async request<T>(endpoint: string, options: { method?: string; body?: any } = {}): Promise<ApiResponse<T>> {
    // If an Apps Script Web App URL is configured, send the payload
    if (this.baseUrl && !API_CONFIG.isDemoMode) {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            endpoint,
            method: options.method || 'GET',
            payload: options.body || {},
          }),
        });

        if (!response.ok) {
          throw new Error(`Apps Script HTTP error: ${response.status}`);
        }

        const json = await response.json();
        return json as ApiResponse<T>;
      } catch (err: any) {
        console.warn(`[ApiService] Apps Script request failed for ${endpoint}, falling back to local provider:`, err.message);
      }
    }

    // Local verified response handler for demo/offline/development mode
    return this.mockResponseHandler<T>(endpoint, options);
  }

  private mockResponseHandler<T>(endpoint: string, options: any): Promise<ApiResponse<T>> {
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
