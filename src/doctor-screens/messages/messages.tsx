import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  SafeAreaView,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useScreenDimensions } from "../../utils/DimensionsUtilities";
import Icon from "react-native-vector-icons/Ionicons";
import { color, font, fontSize } from "../../theme/color";
import LoginHeader from "../components/login-header";
import { assets } from "../assets";
import WebLinearGradient from "../../components/WebLinearGradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";

interface Message {
  id: string;
  text: string;
  type: "in" | "out";
  time: string;
  attachment?: any;
}

interface Patient {
  id: string;
  name: string;
  message: string;
  time: string;
  image: any;
  messages: Message[];
}

interface MessagesScreenProps {
  navigation: any;
}

interface ChatScreenRouteParams {
  patientId: string;
  patientName: string;
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

export default function MessagesScreen({ navigation }: MessagesScreenProps) {
  const { t } = useTranslation();
  const { isMobile, scaleFactor, fontScale, isMobileApp } =
    useScreenDimensions();
  const scale = (value: number) => (isMobile ? value * scaleFactor : value);
  const fontScales = useCallback(
    (value: number) => value * fontScale,
    [fontScale]
  );
  const styles = useMemo(
    () => createStyles(scale, fontScales, isMobile),
    [scale, fontScales, isMobile]
  );
  const flatListRef = useRef<FlatList>(null);

  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [messageInput, setMessageInput] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [selectedAttachment, setSelectedAttachment] = useState<
     File | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const route = useRoute();
  const { patientId, patientName } = route.params as ChatScreenRouteParams;
  const selectedPatientIdCheck = patientId || initialPatients[0].id;
  const [selectedPatientId, setSelectedPatientId] = useState(
    selectedPatientIdCheck
  );
  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === selectedPatientId),
    [patients, selectedPatientId]
  );

  useEffect(() => {
    navigation.setOptions({ title: patientName || "Message" });
  }, [navigation, patientName]);

  useEffect(() => {
    if (flatListRef.current && selectedPatient?.messages.length) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [selectedPatient?.messages, selectedPatientId, patients]);

  const handleSend = () => {
    if (!messageInput.trim() && !selectedAttachment) return;

    setPatients((prev: any) =>
      prev.map((patient: any) =>
        patient.id === selectedPatientId
          ? {
              ...patient,
              messages: [
                ...patient.messages,
                {
                  id: Date.now().toString(),
                  text:
                    messageInput.trim() ||
                    (selectedAttachment ? "Attachment sent" : ""),
                  type: "out",
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  attachment: selectedAttachment,
                },
              ],
            }
          : patient
      )
    );
    setMessageInput("");
    setSelectedAttachment(null);

    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  const requestStoragePermission = async () => {
    let permission;
    if (Platform.OS === "android") {
      if (parseInt(Platform.Version as unknown as string, 10) >= 33) {
        permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      } else {
        permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }
    } else if (Platform.OS === "ios") {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      return true;
    }

    try {
      const result = await check(permission);
      if (result === RESULTS.GRANTED) {
        return true;
      } else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } else if (result === RESULTS.LIMITED) {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error("Permission check error:", error);
      return false;
    }
  };

  const handleAttachment = async () => {
   if (Platform.OS === "web") {
      fileInputRef.current?.click();
      return;
    }

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      const permission = Platform.OS === "ios"
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : Platform.OS === "android" && parseInt(Platform.Version as unknown as string, 10) >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      await request(permission);
      return;
    }

    try {
      const types = require('@react-native-documents/picker').types;
       const pick = require('@react-native-documents/picker').pick;
     
      const result = await pick({
        type: [types.allFiles],
      });
      if (result && Array.isArray(result)) {
        setSelectedAttachment(result[0]);
      }
    } catch (err:any) {
      Alert.alert("Error", "Failed to open document picker. " + (err?.message || err));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedAttachment(file);
  };

  const handleImagePress = (attachment: any) => {
    const imageUri =
      Platform.OS === "web" &&
      typeof File !== "undefined" &&
      attachment instanceof File &&
      attachment.type?.startsWith("image/")
        ? URL.createObjectURL(attachment)
        : attachment?.uri;
    setSelectedImageUri(imageUri);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedImageUri(null);
  };

  const handlePatientClick = (item: { id: string; name: string }) => {
    setSelectedPatientId(item.id);
    if (isMobile)
      navigation.navigate("Chat", {
        patientId: item.id,
        patientName: item.name,
      });
  };

  const renderChatMessage = (item: any) => {
    const attachment = item.attachment as any;
    const isImage =
      attachment &&
      (attachment.type?.startsWith?.("image/") ||
        attachment?.type?.includes("image"));
    const imageUri =
      Platform.OS === "web" &&
      typeof File !== "undefined" &&
      attachment instanceof File &&
      attachment.type?.startsWith("image/")
        ? URL.createObjectURL(attachment)
        : attachment?.uri;

    return (
      <View
        style={
          item.type === "in" ? styles.incomingMessage : styles.outgoingMessage
        }
      >
        <Text
          style={
            item.type === "in" ? styles.messageIncomingText : styles.messageText
          }
        >
          {item.text}
        </Text>
        {attachment && (
          <View style={{ marginTop: fontScales(5) }}>
            {isImage ? (
              <TouchableOpacity onPress={() => handleImagePress(attachment)}>
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: fontScales(150),
                    height: fontScales(100),
                    borderRadius: fontScales(6),
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.attachmentText}>
                📎 {attachment?.name || "Unnamed File"}
              </Text>
            )}
          </View>
        )}
        <Text
          style={
            item.type === "in" ? styles.messageIncomingTime : styles.messageTime
          }
        >
          {item.time}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screen}>
        {!isMobile && (
          <LoginHeader headerTitle="Message" navigation={navigation} />
        )}
        {isMobile ? (
          selectedPatientId ? (
            <>
              <View style={styles.mobileHeader}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: fontScales(5),
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                  >
                    <Icon
                      name="arrow-back"
                      size={fontScales(24)}
                      color={color.shadowColor}
                    />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: selectedPatient?.image }}
                    style={styles.avatar}
                  />
                  <Text style={styles.chatName}>{selectedPatient?.name}</Text>
                </View>

                <TouchableOpacity style={[styles.deleteButton]}>
                  <Image
                    style={{ height: fontScales(20), width: fontScales(20) }}
                    source={assets.settings}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.chatContainer}>
                <FlatList
                  ref={flatListRef}
                  style={styles.messagesContainer}
                  data={selectedPatient?.messages || []}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                    marginBottom: fontScales(100),
                  }}
                  renderItem={({ item }) => {
                    const attachment = item.attachment as any;
                    const isImage =
                      attachment &&
                      (attachment.type?.startsWith?.("image/") ||
                        attachment?.type?.includes("image"));
                    const imageUri =
                      Platform.OS === "web" &&
                      typeof File !== "undefined" &&
                      attachment instanceof File &&
                      attachment.type?.startsWith("image/")
                        ? URL.createObjectURL(attachment)
                        : attachment?.uri;

                    return (
                      <View
                        style={
                          item.type === "in"
                            ? styles.incomingMessage
                            : styles.outgoingMessage
                        }
                      >
                        <Text
                          style={
                            item.type === "in"
                              ? styles.messageIncomingText
                              : styles.messageText
                          }
                        >
                          {item.text}
                        </Text>
                        {attachment && (
                          <View style={{ marginTop: fontScales(5) }}>
                            {isImage ? (
                              <Image
                                source={{ uri: imageUri }}
                                style={{
                                  width: fontScales(150),
                                  height: fontScales(100),
                                  borderRadius: fontScales(6),
                                }}
                                resizeMode="cover"
                              />
                            ) : (
                              <Text style={styles.attachmentText}>
                                📎 {attachment?.name || "Unnamed File"}
                              </Text>
                            )}
                          </View>
                        )}
                        <Text
                          style={
                            item.type === "in"
                              ? styles.messageIncomingTime
                              : styles.messageTime
                          }
                        >
                          {item.time}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                {selectedAttachment && (
                      <View style={styles.previewContainer}>
                        <View style={styles.previewContent}>
                          <Icon
                            name="document"
                            size={fontScales(20)}
                            color={color.textLight}
                            style={styles.previewIcon}
                          />
                          <Text style={styles.previewText}>
                            {selectedAttachment.name || "Unnamed File"}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setSelectedAttachment(null)}
                            style={styles.closePreviewButton}
                          >
                            <Icon
                              name="close"
                              size={fontScales(20)}
                              color={color.textLight}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                <TouchableOpacity
                  onPress={handleAttachment}
                  style={styles.attachmentButton}
                >
                  <Icon
                    name="attach"
                    size={fontScales(24)}
                    color={color.secondary1}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Type a message"
                  value={messageInput}
                  onChangeText={setMessageInput}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  style={styles.sendButton}
                >
                  <Icon
                    name="send"
                    size={fontScales(24)}
                    color={color.secondary1}
                  />
                </TouchableOpacity>
                {!isMobileApp ? (
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                ) : null}
              </View>
            </>
          ) : (
            <View style={styles.leftPanel}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search Patients"
                value={searchText}
                onChangeText={setSearchText}
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                data={patients.filter((p) =>
                  p.name.toLowerCase().includes(searchText.toLowerCase())
                )}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                  item.id === selectedPatientId ? (
                    <WebLinearGradient
                      colors={[color.sideBarColor1, color.sideBarColor2]}
                    >
                      <TouchableOpacity
                        style={styles.patientItem}
                        onPress={() => handlePatientClick(item)}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={styles.avatar}
                        />
                        <View style={styles.patientTextContainer}>
                          <Text style={styles.patientName}>{item.name}</Text>
                          <Text style={styles.patientMessage}>
                            {item.message}
                          </Text>
                        </View>
                        <Text style={styles.patientTime}>{item.time}</Text>
                      </TouchableOpacity>
                    </WebLinearGradient>
                  ) : (
                    <TouchableOpacity
                      style={styles.patientItem}
                      onPress={() => handlePatientClick(item)}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.avatar}
                      />
                      <View style={styles.patientTextContainer}>
                        <Text style={styles.patientName}>{item.name}</Text>
                        <Text style={styles.patientMessage}>
                          {item.message}
                        </Text>
                      </View>
                      <Text style={styles.patientTime}>{item.time}</Text>
                    </TouchableOpacity>
                  )
                }
              />
            </View>
          )
        ) : (
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
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                  item.id === selectedPatientId ? (
                    <WebLinearGradient
                      colors={[color.sideBarColor1, color.sideBarColor2]}
                    >
                      <TouchableOpacity
                        style={styles.patientItem}
                        onPress={() => setSelectedPatientId(item.id)}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={styles.avatar}
                        />
                        <View style={styles.patientTextContainer}>
                          <Text style={styles.patientName}>{item.name}</Text>
                          <Text style={styles.patientMessage}>
                            {item.message}
                          </Text>
                        </View>
                        <Text style={styles.patientTime}>{item.time}</Text>
                      </TouchableOpacity>
                    </WebLinearGradient>
                  ) : (
                    <TouchableOpacity
                      style={styles.patientItem}
                      onPress={() => setSelectedPatientId(item.id)}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.avatar}
                      />
                      <View style={styles.patientTextContainer}>
                        <Text style={styles.patientName}>{item.name}</Text>
                        <Text style={styles.patientMessage}>
                          {item.message}
                        </Text>
                      </View>
                      <Text style={styles.patientTime}>{item.time}</Text>
                    </TouchableOpacity>
                  )
                }
              />
            </View>
            <View style={styles.rightPanel}>
              {selectedPatient && (
                <>
                  <View style={styles.chatHeader}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: fontScales(10),
                      }}
                    >
                      <Image
                        source={{ uri: selectedPatient.image }}
                        style={styles.avatar}
                      />
                      <Text style={styles.chatName}>
                        {selectedPatient.name}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.deleteButton}>
                      <Image
                        style={{
                          height: fontScales(20),
                          width: fontScales(20),
                        }}
                        source={assets.settings}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    ref={flatListRef}
                    style={styles.messagesContainer}
                    data={selectedPatient.messages}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      flexGrow: 1,
                      marginBottom: fontScales(100),
                    }}
                    renderItem={({ item }) => renderChatMessage(item)}
                  />
                  <View style={styles.inputContainer}>
                    {selectedAttachment && (
                      <View style={styles.previewContainer}>
                        <View style={styles.previewContent}>
                          <Icon
                            name="document"
                            size={fontScales(20)}
                            color={color.textLight}
                            style={styles.previewIcon}
                          />
                          <Text style={styles.previewText}>
                            {selectedAttachment.name || "Unnamed File"}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setSelectedAttachment(null)}
                            style={styles.closePreviewButton}
                          >
                            <Icon
                              name="close"
                              size={fontScales(20)}
                              color={color.textLight}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    <View style={{ flexDirection: "row", flex: 1 }}>
                      <TextInput
                        style={styles.input}
                        placeholder="Type a message"
                        value={messageInput}
                        placeholderTextColor={color.textPlaceHolder}
                        onChangeText={setMessageInput}
                      />
                      <TouchableOpacity
                        onPress={handleAttachment}
                        style={styles.attachmentButton}
                      >
                        <Icon
                          name="attach"
                          size={fontScales(24)}
                          color={color.textPlaceHolder}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={handleSend}
                      style={styles.sendButton}
                    >
                      <Icon
                        name="send"
                        size={fontScales(18)}
                        color={color.white}
                      />
                    </TouchableOpacity>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        )}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedImageUri && (
                <Image
                  source={{ uri: selectedImageUri }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Icon name="close" size={fontScales(24)} color={color.white} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
      paddingVertical: fontScales(10),
    },
    chatName: {
      fontSize: fontScales(fontSize.fontSize16),
      fontFamily: font.Rubik_500m,
    },
    deleteButton: {
      backgroundColor: color.white,
      padding: fontScales(6),
      borderColor: color.border,
    },
    messagesContainer: {
      flex: 1,
      paddingVertical: fontScales(10),
      marginBottom: fontScales(100),
    },
    mobileHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: fontScales(10),
      backgroundColor: color.white,
      borderBottomWidth: 1,
      borderColor: color.border,
      justifyContent: "space-between",
      paddingHorizontal: fontScales(10),
    },
    backButton: { marginRight: fontScales(10) },
    headerTitle: {
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_500m,
      color: color.lable1,
    },
    chatContainer: { flex: 1, paddingHorizontal: fontScales(10) },
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
      borderColor: color.grey,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: color.white,
    },
    attachmentButton: {
      marginRight: isMobile ? fontScales(70) : fontScales(10),
      marginTop: isMobile ? fontScales(10) : 0,
      position: "absolute",
      right: fontScales(5),
      top: fontScales(10),
      zIndex: 99,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: color.colorF9F9F9,
      backgroundColor: color.colorF9F9F9,
      borderRadius: fontScales(5),
      paddingHorizontal: fontScales(15),
      paddingVertical: fontScales(15),
      marginRight: fontScales(10),
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      outlineStyle: "none" as any,
      zIndex: 9,
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
      fontFamily: font.Rubik_400r,
      marginTop: fontScales(5),
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color.blackLight,
    },
    modalContent: { position: "relative", width: "80%", height: "80%" },
    modalImage: { width: "100%", height: "100%", borderRadius: fontScales(10) },
    closeButton: {
      position: "absolute",
      top: fontScales(10),
      right: fontScales(10),
      backgroundColor: color.blackLight,
      borderRadius: fontScales(15),
      padding: fontScales(5),
    },
    previewContainer: {
      position: "absolute",
      top: fontScales(-50),
      left: fontScales(10),
      right: fontScales(10),
      backgroundColor: color.colorF5F5F5,
      borderRadius: fontScales(8),
      padding: fontScales(8),
      zIndex: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    previewContent: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    previewIcon: {
      marginRight: fontScales(8),
    },
    previewText: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_400r,
      color: color.textLight,
      flex: 1,
    },
    closePreviewButton: {
      padding: fontScales(5),
    },
  });
