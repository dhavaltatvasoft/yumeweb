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
    safeContainer: {
      flex: 1,
      backgroundColor: color.white,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "space-between",
    },
    innerContent: {
      marginHorizontal: fontScales(40),
      paddingTop: fontScales(30),
      alignItems: "center",
    },
    faqHeader: {
      fontSize: fontScales(24),
      fontFamily: font.Rubik_500m,
      marginBottom: fontScales(20),
      color: color.color_28252C,
      textAlign: "center",
    },
    categoryGrid: {
      flexDirection: isMobile ? "column" : "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: isMobile ? "center" : "flex-start",
      gap: fontScales(20),
      paddingBottom: fontScales(40),
      marginTop: isMobile ? fontScales(50) : 0,
    },
    categoryCard: {
      width: fontScales(220),
      height: fontScales(150),
      borderRadius: fontScales(10),
      backgroundColor: "#fff",
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      justifyContent: "center",
      alignItems: "center",
      padding: fontScales(12),
      ...Platform.select({
        web: {
          shadowColor: "transparent",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }),
    },
    categoryIcon: {
      width: fontScales(40),
      height: fontScales(40),
      marginBottom: fontScales(10),
      resizeMode: "contain",
    },
    categoryLabel: {
      textAlign: "center",
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(18),
      color: color.lable4,
    },
    footerContainer: {
      marginTop: fontScales(30),
    },
    searchContainer: {
      backgroundColor: color.primary1,
      paddingHorizontal: fontScales(60),
      paddingVertical: fontScales(20),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: fontScales(10),
    },
    searchInputBox: {
      flex: 1,
      maxWidth: fontScales(400),
      padding: fontScales(10),
      backgroundColor: color.primary1Shade,
      borderRadius: fontScales(8),
      color: color.white,
      fontSize: fontScales(18),
      fontFamily: font.Rubik_500m,
    },
    searchButton: {
      backgroundColor: color.white,
      paddingVertical: fontScales(10),
      paddingHorizontal: fontScales(20),
      borderRadius: fontScales(8),
    },
    searchButtonText: {
      color: color.buttonPink,
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
    },
  });
