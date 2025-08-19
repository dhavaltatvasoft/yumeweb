import React, { useRef, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import LoginHeader from "../components/login-header";
import { color, font, fontSize } from "../../theme/color";
import { useTranslation } from "react-i18next";
import ProfileForm from "../../screens/profile/components/ProfileFrom";
import Profile from "./Profile";

// Define tab interface with component mapping
interface Tab {
  id: string;
  label: string;
  component: React.ReactNode;
}

const DoctorProfile = ({ navigation }: any) => {
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const screenWidth = Dimensions.get("window").width;
  const scale = (val: number) => val * fontScale;
  const styles = createStyle(scale, isMobile, screenWidth);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const tabWidths = useRef<number[]>([]);

  // Define tabs with corresponding components
  const tabs: Tab[] = [
    { id: "profile", label: t("profile.tabs.profileInfo", "Profile Information"), component: <Profile /> },
    { id: "overview", label: t("profile.tabs.overview", "Overview"), component: <Text>Overview Content</Text> },
    { id: "location", label: t("profile.tabs.location", "Location"), component: <Text>Location Content</Text> },
    { id: "reviews", label: t("profile.tabs.reviews", "Reviews"), component: <Text>Reviews Content</Text> },
    { id: "photos", label: t("profile.tabs.photosVideos", "Photos & Videos"), component: <Text>Photos & Videos Content</Text> },
    { id: "settings", label: t("profile.tabs.settings", "Settings"), component: <Text>Settings Content</Text> },
    { id: "upload", label: t("profile.tabs.uploadProof", "Upload Proof Documents"), component: <Text>Upload Proof Content</Text> },
    { id: "invite", label: t("profile.tabs.inviteDoctors", "Invite Doctors"), component: <Text>Invite Doctors Content</Text> },
  ];

  const handleTabLayout = (index: number, event: any) => {
    const { width } = event.nativeEvent.layout;
    tabWidths.current[index] = width;
  };

  const handleActiveTab = (index: number) => {
    setActiveTab(index);
    // Optional: Scroll to the active tab
    if (scrollViewRef.current) {
      const offset = tabWidths.current.slice(0, index).reduce((sum, width) => sum + (width || 0), 0);
      scrollViewRef.current.scrollTo({ x: offset, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <LoginHeader headerTitle="My Profile" navigation={navigation} />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.sliderContainer}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {tabs.map((tab, index) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[styles.tab, activeTab === index && styles.activeTab]}
                  onPress={() => handleActiveTab(index)}
                  onLayout={(event) => handleTabLayout(index, event)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === index && styles.activeTabText,
                    ]}
                  >
                    {tab.label}
                  </Text>
                  {activeTab === index && <View style={styles.underline} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {/* Render the content of the active tab */}
          <View style={styles.contentContainer}>
            {tabs[activeTab].component}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyle = (fontScales: any, isMobile: any, screenWidth: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: color.colorF9F9F9,
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
    contentContainer: {
      marginTop: fontScales(16),
      paddingHorizontal:fontScales(16),
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

export default DoctorProfile;
