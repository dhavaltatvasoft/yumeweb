import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { color, font, fontSize } from '../../../../theme/color';
import StyleSheet from 'react-native-web/dist/exports/StyleSheet';
import { CountryPicker } from 'react-native-country-codes-picker';
import OtpVerificationModal from './OtpVerificationModal';
import { useScreenDimensions } from '../../../../utils/DimensionsUtilities';
import { createStyles } from './register-style';

interface RegisterFormProps {
  onBack: () => void;
  visible: boolean;
  onClosePress: () => void;
  onLogin: () => void;
}

const RegisterForm = ({ onBack, visible, onClosePress, onLogin }: RegisterFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    country: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [countryFocus, setCountryFocus] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);
  const [zipFocus, setZipFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

  const [showOTPModal, setShowOTPModal] = useState(false);

  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
        (value: number) => value * fontScale,
        [scaleFactor]
      );
  const styles = createStyles(isMobile, scale, fontScales);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName) newErrors.fullName = 'fullNameRequired';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'phoneNumberRequired';
    if (!formData.email) {
      newErrors.email = 'emailRequired';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'emailInvalid';
    }
    if (!formData.country) newErrors.country = 'countryRequired';
    if (!formData.city) newErrors.city = 'cityRequired';
    if (!formData.zipCode) newErrors.zipCode = 'zipCodeRequired';
    if (!formData.password) {
      newErrors.password = 'passwordRequired';
    } else if (formData.password.length < 6) {
      newErrors.password = 'passwordTooShort';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'confirmPasswordMismatch';
    }
    if (!acceptTerms) newErrors.terms = 'termsRequired';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onClickTermsOfService = () => {};

  const onClickPrivacyPolicy = () => {};

  const handleRegister = () => {
    if (validate()) {
      const userDetails = {
        ...formData,
        countryCode: selectedCountryCode,
        acceptedTerms: acceptTerms,
      };
      setShowOTPModal(true);
      console.log('Form submitted:', userDetails);
    }
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('registerForm.title')}</Text>
            <TouchableOpacity onPress={onBack}>
              <IconIonic
                name="close-outline"
                size={fontScales(24)}
                color={color.color_212121}
                onPress={onClosePress}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: fontScales(20) }}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('registerForm.fullNameLabel')}</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.fullName
                      ? color.red
                      : fullNameFocus
                      ? color.secondary1
                      : color.placeholder1,
                  },
                ]}
                placeholder={t('registerForm.fullNamePlaceholder')}
                value={formData.fullName}
                placeholderTextColor={color.placeholder1}
                onFocus={() => setFullNameFocus(true)}
                onBlur={() => setFullNameFocus(false)}
                onChangeText={(text) =>
                  setFormData({ ...formData, fullName: text })
                }
              />
              {errors.fullName && (
                <Text style={styles.errorText}>{t(`registerForm.error.${errors.fullName}`)}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('registerForm.phoneNumberLabel')}</Text>
              <View
                style={[
                  styles.phoneInputContainer,
                  {
                    borderColor: errors.phoneNumber
                      ? color.red
                      : phoneFocus
                      ? color.secondary1
                      : color.placeholder1,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => setShowCountryPicker(true)}
                  style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>
                    {selectedCountryCode}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.phoneInput,
                    {
                      borderColor: errors.phoneNumber
                        ? color.red
                        : phoneFocus
                        ? color.secondary1
                        : color.placeholder1,
                    },
                  ]}
                  placeholder={t('registerForm.phoneNumberPlaceholder')}
                  keyboardType="phone-pad"
                  value={formData.phoneNumber}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setPhoneFocus(true)}
                  onBlur={() => setPhoneFocus(false)}
                  onChangeText={(text) =>
                    setFormData({ ...formData, phoneNumber: text })
                  }
                />
              </View>
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{t(`registerForm.error.${errors.phoneNumber}`)}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('registerForm.emailLabel')}</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.email
                      ? color.red
                      : emailFocus
                      ? color.secondary1
                      : color.placeholder1,
                  },
                ]}
                placeholder={t('registerForm.emailPlaceholder')}
                keyboardType="email-address"
                value={formData.email}
                placeholderTextColor={color.placeholder1}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
              {errors.email && (
                <Text style={styles.errorText}>{t(`registerForm.error.${errors.email}`)}</Text>
              )}
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: fontScales(8) }]}>
                <Text style={styles.label}>{t('registerForm.countryLabel')}</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: errors.country
                        ? color.red
                        : countryFocus
                        ? color.secondary1
                        : color.placeholder1,
                    },
                  ]}
                  placeholder={t('registerForm.countryPlaceholder')}
                  value={formData.country}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setCountryFocus(true)}
                  onBlur={() => setCountryFocus(false)}
                  onChangeText={(text) =>
                    setFormData({ ...formData, country: text })
                  }
                />
                {errors.country && (
                  <Text style={styles.errorText}>{t(`registerForm.error.${errors.country}`)}</Text>
                )}
              </View>

              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.label}>{t('registerForm.cityLabel')}</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: errors.city
                        ? color.red
                        : cityFocus
                        ? color.secondary1
                        : color.placeholder1,
                    },
                  ]}
                  placeholder={t('registerForm.cityPlaceholder')}
                  value={formData.city}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setCityFocus(true)}
                  onBlur={() => setCityFocus(false)}
                  onChangeText={(text) => setFormData({ ...formData, city: text })}
                />
                {errors.city && (
                  <Text style={styles.errorText}>{t(`registerForm.error.${errors.city}`)}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('registerForm.zipCodeLabel')}</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.zipCode
                      ? color.red
                      : zipFocus
                      ? color.secondary1
                      : color.placeholder1,
                  },
                ]}
                placeholder={t('registerForm.zipCodePlaceholder')}
                keyboardType="numeric"
                value={formData.zipCode}
                placeholderTextColor={color.placeholder1}
                onFocus={() => setZipFocus(true)}
                onBlur={() => setZipFocus(false)}
                onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
              />
              {errors.zipCode && (
                <Text style={styles.errorText}>{t(`registerForm.error.${errors.zipCode}`)}</Text>
              )}
            </View>

            <View style={[styles.inputContainer]}>
              <Text style={styles.label}>{t('registerForm.passwordLabel')}</Text>
              <View
                style={[
                  styles.passwordContainer,
                  {
                    borderColor: errors.password
                      ? color.red
                      : passwordFocus
                      ? color.secondary1
                      : color.placeholder1,
                  },
                ]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder={t('registerForm.passwordPlaceholder')}
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}>
                  <IconIonic
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={fontScales(20)}
                    color={color.grey}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{t(`registerForm.error.${errors.password}`)}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('registerForm.confirmPasswordLabel')}</Text>
              <View
                style={[
                  styles.passwordContainer,
                  {
                    borderColor: errors.confirmPassword
                      ? color.red
                      : confirmPasswordFocus
                      ? color.secondary1
                      : color.placeholder1,
                  },
                ]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder={t('registerForm.confirmPasswordPlaceholder')}
                  secureTextEntry={!showConfirmPassword}
                  value={formData.confirmPassword}
                  placeholderTextColor={color.placeholder1}
                  onFocus={() => setConfirmPasswordFocus(true)}
                  onBlur={() => setConfirmPasswordFocus(false)}
                  onChangeText={(text) =>
                    setFormData({ ...formData, confirmPassword: text })
                  }
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <IconIonic
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={fontScales(20)}
                    color={color.grey}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{t(`registerForm.error.${errors.confirmPassword}`)}</Text>
              )}
            </View>

            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAcceptTerms(!acceptTerms)}>
                <Icon
                  name={acceptTerms ? 'check-square' : 'square-o'}
                  size={fontScales(20)}
                  color={color.secondary1}
                />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                {t('registerForm.termsText', {
                  termsLink: (
                    <Text
                      onPress={() => onClickTermsOfService()}
                      style={{ textDecorationLine: 'underline' }}>
                      {t('registerForm.termsLink')}
                    </Text>
                  ),
                  privacyLink: (
                    <Text
                      onPress={() => onClickPrivacyPolicy()}
                      style={{ textDecorationLine: 'underline' }}>
                      {t('registerForm.privacyLink')}
                    </Text>
                  ),
                })}
              </Text>
            </View>
            {errors.terms && (
              <Text style={styles.errorText}>{t(`registerForm.error.${errors.terms}`)}</Text>
            )}

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}>
              <Text style={styles.registerButtonText}>{t('registerForm.registerButton')}</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                {t('registerForm.loginText')}
                <Text style={styles.loginLink} onPress={onLogin}>
                  {t('registerForm.loginLink')}
                </Text>
              </Text>
            </View>
          </ScrollView>

          {showCountryPicker && (
            <View style={styles.countryPickerWrapper}>
              <CountryPicker
                show={true}
                pickerButtonOnPress={(item) => {
                  setSelectedCountryCode(item.dial_code);
                  setShowCountryPicker(false);
                }}
                onBackdropPress={() => setShowCountryPicker(false)}
                style={{
                  modal: {
                    width: fontScales(300),
                    height: fontScales(400),
                    borderRadius: fontScales(10),
                    alignSelf: 'center',
                  },
                }}
                lang={'en'}
              />
            </View>
          )}

          <OtpVerificationModal
            visible={showOTPModal}
            onClose={() => setShowOTPModal(false)}
            onVerify={(code) => console.log('Entered OTP:', code)}
            phoneNumber={`${selectedCountryCode} ${formData.phoneNumber}`}
          />
        </View>
      </View>
    </Modal>
  );
};

export default RegisterForm;