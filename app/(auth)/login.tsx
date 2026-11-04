// Login Screen for KIA AUTO CENTER
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
import { Mail, Lock, ShieldCheck, User, ArrowLeft } from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { COLORS, RADIUS } from '../../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Iltimos, elektron pochta va parolni kiriting');
      return;
    }
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.replace('/(tabs)/profile');
    } else {
      setError(res.error || 'Kirishda xatolik yuz berdi');
    }
  };

  const handleDemo = async (role: any) => {
    await loginAsDemo(role);
    router.replace('/(tabs)/profile');
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
          {/* Logo badge */}
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoKia}>KIA</Text>
            </View>
            <Text style={[styles.brandText, { color: colors.text }]}>AUTO CENTER</Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>{t('navLogin')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Shaxsiy kabinetingizga xush kelibsiz
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <CustomInput
            label="Elektron pochta"
            placeholder="admin@kia-autocenter.uz"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            icon={<Mail size={18} color={colors.textMuted} />}
          />

          <CustomInput
            label="Parol"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            icon={<Lock size={18} color={colors.textMuted} />}
          />

          <CustomButton
            title={t('navLogin')}
            onPress={handleLogin}
            loading={loading}
            variant="primary"
            size="lg"
            style={{ marginTop: 8 }}
          />

          <View style={styles.registerRow}>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
              Hisobingiz yo‘qmi?
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
              <Text style={styles.registerLink}>{t('navRegister')}</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Demo Access Bar */}
          <View style={styles.demoSection}>
            <Text style={[styles.demoTitle, { color: colors.textSecondary }]}>
              Tezkor kirish (Sinov profillari):
            </Text>
            <View style={styles.demoButtons}>
              <TouchableOpacity
                onPress={() => handleDemo('super_admin')}
                style={[styles.demoBtn, { backgroundColor: '#B91C1C' }]}
              >
                <ShieldCheck size={14} color="#FFFFFF" />
                <Text style={styles.demoBtnText}>Super Admin (Nasriddinova Dilfuza)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDemo('sales_consultant')}
                style={[styles.demoBtn, { backgroundColor: '#1E40AF' }]}
              >
                <User size={14} color="#FFFFFF" />
                <Text style={styles.demoBtnText}>Sotuvchi (Alisher)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDemo('customer')}
                style={[styles.demoBtn, { backgroundColor: isDark ? '#333' : '#E5E7EB' }]}
              >
                <User size={14} color={isDark ? '#FFF' : '#111'} />
                <Text style={[styles.demoBtnText, { color: isDark ? '#FFF' : '#111' }]}>
                  Mijoz (Dilshod)
                </Text>
              </TouchableOpacity>
            </View>
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
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
  },
  registerLink: {
    color: COLORS.kiaRed,
    fontWeight: '700',
    fontSize: 13,
  },
  demoSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.15)',
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  demoButtons: {
    gap: 8,
    width: '100%',
  },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    gap: 8,
  },
  demoBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
