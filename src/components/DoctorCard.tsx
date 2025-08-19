import React, { useCallback, useState } from 'react';
import {View, Text, Image, StyleSheet, Dimensions, LayoutChangeEvent, TouchableOpacity} from 'react-native';
import {color, font, fontSize} from '../theme/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useScreenDimensions} from '../utils/DimensionsUtilities';

interface Doctor {
  image: string;
  name: string;
  specialty: string;
  distance?: string;
  rating?: string;
  reviews?: string;
  hospital?: string;
  videoConsult?: boolean;
  inPerson?: boolean;
  isAdded?: boolean;
  isSelected?: boolean;
  time?: string;
}

interface Props {
  doctor: Doctor;
  index: number;
  flatListWidth?: number;
  type: 'list' | 'selected';
 onRemoveSelected?: () => void;
  onToggleCompare?: () => void;
}

const DoctorCard: React.FC<Props> = ({doctor,index, type,flatListWidth = 0, onRemoveSelected,onToggleCompare}) => {
  const {isMobile, isTablet,isDesktop, scaleFactor} = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const scale = (value: number) => value * scaleFactor;
  const styles = createStyles(isMobile, isMobileOrTablet,isDesktop, scale);

 



  if (type === 'selected') {
    return (
      <>
        {doctor.isSelected ? (
          <View style={[styles.selectedContainer2,isDesktop && { width: flatListWidth / 3 - scale(30) },isMobile && { marginBottom: 100 },]}>         
            <Entypo name="circle-with-cross" onPress={onRemoveSelected} style={styles.removeIcon} size={scale(24)} color={color.color_28252C}/>                                        
            <View style={[styles.selectedCard,isMobileOrTablet && {width: flatListWidth,marginTop: scale(10)}]}
>
              <Image
                source={{ uri: doctor.image }}
                style={styles.selectedImage}
              />
              <View style={styles.selectedTextContainer}>
                <Text style={styles.drName}>{doctor.name}</Text>
                <Text style={styles.drSpeciality}>{doctor.specialty}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={[styles.selectedContainer2,isDesktop && { width: flatListWidth / 3 - scale(30) },isMobile && { marginTop: 50 }]}>
            <View style={[styles.selectedCard2,isMobileOrTablet && { width: flatListWidth }]}>
              <View style={[styles.selectedTextContainer1]}>
                <Text style={styles.selectDoctext}>Select Doctor {index+ 1}</Text>
              </View>
            </View>
          </View>
        
        )}
      </>
    );
  }

  return (
    <View style={styles.doctorCardContainer}>
      <View style={styles.doctorCard}>
        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
        <View style={styles.doctorDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            {doctor.videoConsult && (
              <View style={styles.videoConsultBadge}>
                <FontAwesome
                  name="video-camera"
                  size={scale(20)}
                  color={color.color_761FCC}
                />
                <Text style={styles.videoConsultName}>Video Consult</Text>
              </View>
            )}
            {doctor.inPerson && (
              <View style={styles.inPresonBadge}>
                <FontAwesome
                  name="user"
                  size={scale(20)}
                  color={color.color_FF008A}
                />
                <Text style={styles.inPresonName}>In-Person</Text>
              </View>
            )}
            <View
              style={[
                isDesktop && styles.timeBadgeWeb,
                isMobile && styles.timeBadgeMobile,
              ]}
            >
              <MaterialIcons
                name="access-time-filled"
                size={scale(20)}
                color={color.color_535156}
              />
              <Text style={styles.timeName}>{doctor.time}</Text>
            </View>
          </View>

          <View style={styles.subRow}>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
            <Text style={styles.distance}>{doctor.distance}</Text>
          </View>

          <View style={[styles.subRow, { marginTop: scale(8) }]}>
            <View style={styles.ratingBadge}>
              <AntDesign name="star" size={scale(14)} color={color.white} />
              <Text style={styles.ratingText}>{doctor.rating}</Text>
            </View>
            <Text style={styles.reviewsText}>{doctor.reviews} reviews</Text>
          </View>

          <View style={[styles.nameRow, { marginTop: scale(8) }]}>
            <Text style={styles.hospital}>{doctor.hospital}</Text>
            <AntDesign
              name="heart"
              size={scale(20)}
              color={color.color_FF008A}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onToggleCompare} style={styles.bottomRow}>
        {doctor.isSelected ? (
          <AntDesign
            name="checksquare"
            size={scale(22)}
            color={color.color_9327FF}
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank"
            size={scale(22)}
            color={color.color_E4E4E4}
          />
        )}
        <Text style={styles.compareText}>ADD TO Compare</Text>
        <Text style={styles.detailsText}>VIEW DETAILS</Text>
      </TouchableOpacity>

      {/* <View style={styles.bottomRow}>
        {doctor.isAdded ? (
          <AntDesign name="checksquare" size={scale(22)} color={color.color_9327FF} />
        ) : (
          <MaterialCommunityIcons name="checkbox-blank" size={22} color={color.color_E4E4E4} />
        )}
        <Text style={styles.compareText}>ADD TO Compare</Text>
        <Text style={styles.detailsText}>VIEW DETAILS</Text>
      </View> */}
    </View>
  );
};

