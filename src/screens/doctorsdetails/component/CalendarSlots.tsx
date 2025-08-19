import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LayoutChangeEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import dayjs from "dayjs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { color, font } from "../../../theme/color";
import { useScreenDimensions } from "../../../utils/DimensionsUtilities";
import "dayjs/locale/fr";

const DAYS_TO_SHOW = 4;
const DEFAULT_TIME_SLOTS = [
  "9:30 AM",
  "10:30 AM",
  "11:30 AM",
  "1:30 PM",
  "2:30 PM",
  "3:30 PM",
];

type CalendarSlotsProps = {
  onSlotPress?: (date: string, time: string) => void;
};

const CalendarSlots: React.FC<CalendarSlotsProps> = ({ onSlotPress }) => {
  const { isMobile, isTablet, isDesktop, scaleFactor, fontScale } =
    useScreenDimensions();
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [scaleFactor]
  );
  const styles: any = useMemo(() => getStyles(fontScales), [scaleFactor]);

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dateList = useMemo(
    () =>
      Array.from({ length: DAYS_TO_SHOW }, (_, i) => startDate.add(i, "day")),
    [startDate]
  );

  const generateInitialAvailability = useCallback(
    (start: dayjs.Dayjs = dayjs()): Record<string, string[]> =>
      Array.from({ length: DAYS_TO_SHOW }).reduce(
        (acc: Record<string, string[]>, _, i) => {
          const date = start.add(i, "day").format("YYYY-MM-DD");
          acc[date] = DEFAULT_TIME_SLOTS;
          return acc;
        },
        {}
      ),
    []
  );

  const [availabilityMap, setAvailabilityMap] = useState<
    Record<string, string[]>
  >(() => generateInitialAvailability(startDate));

  const updateAvailabilityMap = useCallback(
    (start: dayjs.Dayjs) => {
      const updated = { ...availabilityMap };
      for (let i = 0; i < DAYS_TO_SHOW; i++) {
        const date = start.add(i, "day").format("YYYY-MM-DD");
        if (!updated[date]) updated[date] = DEFAULT_TIME_SLOTS;
      }
      setAvailabilityMap(updated);
    },
    [availabilityMap]
  );

  const handleChangeWeek = useCallback(
    (direction: "prev" | "next") => {
      const newStartDate = startDate.add(
        direction === "next" ? DAYS_TO_SHOW : -DAYS_TO_SHOW,
        "day"
      );
      setStartDate(newStartDate);
      updateAvailabilityMap(newStartDate);
    },
    [startDate, updateAvailabilityMap]
  );

  const handleSelectSlot = useCallback(
    (date: string, slot: string) => {
      setSelectedDate(date);
      setSelectedTime(slot);
      onSlotPress?.(date, slot);
    },
    [onSlotPress]
  );

  const handleContainerLayout = useCallback(
    (event: LayoutChangeEvent) =>
      setContainerWidth(event.nativeEvent.layout.width),
    []
  );

  const renderSlotItem = (
    dateStr: string,
    slot: string,
    isSelected: boolean
  ) => (
    <TouchableOpacity
      key={slot}
      style={[styles.slotButton, isSelected && styles.slotButtonSelected]}
      onPress={() => handleSelectSlot(dateStr, slot)}
    >
      <Text style={[styles.slotText, isSelected && styles.slotTextSelected]}>
        {slot}
      </Text>
    </TouchableOpacity>
  );

  const renderDateColumn = useCallback(
    ({ item: dateObj }: { item: dayjs.Dayjs }) => {
      const dateStr = dateObj.format("YYYY-MM-DD");
      const isActive = dateStr === selectedDate;
      const slots = availabilityMap[dateStr] || [];

      return (
        <View style={[styles.dateColumn, { width: containerWidth / 4.7 }]}>
          <TouchableOpacity
            style={[styles.dateHeader, { width: containerWidth / 4.7 }]}
            onPress={() => {
              setSelectedDate(dateStr);
              setSelectedTime(null);
            }}
          >
            <Text style={styles.dayLabel}>{dateObj.format("ddd")}</Text>
            <Text
              style={[styles.dateLabel, isActive && styles.dateLabelActive]}
            >
              {dateObj.format("MMM D")}
            </Text>
            <View
              style={[
                styles.underlineIndicator,
                {
                  backgroundColor: isActive ? color.color_FF008A : color.white,
                },
              ]}
            />
          </TouchableOpacity>
          <View style={styles.slotsWrapper}>
            {slots.map((slot: string) =>
              renderSlotItem(dateStr, slot, isActive && selectedTime === slot)
            )}
          </View>
        </View>
      );
    },
    [selectedDate, selectedTime, availabilityMap, containerWidth, styles]
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => handleChangeWeek("prev")}
          style={styles.arrowButton}
        >
          <FontAwesome
            name="chevron-left"
            size={fontScales(12)}
            color={color.color_28252C}
          />
        </TouchableOpacity>
        <Text style={styles.yearLabel}>{startDate.format("YYYY")}</Text>
        <TouchableOpacity
          onPress={() => handleChangeWeek("next")}
          style={styles.arrowButton}
        >
          <FontAwesome
            name="chevron-right"
            size={fontScales(12)}
            color={color.color_28252C}
          />
        </TouchableOpacity>
      </View>

      <View onLayout={handleContainerLayout} style={styles.calendarContainer}>
        <FlatList
          horizontal
          data={dateList}
          keyExtractor={(item) => item.format("YYYY-MM-DD")}
          contentContainerStyle={styles.dateListWrapper}
          renderItem={renderDateColumn}
        />
      </View>
    </View>
  );
};

