import { StyleSheet } from "react-native";
import { color, font, fontSize } from "../../theme/color";

export const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  scale: (val: number) => number,
  screenWidth: number,
  fontScales: (val: number) => number,
) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: color.color7F18E5,
    },
    container: {
      flex: 1,
      backgroundColor: color.color7F18E5,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: fontScales(20),
      paddingVertical: fontScales(30),
    },
    mobileContainer: {
      paddingHorizontal: fontScales(15),
      paddingVertical: fontScales(20),
    },
    logo: {
      height: fontScales(100),
      width: fontScales(200),
      marginBottom: fontScales(20),
    },
    mobileLogo: {
      height: fontScales(70),
      width: fontScales(140),
      marginBottom: fontScales(10),
    },
    containerLogin: {
      backgroundColor: color.white,
      borderRadius: fontScales(8),
      padding: fontScales(20),
      width: '100%',
      maxWidth: fontScales(450),
    },
    mobileContainerLogin: {
      padding: fontScales(12),
      borderRadius: fontScales(6),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: fontScales(20),
    },
    mobileHeader: {
      marginBottom: fontScales(15),
    },
    title: {
      fontSize: fontScales(fontSize.fontSize36),
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(50),
      color: color.lable1,
      textAlign: 'center',
    },
    mobileTitle: {
      fontSize: fontScales(fontSize.fontSize24),
      lineHeight: fontScales(32),
    },
    form: {
      gap: fontScales(16),
    },
    mobileForm: {
      gap: fontScales(10),
    },
    inputContainer: {
      gap: fontScales(8),
    },
    mobileInputContainer: {
      gap: fontScales(6),
    },
    label: {
      fontSize: fontScales(fontSize.fontSize16),
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    mobileLabel: {
      fontSize: fontScales(fontSize.fontSize14),
      lineHeight: fontScales(18),
    },
    input: {
      borderWidth: 1,
      borderRadius: fontScales(8),
      padding: fontScales(12),
      fontSize: fontScales(fontSize.fontSize14),
      color: color.lable1,
      fontFamily: font.Rubik_400r,
      outlineStyle: 'none' as any,
    },
    mobileInput: {
      padding: fontScales(8),
      fontSize: fontScales(fontSize.fontSize11),
      borderRadius: fontScales(6),
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: fontScales(8),
      paddingRight: fontScales(12),
    },
    mobilePasswordContainer: {
      paddingRight: fontScales(8),
      borderRadius: fontScales(6),
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
    mobilePasswordInput: {
      padding: fontScales(8),
      fontSize: fontScales(fontSize.fontSize11),
      lineHeight: fontScales(16),
    },
    loginButton: {
      backgroundColor: color.secondary1,
      padding: fontScales(16),
      borderRadius: fontScales(8),
      alignItems: 'center',
      marginTop: fontScales(8),
    },
    mobileLoginButton: {
      padding: fontScales(10),
      borderRadius: fontScales(6),
      marginTop: fontScales(4),
    },
    loginButtonText: {
      color: color.white,
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_700b,
    },
    mobileLoginButtonText: {
      fontSize: fontScales(fontSize.fontSize14),
    },
    forgotPassword: {
      color: color.lable1,
      textAlign: 'center',
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize12),
      marginTop: fontScales(8),
    },
    mobileForgotPassword: {
      fontSize: fontScales(fontSize.fontSize11),
      lineHeight: fontScales(18),
      marginTop: fontScales(6),
    },
    registerContainer: {
      alignItems: 'center',
      marginTop: fontScales(12),
    },
    mobileRegisterContainer: {
      marginTop: fontScales(8),
    },
    registerText: {
      color: color.lable1,
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_400r,
      fontSize: fontScales(fontSize.fontSize16),
      textAlign: 'center',
    },
    mobileRegisterText: {
      fontSize: fontScales(fontSize.fontSize12),
      lineHeight: fontScales(18),
    },
    registerLink: {
      color: color.secondary1,
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_600sb,
      fontSize: fontScales(fontSize.fontSize16),
    },
    mobileRegisterLink: {
      fontSize: fontScales(fontSize.fontSize12),
      lineHeight: fontScales(18),
    },
    errorText: {
      color: color.red,
      fontSize: fontScales(fontSize.fontSize11),
      fontFamily: font.Rubik_400r,
      marginTop: fontScales(4),
      marginLeft: fontScales(4),
    },
    mobileErrorText: {
      fontSize: fontScales(fontSize.fontSize11),
      marginTop: fontScales(2),
      marginLeft: fontScales(2),
    },
    countryCode: {
      paddingHorizontal: fontScales(10),
    },
    countryCodeText: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    countryPickerWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      backgroundColor: color.blackLight, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    mobileCountryPickerWrapper: {
      padding: fontScales(10),
    },
  });