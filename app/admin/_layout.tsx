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
  const isMobile = width < 768;
  const isLoginPage = pathname === '/admin/login';

  // If on login page, render clean page without sidebar
  if (isLoginPage) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg, width: '100%', maxWidth: '100%' }]}>
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

  const cycleLanguage = () => {
    const nextLang = language === 'uz' ? 'ru' : language === 'ru' ? 'en' : 'uz';
    setLanguage(nextLang);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, width: '100%', maxWidth: '100%', overflow: 'hidden' }]}>
      {/* Top Admin Header Bar */}
      <View
        style={[
          styles.topBar,
          {
            backgroundColor: isDark ? '#141414' : '#FFFFFF',
            borderBottomColor: colors.border,
            paddingHorizontal: isMobile ? 12 : 20,
          },
        ]}
      >
        <View style={styles.topBarLeft}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.exitBtn}>
            <ArrowLeft size={16} color={colors.textSecondary} />
            {!isMobile && (
              <Text style={[styles.exitText, { color: colors.textSecondary }]}>
                Saytga qaytish
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.brandTitleWrap}>
            <View style={styles.badgeKia}>
              <Text style={styles.badgeKiaText}>KIA</Text>
            </View>
            <View>
              <Text style={[styles.adminTitle, { color: colors.text }]}>
                {isMobile ? 'ADMIN' : 'BOSHQARUV TIZIMI'}
              </Text>
              {!isMobile && (
                <Text style={styles.adminOwner}>
                  Loyiha egasi: Nasriddinova Dilfuza
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.topBarRight}>
          {/* Prominent Theme Toggle */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              isMobile ? styles.iconBtn : styles.themeTogglePill,
              {
                backgroundColor: isDark ? '#222222' : '#F3F4F6',
                borderColor: colors.border,
              },
            ]}
          >
            {isDark ? (
              <>
                <Sun size={15} color="#FBBF24" />
                {!isMobile && <Text style={[styles.themePillText, { color: '#FFF' }]}>Kunduzgi</Text>}
              </>
            ) : (
              <>
                <Moon size={15} color="#111" />
                {!isMobile && <Text style={[styles.themePillText, { color: '#111' }]}>Tungi</Text>}
              </>
            )}
          </TouchableOpacity>

          {/* Language Selector */}
          {isMobile ? (
            <TouchableOpacity
              onPress={cycleLanguage}
              style={[styles.iconBtn, { backgroundColor: isDark ? '#222222' : '#F3F4F6' }]}
            >
              <Text style={{ fontSize: 11, fontWeight: '800', color: colors.text }}>
                {language.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ) : (
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
          )}

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

          {/* Role badge (Desktop only) */}
          {!isMobile && (
            <View style={styles.roleTag}>
              <ShieldCheck size={13} color="#FFF" />
              <Text style={styles.roleTagText}>
                {user ? user.role.toUpperCase().replace('_', ' ') : 'SUPER ADMIN'}
              </Text>
            </View>
          )}

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

      <View style={[styles.body, isWide && styles.bodyWide, { width: '100%', maxWidth: '100%', overflow: 'hidden' }]}>
        {/* Sidebar Navigation */}
        <View
          style={[
            styles.sidebar,
            {
              backgroundColor: isDark ? '#141414' : '#FFFFFF',
              borderRightColor: colors.border,
            },
            !isWide && [styles.sidebarMobile, { width: '100%', maxWidth: '100%', overflow: 'hidden' }],
          ]}
        >
          <ScrollView
            horizontal={!isWide}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ width: '100%', maxWidth: '100%' }}
            contentContainerStyle={!isWide && { paddingHorizontal: 6 }}
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
          style={[styles.mainContent, { width: '100%', maxWidth: '100%' }]}
          contentContainerStyle={[
            styles.mainContentContainer,
            isMobile && { padding: 12, paddingBottom: 60, width: '100%' },
          ]}
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
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  topBar: {
    height: 60,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    width: '100%',
    maxWidth: '100%',
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  exitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 10,
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
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  badgeKiaText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  adminTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  adminOwner: {
    fontSize: 10,
    color: '#888',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    width: 34,
    height: 34,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
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
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
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
    maxWidth: '100%',
    height: 52,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.15)',
    paddingVertical: 4,
    overflow: 'hidden',
  },
  navList: {
    paddingHorizontal: 10,
    gap: 4,
  },
  navListMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
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
    width: '100%',
    maxWidth: '100%',
  },
  mainContentContainer: {
    padding: 24,
    paddingBottom: 60,
    width: '100%',
    maxWidth: '100%',
  },
});
