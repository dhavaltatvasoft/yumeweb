import { Dimensions, StyleSheet } from "react-native";
import { color, font, fontSize } from "../../theme/color";

export const createStyles = (
  isMobile: boolean,
  isMobileApp: boolean,
  isMobileOrTablet: boolean,
  scale: (val: number) => number,
  screenWidth: number
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.colorF9F9F9,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: scale(10),
    },
    headerText: {
      fontSize: scale(fontSize.fontSize16),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
    },
    viewModeButtons: {
      flexDirection: "row",
    },
    viewButton: {
      padding: scale(5),
      marginLeft: scale(5),
    },
    activeButton: {
      borderBottomColor: color.secondary1,
      borderBottomWidth: 2,
    },
    activeButtonText: {
      fontFamily: font.Rubik_500m,
      fontSize: scale(fontSize.fontSize14),
      lineHeight: scale(30),
      color: color.secondary1,
    },
    viewButtonText: {
      fontFamily: font.Rubik_400r,
      fontSize: scale(fontSize.fontSize14),
      lineHeight: scale(30),
      color: color.lable1,
    },
    navButtons: {
      flexDirection: "row",
      justifyContent: "flex-start",
      paddingHorizontal: scale(10),
      paddingVertical: scale(5),
      alignItems: "center",
    },
    navButton: {
      marginStart: scale(10),
      borderRadius: scale(15),
      height: scale(30),
      width: scale(30),
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: color.lable1,
    },
    daysRowContainer: {
      flexDirection: "row",
      borderBottomWidth: scale(1),
      borderColor: color.colorE3E3E3,
    },
    timeSpacer: {
      width: isMobile ? scale(45) : scale(80),
      borderRightWidth: 0,
      borderColor: color.colorE3E3E3,
      borderTopWidth: 1,
    },
    daysRow: {
      flex: 1,
      flexDirection: "row",
    },
    dayHeader: {
      flex: 1,
      padding: scale(10),
      alignItems: "center",
      borderRightWidth: 0,
      borderColor: color.colorE3E3E3,
      borderTopWidth: 1,
    },
    todayHeader: {},
    dayText: {
      fontSize: isMobile ? scale(fontSize.fontSize12) : scale(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
    },
    todayText: {
      color: color.secondary1,
      fontFamily: font.Rubik_500m,
      fontSize: isMobile ? scale(fontSize.fontSize11) : scale(fontSize.fontSize16),
    },
    scrollView: {
      flex: 1,
    },
    timeSlots: {
      flexDirection: "column",
    },
    timeRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: color.colorE3E3E3,
    },
    timeText: {
      width: scale(80),
      padding: scale(10),
      fontSize: scale(fontSize.fontSize14),
      borderRightWidth: 1,
      borderColor: color.colorE3E3E3,
      textAlign: "center",
      fontFamily: font.Rubik_500m,
      color: color.textLight,
    },
    timeTextMobile: {
      width: scale(50),
      padding: scale(7),
      fontSize: scale(fontSize.fontSize12),
      borderRightWidth: 1,
      borderColor: color.colorE3E3E3,
      textAlign: "center",
      fontFamily: font.Rubik_500m,
      color: color.textLight,
    },
    appointmentsRow: {
      flex: 1,
      flexDirection: "row",
    },
    dayColumn: {
      flex: 1,
      width: (screenWidth - (isMobile ? scale(50) : scale(80))) / 7,
      padding: 5,
      borderRightWidth: 1,
      borderColor: color.colorE3E3E3,
      position: "relative",
    },
    todayColumn: {},
    appointmentCard: {
      padding: 5,
      borderRadius: 5,
      position: "absolute",
      width: "90%",
      height: 35,
    },
    appointmentContent: {
      flexDirection: "column",
    },
    appointmentTime: {
      fontSize: scale(fontSize.fontSize8),
      color: color.lable1,
      fontFamily: font.Rubik_400r,
      marginStart: scale(2),
    },
    appointmentText: {
      fontSize: scale(fontSize.fontSize9),
      color: color.lable1,
      fontFamily: font.Rubik_500m,
    },
    timeDotContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconType: {
      height: scale(12),
      width: scale(12),
      margin: scale(2),
    },
    monthHeader: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: color.colorE3E3E3,
    },
    monthHeaderText: {
      flex: 1,
      padding: 10,
      fontSize: isMobile ? scale(fontSize.fontSize12) : scale(fontSize.fontSize16),
      fontFamily: font.Rubik_400r,
      color: color.lable1,
      textAlign: "center",
    },
    monthGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    monthDayCell: {
      flex: 1,
      flexBasis: `${100 / 7}%`,
      height: 130,
      padding: 5,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: color.colorE3E3E3,
      maxWidth: `${100 / 7}%`, // Ensure equal width distribution
    },
    lastDayOfWeek: {
      borderRightWidth: 0,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    monthDayText: {
      fontSize: scale(fontSize.fontSize16),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
      textAlign: "center",
    },
    monthAppointments: {
      marginTop: scale(5),
    },
    monthAppointmentCard: {
      padding: scale(6),
      borderRadius: scale(3),
      marginBottom: scale(3),
    },
    monthAppointmentText: {
      fontSize: scale(fontSize.fontSize9),
      color: color.lable1,
      fontFamily: font.Rubik_500m,
    },
    moreButton: {
      padding: 3,
      backgroundColor: color.white,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: color.secondary1,
    },
    moreButtonText: {
      fontSize: scale(fontSize.fontSize9),
      fontFamily: font.Rubik_500m,
      color: color.secondary1,
    },
    outOfMonthText: {
      color: `${color.lable1}50`,
    },
    popOverContainer: {
      width: scale(250),
      height: scale(300),
      padding: scale(10),
    },
    popOverHeaderContainer: {
      flexDirection: "row",
      marginVertical: scale(10),
      justifyContent: "space-between",
      alignItems: "center",
    },
    popOverDate: {
      fontFamily: font.Rubik_500m,
      fontSize: scale(fontSize.fontSize12),
      color: color.lable1,
      lineHeight: scale(11),
    },
    monthDot: {
      height: scale(10),
      width: scale(10),
      backgroundColor: color.secondary1,
      borderRadius: scale(5),
    },
  });