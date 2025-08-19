import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {color, font, fontSize} from '../../../theme/color';
import {useScreenDimensions} from '../../../utils/DimensionsUtilities';
import i18n from '../../../utils/i18n';
import {useDispatch, useSelector} from 'react-redux';
import {userLanguage} from '../../../redux/actions/AuthAction';

export type Language = 'en' | 'fr';

export type Languages = {code: Language; label: string; flag: string};

const ChangeLanguage = ({onUpdate}: any) => {
  const LANGUAGES: Languages[] = [
    {code: 'en', label: 'English', flag: '🇺🇸'},
    {code: 'fr', label: 'Français', flag: '🇫🇷'},
  ];

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {isMobile, scaleFactor, fontScale} = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
                      (value: number) => value * fontScale,
                      [scaleFactor]
                    );
  const styles = createStyles(scale, fontScales);
  const selectedLanguageData = useSelector(
    (v: any) => v.appReducer.selectedLanguage,
  );

  const [language, setLanguage] = useState<Language>(selectedLanguageData);

  const handleSave = () => {
    dispatch(userLanguage(language));
    i18n.changeLanguage(language);
  };

  const renderOption = ({item}: {item: (typeof LANGUAGES)[0]}) => (
    <TouchableOpacity
      style={[
        styles.languageOption,
        language === item.code && styles.selectedLanguage,
      ]}
      onPress={() => {
        setLanguage(item.code);
      }}>
      <Text style={[styles.flag]}>{item.flag}</Text>
      <Text style={[styles.languageLabel]}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{marginRight: isMobile ? 0 : fontScales(100)}}>
      <FlatList
        data={LANGUAGES}
        renderItem={renderOption}
        keyExtractor={item => item.code}
        style={{marginBottom: fontScales(20)}}
      />

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
    textDescriptions: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      lineHeight: fontScales(24),
      marginBottom: fontScales(10),
    },
    languageOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: fontScales(10),
      paddingHorizontal: fontScales(14),
      borderWidth: 1,
      borderColor: color.border,
      borderRadius: fontScales(8),
      marginBottom: fontScales(10),
    },
    selectedLanguage: {
      borderColor: color.secondary1,
    },
    flag: {
      fontSize: fontScales(20),
      marginRight: fontScales(12),
    },
    languageLabel: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: fontScales(10),
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

export default ChangeLanguage;
