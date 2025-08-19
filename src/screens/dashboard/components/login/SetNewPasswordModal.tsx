import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { color, font, fontSize } from '../../../../theme/color';
import StyleSheet from 'react-native-web/dist/exports/StyleSheet';
import { useScreenDimensions } from '../../../../utils/DimensionsUtilities';

interface SetNewPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const SetNewPasswordModal = ({ visible, onClose, onLogin }: SetNewPasswordModalProps) => {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isConfirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
        (value: number) => value * fontScale,
        [scaleFactor]
      );
  const styles = createStyles(scale,fontScales);

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSave = () => {
    let valid = true;

    if (!newPassword.trim()) {
      setPasswordError('passwordRequired');
      valid = false;
    } else if (!validatePassword(newPassword)) {
      setPasswordError('passwordTooShort');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('confirmPasswordRequired');
      valid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('confirmPasswordMismatch');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (valid) {
      console.log('Passwords are valid.');
      onClose();
    }
  };

  const onPasswordChange = (text: string) => {
    setNewPassword(text);
    if (passwordError) setPasswordError('');
  };

  const onConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (confirmPasswordError) setConfirmPasswordError('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('setNewPassword.title')}</Text>
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
              <Text style={styles.label}>{t('setNewPassword.newPasswordLabel')}</Text>
              <View
                style={[
                  styles.passwordContainer,
                  {
                    borderColor: passwordError
                      ? color.red
                      : isPasswordFocus
                      ? color.secondary1
                      : color.placeholder1,
                  },
                ]}>
                <TextInput
                  style={styles.passwordInput}
                  value={newPassword}
                  onChangeText={onPasswordChange}
                  secureTextEntry={!showPassword}
                  placeholder={t('setNewPassword.newPasswordPlaceholder')}
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
              {passwordError ? <Text style={styles.errorText}>{t(`setNewPassword.error.${passwordError}`)}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('setNewPassword.confirmPasswordLabel')}</Text>
              <View
                style={[
                  styles.passwordContainer,
                  {
                    borderColor: confirmPasswordError
                      ? color.red
                      : isConfirmPasswordFocus
                      ? color.secondary1
                      : color.placeholder1,
                  },
                ]}>
                <TextInput
                  style={styles.passwordInput}
                  value={confirmPassword}
                  onChangeText={onConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholder={t('setNewPassword.confirmPasswordPlaceholder')}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setConfirmPasswordFocus(true)}
                  onBlur={() => setConfirmPasswordFocus(false)}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <IconIonic
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={fontScales(20)}
                    color={color.grey}
                  />
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? <Text style={styles.errorText}>{t(`setNewPassword.error.${confirmPasswordError}`)}</Text> : null}
            </View>

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>{t('setNewPassword.saveButton')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onLogin}>
              <Text style={styles.loginLink}>{t('setNewPassword.loginLink')}</Text>
            </TouchableOpacity>
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
      fontSize: fontScales(fontSize.fontSize26),
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
      fontSize: fontScales(fontSize.fontSize12),
      color: color.lable1,
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_400r,
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
    saveButton: {
      backgroundColor: color.secondary1,
      padding: fontScales(16),
      borderRadius: fontScales(8),
      alignItems: 'center',
      marginTop: fontScales(8),
    },
    saveButtonText: {
      color: color.white,
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_700b,
    },
    loginLink: {
      color: color.secondary1,
      lineHeight: fontScales(24),
      fontFamily: font.Rubik_600sb,
      fontSize: fontScales(fontSize.fontSize16),
      textAlign: 'center',
    },
    errorText: {
      color: color.red,
      fontSize: fontScales(fontSize.fontSize11),
      marginTop: fontScales(4),
      fontFamily: font.Rubik_400r,
    },
  });

export default SetNewPasswordModal;