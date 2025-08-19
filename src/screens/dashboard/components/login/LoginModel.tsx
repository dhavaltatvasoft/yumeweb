import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';
import StyleSheet from 'react-native-web/dist/exports/StyleSheet';
import { useTranslation } from 'react-i18next';
import { color, font, fontSize } from '../../../../theme/color';
import { userData } from '../../../../utils/dummyData';
import { useDispatch } from 'react-redux';
import { isUserLogin, setUserInfo } from '../../../../redux/actions/AuthAction';
import { useScreenDimensions } from '../../../../utils/DimensionsUtilities';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
  onLoginPress: (email: any, password: any) => void;
}

const LoginModal = ({
  visible,
  onClose,
  onForgotPassword,
  onRegister,
  onLoginPress,
}: LoginModalProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const dispatch = useDispatch();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
        (value: number) => value * fontScale,
        [scaleFactor]
      );
  const styles = createStyles(scale,fontScales);

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
      const user = userData.find(user => user.email === email);
      const authType = 'patient';
      if (!user) {
        setEmailError('userNotFound');
      } else if (user.type !== authType) {
        setEmailError('authTypeError');
      } else if (user.password !== password) {
        setPasswordError('incorrectPassword');
      } else {
        dispatch(setUserInfo(user) as any);
        dispatch(isUserLogin(true, 'patient') as any);
        onLoginPress(email, password);
      }
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('loginModal.title')}</Text>
            <TouchableOpacity onPress={onClose}>
              <IconIonic
                name="close-outline"
                size={fontScales(24)}
                color={color.color_212121}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('loginModal.emailLabel')}</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: isEmailFocus
                      ? color.secondary1
                      : color.placeholder1,
                  },
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
                <Text style={styles.errorText}>{t(`loginModal.error.${emailError}`)}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('loginModal.passwordLabel')}</Text>
              <View
                style={[
                  styles.passwordContainer,
                  { borderColor: isPasswordFocus ? null : color.placeholder1 },
                ]}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder={t('loginModal.passwordPlaceholder')}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setIsPasswordFocus(true)}
                  onBlur={() => setIsPasswordFocus(false)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  <IconIonic
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={fontScales(20)}
                    color={color.grey}
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.errorText}>{t(`loginModal.error.${passwordError}`)}</Text>
              ) : null}
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{t('loginModal.loginButton')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotPassword}>{t('loginModal.forgotPassword')}</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                {t('loginModal.registerText')}
                <Text onPress={onRegister} style={styles.registerLink}>
                  {t('loginModal.registerLink')}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (scale: (val: number) => number,fontScales: (val: number) => number) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: color.blackLight,
      justifyContent: 'center',
      alignItems: 'center',
      padding: fontScales(20),
    },
    container: {
      backgroundColor: color.white,
      borderRadius: fontScales(8),
      padding: fontScales(20),
      width: '100%',
      maxWidth: fontScales(400),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: fontScales(20),
    },
    title: {
      fontSize: fontScales(fontSize.fontSize36),
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(50),
      color: color.lable1,
    },
    form: {
      gap: fontScales(16),
    },
    inputContainer: {
      gap: fontScales(8),
    },
    label: {
      fontSize: fontScales(fontSize.fontSize16),
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    input: {
      borderWidth: 1,
      borderRadius: fontScales(8),
      padding: fontScales(12),
      fontSize: fontScales(fontSize.fontSize14),
      color: color.lable1,
      fontFamily: font.Rubik_400r,
      outlineStyle: 'none',
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
      outlineStyle: 'none',
    },
    loginButton: {
      backgroundColor: color.secondary1,
      padding: fontScales(16),
      borderRadius: fontScales(8),
      alignItems: 'center',
      marginTop: fontScales(8),
    },
    loginButtonText: {
      color: color.white,
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_700b,
    },
    forgotPassword: {
      color: color.lable1,
      textAlign: 'center',
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize12),
    },
    registerContainer: {
      alignItems: 'center',
    },
    registerText: {
      color: color.lable1,
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_400r,
      fontSize: fontScales(fontSize.fontSize16),
    },
    registerLink: {
      color: color.secondary1,
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_600sb,
      fontSize: fontScales(fontSize.fontSize16),
    },
    errorText: {
      color: color.red,
      fontSize: fontScales(fontSize.fontSize11),
      fontFamily: font.Rubik_400r,
      marginTop: fontScales(4),
      marginLeft: fontScales(4),
    },
  });

export default LoginModal;