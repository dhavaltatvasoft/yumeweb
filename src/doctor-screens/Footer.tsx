import React, { useCallback } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useScreenDimensions} from '../utils/DimensionsUtilities';
import {color, font, fontSize} from '../theme/color';
import {useTranslation} from 'react-i18next';

const Footer = ({navigation, isShowTopBorder = false}: any) => {
  const {t} = useTranslation();
  const {isMobile, scaleFactor, fontScale} = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
            (value: number) => value * fontScale,
            [scaleFactor]
    )
  const styles = createStyles(scale, isMobile, fontScales);

  return (
    <View style={styles.container}>
      {isShowTopBorder && <View style={styles.divider} />}
      <View style={styles.detailsContainer}>
        <Text style={[styles.footerText, isMobile && {maxWidth: fontScales(100)}]}>
          {t('footer.copyright')}
        </Text>

        <View style={styles.footer_legalLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('term')}>
            <Text style={styles.footer_legalText}>
              {t('footer.legal.termsOfService')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('privacypolicy')}>
            <Text style={styles.footer_legalText}>
              {t('footer.legal.privacyPolicy')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const createStyles = (scale: (val: number) => number, isMobile: boolean, fontScales: (val: number) => number) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.color7F18E5,
      paddingHorizontal: fontScales(70),
      paddingVertical: fontScales(16),
    },
    footerText: {
      color: color.white,
      fontFamily: font.Rubik_400r,
      fontSize: isMobile
        ? fontScales(fontSize.fontSize11)
        : fontScales(fontSize.fontSize12),
      lineHeight: fontScales(16),
    },
    divider: {
      height: 1,
      backgroundColor: color.color9946EA,
      paddingHorizontal: fontScales(100),
      marginVertical: fontScales(20),
    },
    detailsContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    termsText: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      flex: 1,
    },
    footer_legalLinks: {
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
    },
    footer_legalText: {
      color: color.white,
      fontFamily: font.Rubik_400r,
      fontSize: isMobile
        ? fontScales(fontSize.fontSize11)
        : fontScales(fontSize.fontSize12),
      lineHeight: fontScales(16),
      marginHorizontal: 5,
    },
  });

export default Footer;
