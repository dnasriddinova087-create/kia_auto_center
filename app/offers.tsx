// Special Offers & Promotions Screen
// Owner: Nasriddinova Dilfuza

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Tag, Check, Calendar, ArrowRight } from 'lucide-react-native';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomButton } from '../components/CustomButton';
import { LeadModal } from '../components/LeadModal';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { KIA_OFFERS, Offer } from '../constants/offers';
import { COLORS, RADIUS } from '../constants/theme';

export default function OffersScreen() {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();
  const { t, language } = useLanguage();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const isWide = width >= 900;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      <Navbar />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t('sectionOffersTitle')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('sectionOffersSubtitle')}
          </Text>
        </View>

        <View style={styles.offersList}>
          {KIA_OFFERS.map((offer: Offer) => (
            <View
              key={offer.id}
              style={[
                styles.offerCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                isWide && styles.offerCardWide,
              ]}
            >
              <Image source={{ uri: offer.image }} style={[styles.offerImage, isWide && styles.offerImageWide]} />

              <View style={styles.cardBody}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{offer.badge[language]}</Text>
                </View>

                <Text style={[styles.offerTitle, { color: colors.text }]}>
                  {offer.title[language]}
                </Text>

                <Text style={[styles.offerDesc, { color: colors.textSecondary }]}>
                  {offer.description[language]}
                </Text>

                <View style={styles.detailsList}>
                  {offer.details[language]?.map((d: string, idx: number) => (
                    <View key={idx} style={styles.detailRow}>
                      <Check size={16} color={COLORS.success} />
                      <Text style={[styles.detailText, { color: colors.textSecondary }]}>{d}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.footerRow}>
                  <Text style={[styles.validText, { color: colors.textMuted }]}>
                    Amal qilish muddati: {offer.validUntil} gacha
                  </Text>
                  <CustomButton
                    title="Taklifdan foydalanish"
                    onPress={() => setSelectedOffer(offer)}
                    variant="primary"
                    size="sm"
                    iconRight={<ArrowRight size={14} color="#FFFFFF" />}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Footer />

      <LeadModal
        visible={!!selectedOffer}
        onClose={() => setSelectedOffer(null)}
        vehicleName={selectedOffer?.title[language]}
        leadType="purchase"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    maxWidth: 1200,
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
  offersList: {
    gap: 24,
  },
  offerCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  offerCardWide: {
    flexDirection: 'row',
  },
  offerImage: {
    width: '100%',
    height: 240,
  },
  offerImageWide: {
    width: 440,
    height: '100%',
    minHeight: 280,
  },
  cardBody: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  offerDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsList: {
    gap: 8,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
  },
  footerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.15)',
    paddingTop: 16,
    gap: 12,
  },
  validText: {
    fontSize: 12,
  },
});
