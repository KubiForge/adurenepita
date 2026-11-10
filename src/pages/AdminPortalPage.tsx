import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminDashboardView } from '../components/admin/AdminDashboardView';
import { TechCrewDashboardView } from '../components/admin/TechCrewDashboardView';
import { Shield, Cpu, LogOut, RefreshCw } from 'lucide-react';
import { Button } from '../components/common/Button';

export const AdminPortalPage: React.FC = () => {
  const { currentUser, role, switchRole, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Role Switcher Toolbar (Development & Evaluation) */}
      <div className="p-4 rounded-xl bg-charcoal border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-midnight border border-gold/40 flex items-center justify-center text-gold">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-ivory/50 uppercase tracking-wider block">
              Active Session Security Context
            </span>
            <div className="text-sm font-bold text-ivory flex items-center gap-2">
              <span>{currentUser?.name || 'Authorized Member'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-midnight text-gold border border-gold/30 font-mono">
                {currentUser?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-ivory/50 hidden md:inline">Switch Role:</span>
          <button
            onClick={() => switchRole('ADMIN')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              role === 'ADMIN'
                ? 'bg-gold text-midnight shadow-gold-subtle'
                : 'bg-midnight text-ivory/60 hover:text-ivory border border-charcoal-light'
            }`}
          >
            Admin View
          </button>

          <button
            onClick={() => switchRole('TECHNICAL_CREW')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              role === 'TECHNICAL_CREW'
                ? 'bg-cyan-500 text-midnight shadow-sm'
                : 'bg-midnight text-ivory/60 hover:text-ivory border border-charcoal-light'
            }`}
          >
            Technical Crew View
          </button>
        </div>
      </div>

      {/* Role-Specific View */}
      {role === 'ADMIN' ? (
        <AdminDashboardView />
      ) : (
        <TechCrewDashboardView />
      )}
    </div>
  );
};
