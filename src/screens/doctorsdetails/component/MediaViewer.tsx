import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  FlatList,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import Video from "react-native-video";
import { useScreenDimensions } from "../../../utils/DimensionsUtilities"; // Adjust as needed
import Entypo from "react-native-vector-icons/Entypo";
import { color } from "../../../theme/color";

export interface MediaItem {
  type: "image" | "video";
  uri: string;
  thumbnail?: string;
}

const SPACING = 10;
const NUM_COLUMNS = 3;

const mediaItems: MediaItem[] = [
  {
    type: "image",
    uri: "https://picsum.photos/id/237/400/600",
  },
  {
    type: "video",
    uri: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
  },
  {
    type: "image",
    uri: "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY",
  },
  {
    type: "video",
    uri: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://www.w3schools.com/html/pic_trulli.jpg",
  },
];

const MediaViewer = () => {
  const { fontScale } = useScreenDimensions();
  const scale = useCallback((val: number) => val * fontScale, [fontScale]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingHorizontal: SPACING,
          paddingTop: SPACING,
          backgroundColor: "#fff",
        },
        itemContainer: {
          margin: SPACING / 2,
          borderRadius: 6,
          overflow: "hidden",
          backgroundColor: "#ccc",
        },
        thumbnailImage: {
          width: "100%",
          height: "100%",
        },
        playOverlay: {
       position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
        },
        playIconText: {
          fontSize: scale(24),
          color: "#fff",
        },
        modalBackground: {
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        },
        fullScreenMedia: {
          width: "100%",
          height: "100%",
        },
        closeButton: {
          position: "absolute",
          top: Platform.OS === "web" ? 10 : 40,
          right: 20,
          padding: 10,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 20,
        },
        closeButtonText: {
          color: "#fff",
          fontSize: scale(20),
        },
      }),
    [scale]
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const handleItemPress = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const selectedMedia = mediaItems[selectedIndex];

  const renderMediaItem = ({
    item,
    index,
  }: {
    item: MediaItem;
    index: number;
  }) => {
    const isVideo = item.type === "video";
    const displayUri = isVideo ? item.thumbnail : item.uri;
    const itemSize = (containerWidth - SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

    return (
      <TouchableOpacity
        onPress={() => handleItemPress(index)}
      >
        <Image
          source={{ uri: displayUri }}
          style={{
            height: itemSize,
            width: itemSize- 5,
            borderRadius: 8,
             margin: SPACING / 2,
            overflow: "hidden",
          }}
          resizeMethod="resize"
          resizeMode="cover"
        />
        {isVideo && (
          <View style={styles.playOverlay}>
            <Entypo
              name="controller-play"
              size={scale(30)}
              color={color.white}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <FlatList
        data={mediaItems}
        renderItem={renderMediaItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={NUM_COLUMNS}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          {selectedMedia.type === "image" ? (
            <Image
              source={{ uri: selectedMedia.uri }}
              style={styles.fullScreenMedia}
              resizeMode="contain"
            />
          ) : (
            <Video
              source={{ uri: selectedMedia.uri }}
              style={styles.fullScreenMedia}
              controls
              paused={false}
              resizeMode="contain"
              onError={(e) => console.error("Video error", e)}
            />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default MediaViewer;
