import { TouchableOpacity,Image,Text,StyleSheet, StyleProp, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { assets } from "../assets";
import { color, font, fontSize } from "../theme/color";
import { useScreenDimensions } from "../utils/DimensionsUtilities";
import { useCallback } from "react";

export const DropdownBoxCustom = ({
    icon,
    placeholder,
    onPress,
    onLayout,
    value,
    lbcolor,
    dropdownBoxStyle,
    iconStyle,
    lableStyle,
  }: {
    icon?: any;
    placeholder?: string;
    onPress?: any;
    lbcolor?: any;
    onLayout?: any;
    dropdownBoxStyle?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<ImageStyle>;
    lableStyle?: StyleProp<TextStyle>;
    value:string;
  }) => {
    const selectionColor  = value != '' ? lbcolor : color.textPlaceHolder
        console.log("value1111",value);
        
      const {isMobile, isTablet,isDesktop, scaleFactor, fontScale} = useScreenDimensions();
      const isMobileOrTablet = isMobile || isTablet;
      const scale = (value: number) => value * scaleFactor;
      const fontScales = useCallback(
                  (value: number) => value * fontScale,
                  [scaleFactor]
                );
      const styles = createStyles(isMobile, isMobileOrTablet,isDesktop, scale, fontScales);
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
        onLayout={onLayout}
       style={[styles.dropdownBox, dropdownBoxStyle]}
       >
        {/* <Image source={icon} style={[styles.iconImage,iconStyle]} resizeMode="contain" /> */}
         {icon && (
    <Image
      source={icon}
      style={[styles.iconImage, iconStyle]}
      resizeMode="contain"
    />
  )}
        <Text
          style={[
            styles.placeholder,lableStyle,
            {color: selectionColor},
          ]}
          numberOfLines={1}>
          {value ? value : placeholder}
        </Text>
        <Image
          source={assets.arrowDown}
          style={[styles.iconImage,iconStyle,{      
            marginHorizontal: 6,
          }]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

 
const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  scale: (val: number) => number,
  fontScales: (val: number) => number
) => StyleSheet.create({
    dropdownBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: fontScales(16),
      paddingHorizontal: fontScales(10),
      marginHorizontal: fontScales(20),
     },
    iconImage: {
      width: fontScales(18),
      height:fontScales(18),
      marginRight: fontScales(6),
    },
    placeholder: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      color: color.textPlaceHolder,
      flex: 1,
      marginLeft: 6,
    },
  });