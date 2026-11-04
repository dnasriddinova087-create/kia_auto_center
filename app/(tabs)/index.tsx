// Home Screen for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ShieldCheck,
  Percent,
  Repeat,
  Wrench,
  ArrowRight,
  Calendar,
  ChevronRight,
  Building,
  Phone,
  Sparkles,
} from 'lucide-react-native';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { VehicleCard } from '../../components/VehicleCard';
import { LoanCalculatorWidget } from '../../components/LoanCalculatorWidget';
import { CustomButton } from '../../components/CustomButton';
import { LeadModal } from '../../components/LeadModal';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { KIA_VEHICLES } from '../../constants/vehicles';
import { KIA_OFFERS } from '../../constants/offers';
import { KIA_BRANCHES } from '../../constants/branches';
import { COLORS, RADIUS } from '../../constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t, language } = useLanguage();
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);

  const isWide = width >= 900;
  const isDesktop = width >= 1200;

  const featuredCars = KIA_VEHICLES.filter((v) => v.isFeatured).slice(0, 4);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <Navbar />

      {/* Hero Section */}
      <View style={styles.heroWrapper}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1920&q=85',
          }}
          style={styles.heroBackground}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.heroContent}>
          <View style={styles.heroBadge}>
            <Sparkles size={14} color={COLORS.kiaRed} />
            <Text style={styles.heroBadgeText}>O‘ZBEKISTONDAGI RASMIY DILER</Text>
          </View>

          <Text style={styles.heroTitle}>{t('heroTitle')}</Text>
          <Text style={styles.heroSubtitle}>{t('heroSubtitle')}</Text>

          <View style={styles.heroActions}>
            <CustomButton
              title={t('heroBtnExplore')}
              onPress={() => router.push('/(tabs)/catalog' as any)}
              variant="primary"
              size="lg"
              iconRight={<ArrowRight size={18} color="#FFFFFF" />}
            />
            <CustomButton
              title={t('heroBtnTestDrive')}
              onPress={() => setTestDriveModalOpen(true)}
              variant="outline"
              size="lg"
              textStyle={{ color: '#FFFFFF' }}
              style={{ borderColor: '#FFFFFF' }}
              icon={<Calendar size={18} color="#FFFFFF" />}
            />
          </View>

          {/* Owner Tribute Banner */}
          <View style={styles.ownerNotice}>
            <Text style={styles.ownerNoticeText}>
              Loyiha egasi: <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Nasriddinova Dilfuza</Text> | Toshkent, Samarqand, Buxoro
            </Text>
          </View>
        </View>
      </View>

      {/* KPI Stats Bar */}
      <View style={[styles.statsBar, { backgroundColor: isDark ? '#141414' : '#F8F9FA' }]}>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <ShieldCheck size={24} color={COLORS.kiaRed} />
            <View>
              <Text style={[styles.statNumber, { color: colors.text }]}>5 YIL</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Zavod kafolati
              </Text>
            </View>
          </View>

          <View style={styles.statBox}>
            <Percent size={24} color={COLORS.kiaRed} />
            <View>
              <Text style={[styles.statNumber, { color: colors.text }]}>0%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Muddatli to‘lov
              </Text>
            </View>
          </View>

          <View style={styles.statBox}>
            <Repeat size={24} color={COLORS.kiaRed} />
            <View>
              <Text style={[styles.statNumber, { color: colors.text }]}>Trade-In</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                30 daqiqada baholash
              </Text>
            </View>
          </View>

          <View style={styles.statBox}>
            <Building size={24} color={COLORS.kiaRed} />
            <View>
              <Text style={[styles.statNumber, { color: colors.text }]}>4 MARKAZ</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                O‘zbekiston bo‘ylab
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Featured Models */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('sectionModelsTitle')}
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              {t('sectionModelsSubtitle')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/catalog' as any)}
            style={styles.viewAllBtn}
          >
            <Text style={[styles.viewAllText, { color: COLORS.kiaRed }]}>
              {t('heroBtnExplore')}
            </Text>
            <ChevronRight size={18} color={COLORS.kiaRed} />
          </TouchableOpacity>
        </View>

        <View style={[styles.grid, isDesktop && styles.gridDesktop, !isDesktop && isWide && styles.gridTablet]}>
          {featuredCars.map((car) => (
            <View
              key={car.id}
              style={[
                styles.gridItem,
                isDesktop && { width: '48.5%' },
                !isDesktop && isWide && { width: '48.5%' },
              ]}
            >
              <VehicleCard vehicle={car} />
            </View>
          ))}
        </View>
      </View>

      {/* Special Offers Section */}
      <View style={[styles.offersSection, { backgroundColor: isDark ? '#141414' : '#F1F3F5' }]}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('sectionOffersTitle')}
              </Text>
              <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                {t('sectionOffersSubtitle')}
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/offers' as any)} style={styles.viewAllBtn}>
              <Text style={[styles.viewAllText, { color: COLORS.kiaRed }]}>Barcha aksiyalar</Text>
              <ChevronRight size={18} color={COLORS.kiaRed} />
            </TouchableOpacity>
          </View>

          <View style={[styles.offersGrid, isWide && styles.offersGridWide]}>
            {KIA_OFFERS.map((offer) => (
              <View
                key={offer.id}
                style={[
                  styles.offerCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  isWide && { width: '31.5%' },
                ]}
              >
                <Image source={{ uri: offer.image }} style={styles.offerImage} />
                <View style={styles.offerBadge}>
                  <Text style={styles.offerBadgeText}>{offer.badge[language]}</Text>
                </View>
                <View style={styles.offerContent}>
                  <Text style={[styles.offerTitle, { color: colors.text }]}>
                    {offer.title[language]}
                  </Text>
                  <Text style={[styles.offerDesc, { color: colors.textSecondary }]}>
                    {offer.description[language]}
                  </Text>
                  <CustomButton
                    title="Batafsil ma'lumot"
                    onPress={() => router.push('/offers' as any)}
                    variant="outline"
                    size="sm"
                    style={{ marginTop: 14 }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Calculator Section */}
      <View style={styles.section}>
        <LoanCalculatorWidget />
      </View>

      {/* Why KIA AUTO CENTER Advantages */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text, textAlign: 'center', marginBottom: 8 }]}>
          {t('sectionAdvantagesTitle')}
        </Text>
        <Text
          style={[
            styles.sectionSubtitle,
            { color: colors.textSecondary, textAlign: 'center', marginBottom: 32 },
          ]}
        >
          Biz bilan xarid qilish xavfsiz, oson va kafolatlangan
        </Text>

        <View style={[styles.advGrid, isWide && styles.advGridWide]}>
          <View
            style={[
              styles.advCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isWide && { width: '23.5%' },
            ]}
          >
            <View style={styles.advIcon}>
              <ShieldCheck size={28} color={COLORS.kiaRed} />
            </View>
            <Text style={[styles.advTitle, { color: colors.text }]}>{t('adv1Title')}</Text>
            <Text style={[styles.advDesc, { color: colors.textSecondary }]}>{t('adv1Desc')}</Text>
          </View>

          <View
            style={[
              styles.advCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isWide && { width: '23.5%' },
            ]}
          >
            <View style={styles.advIcon}>
              <Percent size={28} color={COLORS.kiaRed} />
            </View>
            <Text style={[styles.advTitle, { color: colors.text }]}>{t('adv2Title')}</Text>
            <Text style={[styles.advDesc, { color: colors.textSecondary }]}>{t('adv2Desc')}</Text>
          </View>

          <View
            style={[
              styles.advCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isWide && { width: '23.5%' },
            ]}
          >
            <View style={styles.advIcon}>
              <Repeat size={28} color={COLORS.kiaRed} />
            </View>
            <Text style={[styles.advTitle, { color: colors.text }]}>{t('adv3Title')}</Text>
            <Text style={[styles.advDesc, { color: colors.textSecondary }]}>{t('adv3Desc')}</Text>
          </View>

          <View
            style={[
              styles.advCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              isWide && { width: '23.5%' },
            ]}
          >
            <View style={styles.advIcon}>
              <Wrench size={28} color={COLORS.kiaRed} />
            </View>
            <Text style={[styles.advTitle, { color: colors.text }]}>{t('adv4Title')}</Text>
            <Text style={[styles.advDesc, { color: colors.textSecondary }]}>{t('adv4Desc')}</Text>
          </View>
        </View>
      </View>

      {/* Branches Preview */}
      <View style={[styles.branchesSection, { backgroundColor: isDark ? '#141414' : '#F8F9FA' }]}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('sectionBranchesTitle')}
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary, marginBottom: 24 }]}>
            Sizga eng yaqin rasmiy salonimizga tashrif buyuring
          </Text>

          <View style={[styles.branchesGrid, isWide && styles.branchesGridWide]}>
            {KIA_BRANCHES.map((branch) => (
              <View
                key={branch.id}
                style={[
                  styles.branchCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  isWide && { width: '48.5%' },
                ]}
              >
                <View style={styles.branchHeader}>
                  <Building size={20} color={COLORS.kiaRed} />
                  <Text style={[styles.branchTitle, { color: colors.text }]}>
                    {branch.name[language]}
                  </Text>
                </View>
                <Text style={[styles.branchAddress, { color: colors.textSecondary }]}>
                  {branch.address[language]}
                </Text>
                <View style={styles.branchFooter}>
                  <Text style={[styles.branchPhone, { color: COLORS.kiaRed }]}>{branch.phone}</Text>
                  <Text style={[styles.branchHours, { color: colors.textMuted }]}>
                    {branch.workingHours[language]}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <Footer />

      <LeadModal
        visible={testDriveModalOpen}
        onClose={() => setTestDriveModalOpen(false)}
        leadType="test_drive"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroWrapper: {
    position: 'relative',
    height: 580,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  heroBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  heroContent: {
    maxWidth: 1320,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(200, 16, 46, 0.2)',
    borderWidth: 1,
    borderColor: COLORS.kiaRed,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    gap: 8,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -0.5,
    maxWidth: 800,
    lineHeight: 50,
    marginBottom: 16,
  },
  heroSubtitle: {
    color: '#E5E7EB',
    fontSize: 18,
    maxWidth: 720,
    lineHeight: 26,
    marginBottom: 28,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  ownerNotice: {
    marginTop: 28,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.kiaRed,
    paddingLeft: 12,
  },
  ownerNoticeText: {
    color: '#D1D5DB',
    fontSize: 13,
  },
  statsBar: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.15)',
    paddingVertical: 20,
  },
  statsContainer: {
    maxWidth: 1320,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 160,
  },
  statNumber: {
    fontSize: 17,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    maxWidth: 1320,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 48,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 15,
    marginTop: 4,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'column',
    gap: 16,
  },
  gridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '100%',
  },
  offersSection: {
    paddingVertical: 16,
  },
  offersGrid: {
    flexDirection: 'column',
    gap: 20,
  },
  offersGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  offerCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  offerImage: {
    height: 180,
    width: '100%',
  },
  offerBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
  },
  offerBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  offerContent: {
    padding: 16,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  offerDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  advGrid: {
    gap: 16,
  },
  advGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  advCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 24,
  },
  advIcon: {
    marginBottom: 16,
  },
  advTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  advDesc: {
    fontSize: 13,
    lineHeight: 20,
  },
  branchesSection: {
    paddingVertical: 16,
  },
  branchesGrid: {
    gap: 16,
  },
  branchesGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  branchCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
  },
  branchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  branchTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  branchAddress: {
    fontSize: 13,
    marginBottom: 14,
  },
  branchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.15)',
    paddingTop: 10,
  },
  branchPhone: {
    fontSize: 13,
    fontWeight: '700',
  },
  branchHours: {
    fontSize: 12,
  },
});
