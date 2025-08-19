import React, { useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {color, font, fontSize} from '../../../theme/color';
import Footer from '../../Footer';
import Header from '../../Header';
import {useScreenDimensions} from '../../../utils/DimensionsUtilities';
import {assets} from '../../assets'; // for lock icon or any branding

const LoginSelection = ({navigation}: any) => {
  const {isMobile, scaleFactor, fontScale} = useScreenDimensions();
  const screenWidth = Dimensions.get('window').width;
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
                (value: number) => value * fontScale,
                [scaleFactor]
        )
  const styles = createStyles(scale, isMobile, screenWidth, fontScales);

  const handleLogin = () => navigation.navigate('Login');
  const handleResetPassword = () => navigation.navigate('ResetPassword');
  const handleContactSupport = () => navigation.navigate('Support');
  const handleCreateAccount = () => navigation.navigate('CreateAccount');

  const handleNavigateToValidation = () => {
    navigation.navigate('Register',{isFromLogin:true})
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      <Header navigation={navigation} onLogin={handleLogin} />
      <ScrollView
        style={[styles.scrollContent]}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Account already exists. You signed up Sep 2016 using
            ........456e@gmail.com.
          </Text>

          <TouchableOpacity style={styles.loginButton} onPress={handleNavigateToValidation}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <Text style={styles.subText}>
            If the address above is your current email, please reset your
            password.
          </Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleResetPassword}>
            <Text style={styles.secondaryButtonText}>RESET YOUR PASSWORD</Text>
          </TouchableOpacity>

          <Text style={styles.subText}>
            If the address above is now outdated, please contact support.
          </Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleContactSupport}>
            <Text style={styles.secondaryButtonText}>CONTACT SUPPORT</Text>
          </TouchableOpacity>

          <Text style={styles.subText}>
            If this is not you, you can go back and try again or create a new
            account.
          </Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleCreateAccount}>
            <Text style={styles.secondaryButtonText}>CREATE NEW ACCOUNT</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.secureRow, isMobile && styles.mobileSecureRow]}>
          <Image
            source={assets.lock}
            style={[styles.lockIcon, isMobile && styles.mobileLockIcon]}
            resizeMode="contain"
          />
          <Text
            style={[styles.secureText, isMobile && styles.mobileSecureText]}>
            HIPAA Secure Communication Tools
          </Text>
        </View>
        {isMobile && <Footer />}
      </ScrollView>
      {!isMobile && <Footer />}
    </SafeAreaView>
  );
};

const createStyles = (
  scale: (val: number) => number,
  isMobile: boolean,
  screenWidth: number,
  fontScales: (val: number) => number,
) =>
  StyleSheet.create({
    flexContainer: {
      flex: 1,
      backgroundColor: color.colorF9F9F9,
    },
    scrollContent: {
      flexGrow: 1,
    },
    content: {
      alignItems: 'center',
      gap: fontScales(20),
      backgroundColor: color.white,
      padding: fontScales(20),
      marginHorizontal: isMobile ? fontScales(20) : fontScales(80),
      marginTop: fontScales(30),
    },
    title: {
      fontSize: fontScales(fontSize.fontSize16),
      textAlign: 'center',
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      marginBottom: fontScales(10),
    },
    subText: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      textAlign: 'center',
    },
    loginButton: {
      backgroundColor: color.secondary1,
      borderRadius: 8,
      paddingVertical: fontScales(12),
      paddingHorizontal: fontScales(30),
      marginBottom: fontScales(10),
    },
    loginButtonText: {
      fontFamily: font.Rubik_700b,
      fontSize: fontScales(fontSize.fontSize14),
      color: color.white,
    },
    secondaryButton: {
      borderWidth: 1,
      borderColor: color.colorDADADA,
      borderRadius: 8,
      paddingVertical: fontScales(12),
      paddingHorizontal: fontScales(30),
      marginTop: fontScales(5),
    },
    secondaryButtonText: {
      fontFamily: font.Rubik_700b,
      fontSize: fontScales(fontSize.fontSize14),
      color: color.lable1,
    },
    secureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: fontScales(40),
    },
    mobileSecureRow: {
      marginTop: fontScales(30),
    },
    lockIcon: {
      width: fontScales(16),
      height: fontScales(16),
      marginRight: fontScales(6),
    },
    mobileLockIcon: {
      width: fontScales(14),
      height: fontScales(14),
      marginRight: fontScales(4),
    },
    secureText: {
      color: color.color666666,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
    },
    mobileSecureText: {
      fontSize: fontScales(fontSize.fontSize12),
    },
  });

export default LoginSelection;
