// Comprehensive Admin Layout & Central Navigation for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
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
  ShoppingBag,
  UserCheck,
  Package,
  CircleDollarSign,
  FileSpreadsheet,
  Bell,
  Sun,
  Moon,
  LogOut,
  Globe,
  Sliders,
} from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { mockStore } from '../../lib/mockStore';
import { COLORS, RADIUS } from '../../constants/theme';
import { Language, AdminNotification } from '../../types';

export default function AdminLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const { colors, toggleTheme, isDark } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { user, isStaff, logout, loginAsDemo } = useAuth();

  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  useEffect(() => {
    mockStore.getNotifications().then(setNotifications).catch(() => {});
  }, [pathname]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const isWide = width >= 992;
  const isLoginPage = pathname === '/admin/login';

  // If on login page, render clean page without sidebar
  if (isLoginPage) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Slot />
      </View>
    );
  }

  const adminNav = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Avtomobillar', href: '/admin/vehicles', icon: Car },
    { label: 'Mijozlar', href: '/admin/customers', icon: Users },
    { label: 'CRM Arizalar', href: '/admin/crm', icon: Users },
    { label: 'Sotuvlar', href: '/admin/sales', icon: ShoppingBag },
    { label: 'Test-Drayv', href: '/admin/test-drives', icon: Calendar },
    { label: 'Servis Markazi', href: '/admin/service', icon: Wrench },
    { label: 'Xodimlar', href: '/admin/employees', icon: UserCheck },
    { label: 'Ombor & Zaxira', href: '/admin/inventory', icon: Package },
    { label: 'Moliya & Kredit', href: '/admin/finance', icon: CircleDollarSign },
    { label: 'Filiallar', href: '/admin/branches', icon: Building },
    { label: 'Sayt Kontenti', href: '/admin/content', icon: Sliders },
    { label: 'Hisobotlar', href: '/admin/reports', icon: FileSpreadsheet },
    { label: 'Bildirishnomalar', href: '/admin/notifications', icon: Bell, badge: unreadCount },
    { label: 'Tizim Sozlamalari', href: '/admin/settings', icon: Settings },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Top Admin Header Bar */}
      <View
        style={[
          styles.topBar,
          {
            backgroundColor: isDark ? '#141414' : '#FFFFFF',
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.topBarLeft}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.exitBtn}>
            <ArrowLeft size={16} color={colors.textSecondary} />
            <Text style={[styles.exitText, { color: colors.textSecondary }]}>
              Saytga qaytish
            </Text>
          </TouchableOpacity>

          <View style={styles.brandTitleWrap}>
            <View style={styles.badgeKia}>
              <Text style={styles.badgeKiaText}>KIA</Text>
            </View>
            <View>
              <Text style={[styles.adminTitle, { color: colors.text }]}>
                BOSHQARUV TIZIMI
              </Text>
              <Text style={styles.adminOwner}>
                Loyiha egasi: Nasriddinova Dilfuza
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.topBarRight}>
          {/* Prominent Theme Toggle Pill */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              styles.themeTogglePill,
              {
                backgroundColor: isDark ? '#222222' : '#F3F4F6',
                borderColor: colors.border,
              },
            ]}
          >
            {isDark ? (
              <>
                <Sun size={14} color="#FBBF24" />
                <Text style={[styles.themePillText, { color: '#FFF' }]}>Kunduzgi</Text>
              </>
            ) : (
              <>
                <Moon size={14} color="#111" />
                <Text style={[styles.themePillText, { color: '#111' }]}>Tungi</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Language Selector */}
          <View style={[styles.langSwitch, { backgroundColor: isDark ? '#222222' : '#F3F4F6' }]}>
            {(['uz', 'ru', 'en'] as Language[]).map((lang) => (
              <TouchableOpacity
                key={lang}
                onPress={() => setLanguage(lang)}
                style={[
                  styles.langBtn,
                  language === lang && { backgroundColor: COLORS.kiaRed },
                ]}
              >
                <Text
                  style={[
                    styles.langText,
                    {
                      color: language === lang ? '#FFFFFF' : colors.textSecondary,
                      fontWeight: language === lang ? '700' : '500',
                    },
                  ]}
                >
                  {lang.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notifications Icon Button */}
          <TouchableOpacity
            onPress={() => router.push('/admin/notifications')}
            style={[
              styles.iconBtn,
              { backgroundColor: isDark ? '#222222' : '#F3F4F6' },
            ]}
          >
            <Bell size={16} color={colors.text} />
            {unreadCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Role badge */}
          <View style={styles.roleTag}>
            <ShieldCheck size={13} color="#FFF" />
            <Text style={styles.roleTagText}>
              {user ? user.role.toUpperCase().replace('_', ' ') : 'SUPER ADMIN'}
            </Text>
          </View>

          {/* Logout */}
          <TouchableOpacity
            onPress={async () => {
              await logout();
              router.replace('/admin/login');
            }}
            style={styles.logoutBtn}
          >
            <LogOut size={16} color={COLORS.danger} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.body, isWide && styles.bodyWide]}>
        {/* Sidebar Navigation */}
        <View
          style={[
            styles.sidebar,
            {
              backgroundColor: isDark ? '#141414' : '#FFFFFF',
              borderRightColor: colors.border,
            },
            !isWide && styles.sidebarMobile,
          ]}
        >
          <ScrollView
            horizontal={!isWide}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.navList, !isWide && styles.navListMobile]}>
              {adminNav.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href === '/admin/dashboard' && pathname === '/admin');
                return (
                  <TouchableOpacity
                    key={item.href}
                    onPress={() => router.push(item.href as any)}
                    style={[
                      styles.navItem,
                      isActive && {
                        backgroundColor: COLORS.kiaRed,
                      },
                    ]}
                  >
                    <Icon size={17} color={isActive ? '#FFFFFF' : colors.textSecondary} />
                    <Text
                      style={[
                        styles.navItemText,
                        {
                          color: isActive ? '#FFFFFF' : colors.textSecondary,
                          fontWeight: isActive ? '700' : '500',
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                    {Boolean(item.badge && item.badge > 0) && (
                      <View
                        style={[
                          styles.navBadge,
                          { backgroundColor: isActive ? '#FFFFFF' : COLORS.kiaRed },
                        ]}
                      >
                        <Text
                          style={[
                            styles.navBadgeText,
                            { color: isActive ? COLORS.kiaRed : '#FFFFFF' },
                          ]}
                        >
                          {item.badge}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Content Area */}
        <ScrollView
          style={styles.mainContent}
          contentContainerStyle={styles.mainContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Slot />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 64,
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
    paddingRight: 14,
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
    gap: 10,
  },
  badgeKia: {
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  badgeKiaText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  adminTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  adminOwner: {
    fontSize: 10,
    color: '#888',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  themeTogglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  themePillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  langSwitch: {
    flexDirection: 'row',
    borderRadius: RADIUS.md,
    padding: 2,
  },
  langBtn: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  langText: {
    fontSize: 10,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: COLORS.kiaRed,
    borderRadius: RADIUS.full,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  notifBadgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '800',
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#B91C1C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
  },
  roleTagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  logoutBtn: {
    padding: 6,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  bodyWide: {
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    borderRightWidth: 1,
    paddingVertical: 12,
  },
  sidebarMobile: {
    width: '100%',
    height: 56,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.15)',
    paddingVertical: 4,
  },
  navList: {
    paddingHorizontal: 10,
    gap: 4,
  },
  navListMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 6,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    position: 'relative',
  },
  navItemText: {
    fontSize: 13,
  },
  navBadge: {
    marginLeft: 'auto',
    borderRadius: RADIUS.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  navBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    padding: 24,
    paddingBottom: 60,
  },
});
