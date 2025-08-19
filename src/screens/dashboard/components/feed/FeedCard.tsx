import React, { useCallback } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { assets } from '../../assets';
import { color, font, fontSize } from '../../../../theme/color';
import { useScreenDimensions } from '../../../../utils/DimensionsUtilities';

export const FeedCard = ({ item, style }: any) => {
  const { isMobile, scaleFactor, fontScale } = useScreenDimensions();
  const scale = (value: number) => isMobile ? value * scaleFactor : value;
  const fontScales = useCallback(
        (value: number) => value * fontScale,
        [scaleFactor]
      );
  const styles = createStyles(scale,fontScales);

  const showReadMore =
    item.image ||
    item.title.length > 60 ||
    item.description.length > 100;

  return (
    <View style={[styles.feedCard, style]}>
      <View style={styles.authorSection}>
        <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{item.author.name}</Text>
          <Text style={styles.timeAgo}>{item.author.timeAgo}</Text>
        </View>
      </View>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.feedImage} />
      )}

      <View style={styles.contentSection}>
        <View style={styles.textBlock}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
          {showReadMore && (
            <TouchableOpacity>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.interactionSection}>
          <View style={styles.interactionGroup}>
            <TouchableOpacity style={styles.interactionButton}>
              <Image style={styles.interactionIconSize} source={assets.like} />
              <Text style={styles.interactionText}>{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionButton}>
              <Image style={styles.interactionIconSize} source={assets.message} />
              <Text style={styles.interactionText}>{item.comments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (scale: (val: number) => number,fontScales: (val: number) => number) =>
  StyleSheet.create({
    feedCard: {
      width: fontScales(360),
      backgroundColor: color.white,
      borderRadius: fontScales(8),
      borderWidth: 1,
      borderColor: 'rgba(40, 37, 44, 0.08)',
      overflow: 'hidden',
      paddingLeft: fontScales(20),
      paddingRight: fontScales(20),
      paddingTop: fontScales(20),
      paddingBottom: fontScales(10),
    },
    authorSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: fontScales(0),
    },
    avatar: {
      width: fontScales(44),
      height: fontScales(44),
      borderRadius: fontScales(22),
    },
    authorInfo: {
      marginLeft: fontScales(12),
    },
    authorName: {
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_500m,
      color: color.feedAuthorName,
      lineHeight: fontScales(16),
    },
    timeAgo: {
      fontSize: fontScales(fontSize.fontSize11),
      color: color.feedText,
      lineHeight: fontScales(16),
      fontFamily: font.Rubik_400r,
    },
    feedImage: {
      width: '100%',
      height: fontScales(160),
      marginTop: fontScales(16),
      borderRadius: fontScales(8),
    },
    contentSection: {
      paddingVertical: fontScales(10),
      flex: 1,
      justifyContent: 'space-between',
    },
    textBlock: {
      marginBottom: fontScales(12),
    },
    title: {
      fontSize: fontScales(fontSize.fontSize18),
      fontFamily: font.Rubik_600sb,
      lineHeight: fontScales(26),
      color: color.lable1,
      marginBottom: fontScales(6),
    },
    description: {
      fontSize: fontScales(fontSize.fontSize16),
      color: color.feedDescriptions,
      lineHeight: fontScales(26),
      marginBottom: fontScales(6),
      fontFamily: font.Rubik_400r,
    },
    readMore: {
      color: color.feedReadMore,
      fontSize: fontScales(fontSize.fontSize14),
      fontFamily: font.Rubik_600sb,
    },
    interactionSection: {
      borderTopWidth: 1,
      borderTopColor: color.colorF1,
      paddingTop: fontScales(12),
    },
    interactionGroup: {
      flexDirection: 'row',
      gap: fontScales(20),
    },
    interactionIconSize: {
      height: fontScales(15),
      width: fontScales(15),
    },
    interactionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: fontScales(4),
    },
    interactionText: {
      fontSize: fontScales(fontSize.fontSize12),
      color: color.feedText,
      lineHeight: fontScales(16),
      fontFamily: font.Rubik_600sb,
    },
  });
