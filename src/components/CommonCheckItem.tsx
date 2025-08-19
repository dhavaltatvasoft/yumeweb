// CommonCheckItem.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color, font, fontSize } from "../theme/color";
import { useScreenDimensions } from '../utils/DimensionsUtilities';

interface CommonCheckItemProps {
  checked?: boolean;
  label: string;
  count?: number;
  onPress: () => void;
}

const CommonCheckItem: React.FC<CommonCheckItemProps> = ({
  checked,
  label,
  count,
  onPress,
}) => {

  const {isMobile, isTablet, scaleFactor} = useScreenDimensions();
    const isMobileOrTablet = isMobile || isTablet;
    
    const scale = (value: number) => value * scaleFactor;
    const styles = createStyles(isMobile, isMobileOrTablet, scale);

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <AntDesign
        name={checked ? 'checksquare' : 'checksquareo'}
        size={scale(20)}
        color={color.color_28252C}
      />
      <Text style={styles.distTitle}>
        {label} ({count})
      </Text>
    </TouchableOpacity>
  );
};

const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  scale: (val: number) => number,
) => StyleSheet.create({
  itemContainer: {
    width: '100%',
    height: scale(30),
    marginVertical: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  distTitle: {
    fontSize: scale(16),
    fontFamily: font.Rubik_400r,
    color: color.color_28252C,
    marginLeft:scale(20),
  },
});

export default CommonCheckItem;
