import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { assets } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useScreenDimensions } from '../../utils/DimensionsUtilities';
import { createStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Footer() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

   const { isMobile, isTablet, isDesktop, scaleFactor, width, fontScale } = useScreenDimensions();
   const isMobileOrTablet = isMobile || isTablet;
   const scale = useCallback((value: number) => value * scaleFactor, [scaleFactor]);
     const fontScales = (value: number) => value * fontScale;
 
   const styles = useMemo(() => createStyles(isMobile, isMobileOrTablet, isDesktop, scale, fontScales), [
     isMobile,
     isMobileOrTablet,
     isDesktop,
     scale,
     fontScales
   ]);
  const isLogin = useSelector((v: any) => v.appReducer.isUserLogin);
  const authType = useSelector((v: any) => v.appReducer.authType);


   const onHomePress = ()=>{

        if(isLogin){
              if(authType ==='doctor'){
                navigation.navigate("doctorshome")
              }
              else{
                navigation.navigate("doctors")
              }
        }
        else{
          navigation.navigate("dashboard")
        }

   }

  const navItems = [
    { label: t("footer.navigation.home"), onPress: () => onHomePress() },
    { label: t("footer.navigation.aboutUs"), onPress: () => navigation.navigate("aboutus") },
    { label: t("footer.navigation.findADoctor"), onPress: () => navigation.navigate("FindDoctor") },
    { label: t("footer.navigation.faq"), onPress: () => navigation.navigate("fqa") },
    { label:t("footer.navigation.contactUs"), onPress: () => navigation.navigate("contactus") },
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
    <View style={[styles.footer_container, isMobile && styles.footer_container_sm]}>
      <View style={[styles.footer_topRow, isMobile && styles.footer_topRow_sm]}>
        <Image source={assets.yume} style={styles.footer_logo} />

        <View style={[styles.footer_navLinks, isMobile && styles.footer_navLinks_sm]}>
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

      <View style={[styles.footer_bottomRow, isMobile && styles.footer_bottomRow_sm]}>
        <Text style={styles.footer_copyText}>{t("footer.copyright")}</Text>
        <View style={styles.footer_legalLinks}>
          <TouchableOpacity onPress={() => navigation.navigate("term")}>
            <Text style={styles.footer_legalText}>{t("footer.legal.termsOfService")}</Text>
          </TouchableOpacity>
          <Text style={styles.footer_dot}>|</Text>
          <TouchableOpacity onPress={() => navigation.navigate("privacypolicy")}>
            <Text style={styles.footer_legalText}>{t("footer.legal.privacyPolicy")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

