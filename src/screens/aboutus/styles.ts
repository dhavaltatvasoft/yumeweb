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
    safeArea: {
      flex: 1,
      backgroundColor: color.white,
    },
    subContainer: {
      height: fontScales(200),
    },
    subContainerRow1: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 24,
    },
    subContainerRow5: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 24,
      marginTop: fontScales(30),
    },
    subContainerRow2: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color.primary1,
      marginTop: fontScales(30),
      borderRadius: 10,
      padding: fontScales(20),
    },
    imageWrapper: {
      borderRadius: 10,
      overflow: "hidden",
    },
    subContainerRow8: {
      flexDirection: "row",
      alignItems: "center",
      padding: scale(20),
    },
    subContainerRow7: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: scale(20),
      flex: 1,
    },
    subContainerRow3: {
      justifyContent: "center",
      marginLeft: fontScales(50),
      flex: 1,
      marginTop: fontScales(20),
    },
    subContainerRow6: {
      // marginLeft:scale(50),
      //flex:1
    },
    subContainerRow4: {
      backgroundColor: color.secondary1,
      padding: 20,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      height: fontScales(70),
      marginRight: fontScales(40),
    },
    subContainerRow44: {
      backgroundColor: color.buttonPink,
      padding: fontScales(20),

      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      height: fontScales(70),
      marginTop: fontScales(20),
    },
    subContainerColumn3: {
      justifyContent: "center",
      marginLeft: fontScales(50),
      flex: 1,
    },
    subContainerColumn2: {
      flexDirection: "column",
    },
    subContainerColumn22: {
      flexDirection: "column",
      marginTop: 50,
      backgroundColor: color.primary1,
    },
    subContainerColumn1: {
      flexDirection: "column",
    },
    subContainerColumn5: {
      // marginHorizontal: scale(80),
      flexDirection: "column",
      rowGap: 24,
      marginTop: fontScales(30),
    },

    scrollContent: {
      flexGrow: 1,
      paddingTop: fontScales(70),
    },
    flex1: {
      flex: 1,
    },
    sectionTitleWrapper: {
      // marginHorizontal: scale(80),
    },
    scrollContentSmall: {
      flexDirection: "column",
      alignSelf: "center",
    },
    aboutText: {
      fontSize: fontScales(30),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      marginBottom: fontScales(10),
    },
    aboutTextsubtitle: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
      marginTop: fontScales(15),
    },
    heading1: {
      fontSize: fontScales(30),
      fontFamily: font.Rubik_500m,
      color: color.white,
      textAlign: "left",
    },
    heading2: {
      fontSize: fontScales(18),
      fontFamily: font.Rubik_400r,
      color: color.white,
      textAlign: "left",
    },
    heading3: {
      fontSize: fontScales(18),
      fontFamily: font.Rubik_400r,
      color: color.white,
      textAlign: "left",
      marginLeft: 10,
    },
    heading33: {
      fontSize: fontScales(18),
      fontFamily: font.Rubik_400r,
      color: color.white,
      textAlign: "left",
    },
    heading3View: {
      flexDirection: "row",
      marginTop: 20,
      alignItems: "center",
    },
    imageStyle: {
      borderRadius: 8,
      flex: 1,
    },
    imageStyle1: {
      borderRadius: 8,

      height: fontScales(500),
      backgroundColor: color.red,
    },
    title1: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
      color: color.white,
      textTransform: "uppercase",
    },

    doctorCard1: {
      backgroundColor: color.white,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      // alignItems: 'center',
      borderWidth: 1,
      borderColor: color.color_f4f3f8,

      position: "relative",
    },
    doctorImage: {
      width: fontScales(70),
      height: fontScales(70),
      borderRadius: fontScales(10),
      marginRight: fontScales(15),
    },
    doctorDetails: {
      flex: 1,
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
      flexWrap: "wrap",
    },
    doctorName: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      flexShrink: 1,
    },
    doctorCard: {
      flexDirection: "row",
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      alignItems: "center",
    },
    specialtyRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    specialty: {
      fontSize: fontScales(14),
      color: color.color_28252C,
    },
    distance: {
      fontSize: fontScales(14),
      color: color.color_28252C,
    },
    hospital: {
      fontSize: fontScales(12),
      color: color.color_28252C,
      marginTop: 5,
    },
    videoConsultBadge: {
      backgroundColor: "#7D23F7", // Purple badge
      color: "#fff",
      fontSize: fontScales(12),
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 5,
      marginLeft: 8,
      overflow: "hidden",
    },
    compareButton: {
      paddingTop: 10,
      width: "100%",
      borderTopWidth: 1,
      flexDirection: "row",
      borderTopColor: color.color_f4f3f8,
      alignItems: "center",
    },
    compareButton2: {
      zIndex: 999999,
      marginVertical: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      left: 150,
      bottom: -30,
      shadowColor: color.color_28252C,
      shadowOpacity: 10,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 10,
      elevation: 5,
      borderRadius: 10,
      overflow: "hidden",
    },
    compareButtonText: {
      color: color.color_28252C,
      fontSize: fontScales(14),
      fontFamily: font.Rubik_500m,
      marginLeft: 14,
    },
    compareButtonText2: {
      color: color.color_00D193,
      fontSize: fontScales(14),
      fontFamily: font.Rubik_500m,
      marginLeft: 14,
    },
  });
