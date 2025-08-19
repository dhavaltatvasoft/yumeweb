import { StyleSheet, Platform } from "react-native";
import { font, color, fontSize } from "../../theme/color";

export const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  scale: (val: number) => number,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: "space-between",
      paddingTop: fontScales(30),
    },
    heading: {
      fontSize: fontScales(24),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      marginBottom: fontScales(20),
    },
    subHeading: {
      fontSize: fontScales(18),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      marginTop: fontScales(25),
      marginBottom: fontScales(10),
    },
    subHeading1: {
      fontSize: fontScales(18),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      marginTop: fontScales(25),
      marginBottom: fontScales(10),
    },
    paragraph: {
      fontSize: fontScales(14),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
      lineHeight: fontScales(22),
      marginBottom: fontScales(15),
    },
    bulletPoint: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
      marginBottom: fontScales(10),
    },
    innerContent: {
      marginHorizontal: fontScales(40),
      paddingTop: fontScales(30),
      flex: 1,
      paddingBottom: fontScales(40),
    },
  });
