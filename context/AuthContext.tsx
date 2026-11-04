// Authentication & User State Context for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: (role: UserRole) => Promise<void>;
  register: (fullName: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const STORAGE_KEY = 'kia_auth_profile_v1';

export const DEMO_USERS: Record<string, UserProfile> = {
  super_admin: {
    id: 'usr-admin-dilfuza',
    fullName: 'Nasriddinova Dilfuza',
    email: 'admin@kia-autocenter.uz',
    phone: '+998 71 200 05 25',
    role: 'super_admin',
    preferredLanguage: 'uz',
    city: 'Tashkent',
    createdAt: new Date().toISOString(),
  },
  sales_consultant: {
    id: 'usr-sales-alisher',
    fullName: 'Alisher Shodiyev',
    email: 'sales@kia-autocenter.uz',
    phone: '+998 90 123 45 67',
    role: 'sales_consultant',
    preferredLanguage: 'uz',
    city: 'Tashkent',
    createdAt: new Date().toISOString(),
  },
  customer: {
    id: 'usr-customer-dilshod',
    fullName: 'Dilshod Ergashev',
    email: 'customer@kia-autocenter.uz',
    phone: '+998 99 987 65 43',
    role: 'customer',
    preferredLanguage: 'uz',
    city: 'Tashkent',
    createdAt: new Date().toISOString(),
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
  isStaff: false,
  login: async () => ({ success: false }),
  loginAsDemo: async () => {},
  register: async () => ({ success: false }),
  logout: async () => {},
  updateProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredSession();
  }, []);

  const loadStoredSession = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default guest starts logged in as demo customer or null
        // Let's keep null until user selects or logs in
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            phone: data.user.user_metadata?.phone || '+998 90 000 00 00',
            role: data.user.user_metadata?.role || 'customer',
            preferredLanguage: 'uz',
            createdAt: data.user.created_at,
          };
          setUser(profile);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
          setIsLoading(false);
          return { success: true };
        }
      }

      // Check demo credentials or create session
      const foundDemo = Object.values(DEMO_USERS).find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      const profile: UserProfile = foundDemo || {
        id: `usr-${Date.now()}`,
        email,
        fullName: email.split('@')[0],
        phone: '+998 90 123 45 67',
        role: email.includes('admin') ? 'super_admin' : 'customer',
        preferredLanguage: 'uz',
        createdAt: new Date().toISOString(),
      };

      setUser(profile);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setIsLoading(false);
      return { success: true };
    } catch (e: any) {
      setIsLoading(false);
      return { success: false, error: e?.message || 'Login error' };
    }
  };

  const loginAsDemo = async (role: UserRole) => {
    setIsLoading(true);
    const demo = DEMO_USERS[role] || DEMO_USERS.customer;
    setUser(demo);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    setIsLoading(false);
  };

  const register = async (
    fullName: string,
    email: string,
    phone: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: {
              full_name: fullName,
              phone,
              role: 'customer',
            },
          },
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
      }

      const newProfile: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName,
        email,
        phone,
        role: 'customer',
        preferredLanguage: 'uz',
        createdAt: new Date().toISOString(),
      };

      setUser(newProfile);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      setIsLoading(false);
      return { success: true };
    } catch (e: any) {
      setIsLoading(false);
      return { success: false, error: e?.message || 'Registration error' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut().catch(() => {});
    }
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';
  const isStaff =
    isAdmin ||
    user?.role === 'manager' ||
    user?.role === 'sales_consultant' ||
    user?.role === 'service_manager';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin,
        isStaff,
        login,
        loginAsDemo,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
