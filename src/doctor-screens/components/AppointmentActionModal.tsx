import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { color, font, fontSize } from "../../theme/color";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { t } from "i18next";

interface BookingActionModalProps {
  visible: boolean;
  type: "accept" | "decline";
  isRescheduleOrWaitlist?: boolean;
  isCancelRequest?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AppointmentActionModal({
  visible,
  type,
  isRescheduleOrWaitlist = false,
  isCancelRequest = false,
  onCancel,
  onConfirm,
}: BookingActionModalProps) {
  const { isMobile, scaleFactor, fontScale, width, height } =
    useScreenDimensions();

  const scale = useCallback(
    (value: number) => (isMobile ? value * scaleFactor : value),
    [isMobile, scaleFactor]
  );

  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [fontScale]
  );

  const [reason, setReason] = useState<string>("");

  const styles = createStyles(scale, fontScales, isMobile);

  const isAccept = type === "accept";

  const iconSource = isAccept
    ? require("../assets/yes.png")
    : require("../assets/no.png");

  const title = isCancelRequest
    ? "Cancel Request"
    : isAccept
    ? "Accept Request"
    : "Decline Request";
  const description =
    isRescheduleOrWaitlist && isAccept
      ? t("patientDetailsPane.bookingReqParaOne")
      : isCancelRequest
      ? t("patientDetailsPane.cancelRequestDescription")
      : isAccept
      ? `${t("patientDetailsPane.bookingReqParaOne")}\n${t(
          "patientDetailsPane.bookingReqParaTwo"
        )}`
      : t("patientDetailsPane.bookingDeclinePara");
  const placeholderText = isCancelRequest
    ? t("patientDetailsPane.cancelReason")
    : isAccept
    ? t("patientDetailsPane.meetingLink")
    : t("patientDetailsPane.reason");
  const confirmText = t("patientDetailsPane.confirm");

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      presentationStyle="overFullScreen"
    >
      <View style={[styles.overlay, { width, height }]}>
        <View
          style={[
            styles.modalContainer,
            { width: isMobile ? fontScales(320) : fontScales(400) },
          ]}
        >
          <Image source={iconSource} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>
            {description}{" "}
            {isAccept && !isRescheduleOrWaitlist && !isCancelRequest ? (
              <Text
                style={[styles.description, { fontFamily: font.Rubik_500m }]}
              >
                {t("patientDetailsPane.social")}
              </Text>
            ) : (
              ""
            )}
          </Text>
          {(isCancelRequest || type === "decline") && (
            <TextInput
              style={styles.reasonInput}
              placeholder={placeholderText}
              placeholderTextColor={color.textLight}
              value={reason}
              onChangeText={setReason}
              multiline={true}
              numberOfLines={3}
            />
          )}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>
                {t("patientDetailsPane.cancel")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                onConfirm();
              }}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (
  scale: (val: number) => number,
  fontScales: (val: number) => number,
  isMobile: boolean
) =>
  StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1200,
      elevation: 1200,
    },
    modalContainer: {
      backgroundColor: color.white,
      padding: fontScales(isMobile ? 24 : 20),
      borderRadius: fontScales(isMobile ? 16 : 12),
      alignItems: "center",
      maxWidth: "95%",
      zIndex: 1201,
      elevation: 1201,
      shadowColor: color.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    icon: {
      width: fontScales(50),
      height: fontScales(50),
      marginBottom: fontScales(16),
    },
    title: {
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      textAlign: "center",
      marginBottom: fontScales(8),
      fontSize: fontScales(32),
    },
    description: {
      fontFamily: font.Rubik_300l,
      color: color.textLight,
      lineHeight: fontScales(20),
      textAlign: "center",
      fontSize: fontScales(14),
      marginBottom: fontScales(24),
    },
    reasonInput: {
      width: "100%",
      backgroundColor: color.colorF5F5F5,
      borderWidth: 1,
      borderColor: color.color_E0DEE2,
      borderRadius: fontScales(8),
      padding: fontScales(10),
      marginBottom: fontScales(24),
      fontFamily: font.Rubik_400r,
      fontSize: fontScales(16),
      color: color.colorC8C8C8,
      textAlignVertical: "top",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    cancelButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: color.colorE3E3E3,
      borderRadius: 8,
      alignItems: "center",
      backgroundColor: color.colorF9F9F9,
      paddingVertical: fontScales(12),
      marginRight: fontScales(8),
    },
    confirmButton: {
      flex: 1,
      backgroundColor: color.color_FF008A,
      borderRadius: fontScales(8),
      alignItems: "center",
      paddingVertical: fontScales(12),
      marginLeft: fontScales(8),
    },
    cancelText: {
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      fontSize: fontScales(
        isMobile ? fontSize.fontSize16 : fontSize.fontSize14
      ),
    },
    confirmText: {
      fontFamily: font.Rubik_700b,
      color: color.white,
      fontSize: fontScales(
        isMobile ? fontSize.fontSize16 : fontSize.fontSize14
      ),
    },
  });
