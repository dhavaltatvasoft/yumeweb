// components/DateInput.tsx

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useScreenDimensions } from "../../../utils/DimensionsUtilities";
import { color, font } from "../../../theme/color";

interface DateInputProps {
  label: string;
  date: string | any;
  placegolder: string | any;
  setDate: (date: string) => void;
  labelStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
}

export interface DateInputRef {
  openPicker: () => void;
}

const DateInput = forwardRef<DateInputRef, DateInputProps>(
  ({ label, date,placegolder, setDate, labelStyle, inputContainerStyle }, ref) => {
    const { fontScale } = useScreenDimensions();
    const fontScales = useCallback((value: number) => value * fontScale, [fontScale]);
    const styles = useMemo(() => createStyles(fontScales), [fontScales]);

    const inputRef = useRef<HTMLInputElement>(null);
    const [showPicker, setShowPicker] = useState(false);

    useImperativeHandle(ref, () => ({
      openPicker: () => {
        if (Platform.OS === "web") {
          inputRef.current?.click();
        } else {
          setShowPicker(true);
        }
      },
    }));

    const handleConfirm = (selectedDate: Date) => {
      setShowPicker(false);
      const formatted = selectedDate.toISOString().split("T")[0];
      setDate(formatted);
    };

    const handleCancel = () => {
      setShowPicker(false);
    };

    const handleIconPress = () => {
      if (Platform.OS === "web") {
        inputRef.current?.click();
      } else {
        setShowPicker(true);
      }
    };

    return (
      <View style={styles.wrapper}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          <Text style={[styles.textValue, { color: date ? "#000" : "#aaa" }]}>
            {date || placegolder ||  "Select Date"}
          </Text>
          <Pressable onPress={handleIconPress}>
            <Icon name="calendar" size={fontScales(24)} color="#555" />
          </Pressable>

          {Platform.OS === "web" && (
            <input
              ref={inputRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.nativeInput}
            />
          )}
        </View>

        {Platform.OS !== "web" && (
          <DateTimePickerModal
            isVisible={showPicker}
            mode="date"
            date={date ? new Date(date) : new Date()}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </View>
    );
  }
);

const createStyles = (fontScales: (val: number) => number) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: fontScales(16),
      flex: 1,
    },
    label: {
    fontSize: fontScales(16),
               marginBottom: fontScales(6),
               color: color.lable1,
               fontFamily: font.Rubik_400r,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: fontScales(8),
      paddingVertical: fontScales(10),
      paddingHorizontal: fontScales(12),
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: fontScales(48),
      position: "relative",
    },
    textValue: {
           fontSize: fontScales(16),
               marginBottom: fontScales(6),
               color: color.lable1,
               fontFamily: font.Rubik_400r,
    },
    nativeInput: {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      opacity: 0,
      zIndex: 2,
      cursor: "pointer",
      outlineStyle: "none" as any,
    },
  });

export default DateInput;
