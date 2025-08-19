import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { color, font, fontSize } from '../../../../theme/color';
import { useScreenDimensions } from '../../../../utils/DimensionsUtilities';

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

const ForgotPasswordModal = ({ visible, onClose }: ForgotPasswordModalProps) => {
  const { t } = useTranslation(); 
  const [email, setEmail] = useState('');
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
        (value: number) => value * fontScale,
        [scaleFactor]
      );
  const styles = createStyles(scale,fontScales);

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSubmit = () => {
    if (!email.trim()) {
      setEmailError('emailRequired'); // Use translation key
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('invalidEmail'); // Use translation key
      return;
    }

    setEmailError('');
    console.log('Valid email submitted:', email);

    onClose();
  };

  const onEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('forgotPassword.title')}</Text>
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
              <Text style={styles.label}>{t('forgotPassword.emailLabel')}</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: emailError
                      ? color.red
                      : isEmailFocus
                      ? color.lable1
                      : color.placeholder1,
                  },
                ]}
                value={email}
                onChangeText={onEmailChange}
                placeholder={t('forgotPassword.emailPlaceholder')}
                keyboardType="email-address"
                placeholderTextColor={color.placeholder1}
                onFocus={() => setIsEmailFocus(true)}
                onBlur={() => setIsEmailFocus(false)}
              />
              {emailError ? (
                <Text style={styles.errorText}>
                  {t(`forgotPassword.error.${emailError}`)}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>
                {t('forgotPassword.submitButton')}
              </Text>
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
      backgroundColor: 'white',
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
      fontSize: fontScales(fontSize.fontSize16),
      color: color.lable1,
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(24),
    },
    input: {
      borderWidth: 1,
      borderRadius: fontScales(8),
      padding: fontScales(12),
      fontSize: fontScales(fontSize.fontSize16),
      color: color.lable1,
      fontFamily: font.Rubik_400r,
    },
    submitButton: {
      backgroundColor: color.secondary1,
      padding: fontScales(16),
      borderRadius: fontScales(8),
      alignItems: 'center',
      marginTop: fontScales(8),
    },
    submitButtonText: {
      color: color.white,
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_700b,
    },
    errorText: {
      color: color.red,
      fontSize: fontScales(fontSize.fontSize11),
      marginTop: fontScales(4),
      fontFamily: font.Rubik_400r,
    },
  });

export default ForgotPasswordModal;