export default DoctorCard;


const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  scale: (val: number) => number
) =>
  StyleSheet.create({
    doctorCardContainer: {
      backgroundColor: color.white,
      borderRadius: 12,
      padding: scale(12),
      marginBottom: scale(16),
      elevation: 3,
      borderColor: color.color_28252C14,
      borderWidth:1,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    doctorCard: {
      flexDirection: "row",
    },
    doctorImage: {
      width: scale(80),
      height: scale(80),
      borderRadius: scale(40),
      marginRight: scale(12),
    },
    doctorDetails: {
      flex: 1,
      justifyContent: "center",
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    doctorName: {
      fontSize: scale(16),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      marginRight: scale(8),
    },
    specialty: {
      color: color.color_535156,
      fontSize: scale(16),
      fontFamily: font.Rubik_400r,
      marginTop: scale(8),
      marginLeft: scale(8),
    },
    distance: {
      fontSize: scale(14),
      color: color.color_28252C,
      fontFamily: font.Rubik_400r,
      marginTop: scale(8),
    },
    subRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: color.color_00D193,
      borderRadius: 5,
      paddingHorizontal: scale(6),
      paddingVertical: scale(2),
    },
    ratingText: {
      fontSize: scale(12),
      fontFamily: font.Rubik_400r,
      color: color.white,
      marginLeft: scale(6),
    },
    reviewsText: {
      fontSize: scale(12),
      fontFamily: font.Rubik_400r,
      color: color.color_827C8A,
      marginLeft: scale(14),
    },
    hospital: {
      fontSize: scale(14),
      color: color.color_28252C,
      fontFamily: font.Rubik_400r,
      flex: 1,
    },
    videoConsultBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F2E7FE",
      borderRadius: 5,
      marginRight: scale(6),
      paddingHorizontal: scale(6),
      paddingVertical: scale(2),
    },
    videoConsultName: {
      fontSize: scale(12),
      fontFamily: font.Rubik_400r,
      color: color.color_761FCC,
      marginLeft: scale(10),
    },
    inPresonBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFE6F3",
      borderRadius: 5,
      marginRight: scale(6),
      paddingHorizontal: scale(6),
      paddingVertical: scale(2),
    },
    inPresonName: {
      fontSize: scale(12),
      fontFamily: font.Rubik_400r,
      color: color.color_FF008A,
      marginLeft: scale(10),
    },
    timeBadgeWeb: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#E4E4E4",
      borderRadius: 5,
      paddingHorizontal: scale(6),
      paddingVertical: scale(2),
      position: "absolute",
      right: 0,
    },
    timeBadgeMobile: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#E4E4E4",
      borderRadius: 5,
      paddingHorizontal: scale(6),
      paddingVertical: scale(2),
    },
    timeName: {
      fontSize: scale(12),
      fontFamily: font.Rubik_400r,
      color: color.color_535156,
      marginLeft: scale(5),
    },
    bottomRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: scale(12),
      borderTopWidth: 1,
      borderTopColor: "#E4E4E4",
      paddingTop: scale(8),
    },
    compareText: {
      fontSize: scale(16),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
      marginLeft: 10,
    },
    detailsText: {
      fontSize: scale(16),
      fontFamily: font.Rubik_400r,
      color: color.color_FF008A,
      position: "absolute",
      right: 0,
    },

    selectedContainer2: {
      marginHorizontal: scale(8),
      height: scale(80),
    },

    
    selectedContainer22: {
      marginBottom: scale(16),
      marginHorizontal: scale(8),
    },
    selectedCard: {
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      backgroundColor: color.white,
      padding: scale(12),
      borderRadius: scale(12),
      minHeight: scale(80),
      marginBottom:20
    },
    selectedCard2: {
      flexDirection: isMobileOrTablet ? "column" : "row",
      alignItems: "center",
      backgroundColor: color.white,
      padding: scale(12),
      borderRadius: scale(12),
      height: scale(80),
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: "#ccc",
    },
    selectedImage: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(25),
      marginRight: scale(12),
    },
    selectedTextContainer: {
      flex: 1,
    },
    selectedTextContainer1: {
      flex: 1,
      justifyContent: "center", alignItems: "center"
    },
    drName: {
      fontSize: scale(14),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
      marginLeft: scale(5),
    },
    drSpeciality: {
      fontSize: scale(13),
      fontFamily: font.Rubik_400r,
      color: color.color_FF008A,
      marginLeft: scale(5),
      marginTop: scale(5),
    },
    removeIcon: {
      position: "absolute",
      top: scale(6),
      right: scale(6),
      zIndex: 1,
    },

    // Placeholder style when not selected

    selectedCard22: {
      height: isMobileOrTablet ? scale(80) : scale(80),
      backgroundColor: color.white,
      borderRadius: scale(12),
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: "#ccc",
    },
    selectDoctext: {
      color: color.color_28252C,
      fontSize: scale(16),
      fontFamily: font.Rubik_400r,
    },
  });
