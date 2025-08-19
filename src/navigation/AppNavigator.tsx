import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import Dashboard from "../screens/dashboard/Dashboard";
import { Platform, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { useSelector } from "react-redux";
import i18n from "../utils/i18n";
import Login from "../doctor-screens/login/Login";

import Doctors from "../screens/doctors/Doctors";
import DoctorsDetails from "../screens/doctorsdetails/DoctorsDetails";
import Term from "../screens/terms/Term";
import PrivacyPolicy from "../screens/terms/PrivacyPolicy";
import Faq from "../screens/faq/Faq";
import ContactUs from "../screens/contactus/ContactUs";
import Aboutus from "../screens/aboutus/Aboutus";
import FindYourProfile from "../doctor-screens/login/Components/FindProfile";
import Register from "../doctor-screens/login/Register";
import LoginSelection from "../doctor-screens/login/Components/LoginSelection";
import DrawerNavigator from "../doctor-screens/DrawerNavigator";
import PublicTopic from "../screens/publictopic/PublicTopic";
import InPersonBooking from "../screens/doctorsdetails/InPersonBooking";
import DoctorsCompare from "../screens/doctorscompare/DoctorsCompare";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isLogin = useSelector((v: any) => v.appReducer.isUserLogin);
  const selectedLanguageData = useSelector(
    (v: any) => v.appReducer.selectedLanguage
  );

  const authType = useSelector((v: any) => v.appReducer.authType);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguageData);
  }, [selectedLanguageData]);

  return (
    <NavigationContainer
      {...(Platform.OS === "web"
        ? {
            linking: {
              prefixes: ["http://localhost:3030"],
              config: {
                screens: {
                  dashboard: "dashboard",
                  faq: "fqa",
                  term: "term",
                  privacypolicy: "privacypolicy",
                  contactus: "contactus",
                  aboutus: "aboutus",
                  doctors: "doctors",
                  doctorshome: "doctorshome",
                  doctorscompare: "doctorscompare",
                  doctorsdetails: "doctorsdetails",
                  profileScreen: "profileScreen",
                  doctorLogin: "doctorLogin",
                  publictopic: "publictopic",
                  inpersonbooking: "inpersonbooking",
                  doctorsprofile:"doctorsprofile",
                },
              },
            },
          }
        : {})}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          authType == "doctor" ? (
            <>
              <Stack.Screen name="doctorshome" component={DrawerNavigator} />
            </>
          ) : (
            <>
              <Stack.Screen name="doctors" component={Doctors} />
                            <Stack.Screen name="doctorscompare" component={DoctorsCompare} />

              <Stack.Screen name="doctorsdetails" component={DoctorsDetails} />
              <Stack.Screen name="inpersonbooking" component={InPersonBooking} />
              <Stack.Screen name="profileScreen" component={ProfileScreen} />
              <Stack.Screen name="aboutus" component={Aboutus} />
              <Stack.Screen name="contactus" component={ContactUs} />
              <Stack.Screen name="fqa" component={Faq} />
              <Stack.Screen name="term" component={Term} />
              <Stack.Screen name="privacypolicy" component={PrivacyPolicy} />
                <Stack.Screen name="publictopic" component={PublicTopic} />
            </>
          )
        ) : (
          <>
            <Stack.Screen name="dashboard" component={Dashboard} />
            <Stack.Screen name="FindYourProfile" component={FindYourProfile} />
            <Stack.Screen name="LoginSelection" component={LoginSelection} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="aboutus" component={Aboutus} />
            <Stack.Screen name="contactus" component={ContactUs} />
            <Stack.Screen name="fqa" component={Faq} />
            <Stack.Screen name="term" component={Term} />
            <Stack.Screen name="privacypolicy" component={PrivacyPolicy} />
            <Stack.Screen name="doctorLogin" component={Login} />
            <Stack.Screen name="doctorsdetails" component={DoctorsDetails} />
            <Stack.Screen name="inpersonbooking" component={InPersonBooking} />
              <Stack.Screen name="publictopic" component={PublicTopic} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
