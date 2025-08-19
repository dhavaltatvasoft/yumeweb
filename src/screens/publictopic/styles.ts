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
    outerContainer: {
      flex: 1,
    },
    container: {
      backgroundColor: "#fff",
      flexGrow: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    dropdownContainer: {
      backgroundColor: "#f5f5f5",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      paddingHorizontal: fontScales(16),
      paddingVertical: fontScales(12),
    },
    dropdownButton: {
      backgroundColor: "#e0e0e0",
      padding: fontScales(12),
      borderRadius: fontScales(6),
      alignItems: "center",
    },
    dropdownButtonText: {
      fontSize: fontScales(14),
      fontWeight: "bold",
      color: "#333",
    },
    dropdownMenu: {
      marginTop: fontScales(8),
      backgroundColor: "#fff",
      borderRadius: fontScales(6),
      shadowColor: "#000",
      shadowOffset: { width: 0, height: fontScales(2) },
      shadowOpacity: 0.1,
      shadowRadius: fontScales(4),
      elevation: 2,
    },
    dropdownItem: {
      padding: fontScales(12),
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    activeDropdownItem: {
      backgroundColor: "#FF008A",
    },
    dropdownItemText: {
      fontSize: fontScales(14),
      color: "#333",
      fontWeight: "500",
    },
    activeDropdownItemText: {
      color:color.white,
      fontFamily:font.Rubik_500m,
    },
    sidebar: {
      flex: 1,
      paddingRight: fontScales(16),
      paddingVertical: fontScales(16),
      maxWidth: isMobileOrTablet ? "100%" : fontScales(290),
    },
    sidebarLink: {
      fontSize: fontScales(14),
      marginBottom: fontScales(8),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(30),
      color:color.color_827C8A
    },
    activeSidebar: {
       fontFamily: font.Rubik_500m,
      color: color.color_FF008A,
    },
    content: {
      flexDirection: isMobile ? "column" : "row",
      padding: fontScales(16),
      paddingBottom: fontScales(40),
      width: "100%",
    },
    article: {
      flex: isMobile ? 0 : 3,
      marginTop: isMobile ? fontScales(16) : fontScales(10),
      width: "100%",
      maxWidth: "100%",
    },
    title: {
      fontSize: fontScales(30),
      marginBottom: fontScales(19),
      fontFamily: font.Rubik_500m
    },
    authorContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: fontScales(16),
      width: "100%",
    },
    authorTextContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    authorImage: {
      width: fontScales(50),
      height: fontScales(50),
      marginRight: fontScales(10),
    },
    author: {
      fontSize: fontScales(18),
      fontFamily: font.Rubik_500m,
      marginBottom: fontScales(7),
    },
    date: {
      fontSize: fontScales(14),
      color: "#888",
      marginBottom: fontScales(7),
      fontFamily:font.Rubik_400r
    },
    paragraph: {
      fontSize: fontScales(16),
      marginBottom: fontScales(16),
      lineHeight: fontScales(28),
      fontFamily: font.Rubik_400r,
      color: color.lable1
    },
    sectionTitle: {
      fontSize: fontScales(22),
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(30),
      marginVertical: fontScales(12),
       color: color.lable1
    },
    commentsTitle: {
      fontSize: fontScales(18),
      fontWeight: "bold",
      marginTop: fontScales(24),
    },
    comment: {
      marginTop: fontScales(12),
      paddingLeft: fontScales(12),
    },
    commentAuthor: {
     fontFamily: font.Rubik_500m,
      fontSize: fontScales(14),
      lineHeight: fontScales(20),
      color: color.color_212121
    },
    commentText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(26),
      color: color.lable1
    },
    inputRow: {
      flexDirection: isMobile ? "column" : "row",
      marginVertical: fontScales(8),
      width: "100%",
      gap: fontScales(8)
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: fontScales(6),
      padding: fontScales(12),
      // outlineStyle: "none",
      marginBottom: isMobile ? fontScales(8) : 0,
      width: "100%",
      fontSize: fontScales(12),
    },
    inputContainer: {
  flex: 1,
  marginBottom: fontScales(12),
},
label: {
  marginBottom: fontScales(4),
  fontSize: fontScales(16),
  color: color.lable1,
  fontFamily: font.Rubik_400r,
  lineHeight: fontScales(24)
},
    button: {
      backgroundColor: "#FF008A",
      padding: fontScales(16),
      borderRadius: fontScales(8),
      alignItems: "center",
      marginTop: fontScales(8),
      width: fontScales(120),
    },
    buttonText: {
      color: color.white,
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(18),
    },
    dateQuote: {
      color: "#919191",
     fontFamily:font.Rubik_400r,
      fontSize: fontScales(12),
      lineHeight:fontScales(18),
      marginBottom: fontScales(13),
      letterSpacing:0.1
    },
    topicHead:{
      fontFamily:font.Rubik_500m,
      fontSize:fontScales(23),
      color:color.lable1,
      lineHeight:fontScales(15),
      marginBottom:fontScales(22)
    }
  });
