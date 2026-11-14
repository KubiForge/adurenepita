import React, { useState } from 'react';
import {
  Heart, Download, Search, CheckCircle2, Clock,
  AlertTriangle, DollarSign, ArrowUpRight, Filter
} from 'lucide-react';

interface DonationItem {
  id: string;
  refNo: string;
  donor: string;
  amount: number;
  currency: string;
  method: 'Card' | 'Bank Transfer' | 'LankaQR';
  date: string;
  status: 'Successful' | 'Pending' | 'Failed';
  allocation: string;
}

export const AdminDonationsModule: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Successful' | 'Pending' | 'Failed'>('All');
  const [search, setSearch] = useState('');

  const [donations, setDonations] = useState<DonationItem[]>([
    {
      id: 'd-1',
      refNo: 'DON-2189',
      donor: 'Anonymous',
      amount: 5000,
      currency: 'LKR',
      method: 'Card',
      date: 'Nov 10, 2026',
      status: 'Successful',
      allocation: 'Campus Youth Peer Mentorship',
    },
    {
      id: 'd-2',
      refNo: 'DON-2188',
      donor: 'S. Perera',
      amount: 10000,
      currency: 'LKR',
      method: 'Card',
      date: 'Nov 09, 2026',
      status: 'Successful',
      allocation: 'Drug Knowledge Centre & Clinical Grounding',
    },
    {
      id: 'd-3',
      refNo: 'DON-2187',
      donor: 'Anonymous',
      amount: 2500,
      currency: 'LKR',
      method: 'Card',
      date: 'Nov 09, 2026',
      status: 'Successful',
      allocation: 'Island-wide High School Caravans',
    },
    {
      id: 'd-4',
      refNo: 'DON-2186',
      donor: 'K. Fernando',
      amount: 25000,
      currency: 'LKR',
      method: 'Bank Transfer',
      date: 'Nov 08, 2026',
      status: 'Successful',
      allocation: 'General Drug Prevention Fund',
    },
    {
      id: 'd-5',
      refNo: 'DON-2185',
      donor: 'M. Jayawardena',
      amount: 1500,
      currency: 'LKR',
      method: 'LankaQR',
      date: 'Nov 07, 2026',
      status: 'Pending',
      allocation: 'Campus Awareness',
    },
  ]);

  const filteredDonations = donations.filter((d) => {
    const matchFilter = filter === 'All' || d.status === filter;
    const matchSearch =
      d.refNo.toLowerCase().includes(search.toLowerCase()) ||
      d.donor.toLowerCase().includes(search.toLowerCase()) ||
      d.amount.toString().includes(search);
    return matchFilter && matchSearch;
  });

  const totalSum = donations
    .filter((d) => d.status === 'Successful')
    .reduce((acc, c) => acc + c.amount, 0);

  const handleExportCsv = () => {
    const headers = ['RefNo', 'Donor', 'Amount', 'Currency', 'Method', 'Date', 'Status', 'Allocation'];
    const rows = filteredDonations.map((d) => [
      d.refNo,
      `"${d.donor}"`,
      d.amount,
      d.currency,
      d.method,
      d.date,
      d.status,
      `"${d.allocation}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `btd_donations_${Date.now()}.csv`);
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
            Donation Management
          </h2>
          <p className="text-xs text-ivory/60 mt-0.5">
            Track public contributions, payment reconciliations, transactions and formal digital receipts.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold shadow-gold-subtle flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-midnight" />
          <span className="text-midnight">+ Export CSV</span>
        </button>
      </div>

      {/* 3 Metric Cards (Screen 07 in Image 7) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="charcoal-card p-5 border-gold/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-ivory/60">Total Donations</span>
            <span className="p-2 rounded-xl bg-gold/15 text-gold">
              <Heart className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-gold mt-2">
            LKR 352,600
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">Reconciled in bank ledger</p>
        </div>

        <div className="charcoal-card p-5 border-charcoal-light">
          <div className="flex items-center justify-between">
            <span className="text-xs text-ivory/60">Total Contributors</span>
            <span className="p-2 rounded-xl bg-midnight text-ivory/60">
              <Heart className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-ivory mt-2">
            142
          </div>
          <p className="text-[11px] text-ivory/40 mt-1">Donations island-wide & global</p>
        </div>

        <div className="charcoal-card p-5 border-charcoal-light">
          <div className="flex items-center justify-between">
            <span className="text-xs text-ivory/60">Average Donation</span>
            <span className="p-2 rounded-xl bg-midnight text-ivory/60">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-champagne mt-2">
            LKR 4,500
          </div>
          <p className="text-[11px] text-ivory/40 mt-1">Average per transaction</p>
        </div>
      </div>

      {/* Search & Filter pills */}
      <div className="charcoal-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Successful', 'Pending', 'Failed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filter === tab
                  ? 'bg-gold text-midnight shadow-sm'
                  : 'text-ivory/60 hover:text-ivory bg-midnight/70'
              }`}
            >
              {tab === 'All' ? 'All Transactions' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-ivory/40 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by donor, reference or amount..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="charcoal-card border-charcoal-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-charcoal-light bg-midnight/70 text-ivory/60">
                <th className="p-3.5 font-bold uppercase tracking-wider">Ref. No.</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Donor</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Amount</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Method</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Date</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-light">
              {filteredDonations.map((d) => (
                <tr key={d.id} className="hover:bg-midnight/40 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-gold">
                    {d.refNo}
                  </td>
                  <td className="p-3.5 font-semibold text-ivory">
                    {d.donor}
                  </td>
                  <td className="p-3.5 font-bold text-champagne font-mono">
                    LKR {d.amount.toLocaleString()}
                  </td>
                  <td className="p-3.5 text-ivory/80">
                    <span className="px-2 py-0.5 rounded bg-charcoal border border-charcoal-light">
                      {d.method}
                    </span>
                  </td>
                  <td className="p-3.5 text-ivory/50">{d.date}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        d.status === 'Successful'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : d.status === 'Pending'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-red-950 text-red-400 border border-red-800'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
