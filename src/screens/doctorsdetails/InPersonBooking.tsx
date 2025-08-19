import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { color, font } from "../../theme/color";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { useTranslation } from "react-i18next";
import { screenStyle } from "./stylesInPerson";
import { screenStyle as screenStyle1 } from "./styles";
import Feather from "react-native-vector-icons/Feather";
import CustomInput from "../../components/custominput/CustomInput";
import CustomDropdown from "../../components/customdropdown/CustomDropdown";
import dayjs from "dayjs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation,RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";
import CustomModal from "../../components/custommodal/CustomModal";
import Entypo from "react-native-vector-icons/Entypo";
import CalendarSlotSelector from "./component/CalendarSlots";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type InPersonBookingRouteProp = RouteProp<RootStackParamList, 'inpersonbooking'>;

const InPersonBooking = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
 const route = useRoute<InPersonBookingRouteProp>();
  const { consultancyType } = route.params || "In-Person";
  //const { consultancyType } = route.params;

  console.log("consultancyType1111",consultancyType);
  
  
  const { isMobile, isTablet, isDesktop, scaleFactor, fontScale } =
    useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const scale = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor,isMobile,isDesktop]
  );
  const styles = useMemo(
    () => screenStyle(isTablet, isMobile, isMobileOrTablet, isDesktop, scale),
    [isMobile, isMobileOrTablet, isDesktop, scale]
  );
  const styles1 = useMemo(
    () => screenStyle1(isTablet, isMobile, isMobileOrTablet, isDesktop, scale),
    [isMobile, isMobileOrTablet, isDesktop, scale]
  );

  const userData = t("inPerson.userData", { returnObjects: true }) as any;

    const consultancyTypeTabs = t("doctorsDetailsSection.consultancyTypeTabs", {
    returnObjects: true,
  }) as string[];

  const topStatesWithCities = t("inPerson.topStatesWithCities", {
    returnObjects: true,
  }) as any;

  const states = useMemo(
    () => topStatesWithCities.map((item: { state: any }) => item.state),
    []
  );
  const [selectedState, setSelectedState] = useState(states[0]);
  const cities = useMemo(() => {
    return (
      topStatesWithCities.find(
        (item: { state: string }) => item.state === selectedState
      )?.cities || []
    );
  }, [selectedState]);

  const [selectedCities, setselectedCities] = useState("");

  const todayFormatted = dayjs().format("DD MMM YYYY ddd");
  const todayFormatted2 = dayjs().format("DD MMM ddd");

  const doctorOb = t("doctorsDetailsSection.doctorOb", {
    returnObjects: true,
  }) as any;
  const [selectedName, setSelectedName] = useState<string | null>(userData[0]);
  const [phoneNo, setPhoneNo] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDateFormated, setSelectedDateFormated] =
    useState(todayFormatted);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState("10:30 PM");
  const [modalTimeVisible, setModalTimeVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBookingForOther, setIsBookingForOther] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [getUpdate, setGetUpate] = useState(false);
 const [consultancyTypes, setConsultancyTypes] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
  setConsultancyTypes(consultancyType);
}, [consultancyType]);


  const handleUploadClick = useCallback(
    () => fileInputRef.current?.click(),
    []
  );
  const handleRemoveClick = useCallback(() => setFile(null), []);
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const uploadedFile = event.target.files?.[0];
      if (uploadedFile) setFile(uploadedFile);
    },
    []
  );

  const handleStateChange = useCallback(
    (state: string) => {
      setSelectedState(state);
      if (state !== selectedState) setselectedCities("");
    },
    [selectedState]
  );

  const handleSlotSelection = useCallback((date: string, time: string) => {
    const formattedDate = dayjs(date).format("DD MMM ddd");
    setSelectedDateFormated(formattedDate);
    setSelectedDate(date);
    setSelectedTime(time);
  }, []);

  const downloadFileFromUrl = useCallback(async () => {
    try {
      const response = await fetch("/sample.pdf");
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error", error);
    }
  }, []);

  const PersonCard = useCallback(
    ({
      index,
      name,
      selected,
      onPress,
    }: {
      index: number;
      name: string;
      selected: boolean;
      onPress: () => void;
    }) => (
      <TouchableOpacity style={isMobile?styles.cardMobile:styles.card} onPress={onPress}>
        <Text style={index === 6 ? styles.nameSomeonetext : styles.nameActive}>
          {name}
        </Text>
        <View style={[styles.radio, selected && styles.selectedRadio]}>
          {selected && <Feather name="check" size={14} color="white" />}
        </View>
      </TouchableOpacity>
    ),
    [
      styles.card,
      styles.nameSomeonetext,
      styles.nameActive,
      styles.radio,
      styles.selectedRadio,
    ]
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.bodyWrapper}>
          <View style={styles.leftColumn}>
            <View style={styles.leftTopSection}>
              <Text style={styles.aboutyouText}>
                {t("inPerson.topHeaderTitleLeft")}
              </Text>

           <FlatList
  data={userData}
  keyExtractor={(item) => item}
  key={isMobile ? 'flatlist-single' : 'flatlist-double'} // 👈 force re-render
  numColumns={isMobile ? 1 : 2}
  contentContainerStyle={styles.profileCardrow}
  columnWrapperStyle={!isMobile ? styles.profileCardrow : undefined}
  renderItem={({ item, index }) => (
    <PersonCard
      index={index}
      name={item}
      selected={item === selectedName}
      onPress={() => {
        setSelectedName(item);
        setIsBookingForOther(index === 6);
      }}
    />
  )}
/>

              {isBookingForOther &&
                <View style={styles.marginVertical4}>
                <CustomInput
                  label={t("doctorsDetailsSection.patientName")}
                  placeholder={t(
                    "doctorsDetailsSection.patientNamePloceholder"
                  )}
                  value={patientName}
                  onChangeText={setPatientName}
                  containerStyle={{ flex: 1, marginRight: scale(10) }}
                />
              </View>}

              <View style={styles.marginVertical4}>
                <CustomInput
                  label={t("doctorsDetailsSection.phonenumber")}
                  placeholder={t(
                    "doctorsDetailsSection.phonenumberPloceholder"
                  )}
                  value={phoneNo}
                  onChangeText={setPhoneNo}
                  containerStyle={{ flex: 1, marginRight: scale(10) }}
                />
              </View>
              <View style={styles.marginVertical4}>
                <CustomInput
                  label={t("doctorsDetailsSection.address")}
                  placeholder={t("doctorsDetailsSection.addressPloceholder")}
                  value={address}
                  onChangeText={setAddress}
                  containerStyle={{ flex: 1, marginRight: scale(10) }}
                />
              </View>
              <View
                style={[
                  styles.marginVertical4,
                  { flexDirection: isMobile ? "column" : "row" },
                ]}
              >
                <CustomInput
                  label={t("doctorsDetailsSection.age")}
                  placeholder={t("doctorsDetailsSection.agePloceholder")}
                  value={age}
                  onChangeText={setAge}
                  containerStyle={styles.inputDropdownWrapper}
                />
                <CustomDropdown
                  label={t("doctorsDetailsSection.state")}
                  placeholder={t("doctorsDetailsSection.statePlaceHolder")}
                  value={selectedState}
                  data={states}
                  onChangeItem={handleStateChange}
                  dropdownStyle={styles.dropdown}
                  dropdownWrapper={styles.inputDropdownWrapper}
                />
                <CustomDropdown
                  label={t("doctorsDetailsSection.city")}
                  placeholder={t("doctorsDetailsSection.cityPlaceHolder")}
                  value={selectedCities}
                  data={cities}
                  onChangeItem={setselectedCities}
                  dropdownStyle={styles.dropdown}
                  dropdownWrapper={styles.inputDropdownWrapper}
                />
              </View>
              <View style={styles.marginVertical4}>
                <Text style={styles.label}>{t("inPerson.uploadForm")}</Text>

                <View style={styles.uploadContainer2}>
                  <Text style={styles.labelup}>{t("inPerson.filledForm")}</Text>

                  <TouchableOpacity
                    onPress={downloadFileFromUrl}
                    style={styles.downloadContainer}
                  >
                    <Text style={styles.labelDown}>
                      {t("inPerson.downloadForm")}
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
              <View style={styles.marginVertical4}>
                <View style={styles.uploadContainer}>
                  {Platform.OS === "web" && (
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  )}
                  <Text
                    style={[
                      file?.name ? styles.dropdownText : styles.placeholderText,
                    ]}
                  >
                    {file?.name || t("inPerson.uploadForm")}
                  </Text>
                  {file?.name ? (
                    <TouchableOpacity onPress={handleRemoveClick}>
                      <Text style={styles.uploadText}>
                        {t("inPerson.removeFile")}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={handleUploadClick}>
                      <Text style={styles.uploadText}>
                        {t("inPerson.uploadFile")}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={styles.marginVertical4}>
                <CustomInput
                  label={t("doctorsDetailsSection.additionalNotes")}
                  placeholder={t("doctorsDetailsSection.addNotesPloceholder")}
                  value={notes}
                  onChangeText={setNotes}
                  containerStyle={{ flex: 1, marginRight: scale(10) }}
                  textInputStyle={{ height: scale(200) }}
                  inputWrapperStyle={{ height: scale(200) }}
                  multiline={true}
                />
              </View>
            </View>
          </View>

          <View style={styles.rightColumn}>
            <View style={styles1.appointmentSectionWrapper}>
              <Text style={styles.scheduleAppointmentTitle}>
                {t("inPerson.reviewDetails")}
              </Text>
              <View style={styles.compareCard}>
                <Image
                  source={{uri:t("doctorsDetailsSection.dummyImage")}}
                  style={styles.compareCardAvatar}
                />
                <View style={styles.compareCardTextContainer}>
                  <Text style={styles.compareCardName}>{doctorOb.name}</Text>
                  <Text style={styles.compareCardSpecialty}>
                    {doctorOb.specialty}
                  </Text>
                </View>
              </View>

              <View style={styles.marginVertical10}>
                <Text style={styles.lableGray}>
                  {t("inPerson.appointment")}
                </Text>
                <View style={styles.appointmentTimeView}>
                  <Text style={styles.labelblack}>
                    {selectedDateFormated} - {selectedTime}
                  </Text>
                  <TouchableOpacity onPress={() => setModalTimeVisible(true)}>
                    <Text style={styles.labelChangeSlot}>
                      {t("doctorsDetailsSection.changeSlot")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.marginVertical10}>
                <Text style={styles.lableGray}>
                  {t("doctorsDetailsSection.consultancyReasonPlaceholder")}
                </Text>
                <Text style={styles.labelblack}>
                  {t("inPerson.healthCheckup")}
                </Text>
              </View>
              <View style={styles.marginVertical10}>
                <Text style={styles.lableGray}>
                  {t("doctorsDetailsSection.consultancyType")}
                </Text>
                <Text style={styles.labelblack}>{consultancyType}</Text>
              </View>
              <View
                style={[
                  styles.marginVertical14,
                  { flexDirection: "row", alignItems: "center",paddingRight:scale(20) },
                ]}
              >
                <Ionicons
                  size={scale(28)}
                  name={policy ? "checkbox" : "checkbox-outline"}
                  color={policy ? color.color_FF008A : color.color_28252C80}
                  onPress={() => setPolicy(!policy)}
                />
                <Text style={[styles.policyText, { marginLeft: scale(20) }]}>
                  {t("inPerson.Ihaveread")}{" "}
                  <Text
                    onPress={() => navigation.navigate("term")}
                    style={[
                      styles.policyText,
                      { textDecorationLine: "underline" },
                    ]}
                  >
                    {t("doctorsDetailsSection.termsservice")}
                  </Text>{" "}
                  {t("doctorsDetailsSection.and")}{" "}
                  <Text
                    onPress={() => navigation.navigate("privacypolicy")}
                    style={[
                      styles.policyText,
                      { textDecorationLine: "underline" },
                    ]}
                  >
                    {t("inPerson.privacyPolicy")}
                  </Text>
                </Text>
              </View>

               {consultancyTypes === consultancyTypeTabs[1] &&
              <View style={[styles.marginVertical14, { flexDirection: "row" }]}>
                <Ionicons
                  size={scale(28)}
                  name={getUpdate ? "checkbox" : "checkbox-outline"}
                  color={getUpdate ? color.color_FF008A : color.color_28252C80}
                  onPress={() => setGetUpate(!getUpdate)}
                />
                <View>
                  <Text style={[styles.policyText, { marginLeft: scale(20) }]}>
                    {t("inPerson.getUpdates")}
                  </Text>
                  <Text
                    style={[
                      styles.lableGray,
                      { marginLeft: scale(20), marginTop: scale(6) },
                    ]}
                  >
                    {t("inPerson.getUpdatesSub")}
                  </Text>
                </View>
              </View>}


              {consultancyTypes === consultancyTypeTabs[0]?
            
              <View style={styles.marginVertical14}>
                <TouchableOpacity
                  style={[
                    styles1.scheduleAppointmentButton,
                    { opacity: policy ? 1 : 0.5 },
                  ]}
                  disabled={!policy}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles1.scheduleButtonText}>
                    {t("inPerson.confirmBooking")}
                  </Text>
                </TouchableOpacity>
              </View>

              :

                <View style={styles.marginVertical14}>
                <TouchableOpacity
                  style={[
                    styles1.scheduleAppointmentButton,
                    { opacity: policy && getUpdate ? 1 : 0.5 },
                  ]}
                  disabled={!(policy && getUpdate)}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles1.scheduleButtonText}>
                    {t("inPerson.confirmBooking")}
                  </Text>
                </TouchableOpacity>
              </View>
            }

            
            </View>
          </View>
        </View>
        <View style={styles.footerSection}>
          <Footer />
        </View>
      </ScrollView>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        modalStyle={{ padding: scale(20),width: isMobile ? "80%" :scale(450)}}
       
      >
        <View style={{ height: "auto", paddingBottom: 20, width: "auto" }}>
          <View style={styles1.iconWrapper}>
            <Ionicons
              size={scale(60)}
              name={"checkmark-circle-sharp"}
              color={color.color_00D193}
            />
          </View>
          <Text style={styles1.labelBooking}>
            {t("doctorsDetailsSection.bookingReceived")}
          </Text>
          <Text style={styles1.labelBookingDetails}>
            {t("doctorsDetailsSection.bookingsuccessfully")}
          </Text>
          <TouchableOpacity
            style={[
              styles1.scheduleAppointmentButton,
              { height: scale(40), marginVertical: scale(15) },
            ]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles1.scheduleButtonText}>
              {t("doctorsDetailsSection.okayCap")}
            </Text>
          </TouchableOpacity>
        </View>
      </CustomModal>

      <CustomModal
        visible={modalTimeVisible}
        onClose={() => setModalTimeVisible(false)}
        modalStyle={{
          padding: scale(2),
          width: isDesktop ? scale(600) : "98%",
          height:'80%'
        }}
      >
        <ScrollView
          
          style={{
            height: "auto",
            paddingHorizontal: scale(40),
            paddingBottom: 20,
            width: "auto",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: scale(15),
            }}
          >
            <Text style={styles.labelChangeSlot2}>
              {t("doctorsDetailsSection.changeSlot")}
            </Text>
            <Entypo
              onPress={() => setModalTimeVisible(false)}
              name="cross"
              size={isMobileOrTablet ? scale(26) : scale(36)}
              color={color.lable1}
            />
          </View>
          <View style={styles1.slotSelectionHeader}>
            <Text style={styles1.formLabel}>
              {t("doctorsDetailsSection.selectSlot")}
            </Text>
            <Text style={styles1.selectedSlotDateText}>
              {selectedDate && dayjs(selectedDate).format("DD MMM ddd")}
              {selectedTime && ` - ${selectedTime}`}
            </Text>
          </View>
          <CalendarSlotSelector onSlotPress={handleSlotSelection} />
          <TouchableOpacity
            style={styles1.scheduleAppointmentButton}
            onPress={() => setModalTimeVisible(false)}
          >
            <Text style={styles1.scheduleButtonText}>
              {t("doctorsDetailsSection.confirmCap")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </CustomModal>
    </View>
  );
};

export default InPersonBooking;
