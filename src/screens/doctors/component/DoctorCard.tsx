import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { color, font } from '../../../theme/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useScreenDimensions } from '../../../utils/DimensionsUtilities';
import { useTranslation } from 'react-i18next';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;



interface DoctorCardProps {
  doctor: any;
  index: number;
  handleFavoritePress?: () => void;
  onRemoveSelected?: () => void;
  onToggleCompare?: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  index,
  onRemoveSelected,
  onToggleCompare,
  handleFavoritePress
}) => {
  const { isMobile, isTablet, isDesktop, scaleFactor, fontScale } = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const scale = (value: number) => value * scaleFactor;
  const fontScales = useCallback(
              (value: number) => value * fontScale,
              [scaleFactor]
            );
  const styles = screenStyle(isMobile, isMobileOrTablet, isDesktop, scale, fontScales);
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  const renderBadge = (
    iconName: string,
    iconColor: string,
    text: string,
    backgroundColor: string,
    marginTopCondition: boolean,
    isTimeBadge: boolean = false
  ) => (
    <View
      style={[
        styles.badgeContainer,
        { backgroundColor },
        marginTopCondition && styles.badgeMarginTop,
        isTimeBadge && (isDesktop ? styles.timeBadgeWeb : styles.timeBadgeMobile),
      ]}
    >
      {isTimeBadge ? (
        <MaterialIcons name={iconName} size={fontScales(20)} color={iconColor} />
      ) : (
        <FontAwesome name={iconName} size={fontScales(20)} color={iconColor} />
      )}
      <Text style={[styles.badgeText, { color: iconColor }]}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.doctorCardContainer}>
      <View style={styles.doctorCardContent}>
        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
        <View style={styles.doctorDetails}>
          <View style={styles.nameAndBadgesRow}>
            <Text style={styles.doctorName}>{doctor.name}</Text>

            {doctor.videoConsult &&
              renderBadge(
                'video-camera',
                color.color_761FCC,
                t('doctorsSection.videoConsultant'),
                '#F2E7FE',
                isMobileOrTablet
              )}

            {doctor.inPerson &&
              renderBadge(
                'user',
                color.color_FF008A,
                t('doctorsSection.inPerson'),
                '#FFE6F3',
                isMobileOrTablet
              )}

            {doctor.time &&
              renderBadge(
                'access-time-filled',
                color.color_535156,
                doctor.time,
                '#E4E4E4',
                isMobile,
                true 
              )}
          </View>

          <View style={styles.subRow}>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            <Text style={styles.doctorDistance}>{doctor.distance}</Text>
          </View>

          <View style={[styles.subRow, styles.marginTop8]}>
            <View style={styles.ratingBadge}>
              <AntDesign name="star" size={fontScales(14)} color={color.white} />
              <Text style={styles.ratingText}>{doctor.rating}</Text>
            </View>
            <Text style={styles.reviewsText}>
              {doctor.reviews} {t('doctorsSection.reviews')}
            </Text>
          </View>

          <View style={[styles.nameAndBadgesRow, styles.marginTop8]}>
            <Text style={styles.doctorHospital}>{doctor.hospital}</Text>
            <AntDesign  name="heart" size={fontScales(20)}  color={doctor.favorite ? color.color_FF008A : color.color_C9C9C9} onPress={handleFavoritePress}/>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.bottomActionRow}>
        {doctor.isSelected ? (
          <AntDesign name="checksquare" size={fontScales(22)} color={color.color_9327FF} onPress={onRemoveSelected} />
        ) : (
          <MaterialCommunityIcons name="checkbox-blank" size={fontScales(22)} color={color.color_E4E4E4} onPress={onToggleCompare} />
        )}
        <Text style={styles.compareActionText}>{t('doctorsSection.addTOCOMPARE')}</Text>
        <Text onPress={() => navigation.navigate("doctorsdetails", { doctorId: doctor.id,isAvailable:doctor.isAvailable })} style={styles.viewDetailsActionText}>{t('doctorsSection.viewDETAILS')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorCard;

const screenStyle = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  scale: (val: number) => number,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    doctorCardContainer: {
      backgroundColor: color.white,
      borderRadius: fontScales(12),
      padding: fontScales(12),
      marginBottom: fontScales(16),
      elevation: 3,
      borderColor: color.color_28252C14,
      borderWidth: 1,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    doctorCardContent: {
      flexDirection: 'row',
    },
    doctorImage: {
      width: fontScales(80),
      height: fontScales(80),
      borderRadius: fontScales(40),
      marginRight: fontScales(12),
    },
    doctorDetails: {
      flex: 1,
      justifyContent: 'center',
    },
    nameAndBadgesRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    doctorName: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      marginRight: fontScales(8),
    },
    doctorSpecialty: {
      color: color.color_535156,
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      marginTop: fontScales(8),
      marginLeft: fontScales(8),
    },
    doctorDistance: {
      fontSize: fontScales(14),
      color: color.color_28252C,
      fontFamily: font.Rubik_400r,
      marginTop: fontScales(8),
    },
    subRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.color_00D193,
      borderRadius: fontScales(5),
      paddingHorizontal: fontScales(6),
      paddingVertical: fontScales(2),
    },
    ratingText: {
      fontSize: fontScales(12),
      fontFamily: font.Rubik_400r,
      color: color.white,
      marginLeft: fontScales(6),
    },
    reviewsText: {
      fontSize: fontScales(12),
      fontFamily: font.Rubik_400r,
      color: color.color_827C8A,
      marginLeft: fontScales(14),
    },
    doctorHospital: {
      fontSize: fontScales(14),
      color: color.color_28252C,
      fontFamily: font.Rubik_400r,
      flex: 1,
    },
    badgeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: fontScales(5),
      marginRight: fontScales(6),
      paddingHorizontal: fontScales(6),
      paddingVertical: fontScales(2),
    },
    badgeText: {
      fontSize: fontScales(12),
      fontFamily: font.Rubik_400r,
      marginLeft: fontScales(10),
    },
    badgeMarginTop: {
      marginTop: fontScales(10),
    },
    timeBadgeWeb: {
      position: 'absolute',
      right: 0,
    },
    timeBadgeMobile: {
      marginTop: fontScales(10),
    },
    bottomActionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: fontScales(12),
      borderTopWidth: 1,
      borderTopColor: '#E4E4E4',
      paddingTop: fontScales(8),
    },
    compareActionText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
      marginLeft: fontScales(10),
    },
    viewDetailsActionText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      color: color.color_FF008A,
      position: 'absolute',
      right: 0,
    },
    marginTop8: {
      marginTop: fontScales(8),
    },

    // Styles for selected/comparison cards (originally from the provided code)
    selectedContainer2: {
      marginHorizontal: fontScales(8),
      height: fontScales(80),
    },
    selectedContainer22: {
      marginBottom: fontScales(16),
      marginHorizontal: fontScales(8),
    },
    selectedCard: {
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      backgroundColor: color.white,
      padding: fontScales(12),
      borderRadius: fontScales(12),
      minHeight: fontScales(80),
      marginBottom: 20,
    },
    selectedCard2: {
      flexDirection: isMobileOrTablet ? 'column' : 'row',
      alignItems: 'center',
      backgroundColor: color.white,
      padding: fontScales(12),
      borderRadius: fontScales(12),
      height: fontScales(80),
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: '#ccc',
    },
    selectedImage: {
      width: fontScales(50),
      height: fontScales(50),
      borderRadius: fontScales(25),
      marginRight: fontScales(12),
    },
    selectedTextContainer: {
      flex: 1,
    },
    selectedTextContainer1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    drName: {
      fontSize: fontScales(14),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
      marginLeft: fontScales(5),
    },
    drSpeciality: {
      fontSize: fontScales(13),
      fontFamily: font.Rubik_400r,
      color: color.color_FF008A,
      marginLeft: fontScales(5),
      marginTop: fontScales(5),
    },
    removeIcon: {
      position: 'absolute',
      top: fontScales(-4),
      right: fontScales(-4),
      zIndex: 1,
    },
    selectedCard22: {
      height: isMobileOrTablet ? fontScales(80) : fontScales(80),
      backgroundColor: color.white,
      borderRadius: fontScales(12),
      justifyContent: 'center',
      alignItems: 'center',
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: '#ccc',
    },
    selectDoctext: {
      color: color.color_28252C,
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
    },
  });