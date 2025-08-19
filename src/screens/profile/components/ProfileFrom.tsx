import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { color, font, fontSize } from '../../../theme/color';
import { assets } from '../../../assets';
import { FormField } from '../ProfileScreen';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateUserInfo } from '../../../redux/actions/AuthAction';
import { useTranslation } from 'react-i18next';
import { useScreenDimensions } from '../../../utils/DimensionsUtilities';

const ProfileForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
                  (value: number) => value * fontScale,
                  [scaleFactor]
                );
  const styles = createStyles(isMobile, scale, fontScales);

  const userData = useSelector((v: any) => v.appReducer.userInfo);

  const [formData, setFormData] = useState<Record<FormField, string>>({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    city: '',
    zipCode: '',
    address: '',
    profilePic: '',
  });

  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [focusedField, setFocusedField] = useState<FormField | ''>('');

  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || '',
        phone: userData.phoneNumber || '',
        email: userData.email || '',
        country: userData.country || '',
        city: userData.city || '',
        zipCode: userData.zipCode || '',
        address: userData.address || '',
        profilePic: userData.profilePicture || '',
      });
    }
  }, [userData]);

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        if (selectedImage.uri) {
          setFormData((prev: any) => ({
            ...prev,
            profilePic: selectedImage.uri,
          }));
        }
      }
    });
  };

  const handleSave = () => {
    if (validate()) {
      dispatch(
        updateUserInfo({
          fullName: formData.fullName,
          phoneNumber: formData.phone,
          email: formData.email,
          country: formData.country,
          city: formData.city,
          zipCode: formData.zipCode,
          address: formData.address,
          profilePicture: formData.profilePic,
        })
      );
      Alert.alert(t('profile.successTitle'), t('profile.success'));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.profilePic) newErrors.profilePic = t('profile.validation.profilePic');
    if (!formData.fullName) newErrors.fullName = t('profile.validation.fullName');
    if (!formData.phone) newErrors.phone = t('profile.validation.phoneNumber');
    if (!formData.email) {
      newErrors.email = t('profile.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('profile.validation.emailInvalid');
    }
    if (!formData.country) newErrors.country = t('profile.validation.country');
    if (!formData.city) newErrors.city = t('profile.validation.city');
    if (!formData.zipCode) newErrors.zipCode = t('profile.validation.zipCode');
    if (!formData.address) newErrors.address = t('profile.validation.address');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderInput = (
    label: string,
    field: FormField,
    placeholder: string,
    keyboardType:
      | 'default'
      | 'email-address'
      | 'phone-pad'
      | 'number-pad' = 'default'
  ) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: errors[field]
              ? color.red
              : focusedField === field
              ? color.secondary1
              : color.placeholder1,
          },
        ]}
        placeholder={t(`profile.placeholders.${placeholder}`)}
        value={formData[field]}
        placeholderTextColor={color.placeholder1}
        onFocus={() => setFocusedField(field)}
        onBlur={() => setFocusedField('')}
        onChangeText={(value) => handleChange(field, value)}
        keyboardType={keyboardType}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <>
      <Text style={styles.pageTitle}>{t('profile.title')}</Text>
      <View style={[styles.profileHeader, { flexDirection: isMobile ? 'column' : 'row' }]}>
        <Image
          source={
            formData.profilePic ? { uri: formData.profilePic } : assets.profile
          }
          style={styles.profileImage}
        />
        <View style={{ flexShrink: 1 }}>
          <TouchableOpacity
            style={styles.changeProfileButton}
            onPress={handlePickImage}
          >
            <Text style={styles.changeProfileText}>
              {t('profile.changeProfile')}
            </Text>
          </TouchableOpacity>
          {errors.profilePic && (
            <Text style={styles.errorText}>{errors.profilePic}</Text>
          )}
        </View>
      </View>

      <View style={styles.formContainer}>
        {renderInput(t('profile.fullName'), 'fullName', 'fullName')}
        {renderInput(t('profile.phoneNumber'), 'phone', 'phoneNumber', 'phone-pad')}
        {renderInput(t('profile.email'), 'email', 'email', 'email-address')}

        <View style={styles.rowContainer}>
          <View style={[styles.formGroup, styles.formGroupThird]}>
            {renderInput(t('profile.country'), 'country', 'country')}
          </View>
          <View style={[styles.formGroup, styles.formGroupThird]}>
            {renderInput(t('profile.city'), 'city', 'city')}
          </View>
          <View style={[styles.formGroup, styles.formGroupThird]}>
            {renderInput(t('profile.zipCode'), 'zipCode', 'zipCode', 'number-pad')}
          </View>
        </View>

        {renderInput(t('profile.address'), 'address', 'address')}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {t('profile.saveChanges')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>{t('profile.cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const createStyles = (isMobile: any, scale: (val: number) => number, fontScales: (val: number) => number) =>
  StyleSheet.create({
    pageTitle: {
      fontSize: fontScales(fontSize.fontSize24),
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(30),
      color: color.lable1,
      marginBottom: fontScales(30),
    },
    profileHeader: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: fontScales(20),
      marginBottom: fontScales(30),
      flexWrap: 'wrap',
    },
    profileImage: {
      width: fontScales(100),
      height: fontScales(100),
      borderRadius: fontScales(50),
      resizeMode: 'cover',
      marginBottom: fontScales(12),
    },
    changeProfileButton: {
      borderWidth: 1,
      borderColor: color.primary1,
      paddingVertical: fontScales(8),
      paddingHorizontal: fontScales(16),
      borderRadius: fontScales(6),
      alignSelf: 'flex-start',
      minWidth: fontScales(200),
      marginTop:!isMobile ? fontScales(26) : 0
    },
    changeProfileText: {
      color: color.primary1,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(22),
      textAlign: 'center',
    },
    formContainer: {
      width: isMobile ? fontScales(280) : '100%',
    },
    formGroup: {
      marginBottom: fontScales(20),
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
    rowContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: fontScales(16),
    },
    formGroupThird: {
      flexBasis: '32%',
      flexGrow: 1,
      minWidth: fontScales(120),
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: fontScales(30),
      gap: fontScales(12),
    },
    saveButton: {
      backgroundColor: color.secondary1,
      paddingVertical: fontScales(14),
      paddingHorizontal: fontScales(30),
      borderRadius: fontScales(6),
    },
    saveButtonText: {
      color: color.white,
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_500m,
    },
    cancelButton: {
      borderWidth: 1,
      borderColor: color.placeholder1,
      paddingVertical: fontScales(14),
      paddingHorizontal: fontScales(30),
      borderRadius: fontScales(8),
    },
    cancelButtonText: {
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
    },
    errorText: {
      color: color.red,
      fontSize: fontScales(fontSize.fontSize11),
      fontFamily: font.Rubik_400r,
      marginTop: fontScales(4),
      marginLeft: fontScales(4),
    },
  });

export default ProfileForm;