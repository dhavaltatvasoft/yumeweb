import { StyleSheet } from "react-native";
import { color, font, fontSize } from "../../../../theme/color";

export const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  scale: (val: number) => number,
  fontScales: (val: number) => number,
) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: fontScales(isMobileOrTablet ? 16 : 100),
      paddingVertical: fontScales(isMobileOrTablet ? 40 : 80),
      backgroundColor: color.white,
    },
    title: {
      fontSize: fontScales(isMobile ? fontSize.fontSize24 : fontSize.fontSize36),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      marginBottom: fontScales(32),
      lineHeight: fontScales(isMobile ? 32 : 50),
      textAlign: 'left',
    },
    scrollContent: {
      flexDirection: 'row',
      paddingHorizontal: fontScales(2),
      paddingBottom: fontScales(20),
    },
    mobileScrollContent: {
      flexDirection: 'column',
      paddingBottom: fontScales(20),
    },
    gridMobile: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: fontScales(20),
    },
    specialtyItem: {
      alignItems: 'center',
      minWidth: fontScales(160),
      paddingVertical: fontScales(20),
      borderRadius: fontScales(8),
      borderWidth: 1,
      borderColor: color.specialtyItemBorder,
    },
    specialtyItemMobile: {
      alignItems: 'center',
      width: '45%',
      marginBottom: fontScales(20),
      paddingVertical: fontScales(20),
      borderRadius: fontScales(8),
      borderWidth: 1,
      borderColor: color.specialtyItemBorder,
    },
    icon: {
      width: fontScales(84),
      height: fontScales(84),
      marginBottom: fontScales(12),
    },
    iconMobile: {
      width: fontScales(64),
      height: fontScales(64),
      marginBottom: fontScales(10),
    },
    specialtyName: {
      fontSize: fontScales(fontSize.fontSize18),
      color: color.lable1,
      textAlign: 'center',
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(20),
    },
    bannerWrapper: {
      borderRadius: fontScales(8),
      overflow: 'hidden',
    },
    banner: {
      justifyContent: 'center',
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    bannerContent: {
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      paddingHorizontal: fontScales(isMobile ? 20 : 70),
      paddingVertical: fontScales(isMobile ? 40 : 60),
      gap: isMobile ? fontScales(24) : 0,
    },
    textContainer: {
      flex: 1,
    },
    bannerTitle: {
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(isMobile ? fontSize.fontSize32 : fontSize.fontSize48),
      color: color.white,
      lineHeight: fontScales(isMobile ? 42 : 60),
    },
    bannerButton: {
      backgroundColor: color.secondary1,
      paddingHorizontal: fontScales(24),
      paddingVertical: fontScales(isMobile ? 16 : 14),
      borderRadius: fontScales(8),
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: isMobile ? 'stretch' : 'auto',
      justifyContent: isMobile ? 'center' : 'flex-start',
    },
    bannerButtonText: {
      color: color.white,
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(22),
    },
    textArrow: {
      fontSize: fontScales(fontSize.fontSize14),
      color: color.white,
      fontFamily: font.Rubik_700b,
      marginStart: fontScales(10),
      marginBottom: fontScales(2),
    },
  });