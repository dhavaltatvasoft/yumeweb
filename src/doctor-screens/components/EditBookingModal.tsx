import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { color, font } from "../../theme/color";
import { t } from "i18next";

interface EditBookingModalProps {
  visible: boolean;
  onClose: () => void;
  patient: any;
  onReschedule: () => void;
  onCancel: () => void;
}

export default function EditBookingModal({
  visible,
  onClose,
  patient,
  onReschedule,
  onCancel,
}: EditBookingModalProps) {
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = (value: number) => value * fontScale;

  const styles = createStyles(scale, isMobile, fontScales);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.option} onPress={onReschedule}>
              <Text style={styles.optionText}>
                {t("patientDetailsPane.rescheduleBooking")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={onCancel}>
              <Text style={styles.optionText}>
                {t("patientDetailsPane.cancelBooking")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (
  scale: (val: number) => number,
  isMobile: boolean,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: scale(100),
    },
    modalContent: {
      backgroundColor: "transparent",
      zIndex: 1002,
    },
    card: {
      backgroundColor: color.white,
      borderRadius: fontScales(8),
      width: isMobile ? "80%" : 300,
      padding: fontScales(10),
      shadowColor: color.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      flexDirection: "column",
    },
    option: {
      paddingVertical: fontScales(8),
      paddingHorizontal: fontScales(12),
      borderBottomWidth: 1,
      borderBottomColor: color.colorE3E3E3,
    },
    optionText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      textAlign: "center",
    },
  });
