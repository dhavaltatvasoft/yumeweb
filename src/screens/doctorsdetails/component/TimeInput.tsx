import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "react-native-modal-datetime-picker";
import { color, font, fontSize } from "../../../theme/color";
import { useScreenDimensions } from "../../../utils/DimensionsUtilities";

interface TimeInputProps {
  label: string;
  time: string; // "HH:MM AM/PM"
  onTimeChange: (newTime: string) => void;
  onPressIcon?: () => void;
  inputContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  minuteInterval?: number;
  isFromManage?: boolean;
}

export interface TimeInputRef {
  openTimePicker: () => void;
}

const TimeInput = forwardRef<TimeInputRef, TimeInputProps>(
  (
    {
      label,
      time,
      onTimeChange,
      onPressIcon,
      inputContainerStyle,
      labelStyle,
      minuteInterval = 15,
      isFromManage = false,
    },
    ref
  ) => {
    
      const { isMobile,fontScale } = useScreenDimensions();
        const scale = useCallback((value: number) => value * fontScale, [fontScale]);
        const styles = useMemo(() => createStyles(scale,isMobile), [scale]);
    

    const inputRef = useRef<HTMLInputElement>(null);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [pickerDate, setPickerDate] = useState<Date>(() => {
      if (!time || !time.includes(" ")) return new Date();
      return parseTimeStringToDate(time);
    });

    useEffect(() => {
      if (time && time.includes(" ")) {
        setPickerDate(parseTimeStringToDate(time));
      }
    }, [time]);

    const parseTimeStringToDate = (timeStr: string): Date => {
      const [timePart, period] = timeStr.split(" ");
      const [hours, minutes] = timePart.split(":").map(Number);
      let adjustedHours = hours;
      if (period === "PM" && hours !== 12) adjustedHours += 12;
      if (period === "AM" && hours === 12) adjustedHours = 0;
      const date = new Date();
      date.setHours(adjustedHours, minutes, 0, 0);
      return date;
    };

    const formatDateToTimeString = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date);
    };

    const handleIconPress = () => {
      if (Platform.OS === "web") {
        inputRef.current?.click();
      } else {
        setPickerVisible(true);
      }
      onPressIcon?.();
    };

    const handleConfirm = (date: Date) => {
      setPickerVisible(false);
      onTimeChange(formatDateToTimeString(date));
      setPickerDate(date);
    };

    const handleCancel = () => {
      setPickerVisible(false);
    };

    const handleWebTimeChange = (value: string) => {
      const [hours, minutes] = value.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      onTimeChange(formatDateToTimeString(date));
    };

    useImperativeHandle(ref, () => ({
      openTimePicker: () => {
        if (Platform.OS === "web") {
          inputRef.current?.click();
        } else {
          setPickerVisible(true);
        }
      },
    }));

    const convertTimeTo24Hr = () => {
      if (!time || !time.includes(" ")) return "";
      const [timePart, period] = time.split(" ");
      const [hours, minutes] = timePart.split(":").map(Number);
      let h = hours;
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      return `${h.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };

    return (
      <View style={styles.wrapper}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <TouchableOpacity
          style={[styles.inputContainer, inputContainerStyle]}
          onPress={handleIconPress}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.textValue, { color: time ? color.lable1 : "#aaa" }]}
          >
            {time || label}
          </Text>
          {isFromManage ? (
            <Icon
              name="chevron-down"
              size={scale(24)}
              color={color.textLight}
            />
          ) : (
            <Icon name="clock-o" size={scale(28)} color="#555" />
          )}
        </TouchableOpacity>

        {Platform.OS === "web" && (
          <input
            ref={inputRef}
            type="time"
            value={convertTimeTo24Hr()}
            onChange={(e) => handleWebTimeChange(e.target.value)}
            step={minuteInterval * 60}
            style={styles.nativeInput}
          />
        )}

        {Platform.OS !== "web" && (
          <DateTimePicker
            isVisible={isPickerVisible}
            mode="time"
            date={pickerDate}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            is24Hour={false}
            minuteInterval={minuteInterval as any}
          />
        )}
      </View>
    );
  }
);

const createStyles = (scale: (val: number) => number, isMobile: boolean) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: scale(16),
      flex: 1,
    },
    label: {
      // fontSize: scale(14),
      // fontFamily: font.Rubik_500m,
      // marginBottom: 6,
      // color: color.lable1,
        fontSize: scale(16),
            marginBottom: scale(6),
            color: color.lable1,
            fontFamily: font.Rubik_400r,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: color.colorE3E3E3,
      borderRadius: 8,
      paddingHorizontal: scale(14),
      paddingVertical: scale(10),
      backgroundColor: color.white,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      height: scale(48),
    },
    textValue: {
      fontSize: scale(16),
            marginBottom: scale(6),
            color: color.lable1,
            fontFamily: font.Rubik_400r,
    },
    nativeInput: {
      position: "absolute",
      right: 0,
      top: 0,
      width: "100%",
      height: "100%",
      opacity: 0,
      cursor: "pointer",
      outlineStyle: "none" as any,
    },
  });

export default TimeInput;
