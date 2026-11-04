// Dealership Contacts & Feedback Screen
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
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { KIA_BRANCHES, Branch } from '../constants/branches';
import { mockStore } from '../lib/mockStore';
import { COLORS, RADIUS } from '../constants/theme';

export default function ContactScreen() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { t, language } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const isWide = width >= 900;

  const handleSubmit = async () => {
    if (!fullName.trim() || phone.trim().length < 9) {
      setError('Iltimos, ismingiz va telefon raqamingizni kiriting');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await mockStore.createLead({
        customerName: fullName,
        phone,
        email,
        source: 'contact_feedback_form',
        leadType: 'general_inquiry',
        status: 'new',
        notes: message,
      });

      setIsSuccess(true);
    } catch {
      setError('Xabarni yuborishda xatolik yuz berdi.');
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
            {t('navContact')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Rasmiy dilerlik markazlarimiz manzillari va bog‘lanish ma’lumotlari
          </Text>
        </View>

        <View style={[styles.mainGrid, isWide && styles.mainGridWide]}>
          {/* Left Column: Branches list */}
          <View style={[styles.branchesCol, isWide && { width: '50%' }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t('sectionBranchesTitle')}
            </Text>

            <View style={styles.branchesList}>
              {KIA_BRANCHES.map((b: Branch) => (
                <View
                  key={b.id}
                  style={[
                    styles.branchCard,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                >
                  <Text style={[styles.branchName, { color: colors.text }]}>
                    {b.name[language]}
                  </Text>

                  <View style={styles.infoRow}>
                    <MapPin size={16} color={COLORS.kiaRed} />
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                      {b.address[language]}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Phone size={16} color={COLORS.kiaRed} />
                    <Text style={[styles.infoText, { color: colors.textSecondary, fontWeight: '700' }]}>
                      {b.phone}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Mail size={16} color={COLORS.kiaRed} />
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                      {b.email}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Clock size={16} color={COLORS.kiaRed} />
                    <Text style={[styles.infoText, { color: colors.textMuted }]}>
                      {b.workingHours[language]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column: Feedback form */}
          <View style={[styles.formCol, isWide && { width: '46%' }]}>
            <View
              style={[
                styles.feedbackCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Bizga xabar qoldiring
              </Text>
              <Text style={[styles.formDesc, { color: colors.textSecondary }]}>
                Savol yoki taklifingiz bo‘lsa, mutaxassislarimiz javob berishga tayyor
              </Text>

              {isSuccess ? (
                <View style={styles.successBox}>
                  <CheckCircle2 size={54} color={COLORS.success} />
                  <Text style={[styles.successTitle, { color: colors.text }]}>
                    Xabaringiz yuborildi!
                  </Text>
                  <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
                    Tez orada Call-Center mutaxassisimiz siz bilan bog‘lanadi.
                  </Text>
                  <CustomButton
                    title="Yana xabar yuborish"
                    onPress={() => {
                      setIsSuccess(false);
                      setMessage('');
                    }}
                    variant="outline"
                    size="sm"
                    style={{ marginTop: 20 }}
                  />
                </View>
              ) : (
                <View>
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}

                  <CustomInput
                    label={t('formFullName')}
                    placeholder="Ismingiz va familiyangiz"
                    value={fullName}
                    onChangeText={setFullName}
                  />

                  <CustomInput
                    label={t('formPhone')}
                    placeholder="+998 90 123 45 67"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />

                  <CustomInput
                    label={t('formEmail')}
                    placeholder="example@mail.uz"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />

                  <CustomInput
                    label="Xabaringiz matni"
                    placeholder="Qanday yordam bera olamiz?..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={4}
                  />

                  <CustomButton
                    title="Xabarni yuborish"
                    onPress={handleSubmit}
                    loading={loading}
                    variant="primary"
                    size="lg"
                    style={{ marginTop: 16 }}
                    iconRight={<Send size={16} color="#FFFFFF" />}
                  />
                </View>
              )}
            </View>
          </View>
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
    marginBottom: 32,
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
  mainGrid: {
    gap: 32,
  },
  mainGridWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  branchesCol: {},
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  branchesList: {
    gap: 16,
    marginTop: 16,
  },
  branchCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
    gap: 10,
  },
  branchName: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 13,
    flex: 1,
  },
  formCol: {},
  feedbackCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 28,
  },
  formDesc: {
    fontSize: 13,
    marginBottom: 20,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    marginBottom: 12,
    fontWeight: '600',
  },
  successBox: {
    paddingVertical: 36,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 14,
  },
  successDesc: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
