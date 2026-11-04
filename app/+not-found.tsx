// Not Found / 404 Fallback Screen
// Owner: Nasriddinova Dilfuza

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertCircle, Home, Car } from 'lucide-react-native';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { COLORS, RADIUS } from '../constants/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>KIA AUTO CENTER</Text>
        </View>

        <AlertCircle size={56} color={COLORS.kiaRed} style={{ marginTop: 12 }} />

        <Text style={[styles.title, { color: colors.text }]}>
          404 — Sahifa Topilmadi
        </Text>
        <Text style={[styles.desc, { color: colors.textSecondary }]}>
          Siz qidirayotgan sahifa ko‘chirilgan, o‘chirilgan yoki noto‘g‘ri havola kiritilgan bo‘lishi mumkin.
        </Text>

        <View style={styles.actions}>
          <CustomButton
            title="Bosh sahifaga qaytish"
            onPress={() => router.replace('/')}
            variant="primary"
            size="md"
            icon={<Home size={16} color="#FFFFFF" />}
          />
          <CustomButton
            title="Avtomobillar katalogi"
            onPress={() => router.push('/catalog')}
            variant="outline"
            size="md"
            icon={<Car size={16} color={colors.text} />}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    maxWidth: 480,
    width: '100%',
    padding: 36,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  badge: {
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 18,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
});

