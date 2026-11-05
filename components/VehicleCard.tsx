// Vehicle Card Component for Catalog & Home
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Heart, Gauge, Fuel, Cog, ArrowRight, Calendar } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Vehicle } from '../constants/vehicles';
import { getVehicleImage } from '../constants/vehicleImages';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { CustomButton } from './CustomButton';
import { LeadModal } from './LeadModal';
import { RADIUS, COLORS } from '../constants/theme';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { t, language, formatCurrency } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);

  const favorited = isFavorite(vehicle.id);

  // Approximate 36 month loan with 30% down payment
  const loanPrincipal = vehicle.basePriceUzs * 0.7;
  const approxMonthlyPayment = Math.round((loanPrincipal * (1 + 0.185 * 3)) / 36);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Top Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={getVehicleImage(vehicle)}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Badges Overlay */}
        <View style={styles.badgeRow}>
          {vehicle.isSpecialOffer && (
            <View style={styles.specialBadge}>
              <Text style={styles.specialBadgeText}>AKSIYA</Text>
            </View>
          )}
          {vehicle.isFeatured && !vehicle.isSpecialOffer && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>BESTSELLER</Text>
            </View>
          )}
        </View>

        {/* Favorite Button */}
        <TouchableOpacity
          onPress={() => toggleFavorite(vehicle.id)}
          style={[
            styles.favoriteBtn,
            { backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)' },
          ]}
        >
          <Heart
            size={18}
            color={favorited ? COLORS.kiaRed : colors.text}
            fill={favorited ? COLORS.kiaRed : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.name, { color: colors.text }]}>{vehicle.name}</Text>
          <Text style={[styles.year, { color: colors.textSecondary }]}>{vehicle.year}</Text>
        </View>

        <Text
          style={[styles.tagline, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {vehicle.tagline[language]}
        </Text>

        {/* Quick Specs Chips */}
        <View style={styles.specsRow}>
          <View style={[styles.specChip, { backgroundColor: isDark ? '#222222' : '#F1F3F5' }]}>
            <Gauge size={13} color={colors.textSecondary} />
            <Text style={[styles.specText, { color: colors.text }]}>
              {vehicle.specs.powerHp} ot kuchi
            </Text>
          </View>

          <View style={[styles.specChip, { backgroundColor: isDark ? '#222222' : '#F1F3F5' }]}>
            <Cog size={13} color={colors.textSecondary} />
            <Text style={[styles.specText, { color: colors.text }]}>
              {vehicle.specs.transmission}
            </Text>
          </View>

          <View style={[styles.specChip, { backgroundColor: isDark ? '#222222' : '#F1F3F5' }]}>
            <Fuel size={13} color={colors.textSecondary} />
            <Text style={[styles.specText, { color: colors.text }]}>
              {vehicle.specs.fuelConsumptionCombined}L / 100km
            </Text>
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.pricingSection}>
          <View>
            <Text style={[styles.priceLabel, { color: colors.textMuted }]}>
              {t('fromPrice')}
            </Text>
            <Text style={[styles.priceValue, { color: COLORS.kiaRed }]}>
              {formatCurrency(vehicle.basePriceUzs)}
            </Text>
          </View>

          <View style={styles.loanBox}>
            <Text style={[styles.loanLabel, { color: colors.textMuted }]}>
              {t('calcMonthlyPayment')}
            </Text>
            <Text style={[styles.loanValue, { color: colors.text }]}>
              ~{formatCurrency(approxMonthlyPayment)} / {t('monthsCount')}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <CustomButton
            title={t('detailsBtn')}
            onPress={() => router.push(`/vehicle/${vehicle.id}` as any)}
            variant="outline"
            size="sm"
            style={{ flex: 1 }}
            iconRight={<ArrowRight size={14} color={colors.text} />}
          />
          <CustomButton
            title={t('bookTestDriveBtn')}
            onPress={() => setTestDriveModalOpen(true)}
            variant="primary"
            size="sm"
            style={{ flex: 1 }}
            icon={<Calendar size={14} color="#FFFFFF" />}
          />
        </View>
      </View>

      <LeadModal
        visible={testDriveModalOpen}
        onClose={() => setTestDriveModalOpen(false)}
        vehicleId={vehicle.id}
        vehicleName={vehicle.name}
        leadType="test_drive"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
    ...(Platform.OS === 'web'
      ? {
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }
      : {}),
  },
  imageContainer: {
    position: 'relative',
    height: 220,
    width: '100%',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    gap: 6,
  },
  specialBadge: {
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
  },
  specialBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  featuredBadge: {
    backgroundColor: '#111111',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    borderRadius: RADIUS.full,
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  year: {
    fontSize: 14,
    fontWeight: '600',
  },
  tagline: {
    fontSize: 13,
    marginBottom: 12,
  },
  specsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  specChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    gap: 5,
  },
  specText: {
    fontSize: 11,
    fontWeight: '600',
  },
  pricingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.15)',
    paddingTop: 12,
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  loanBox: {
    alignItems: 'flex-end',
  },
  loanLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  loanValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
