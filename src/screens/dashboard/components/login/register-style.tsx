import { StyleSheet } from "react-native";
import { color, font, fontSize } from "../../../../theme/color";

export const createStyles = (isMobile:any, scale: (val: number) => number, fontScales: (val: number) => number) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: color.blackLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      maxWidth:isMobile?  scale(320): scale(400),
      backgroundColor: 'white',
      borderRadius: fontScales(8),
      padding: fontScales(20),
      maxHeight: '95%',
      elevation: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: fontScales(20),
    },
    title: {
      fontSize: fontScales(fontSize.fontSize26),
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(50),
      color: color.lable1,
    },
    inputContainer: {
      marginBottom: fontScales(16),
    },
    label: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      marginBottom: fontScales(6),
      lineHeight: fontScales(24),
      color: color.lable1,
    },
    input: {
      borderWidth: 1,
      borderRadius: fontScales(8),
      padding: fontScales(12),
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      outlineStyle: 'none' as any,
    },
    errorText: {
      color: color.red,
      fontSize: fontScales(fontSize.fontSize11),
      fontFamily: font.Rubik_400r,
      marginTop: fontScales(4),
      marginLeft: fontScales(4),
    },
    row: {
      flexDirection: 'row',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: fontScales(8),
      paddingRight: fontScales(12),
    },
    passwordInput: {
      flex: 1,
      padding: fontScales(12),
      fontSize: fontScales(fontSize.fontSize16),
      lineHeight: fontScales(22),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      outlineStyle: 'none' as any,
    },
    eyeIcon: {
      padding: fontScales(12),
    },
    termsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: fontScales(10),
    },
    checkbox: {
      marginRight: fontScales(10),
    },
    termsText: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      flex: 1,
    },
    registerButton: {
      backgroundColor: color.secondary1,
      paddingVertical: fontScales(14),
      borderRadius: fontScales(10),
      alignItems: 'center',
      marginTop: fontScales(10),
    },
    registerButtonText: {
      color: color.white,
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_600sb,
      fontSize: fontScales(fontSize.fontSize16),
    },
    loginContainer: {
      marginTop: fontScales(16),
      alignItems: 'center',
    },
    loginText: {
      color: color.lable1,
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_400r,
      fontSize: fontScales(fontSize.fontSize16),
    },
    loginLink: {
      color: color.secondary1,
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_600sb,
      fontSize: fontScales(fontSize.fontSize16),
    },
    phoneInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: fontScales(8),
      paddingRight: fontScales(12),
    },
    phoneInput: {
      flex: 1,
      padding: fontScales(12),
      fontSize: fontScales(fontSize.fontSize16),
      lineHeight: fontScales(22),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      outlineStyle: 'none' as any,
    },
    countryCode: {
      paddingHorizontal: scale(10),
    },
    countryCodeText: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    countryPickerWrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 999,
      backgroundColor: color.blackLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });