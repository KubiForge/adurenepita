import { getApps, initializeApp } from '@firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  type Auth,
} from '@firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => typeof value === 'string' && value.length > 0
);

let authInstance: Auth | undefined;
let persistenceSetup: Promise<void> | undefined;

export const getFirebaseAuth = (): Auth => {
  if (!isFirebaseConfigured) {
    throw new Error('Authentication is not configured. Set the VITE_FIREBASE_* environment variables.');
  }

  if (!authInstance) {
    const app = getApps()[0] ?? initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    persistenceSetup = setPersistence(authInstance, browserSessionPersistence);
  }

  return authInstance;
};

export const ensureAuthPersistence = (): Promise<void> => {
  getFirebaseAuth();
  return persistenceSetup as Promise<void>;
};
