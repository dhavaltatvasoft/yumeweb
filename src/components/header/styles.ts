import { StyleSheet, Platform } from 'react-native';
import { font, color, fontSize } from '../../theme/color';

export const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  scale: (val: number) => number,
  fontScales: (val: number) => number,
  isMobileBrowser:boolean
) =>
  StyleSheet.create({
    headerContainer: {
      backgroundColor: color.primary1,
      paddingVertical: fontScales(12),
      paddingHorizontal:isMobile ?  isMobileBrowser ? fontScales(35) : fontScales(35) : fontScales(80),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 10,
    },
    logoImage: {
      width: fontScales(150),
      height: fontScales(50),
      resizeMode: 'contain',
     // tintColor: color.white,
    },
    logoImageSmall: {
      width: fontScales(100),
      height: fontScales(40),
    },
    logo: {
      fontSize: fontSize.fontSize20,
      fontFamily: font.Rubik_700b,
    },
    logoPart1: {
      color: '#fff',
    },
    logoPart2: {
      color: '#f85d5d',
    },
    centerRightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: fontScales(40),
      left:fontScales(50)
    },
    navLinks: {
      flexDirection: 'row',
      gap: fontScales(32),

    },
    navText: {
      color: '#fff',
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_500m,
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: fontScales(12),
      paddingRight: fontScales(60),
    },
    profileContainer2: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: fontScales(12),
      paddingRight: fontScales(60),
      paddingBottom:fontScales(10),
      marginBottom:fontScales(30),
    },
    helloText: {
      color: '#fff',
      fontSize: fontScales(fontSize.fontSize12),
      fontFamily: font.Rubik_400r,
    },
    helloText2: {
      color: color.lable1,
      fontSize: fontScales(fontSize.fontSize12),
      fontFamily: font.Rubik_400r,
    },
    userName: {
      color: '#fff',
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_500m,
    },
    userName1: {
      color: color.lable1,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_500m,
      marginTop:fontScales(12)
    },
    avatar: {
      width: fontScales(36),
      height: fontScales(36),
      borderRadius: fontScales(18),
      backgroundColor: '#fff',
    },
    hamburger: {
      padding: fontScales(8),
    },
    drawerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(25, 180, 207, 0.3)',
      zIndex: 100,
      justifyContent: 'flex-start',
    },
    drawer: {
      backgroundColor: '#fff',
      padding: fontScales(20),
      shadowColor: '#000',
      shadowOffset: { width: fontScales(2), height: fontScales(0) },
      shadowOpacity: 0.3,
      shadowRadius: fontScales(6),
      elevation: 6,
      ...Platform.select({
        web: {
          boxShadow: '2px 0 6px rgba(0,0,0,0.1)',
        },
      }),
    },
    drawerCloseButton: {
      alignSelf: 'flex-end',
      marginBottom: fontScales(20),
    },
    drawerItem: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      marginBottom: fontScales(16),
    },
    dropdownStyle: {
      width: fontScales(150),
      marginTop: fontScales(5),
      borderRadius: fontScales(6),
      overflow: 'hidden',
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
    profileContainerSmall: {
      marginTop: fontScales(0),
      marginLeft: 0,
    },
    profileImage: {
      width: fontScales(50),
      height: fontScales(50),
      resizeMode: 'cover',
      borderRadius: fontScales(25),
    },
    profileImageSmall: {
      width: fontScales(40),
      height: fontScales(40),
      borderRadius: fontScales(20),
    },
    profileTextContainer: {
      marginLeft: fontScales(5),
    },
    greetingText: {
      fontSize: fontScales(fontSize.fontSize16),
      color: isMobile ? color.lable1 : color.white,
      fontFamily: font.Rubik_300l,
    },
    greetingTextSmall: {
      fontSize: fontScales(fontSize.fontSize14),
    },
    userNameText: {
      fontSize: fontScales(fontSize.fontSize16),
      color: isMobile ? color.lable1 : color.white,
      fontFamily: font.Rubik_500m,
    },
    userNameTextSmall: {
      fontSize: fontScales(fontSize.fontSize14),
    },
  });
