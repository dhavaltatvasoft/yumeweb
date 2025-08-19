import {useCallback, useRef} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {color, font, fontSize} from '../../../../theme/color';
import {assets} from '../../assets';
import {useScreenDimensions} from '../../../../utils/DimensionsUtilities';

export const HoverAbleCard = ({doctor, style}: any) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const elevationAnim = useRef(new Animated.Value(3)).current;

  const shadowOpacityAnim = useRef(new Animated.Value(0)).current;
  const shadowRadiusAnim = useRef(new Animated.Value(0)).current;

  const {isMobile, scaleFactor, fontScale} = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
   const fontScales = useCallback(
      (value: number) => value * fontScale,
      [scaleFactor]
    );
  const styles = createStyles(scale,fontScales);

  const handleHoverIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.03,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(elevationAnim, {
        toValue: 6,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(shadowOpacityAnim, {
        toValue: 0.2, 
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(shadowRadiusAnim, {
        toValue: 6, 
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleHoverOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(elevationAnim, {
        toValue: 3,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(shadowOpacityAnim, {
        toValue: 0, 
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(shadowRadiusAnim, {
        toValue: 0, 
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Pressable onHoverIn={handleHoverIn} onHoverOut={handleHoverOut}>
      <Animated.View
        style={[
          styles.card,
          style,
          {
            transform: [{scale: scaleAnim}],
            elevation: 0,
            // shadowColor: color.shadowColor,
            // shadowOffset: {width: 0, height: 2},
            // shadowOpacity: shadowOpacityAnim,
            // shadowRadius: shadowRadiusAnim,
          },
        ]}>
        <View style={styles.cardHeaderContainer}>
          <Image source={{uri: doctor.image}} style={styles.doctorImage} />
          <View style={styles.ratingContainer}>
            <Image
              style={styles.ratingStart}
              source={assets.ratingStar}
              resizeMode="contain"
            />
            <Text style={styles.ratingText}>{doctor.rating}</Text>
          </View>
        </View>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <Text style={styles.hospital}>{doctor.hospital}</Text>
        <Text style={styles.location}>{doctor.location}</Text>
      </Animated.View>
    </Pressable>
  );
};

const createStyles = (scale: (val: number) => number,fontScales: (val: number) => number) =>
  StyleSheet.create({
    card: {
      backgroundColor: color.white,
      borderRadius: fontScales(8),
      paddingStart: fontScales(24),
      paddingTop: fontScales(24),
      paddingBottom: fontScales(24),
      minWidth: fontScales(240),
      width: '100%',
    },
    cardHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    doctorImage: {
      width: fontScales(120),
      height: fontScales(120),
      borderRadius: fontScales(8),
      marginBottom: fontScales(12),
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: fontScales(8),
      backgroundColor: color.doctorRatingContainer,
      borderTopLeftRadius: fontScales(4),
      borderBottomLeftRadius: fontScales(4),
      position: 'absolute',
      right: 0,
      padding: fontScales(6),
    },
    ratingStart: {
      height: fontScales(18),
      width: fontScales(18),
    },
    ratingText: {
      marginLeft: fontScales(4),
      color: color.white,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
    },
    doctorName: {
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
      color: color.lable1,
      marginBottom: fontScales(4),
    },
    specialty: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.primary1,
      marginBottom: fontScales(4),
      lineHeight: fontScales(20),
    },
    hospital: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      lineHeight: fontScales(20),
      color: color.textLight,
      marginBottom: 2,
    },
    location: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.textLight,
      lineHeight: fontScales(20),
    },
  });
