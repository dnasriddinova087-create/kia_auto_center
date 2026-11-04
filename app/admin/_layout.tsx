// Admin Layout & Navigation
// Owner: Nasriddinova Dilfuza

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import {
  LayoutDashboard,
  Car,
  Users,
  Calendar,
  Wrench,
  Building,
  Settings,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();

  const isWide = width >= 900;

  const adminNav = [
    { label: t('adminDashboard'), href: '/admin', icon: LayoutDashboard },
    { label: t('adminVehicles'), href: '/admin/vehicles', icon: Car },
    { label: t('adminLeads'), href: '/admin/leads', icon: Users },
    { label: t('adminTestDrives'), href: '/admin/test-drives', icon: Calendar },
    { label: t('adminServices'), href: '/admin/services', icon: Wrench },
    { label: t('adminBranches'), href: '/admin/branches', icon: Building },
    { label: t('adminSettings'), href: '/admin/settings', icon: Settings },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Top Admin Header Bar */}
      <View
        style={[
          styles.topBar,
          { backgroundColor: isDark ? '#141414' : '#FFFFFF', borderBottomColor: colors.border },
        ]}
      >
        <View style={styles.topBarLeft}>
          <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.exitBtn}>
            <ArrowLeft size={16} color={colors.textSecondary} />
            <Text style={[styles.exitText, { color: colors.textSecondary }]}>Platformaga qaytish</Text>
          </TouchableOpacity>

          <View style={styles.brandTitleWrap}>
            <View style={styles.badgeKia}>
              <Text style={styles.badgeKiaText}>KIA</Text>
            </View>
            <Text style={[styles.adminTitle, { color: colors.text }]}>
              ADMIN PANEL • {user?.fullName || 'Nasriddinova Dilfuza'}
            </Text>
          </View>
        </View>

        <View style={styles.roleTag}>
          <ShieldCheck size={14} color="#FFF" />
          <Text style={styles.roleTagText}>SUPER ADMIN</Text>
        </View>
      </View>

      <View style={[styles.body, isWide && styles.bodyWide]}>
        {/* Sidebar for Desktop / Tablet */}
        <View
          style={[
            styles.sidebar,
            { backgroundColor: isDark ? '#141414' : '#FFFFFF', borderRightColor: colors.border },
            !isWide && styles.sidebarMobile,
          ]}
        >
          <ScrollView horizontal={!isWide} showsHorizontalScrollIndicator={false}>
            <View style={[styles.navList, !isWide && styles.navListMobile]}>
              {adminNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <TouchableOpacity
                    key={item.href}
                    onPress={() => router.push(item.href as any)}
                    style={[
                      styles.navItem,
                      isActive && {
                        backgroundColor: isDark ? '#262626' : '#FEE2E2',
                        borderLeftColor: COLORS.kiaRed,
                      },
                    ]}
                  >
                    <Icon size={18} color={isActive ? COLORS.kiaRed : colors.textSecondary} />
                    <Text
                      style={[
                        styles.navText,
                        {
                          color: isActive ? COLORS.kiaRed : colors.text,
                          fontWeight: isActive ? '700' : '500',
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Content Area */}
        <View style={styles.content}>
          <Slot />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 60,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  exitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: 'rgba(150,150,150,0.2)',
  },
  exitText: {
    fontSize: 12,
    fontWeight: '600',
  },
  brandTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeKia: {
    backgroundColor: '#000',
    borderWidth: 1.5,
    borderColor: COLORS.kiaRed,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeKiaText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
  },
  adminTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B91C1C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    gap: 6,
  },
  roleTagText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  body: {
    flex: 1,
  },
  bodyWide: {
    flexDirection: 'row',
  },
  sidebar: {
    width: 240,
    borderRightWidth: 1,
    paddingVertical: 16,
  },
  sidebarMobile: {
    width: '100%',
    borderRightWidth: 0,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  navList: {
    gap: 4,
    paddingHorizontal: 10,
  },
  navListMobile: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  navText: {
    fontSize: 13,
  },
  content: {
    flex: 1,
  },
});
