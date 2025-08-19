import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useScreenDimensions } from "../../../src/utils/DimensionsUtilities";
import { createStyles } from "./styles";
import { assets } from "./assets";
import { useTranslation } from "react-i18next";

const Faq: React.FC = () => {
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
    [isMobile, isMobileOrTablet, isDesktop, scale]
  );
  const { t } = useTranslation();

  const faqCategories = [
    { title: t("faqSection.aboutYume"), icon: assets.aboutyume },
    { title: t("faqSection.dataPrivacy"), icon: assets.dataandprivacy },
    { title: t("faqSection.appointments"), icon: assets.appointments },
    { title: t("faqSection.account"), icon: assets.account },
    { title: t("faqSection.reviews"), icon: assets.reviews },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header />

      <View style={styles.searchContainer}>
        <TextInput
          placeholder={t("faqSection.freaskQuestion")}
          placeholderTextColor="#aaa"
          style={[styles.searchInputBox, { outlineStyle: "none" as any }]}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>{t("faqSection.search")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContent}>
          <Text style={styles.faqHeader}>{t("faqSection.askQuestion")}</Text>

          <View style={styles.categoryGrid}>
            {faqCategories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <Image source={category.icon} style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>{category.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Faq;
