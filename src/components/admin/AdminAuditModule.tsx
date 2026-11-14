import React, { useState } from 'react';
import { Shield, Search, Filter, Clock, CheckCircle2, AlertTriangle, Download } from 'lucide-react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  userEmail: string;
  action: string;
  resource: string;
  status: 'Success' | 'Warning' | 'Error';
  ipAddress: string;
}

export const AdminAuditModule: React.FC = () => {
  const [search, setSearch] = useState('');

  const [logs] = useState<AuditLogEntry[]>([
    {
      id: 'log-1',
      timestamp: '2026-11-13 18:42:10',
      userEmail: 'admin@btd.lk',
      action: 'UPDATE_SERVICE_VERIFICATION',
      resource: 'SupportCenter (svc-001 NDDCB)',
      status: 'Success',
      ipAddress: '192.248.32.14',
    },
    {
      id: 'log-2',
      timestamp: '2026-11-13 17:15:33',
      userEmail: 'editor@btd.lk',
      action: 'PUBLISH_ARTICLE',
      resource: 'ContentItem (Understanding Addiction)',
      status: 'Success',
      ipAddress: '112.134.19.82',
    },
    {
      id: 'log-3',
      timestamp: '2026-11-13 15:02:18',
      userEmail: 'tech@btd.lk',
      action: 'SYNC_RAG_EMBEDDINGS',
      resource: 'Google Sheets DrugKnowledge Tab',
      status: 'Success',
      ipAddress: '192.248.32.18',
    },
    {
      id: 'log-4',
      timestamp: '2026-11-13 14:10:04',
      userEmail: 'system_gateway',
      action: 'DONATION_VERIFICATION',
      resource: 'DonationRecord (DON-2189)',
      status: 'Success',
      ipAddress: 'PayHere Webhook',
    },
    {
      id: 'log-5',
      timestamp: '2026-11-13 11:22:45',
      userEmail: 'unknown_client',
      action: 'FAILED_ADMIN_LOGIN',
      resource: '/admin/settings',
      status: 'Warning',
      ipAddress: '124.43.12.90',
    },
  ]);

  const filteredLogs = logs.filter(
    (l) =>
      l.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.resource.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCsv = () => {
    const headers = ['ID', 'Timestamp', 'UserEmail', 'Action', 'Resource', 'Status', 'IPAddress'];
    const rows = filteredLogs.map((l) => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.userEmail}"`,
      `"${l.action}"`,
      `"${l.resource.replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.ipAddress}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `btd_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-ivory">
            Security & Audit Logs
          </h2>
          <p className="text-xs text-ivory/60 mt-0.5">
            Append-only administrative audit trail recording privileged actions, data alterations and security events.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold shadow-gold-subtle flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-midnight" />
          <span className="text-midnight">+ Export Logs (CSV)</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-ivory/40 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Filter audit log by user, action or resource..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
        />
      </div>

      {/* Logs Table */}
      <div className="charcoal-card border-charcoal-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-charcoal-light bg-midnight/70 text-ivory/60">
                <th className="p-3.5 font-bold uppercase tracking-wider">Timestamp</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Actor / User</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Action</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Target Resource</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Status</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-right">Source IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-light font-mono text-[11px]">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-midnight/40 transition-colors">
                  <td className="p-3.5 text-ivory/60">{l.timestamp}</td>
                  <td className="p-3.5 text-gold font-bold">{l.userEmail}</td>
                  <td className="p-3.5 text-champagne">{l.action}</td>
                  <td className="p-3.5 text-ivory/80">{l.resource}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        l.status === 'Success'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : l.status === 'Warning'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-red-950 text-red-400 border border-red-800'
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right text-ivory/40">{l.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
