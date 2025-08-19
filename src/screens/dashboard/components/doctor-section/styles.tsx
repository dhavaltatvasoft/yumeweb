import { StyleSheet } from "react-native";
import { color, font, fontSize } from "../../../../theme/color";

export const createStyles = (
  isMobile: any,
  isMobileOrTablet: any,
  scale: (val: number) => number,
  fontScales: (val: number) => number,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.doctorListBackground,
      paddingHorizontal: fontScales(isMobileOrTablet ? 16 : 100),
      paddingVertical: 60,
    },
    containerMobile: {
      paddingHorizontal: 16,
      paddingVertical: 30,
    },
    header: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      marginBottom: fontScales(24),
      gap: isMobile ? fontScales(16) : 0,
    },
    headerMobile: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: fontScales(16),
    },
    title: {
      fontSize: fontScales(isMobile ? fontSize.fontSize24 : fontSize.fontSize36),
    fontFamily: font.Rubik_500m,
    color: color.lable1,
    lineHeight: fontScales(isMobile ? 32 : 50),
    },
    titleMobile: {
      fontSize: fontSize.fontSize24,
      lineHeight: fontScales(32),
    },
    seeAllButton: {
      backgroundColor: color.secondary1,
      paddingHorizontal: fontScales(30),
      paddingVertical: fontScales(isMobile ? 5 : 12),
      borderRadius: fontScales(8),
      alignSelf: isMobile ? 'stretch' : 'auto',
      alignItems: isMobile ? 'center' : 'flex-end',
    },
    buttonMobile: {
      alignSelf: 'stretch',
      paddingVertical: 12,
      alignItems: 'center',
    },
    seeAllText: {
    color: color.white,
    fontSize: fontScales(fontSize.fontSize16),
    fontFamily: font.Rubik_400r,
    lineHeight: fontScales(20),
    textTransform:'uppercase'
    },
    scrollContent: {
      paddingHorizontal: 2,
      flexDirection: 'row',
      marginTop: fontScales(10),
      paddingBottom: fontScales(20),
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    gridItem: {
      width: '48%',
      marginBottom: fontScales(20),
    },
    gridItemMobile: {
      width: '100%',
    },
    mobileScrollContent: {
      flexDirection: 'column',
      gap: fontScales(20),
      paddingBottom: fontScales(20),
    },
    doctorCardSpacing: {
      marginBottom: fontScales(20),
    }
  });