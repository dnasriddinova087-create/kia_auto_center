// Dedicated Loan & Finance Screen
// Owner: Nasriddinova Dilfuza

import React from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { ShieldCheck, FileText, CheckCircle2, Building2 } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { LoanCalculatorWidget } from '../components/LoanCalculatorWidget';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { COLORS, RADIUS } from '../constants/theme';

export default function CalculatorScreen() {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();

  const isWide = width >= 900;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.bg }]}
        showsVerticalScrollIndicator={false}
      >
        <Navbar />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t('calcPageTitle')}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {t('calcPageSubtitle')}
            </Text>
          </View>

          {/* Calculator Widget */}
          <LoanCalculatorWidget />

          {/* Credit Terms Information Cards */}
          <View style={[styles.infoGrid, isWide && styles.infoGridWide]}>
            <View
              style={[
                styles.infoCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                isWide && { width: '31.5%' },
              ]}
            >
              <View style={styles.infoIcon}>
                <Building2 size={24} color={COLORS.kiaRed} />
              </View>
              <Text style={[styles.infoCardTitle, { color: colors.text }]}>
                Hamkor Banklar
              </Text>
              <Text style={[styles.infoCardDesc, { color: colors.textSecondary }]}>
                Ipak Yo‘li Banki, SQB, Kapitalbank, Hamkorbank va boshqa yetakchi banklar orqali qulay shartlar.
              </Text>
            </View>

            <View
              style={[
                styles.infoCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                isWide && { width: '31.5%' },
              ]}
            >
              <View style={styles.infoIcon}>
                <FileText size={24} color={COLORS.kiaRed} />
              </View>
              <Text style={[styles.infoCardTitle, { color: colors.text }]}>
                Kerakli Hujjatlar
              </Text>
              <Text style={[styles.infoCardDesc, { color: colors.textSecondary }]}>
                Pasport yoki ID karta, daromadlar to‘g‘risida ma’lumotnoma (yoki oylik tushumlar).
              </Text>
            </View>

            <View
              style={[
                styles.infoCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                isWide && { width: '31.5%' },
              ]}
            >
              <View style={styles.infoIcon}>
                <CheckCircle2 size={24} color={COLORS.kiaRed} />
              </View>
              <Text style={[styles.infoCardTitle, { color: colors.text }]}>
                Tezkor Tasdiqlash
              </Text>
              <Text style={[styles.infoCardDesc, { color: colors.textSecondary }]}>
                Kredit arizasi 1 ish kunida ko‘rib chiqiladi va salondan avtomobil bilan qaytishingiz mumkin.
              </Text>
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
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 36,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 6,
  },
  infoGrid: {
    marginTop: 36,
    gap: 16,
  },
  infoGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 24,
    width: '100%',
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(200, 16, 46, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  infoCardTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  infoCardDesc: {
    fontSize: 13,
    lineHeight: 20,
  },
});
