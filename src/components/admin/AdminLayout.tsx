import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, BookOpen, MapPin, Users, Megaphone,
  Heart, BarChart2, Settings, Shield, Bell, Search, ChevronDown,
  Menu, X, LogOut, User, ChevronRight, ArrowLeft
} from 'lucide-react';
import { ASSETS } from '../../config/assets';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/admin',           label: 'Dashboard',         icon: LayoutDashboard, end: true },
  { to: '/admin/content',   label: 'Content',           icon: FileText },
  { to: '/admin/knowledge', label: 'Knowledge Centre',  icon: BookOpen },
  { to: '/admin/services',  label: 'Services Directory',icon: MapPin },
  { to: '/admin/users',     label: 'Users & Referrals', icon: Users },
  { to: '/admin/campaigns', label: 'Campaigns',         icon: Megaphone },
  { to: '/admin/donations', label: 'Donations',         icon: Heart },
  { to: '/admin/analytics', label: 'Analytics & Reports',icon: BarChart2 },
  { to: '/admin/settings',  label: 'System Settings',   icon: Settings },
  { to: '/admin/audit',     label: 'Audit Logs',        icon: Shield },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  const initials = (currentUser?.name || currentUser?.email || 'A')
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-midnight text-ivory flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Persistent Sidebar (Image 7 Reference) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-smoky border-r border-charcoal-light flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-charcoal-light flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-gold/40 shadow-gold-subtle flex-shrink-0">
              <img src={ASSETS.logoIcon} alt="Beyond the Darkness Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm text-gold leading-tight">
                BEYOND THE DARKNESS
              </h2>
              <span className="text-[10px] text-ivory/50 uppercase tracking-wider block">
                Admin Portal
              </span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg text-ivory/40 hover:text-ivory lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-ivory/40 uppercase tracking-widest px-3 py-2">
            Management Modules
          </div>

          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => {
            const isActive = end
              ? location.pathname === to
              : location.pathname.startsWith(to);

            return (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gold/15 text-gold border border-gold/30 shadow-gold-subtle'
                    : 'text-ivory/70 hover:bg-midnight/60 hover:text-ivory'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-ivory/50'}`} />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Public Website Backlink & User Profile Box */}
        <div className="p-3 border-t border-charcoal-light space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-ivory/60 hover:text-gold hover:bg-midnight/60 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </NavLink>

          <div className="p-3 rounded-xl bg-midnight border border-charcoal-light flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold text-xs flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-ivory truncate">{currentUser?.name || 'Administrator'}</div>
                <div className="text-[10px] text-ivory/50 truncate">{currentUser?.email}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-ivory/40 hover:text-red-400 hover:bg-charcoal transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-smoky border-b border-charcoal-light sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-ivory/70 hover:text-ivory lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick Search */}
            <div className="relative w-64 hidden sm:block">
              <Search className="w-3.5 h-3.5 text-ivory/40 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search portal records..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold placeholder:text-ivory/40"
              />
            </div>
          </div>

          {/* Right Actions: Notifications & Profile */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setProfileOpen(false);
                }}
                className="p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory/70 hover:text-gold relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold animate-pulse" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-2rem))] charcoal-card border-gold/30 shadow-2xl p-4 space-y-3 z-50 text-xs">
                  <div className="font-bold text-ivory border-b border-charcoal-light pb-2 flex items-center justify-between">
                    <span>Recent Notifications</span>
                    <span className="text-[10px] text-gold font-mono">3 New</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-midnight/80 border border-charcoal-light space-y-0.5">
                      <div className="font-semibold text-ivory">New Support Referral Logged</div>
                      <div className="text-[10px] text-ivory/50">REF-1048 • 5 minutes ago</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-midnight/80 border border-charcoal-light space-y-0.5">
                      <div className="font-semibold text-ivory">Service Provider Verified</div>
                      <div className="text-[10px] text-ivory/50">NDDCB Colombo • 1 hour ago</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-midnight/80 border border-charcoal-light space-y-0.5">
                      <div className="font-semibold text-ivory">Donation Reconciled</div>
                      <div className="text-[10px] text-ivory/50">DON-2189 (LKR 5,000) • 2 hours ago</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-midnight border border-charcoal-light hover:border-gold/40 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                  AS
                </div>
                <span className="text-xs font-semibold text-ivory hidden sm:inline">
                  Admin
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-ivory/50" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 charcoal-card border-gold/30 shadow-2xl p-2 space-y-1 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-charcoal-light">
                    <strong className="block text-ivory">{currentUser?.name || 'Administrator'}</strong>
                    <span className="text-[10px] text-gold">{currentUser?.email}</span>
                  </div>
                  <NavLink
                    to="/admin/settings"
                    onClick={() => setProfileOpen(false)}
                    className="block px-3 py-2 rounded-lg text-ivory/70 hover:bg-midnight hover:text-gold"
                  >
                    System Settings
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-midnight flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page View Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
