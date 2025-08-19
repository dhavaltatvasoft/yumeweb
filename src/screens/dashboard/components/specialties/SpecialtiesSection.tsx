import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { assets } from '../../assets';
import { color, font, fontSize } from '../../../../theme/color';
import { useScreenDimensions } from '../../../../utils/DimensionsUtilities';
import { createStyles } from './styles';

const specialties = [
  { id: 1, name: 'primaryCare', icon: assets.primaryCare },
  { id: 2, name: 'dentist', icon: assets.dentist },
  { id: 3, name: 'obGyn', icon: assets.obGYN },
  { id: 4, name: 'dermatologist', icon: assets.dermatology },
  { id: 5, name: 'psychiatrist', icon: assets.psychiatry },
  { id: 6, name: 'plasticSurgeon', icon: assets.plasticSurgeon },
];

const SpecialtiesSection = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet, scaleFactor, fontScale } = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;

  const scale = (value: number) => value * scaleFactor;
  const fontScales = useCallback(
      (value: number) => value * fontScale,
      [scaleFactor]
    );

  const getSpecialtyItemSpacingHorizontal = (
    isLast: boolean,
    scale: (val: number) => number,
    fontScales: (val: number) => number,
  ) => ({
    marginRight: isLast ? 0 : fontScales(20),
  });

  const styles = createStyles(isMobile, isMobileOrTablet, scale, fontScales);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>{t('specialtiesSection.title')}</Text>

      {isMobileOrTablet ? (
        <ScrollView
          contentContainerStyle={styles.mobileScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gridMobile}>
            {specialties.map((specialty) => (
              <TouchableOpacity key={specialty.id} style={styles.specialtyItemMobile}>
                <Image source={specialty.icon} style={styles.iconMobile} />
                <Text style={styles.specialtyName}>{t(`specialtiesSection.specialties.${specialty.name}`)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {specialties.map((specialty, index) => (
            <TouchableOpacity
              key={specialty.id}
              style={[
                styles.specialtyItem,
                getSpecialtyItemSpacingHorizontal(index === specialties.length - 1, scale, fontScales),
              ]}
            >
              <Image source={{ uri: specialty.icon }} style={styles.icon} />
              <Text style={styles.specialtyName}>{t(`specialtiesSection.specialties.${specialty.name}`)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.bannerWrapper}>
        <ImageBackground
          source={assets.waveImage}
          style={styles.banner}
          imageStyle={styles.bannerImage}
          resizeMode="cover"
        >
          <View style={[styles.bannerContent]}>
            <View style={styles.textContainer}>
              <Text style={[styles.bannerTitle]}>
                {t('specialtiesSection.bannerTitle')}
              </Text>
            </View>
            <TouchableOpacity style={[styles.bannerButton]}>
              <Text style={styles.bannerButtonText}>{t('specialtiesSection.bannerButton')}</Text>
              <Text style={styles.textArrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default SpecialtiesSection;