import React, { useCallback, useMemo } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { color, font } from "../../../theme/color";
import { useScreenDimensions } from "../../../utils/DimensionsUtilities";

interface CommonCheckItemProps {
  item?: string;
}

const CommonCheckItem: React.FC<CommonCheckItemProps> = ({ item }) => {
  const { isMobile, isTablet, isDesktop, scaleFactor, fontScale } =
    useScreenDimensions();
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );
  const styles: any = useMemo(
    () =>
      StyleSheet.create({
        itemContainer: {
          width: "100%",
          height: "auto",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: fontScales(8),
          paddingHorizontal: fontScales(12),
          backgroundColor: color.white,
        },
        distTitle: {
          fontSize: fontScales(16),
          fontFamily: font.Rubik_400r,
          color: color.color_28252C,
          marginLeft: fontScales(20),
        },
      }),
    [scaleFactor, fontScales]
  );

  return (
    <TouchableOpacity style={styles.itemContainer}>
      <FontAwesome
        name={"circle"}
        size={fontScales(10)}
        color={color.color_524F55}
      />
      <Text style={styles.distTitle}>{item}</Text>
    </TouchableOpacity>
  );
};

export default CommonCheckItem;
