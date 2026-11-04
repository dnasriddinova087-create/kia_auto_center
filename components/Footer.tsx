// Official Automotive Footer for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, Mail, MapPin, ShieldCheck, Clock } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { COLORS, RADIUS } from '../constants/theme';
import { KIA_BRANCHES } from '../constants/branches';

export const Footer: React.FC = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t, language } = useLanguage();

  const isWide = width >= 900;

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: isDark ? '#0A0A0A' : '#141414',
          borderTopColor: isDark ? '#222222' : '#333333',
        },
      ]}
    >
      <View style={styles.container}>
        {/* Top Info Grid */}
        <View style={[styles.grid, isWide && styles.gridWide]}>
          {/* Column 1: Brand & Owner */}
          <View style={styles.column}>
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoKia}>KIA</Text>
              </View>
              <Text style={styles.brandTitle}>AUTO CENTER</Text>
            </View>
            <Text style={styles.tagline}>{t('brandTagline')}</Text>

            <View style={styles.ownerBadge}>
              <Text style={styles.ownerTitle}>Loyiha Egasi:</Text>
              <Text style={styles.ownerName}>Nasriddinova Dilfuza</Text>
              <Text style={styles.ownerDesc}>
                O‘zbekiston Respublikasidagi rasmiy dilerlik tarmog‘i
              </Text>
            </View>

            <View style={styles.warrantyBox}>
              <ShieldCheck size={20} color={COLORS.kiaRed} />
              <View style={{ flex: 1 }}>
                <Text style={styles.warrantyTitle}>5 YIL KAFOLAT</Text>
                <Text style={styles.warrantyText}>yoki 150 000 km rasmiy zavod kafolati</Text>
              </View>
            </View>
          </View>

          {/* Column 2: Branches */}
          <View style={styles.column}>
            <Text style={styles.colHeader}>{t('sectionBranchesTitle')}</Text>
            {KIA_BRANCHES.map((b) => (
              <View key={b.id} style={styles.branchItem}>
                <Text style={styles.branchName}>{b.name[language]}</Text>
                <View style={styles.branchDetail}>
                  <MapPin size={12} color="#888888" />
                  <Text style={styles.branchDetailText}>{b.address[language]}</Text>
                </View>
                <View style={styles.branchDetail}>
                  <Phone size={12} color="#888888" />
                  <Text style={styles.branchDetailText}>{b.phone}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Column 3: Quick Navigation */}
          <View style={styles.column}>
            <Text style={styles.colHeader}>Navigatsiya</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/catalog' as any)} style={styles.link}>
              <Text style={styles.linkText}>KIA Modellar Katalogi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/calculator' as any)} style={styles.link}>
              <Text style={styles.linkText}>Kredit Kalkulyatori</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/test-drive' as any)} style={styles.link}>
              <Text style={styles.linkText}>Test-drayvga yozilish</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/service' as any)} style={styles.link}>
              <Text style={styles.linkText}>Rasmiy Servis Markazi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/trade-in' as any)} style={styles.link}>
              <Text style={styles.linkText}>Trade-In Baholash</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/offers' as any)} style={styles.link}>
              <Text style={styles.linkText}>Maxsus Takliflar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/about' as any)} style={styles.link}>
              <Text style={styles.linkText}>Dilerlik Haqida</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/contact' as any)} style={styles.link}>
              <Text style={styles.linkText}>Bog‘lanish</Text>
            </TouchableOpacity>
          </View>

          {/* Column 4: Contact & Hours */}
          <View style={styles.column}>
            <Text style={styles.colHeader}>Mijozlar Xizmati</Text>
            <View style={styles.contactItem}>
              <Phone size={16} color={COLORS.kiaRed} />
              <View>
                <Text style={styles.contactLabel}>Yagona Call-Center:</Text>
                <Text style={styles.contactValue}>+998 71 200 05 25</Text>
              </View>
            </View>

            <View style={styles.contactItem}>
              <Mail size={16} color={COLORS.kiaRed} />
              <View>
                <Text style={styles.contactLabel}>Elektron pochta:</Text>
                <Text style={styles.contactValue}>info@kia-autocenter.uz</Text>
              </View>
            </View>

            <View style={styles.contactItem}>
              <Clock size={16} color={COLORS.kiaRed} />
              <View>
                <Text style={styles.contactLabel}>Ish vaqti:</Text>
                <Text style={styles.contactValue}>Dushanba - Shanba: 09:00 - 20:00</Text>
                <Text style={styles.contactSub}>Yakshanba: 10:00 - 18:00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Copyright */}
        <View style={styles.bottomBar}>
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} KIA AUTO CENTER UZBEKISTAN. {t('rightsReserved')}.
          </Text>
          <Text style={styles.ownerSignature}>
            Loyiha rahbari: Nasriddinova Dilfuza
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    paddingTop: 48,
    paddingBottom: 32,
    width: '100%',
  },
  container: {
    maxWidth: 1320,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  grid: {
    gap: 32,
  },
  gridWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    minWidth: 220,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  logoBadge: {
    backgroundColor: '#000',
    borderWidth: 1.5,
    borderColor: COLORS.kiaRed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  logoKia: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 2,
  },
  brandTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  tagline: {
    color: '#999',
    fontSize: 12,
    marginBottom: 16,
  },
  ownerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.kiaRed,
    padding: 12,
    borderRadius: RADIUS.sm,
    marginBottom: 16,
  },
  ownerTitle: {
    color: '#888',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ownerName: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    marginVertical: 2,
  },
  ownerDesc: {
    color: '#AAA',
    fontSize: 11,
  },
  warrantyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(200, 16, 46, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(200, 16, 46, 0.3)',
    borderRadius: RADIUS.md,
    padding: 12,
    gap: 12,
  },
  warrantyTitle: {
    color: COLORS.kiaRed,
    fontSize: 12,
    fontWeight: '800',
  },
  warrantyText: {
    color: '#BBB',
    fontSize: 11,
  },
  colHeader: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  branchItem: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  branchName: {
    color: '#EEE',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  branchDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  branchDetailText: {
    color: '#888',
    fontSize: 11,
  },
  link: {
    paddingVertical: 7,
  },
  linkText: {
    color: '#AAA',
    fontSize: 13,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 16,
  },
  contactLabel: {
    color: '#777',
    fontSize: 11,
  },
  contactValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  contactSub: {
    color: '#888',
    fontSize: 11,
    marginTop: 2,
  },
  bottomBar: {
    marginTop: 36,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  copyright: {
    color: '#777',
    fontSize: 12,
  },
  ownerSignature: {
    color: COLORS.kiaRed,
    fontSize: 12,
    fontWeight: '600',
  },
});
