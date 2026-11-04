// Mobile Bottom Navigation Bar for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Home, Car, Calculator, Heart, User } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { COLORS, RADIUS } from '../constants/theme';

export const MobileBottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { favorites } = useFavorites();

  // Only render on mobile screens
  if (width >= 768) {
    return null;
  }

  const tabs = [
    { label: t('navHome'), href: '/', icon: Home },
    { label: t('navCatalog'), href: '/catalog', icon: Car },
    { label: t('navCalculator'), href: '/calculator', icon: Calculator },
    { label: t('navFavorites'), href: '/favorites', icon: Heart, badge: favorites.length },
    { label: t('navCabinet'), href: '/profile', icon: User },
  ];

  return (
    <View
      style={[
        styles.bottomBar,
        {
          backgroundColor: isDark ? '#141414' : '#FFFFFF',
          borderTopColor: colors.border,
        },
      ]}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));

        return (
          <TouchableOpacity
            key={tab.href}
            onPress={() => router.push(tab.href as any)}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrap}>
              <Icon
                size={20}
                color={isActive ? COLORS.kiaRed : colors.textSecondary}
                fill={tab.href === '/favorites' && favorites.length > 0 ? COLORS.kiaRed : 'transparent'}
              />
              {Boolean(tab.badge && tab.badge > 0) && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isActive ? COLORS.kiaRed : colors.textSecondary,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    height: 62,
    borderTopWidth: 1,
    paddingBottom: 6,
    paddingTop: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 99,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  iconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 3,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: COLORS.kiaRed,
    borderRadius: RADIUS.full,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});

