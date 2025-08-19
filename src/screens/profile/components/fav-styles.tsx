import { StyleSheet } from "react-native";
import { color, font, fontSize } from "../../../theme/color";

export const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  scale: (val: number) => number,
  fontScales: (val: number) => number,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
      zIndex: 1,
    },
    scrollContent: {
      paddingBottom: fontScales(20),
      zIndex: 1,
      overflow: 'visible',
    },
    groupContainer: {
      marginBottom: fontScales(16),
      borderRadius: fontScales(8),
      zIndex: 1,
      overflow: 'visible',
    },
    groupHeader: {
      padding: fontScales(12),
      backgroundColor: color.white,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: fontScales(10),
      borderRadius: fontScales(8),
      borderWidth: 1,
      borderColor: color.specialtyItemBorder,
      zIndex: 2,
      overflow: 'visible',
    },
    groupTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    groupTitle: {
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      fontSize: fontScales(fontSize.fontSize16),
      lineHeight: fontScales(18),
    },
    doctorCount: {
      marginLeft: fontScales(8),
      color: color.lable1,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(18),
    },
    groupHeaderButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 3,
    },
    moreButton: {
      marginRight: fontScales(8),
      padding: fontScales(4),
    },
    doctorCard: {
      borderRadius: fontScales(8),
      marginVertical: fontScales(10),
      borderWidth: 1,
      borderColor: color.color28252C14,
    },
    doctorCardMobile: {
      maxWidth: '100%',
      zIndex: 2,
    },
    cardContent: {
      padding: fontScales(16),
    },
    doctorInfo: {
      flexDirection: 'row',
    },
    doctorInfoMobile: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center',
      // backgroundColor:'red',
      // paddingHorizontal:20
    },
    imageContainer: {
      marginRight: fontScales(16),
      marginBottom: isMobile ? fontScales(12) : 0,
    },
    doctorImage: {
      width: fontScales(100),
      height: fontScales(100),
      borderRadius: fontScales(8),
    },
    detailsContainer: {
      flex: 1,
    },
    doctorHeader: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'flex-start',
    },
    doctorNameContainer: {
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      marginBottom: fontScales(4),
    },
    doctorName: {
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      fontSize: fontScales(fontSize.fontSize18),
      lineHeight: fontScales(20),
    },
    specialtyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: fontScales(8),
    },
    doctorSpecialty: {
      color: color.lable4,
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
    },
    doctorDistance: {
      color: color.lable1,
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
    },
    hoursContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: isMobile ? fontScales(8) : 0,
    },
    doctorHours: {
      color: color.lable4,
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
      marginLeft: fontScales(4),
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: fontScales(4),
    },
    ratingBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.doctorRatingContainer,
      paddingVertical: fontScales(2),
      paddingHorizontal: fontScales(5),
      borderRadius: fontScales(30),
    },
    ratingText: {
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize12),
      lineHeight: fontScales(16),
      color: color.white,
      marginEnd: fontScales(3),
    },
    reviewCount: {
      marginLeft: fontScales(8),
      color: color.textLight,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(16),
    },
    appointmentTypes: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: fontScales(13),
      marginStart: isMobile ? 0 : fontScales(10),
      marginTop: isMobile ? fontScales(8) : 0,
    },
    videoConsultBadge: {
      flexDirection: 'row',
      backgroundColor: color.colorF4EDFB,
      paddingVertical: fontScales(4),
      paddingHorizontal: fontScales(10),
      borderRadius: fontScales(12),
      alignItems: 'center',
    },
    videoBadgeText: {
      color: color.primary1Shade,
      fontSize: fontScales(fontSize.fontSize12),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
    },
    inPersonBadge: {
      flexDirection: 'row',
      backgroundColor: color.colorFFEBF6,
      paddingVertical: fontScales(4),
      paddingHorizontal: fontScales(10),
      borderRadius: fontScales(12),
      alignItems: 'center',
    },
    inPersonBadgeText: {
      color: color.secondary1,
      fontSize: fontScales(fontSize.fontSize12),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
    },
    doctorAddress: {
      color: color.lable1,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
      marginTop: fontScales(8),
      maxWidth:'90%'
    },
    favoriteContainer: {
      marginLeft: fontScales(8),
    },
    actionBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: fontScales(5),
      alignItems: 'center',
    },
    moveToButton: {
      color: color.lable1,
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
    },
    removeButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    removeButtonText: {
      color: color.color_212121,
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
    },
    doctorAddressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconHeart: {
      height: fontScales(20),
      width: fontScales(20),
      marginHorizontal: fontScales(8),
    },
    dividerVertical: {
      width: '100%',
      height: 1,
      backgroundColor: color.color28252C14,
      marginVertical: fontScales(10),
    },
    iconTrash: {
      height: fontScales(15),
      width: fontScales(15),
      marginHorizontal: fontScales(8),
    },
    iconClock: {
      height: fontScales(15),
      width: fontScales(15),
      marginHorizontal: fontScales(8),
    },
    iconPPL: {
      height: fontScales(15),
      width: fontScales(15),
      marginHorizontal: fontScales(8),
    },
    iconVideo: {
      height: fontScales(17),
      width: fontScales(17),
      marginHorizontal: fontScales(8),
    },
    dropdownStyle: {
      width: fontScales(126),
      marginTop: fontScales(5),
      borderRadius: fontScales(6),
      borderWidth: 0,
      height: fontScales(90),
      zIndex: 9999,
      position: 'absolute',
    },
    dropdownTextStyle: {
      fontSize: fontScales(fontSize.fontSize16),
      paddingVertical: fontScales(12),
      paddingHorizontal: fontScales(10),
      color: color.loginDropDownText,
      fontFamily: font.Rubik_500m,
    },
    dropdownTextHighlightStyle: {
      color: color.shadowColor,
    },
  });