import { Platform, StyleSheet } from "react-native";
import { font, color } from "../../theme/color";

export const screenStyle = (
  isMobile: boolean,
  isMobileApp: boolean,
  isMobileOrTablet: boolean,
  isDesktop: boolean,
  isTablet: boolean,
  scale: (val: number) => number,
  fontScales: (val: number) => number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.primary1,
    },
    searchContainer: {
      backgroundColor: color.primary1,
      paddingBottom: fontScales(30),
      paddingHorizontal: fontScales(80),
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",

      marginBottom: fontScales(20),
    },
    iconImage: {
      width: fontScales(18),
      height: fontScales(18),
      marginRight: fontScales(6),
    },
    containerDropdown1: {
      marginRight: fontScales(10),
      backgroundColor: color.color_671BB3,
      borderWidth: 0,
      width: fontScales(250),
      paddingVertical: fontScales(15),
      height: fontScales(48),
    },

    mobileFilterToggleContainer: {
      width: "100%",
      backgroundColor: color.primary1,
    },
    mobileFilterToggleButton: {
      backgroundColor: color.primary1,
      paddingVertical: fontScales(20),
      paddingHorizontal: fontScales(20),
      alignItems: "flex-end",
      width: "100%",
    },
    containerDropdown2: {
      marginRight: fontScales(10),
      backgroundColor: color.color_671BB3,
      borderWidth: 0,
      flex: 1,
      paddingVertical: fontScales(15),
    },
    mobileSearchFilters: {
      width: isTablet ? "75%" : "100%",
      backgroundColor: color.primary1,
      paddingVertical: fontScales(12),
      paddingHorizontal: fontScales(40),
      flexDirection: "column",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      rowGap: fontScales(10),
      columnGap: fontScales(10),
    },
    dropdownStyle: {
      flex: 1,
      borderRadius: fontScales(10),
      backgroundColor: color.color_671BB3,
      marginRight: fontScales(8),
      marginTop: fontScales(10),
    },
    dropdownTextStyle: {
      fontSize: fontScales(12),
      color: color.lable1,
      fontFamily: font.Rubik_500m,
    },
    searchButton: {
      backgroundColor: color.white,
      paddingVertical: fontScales(15),
      paddingHorizontal: fontScales(15),
      borderRadius: fontScales(8),

      justifyContent: "center",
      alignItems: "center",
    },
    mobileSearchButton: {
      marginVertical: fontScales(10),
      width: "100%",
    },
    searchButtonText: {
      color: color.buttonPink,
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
    },

    contentWrapper: {
      alignItems: "center",
    },
    mainContentArea: {
      // flex: 1,
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor:color.white
    },
    mainContentAreaMobile: {
      flexDirection: "column",
      marginTop: fontScales(10),
      alignContent: "center",
    },

    // Left Sidebar (Filters)
    filterSidebar: {
            marginHorizontal: fontScales(40),
            ...((isMobile && Platform.OS ==='ios')  && { 
              marginLeft:fontScales(10),
             }),
            ...((isMobile && Platform.OS ==='android')  && { 
              marginLeft:fontScales(10),
               marginRight:fontScales(10),
             }),
    },
    filterHeader: {
      width: isMobile ? "100%" : "75%",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: isMobileOrTablet ? "center" : "flex-end",
         marginTop:fontScales(10),
    },
    filterTitle: {
      fontSize: fontScales(24),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      flex: 1,
    },
    clearAllFiltersText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
    },
    filterCard: {
      shadowColor: color.color_28252C,
      shadowOpacity: fontScales(50),
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: fontScales(10),
      elevation: 5,
      marginTop: fontScales(20),
      width: isMobile ? "100%" : "75%",
      backgroundColor: color.white,
      alignSelf: isMobileOrTablet ? "center" : "flex-end",
      alignItems: "center",
      borderStartColor: color.white,
      borderRadius: fontScales(10),
      paddingVertical: fontScales(20),
    },
    filterCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      width: "90%",
    },
    filterText: {
      color: color.color_28252C,
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
      flex: 1,
      marginRight: fontScales(15),
     // textAlign: isMobile ? "center" : "left",
    },
    filterText2: {
      color: color.color_28252C,
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
      marginRight: fontScales(15),
     // textAlign: isMobile ? "center" : "left",
    },

    filterList: {
      width: "90%",
    },

    // Right Section (Doctor List)
    doctorListSection: {
      paddingHorizontal: isMobile ? fontScales(20) : fontScales(40),
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
    },
    doctorCountText: {
      fontSize: fontScales(24),
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
    },
    appointmentTypeCard: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-end",
      flexWrap: "wrap",
      marginVertical: 10,
    },
    allAppointmentsText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
      color: color.color_FF008A,
      borderBottomWidth: 4,
      borderBottomColor: color.color_FF008A,
      paddingBottom: fontScales(10),
    },
    appointmentTypeText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
      paddingBottom: fontScales(10),
    },
    sortOptions: {
      flexDirection: "row",
      alignItems: "center",
    },
    doctorCardListContainer: {
      width: "100%",
    },

    // Compare Doctors Section
    compareSection: {
      backgroundColor: "#FFF5FB",
      width: "100%",
      paddingVertical: isMobileOrTablet ? fontScales(16) : fontScales(24),
      paddingHorizontal: isMobile ? fontScales(40) : fontScales(80),
    },
    compareHeaderRow: {
      flexDirection: isMobileOrTablet ? "column" : "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
    },
    compareSectionTitle: {
      color: "#28252C",
      fontFamily: "Rubik-Medium",
      fontSize: fontScales(24),
    },
    compareSectionHint: {
      color: "#827C8A",
      fontFamily: "Rubik-Regular",
      fontSize: fontScales(16),
    },
    compareFlatListContent: {
      flexDirection: isDesktop ? "row" : "column",
      alignSelf: "center",
      flex: 1,
      width: "100%",
    },
    compareCard: {
      backgroundColor: color.white,
      borderRadius: fontScales(10),
      padding: fontScales(12),
      flexDirection: isDesktop ? "row" : "column",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: isMobileOrTablet ? fontScales(10) : fontScales(20),
      minHeight: fontScales(80),
      marginRight: isDesktop ? fontScales(10) : fontScales(0),
      marginBottom: 10,
    },
    compareCardAvatar: {
      width: fontScales(32),
      height: fontScales(32),
      borderRadius: fontScales(2),
      marginRight: fontScales(10),
    },
    filterIcon: {
      width: fontScales(24),
      height: fontScales(24),
    },
    compareCardTextContainer: {
      flex: 1,
    },
    compareCardName: {
      color: "#28252C",
      fontFamily: font.Rubik_400r,
      fontSize: fontScales(14),
    },
    compareCardSpecialty: {
      fontSize: fontScales(14),
      color: color.color_28252C,
      fontFamily: font.Rubik_400r,
    },
    compareCardCloseButton: {
      position: "absolute",
      right: fontScales(-10),
      top: fontScales(-10),
    },
    emptyCompareSlot: {
      borderRadius: fontScales(6),
      padding: fontScales(12),
      flexDirection: isDesktop ? "row" : "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: isMobileOrTablet ? fontScales(10) : fontScales(20),
      borderStyle: "dashed",
      borderWidth: 1,
      height: fontScales(80),
      marginRight: isDesktop ? fontScales(10) : fontScales(0),
      borderColor: "#cacacc",
      marginBottom: 10,
    },
    emptyCompareSlotText: {
      color: "#bebec0",
      fontFamily: "Rubik-Regular",
      fontSize: fontScales(16),
    },
    compareActionBtn: {
      backgroundColor: color.white,
      borderRadius: fontScales(6),
      padding: fontScales(12),
      flexDirection: isDesktop ? "row" : "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: isMobileOrTablet ? fontScales(10) : fontScales(20),
      elevation: 2,
      height: fontScales(80),
      borderColor: color.buttonPink,
      borderWidth: 2,
      marginBottom: 10,
    },
    disabledCompareActionBtn: {
      opacity: 0.4,
    },
    compareActionBtnText: {
      color: "#FF008A",
      fontFamily: "Rubik-Medium",
      fontSize: fontScales(16),
      textTransform: "uppercase",
    },

    marginVertical20: {
      marginVertical: fontScales(20),
    },
    marginLeft30: {
      marginLeft: fontScales(30),
    },
    footerContainer: {
      width: "100%",
      height: "auto",
    },
    profileCardrow: {
      justifyContent: "space-between",
      marginBottom: 12,
    },
    card: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      padding: 16,
      borderRadius: fontScales(8),
      borderWidth: 1,
      borderColor: "#E0E0E0",
      width: "100%",
      minHeight: fontScales(48),
      marginBottom: fontScales(10),
    },
    nameActive: {
      fontSize: fontScales(16),
      color: color.color_28252C,
      fontFamily: font.Rubik_400r,
    },
    nameSomeonetext: {
      fontSize: fontScales(16),
      color: color.color_28252C60,
      fontFamily: font.Rubik_400r,
    },
    radio: {
      width: fontScales(20),
      height: fontScales(20),
      borderRadius: fontScales(10),
      borderWidth: 1,
      borderColor: "#CCC",
      alignItems: "center",
      justifyContent: "center",
    },
    selectedRadio: {
      backgroundColor: "#00D084",
      borderColor: "#00D084",
    },
    title: {
      fontSize: fontScales(20),
      fontFamily: font.Rubik_600sb,
      color: color.color_28252C,
      marginBottom: 20,
    },
    titleCreateGroup: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
      color: color.color_FF008A,
    },
    scheduleAppointmentButton: {
      width: "100%",
      height: fontScales(60),
      backgroundColor: color.color_FF008A,
      marginTop: fontScales(16),
      borderRadius: fontScales(10),
      justifyContent: "center",
    },
    scheduleButtonText: {
      color: color.white,
      fontSize: fontScales(20),
      fontFamily: font.Rubik_500m,
      textAlign: "center",
    },
    marginVertical4: {
      marginVertical: fontScales(4),
    },
    tabsContainer: {
      flexDirection: "row",
      borderBottomColor: "#eee",
      borderBottomWidth: 1
    },
    tabItem: {
      paddingVertical: fontScales(12),
      marginRight: fontScales(12),
      alignItems: "center",
      borderBottomWidth: 3,
      borderBottomColor: "transparent"
    },
    activeTabItem: {
      borderBottomColor: color.color_FF008A,
      borderBottomWidth: fontScales(3),
    },
    tabText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_400r,
      color: color.color_28252C,
       marginVertical: fontScales(8)
    },
    activeTabText: {
      fontSize: fontScales(16),
      fontFamily: font.Rubik_500m,
      color: color.color_FF008A,
    },
  });
