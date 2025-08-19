import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from '../../theme/color';
import { assets } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useScreenDimensions } from '../../utils/DimensionsUtilities';
import { createStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { clearUserInfo } from '../../redux/actions/AuthAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type HeaderProps = {
  username?: string;
  isHome?: boolean;
};

const Header: React.FC<HeaderProps> = ({ username,isHome=false }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { isMobile, isTablet, isDesktop, scaleFactor, width, fontScale, isMobileBrowser } = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const scale = useCallback((value: number) => value * scaleFactor, [scaleFactor]);
  const fontScales = (value: number) => value * fontScale;
  const styles = useMemo(() => createStyles(isMobile, isMobileOrTablet, isDesktop, scale, fontScales, isMobileBrowser), [
    isMobile,
    isMobileOrTablet,
    isDesktop,
    scale,
    fontScales,
    isMobileBrowser
  ]);
  const userData = useSelector((v: any) => v.appReducer.userInfo);
  const [dropdownKey, setDropdownKey] = useState(Date.now());
   const settingDropDown = [
    t('header.dropdown.myProfile'),
    t('header.dropdown.settings'),
    t('header.dropdown.logout'),
  ];


  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const navItemsForMobile: { label: string; screen: keyof RootStackParamList }[] = [
    { label: t("header.navigation.aboutUs"), screen: 'aboutus' },
    { label: t("header.navigation.contactUs"), screen: 'contactus' },
    { label: t("header.navigation.myBookings"), screen: 'Bookings' },
    { label: t("header.dropdown.myProfile"), screen: 'profileScreen' },
    { label: t("header.dropdown.settings"), screen: '' },
    { label: t("header.dropdown.logout"), screen: '' },
  ];
   const navItems: { label: string; screen: keyof RootStackParamList }[] = [
    { label: t("header.navigation.aboutUs"), screen: 'aboutus' },
    { label: t("header.navigation.contactUs"), screen: 'contactus' },
    { label: t("header.navigation.myBookings"), screen: 'Bookings' },
  ];

let dataCheck = Object.keys(userData).length !== 0 ? navItemsForMobile : navItems;

   const handleDropDownItemPress = (index: string, value: any) => {
      setDropdownKey(Date.now());
      if (value === t('header.dropdown.myProfile')) {
        navigation.navigate('profileScreen')
      } else if (value === t('header.dropdown.logout')) {
        dispatch(clearUserInfo() as any);
      }
    };

    {console.log(userData?.fullName)}
   const renderProfileDropdown = () => (
    
      <ModalDropdown
       disabled={isMobile}
        key={dropdownKey}
        dropdownStyle={styles.dropdownStyle}
        options={[...settingDropDown]}
        dropdownTextStyle={styles.dropdownTextStyle}
        dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
        renderSeparator={() => null}
        onSelect={(index: string, value: string) => {
        handleDropDownItemPress(index, value);
        }}>
        <View
          style={[
            styles.profileContainer,
            isMobile && styles.profileContainerSmall,
          ]}>
          <Image
            source={
              userData?.profilePicture
                ? {uri: userData?.profilePicture}
                : assets.profile
            }
            style={[styles.profileImage, isMobile && styles.profileImageSmall]}
          />
          <View style={styles.profileTextContainer}>
            <Text
              style={[styles.greetingText, isMobile && styles.greetingTextSmall]}>
              {t('header.greeting')}
            </Text>
            <Text
              style={[styles.userNameText, isMobile && styles.userNameTextSmall]}>
              {userData?.fullName}
            </Text>
          </View>
        </View>
      </ModalDropdown>
    );

  return (
    <>
      <View style={styles.headerContainer}>

      {(isMobile && !isHome) && 
      <>
           <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.hamburger}
          >
            <MaterialIcons name="arrow-back" size={fontScales(30)} color="#fff" />
          </TouchableOpacity>
      </>}
        <Image
          source={assets.yume1}
          style={[styles.logoImage, isMobile && styles.logoImageSmall]}
        />

        {!isMobile ? (
          <View style={styles.centerRightContainer}>
            <View style={styles.navLinks}>
              {navItems.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => {
                    console.log("Navigating to:", item.screen);
                    navigation.navigate(item.screen);
                  }}
                >
                  <Text style={styles.navText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {userData && (
              renderProfileDropdown()
            )}
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setDrawerVisible(true)}
            style={styles.hamburger}
          >
            <Icon name="menu" size={fontScales(30)} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {drawerVisible && isMobile && (
        <View style={styles.drawerOverlay}>
          <View
            style={[
              styles.drawer,
              {
                width: isMobile ? width * 0.7 : fontScales(300),
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setDrawerVisible(false)}
              style={styles.drawerCloseButton}
            >
              <Icon name="close" size={fontScales(30)} color={color.lable1} />
            </TouchableOpacity>

            <View style={[styles.profileContainer2]}>
              {renderProfileDropdown()}
            </View>
            
            {dataCheck.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => {
                  setDrawerVisible(false);
                  if(item.label == t("header.dropdown.logout")){
                      dispatch(clearUserInfo() as any);
                  }
                  console.log("Navigating to:", item.screen);
                  navigation.navigate(item.screen);
                }}
              >
                <Text style={styles.drawerItem}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </>
  );
};

export default Header;
