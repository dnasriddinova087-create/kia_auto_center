// Customer Login Screen for KIA AUTO CENTER
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
import { Mail, Lock, ShieldCheck, User, ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { COLORS, RADIUS } from '../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      router.replace('/profile');
    } else {
      setError(res.error || 'Kirishda xatolik yuz berdi');
    }
  };

  const handleDemo = async (role: any) => {
    await loginAsDemo(role);
    router.replace('/profile');
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
            placeholder="customer@kia-autocenter.uz"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            icon={<Mail size={18} color={colors.textMuted} />}
          />

          <View style={{ position: 'relative' }}>
            <CustomInput
              label="Parol"
              placeholder="••••••••"
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
            title={t('navLogin')}
            onPress={handleLogin}
            loading={loading}
            variant="primary"
            size="lg"
            style={{ marginTop: 8 }}
          />

          <View style={styles.footerRow}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Hali hisobingiz yo‘qmi?
            </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.linkText}> {t('navRegister')}</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Demo Login */}
          <View style={styles.dividerRow}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textMuted }]}>
              YOKI TEZKOR KIRISH
            </Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.demoGroup}>
            <TouchableOpacity
              onPress={() => handleDemo('customer')}
              style={[styles.demoBtn, { backgroundColor: isDark ? '#222' : '#F3F4F6' }]}
            >
              <User size={15} color={colors.text} />
              <Text style={[styles.demoBtnLabel, { color: colors.text }]}>
                Mijoz profili (Dilshod)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Staff Login Link */}
          <TouchableOpacity
            onPress={() => router.push('/admin/login')}
            style={styles.adminPortalLink}
          >
            <ShieldCheck size={16} color={COLORS.kiaRed} />
            <Text style={styles.adminPortalText}>
              Administrator va Xodimlar Portali →
            </Text>
          </TouchableOpacity>
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
  },
  demoGroup: {
    gap: 8,
  },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
  },
  demoBtnLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  adminPortalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.15)',
  },
  adminPortalText: {
    color: COLORS.kiaRed,
    fontSize: 13,
    fontWeight: '700',
  },
});
