// Vehicle Detail Page for KIA AUTO CENTER
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  Calendar,
  Calculator,
  Repeat,
  ShieldCheck,
  Check,
  Gauge,
  Fuel,
  Cog,
  Maximize2,
} from 'lucide-react-native';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CustomButton } from '../../components/CustomButton';
import { LeadModal } from '../../components/LeadModal';
import { LoanCalculatorWidget } from '../../components/LoanCalculatorWidget';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../context/FavoritesContext';
import { KIA_VEHICLES } from '../../constants/vehicles';
import { COLORS, RADIUS } from '../../constants/theme';

export default function VehicleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t, language, formatCurrency } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [selectedTrimIndex, setSelectedTrimIndex] = useState(0);

  const vehicle = KIA_VEHICLES.find((v) => v.id === id || v.modelCode === id) || KIA_VEHICLES[1];
  const [activeImage, setActiveImage] = useState(vehicle.mainImage);

  const favorited = isFavorite(vehicle.id);
  const isWide = width >= 900;

  const currentTrim = vehicle.trims[selectedTrimIndex] || vehicle.trims[0];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <Navbar />

      <View style={styles.content}>
        {/* Breadcrumb / Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <ArrowLeft size={18} color={colors.textSecondary} />
          <Text style={[styles.backText, { color: colors.textSecondary }]}>
            {t('navCatalog')}
          </Text>
        </TouchableOpacity>

        {/* Top Overview Grid */}
        <View style={[styles.overviewGrid, isWide && styles.overviewGridWide]}>
          {/* Gallery Column */}
          <View style={[styles.galleryCol, isWide && { width: '58%' }]}>
            <View style={styles.mainImageWrapper}>
              <Image source={{ uri: activeImage }} style={styles.mainImage} resizeMode="cover" />
              {vehicle.isSpecialOffer && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>MAXSUS TAKLIF</Text>
                </View>
              )}
            </View>

            {/* Thumbnail selector */}
            <View style={styles.thumbnailsRow}>
              {vehicle.gallery.map((imgUrl, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setActiveImage(imgUrl)}
                  style={[
                    styles.thumbBtn,
                    {
                      borderColor: activeImage === imgUrl ? COLORS.kiaRed : colors.border,
                    },
                  ]}
                >
                  <Image source={{ uri: imgUrl }} style={styles.thumbImage} resizeMode="cover" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Details & CTA Column */}
          <View style={[styles.detailsCol, isWide && { width: '40%' }]}>
            <View style={styles.titleRow}>
              <View>
                <Text style={[styles.carName, { color: colors.text }]}>{vehicle.name}</Text>
                <Text style={[styles.carYear, { color: colors.textSecondary }]}>
                  {vehicle.year} • {vehicle.bodyType.toUpperCase()}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => toggleFavorite(vehicle.id)}
                style={[
                  styles.favBtn,
                  { backgroundColor: isDark ? '#222' : '#F3F4F6' },
                ]}
              >
                <Heart
                  size={20}
                  color={favorited ? COLORS.kiaRed : colors.text}
                  fill={favorited ? COLORS.kiaRed : 'transparent'}
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.tagline, { color: colors.textSecondary }]}>
              {vehicle.tagline[language]}
            </Text>

            {/* Price Box */}
            <View
              style={[
                styles.priceBox,
                { backgroundColor: isDark ? '#1C1C1C' : '#F8F9FA', borderColor: colors.border },
              ]}
            >
              <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>
                {t('fromPrice')}
              </Text>
              <Text style={[styles.priceValue, { color: COLORS.kiaRed }]}>
                {formatCurrency(currentTrim?.priceUzs || vehicle.basePriceUzs)}
              </Text>
              <Text style={[styles.warrantyText, { color: colors.textMuted }]}>
                5 yil yoki 150 000 km rasmiy zavod kafolati bilan
              </Text>
            </View>

            {/* CTAs */}
            <View style={styles.ctaGroup}>
              <CustomButton
                title={t('heroBtnTestDrive')}
                onPress={() => setTestDriveOpen(true)}
                variant="primary"
                size="lg"
                icon={<Calendar size={18} color="#FFFFFF" />}
              />
              <CustomButton
                title="Avtomobillarni taqqoslash"
                onPress={() => router.push('/compare' as any)}
                variant="outline"
                size="md"
                style={{ marginTop: 10 }}
              />
            </View>

            {/* Trims Selector */}
            <View style={styles.trimsSection}>
              <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                Komplektatsiyalar ({vehicle.trims.length} xil variant)
              </Text>
              <View style={styles.trimsRow}>
                {vehicle.trims.map((trim, idx) => (
                  <TouchableOpacity
                    key={trim.id}
                    onPress={() => setSelectedTrimIndex(idx)}
                    style={[
                      styles.trimBtn,
                      {
                        backgroundColor:
                          selectedTrimIndex === idx
                            ? COLORS.kiaRed
                            : isDark
                            ? '#222'
                            : '#F3F4F6',
                        borderColor: selectedTrimIndex === idx ? COLORS.kiaRed : colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.trimName,
                        { color: selectedTrimIndex === idx ? '#FFF' : colors.text },
                      ]}
                    >
                      {trim.name}
                    </Text>
                    <Text
                      style={[
                        styles.trimPrice,
                        { color: selectedTrimIndex === idx ? '#EEE' : colors.textSecondary },
                      ]}
                    >
                      {formatCurrency(trim.priceUzs)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Selected Trim Features */}
        {currentTrim && (
          <View
            style={[
              styles.featuresCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {currentTrim.name} Komplektatsiyasining jihozlari:
            </Text>
            <View style={styles.featuresGrid}>
              {currentTrim.features[language]?.map((f, i) => (
                <View key={i} style={styles.featureItem}>
                  <Check size={16} color={COLORS.success} />
                  <Text style={[styles.featureText, { color: colors.textSecondary }]}>{f}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Technical Specifications Table */}
        <View
          style={[
            styles.specsTableCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 20 }]}>
            Texnik tavsiflar ({vehicle.name})
          </Text>

          <View style={styles.specTable}>
            <View style={styles.specRow}>
              <Text style={[styles.specColName, { color: colors.textSecondary }]}>
                {t('specEngine')}
              </Text>
              <Text style={[styles.specColVal, { color: colors.text }]}>
                {vehicle.specs.engineCapacity} L ({vehicle.specs.fuelType})
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={[styles.specColName, { color: colors.textSecondary }]}>
                {t('specPower')}
              </Text>
              <Text style={[styles.specColVal, { color: colors.text }]}>
                {vehicle.specs.powerHp} ot kuchi ({vehicle.specs.torqueNm} Nm)
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={[styles.specColName, { color: colors.textSecondary }]}>
                {t('specTransmission')}
              </Text>
              <Text style={[styles.specColVal, { color: colors.text }]}>
                {vehicle.specs.transmission}
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={[styles.specColName, { color: colors.textSecondary }]}>
                {t('specDrive')}
              </Text>
              <Text style={[styles.specColVal, { color: colors.text }]}>
                {vehicle.specs.driveType}
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={[styles.specColName, { color: colors.textSecondary }]}>
                {t('specAccel')}
              </Text>
              <Text style={[styles.specColVal, { color: colors.text }]}>
                {vehicle.specs.acceleration0100} soniya
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={[styles.specColName, { color: colors.textSecondary }]}>
                Maksimal tezlik
              </Text>
              <Text style={[styles.specColVal, { color: colors.text }]}>
                {vehicle.specs.topSpeedKmh} km/soat
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={[styles.specColName, { color: colors.textSecondary }]}>
                {t('specConsumption')}
              </Text>
              <Text style={[styles.specColVal, { color: colors.text }]}>
                {vehicle.specs.fuelConsumptionCombined} L / 100km
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={[styles.specColName, { color: colors.textSecondary }]}>
                {t('specDimensions')} (Uzunlik / Kenglik / Balandlik)
              </Text>
              <Text style={[styles.specColVal, { color: colors.text }]}>
                {vehicle.specs.lengthMm} x {vehicle.specs.widthMm} x {vehicle.specs.heightMm} mm
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={[styles.specColName, { color: colors.textSecondary }]}>
                {t('specGroundClearance')}
              </Text>
              <Text style={[styles.specColVal, { color: colors.text }]}>
                {vehicle.specs.groundClearanceMm} mm
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={[styles.specColName, { color: colors.textSecondary }]}>
                {t('specTrunk')}
              </Text>
              <Text style={[styles.specColVal, { color: colors.text }]}>
                {vehicle.specs.trunkCapacityLiters} litr
              </Text>
            </View>
          </View>
        </View>

        {/* Loan Calculator for this Car */}
        <View style={{ marginTop: 24 }}>
          <LoanCalculatorWidget initialVehicle={vehicle} />
        </View>
      </View>

      <Footer />

      <LeadModal
        visible={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
        vehicleId={vehicle.id}
        vehicleName={`${vehicle.name} (${currentTrim?.name || 'Standard'})`}
        leadType="test_drive"
      />
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
    paddingVertical: 24,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
  overviewGrid: {
    gap: 28,
  },
  overviewGridWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  galleryCol: {},
  mainImageWrapper: {
    position: 'relative',
    height: 380,
    width: '100%',
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  thumbnailsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  thumbBtn: {
    width: 80,
    height: 60,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    overflow: 'hidden',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  detailsCol: {},
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  carName: {
    fontSize: 28,
    fontWeight: '900',
  },
  carYear: {
    fontSize: 14,
    marginTop: 2,
  },
  favBtn: {
    padding: 10,
    borderRadius: RADIUS.full,
  },
  tagline: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  priceBox: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 28,
    fontWeight: '900',
    marginVertical: 4,
  },
  warrantyText: {
    fontSize: 12,
  },
  ctaGroup: {
    marginBottom: 24,
  },
  trimsSection: {
    marginTop: 10,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  trimsRow: {
    gap: 8,
  },
  trimBtn: {
    padding: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
  },
  trimName: {
    fontSize: 14,
    fontWeight: '700',
  },
  trimPrice: {
    fontSize: 12,
    marginTop: 2,
  },
  featuresCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 24,
    marginTop: 28,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '48%',
    minWidth: 240,
  },
  featureText: {
    fontSize: 13,
  },
  specsTableCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 24,
    marginTop: 24,
  },
  specTable: {
    gap: 12,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.1)',
  },
  specColName: {
    fontSize: 13,
    fontWeight: '500',
  },
  specColVal: {
    fontSize: 13,
    fontWeight: '700',
  },
});
