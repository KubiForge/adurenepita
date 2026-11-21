import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DRUGS_DATA } from '../../data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../../data/sriLankaData';
import {
  Users,
  MessageSquare,
  Heart,
  Star,
  ArrowUpRight,
  ShieldCheck,
  Download,
  Plus,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardView: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-charcoal border border-gold/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider px-2.5 py-0.5 rounded bg-midnight text-gold font-bold border border-gold/30">
              Role: SUPER ADMIN
            </span>
            <span className="text-xs text-ivory/60 font-mono">
              {currentUser?.email || 'admin@btd.lk'}
            </span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-ivory">
            Platform Overview & Key Insights
          </h2>
          <p className="text-xs text-ivory/70 mt-1">
            Real-time operations, service referral metrics, AI interactions, and clinical knowledge governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/content"
            className="btn-gold px-4 py-2 rounded-xl text-xs font-bold shadow-gold-subtle flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-midnight" />
            <span className="text-midnight">+ New Content</span>
          </Link>
          <Link
            to="/admin/services"
            className="btn-charcoal px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Star className="w-4 h-4 text-gold" />
            <span>Verify Services</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards (Screen 01 in Image 7) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Website Visits */}
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

        {/* Card 2: AI Conversations */}
        <div className="charcoal-card p-5 border-charcoal-light">
          <div className="flex items-center justify-between text-xs text-ivory/60">
            <span>AI Conversations</span>
            <MessageSquare className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-gold mt-2">
            1,328
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18% 24/7 engagement</span>
          </div>
        </div>

        {/* Card 3: Referrals */}
        <div className="charcoal-card p-5 border-charcoal-light">
          <div className="flex items-center justify-between text-xs text-ivory/60">
            <span>Referrals</span>
            <Heart className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-champagne mt-2">
            276
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24% support cases</span>
          </div>
        </div>

        {/* Card 4: Verified Services */}
        <div className="charcoal-card p-5 border-charcoal-light">
          <div className="flex items-center justify-between text-xs text-ivory/60">
            <span>Service Providers</span>
            <Star className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-emerald-400 mt-2">
            42
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+8% island-wide centers</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Row: 30-Day Line Chart & Referral Status Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Engagement (Last 30 Days) SVG Chart */}
        <div className="lg:col-span-8 charcoal-card p-6 border-charcoal-light space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
            <div>
              <h3 className="font-heading font-bold text-base text-ivory">
                User Engagement (Last 30 Days)
              </h3>
              <p className="text-[11px] text-ivory/50">Daily visitor interactions and active sessions</p>
            </div>
            <span className="text-xs text-gold font-mono font-bold">Peak: 1,480 Sessions</span>
          </div>

          {/* SVG Line Chart (matching Screenshot 01) */}
          <div className="relative h-56 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200">
              <defs>
                <linearGradient id="goldGradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D35D6E" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#D35D6E" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="50" y1="20" x2="680" y2="20" stroke="rgba(31,41,55,0.08)" strokeDasharray="3 3" />
              <line x1="50" y1="70" x2="680" y2="70" stroke="rgba(31,41,55,0.08)" strokeDasharray="3 3" />
              <line x1="50" y1="120" x2="680" y2="120" stroke="rgba(31,41,55,0.08)" strokeDasharray="3 3" />
              <line x1="50" y1="170" x2="680" y2="170" stroke="rgba(31,41,55,0.14)" />

              {/* Y Axis Labels */}
              <text x="15" y="24" fill="rgba(31,41,55,0.55)" fontSize="10" fontFamily="sans-serif">1.5K</text>
              <text x="15" y="74" fill="rgba(31,41,55,0.55)" fontSize="10" fontFamily="sans-serif">1.2K</text>
              <text x="15" y="124" fill="rgba(31,41,55,0.55)" fontSize="10" fontFamily="sans-serif">900</text>
              <text x="15" y="174" fill="rgba(31,41,55,0.55)" fontSize="10" fontFamily="sans-serif">300</text>

              {/* Chart Filled Area */}
              <polygon
                points="50,170 50,150 140,140 230,145 320,130 410,110 500,80 590,60 680,45 680,170"
                fill="url(#goldGradientArea)"
              />

              {/* Chart Golden Line */}
              <polyline
                points="50,150 140,140 230,145 320,130 410,110 500,80 590,60 680,45"
                fill="none"
                stroke="#8B1E2D"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Points */}
              {[[50,150],[140,140],[230,145],[320,130],[410,110],[500,80],[590,60],[680,45]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4" fill="#FFFFFF" stroke="#8B1E2D" strokeWidth="2.5" />
              ))}

              {/* X Axis Labels */}
              <text x="45" y="195" fill="rgba(31,41,55,0.55)" fontSize="10">Oct 12</text>
              <text x="135" y="195" fill="rgba(31,41,55,0.55)" fontSize="10">Oct 17</text>
              <text x="225" y="195" fill="rgba(31,41,55,0.55)" fontSize="10">Oct 22</text>
              <text x="315" y="195" fill="rgba(31,41,55,0.55)" fontSize="10">Oct 27</text>
              <text x="405" y="195" fill="rgba(31,41,55,0.55)" fontSize="10">Nov 01</text>
              <text x="665" y="195" fill="rgba(31,41,55,0.55)" fontSize="10">Nov 06</text>
            </svg>
          </div>
        </div>

        {/* Referral Status Donut Chart */}
        <div className="lg:col-span-4 charcoal-card p-6 border-charcoal-light flex flex-col justify-between space-y-4">
          <div className="border-b border-charcoal-light pb-3">
            <h3 className="font-heading font-bold text-base text-ivory">
              Referral Status
            </h3>
            <p className="text-[11px] text-ivory/50">Breakdown of active client assistance cases</p>
          </div>

          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Completed: 48% (Emerald) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#10b981"
                strokeWidth="11"
                strokeDasharray="238.7"
                strokeDashoffset="124.1" /* 48% */
                fill="transparent"
              />
              {/* In Progress: 32% (Gold) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#8B1E2D"
                strokeWidth="11"
                strokeDasharray="238.7"
                strokeDashoffset="162.3" /* 32% */
                fill="transparent"
                style={{ transform: 'rotate(172.8deg)', transformOrigin: 'center' }}
              />
              {/* Pending: 20% (Amber) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#f59e0b"
                strokeWidth="11"
                strokeDasharray="238.7"
                strokeDashoffset="190.9" /* 20% */
                fill="transparent"
                style={{ transform: 'rotate(288deg)', transformOrigin: 'center' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold font-heading text-ivory">276</span>
              <span className="text-[10px] text-ivory/50 uppercase">Total Referrals</span>
            </div>
          </div>

          <div className="space-y-2 text-xs pt-2 border-t border-charcoal-light">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-ivory/80">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Completed</span>
              </span>
              <span className="font-mono font-bold text-emerald-400">48% (132)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-ivory/80">
                <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                <span>In Progress</span>
              </span>
              <span className="font-mono font-bold text-gold">32% (88)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-ivory/80">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Pending</span>
              </span>
              <span className="font-mono font-bold text-amber-400">20% (56)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="charcoal-card p-6 border-charcoal-light space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
          <h3 className="font-heading font-bold text-base text-ivory flex items-center gap-2">
            <Activity className="w-4 h-4 text-gold" />
            <span>Recent Administrative Activities</span>
          </h3>
          <Link to="/admin/audit" className="text-xs text-gold hover:underline">
            View All Audit Logs →
          </Link>
        </div>

        <div className="divide-y divide-charcoal-light text-xs">
          {[
            { action: 'Support Referral REF-1048 assigned to NDDCB Colombo', time: '10 mins ago', user: 'Admin Specialist', status: 'In Progress' },
            { action: 'Published educational monograph update for Methamphetamine', time: '45 mins ago', user: 'Content Editor', status: 'Published' },
            { action: 'Verified new rehabilitation facility: SADHC Kandy', time: '2 hours ago', user: 'Admin Specialist', status: 'Verified' },
            { action: 'Reconciled anonymous donation of LKR 5,000 (DON-2189)', time: '3 hours ago', user: 'Financial System', status: 'Reconciled' },
          ].map((act, i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="font-medium text-ivory">{act.action}</div>
                <div className="text-[11px] text-ivory/50">By {act.user} • {act.time}</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-midnight border border-gold/30 text-gold">
                {act.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
