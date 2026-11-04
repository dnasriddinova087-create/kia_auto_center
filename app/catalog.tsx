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
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { VehicleCard } from '../components/VehicleCard';
import { CustomInput } from '../components/CustomInput';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { KIA_VEHICLES, Vehicle } from '../constants/vehicles';
import { COLORS, RADIUS } from '../constants/theme';

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
      if (sortBy === 'price_asc') return a.priceStartingUzs - b.priceStartingUzs;
      if (sortBy === 'price_desc') return b.priceStartingUzs - a.priceStartingUzs;
      if (sortBy === 'power') return b.specs.horsepower - a.specs.horsepower;
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.bg }]}
        showsVerticalScrollIndicator={false}
      >
        <Navbar />

        <View style={styles.content}>
          {/* Page Header */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Car size={14} color={COLORS.kiaRed} />
              <Text style={styles.badgeText}>RASMIY KATALOG</Text>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              {t('catalogTitle')}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {t('catalogSubtitle')}
            </Text>
          </View>

          {/* Search & Sort Filters Bar */}
          <View
            style={[
              styles.filterBar,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.searchBox}>
              <CustomInput
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChangeText={setSearchQuery}
                icon={<Search size={18} color={colors.textMuted} />}
                style={{ marginBottom: 0 }}
              />
            </View>

            {/* Sort Dropdown / Pills */}
            <View style={styles.sortPills}>
              <TouchableOpacity
                onPress={() => setSortBy('price_asc')}
                style={[
                  styles.sortBtn,
                  sortBy === 'price_asc' && { backgroundColor: COLORS.kiaRed },
                ]}
              >
                <Text
                  style={[
                    styles.sortText,
                    { color: sortBy === 'price_asc' ? '#FFF' : colors.textSecondary },
                  ]}
                >
                  {t('sortPriceAsc')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSortBy('price_desc')}
                style={[
                  styles.sortBtn,
                  sortBy === 'price_desc' && { backgroundColor: COLORS.kiaRed },
                ]}
              >
                <Text
                  style={[
                    styles.sortText,
                    { color: sortBy === 'price_desc' ? '#FFF' : colors.textSecondary },
                  ]}
                >
                  {t('sortPriceDesc')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSortBy('power')}
                style={[
                  styles.sortBtn,
                  sortBy === 'power' && { backgroundColor: COLORS.kiaRed },
                ]}
              >
                <Text
                  style={[
                    styles.sortText,
                    { color: sortBy === 'power' ? '#FFF' : colors.textSecondary },
                  ]}
                >
                  {t('sortPower')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContent}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  style={[
                    styles.catTab,
                    {
                      backgroundColor: isSelected
                        ? COLORS.kiaRed
                        : isDark
                        ? '#222222'
                        : '#F3F4F6',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.catTabText,
                      { color: isSelected ? '#FFFFFF' : colors.textSecondary },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Result Count */}
          <View style={styles.resultsInfo}>
            <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
              Topilgan avtomobillar: <Text style={{ color: colors.text, fontWeight: '800' }}>{filteredVehicles.length}</Text> ta
            </Text>
          </View>

          {/* Vehicle Grid */}
          {filteredVehicles.length > 0 ? (
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
          ) : (
            <View style={[styles.emptyBox, { borderColor: colors.border }]}>
              <Car size={48} color={colors.textMuted} />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                Avtomobil topilmadi
              </Text>
              <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
                Qidiruv so‘rovingizni o‘zgartiring yoki filtrlarni tozalang.
              </Text>
            </View>
          )}
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
    maxWidth: 1320,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 36,
  },
  header: {
    marginBottom: 28,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(200, 16, 46, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeText: {
    color: COLORS.kiaRed,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
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
  filterBar: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    gap: 16,
  },
  searchBox: {
    width: '100%',
  },
  sortPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.sm,
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryContent: {
    gap: 8,
  },
  catTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
  },
  catTabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  resultsInfo: {
    marginBottom: 20,
  },
  resultsCount: {
    fontSize: 14,
  },
  grid: {
    gap: 20,
  },
  gridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '100%',
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    borderStyle: 'dashed',
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 14,
  },
  emptyDesc: {
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
});

