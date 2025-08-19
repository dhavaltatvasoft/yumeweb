import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { color, font, fontSize } from "../../theme/color";
import { t } from "i18next";
import RatingSummaryModal from "./RatingSummaryModal";
import AppointmentBookingModal from "../../screens/doctorsdetails/component/AppointmentBookingModal";
import AppointmentActionModal from "../components/AppointmentActionModal";

interface PatientDetailsPaneProps {
  visible: boolean;
  patient: any | null;
  onClose: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onJoin?: () => void;
  activeTab?: any;
}

const PatientDetailsPane: React.FC<PatientDetailsPaneProps> = ({
  visible: initialVisible,
  patient,
  onClose,
  onAccept,
  onReject,
  onJoin,
  activeTab,
}) => {
  const { isMobile, scaleFactor, fontScale, width, isMobileApp } =
    useScreenDimensions();
  const scale = (value: number): number =>
    isMobile ? value * scaleFactor : value;
  const fontScales = useCallback(
    (value: number): number => value * fontScale,
    [fontScale]
  );
  const styles = createStyles(scale, isMobile, fontScales);

  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [paneVisible, setPaneVisible] = useState(initialVisible);
  const [editCardVisible, setEditCardVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [cardTop, setCardTop] = useState(0);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [actionType, setActionType] = useState<"accept" | "decline">("decline");
  const [isRescheduleOrWaitlist, setIsRescheduleOrWaitlist] = useState(false);
  const [isCancelRequest, setIsCancelRequest] = useState(false);
  const contentRef = useRef<View>(null);

  useEffect(() => {
    if (
      (ratingModalVisible || bookingModalVisible || actionModalVisible) &&
      (isMobile || width < 768)
    ) {
      setPaneVisible(false);
    } else if (
      !actionModalVisible &&
      !ratingModalVisible &&
      !bookingModalVisible
    ) {
      setPaneVisible(initialVisible); // Only revert to initialVisible if no modals are active
    }
  }, [
    ratingModalVisible,
    bookingModalVisible,
    actionModalVisible,
    initialVisible,
    isMobile,
    width,
  ]);

  useEffect(() => {
    if (editCardVisible) {
      setCardTop(
        patient?.type !== "In-Person" ? fontScales(240) : fontScales(320)
      );
    } else {
      setCardTop(0);
    }
  }, [editCardVisible, fontScales]);

  if (
    !paneVisible &&
    (isMobile || width < 768) &&
    !ratingModalVisible &&
    !bookingModalVisible &&
    !actionModalVisible
  )
    return null;
  if (!patient) return null;

  const handleRatingSummaryPress = () => {
    setRatingModalVisible(true);
  };

  const handleEditBookingPress = () => {
    setEditCardVisible(!editCardVisible);
  };

  const handleReschedulePress = () => {
    setEditCardVisible(false);
    setBookingModalVisible(true);
  };

  const handleCancelPress = () => {
    setEditCardVisible(false);
    setActionType("decline");
    setIsRescheduleOrWaitlist(false);
    setIsCancelRequest(true);
    setActionModalVisible(true);
  };

  const handleOutsidePress = () => {
    if (editCardVisible) {
      setEditCardVisible(false);
    } else if (actionModalVisible) {
      setActionModalVisible(false);
    }
  };

  const handleActionModalClose = () => {
    setActionModalVisible(false);
    if (isMobile && patient) {
      setPaneVisible(false);

      setActionModalVisible(false);
    }
    setIsCancelRequest(false);
    setIsRescheduleOrWaitlist(false);
  };

  const handleActionModalConfirm = () => {
    setActionModalVisible(false);
    setIsCancelRequest(false);
    setIsRescheduleOrWaitlist(false);
    setPaneVisible(false);
  };

  const handleDeclinePress = () => {
    setActionType("decline");
    setIsRescheduleOrWaitlist(true);
    setActionModalVisible(true);
    setIsCancelRequest(false);
  };

  const renderContent = () => (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.rightPane}>
        <View style={styles.modalHeader}>
          <Text style={styles.bookingId}>
            {t("patientDetailsPane.bookingId")} #
            {patient?.bookingId || "CARD00000"}
          </Text>
          <TouchableOpacity
            style={{ right: isMobile ? fontScales(10) : 0 }}
            onPress={onClose}
          >
            <Icon
              name="close"
              size={fontScales(24)}
              color={color.color_212121}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>{t("patientDetailsPane.status")}</Text>
              <Text
                style={[
                  styles.statusPending,
                  {
                    color:
                      patient.status === "Confirmed"
                        ? color.color_00D193
                        : patient.status === "Completed"
                        ? color.color_00D193
                        : patient.status === "Cancelled"
                        ? "#E1392E"
                        : color.colorFF9900,
                  },
                ]}
              >
                {patient.status || "N/A"}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>
                {t("patientDetailsPane.consultancyType")}
              </Text>
              <Text style={styles.value}>{patient.type || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>
                {t("patientDetailsPane.slotTiming")}
              </Text>
              <Text style={styles.value}>
                {patient.slot || "20 Feb, 9:00 PM"}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>
                {t("patientDetailsPane.bookedOn")}
              </Text>
              <Text style={styles.value}>
                {patient.bookedOn || "12 Feb, 12:32 PM"}
              </Text>
            </View>
          </View>

          {patient.type === "In-Person" && (
            <View style={styles.sectionSpacer}>
              <Text style={styles.label}>
                {t("patientDetailsPane.location")}
              </Text>
              <Text style={styles.value}>
                {"Heart Plus Hospital, Myrtle Avenue, Glendale, NY 11385"}
              </Text>
            </View>
          )}

          <View style={styles.sectionSpacer}>
            <Text style={styles.label}>{t("patientDetailsPane.reason")}</Text>
            <Text style={styles.value}>
              {patient.reason || "Diabetes Problem"}
            </Text>
          </View>

          {patient.status === "Confirmed" && (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.chatButton}>
                <MaterialIcon
                  name="chat"
                  size={fontScales(16)}
                  color={color.white}
                />
                <Text style={[styles.buttonRowText, { color: color.white }]}>
                  {t("patientDetailsPane.chat")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditBookingPress}
              >
                <Icon
                  name="pencil"
                  size={fontScales(16)}
                  color={color.loginDropDownText}
                />
                <Text
                  style={[
                    styles.buttonRowText,
                    { color: color.loginDropDownText },
                  ]}
                >
                  {t("patientDetailsPane.editBooking")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {patient.status === "Confirmed" && editCardVisible && (
            <View
              style={[
                styles.editCardContainer,
                { top: isMobileApp ? cardTop + 40 : cardTop, bottom: "auto" },
              ]}
            >
              <View style={styles.editCard}>
                <TouchableOpacity
                  style={styles.cardOption}
                  onPress={handleReschedulePress}
                >
                  <Text style={styles.cardOptionText}>
                    {t("patientDetailsPane.rescheduleBooking")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cardOption}
                  onPress={handleCancelPress}
                >
                  <Text style={styles.cardOptionText}>
                    {t("patientDetailsPane.cancelBooking")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Text style={styles.sectionTitle}>
            {t("patientDetailsPane.patientDetails")}
          </Text>

          <View style={styles.nameAgeRow}>
            <View style={styles.nameAgeColumn}>
              <Text style={styles.label}>{t("patientDetailsPane.name")}</Text>
              <Text style={styles.value}>{patient.name || "N/A"}</Text>
            </View>
            <View style={styles.nameAgeColumn}>
              <Text style={styles.label}>{t("patientDetailsPane.age")}</Text>
              <Text style={styles.value}>{patient.age || "N/A"} years</Text>
            </View>
          </View>

          <View style={styles.patientDetailBlock}>
            <Text style={styles.label}>{t("patientDetailsPane.phone")}</Text>
            <Text style={styles.value}>{patient.phone || "N/A"}</Text>
          </View>

          <View style={styles.patientDetailBlock}>
            <Text style={styles.label}>{t("patientDetailsPane.address")}</Text>
            <Text style={styles.value}>
              {patient.address ||
                "801 Vincent County Rd Edgewood, Texas(TX), 75117"}
            </Text>
          </View>

          <Text style={styles.label}>
            {t("patientDetailsPane.registrationForm")}
          </Text>
          <View style={styles.docContainer}>
            <Image
              source={require("../assets/docfile.png")}
              height={fontScales(20)}
              width={fontScales(20)}
              resizeMode="contain"
              style={{ height: fontScales(20), width: fontScales(20) }}
            />
            <Text style={styles.docName}>Stellina_Appointment.docx</Text>
          </View>

          {patient.status === "Completed" && (
            <View style={styles.feedbackContainer}>
              <View style={styles.feedbackRow}>
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/75.jpg",
                  }}
                  style={styles.avatar}
                />
                <View style={styles.feedbackDetails}>
                  <Text style={styles.ratingText}>Jonathon Parker</Text>
                  <Text style={styles.ratingDate}>20 Mar 2020, 10:30 AM</Text>
                  <View style={styles.starRating}>
                    <Text style={styles.star}>★★★★☆</Text>
                    <TouchableOpacity onPress={handleRatingSummaryPress}>
                      <Text style={styles.ratingSummaryText}>
                        {t("dashboard.appointments.ratingSummary")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text style={styles.feedbackText}>
                He is very knowledgeable and helpful. I was recommended by a
                friend to see her and I'm very happy I decided to do that. I
                truly feel with her desire to help that I'll find out the root
                of all the issues I’ve been facing lately
              </Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            {patient.status === "Confirmed" ? (
              <>
                <Text style={styles.timerText}>
                  {activeTab === 2
                    ? t("patientDetailsPane.appointmentUpcoming")
                    : t("patientDetailsPane.appointmentStart")}
                </Text>
                <TouchableOpacity
                  disabled={activeTab === 2}
                  style={[
                    styles.joinButton,
                    {
                      backgroundColor:
                        activeTab === 2
                          ? color.colorBFBEC0
                          : color.color_FF008A,
                    },
                  ]}
                  onPress={onJoin}
                >
                  <Text style={styles.joinButtonText}>
                    {t("patientDetailsPane.join")}
                  </Text>
                </TouchableOpacity>
              </>
            ) : patient.status === "Confirmation Pending" ||
              patient.status === "Reschedule Requested" ||
              activeTab === 6 ? (
              <View style={styles.horizontalButtonContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => {
                    setActionType("accept");
                    setIsRescheduleOrWaitlist(true);
                    setActionModalVisible(true);
                  }}
                >
                  <Text style={styles.buttonText}>
                    {t("patientDetailsPane.accept")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={handleDeclinePress}
                >
                  <Text style={[styles.buttonText, { color: color.black }]}>
                    {t("patientDetailsPane.decline")}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : patient.status !== "Completed" &&
              patient.status !== "Cancelled" ? (
              <View style={styles.horizontalButtonContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => {
                    setActionType("accept");
                    setIsRescheduleOrWaitlist(false);
                    setActionModalVisible(true);
                  }}
                >
                  <Text style={styles.buttonText}>
                    {t("patientDetailsPane.accept")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={handleDeclinePress}
                >
                  <Text style={[styles.buttonText, { color: color.black }]}>
                    {t("patientDetailsPane.decline")}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      {isMobile || width < 768 ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={paneVisible}
          onRequestClose={onClose}
        >
          <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={[styles.modalOverlay, { zIndex: 999 }]}>
              <ScrollView
                style={[styles.modalContent, { zIndex: 1001, elevation: 1001 }]}
              >
                {renderContent()}
              </ScrollView>
              {editCardVisible && (
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                  <View style={styles.overlay} />
                </TouchableWithoutFeedback>
              )}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : (
        <View style={[styles.webWrapper, { zIndex: 1000 }]}>
          <TouchableOpacity
            style={[styles.webOverlay, { zIndex: 999 }]}
            onPress={onClose}
          />
          {renderContent()}
          {editCardVisible && (
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
          )}
        </View>
      )}
      <RatingSummaryModal
        visible={ratingModalVisible}
        onClose={() => setRatingModalVisible(false)}
        ratingData={{
          reviewerName: "Jonathon Parker",
          reviewDate: "20 Mar 2020, 10:30 AM",
          rating: "",
          feedback:
            "He is very knowledgeable and helpful. I was recommended by a friend to see her and I'm very happy I decided to do that. I truly feel with her desire to help that I'll find out the root of all the issues I’ve been facing lately",
        }}
      />
      <AppointmentBookingModal
        visible={bookingModalVisible}
        onClose={() => setBookingModalVisible(false)}
        consultancyTypeTabs={["Video-Consultant", "In-Person"]}
        consultancyType={
          patient?.type != "In-Person"
            ? "Video-Consultant"
            : patient?.type || "In-Person"
        }
        setConsultancyType={() => {}}
        reasonOptions={["Diabetes Problem", "General Checkup"]}
        selectedReason={patient?.reason || "Diabetes Problem"}
        setSelectedReason={() => {}}
        locationOptions={["Heart Plus Hospital", "Other Location"]}
        selectedAppointmentLocation={
          patient?.type === "In-Person" ? "Heart Plus Hospital" : ""
        }
        setSelectedAppointmentLocation={() => {}}
        selectedDate={patient?.slot ? new Date(patient.slot) : new Date()}
        selectedTime={
          patient?.slot ? patient.slot.split(", ")[1] || "10:30 AM" : "10:30 AM"
        }
        handleScheduleAppointment={() => {
          setBookingModalVisible(false);
        }}
        scale={fontScales}
      />
      <AppointmentActionModal
        visible={actionModalVisible}
        type={actionType}
        isRescheduleOrWaitlist={isRescheduleOrWaitlist}
        isCancelRequest={isCancelRequest}
        onCancel={handleActionModalClose}
        onConfirm={handleActionModalConfirm}
      />
    </>
  );
};

const createStyles = (
  scale: (val: number) => number,
  isMobile: boolean,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    webWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    },
    webOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
    rightPane: {
      backgroundColor: color.white,
      width: isMobile ? "100%" : fontScales(550),
      height: !isMobile ? "100%" : undefined,
      position: !isMobile ? "absolute" : "relative",
      right: !isMobile ? 0 : undefined,
      top: !isMobile ? 0 : undefined,
      bottom: !isMobile ? 0 : undefined,
      shadowColor: color.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      zIndex: 1001,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      elevation: 999,
    },
    modalContent: {
      backgroundColor: color.white,
      borderRadius: fontScales(6),
      width: "90%",
      maxHeight: "80%",
      shadowColor: color.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 1001,
      zIndex: 1001,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: fontScales(24),
      paddingTop: fontScales(24),
      paddingBottom: fontScales(20),
    },
    scrollContent: {
      flexGrow: 1,
    },
    scrollContentContainer: {
      paddingHorizontal: fontScales(24),
      paddingBottom: fontScales(20),
    },
    bookingId: {
      fontSize: isMobile ? fontScales(26) : fontScales(30),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: fontScales(12),
    },
    infoColumn: {
      flex: 1,
      marginRight: fontScales(12),
    },
    label: {
      fontSize: fontScales(14),
      color: color.color_535156,
      fontFamily: font.Rubik_400r,
      marginBottom: fontScales(4),
      lineHeight: fontScales(20),
    },
    value: {
      fontSize: fontScales(18),
      color: color.color_28252C,
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(20),
    },
    statusPending: {
      fontSize: fontScales(18),
      color: color.colorFF9900,
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(20),
    },
    sectionSpacer: {
      marginTop: fontScales(12),
      marginBottom: fontScales(24),
    },
    sectionTitle: {
      fontSize: isMobile ? fontScales(20) : fontScales(24),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      marginVertical: fontScales(10),
      lineHeight: fontScales(50),
    },
    nameAgeRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: fontScales(20),
    },
    nameAgeColumn: {
      flex: 1,
      marginRight: fontScales(12),
    },
    patientDetailBlock: {
      marginBottom: fontScales(20),
    },
    docContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f3f3f3",
      padding: fontScales(10),
      borderRadius: fontScales(6),
    },
    docName: {
      fontSize: fontScales(14),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      marginLeft: fontScales(8),
      lineHeight: fontScales(20),
    },
    buttonContainer: {
      flexDirection: "column",
      alignItems: "center",
      paddingHorizontal: fontScales(24),
      paddingVertical: fontScales(16),
      marginTop: fontScales(20),
    },
    horizontalButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    acceptButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color.color_FF008A,
      paddingVertical: fontScales(12),
      borderRadius: fontScales(6),
      marginRight: fontScales(12),
      width: "48%",
    },
    rejectButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color.white,
      paddingVertical: fontScales(12),
      borderRadius: fontScales(6),
      borderWidth: 1,
      borderColor: color.colorE3E3E3,
      width: "48%",
    },
    buttonText: {
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize14),
      color: color.white,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: fontScales(0),
      paddingHorizontal: isMobile ? fontScales(10) : 0,
    },
    chatButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color.color_00D193,
      paddingVertical: fontScales(8),
      paddingHorizontal: fontScales(12),
      borderRadius: fontScales(6),
      marginRight: fontScales(8),
      maxWidth: isMobile ? "48%" : "auto",
    },
    editButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color.white,
      paddingVertical: fontScales(8),
      paddingHorizontal: fontScales(12),
      borderRadius: fontScales(6),
      borderWidth: 1,
      borderColor: color.colorE3E3E3,
      marginRight: fontScales(8),
      maxWidth: isMobile ? "48%" : "auto",
    },
    buttonRowText: {
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize14),
      color: color.color_28252C,
      marginLeft: fontScales(6),
    },
    timerText: {
      fontFamily: font.Rubik_400r,
      fontSize: fontScales(14),
      color: color.color_28252C,
      textAlign: "center",
      marginBottom: fontScales(12),
      lineHeight: fontScales(18),
    },
    joinButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color.color_FF008A,
      paddingVertical: fontScales(12),
      borderRadius: fontScales(6),
      width: "100%",
      marginTop: fontScales(11),
    },
    joinButtonText: {
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize14),
      color: color.white,
    },
    feedbackContainer: {
      marginTop: fontScales(20),
      padding: fontScales(16),
      backgroundColor: "#f3f3f3",
      borderRadius: fontScales(8),
    },
    ratingSummary: {
      alignItems: "flex-start",
    },
    ratingText: {
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(16),
      color: color.color_28252C,
      marginBottom: fontScales(4),
    },
    ratingDate: {
      fontFamily: font.Rubik_400r,
      fontSize: fontScales(12),
      color: color.color_535156,
      marginBottom: fontScales(8),
    },
    starRating: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: fontScales(8),
    },
    star: {
      fontSize: fontScales(16),
      color: color.colorFF9900,
      marginRight: fontScales(8),
    },
    ratingSummaryText: {
      fontFamily: font.Rubik_400r,
      fontSize: fontScales(12),
      color: color.color_535156,
    },
    feedbackText: {
      fontFamily: font.Rubik_400r,
      fontSize: fontScales(14),
      color: color.color_28252C,
      lineHeight: fontScales(20),
    },
    avatar: {
      width: fontScales(40),
      height: fontScales(40),
      borderRadius: fontScales(20),
      marginRight: fontScales(12),
    },
    feedbackRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: fontScales(12),
    },
    feedbackDetails: {
      flex: 1,
    },
    editCardContainer: {
      position: "absolute",
      right: isMobile ? fontScales(20) : fontScales(40),
      zIndex: 1002,
    },
    editCard: {
      backgroundColor: color.white,
      borderRadius: fontScales(6),
      width: isMobile ? fontScales(200) : fontScales(200),
      padding: fontScales(10),
      shadowColor: color.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      alignSelf: "center",
      flexDirection: "column",
    },
    cardOption: {
      paddingVertical: fontScales(10),
      paddingHorizontal: fontScales(10),
    },
    cardOptionText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
      textAlign: "center",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    },
  });

export default PatientDetailsPane;
