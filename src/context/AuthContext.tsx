import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
  type User as FirebaseUser,
} from '@firebase/auth';
import { AdminUser, UserRole } from '../types/admin';
import { apiService } from '../services/apiService';
import { ensureAuthPersistence, getFirebaseAuth, isFirebaseConfigured } from '../services/firebaseAuth';

export interface RegisterAccountInput {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  language: 'en' | 'si' | 'ta';
  acceptedPrivacyPolicy: boolean;
  acceptedTerms: boolean;
}

interface AuthContextType {
  currentUser: AdminUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFirebaseConfigured: boolean;
  authError: string | null;
  pendingVerificationEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterAccountInput) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  refreshCurrentUser: () => Promise<void>;
  updateAccountPassword: (password: string) => Promise<void>;
  updateAccountProfile: (fullName: string, phone: string, language: 'en' | 'si' | 'ta') => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
  emailVerified: boolean;
  mustChangePassword?: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const toAuthMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) return error.message;
  return 'Authentication could not be completed. Please try again.';
};

const getProfile = async (firebaseUser: FirebaseUser): Promise<AuthProfile> => {
  const response = await apiService.request<AuthProfile>('/api/auth/me', {
    idToken: await firebaseUser.getIdToken(),
  });
  if (!response.data) {
    throw new Error('The secure account service did not return an account profile.');
  }
  return response.data;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const profileRequestId = useRef(0);

  const syncProfile = useCallback(async (firebaseUser: FirebaseUser | null) => {
    const requestId = ++profileRequestId.current;
    if (!firebaseUser) {
      setCurrentUser(null);
      setPendingVerificationEmail(null);
      setAuthError(null);
      setIsLoading(false);
      return;
    }

    if (!firebaseUser.emailVerified) {
      if (requestId === profileRequestId.current) {
        setCurrentUser(null);
        setPendingVerificationEmail(firebaseUser.email);
        setIsLoading(false);
      }
      return;
    }

    try {
      const profile = await getProfile(firebaseUser);
      if (requestId !== profileRequestId.current) return;
      setCurrentUser(profile);
      setPendingVerificationEmail(null);
      setAuthError(null);
    } catch (error) {
      if (requestId !== profileRequestId.current) return;
      setCurrentUser(null);
      setAuthError(toAuthMessage(error));
    } finally {
      if (requestId === profileRequestId.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setAuthError('Authentication is not configured. Add the Firebase web app settings before enabling accounts.');
      setIsLoading(false);
      return;
    }

    let active = true;
    let unsubscribe: (() => void) | undefined;

    ensureAuthPersistence()
      .then(() => {
        if (!active) return;
        unsubscribe = onAuthStateChanged(getFirebaseAuth(), (firebaseUser) => {
          if (active) void syncProfile(firebaseUser);
        });
      })
      .catch((error: unknown) => {
        if (!active) return;
        setAuthError(toAuthMessage(error));
        setIsLoading(false);
      });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [syncProfile]);

  const login = async (email: string, password: string) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      await ensureAuthPersistence();
      const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
      await reload(credential.user);
      if (!credential.user.emailVerified) {
        await sendEmailVerification(credential.user);
        setPendingVerificationEmail(credential.user.email);
        setCurrentUser(null);
        throw new Error('Verify your email address using the link we sent before signing in.');
      }
      const profile = await getProfile(credential.user);
      setCurrentUser(profile);
      setPendingVerificationEmail(null);
    } catch (error) {
      setAuthError(toAuthMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (input: RegisterAccountInput) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      if (!input.acceptedPrivacyPolicy || !input.acceptedTerms) {
        throw new Error('Accept the privacy policy and terms to create an account.');
      }
      await ensureAuthPersistence();
      const credential = await createUserWithEmailAndPassword(
        getFirebaseAuth(),
        input.email.trim(),
        input.password
      );
      await updateProfile(credential.user, { displayName: input.fullName.trim() });
      await sendEmailVerification(credential.user);
      await apiService.request('/api/auth/register-profile', {
        idToken: await credential.user.getIdToken(),
        body: {
          fullName: input.fullName.trim(),
          phone: input.phone?.trim() || '',
          language: input.language,
          acceptedPrivacyPolicy: input.acceptedPrivacyPolicy,
          acceptedTerms: input.acceptedTerms,
          policyVersion: '2026-11-13',
        },
      });
      setCurrentUser(null);
      setPendingVerificationEmail(input.email.trim());
    } catch (error) {
      setAuthError(toAuthMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(getFirebaseAuth(), email.trim());
  };

  const refreshCurrentUser = async () => {
    const firebaseUser = getFirebaseAuth().currentUser;
    if (!firebaseUser) {
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    await reload(firebaseUser);
    await syncProfile(firebaseUser);
  };

  const updateAccountPassword = async (password: string) => {
    const firebaseUser = getFirebaseAuth().currentUser;
    if (!firebaseUser) throw new Error('Sign in again before changing your password.');
    await updatePassword(firebaseUser, password);
    await apiService.request('/api/auth/password-changed', {
      idToken: await firebaseUser.getIdToken(true),
    });
    await syncProfile(firebaseUser);
  };

  const updateAccountProfile = async (fullName: string, phone: string, language: 'en' | 'si' | 'ta') => {
    const firebaseUser = getFirebaseAuth().currentUser;
    if (!firebaseUser) throw new Error('Sign in before updating your profile.');
    await apiService.request('/api/users/profile', {
      body: { fullName: fullName.trim(), phone: phone.trim(), language },
      idToken: await firebaseUser.getIdToken(),
    });
    await syncProfile(firebaseUser);
  };

  const logout = async () => {
    if (isFirebaseConfigured) await signOut(getFirebaseAuth());
    setCurrentUser(null);
    setPendingVerificationEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role ?? null,
        isAuthenticated: currentUser !== null,
        isLoading,
        isFirebaseConfigured,
        authError,
        pendingVerificationEmail,
        login,
        register,
        sendPasswordReset,
        refreshCurrentUser,
        updateAccountPassword,
        updateAccountProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context;
};
