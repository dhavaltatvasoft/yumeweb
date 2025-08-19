import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { createStyles } from "./styles";
import { assets } from "./assets";
import { useTranslation } from "react-i18next";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { color } from "../../theme/color";

const PublicTopic: React.FC = () => {
  const { isMobile, isTablet, isDesktop, scaleFactor, fontScale } =
    useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const scale = useCallback(
    (value: number) => value * scaleFactor,
    [scaleFactor]
  );
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [fontScale]
  );
  const styles = useMemo(
    () =>
      createStyles(isMobile, isMobileOrTablet, isDesktop, scale, fontScales),
    [isMobile, isMobileOrTablet, isDesktop, scale, fontScales]
  );
  const { t } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sidebarLinks = [
    t("publicTopicSection.freeTelemedicinePlatform"),
    t("publicTopicSection.commonBowelDisorders"),
    t("publicTopicSection.sexuality"),
    t("publicTopicSection.lifePhasesAndHealth"),
    t("publicTopicSection.hcvAndHeartHealth"),
    t("publicTopicSection.mentalHealth"),
    t("publicTopicSection.physicalActivityAndWellness"),
  ];
  const [selectedTopic, setSelectedTopic] = useState(sidebarLinks[1]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.outerContainer}>
        <Header />
        {isMobile && (
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.dropdownButtonText}>
                {t("publicTopicSection.popularTopics")}
              </Text>
            </TouchableOpacity>
            {isDropdownOpen && (
              <View style={styles.dropdownMenu}>
                {sidebarLinks.map((link, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      link === selectedTopic && styles.activeDropdownItem,
                    ]}
                    onPress={() => {
                      setSelectedTopic(link);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        link === selectedTopic && styles.activeDropdownItemText,
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {link}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
        <ScrollView
          bounces={false}
          bouncesZoom={false}
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.content}>
            {!isMobile && (
              <View style={styles.sidebar}>
                <Text style={styles.topicHead}>
                  {t("publicTopicSection.popularTopics")}
                </Text>
                {sidebarLinks.map((link, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedTopic(link);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.sidebarLink,
                        link === selectedTopic && styles.activeSidebar,
                      ]}
                    >
                      {link}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View style={styles.article}>
              <Text style={styles.title}>{selectedTopic}</Text>

              <View style={styles.authorContainer}>
                <View style={styles.authorTextContainer}>
                  <Image
                    source={assets.doctor}
                    style={styles.authorImage}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.author}>
                      {t("publicTopicSection.doctor")}
                    </Text>
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        <FontAwesome5
                          name="calendar-check"
                          size={fontScales(14)}
                          color={color.grey}
                          style={{ marginRight: fontScales(5) }}
                        />
                        <Text style={styles.date}>
                          {t("publicTopicSection.date")}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <MaterialIcons
                          name="mode-comment"
                          size={fontScales(15)}
                          color={color.grey}
                        />
                        <Text style={styles.date}>
                          {t("publicTopicSection.comments")}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <Text style={[styles.paragraph, { marginLeft: fontScales(8) }]}>
                {t("publicTopicSection.paraOne")}
              </Text>

              <Text style={styles.sectionTitle}>
                {t("publicTopicSection.sectionOne")}
              </Text>
              <Text style={styles.paragraph}>
                {t("publicTopicSection.paraTwo")}
              </Text>

              <Text style={styles.sectionTitle}>
                {t("publicTopicSection.sectionTwo")}
              </Text>
              <Text style={styles.paragraph}>
                {t("publicTopicSection.paraThree")}
              </Text>

              <Text style={styles.sectionTitle}>
                {t("publicTopicSection.comments")}
              </Text>

              <View style={styles.comment}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: fontScales(50),
                      width: fontScales(50),
                      borderRadius: fontScales(50),
                      marginRight: fontScales(11),
                      marginBottom: fontScales(14),
                    }}
                    source={assets.author}
                  />
                  <View>
                    <Text style={styles.commentAuthor}>
                      {t("publicTopicSection.commentAuthorOne")}
                    </Text>
                    <Text style={styles.dateQuote}>
                      {t("publicTopicSection.commentAuthorOneDate")}
                    </Text>
                  </View>
                </View>
                <Text style={styles.commentText}>
                  {t("publicTopicSection.commentAuthorOneText")}
                </Text>
              </View>

              <View style={styles.comment}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: fontScales(50),
                      width: fontScales(50),
                      borderRadius: fontScales(50),
                      marginRight: fontScales(11),
                      marginBottom: fontScales(14),
                    }}
                    source={assets.author}
                  />
                  <View>
                    <Text style={styles.commentAuthor}>
                      {t("publicTopicSection.commentAuthorTwo")}
                    </Text>
                    <Text style={styles.dateQuote}>
                      {t("publicTopicSection.commentAuthorTwoDate")}
                    </Text>
                  </View>
                </View>
                <Text style={styles.commentText}>
                  {t("publicTopicSection.commentAuthorTwoText")}
                </Text>
              </View>

              <Text style={styles.sectionTitle}>
                {t("publicTopicSection.leaveAComment")}
              </Text>

              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {t("publicTopicSection.name")}
                  </Text>
                  <TextInput
                    placeholder={t("publicTopicSection.name")}
                    placeholderTextColor={color.placeholder1}
                    style={[
                      styles.input,
                      {
                        flex: 1,
                        marginRight: isMobile ? 0 : fontScales(8),
                        outlineStyle: "none" as any,
                      },
                    ]}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {t("publicTopicSection.email")}
                  </Text>
                  <TextInput
                    placeholder={t("publicTopicSection.email")}
                    placeholderTextColor={color.placeholder1}
                    style={[
                      styles.input,
                      { flex: 1, outlineStyle: "none" as any },
                    ]}
                  />
                </View>
              </View>

              <Text style={styles.label}>
                {t("publicTopicSection.message")}
              </Text>
              <TextInput
                placeholder={t("publicTopicSection.message")}
                placeholderTextColor={color.placeholder1}
                multiline
                style={[
                  styles.input,
                  {
                    outlineStyle: "none" as any,
                    flex: 1,
                    minHeight: isMobile ? fontScales(80) : fontScales(120),
                  },
                ]}
              />

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  {t("publicTopicSection.submit")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Footer />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PublicTopic;
