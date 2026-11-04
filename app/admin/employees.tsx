// Admin Employees & Role-Based Access Control (RBAC) System
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {
  UserCheck,
  ShieldCheck,
  Plus,
  Edit2,
  UserX,
  Mail,
  Phone,
  Briefcase,
  X,
  CheckCircle,
} from 'lucide-react-native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { mockStore } from '../../lib/mockStore';
import { AdminEmployee, UserRole } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminEmployeesScreen() {
  const { colors, isDark } = useTheme();

  const [employees, setEmployees] = useState<AdminEmployee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<AdminEmployee | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [department, setDepartment] = useState('Sotuv Departamenti');
  const [role, setRole] = useState<UserRole>('sales_manager');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const list = await mockStore.getEmployees();
    setEmployees(list);
  };

  const handleOpenAdd = () => {
    setSelectedEmp(null);
    setFullName('');
    setEmail('');
    setPhone('+998 ');
    setDepartment('Sotuv Departamenti');
    setRole('sales_manager');
    setModalOpen(true);
  };

  const handleOpenEdit = (emp: AdminEmployee) => {
    setSelectedEmp(emp);
    setFullName(emp.fullName);
    setEmail(emp.email);
    setPhone(emp.phone);
    setDepartment(emp.department);
    setRole(emp.role);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!fullName.trim() || !email.trim()) return;

    if (selectedEmp) {
      await mockStore.updateEmployee(selectedEmp.id, {
        fullName,
        email,
        phone,
        department,
        role,
      });
    } else {
      await mockStore.addEmployee({
        fullName,
        email,
        phone,
        department,
        role,
        isActive: true,
      });
    }

    await loadEmployees();
    setModalOpen(false);
  };

  const handleToggleActive = async (emp: AdminEmployee) => {
    await mockStore.updateEmployee(emp.id, { isActive: !emp.isActive });
    await loadEmployees();
  };

  const availableRoles: { id: UserRole; label: string; desc: string; color: string }[] = [
    {
      id: 'super_admin',
      label: 'SUPER ADMIN',
      desc: 'Barcha tizim funksiyalariga 100% cheklovsiz vakolat',
      color: '#B91C1C',
    },
    {
      id: 'admin',
      label: 'ADMIN',
      desc: 'Avtomobillar, mijozlar, arizalar va filiallar boshqaruvi',
      color: '#EA580C',
    },
    {
      id: 'sales_manager',
      label: 'SALES MANAGER',
      desc: 'Sotuv bitimlari, kredit shartnomalari va CRM bilan ishlash',
      color: '#2563EB',
    },
    {
      id: 'service_manager',
      label: 'SERVICE MANAGER',
      desc: 'Ustaxona navbatlari, TO xizmatlari va ehtiyot qismlar nazorati',
      color: '#059669',
    },
    {
      id: 'consultant',
      label: 'CONSULTANT',
      desc: 'Mijozlarga konsultatsiya berish va qayta qo‘ng‘iroqlar',
      color: '#7C3AED',
    },
    {
      id: 'report_viewer',
      label: 'REPORT VIEWER',
      desc: 'Faqat statistik hisobotlar va tushum dinamikasini ko‘rish',
      color: '#4B5563',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            Xodimlar va Ruxsatlar Tizimi (RBAC)
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Rasmiy dilerlik markazining barcha xodimlari va ularning tizim ruxsatlari
          </Text>
        </View>

        <CustomButton
          title="Yangi Xodim Biriktirish"
          onPress={handleOpenAdd}
          variant="primary"
          size="md"
          icon={<Plus size={16} color="#FFFFFF" />}
        />
      </View>

      {/* Role explanation cards */}
      <View style={styles.rolesRow}>
        {availableRoles.slice(0, 3).map((r) => (
          <View
            key={r.id}
            style={[
              styles.roleMiniCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={[styles.roleBadge, { backgroundColor: r.color }]}>
              <Text style={styles.roleBadgeText}>{r.label}</Text>
            </View>
            <Text style={[styles.roleDescText, { color: colors.textSecondary }]}>
              {r.desc}
            </Text>
          </View>
        ))}
      </View>

      {/* Employee List */}
      <View style={styles.list}>
        {employees.map((emp) => {
          const roleConfig = availableRoles.find((r) => r.id === emp.role) || availableRoles[1];
          return (
            <View
              key={emp.id}
              style={[
                styles.empCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.empHeader}>
                <View style={[styles.avatarWrap, { backgroundColor: roleConfig.color }]}>
                  <Text style={styles.avatarText}>{emp.fullName.charAt(0).toUpperCase()}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={[styles.empName, { color: colors.text }]}>
                      {emp.fullName}
                    </Text>
                    <View style={[styles.rolePill, { backgroundColor: roleConfig.color }]}>
                      <Text style={styles.rolePillText}>{roleConfig.label}</Text>
                    </View>
                  </View>

                  <Text style={[styles.deptText, { color: colors.textSecondary }]}>
                    {emp.department}
                  </Text>
                </View>

                <View style={styles.statusCol}>
                  <View
                    style={[
                      styles.activeTag,
                      { backgroundColor: emp.isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.activeTagText,
                        { color: emp.isActive ? '#10B981' : '#EF4444' },
                      ]}
                    >
                      {emp.isActive ? 'FAOL' : 'FAOLSIZ'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.contactRow}>
                <View style={styles.contactItem}>
                  <Mail size={13} color={colors.textSecondary} />
                  <Text style={[styles.contactText, { color: colors.textSecondary }]}>
                    {emp.email}
                  </Text>
                </View>

                <View style={styles.contactItem}>
                  <Phone size={13} color={colors.textSecondary} />
                  <Text style={[styles.contactText, { color: colors.textSecondary }]}>
                    {emp.phone}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  onPress={() => handleOpenEdit(emp)}
                  style={[styles.btnAction, { backgroundColor: isDark ? '#222' : '#F3F4F6' }]}
                >
                  <Edit2 size={13} color={colors.text} />
                  <Text style={[styles.btnActionText, { color: colors.text }]}>
                    Rolni O‘zgartirish
                  </Text>
                </TouchableOpacity>

                {emp.role !== 'super_admin' && (
                  <TouchableOpacity
                    onPress={() => handleToggleActive(emp)}
                    style={[
                      styles.btnAction,
                      {
                        backgroundColor: emp.isActive
                          ? 'rgba(239, 68, 68, 0.1)'
                          : 'rgba(16, 185, 129, 0.1)',
                      },
                    ]}
                  >
                    {emp.isActive ? (
                      <>
                        <UserX size={13} color="#EF4444" />
                        <Text style={[styles.btnActionText, { color: '#EF4444' }]}>
                          Faolsizlantirish
                        </Text>
                      </>
                    ) : (
                      <>
                        <UserCheck size={13} color="#10B981" />
                        <Text style={[styles.btnActionText, { color: '#10B981' }]}>
                          Faollashtirish
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>

      {/* Modal */}
      <Modal visible={modalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  {selectedEmp ? 'Xodim Vakolatlarini Tahrirlash' : 'Yangi Xodim Qo‘shish'}
                </Text>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <X size={20} color={colors.text} />
                </TouchableOpacity>
              </View>

              <CustomInput
                label="F.I.SH."
                placeholder="Alisher Shodiyev"
                value={fullName}
                onChangeText={setFullName}
              />

              <CustomInput
                label="Xizmat Elektron Pochtasi"
                placeholder="sales@kia-autocenter.uz"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <CustomInput
                label="Telefon Raqami"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <CustomInput
                label="Departament / Bo‘lim"
                placeholder="Sotuv Departamenti"
                value={department}
                onChangeText={setDepartment}
              />

              {/* Roles selection */}
              <Text style={[styles.fieldLabel, { color: colors.text }]}>Tizim Rolini Belgilang:</Text>
              <View style={styles.rolesGrid}>
                {availableRoles.map((r) => (
                  <TouchableOpacity
                    key={r.id}
                    onPress={() => setRole(r.id)}
                    style={[
                      styles.roleSelectBtn,
                      role === r.id && { backgroundColor: r.color, borderColor: r.color },
                    ]}
                  >
                    <Text
                      style={[
                        styles.roleSelectTitle,
                        { color: role === r.id ? '#FFF' : colors.text },
                      ]}
                    >
                      {r.label}
                    </Text>
                    <Text
                      style={[
                        styles.roleSelectDesc,
                        { color: role === r.id ? '#EEE' : colors.textSecondary },
                      ]}
                    >
                      {r.desc}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalActions}>
                <CustomButton title="Bekor qilish" onPress={() => setModalOpen(false)} variant="outline" size="md" />
                <CustomButton title="Saqlash" onPress={handleSave} variant="primary" size="md" />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  rolesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 24,
  },
  roleMiniCard: {
    flex: 1,
    minWidth: 240,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
  },
  roleBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  roleDescText: {
    fontSize: 11,
    lineHeight: 16,
  },
  list: {
    gap: 16,
  },
  empCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 20,
  },
  empHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  empName: {
    fontSize: 16,
    fontWeight: '800',
  },
  rolePill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  rolePillText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
  },
  deptText: {
    fontSize: 12,
  },
  statusCol: {
    marginLeft: 'auto',
  },
  activeTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  activeTagText: {
    fontSize: 10,
    fontWeight: '800',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
    flexWrap: 'wrap',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactText: {
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.1)',
  },
  btnAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  btnActionText: {
    fontSize: 11,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalCard: {
    maxWidth: 540,
    width: '100%',
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 8,
  },
  rolesGrid: {
    gap: 8,
    marginBottom: 20,
  },
  roleSelectBtn: {
    padding: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(150,150,150,0.2)',
  },
  roleSelectTitle: {
    fontSize: 12,
    fontWeight: '800',
  },
  roleSelectDesc: {
    fontSize: 10,
    marginTop: 2,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
});

