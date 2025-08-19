import { StyleSheet } from "react-native";
import { color, font, fontSize } from "../../../../theme/color";

export const createStyles = (scale: (val: number) => number,fontScales: (val: number) => number) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.blackLight,
      padding: fontScales(16),
      paddingHorizontal: fontScales(20),
    },
    modalContent: {
      backgroundColor: color.white,
      borderRadius: fontScales(8),
      padding: fontScales(24),
      width: '100%',
      maxWidth: fontScales(400),
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: fontScales(fontSize.fontSize26),
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(50),
      color: color.lable1,
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: fontScales(24),
    },
    image: {
      width: fontScales(256),
      height: fontScales(256),
      resizeMode: 'contain',
    },
    buttonContainer: {
      gap: fontScales(12),
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: fontScales(12),
      borderRadius: fontScales(8),
      justifyContent: 'center',
    },
    icon: {
      marginRight: fontScales(10),
    },
    buttonText: {
      color: color.white,
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(22),
      fontSize: fontScales(fontSize.fontSize14),
      textAlign: 'center',
    },
    facebookButton: {
      backgroundColor: color.bgFacebookColor,
    },
    twitterButton: {
      backgroundColor: color.bgTwitterColor,
    },
    googleButton: {
      backgroundColor: color.bgGoogleColor,
    },
    emailButton: {
      backgroundColor: color.secondary1,
    },
    footer: {
      marginTop: fontScales(16),
      alignItems: 'center',
    },
    footerText: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(24),
      color: color.lable1,
    },
    loginLink: {
      color: color.secondary1,
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_600sb,
      lineHeight: fontScales(24),
    },
  });