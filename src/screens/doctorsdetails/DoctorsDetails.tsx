import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import CommonCheckItem from "./component/CommonCheckItem";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { color, font } from "../../theme/color";
import { assets } from "./assets";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { useTranslation } from "react-i18next";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CalendarSlotSelector from "./component/CalendarSlots";
import MapboxMap from "./component/MapboxMap";
import dayjs from "dayjs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MediaViewer from "./component/MediaViewer";
import CustomModal from "../../components/custommodal/CustomModal";
import JoinWaitListViewModal from "./JoinWaitListViewModal";
import { screenStyle } from "./styles";
import { RootStackParamList } from "../../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import CustomDropdown from "../../components/customdropdown/CustomDropdown";
import CustomInput from "../../components/custominput/CustomInput";
import DateInput from "./component/DateInput";
import TimeInput, { TimeInputRef } from "./component/TimeInput";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type DoctorsDetailsRouteProp = RouteProp<RootStackParamList, 'doctorsdetails'>;


interface ReviewRatingItem {
  id: number;
  name: string;
  rating: number;
}

const DoctorsDetails = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet, isDesktop, scaleFactor, fontScale } =
    useScreenDimensions();

  const scale = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );
  const isMobileOrTablet = isMobile || isTablet;
  const styles = useMemo(
    () => screenStyle(isTablet, isMobile, isMobileOrTablet, isDesktop, scale),
    [isMobile, isTablet, isDesktop, scale]
  );

  const navigation = useNavigation<NavigationProp>();
 const route = useRoute<DoctorsDetailsRouteProp>();
  const { isAvailable } = route.params || false;

  console.log("isAvailable111111",isAvailable);

  const doctorOb = t("doctorsDetailsSection.doctorOb", {
    returnObjects: true,
  }) as any;
  const reasonOptions = t("doctorsDetailsSection.reasonOptions", {
    returnObjects: true,
  }) as any[];
  const locationOptions = t("doctorsDetailsSection.locationOptions", {
    returnObjects: true,
  }) as any[];
  const overviewDropdownOptions = t(
    "doctorsDetailsSection.overviewDropdownOptions",
    { returnObjects: true }
  ) as any[];
  const doctorReviews = t("doctorsDetailsSection.doctorReviews", {
    returnObjects: true,
  }) as any[];
  const doctorTab = t("doctorsDetailsSection.doctorTab", {
    returnObjects: true,
  }) as string[];
  const consultancyTypeTabs = t("doctorsDetailsSection.consultancyTypeTabs", {
    returnObjects: true,
  }) as string[];
  const doctorLocations = t("doctorsDetailsSection.doctorLocations", {
    returnObjects: true,
  }) as any[];
  const reviewRatings: ReviewRatingItem[] = t(
    "doctorsDetailsSection.reviewRatings",
    { returnObjects: true }
  ) as ReviewRatingItem[];

  const [overviewSections, setOverviewSections] = useState<any[]>(
    t("doctorsDetailsSection.overviewSections", {
      returnObjects: true,
    }) as any[]
  );
  const [countryCode, setCountryCode] = useState<any[]>(
    t("doctorsDetailsSection.countryCode", {
      returnObjects: true,
    }) as any[]
  );

  console.log("countryCode4444",t("doctorsDetailsSection.countryCode"));
  

    const [selectCountryCode, setSelectCountryCode] = useState("+91");

//   const [countryCode, setCountryCode] = useState([
//   { name: "India", code: "IN", dial_code: "+91" },
//   { name: "United States", code: "US", dial_code: "+1" },
//   { name: "United Kingdom", code: "GB", dial_code: "+44" },
//   { name: "Australia", code: "AU", dial_code: "+61" },
//   { name: "Canada", code: "CA", dial_code: "+1" },
//   { name: "Germany", code: "DE", dial_code: "+49" },
//   { name: "France", code: "FR", dial_code: "+33" },
//   { name: "Japan", code: "JP", dial_code: "+81" },
//   { name: "China", code: "CN", dial_code: "+86" },
//   { name: "Brazil", code: "BR", dial_code: "+55" }
// ])

const formattedCountryList = useMemo(
  () => countryCode.map(item => `${item.name} (${item.dial_code})`),
  [countryCode]
);



