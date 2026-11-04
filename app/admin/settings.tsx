// Admin Site Settings Screen
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Settings, Save, CheckCircle2 } from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockStore, DEFAULT_SETTINGS } from '../../lib/mockStore';
import { SiteSettings } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminSettingsScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [dealershipName, setDealershipName] = useState('');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressMain, setAddressMain] = useState('');
  const [interestRate, setInterestRate] = useState('18.5');
  const [minDownPayment, setMinDownPayment] = useState('20');
  const [usdRate, setUsdRate] = useState('12900');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    mockStore.getSettings().then((s) => {
      setSettings(s);
      setDealershipName(s.dealershipName);
      setOwner(s.owner);
      setPhone(s.phone);
      setEmergencyPhone(s.emergencyPhone);
      setEmail(s.email);
      setAddressMain(s.addressMain);
      setInterestRate(String(s.defaultLoanInterestRate));
      setMinDownPayment(String(s.defaultLoanMinDownPaymentPct));
      setUsdRate(String(s.usdToUzsRate));
    });
  }, []);

  const handleSave = async () => {
    const updated = await mockStore.updateSettings({
      dealershipName,
      owner,
      phone,
      emergencyPhone,
      email,
      addressMain,
      defaultLoanInterestRate: Number(interestRate) || 18.5,
      defaultLoanMinDownPaymentPct: Number(minDownPayment) || 20,
      usdToUzsRate: Number(usdRate) || 12900,
    });
    setSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('adminSettings')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Dilerlik markazi rekvizitlari, loyiha egasi va moliyaviy parametrlar
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {savedSuccess && (
            <View style={styles.successBanner}>
              <CheckCircle2 size={18} color="#065F46" />
              <Text style={styles.successText}>Sozlamalar muvaffaqiyatli saqlandi!</Text>
            </View>
          )}

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Loyiha va Rekvizitlar
          </Text>

          <CustomInput
            label="Loyiha egasi (Owner)"
            value={owner}
            onChangeText={setOwner}
          />

          <CustomInput
            label="Dilerlik nomi"
            value={dealershipName}
            onChangeText={setDealershipName}
          />

          <CustomInput
            label="Asosiy aloqa telefoni"
            value={phone}
            onChangeText={setPhone}
          />

          <CustomInput
            label="Tezkor navbatchi telefon (Emergency)"
            value={emergencyPhone}
            onChangeText={setEmergencyPhone}
          />

          <CustomInput
            label="Elektron pochta"
            value={email}
            onChangeText={setEmail}
          />

          <CustomInput
            label="Bosh ofis manzili"
            value={addressMain}
            onChangeText={setAddressMain}
          />

          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
            Moliyaviy va Kredit ko‘rsatkichlari
          </Text>

          <CustomInput
            label="Standart yillik avtokredit stavkasi (%)"
            value={interestRate}
            onChangeText={setInterestRate}
            keyboardType="numeric"
          />

          <CustomInput
            label="Minimal boshlang‘ich to‘lov (%)"
            value={minDownPayment}
            onChangeText={setMinDownPayment}
            keyboardType="numeric"
          />

          <CustomInput
            label="AQSH dollari kursi (1 USD = ... UZS)"
            value={usdRate}
            onChangeText={setUsdRate}
            keyboardType="numeric"
          />

          <CustomButton
            title={t('saveChanges')}
            onPress={handleSave}
            variant="primary"
            size="lg"
            style={{ marginTop: 24 }}
            icon={<Save size={18} color="#FFFFFF" />}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    maxWidth: 720,
    width: '100%',
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: RADIUS.md,
    gap: 8,
    marginBottom: 20,
  },
  successText: {
    color: '#065F46',
    fontSize: 13,
    fontWeight: '700',
  },
});
