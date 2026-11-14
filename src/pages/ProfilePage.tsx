import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Shield,
  Bell,
  Globe,
  Lock,
  Trash2,
  CheckCircle,
  Eye,
  Key,
  LogOut,
  Download,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { apiService } from '../services/apiService';

type AccountMode = 'login' | 'register' | 'reset' | 'change-password' | 'dashboard';

interface SupportRequestSummary {
  id: string;
  reference: string;
  createdAt: string;
  supportMethod: string;
  status: string;
  province: string;
  district: string;
  latestResponse: { message: string; createdAt: string } | null;
}

export const ProfilePage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const {
    currentUser,
    isAuthenticated,
    isLoading,
    isFirebaseConfigured,
    pendingVerificationEmail,
    login,
    register,
    sendPasswordReset,
    updateAccountPassword,
    updateAccountProfile,
    logout,
  } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [accountMode, setAccountMode] = useState<AccountMode>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [supportRequests, setSupportRequests] = useState<SupportRequestSummary[]>([]);
  const [supportRequestError, setSupportRequestError] = useState<string | null>(null);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'language' | 'privacy' | 'delete'>('profile');
  const [awarenessUpdates, setAwarenessUpdates] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.name || 'Anonymous User');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    const requestedMode = searchParams.get('auth');
    if (requestedMode === 'register' || requestedMode === 'reset' || requestedMode === 'change-password') {
      setAccountMode(requestedMode);
    } else {
      setAccountMode(isAuthenticated ? 'dashboard' : 'login');
    }
  }, [isAuthenticated, searchParams]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;
    setIsLoadingRequests(true);
    apiService.request<SupportRequestSummary[]>('/api/users/support-requests')
      .then((response) => {
        if (active) setSupportRequests(response.data || []);
      })
      .catch((error: unknown) => {
        if (active) setSupportRequestError(error instanceof Error ? error.message : 'Support requests could not be loaded.');
      })
      .finally(() => {
        if (active) setIsLoadingRequests(false);
      });
    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!currentUser) return;
    setDisplayName(currentUser.name);
    setProfilePhone(currentUser.phone || '');
  }, [currentUser]);

  const handleAccountSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError(null);
    setAuthMessage(null);
    setIsSubmittingAuth(true);
    try {
      if (accountMode === 'register') {
        await register({
          fullName,
          email: authEmail,
          phone,
          password: authPassword,
          language,
          acceptedPrivacyPolicy: acceptedPrivacy,
          acceptedTerms,
        });
        setAuthMessage(`A verification link has been sent to ${authEmail.trim()}. Verify your email before signing in.`);
      } else if (accountMode === 'reset') {
        await sendPasswordReset(authEmail);
        setAuthMessage('If an account exists for that address, a password-reset link has been sent.');
      } else if (accountMode === 'change-password') {
        await updateAccountPassword(authPassword);
        setSearchParams({});
        setAccountMode('dashboard');
        setAuthPassword('');
        setAuthMessage('Your password has been updated.');
      } else {
        await login(authEmail, authPassword);
        setSearchParams({});
        setAccountMode('dashboard');
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'The account request could not be completed.');
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-[65vh] flex items-center justify-center text-sm text-ivory/70">Checking secure account...</div>;
  }

  if (!isAuthenticated || accountMode !== 'dashboard' || currentUser?.mustChangePassword) {
    const isRegister = accountMode === 'register';
    const isReset = accountMode === 'reset';
    const isChangingPassword = accountMode === 'change-password' || !!currentUser?.mustChangePassword;
    const isLogin = !isRegister && !isReset && !isChangingPassword;

    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="charcoal-card border-gold/30 p-6 sm:p-8 space-y-5">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Secure account</span>
            <h1 className="text-2xl font-bold font-heading text-ivory mt-1">
              {isRegister ? 'Create account' : isReset ? 'Reset password' : isChangingPassword ? 'Change password' : 'Sign in'}
            </h1>
            <p className="text-xs text-ivory/60 mt-2">
              Your guided assessment stays in this browser unless you explicitly submit a support request with consent.
            </p>
          </div>
          {!isFirebaseConfigured && (
            <p role="alert" className="p-3 rounded-xl bg-amber-950/70 border border-amber-800 text-xs text-amber-200">
              Account services are not configured for this deployment.
            </p>
          )}
          {pendingVerificationEmail && (
            <p role="status" className="p-3 rounded-xl bg-amber-950/70 border border-amber-800 text-xs text-amber-200">
              Verify the link sent to {pendingVerificationEmail} before signing in.
            </p>
          )}
          {authError && <p role="alert" className="p-3 rounded-xl bg-red-950/70 border border-red-800 text-xs text-red-200">{authError}</p>}
          {authMessage && <p role="status" className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 text-xs text-emerald-200">{authMessage}</p>}

          <form onSubmit={handleAccountSubmit} className="space-y-4 text-xs">
            {isRegister && (
              <>
                <label className="block text-ivory/80 font-semibold">
                  Full name or alias
                  <input value={fullName} onChange={(event) => setFullName(event.target.value)} required maxLength={120} autoComplete="name" className="mt-1 w-full px-3 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory" />
                </label>
                <label className="block text-ivory/80 font-semibold">
                  Phone (optional)
                  <input value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={40} autoComplete="tel" className="mt-1 w-full px-3 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory" />
                </label>
              </>
            )}
            {!isChangingPassword && (
              <label className="block text-ivory/80 font-semibold">
                Email
                <input type="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} required autoComplete="email" className="mt-1 w-full px-3 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory" />
              </label>
            )}
            {!isReset && (
              <label className="block text-ivory/80 font-semibold">
                {isChangingPassword ? 'New password' : 'Password'}
                <input
                  type="password"
                  value={authPassword}
                  onChange={(event) => setAuthPassword(event.target.value)}
                  required
                  minLength={isChangingPassword ? 12 : 8}
                  autoComplete={isChangingPassword ? 'new-password' : isRegister ? 'new-password' : 'current-password'}
                  className="mt-1 w-full px-3 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory"
                />
              </label>
            )}
            {isRegister && (
              <div className="space-y-2 text-ivory/70">
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={acceptedPrivacy} onChange={(event) => setAcceptedPrivacy(event.target.checked)} required />
                  <span>I have read and accept the privacy policy.</span>
                </label>
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} required />
                  <span>I agree to the terms of use.</span>
                </label>
              </div>
            )}
            <Button type="submit" variant="gold" size="md" className="w-full" disabled={isSubmittingAuth || !isFirebaseConfigured}>
              {isSubmittingAuth ? 'Please wait...' : isRegister ? 'Create account' : isReset ? 'Send reset link' : isChangingPassword ? 'Update password' : 'Sign in'}
            </Button>
          </form>

          {!currentUser?.mustChangePassword && (
            <div className="flex flex-wrap gap-3 text-xs">
              {!isLogin && !isChangingPassword && <button className="text-gold hover:underline" onClick={() => { setAccountMode('login'); setSearchParams({}); setAuthError(null); }}>Sign in</button>}
              {isLogin && <button className="text-gold hover:underline" onClick={() => { setAccountMode('register'); setSearchParams({ auth: 'register' }); setAuthError(null); }}>Create an account</button>}
              {isLogin && <button className="text-gold hover:underline" onClick={() => { setAccountMode('reset'); setSearchParams({ auth: 'reset' }); setAuthError(null); }}>Forgot password?</button>}
            </div>
          )}
          <Link to="/" className="block text-xs text-ivory/50 hover:text-gold">Return to the public website</Link>
        </div>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    try {
      await updateAccountProfile(displayName, profilePhone, language);
      setIsSaved(true);
      window.setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : 'Profile changes could not be saved.');
    }
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all locally cached recovery notes and wizard progress?')) {
      localStorage.clear();
      alert('Local session data and temporary progress cleared successfully.');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-charcoal-light pb-6">
        <span className="text-xs font-bold text-gold uppercase tracking-wider">
          Account Governance & Privacy Control
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-ivory mt-1">
          Profile & Settings
          <span className="block font-sinhalaSerif text-gold text-2xl mt-0.5">
            ගිණුම සහ රහස්‍යතා සැකසුම්
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-ivory/60 mt-1">
          Manage your personal preferences, multilingual choices, privacy thresholds, and account deletion.
        </p>
        <p className="text-xs text-ivory/60 mt-2">Signed in as <strong className="text-ivory">{currentUser?.email}</strong></p>
        <div className="flex flex-wrap gap-3 mt-3">
          <button
            type="button"
            onClick={() => { setAccountMode('change-password'); setSearchParams({ auth: 'change-password' }); }}
            className="text-xs text-gold hover:underline"
          >
            Change password
          </button>
          <button type="button" onClick={() => void logout()} className="text-xs text-ivory/60 hover:text-red-300">
            Sign out
          </button>
        </div>
      </div>

      <section className="charcoal-card p-5 space-y-3">
        <div>
          <h2 className="text-lg font-heading font-bold text-ivory">My support requests</h2>
          <p className="text-xs text-ivory/60">Private request status and responses are visible only to you.</p>
        </div>
        {isLoadingRequests && <p className="text-xs text-ivory/60">Loading requests...</p>}
        {supportRequestError && <p role="alert" className="text-xs text-red-300">{supportRequestError}</p>}
        {!isLoadingRequests && !supportRequestError && supportRequests.length === 0 && (
          <p className="text-xs text-ivory/60">You have not submitted a support request.</p>
        )}
        {supportRequests.map((request) => (
          <article key={request.id} className="p-4 rounded-xl bg-midnight border border-charcoal-light">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <strong className="font-mono text-gold">{request.reference}</strong>
              <span className="text-[10px] uppercase tracking-wide text-ivory/70">{request.status.replace(/_/g, ' ')}</span>
            </div>
            <p className="text-xs text-ivory/60 mt-1">
              {request.supportMethod.replace(/_/g, ' ')} · {request.district ? `${request.district}, ` : ''}{request.province || 'Location not specified'}
            </p>
            {request.latestResponse && (
              <p className="mt-3 p-3 rounded-lg bg-charcoal/70 text-xs text-ivory/80 whitespace-pre-wrap">
                {request.latestResponse.message}
              </p>
            )}
          </article>
        ))}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="md:col-span-4 charcoal-card p-3 space-y-1">
          {[
            { id: 'profile', label: 'Profile Information', icon: User },
            { id: 'language', label: 'Language & Locale', icon: Globe },
            { id: 'notifications', label: 'Notifications & Updates', icon: Bell },
            { id: 'privacy', label: 'Privacy & Security', icon: Shield },
            { id: 'delete', label: 'Delete Account & Data', icon: Trash2 },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-gold/15 text-gold border border-gold/30 shadow-gold-subtle'
                    : 'text-ivory/70 hover:bg-midnight/60 hover:text-ivory'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-ivory/50'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="md:col-span-8 charcoal-card p-6 sm:p-8 border-gold/30 space-y-6">
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-heading font-bold text-ivory">
                  Profile Information
                </h2>
                <p className="text-xs text-ivory/60">
                  You can use this platform completely anonymously or with a pseudonym.
                </p>
              </div>

              {/* Avatar Row */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-midnight border border-charcoal-light">
                <div className="w-14 h-14 rounded-full bg-gold/15 border-2 border-gold/40 flex items-center justify-center text-gold font-bold text-xl">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ivory">{displayName}</h3>
                  <p className="text-xs text-gold/80">Member since November 2026</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-charcoal text-ivory/60 border border-charcoal-light inline-block mt-1">
                    {isAuthenticated ? 'Authenticated Account' : 'Anonymous Guest Session'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory/80 mb-1">
                    Display Name / Alias
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory/80 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={currentUser?.email || ''}
                    readOnly
                    className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory/80 mb-1">Phone (optional)</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                {profileError && <p role="alert" className="text-xs text-red-300">{profileError}</p>}
                {isSaved && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Preferences saved successfully!</span>
                  </div>
                )}

                <Button type="submit" variant="gold" size="sm" className="font-bold">
                  Save Changes
                </Button>
              </form>
            </div>
          )}

          {activeSection === 'language' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-heading font-bold text-ivory">
                  Language Preferences
                </h2>
                <p className="text-xs text-ivory/60">
                  Select your primary language for navigation, educational monographs, and AI conversations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { code: 'en', label: 'English', native: 'English', desc: 'Full platform & citations' },
                  { code: 'si', label: 'Sinhala', native: 'සිංහල', desc: 'ස්වදේශීය භාෂා සහය' },
                  { code: 'ta', label: 'Tamil', native: 'தமிழ்', desc: 'முழுமையான தமிழ் மொழி' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      language === lang.code
                        ? 'bg-charcoal border-gold text-gold shadow-gold-subtle'
                        : 'bg-midnight/70 border-charcoal-light text-ivory/70 hover:border-gold/30'
                    }`}
                  >
                    <span className="font-bold text-sm block">{lang.label}</span>
                    <span className="text-xs text-gold/90 font-sinhalaSerif block mt-0.5">
                      {lang.native}
                    </span>
                    <span className="text-[10px] text-ivory/40 block mt-1">{lang.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-heading font-bold text-ivory">
                  Notification Preferences
                </h2>
                <p className="text-xs text-ivory/60">
                  Control awareness alerts and referral progress updates.
                </p>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 rounded-xl bg-midnight border border-charcoal-light cursor-pointer">
                  <div>
                    <h3 className="text-xs font-semibold text-ivory">Receive Awareness Updates</h3>
                    <p className="text-[11px] text-ivory/50">
                      Get informed about new campus workshops, youth programs, and educational articles.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={awarenessUpdates}
                    onChange={(e) => setAwarenessUpdates(e.target.checked)}
                    className="h-4 w-4 rounded border-charcoal-light text-gold focus:ring-gold bg-midnight"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl bg-midnight border border-charcoal-light cursor-pointer">
                  <div>
                    <h3 className="text-xs font-semibold text-ivory">Confidential Referral Status Alerts</h3>
                    <p className="text-[11px] text-ivory/50">
                      Notify me when a counsellor or rehabilitation facility reviews my support request.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="h-4 w-4 rounded border-charcoal-light text-gold focus:ring-gold bg-midnight"
                  />
                </label>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-heading font-bold text-ivory">
                  Privacy & Data Safeguards
                </h2>
                <p className="text-xs text-ivory/60">
                  Beyond the Darkness adheres to strict non-identification and data minimization standards.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-midnight border border-charcoal-light flex items-start gap-3">
                  <Shield className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed text-ivory/80">
                    <strong className="text-ivory block mb-0.5">Zero Tracking of Sensitive Conversations</strong>
                    Conversational prompts with the AI assistant are processed securely server-side and are not retained in public analytics.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-midnight border border-charcoal-light flex items-start gap-3">
                  <Lock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed text-ivory/80">
                    <strong className="text-ivory block mb-0.5">Explicit Referral Consent</strong>
                    No personal details or contact information are shared with treatment centers without your active opt-in.
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="charcoal"
                    size="sm"
                    onClick={handleClearData}
                    leftIcon={<Download className="w-4 h-4 text-gold" />}
                  >
                    Clear Local Session Data
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'delete' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-heading font-bold text-red-400">
                  Request Account Deletion
                </h2>
                <p className="text-xs text-ivory/60">
                  Account deletion is not available from this page yet.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-ivory/80 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>No data has been deleted</span>
                </div>
                <p className="leading-relaxed">
                  This page cannot currently delete your Firebase account or records held by the support service.
                  Contact the platform administrator to request account and data deletion.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
