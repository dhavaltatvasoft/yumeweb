import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
  Modal,
  SafeAreaView,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { useTranslation } from "react-i18next";

import { assets } from "../../assets";
import { color, font, fontSize } from "../../../../theme/color";
import { DropdownBox } from "../doctor-section/DropdownBox";
import { Divider } from "../../../../components/Divider";
import AuthModal from "../login/AuthModal";
import RegisterForm from "../login/RegisterForm";
import { useScreenDimensions } from "../../../../utils/DimensionsUtilities";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStyles } from "./styles";
import { Languages } from "../../../profile/components/ChangeLanguage";
import i18n from "../../../../utils/i18n";
import { useSelector } from "react-redux";
import CustomDropdown from "../../../../components/customdropdown/CustomDropdown";

type DropdownKey =
  | "symptoms"
  | "specialty"
  | "gender"
  | "searchCity"
  | "availability";

const Header = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { isMobile, isTablet, scaleFactor, fontScale, isMobileBrowser } =
    useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;

  const languages: Languages[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  const scale = (value: number) => value * scaleFactor;
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );

  const dropdownIcons: Record<DropdownKey, any> = {
    symptoms: assets.search,
    specialty: assets.firstKit,
    gender: assets.gender,
    searchCity: assets.pin,
    availability: assets.calendar,
  };

  const selectedLanguageData = useSelector(
    (v: any) => v.appReducer.selectedLanguage
  );

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [authType, setAuthType] = useState("");
  const [dropdownKey, setDropdownKey] = useState(Date.now());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(selectedLanguageData);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [flagPosition, setFlagPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const flagRef = useRef<View>(null);

  const dropdownDataMap: Record<DropdownKey, string[]> = {
    symptoms: [t("fever"), t("cough"), t("headache")],
    specialty: [t("cardiology"), t("dermatology"), t("pediatrics")],
    gender: [t("male"), t("female"), t("other")],
    searchCity: [t("newYork"), t("losAngeles"), t("chicago")],
    availability: [t("today"), t("tomorrow"), t("nextWeek")],
  };

  const loginForm = [t("login"), t("dropDownRegister"), t("doctor")];

  const dropDownRefs = useRef<Record<DropdownKey, ModalDropdown | null>>({
    symptoms: null,
    specialty: null,
    gender: null,
    searchCity: null,
    availability: null,
  });

  const [selectedValues, setSelectedValues] = useState({
    symptoms: "",
    specialty: "",
    gender: "",
    searchCity: "",
    availability: "",
  });

  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const handleSelect = (key: DropdownKey, index: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDropdownPress = (key: DropdownKey) => {
    dropDownRefs.current[key]?.show();
  };

  const handleBookConsultation = () => {
    const missingFields = Object.entries(selectedValues)
      .filter(([_, value]) => !value)
      .map(([key]) => t(key as DropdownKey));

    if (missingFields.length > 0) {
      Alert.alert(`${t("pleaseSelect")}: ${missingFields.join(", ")}`);
      return;
    }

    console.log("Booking with:", selectedValues);
  };

  const handleAboutUs = () => {
    navigation.navigate("aboutus");
    setIsMenuOpen(false);
  };

  const handleContactUs = () => {
    navigation.navigate("contactus");
    setIsMenuOpen(false);
  };

  const handleDoctorLogin = () => {
    navigation.navigate("doctorLogin");
    setIsMenuOpen(false);
  };

  const handleMedicalProfession = () => {
    setIsMenuOpen(false);
  };

  const handlePatient = () => {
    setIsMenuOpen(false);
    setShowAuthModal(true);
  };

  const styles = createStyles(
    isMobile,
    isMobileOrTablet,
    scale,
    fontScales,
    isMobileBrowser
  );

  return (
    <ImageBackground
      style={[styles.background]}
      source={assets.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.container]}>
          <View style={[styles.logoContainer]}>
            <Image
              source={assets.appLogo}
              style={styles.logo}
              resizeMode="contain"
            />
            {isMobileOrTablet && (
              <View style={{ flexDirection: "row", zIndex: 1 }}>
                <TouchableOpacity
                  ref={flagRef}
                  style={styles.languageDropdownStyleMobile}
                  onPress={() => {
                    flagRef.current?.measure(
                      (x, y, width, height, pageX, pageY) => {
                        setFlagPosition({ x: pageX, y: pageY, width, height });
                        setLanguageModalVisible(true);
                      }
                    );
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontScales(fontSize.fontSize18),
                      color: color.white,
                    }}
                  >
                    {selectedLang === "en"
                      ? languages[0].flag
                      : languages[1].flag}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
                  <Ionicons
                    name="menu"
                    size={fontScales(28)}
                    color={color.white}
                  />
                </TouchableOpacity>
              </View>
            )}

            {isMobileOrTablet && isMenuOpen && (
              <Modal transparent visible={isMenuOpen}>
                <TouchableOpacity
                  style={styles.drawerOverlay}
                  activeOpacity={1}
                  onPress={() => setIsMenuOpen(false)}
                >
                  <SafeAreaView style={{flex:1}}>
                  <View style={styles.drawerContent}>
                    <View style={styles.sidebar}>
                      <View style={styles.sidebarItem}>
                        <TouchableOpacity onPress={handleAboutUs}>
                          <Text style={[styles.navLinkDrawer]}>
                            {t("aboutUs")}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleContactUs}>
                          <Text style={[styles.navLinkDrawer]}>
                            {t("contactUs")}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDoctorLogin}>
                          <Text style={[styles.navLinkDrawer]}>
                            {t("doctor")} Login
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleMedicalProfession}
                          style={[
                            styles.actionButtonOutlined,
                            isMenuOpen && { borderColor: color.lable1 },
                          ]}
                        >
                          <Text
                            style={[
                              styles.actionButtonOutlinedText,
                              isMenuOpen && { color: color.lable1 },
                            ]}
                          >
                            {t("medicalProfessionals")}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.actionButtonFilled]}
                          onPress={handlePatient}
                        >
                          <Text style={styles.actionButtonFilledText}>
                            {t("patient")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  </SafeAreaView>
                </TouchableOpacity>
              </Modal>
            )}
          </View>

          {!isMobileOrTablet && (
            <View style={styles.navLinks}>
              <TouchableOpacity onPress={() => navigation.navigate("aboutus")}>
                <Text style={styles.navLink}>{t("aboutUs")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("contactus")}
              >
                <Text style={styles.navLink}>{t("contactUs")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.actionButtonOutlined}
              >
                <Text style={styles.actionButtonOutlinedText}>
                  {t("medicalProfessionals")}
                </Text>
              </TouchableOpacity>

              <View style={{ width: fontScales(136) }}>
                <ModalDropdown
                  key={dropdownKey}
                  dropdownStyle={styles.dropdownStyle}
                  options={loginForm}
                  dropdownTextStyle={styles.dropdownTextStyle}
                  dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                  renderSeparator={() => null}
                  onSelect={(index: string, value: string) => {
                    setDropdownKey(Date.now());
                    if (value === t("login")) {
                      setShowAuthModal(true);
                    } else if (value === t("doctor")) {
                      navigation.navigate("doctorLogin");
                    } else {
                      setShowRegisterModal(true);
                    }
                  }}
                >
                  <View style={styles.actionButtonFilled}>
                    <Text style={styles.actionButtonFilledText}>
                      {t("patient")}
                    </Text>
                  </View>
                </ModalDropdown>
              </View>

              <View style={styles.languageDropdownStyle}>
                <ModalDropdown
                  key={dropdownKey}
                  dropdownStyle={styles.dropdownStyle}
                  options={languages.map((languages) => languages.label)}
                  dropdownTextStyle={styles.dropdownTextStyle}
                  dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                  renderSeparator={() => null}
                  onSelect={(index: string) => {
                    setDropdownKey(Date.now());
                    const selectedLang = languages[Number(index)].code;
                    setSelectedLang(selectedLang);
                    i18n.changeLanguage(selectedLang);
                  }}
                >
                  <Text style={{ fontSize: fontScales(fontSize.fontSize18) }}>
                    {selectedLang === "en"
                      ? languages[0].flag
                      : languages[1].flag}
                  </Text>
                </ModalDropdown>
              </View>
            </View>
          )}
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.fieldContainer}>
            <View style={[styles.searchFieldsContainer]}>
              <View style={{ marginBottom: fontScales(35) }}>
                <Text style={[styles.findDoctorText]}>{t("findADoctor")}</Text>
                <Text style={[styles.findDoctorText]}>
                  {t("atYourFingertips")}
                </Text>
              </View>
              <View style={[styles.inputGroup]}>
                {(["symptoms", "specialty", "gender"] as DropdownKey[]).map(
                  (key, index) => (
                    <React.Fragment key={key}>
                      <View
                        style={{
                          width: isMobileOrTablet ? "100%" : "33.33%",
                          marginRight: isMobileOrTablet
                            ? fontScales(15)
                            : fontScales(5),
                        }}
                      >
                        <CustomDropdown
                          key={`dropdown-${key}-${
                            selectedValues[key] || Date.now()
                          }`}
                          value={selectedValues[key]}
                          placeholder={t(key)}
                          data={dropdownDataMap[key]}
                          onChangeItem={(val) => handleSelect(key, "0", val)}
                          onInputLayoutChange={(width: any, height: any) => {
                            setDropdownWidth(width);
                            setDropdownHeight(height);
                          }}
                          containerStyle={styles.containerDropdown1}
                          dropdownHighlightText={{ color: color.lable1 }}
                          leftIconClosed={
                            <Image
                              source={dropdownIcons[key]}
                              style={[
                                styles.iconImage,
                                { marginLeft: fontScales(10) },
                              ]}
                              resizeMode="contain"
                            />
                          }
                          leftIconOpen={
                            <Image
                              source={dropdownIcons[key]}
                              style={[
                                styles.iconImage,
                                { marginLeft: fontScales(10) },
                              ]}
                              resizeMode="contain"
                            />
                          }
                          rightIconOpen={
                            <Ionicons
                              name="chevron-up-outline"
                              size={fontScales(24)}
                              color={color.grey}
                              style={{}}
                            />
                          }
                          rightIconClosed={
                            <Ionicons
                              name="chevron-down-outline"
                              size={fontScales(24)}
                              color={color.grey}
                              style={{}}
                            />
                          }
                        />
                      </View>
                      {!isMobileOrTablet && <Divider />}
                    </React.Fragment>
                  )
                )}
              </View>

              <View style={[styles.inputGroup]}>
                {(["searchCity", "availability"] as DropdownKey[]).map(
                  (key, index) => (
                    <React.Fragment key={key}>
                      <View
                        style={{
                          width: isMobileOrTablet ? "100%" : "50%",
                          marginRight: isMobileOrTablet
                            ? fontScales(15)
                            : fontScales(5),
                        }}
                      >
                        <CustomDropdown
                          key={`dropdown-${key}-${selectedValues[key]}`}
                          value={selectedValues[key]}
                          placeholder={t(key)}
                          data={dropdownDataMap[key]}
                          onChangeItem={(val) => {
                            handleDropdownPress(key);
                            handleSelect(key, "0", val);
                          }}
                          onInputLayoutChange={(width: any, height: any) => {
                            setDropdownWidth(width);
                            setDropdownHeight(height);
                          }}
                          containerStyle={styles.containerDropdown2}
                          dropdownHighlightText={{ color: color.lable1 }}
                          leftIconClosed={
                            <Image
                              source={dropdownIcons[key]}
                              style={[
                                styles.iconImage,
                                { marginLeft: fontScales(10) },
                              ]}
                              resizeMode="contain"
                            />
                          }
                          leftIconOpen={
                            <Image
                              source={dropdownIcons[key]}
                              style={[
                                styles.iconImage,
                                { marginLeft: fontScales(10) },
                              ]}
                              resizeMode="contain"
                            />
                          }
                          rightIconOpen={
                            <Ionicons
                              name="chevron-up-outline"
                              size={fontScales(24)}
                              color={color.grey}
                              style={{
                                marginLeft: scale(10),
                              }}
                            />
                          }
                          rightIconClosed={
                            <Ionicons
                              name="chevron-down-outline"
                              size={fontScales(24)}
                              color={color.grey}
                              style={{}}
                            />
                          }
                        />
                      </View>
                      {!isMobileOrTablet && <Divider />}
                    </React.Fragment>
                  )
                )}
              </View>

              <TouchableOpacity
                style={[styles.actionButtonFilled, styles.consultantButton]}
                onPress={handleBookConsultation}
              >
                <Text style={styles.actionButtonFilledText}>
                  {t("bookAConsultant")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal transparent visible={languageModalVisible} animationType="none">
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPressOut={() => setLanguageModalVisible(false)}
        >
          <View
            style={[
              styles.dropDownModalLang,
              {
                top: flagPosition.y + flagPosition.height,
                left: flagPosition.x - fontScales(100),
              },
            ]}
          >
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => {
                  setSelectedLang(lang.code);
                  i18n.changeLanguage(lang.code);
                  setLanguageModalVisible(false);
                }}
                style={{ paddingVertical: 10, paddingHorizontal: 15 }}
              >
                <Text style={styles.dropdownTextStyle}>
                  {lang.flag} {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onClosePress={() => setShowAuthModal(false)}
        onFacebookPress={() => console.log("Facebook Clicked")}
        onTwitterPress={() => console.log("Twitter Clicked")}
        onGooglePress={() => console.log("Google Clicked")}
        onEmailPress={() => console.log("Email Clicked")}
        onLoginPress={() => console.log("Login Clicked")}
        onRegisterPress={() => [
          setShowAuthModal(false),
          setShowRegisterModal(true),
        ]}
        authType={authType}
      />

      <RegisterForm
        onLogin={() => {
          setShowRegisterModal(false);
          setShowAuthModal(true);
        }}
        visible={showRegisterModal}
        onBack={() => setShowRegisterModal(false)}
        onClosePress={() => setShowRegisterModal(false)}
      />
    </ImageBackground>
  );
};

export default Header;
