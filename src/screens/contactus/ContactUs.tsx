import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { color } from "../../theme/color";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useScreenDimensions } from "../../../src/utils/DimensionsUtilities";
import { useTranslation } from "react-i18next";
import { createStyles } from "./styles";

export default function ContactUs() {
  const { isMobile, isTablet, isDesktop, scaleFactor, fontScale } =
    useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const scale = useCallback(
    (value: number) => value * scaleFactor,
    [scaleFactor]
  );
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );
  const styles = useMemo(
    () =>
      createStyles(isMobile, isMobileOrTablet, isDesktop, scale, fontScales),
    [isMobile, isMobileOrTablet, isDesktop, scale, fontScales]
  );
  const { t } = useTranslation();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in both subject and message.");
      return;
    }
    alert(`Subject: ${subject}\nMessage: ${message}`);
    setSubject("");
    setMessage("");
  };

  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          isMobile && styles.scrollContentSmall,
        ]}
      >
        <View
          style={{
            paddingHorizontal: fontScales(40),
            flex: 1,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <View
            style={[
              styles.leftSection,
              isMobile && styles.fullWidth,
              !isMobile && {
                flex: 1,
              },
            ]}
          >
            <Text style={styles.title}>{t("contactUsSection.contactUs")}</Text>
            <Text style={styles.subtitle}>
              {t("contactUsSection.gladtoHere")}
            </Text>

            <Text style={styles.label}>{t("contactUsSection.subject")}</Text>
            <TextInput
              value={subject}
              onChangeText={setSubject}
              placeholder={t("contactUsSection.subject")}
              placeholderTextColor={color.color_E0DEE2}
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: 10 }]}>
              {t("contactUsSection.message")}
            </Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder={t("contactUsSection.messagePlaceholder")}
              multiline
              numberOfLines={6}
              placeholderTextColor={color.color_E0DEE2}
              style={styles.messageInput}
            />

            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>
                {t("contactUsSection.send")}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.rightSection,
              isMobile && styles.fullWidth,
              !isMobile && { flex: 0.5 },
            ]}
          >
            <Text style={styles.supportTitle}>
              {t("contactUsSection.customerSupport")}
            </Text>

            <TouchableOpacity
              style={styles.supportRow}
              onPress={() => handlePhonePress("18001119550")}
            >
              <View style={styles.iconBox}>
                <FontAwesome
                  name="phone"
                  size={fontScales(30)}
                  color={color.primary1}
                />
              </View>
              <View style={styles.supportTextContainer}>
                <Text style={styles.supportLabel}>
                  {t("contactUsSection.customerCare")}
                </Text>
                <Text style={styles.supportValue}>1800 111 9550</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.supportRow}
              onPress={() => handlePhonePress("18001119550")}
            >
              <View style={styles.iconBox}>
                <FontAwesome
                  name="phone"
                  size={fontScales(30)}
                  color={color.primary1}
                />
              </View>
              <View style={styles.supportTextContainer}>
                <Text style={styles.supportLabel}>
                  {t("contactUsSection.forQueries")}
                </Text>
                <Text style={styles.supportValue}>1800 111 9550</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.supportRow}
              onPress={() => handleEmailPress("mehul.senva@gmail.com")}
            >
              <View style={styles.iconBox}>
                <MaterialIcons
                  name="email"
                  size={fontScales(30)}
                  color={color.primary1}
                />
              </View>
              <View style={styles.supportTextContainer}>
                <Text style={styles.supportLabel}>
                  {t("contactUsSection.emailSupport")}
                </Text>
                <Text style={styles.supportValue}>mehul.senva@gmail.com</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
