import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import TimeInput from "../../screens/doctorsdetails/component/TimeInput";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { color, font, fontSize } from "../../theme/color";
import { assets } from "./assets";

// Utility functions
const timeToMinutes = (time: string): number => {
  const [timePart, period] = time.split(" ");
  const [hours, minutes] = timePart.split(":").map(Number);
  let adjustedHours = hours;
  if (period === "PM" && hours !== 12) adjustedHours += 12;
  if (period === "AM" && hours === 12) adjustedHours = 0;
  return adjustedHours * 60 + minutes;
};

const addMinutesToTime = (time: string, minutesToAdd: number): string => {
  const minutes = timeToMinutes(time);
  const newMinutes = minutes + minutesToAdd;
  const newDate = new Date();
  newDate.setHours(Math.floor(newMinutes / 60), newMinutes % 60, 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(newDate);
};

const doSlotsOverlap = (
  slot1: { startTime: string; endTime: string },
  slot2: { startTime: string; endTime: string }
): boolean => {
  const start1 = timeToMinutes(slot1.startTime);
  const end1 = timeToMinutes(slot1.endTime);
  const start2 = timeToMinutes(slot2.startTime);
  const end2 = timeToMinutes(slot2.endTime);
  return start1 < end2 && start2 < end1;
};

const generateSlotId = () => Math.random().toString(36).substr(2, 9);

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const durationOptions = [
  "15 Minutes",
  "30 Minutes",
  "45 Minutes",
  "60 Minutes",
];

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
}

interface WorkingDay {
  active: boolean;
  slots: Slot[];
}

