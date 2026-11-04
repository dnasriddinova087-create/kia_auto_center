// KIA Official Service Center Booking Screen
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
import { Wrench, CheckCircle2, ShieldCheck, Clock, Settings, User, Phone } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { KIA_BRANCHES, Branch } from '../constants/branches';
import { mockStore } from '../lib/mockStore';
import { COLORS, RADIUS } from '../constants/theme';

export default function ServiceScreen() {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t, language } = useLanguage();

  const [serviceType, setServiceType] = useState('Rejali texnik xizmat (TO)');
  const [vehicleModel, setVehicleModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [mileageKm, setMileageKm] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState(KIA_BRANCHES[0].id);
  const [preferredDate, setPreferredDate] = useState('2026-11-08');
  const [preferredTime, setPreferredTime] = useState('10:00');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const isWide = width >= 900;

  const serviceCategories = [
    'Rejali texnik xizmat (TO)',
    'Moy va filtrlar almashtirish',
    'Kompyuter diagnostikasi',
    'Tormoz tizimi servisi',
    'Konditsioner tozalash va to‘ldirish',
    'G‘ildirak balansi va razval',
    'Kafolatli ta’mirlash',
  ];

  const handleSubmit = async () => {
    if (!vehicleModel.trim() || !fullName.trim() || phone.trim().length < 9) {
      setError('Iltimos, avtomobil modeli, ismingiz va telefoningizni kiriting');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const branchObj = KIA_BRANCHES.find((b: Branch) => b.id === selectedBranchId) || KIA_BRANCHES[0];
      await mockStore.createService({
        vehicleModel,
        licensePlate,
        mileageKm: Number(mileageKm) || 15000,
        serviceType,
        branchId: selectedBranchId,
        branchName: branchObj.name[language],
        preferredDate,
        preferredTime,
        fullName,
        phone,
        status: 'pending',
        notes,
      });

      setIsSuccess(true);
    } catch {
      setError('Arizani yuborishda xatolik yuz berdi.');
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
            {t('serviceTitle')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('serviceSubtitle')}
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
              Servis buyurtmangiz qabul qilindi!
            </Text>
            <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
              Servis ustasi siz bilan bog‘lanib, belgilangan vaqtda kutib oladi.
            </Text>
            <CustomButton
              title="Yana yozilish"
              onPress={() => {
                setIsSuccess(false);
                setVehicleModel('');
                setFullName('');
              }}
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

            {/* Service Type */}
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              1. Kerakli xizmat turini tanlang
            </Text>
            <View style={styles.pillsWrap}>
              {serviceCategories.map((cat) => {
                const isSelected = serviceType === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setServiceType(cat)}
                    style={[
                      styles.pill,
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
                        styles.pillText,
                        { color: isSelected ? '#FFF' : colors.text },
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Vehicle Details */}
            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 20 }]}>
              2. Avtomobil ma’lumotlari
            </Text>
            <View style={[styles.rowGrid, isWide && styles.rowGridWide]}>
              <CustomInput
                label="Avtomobil modeli"
                placeholder="KIA Sportage 2.5 2024"
                value={vehicleModel}
                onChangeText={setVehicleModel}
                containerStyle={{ flex: 1 }}
              />
              <CustomInput
                label="Davlat raqami"
                placeholder="01 A 777 AA"
                value={licensePlate}
                onChangeText={setLicensePlate}
                containerStyle={{ flex: 1 }}
              />
              <CustomInput
                label="Yurgan masofasi (km)"
                placeholder="15000"
                keyboardType="numeric"
                value={mileageKm}
                onChangeText={setMileageKm}
                containerStyle={{ flex: 1 }}
              />
            </View>

            {/* Branch, Date & Time */}
            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 16 }]}>
              3. Servis markazi va vaqt
            </Text>
            <View style={[styles.rowGrid, isWide && styles.rowGridWide]}>
              <CustomInput
                label="Qulay sana (YYYY-MM-DD)"
                value={preferredDate}
                onChangeText={setPreferredDate}
                containerStyle={{ flex: 1 }}
              />
              <CustomInput
                label="Qulay vaqt"
                value={preferredTime}
                onChangeText={setPreferredTime}
                containerStyle={{ flex: 1 }}
              />
            </View>

            {/* Customer Info */}
            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 16 }]}>
              4. Aloqa ma’lumotlari
            </Text>
            <CustomInput
              label={t('formFullName')}
              placeholder="Jasur Qodirov"
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
            <CustomInput
              label={t('formNotes')}
              placeholder="Muammo yoki shikoyat haqida batafsil..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={2}
            />

            <CustomButton
              title="Servisga yozilishni tasdiqlash"
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
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.full,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  rowGrid: {
    gap: 12,
  },
  rowGridWide: {
    flexDirection: 'row',
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
