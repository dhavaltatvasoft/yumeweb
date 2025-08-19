import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { assets } from "../../assets";
import { color, font, fontSize } from "../../../../theme/color";
import { useScreenDimensions } from "../../../../utils/DimensionsUtilities";
import { useCallback } from "react";

export const DropdownBox = ({
  icon,
  placeholder,
  onPress,
  value,
}: {
  icon: any;
  placeholder: string;
  onPress?: any;
  value: string;
}) => {
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => value * scaleFactor;
  const fontScales = useCallback(
        (value: number) => value * fontScale,
        [scaleFactor]
      );
  const selectionColor = value !== '' ? color.textColorBlack : color.textPlaceHolder;
  const styles = createStyles(scale, isMobile, fontScales);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.dropdownBox}
    >
      <Image
        source={icon}
        style={styles.iconImage}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.placeholder,
          { color: selectionColor },
        ]}
        numberOfLines={1}
      >
        {value || placeholder}
      </Text>
      <Image
        source={assets.arrowDown}
        style={styles.iconImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const createStyles = (scale: (val: number) => number, isMobile: boolean, fontScales: (val: number) => number) =>
  StyleSheet.create({
    dropdownBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: fontScales(16),
      paddingHorizontal: fontScales(15),
    },
    iconImage: {
      width: fontScales(18),
      height: fontScales(18),
      marginRight: fontScales(6),
    },
    placeholder: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.textPlaceHolder,
      flex: 1,
      lineHeight: fontScales(20),
    },
  });