import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {color, font, fontSize} from '../theme/color';
import {assets} from '../assets';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {useDispatch, useSelector} from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import {clearUserInfo} from '../redux/actions/AuthAction';
import {useScreenDimensions} from '../utils/DimensionsUtilities';
import { Languages } from '../screens/profile/components/ChangeLanguage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Header() {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const {isMobile, scaleFactor} = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const styles = createStyles(scale, isMobile);

  const [dropdownKey, setDropdownKey] = useState(Date.now());
  const settingDropDown = [
    t('header.dropdown.myProfile'),
    t('header.dropdown.settings'),
    t('header.dropdown.logout'),
  ];

  const dispatch = useDispatch();
  const userData = useSelector((v: any) => v.appReducer.userInfo);

  const navItems: {label: string; screen: keyof RootStackParamList}[] = [
    {label: t('header.navigation.aboutUs'), screen: 'aboutus'},
    {label: t('header.navigation.contactUs'), screen: 'contactus'},
    {label: t('header.navigation.myBookings'), screen: 'Bookings'},
  ];

  const handleDropDownItemPress = (index: string, value: any) => {
    setDropdownKey(Date.now());
    if (value === t('header.dropdown.myProfile')) {
    } else if (value === t('header.dropdown.logout')) {
      dispatch(clearUserInfo() as any);
    }
  };

  const renderProfileDropdown = () => (
    // <ModalDropdown
    //   key={dropdownKey}
    //   dropdownStyle={styles.dropdownStyle}
    //   options={[...settingDropDown]}
    //   dropdownTextStyle={styles.dropdownTextStyle}
    //   dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
    //   renderSeparator={() => null}
    //   onSelect={(index: string, value: string) => {
    //     handleDropDownItemPress(index, value);
    //   }}>
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
    // </ModalDropdown>
  );

  return (
    <View
      style={[styles.headerContainer, isMobile && styles.headerContainerSmall]}>
      <View style={[styles.headerRow, isMobile && styles.headerRowSmall]}>
        {isMobile ? (
          renderProfileDropdown()
        ) : (
          <Image
            source={assets.yume}
            style={[styles.logoImage, isMobile && styles.logoImageSmall]}
          />
        )}

        <View
          style={[styles.navContainer, isMobile && styles.navContainerSmall]}>
          {isMobile ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.navScrollContainer}>
              {navItems.map(item => (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => navigation.navigate(item.screen)}
                  style={styles.navButtonSmall}>
                  <Text
                    style={[styles.navText, isMobile && styles.navTextSmall]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <>
              {navItems.map(item => (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => navigation.navigate(item.screen)}>
                  <Text
                    style={[styles.navText, isMobile && styles.navTextSmall]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
              {renderProfileDropdown()}
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const createStyles = (scale: (val: number) => number, isMobile: boolean) =>
  StyleSheet.create({
    headerContainer: {
      backgroundColor: color.primary1,
      paddingVertical: scale(10),
      paddingHorizontal: scale(80),
    },
    headerContainerSmall: {
      paddingHorizontal: scale(20),
      paddingVertical: scale(15),
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerRowSmall: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: scale(10),
    },
    logoImage: {
      width: scale(150),
      height: scale(50),
      resizeMode: 'contain',
      tintColor: color.white,
    },
    logoImageSmall: {
      width: scale(100),
      height: scale(40),
    },
    navContainer: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: isMobile ? 'space-evenly' : 'flex-end',
      gap: isMobile ? scale(0) : scale(50),
      flexWrap: 'wrap',
      marginLeft: scale(20),
    },
    navContainerSmall: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 0,
      gap: scale(10),
      marginTop: scale(10),
    },
    navScrollContainer: {
      flexDirection: 'row',
      gap: scale(15),
      paddingVertical: scale(5),
    },
    navText: {
      color: color.white,
      fontFamily: font.Rubik_400r,
      fontSize: scale(fontSize.fontSize16),
    },
    navTextSmall: {
      fontSize: scale(fontSize.fontSize14),
    },
    navButtonSmall: {
      marginBottom: scale(5),
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: scale(20),
    },
    profileContainerSmall: {
      marginTop: scale(0),
      marginLeft: 0,
    },
    profileImage: {
      width: scale(50),
      height: scale(50),
      resizeMode: 'cover',
      borderRadius: scale(25),
    },
    profileImageSmall: {
      width: scale(40),
      height: scale(40),
      borderRadius: scale(20),
    },
    profileTextContainer: {
      marginLeft: scale(10),
    },
    greetingText: {
      fontSize: scale(fontSize.fontSize16),
      color: color.white,
      fontFamily: font.Rubik_300l,
    },
    greetingTextSmall: {
      fontSize: scale(fontSize.fontSize14),
    },
    userNameText: {
      fontSize: scale(fontSize.fontSize16),
      color: color.white,
      fontFamily: font.Rubik_500m,
    },
    userNameTextSmall: {
      fontSize: scale(fontSize.fontSize14),
    },
    dropdownStyle: {
      width: scale(150),
      marginTop: scale(5),
      borderRadius: scale(6),
      overflow: 'hidden',
      borderWidth: 0,
      height: scale(120),
    },
    dropdownTextStyle: {
      fontSize: scale(fontSize.fontSize16),
      paddingVertical: scale(12),
      paddingHorizontal: scale(10),
      color: color.loginDropDownText,
      fontFamily: font.Rubik_500m,
    },
    dropdownTextHighlightStyle: {
      color: color.shadowColor,
    },
  });
