import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {color, font, fontSize} from '../../theme/color';
import ProfileForm from './components/ProfileFrom';
import WebLinearGradient from '../../components/WebLinearGradient';
import {useScreenDimensions} from '../../utils/DimensionsUtilities';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {useDispatch, useSelector} from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import {assets} from './assets';
import CancelAccount from './components/CancelAccount';
import {clearUserInfo} from '../../redux/actions/AuthAction';
import Setting from './components/Settings';
import ProductList from './components/FavProduct';
import CreateNewGroup from './components/CreateNewGroup';
import Logout from '../../components/LogoutModal';
import {createStyles} from './styles';
import {assets as assetsRoot} from '../../assets';
import ChangeLanguage from './components/ChangeLanguage';

export type FormField =
  | 'fullName'
  | 'phone'
  | 'email'
  | 'country'
  | 'city'
  | 'zipCode'
  | 'address'
  | 'profilePic';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {isMobile, scaleFactor, fontScale, isMobileApp} = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
                (value: number) => value * fontScale,
                [scaleFactor]
              );
  const styles = createStyles(isMobile, scale, fontScales);

  const navigation = useNavigation<NavigationProp>();
  const userData = useSelector((v: any) => v.appReducer.userInfo);

  const [selectedSection, setSelectedSection] = useState('myProfile');

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownKey, setDropdownKey] = useState(Date.now());
  const [showCreateNewGroupModal, setShowCreateNewGroupModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const sideBar = [
    {
      key: 'myProfile',
      iconImage: assets.userProfile,
      title: t('ProfileScreen.sidebar.myProfile'),
    },
    {
      key: 'favorites',
      iconImage: assets.favorite,
      title: t('ProfileScreen.sidebar.favorites'),
    },
    {
      key: 'settings',
      iconImage: assets.setting,
      title: t('ProfileScreen.sidebar.settings'),
    },
    {
      key: 'language',
      iconImage: assets.setting,
      title: t('ProfileScreen.sidebar.language'),
    },
    {
      key: 'cancelAccount',
      iconImage: assets.deleteUser,
      title: t('ProfileScreen.sidebar.cancelAccount'),
    },
    {
      key: 'logout',
      iconImage: assets.logout,
      title: t('ProfileScreen.sidebar.logout'),
    },
  ];

  const settingDropDown = [
    t('ProfileScreen.dropdown.myProfile'),
    t('ProfileScreen.dropdown.settings'),
    t('ProfileScreen.dropdown.logout'),
  ];

  const navItems: {label: string; screen: keyof RootStackParamList}[] = [
    {label: t('ProfileScreen.navigation.aboutUs'), screen: 'aboutus'},
    {label: t('ProfileScreen.navigation.contactUs'), screen: 'contactus'},
    {label: t('ProfileScreen.navigation.myBookings'), screen: 'Bookings'},
  ];

  const handleSectionChange = (sectionKey: string) => {
    if (sectionKey === 'logout') {
      return setLogoutModal(true);
    }
    setSelectedSection(sectionKey);
    setDrawerOpen(false);
  };

  const handleDropDownItemPress = (index: string, value: any) => {
    setDropdownKey(Date.now());
    if (value === t('ProfileScreen.dropdown.myProfile')) {
      setSelectedSection(t('ProfileScreen.sidebar.myProfile'));
    } else if (value === t('ProfileScreen.dropdown.settings')) {
      setSelectedSection(t('ProfileScreen.sidebar.settings'));
    } else if (value === t('ProfileScreen.dropdown.logout')) {
      dispatch(clearUserInfo() as any);
    }
  };

  const onUpdateLanguage = () => {
    setSelectedSection("language");
  };

  const renderSidebarItems = () =>
    sideBar.map(section => {
      const isSelected = section.key === selectedSection;
      const content = (
        <TouchableOpacity onPress={() => handleSectionChange(section.key)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                height: fontScales(16),
                width: fontScales(16),
                resizeMode: 'contain',
                marginRight: fontScales(20),
                
              }}
              source={section.iconImage}
            />
            <Text style={[styles.sidebarText, isSelected && styles.activeItem]}>
              {section.title}
            </Text>
          </View>
        </TouchableOpacity>
      );

      return isSelected ? (
        <WebLinearGradient
          key={section.title}
          colors={[color.sideBarColor1, color.sideBarColor2]}
          style={styles.sidebarItem}>
          <TouchableOpacity onPress={() => handleSectionChange(section.title)}>
            {content}
          </TouchableOpacity>
        </WebLinearGradient>
      ) : (
        <TouchableOpacity
          key={section.title}
          style={styles.sidebarItem}
          onPress={() => handleSectionChange(section.title)}>
          {content}
        </TouchableOpacity>
      );
    });

  const renderProfileDropdown = () => (
    
      <View style={styles.profileContainer}>
        <Image
          source={
            userData?.profilePicture
              ? {uri: userData?.profilePicture}
              : assetsRoot.profile
          }
          style={styles.profileImage}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.greetingText}>{t('ProfileScreen.greeting')}</Text>
          <Text style={styles.userNameText}>{userData?.fullName}</Text>
        </View>
      </View>

  );

  return (
    <View style={styles.container}>
      {!isMobile && <Header />}

      <View
        style={[styles.content, {flexDirection: isMobile ? 'column' : 'row'}]}>
        {isMobile ? (
          <View style={{height: fontScales(120)}}>
            <View style={styles.mobileHeader}>
              <TouchableOpacity
                onPress={() => setDrawerOpen(true)}
                style={styles.hamburgerIcon}>
                <Ionicons
                  name="menu"
                  size={fontScales(28)}
                  color={color.primary1}
                />
              </TouchableOpacity>
              <Image
                style={styles.logoImage}
                source={assets.appLogo}
                resizeMode="contain"
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sidebarScrollContainer}>
              {renderSidebarItems()}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.sidebarContainer}>
            <View style={styles.sidebar}>{renderSidebarItems()}</View>
          </View>
        )}

        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
          style={styles.scrollableContent}>
          <View style={{flex: 1}}>
            <View style={styles.mainContent}>
              {selectedSection === "myProfile" && (
                <ProfileForm />
              )}

              {selectedSection === 'favorites' && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.pageTitle,isMobileApp && {maxWidth:'50%'}]}>
                      {t('ProfileScreen.pageTitles.favorites')}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setShowCreateNewGroupModal(true);
                      }}>
                      <Text style={styles.createButton}>
                        {t('ProfileScreen.createNewGroup')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ProductList />
                </>
              )}

              {selectedSection === 'settings' && (
                <>
                  <Text style={styles.pageTitle}>
                    {t('ProfileScreen.pageTitles.settings')}
                  </Text>
                  <Setting />
                </>
              )}

              {selectedSection === 'language' && (
                <>
                  <Text style={styles.pageTitle}>
                    {t('ProfileScreen.pageTitles.language')}
                  </Text>
                  <ChangeLanguage onUpdate={onUpdateLanguage} />
                </>
              )}

              {selectedSection === 'cancelAccount' && (
                <>
                  <Text style={styles.pageTitle}>
                    {t('ProfileScreen.pageTitles.cancelAccount')}
                  </Text>
                  <CancelAccount />
                </>
              )}
            </View>
          </View>

          {isMobile && <Footer />}
        </ScrollView>
      </View>

      {isMobile && (
        <Modal transparent visible={drawerOpen}>
          <TouchableOpacity
            style={styles.drawerOverlay}
            activeOpacity={1}
            onPress={() => setDrawerOpen(false)}>
            <View style={styles.drawerContent}>
              <View style={styles.drawerProfileSection}>
                {renderProfileDropdown()}
              </View>
              <View style={styles.navItemsContainer}>
                {navItems.map(item => (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => {
                      navigation.navigate(item.screen  as any);
                      setDrawerOpen(false);
                    }}
                    style={styles.navButton}>
                    <Text style={styles.navText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      <CreateNewGroup
        visible={showCreateNewGroupModal}
        onClose={() => [setShowCreateNewGroupModal(false)]}
      />

      <Logout
        visible={logoutModal}
        onCancel={() => setLogoutModal(false)}
        onConfirm={() => {
          dispatch(clearUserInfo() as any);
          setLogoutModal(false);
        }}
      />
    </View>
  );
};

export default ProfileScreen;
