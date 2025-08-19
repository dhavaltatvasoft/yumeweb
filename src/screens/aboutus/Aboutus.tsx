import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from "react-native";

import { color } from "../../theme/color";
import AntDesign from "react-native-vector-icons/AntDesign";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useScreenDimensions } from "../../../src/utils/DimensionsUtilities";
import { createStyles } from "./styles";
import { assets } from "./assets";
import { useTranslation } from "react-i18next";

export default function Aboutus() {
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

  const featureArr = t("aboutSection.featureArr", {
    returnObjects: true,
  }) as string[];
  const doctors = t("aboutSection.doctorsArr", { returnObjects: true }) as any;

  const renderSectionOne = () => {
    return (
      <View style={[styles.subContainerRow1]}>
        <View style={styles.flex1}>
          <Text style={styles.aboutTextsubtitle}>
            {t("aboutSection.dummyLorem")}
          </Text>
          <Text style={styles.aboutTextsubtitle}>
            {t("aboutSection.dummyLorem")}
          </Text>
        </View>
        <View style={[styles.flex1, isMobile && [{ marginTop: 30 }]]}>
          <Image
            source={assets.aboutus1}
            style={[styles.imageStyle, { minHeight: 300 }]}
          />
        </View>
      </View>
    );
  };
  const renderSectionOneColum = () => {
    return (
      <View style={[styles.subContainerColumn1]}>
        <Text style={styles.aboutTextsubtitle}>
          {t("aboutSection.dummyLorem")}
        </Text>
        <Text style={styles.aboutTextsubtitle}>
          {t("aboutSection.dummyLorem")}
        </Text>

        <View style={[styles.flex1, isMobile && [{ marginTop: 30 }]]}>
          <ImageBackground
            source={assets.aboutus1}
            style={styles.imageStyle1}
            resizeMode="cover"
          ></ImageBackground>
        </View>
      </View>
    );
  };
  const renderSectionThree = () => {
    return (
      <View
        style={[
          styles.subContainerRow5,
          isMobile && styles.subContainerColumn5,
        ]}
      >
        <FlatList
          data={doctors}
          renderItem={({ item, index }) => renderDocRaw(item, index)}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={[styles.flex1, { minHeight: 360, paddingBottom: 30 }]}
        />

        <View
          style={[!isMobile && styles.flex1, , isMobile && [{ marginTop: 10 }]]}
        >
          <View style={styles.subContainerRow6}>
            <Text style={[styles.heading1, { color: color.lable1 }]}>
              {t("aboutSection.getAccess")}
            </Text>
            <Text style={[styles.heading1, { color: color.lable1 }]}>
              {t("aboutSection.ofDocs")}
            </Text>
            <Text style={styles.aboutTextsubtitle}>
              {t("aboutSection.dummyLorem")}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const renderSectionTwo = () => {
    return (
      <View
        style={[
          styles.subContainerRow2,
          isMobile && styles.subContainerColumn22,
        ]}
      >
        <View style={styles.subContainerRow3}>
          <Text style={styles.heading1}>{t("aboutSection.weProvide")}</Text>
          <Text style={styles.heading1}>{t("aboutSection.canUse")}</Text>
        </View>

        <TouchableOpacity
          style={[
            isMobile ? styles.subContainerRow44 : styles.subContainerRow4,
          ]}
        >
          <Text style={styles.title1}>{t("aboutSection.getConsultants")}</Text>
          <AntDesign
            name="right"
            size={20}
            color={color.white}
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderSectionFour = () => {
    return (
      <View style={[styles.imageWrapper, { marginVertical: 10 }]}>
        <ImageBackground
          source={assets.aboutusbg}
          style={styles.subContainerRow8}
          resizeMode="cover"
        >
          <View
            style={[
              styles.subContainerRow7,
              isMobile && styles.subContainerColumn2,
            ]}
          >
            <View style={[styles.subContainerRow3]}>
              <Text style={styles.heading1}>
                {t("aboutSection.weProvide")} {t("aboutSection.canUse")}
              </Text>
            </View>

            <View style={[styles.subContainerRow3]}>
              <Text style={styles.heading2}>{t("aboutSection.weBelieve")}</Text>

              {Array.isArray(featureArr) &&
                featureArr.map((item, index) => (
                  <View key={index} style={styles.heading3View}>
                    <View>
                      <AntDesign
                        name="checkcircle"
                        size={20}
                        color={color.white}
                      />
                    </View>
                    <Text
                      style={[styles.heading3, isMobile && styles.heading33]}
                    >
                      {item}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderDocRaw = (doctor: any, index: any) => {
    return (
      <View key={index} style={styles.doctorCard1}>
        {/* Doctor Card */}
        <View style={styles.doctorCard}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />

          <View style={styles.doctorDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              {doctor.videoConsult && (
                <Text style={styles.videoConsultBadge}>
                  {t("aboutSection.videoConsult")}
                </Text>
              )}
            </View>

            <View style={styles.specialtyRow}>
              <Text style={styles.specialty}>{doctor.specialty}</Text>
              <Text style={styles.distance}>{doctor.distance}</Text>
            </View>

            <Text style={styles.hospital}>{doctor.hospital}</Text>
          </View>
        </View>

        {index === 0 && (
          <TouchableOpacity style={styles.compareButton}>
            <AntDesign
              name="checksquare"
              size={20}
              color={color.primary1}
              style={{ marginLeft: 20 }}
            />

            <Text style={styles.compareButtonText}>
              {t("aboutSection.addTOCOMPARE")}
            </Text>
          </TouchableOpacity>
        )}
        {index === 1 && (
          <TouchableOpacity style={styles.compareButton2}>
            <AntDesign
              name="checksquare"
              size={20}
              color={color.color_00D193}
              style={{ marginLeft: 20 }}
            />
            <Text style={styles.compareButtonText2}>
              {t("aboutSection.VerifiedDoc")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={[styles.scrollContent]}
      >
        <View style={{ paddingHorizontal: 40 }}>
          <View style={styles.sectionTitleWrapper}>
            <Text style={styles.aboutText}>{t("aboutSection.aboutUs")}</Text>
          </View>

          {isMobile ? renderSectionOneColum() : renderSectionOne()}

          {renderSectionTwo()}

          {renderSectionThree()}
          {renderSectionFour()}
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