interface ManageWorkingTimeModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ManageWorkingTimeModal = ({
  visible,
  onClose,
  onSave,
}: ManageWorkingTimeModalProps) => {
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = useCallback(
    (value: number) => value * fontScale,
    [fontScale]
  );
  const styles = createStyles(isMobile, scale);

  const [duration, setDuration] = useState("15 Minutes");
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [copiedSlots, setCopiedSlots] = useState<Slot[]>([]);
  const timeInputRefs = useRef<{ [key: string]: any }>({});

  const [workingDays, setWorkingDays] = useState<Record<string, WorkingDay>>(
    () =>
      daysOfWeek.reduce(
        (acc, day) => ({
          ...acc,
          [day]: {
            active: ["Monday", "Tuesday", "Wednesday"].includes(day),
            slots: ["Monday"].includes(day)
              ? [
                  {
                    id: generateSlotId(),
                    startTime: "09:00 AM",
                    endTime: "01:00 PM",
                  },
                  {
                    id: generateSlotId(),
                    startTime: "02:00 PM",
                    endTime: "06:00 PM",
                  },
                ]
              : ["Tuesday"].includes(day)
              ? [
                  {
                    id: generateSlotId(),
                    startTime: "09:00 AM",
                    endTime: "01:00 PM",
                  },
                ]
              : [],
          },
        }),
        {}
      )
  );

  const getMinuteInterval = useCallback(
    () => parseInt(duration.split(" ")[0], 10),
    [duration]
  );

  const validateSlot = useCallback(
    (day: string, index: number, newSlot: Slot): boolean => {
      const startMinutes = timeToMinutes(newSlot.startTime);
      const endMinutes = timeToMinutes(newSlot.endTime);
      if (endMinutes <= startMinutes) {
        Alert.alert("Invalid Time", "End time must be after start time.");
        return false;
      }

      const otherSlots = workingDays[day].slots.filter((_, i) => i !== index);
      const hasOverlap = otherSlots.some((slot) =>
        doSlotsOverlap(newSlot, slot)
      );
      if (hasOverlap) {
        Alert.alert(
          "Invalid Time",
          "Time slot overlaps with an existing slot."
        );
        return false;
      }
      return true;
    },
    [workingDays]
  );

  const handleDurationChange = useCallback((newDuration: string) => {
    setDuration(newDuration);
    setIsDurationDropdownOpen(false);
  }, []);

  const handleTimeChange = useCallback(
    (
      day: string,
      index: number,
      key: "startTime" | "endTime",
      newTime: string
    ) => {
      const slots = [...workingDays[day].slots];
      const currentSlot = { ...slots[index], [key]: newTime };
      if (validateSlot(day, index, currentSlot)) {
        slots[index] = currentSlot;
        setWorkingDays((prev) => ({ ...prev, [day]: { ...prev[day], slots } }));
      }
    },
    [validateSlot, workingDays]
  );

  const handleTimeIconPress = useCallback((refKey: string) => {
    const timeInputRef = timeInputRefs.current[refKey];
    if (timeInputRef?.openTimePicker) {
      timeInputRef.openTimePicker();
    }
  }, []);

  const handleAddSlot = useCallback(
    (day: string) => {
      const durationMinutes = getMinuteInterval();
      const slots = [...workingDays[day].slots];
      let newStartTime = "09:00 AM";
      if (slots.length > 0) {
        newStartTime = slots[slots.length - 1].endTime;
      }
      const newEndTime = addMinutesToTime(newStartTime, durationMinutes);
      const newSlot = {
        id: generateSlotId(),
        startTime: newStartTime,
        endTime: newEndTime,
      };

      if (validateSlot(day, slots.length, newSlot)) {
        slots.push(newSlot);
        setWorkingDays((prev) => ({ ...prev, [day]: { ...prev[day], slots } }));
      }
    },
    [getMinuteInterval, validateSlot, workingDays]
  );

  const handleRemoveSlot = useCallback(
    (day: string, index: number) => {
      const slots = [...workingDays[day].slots];
      slots.splice(index, 1);
      setWorkingDays((prev) => ({ ...prev, [day]: { ...prev[day], slots } }));
    },
    [workingDays]
  );

  const toggleDay = useCallback((day: string) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], active: !prev[day].active },
    }));
  }, []);

  const handleCopySlots = useCallback(
    (day: string) => {
      setCopiedSlots([...workingDays[day].slots]);
    },
    [workingDays]
  );

  const handlePasteSlots = useCallback(
    (day: string) => {
      if (copiedSlots.length === 0) return;
      const newSlots = copiedSlots.map((slot) => ({
        ...slot,
        id: generateSlotId(),
      }));
      for (let i = 0; i < newSlots.length; i++) {
        if (!validateSlot(day, i, newSlots[i])) return;
        for (let j = 0; j < i; j++) {
          if (doSlotsOverlap(newSlots[i], newSlots[j])) {
            Alert.alert(
              "Invalid Time",
              "Pasted slots contain overlapping times."
            );
            return;
          }
        }
      }
      setWorkingDays((prev) => ({
        ...prev,
        [day]: { ...prev[day], slots: newSlots },
      }));
    },
    [copiedSlots, validateSlot]
  );

  const handleSave = useCallback(() => {
    for (const day of daysOfWeek) {
      if (!workingDays[day].active) continue;
      const slots = workingDays[day].slots;
      for (let i = 0; i < slots.length; i++) {
        if (!validateSlot(day, i, slots[i])) return;
      }
    }
    onClose();
  }, [onClose, validateSlot, workingDays]);

  const handleCloseModel = useCallback(() => {
    if (isDurationDropdownOpen) {
      setIsDurationDropdownOpen(false);
    } else {
      onClose();
    }
  }, [isDurationDropdownOpen, onClose]);

  const handleCloseDurations = useCallback(() => {
    if (isDurationDropdownOpen) {
      setIsDurationDropdownOpen(false);
    }
  }, [isDurationDropdownOpen]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleCloseModel}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={handleCloseDurations}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Manage Working Time</Text>
                <TouchableOpacity
                  onPress={() => [onClose(), setIsDurationDropdownOpen(false)]}
                >
                  <Icon name="times" size={scale(20)} color={color.lable1} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalInputLabel}>
                Default Appointment Duration
              </Text>
              <TouchableOpacity
                style={styles.dropdownDurations}
                onPress={() =>
                  setIsDurationDropdownOpen(!isDurationDropdownOpen)
                }
                activeOpacity={0.7}
              >
                <Text style={styles.dropdownText}>{duration}</Text>
                <Icon
                  name="chevron-down"
                  size={scale(14)}
                  color={color.textLight}
                />
              </TouchableOpacity>
              {isDurationDropdownOpen && (
                <View style={styles.dropdownMenu}>
                  {durationOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => handleDurationChange(option)}
                    >
                      <Text style={styles.dropdownText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <ScrollView>
                {daysOfWeek.map((day) => {
                  const { active, slots } = workingDays[day];
                  return (
                    <View key={day} style={styles.dayBlock}>
                      <View style={styles.dayHeader}>
                        <Text style={styles.dayText}>{day}</Text>
                        <TouchableOpacity onPress={() => toggleDay(day)}>
                          <View
                            style={{
                              height: scale(25),
                              width: scale(25),
                              borderRadius: scale(12.5),
                              borderWidth: 1,
                              borderColor: "#E0DEE2",
                            }}
                          >
                            {active && (
                              <Image
                                style={{ height: "100%", width: "100%" }}
                                resizeMode="contain"
                                source={assets.doneMark}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>

                      {active &&
                        slots.map((slot: Slot, index: number) => (
                          <View key={slot.id} style={styles.slotRow}>
                            <TimeInput
                              isFromManage={true}
                              ref={(el: any) =>
                                (timeInputRefs.current[
                                  `${day}-${slot.id}-start`
                                ] = el)
                              }
                              label="Start Time"
                              time={slot.startTime}
                              onTimeChange={(newTime: string) =>
                                handleTimeChange(
                                  day,
                                  index,
                                  "startTime",
                                  newTime
                                )
                              }
                              onPressIcon={() =>
                                handleTimeIconPress(`${day}-${slot.id}-start`)
                              }
                              labelStyle={{ display: "none" }}
                              inputContainerStyle={{
                                borderWidth: scale(1),
                                borderColor: color.colorE3E3E3,
                                paddingHorizontal: scale(12),
                                paddingVertical: scale(8),
                                borderRadius: scale(8),
                                backgroundColor: color.white,
                                marginRight: scale(8),
                                minWidth: scale(100),
                                height: undefined,
                              }}
                              minuteInterval={getMinuteInterval()}
                            />
                            <TimeInput
                              isFromManage={true}
                              ref={(el: any) =>
                                (timeInputRefs.current[
                                  `${day}-${slot.id}-end`
                                ] = el)
                              }
                              label="End Time"
                              time={slot.endTime}
                              onTimeChange={(newTime: string) =>
                                handleTimeChange(day, index, "endTime", newTime)
                              }
                              onPressIcon={() =>
                                handleTimeIconPress(`${day}-${slot.id}-end`)
                              }
                              labelStyle={{ display: "none" }}
                              inputContainerStyle={{
                                borderWidth: scale(1),
                                borderColor: color.colorE3E3E3,
                                paddingHorizontal: scale(12),
                                paddingVertical: scale(8),
                                borderRadius: scale(8),
                                backgroundColor: color.white,
                                marginRight: scale(8),
                                minWidth: scale(100),
                                height: undefined,
                              }}
                              minuteInterval={getMinuteInterval()}
                            />
                            <TouchableOpacity
                              onPress={() => handleRemoveSlot(day, index)}
                            >
                              <View
                                style={[
                                  styles.dropdown,
                                  {
                                    marginRight: 0,
                                    minWidth: 0,
                                    marginBottom: scale(15),
                                  },
                                ]}
                              >
                                <Image
                                  style={{
                                    height: scale(25),
                                    width: scale(20),
                                  }}
                                  source={assets.delete}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        ))}

                      {active && (
                        <View style={styles.actionsRow}>
                          <TouchableOpacity onPress={() => handleAddSlot(day)}>
                            <Text style={styles.addSlot}>+ ADD SLOT</Text>
                          </TouchableOpacity>
                          <View style={styles.copyRow}>
                            <TouchableOpacity
                              onPress={() => handleCopySlots(day)}
                              style={styles.iconRow}
                            >
                              <Icon
                                name="copy"
                                size={scale(14)}
                                color={color.textLight}
                              />
                              <Text style={styles.iconText}>COPY SLOTS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handlePasteSlots(day)}
                              style={styles.iconRow}
                            >
                              <Icon
                                name="paste"
                                size={scale(14)}
                                color={color.textLight}
                              />
                              <Text style={styles.iconText}>PASTE SLOTS</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
              </ScrollView>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSave}
                >
                  <Text style={styles.modalButtonText}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelText}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const createStyles = (isMobile: boolean, scale: (val: number) => number) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: isMobile ? "center" : "flex-end",
      alignItems: isMobile ? "center" : "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
      backgroundColor: color.white,
      width: isMobile ? "90%" : "30%",
      height: isMobile ? undefined : "100%",
      maxHeight: isMobile ? "80%" : undefined,
      borderRadius: isMobile ? scale(8) : 0,
      padding: isMobile ? scale(16) : scale(24),
      zIndex: 99,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: scale(16),
    },
    modalTitle: {
      fontFamily: font.Rubik_500m,
      fontSize: scale(fontSize.fontSize18),
      color: color.lable1,
    },
    modalInputLabel: {
      fontFamily: font.Rubik_500m,
      fontSize: scale(fontSize.fontSize14),
      color: color.lable1,
      marginBottom: scale(6),
    },
    dropdownDurations: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: scale(1),
      borderColor: color.colorE3E3E3,
      paddingHorizontal: scale(12),
      paddingVertical: scale(10),
      borderRadius: scale(8),
      backgroundColor: color.white,
      marginBottom: scale(10),
    },
    dropdownMenu: {
      position: "absolute",
      top: scale(130),
      marginHorizontal: scale(20),
      left: 0,
      right: 0,
      backgroundColor: color.white,
      borderWidth: scale(1),
      borderColor: color.colorE3E3E3,
      borderRadius: scale(8),
      zIndex: 100,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    dropdownItem: {
      paddingHorizontal: scale(12),
      paddingVertical: scale(10),
      borderBottomWidth: scale(1),
      borderBottomColor: color.colorE3E3E3,
    },
    dropdownText: {
      fontFamily: font.Rubik_400r,
      fontSize: scale(fontSize.fontSize14),
      color: color.lable1,
    },
    dayBlock: {
      marginBottom: scale(16),
      padding: scale(10),
      backgroundColor: color.colorF9F9F9,
      borderRadius: scale(8),
    },
    dayHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: scale(8),
    },
    dayText: {
      fontFamily: font.Rubik_500m,
      fontSize: scale(fontSize.fontSize16),
      color: color.lable1,
    },
    slotRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: scale(8),
      gap: scale(8),
    },
    dropdown: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: scale(1),
      borderColor: color.colorE3E3E3,
      paddingHorizontal: scale(12),
      paddingVertical: scale(8),
      borderRadius: scale(8),
      backgroundColor: color.white,
      marginRight: scale(8),
      minWidth: scale(100),
    },
    addSlot: {
      fontFamily: font.Rubik_500m,
      fontSize: scale(fontSize.fontSize12),
      color: color.secondary1,
      marginTop: scale(4),
      marginBottom: scale(8),
    },
    actionsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    copyRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(12),
    },
    iconRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(4),
    },
    iconText: {
      fontFamily: font.Rubik_400r,
      fontSize: scale(fontSize.fontSize12),
      color: color.textLight,
      marginLeft: scale(4),
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: scale(12),
    },
    modalButton: {
      flex: 1,
      backgroundColor: color.secondary1,
      borderRadius: scale(8),
      padding: scale(12),
      alignItems: "center",
      marginRight: scale(8),
    },
    modalButtonText: {
      fontFamily: font.Rubik_500m,
      fontSize: scale(fontSize.fontSize14),
      color: color.white,
    },
    cancelButton: {
      flex: 1,
      padding: scale(12),
      borderRadius: scale(8),
      backgroundColor: color.colorE3E3E3,
      alignItems: "center",
    },
    cancelText: {
      fontFamily: font.Rubik_500m,
      fontSize: scale(fontSize.fontSize14),
      color: color.lable1,
    },
  });

export default ManageWorkingTimeModal;
