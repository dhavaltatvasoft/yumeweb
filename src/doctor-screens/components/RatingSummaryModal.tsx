import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { color, font, fontSize } from "../../theme/color";
import { t } from "i18next";

interface RatingSummaryModalProps {
  visible: boolean;
  onClose: () => void;
  ratingData: {
    reviewerName: string;
    reviewDate: string;
    rating: string;
    feedback: string;
  };
}

export default function RatingSummaryModal({
  visible,
  onClose,
  ratingData,
}: RatingSummaryModalProps) {
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = (value: number) => value * fontScale;

  const styles = createStyles(scale, isMobile, fontScales);

  const ratingCategories = [
    { label: t("ratingCat.bedside"), rating: 5 },
    { label: t("ratingCat.answered"), rating: 5 },
    { label: t("ratingCat.afterCare"), rating: 4 },
    { label: t("ratingCat.timeSpent"), rating: 5 },
    { label: t("ratingCat.responsive"), rating: 5 },
    { label: t("ratingCat.courtesy"), rating: 0 },
    { label: t("ratingCat.payProcess"), rating: 0 },
    { label: t("ratingCat.waitTimes"), rating: 0 },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>{t("dashboard.appointments.ratingSummary") || "Rating Summary"}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={fontScales(24)} color={color.color_212121} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent}>
            <View style={styles.ratingList}>
              {ratingCategories.map((item, index) => (
                <View key={index} style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>{item.label}</Text>
                  <View style={styles.starsRow}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name={i < item.rating ? "star" : "star-outline"}
                        size={fontScales(18)}
                        color={i < item.rating ? "#00C29D" : "#D9D9D9"}
                        style={{ marginHorizontal: 2 }}
                      />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (
  scale: (val: number) => number,
  isMobile: boolean,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: color.white,
      borderRadius: fontScales(10),
      width: isMobile ? "90%" : 400,
      maxHeight: "80%",
      padding: fontScales(16),
      shadowColor: color.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: fontScales(16),
    },
    title: {
      fontSize: fontScales(24),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
    },
    scrollContent: {
      flexGrow: 1,
    },
    ratingList: {
      marginTop: fontScales(10),
    },
    ratingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: fontScales(12),
    },
    ratingLabel: {
      fontFamily: font.Rubik_400r,
      fontSize: fontScales(14),
      color: color.color_28252C,
      flex: 1,
    },
    starsRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      flex: 1,
    },
  });
