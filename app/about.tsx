// About KIA AUTO CENTER & Leadership Screen
// Owner: Nasriddinova Dilfuza

import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { ShieldCheck, Award, Users } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { COLORS, RADIUS } from '../constants/theme';

export default function AboutScreen() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { t } = useLanguage();

  const isWide = width >= 900;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <Navbar />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('navAbout')} — KIA AUTO CENTER
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            O‘zbekistondagi eng yirik rasmiy dilerlik ekotizimi
          </Text>
        </View>

        {/* Owner & Vision Card */}
        <View
          style={[
            styles.ownerCard,
            { backgroundColor: colors.card, borderColor: colors.border },
            isWide && styles.ownerCardWide,
          ]}
        >
          <View style={[styles.ownerImageCol, isWide && { width: '40%' }]}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
              }}
              style={styles.ownerPhoto}
              resizeMode="cover"
            />
            <View style={styles.ownerCaption}>
              <Text style={styles.ownerCaptionRole}>Loyiha Egasi & Rahbari</Text>
              <Text style={styles.ownerCaptionName}>Nasriddinova Dilfuza</Text>
            </View>
          </View>

          <View style={[styles.ownerTextCol, isWide && { width: '58%' }]}>
            <Text style={[styles.quote, { color: colors.text }]}>
              «Bizning asosiy maqsadimiz — har bir mijozga global KIA standartlaridagi yuksak xizmat sifatini, qulay moliyaviy yechimlarni va haqiqiy xavfsizlik kafolatini taqdim etishdir.»
            </Text>

            <Text style={[styles.bodyText, { color: colors.textSecondary }]}>
              KIA AUTO CENTER O‘zbekiston avtomobil bozorida mijozlarga qulaylik yaratish, premium xizmat ko‘rsatish va rasmiy zavod kafolatini to‘liq ta’minlash borasida yetakchi o‘rinni egallaydi.
            </Text>

            <Text style={[styles.bodyText, { color: colors.textSecondary, marginTop: 12 }]}>
              Platformamiz nafaqat zamonaviy avtosalonlarni, balki zamonaviy veb-platforma, mobil ilova, avtokredit kalkulyatori, 30 daqiqalik Trade-In baholash tizimi va sertifikatlangan servis xizmatlarini yagona raqamli ekotizimga birlashtiradi.
            </Text>
          </View>
        </View>

        {/* Pillars / Values Grid */}
        <View style={[styles.pillarsGrid, isWide && styles.pillarsGridWide]}>
          <View
            style={[
              styles.pillarCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isWide && { width: '31.5%' },
            ]}
          >
            <ShieldCheck size={32} color={COLORS.kiaRed} />
            <Text style={[styles.pillarTitle, { color: colors.text }]}>
              5 Yillik Zavod Kafolati
            </Text>
            <Text style={[styles.pillarDesc, { color: colors.textSecondary }]}>
              Barcha yangi KIA modellariga 5 yil yoki 150 000 km masofagacha to‘liq rasmiy kafolat xizmati amal qiladi.
            </Text>
          </View>

          <View
            style={[
              styles.pillarCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isWide && { width: '31.5%' },
            ]}
          >
            <Award size={32} color={COLORS.kiaRed} />
            <Text style={[styles.pillarTitle, { color: colors.text }]}>
              100% Original Ehtiyot Qismlar
            </Text>
            <Text style={[styles.pillarDesc, { color: colors.textSecondary }]}>
              Faqat KIA Motors korporatsiyasi tomonidan sertifikatlangan original Mobis ehtiyot qismlari va sarflovchilari.
            </Text>
          </View>

          <View
            style={[
              styles.pillarCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isWide && { width: '31.5%' },
            ]}
          >
            <Users size={32} color={COLORS.kiaRed} />
            <Text style={[styles.pillarTitle, { color: colors.text }]}>
              Professional Jamoa
            </Text>
            <Text style={[styles.pillarDesc, { color: colors.textSecondary }]}>
              Xalqaro sertifikatga ega bo‘lgan konsultantlar, kredit bo‘yicha ekspertlar va yuqori toifali servis muhandislari.
            </Text>
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
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 36,
  },
  header: {
    marginBottom: 32,
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
  ownerCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 24,
    marginBottom: 36,
  },
  ownerCardWide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ownerImageCol: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ownerPhoto: {
    width: 260,
    height: 320,
    borderRadius: RADIUS.lg,
  },
  ownerCaption: {
    marginTop: 12,
    alignItems: 'center',
  },
  ownerCaptionRole: {
    fontSize: 12,
    color: COLORS.kiaRed,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  ownerCaptionName: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  ownerTextCol: {
    paddingHorizontal: 12,
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 28,
    fontWeight: '600',
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 24,
  },
  pillarsGrid: {
    gap: 20,
  },
  pillarsGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pillarCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 24,
  },
  pillarTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginVertical: 12,
  },
  pillarDesc: {
    fontSize: 13,
    lineHeight: 20,
  },
});
