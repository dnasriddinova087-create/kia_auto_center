// KIA Models Catalog Screen
// Owner: Nasriddinova Dilfuza

import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Search, SlidersHorizontal, Car } from 'lucide-react-native';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { VehicleCard } from '../../components/VehicleCard';
import { CustomInput } from '../../components/CustomInput';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { KIA_VEHICLES, Vehicle } from '../../constants/vehicles';
import { COLORS, RADIUS } from '../../constants/theme';

export default function CatalogScreen() {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'power'>('price_asc');

  const isWide = width >= 900;
  const isDesktop = width >= 1200;

  const categories = [
    { id: 'all', label: t('filterAll') },
    { id: 'sedan', label: t('filterSedan') },
    { id: 'crossover', label: t('filterCrossover') },
    { id: 'suv', label: t('filterSuv') },
    { id: 'minivan', label: t('filterMinivan') },
    { id: 'commercial', label: t('filterCommercial') },
  ];

  const filteredVehicles = useMemo(() => {
    return KIA_VEHICLES.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.modelCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || car.bodyType === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.basePriceUzs - b.basePriceUzs;
      if (sortBy === 'price_desc') return b.basePriceUzs - a.basePriceUzs;
      if (sortBy === 'power') return b.specs.powerHp - a.specs.powerHp;
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <Navbar />

      <View style={styles.content}>
        {/* Page Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('sectionModelsTitle')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Rasmiy dilerlik kafolati bilan 11 ta zamonaviy KIA modellari
          </Text>
        </View>

        {/* Search & Filter Controls */}
        <View
          style={[
            styles.filterBox,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {/* Search bar */}
          <CustomInput
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon={<Search size={18} color={colors.textMuted} />}
            containerStyle={{ marginBottom: 16 }}
          />

          {/* Categories Pill Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  style={[
                    styles.catPill,
                    {
                      backgroundColor: isSelected
                        ? COLORS.kiaRed
                        : isDark
                        ? '#222222'
                        : '#E5E7EB',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.catText,
                      {
                        color: isSelected ? '#FFFFFF' : colors.text,
                        fontWeight: isSelected ? '700' : '500',
                      },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Sort bar & Results count */}
          <View style={styles.sortRow}>
            <Text style={[styles.countText, { color: colors.textSecondary }]}>
              {filteredVehicles.length} ta model topildi
            </Text>

            <View style={styles.sortButtons}>
              <TouchableOpacity
                onPress={() => setSortBy('price_asc')}
                style={[
                  styles.sortBtn,
                  sortBy === 'price_asc' && { borderColor: COLORS.kiaRed },
                ]}
              >
                <Text
                  style={[
                    styles.sortText,
                    {
                      color: sortBy === 'price_asc' ? COLORS.kiaRed : colors.textSecondary,
                    },
                  ]}
                >
                  {t('sortByPriceAsc')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSortBy('price_desc')}
                style={[
                  styles.sortBtn,
                  sortBy === 'price_desc' && { borderColor: COLORS.kiaRed },
                ]}
              >
                <Text
                  style={[
                    styles.sortText,
                    {
                      color: sortBy === 'price_desc' ? COLORS.kiaRed : colors.textSecondary,
                    },
                  ]}
                >
                  {t('sortByPriceDesc')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Vehicles Grid */}
        <View
          style={[
            styles.grid,
            isDesktop && styles.gridDesktop,
            !isDesktop && isWide && styles.gridTablet,
          ]}
        >
          {filteredVehicles.map((car) => (
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
    marginBottom: 24,
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
  filterBox: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
    marginBottom: 32,
  },
  categoriesScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  catPill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: RADIUS.full,
    marginRight: 8,
  },
  catText: {
    fontSize: 13,
  },
  sortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.15)',
    paddingTop: 14,
    gap: 10,
  },
  countText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
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
});
