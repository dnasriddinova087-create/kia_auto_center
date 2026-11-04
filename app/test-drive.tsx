// Dedicated Test-Drive Booking Screen
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
import { Calendar, CheckCircle2, User, Phone, FileCheck, Building, Car } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { KIA_VEHICLES, Vehicle } from '../constants/vehicles';
import { KIA_BRANCHES, Branch } from '../constants/branches';
import { mockStore } from '../lib/mockStore';
import { COLORS, RADIUS } from '../constants/theme';

export default function TestDriveScreen() {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t, language } = useLanguage();

  const [selectedVehicleId, setSelectedVehicleId] = useState(KIA_VEHICLES[1].id); // K5 default
  const [selectedBranchId, setSelectedBranchId] = useState(KIA_BRANCHES[0].id);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [driverLicense, setDriverLicense] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-11-06');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const isWide = width >= 900;

  const handleSubmit = async () => {
    if (!fullName.trim() || phone.trim().length < 9) {
      setError('Iltimos, to‘liq ismingiz va telefon raqamingizni kiriting');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const vehicleObj = KIA_VEHICLES.find((v: Vehicle) => v.id === selectedVehicleId) || KIA_VEHICLES[0];
      const branchObj = KIA_BRANCHES.find((b: Branch) => b.id === selectedBranchId) || KIA_BRANCHES[0];

      await mockStore.createTestDrive({
        fullName,
        phone,
        driverLicenseNumber: driverLicense,
        vehicleId: selectedVehicleId,
        vehicleName: vehicleObj.name,
        branchId: selectedBranchId,
        branchName: branchObj.name[language],
        preferredDate,
        preferredTime,
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
            {t('navTestDrive')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Siz tanlagan KIA avtomobilini shahar va trassada bepul sinab ko‘ring
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
              {t('formSuccessTitle')}
            </Text>
            <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
              Test-drayv arizangiz muvaffaqiyatli ro‘yxatga olindi. Menejerimiz tez orada vaqt va tafsilotlarni tasdiqlash uchun siz bilan bog‘lanadi.
            </Text>
            <CustomButton
              title="Yana ariza topshirish"
              onPress={() => {
                setIsSuccess(false);
                setFullName('');
                setPhone('+998 ');
                setDriverLicense('');
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

            {/* Step 1: Model */}
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              1. Avtomobil modelini tanlang
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modelScroll}>
              {KIA_VEHICLES.map((car: Vehicle) => {
                const isSelected = selectedVehicleId === car.id;
                return (
                  <TouchableOpacity
                    key={car.id}
                    onPress={() => setSelectedVehicleId(car.id)}
                    style={[
                      styles.modelPill,
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
                        styles.modelPillText,
                        { color: isSelected ? '#FFF' : colors.text },
                      ]}
                    >
                      {car.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Step 2: Branch */}
            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 16 }]}>
              2. Dilerlik markazini tanlang
            </Text>
            <View style={[styles.branchGrid, isWide && styles.branchGridWide]}>
              {KIA_BRANCHES.map((b: Branch) => {
                const isSelected = selectedBranchId === b.id;
                return (
                  <TouchableOpacity
                    key={b.id}
                    onPress={() => setSelectedBranchId(b.id)}
                    style={[
                      styles.branchBox,
                      {
                        backgroundColor: isSelected
                          ? isDark
                            ? '#2A2A2A'
                            : '#FEE2E2'
                          : isDark
                          ? '#1A1A1A'
                          : '#F3F4F6',
                        borderColor: isSelected ? COLORS.kiaRed : colors.border,
                      },
                      isWide && { width: '48.5%' },
                    ]}
                  >
                    <Building size={16} color={isSelected ? COLORS.kiaRed : colors.textSecondary} />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.branchName,
                          { color: isSelected ? COLORS.kiaRed : colors.text, fontWeight: '700' },
                        ]}
                      >
                        {b.name[language]}
                      </Text>
                      <Text style={[styles.branchAddr, { color: colors.textSecondary }]}>
                        {b.address[language]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Step 3: Date & Time */}
            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 20 }]}>
              3. Qulay sana va vaqt
            </Text>
            <View style={[styles.dateTimeRow, isWide && styles.dateTimeRowWide]}>
              <CustomInput
                label="Qulay sana (YYYY-MM-DD)"
                value={preferredDate}
                onChangeText={setPreferredDate}
                placeholder="2026-11-06"
                containerStyle={{ flex: 1 }}
              />
              <CustomInput
                label="Qulay vaqt"
                value={preferredTime}
                onChangeText={setPreferredTime}
                placeholder="14:00"
                containerStyle={{ flex: 1 }}
              />
            </View>

            {/* Step 4: Contact Info */}
            <Text style={[styles.stepTitle, { color: colors.text, marginTop: 16 }]}>
              4. Aloqa ma’lumotlaringiz
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
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              icon={<Phone size={18} color={colors.textMuted} />}
            />

            <CustomInput
              label="Haydovchilik guvohnomasi seriyasi va raqami"
              placeholder="AA 1234567"
              value={driverLicense}
              onChangeText={setDriverLicense}
              icon={<FileCheck size={18} color={colors.textMuted} />}
            />

            <CustomInput
              label={t('formNotes')}
              placeholder="Qo‘shimcha istaklaringiz..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={2}
            />

            <CustomButton
              title="Test-drayvga yozilishni tasdiqlash"
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
  modelScroll: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  modelPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    marginRight: 8,
  },
  modelPillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  branchGrid: {
    gap: 10,
    marginBottom: 12,
  },
  branchGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  branchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
  },
  branchName: {
    fontSize: 13,
  },
  branchAddr: {
    fontSize: 11,
    marginTop: 2,
  },
  dateTimeRow: {
    gap: 12,
  },
  dateTimeRowWide: {
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
