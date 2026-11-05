// Authentication & User State Context for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockStore } from '../lib/mockStore';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  login: (emailOrPhone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: (role: UserRole) => Promise<void>;
  register: (fullName: string, phone: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const STORAGE_KEY = 'kia_auth_profile_v3';

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
  admin: {
    id: 'usr-admin-manager',
    fullName: 'Farrux Qodirov',
    email: 'manager@kia-autocenter.uz',
    phone: '+998 90 999 88 77',
    role: 'admin',
    preferredLanguage: 'uz',
    city: 'Tashkent',
    createdAt: new Date().toISOString(),
  },
  sales_manager: {
    id: 'usr-sales-alisher',
    fullName: 'Alisher Shodiyev',
    email: 'sales@kia-autocenter.uz',
    phone: '+998 90 123 45 67',
    role: 'sales_manager',
    preferredLanguage: 'uz',
    city: 'Tashkent',
    createdAt: new Date().toISOString(),
  },
  service_manager: {
    id: 'usr-service-bobur',
    fullName: 'Bobur Rustamov',
    email: 'service@kia-autocenter.uz',
    phone: '+998 94 620 90 80',
    role: 'service_manager',
    preferredLanguage: 'uz',
    city: 'Tashkent',
    createdAt: new Date().toISOString(),
  },
  consultant: {
    id: 'usr-consultant-kamola',
    fullName: 'Kamola Karimova',
    email: 'consultant@kia-autocenter.uz',
    phone: '+998 93 500 11 22',
    role: 'consultant',
    preferredLanguage: 'uz',
    city: 'Tashkent',
    createdAt: new Date().toISOString(),
  },
  report_viewer: {
    id: 'usr-report-ulugbek',
    fullName: 'Ulug‘bek Salimov',
    email: 'reports@kia-autocenter.uz',
    phone: '+998 99 333 22 11',
    role: 'report_viewer',
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
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    emailOrPhone: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const cleanInput = emailOrPhone.trim().toLowerCase();

      if (isSupabaseConfigured && cleanInput.includes('@')) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanInput,
          password: pass,
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || cleanInput,
            fullName: data.user.user_metadata?.full_name || cleanInput.split('@')[0],
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

      // Check predefined staff accounts (Dilfuza, Alisher, etc.)
      const foundDemo = Object.values(DEMO_USERS).find(
        (u) =>
          u.email.toLowerCase() === cleanInput ||
          u.phone.replace(/\D/g, '') === cleanInput.replace(/\D/g, '')
      );

      // Check registered customer list in mockStore
      const registeredCustomers = await mockStore.getCustomers();
      const foundRegistered = registeredCustomers.find(
        (c) =>
          (c.phone && c.phone.replace(/\D/g, '') === cleanInput.replace(/\D/g, '')) ||
          (c.email && c.email.toLowerCase() === cleanInput)
      );

      let role: UserRole = 'customer';
      if (cleanInput.includes('admin') || cleanInput.includes('dilfuza')) {
        role = 'super_admin';
      } else if (cleanInput.includes('sales')) {
        role = 'sales_manager';
      } else if (cleanInput.includes('service')) {
        role = 'service_manager';
      } else if (cleanInput.includes('manager')) {
        role = 'admin';
      } else if (foundDemo) {
        role = foundDemo.role;
      }

      const profile: UserProfile = foundDemo || (foundRegistered ? {
        id: foundRegistered.id,
        fullName: foundRegistered.fullName,
        email: foundRegistered.email || `${cleanInput}@kia-client.uz`,
        phone: foundRegistered.phone,
        role: 'customer',
        preferredLanguage: 'uz',
        createdAt: foundRegistered.registeredAt,
      } : {
        id: `usr-${Date.now()}`,
        email: cleanInput.includes('@') ? cleanInput : `${cleanInput.replace(/\D/g, '')}@kia-client.uz`,
        fullName: cleanInput.replace(/\D/g, '').length > 5 ? `Mijoz (${cleanInput})` : cleanInput.toUpperCase(),
        phone: cleanInput.includes('+998') ? cleanInput : `+998 ${cleanInput}`,
        role,
        preferredLanguage: 'uz',
        createdAt: new Date().toISOString(),
      });

      setUser(profile);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setIsLoading(false);
      return { success: true };
    } catch (e: any) {
      setIsLoading(false);
      return { success: false, error: e?.message || 'Kirishda xatolik yuz berdi' };
    }
  };

  const loginAsDemo = async (role: UserRole) => {
    setIsLoading(true);
    const demo = DEMO_USERS[role] || DEMO_USERS.super_admin;
    setUser(demo);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    setIsLoading(false);
  };

  const register = async (
    fullName: string,
    phone: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const cleanPhoneDigits = phone.replace(/\D/g, '');
      const generatedEmail = `${cleanPhoneDigits || Date.now()}@kia-client.uz`;

      if (isSupabaseConfigured) {
        try {
          await supabase.auth.signUp({
            email: generatedEmail,
            password: pass,
            options: {
              data: {
                full_name: fullName,
                phone,
                role: 'customer',
              },
            },
          });
        } catch {
          // continue with local store
        }
      }

      const newProfile: UserProfile = {
        id: `cust-${Date.now()}`,
        fullName,
        email: generatedEmail,
        phone,
        role: 'customer',
        preferredLanguage: 'uz',
        createdAt: new Date().toISOString(),
      };

      // Instantly register customer in mockStore so Admin Panel sees it live
      await mockStore.addCustomer({
        id: newProfile.id,
        fullName,
        phone,
        email: generatedEmail,
        registeredAt: newProfile.createdAt,
        totalPurchases: 0,
        totalSpentUzs: 0,
        totalRequests: 0,
        status: 'active',
        notes: "Sayt orqali ro'yxatdan o'tgan yangi mijoz",
      });

      setUser(newProfile);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      setIsLoading(false);
      return { success: true };
    } catch (e: any) {
      setIsLoading(false);
      return { success: false, error: e?.message || 'Ro‘yxatdan o‘tishda xatolik yuz berdi' };
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch {
      setUser(null);
    }
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
    user?.role === 'sales_manager' ||
    user?.role === 'service_manager' ||
    user?.role === 'consultant' ||
    user?.role === 'report_viewer';

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
