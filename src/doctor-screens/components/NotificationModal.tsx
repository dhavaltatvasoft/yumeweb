import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { color, font, fontSize } from "../../theme/color";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import { assets } from "../../doctor-screens/assets/index";
import { assets as stateAssets } from "../../doctor-screens/dashboard/assets/index";

interface NotificationConfig {
  icon: any;
  color: string;
}

type NotificationTitle =
  | "Wait List Request"
  | "New Booking Request"
  | "Booking Cancelled"
  | "Reschedule Requested"
  | "Confirmed"
  | "Confirmation Pending";

const notificationConfig: Record<NotificationTitle, NotificationConfig> = {
  "Wait List Request": {
    icon: stateAssets.stats1,
    color: color.colorFAB446,
  },
  "New Booking Request": {
    icon: stateAssets.stats2,
    color: color.doctorRatingContainer,
  },
  "Booking Cancelled": {
    icon: assets.deleteNotification,
    color: color.colorE83636,
  },
  "Reschedule Requested": {
    icon: assets.rescheduleRequested,
    color: color.colorFAB446,
  },
  Confirmed: {
    icon: assets.confirmed,
    color: color.color_00D193,
  },
  "Confirmation Pending": {
    icon: assets.confirmationPending,
    color: color.colorFAB446,
  },
};

const notifications: Notification[] = [
  {
    id: "1",
    title: "Wait List Request",
    message:
      "You have received new wait list request from stellina parker on 25 Feb, 9:45 PM",
    time: "5 hours ago",
  },
  {
    id: "2",
    title: "Wait List Request",
    message:
      "You have received new wait list request from john ode on 24 Feb, 9:00 PM",
    time: "7 hours ago",
  },
  {
    id: "3",
    title: "New Booking Request",
    message:
      "You have received new booking request from john ode on 24 Feb, 9:00 PM",
    time: "8 hours ago",
  },
  {
    id: "4",
    title: "New Booking Request",
    message:
      "You have received new booking request from john ode on 24 Feb, 9:00 PM",
    time: "12 hours ago",
  },
  {
    id: "5",
    title: "New Booking Request",
    message:
      "You have received new booking request from john ode on 24 Feb, 9:00 PM",
    time: "12 hours ago",
  },
  {
    id: "6",
    title: "Booking Cancelled",
    message: "Stellina parker has cancelled the booking on 24 Feb, 9:00 PM",
    time: "12 hours ago",
  },
  {
    id: "7",
    title: "Reschedule Requested",
    message: "",
    time: "",
  },
  {
    id: "8",
    title: "Confirmed",
    message: "",
    time: "",
  },
  {
    id: "9",
    title: "Confirmation Pending",
    message: "",
    time: "",
  },
];

interface Notification {
  id: string;
  title: NotificationTitle;
  message: string;
  time: string;
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

const NotificationModal = ({ visible, onClose }: NotificationModalProps) => {
  const { isMobile, fontScale } = useScreenDimensions();
  const scale = (value: number) => value * fontScale;
  const styles = createStyles(isMobile, scale);

  const renderItem = ({ item }: { item: Notification }) => {
    console.log("Rendering item:", item);
    const { icon, color: itemColor } = notificationConfig[item.title] || {
      icon: stateAssets.stats1,
      color: color.colorFAB446,
    };

    return (
      <View style={styles.notificationItem}>
        <View style={[styles.icon, { backgroundColor: `${itemColor}05`, marginEnd: scale(5) }]}>
          {icon ? (
            <Image source={icon} resizeMode="contain" style={styles.imageIcon} />
          ) : (
            <Text>Icon Missing</Text>
          )}
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.title}>
            <Text style={styles.titleBold}>{item.title}: </Text>
            {item.message || "No message available"}
          </Text>
          {item.time && <Text style={styles.time}>{item.time}</Text>}
        </View>
      </View>
    );
  };

  const handleClose = () => {
    console.log("Overlay clicked, closing modal");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={handleClose}
        {...(Platform.OS === "web" ? { onClick: handleClose } : {})}
      />
      <View style={[styles.modalContainer, { pointerEvents: Platform.OS === "web" ? "auto" : "box-none" }]}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Notifications</Text>
          <TouchableOpacity onPress={handleClose}>
            <Icon name="times" size={scale(20)} color={color.lable1} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
          style={{ flex: 1 }}
          bounces={true}
          showsVerticalScrollIndicator={true}
          ListEmptyComponent={<Text>No notifications available</Text>}
          pointerEvents="auto"
        />
      </View>
    </Modal>
  );
};

const createStyles = (isMobile: boolean, scale: (val: number) => number) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 98,
      pointerEvents: "auto",
    },
    modalContainer: {
      backgroundColor: color.white,
      width: isMobile ? "90%" : "30%",
      height: isMobile ? "80%" : "100%",
      borderRadius: isMobile ? scale(8) : 0,
      padding: isMobile ? scale(16) : scale(24),
      position: isMobile ? "absolute" : "relative",
      top: isMobile ? "10%" : 0,
      alignSelf: isMobile ? "center" : "flex-end",
      zIndex: 99,
      pointerEvents: "box-none",
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
    listContent: {
      flexGrow: 1,
      paddingBottom: scale(20),
    },
    notificationItem: {
      flexDirection: "row",
      marginBottom: scale(16),
      paddingVertical: scale(10),
      borderRadius: scale(8),
      backgroundColor: color.white,
    },
    icon: {
      padding: scale(10),
      borderRadius: scale(6),
      justifyContent: "center",
      alignItems: "center",
      height: scale(50),
      width: scale(50),
    },
    imageIcon: {
      height: scale(30),
      width: scale(30),
    },
    messageContainer: {
      flex: 1,
      paddingHorizontal: scale(10),
    },
    title: {
      fontFamily: font.Rubik_400r,
      fontSize: scale(fontSize.fontSize14),
      color: color.lable1,
    },
    titleBold: {
      fontFamily: font.Rubik_500m,
    },
    time: {
      fontFamily: font.Rubik_400r,
      fontSize: scale(fontSize.fontSize12),
      color: color.textLight,
      marginTop: scale(4),
    },
  });

export default NotificationModal;