import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  LayoutChangeEvent,
  Alert,
  Platform,
  Pressable,
  Image,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { DropdownBoxCustom } from "../../components/DropdownBoxCustom";
import CommonCheckItem from "./component/CommonCheckItem";
import DoctorCard from "./component/DoctorCard";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { color } from "../../theme/color";
import { assets } from "./assets";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { useTranslation } from "react-i18next";
import Entypo from "react-native-vector-icons/Entypo";
import { screenStyle } from "./styles";
import CustomDropdown from "../../components/customdropdown/CustomDropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import CustomModal from "../../components/custommodal/CustomModal";
import CustomInput from "../../components/custominput/CustomInput";
import { RootStackParamList } from "../../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
import { useNavigation } from '@react-navigation/native';

const MAX_COMPARABLE_DOCTORS = 3;

interface SelectedFilterValues {
  symptoms: string;
  specialty: string;
  gender: string;
  searchCity: string;
  availability: string;
}

type DropdownKey = keyof SelectedFilterValues;

const Doctors = () => {
  const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp>();
  
  const {
    isMobile,
    isTablet,
    isDesktop,
    scaleFactor,
    fontScale,
    isMobileBrowser,isMobileApp
  } = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;

  const scale = useCallback(
    (value: number) => value * scaleFactor,
    [scaleFactor]
  );
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );

  const componentStyles = useMemo(
    () =>
      screenStyle(
        isMobile,
        isMobileApp,
        isMobileOrTablet,
        isDesktop,
        isTablet,
        scale,
        fontScales
      ),
    [isMobile, isMobileOrTablet, isDesktop, scale, fontScales]
  );

  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const [compareSectionContainerWidth, setCompareSectionContainerWidth] =
    useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [allDoctors, setAllDoctors] = useState<any[]>(
    () => t("doctorsSection.doctor", { returnObjects: true }) as any[]
  );
  const [selectedDoctorsForComparison, setSelectedDoctorsForComparison] =
    useState<any[]>([]);

  const dropdownOptionsMap = useMemo(
    () => ({
      symptoms: t("doctorsSection.symptoms", {
        returnObjects: true,
      }) as string[],
      specialty: t("doctorsSection.specialty", {
        returnObjects: true,
      }) as string[],
      gender: t("doctorsSection.gender", { returnObjects: true }) as string[],
      searchCity: t("doctorsSection.searchCity", {
        returnObjects: true,
      }) as string[],
      availability: t("doctorsSection.availability", {
        returnObjects: true,
      }) as string[],
    }),
    [t]
  );

  const tabData = t("doctorsSection.tabData", {
    returnObjects: true,
  }) as any;

  const [selectedTab, setSelectedTab] = useState(tabData[0]);

  const [selectedFilterValues, setSelectedFilterValues] = useState({
    symptoms: "",
    specialty: "",
    gender: "",
    searchCity: "",
    availability: "",
  });

  const dropdownIcons: Record<string, any> = {
    symptoms: assets.search,
    specialty: assets.firstKit,
    gender: assets.gender,
    searchCity: assets.pin,
    availability: assets.calendar,
  };

  const [isDistanceFilterExpanded, setIsDistanceFilterExpanded] =
    useState(true);
  const [distanceFilters, setDistanceFilters] = useState(() => [
    { id: 1, distance: 10, count: 10, checked: true },
    { id: 2, distance: 20, count: 4, checked: false },
    { id: 3, distance: 30, count: 0, checked: false },
    { id: 4, distance: 40, count: 0, checked: false },
  ]);

  const [isLanguageFilterExpanded, setIsLanguageFilterExpanded] =
    useState(true);
  const [languageFilters, setLanguageFilters] = useState<any[]>(
    () => t("doctorsSection.languageArr", { returnObjects: true }) as any[]
  );

  const [modalfavouritesVisible, setModalfavouritesVisible] =
    useState<boolean>(false);
  const [modalgroupVisible, setModalgroupVisible] = useState<boolean>(false);

  const favouritesDATA = useMemo(
    () =>
      t("doctorsSection.favouritesDATA", { returnObjects: true }) as string[],
    [t]
  );

  const [selectedNamefev, setSelectedNameFev] = useState<string>("Orthopedic");
  const [groupName, setGroupName] = useState<string>("");

  const handleCompareSectionLayout = useCallback((event: LayoutChangeEvent) => {
    setCompareSectionContainerWidth(event.nativeEvent.layout.width);
  }, []);

  const handleFilterSelect = useCallback(
    (key: string, _index: string, value: string) => {
      setSelectedFilterValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleDistanceFilter = useCallback((index: number) => {
    setDistanceFilters((prev) => {
      const updated = [...prev];
      updated[index].checked = !updated[index].checked;
      return updated;
    });
  }, []);

  const toggleLanguageFilter = useCallback((index: number) => {
    setLanguageFilters((prev) => {
      const updated = [...prev];
      updated[index].checked = !updated[index].checked;
      return updated;
    });
  }, []);

  const handleToggleDoctorSelection = useCallback((doctorToSelect: any) => {
    setSelectedDoctorsForComparison((prevSelected: any) => {
      const alreadySelected = prevSelected.some(
        (doc: any) => doc.id === doctorToSelect.id
      );

      if (alreadySelected) {
        return prevSelected;
      } else {
        if (prevSelected.length < MAX_COMPARABLE_DOCTORS) {
          setAllDoctors((prevDoctors: any) =>
            prevDoctors.map((doc: any) =>
              doc.id === doctorToSelect.id ? { ...doc, isSelected: true } : doc
            )
          );
          return [...prevSelected, { ...doctorToSelect, isSelected: true }];
        } else {
          if (Platform.OS === "web") {
            alert(
              `Only ${MAX_COMPARABLE_DOCTORS} doctors can be selected for comparison.`
            );
          } else {
            Alert.alert(
              `Selection Limit Reached`,
              `You can only select ${MAX_COMPARABLE_DOCTORS} doctors for comparison.`
            );
          }
          return prevSelected;
        }
      }
    });
  }, []);

  const handleDeselectDoctor = useCallback((doctorToDeselect: any) => {
    setAllDoctors((prevDoctors) =>
      prevDoctors.map((doc) =>
        doc.id === doctorToDeselect.id ? { ...doc, isSelected: false } : doc
      )
    );
    setSelectedDoctorsForComparison((prevSelected) =>
      prevSelected.filter((data: any) => data.id !== doctorToDeselect.id)
    );
  }, []);

  const renderCompareDoctorItem = useCallback(
    ({ item, index }: { item: any | null; index: number }) => {
      if (item) {
        return (
          <View
            key={item.id}
            style={[
              componentStyles.compareCard,
              isMobileOrTablet && { width: compareSectionContainerWidth },
              isDesktop && { width: compareSectionContainerWidth / 4 },
            ]}
          >
            <Image
              source={{ uri: item.image }}
              style={componentStyles.compareCardAvatar}
            />
            <View
              style={[
                componentStyles.compareCardTextContainer,
                isMobileOrTablet && {
                  alignItems: "center",
                  marginTop: fontScales(10),
                },
                isDesktop && {
                  width: compareSectionContainerWidth / 4 - 80,
                },
              ]}
            >
              <Text style={componentStyles.compareCardName}>{item.name}</Text>
              <Text style={componentStyles.compareCardSpecialty}>
                {item.specialty}
              </Text>
            </View>
            <Pressable
              onPress={() => handleDeselectDoctor(item)}
              style={componentStyles.compareCardCloseButton}
            >
              <Entypo
                name="circle-with-cross"
                size={fontScales(26)}
                color={color.color_28252C}
                style={{ marginRight: fontScales(10) }}
              />
            </Pressable>
          </View>
        );
      } else {
        return (
          <TouchableOpacity
            style={[
              componentStyles.emptyCompareSlot,
              isMobileOrTablet && { width: compareSectionContainerWidth },
              isDesktop && { width: compareSectionContainerWidth / 4 },
            ]}
          
          >
            <Text style={componentStyles.emptyCompareSlotText}>
              {t("doctorsSection.selectDoctor")} {index + 1}
            </Text>
          </TouchableOpacity>
        );
      }
    },
    [
      isMobileOrTablet,
      isDesktop,
      compareSectionContainerWidth,
      handleDeselectDoctor,
      componentStyles,
      scale,
      t,
      fontScales,
    ]
  );

  const renderCompareDoctorsSection = () => {
    const data = Array.from({ length: MAX_COMPARABLE_DOCTORS }).map(
      (_, index) => selectedDoctorsForComparison[index] || null
    );

    return (
      <View style={componentStyles.compareSection}>
        <View style={componentStyles.compareHeaderRow}>
          <Text style={componentStyles.compareSectionTitle}>
            {t("doctorsSection.compareDoctors")}
          </Text>
          <Text style={componentStyles.compareSectionHint}>
            {t("doctorsSection.selectMinimum3")}
          </Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(_, index) => `compare-doctor-${index}`}
          renderItem={renderCompareDoctorItem}
          onLayout={handleCompareSectionLayout}
          showsHorizontalScrollIndicator={false}
          horizontal={isDesktop}
          ListFooterComponent={
            <Pressable
              disabled={
                selectedDoctorsForComparison.length < MAX_COMPARABLE_DOCTORS
              }
              style={[
                componentStyles.compareActionBtn,
                selectedDoctorsForComparison.length < MAX_COMPARABLE_DOCTORS &&
                  componentStyles.disabledCompareActionBtn,
                isMobileOrTablet && { width: compareSectionContainerWidth },
                isDesktop && { width: compareSectionContainerWidth / 4.5 },
              ]}
                onPress={()=>{
              console.log("doctorscomparePresss");
              
              navigation.navigate('doctorscompare')
            }}
            >
              <Text style={componentStyles.compareActionBtnText}>
                {t("doctorsSection.Compare")}
              </Text>
            </Pressable>
          }
          style={[
            componentStyles.compareFlatListContent,
            { width: "100%" },
            isMobile && { height: "auto" },
          ]}
          //  contentContainerStyle={[componentStyles.compareFlatListContent, { width: "100%" }, isMobile && { height: "auto" }]}
        />
      </View>
    );
  };

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
      <TouchableOpacity style={componentStyles.card} onPress={onPress}>
        <Text
          style={
            index === 6
              ? componentStyles.nameSomeonetext
              : componentStyles.nameActive
          }
        >
          {name}
        </Text>
        <View
          style={[
            componentStyles.radio,
            selected && componentStyles.selectedRadio,
          ]}
        >
          {selected && <Feather name="check" size={14} color="white" />}
        </View>
      </TouchableOpacity>
    ),
    [componentStyles]
  );

  const handleCreateGroupClose = useCallback(() => {
    setModalgroupVisible(false);
    setModalfavouritesVisible(true);
  }, []);

  const handleFavoritePress = useCallback((item: any, index: number) => {
    setAllDoctors((prevDoctors: any[]) =>
      prevDoctors.map((object: any, itemIndex: number) => {
        if (itemIndex === index) {
          if (!object.favorite) setModalfavouritesVisible(true);
          return { ...object, favorite: !object.favorite };
        }
        return object;
      })
    );
  }, []);

  return (
    <View style={componentStyles.container}>
      <Header isHome={true}/>
      <ScrollView contentContainerStyle={componentStyles.contentWrapper}>
        {!isMobileOrTablet ? (
          <View style={componentStyles.searchContainer}>
            {(Object.keys(dropdownOptionsMap) as DropdownKey[]).map((key) => (
              <CustomDropdown
                key={`dropdown-${key}`}
                value={selectedFilterValues[key]}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                data={dropdownOptionsMap[key]}
                onInputLayoutChange={(width: any, height: any) => {
                  setDropdownWidth(width);
                  setDropdownHeight(height);
                }}
                onChangeItem={(val) => handleFilterSelect(key, "0", val)}
                dropdownHighlightText={{ color: color.white }}
                containerStyle={componentStyles.containerDropdown1}
                leftIconClosed={
                  <Image
                    source={dropdownIcons[key]}
                    style={[componentStyles.iconImage, { marginHorizontal: 6 }]}
                    tintColor={color.white}
                    resizeMode="contain"
                  />
                }
                leftIconOpen={
                  <Image
                    source={dropdownIcons[key]}
                    style={[componentStyles.iconImage, { marginHorizontal: 6 }]}
                    tintColor={color.white}
                    resizeMode="contain"
                  />
                }
                rightIconOpen={
                  <Ionicons
                    name="chevron-up-outline"
                    size={fontScales(24)}
                    color={color.white}
                  />
                }
                rightIconClosed={
                  <Ionicons
                    name="chevron-down-outline"
                    size={fontScales(24)}
                    color={color.white}
                  />
                }
              />
            ))}

            <TouchableOpacity
              style={[
                componentStyles.searchButton,
                { height: dropdownHeight, width: dropdownWidth },
              ]}
              onPress={() => {}}
            >
              <Text style={componentStyles.searchButtonText}>
                {t("doctorsSection.search")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={componentStyles.mobileFilterToggleContainer}>
            <TouchableOpacity
              style={componentStyles.mobileFilterToggleButton}
              onPress={() => setShowMobileFilters(!showMobileFilters)}
            >
              {showMobileFilters ? (
                <Entypo
                  name="circle-with-cross"
                  size={fontScales(26)}
                  color={color.white}
                  style={{
                    marginRight: isMobile
                      ? isMobileBrowser
                        ? fontScales(20)
                        : fontScales(10)
                      : fontScales(0),
                  }}
                />
              ) : (
                <FontAwesome
                  name="search"
                  size={fontScales(26)}
                  color={color.white}
                  style={{
                    marginRight: isMobile
                      ? isMobileBrowser
                        ? fontScales(20)
                        : fontScales(10)
                      : fontScales(0),
                  }}
                />
              )}
            </TouchableOpacity>
            {showMobileFilters && (
              <View style={componentStyles.mobileSearchFilters}>
                {(Object.keys(dropdownOptionsMap) as DropdownKey[]).map(
                  (key) => (
                    <CustomDropdown
                      key={`dropdown-${key}`}
                      value={selectedFilterValues[key]}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      data={dropdownOptionsMap[key]}
                      onChangeItem={(val) => handleFilterSelect(key, "0", val)}
                      onInputLayoutChange={(width: any, height: any) => {
                        setDropdownWidth(width);
                        setDropdownHeight(height);
                      }}
                      dropdownHighlightText={{ color: color.white }}
                      dropdownWrapper={{ width: "100%" }}
                      containerStyle={[componentStyles.containerDropdown2]}
                      leftIconClosed={
                        <Image
                          source={dropdownIcons[key]}
                          style={[
                            componentStyles.iconImage,
                            { marginHorizontal: 6 },
                          ]}
                          resizeMode="contain"
                          tintColor={color.white}
                        />
                      }
                      leftIconOpen={
                        <Image
                          source={dropdownIcons[key]}
                          style={[
                            componentStyles.iconImage,
                            { marginHorizontal: 6 },
                          ]}
                          resizeMode="contain"
                          tintColor={color.white}
                        />
                      }
                      rightIconOpen={
                        <Ionicons
                          name="chevron-up-outline"
                          size={fontScales(24)}
                          color={color.white}
                        />
                      }
                      rightIconClosed={
                        <Ionicons
                          name="chevron-down-outline"
                          size={fontScales(24)}
                          color={color.white}
                        />
                      }
                    />
                  )
                )}

                <TouchableOpacity
                  style={[
                    componentStyles.searchButton,
                    { height: dropdownHeight, width: dropdownWidth },
                  ]}
                  onPress={() => {}}
                >
                  <Text style={componentStyles.searchButtonText}>
                    {t("doctorsSection.search")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <View
          style={[
            componentStyles.mainContentArea,
            isMobile && componentStyles.mainContentAreaMobile,
            isTablet && componentStyles.mainContentAreaMobile,
          ]}
        >
          <View
            style={[isDesktop && { flex: 0.5 }, componentStyles.filterSidebar]}
          >
            <View style={componentStyles.filterHeader}>
              <Text style={componentStyles.filterTitle}>
                {t("doctorsSection.moreFilter")}
              </Text>
              <Text style={componentStyles.clearAllFiltersText}>
                {t("doctorsSection.clearALL")}
              </Text>
            </View>
            <View style={componentStyles.filterCard}>
              <TouchableOpacity
                onPress={() =>
                  setIsDistanceFilterExpanded(!isDistanceFilterExpanded)
                }
                style={componentStyles.filterCardHeader}
              >
                <Text style={componentStyles.filterText}>
                  {t("doctorsSection.distance")}
                </Text>
                {isDistanceFilterExpanded ? (
                  <FontAwesome
                    name="chevron-up"
                    size={fontScales(20)}
                    color={color.color_28252C}
                  />
                ) : (
                  <FontAwesome
                    name="chevron-down"
                    size={fontScales(20)}
                    color={color.color_28252C}
                  />
                )}
              </TouchableOpacity>
              {isDistanceFilterExpanded && (
                <FlatList
                  data={distanceFilters}
                  keyExtractor={(item) => `distance-${item.id}`}
                  renderItem={({ item, index }) => (
                    <CommonCheckItem
                      checked={item.checked}
                      label={`${item.distance} ${t("doctorsSection.Mile")}`}
                      count={item.count}
                      onPress={() => toggleDistanceFilter(index)}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  style={componentStyles.filterList}
                />
              )}
            </View>
            <View style={componentStyles.filterCard}>
              <TouchableOpacity
                onPress={() =>
                  setIsLanguageFilterExpanded(!isLanguageFilterExpanded)
                }
                style={componentStyles.filterCardHeader}
              >
                <Text style={componentStyles.filterText}>
                  {t("doctorsSection.language")}
                </Text>
                {isLanguageFilterExpanded ? (
                  <FontAwesome
                    name="chevron-up"
                    size={fontScales(20)}
                    color={color.color_28252C}
                  />
                ) : (
                  <FontAwesome
                    name="chevron-down"
                    size={fontScales(20)}
                    color={color.color_28252C}
                  />
                )}
              </TouchableOpacity>
              {isLanguageFilterExpanded && (
                <FlatList
                  data={languageFilters}
                  keyExtractor={(item, index) =>
                    `language-${index}-${item.language}`
                  }
                  renderItem={({ item, index }) => (
                    <CommonCheckItem
                      checked={item.checked}
                      label={item.language}
                      count={item.count}
                      onPress={() => toggleLanguageFilter(index)}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  style={componentStyles.filterList}
                />
              )}
            </View>
          </View>

          <View style={[{ flex: 1 }]}>
            <Text
              style={[
                componentStyles.doctorCountText,
                isMobile && { marginLeft: scale(10), marginTop: scale(25) },
                isDesktop && { marginLeft: scale(30), marginTop: scale(25) },
              ]}
            >
              {t("doctorsSection.10Consultants")}
            </Text>
            <View
              style={[
                componentStyles.doctorListSection,
                isDesktop && { flex: 1 },
              ]}
            >
              <View style={componentStyles.tabsContainer}>
                {tabData.map((tab: any) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setSelectedTab(tab)}
                    style={[
                      componentStyles.tabItem,
                      selectedTab === tab && componentStyles.activeTabItem,
                    ]}
                  >
                    <Text
                      style={[
                        componentStyles.tabText,
                        selectedTab === tab && componentStyles.activeTabText,
                      ]}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={[componentStyles.tabItem, { flexDirection: "row" }]}>
                <Text style={componentStyles.filterText2}>
                  {t("doctorsSection.sortBy")}
                </Text>
                <FontAwesome
                  name="chevron-down"
                  size={fontScales(20)}
                  color={color.color_28252C}
                />
              </View>

              <View style={componentStyles.doctorCardListContainer}>
                <FlatList
                  data={allDoctors.slice(0, 10)}
                  keyExtractor={(item) => `doctor-list-${item.id}`}
                  renderItem={({ item, index }) => (
                    <DoctorCard
                      doctor={item}
                      index={index}
                      onRemoveSelected={() => handleDeselectDoctor(item)}
                      onToggleCompare={() => handleToggleDoctorSelection(item)}
                      handleFavoritePress={() =>
                        handleFavoritePress(item, index)
                      }
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </View>
        {renderCompareDoctorsSection()}
        <View style={componentStyles.footerContainer}>
          <Footer />
        </View>

        <CustomModal
          visible={modalfavouritesVisible}
          onClose={() => setModalfavouritesVisible(false)}
          modalStyle={{ padding: scale(20), width: isMobile ? "80%" : "36%" }}
        >
          <View style={{ height: "auto", paddingBottom: 20, width: "auto" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: scale(20),
              }}
            >
              <Text style={componentStyles.title}>
                {t("doctorsSection.addTofavourites")}
              </Text>
              <Entypo
                onPress={() => setModalfavouritesVisible(false)}
                name="cross"
                size={isMobileOrTablet ? scale(26) : scale(36)}
                color={color.lable1}
              />
            </View>

            <FlatList
              data={favouritesDATA}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <PersonCard
                  index={index}
                  name={item}
                  selected={item === selectedNamefev}
                  onPress={() => setSelectedNameFev(item)}
                />
              )}
            />

            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                marginVertical: scale(20),
              }}
            >
              <Text
                style={componentStyles.titleCreateGroup}
                onPress={() => {
                  setModalfavouritesVisible(false);
                  setModalgroupVisible(true);
                }}
              >
                {t("doctorsSection.createGroupplus")}
              </Text>
            </View>

            <TouchableOpacity
              style={[componentStyles.scheduleAppointmentButton]}
              onPress={() => setModalfavouritesVisible(false)}
            >
              <Text style={componentStyles.scheduleButtonText}>
                {t("doctorsSection.save")}
              </Text>
            </TouchableOpacity>
          </View>
        </CustomModal>

        <CustomModal
          visible={modalgroupVisible}
          onClose={handleCreateGroupClose}
          modalStyle={{
            padding: scale(20),
            width: isMobile ? "80%" : "36%",
            paddingVertical: scale(20),
          }}
        >
          <View style={{ height: "auto", paddingBottom: 20, width: "auto" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: scale(20),
              }}
            >
              <Text style={componentStyles.title}>
                {t("doctorsSection.createGroup")}
              </Text>
              <Entypo
                onPress={handleCreateGroupClose}
                name="cross"
                size={isMobileOrTablet ? scale(26) : scale(36)}
                color={color.lable1}
              />
            </View>

            <View style={componentStyles.marginVertical4}>
              <CustomInput
                label={t("doctorsSection.groupName")}
                placeholder={t("doctorsSection.groupName")}
                value={groupName}
                onChangeText={setGroupName}
                containerStyle={{ flex: 1, marginRight: scale(10) }}
              />
            </View>

            <TouchableOpacity
              style={[componentStyles.scheduleAppointmentButton]}
              onPress={handleCreateGroupClose}
            >
              <Text style={componentStyles.scheduleButtonText}>
                {t("doctorsSection.save")}
              </Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      </ScrollView>
    </View>
  );
};

export default Doctors;
