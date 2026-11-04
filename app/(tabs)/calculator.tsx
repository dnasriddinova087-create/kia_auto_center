// Dedicated Loan & Finance Screen
// Owner: Nasriddinova Dilfuza

import React from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { ShieldCheck, FileText, CheckCircle2, Building2 } from 'lucide-react-native';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LoanCalculatorWidget } from '../../components/LoanCalculatorWidget';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { COLORS, RADIUS } from '../../constants/theme';

export default function CalculatorScreen() {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();

  const isWide = width >= 900;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <Navbar />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('sectionCalculatorTitle')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Rasmiy dilerlik markazining qulay shartlardagi avtokredit dasturlari
          </Text>
        </View>

        {/* Main Widget */}
        <LoanCalculatorWidget />

        {/* Loan Conditions & Required Documents */}
        <View style={[styles.infoGrid, isWide && styles.infoGridWide]}>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isWide && { width: '48.5%' },
            ]}
          >
            <View style={styles.cardHeader}>
              <FileText size={22} color={COLORS.kiaRed} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Kerakli hujjatlar
              </Text>
            </View>

            <View style={styles.itemList}>
              <View style={styles.itemRow}>
                <CheckCircle2 size={16} color={COLORS.success} />
                <Text style={[styles.itemText, { color: colors.textSecondary }]}>
                  O‘zbekiston Respublikasi fuqarolik pasporti yoki ID kartasi
                </Text>
              </View>

              <View style={styles.itemRow}>
                <CheckCircle2 size={16} color={COLORS.success} />
                <Text style={[styles.itemText, { color: colors.textSecondary }]}>
                  Oxirgi 6 oylik daromadlar to‘g‘risida ma’lumot (avtomatik tekshiruv)
                </Text>
              </View>

              <View style={styles.itemRow}>
                <CheckCircle2 size={16} color={COLORS.success} />
                <Text style={[styles.itemText, { color: colors.textSecondary }]}>
                  Boshlang‘ich to‘lov mablag‘i (kamida 15-20%)
                </Text>
              </View>

              <View style={styles.itemRow}>
                <CheckCircle2 size={16} color={COLORS.success} />
                <Text style={[styles.itemText, { color: colors.textSecondary }]}>
                  KASKO sug‘urta polisi (dilerlik tomonidan sovg‘a sifatida beriladi)
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isWide && { width: '48.5%' },
            ]}
          >
            <View style={styles.cardHeader}>
              <Building2 size={22} color={COLORS.kiaRed} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Hamkor banklarimiz
              </Text>
            </View>

            <View style={styles.itemList}>
              <View style={styles.itemRow}>
                <CheckCircle2 size={16} color={COLORS.success} />
                <Text style={[styles.itemText, { color: colors.textSecondary }]}>
                  Ipak Yo‘li Bank — 2 soatda tezkor tasdiq
                </Text>
              </View>

              <View style={styles.itemRow}>
                <CheckCircle2 size={16} color={COLORS.success} />
                <Text style={[styles.itemText, { color: colors.textSecondary }]}>
                  Kapitalbank — maxsus imtiyozli foizlar
                </Text>
              </View>

              <View style={styles.itemRow}>
                <CheckCircle2 size={16} color={COLORS.success} />
                <Text style={[styles.itemText, { color: colors.textSecondary }]}>
                  O‘zsanoatqurilishbank (SQB) — davlat xizmatchilari uchun chegirmalar
                </Text>
              </View>

              <View style={styles.itemRow}>
                <CheckCircle2 size={16} color={COLORS.success} />
                <Text style={[styles.itemText, { color: colors.textSecondary }]}>
                  Hamkorbank — 5 yilgacha bo‘lgan uzoq muddatli lizing
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    maxWidth: 1320,
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
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 6,
  },
  infoGrid: {
    gap: 20,
    marginTop: 36,
  },
  infoGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  itemList: {
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  itemText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
});
