import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { color, font, fontSize } from "../../theme/color";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets";
import BlockSlotModal from "../calendar/BlockModal";
import ManageWorkingTimeModal from "../calendar/ManageWorkingTimeModal";
import { assets as Calender } from "../../doctor-screens/calendar/assets";
import NotificationModal from "./NotificationModal";
import ModalDropdown from "react-native-modal-dropdown";
import { clearUserInfo } from "../../redux/actions/AuthAction";

interface LoginHeaderProps {
  navigation: any;
  headerTitle?: string;
}

const LoginHeader = ({
  navigation,
  headerTitle = "Dashboard",
}: LoginHeaderProps) => {
  const { t } = useTranslation();
  const { isMobile, isTablet, scaleFactor, isMobileBrowser, fontScale } =
    useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const scale = (value: number) => value * scaleFactor;

  const dispatch = useDispatch()

  const [isManageModalVisible, setIsManageModalVisible] = useState(false);
  const [isBlockSlotModalVisible, setIsBlockSlotModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownKey, setDropdownKey] = useState(Date.now());

  const settingDropDown = [
    t('header.dropdown.myProfile'),
    t('header.dropdown.logout'),
  ];

  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );
  const userData = useSelector((v: any) => v.appReducer.userInfo);

  const styles = createStyles(
    isMobile,
    isMobileOrTablet,
    isMobileBrowser,
    fontScales
  );

   const handleDropDownItemPress = (index: string, value: any) => {
      setDropdownKey(Date.now());
      if (value === t('header.dropdown.myProfile')) {
        navigation.navigate("doctorsprofile")
      } else if (value === t('header.dropdown.logout')) {
        dispatch(clearUserInfo() as any);
      }
    };

  const handleNotificationPress = () => {
    setModalVisible(true);
  };

  const handleBlockSlotPress = () => {
    setIsBlockSlotModalVisible(true);
  };

  const handleManageWorkingTimePress = () => {
    setIsManageModalVisible(!isManageModalVisible);
  };

  const handleSaveWorkingTime = () => {
    console.log("Working Time Saved:");
  };

  const showSearchBox = headerTitle.toLowerCase() === "appointments";

  return (
    <View style={styles.container}>
      {isMobile ? (
        <View style={styles.mobileContainer}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={fontScales(24)} color={color.lable1} />
          </TouchableOpacity>
          <Text style={styles.mobileTitle}>{headerTitle}</Text>
          <View style={styles.headerRight}>
            {headerTitle == "Calendar" && (
              <>
                <TouchableOpacity
                  style={[styles.button, { paddingHorizontal: fontScales(15) }]}
                  onPress={handleBlockSlotPress}
                >
                  <Image
                    source={Calender.block}
                    style={{ height: fontScales(15), width: fontScales(15) }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.manageButton,
                    { paddingHorizontal: fontScales(15) },
                  ]}
                  onPress={handleManageWorkingTimePress}
                >
                  <Image
                    source={Calender.setting}
                    style={{ height: fontScales(15), width: fontScales(15) }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.notificationContainer}
              onPress={handleNotificationPress}
            >
              <Icon name="bell" size={fontScales(24)} color={color.lable1} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <Image
              source={
                userData?.profilePicture
                  ? { uri: userData?.profilePicture }
                  : assets.profile
              }
              style={styles.headerAvatar}
            />
          </View>
        </View>
      ) : (
        <View style={styles.webContainer}>
          <View style={styles.leftSection}>
            <Text style={styles.title}>{headerTitle}</Text>
          </View>
          <View style={styles.rightSection}>
            {headerTitle == "Calendar" && (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleBlockSlotPress}
                >
                  <Image
                    source={Calender.block}
                    style={{ height: fontScales(20), width: fontScales(20) }}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>Block Slot</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.manageButton]}
                  onPress={handleManageWorkingTimePress}
                >
                  <Image
                    source={Calender.setting}
                    style={{ height: fontScales(20), width: fontScales(20) }}
                    resizeMode="contain"
                  />
                  <Text style={[styles.buttonText, styles.manageButtonText]}>
                    Manage Working Time
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {showSearchBox && (
              <View style={styles.searchContainer}>
                <TextInput
                  style={[styles.searchInput]}
                  placeholder={t(
                    "loginHeader.searchPlaceholder",
                    "Search Patients"
                  )}
                  placeholderTextColor={color.textLight}
                />
                <Icon
                  name="magnify"
                  size={fontScales(20)}
                  color={color.lable1}
                  style={styles.searchIcon}
                />
              </View>
            )}
            <TouchableOpacity
              onPress={handleNotificationPress}
              style={styles.notificationContainer}
            >
              <Icon name="bell" size={fontScales(24)} color="#1e1e1e" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <ModalDropdown
              key={dropdownKey}
              dropdownStyle={styles.dropdownStyle}
              options={[...settingDropDown]}
              dropdownTextStyle={styles.dropdownTextStyle}
              dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
              renderSeparator={() => null}
              onSelect={(index: string, value: string) => {
                handleDropDownItemPress(index, value);
              }}
            >
              <View style={{flexDirection:'row',alignItems:'center'}}> 
              <Image
                source={
                  userData?.profilePicture
                    ? { uri: userData?.profilePicture }
                    : assets.profile
                }
                style={styles.avatar}
              />
              <View style={styles.greeting}>
                <Text style={styles.hello}>
                  {t("loginHeader.greeting", "Hello,")}
                </Text>
                <Text style={styles.name}>{userData?.fullName}</Text>
              </View>
              </View>
            </ModalDropdown>
          </View>
        </View>
      )}

      <BlockSlotModal
        visible={isBlockSlotModalVisible}
        onClose={() => setIsBlockSlotModalVisible(false)}
      />

      <ManageWorkingTimeModal
        visible={isManageModalVisible}
        onClose={() => setIsManageModalVisible(false)}
        onSave={handleSaveWorkingTime}
      />

      <NotificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default LoginHeader;

const createStyles = (
  isMobile: boolean,
  isMobileOrTablet: boolean,
  isMobileBrowser: boolean,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    container: {
      backgroundColor: isMobile ? color.white : color.colorF9F9F9,
      paddingVertical: isMobile ? fontScales(0) : fontScales(16),
    },
    webContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: fontScales(24),
    },
    mobileContainer: {
      paddingHorizontal: fontScales(16),
      paddingVertical: isMobile ? fontScales(10) : fontScales(0),
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: color.colorE3E3E3,
    },
    mobileHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: isMobile ? fontScales(10) : fontScales(0),
    },
    mobileTitle: {
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(24),
      color: color.lable1,
      flex: 1,
      textAlign: "center",
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    notificationContainer: {
      marginHorizontal: fontScales(16),
    },
    notificationDot: {
      position: "absolute",
      top: fontScales(-1),
      right: fontScales(2),
      width: fontScales(6),
      height: fontScales(6),
      borderRadius: fontScales(3),
      backgroundColor: color.colorFF1E97,
    },
    headerAvatar: {
      width: fontScales(40),
      height: fontScales(40),
      borderRadius: fontScales(20),
    },
    mobileSearchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: color.colorF9F9F9,
      borderRadius: fontScales(8),
      marginTop: fontScales(10),
      marginBottom: fontScales(10),
      position: "relative",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: color.white,
      borderRadius: fontScales(8),
      width: fontScales(200),
      // marginLeft: fontScales(10),
      position: "relative",
      right: fontScales(-2),
    },
    searchInput: {
      flex: 1,
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      paddingVertical: fontScales(8),
      paddingHorizontal: fontScales(12),
      paddingRight: fontScales(12), // Space for the icon
    },
    searchIcon: {
      position: "absolute",
      right: fontScales(12),
    },
    mobileSearchIcon: {
      position: "absolute",
      right: fontScales(12),
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontFamily: font.Rubik_600sb,
      fontSize: fontScales(fontSize.fontSize36),
      lineHeight: fontScales(30),
      color: color.lable1,
    },
    rightSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: fontScales(50),
      height: fontScales(50),
      borderRadius: fontScales(25),
      marginRight: fontScales(10),
      marginLeft: fontScales(16),
    },
    greeting: {
      flexDirection: "column",
    },
    hello: {
      fontSize: fontScales(fontSize.fontSize16),
      color: color.textLight,
      fontFamily: font.Rubik_300l,
    },
    name: {
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize16),
      color: color.lable1,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: color.white,
      borderWidth: 1,
      borderColor: color.color_E0DEE2,
      borderRadius: fontScales(8),
      paddingHorizontal: fontScales(20),
      paddingVertical: fontScales(10),
      marginHorizontal: fontScales(8),
    },
    manageButton: {
      backgroundColor: color.secondary1,
      borderColor: color.secondary1,
    },
    buttonText: {
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize16),
      color: color.lable1,
      marginLeft: fontScales(10),
      lineHeight: fontScales(22),
    },
    manageButtonText: {
      color: color.white,
    },
     dropdownStyle: {
      width: fontScales(150),
      marginTop: fontScales(5),
      borderRadius: fontScales(6),
      overflow: 'hidden',
      borderWidth: 0,
      height: fontScales(120),
      flexDirection:'row'
    },
    dropdownTextStyle: {
      fontSize: fontScales(fontSize.fontSize16),
      paddingVertical: fontScales(12),
      paddingHorizontal: fontScales(10),
      color: color.loginDropDownText,
      fontFamily: font.Rubik_500m,
    },
    dropdownTextHighlightStyle: {
      color: color.shadowColor,
    },
  });
