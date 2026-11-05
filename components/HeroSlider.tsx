// Premium Animated Hero Carousel with 10 Official KIA Models
// Owner: Nasriddinova Dilfuza

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowRight,
  Calendar,
  Calculator,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Percent,
  Sparkles,
} from 'lucide-react-native';
import { KIA_LOCAL_IMAGES } from '../constants/vehicleImages';
import { COLORS, RADIUS } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';

export interface HeroSlide {
  id: string;
  model: string;
  year: number;
  badge: string;
  tagline: string;
  description: string;
  startingPrice: string;
  monthlyEstimate: string;
  promoBadge: string;
  image: any;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'kia-k5',
    model: 'KIA K5',
    year: 2026,
    badge: 'BIZNES FASTBACK SEDAN',
    tagline: 'Dinamika, Nafislik va Smartstream Quvvati',
    description: '2.5L dvigatel, 194 ot kuchi, panoramali raqamli kokpit va premium darajadagi boshqaruv qulayligi.',
    startingPrice: '369 900 000 UZS',
    monthlyEstimate: '5 400 000 UZS / oy',
    promoBadge: '0% Muddatli To‘lov (24 oygacha)',
    image: KIA_LOCAL_IMAGES['kia-k5'],
  },
  {
    id: 'kia-sportage',
    model: 'KIA Sportage',
    year: 2026,
    badge: 'OMMABOP KROSSOVER',
    tagline: 'Mukammal Dizayn va Har Qanday Yo‘lda Ishonch',
    description: 'Intellektual to‘liq uzatma (AWD), zamonaviy egri displey va 5 yillik rasmiy zavod kafolati.',
    startingPrice: '419 900 000 UZS',
    monthlyEstimate: '6 100 000 UZS / oy',
    promoBadge: '5 Yil Zavod Kafolati + 3 Yil Bepul TO',
    image: KIA_LOCAL_IMAGES['kia-sportage'],
  },
  {
    id: 'kia-sorento',
    model: 'KIA Sorento',
    year: 2026,
    badge: '7 O‘RINLI FLAGMAN SUV',
    tagline: 'Hashamat, Kenglik va Qudratli Texnologiyalar',
    description: 'Katta oilalar uchun ideal tanlov. Keng 7 o‘rinli salon, Drive Wise xavfsizlik majmuasi va hashamatli qulaylik.',
    startingPrice: '569 900 000 UZS',
    monthlyEstimate: '8 300 000 UZS / oy',
    promoBadge: '50 000 000 UZS gacha Trade-In Bonusi',
    image: KIA_LOCAL_IMAGES['kia-sorento'],
  },
  {
    id: 'kia-k8',
    model: 'KIA K8',
    year: 2026,
    badge: 'GRAND LYUKS SEDAN',
    tagline: 'Innovatsion Dizayn va Elit Darajadagi Qulaylik',
    description: 'Frameless Tiger Nose panjarasi, Meridian Premium 14-karnayli akustikasi va Ergo Motion o‘rindiqlari.',
    startingPrice: '689 900 000 UZS',
    monthlyEstimate: '10 200 000 UZS / oy',
    promoBadge: 'VIP Dilerlik Xizmati • Shaxsiy Menejer',
    image: KIA_LOCAL_IMAGES['kia-k8'],
  },
  {
    id: 'kia-sonet',
    model: 'KIA Sonet',
    year: 2026,
    badge: 'SHAHAR KROSSOVERI',
    tagline: 'O‘zbekiston Bozoridagi Eng Xaridorgir Model',
    description: 'Baland 205 mm klirens, 100 km ga atigi 6.2 litr sarf va shahar sharoitiga mos ixchamlik.',
    startingPrice: '189 900 000 UZS',
    monthlyEstimate: '2 800 000 UZS / oy',
    promoBadge: 'Imtiyozli Avtokredit: Yillik 18% dan',
    image: KIA_LOCAL_IMAGES['kia-sonet'],
  },
  {
    id: 'kia-seltos',
    model: 'KIA Seltos',
    year: 2026,
    badge: 'KOMPAKT KROSSOVER',
    tagline: 'Uslub, Dinamika va Ilg‘or Texnologiyalar Uyg‘unligi',
    description: 'Ekspressiv tashqi qiyofa, baland o‘tirish qulayligi, zamonaviy multimedia va tejamkor dvigatel.',
    startingPrice: '339 900 000 UZS',
    monthlyEstimate: '4 950 000 UZS / oy',
    promoBadge: 'Boshlang‘ich to‘lov 20% dan',
    image: KIA_LOCAL_IMAGES['kia-seltos'],
  },
  {
    id: 'kia-carnival',
    model: 'KIA Carnival',
    year: 2026,
    badge: 'GRAND UTILITY VEHICLE (GUV)',
    tagline: 'Birinchi Klass Aviakompaniya Qulayligi',
    description: 'VIP Relaxion o‘rindiqlari, avtomatik elektr suriluvchi eshiklar va ulkan yuk bo‘limi.',
    startingPrice: '650 000 000 UZS',
    monthlyEstimate: '9 500 000 UZS / oy',
    promoBadge: '0% Foizsiz Rassrochka Dasturi',
    image: KIA_LOCAL_IMAGES['kia-carnival'],
  },
  {
    id: 'kia-k3',
    model: 'KIA K3',
    year: 2026,
    badge: 'YANGI AVLOD SEDANI',
    tagline: 'Sportiv, Zamonaviy va Yuqori Tejamkorlik',
    description: 'Yangi Tiger Face old qismi, yorug‘ diodli LED optika va shahar hayoti uchun keng bagaj.',
    startingPrice: '275 000 000 UZS',
    monthlyEstimate: '3 990 000 UZS / oy',
    promoBadge: '10 000 000 UZS Dilerlik Chegirmasi',
    image: KIA_LOCAL_IMAGES['kia-k3'],
  },
  {
    id: 'kia-ev6',
    model: 'KIA EV6',
    year: 2026,
    badge: '100% ELEKTR KROSSOVER',
    tagline: 'Elektr Davri Kelajagi — 528 km Bir Quvvatda',
    description: 'E-GMP platformasi, 800V o‘ta tez quvvatlash (18 daqiqada 80%) va 0-100 km/s atigi 3.5 soniyada.',
    startingPrice: '699 000 000 UZS',
    monthlyEstimate: '10 300 000 UZS / oy',
    promoBadge: 'Yashil Energiya Imtiyozli Krediti',
    image: KIA_LOCAL_IMAGES['kia-ev6'],
  },
  {
    id: 'kia-k9',
    model: 'KIA K9',
    year: 2026,
    badge: 'PREMIUM EXECUTIVE SEDAN',
    tagline: 'Maksimal Nufuz, Jimlik va Mutlaq Komfort',
    description: '3.3L Twin-Turbo qudrati, AWD to‘liq uzatma, haqiqiy yog‘och bezaklar va Nappa tabiiy charmi.',
    startingPrice: '990 000 000 UZS',
    monthlyEstimate: '14 500 000 UZS / oy',
    promoBadge: 'Eksklyuziv Individual Moliyalashtirish',
    image: KIA_LOCAL_IMAGES['kia-k9'],
  },
];

