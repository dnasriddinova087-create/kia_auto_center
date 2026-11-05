// Customer Registration Screen for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, Phone, Lock, ArrowLeft, Eye, EyeOff, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react-native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { COLORS, RADIUS } from '../constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim() || !phone.trim() || !password.trim()) {
      setError('Iltimos, ism, telefon raqami va parolni to‘ldiring');
      return;
    }

    if (password.trim().length < 6) {
      setError('Xavfsizlik paroli kamida 6 ta belgidan iborat bo‘lishi lozim');
      return;
    }

    setError('');
    setLoading(true);

    const res = await register(fullName, phone, password);
    setLoading(false);

    if (res.success) {
      setIsSuccess(true);
      // Auto-redirect to cabinet after 2.5 seconds
      setTimeout(() => {
        router.replace('/profile');
      }, 2500);
    } else {
      setError(res.error || 'Ro‘yxatdan o‘tishda xatolik yuz berdi');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.boxWrapper}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={18} color={colors.textSecondary} />
          <Text style={[styles.backText, { color: colors.textSecondary }]}>Orqaga</Text>
        </TouchableOpacity>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {/* Logo */}
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoKia}>KIA</Text>
            </View>
            <Text style={[styles.brandText, { color: colors.text }]}>AUTO CENTER</Text>
          </View>

          {isSuccess ? (
            /* Thank you & Success View */
            <View style={styles.successContainer}>
              <View style={styles.successIconBadge}>
                <CheckCircle2 size={44} color="#FFFFFF" />
              </View>

              <Text style={[styles.successTitle, { color: colors.text }]}>
                Rahmat, {fullName}!
              </Text>

              <View style={styles.vipBadge}>
                <Sparkles size={14} color={COLORS.kiaRed} />
                <Text style={styles.vipBadgeText}>RASMIY MIJOZ MAQOMI FAOL</Text>
              </View>

              <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
                KIA AUTO CENTER oilasiga xush kelibsiz! Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz.
                Barcha imtiyozlar, test-drayv buyurtmalari va maxsus narxlar siz uchun faollashtirildi.
              </Text>

              <Text style={[styles.redirectNotice, { color: colors.textMuted }]}>
                Shaxsiy kabinetingizga yo‘naltirilmoqda...
              </Text>

              <CustomButton
                title="Shaxsiy Kabinetga O‘tish"
                onPress={() => router.replace('/profile')}
                variant="primary"
                size="lg"
                style={{ width: '100%', marginTop: 12 }}
                iconRight={<ArrowRight size={18} color="#FFFFFF" />}
              />
            </View>
          ) : (
            /* Registration Form */
            <>
              <Text style={[styles.title, { color: colors.text }]}>Ro‘yxatdan O‘tish</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Faqat ism va telefon raqamingiz orqali rasmiy dilerlik platformasiga a’zo bo‘ling
              </Text>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <CustomInput
                label="Ism va Familiyangiz"
                placeholder="Alisher Shodiyev"
                value={fullName}
                onChangeText={setFullName}
                icon={<User size={18} color={colors.textMuted} />}
              />

              <CustomInput
                label="Telefon Raqamingiz"
                placeholder="+998 90 123 45 67"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                icon={<Phone size={18} color={colors.textMuted} />}
              />

              <View style={{ position: 'relative' }}>
                <CustomInput
                  label="Parol Yarating"
                  placeholder="Kamida 6 ta belgi"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  icon={<Lock size={18} color={colors.textMuted} />}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? (
                    <EyeOff size={18} color={colors.textSecondary} />
                  ) : (
                    <Eye size={18} color={colors.textSecondary} />
                  )}
                </TouchableOpacity>
              </View>

              <CustomButton
                title="Ro‘yxatdan O‘tish"
                onPress={handleRegister}
                loading={loading}
                variant="primary"
                size="lg"
                style={{ marginTop: 14 }}
              />

              <View style={styles.footerRow}>
                <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                  Allaqachon hisobingiz bormi?
                </Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={styles.linkText}> Kirish</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 36,
  },
  boxWrapper: {
    maxWidth: 440,
    width: '100%',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 32,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },
  logoBadge: {
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  logoKia: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 2,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 10,
    borderRadius: RADIUS.md,
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    bottom: 24,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
  },
  linkText: {
    color: COLORS.kiaRed,
    fontWeight: '700',
    fontSize: 13,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  successIconBadge: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.full,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(200, 16, 46, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    marginBottom: 14,
  },
  vipBadgeText: {
    color: COLORS.kiaRed,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  successDesc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 340,
    marginBottom: 14,
  },
  redirectNotice: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },
});
