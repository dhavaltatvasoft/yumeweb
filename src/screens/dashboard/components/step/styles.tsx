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
      marginTop: fontScales(40),
      paddingVertical: fontScales(20),
      paddingHorizontal: fontScales(isMobileOrTablet ? 16 : 100),
      backgroundColor: color.white,
    },
    heading: {
      fontSize: fontScales(isMobile ? fontSize.fontSize24 : fontSize.fontSize36),
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(isMobile ? 32 : 50),
      color: color.lable1,
      marginBottom: fontScales(40),
      textAlign: 'left',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
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
    step: {
      flex: 1,
      marginBottom: fontScales(30),
      minWidth: fontScales(200),
    },
    stepMobile: {
      width: '40%',
      marginBottom: fontScales(30),
    },
    iconBox: {
      backgroundColor: color.stepIconBox,
      borderRadius: fontScales(12),
      padding: fontScales(16),
      marginBottom: fontScales(12),
      width: fontScales(50),
      height: fontScales(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: fontScales(20),
      height: fontScales(20),
      tintColor: color.primary1,
    },
    title: {
      fontSize: fontScales(fontSize.fontSize24),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      textAlign: 'left',
      marginBottom: fontScales(10),
      lineHeight: fontScales(30),
      textTransform: 'uppercase',
      marginVertical: fontScales(20),
    },
    description: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.textLight,
      textAlign: 'left',
      lineHeight: fontScales(24),
    },
  });