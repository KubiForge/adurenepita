import React, { useCallback, useEffect, useState } from 'react';
import { AlertCircle, RefreshCw, Search, ShieldCheck, X } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { SupportCenter } from '../../types/directory';

type RequestStatus =
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'NEEDS_INFORMATION'
  | 'RECOMMENDATION_SENT'
  | 'USER_ACTION_REQUIRED'
  | 'FOLLOW_UP_REQUESTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CLOSED';

interface ReferralRecord {
  id: string;
  reference: string;
  createdAt: string;
  userLabel: string;
  purpose: string;
  concerns: string[];
  supportMethod: string;
  province: string;
  district: string;
  status: RequestStatus;
  priority: string;
}

interface RequestListResponse {
  items: ReferralRecord[];
  total: number;
  statuses: RequestStatus[];
}

interface SupportRequestDetails extends ReferralRecord {
  supportMethod: string;
  additionalDetails: string;
  contactMethod: string;
  contactInfo: string;
  consentAt: string;
  assessment: Record<string, unknown> | null;
  user?: { name: string; email: string; phone: string } | null;
  history: Array<{ status: string; timestamp: string }>;
  statusHistory: Array<{ previousStatus: string; status: string; timestamp: string; changedByRole: string; adminNote: string }>;
  messages: Array<{ id: string; authorRole: string; message: string; createdAt: string; isInternal: boolean }>;
  recommendations: Array<{ center: SupportCenter; personalizedNote: string; nextSteps: string }>;
}

const EMPTY_LIST: RequestListResponse = { items: [], total: 0, statuses: [] };

