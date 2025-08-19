import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  useWindowDimensions,
} from "react-native";
import { useTranslation } from 'react-i18next';
import { color, font, fontSize } from "../theme/color";
import { assets } from "../assets";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Footer() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;

  const navItems = [
    { label: t('footer.navigation.home'), onPress: () => navigation.navigate("dashboard") },
    { label: t('footer.navigation.aboutUs'), onPress: () => navigation.navigate("aboutus") },
    { label: t('footer.navigation.findADoctor'), onPress: () => navigation.navigate("FindDoctor") },
    { label: t('footer.navigation.faq'), onPress: () => navigation.navigate("fqa") },
    { label: t('footer.navigation.contactUs'), onPress: () => navigation.navigate("contactus") },
  ];

  const socialIcons = [
    { icon: assets.facebook1, url: "https://facebook.com" },
    { icon: assets.instagram, url: "https://instagram.com" },
    { icon: assets.twitter, url: "https://twitter.com" },
    { icon: assets.youtube, url: "https://youtube.com" },
  ];

  const handleOpenURL = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Can't open the URL: " + url);
    }
  };

  return (
    <View style={[styles.footer_container, isSmallScreen && styles.footer_container_sm]}>
      <View style={[styles.footer_topRow, isSmallScreen && styles.footer_topRow_sm]}>
        <Image source={assets.yume} style={styles.footer_logo} />

        <View style={[styles.footer_navLinks, isSmallScreen && styles.footer_navLinks_sm]}>
          {navItems.map((item) => (
            <TouchableOpacity key={item.label} onPress={item.onPress}>
              <Text style={styles.footer_navText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer_socialIcons}>
          {socialIcons.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleOpenURL(item.url)}>
              <Image source={item.icon} style={styles.footer_icon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.footer_bottomRow, isSmallScreen && styles.footer_bottomRow_sm]}>
        <Text style={styles.footer_copyText}>{t('footer.copyright')}</Text>
        <View style={styles.footer_legalLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("term")}>
            <Text style={styles.footer_legalText}>{t('footer.legal.termsOfService')}</Text>
          </TouchableOpacity>
          <Text style={styles.footer_dot}>|</Text>
          <TouchableOpacity onPress={() => navigation.navigate("privacypolicy")}>
            <Text style={styles.footer_legalText}>{t('footer.legal.privacyPolicy')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer_container: {
    backgroundColor: color.primary1,
    paddingHorizontal: 80,
    paddingVertical: 25,
  },
  footer_container_sm: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footer_topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  footer_topRow_sm: {
    flexDirection: "column",
    alignItems: "center",
  },
  footer_logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footer_navLinks: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    flex: 1,
    justifyContent: "center",
  },
  footer_navLinks_sm: {
    justifyContent: "center",
    marginVertical: 10,
  },
  footer_navText: {
    color: color.white,
    fontSize: fontSize.fontSize14,
    fontFamily: font.Rubik_400r,
    marginHorizontal: 4,
  },
  footer_socialIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
  },
  footer_icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  footer_bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
    borderTopColor: color.white2,
    borderTopWidth: 0.1,
    paddingTop: 15,
  },
  footer_bottomRow_sm: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  footer_copyText: {
    color: color.white,
    fontSize: fontSize.fontSize12,
    fontFamily: font.Rubik_300l,
    textAlign: "center",
    marginBottom: 5,
  },
  footer_legalLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer_legalText: {
    color: color.white,
    fontSize: fontSize.fontSize12,
    fontFamily: font.Rubik_300l,
    marginHorizontal: 5,
  },
  footer_dot: {
    color: color.white,
    fontSize: fontSize.fontSize12,
  },
});