import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { color, font } from '../../theme/color';
import { useScreenDimensions } from '../../utils/DimensionsUtilities';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { screenStyle } from './styles';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from "../../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../components/custommodal/CustomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDropdown from '../../components/customdropdown/CustomDropdown';
import CalendarSlotSelector from "../doctorsdetails/component/CalendarSlots";
import dayjs from 'dayjs';

type RatingCategory =
  | 'Bedside manner'
  | 'Answered questions'
  | 'After care'
  | 'Time spent'
  | 'Responsiveness'
  | 'Courtesy'
  | 'Payment process'
  | 'Wait times';

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: string;
  reviews: string;
  location: string;
  verified: boolean;
  expertise: string;
  experience: string;
  board: string;
  consultation: boolean;
  virtual: boolean;
  content: string;
  privileges: boolean;
  consult: boolean;
  additionalRatings: Record<RatingCategory, number>;
};

const RATING_CATEGORIES: RatingCategory[] = [
  'Bedside manner',
  'Answered questions',
  'After care',
  'Time spent',
  'Responsiveness',
  'Courtesy',
  'Payment process',
  'Wait times',
];


const DoctorsCompare: React.FC = () => {
  const { scaleFactor, fontScale, isDesktop, isMobile,isTablet } = useScreenDimensions();
    const isMobileOrTablet = isMobile || isTablet;

  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp>();

const doctorsData = t("doctorsCompareSection.doctorArr", {
  returnObjects: true,
});
const DOCTORS: Doctor[] = Array.isArray(doctorsData) ? doctorsData : [];

  const scale = useCallback((val: number) => val * scaleFactor, [scaleFactor]);
  const fontSize = useCallback((val: number) => val * fontScale, [fontScale]);

  const styles = useMemo(() => screenStyle(scale, fontSize, isDesktop, isMobile,DOCTORS), [
    scale, fontSize, isDesktop, isMobile,
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [policy, setPolicy] = useState(false);

    const consultancyTypeTabs = t("doctorsCompareSection.consultancyTypeTabs", {
    returnObjects: true,
  }) as string[];

    const [consultancyTypeModal, setConsultancyTypeModal] = useState(
      consultancyTypeTabs[0]
    );
      const reasonOptions = t("doctorsCompareSection.reasonOptions", {
    returnObjects: true,
  }) as any[];
  const [selectedReasonModal, setSelectedReasonModal] = useState("");
  const [selectedAppointmentLocation, setSelectedAppointmentLocation] =
    useState("");

     const locationOptions = t("doctorsDetailsSection.locationOptions", {
    returnObjects: true,
  }) as any[];

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
  

  const handleSlotSelection = useCallback((date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  }, []);
  const renderCheckIcon = (flag: boolean) =>
    flag ? (
      <AntDesign name="check" size={fontSize(22)} color="#FF008A" />
    ) : (
      <Entypo name="cross" size={fontSize(22)} color="#ccc" />
    );

  const renderRow = (label: string, renderValue: (doc: Doctor) => React.ReactNode) => (
    <View style={styles.row}>
      <View style={styles.labelCell}><Text style={styles.labelText}>{label}</Text></View>
      {DOCTORS.map(doc => <View key={doc.id} style={styles.infoCell}>{renderValue(doc)}</View>)}
    </View>
  );

    const handleConfirmPress = useCallback(() => {
      setModalVisible(false);
      
    }, [setModalVisible]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} bounces={false}>
        <Text style={styles.heading}>Compare 3 Doctors</Text>
        <ScrollView horizontal contentContainerStyle={styles.tableContent} style={{ backgroundColor: 'white' }}>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.labelCell}><Text style={styles.labelText}>DOCTOR INFO</Text></View>
              {DOCTORS.map(doc => (
                <View key={doc.id} style={styles.infoCell}>
                  <Image source={{ uri: doc.image }} style={styles.doctorImage} />
                  <Text style={styles.doctorName}>{doc.name}</Text>
                  <Text style={styles.doctorSub}>{doc.specialty}</Text>
                </View>
              ))}
            </View>

            {renderRow('OVERALL RATING', doc => (
              <View style={styles.ratingBox}>
                <Text style={styles.ratingValue}>{doc.rating}</Text>
                <Text style={styles.ratingReviews}>{doc.reviews}</Text>
              </View>
            ))}
            {renderRow('LOCATION', doc => <Text style={styles.rowValue}>{doc.location}</Text>)}
            {renderRow('YUME VERIFIED', doc => renderCheckIcon(doc.verified))}
            {renderRow('EXPERTISE', doc => <Text style={styles.rowValue}>{doc.expertise}</Text>)}
            {renderRow('YEARS OF EXPERIENCE', doc => <Text style={styles.rowValue}>{doc.experience}</Text>)}
            {renderRow('BOARD CERTIFICATIONS', doc => <Text style={styles.rowValue}>{doc.board}</Text>)}
            {renderRow('FREE CONSULTATION', doc => renderCheckIcon(doc.consultation))}
            {renderRow('VIRTUAL APPOINTMENT', doc => renderCheckIcon(doc.virtual))}
            {renderRow('CONTENT', doc => <Text style={styles.rowSub}>{doc.content}</Text>)}

            <View style={[styles.row, styles.additionalRatingsRow]}>
              <View style={styles.labelCell}><Text style={styles.labelText}>ADDITIONAL RATINGS</Text></View>
              {DOCTORS.map(doc => (
                <View key={doc.id} style={styles.additionalRatingsColumn}>
                  {RATING_CATEGORIES.map(category => (
                    <View key={category} style={styles.ratingItem}>
                      <View style={styles.starsContainer}>
                        {Array.from({ length: doc.additionalRatings[category] || 0 }, (_, i) => (
                          <AntDesign
                            key={i}
                            name="star"
                            size={fontSize(14)}
                            color={color.color_00C781}
                          />
                        ))}
                      </View>
                      <Text style={styles.ratingLabel}>{category}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {renderRow('CLINICAL/HOSPITAL PRIVILEGES', doc => renderCheckIcon(doc.privileges))}
            {renderRow('', doc => (
              <View style={styles.contentCol}>
                <TouchableOpacity style={[styles.button, doc.consult ? styles.pink : styles.gray]} 
                onPress={()=>{
                  if(doc.consult){
                    setModalVisible(true)
                  }
                }}>
                  <Text style={[styles.buttonText, !doc.consult && styles.blackText]}>
                    {doc.consult ? 'GET A CONSULT' : 'Not accepting consultations'}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.link} onPress={() => navigation.navigate("doctorsdetails", { doctorId: doc.id })}>VIEW DOCTOR PROFILE</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={{ width: '100%' }}>
          <Footer />
        </View>

  <CustomModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      modalStyle={{
       // padding: scale(20),
        width: isMobile ? "90%" : "35%",
        height: "70%",
        paddingVertical:fontSize(20),
        paddingHorizontal:fontSize(10)
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            {t("doctorsDetailsSection.getConsultation")}
          </Text>
          <Entypo
            onPress={() => setModalVisible(false)}
            name="cross"
            size={fontSize(24)}
            color={color.lable1}
          />
        </View>

 

      

        <View style={{ marginVertical: fontSize(4) }}>
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
                        tab === consultancyTypeModal
                          ? "#28252C"
                          : "transparent",
                    },
                    styles.consultancyTypeButton,
                  ]}
                  onPress={() => setConsultancyTypeModal(tab)}
                >
                  <Text
                    style={
                      tab === consultancyTypeModal
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
            containerStyle={{ height: fontSize(50) }}
          />
        </View>
        <View style={styles.dropdownWrapper}>
           <CustomDropdown
          label={t("doctorsDetailsSection.selectLocationPlaceholder")}
          placeholder={t("doctorsDetailsSection.selectLocationPlaceholder")}
          value={selectedAppointmentLocation}
          data={locationOptions}
          onChangeItem={(item) => setSelectedAppointmentLocation(item)}
          dropdownStyle={styles.dropdown}
          containerStyle={{ height: fontSize(50) }}
        />
        </View>

            <View style={styles.slotSelectionHeader}>
          <Text style={styles.formLabel}>
            {t("doctorsDetailsSection.selectSlot")}
          </Text>
          <Text style={styles.selectedSlotDateText}>
            {selectedDate && dayjs(selectedDate).format("DD MMM ddd")}
            {selectedTime && ` - ${selectedTime}`}
          </Text>
        </View>
        <CalendarSlotSelector onSlotPress={handleSlotSelection} />

        <View
          style={{
            marginVertical: fontSize(14),
            flexDirection: "row",
            alignItems: isMobile ? "flex-start" : "center",
          }}
        >
          <Ionicons
            size={fontSize(24)}
            name={policy ? "checkbox" : "checkbox-outline"}
            color={policy ? color.color_FF008A : color.color_28252C80}
            onPress={() => setPolicy(!policy)}
          />
          <View style={{ flex: 1, marginLeft: fontSize(6) }}>
            <Text style={[styles.policyText1, { marginLeft: fontSize(5) }]}>
              I have read the {" "}
              <Text
                style={[
                  styles.policyText1,
                  { textDecorationLine: "underline" },
                ]}
              >
                {t("doctorsDetailsSection.termsservice")}
              </Text>{" "}
              {t("doctorsDetailsSection.and")}{" "}
              <Text
                style={[
                  styles.policyText1,
                  { textDecorationLine: "underline" },
                ]}
              >
                {t("inPerson.privacyPolicy")}
              </Text>
            </Text>
          </View>
        </View>

           <Text style={styles.otherLabel}>
            {t("doctorsDetailsSection.chargesApply")}
          </Text>

        <TouchableOpacity
          style={[
            styles.scheduleAppointmentButton,
            { opacity: policy ? 1 : 0.5 },
          ]}
          disabled={!policy}
         onPress={handleConfirmPress}
        >
          <Text style={styles.scheduleButtonText}>
            {t("doctorsDetailsSection.confirmCap")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </CustomModal>
    
    
      </ScrollView>
      <View style={{ height: insets.bottom, backgroundColor: color.primary1 }} />
    </View>
  );
};



export default DoctorsCompare;
