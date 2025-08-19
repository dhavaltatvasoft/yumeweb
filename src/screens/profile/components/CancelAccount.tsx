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

export type FormField = 'contactUs';

const CancelAccount = () => {
  const { t } = useTranslation();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
                    (value: number) => value * fontScale,
                    [scaleFactor]
                  );
  const styles = createStyles(scale, fontScales);

  const [formData, setFormData] = useState<Record<FormField, string>>({
    contactUs: '',
  });

  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [focusedField, setFocusedField] = useState<FormField | ''>('');

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.contactUs)
      newErrors.contactUs = t('cancelAccount.validation.reasonRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      Alert.alert(t('cancelAccount.successTitle'), t('cancelAccount.success'));
    }
  };

  const renderInput = (
    label: string,
    field: FormField,
    placeholderKey: string,
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
        placeholder={t(`cancelAccount.${placeholderKey}`)}
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
    <View style={{ marginRight: isMobile ? 0 : fontScales(100) }}>
      <Text style={styles.textDescriptions}>
        {t('cancelAccount.description')}
      </Text>
      {renderInput('', 'contactUs', 'placeholder')}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{t('cancelAccount.confirm')}</Text>
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
      fontFamily: font.Rubik_400r,
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

export default CancelAccount;