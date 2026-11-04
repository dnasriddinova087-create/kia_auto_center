// Dedicated Security Admin Login Portal for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  ArrowLeft,
  KeyRound,
  AlertTriangle,
  UserCheck,
} from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminLoginScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleAdminLogin = async (overrideEmail?: string, overridePass?: string) => {
    const inputEmail = overrideEmail || email;
    const inputPass = overridePass || password;

    if (!inputEmail.trim() || !inputPass.trim()) {
      setError('Iltimos, administrator pochtasi va xavfsizlik parolini kiriting');
      return;
    }
    setError('');
    setLoading(true);

    const res = await login(inputEmail, inputPass);
    setLoading(false);

    if (res.success) {
      router.replace('/admin/dashboard');
    } else {
      setError(res.error || 'Autentifikatsiyada xatolik yuz berdi');
    }
  };

  const handleQuickBootstrap = async (role: any) => {
    await loginAsDemo(role);
    router.replace('/admin/dashboard');
  };

  const handleForgotPassword = () => {
    if (!forgotEmail) {
      setError('Iltimos, pochtangizni kiriting');
      return;
    }
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotModalOpen(false);
      setForgotSuccess(false);
    }, 2500);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: '#0A0A0A' }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.boxWrapper}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backBtn}>
          <ArrowLeft size={16} color="#888888" />
          <Text style={styles.backText}>Asosiy saytga qaytish</Text>
        </TouchableOpacity>

        <View style={styles.portalCard}>
          {/* Executive Shield Header */}
          <View style={styles.portalHeader}>
            <View style={styles.shieldIconWrap}>
              <ShieldCheck size={36} color={COLORS.kiaRed} />
            </View>
            <View style={styles.brandRow}>
              <View style={styles.badgeKia}>
                <Text style={styles.badgeKiaText}>KIA</Text>
              </View>
              <Text style={styles.portalTitle}>BOSHQARUV PORTALI</Text>
            </View>
            <Text style={styles.ownerText}>
              Loyiha egasi: Nasriddinova Dilfuza
            </Text>
            <Text style={styles.securityNotice}>
              Faqat rasmiy dilerlik boshqaruv xodimlari uchun yopiq tizim
            </Text>
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <AlertTriangle size={16} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Form Fields */}
          <CustomInput
            label="Administrator Email yoki Login"
            placeholder="admin@kia-autocenter.uz"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            icon={<Mail size={18} color="#888" />}
            style={{ backgroundColor: '#141414', borderColor: '#2A2A2A' }}
            inputStyle={{ color: '#FFFFFF' }}
          />

          <View style={{ position: 'relative' }}>
            <CustomInput
              label="Xavfsizlik Paroli"
              placeholder="••••••••••••"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              icon={<Lock size={18} color="#888" />}
              style={{ backgroundColor: '#141414', borderColor: '#2A2A2A' }}
              inputStyle={{ color: '#FFFFFF' }}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              {showPassword ? (
                <EyeOff size={18} color="#888" />
              ) : (
                <Eye size={18} color="#888" />
              )}
            </TouchableOpacity>
          </View>

          {/* Remember Me & Forgot Password Row */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              style={styles.rememberBtn}
            >
              {rememberMe ? (
                <CheckSquare size={16} color={COLORS.kiaRed} />
              ) : (
                <Square size={16} color="#666" />
              )}
              <Text style={styles.rememberText}>Meni eslab qolish</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setForgotModalOpen(true)}>
              <Text style={styles.forgotText}>Parolni unutdingizmi?</Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Tizimga Xavfsiz Kirish"
            onPress={() => handleAdminLogin()}
            loading={loading}
            variant="primary"
            size="lg"
            icon={<KeyRound size={18} color="#FFFFFF" />}
            style={{ marginTop: 8 }}
          />

          {/* Secure Bootstrap Fast Access for Testing */}
          <View style={styles.bootstrapSection}>
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerLabel}>XAVFSIZ BOOTSTRAP KIRISH</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              onPress={() => handleQuickBootstrap('super_admin')}
              style={[styles.quickRoleBtn, { borderColor: '#B91C1C' }]}
            >
              <ShieldCheck size={16} color="#B91C1C" />
              <View style={{ flex: 1 }}>
                <Text style={styles.quickRoleTitle}>Super Admin (Nasriddinova Dilfuza)</Text>
                <Text style={styles.quickRoleSub}>admin@kia-autocenter.uz • To‘liq vakolat</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleQuickBootstrap('sales_manager')}
              style={[styles.quickRoleBtn, { borderColor: '#2563EB' }]}
            >
              <UserCheck size={16} color="#2563EB" />
              <View style={{ flex: 1 }}>
                <Text style={styles.quickRoleTitle}>Sotuv Menejeri (Alisher Shodiyev)</Text>
                <Text style={styles.quickRoleSub}>sales@kia-autocenter.uz • CRM va shartnomalar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleQuickBootstrap('service_manager')}
              style={[styles.quickRoleBtn, { borderColor: '#10B981' }]}
            >
              <UserCheck size={16} color="#10B981" />
              <View style={{ flex: 1 }}>
                <Text style={styles.quickRoleTitle}>Servis Boshqaruvchisi (Bobur Rustamov)</Text>
                <Text style={styles.quickRoleSub}>service@kia-autocenter.uz • TO va ustaxonalar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Forgot Password Modal */}
      <Modal visible={forgotModalOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Parolni Tiklash</Text>
            <Text style={styles.modalDesc}>
              Tizimda ro‘yxatga olingan administrator emailingizni kiriting. Xavfsiz tiklash kodi yuboriladi.
            </Text>

            {forgotSuccess ? (
              <View style={styles.successBox}>
                <Text style={styles.successText}>
                  Tiklash havolasi emailingizga yuborildi!
                </Text>
              </View>
            ) : (
              <>
                <CustomInput
                  label="Email"
                  placeholder="admin@kia-autocenter.uz"
                  value={forgotEmail}
                  onChangeText={setForgotEmail}
                  style={{ backgroundColor: '#141414', borderColor: '#333' }}
                  inputStyle={{ color: '#FFF' }}
                />

                <View style={styles.modalActions}>
                  <CustomButton
                    title="Bekor qilish"
                    onPress={() => setForgotModalOpen(false)}
                    variant="outline"
                    size="md"
                  />
                  <CustomButton
                    title="Kodni yuborish"
                    onPress={handleForgotPassword}
                    variant="primary"
                    size="md"
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#888888',
    fontSize: 13,
    fontWeight: '600',
  },
  portalCard: {
    backgroundColor: '#111111',
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: '#222222',
    padding: 32,
    width: '100%',
  },
  portalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  shieldIconWrap: {
    width: 68,
    height: 68,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(200, 16, 46, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(200, 16, 46, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  badgeKia: {
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  badgeKiaText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  portalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  ownerText: {
    color: COLORS.kiaRed,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  securityNotice: {
    color: '#666666',
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    top: 38,
    padding: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  rememberBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rememberText: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  forgotText: {
    color: COLORS.kiaRed,
    fontSize: 12,
    fontWeight: '600',
  },
  bootstrapSection: {
    marginTop: 24,
    gap: 10,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#262626',
  },
  dividerLabel: {
    color: '#666666',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  quickRoleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    backgroundColor: '#181818',
  },
  quickRoleTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  quickRoleSub: {
    color: '#888888',
    fontSize: 10,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    maxWidth: 400,
    width: '100%',
    backgroundColor: '#161616',
    borderRadius: RADIUS.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  modalDesc: {
    color: '#888888',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
  },
  successBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: RADIUS.md,
    padding: 16,
  },
  successText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});

