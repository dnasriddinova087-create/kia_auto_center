// Website Content, Banners & Review Moderation for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  Sliders,
  CheckCircle,
  XCircle,
  Star,
  MessageSquare,
  Image as ImageIcon,
  Plus,
} from 'lucide-react-native';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { COLORS, RADIUS } from '../../constants/theme';

interface CustomerReview {
  id: string;
  author: string;
  model: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
}

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Javlon Mirzayev',
    model: 'KIA K5 GT Line',
    rating: 5,
    comment: 'Avtomobil juda qulay va dinamik. Sergeli filialida tezkor rasmiylashtirib berishdi. 5 yillik kafolat borligi ayniqsa xotirjamlik beradi.',
    status: 'approved',
    date: '2026-03-01',
  },
  {
    id: 'rev-2',
    author: 'Nodira Salimova',
    model: 'KIA Sonet',
    rating: 5,
    comment: 'Shahar uchun eng mukammal krossover. Yoqilg‘i sarfi kam, ichi keng va qulay.',
    status: 'approved',
    date: '2026-03-10',
  },
  {
    id: 'rev-3',
    author: 'Botir Zokirov',
    model: 'KIA Sportage X-Line',
    rating: 4,
    comment: 'Mashina zo‘r, ammo oq rangdagi komplektatsiyani 1 hafta kutdik. Servis xizmati a’lo darajada.',
    status: 'pending',
    date: '2026-03-18',
  },
];

export default function AdminContentScreen() {
  const { colors, isDark } = useTheme();

  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Sayt Kontenti va Fikrlar Moderatsiyasi</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Bosh sahifa bannerlari, aksiyalar va mijozlar sharhlarini nazorat qilish
          </Text>
        </View>
      </View>

      {/* Hero Banners Management */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.cardHeader}>
          <ImageIcon size={18} color={COLORS.kiaRed} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>Bosh Sahifa Reklama Bannerlari</Text>
        </View>

        <View style={styles.bannerRow}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80' }}
            style={styles.bannerThumb}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.bannerTitle, { color: colors.text }]}>
              Yangi Avlod KIA Modellari — Rasmiy Zavod Kafolati Bilan
            </Text>
            <Text style={[styles.bannerSub, { color: colors.textSecondary }]}>
              Holati: Faol (Asosiy Hero Banner)
            </Text>
          </View>
        </View>
      </View>

      {/* Customer Reviews Moderation */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 24 }]}>
        <View style={styles.cardHeader}>
          <MessageSquare size={18} color={COLORS.kiaRed} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Mijozlar Fikrlari Moderatsiyasi ({reviews.length})
          </Text>
        </View>

        <View style={styles.reviewsList}>
          {reviews.map((rev) => (
            <View key={rev.id} style={styles.reviewItem}>
              <View style={styles.reviewTop}>
                <View>
                  <Text style={[styles.authorName, { color: colors.text }]}>{rev.author}</Text>
                  <Text style={[styles.revModel, { color: colors.textSecondary }]}>
                    {rev.model} • {rev.date}
                  </Text>
                </View>

                <View style={styles.starsRow}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} color="#FBBF24" fill="#FBBF24" />
                  ))}
                </View>

                <View
                  style={[
                    styles.statusTag,
                    {
                      backgroundColor:
                        rev.status === 'approved'
                          ? 'rgba(16,185,129,0.15)'
                          : rev.status === 'pending'
                          ? 'rgba(245,158,11,0.15)'
                          : 'rgba(239,68,68,0.15)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusTagText,
                      {
                        color:
                          rev.status === 'approved'
                            ? '#10B981'
                            : rev.status === 'pending'
                            ? '#F59E0B'
                            : '#EF4444',
                      },
                    ]}
                  >
                    {rev.status === 'approved'
                      ? 'TASDIQLANGAN'
                      : rev.status === 'pending'
                      ? 'KUTILMOQDA'
                      : 'BEKOR QILINGAN'}
                  </Text>
                </View>
              </View>

              <Text style={[styles.commentText, { color: colors.text }]}>
                “{rev.comment}”
              </Text>

              {rev.status === 'pending' && (
                <View style={styles.modActions}>
                  <TouchableOpacity
                    onPress={() => handleUpdateStatus(rev.id, 'approved')}
                    style={[styles.btnApprove, { backgroundColor: '#10B981' }]}
                  >
                    <CheckCircle size={14} color="#FFF" />
                    <Text style={styles.btnModText}>Saytda Chop Etish</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleUpdateStatus(rev.id, 'rejected')}
                    style={[styles.btnReject, { backgroundColor: '#EF4444' }]}
                  >
                    <XCircle size={14} color="#FFF" />
                    <Text style={styles.btnModText}>Rad Etish</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(150,150,150,0.06)',
  },
  bannerThumb: {
    width: 140,
    height: 80,
    borderRadius: RADIUS.md,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  bannerSub: {
    fontSize: 12,
    marginTop: 4,
  },
  reviewsList: {
    gap: 16,
  },
  reviewItem: {
    padding: 16,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(150,150,150,0.1)',
    gap: 10,
  },
  reviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '800',
  },
  revModel: {
    fontSize: 12,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  statusTagText: {
    fontSize: 10,
    fontWeight: '800',
  },
  commentText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  modActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  btnApprove: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  btnReject: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  btnModText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
});

