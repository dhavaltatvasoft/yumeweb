import React, { useCallback, useMemo } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color, font } from '../../../theme/color';
import { useScreenDimensions } from '../../../utils/DimensionsUtilities';

interface CommonCheckItemProps {
  checked?: boolean;
  label: string;
  count?: number;
  onPress: () => void;
}

const CommonCheckItem: React.FC<CommonCheckItemProps> = ({
  checked = false,
  label,
  count = 0,
  onPress,
}) => {
  const { isMobile, isTablet, scaleFactor, fontScale } = useScreenDimensions();

  const scale = (value: number) => value * scaleFactor;
  const fontScales = useCallback(
              (value: number) => value * fontScale,
              [scaleFactor]
            );
  const styles = useMemo(() => createStyles(scale,fontScales), [scaleFactor]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <AntDesign
        name={checked ? 'checksquare' : 'checksquareo'}
        size={fontScales(20)}
        color={checked ? color.buttonPink : color.color_28252C}
      />
      <Text style={styles.labelText}>
        {label} ({count})
      </Text>
    </TouchableOpacity>
  );
};

const createStyles = (scale: (val: number) => number,fontScales: (val: number) => number) =>
  StyleSheet.create({
    itemContainer: {
      width: '100%',
      height: fontScales(30),
      marginVertical: fontScales(10),
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
      marginLeft: fontScales(20),
    },
  });

export default CommonCheckItem;
