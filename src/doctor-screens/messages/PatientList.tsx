import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import Icon from "react-native-vector-icons/Ionicons";
import { color, font, fontSize } from "../../theme/color";
import LoginHeader from "../components/login-header";
import { assets } from "../assets";
import { useNavigation } from "@react-navigation/native";

interface Patient {
  id: string;
  name: string;
  message: string;
  time: string;
  image: any;
  messages: Message[];
}

interface Message {
  id: string;
  text: string;
  type: "in" | "out";
  time: string;
  attachment?: any;
}

interface MessagesScreenProps {
  navigation: any;
}

const initialPatients: Patient[] = [
  {
    id: "1",
    name: "Richard Johnson",
    message: "Will see you on Monday!",
    time: "16:34",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    messages: [
      {
        id: "m1",
        text: "Take a look at this report",
        type: "out",
        time: "08:50",
        attachment: {
          name: "report.pdf",
          type: "application/pdf",
          uri: "https://example.com/report.pdf",
        } as any,
      },
      {
        id: "m2",
        text: "Here is an X-ray image",
        type: "in",
        time: "08:45",
        attachment: {
          name: "xray.png",
          type: "image/png",
          uri: "data:image/jpeg;base64,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",
        } as any,
      },
      {
        id: "m3",
        text: "Kindly take today’s appointment at 4pm.",
        type: "out",
        time: "07:00",
      },
    ],
  },
  {
    id: "2",
    name: "Mary Ross",
    message: "Thanks Doctor!",
    time: "10:05",
    image:
      "https://us.123rf.com/450wm/file404/file4042004/file404200400762/143794459-casual-young-man-looking-back-at-something.jpg?ver=6",
    messages: [
      { id: "m1", text: "Hi Doctor!", type: "in", time: "10:00" },
      {
        id: "m2",
        text: "Thanks for the prescription!",
        type: "in",
        time: "10:05",
      },
    ],
  },
];

export default function PatientListScreen({ navigation }: MessagesScreenProps) {
  const { t } = useTranslation();
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [fontScale]
  );
  const styles = createStyles(scale, fontScales, isMobile);

  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    initialPatients[0].id
  );
  const [searchText, setSearchText] = useState<string>("");

  const handlePatientSelect = (patientId: string, patientName: string) => {
    console.log("calledd");

    navigation.navigate("Chat", { patientId, patientName });
  };

  return (
     <SafeAreaView style={{flex:1}}>
    <View style={styles.screen}>
      <LoginHeader headerTitle="Message" navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.leftPanel}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Patients"
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={patients.filter((p) =>
              p.name.toLowerCase().includes(searchText.toLowerCase())
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.patientItem,
                  //   item.id === selectedPatientId && styles.selectedPatient,
                ]}
                onPress={() => handlePatientSelect(item.id, item.name)}
              >
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View style={styles.patientTextContainer}>
                  <Text style={styles.patientName}>{item.name}</Text>
                  <Text style={styles.patientMessage}>{item.message}</Text>
                </View>
                <Text style={styles.patientTime}>{item.time}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.rightPanel}></View>
      </View>
    </View>
    </SafeAreaView>
  );
}

const createStyles = (
  scale: (val: number) => number,
  fontScales: (val: number) => number,
  isMobile: boolean
) =>
  StyleSheet.create({
    screen: { flex: 1 },
    container: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: color.white,
      borderRadius: fontScales(6),
      padding: fontScales(10),
      marginHorizontal: fontScales(10),
      marginBottom: fontScales(10),
    },
    leftPanel: {
      width: isMobile ? "100%" : fontScales(300),
      borderRightWidth: 1,
      borderColor: color.border,
      padding: fontScales(10),
    },
    searchInput: {
      padding: fontScales(8),
      borderRadius: fontScales(6),
      borderColor: color.border,
      borderWidth: fontScales(1),
      marginBottom: fontScales(10),
      fontSize: fontScales(fontSize.fontSize14),
      paddingVertical: fontScales(15),
      fontFamily: font.Rubik_400r,
      color: color.textLight,
      outlineStyle: "none" as any,
    },
    patientItem: {
      flexDirection: "row",
      paddingVertical: fontScales(10),
      borderTopWidth: 1,
      borderColor: color.colorF0F0F0,
    },
    selectedPatient: { backgroundColor: color.colorF0F0F0 },
    avatar: {
      width: fontScales(40),
      height: fontScales(40),
      borderRadius: fontScales(20),
      marginRight: fontScales(10),
    },
    patientTextContainer: { flex: 1 },
    patientName: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_500m,
    },
    patientMessage: {
      color: color.textLight,
      fontSize: fontScales(fontSize.fontSize12),
      fontFamily: font.Rubik_400r,
    },
    patientTime: {
      fontSize: fontScales(fontSize.fontSize10),
      fontFamily: font.Rubik_400r,
      color: color.textLight,
    },
    rightPanel: {
      flex: 1,
      padding: fontScales(10),
      display: isMobile ? "none" : "flex",
    },
    chatHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: fontScales(10),
      borderBottomWidth: 1,
      borderColor: color.border,
    },
    chatName: { fontSize: fontScales(fontSize.fontSize16), fontFamily:font.Rubik_500m },
     deleteButton: {
      backgroundColor: color.white,
      padding: fontScales(6),
      borderColor: color.border,
    },
    deleteText: { color: color.textLight, fontSize: fontScales(fontSize.fontSize12) },
    messagesContainer: { flex: 1, paddingVertical: fontScales(10) },
       incomingMessage: {
      alignSelf: "flex-start",
      backgroundColor: color.colorF5F5F5,
      padding: fontScales(10),
      borderRadius: fontScales(8),
      marginBottom: fontScales(10),
      maxWidth: "80%",
    },
     outgoingMessage: {
      alignSelf: "flex-end",
      backgroundColor: color.secondary1,
      padding: fontScales(10),
      borderRadius: fontScales(8),
      marginBottom: fontScales(10),
      maxWidth: "80%",
    },
   messageText: {
      color: color.white,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
    },
    messageTime: {
      color: color.colorBFBEC0,
      fontSize: fontScales(fontSize.fontSize14),
      marginTop: fontScales(5),
      fontFamily: font.Rubik_400r,
      alignSelf: "flex-end",
    },
    messageIncomingText: {
      color: color.lable1,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
    },
    messageIncomingTime: {
      color: color.lable1,
      fontSize: fontScales(fontSize.fontSize10),
      fontFamily: font.Rubik_400r,
      marginTop: fontScales(5),
      alignSelf: "flex-end",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: fontScales(10),
      borderTopWidth: 1,
      borderColor: color.border,
    },
    attachmentButton: { marginRight: fontScales(10),position:'absolute',right:fontScales(5),top:fontScales(10) },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: color.border,
      borderRadius: fontScales(20),
      paddingHorizontal: fontScales(15),
      paddingVertical: fontScales(8),
      marginRight: fontScales(10),
      fontSize: fontScales(14),
      fontFamily:font.Rubik_400r,
    },
 sendButton: {
      backgroundColor: color.doctorRatingContainer,
      borderRadius: fontScales(20),
      width: fontScales(40),
      height: fontScales(40),
      justifyContent: "center",
      alignItems: "center",
    },
    attachmentText: {
      color: color.white,
      fontSize: fontScales(fontSize.fontSize12),
      fontFamily:font.Rubik_400r,
      marginTop: fontScales(5),
    },
  });
