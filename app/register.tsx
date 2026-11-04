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
import { User, Mail, Phone, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError('Iltimos, barcha maydonlarni to‘ldiring');
      return;
    }
    setError('');
    setLoading(true);

    const res = await register(fullName, email, phone, password);
    setLoading(false);

    if (res.success) {
      router.replace('/profile');
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
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoKia}>KIA</Text>
            </View>
            <Text style={[styles.brandText, { color: colors.text }]}>AUTO CENTER</Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>{t('navRegister')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Rasmiy dilerlik platformasiga a’zo bo‘ling
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <CustomInput
            label={t('formFullName')}
            placeholder="Alisher Navoiy"
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
            label="Elektron pochta"
            placeholder="mijoz@example.uz"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            icon={<Mail size={18} color={colors.textMuted} />}
          />

          <View style={{ position: 'relative' }}>
            <CustomInput
              label="Parol yarating"
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
            title={t('navRegister')}
            onPress={handleRegister}
            loading={loading}
            variant="primary"
            size="lg"
            style={{ marginTop: 12 }}
          />

          <View style={styles.footerRow}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Allaqachon hisobingiz bormi?
            </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.linkText}> {t('navLogin')}</Text>
            </TouchableOpacity>
          </View>
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
    width: '100%',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  logoBadge: {
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  logoKia: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    marginBottom: 14,
    fontWeight: '600',
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    top: 38,
    padding: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
  },
  linkText: {
    color: COLORS.kiaRed,
    fontSize: 13,
    fontWeight: '700',
  },
});

