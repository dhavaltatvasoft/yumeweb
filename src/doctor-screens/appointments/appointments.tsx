import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { color, font, fontSize } from "../../theme/color";
import LoginHeader from "../components/login-header";
import PatientDetailsPane from "../components/PatientDetailsPane";
import AppointmentActionModal from "../components/AppointmentActionModal";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface Appointment {
  name: string;
  date: string;
  type: string;
  reason: string;
  image: { uri: string };
  id: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  bloodGroup: string;
  height: string;
  weight: string;
  allergies: string;
  medicalConditions: string;
  status: string;
  rating: string;
}

interface Tab {
  label: string;
  count: number;
}

interface NavigationProp {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

export default function Appointments({
  navigation,
}: {
  navigation: NavigationProp;
}) {
  const { t } = useTranslation();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [fontScale]
  );
  const screenWidth = Dimensions.get("window").width;

  const [confirmAction, setConfirmAction] = useState(false);
  const [declineAction, setDeclineAction] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Appointment | null>(
    null
  );
  const [isPatientPaneVisible, setIsPatientPaneVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const tabWidths = useRef<number[]>([]);

  const styles = createStyles(
    scale,
    isMobile,
    screenWidth,
    fontScales,
    selectedPatient
  );

  useEffect(() => {
    if (confirmAction || declineAction) {
      setIsPatientPaneVisible(false);
    } else if (
      isMobile &&
      selectedPatient &&
      !(confirmAction || declineAction)
    ) {
      setIsPatientPaneVisible(true);
    }
  }, [isMobile, confirmAction, declineAction, selectedPatient]);

  useEffect(() => {
    if (scrollViewRef.current && isMobile) {
      let offsetX = 0;
      for (let i = 0; i < activeTab; i++) {
        offsetX += tabWidths.current[i] || 0;
      }
      const tabWidth = tabWidths.current[activeTab] || 100;
      const scrollViewWidth = screenWidth - fontScales(32);
      const scrollX = offsetX - (scrollViewWidth - tabWidth) / 2;

      scrollViewRef.current.scrollTo({
        x: Math.max(0, scrollX),
        animated: true,
      });
    }
  }, [activeTab, isMobile, screenWidth, fontScales]);

  const appointments: { [key: number]: Appointment[] } = {
    0: [
      {
        name: "Richard P. Johnson",
        date: "05-03-2022, 11:30 AM",
        type: "Video Consultancy",
        reason: "Health Checkup",
        image: { uri: "https://randomuser.me/api/portraits/men/1.jpg" },
        id: "PAT123456",
        age: 45,
        gender: "Male",
        phone: "+1 234-567-8900",
        email: "richard.johnson@example.com",
        bloodGroup: "O+",
        height: "175 cm",
        weight: "80 kg",
        allergies: "Peanuts, Pollen",
        medicalConditions: "Hypertension",
        status: "Confirmation Pending",
        rating: "4.5",
      },
      {
        name: "John A. Smith",
        date: "06-03-2022, 09:00 AM",
        type: "In-Person",
        reason: "Routine Checkup",
        image: { uri: "https://randomuser.me/api/portraits/men/2.jpg" },
        id: "PAT123460",
        age: 50,
        gender: "Male",
        phone: "+1 234-567-8904",
        email: "john.smith@example.com",
        bloodGroup: "A-",
        height: "170 cm",
        weight: "75 kg",
        allergies: "Dust",
        medicalConditions: "None",
        status: "Confirmation Pending",
        rating: "4.5",
      },
    ],
    1: [
      {
        name: "Michael R. Brown",
        date: "07-03-2022, 02:00 PM",
        type: "Video Consultancy",
        reason: "Follow-up",
        image: { uri: "https://randomuser.me/api/portraits/men/3.jpg" },
        id: "PAT123461",
        age: 40,
        gender: "Male",
        phone: "+1 234-567-8905",
        email: "michael.brown@example.com",
        bloodGroup: "B+",
        height: "180 cm",
        weight: "85 kg",
        allergies: "None",
        medicalConditions: "Asthma",
        status: "Confirmed",
        rating: "4.5",
      },
    ],
    2: [
      {
        name: "Sarah L. Davis",
        date: "08-03-2022, 03:30 PM",
        type: "In-Person",
        reason: "Annual Checkup",
        image: { uri: "https://randomuser.me/api/portraits/women/1.jpg" },
        id: "PAT123462",
        age: 35,
        gender: "Female",
        phone: "+1 234-567-8906",
        email: "sarah.davis@example.com",
        bloodGroup: "AB-",
        height: "160 cm",
        weight: "55 kg",
        allergies: "Pollen",
        medicalConditions: "None",
        status: "Confirmed",
        rating: "4.5",
      },
    ],
    3: [
      {
        name: "Emily J. Watkins",
        date: "10-03-2022, 10:00 AM",
        type: "Video Consultancy",
        reason: "Migraine",
        image: { uri: "https://randomuser.me/api/portraits/women/2.jpg" },
        id: "PAT123457",
        age: 32,
        gender: "Female",
        phone: "+1 234-567-8901",
        email: "emily.watkins@example.com",
        bloodGroup: "A+",
        height: "165 cm",
        weight: "60 kg",
        allergies: "None",
        medicalConditions: "None",
        status: "Completed",
        rating: "4.5",
      },
      {
        name: "Lisa K. Miller",
        date: "11-03-2022, 01:00 PM",
        type: "In-Person",
        reason: "Post-Surgery Check",
        image: { uri: "https://randomuser.me/api/portraits/women/3.jpg" },
        id: "PAT123463",
        age: 45,
        gender: "Female",
        phone: "+1 234-567-8907",
        email: "lisa.miller@example.com",
        bloodGroup: "O-",
        height: "170 cm",
        weight: "65 kg",
        allergies: "Penicillin",
        medicalConditions: "None",
        status: "Completed",
        rating: "4.5",
      },
    ],
    4: [
      {
        name: "Clarence Y. Bugg",
        date: "10-03-2022, 10:00 AM",
        type: "In-Person",
        reason: "High Blood Sugar",
        image: { uri: "https://randomuser.me/api/portraits/men/4.jpg" },
        id: "PAT123458",
        age: 50,
        gender: "Male",
        phone: "+1 234-567-8902",
        email: "clarence.bugg@example.com",
        bloodGroup: "B+",
        height: "180 cm",
        weight: "90 kg",
        allergies: "Dust",
        medicalConditions: "Diabetes",
        status: "Cancelled",
        rating: "4.5",
      },
    ],
    5: [
      {
        name: "David T. Wilson",
        date: "12-03-2022, 04:00 PM",
        type: "Video Consultancy",
        reason: "Eye Checkup",
        image: { uri: "https://randomuser.me/api/portraits/men/5.jpg" },
        id: "PAT123464",
        age: 28,
        gender: "Male",
        phone: "+1 234-567-8908",
        email: "david.wilson@example.com",
        bloodGroup: "O+",
        height: "175 cm",
        weight: "70 kg",
        allergies: "None",
        medicalConditions: "None",
        status: "Reschedule Requested",
        rating: "4.5",
      },
    ],
    6: [
      {
        name: "Jennifer M. Lee",
        date: "13-03-2022, 11:00 AM",
        type: "In-Person",
        reason: "General Health",
        image: { uri: "https://randomuser.me/api/portraits/women/4.jpg" },
        id: "PAT123465",
        age: 30,
        gender: "Female",
        phone: "+1 234-567-8909",
        email: "jennifer.lee@example.com",
        bloodGroup: "A+",
        height: "165 cm",
        weight: "58 kg",
        allergies: "Latex",
        medicalConditions: "None",
        status: "Confirmation Pending",
        rating: "4.5",
      },
    ],
  };

  const tabs: Tab[] = [
    { label: t("dashboard.tabs.new", "New"), count: appointments[0].length },
    {
      label: t("dashboard.tabs.today", "Today"),
      count: appointments[1].length,
    },
    {
      label: t("dashboard.tabs.upcoming", "Upcoming"),
      count: appointments[2].length,
    },
    {
      label: t("dashboard.tabs.completed", "Completed"),
      count: appointments[3].length,
    },
    {
      label: t("dashboard.tabs.cancelled", "Cancelled"),
      count: appointments[4].length,
    },
    {
      label: t("dashboard.tabs.reschedule", "Reschedule Requests"),
      count: appointments[5].length,
    },
    {
      label: t("dashboard.tabs.waitList", "Wait List"),
      count: appointments[6].length,
    },
  ];

  const handleSelectPatient = (appointment: Appointment) => {
    setSelectedPatient(appointment);
    setIsPatientPaneVisible(true);
  };

  const handleAccept = () => {
    if (isMobile) {
      setIsPatientPaneVisible(false);
    }
    setConfirmAction(true);
  };

  const handleReject = () => {
    if (isMobile) {
      setIsPatientPaneVisible(false);
    }
    setDeclineAction(true);
  };

  const closePane = () => {
    setSelectedPatient(null);
    setIsPatientPaneVisible(false);
  };

  const handleActionModalClose = () => {
    setConfirmAction(false);
    setDeclineAction(false);
    setSelectedAppointment(null);
    if (isMobile && selectedPatient) {
      setIsPatientPaneVisible(true);
    }
  };

  const handleActionModalConfirm = () => {
    setConfirmAction(false);
    setDeclineAction(false);
    setIsPatientPaneVisible(false);
    setSelectedAppointment(null);
    closePane();
  };

  const handleTabLayout = (index: number, event: any) => {
    const { width } = event.nativeEvent.layout;
    tabWidths.current[index] = width;
  };

  return (
    <>
      <View style={styles.screen}>
        <View style={styles.contentWrapper}>
          <View style={styles.mainContent}>
            <LoginHeader headerTitle="Appointments" navigation={navigation} />
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.sliderContainer}>
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {tabs.map((tab, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.tab,
                        activeTab === index && styles.activeTab,
                      ]}
                      onPress={() => setActiveTab(index)}
                      onLayout={(event) => handleTabLayout(index, event)}
                    >
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === index && styles.activeTabText,
                        ]}
                      >
                        {tab.label} ({tab.count})
                      </Text>
                      {activeTab === index && <View style={styles.underline} />}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.tableCard}>
                {isMobile ? (
                  appointments[activeTab].map((item, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => handleSelectPatient(item)}
                    >
                      <View style={styles.appointmentCard}>
                        <View style={styles.appointmentCardHeader}>
                          <Image
                            source={item.image}
                            style={styles.smallAvatar}
                          />
                          <View style={styles.appointmentCardInfo}>
                            <Text style={styles.appointmentCardName}>
                              {item.name}
                            </Text>
                            <Text style={styles.appointmentCardDetail}>
                              {t("dashboard.appointments.headers.date", "Date")}
                              : {item.date}
                            </Text>
                            <Text style={styles.appointmentCardDetail}>
                              {t(
                                "dashboard.appointments.headers.type",
                                "Consultancy Type"
                              )}
                              : {item.type}
                            </Text>
                            <Text style={styles.appointmentCardDetail}>
                              {t(
                                "dashboard.appointments.headers.reason",
                                "Reason"
                              )}
                              : {item.reason}
                            </Text>
                          </View>
                        </View>
                        {activeTab === 0 && (
                          <View style={styles.actionIcons}>
                            <TouchableOpacity
                              style={styles.markYes}
                              onPress={() => {
                                setSelectedAppointment(item);
                                setConfirmAction(true);
                              }}
                            >
                              <Icon
                                name="check"
                                size={fontScales(20)}
                                color={color.white}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.markClose}
                              onPress={() => {
                                setSelectedAppointment(item);
                                setDeclineAction(true);
                              }}
                            >
                              <Icon
                                name="close"
                                size={fontScales(20)}
                                color={color.white}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <>
                    <View style={styles.tableHeader}>
                      <Text style={[styles.tableCol, styles.nameCol]}>
                        {t("dashboard.appointments.headers.name", "Name")}
                      </Text>
                      <Text style={[styles.tableCol, styles.dateCol]}>
                        {t("dashboard.appointments.headers.date", "Date")}
                      </Text>
                      <Text style={[styles.tableCol, styles.typeCol]}>
                        {t(
                          "dashboard.appointments.headers.type",
                          "Consultancy Type"
                        )}
                      </Text>
                      <Text style={[styles.tableCol, styles.reasonCol]}>
                        {t("dashboard.appointments.headers.reason", "Reason")}
                      </Text>
                      {activeTab === 0 && (
                        <Text style={[styles.tableCol, styles.actionCol]}>
                          {t("dashboard.appointments.headers.action", "Action")}
                        </Text>
                      )}
                      {activeTab === 3 && (
                        <Text style={[styles.tableCol, styles.actionCol]}>
                          {t("dashboard.appointments.headers.rating", "Rating")}
                        </Text>
                      )}
                    </View>
                    {appointments[activeTab].map((item, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => handleSelectPatient(item)}
                      >
                        <View style={styles.tableRow}>
                          <View style={[styles.avatarCell, styles.nameCol]}>
                            <Image
                              source={item.image}
                              style={styles.smallAvatar}
                            />
                            <Text
                              style={[styles.tableCellText, styles.nameText]}
                            >
                              {item.name}
                            </Text>
                          </View>
                          <Text style={[styles.tableCol, styles.dateCol]}>
                            {item.date}
                          </Text>
                          <Text style={[styles.tableCol, styles.typeCol]}>
                            {item.type}
                          </Text>
                          <Text style={[styles.tableCol, styles.reasonCol]}>
                            {item.reason}
                          </Text>
                          {activeTab === 0 && (
                            <View
                              style={[styles.actionIcons, styles.actionCol]}
                            >
                              <TouchableOpacity
                                style={styles.markYes}
                                onPress={(e) => {
                                  e.stopPropagation();
                                  setSelectedAppointment(item);
                                  setConfirmAction(true);
                                }}
                              >
                                <Icon
                                  name="check"
                                  size={fontScales(20)}
                                  color={color.white}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.markClose}
                                onPress={(e) => {
                                  e.stopPropagation();
                                  setSelectedAppointment(item);
                                  setDeclineAction(true);
                                }}
                              >
                                <Icon
                                  name="close"
                                  size={fontScales(20)}
                                  color={color.white}
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                          {activeTab === 3 && (
                            <View
                              style={[styles.actionIcons, styles.actionCol]}
                            >
                              <TouchableOpacity style={styles.star}>
                                <FontAwesome
                                  name="star"
                                  size={fontScales(20)}
                                  color={color.color_00D193}
                                />
                              </TouchableOpacity>
                              <Text style={{ marginLeft: fontScales(8) }}>
                                {item.rating}
                              </Text>
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>

      <PatientDetailsPane
        visible={isMobile ? isPatientPaneVisible : !!selectedPatient}
        patient={selectedPatient}
        onClose={closePane}
        onAccept={handleAccept}
        onReject={handleReject}
        activeTab={activeTab}
      />
      <AppointmentActionModal
        visible={confirmAction || declineAction}
        type={confirmAction ? "accept" : "decline"}
        isRescheduleOrWaitlist={activeTab === 5 || activeTab === 6} // Reschedule or Wait List
        onCancel={handleActionModalClose}
        onConfirm={handleActionModalConfirm}
      />
    </>
  );
}

const createStyles = (
  scale: (val: number) => number,
  isMobile: boolean,
  screenWidth: number,
  fontScales: (val: number) => number,
  selectedPatient: Appointment | null
) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: color.colorF9F9F9 },
    contentWrapper: {
      flex: 1,
      flexDirection: "row",
    },
    mainContent: {
      flex: 1,
      marginRight: !isMobile && selectedPatient ? 0 : 0,
    },
    container: {
      padding: fontScales(16),
      backgroundColor: color.colorF9F9F9,
    },
    sliderContainer: {
      marginBottom: fontScales(16),
    },
    tab: {
      paddingHorizontal: fontScales(16),
      paddingVertical: fontScales(8),
      marginRight: fontScales(8),
    },
    activeTab: {
      position: "relative",
    },
    tabText: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    activeTabText: {
      fontFamily: font.Rubik_500m,
      color: color.colorFF1E97,
    },
    underline: {
      position: "absolute",
      bottom: 0,
      left: fontScales(16),
      right: fontScales(16),
      height: fontScales(2),
      backgroundColor: color.colorFF1E97,
    },
    tableCard: {
      padding: fontScales(20),
      backgroundColor: color.white,
      borderRadius: fontScales(10),
    },
    sectionTitle: {
      fontFamily: font.Rubik_500m,
      fontSize: isMobile
        ? fontScales(fontSize.fontSize20)
        : fontScales(fontSize.fontSize24),
      color: color.black,
      lineHeight: fontScales(30),
    },
    tableHeader: {
      flexDirection: "row",
      marginTop: fontScales(8),
      paddingVertical: fontScales(20),
      borderBottomWidth: 1,
      borderBottomColor: color.colorE3E3E3,
    },
    tableRow: {
      flexDirection: "row",
      marginTop: fontScales(8),
      paddingVertical: fontScales(10),
      alignItems: "center",
    },
    tableCol: {
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      lineHeight: fontScales(16),
      paddingHorizontal: fontScales(8),
    },
    nameCol: {
      flex: 3,
    },
    dateCol: {
      flex: 2,
    },
    typeCol: {
      flex: 2,
    },
    reasonCol: {
      flex: 2,
    },
    actionCol: {
      flex: 1,
    },
    avatarCell: {
      flexDirection: "row",
      alignItems: "center",
      gap: fontScales(6),
    },
    smallAvatar: {
      width: fontScales(50),
      height: fontScales(50),
      borderRadius: fontScales(25),
    },
    tableCellText: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      lineHeight: fontScales(24),
    },
    nameText: {
      flexShrink: 1,
    },
    appointmentCard: {
      marginTop: fontScales(8),
      padding: fontScales(10),
      backgroundColor: color.colorF9F9F9,
      borderRadius: fontScales(8),
      borderWidth: 1,
      borderColor: color.colorE3E3E3,
    },
    appointmentCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: fontScales(10),
    },
    appointmentCardInfo: {
      flex: 1,
      marginLeft: fontScales(10),
    },
    appointmentCardName: {
      fontSize: isMobile
        ? fontScales(fontSize.fontSize14)
        : fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      lineHeight: fontScales(24),
    },
    appointmentCardDetail: {
      fontSize: isMobile
        ? fontScales(fontSize.fontSize12)
        : fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.textLight,
      lineHeight: fontScales(20),
    },
    actionIcons: {
      flexDirection: "row",
      justifyContent: isMobile ? "flex-end" : "flex-start",
    },
    markYes: {
      height: fontScales(30),
      width: fontScales(30),
      borderRadius: fontScales(15),
      marginRight: fontScales(8),
      backgroundColor: color.color73AF00,
      justifyContent: "center",
      alignItems: "center",
    },
    star: {
      justifyContent: "center",
      alignItems: "center",
    },
    markClose: {
      height: fontScales(30),
      width: fontScales(30),
      borderRadius: fontScales(15),
      marginRight: fontScales(14),
      backgroundColor: color.colorDC1717,
      justifyContent: "center",
      alignItems: "center",
    },
    statsRow: {
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      gap: fontScales(12),
      marginBottom: fontScales(16),
    },
    stateCardContainer: {
      padding: fontScales(16),
      backgroundColor: color.white,
      borderRadius: fontScales(10),
      alignItems: "center",
      flexDirection: "row",
      width: isMobile ? "100%" : screenWidth / 4,
    },
    card: {
      padding: fontScales(20),
      borderRadius: fontScales(6),
      justifyContent: "center",
      alignItems: "center",
      height: fontScales(50),
      width: fontScales(50),
    },
    imageIcon: {
      height: fontScales(30),
      width: fontScales(30),
    },
    statCount: {
      fontSize: isMobile
        ? fontScales(fontSize.fontSize24)
        : fontScales(fontSize.fontSize30),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      marginVertical: fontScales(6),
    },
    statLabel: {
      fontSize: isMobile
        ? fontScales(fontSize.fontSize16)
        : fontScales(fontSize.fontSize20),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    row: {
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      gap: fontScales(12),
      marginBottom: fontScales(16),
    },
    cardBox: {
      flex: 1,
      backgroundColor: color.white,
      borderRadius: fontScales(8),
      padding: fontScales(20),
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: fontScales(8),
    },
    viewAll: {
      fontSize: isMobile
        ? fontScales(fontSize.fontSize14)
        : fontScales(fontSize.fontSize16),
      color: color.color7F18E5,
      fontFamily: font.Rubik_500m,
      lineHeight: fontScales(22),
    },
    rowItem: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: fontScales(6),
      height: fontScales(70),
      paddingHorizontal: fontScales(10),
    },
    ongoingHighlight: {
      backgroundColor: color.colorFFF4FA,
      borderRadius: fontScales(8),
    },
    avatar: {
      width: fontScales(50),
      height: fontScales(50),
      borderRadius: fontScales(25),
      marginRight: fontScales(10),
    },
    info: {
      flex: 1,
    },
    name: {
      fontFamily: font.Rubik_400r,
      fontSize: isMobile
        ? fontScales(fontSize.fontSize16)
        : fontScales(fontSize.fontSize18),
      color: color.lable1,
      lineHeight: fontScales(24),
    },
    reason: {
      fontFamily: font.Rubik_400r,
      fontSize: isMobile
        ? fontScales(fontSize.fontSize14)
        : fontScales(fontSize.fontSize16),
      color: color.textLight,
      lineHeight: fontScales(16),
    },
    time: {
      fontFamily: font.Rubik_400r,
      fontSize: isMobile
        ? fontScales(fontSize.fontSize14)
        : fontScales(fontSize.fontSize16),
      color: color.lable1,
      lineHeight: fontScales(24),
    },
    status: {
      color: color.colorFF1E97,
      fontFamily: font.Rubik_500m,
      fontSize: isMobile
        ? fontScales(fontSize.fontSize14)
        : fontScales(fontSize.fontSize16),
      lineHeight: fontScales(24),
    },
    rating: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      marginLeft: fontScales(4),
      fontSize: isMobile
        ? fontScales(fontSize.fontSize11)
        : fontScales(fontSize.fontSize12),
      color: color.lable1,
    },
  });
