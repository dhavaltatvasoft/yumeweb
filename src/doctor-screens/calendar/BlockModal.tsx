import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { color, font, fontSize } from "../../theme/color";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";

const BlockSlotModal = ({ visible, onClose }: any) => {
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (val: number) => val * scaleFactor;
  const styles = createStyle(scale, isMobile);

  const [date, setDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isFromTimePickerVisible, setFromTimePickerVisible] = useState(false);
  const [isToTimePickerVisible, setToTimePickerVisible] = useState(false);

  const handleConfirmDate = (selectedDate: Date) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleConfirmFromTime = (selectedDate: Date) => {
    setFromTimePickerVisible(false);
    if (selectedDate) {
      setFromTime(selectedDate);
    }
  };

  const handleConfirmToTime = (selectedDate: Date) => {
    setToTimePickerVisible(false);
    if (selectedDate) {
      setToTime(selectedDate);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Block Slot</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={scale(20)} color={color.lable1} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setDatePickerVisible(true)}
          >
            <Text style={styles.inputText}>
              {date.toLocaleDateString()}
            </Text>
            <Icon name="chevron-down" size={scale(16)} color={color.textLight} />
          </TouchableOpacity>

          <View style={styles.timeContainer}>
            <View style={styles.timeInput}>
              <Text style={styles.label}>From</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setFromTimePickerVisible(true)}
              >
                <Text style={styles.inputText}>
                  {fromTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Text>
                <Icon name="chevron-down" size={scale(16)} color={color.textLight} />
              </TouchableOpacity>
            </View>

            <View style={styles.timeInput}>
              <Text style={styles.label}>To</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setToTimePickerVisible(true)}
              >
                <Text style={styles.inputText}>
                  {toTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Text>
                <Icon name="chevron-down" size={scale(16)} color={color.textLight} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
              <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
          </View>

          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            date={date}
            onConfirm={handleConfirmDate}
            onCancel={() => setDatePickerVisible(false)}
          />

          <DateTimePicker
            isVisible={isFromTimePickerVisible}
            mode="time"
            date={fromTime}
            onConfirm={handleConfirmFromTime}
            onCancel={() => setFromTimePickerVisible(false)}
            is24Hour={false}
            minuteInterval={15}
          />

          <DateTimePicker
            isVisible={isToTimePickerVisible}
            mode="time"
            date={toTime}
            onConfirm={handleConfirmToTime}
            onCancel={() => setToTimePickerVisible(false)}
            is24Hour={false}
            minuteInterval={15}
          />
        </View>
      </View>
    </Modal>
  );
};

const createStyle = (scale: any, isMobile: any) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: color.white,
      width: isMobile ? "90%" : scale(400),
      maxHeight: isMobile ? "80%" : undefined,
      borderRadius: scale(8),
      padding: isMobile ? scale(16) : scale(24),
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: scale(16),
    },
    title: {
      fontSize: scale(fontSize.fontSize18),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
    },
    label: {
      fontSize: scale(fontSize.fontSize14),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      marginBottom: scale(6),
    },
    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: scale(1),
      borderColor: color.colorE3E3E3,
      borderRadius: scale(8),
      paddingHorizontal: scale(14),
      paddingVertical: scale(10),
      backgroundColor: color.white,
      marginBottom: scale(16),
      height: scale(48),
    },
    inputText: {
      fontSize: scale(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    timeContainer: {
      flexDirection: "row",
      gap: scale(8),
      marginBottom: scale(16),
    },
    timeInput: {
      flex: 1,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: scale(12),
    },
    confirmButton: {
      flex: 1,
      backgroundColor: color.secondary1,
      padding: scale(12),
      borderRadius: scale(8),
      alignItems: "center",
      marginRight: scale(8),
    },
    buttonText: {
      color: color.white,
      fontSize: scale(fontSize.fontSize14),
      fontFamily: font.Rubik_500m,
    },
    cancelButton: {
      flex: 1,
      padding: scale(12),
      borderRadius: scale(8),
      backgroundColor: color.colorE3E3E3,
      alignItems: "center",
    },
    cancelText: {
      color: color.lable1,
      fontSize: scale(fontSize.fontSize14),
      fontFamily: font.Rubik_500m,
    },
  });

export default BlockSlotModal;