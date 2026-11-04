// Trade-In Program & Valuation Screen
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Repeat, CheckCircle2, Sparkles, User, Phone, Car } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { KIA_VEHICLES, Vehicle } from '../constants/vehicles';
import { mockStore } from '../lib/mockStore';
import { COLORS, RADIUS } from '../constants/theme';

export default function TradeInScreen() {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t, formatCurrency } = useLanguage();

  const [currentCarBrand, setCurrentCarBrand] = useState('Chevrolet');
  const [currentCarModel, setCurrentCarModel] = useState('Malibu 2');
  const [currentCarYear, setCurrentCarYear] = useState('2022');
  const [currentCarMileage, setCurrentCarMileage] = useState('45000');
  const [condition, setCondition] = useState<'excellent' | 'good' | 'fair'>('excellent');
  const [targetCarId, setTargetCarId] = useState(KIA_VEHICLES[1].id); // K5 default
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const isWide = width >= 900;

  // Approximate valuation algorithm
  const baseYear = 2026;
  const age = Math.max(0, baseYear - Number(currentCarYear || 2020));
  const mileageNum = Number(currentCarMileage || 50000);

  let estimatedBase = 250000000;
  if (currentCarBrand.toLowerCase().includes('chevrolet')) {
    if (currentCarModel.toLowerCase().includes('gentra') || currentCarModel.toLowerCase().includes('lacetti')) {
      estimatedBase = 155000000;
    } else if (currentCarModel.toLowerCase().includes('cobalt')) {
      estimatedBase = 145000000;
    } else if (currentCarModel.toLowerCase().includes('malibu')) {
      estimatedBase = 310000000;
    } else if (currentCarModel.toLowerCase().includes('tracker')) {
      estimatedBase = 230000000;
    } else if (currentCarModel.toLowerCase().includes('tahoe')) {
      estimatedBase = 850000000;
    }
  }

  const conditionMultiplier = condition === 'excellent' ? 1.0 : condition === 'good' ? 0.92 : 0.82;
  const ageDepreciation = Math.max(0.4, 1 - age * 0.06);
  const mileageFactor = Math.max(0.7, 1 - (mileageNum / 100000) * 0.15);

  const estimatedValue = Math.round(
    estimatedBase * ageDepreciation * mileageFactor * conditionMultiplier
  );

  const targetCar = KIA_VEHICLES.find((v: Vehicle) => v.id === targetCarId) || KIA_VEHICLES[1];
  const differenceToPay = Math.max(0, targetCar.basePriceUzs - estimatedValue - 15000000); // 15M bonus

  const handleSubmit = async () => {
    if (!fullName.trim() || phone.trim().length < 9) {
      setError('Iltimos, ismingiz va telefon raqamingizni to‘liq kiriting');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await mockStore.createTradeIn({
        fullName,
        phone,
        currentCarBrand,
        currentCarModel,
        currentCarYear: Number(currentCarYear) || 2022,
        currentCarMileage: mileageNum,
        currentCarCondition: condition,
        targetVehicleId: targetCar.id,
        targetVehicleName: targetCar.name,
        estimatedValueUzs: estimatedValue,
        status: 'pending',
      });

      setIsSuccess(true);
    } catch {
      setError('Baholash arizasini yuborishda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <Navbar />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('tradeInTitle')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('tradeInSubtitle')}
          </Text>
        </View>

        {isSuccess ? (
          <View
            style={[
              styles.successCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <CheckCircle2 size={64} color={COLORS.success} />
            <Text style={[styles.successTitle, { color: colors.text }]}>
              Baholash arizangiz qabul qilindi!
            </Text>
            <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
              Baholovchi mutaxassisimiz 15 daqiqada siz bilan bog‘lanadi va avtosalonimizda batafsil texnik ko‘rik vaqtini tasdiqlaydi.
            </Text>
            <CustomButton
              title="Yana hisoblash"
              onPress={() => setIsSuccess(false)}
              variant="outline"
              size="md"
              style={{ marginTop: 24 }}
            />
          </View>
        ) : (
          <View
            style={[
              styles.formCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Current Car */}
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              1. Hozirgi avtomobilingiz
            </Text>
            <View style={[styles.rowGrid, isWide && styles.rowGridWide]}>
              <CustomInput
                label={t('currentCarBrand')}
                placeholder="Chevrolet, Hyundai, Toyota..."
                value={currentCarBrand}
                onChangeText={setCurrentCarBrand}
                containerStyle={{ flex: 1 }}
              />
              <CustomInput
                label={t('currentCarModel')}
                placeholder="Malibu 2, Gentra, Sonata..."
                value={currentCarModel}
                onChangeText={setCurrentCarModel}
                containerStyle={{ flex: 1 }}
              />
            </View>

            <View style={[styles.rowGrid, isWide && styles.rowGridWide]}>
              <CustomInput
                label={t('currentCarYear')}
                placeholder="2022"
                keyboardType="numeric"
                value={currentCarYear}
                onChangeText={setCurrentCarYear}
                containerStyle={{ flex: 1 }}
              />
              <CustomInput
                label={t('currentCarMileage')}
                placeholder="45000"
                keyboardType="numeric"
                value={currentCarMileage}
                onChangeText={setCurrentCarMileage}
                containerStyle={{ flex: 1 }}
              />
            </View>

            {/* Condition selector */}
            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 10 }]}>
              Holati
            </Text>
            <View style={styles.condRow}>
              {[
                { id: 'excellent', label: t('conditionExcellent') },
                { id: 'good', label: t('conditionGood') },
                { id: 'fair', label: t('conditionFair') },
              ].map((c) => {
                const isSelected = condition === c.id;
                return (
                  <TouchableOpacity
                    key={c.id}
                    onPress={() => setCondition(c.id as any)}
                    style={[
                      styles.condBtn,
                      {
                        backgroundColor: isSelected
                          ? COLORS.kiaRed
                          : isDark
                          ? '#222'
                          : '#E5E7EB',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.condText,
                        { color: isSelected ? '#FFF' : colors.text },
                      ]}
                    >
                      {c.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Target KIA */}
            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 20 }]}>
              2. Qaysi KIA avtomobiliga almashtirmoqchisiz?
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.targetScroll}>
              {KIA_VEHICLES.map((car: Vehicle) => {
                const isSelected = targetCarId === car.id;
                return (
                  <TouchableOpacity
                    key={car.id}
                    onPress={() => setTargetCarId(car.id)}
                    style={[
                      styles.targetPill,
                      {
                        backgroundColor: isSelected
                          ? COLORS.kiaRed
                          : isDark
                          ? '#222'
                          : '#E5E7EB',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.targetPillText,
                        { color: isSelected ? '#FFF' : colors.text },
                      ]}
                    >
                      {car.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Valuation Results Banner */}
            <View
              style={[
                styles.resultBanner,
                { backgroundColor: isDark ? '#141414' : '#F9FAFB', borderColor: colors.border },
              ]}
            >
              <View style={styles.bannerHeader}>
                <Sparkles size={20} color={COLORS.kiaRed} />
                <Text style={[styles.bannerTitle, { color: colors.text }]}>
                  Dastlabki hisob-kitob
                </Text>
              </View>

              <View style={styles.valRow}>
                <Text style={[styles.valLabel, { color: colors.textSecondary }]}>
                  {currentCarBrand} {currentCarModel} taxminiy bahosi:
                </Text>
                <Text style={[styles.valAmount, { color: colors.text }]}>
                  ~{formatCurrency(estimatedValue)}
                </Text>
              </View>

              <View style={styles.valRow}>
                <Text style={[styles.valLabel, { color: COLORS.kiaRed, fontWeight: '700' }]}>
                  Trade-In dasturi bonusi (Chegirma):
                </Text>
                <Text style={[styles.valAmount, { color: COLORS.kiaRed }]}>
                  -15 000 000 so‘m
                </Text>
              </View>

              <View style={styles.valRow}>
                <Text style={[styles.valLabel, { color: colors.textSecondary }]}>
                  Yangi {targetCar.name} uchun to‘lanadigan qoldiq:
                </Text>
                <Text style={[styles.valAmount, { color: COLORS.success, fontSize: 18 }]}>
                  ~{formatCurrency(differenceToPay)}
                </Text>
              </View>
            </View>

            {/* Contact info */}
            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 24 }]}>
              3. Aloqa ma’lumotlaringiz
            </Text>
            <CustomInput
              label={t('formFullName')}
              placeholder="Dilshod Ergashev"
              value={fullName}
              onChangeText={setFullName}
              icon={<User size={18} color={colors.textMuted} />}
            />
            <CustomInput
              label={t('formPhone')}
              placeholder="+998 90 123 45 67"
              value={phone}
              onChangeText={setPhone}
              icon={<Phone size={18} color={colors.textMuted} />}
            />

            <CustomButton
              title="Trade-In baholashga ariza berish"
              onPress={handleSubmit}
              loading={loading}
              variant="primary"
              size="lg"
              style={{ marginTop: 24 }}
            />
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
    maxWidth: 960,
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
  formCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 28,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  rowGrid: {
    gap: 12,
  },
  rowGridWide: {
    flexDirection: 'row',
  },
  condRow: {
    gap: 8,
    marginBottom: 12,
  },
  condBtn: {
    padding: 12,
    borderRadius: RADIUS.md,
  },
  condText: {
    fontSize: 13,
    fontWeight: '600',
  },
  targetScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  targetPill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: RADIUS.full,
    marginRight: 8,
  },
  targetPillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  resultBanner: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
    marginTop: 10,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  valRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150,150,150,0.1)',
  },
  valLabel: {
    fontSize: 13,
  },
  valAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
  },
  successCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 48,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 16,
  },
  successDesc: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 500,
    marginTop: 8,
  },
});
