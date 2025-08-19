import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { HoverAbleCard } from './HoverAbleCard';
import { useScreenDimensions } from '../../../../utils/DimensionsUtilities';
import { createStyles } from './styles';

const screenWidth = Dimensions.get('window').width;

const doctors = [
  {
    id: 1,
    name: 'Dr. Smeeth Chessy',
    specialty: 'Neurologist',
    hospital: 'Aestrolic Clinic',
    location: '22H New York',
    rating: 4.2,
    image:
      'https://images.unsplash.com/photo-1612523138351-4643808db8f3?w=900&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Dr. Jeclina Tueck',
    specialty: 'Dentist',
    hospital: 'Aone Hospital',
    location: '22H New York',
    rating: 4.2,
    image:
      'https://images.unsplash.com/photo-1688588162632-2a98e10058da?q=80&w=3087&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Dr. Anna Warren',
    specialty: 'Cardiologist',
    hospital: 'Heart Plus Hospital',
    location: 'San Francisco',
    rating: 4.3,
    image:
      'https://images.unsplash.com/photo-1688588162416-f7a7e726e0bf?w=900&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Dr. Morries Pena',
    specialty: 'Pulmonologist',
    hospital: 'Newlife Clinic',
    location: 'Madrid',
    rating: 4.4,
    image:
      'https://images.unsplash.com/photo-1623854767266-d8eeb3b12a89?w=900&auto=format&fit=crop',
  },
];

const DoctorsSection = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet, scaleFactor, fontScale } = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;

  const scale = (value: number) => value * scaleFactor;
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );
  const getDoctorCardSpacingHorizontal = (
    isLast: boolean,
    scale: (val: number) => number,
    fontScales: (val: number) => number
  ) => ({
    marginRight: isLast ? 0 : fontScales(25),
  });

  const styles = createStyles(isMobile, isMobileOrTablet, scale, fontScales);

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={[styles.title]}>{t('dashDoctorsSection.title')}</Text>
        <TouchableOpacity style={[styles.seeAllButton]}>
          <Text style={styles.seeAllText}>{t('dashDoctorsSection.seeAllButton')}</Text>
        </TouchableOpacity>
      </View>

      {isMobileOrTablet ? (
        <ScrollView
          contentContainerStyle={styles.mobileScrollContent}
          showsVerticalScrollIndicator={false}>
          {doctors.map(doctor => (
            <View key={doctor.id} style={styles.gridItemMobile}>
              <HoverAbleCard doctor={doctor} style={styles.doctorCardSpacing} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {doctors.map((doctor, index) => (
            <View key={doctor.id} style={{ marginRight: screenWidth * 0.043 }}>
              <HoverAbleCard doctor={doctor} style={getDoctorCardSpacingHorizontal(index === doctors.length - 1, scale, fontScales)} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default DoctorsSection;