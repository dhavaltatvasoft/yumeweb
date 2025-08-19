import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { color, font, fontSize } from '../../../theme/color';
import { useScreenDimensions } from '../../../utils/DimensionsUtilities';

export type FormField =
  | 'currentPassword'
  | 'newPassword'
  | 'confirmNewPassword';

const Setting = () => {
  const { t } = useTranslation();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
                  (value: number) => value * fontScale,
                  [scaleFactor]
                );
  const styles = createStyles(scale, fontScales);

  const [formData, setFormData] = useState<Record<FormField, string>>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [focusedField, setFocusedField] = useState<FormField | ''>('');

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validate = () => {
    const newErrors: Partial<Record<FormField, string>> = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = t('setting.validation.currentPasswordRequired');
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = t('setting.validation.passwordRequired');
    } else if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = t('setting.validation.passwordMinLength');
    }

    if (!formData.confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = t('setting.validation.confirmPasswordRequired');
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = t('setting.validation.passwordsDoNotMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      Alert.alert(t('setting.successTitle'), t('setting.success'));
    }
  };

  const renderInput = (
    labelKey: string,
    field: FormField,
    placeholderKey: string,
    keyboardType:
      | 'default'
      | 'email-address'
      | 'phone-pad'
      | 'number-pad' = 'default'
  ) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{t(`setting.labels.${labelKey}`)}</Text>
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
        placeholder={t(`setting.placeholders.${placeholderKey}`)}
        value={formData[field]}
        placeholderTextColor={color.placeholder1}
        onFocus={() => setFocusedField(field)}
        onBlur={() => setFocusedField('')}
        onChangeText={(value) => handleChange(field, value)}
        keyboardType={keyboardType}
        secureTextEntry
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <View style={{ marginRight: isMobile ? 0 : fontScales(100) }}>
      <Text style={styles.textDescriptions}>{t('setting.description')}</Text>
      {renderInput('currentPassword', 'currentPassword', 'currentPassword')}
      {renderInput('newPassword', 'newPassword', 'newPassword')}
      {renderInput('confirmNewPassword', 'confirmNewPassword', 'confirmNewPassword')}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{t('setting.update')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (scale: (val: number) => number, fontScales: (val: number) => number) =>
  StyleSheet.create({
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
    textDescriptions: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      lineHeight: fontScales(24),
      marginBottom: fontScales(10),
    },
    errorText: {
      color: color.red,
      fontSize: fontScales(fontSize.fontSize11),
      fontFamily: font.Rubik_400r,
      marginTop: fontScales(4),
      marginLeft: fontScales(4),
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: fontScales(10),
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
  });

export default Setting;