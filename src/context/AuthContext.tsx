import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, UserRole } from '../types/admin';

interface AuthContextType {
  currentUser: AdminUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => boolean;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  allowedEmails: { email: string; role: UserRole; name: string }[];
}

const DEFAULT_ALLOWED_USERS: { email: string; role: UserRole; name: string }[] = [
  {
    email: 'admin@leousj.org',
    role: 'ADMIN',
    name: 'Leo Club Admin Officer',
  },
  {
    email: 'tech@leousj.org',
    role: 'TECHNICAL_CREW',
    name: 'Lead Systems Architect',
  },
];

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  role: null,
  isAuthenticated: false,
  login: () => false,
  switchRole: () => {},
  logout: () => {},
  allowedEmails: DEFAULT_ALLOWED_USERS,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('btd_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default active session for initial exploration
    return {
      id: 'usr-admin-01',
      email: 'admin@leousj.org',
      name: 'Leo Club Admin Officer',
      role: 'ADMIN',
      isActive: true,
      lastLoginAt: new Date().toISOString(),
      createdAt: '2026-11-01T00:00:00.000Z',
    };
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('btd_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('btd_auth_user');
    }
  }, [currentUser]);

  const login = (email: string, chosenRole: UserRole): boolean => {
    const userMatch = DEFAULT_ALLOWED_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    const roleToAssign: UserRole = userMatch ? userMatch.role : chosenRole;
    const nameToAssign = userMatch ? userMatch.name : (chosenRole === 'ADMIN' ? 'Authorized Club Admin' : 'Lead Technical Specialist');

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      email,
      name: nameToAssign,
      role: roleToAssign,
      isActive: true,
      lastLoginAt: new Date().toISOString(),
      createdAt: '2026-11-10T12:00:00.000Z',
    };

    setCurrentUser(newUser);
    return true;
  };

  const switchRole = (newRole: UserRole) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      role: newRole,
      name: newRole === 'ADMIN' ? 'Leo Club Admin Officer' : 'Lead Systems Architect',
      email: newRole === 'ADMIN' ? 'admin@leousj.org' : 'tech@leousj.org',
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || null,
        isAuthenticated: !!currentUser,
        login,
        switchRole,
        logout,
        allowedEmails: DEFAULT_ALLOWED_USERS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
