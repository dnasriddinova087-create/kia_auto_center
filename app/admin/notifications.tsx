// Admin Notification Center for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  CheckCheck,
  Calendar,
  Wrench,
  Car,
  ShoppingBag,
  AlertTriangle,
  Info,
  Circle,
} from 'lucide-react-native';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { mockStore } from '../../lib/mockStore';
import { AdminNotification } from '../../types';
import { COLORS, RADIUS } from '../../constants/theme';

export default function AdminNotificationsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const list = await mockStore.getNotifications();
    setNotifications(list);
  };

  const handleMarkAllRead = async () => {
    await mockStore.markAllNotificationsRead();
    await loadNotifications();
  };

  const handleItemPress = async (item: AdminNotification) => {
    await mockStore.markNotificationRead(item.id);
    await loadNotifications();
    if (item.link) {
      router.push(item.link as any);
    }
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <Car size={18} color={COLORS.kiaRed} />;
      case 'test_drive':
        return <Calendar size={18} color="#3B82F6" />;
      case 'service':
        return <Wrench size={18} color="#10B981" />;
      case 'sale':
        return <ShoppingBag size={18} color="#F59E0B" />;
      case 'stock':
        return <AlertTriangle size={18} color="#EF4444" />;
      default:
        return <Info size={18} color={COLORS.kiaRed} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Bildirishnomalar Markazi</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Barcha yangi xaridlar, test-drayvlar, servis navbatlari va tizim xabarlari
          </Text>
        </View>

        <CustomButton
          title="Barchasini O‘qilgan Deb Belgilash"
          onPress={handleMarkAllRead}
          variant="outline"
          size="md"
          icon={<CheckCheck size={16} color={colors.text} />}
        />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          onPress={() => setFilter('all')}
          style={[styles.filterBtn, filter === 'all' && { backgroundColor: COLORS.kiaRed }]}
        >
          <Text
            style={[
              styles.filterBtnText,
              { color: filter === 'all' ? '#FFF' : colors.textSecondary },
            ]}
          >
            BARCHASI ({notifications.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter('unread')}
          style={[styles.filterBtn, filter === 'unread' && { backgroundColor: COLORS.kiaRed }]}
        >
          <Text
            style={[
              styles.filterBtnText,
              { color: filter === 'unread' ? '#FFF' : colors.textSecondary },
            ]}
          >
            O‘QILMAGANLAR ({notifications.filter((n) => !n.isRead).length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <View style={styles.list}>
        {filtered.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleItemPress(item)}
            style={[
              styles.notifCard,
              {
                backgroundColor: item.isRead
                  ? colors.card
                  : isDark
                  ? '#1C1C1C'
                  : '#FEF2F2',
                borderColor: item.isRead ? colors.border : 'rgba(200, 16, 46, 0.4)',
              },
            ]}
          >
            <View style={styles.iconWrap}>{getIcon(item.type)}</View>

            <View style={{ flex: 1 }}>
              <View style={styles.titleRow}>
                <Text style={[styles.notifTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                {!item.isRead && <View style={styles.unreadDot} />}
              </View>

              <Text style={[styles.notifMsg, { color: colors.textSecondary }]}>
                {item.message}
              </Text>

              <Text style={[styles.notifTime, { color: colors.textMuted }]}>
                {new Date(item.createdAt).toLocaleTimeString('uz-UZ', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: 'numeric',
                  month: 'short',
                })}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(150,150,150,0.12)',
  },
  filterBtnText: {
    fontSize: 11,
    fontWeight: '800',
  },
  list: {
    gap: 12,
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    padding: 16,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(150,150,150,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.kiaRed,
  },
  notifMsg: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  notifTime: {
    fontSize: 11,
  },
});
