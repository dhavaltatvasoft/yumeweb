import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import { useScreenDimensions } from '../utils/DimensionsUtilities';
import { color, font, fontSize } from '../theme/color';
import { useTranslation } from 'react-i18next';
import { assets } from '../assets';

const Header = ({ navigation, onLogin, onRegister, isFromRegister }: any) => {
  const { t } = useTranslation();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const screenWidth = Dimensions.get('window').width;
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
              (value: number) => value * fontScale,
              [scaleFactor]
      )
  const styles = createStyles(scale, isMobile, screenWidth, fontScales);

  return (
    <View style={styles.container}>
      <Image source={assets.yume1} style={styles.logo} resizeMode="contain" />

      <View style={[styles.authContainer, isMobile && styles.mobileAuthContainer]}>
        <TouchableOpacity
          style={[styles.loginButton, isMobile && styles.mobileLoginButton]}
          onPress={() => {
            if (onLogin) onLogin();
            else navigation.navigate('LoginSelection');
          }}
        >
          <Text style={[styles.loginText, isMobile && styles.mobileLoginText]}>
            {t('header.login')}
          </Text>
        </TouchableOpacity>
        {!isFromRegister && (
          <TouchableOpacity
            style={[styles.registerButton, isMobile && styles.mobileRegisterButton]}
            onPress={() => {
              if (onRegister) onRegister();
              else navigation.navigate('Register');
            }}
          >
            <Text style={[styles.registerText, isMobile && styles.mobileRegisterText]}>
              {t('header.register')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const createStyles = (scale: (val: number) => number, isMobile: boolean, screenWidth: number, fontScales: (val: number) => number) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.color7F18E5,
      paddingVertical: fontScales(20),
      paddingHorizontal: isMobile ? fontScales(10) : fontScales(30),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: isMobile ? fontScales(10) : fontScales(150),
    },
    logo: {
      width: isMobile ? Math.min(fontScales(80), screenWidth * 0.3) : fontScales(100), 
      height: isMobile ? Math.min(fontScales(24), screenWidth * 0.1) : fontScales(30),
    },
    authContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    mobileAuthContainer: {
      flexDirection: 'row',
      gap: fontScales(8),
      flexWrap: 'wrap', 
      justifyContent: 'flex-end',
    },
    loginButton: {
      borderColor: color.white,
      borderWidth: 1,
      borderRadius: fontScales(6),
      paddingVertical: fontScales(8),
      paddingHorizontal: fontScales(30),
      marginRight: fontScales(10),
    },
    mobileLoginButton: {
      paddingVertical: fontScales(8),
      paddingHorizontal: fontScales(15),
      marginRight: 0, 
      minWidth: Math.min(fontScales(80), (screenWidth - fontScales(20)) / 2.5),
    },
    loginText: {
      color: color.white,
      fontSize: fontScales(14),
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(20),
      textAlign: 'center',
    },
    mobileLoginText: {
      fontSize: fontScales(11),
      lineHeight: fontScales(16),
    },
    registerButton: {
      backgroundColor: color.secondary1,
      borderRadius: fontScales(6),
      paddingVertical: fontScales(10),
      paddingHorizontal: fontScales(30),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    mobileRegisterButton: {
      paddingVertical: fontScales(8),
      paddingHorizontal: fontScales(15),
      minWidth: Math.min(fontScales(80), (screenWidth - fontScales(20)) / 2.5), 
    },
    mobileRegisterText: {
      fontSize: fontScales(11),
      lineHeight: fontScales(16),
    },
    registerText: {
      color: color.white,
      fontSize: fontScales(14),
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(20),
      textAlign: 'center',
    },
  });

export default Header;