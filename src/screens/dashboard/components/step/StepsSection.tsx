import React, { useCallback } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { assets } from '../../assets';
import { useScreenDimensions } from '../../../../utils/DimensionsUtilities';
import { createStyles } from './styles';

const steps = [
  { imageIcon: assets.doctor },
  { imageIcon: assets.layer },
  { imageIcon: assets.fileMedical },
  { imageIcon: assets.stethoscope },
];

const FourSteps = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet, scaleFactor, fontScale } = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;

  const scale = (value: number) => value * scaleFactor;
  const fontScales = useCallback(
      (value: number) => value * fontScale,
      [scaleFactor]
    );
  const styles = createStyles(isMobile, isMobileOrTablet, scale, fontScales);

  return (
    <View style={[styles.container]}>
      <Text style={styles.heading}>{t('fourSteps.heading')}</Text>
      {isMobileOrTablet ? (
        <ScrollView
          contentContainerStyle={styles.mobileScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gridMobile}>
            {steps.map((step, index) => (
              <View
                key={index}
                style={[
                  styles.stepMobile,
                  index % 2 === 0 && { marginRight: fontScales(20) },
                ]}
              >
                <View style={styles.iconBox}>
                  <Image
                    source={step.imageIcon}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.title}>
                  {t(`fourSteps.steps.step${index + 1}.title`)}
                </Text>
                <Text style={styles.description}>
                  {t(`fourSteps.steps.step${index + 1}.description`)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.row}>
          {steps.map((step, index) => (
            <View
              key={index}
              style={[
                styles.step,
                index < steps.length - 1 && { marginRight: fontScales(20) },
              ]}
            >
              <View style={styles.iconBox}>
                <Image
                  source={step.imageIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>
                {t(`fourSteps.steps.step${index + 1}.title`)}
              </Text>
              <Text style={styles.description}>
                {t(`fourSteps.steps.step${index + 1}.description`)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default FourSteps;
