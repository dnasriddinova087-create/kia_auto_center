// Root Application Layout for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';

// Google Translate and browser extension DOM reconciliation guard to prevent blank screen crashes
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
  try {
    const origRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      if (child.parentNode !== this) {
        return child;
      }
      return origRemoveChild.apply(this, arguments as any);
    };
    const origInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
      if (referenceNode && referenceNode.parentNode !== this) {
        return newNode;
      }
      return origInsertBefore.apply(this, arguments as any);
    };
    if (document && document.body) {
      document.body.style.backgroundColor = '#111111';
    }
  } catch {
    // ignore
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Global Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#111111',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: '#C8102E',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 6,
              marginBottom: 16,
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: '900', letterSpacing: 2 }}>
              KIA AUTO CENTER
            </Text>
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Kutilmagan holat yuz berdi
          </Text>
          <Text
            style={{
              color: '#9CA3AF',
              fontSize: 13,
              textAlign: 'center',
              maxWidth: 480,
              marginBottom: 24,
              lineHeight: 20,
            }}
          >
            Tizim barqaror ishlashi ta'minlanmoqda. Bosh sahifaga qaytish yoki sahifani yangilash
            orqali davom etishingiz mumkin.
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ hasError: false, error: null });
                if (typeof window !== 'undefined') window.location.href = '/';
              }}
              style={{
                backgroundColor: '#C8102E',
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 14 }}>
                Bosh sahifaga qaytish
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (typeof window !== 'undefined') window.location.reload();
              }}
              style={{
                backgroundColor: '#222222',
                borderWidth: 1,
                borderColor: '#444444',
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 14 }}>
                Qayta yuklash
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}

function AppNavigation() {
  const { isDark, colors } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="catalog" options={{ headerShown: false }} />
        <Stack.Screen name="calculator" options={{ headerShown: false }} />
        <Stack.Screen name="favorites" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="vehicle/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="compare" options={{ headerShown: false }} />
        <Stack.Screen name="test-drive" options={{ headerShown: false }} />
        <Stack.Screen name="service" options={{ headerShown: false }} />
        <Stack.Screen name="trade-in" options={{ headerShown: false }} />
        <Stack.Screen name="offers" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="contact" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GlobalErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <FavoritesProvider>
                  <AppNavigation />
                </FavoritesProvider>
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalErrorBoundary>
    </SafeAreaProvider>
  );
}
