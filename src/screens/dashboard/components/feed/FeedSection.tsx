import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { color, font, fontSize } from '../../../../theme/color';
import { FeedCard } from './FeedCard';
import { useScreenDimensions } from '../../../../utils/DimensionsUtilities';
import { createStyles } from './styles';

const feedItems = [
  {
    id: 1,
    author: {
      name: "Stellina Parker",
      avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      timeAgo: "14 mins ago"
    },
    title: "Is it possible to retrieve the role either is Viewer or Contributor?",
    description: "Hi, Is the API possible to retrieve the role either is Viewer or Contributor? Additional: If can, is it able to determine the show the last commit date of the Contributor",
    image: "https://placehold.co/400x250/9b87f5/FFFFFF/png",
    likes: 59,
    comments: 5
  },
  {
    id: 2,
    author: {
      name: "Dr. Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      timeAgo: "2 hours ago"
    },
    title: "Understanding Mental Health in 2025",
    description: "Mental health awareness has become increasingly important in our daily lives. Here's what you need to know about maintaining good mental health in today's world.",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    likes: 45,
    comments: 8
  },
  {
    id: 3,
    author: {
      name: "Jenifer Lopez",
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      timeAgo: "4 days ago"
    },
    title: "Opportunities For Equity In Research Grantmaking",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...",
    image: null,
    likes: 59,
    comments: 5
  }
];

const FeedSection = () => {
  const { t } = useTranslation();
  const { isMobile, isTablet, scaleFactor, fontScale } = useScreenDimensions();
  const isMobileOrTablet = isMobile || isTablet;

  const scale = (value: number) => value * scaleFactor;
  const fontScales = useCallback(
      (value: number) => value * fontScale,
      [scaleFactor]
    );

  const getFeedCardSpacingHorizontal = (isLast: boolean, scale: (val: number) => number, fontScales: (val: number) => number) => ({
    marginRight: isLast ? 0 : fontScales(25),
  });

  const styles = createStyles(isMobile, isMobileOrTablet, scale, fontScales);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{t('feedSection.title')}</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>{t('feedSection.viewAllButton')}</Text>
        </TouchableOpacity>
      </View>

      {isMobileOrTablet ? (
        <View style={styles.feedGrid}>
          {feedItems.map((item) => (
            <FeedCard
              key={item.id}
              item={item}
              style={styles.feedCardSpacing}
            />
          ))}
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.feedContainer}
        >
          {feedItems.map((item, index) => (
            <FeedCard
              key={item.id}
              item={item}
              style={getFeedCardSpacingHorizontal(index === feedItems.length - 1, scale, fontScales)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default FeedSection;