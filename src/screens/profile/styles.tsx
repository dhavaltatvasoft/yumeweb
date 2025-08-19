import { StyleSheet } from "react-native";
import { color, font, fontSize } from "../../theme/color";

export const createStyles = (isMobile: any, scale: (val: number) => number, fontScales: (val: number) => number) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: color.white },
    content: { flex: 1 },
    mobileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: fontScales(10),
      backgroundColor: color.white,
      width: fontScales(350),
    },
    sidebarContainer: {
      width: fontScales(250),
      paddingTop: fontScales(40),
      paddingHorizontal: fontScales(20),
      backgroundColor: color.white,
    },
    sidebar: { width: '100%' },
    sidebarItem: {
      paddingVertical: fontScales(12),
      paddingHorizontal: fontScales(10),
      borderRadius: fontScales(8),
      marginBottom: fontScales(10),
    },
    sidebarScrollContainer: {
      flexDirection: 'row',
      height: fontScales(60),
    },
    sidebarText: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_500m,
      color: color.loginDropDownText,
    },
    activeItem: {
      color: color.secondary1,
    },
    scrollableContent: {
      flex: 1,
    },
    mainContent: {
      flex: 1,
      padding: fontScales(20),
      paddingVertical: fontScales(45),
      marginHorizontal: fontScales(20),
    },
    pageTitle: {
      fontSize: fontScales(fontSize.fontSize24),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      marginBottom: fontScales(30),
    },
    hamburgerIcon: {
      padding: fontScales(10),
    },
    drawerOverlay: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    drawerContent: {
      width: fontScales(260),
      backgroundColor: color.white,
      paddingTop: fontScales(40),
      paddingHorizontal: fontScales(20),
      height: '100%',
    },
    drawerProfileSection: {
      marginBottom: fontScales(20),
      borderBottomWidth: 1,
      borderBottomColor: color.placeholder1,
      paddingBottom: fontScales(10),
    },
    navItemsContainer: {
      flexDirection: 'column',
      gap: fontScales(10),
    },
    navButton: {
      paddingVertical: fontScales(10),
    },
    navText: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    profileContainer: {
      flexDirection: `row`,
      alignItems: `center`,
    },
    profileImage: {
      width: fontScales(40),
      height: fontScales(40),
      resizeMode: `cover`,
      borderRadius: fontScales(20),
    },
    profileTextContainer: {
      marginLeft: fontScales(10),
    },
    greetingText: {
      fontSize: fontScales(fontSize.fontSize14),
      color: color.lable1,
      fontFamily: font.Rubik_300l,
    },
    userNameText: {
      fontSize: fontScales(fontSize.fontSize14),
      color: color.lable1,
      fontFamily: font.Rubik_500m,
    },
    dropdownStyle: {
      width: fontScales(150),
      marginTop: fontScales(5),
      borderRadius: fontScales(6),
      overflow: `hidden`,
      borderWidth: 0,
      height: fontScales(120),
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
    createButton: {
      color: color.secondary1,
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize16),
      lineHeight: fontScales(16),
    },
    logoImage: {
      height: fontScales(30),
      width: fontScales(100),
      tintColor: color.secondary1,
      marginStart: fontScales(100),
    },
  });