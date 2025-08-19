import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { assets as appAssets } from "./assets";
import { assets } from "../assets";
import { color, font, fontSize } from "../theme/color";
import { useScreenDimensions } from "../utils/DimensionsUtilities";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../redux/actions/AuthAction";
import Logout from "../components/LogoutModal";
import DashboardScreen from "./dashboard/dashboard";
import LoginHeader from "./components/login-header";
import CalendarScreen from "./calendar/Calendar";
import Appointments from "./appointments/appointments";
import MessagesScreen from "./messages/messages";
import PatientList from "./messages/PatientList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientListScreen from "./messages/PatientList";
import ChatScreen from "./messages/messages";
import DoctorProfile from "./profile/DoctorProfile";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props: any) {
  const { t } = useTranslation();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const userData = useSelector((v: any) => v.appReducer.userInfo);
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );
  const styles = createStyles(scale, fontScales);

  const { state, navigation, setLogoutModal } = props;
  const currentRouteName = state.routeNames[state.index];

  const renderDrawerItem = (labelKey: string, icon: any, routeName: string) => {
    const isActive = currentRouteName === routeName;
    return (
      <View
        style={{
          backgroundColor: isActive ? color.secondary1 : "transparent",
          borderRadius: fontScales(8),
          marginVertical: isMobile ? fontScales(10) : fontScales(4),
          marginHorizontal: fontScales(8),
        }}
      >
        <DrawerItem
          label={t(`drawer.items.${labelKey}`, labelKey)}
          labelStyle={styles.label}
          icon={({ color, size }) => (
            <Image
              source={icon}
              style={{
                height: fontScales(size - 5),
                width: fontScales(size - 5),
                marginRight: isMobile ? fontScales(10) : fontScales(5),
              }}
            />
          )}
          onPress={() => navigation.navigate(routeName)}
        />
      </View>
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      {isMobile ? (
        <View style={styles.header}>
          <Image
            source={
              userData?.profilePicture
                ? { uri: userData?.profilePicture }
                : assets.profile
            }
            style={styles.profileImage}
          />
          <View>
            <Text style={[styles.hello]}>
              {t("loginHeader.greeting", "Hello,")}
            </Text>
            <Text style={styles.profileName}>
              {userData?.fullName || "User"}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.logoContainer}>
          <Image source={assets.yume1} style={styles.logo} />
        </View>
      )}

      <View style={styles.menu}>
        {renderDrawerItem("dashboard", appAssets.dashboard, "Dashboard")}
        {renderDrawerItem("calendar", appAssets.calendar, "Calendar")}
        {renderDrawerItem(
          "appointments",
          appAssets.appointment,
          "Appointments"
        )}
        {renderDrawerItem("messages", appAssets.message, "Messages")}
      </View>

      <TouchableOpacity
        onPress={() => setLogoutModal(true)}
        style={styles.logout}
      >
        <Icon name="logout" size={scale(20)} color={color.white} />
        <Text style={styles.logoutText}>{t("drawer.logout", "Logout")}</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const ChatStack = () => (
  <Stack.Navigator initialRouteName="PatientList">
    <Stack.Screen
      name="PatientList"
      component={PatientListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function DrawerNavigator() {
  const isWeb = Platform.OS === "web";
  const { isMobile, scaleFactor } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const [logoutModal, setLogoutModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent setLogoutModal={setLogoutModal} {...props} />
        )}
        screenOptions={{
          headerShown: false,
          drawerType: isMobile ? "front" : "permanent",
          swipeEnabled: isMobile,
          overlayColor: isMobile ? color.blackLight : "transparent",
          drawerStyle: {
            width: isMobile ? "70%" : 260,
            backgroundColor: color.primary1,
          },
        }}
        initialRouteName="Dashboard"
      >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="Appointments" component={Appointments} />
        <Drawer.Screen name="Messages" component={ChatStack} />
        <Drawer.Screen name="doctorsprofile" component={DoctorProfile} />
      </Drawer.Navigator>

      <Logout
        visible={logoutModal}
        onCancel={() => setLogoutModal(false)}
        onConfirm={() => {
          dispatch(clearUserInfo() as any);
          setLogoutModal(false);
        }}
      />
    </>
  );
}

const createStyles = (
  scale: (val: number) => number,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    hello: {
      fontSize: fontScales(fontSize.fontSize16),
      color: color.white,
      fontFamily: font.Rubik_300l,
      marginLeft: scale(5),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: scale(8),
      marginBottom: scale(8),
    },
    profileImage: {
      width: fontScales(40),
      height: fontScales(40),
      borderRadius: fontScales(20),
    },
    profileName: {
      fontFamily: font.Rubik_500m,
      fontSize: fontScales(fontSize.fontSize16),
      color: color.white,
      marginLeft: scale(5),
    },
    drawerContainer: {
      flex: 1,
      backgroundColor: color.primary1,
      paddingTop: fontScales(40),
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: fontScales(30),
    },
    logo: {
      width: fontScales(100),
      height: fontScales(30),
      resizeMode: "contain",
    },
    label: {
      color: color.white,
      fontSize: fontScales(fontSize.fontSize16),
      lineHeight: fontScales(30),
      fontFamily: font.Rubik_600sb,
    },
    menu: {
      flex: 1,
    },
    logout: {
      flexDirection: "row",
      alignItems: "center",
      padding: fontScales(15),
    },
    logoutText: {
      color: color.white,
      fontSize: fontScales(16),
      marginLeft: fontScales(10),
    },
    screen: {
      flex: 1,
    },
  });
