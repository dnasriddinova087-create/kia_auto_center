// Responsive Navigation Bar for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
    { label: t('navCatalog'), href: '/catalog', icon: Car },
    { label: t('navCalculator'), href: '/calculator', icon: Calculator },
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
              const isActive = pathname === link.href;
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

        {/* Right Tools (Language, Theme Mode Pill, Favorites, Auth, Mobile Toggle) */}
        <View style={styles.rightSection}>
          {/* Prominent Theme Mode Toggle Pill */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              styles.themePill,
              {
                backgroundColor: isDark ? '#222222' : '#F3F4F6',
                borderColor: isDark ? '#333333' : '#E5E7EB',
              },
            ]}
          >
            {isDark ? (
              <>
                <Sun size={15} color="#FBBF24" />
                <Text style={[styles.themePillText, { color: '#F9FAFB' }]}>Kunduzgi</Text>
              </>
            ) : (
              <>
                <Moon size={15} color="#111827" />
                <Text style={[styles.themePillText, { color: '#111827' }]}>Tungi</Text>
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

          {/* Favorites */}
          <TouchableOpacity
            onPress={() => handleNavigate('/favorites')}
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

          {/* Admin Fast Button (Always visible for easy testing and for staff) */}
          <TouchableOpacity
            onPress={() => handleNavigate(isStaff ? '/admin/dashboard' : '/admin/login')}
            style={[styles.adminBtn, { backgroundColor: '#B91C1C' }]}
          >
            <ShieldCheck size={14} color="#FFFFFF" />
            <Text style={styles.adminBtnText}>Admin</Text>
          </TouchableOpacity>

          {/* Customer Auth Button */}
          {user ? (
            <TouchableOpacity
              onPress={() => handleNavigate('/profile')}
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
              onPress={() => handleNavigate('/login')}
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

            {/* Mobile Theme Toggle Pill */}
            <TouchableOpacity
              onPress={toggleTheme}
              style={[
                styles.mobileThemePill,
                { backgroundColor: isDark ? '#222222' : '#F3F4F6', borderColor: colors.border },
              ]}
            >
              {isDark ? (
                <>
                  <Sun size={18} color="#FBBF24" />
                  <Text style={[styles.mobileThemeText, { color: colors.text }]}>
                    Kunduzgi rejimga o‘tish (Light Mode)
                  </Text>
                </>
              ) : (
                <>
                  <Moon size={18} color="#111827" />
                  <Text style={[styles.mobileThemeText, { color: colors.text }]}>
                    Tungi rejimga o‘tish (Dark Mode)
                  </Text>
                </>
              )}
            </TouchableOpacity>

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

              <TouchableOpacity
                onPress={() => handleNavigate('/admin/dashboard')}
                style={[styles.mobileNavItem, { borderBottomColor: colors.border }]}
              >
                <ShieldCheck size={20} color="#B91C1C" />
                <Text style={[styles.mobileNavText, { color: '#B91C1C', fontWeight: '800' }]}>
                  KIA Admin Panel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 100,
  },
  navContainer: {
    maxWidth: 1360,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  logoKia: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 2,
  },
  brandTitle: {
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 1.5,
  },
  brandSub: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.kiaRed,
    letterSpacing: 2,
  },
  desktopLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  navItem: {
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  navText: {
    fontSize: 13,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  themePillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  langSwitch: {
    flexDirection: 'row',
    borderRadius: RADIUS.md,
    padding: 2,
  },
  langBtn: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
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
    top: -4,
    right: -4,
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
  adminBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
  },
  adminBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
  },
  profileText: {
    fontSize: 12,
    fontWeight: '700',
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  mobileOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-start',
  },
  mobileMenu: {
    width: '85%',
    maxWidth: 360,
    height: '100%',
    padding: 20,
  },
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeBtn: {
    padding: 6,
  },
  mobileThemePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: 16,
  },
  mobileThemeText: {
    fontSize: 13,
    fontWeight: '700',
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
