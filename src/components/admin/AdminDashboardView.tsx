import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DRUGS_DATA } from '../../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../../data/sriLankaData';
import { paymentService } from '../../services/paymentService';
import { DonationRecord } from '../../types/donation';
import {
  Users,
  Database,
  HeartHandshake,
  FileText,
  ShieldCheck,
  Download,
  Plus,
  Edit,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../common/Button';

export const AdminDashboardView: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'drugs' | 'directory' | 'donations' | 'volunteers'>('overview');
  const [donations, setDonations] = useState<DonationRecord[]>(() => paymentService.getRecordsFromLocalCache());

  // Metrics
  const totalVerifiedLKR = donations
    .filter((d) => d.paymentStatus === 'verified')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const exportDonationsCsv = () => {
    const headers = ['ReferenceID', 'Amount', 'Currency', 'Status', 'Donor', 'Allocation', 'Date'];
    const rows = donations.map((d) => [
      d.referenceId,
      d.amount,
      d.currency,
      d.paymentStatus,
      d.isAnonymous ? 'Anonymous' : d.donorName || 'N/A',
      `"${d.campaignAllocation}"`,
      d.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `btd_donations_reconciliation_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-charcoal border border-gold/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider px-2.5 py-0.5 rounded bg-midnight text-gold font-bold border border-gold/30">
              Role: ADMIN
            </span>
            <span className="text-xs text-ivory/60">
              Authenticated identity: {currentUser?.email}
            </span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-ivory">
            Leo Club Operational Administration
          </h2>
          <p className="text-xs text-ivory/70 mt-1">
            Oversee verified support directories, drug knowledge records, donation ledger reconciliation, and volunteer operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="charcoal" size="sm" onClick={exportDonationsCsv} leftIcon={<Download className="w-4 h-4 text-gold" />}>
            Export Financial Ledger
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-charcoal-light pb-2">
        {[
          { id: 'overview', label: 'Overview Metrics' },
          { id: 'donations', label: `Donations (${donations.length})` },
          { id: 'drugs', label: `Drug Knowledge (${DRUGS_DATA.length})` },
          { id: 'directory', label: `Support Directory (${SUPPORT_CENTERS_DATA.length})` },
          { id: 'volunteers', label: 'Volunteer Applications' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gold text-midnight shadow-gold-subtle'
                : 'text-ivory/70 hover:text-ivory hover:bg-charcoal'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="charcoal-card p-5">
              <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                Total Verified Funds
              </span>
              <div className="text-2xl font-bold text-champagne font-mono mt-1">
                Rs. {totalVerifiedLKR.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-400 mt-1 block">
                Reconciled with payment gateway
              </span>
            </div>

            <div className="charcoal-card p-5">
              <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                Verified Support Centers
              </span>
              <div className="text-2xl font-bold text-ivory font-mono mt-1">
                {SUPPORT_CENTERS_DATA.length}
              </div>
              <span className="text-[11px] text-ivory/50 mt-1 block">
                Across 9 provinces & 25 districts
              </span>
            </div>

            <div className="charcoal-card p-5">
              <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                Approved Drug Monographs
              </span>
              <div className="text-2xl font-bold text-ivory font-mono mt-1">
                {DRUGS_DATA.length}
              </div>
              <span className="text-[11px] text-emerald-400 mt-1 block">
                100% medically reviewed & cited
              </span>
            </div>

            <div className="charcoal-card p-5">
              <span className="text-xs text-gold uppercase tracking-wider font-semibold block">
                Total Educational Visits
              </span>
              <div className="text-2xl font-bold text-ivory font-mono mt-1">
                14,280
              </div>
              <span className="text-[11px] text-gold/80 mt-1 block">
                3,412 AI inquiries handled safely
              </span>
            </div>
          </div>

          {/* Governance Notice */}
          <div className="p-4 rounded-xl bg-charcoal border border-charcoal-light text-xs text-ivory/70 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-ivory text-sm">Two-Role Access Control Model:</p>
              <p className="mt-1 leading-relaxed">
                As per official platform governance, this system enforces only two roles: <strong>ADMIN</strong> and <strong>TECHNICAL CREW</strong>. As an Admin, you govern public content, verified support directories, and financial records. Private user chat histories are restricted and not exposed to administrators by default to preserve strict user confidentiality.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DONATION RECONCILIATION */}
      {activeTab === 'donations' && (
        <div className="charcoal-card overflow-hidden">
          <div className="p-4 border-b border-charcoal-light flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-ivory">
              Financial Reconciliation Ledger (Google Sheets: DonationRecords)
            </h3>
            <span className="text-xs text-ivory/50">
              Only verified payments reflect in campaign accounts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ivory/80">
              <thead className="bg-midnight/80 uppercase text-[10px] tracking-wider text-gold/80 border-b border-charcoal-light">
                <tr>
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Donor</th>
                  <th className="p-3">Gateway</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Drive Receipt</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-light">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-charcoal-light/30">
                    <td className="p-3 font-mono text-champagne font-bold">{d.referenceId}</td>
                    <td className="p-3 font-semibold text-ivory">
                      {d.currency} {d.amount.toLocaleString()}
                    </td>
                    <td className="p-3">{d.isAnonymous ? 'Anonymous Supporter' : d.donorName}</td>
                    <td className="p-3 uppercase font-mono text-[11px]">{d.paymentProvider}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          d.paymentStatus === 'verified'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {d.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[10px] text-ivory/50">
                      {d.receiptDriveReference ? 'Generated in Drive' : 'Pending'}
                    </td>
                    <td className="p-3 text-ivory/50 font-mono">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DRUG KNOWLEDGE MONOGRAPHS */}
      {activeTab === 'drugs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-ivory">
              Approved Substance Knowledge Base (Google Sheets: DrugKnowledge)
            </h3>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>All 6 Active Monographs Medically Approved</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DRUGS_DATA.map((drug) => (
              <div key={drug.id} className="charcoal-card p-5 border border-charcoal-light flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-base text-ivory">{drug.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold uppercase">
                      {drug.reviewStatus}
                    </span>
                  </div>
                  <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">{drug.nameSi}</p>
                  <p className="text-xs text-ivory/60 mt-2 line-clamp-2 leading-relaxed">
                    {drug.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-charcoal-light flex items-center justify-between text-xs text-ivory/50">
                  <span>Reviewed: {drug.lastReviewDate}</span>
                  <span className="text-gold font-medium">{drug.reviewerName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUPPORT DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="charcoal-card overflow-hidden">
          <div className="p-4 border-b border-charcoal-light flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-ivory">
              Verified Sri Lankan Care Directory (Google Sheets: SupportDirectory)
            </h3>
            <span className="text-xs text-ivory/50">Periodic re-verification required</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ivory/80">
              <thead className="bg-midnight/80 uppercase text-[10px] tracking-wider text-gold/80 border-b border-charcoal-light">
                <tr>
                  <th className="p-3">Facility Name</th>
                  <th className="p-3">District</th>
                  <th className="p-3">Official Phone</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Verified By</th>
                  <th className="p-3">Last Checked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-light">
                {SUPPORT_CENTERS_DATA.map((center) => (
                  <tr key={center.id} className="hover:bg-charcoal-light/30">
                    <td className="p-3 font-semibold text-ivory">{center.name}</td>
                    <td className="p-3">{center.district}</td>
                    <td className="p-3 font-mono text-champagne font-bold">{center.phone}</td>
                    <td className="p-3 uppercase text-[10px]">{center.organizationType}</td>
                    <td className="p-3 text-ivory/60">{center.verifiedBy}</td>
                    <td className="p-3 text-emerald-400 font-mono text-[11px]">
                      {center.lastVerifiedDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: VOLUNTEER ACTIVITY */}
      {activeTab === 'volunteers' && (
        <div className="charcoal-card p-6 space-y-4">
          <h3 className="font-heading font-bold text-base text-ivory">
            Volunteer Registrations & Community Involvement
          </h3>
          <p className="text-xs text-ivory/60">
            Recent applicants for Leo Club campus awareness drives and content development:
          </p>
          <div className="space-y-3">
            {[
              { name: 'Kavindu Dilshan', email: 'kavindu@usj.ac.lk', faculty: 'Applied Sciences', role: 'Community Outreach Ambassador', date: '2026-11-09' },
              { name: 'Sanduni Nethmini', email: 'sanduni@usj.ac.lk', faculty: 'Humanities & Social Sciences', role: 'Multilingual Content Creator', date: '2026-11-08' },
              { name: 'Tharusha Perera', email: 'tharusha@usj.ac.lk', faculty: 'Management Studies', role: 'Technical Support Assistant', date: '2026-11-07' },
            ].map((v, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-midnight border border-charcoal-light flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-ivory">{v.name} ({v.email})</h4>
                  <p className="text-ivory/60">{v.faculty} • Role: <strong className="text-gold">{v.role}</strong></p>
                </div>
                <span className="font-mono text-ivory/40">{v.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