export const AdminUsersModule: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [requestList, setRequestList] = useState<RequestListResponse>(EMPTY_LIST);
  const [selectedRequest, setSelectedRequest] = useState<SupportRequestDetails | null>(null);
  const [centers, setCenters] = useState<SupportCenter[]>([]);
  const [selectedCenterIds, setSelectedCenterIds] = useState<string[]>([]);
  const [reply, setReply] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [personalizedNote, setPersonalizedNote] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [targetStatus, setTargetStatus] = useState<RequestStatus>('NEEDS_INFORMATION');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [requestsResponse, centersResponse] = await Promise.all([
        apiService.request<RequestListResponse>('/api/admin/support-requests', {
          body: { status: statusFilter, search, limit: 50, offset: 0 },
        }),
        apiService.request<SupportCenter[]>('/api/support-centers'),
      ]);
      setRequestList(requestsResponse.data || EMPTY_LIST);
      setCenters(centersResponse.data || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Support requests could not be loaded.');
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadRequests(), 250);
    return () => window.clearTimeout(timer);
  }, [loadRequests]);

  const loadRequestDetails = async (id: string) => {
    setError(null);
    setNotice(null);
    setSelectedRequest(null);
    try {
      const response = await apiService.request<SupportRequestDetails>(
        `/api/admin/support-requests/${encodeURIComponent(id)}`
      );
      setSelectedRequest(response.data || null);
      setTargetStatus(response.data?.status === 'PENDING'
        ? 'NEEDS_INFORMATION'
        : (response.data?.status as RequestStatus) || 'NEEDS_INFORMATION');
      setSelectedCenterIds(response.data?.recommendations.map((item) => item.center.id) || []);
      setReply('');
      setNextSteps('');
      setPersonalizedNote('');
      setAdminNote('');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Request details could not be loaded.');
    }
  };

  const saveStatus = async () => {
    if (!selectedRequest) return;
    setIsSaving(true);
    setError(null);
    try {
      await apiService.request(`/api/admin/support-requests/${encodeURIComponent(selectedRequest.id)}/status`, {
        body: { status: targetStatus, adminNote },
      });
      await loadRequestDetails(selectedRequest.id);
      await loadRequests();
      setNotice('Request status updated.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'The status could not be updated.');
    } finally {
      setIsSaving(false);
    }
  };

  const sendResponse = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedRequest) return;
    setIsSaving(true);
    setError(null);
    try {
      await apiService.request(`/api/admin/support-requests/${encodeURIComponent(selectedRequest.id)}/respond`, {
        body: {
          message: reply,
          nextSteps,
          personalizedNote,
          centerIds: selectedCenterIds,
          status: targetStatus,
          adminNote,
        },
      });
      await loadRequestDetails(selectedRequest.id);
      await loadRequests();
      setNotice('Response sent to the request owner.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'The response could not be sent.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleCenter = (id: string) => {
    setSelectedCenterIds((current) =>
      current.includes(id) ? current.filter((centerId) => centerId !== id) : [...current, id]
    );
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-ivory">Users & Support Requests</h2>
          <p className="text-xs text-ivory/60 mt-1">
            Review consented requests and reply using verified directory institutions. Contact details are shown only here.
          </p>
        </div>
        <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> Private admin queue
        </span>
      </header>

      {error && <div role="alert" className="p-3 rounded-xl bg-red-950/70 border border-red-800 text-xs text-red-200 flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}
      {notice && <div role="status" className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 text-xs text-emerald-200">{notice}</div>}

      <section className="charcoal-card p-4 flex flex-col sm:flex-row gap-3">
        <label className="relative flex-1">
          <span className="sr-only">Search support requests</span>
          <Search className="w-4 h-4 text-ivory/40 absolute left-3 top-2.5" />
          <input
            type="search"
            placeholder="Search reference, support type, or location"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs"
          />
        </label>
        <select
          aria-label="Filter support requests by status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs"
        >
          <option value="ALL">All statuses</option>
          {requestList.statuses.map((status) => <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>)}
        </select>
        <button type="button" onClick={() => void loadRequests()} disabled={isLoading} className="px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory/70 hover:text-gold text-xs flex items-center gap-2">
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </section>

      <section className="charcoal-card border-charcoal-light overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-xs text-ivory/60">Loading requests...</p>
        ) : requestList.items.length === 0 ? (
          <p className="p-6 text-xs text-ivory/60">No support requests match this filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-charcoal-light bg-midnight/70 text-ivory/60">
                  <th className="p-3.5 font-bold uppercase">Reference</th>
                  <th className="p-3.5 font-bold uppercase">Purpose</th>
                  <th className="p-3.5 font-bold uppercase">Request</th>
                  <th className="p-3.5 font-bold uppercase">Location</th>
                  <th className="p-3.5 font-bold uppercase">Status</th>
                  <th className="p-3.5 text-right font-bold uppercase">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-light">
                {requestList.items.map((request) => (
                  <tr key={request.id} className="hover:bg-midnight/40">
                    <td className="p-3.5 font-mono font-bold text-gold">{request.reference}</td>
                    <td className="p-3.5 text-ivory">{request.purpose}</td>
                    <td className="p-3.5 text-ivory/75">{request.supportMethod.replace(/_/g, ' ')}</td>
                    <td className="p-3.5 text-ivory/60">{request.district ? `${request.district}, ` : ''}{request.province || '—'}</td>
                    <td className="p-3.5 text-ivory/75">{request.status.replace(/_/g, ' ')}</td>
                    <td className="p-3.5 text-right">
                      <button type="button" onClick={() => void loadRequestDetails(request.id)} className="px-3 py-1.5 rounded-lg bg-midnight border border-charcoal-light hover:border-gold text-gold font-semibold">
                        View request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-4 py-3 border-t border-charcoal-light text-[10px] text-ivory/45">
              Showing {requestList.items.length} of {requestList.total} requests (up to 50).
            </p>
          </div>
        )}
      </section>

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
          <section role="dialog" aria-modal="true" aria-labelledby="request-title" className="charcoal-card border-gold/40 w-full max-w-3xl max-h-[92vh] overflow-y-auto p-5 sm:p-6 space-y-5">
            <header className="flex items-start justify-between border-b border-charcoal-light pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-gold">{selectedRequest.reference}</span>
                <h3 id="request-title" className="font-heading font-bold text-lg text-ivory">Confidential support request</h3>
              </div>
              <button type="button" aria-label="Close request details" onClick={() => setSelectedRequest(null)} className="text-ivory/50 hover:text-ivory"><X className="w-5 h-5" /></button>
            </header>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <Detail label="Request owner" value={selectedRequest.user?.name || selectedRequest.userLabel} />
              <Detail label="Email" value={selectedRequest.user?.email || 'Not provided'} />
              <Detail label="Phone" value={selectedRequest.contactInfo || selectedRequest.user?.phone || 'Not provided'} />
              <Detail label="Preferred contact" value={selectedRequest.contactMethod || 'Not specified'} />
              <Detail label="Support method" value={selectedRequest.supportMethod.replace(/_/g, ' ')} />
              <Detail label="Location" value={`${selectedRequest.district || ''}${selectedRequest.district && selectedRequest.province ? ', ' : ''}${selectedRequest.province || ''}` || 'Not specified'} />
              <Detail label="Consent recorded" value={selectedRequest.consentAt ? new Date(selectedRequest.consentAt).toLocaleString() : 'Not available'} />
            </div>

            {selectedRequest.additionalDetails && (
              <div className="p-3 rounded-xl bg-midnight border border-charcoal-light text-xs text-ivory/80 whitespace-pre-wrap">
                <strong className="block text-ivory mb-1">Additional details</strong>{selectedRequest.additionalDetails}
              </div>
            )}
            {selectedRequest.assessment && (
              <details className="p-3 rounded-xl bg-midnight border border-charcoal-light text-xs text-ivory/80">
                <summary className="cursor-pointer font-semibold text-ivory">Consented assessment details</summary>
                <pre className="mt-3 whitespace-pre-wrap break-words font-sans">{JSON.stringify(selectedRequest.assessment, null, 2)}</pre>
              </details>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-ivory">Conversation history</h4>
              {selectedRequest.messages.length === 0 ? <p className="text-xs text-ivory/50">No messages yet.</p> : selectedRequest.messages.map((message) => (
                <div key={message.id} className={`p-3 rounded-xl border text-xs whitespace-pre-wrap ${message.isInternal ? 'bg-amber-950/20 border-amber-800/50 text-amber-100' : 'bg-midnight border-charcoal-light text-ivory/80'}`}>
                  <div className="flex justify-between gap-2 text-[10px] text-ivory/50 mb-1"><span>{message.authorRole}{message.isInternal ? ' · internal' : ''}</span><time>{new Date(message.createdAt).toLocaleString()}</time></div>
                  {message.message}
                </div>
              ))}
            </div>
            {selectedRequest.recommendations.length > 0 && (
              <div className="p-3 rounded-xl bg-midnight border border-charcoal-light text-xs text-ivory/80">
                <strong className="block text-ivory mb-2">Previous recommendations</strong>
                {selectedRequest.recommendations.map(({ center, personalizedNote, nextSteps }) => (
                  <p key={center.id} className="mb-2"><strong>{center.name}</strong> · {center.phone}{personalizedNote ? ` — ${personalizedNote}` : ''}{nextSteps ? ` (${nextSteps})` : ''}</p>
                ))}
              </div>
            )}
            {selectedRequest.statusHistory.length > 0 && (
              <details className="p-3 rounded-xl bg-midnight border border-charcoal-light text-xs text-ivory/70">
                <summary className="cursor-pointer font-semibold">Status history</summary>
                <ul className="mt-2 space-y-1">
                  {selectedRequest.statusHistory.map((entry, index) => <li key={`${entry.timestamp}-${index}`}>{entry.previousStatus || 'New'} → {entry.status} · {new Date(entry.timestamp).toLocaleString()}{entry.adminNote ? ` · ${entry.adminNote}` : ''}</li>)}
                </ul>
              </details>
            )}

            <form onSubmit={sendResponse} className="border-t border-charcoal-light pt-4 space-y-3">
              <h4 className="text-sm font-bold text-ivory">Send a response</h4>
              <label className="block text-xs text-ivory/75">Message to request owner
                <textarea required maxLength={4000} value={reply} onChange={(event) => setReply(event.target.value)} rows={3} className="mt-1 w-full p-3 rounded-xl bg-midnight border border-charcoal-light text-ivory" />
              </label>
              <label className="block text-xs text-ivory/75">Next steps (optional)
                <textarea maxLength={2000} value={nextSteps} onChange={(event) => setNextSteps(event.target.value)} rows={2} className="mt-1 w-full p-3 rounded-xl bg-midnight border border-charcoal-light text-ivory" />
              </label>
              <label className="block text-xs text-ivory/75">Status after response
                <select value={targetStatus} onChange={(event) => setTargetStatus(event.target.value as RequestStatus)} className="mt-1 w-full p-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory">
                  {(requestList.statuses.length ? requestList.statuses : ['NEEDS_INFORMATION', 'RECOMMENDATION_SENT', 'IN_PROGRESS', 'COMPLETED', 'CLOSED']).map((status) => <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>)}
                </select>
              </label>
              <label className="block text-xs text-ivory/75">Private administrative note (optional)
                <textarea maxLength={500} value={adminNote} onChange={(event) => setAdminNote(event.target.value)} rows={2} className="mt-1 w-full p-3 rounded-xl bg-midnight border border-charcoal-light text-ivory" />
              </label>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-ivory/80">Verified institutions (optional, up to 5)</p>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {centers.map((center) => (
                    <label key={center.id} className="flex gap-2 items-start text-xs text-ivory/70 p-2 rounded-lg hover:bg-midnight">
                      <input type="checkbox" checked={selectedCenterIds.includes(center.id)} disabled={!selectedCenterIds.includes(center.id) && selectedCenterIds.length >= 5} onChange={() => toggleCenter(center.id)} />
                      <span>{center.name} · {center.district}, {center.province}</span>
                    </label>
                  ))}
                  {centers.length === 0 && <p className="text-xs text-amber-200">No verified centers are available in the directory.</p>}
                </div>
              </div>
              {selectedCenterIds.length > 0 && (
                <label className="block text-xs text-ivory/75">Personalized recommendation note (optional)
                  <textarea maxLength={2000} value={personalizedNote} onChange={(event) => setPersonalizedNote(event.target.value)} rows={2} className="mt-1 w-full p-3 rounded-xl bg-midnight border border-charcoal-light text-ivory" />
                </label>
              )}
              <div className="flex flex-wrap gap-2 justify-end">
                <button type="button" disabled={isSaving} onClick={() => void saveStatus()} className="px-4 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory/80 hover:border-gold text-xs disabled:opacity-50">Update status only</button>
                <button type="submit" disabled={isSaving || !reply.trim()} className="btn-gold px-4 py-2 rounded-xl font-bold text-xs disabled:opacity-50">{isSaving ? 'Saving...' : 'Send response'}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

const Detail: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-3 rounded-xl bg-midnight border border-charcoal-light">
    <span className="text-[10px] uppercase text-ivory/45 block">{label}</span>
    <strong className="text-ivory break-words">{value}</strong>
  </div>
);
