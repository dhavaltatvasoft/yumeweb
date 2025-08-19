import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import CustomModal from "../../components/custommodal/CustomModal";
import CustomDropdown from "../../components/customdropdown/CustomDropdown";
import { screenStyle } from "./styles";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { useTranslation } from "react-i18next";
import CustomInput from "../../components/custominput/CustomInput";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color, font } from "../../theme/color";
import DateInput, { DateInputRef } from "./component/DateInput";
import TimeInput from "./component/TimeInput";
import Entypo from "react-native-vector-icons/Entypo";

interface JoinWaitListViewModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onConfirm: () => void;
}

const JoinWaitListViewModal = ({
  modalVisible,
  setModalVisible,
  onConfirm,
}: JoinWaitListViewModalProps) => {
  const { isMobile, isTablet, isDesktop, scaleFactor, fontScale } =
    useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const scale = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );

  const styles1 = useMemo(
    () => screenStyle(isTablet, isMobile, isMobileOrTablet, isDesktop, scale),
    [isMobile, isMobileOrTablet, isDesktop, scale]
  );
  const styles = useMemo(() => createStyles(scale,isDesktop,isMobile), [scale]);

  const { t } = useTranslation();
  const reasonOptions = t("doctorsDetailsSection.reasonOptions", {
    returnObjects: true,
  }) as any[];
  const consultancyTypeTabs = t("doctorsDetailsSection.consultancyTypeTabs", {
    returnObjects: true,
  }) as string[];

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [consultancyTypeModal, setConsultancyTypeModal] = useState(
    consultancyTypeTabs[0]
  );
  const [selectedReasonModal, setSelectedReasonModal] = useState("");
  const [policy, setPolicy] = useState(false);
  const [startDate, setStartDate] = useState("");
  const dateInputRef = useRef<DateInputRef>(null);
  const [time, setTime] = useState("");

  const handleConfirmPress = useCallback(() => {
    setModalVisible(false);
    onConfirm?.();
  }, [onConfirm, setModalVisible]);

  const handleCalendarPress = useCallback(
    () => dateInputRef.current?.openPicker(),
    []
  );
  const handleTimeIconPress = useCallback(() => {}, []); // No specific action needed for console.log anymore

  return (
    <CustomModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      modalStyle={{
        padding: scale(20),
        width: isMobile ? "80%" : "45%",
        height: "70%",
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            {t("doctorsDetailsSection.joinWaitList")}
          </Text>
          <Entypo
            onPress={() => setModalVisible(false)}
            name="cross"
            size={isMobileOrTablet ? scale(26) : scale(36)}
            color={color.lable1}
          />
        </View>

        <View style={styles.bodyContainer}>
          <DateInput
            ref={dateInputRef}
            label={t("doctorsDetailsSection.preferredDate")}
            date={startDate}
            setDate={setStartDate}
            onPressRight={handleCalendarPress}
            labelStyle={styles1.labelPlaceholder}
            inputContainerStyle={styles.datetineBox}
          />
          <TimeInput
            label={t("doctorsDetailsSection.preferredTime")}
            time={time}
            onTimeChange={setTime}
            onPressIcon={handleTimeIconPress}
            labelStyle={styles1.labelPlaceholder}
            inputContainerStyle={styles.datetineBox} isFromManage={false}          />
        </View>

        <CustomInput
          label={t("doctorsDetailsSection.patientName")}
          placeholder={t("doctorsDetailsSection.patientNamePloceholder")}
          value={name}
          onChangeText={setName}
          containerStyle={styles.marginVertical4}
        />
        <CustomInput
          label={t("doctorsDetailsSection.age")}
          placeholder={t("doctorsDetailsSection.agePloceholder")}
          value={age}
          onChangeText={setAge}
          containerStyle={styles.marginVertical4}
        />
        <CustomInput
          label={t("doctorsDetailsSection.phonenumber")}
          placeholder={t("doctorsDetailsSection.phonenumberPloceholder")}
          value={phoneNo}
          onChangeText={setPhoneNo}
          containerStyle={styles.marginVertical4}
        />
        <CustomInput
          label={t("doctorsDetailsSection.address")}
          placeholder={t("doctorsDetailsSection.addressPloceholder")}
          value={address}
          onChangeText={setAddress}
          containerStyle={styles.marginVertical4}
        />

        <View style={{ marginVertical: scale(4) }}>
          <Text style={styles1.formLabel}>
            {t("doctorsDetailsSection.consultancyType")}
          </Text>
          <View style={styles1.consultancyTypeSelectionBox}>
            <View style={styles1.consultancyTypeRow}>
              {consultancyTypeTabs.map((tab: string) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    {
                      backgroundColor:
                        tab === consultancyTypeModal
                          ? "#28252C"
                          : "transparent",
                    },
                    styles1.consultancyTypeButton,
                  ]}
                  onPress={() => setConsultancyTypeModal(tab)}
                >
                  <Text
                    style={
                      tab === consultancyTypeModal
                        ? styles1.consultancyTypeTextActive
                        : styles1.consultancyTypeTextInactive
                    }
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.dropdownWrapper}>
          <CustomDropdown
            label={t("doctorsDetailsSection.consultancyReasonPlaceholder")}
            placeholder={t(
              "doctorsDetailsSection.consultancyReasonPlaceholder"
            )}
            value={selectedReasonModal}
            data={reasonOptions}
            onChangeItem={setSelectedReasonModal}
            dropdownStyle={styles.dropdown}
            containerStyle={{ height: scale(50) }}
          />
        </View>

        <View
          style={{
            marginVertical: scale(14),
            flexDirection: "row",
            alignItems: isMobile ? "flex-start" : "center",
          }}
        >
          <Ionicons
            size={scale(28)}
            name={policy ? "checkbox" : "checkbox-outline"}
            color={policy ? color.color_FF008A : color.color_28252C80}
            onPress={() => setPolicy(!policy)}
          />
          <View style={{ flex: 1, marginLeft: scale(6) }}>
            <Text style={[styles1.policyText1, { marginLeft: scale(5) }]}>
              I have read the{" "}
              <Text
                style={[
                  styles1.policyText1,
                  { textDecorationLine: "underline" },
                ]}
              >
                {t("doctorsDetailsSection.termsservice")}
              </Text>{" "}
              {t("doctorsDetailsSection.and")}{" "}
              <Text
                style={[
                  styles1.policyText1,
                  { textDecorationLine: "underline" },
                ]}
              >
                {t("inPerson.privacyPolicy")}
              </Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles1.scheduleAppointmentButton,
            { opacity: policy ? 1 : 0.5 },
          ]}
          disabled={!policy}
          onPress={handleConfirmPress}
        >
          <Text style={styles1.scheduleButtonText}>
            {t("doctorsDetailsSection.confirmCap")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </CustomModal>
  );
};

const createStyles = (
  scale: (val: number) => number,
  isDesktop: boolean,
    isMobile: boolean,

) =>

  StyleSheet.create({
    modal: {
      padding: scale(20),
      width: "90%",
      height: "70%",
      backgroundColor: "#fff",
      borderRadius: scale(12),
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: scale(40),
      marginHorizontal: scale(10),
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: scale(20),
    },
    bodyContainer: {
      marginVertical: scale(4),
      justifyContent: "space-between",
      flexDirection: isMobile?"column":"row",
    },
    title: {
      fontSize: scale(20),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      marginBottom: scale(20),
    },
    dropdownWrapper: {
      zIndex: 1000,
      marginBottom: scale(20),
    },
    dropdown: {
      zIndex: 1000,
      elevation: scale(5),
    },
    labelBooking: {
      fontSize: scale(30),
      color: color.lable1,
      fontFamily: font.Rubik_400r,
      textAlign: "center",
    },
    marginVertical4: {
      marginVertical: scale(4),
    },
    datetineBox: {
      borderColor: "#ccc",
      paddingHorizontal: scale(10),
      marginHorizontal: scale(5),
    },
  });

export default JoinWaitListViewModal;
