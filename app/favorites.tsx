// Favorites Screen
// Owner: Nasriddinova Dilfuza

import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, Trash2, ArrowRight } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { VehicleCard } from '../components/VehicleCard';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { KIA_VEHICLES } from '../constants/vehicles';
import { COLORS, RADIUS } from '../constants/theme';

export default function FavoritesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { favorites, clearFavorites } = useFavorites();

  const isWide = width >= 900;

  const favoriteVehicles = KIA_VEHICLES.filter((v) => favorites.includes(v.id));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.bg }]}
        showsVerticalScrollIndicator={false}
      >
        <Navbar />

        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: colors.text }]}>
                {t('navFavorites')}
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Siz tanlagan va saqlangan KIA modellari ({favorites.length})
              </Text>
            </View>

            {favorites.length > 0 && (
              <TouchableOpacity onPress={clearFavorites} style={styles.clearBtn}>
                <Trash2 size={16} color={COLORS.danger} />
                <Text style={styles.clearBtnText}>Barchasini tozalash</Text>
              </TouchableOpacity>
            )}
          </View>

          {favoriteVehicles.length > 0 ? (
            <View style={[styles.grid, isWide && styles.gridWide]}>
              {favoriteVehicles.map((car) => (
                <View
                  key={car.id}
                  style={[styles.gridItem, isWide && { width: '48.5%' }]}
                >
                  <VehicleCard vehicle={car} />
                </View>
              ))}
            </View>
          ) : (
            <View
              style={[
                styles.emptyState,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Heart size={56} color={colors.textMuted} />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                {t('favoritesEmptyTitle')}
              </Text>
              <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                {t('favoritesEmptySubtitle')}
              </Text>
              <CustomButton
                title={t('heroBtnExplore')}
                onPress={() => router.push('/catalog')}
                variant="primary"
                size="md"
                style={{ marginTop: 20 }}
                iconRight={<ArrowRight size={16} color="#FFFFFF" />}
              />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 28,
    flexWrap: 'wrap',
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 4,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  clearBtnText: {
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: '700',
  },
  grid: {
    gap: 20,
  },
  gridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '100%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 18,
  },
  emptySubtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 420,
  },
});

