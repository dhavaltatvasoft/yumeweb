import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useScreenDimensions } from "../../../utils/DimensionsUtilities";
import { font, color } from "../../../theme/color";
import { t } from "i18next";
import CustomDropdown from "../../../components/customdropdown/CustomDropdown";
import CalendarSlotSelector from "./CalendarSlots";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Adjust locale as needed
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface AppointmentBookingModalProps {
  visible: boolean;
  onClose: () => void;
  consultancyTypeTabs: string[];
  consultancyType?: string;
  setConsultancyType?: (value: string) => void;
  reasonOptions: string[];
  selectedReason?: string;
  setSelectedReason?: (value: string) => void;
  locationOptions: string[];
  selectedAppointmentLocation?: string;
  setSelectedAppointmentLocation?: (value: string) => void;
  selectedDate?: Date; // Date object
  selectedTime?: string;
  handleSlotSelection?: (date: string, time: string | null) => void;
  handleScheduleAppointment?: () => void;
  scale: (value: number) => number;
}

const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  visible,
  onClose,
  consultancyTypeTabs,
  consultancyType: initialConsultancyType,
  setConsultancyType,
  reasonOptions,
  selectedReason: initialReason,
  setSelectedReason,
  locationOptions,
  selectedAppointmentLocation: initialLocation,
  setSelectedAppointmentLocation,
  selectedDate: initialDate,
  selectedTime: initialTimeStr,
  handleSlotSelection,
  handleScheduleAppointment,
  scale,
}) => {
  const { isMobile, isMobileOrTablet, isDesktop, screenWidth } =
    useScreenDimensions();

  // Set timezone to IST and current date/time (6:06 PM IST, June 27, 2025)
  const currentDate = dayjs().tz("Asia/Kolkata");
  const initialDateStr = initialDate
    ? dayjs(initialDate).tz("Asia/Kolkata").format("YYYY-MM-DD")
    : currentDate.format("YYYY-MM-DD");
  const initialTime = initialTimeStr || "18:06"; // 6:06 PM in 24-hour format

  const [consultancyType, setLocalConsultancyType] = useState<string>(
    initialConsultancyType || consultancyTypeTabs[0]
  );
  const [selectedReason, setLocalSelectedReason] = useState<string>(
    initialReason || reasonOptions[0]
  );
  const [selectedAppointmentLocation, setLocalSelectedAppointmentLocation] =
    useState<string>(initialLocation || locationOptions[0]);
  const [selectedDate, setSelectedDate] = useState<string>(initialDateStr);
  const [selectedTime, setSelectedTime] = useState<string | null>(initialTime);

  useEffect(() => {
    const newDateStr = initialDate
      ? dayjs(initialDate).tz("Asia/Kolkata").format("YYYY-MM-DD")
      : currentDate.format("YYYY-MM-DD");
    const newTime = initialTimeStr || "18:06";
    const newConsultancyType = initialConsultancyType || consultancyTypeTabs[0];
    setLocalConsultancyType(newConsultancyType);
    setLocalSelectedReason(initialReason || reasonOptions[0]);
    setLocalSelectedAppointmentLocation(initialLocation || locationOptions[0]);
    setSelectedDate(newDateStr);
    setSelectedTime(newTime);
  }, [
    initialConsultancyType,
    initialReason,
    initialLocation,
    initialDate,
    initialTimeStr,
    consultancyTypeTabs,
    reasonOptions,
    locationOptions,
  ]);

  useEffect(() => {
    if (setConsultancyType) setConsultancyType(consultancyType);
    if (setSelectedReason) setSelectedReason(selectedReason);
    if (setSelectedAppointmentLocation)
      setSelectedAppointmentLocation(selectedAppointmentLocation);
    if (handleSlotSelection) handleSlotSelection(selectedDate, selectedTime);
  }, [
    consultancyType,
    selectedReason,
    selectedAppointmentLocation,
    selectedDate,
    selectedTime,
    setConsultancyType,
    setSelectedReason,
    setSelectedAppointmentLocation,
    handleSlotSelection,
  ]);

  const styles = useMemo(
    () =>
      screenStyle(isMobile, isMobileOrTablet, isDesktop, scale, screenWidth),
    [isMobile, isMobileOrTablet, isDesktop, scale, screenWidth]
  );

  const AppointmentBookingView = useMemo(() => {
    return (
      <View style={styles.flex1}>
        <View style={styles.modalHeader}>
          <Text style={styles.scheduleAppointmentTitle}>
            {t("doctorsDetailsSection.scheduleAppointment")}
          </Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Icon name="close" size={scale(24)} color={color.color_212121} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContent}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <Text style={styles.formLabel}>
              {t("doctorsDetailsSection.consultancyType")}
            </Text>
            <View style={styles.consultancyTypeSelectionBox}>
              <View style={styles.consultancyTypeRow}>
                {consultancyTypeTabs.map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      {
                        backgroundColor:
                          tab === consultancyType ? "#28252C" : "transparent",
                        borderWidth: tab === consultancyType ? 0 : 1,
                        borderColor:
                          consultancyType != "In-Person"
                            ? "transparent"
                            : "#E0DEE2",
                      },
                      styles.consultancyTypeButton,
                    ]}
                    onPress={() => setLocalConsultancyType(tab)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={
                        tab === consultancyType
                          ? styles.consultancyTypeTextActive
                          : styles.consultancyTypeTextInactive
                      }
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <CustomDropdown
              label={t("doctorsDetailsSection.consultancyReasonPlaceholder")}
              placeholder={t(
                "doctorsDetailsSection.consultancyReasonPlaceholder"
              )}
              value={selectedReason}
              data={reasonOptions}
              onChangeItem={(item: string) => setLocalSelectedReason(item)}
              dropdownStyle={styles.dropdown}
              containerStyle={{ height: scale(56) }}
              isMobile={isMobileOrTablet}
            />
            <CustomDropdown
              label={t("doctorsDetailsSection.selectLocationPlaceholder")}
              placeholder={t("doctorsDetailsSection.selectLocationPlaceholder")}
              value={selectedAppointmentLocation}
              data={locationOptions}
              onChangeItem={(item: string) =>
                setLocalSelectedAppointmentLocation(item)
              }
              dropdownStyle={styles.dropdown}
              containerStyle={{ height: scale(56) }}
              isMobile={isMobileOrTablet}
            />
            <View style={styles.slotSelectionHeader}>
              <Text style={styles.formLabel}>
                {t("doctorsDetailsSection.changeSlot")}
              </Text>
              <Text style={styles.selectedSlotDateText}>
                {selectedDate && dayjs(selectedDate).isValid()
                  ? dayjs(selectedDate).tz("Asia/Kolkata").format("DD MMM ddd")
                  : "Invalid Date"}
                {selectedTime && dayjs(selectedTime, "HH:mm").isValid()
                  ? ` - ${dayjs(selectedTime, "HH:mm").format("hh:mm A")}`
                  : selectedTime
                  ? ` - ${selectedTime}`
                  : ""}
              </Text>
            </View>
            <CalendarSlotSelector
              onSlotPress={(date: Date, time: string) => {
                setSelectedDate(
                  dayjs(date).tz("Asia/Kolkata").format("YYYY-MM-DD")
                );
                setSelectedTime(time);
                console.log("Slot selected:", { date, time });
              }}
              initialDate={dayjs(selectedDate).tz("Asia/Kolkata").toDate()}
              initialTime={selectedTime}
              selectedDate={dayjs(selectedDate).tz("Asia/Kolkata").toDate()}
              selectedTime={selectedTime}
              isMobile={isMobileOrTablet}
            />
            <TouchableOpacity
              onPress={() => {
                if (handleScheduleAppointment) {
                  handleScheduleAppointment();
                }
                onClose();
              }}
              style={styles.scheduleAppointmentButton}
              activeOpacity={0.7}
            >
              <Text style={styles.scheduleButtonText}>
                {t("doctorsDetailsSection.scheduleAppointmentCap")}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }, [
    t,
    consultancyType,
    selectedReason,
    selectedAppointmentLocation,
    selectedDate,
    selectedTime,
    handleScheduleAppointment,
    scale,
    consultancyTypeTabs,
    reasonOptions,
    locationOptions,
    isMobileOrTablet,
  ]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      supportedOrientations={["portrait", "landscape"]}
      statusBarTranslucent={true}
    >
      <SafeAreaView style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            {
              width: isMobileOrTablet ? "90%" : "auto", // Use 90% width on mobile
              maxHeight: isMobileOrTablet ? "80%" : "90%",
              minWidth: isMobileOrTablet ? "80%" : scale(200),
              marginHorizontal: scale(16),
              alignSelf: "center", // Center the modal
            },
          ]}
        >
          {AppointmentBookingView}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const screenStyle = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  scale: (value: number) => number,
  screenWidth: number
) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: isMobileOrTablet ? scale(16) : 0,
    },
    modalContent: {
      backgroundColor: color.white,
      borderRadius: scale(10),
      padding: scale(16),
      ...Platform.select({
        ios: {
          shadowColor: color.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: scale(16),
      paddingBottom: scale(8),
      borderBottomWidth: 1,
      borderBottomColor: color.colorE3E3E3,
    },
    scrollContent: {
      flexGrow: 1,
      maxHeight: Dimensions.get("window").height * 0.7,
    },
    flex1: { flex: 1 },
    scheduleAppointmentTitle: {
      color: color.color_28252C,
      fontSize: scale(24),
      fontFamily: font.Rubik_500m,
      marginTop: scale(10),
    },
    formLabel: {
      color: color.color_28252C,
      fontSize: scale(16),
      fontFamily: font.Rubik_400r,
      marginTop: scale(20),
    },
    consultancyTypeSelectionBox: {
      width: "100%",
      height: scale(65),
      justifyContent: "center",
      alignItems: "center",
      marginVertical: scale(10),
      borderRadius: scale(10),
      borderColor: "#E0DEE2",
      borderWidth: scale(1),
      backgroundColor: color.white,
    },
    consultancyTypeRow: {
      width: "98%",
      height: scale(58),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: scale(5),
    },
    consultancyTypeButton: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: scale(10),
    },
    consultancyTypeTextInactive: {
      color: color.color_28252C,
      fontSize: scale(16),
      fontFamily: font.Rubik_400r,
      textAlign: "center",
    },
    consultancyTypeTextActive: {
      color: color.white,
      fontSize: scale(16),
      fontFamily: font.Rubik_400r,
      textAlign: "center",
    },
    dropdown: {
      zIndex: 1000,
      elevation: 5,
      marginVertical: scale(5),
    },
    slotSelectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      paddingBottom: scale(10),
      marginHorizontal: scale(14),
    },
    selectedSlotDateText: {
      color: color.color_28252C,
      fontSize: scale(12),
      fontFamily: font.Rubik_400r,
      marginTop: scale(20),
    },
    scheduleAppointmentButton: {
      width: "100%",
      height: scale(60),
      backgroundColor: color.color_FF008A,
      marginTop: scale(16),
      borderRadius: scale(10),
      justifyContent: "center",
    },
    scheduleButtonText: {
      color: color.white,
      fontSize: scale(18),
      fontFamily: font.Rubik_500m,
      textAlign: "center",
    },
  });

export default AppointmentBookingModal;
