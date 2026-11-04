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
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { VehicleCard } from '../../components/VehicleCard';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../context/FavoritesContext';
import { KIA_VEHICLES } from '../../constants/vehicles';
import { COLORS, RADIUS } from '../../constants/theme';

export default function FavoritesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { favorites, clearFavorites } = useFavorites();

  const isWide = width >= 900;

  const favoriteVehicles = KIA_VEHICLES.filter((v) => favorites.includes(v.id));

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <Navbar />

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>
              {t('navFavorites')} ({favorites.length})
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Siz saqlagan va qiziqqan KIA avtomobillari ro‘yxati
            </Text>
          </View>

          {favorites.length > 0 && (
            <TouchableOpacity onPress={clearFavorites} style={styles.clearBtn}>
              <Trash2 size={16} color={COLORS.danger} />
              <Text style={styles.clearText}>Tozalash</Text>
            </TouchableOpacity>
          )}
        </View>

        {favoriteVehicles.length === 0 ? (
          <View
            style={[
              styles.emptyCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Heart size={64} color={colors.textMuted} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              Hozircha saqlangan avtomobillar yo‘q
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
              Katalogimizdan o‘zingizga ma’qul kelgan modellarni yurakcha belgisini bosib saqlab qo‘yishingiz mumkin.
            </Text>
            <CustomButton
              title={t('heroBtnExplore')}
              onPress={() => router.push('/(tabs)/catalog' as any)}
              variant="primary"
              size="md"
              style={{ marginTop: 20 }}
              iconRight={<ArrowRight size={16} color="#FFFFFF" />}
            />
          </View>
        ) : (
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
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  clearText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 18,
    textAlign: 'center',
  },
  emptyDesc: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 480,
    lineHeight: 20,
  },
  grid: {
    gap: 16,
  },
  gridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '100%',
  },
});