interface HeroSliderProps {
  onOpenTestDrive: (vehicleName?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenTestDrive }) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { t } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const currentSlide = HERO_SLIDES[currentIndex];

  // Auto-advance slides every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <View
      style={styles.container}
      // @ts-ignore
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Car Image */}
      <View style={styles.imageBackdrop}>
        <Image
          source={currentSlide.image}
          style={styles.bgImage}
          resizeMode="cover"
        />
        {/* Cinematic Dual Gradient Overlays */}
        <View style={styles.darkGradientLeft} />
        <View style={styles.darkGradientBottom} />
      </View>

      {/* Main Content Area */}
      <View style={styles.contentWrapper}>
        <View style={[styles.innerContent, isDesktop && styles.innerContentDesktop]}>
          {/* Top Badges */}
          <View style={styles.topBadgeRow}>
            <View style={styles.dealerBadge}>
              <Sparkles size={13} color={COLORS.kiaRed} />
              <Text style={styles.dealerBadgeText}>O‘ZBEKISTONDAGI RASMIY DILER</Text>
            </View>

            <View style={styles.modelTagBadge}>
              <Text style={styles.modelTagText}>{currentSlide.badge}</Text>
            </View>
          </View>

          {/* Model Title */}
          <Text style={[styles.modelHeading, isMobile && styles.modelHeadingMobile]}>
            {currentSlide.model}
          </Text>

          {/* Tagline */}
          <Text style={[styles.tagline, isMobile && styles.taglineMobile]}>
            {currentSlide.tagline}
          </Text>

          {/* Description */}
          <Text
            style={[styles.description, isMobile && styles.descriptionMobile]}
            numberOfLines={isMobile ? 2 : 3}
          >
            {currentSlide.description}
          </Text>

          {/* Price & Promo Cards */}
          <View style={[styles.priceRow, isMobile && styles.priceRowMobile]}>
            <View style={styles.pricePill}>
              <Text style={styles.priceLabel}>Boshlang‘ich narxi:</Text>
              <Text style={styles.priceValue}>{currentSlide.startingPrice}</Text>
            </View>

            <View style={styles.promoPill}>
              <Percent size={13} color={COLORS.kiaRed} />
              <Text style={styles.promoText}>{currentSlide.promoBadge}</Text>
            </View>
          </View>

          {/* CTA Action Buttons */}
          <View style={[styles.actionRow, isMobile && styles.actionRowMobile]}>
            <TouchableOpacity
              onPress={() => router.push('/catalog')}
              style={styles.primaryBtn}
            >
              <Text style={styles.primaryBtnText}>Katalogni ko‘rish</Text>
              <ArrowRight size={17} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onOpenTestDrive(currentSlide.model)}
              style={styles.secondaryBtn}
            >
              <Calendar size={17} color="#FFFFFF" />
              <Text style={styles.secondaryBtnText}>Test-drayv</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/calculator')}
              style={styles.tertiaryBtn}
            >
              <Calculator size={16} color="rgba(255,255,255,0.85)" />
              {!isMobile && (
                <Text style={styles.tertiaryBtnText}>Kredit hisoblash</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Owner Tribute */}
          <View style={styles.ownerNotice}>
            <Text style={styles.ownerNoticeText}>
              Loyiha egasi: <Text style={{ color: '#FFFFFF', fontWeight: '800' }}>Nasriddinova Dilfuza</Text> | Toshkent, Samarqand, Buxoro
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation Arrows */}
      <TouchableOpacity
        onPress={handlePrev}
        style={[styles.navArrow, styles.arrowLeft]}
        activeOpacity={0.8}
      >
        <ChevronLeft size={22} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleNext}
        style={[styles.navArrow, styles.arrowRight]}
        activeOpacity={0.8}
      >
        <ChevronRight size={22} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Model Quick Switcher Pills (Horizontal at Bottom) */}
      <View style={styles.modelsBarWrapper}>
        <View style={styles.modelsBar}>
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <TouchableOpacity
                key={slide.id}
                onPress={() => setCurrentIndex(idx)}
                style={[
                  styles.modelDot,
                  isActive && styles.modelDotActive,
                ]}
              >
                <Text
                  style={[
                    styles.modelDotText,
                    isActive && styles.modelDotTextActive,
                  ]}
                >
                  {slide.model.replace('KIA ', '')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 580,
    position: 'relative',
    backgroundColor: '#0A0A0A',
    overflow: 'hidden',
  },
  imageBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  darkGradientLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '75%',
    backgroundColor: 'rgba(10, 10, 10, 0.88)',
  },
  darkGradientBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
    backgroundColor: 'rgba(10, 10, 10, 0.75)',
  },
  contentWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  innerContent: {
    maxWidth: 1360,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 40,
  },
  innerContentDesktop: {
    maxWidth: 680,
    alignSelf: 'flex-start',
    marginLeft: 60,
  },
  topBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  dealerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(200, 16, 46, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(200, 16, 46, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  dealerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  modelTagBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  modelTagText: {
    color: '#D1D5DB',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  modelHeading: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  modelHeadingMobile: {
    fontSize: 32,
  },
  tagline: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F3F4F6',
    marginBottom: 10,
    lineHeight: 28,
  },
  taglineMobile: {
    fontSize: 16,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
    marginBottom: 18,
    maxWidth: 580,
  },
  descriptionMobile: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  priceRowMobile: {
    gap: 6,
    marginBottom: 18,
  },
  pricePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
  },
  priceLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  priceValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  promoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(200, 16, 46, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(200, 16, 46, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
  },
  promoText: {
    color: '#F87171',
    fontSize: 12,
    fontWeight: '800',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  actionRowMobile: {
    gap: 8,
    marginBottom: 16,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.kiaRed,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: RADIUS.md,
    shadowColor: COLORS.kiaRed,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: RADIUS.md,
  },
  secondaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  tertiaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tertiaryBtnText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
  ownerNotice: {
    borderLeftWidth: 2,
    borderLeftColor: COLORS.kiaRed,
    paddingLeft: 10,
    marginTop: 4,
  },
  ownerNoticeText: {
    color: '#9CA3AF',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  navArrow: {
    position: 'absolute',
    top: '46%',
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  arrowLeft: {
    left: 16,
  },
  arrowRight: {
    right: 16,
  },
  modelsBarWrapper: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
    zIndex: 20,
    alignItems: 'center',
  },
  modelsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modelDot: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  modelDotActive: {
    backgroundColor: COLORS.kiaRed,
  },
  modelDotText: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '700',
  },
  modelDotTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});

