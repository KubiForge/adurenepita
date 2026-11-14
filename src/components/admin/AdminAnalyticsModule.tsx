import React, { useState } from 'react';
import {
  BarChart2, Download, TrendingUp, Users, MessageSquare,
  Compass, Heart, Globe, Calendar, ArrowUpRight
} from 'lucide-react';

export const AdminAnalyticsModule: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  const topicsData = [
    { name: 'Drug Effects & Risks', count: 3926, percentage: '31%' },
    { name: 'How to Get Help', count: 2418, percentage: '19%' },
    { name: 'Prevention & Awareness', count: 1874, percentage: '15%' },
    { name: 'Rehabilitation Options', count: 1206, percentage: '10%' },
    { name: 'Family & Friend Guidance', count: 980, percentage: '8%' },
  ];

  const handleExportReport = () => {
    alert('Exporting comprehensive 30-day analytics executive report (PDF/CSV)...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-ivory">
            Reports & Analytics
          </h2>
          <p className="text-xs text-ivory/60 mt-0.5">
            Platform usage, user engagement metrics, language distributions and impact insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold font-semibold"
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 90 Days">Last 90 Days</option>
            <option value="All Time">All Time</option>
          </select>

          <button
            onClick={handleExportReport}
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold shadow-gold-subtle flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-midnight" />
            <span className="text-midnight">+ Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards (Screen 08 in Image 7) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="charcoal-card p-5 border-charcoal-light">
          <div className="flex items-center justify-between text-xs text-ivory/60">
            <span>Website Visits</span>
            <Users className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-ivory mt-2">
            12,480
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12% vs last month</span>
          </div>
        </div>

        <div className="charcoal-card p-5 border-charcoal-light">
          <div className="flex items-center justify-between text-xs text-ivory/60">
            <span>AI Chats</span>
            <MessageSquare className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-gold mt-2">
            1,328
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18% engagement</span>
          </div>
        </div>

        <div className="charcoal-card p-5 border-charcoal-light">
          <div className="flex items-center justify-between text-xs text-ivory/60">
            <span>Wizard Completions</span>
            <Compass className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-champagne mt-2">
            948
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+15% completion rate</span>
          </div>
        </div>

        <div className="charcoal-card p-5 border-charcoal-light">
          <div className="flex items-center justify-between text-xs text-ivory/60">
            <span>Service Referrals</span>
            <Heart className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-emerald-400 mt-2">
            276
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24% care connections</span>
          </div>
        </div>
      </div>

      {/* Visual Charts: Most Viewed Topics & User Language Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Most Viewed Topics Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 charcoal-card p-6 border-charcoal-light space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
            <div>
              <h3 className="font-heading font-bold text-base text-ivory">
                Most Viewed Topics
              </h3>
              <p className="text-[11px] text-ivory/50">Top searched and explored educational areas</p>
            </div>
            <span className="text-xs text-gold font-mono font-bold">Total: 10,404 Views</span>
          </div>

          <div className="space-y-4 pt-2">
            {topicsData.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-ivory/80">{item.name}</span>
                  <span className="font-mono font-bold text-gold">{item.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-midnight rounded-full h-2.5 overflow-hidden border border-charcoal-light">
                  <div
                    className="bg-gradient-to-r from-gold via-champagne to-bronze h-full rounded-full transition-all duration-700"
                    style={{ width: `${(item.count / 4000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Language Distribution Donut (5 Cols) */}
        <div className="lg:col-span-5 charcoal-card p-6 border-charcoal-light flex flex-col justify-between space-y-6">
          <div className="border-b border-charcoal-light pb-3">
            <h3 className="font-heading font-bold text-base text-ivory">
              User Language Distribution
            </h3>
            <p className="text-[11px] text-ivory/50">Multilingual visitor session breakdown</p>
          </div>

          {/* Donut representation */}
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Sinhala: 52% */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#D8BE82"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="120.5" /* 52% */
                fill="transparent"
              />
              {/* English: 32% */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#F1DFA5"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="170.8" /* 32% */
                strokeDashoffset-reverse
                fill="transparent"
                style={{ transform: 'rotate(187deg)', transformOrigin: 'center' }}
              />
              {/* Tamil: 16% */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#8F7952"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="211" /* 16% */
                fill="transparent"
                style={{ transform: 'rotate(302deg)', transformOrigin: 'center' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold font-heading text-ivory">12,480</span>
              <span className="text-[10px] text-ivory/50 uppercase">Total Visits</span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-charcoal-light">
            <div className="p-2 rounded-xl bg-midnight border border-charcoal-light">
              <div className="w-2.5 h-2.5 rounded-full bg-gold mx-auto mb-1" />
              <strong className="block text-ivory">Sinhala</strong>
              <span className="text-gold font-mono font-bold">52%</span>
            </div>
            <div className="p-2 rounded-xl bg-midnight border border-charcoal-light">
              <div className="w-2.5 h-2.5 rounded-full bg-champagne mx-auto mb-1" />
              <strong className="block text-ivory">English</strong>
              <span className="text-champagne font-mono font-bold">32%</span>
            </div>
            <div className="p-2 rounded-xl bg-midnight border border-charcoal-light">
              <div className="w-2.5 h-2.5 rounded-full bg-bronze mx-auto mb-1" />
              <strong className="block text-ivory">Tamil</strong>
              <span className="text-bronze font-mono font-bold">16%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
