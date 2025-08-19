import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { color, font } from "../../theme/color";

interface Props {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  editable?: boolean;
  isRightdisable?: boolean;
  textAlignVertical?: "auto" | "center" | "top" | "bottom";
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIconOpen?: React.ReactNode;
  rightIconClosed?: React.ReactNode;
  error?: boolean;
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
}

const CustomInput: React.FC<Props> = ({
  label,
  value = "",
  onChangeText,
  onRightIconPress,
  secureTextEntry = false,
  isRightdisable = false,
  placeholder = "",
  leftIcon,
  rightIconOpen,
  rightIconClosed,
  error = false,
  editable = true,
  errorText,
  containerStyle,
  inputWrapperStyle,
  labelStyle,
  textInputStyle,
  multiline = false,
  textAlignVertical = "center",
}) => {
  const inputRef = useRef<TextInput>(null);
  const { isMobile, isTablet, isDesktop, scaleFactor,fontScale } = useScreenDimensions();
  const scale = useCallback((value: number) => value * scaleFactor, [scaleFactor]);
    const fontScales = (value: number) => value * fontScale;

  const styles = useMemo(
    () => createStyles(isMobile, isMobile || isTablet, isDesktop, fontScales),
    [isMobile, isDesktop, fontScales]
  );

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleRightPress = useCallback(() => {
    setIsOpen((prev) => !prev);
    onRightIconPress?.();
  }, [onRightIconPress]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()} accessible={false}>
        <View
          style={[
            styles.inputWrapper,
            inputWrapperStyle,
            error && styles.errorBorder,
            isFocused && styles.focusedBorder,
          ]}
        >
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <View style={styles.textInputContainer}>
            <TextInput
              ref={inputRef}
              style={[
                styles.textInput,
                textInputStyle,
                multiline && { paddingVertical: scale(20) },
                error && styles.errorTextInput,
                Platform.OS === "web" && { outlineStyle: "none" as any },
              ]}
              editable={editable}
              multiline={multiline}
              textAlignVertical={textAlignVertical}
              value={value}
              secureTextEntry={secureTextEntry}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor="#aaa"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              importantForAutofill="no"
              blurOnSubmit={!multiline}
              returnKeyType={multiline ? "default" : "done"}
            />
          </View>
          <TouchableOpacity disabled={isRightdisable} onPress={handleRightPress} style={styles.rightIcon} activeOpacity={0.7}>
            {isOpen ? rightIconOpen : rightIconClosed}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      {error && errorText && <Text style={styles.errorTextMessage}>{errorText}</Text>}
    </View>
  );
};

export default CustomInput;

const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    container: {
      marginVertical: fontScales(10),
    },
    label: {
      fontSize: fontScales(16),
      marginBottom: fontScales(6),
      color: color.lable1,
      fontFamily: font.Rubik_400r,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: fontScales(8),
      paddingHorizontal: fontScales(12),
      height: fontScales(48),
      backgroundColor: "#fff",
    },
    focusedBorder: {
      borderColor: "#007BFF",
    },
    errorBorder: {
      borderColor: "#FF4D4F",
    },
    leftIcon: {
      marginRight: fontScales(8),
    },
    rightIcon: {
      marginLeft: fontScales(2),
    },
    textInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    textInput: {
      flex: 1,
      fontSize: fontScales(14),
      color: "#333",
      fontFamily: font.Rubik_400r,
      minWidth: 0,
    },
    errorTextInput: {
      color: "#FF4D4F",
    },
    errorTextMessage: {
      color: "#FF4D4F",
      fontSize: fontScales(12),
      marginTop: fontScales(4),
      fontFamily: font.Rubik_400r,
    },
  });