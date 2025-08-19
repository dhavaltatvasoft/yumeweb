import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import LoginHeader from "../components/login-header";
import Icon from "react-native-vector-icons/FontAwesome5";
import Popover from "react-native-popover-view";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { assets } from "./assets";
import {
  initialCalendarData,
  type Appointment,
  type DayData,
  type WeekData,
} from "./calendarData";
import {
  toAmPm,
  generateMonthDates,
  generateWeekDates,
  getAppointmentOffset,
  getTimeRowHeight,
} from "./calendarUtils";
import { createStyles } from "./styles";
import { color } from "../../theme/color";
import ManageWorkingTimeModal from './ManageWorkingTimeModal';
import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface NavigationProp {
  navigate: (screen: string) => void;
}

interface CalendarScreenProps {
  navigation: NavigationProp;
}

const screenWidth = Dimensions.get("window").width;

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
  const [viewMode, setViewMode] = useState<"Day" | "Week" | "Month">("Day");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [popOverVisible, setPopOverVisible] = useState(false);
  const [popoverIndex, setPopoverIndex] = useState<string | null>(null);
   const [isModalVisible, setIsModalVisible] = useState(false);

  const { isMobile, isTablet, scaleFactor, fontScale,isMobileApp} = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;
  const scale = (value: number) => (isMobile ? value * fontScale : value);

  const currentDate = useMemo(() => new Date(), []);
  const today = useMemo(() => currentDate.toDateString(), [currentDate]);

  const calendarStyles = useMemo(
    () => createStyles(isMobile,isMobileApp, isMobileOrTablet, scale,screenWidth),
    [isMobile, isMobileOrTablet, scale]
  );

  const {
    dates: displayedData,
    month,
    year,
  } = useMemo(
    () =>
      viewMode === "Month"
        ? generateMonthDates(currentDate, currentMonthOffset)
        : generateWeekDates(currentDate, currentWeek),
    [viewMode, currentDate, currentMonthOffset, currentWeek]
  );

  // Merge initial data with generated dates
  useMemo(() => {
    displayedData.forEach((dayData) => {
      const matchingDay = initialCalendarData.find(
        (data) => data.fullDate === dayData.fullDate
      );
      if (matchingDay) {
        dayData.appointments = matchingDay.appointments;
      }
    });
  }, [displayedData]);

  // Initialize selected day
  useEffect(() => {
    if (isInitialLoad) {
      const initialSelectedDayIndex = displayedData.findIndex(
        (day) => new Date(day.fullDate).toDateString() === today
      );
      if (initialSelectedDayIndex !== -1) {
        setSelectedDayIndex(initialSelectedDayIndex);
      }
      setIsInitialLoad(false);
    }
  }, [displayedData, isInitialLoad, today]);

  const handlePrevWeek = useCallback(
    () => setCurrentWeek((prev) => prev - 1),
    []
  );
  const handleNextWeek = useCallback(
    () => setCurrentWeek((prev) => prev + 1),
    []
  );
  const handlePrevMonth = useCallback(
    () => setCurrentMonthOffset((prev) => prev - 1),
    []
  );
  const handleNextMonth = useCallback(
    () => setCurrentMonthOffset((prev) => prev + 1),
    []
  );

  const handlePrevDay = useCallback(() => {
    if (selectedDayIndex > 0) {
      setSelectedDayIndex((prev) => prev - 1);
    } else {
      setCurrentWeek((prev) => prev - 1);
      setSelectedDayIndex(6);
    }
  }, [selectedDayIndex]);

  const handleNextDay = useCallback(() => {
    if (selectedDayIndex < 6) {
      setSelectedDayIndex((prev) => prev + 1);
    } else {
      setCurrentWeek((prev) => prev + 1);
      setSelectedDayIndex(0);
    }
  }, [selectedDayIndex]);

  const selectedDay = displayedData[selectedDayIndex];

  const renderAppointmentCard = useCallback(
    (apt: Appointment, index: number, isMonthView: boolean = false) => {
      const topOffset = getAppointmentOffset(apt.time);
      const style = isMonthView
        ? [calendarStyles.monthAppointmentCard, { backgroundColor: apt.color }]
        : [
            calendarStyles.appointmentCard,
            {
              top: topOffset,
              backgroundColor: apt.color,
              left: isMonthView ? undefined : 0,
              right: isMonthView ? undefined : 0,
            },
          ];

      return (
        <View key={index} style={style}>
          <Text
            numberOfLines={1}
            style={
              isMonthView
                ? calendarStyles.monthAppointmentText
                : calendarStyles.appointmentText
            }
          >
            {apt.name || "-"}
          </Text>
          {/* {apt.doctor && !isMonthView && (
          <Text style={calendarStyles.appointmentSubText}>{apt.doctor}</Text>
        )} */}
          {!isMonthView && !isMobile && (
            <View style={calendarStyles.timeDotContainer}>
              <Image
                style={calendarStyles.iconType}
                source={apt.type === "video" ? assets.cam : assets.userPpl}
                resizeMode="contain"
              />
              <Text style={calendarStyles.appointmentTime}>
                {toAmPm(apt.time, true)}
              </Text>
            </View>
          )}
        </View>
      );
    },
    [calendarStyles]
  );

  const renderDayView = useCallback(
    () => (
      <>
        <View style={calendarStyles.daysRowContainer}>
          <View style={calendarStyles.timeSpacer} />
          <View style={calendarStyles.dayHeader}>
            <Text style={[calendarStyles.dayText, calendarStyles.todayText]}>
              {selectedDay.day}
            </Text>
            <Text style={[calendarStyles.dayText, calendarStyles.todayText]}>
              {selectedDay.dayNumber}
            </Text>
          </View>
        </View>
        <ScrollView style={calendarStyles.scrollView}>
          <View style={calendarStyles.timeSlots}>
            {[...Array(24)].map((_, hourIndex) => {
              const hour = `${hourIndex.toString().padStart(2, "0")}:00`;
              const appointmentsInHour = selectedDay.appointments
                .filter((apt) => apt.time.startsWith(hour.slice(0, 2)))
                .sort((a, b) => a.time.localeCompare(b.time));
              const rowHeight = getTimeRowHeight(hour, [selectedDay]);

              return (
                <View
                  key={hourIndex}
                  style={[calendarStyles.timeRow, { height: rowHeight }]}
                >
                  <Text style={calendarStyles.timeText}>{toAmPm(hour)}</Text>
                  <View style={calendarStyles.dayColumn}>
                    {appointmentsInHour.map((apt, aptIndex) =>
                      renderAppointmentCard(apt, aptIndex)
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </>
    ),
    [calendarStyles, selectedDay, renderAppointmentCard]
  );

  const renderWeekView = useCallback(
    () => (
      <>                                                                                                                                                                                                                                                                
        <View style={calendarStyles.daysRowContainer}>
          <View style={calendarStyles.timeSpacer} />
          <View style={calendarStyles.daysRow}>
            {displayedData.map((day, index) => {
              const isToday = new Date(day.fullDate).toDateString() === today;
              return (
                <View
                  key={index}
                  style={[
                    calendarStyles.dayHeader,
                    isToday && calendarStyles.todayHeader,
                  ]}
                >
                  <Text
                    style={[
                      calendarStyles.dayText,
                      isToday && calendarStyles.todayText,
                    ]}
                  >
                    {day.day}
                  </Text>
                  <Text
                    style={[
                      calendarStyles.dayText,
                      isToday && calendarStyles.todayText,
                    ]}
                  >
                    {day.dayNumber}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <ScrollView style={calendarStyles.scrollView}>
          <View style={calendarStyles.timeSlots}>
            {[...Array(24)].map((_, hourIndex) => {
              const hour = `${hourIndex.toString().padStart(2, "0")}:00`;
              const rowHeight = getTimeRowHeight(hour, displayedData);
              return (
                <View
                  key={hourIndex}
                  style={[calendarStyles.timeRow, { height: rowHeight }]}
                >
                  <Text
                    style={[
                      calendarStyles.timeText,
                      isMobile && calendarStyles.timeTextMobile,
                    ]}
                  >
                    {toAmPm(hour)}
                  </Text>
                  <View style={calendarStyles.appointmentsRow}>
                    {displayedData.map((day, dayIndex) => {
                      const appointments = day.appointments
                        .filter((apt) => apt.time.startsWith(hour.slice(0, 2)))
                        .sort((a, b) => a.time.localeCompare(b.time));
                      return (
                        <View
                          key={dayIndex}
                          style={[
                            calendarStyles.dayColumn,
                            dayIndex === selectedDayIndex &&
                              calendarStyles.todayColumn,
                          ]}
                        >
                          {appointments.map((apt, aptIndex) =>
                            renderAppointmentCard(apt, aptIndex)
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </>
    ),
    [
      calendarStyles,
      displayedData,
      selectedDayIndex,
      today,
      renderAppointmentCard,
    ]
  );

  const renderMonthView = useCallback(
    () => (
      <>
        <View style={calendarStyles.monthHeader}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day, index) => (
              <Text key={index} style={calendarStyles.monthHeaderText}>
                {day}
              </Text>
            )
          )}
        </View>
        <ScrollView style={calendarStyles.scrollView}>
          <View style={calendarStyles.monthGrid}>
            {displayedData.map((day, index) => {
              const isToday =
                day.fullDate && new Date(day.fullDate).toDateString() === today;
              return (
                <View
                  key={index}
                  style={[
                    calendarStyles.monthDayCell,
                    isToday && calendarStyles.todayHeader,
                    index % 7 === 6 && calendarStyles.lastDayOfWeek,
                    Math.floor(index / 7) ===
                      Math.floor((displayedData.length - 1) / 7) &&
                      calendarStyles.lastRow,
                  ]}
                >
                  <Text
                    style={[
                      calendarStyles.monthDayText,
                      isToday && calendarStyles.todayText,
                      !day.isCurrentMonth && calendarStyles.outOfMonthText,
                    ]}
                  >
                    {day.dayNumber || ""}
                  </Text>

                  {day.appointments.length > 0 && (
                    <View
                      style={[
                        calendarStyles.monthAppointments,
                        isMobile && {
                          justifyContent: "center",
                          alignItems: "center",
                        },
                      ]}
                    >
                      {isMobile ? (
                        <TouchableOpacity
                          onPress={() => {
                            setPopoverIndex(day.fullDate);
                            setPopOverVisible(true);
                          }}
                          style={calendarStyles.monthDot}
                        />
                      ) : (
                        day.appointments
                          .slice(0, 3)
                          .map((apt, aptIndex) =>
                            renderAppointmentCard(apt, aptIndex, true)
                          )
                      )}
                      {!isMobile && day.appointments.length > 3 && (
                        <Popover
                          isVisible={
                            popOverVisible && popoverIndex === day.fullDate
                          }
                          onRequestClose={() => {
                            setPopOverVisible(false);
                            setPopoverIndex(null);
                          }}
                          from={
                            <TouchableOpacity
                              onPress={() => {
                                setPopoverIndex(day.fullDate);
                                setPopOverVisible(true);
                              }}
                              style={calendarStyles.moreButton}
                            >
                              <Text style={calendarStyles.moreButtonText}>
                                +{day.appointments.length - 3} More
                              </Text>
                            </TouchableOpacity>
                          }
                        >
                          <View style={calendarStyles.popOverContainer}>
                            <View style={calendarStyles.popOverHeaderContainer}>
                              <Text style={calendarStyles.popOverDate}>
                                {day.fullDate}
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  setPopOverVisible(false);
                                  setPopoverIndex(null);
                                }}
                              >
                                <Icon
                                  name="times"
                                  size={scale(20)}
                                  color={color.lable1}
                                />
                              </TouchableOpacity>
                            </View>
                            <ScrollView
                              style={{ flex: 1 }}
                              contentContainerStyle={{
                                paddingBottom: scale(10),
                              }}
                              keyboardShouldPersistTaps="handled"
                            >
                              {day.appointments.map((apt, aptIndex) => (
                                <View
                                  key={aptIndex}
                                  style={[
                                    calendarStyles.appointmentContent,
                                    {
                                      padding: scale(10),
                                      borderRadius: 6,
                                      backgroundColor: apt.color,
                                      marginTop: scale(10),
                                    },
                                  ]}
                                >
                                  <Text style={calendarStyles.appointmentText}>
                                    {apt.name || "-"}
                                  </Text>
                                  <View style={calendarStyles.timeDotContainer}>
                                    <Image
                                      style={calendarStyles.iconType}
                                      source={
                                        apt.type === "video"
                                          ? assets.cam
                                          : assets.userPpl
                                      }
                                      resizeMode="contain"
                                    />
                                    <Text
                                      style={calendarStyles.appointmentTime}
                                    >
                                      {toAmPm(apt.time, true)}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                            </ScrollView>
                          </View>
                        </Popover>
                      )}
                      {isMobile && day.appointments.length >= 1 && (
                        <Popover
                          isVisible={
                            popOverVisible && popoverIndex === day.fullDate
                          }
                          onRequestClose={() => {
                            setPopOverVisible(false);
                            setPopoverIndex(null);
                          }}
                          from={<View />}
                        >
                          <View style={calendarStyles.popOverContainer}>
                            <View style={calendarStyles.popOverHeaderContainer}>
                              <Text style={calendarStyles.popOverDate}>
                                {day.fullDate}
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  setPopOverVisible(false);
                                  setPopoverIndex(null);
                                }}
                              >
                                <Icon
                                  name="times"
                                  size={scale(20)}
                                  color={color.lable1}
                                />
                              </TouchableOpacity>
                            </View>
                            <ScrollView
                              style={{ flex: 1 }}
                              contentContainerStyle={{
                                paddingBottom: scale(10),
                              }}
                              keyboardShouldPersistTaps="handled"
                            >
                              {day.appointments.map((apt, aptIndex) => (
                                <View
                                  key={aptIndex}
                                  style={[
                                    calendarStyles.appointmentContent,
                                    {
                                      padding: scale(10),
                                      borderRadius: 6,
                                      backgroundColor: apt.color,
                                      marginTop: scale(10),
                                    },
                                  ]}
                                >
                                  <Text style={calendarStyles.appointmentText}>
                                    {apt.name || "-"}
                                  </Text>
                                  <View style={calendarStyles.timeDotContainer}>
                                    <Image
                                      style={calendarStyles.iconType}
                                      source={
                                        apt.type === "video"
                                          ? assets.cam
                                          : assets.userPpl
                                      }
                                      resizeMode="contain"
                                    />
                                    <Text
                                      style={calendarStyles.appointmentTime}
                                    >
                                      {toAmPm(apt.time, true)}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                            </ScrollView>
                          </View>
                        </Popover>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </>
    ),
    [
      calendarStyles,
      displayedData,
      popOverVisible,
      today,
      scale,
      renderAppointmentCard,
      setPopOverVisible,
      popoverIndex,
      setPopoverIndex,
    ]
  );

  return (
    <View style={calendarStyles.container}>
      <LoginHeader navigation={navigation} headerTitle="Calendar" />
      <View
        style={{
          margin: 20,
          backgroundColor: color.white,
          borderRadius: 8,
          flex: 1,
        }}
      >
        {isMobile && viewMode === "Month" ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: scale(10),
              paddingHorizontal: scale(5),
            }}
          >
            <View>
              <Text
                style={[
                  calendarStyles.headerText,
                  { paddingHorizontal: scale(10) },
                ]}
              >
                Health Heart Hospital
              </Text>
              <View style={calendarStyles.navButtons}>
                <Text style={calendarStyles.headerText}>
                  {month} {year}
                </Text>
                <TouchableOpacity
                  onPress={handlePrevMonth}
                  style={calendarStyles.navButton}
                >
                  <Icon name="chevron-left" size={16} color={color.black} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextMonth}
                  style={calendarStyles.navButton}
                >
                  <Icon name="chevron-right" size={16} color={color.black} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[calendarStyles.viewModeButtons]}>
              {(["Day", "Week", "Month"] as const).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  onPress={() => setViewMode(mode)}
                  style={[
                    calendarStyles.viewButton,
                    viewMode === mode && calendarStyles.activeButton,
                  ]}
                >
                  <Text
                    style={[
                      calendarStyles.viewButtonText,
                      viewMode === mode && calendarStyles.activeButtonText,
                    ]}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={calendarStyles.header}>
            <View style={calendarStyles.navButtons}>
              <Text style={calendarStyles.headerText}>
                {month} {year}
              </Text>
              {viewMode === "Day" ? (
                <>
                  <TouchableOpacity
                    onPress={handlePrevDay}
                    style={calendarStyles.navButton}
                  >
                    <Icon name="chevron-left" size={16} color={color.black} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNextDay}
                    style={calendarStyles.navButton}
                  >
                    <Icon name="chevron-right" size={16} color={color.black} />
                  </TouchableOpacity>
                </>
              ) : viewMode === "Week" ? (
                <>
                  <TouchableOpacity
                    onPress={handlePrevWeek}
                    style={calendarStyles.navButton}
                  >
                    <Icon name="chevron-left" size={16} color={color.black} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNextWeek}
                    style={calendarStyles.navButton}
                  >
                    <Icon name="chevron-right" size={16} color={color.black} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={handlePrevMonth}
                    style={calendarStyles.navButton}
                  >
                    <Icon name="chevron-left" size={16} color={color.black} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNextMonth}
                    style={calendarStyles.navButton}
                  >
                    <Icon name="chevron-right" size={16} color={color.black} />
                  </TouchableOpacity>
                </>
              )}
            </View>
            {viewMode === "Month" && !isMobile && (
              <Text style={calendarStyles.headerText}>
                Health Heart Hospital
              </Text>
            )}
            <View style={calendarStyles.viewModeButtons}>
              {(["Day", "Week", "Month"] as const).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  onPress={() => setViewMode(mode)}
                  style={[
                    calendarStyles.viewButton,
                    viewMode === mode && calendarStyles.activeButton,
                  ]}
                >
                  <Text
                    style={[
                      calendarStyles.viewButtonText,
                      viewMode === mode && calendarStyles.activeButtonText,
                    ]}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {viewMode === "Day"
          ? renderDayView()
          : viewMode === "Week"
          ? renderWeekView()
          : renderMonthView()}
      </View>



    </View>
  );
};

export default CalendarScreen;
