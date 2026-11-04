// Registration Screen for KIA AUTO CENTER
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
import { User, Mail, Phone, Lock, ArrowLeft } from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { COLORS, RADIUS } from '../../constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [password, setPassword] = useState('');
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
      router.replace('/(tabs)/profile');
    } else {
      setError(res.error || 'Ro‘yxatdan o‘tishda xatolik');
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
            placeholder="name@example.uz"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            icon={<Mail size={18} color={colors.textMuted} />}
          />

          <CustomInput
            label="Parol yarating"
            placeholder="Kamida 6 belgi"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            icon={<Lock size={18} color={colors.textMuted} />}
          />

          <CustomButton
            title={t('navRegister')}
            onPress={handleRegister}
            loading={loading}
            variant="primary"
            size="lg"
            style={{ marginTop: 8 }}
          />

          <View style={styles.loginRow}>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
              Hisobingiz bormi?
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login' as any)}>
              <Text style={styles.loginLink}>{t('navLogin')}</Text>
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
    padding: 20,
  },
  boxWrapper: {
    maxWidth: 480,
    width: '100%',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  backText: {
    fontSize: 13,
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
    gap: 8,
    marginBottom: 16,
  },
  logoBadge: {
    backgroundColor: '#000',
    borderWidth: 1.5,
    borderColor: COLORS.kiaRed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  logoKia: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 2,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    marginBottom: 12,
    fontWeight: '600',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
  },
  loginLink: {
    color: COLORS.kiaRed,
    fontWeight: '700',
    fontSize: 13,
  },
});
