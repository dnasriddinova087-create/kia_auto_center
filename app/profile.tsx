// Customer Cabinet & Profile Screen
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  Wrench,
  Repeat,
  LogOut,
  Globe,
  Moon,
  Sun,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { CustomButton } from '../components/CustomButton';
import { StatusBadge } from '../components/StatusBadge';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { mockStore } from '../lib/mockStore';
import { TestDriveRequest, ServiceRequest, TradeInRequest, Language } from '../types';
import { COLORS, RADIUS } from '../constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors, toggleTheme, isDark } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { user, isStaff, logout, loginAsDemo } = useAuth();

  const [testDrives, setTestDrives] = useState<TestDriveRequest[]>([]);
  const [services, setServices] = useState<ServiceRequest[]>([]);
  const [tradeIns, setTradeIns] = useState<TradeInRequest[]>([]);

  useEffect(() => {
    mockStore.getTestDrives().then(setTestDrives).catch(() => {});
    mockStore.getServices().then(setServices).catch(() => {});
    mockStore.getTradeIns().then(setTradeIns).catch(() => {});
  }, [user]);

  const isWide = width >= 900;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.bg }]}
        showsVerticalScrollIndicator={false}
      >
        <Navbar />

        <View style={styles.content}>
          {user ? (
            <>
              {/* Logged In Cabinet Header */}
              <View
                style={[
                  styles.profileCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.profileHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {(user.fullName || 'U').charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.nameRow}>
                      <Text style={[styles.name, { color: colors.text }]}>{user.fullName}</Text>
                      {isStaff && (
                        <View style={styles.staffBadge}>
                          <ShieldCheck size={12} color="#FFFFFF" />
                          <Text style={styles.staffBadgeText}>{user.role.toUpperCase()}</Text>
                        </View>
                      )}
                    </View>
                    {!user.email?.includes('@kia-client.uz') && (
                      <View style={styles.detailRow}>
                        <Mail size={14} color={colors.textSecondary} />
                        <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                          {user.email}
                        </Text>
                      </View>
                    )}
                    <View style={styles.detailRow}>
                      <Phone size={14} color={colors.textSecondary} />
                      <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                        {user.phone}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                    <LogOut size={18} color={COLORS.danger} />
                    <Text style={styles.logoutText}>{t('navLogout')}</Text>
                  </TouchableOpacity>
                </View>

                {/* Staff / Admin Fast Access Bar */}
                {isStaff && (
                  <View style={styles.adminBanner}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.adminBannerTitle}>
                        KIA AUTO CENTER Boshqaruv Tizimi
                      </Text>
                      <Text style={styles.adminBannerSub}>
                        Avtomobillar, arizalar, CRM va filiallar boshqaruvi
                      </Text>
                    </View>
                    <CustomButton
                      title="Admin Dashboardga o‘tish"
                      onPress={() => router.push('/admin/dashboard')}
                      variant="primary"
                      size="md"
                      icon={<ShieldCheck size={16} color="#FFFFFF" />}
                    />
                  </View>
                )}
              </View>

              {/* My Requests Section */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Mening faol arizalarim
                </Text>

                {/* Test Drives */}
                <View
                  style={[
                    styles.requestCard,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                >
                  <View style={styles.reqCardHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Calendar size={18} color={COLORS.kiaRed} />
                      <Text style={[styles.reqCardTitle, { color: colors.text }]}>
                        Test-drayv buyurtmalari
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/test-drive')}>
                      <Text style={{ color: COLORS.kiaRed, fontSize: 13, fontWeight: '700' }}>
                        + Yangi yozilish
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {testDrives.map((td) => (
                    <View key={td.id} style={styles.requestItem}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.reqVehicle, { color: colors.text }]}>
                          {td.vehicleName}
                        </Text>
                        <Text style={[styles.reqSub, { color: colors.textSecondary }]}>
                          {td.branchName} • {td.preferredDate} {td.preferredTime}
                        </Text>
                      </View>
                      <StatusBadge status={td.status} />
                    </View>
                  ))}
                </View>

                {/* Services */}
                <View
                  style={[
                    styles.requestCard,
                    { backgroundColor: colors.card, borderColor: colors.border, marginTop: 16 },
                  ]}
                >
                  <View style={styles.reqCardHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Wrench size={18} color={COLORS.kiaRed} />
                      <Text style={[styles.reqCardTitle, { color: colors.text }]}>
                        Servis markaziga yozilishlar
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/service')}>
                      <Text style={{ color: COLORS.kiaRed, fontSize: 13, fontWeight: '700' }}>
                        + Servis buyurtmasi
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {services.map((srv) => (
                    <View key={srv.id} style={styles.requestItem}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.reqVehicle, { color: colors.text }]}>
                          {srv.vehicleModel} — {srv.serviceType}
                        </Text>
                        <Text style={[styles.reqSub, { color: colors.textSecondary }]}>
                          {srv.branchName} • {srv.preferredDate} {srv.preferredTime}
                        </Text>
                      </View>
                      <StatusBadge status={srv.status} />
                    </View>
                  ))}
                </View>
              </View>
            </>
          ) : (
            /* Guest Screen with Demo Switchers */
            <View
              style={[
                styles.guestCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <User size={54} color={COLORS.kiaRed} />
              <Text style={[styles.guestTitle, { color: colors.text }]}>
                KIA AUTO CENTER Shaxsiy Kabineti
              </Text>
              <Text style={[styles.guestDesc, { color: colors.textSecondary }]}>
                Kabinet orqali test-drayvlarni boshqarish, arizalaringiz holatini kuzatish va maxsus takliflardan foydalanishingiz mumkin.
              </Text>

              <View style={styles.guestActions}>
                <CustomButton
                  title={t('navLogin')}
                  onPress={() => router.push('/login')}
                  variant="primary"
                  size="lg"
                  style={{ minWidth: 180 }}
                />
                <CustomButton
                  title={t('navRegister')}
                  onPress={() => router.push('/register')}
                  variant="outline"
                  size="lg"
                  style={{ minWidth: 180 }}
                />
              </View>

              {/* Quick Demo Logins for Fast Access */}
              <View style={styles.demoSection}>
                <Text style={[styles.demoTitle, { color: colors.textSecondary }]}>
                  Tezkor Demo Kirish (Sinash uchun bir klik):
                </Text>
                <View style={styles.demoButtons}>
                  <TouchableOpacity
                    onPress={() => loginAsDemo('super_admin')}
                    style={[styles.demoBtn, { backgroundColor: '#B91C1C' }]}
                  >
                    <ShieldCheck size={14} color="#FFFFFF" />
                    <Text style={styles.demoBtnText}>Super Admin (Nasriddinova Dilfuza)</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => loginAsDemo('sales_manager')}
                    style={[styles.demoBtn, { backgroundColor: '#1E40AF' }]}
                  >
                    <User size={14} color="#FFFFFF" />
                    <Text style={styles.demoBtnText}>Sotuv Menejeri (Alisher)</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Global Settings (Language, Theme) */}
          <View
            style={[
              styles.settingsCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.settingsTitle, { color: colors.text }]}>Sozlamalar</Text>

            <View style={styles.settingRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Globe size={18} color={colors.textSecondary} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Til (Language)</Text>
              </View>
              <View style={styles.langPills}>
                {(['uz', 'ru', 'en'] as Language[]).map((l) => (
                  <TouchableOpacity
                    key={l}
                    onPress={() => setLanguage(l)}
                    style={[
                      styles.langPill,
                      language === l && { backgroundColor: COLORS.kiaRed },
                    ]}
                  >
                    <Text
                      style={[
                        styles.langPillText,
                        { color: language === l ? '#FFFFFF' : colors.textSecondary },
                      ]}
                    >
                      {l.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.settingRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {isDark ? <Moon size={18} color="#FBBF24" /> : <Sun size={18} color="#F59E0B" />}
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Dizayn rejimi ({isDark ? 'Qorong‘i (Tungi)' : 'Yorug‘ (Kunduzgi)'})
                </Text>
              </View>
              <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleBtn}>
                <Text style={{ color: COLORS.kiaRed, fontWeight: '700', fontSize: 13 }}>
                  {isDark ? '☀️ Kunduzgi rejimga o‘tish' : '🌙 Tungi rejimga o‘tish'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>
      <MobileBottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 36,
  },
  profileCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.kiaRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '800',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
  },
  staffBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B91C1C',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  staffBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  detailText: {
    fontSize: 13,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  adminBanner: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.15)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  adminBannerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.kiaRed,
  },
  adminBannerSub: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
  },
  requestCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
  },
  reqCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reqCardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
  },
  reqVehicle: {
    fontSize: 14,
    fontWeight: '700',
  },
  reqSub: {
    fontSize: 12,
    marginTop: 2,
  },
  guestCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 40,
    alignItems: 'center',
    marginBottom: 24,
  },
  guestTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 16,
    textAlign: 'center',
  },
  guestDesc: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 520,
    marginTop: 8,
  },
  guestActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 24,
    justifyContent: 'center',
  },
  demoSection: {
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.15)',
    width: '100%',
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  demoButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    gap: 6,
  },
  demoBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  settingsCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 18,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.1)',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  langPills: {
    flexDirection: 'row',
    gap: 6,
  },
  langPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
  },
  langPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  themeToggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});

