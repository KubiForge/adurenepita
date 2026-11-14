import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ASSETS } from '../../config/assets';

export const AdminLoginView: React.FC = () => {
  const { login, isFirebaseConfigured, pendingVerificationEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="charcoal-card border-gold/40 p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gold/40 shadow-gold-subtle mx-auto mb-3">
            <img src={ASSETS.logoIcon} alt="Beyond the Darkness Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gold font-bold px-2.5 py-0.5 rounded-full bg-midnight border border-gold/30">
            Restricted System Access
          </span>
          <h1 className="text-2xl font-bold font-heading text-ivory">Admin Portal Login</h1>
          <p className="text-xs text-ivory/60">
            Administrator access is granted by the secure account service.
          </p>
        </div>

        {!isFirebaseConfigured && (
          <div role="alert" className="p-3.5 rounded-xl bg-amber-950/80 border border-amber-800 text-xs text-amber-200">
            Firebase Authentication is not configured for this deployment.
          </div>
        )}
        {pendingVerificationEmail && (
          <div role="status" className="p-3.5 rounded-xl bg-amber-950/80 border border-amber-800 text-xs text-amber-200">
            Verify the email address sent to {pendingVerificationEmail} before signing in.
          </div>
        )}
        {error && (
          <div role="alert" className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-300 flex items-start gap-2.5 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label htmlFor="admin-email" className="block text-ivory/80 font-semibold mb-1">Email address</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-ivory/80 font-semibold mb-1">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isFirebaseConfigured}
            className="btn-gold w-full py-3 rounded-xl font-bold shadow-gold-subtle flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            <Key className="w-4 h-4 text-midnight" />
            <span className="text-midnight">{isSubmitting ? 'Signing in…' : 'Sign in securely'}</span>
          </button>
          <div className="text-center">
            <Link to="/profile?auth=reset" className="text-gold hover:underline">Forgot password?</Link>
            <span className="text-ivory/40 mx-2">·</span>
            <Link to="/profile?auth=register" className="text-gold hover:underline">Create account</Link>
          </div>
        </form>

        <div className="pt-2 text-center border-t border-charcoal-light">
          <Link to="/" className="text-xs text-ivory/50 hover:text-gold flex items-center justify-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