const handleCountryChange = (selectedItem: string) => {
  console.log("selectedItem1111",selectedItem);
  
  const match = selectedItem.match(/\(([^)]+)\)$/); 
  const dialCode = match?.[1] ?? '';
  setSelectCountryCode(dialCode);
};


  const [selectedReason, setSelectedReason] = useState("");
  const [selectedAppointmentLocation, setSelectedAppointmentLocation] =
    useState("");
  const [consultancyType, setConsultancyType] = useState(
    consultancyTypeTabs[1]
  );
  const [selectedOverviewItemId, setSelectedOverviewItemId] = useState(
    doctorReviews[0]
  );
  const [selectedTab, setSelectedTab] = useState(doctorTab[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleBooking, setModalVisibleBooking] = useState(false);
  const MAX_RATING_VALUE = useMemo(
    () => Math.max(...reviewRatings.map((item) => item.rating)),
    [reviewRatings]
  );
  const [currentLocation, setCurrentLocation] = useState(doctorLocations[0]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [patientName, setPatientName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [addInform, setAddInform] = useState("");

const [time, setTime] = useState("");
  const timeRef = useRef<TimeInputRef>(null);

  const handleScrollToLocation = useCallback(
    (index: number) => setCurrentLocation(doctorLocations[index]),
    [doctorLocations]
  );
  const handleNextLocation = useCallback(() => {
    const currentIndex = doctorLocations.findIndex(
      (loc: any) => loc.id === currentLocation.id
    );
    if (currentIndex < doctorLocations.length - 1)
      handleScrollToLocation(currentIndex + 1);
  }, [currentLocation, doctorLocations, handleScrollToLocation]);

  const handlePreviousLocation = useCallback(() => {
    const currentIndex = doctorLocations.findIndex(
      (loc: any) => loc.id === currentLocation.id
    );
    if (currentIndex > 0) handleScrollToLocation(currentIndex - 1);
  }, [currentLocation, doctorLocations, handleScrollToLocation]);

  const handleSelectOverviewItem = useCallback((item: any) => {
    setOverviewSections((prev) =>
      prev.map((section) =>
        section.id === item.id
          ? { ...section, isOpen: !section.isOpen }
          : { ...section, isOpen: false }
      )
    );
    setSelectedOverviewItemId(item);
  }, []);

  const handleSlotSelection = useCallback((date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  }, []);

  const handleScheduleAppointment = useCallback(() => {
    navigation.navigate("inpersonbooking",{consultancyType:consultancyType});
 
  }, [consultancyType, consultancyTypeTabs, navigation]);

  const DoctorDetailTabs = useCallback(
    () => (
      <View style={styles.tabsContainer}>
        {doctorTab.map((tab: string) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[
              styles.tabItem,
              selectedTab === tab && styles.activeTabItem,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ),[selectedTab]
  );

  const OverviewSection = useCallback(
    () => (
      <View style={styles.flex1}>
        <Text style={styles.sectionTitle}>
          {t("doctorsDetailsSection.doctorDetails")}
        </Text>
        {overviewSections.map((item) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity
              style={[
                styles.sectionOverviewItem,
                selectedOverviewItemId.id === item.id &&
                  styles.sectionOverviewItemActive,
              ]}
              onPress={() => handleSelectOverviewItem(item)}
            >
              <Image
                source={assets[item.icon as keyof typeof assets]}
                resizeMode="center"
                style={[
                  styles.overviewIcon,
                  selectedOverviewItemId.id === item.id &&
                    styles.overviewIconActive,
                ]}
                tintColor={
                  selectedOverviewItemId.id === item.id
                    ? color.color_00D193
                    : color.color_535156
                }
              />
              <Text
                style={[
                  styles.overviewText,
                  selectedOverviewItemId.id === item.id &&
                    styles.overviewTextActive,
                ]}
              >
                {item.name}
              </Text>
              <FontAwesome
                name={"chevron-down"}
                size={scale(20)}
                color={color.color_28252C}
              />
            </TouchableOpacity>
            {item.isOpen && (
              <View style={styles.overviewDropdownContainer}>
                <TouchableOpacity
                  style={styles.overviewDropdownHeader}
                  onPress={() => handleSelectOverviewItem(item)}
                >
                  <Image
                    source={
                      assets[selectedOverviewItemId.icon as keyof typeof assets]
                    }
                    style={styles.overviewIconActive}
                    tintColor={color.color_FF008A}
                    resizeMode="center"
                  />
                  <Text style={styles.overviewDropdownHeaderText}>
                    {selectedOverviewItemId.name}
                  </Text>
                  <FontAwesome
                    name={"chevron-up"}
                    size={scale(20)}
                    color={color.color_FF008A}
                  />
                </TouchableOpacity>
                <FlatList
                  data={overviewDropdownOptions}
                  keyExtractor={(_, index) => `id-${index}`}
                  renderItem={({ item: checkItem }) => (
                    <CommonCheckItem item={checkItem} />
                  )}
                  showsVerticalScrollIndicator={false}
                  style={styles.overviewDropdownList}
                />
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
    ),[]
  );

  const LocationSection = useCallback(
    () => (
      <View style={styles.flex1}>
        <View style={styles.locationHeader}>
          <Text
            style={styles.totalLocationsText}
          >{`Location(${doctorLocations.length})`}</Text>
          <Ionicons
            name="arrow-back"
            size={scale(20)}
            color={
              doctorLocations.findIndex(
                (loc: any) => loc.id === currentLocation.id
              ) === 0
                ? color.grey
                : color.color_FF008A
            }
            onPress={handlePreviousLocation}
            disabled={
              doctorLocations.findIndex(
                (loc) => loc.id === currentLocation.id
              ) === 0
            }
            style={styles.locationArrowIcon}
          />
          <Ionicons
            name="arrow-forward"
            size={scale(20)}
            color={
              doctorLocations.findIndex(
                (loc: any) => loc.id === currentLocation.id
              ) ===
              doctorLocations.length - 1
                ? color.grey
                : color.color_FF008A
            }
            onPress={handleNextLocation}
            disabled={
              doctorLocations.findIndex(
                (loc) => loc.id === currentLocation.id
              ) ===
              doctorLocations.length - 1
            }
            style={styles.locationArrowIcon}
          />
        </View>
        <View>
          <LocationItem />
          <MapboxMap
            lat={currentLocation.lat}
            long={currentLocation.long}
            style={styles.mapContainer}
          />
        </View>
      </View>
    ),[currentLocation,doctorLocations]
  );

const RatingProgressBar: React.FC<any> = ({ item }) => {
  const barWidth = `${(item.rating / MAX_RATING_VALUE) * 100}%`;

  return (
    <View style={styles.progressBarContainer}>
      <Text style={styles.ratingLabel}>{item.name}</Text>
      <View style={styles.progressWrapper}>
        <View style={[styles.progressFill, { width: barWidth as any }]} />
        <Text style={styles.ratingValueText}>({item.rating})</Text>
      </View>
    </View>
  );
};


  const ReviewsSection = useCallback(
    () => (
      <View style={styles.flex1}>
        <View style={styles.reviewsHeader}>
          <Text style={styles.reviewsTitle}>
            {t("doctorsDetailsSection.Reviewstitle")}
          </Text>
        </View>
        <View style={styles.reviewSummaryRow}>
          <View style={styles.ratingSummaryColumn}>
            <Text style={styles.ratingGreen}>
              {t("doctorsDetailsSection.reviewCount")}
            </Text>
            <Text style={styles.ratingOutOfText}>
              {t("doctorsDetailsSection.outOf")}
            </Text>
          </View>
          <View style={styles.ratingBarsColumn}>
            <FlatList
              data={reviewRatings}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <RatingProgressBar item={item} />}
              contentContainerStyle={styles.ratingBarsList}
            />
          </View>
        </View>
        <View style={styles.reviewFilterRow}>
          <Text style={styles.reviewCountText}>{`${doctorReviews.length} ${t(
            "doctorsDetailsSection.Reviewstitle"
          )}`}</Text>
          <Text style={styles.mostRelevantText}>
            {t("doctorsDetailsSection.mostRelevant")}
          </Text>
          <FontAwesome
            name={"chevron-down"}
            size={scale(20)}
            color={color.color_9327FF}
          />
        </View>
        {doctorReviews.map((review: any) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewUserRow}>
              <Image
                source={assets[review.avatar as keyof typeof assets]}
                style={styles.userAvatar}
              />
              <View style={styles.flex1}>
                <Text style={styles.userName}>{review.name}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
                <View style={styles.reviewStarsRow}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <AntDesign
                      key={i}
                      name="star"
                      size={scale(12)}
                      color="#00ffae"
                    />
                  ))}
                </View>
              </View>
            </View>
            <Text style={styles.reviewText}>
              {review.text} {review.text}
            </Text>
          </View>
        ))}
      </View>
    ),[]
  );

  const MediaViewSection = useCallback(
    () => (
      <View style={styles.flex1}>
        <View style={styles.mediaHeader}>
          <Text
            style={styles.mediaTitle}
          >{`Photos & Videos(${doctorLocations.length})`}</Text>
    
        </View>
        <MediaViewer />
      </View>
    ),[]
  );

  const AppointmentBookingView = useMemo(
    () => (
      <View style={styles.flex1}>
        <Text style={styles.scheduleAppointmentTitle}>
          {t("doctorsDetailsSection.scheduleAppointment")}
        </Text>
        <Text style={styles.formLabel}>
          {t("doctorsDetailsSection.consultancyType")}
        </Text>
        <View style={styles.consultancyTypeSelectionBox}>
          <View style={styles.consultancyTypeRow}>
            {consultancyTypeTabs.map((tab: string) => (
              <TouchableOpacity
                key={tab}
                style={[
                  {
                    backgroundColor:
                      tab === consultancyType ? "#28252C" : "transparent",
                  },
                  styles.consultancyTypeButton,
                ]}
                onPress={() => setConsultancyType(tab)}
              >
                <Text
                  style={
                    tab === consultancyType
                      ? styles.consultancyTypeTextActive
                      : styles.consultancyTypeTextInactive
                  }
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <CustomDropdown
          label={t("doctorsDetailsSection.consultancyReasonPlaceholder")}
          placeholder={t("doctorsDetailsSection.consultancyReasonPlaceholder")}
          value={selectedReason}
          data={reasonOptions}
          onChangeItem={(item) => setSelectedReason(item)}
          dropdownStyle={styles.dropdown}
          containerStyle={{ height: scale(56) }}
        />

        {consultancyType === consultancyTypeTabs[1] &&
        <CustomDropdown
          label={t("doctorsDetailsSection.selectLocationPlaceholder")}
          placeholder={t("doctorsDetailsSection.selectLocationPlaceholder")}
          value={selectedAppointmentLocation}
          data={locationOptions}
          onChangeItem={(item) => setSelectedAppointmentLocation(item)}
          dropdownStyle={styles.dropdown}
          containerStyle={{ height: scale(56) }}
        />}

        <View style={styles.slotSelectionHeader}>
          <Text style={styles.formLabel}>
            {t("doctorsDetailsSection.changeSlot")}
          </Text>
          <Text style={styles.selectedSlotDateText}>
            {selectedDate && dayjs(selectedDate).format("DD MMM ddd")}
            {selectedTime && ` - ${selectedTime}`}
          </Text>
        </View>
        <CalendarSlotSelector onSlotPress={handleSlotSelection} />
        <TouchableOpacity
          onPress={handleScheduleAppointment}
          style={styles.scheduleAppointmentButton}
        >
          <Text style={styles.scheduleButtonText}>
            {t("doctorsDetailsSection.scheduleAppointmentCap")}
          </Text>
        </TouchableOpacity>
      </View>
    ),[consultancyTypeTabs]
  );

   const AppointmentBookingView2 = useMemo(
    () => (
      <View style={styles.flex1}>
        <Text style={styles.scheduleAppointmentTitle}>
          {t("doctorsDetailsSection.scheduleAppointment")}
        </Text>
        <Text style={styles.scheduleAppointmentSubTitle}>
          {t("doctorsDetailsSection.scheduleAppointmentSubText")}
        </Text>

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
              </View>

                 <View style={styles.marginVertical4}>
                <CustomInput
                  label={t("doctorsDetailsSection.phonenumber")}
                  placeholder={t(
                    "doctorsDetailsSection.phonenumberPloceholder"
                  )}
                  value={phoneNo}
                  onChangeText={setPhoneNo}
                  containerStyle={{ flex: 1, marginRight: scale(10) }}
                       leftIcon={

                        <CustomDropdown
                            placeholder="+91"
                            key={'code1'}                           
                            value={selectCountryCode} 
                            data={formattedCountryList}
                            onChangeItem={handleCountryChange}
                            dropdownStyle={styles.dropdownCountry}
                            dropdownHighlightText={styles.dropdownHighlightText}
                            dropdownWidth={scale(150)}
                            containerStyle={{ height: scale(40), width: 'auto', borderWidth: 0 }}
                          />
                        
      
                        }                                                                                                                                                       
                
                />
              </View>


                    <View style={styles.marginVertical4}>
                <CustomInput
                  
                  placeholder={t(
                    "doctorsDetailsSection.callusAt"
                  )}
                  editable={false}
                  isRightdisable={true}
                  containerStyle={{ flex: 1, marginRight: scale(10) }}
                  textInputStyle={styles.callUsOnlable}
                     leftIcon={
                        <Image
                         source={assets.phoneIcon}
                         style={styles.iconImage}                                                                                                                                   
                         resizeMode="contain" />}                                                                                                                                                       
                     rightIconClosed={ <Text style={[styles.calltext]}>+1 67561 20120</Text>}
                />
              </View>

                <DateInput
                  label="Date of Birth"
                  placegolder="Date of Birth"
                  date={selectedDate}
                  setDate={setSelectedDate}
                />


                  <View style={styles.marginVertical4}>
                <CustomInput
                  label={t("doctorsDetailsSection.address")}
                  placeholder={t("doctorsDetailsSection.addressPloceholder")}
                  value={address}
                  onChangeText={setAddress}
                  containerStyle={{ flex: 1, marginRight: scale(10) }}
                />
              </View>


        <Text style={styles.formLabel}>
          {t("doctorsDetailsSection.consultancyType")}
        </Text>
        <View style={styles.consultancyTypeSelectionBox}>
          <View style={styles.consultancyTypeRow}>
            {consultancyTypeTabs.map((tab: string) => (
              <TouchableOpacity
                key={tab}
                style={[
                  {
                    backgroundColor:
                      tab === consultancyType ? "#28252C" : "transparent",
                  },
                  styles.consultancyTypeButton,
                ]}
                onPress={() => setConsultancyType(tab)}
              >
                <Text
                  style={
                    tab === consultancyType
                      ? styles.consultancyTypeTextActive
                      : styles.consultancyTypeTextInactive
                  }
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      

     

      

       
             

        <CustomDropdown
          label={t("doctorsDetailsSection.consultancyReasonPlaceholder")}
          placeholder={t("doctorsDetailsSection.consultancyReasonPlaceholder")}
          value={selectedReason}
          data={reasonOptions}
          onChangeItem={(item) => setSelectedReason(item)}
          dropdownStyle={styles.dropdown}
          containerStyle={{ height: scale(56) }}
        />

             <View style={styles.marginVertical4}>
                <CustomInput
                  label={t("doctorsDetailsSection.addInform")}
                  placeholder={t("doctorsDetailsSection.addInform")}
                  value={addInform}
                  onChangeText={setAddInform}
                  containerStyle={{ flex: 1, marginRight: scale(10) }}
                />
              </View>

       

        <TouchableOpacity
          onPress={()=>setModalVisibleBooking(true)}
          //onPress={handleScheduleAppointment}
          style={styles.scheduleAppointmentButton}
        >
          <Text style={styles.scheduleButtonText}>
            {t("doctorsDetailsSection.submitDetailsCap")}
          </Text>
        </TouchableOpacity>
      </View>
    ),[consultancyTypeTabs]
  );

  const JoinWaitListView = useCallback(
    () => (
      <View style={styles.flex1}>
        <View style={styles.joinWaitlistImageWrapper}>
          <Image source={assets.file} style={styles.fileIcon} />
        </View>
        <Text style={styles.joinWaitlistPrompt}>
          {t("doctorsDetailsSection.datetimebookingtext")}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.joinWaitlistButtonWrapper}
        >
          <Text style={styles.joinWaitlistButtonText}>
            {t("doctorsDetailsSection.joinWaitListCap")}
          </Text>
        </TouchableOpacity>
      </View>
    ),[]
  );

  const LocationItem = useCallback(
    () => (
      <View style={styles.locationCard}>
        <Text style={styles.locationName}>{currentLocation.name}</Text>
        <Text style={styles.locationAddress}>{currentLocation.address}</Text>
      </View>
    ),[currentLocation]
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.bodyWrapper}>
          <View style={styles.leftColumn}>
            <View style={styles.doctorProfileCard}>
              <Image
               source={{uri:t("doctorsDetailsSection.dummyImage")}}
                style={styles.doctorImage}
              />
              <View style={styles.doctorInfoColumn}>
                <View style={styles.doctorNameRow}>
                  <Text style={styles.doctorName}>{doctorOb.name}</Text>
                  <View style={styles.videoConsultBadge}>
                    <FontAwesome
                      name="video-camera"
                      size={scale(20)}
                      color={color.color_761FCC}
                    />
                    <Text style={styles.videoConsultBadgeText}>
                      {doctorOb.vConsultant}
                    </Text>
                  </View>
                  <View style={styles.inPersonBadge}>
                    <FontAwesome
                      name="user"
                      size={scale(20)}
                      color={color.color_FF008A}
                    />
                    <Text style={styles.inPersonBadgeText}>
                      {doctorOb.inPerson}
                    </Text>
                  </View>
                </View>
                <View style={styles.doctorSpecialtyRow}>
                  <Text style={styles.doctorSpecialty}>
                    {doctorOb.specialty}
                  </Text>
                  <Text style={styles.doctorSpecialty}>
                    {doctorOb.dist}
                  </Text>
                 
                </View>
                <View
                  style={[styles.ratingAndReviewsRow, { marginTop: scale(8) }]}
                >
                  <View style={styles.ratingBadge}>
                    <AntDesign
                      name="star"
                      size={scale(14)}
                      color={color.white}
                    />
                    <Text style={styles.ratingText}>{doctorOb.rating}</Text>
                  </View>
                  <Text style={styles.reviewsCountText}>
                    {doctorOb.reviewCount} {doctorOb.reviewtext}
                  </Text>
                </View>
                <View style={styles.hospitalInfoRow}>
                  <Text style={styles.hospitalText}>{doctorOb.address}</Text>
                </View>
                <View style={styles.availabilityRow}>
                  <MaterialIcons
                    name="access-time-filled"
                    size={scale(20)}
                    color={color.color_535156}
                  />
                  <Text style={styles.availabilityTime}>{doctorOb.time}</Text>
                </View>
              </View>
            </View>
            <DoctorDetailTabs />
            <View style={styles.dynamicContentContainer}>
              {selectedTab === doctorTab[0] && <OverviewSection />}
              {selectedTab === doctorTab[1] && <LocationSection />}
              {selectedTab === doctorTab[2] && <ReviewsSection />}
              {selectedTab === doctorTab[3] && <MediaViewSection />}
            </View>
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.appointmentSectionWrapper}>
              {isAvailable?AppointmentBookingView:AppointmentBookingView2}
              
            </View>

            {isAvailable &&
            <View style={styles.joinWaitlistSectionWrapper}>
              <JoinWaitListView />
            </View>}
          </View>
        </View>
        <View style={styles.footerSection}>
          <Footer />
        </View>
      </ScrollView>

      <JoinWaitListViewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={() => {
          setModalVisible(false);
          setModalVisibleBooking(true);
        }}
      />

      <CustomModal
        visible={modalVisibleBooking}
        onClose={() => setModalVisibleBooking(false)}
        modalStyle={{
          padding: scale(20),
          width: isMobile ? "80%" : scale(450),
        }}
      >
        <View style={{ height: "auto", paddingBottom: 20, width: "auto" }}>
          <View style={styles.iconWrapper}>
            <Ionicons
              size={scale(60)}
              name={"checkmark-circle-sharp"}
              color={color.color_FF008A}
            />
          </View>
          <Text style={styles.labelBooking}>
            {t("doctorsDetailsSection.bookingReceived")}
          </Text>
          <Text style={styles.labelBookingDetails}>
            {t("doctorsDetailsSection.bookingsuccessfully")}
          </Text>
          <TouchableOpacity
            style={[
              styles.scheduleAppointmentButton,
              { height: scale(40), marginVertical: scale(15) },
            ]}
            onPress={() => setModalVisibleBooking(false)}
          >
            <Text style={styles.scheduleButtonText}>
              {t("doctorsDetailsSection.okayCap")}
            </Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    
    
    </View>
  );
};

export default DoctorsDetails;