export default CalendarSlots;

const getStyles = (fontScales: (val: number) => number): any =>
  StyleSheet.create({
    wrapper: {
      paddingVertical: fontScales(25),
      paddingHorizontal: fontScales(16),
      borderRadius: fontScales(10),
      backgroundColor: color.white,
      borderColor: "#E0DEE2",
      borderWidth: fontScales(1),
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: fontScales(10),
    },
    yearLabel: {
      fontFamily: font.Rubik_500m,
      color: color.color_28252C,
      fontSize: fontScales(16),
    },
    arrowButton: { paddingHorizontal: fontScales(6) },
    calendarContainer: { flex: 1, alignItems: "center" },
    dateListWrapper: { paddingHorizontal: fontScales(4), flexDirection: "row" },
    dateColumn: { alignItems: "center", marginHorizontal: fontScales(5) },
    dateHeader: { alignItems: "center", flex: 1 },
    dayLabel: {
      color: "#28252C",
      fontFamily: font.Rubik_400r,
      textAlign: "center",
      fontSize: fontScales(14),
    },
    dateLabel: {
      fontSize: fontScales(14),
      fontFamily: font.Rubik_500m,
      color: "#28252C",
    },
    dateLabelActive: { color: "#ff1493" },
    underlineIndicator: {
      height: fontScales(2),
      width: "100%",
      marginTop: fontScales(4),
      borderRadius: fontScales(2),
    },
    slotsWrapper: {
      paddingVertical: fontScales(8),
      gap: fontScales(6),
      width: "100%",
    },
    slotButton: {
      borderRadius: fontScales(6),
      borderWidth: fontScales(1),
      alignItems: "center",
      paddingVertical: fontScales(15),
      paddingHorizontal: fontScales(8),
      borderColor: "#ccc",
      backgroundColor: "#fff",
      marginVertical: fontScales(6),
    },
    slotButtonSelected: { borderColor: "#ff1493", backgroundColor: "#ffe6f0" },
    slotText: {
      fontFamily: font.Rubik_300l,
      textAlign: "center",
      fontSize: fontScales(14),
      color: "#28252C",
    },
    slotTextSelected: { color: "#ff1493" },
  });
