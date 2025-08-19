import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { color, font, fontSize } from '../../theme/color';
import Footer from '../Footer';
import { useScreenDimensions } from '../../utils/DimensionsUtilities';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { userData } from '../../utils/dummyData';
import { isUserLogin, setUserInfo } from '../../redux/actions/AuthAction';
import { assets } from '../../assets';
import ForgotPasswordModal from '../../screens/dashboard/components/login/ForgotPassword';
import SetNewPasswordModal from '../../screens/dashboard/components/login/SetNewPasswordModal';
import OtpVerificationModal from '../../screens/dashboard/components/login/OtpVerificationModal';
import { CountryPicker } from 'react-native-country-codes-picker';
import { createStyles } from './Login-styles';

const Login = ({ navigation }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isMobile, isTablet, scaleFactor, fontScale } = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const screenWidth = Dimensions.get('window').width;
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
          (value: number) => value * fontScale,
          [scaleFactor]
  )
  const styles = createStyles(isMobile, isMobileOrTablet, scale, screenWidth, fontScales);

  const [showLoginModal, setShowLoginModal] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showSetNewPasswordModal, setShowSetNewPasswordModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
  let valid = true;

  if (!email.trim()) {
    setEmailError('emailRequired');
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    setEmailError('invalidEmail');
    valid = false;
  } else {
    setEmailError('');
  }

  if (!password.trim()) {
    setPasswordError('passwordRequired');
    valid = false;
  } else {
    setPasswordError('');
  }

  if (valid) {
    const authType = 'doctor'

    const userByEmail = userData.find(user => user.email === email);

    if (!userByEmail) {
      setEmailError('userNotFound');
    } else if (userByEmail.type !== authType) {
      setEmailError(`authTypeError`);
    } else if (userByEmail.password !== password) {
      setPasswordError('incorrectPassword');
    } else {
      dispatch(setUserInfo(userByEmail) as any);
      dispatch(isUserLogin(true, 'doctor') as any);
    }
  }
};


  const findYourProfile = () => {
    setShowLoginModal(false);
    navigation.navigate("FindYourProfile");
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={[styles.container, isMobile && styles.mobileContainer]}>
        <Image
          style={[styles.logo, isMobile && styles.mobileLogo]}
          source={assets.yume1}
          resizeMode="contain"
        />

        <View style={[styles.containerLogin, isMobile && styles.mobileContainerLogin]}>
          <View style={[styles.header, isMobile && styles.mobileHeader]}>
            <Text style={[styles.title, isMobile && styles.mobileTitle]}>
              {t('loginModal.title')}
            </Text>
          </View>

          <View style={[styles.form, isMobile && styles.mobileForm]}>
            <View style={[styles.inputContainer, isMobile && styles.mobileInputContainer]}>
              <Text style={[styles.label, isMobile && styles.mobileLabel]}>
                {t('loginModal.emailLabel')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: isEmailFocus
                      ? color.secondary1
                      : color.placeholder1,
                  },
                  isMobile && styles.mobileInput,
                ]}
                value={email}
                onChangeText={setEmail}
                placeholder={t('loginModal.emailPlaceholder')}
                keyboardType="email-address"
                placeholderTextColor={color.placeholder1}
                onFocus={() => setIsEmailFocus(true)}
                onBlur={() => setIsEmailFocus(false)}
              />
              {emailError ? (
                <Text style={[styles.errorText, isMobile && styles.mobileErrorText]}>
                  {t(`loginModal.error.${emailError}`)}
                </Text>
              ) : null}
            </View>

            <View style={[styles.inputContainer, isMobile && styles.mobileInputContainer]}>
              <Text style={[styles.label, isMobile && styles.mobileLabel]}>
                {t('loginModal.passwordLabel')}
              </Text>
              <View
                style={[
                  styles.passwordContainer,
                  {
                    borderColor: isPasswordFocus ? color.secondary1 : color.placeholder1,
                  },
                  isMobile && styles.mobilePasswordContainer,
                ]}
              >
                <TextInput
                  style={[styles.passwordInput, isMobile && styles.mobilePasswordInput]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder={t('loginModal.passwordPlaceholder')}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setIsPasswordFocus(true)}
                  onBlur={() => setIsPasswordFocus(false)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <IconIonic
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={fontScales(18)}
                    color={color.grey}
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={[styles.errorText, isMobile && styles.mobileErrorText]}>
                  {t(`loginModal.error.${passwordError}`)}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              style={[styles.loginButton, isMobile && styles.mobileLoginButton]}
            >
              <Text style={[styles.loginButtonText, isMobile && styles.mobileLoginButtonText]}>
                {t('loginModal.loginButton')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowLoginModal(false);
                setShowForgotPasswordModal(true);
              }}
            >
              <Text style={[styles.forgotPassword, isMobile && styles.mobileForgotPassword]}>
                {t('loginModal.forgotPassword')}
              </Text>
            </TouchableOpacity>

            <View style={[styles.registerContainer, isMobile && styles.mobileRegisterContainer]}>
              <Text style={[styles.registerText, isMobile && styles.mobileRegisterText]}>
                {t('loginModal.newTo')}{' '}
                <Text onPress={findYourProfile} style={[styles.registerLink, isMobile && styles.mobileRegisterLink]}>
                  {t('loginModal.findYourProfile')}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {showCountryPicker && (
          <View style={[styles.countryPickerWrapper, isMobile && styles.mobileCountryPickerWrapper]}>
            <CountryPicker
              show={true}
              pickerButtonOnPress={item => {
                setSelectedCountryCode(item.dial_code);
                setShowCountryPicker(false);
              }}
              onBackdropPress={() => setShowCountryPicker(false)}
              style={{
                modal: {
                  width: isMobile ? Math.min(fontScales(280), screenWidth - fontScales(30)) : fontScales(300),
                  height: isMobile ? Math.min(fontScales(360), screenWidth * 1.1) : fontScales(400),
                  borderRadius: fontScales(10),
                  alignSelf: 'center',
                  backgroundColor: color.white,
                },
              }}
              lang={'en'}
            />
          </View>
        )}

        <OtpVerificationModal
          visible={showOTPModal}
          onClose={() => setShowOTPModal(false)}
          onVerify={code => console.log('Entered OTP:', code)}
          phoneNumber={`${selectedCountryCode} ${phoneNumber}`}
        />

        <ForgotPasswordModal
          visible={showForgotPasswordModal}
          onClose={() => {
            setShowForgotPasswordModal(false);
            setShowSetNewPasswordModal(true);
          }}
        />

        <SetNewPasswordModal
          visible={showSetNewPasswordModal}
          onClose={() => setShowSetNewPasswordModal(false)}
          onLogin={() => {
            setShowSetNewPasswordModal(false);
            setShowLoginModal(true);
          }}
        />
      </View>
      <Footer navigation={navigation} isShowTopBorder />
    </SafeAreaView>
  );
};



export default Login;