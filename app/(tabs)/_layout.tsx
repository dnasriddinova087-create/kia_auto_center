// Tabs Navigation Layout
// Owner: Nasriddinova Dilfuza

import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Car, Calculator, Heart, User } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../context/FavoritesContext';
import { COLORS } from '../../constants/theme';

export default function TabLayout() {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { favorites } = useFavorites();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.kiaRed,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: isDark ? '#111111' : '#FFFFFF',
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('navHome'),
          tabBarIcon: ({ color, size }) => <Home size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: t('navCatalog'),
          tabBarIcon: ({ color, size }) => <Car size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: t('navCalculator'),
          tabBarIcon: ({ color, size }) => <Calculator size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t('navFavorites'),
          tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.kiaRed,
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarIcon: ({ color, size }) => <Heart size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('navCabinet'),
          tabBarIcon: ({ color, size }) => <User size={size - 2} color={color} />,
        }}
      />
    </Tabs>
  );
}
