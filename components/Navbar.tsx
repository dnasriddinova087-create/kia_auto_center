// Responsive Navigation Bar for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Modal,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import {
  Car,
  Calculator,
  GitCompare,
  Wrench,
  Repeat,
  Tag,
  Info,
  Phone,
  User,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  ShieldCheck,
  Calendar,
} from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { COLORS, RADIUS } from '../constants/theme';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const { colors, toggleTheme, isDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, isStaff } = useAuth();
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDesktop = width >= 1024;

  const navLinks = [
    { label: t('navCatalog'), href: '/(tabs)/catalog', icon: Car },
    { label: t('navCalculator'), href: '/(tabs)/calculator', icon: Calculator },
    { label: t('navCompare'), href: '/compare', icon: GitCompare },
    { label: t('navTestDrive'), href: '/test-drive', icon: Calendar },
    { label: t('navService'), href: '/service', icon: Wrench },
    { label: t('navTradeIn'), href: '/trade-in', icon: Repeat },
    { label: t('navOffers'), href: '/offers', icon: Tag },
    { label: t('navAbout'), href: '/about', icon: Info },
    { label: t('navContact'), href: '/contact', icon: Phone },
  ];

  const handleNavigate = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href as any);
  };

  return (
    <View
      style={[
        styles.navbar,
        {
          backgroundColor: isDark ? '#111111' : '#FFFFFF',
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.navContainer}>
        {/* Brand Logo */}
        <TouchableOpacity
          onPress={() => handleNavigate('/')}
          style={styles.logoContainer}
        >
          <View style={styles.logoBadge}>
            <Text style={styles.logoKia}>KIA</Text>
          </View>
          <View>
            <Text style={[styles.brandTitle, { color: colors.text }]}>AUTO CENTER</Text>
            <Text style={styles.brandSub}>UZBEKISTAN</Text>
          </View>
        </TouchableOpacity>

        {/* Desktop Navigation Links */}
        {isDesktop && (
          <View style={styles.desktopLinks}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href);
              return (
                <TouchableOpacity
                  key={link.href}
                  onPress={() => handleNavigate(link.href)}
                  style={[
                    styles.navItem,
                    isActive && { borderBottomColor: COLORS.kiaRed },
                  ]}
                >
                  <Text
                    style={[
                      styles.navText,
                      {
                        color: isActive ? COLORS.kiaRed : colors.textSecondary,
                        fontWeight: isActive ? '700' : '500',
                      },
                    ]}
                  >
                    {link.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Right Tools (Language, Theme, Favorites, Auth, Mobile Toggle) */}
        <View style={styles.rightSection}>
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

          {/* Theme Toggle */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.iconButton, { backgroundColor: isDark ? '#222222' : '#F3F4F6' }]}
          >
            {isDark ? (
              <Sun size={17} color="#FBBF24" />
            ) : (
              <Moon size={17} color={colors.text} />
            )}
          </TouchableOpacity>

          {/* Favorites */}
          <TouchableOpacity
            onPress={() => handleNavigate('/(tabs)/favorites')}
            style={[styles.iconButton, { backgroundColor: isDark ? '#222222' : '#F3F4F6' }]}
          >
            <Heart
              size={17}
              color={favorites.length > 0 ? COLORS.kiaRed : colors.text}
              fill={favorites.length > 0 ? COLORS.kiaRed : 'transparent'}
            />
            {favorites.length > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeText}>{favorites.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Admin shortcut if staff */}
          {isStaff && (
            <TouchableOpacity
              onPress={() => handleNavigate('/admin')}
              style={[styles.adminBtn, { backgroundColor: '#B91C1C' }]}
            >
              <ShieldCheck size={14} color="#FFFFFF" />
              {isDesktop && <Text style={styles.adminBtnText}>Admin</Text>}
            </TouchableOpacity>
          )}

          {/* Auth Button */}
          {user ? (
            <TouchableOpacity
              onPress={() => handleNavigate('/(tabs)/profile')}
              style={[styles.profileBtn, { backgroundColor: isDark ? '#222222' : '#F3F4F6' }]}
            >
              <User size={16} color={colors.text} />
              {isDesktop && (
                <Text style={[styles.profileText, { color: colors.text }]} numberOfLines={1}>
                  {user.fullName.split(' ')[0]}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleNavigate('/(auth)/login')}
              style={[styles.loginBtn, { backgroundColor: COLORS.kiaRed }]}
            >
              <User size={14} color="#FFFFFF" />
              {isDesktop && <Text style={styles.loginBtnText}>{t('navLogin')}</Text>}
            </TouchableOpacity>
          )}

          {/* Mobile Menu Hamburger */}
          {!isDesktop && (
            <TouchableOpacity
              onPress={() => setMobileMenuOpen(true)}
              style={[styles.iconButton, { backgroundColor: isDark ? '#222222' : '#F3F4F6' }]}
            >
              <Menu size={18} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Mobile Drawer Menu */}
      <Modal visible={mobileMenuOpen} animationType="slide" transparent onRequestClose={() => setMobileMenuOpen(false)}>
        <View style={styles.mobileOverlay}>
          <View style={[styles.mobileMenu, { backgroundColor: colors.bg }]}>
            <View style={styles.mobileHeader}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoKia}>KIA</Text>
              </View>
              <TouchableOpacity onPress={() => setMobileMenuOpen(false)} style={styles.closeBtn}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.mobileLinks}>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <TouchableOpacity
                    key={link.href}
                    onPress={() => handleNavigate(link.href)}
                    style={[styles.mobileNavItem, { borderBottomColor: colors.border }]}
                  >
                    <Icon size={20} color={COLORS.kiaRed} />
                    <Text style={[styles.mobileNavText, { color: colors.text }]}>
                      {link.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              {isStaff && (
                <TouchableOpacity
                  onPress={() => handleNavigate('/admin')}
                  style={[styles.mobileNavItem, { borderBottomColor: colors.border }]}
                >
                  <ShieldCheck size={20} color="#EF4444" />
                  <Text style={[styles.mobileNavText, { color: '#EF4444', fontWeight: '700' }]}>
                    {t('adminDashboard')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    borderBottomWidth: 1,
    zIndex: 100,
  },
  navContainer: {
    maxWidth: 1320,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    backgroundColor: '#111111',
    borderWidth: 1.5,
    borderColor: COLORS.kiaRed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  logoKia: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 2,
  },
  brandTitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandSub: {
    fontSize: 9,
    color: COLORS.kiaRed,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  desktopLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    height: '100%',
  },
  navItem: {
    height: '100%',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingHorizontal: 4,
  },
  navText: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langSwitch: {
    flexDirection: 'row',
    borderRadius: RADIUS.sm,
    padding: 2,
  },
  langBtn: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  langText: {
    fontSize: 11,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeCount: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: COLORS.kiaRed,
    borderRadius: RADIUS.full,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  adminBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    gap: 5,
  },
  adminBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  profileText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  mobileOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  mobileMenu: {
    flex: 1,
    maxWidth: 320,
    padding: 20,
  },
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  closeBtn: {
    padding: 6,
  },
  mobileLinks: {
    gap: 4,
  },
  mobileNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  mobileNavText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
