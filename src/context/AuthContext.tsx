import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { DEMO_USER } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: 'user' | 'artisan', customName?: string) => void;
  register: (name: string, email: string, role: 'user' | 'artisan', city?: string, specialty?: string) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (prompt?: string, onComplete?: () => void) => void;
  closeAuthModal: () => void;
  authPromptText?: string;
  requireAuth: (callback: () => void, promptMessage?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('harfti_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Initial state: not mandatory at beginning! Preload DEMO_USER or allow guest browsing
    return DEMO_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authPromptText, setAuthPromptText] = useState<string | undefined>(undefined);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const isAuthenticated = user !== null;

  useEffect(() => {
    if (user) {
      localStorage.setItem('harfti_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('harfti_user');
    }
  }, [user]);

  const login = (email: string, role: 'user' | 'artisan' = 'user', customName?: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: customName || (role === 'artisan' ? 'المعلم أنس (Anas)' : 'اسم المستخدم (User)'),
      email,
      role,
      city: 'Casablanca, Morocco',
      phone: '+212 661 234 567',
      experience: role === 'artisan' ? '10+ years experience' : undefined,
      specialty: role === 'artisan' ? 'Carpentry & Woodwork' : undefined
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const register = (name: string, email: string, role: 'user' | 'artisan', city = 'Casablanca, Morocco', specialty = 'Traditional Crafts') => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      city,
      phone: '+212 600 000 000',
      experience: role === 'artisan' ? '5+ years experience' : undefined,
      specialty: role === 'artisan' ? specialty : undefined
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updatedData });
  };

  const openAuthModal = (prompt?: string, onComplete?: () => void) => {
    setAuthPromptText(prompt);
    if (onComplete) {
      setPendingAction(() => onComplete);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingAction(null);
    setAuthPromptText(undefined);
  };

  const requireAuth = (callback: () => void, promptMessage?: string) => {
    if (isAuthenticated) {
      callback();
    } else {
      openAuthModal(promptMessage, callback);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authPromptText,
        requireAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
